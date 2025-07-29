// src/lib/export-utils.ts

import { saveAs } from 'file-saver';
import { utils, writeFile } from 'xlsx';
import type { OffersTable } from '@/lib/db';
import { calculateOfferScore, calculateMarketPowerIndex } from '@/lib/scoring';

// 中文键名映射表，被多个函数共享
const keyToChineseMap: Record<string, string> = {
    id: "报告ID",
    created_at: "创建时间",
    user_id: "用户ID",
    user_profile: "用户画像",
    company_name: "公司名称",
    job_title: "职位名称",
    company_size: "公司规模",
    company_stage: "公司阶段",
    base_salary: "基本月薪 (元)",
    salary_months: "薪资月数",
    annual_subsidies: "年度补贴 (元)",
    has_stock_option: "有股票/期权",
    stock_option_value: "期权年化价值 (元)",
    health_benefit_level: "健康福利",
    commute_time: "单程通勤 (分钟)",
    work_hours: "工作时间 (小时/天)",
    paid_leave: "带薪年假 (天)",
    career_development: "职业发展评分 (1-5)",
    work_content: "工作内容评分 (1-5)",
    work_environment: "工作环境评分 (1-5)",
    life_balance: "生活平衡评分 (1-5)",
    weight_salary: "薪酬权重 (%)",
    weight_long_term: "长期收益权重 (%)",
    weight_development: "发展权重 (%)",
    weight_prospects: "前景权重 (%)",
    weight_environment: "环境权重 (%)",
    weight_balance: "平衡权重 (%)",
    compensationScore: "薪酬回报得分",
    longTermScore: "长期收益得分",
    developmentScore: "职业发展得分",
    prospectsScore: "公司前景得分",
    environmentScore: "团队氛围得分",
    lifeBalanceAndBenefitsScore: "生活保障得分",
    OfferScore: "OfferScore™ (个人匹配度)",
    MarketPowerIndex: "市场竞争力指数",
};

/**
 * 准备用于导出的完整数据对象，包含计算后的分数。
 * @param offer - 原始 offer 数据。
 * @returns 包含所有字段的完整数据对象。
 */
function prepareDataForExport(offer: OffersTable) {
    const { scores, finalScore: offerScoreValue } = calculateOfferScore(offer);
    const { finalScore: marketPowerIndexValue } = calculateMarketPowerIndex(offer);

    return {
        ...offer,
        ...scores,
        OfferScore: offerScoreValue,
        MarketPowerIndex: marketPowerIndexValue,
    };
}

/**
 * 将 Offer 数据导出为 JSON 文件。
 * @param offer - 原始 offer 数据。
 */
export function exportOfferAsJson(offer: OffersTable): string {
    const dataToExport = prepareDataForExport(offer);
    const fileName = `OfferScore_${offer.company_name}_${offer.job_title}.json`.replace(/[\s/\\?%*:|"<>]/g, '_');
    const dataStr = JSON.stringify(dataToExport, null, 2);
    const blob = new Blob([dataStr], { type: "application/json;charset=utf-8" });
    saveAs(blob, fileName);
    return fileName;
}

/**
 * 将 Offer 数据导出为文本文档 (.txt)。
 * @param offer - 原始 offer 数据。
 */
export function exportOfferAsTxt(offer: OffersTable): string {
    const dataToExport = prepareDataForExport(offer);
    const fileName = `OfferScore_${offer.company_name}_${offer.job_title}.txt`.replace(/[\s/\\?%*:|"<>]/g, '_');
    let txtContent = `OfferScore™ 评估报告\n================================\n\n`;
    Object.entries(dataToExport).forEach(([key, value]) => {
        const label = keyToChineseMap[key] || key;
        const formattedValue = Array.isArray(value) ? value.join(' - ') : String(value);
        txtContent += `${label}: ${formattedValue}\n`;
    });
    const blob = new Blob([txtContent], { type: "text/plain;charset=utf-8" });
    saveAs(blob, fileName);
    return fileName;
}

/**
 * 将 Offer 数据导出为 Excel (.xlsx) 或 CSV 文件。
 * @param offer - 原始 offer 数据。
 * @param format - 'xlsx' 或 'csv'。
 */
export function exportOfferAsSheet(offer: OffersTable, format: 'xlsx' | 'csv'): string {
    const dataToExport = prepareDataForExport(offer);
    const fileNameBase = `OfferScore_${offer.company_name}_${offer.job_title}`.replace(/[\s/\\?%*:|"<>]/g, '_');

    const dataForSheet: { [key: string]: any } = {};
    for (const key in keyToChineseMap) {
        if (Object.prototype.hasOwnProperty.call(dataToExport, key)) {
            const chineseKey = keyToChineseMap[key];
            const value = (dataToExport as any)[key];
            dataForSheet[chineseKey] = Array.isArray(value) ? value.join(' - ') : value;
        }
    }
    
    const worksheet = utils.json_to_sheet([dataForSheet]);

    if (format === 'csv') {
        const fileName = `${fileNameBase}.csv`;
        const csvOutput = utils.sheet_to_csv(worksheet);
        const blob = new Blob(["\uFEFF" + csvOutput], { type: "text/csv;charset=utf-8;" });
        saveAs(blob, fileName);
        return fileName;
    } else { // xlsx
        const fileName = `${fileNameBase}.xlsx`;
        const workbook = utils.book_new();
        utils.book_append_sheet(workbook, worksheet, 'Offer评估数据');
        writeFile(workbook, fileName);
        return fileName;
    }
}