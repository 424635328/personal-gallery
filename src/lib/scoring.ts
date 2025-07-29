// src/lib/scoring.ts

import type { OffersTable } from '@/lib/db';

export interface ScoreResult {
  compensationScore: number;
  longTermScore: number;
  developmentScore: number;
  prospectsScore: number;
  environmentScore: number;
  lifeBalanceAndBenefitsScore: number;
}

// 评分模型函数
function getScoringModel(userProfile: string | null | undefined) {
    const baseModel = {
        salaryWeight: 1.0, stockWeight: 0.8,
        growthBoost: 1.0, stabilityBoost: 1.0,
    };
    switch (userProfile) {
        case 'graduate': return { ...baseModel, growthBoost: 1.5, salaryWeight: 0.9, stabilityBoost: 0.8 };
        case 'family': return { ...baseModel, stabilityBoost: 1.3, salaryWeight: 1.1 };
        default: return baseModel;
    }
}

function calculateBaseScores(offer: OffersTable): ScoreResult {
    const model = getScoringModel(offer.user_profile);

    // --- 薪酬回报 ---
    // 调整基准线以更贴合当前市场，并使用 S 型曲线 (tanh) 替代对数曲线，以更好地处理极值
    const salaryMedian = 250000; // 设定一个市场中位数年薪
    const baseAnnualSalary = (offer.base_salary || 0) * (offer.salary_months || 12) + (offer.annual_subsidies || 0);
    const salaryRatio = baseAnnualSalary / salaryMedian;
    const compensationScore = 50 * (1 + Math.tanh((salaryRatio - 1) * 1.5)); // S 型增长曲线
    const normalizedCompensationScore = Math.max(0, Math.min(100, compensationScore * model.salaryWeight));

    // --- 长期收益 ---
    const riskFactor: Record<string, number> = { startup: 0.2, growth: 0.5, mature: 0.8, listed: 1.0 };
    const riskAdjustedStockValue = (offer.stock_option_value || 0) * (riskFactor[offer.company_stage] || 0.5);
    const stockMedian = 100000;
    const stockRatio = riskAdjustedStockValue / stockMedian;
    const longTermScore = riskAdjustedStockValue > 0 ? 50 * (1 + Math.tanh((stockRatio - 1) * 1.2)) : 10;
    const normalizedLongTermScore = Math.max(0, Math.min(100, longTermScore * model.stockWeight));
    
    // --- 职业发展 ---
    const growthBoostByStage: Record<string, number> = { startup: 1.6, growth: 1.3, mature: 1.0, listed: 0.9 };
    const profileMatchBoostForDev: Record<string, number> = { graduate: 1.3, experienced: 1.0, family: 0.9 };
    const developmentScore = (offer.career_development * 10) * (growthBoostByStage[offer.company_stage] || 1) * (profileMatchBoostForDev[offer.user_profile] || 1) * model.growthBoost;
    const normalizedDevelopmentScore = Math.max(0, Math.min(100, developmentScore));

    // --- 公司前景 ---
    // 增强稳定性对前景的影响
    const companyStabilityFactor: Record<string, number> = { '<50': 0.7, '50-200': 0.85, '200-1000': 1.0, '1000-10000': 1.1, '>10000': 1.2 };
    const stageProspects: Record<string, number> = { startup: 0.7, growth: 1.2, mature: 1.1, listed: 1.5 };
    // 工作内容的挑战性 (work_content) 也是前景的一部分
    const prospectsScore = (offer.work_content * 6) * (companyStabilityFactor[offer.company_size] || 1) * (stageProspects[offer.company_stage] || 1);
    const normalizedProspectsScore = Math.max(0, Math.min(100, prospectsScore * model.stabilityBoost));

    // --- 工作环境 ---
    const environmentScore = offer.work_environment * 10;
    const normalizedEnvironmentScore = Math.max(0, Math.min(100, environmentScore));

    // --- 生活保障 ---
    // 调整惩罚曲线，使其更合理
    const workHoursPerDay = offer.work_hours ? offer.work_hours[1] - offer.work_hours[0] : 8;
    // 30分钟内通勤不扣分
    const commutePenalty = Math.pow(Math.max(0, (offer.commute_time || 0) - 30), 1.5) * 0.1; 
    // 9小时工作制(8+1)是常态，超过9小时惩罚加剧
    const overtimePenalty = Math.pow(Math.max(0, workHoursPerDay - 9), 2) * 8;
    const workloadComponent = 100 - commutePenalty - overtimePenalty;
    const healthBenefitScoreMap: Record<string, number> = { basic: 60, standard: 85, premium: 100 };
    // 10天年假是基准
    const leaveBonus = Math.max(0, (offer.paid_leave || 0) - 10) * 3;
    const benefitsComponent = (healthBenefitScoreMap[offer.health_benefit_level] || 60) + leaveBonus;
    const lifeBalanceAndBenefitsScore = (workloadComponent * 0.65) + (benefitsComponent * 0.35);
    const normalizedLifeBalanceAndBenefitsScore = Math.max(0, Math.min(100, lifeBalanceAndBenefitsScore));
    
    return {
        compensationScore: parseFloat(normalizedCompensationScore.toFixed(1)),
        longTermScore: parseFloat(normalizedLongTermScore.toFixed(1)),
        developmentScore: parseFloat(normalizedDevelopmentScore.toFixed(1)),
        prospectsScore: parseFloat(normalizedProspectsScore.toFixed(1)),
        environmentScore: parseFloat(normalizedEnvironmentScore.toFixed(1)),
        lifeBalanceAndBenefitsScore: parseFloat(normalizedLifeBalanceAndBenefitsScore.toFixed(1)),
    };
}

export function calculateOfferScore(offer: OffersTable): { scores: ScoreResult; finalScore: number } {
  const scores = calculateBaseScores(offer);
  
  const userWeights = {
    compensationScore: offer.weight_salary, longTermScore: offer.weight_long_term,
    developmentScore: offer.weight_development, prospectsScore: offer.weight_prospects,
    environmentScore: offer.weight_environment, lifeBalanceAndBenefitsScore: offer.weight_balance,
  };

  const totalUserWeight = Object.values(userWeights).reduce((sum, weight) => sum + (weight || 0), 0);
  if (totalUserWeight === 0) { /* ... (备用逻辑保持不变) ... */ }

  // --- 引入“满意度加成”和“短板容忍度” ---
  let weightedScoreSum = 0;
  let penalty = 0;
  const SATISFACTION_THRESHOLD = 80; // 定义一个“满意”阈值
  const SHORTBOARD_THRESHOLD = 50;   // 定义一个“短板”阈值

  for (const key in scores) {
    const scoreKey = key as keyof ScoreResult;
    const score = scores[scoreKey];
    const weight = userWeights[scoreKey] || 0;

    let adjustedScore = score;

    // 激励因子：如果某项得分很高（超过80），并且用户很看重它（权重超过20），则给予额外加成
    if (score > SATISFACTION_THRESHOLD && weight > 20) {
      const bonusFactor = 1 + ((score - SATISFACTION_THRESHOLD) / 100) * (weight / 100);
      adjustedScore *= bonusFactor;
    }
    
    // 短板惩罚：如果某项得分很低（低于50），则计算惩罚
    if (score < SHORTBOARD_THRESHOLD) {
      // 惩罚的大小与分数多低、用户多看重有关
      const shortfall = SHORTBOARD_THRESHOLD - score;
      const penaltyFactor = 1.5; // 加大惩罚系数
      penalty += shortfall * (weight / 100) * penaltyFactor;
    }

    weightedScoreSum += adjustedScore * weight;
  }
  
  const finalScoreBeforePenalty = weightedScoreSum / totalUserWeight;
  const finalScore = finalScoreBeforePenalty - penalty;

  return { scores, finalScore: Math.max(0, Math.min(100, parseFloat(finalScore.toFixed(1)))) };
}


export function calculateMarketPowerIndex(offer: OffersTable): { scores: ScoreResult; finalScore: number } {
  const scores = calculateBaseScores(offer);

  // 定义一套更 aggressive 的“市场”权重，极度看重财务和平台
  const marketWeights = {
    compensationScore: 30,           // 现金为王
    longTermScore: 20,               // 财富想象空间
    developmentScore: 10,            // 个人成长
    prospectsScore: 25,              // 公司平台和稳定性
    environmentScore: 5,             // 团队氛围
    lifeBalanceAndBenefitsScore: 10, // 福利与WLB
  };

  // 引入“稀缺性”和“稳定性”加成
  const sizeMultiplier: Record<string, number> = { '>10000': 1.1, '1000-10000': 1.05, '200-1000': 1.0, '50-200': 0.95, '<50': 0.9 };
  const stageMultiplier: Record<string, number> = { 'listed': 1.15, 'mature': 1.1, 'growth': 1.0, 'startup': 0.9 };

  const stabilityBoost = (sizeMultiplier[offer.company_size] || 1) * (stageMultiplier[offer.company_stage] || 1);

  let weightedScoreSum = 0;
  for (const key in scores) {
    const scoreKey = key as keyof ScoreResult;
    weightedScoreSum += scores[scoreKey] * marketWeights[scoreKey];
  }

  const baseMarketScore = weightedScoreSum / 100;
  // 最终的市场指数 = 基础加权分 * 稳定性加成
  const finalScore = baseMarketScore * stabilityBoost;

  return { scores, finalScore: Math.max(0, Math.min(100, parseFloat(finalScore.toFixed(1)))) };
}
