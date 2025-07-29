// src/components/ui/OfferReportImage.tsx

import type { OffersTable } from '@/lib/db';

interface OfferReportImageProps {
  offer: OffersTable;
  scores: {
    compensationScore: number;
    longTermScore: number;
    developmentScore: number;
    prospectsScore: number;
    environmentScore: number;
    lifeBalanceAndBenefitsScore: number;
  };
  offerScore: number;
  marketPowerIndex: number;
}

const healthBenefitMap: Record<OffersTable['health_benefit_level'], string> = {
  basic: '基础保障',
  standard: '标准福利',
  premium: '高级套餐',
};

const companyStageMap: Record<string, string> = {
  listed: '已上市',
};

const userProfileMap: Record<OffersTable['user_profile'], string> = {
  graduate: '应届生模型',
  experienced: '职场人士模型',
  family: '家庭为重模型',
};

// 样式表中增加 LOGO 的样式
const styles: { [key:string]: React.CSSProperties } = {
  card: {
    fontFamily: '"PingFang SC", "Helvetica Neue", Helvetica, Arial, sans-serif',
    width: '1200px',
    padding: '80px',
    background: 'linear-gradient(135deg, #1e3a8a 0%, #3730a3 50%, #111827 100%)',
    color: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    gap: '60px',
    borderRadius: '24px',
    position: 'relative',
  },
  // 1.  LOGO 样式
  logo: {
    position: 'absolute',
    top: '80px', // 与内边距保持一致
    right: '80px', // 与内边距保持一致
    height: '40px',  // 您可以根据 LOGO 的尺寸调整高度
    width: 'auto',   // 宽度自适应以保持比例
    opacity: 0.8,    // 轻微的透明度使其更好地融入背景
  },
  header: {
    textAlign: 'center',
  },
  companyName: {
    fontSize: '48px',
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: '16px',
  },
  jobTitle: {
    fontSize: '28px',
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '400',
  },
  mainContent: {
    display: 'flex',
    gap: '80px',
    alignItems: 'center',
  },
  leftPanel: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '60px',
  },
  scoreBox: {
    textAlign: 'center',
  },
  scoreValue: {
    fontSize: '96px',
    fontWeight: '500',
    color: '#ffffff',
    lineHeight: '1',
  },
  scoreLabel: {
    fontSize: '18px',
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: '16px',
    letterSpacing: '1px',
  },
  rightPanel: {
    flex: '2',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '40px 30px',
  },
  detailItem: {
    textAlign: 'center',
  },
  detailLabel: {
    fontSize: '16px',
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: '12px',
    display: 'block',
  },
  detailValue: {
    fontSize: '24px',
    fontWeight: '500',
    color: '#ffffff',
  },
  footer: {
    marginTop: '50px',
    textAlign: 'center',
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.6)',
    borderTop: '1px solid rgba(255, 255, 255, 0.15)',
    paddingTop: '30px',
  },
};

export function OfferReportImage({ offer, scores, offerScore, marketPowerIndex }: OfferReportImageProps) {
    const comprehensiveSalary = (offer.base_salary * offer.salary_months + offer.annual_subsidies) / 10000;
    let workHoursText = '未提供';
    if (Array.isArray(offer.work_hours) && offer.work_hours.length === 2 && offer.work_hours[1] >= offer.work_hours[0]) {
        const duration = offer.work_hours[1] - offer.work_hours[0];
        workHoursText = `${Number.isInteger(duration) ? duration : duration.toFixed(1)} h/天`;
    }

  return (
    <div style={styles.card}>
      {/* 2. 在卡片中嵌入 LOGO 图像 */}
      {/* 路径 /LOGO.svg 会自动指向您 public 文件夹下的文件 */}
      <img
        src="/LOGO.svg" 
        alt="Company Logo"
        style={styles.logo}
      />

      <header style={styles.header}>
        <div style={styles.companyName}>{offer.company_name}</div>
        <div style={styles.jobTitle}>{offer.job_title}</div>
      </header>
      
      <main style={styles.mainContent}>
        <div style={styles.leftPanel}>
          <div style={styles.scoreBox}>
            <div style={styles.scoreValue}>{offerScore.toFixed(1)}</div>
            <div style={styles.scoreLabel}>OfferScore™ (个人匹配度)</div>
          </div>
          <div style={styles.scoreBox}>
            <div style={styles.scoreValue}>{marketPowerIndex.toFixed(1)}</div>
            <div style={styles.scoreLabel}>市场竞争力指数</div>
          </div>
        </div>

        <div style={styles.rightPanel}>
            <div style={styles.detailItem}>
              <span style={styles.detailLabel}>年度综合薪酬</span>
              <span style={styles.detailValue}>{comprehensiveSalary.toFixed(1)} 万元</span>
            </div>
            <div style={styles.detailItem}>
              <span style={styles.detailLabel}>年化期权价值</span>
              <span style={styles.detailValue}>{offer.has_stock_option ? `${(offer.stock_option_value / 10000).toFixed(1)} 万` : '无'}</span>
            </div>
            <div style={styles.detailItem}>
              <span style={styles.detailLabel}>每日工作时长</span>
              <span style={styles.detailValue}>{workHoursText}</span>
            </div>
            <div style={styles.detailItem}>
              <span style={styles.detailLabel}>公司规模</span>
              <span style={styles.detailValue}>{offer.company_size}</span>
            </div>
            <div style={styles.detailItem}>
              <span style={styles.detailLabel}>发展阶段</span>
              <span style={styles.detailValue}>{companyStageMap[offer.company_stage] || offer.company_stage}</span>
            </div>
            <div style={styles.detailItem}>
              <span style={styles.detailLabel}>健康福利</span>
              <span style={styles.detailValue}>{healthBenefitMap[offer.health_benefit_level] || '未提供'}</span>
            </div>
            <div style={styles.detailItem}>
              <span style={styles.detailLabel}>单程通勤</span>
              <span style={styles.detailValue}>{offer.commute_time} 分钟</span>
            </div>
            <div style={styles.detailItem}>
              <span style={styles.detailLabel}>带薪年假</span>
              <span style={styles.detailValue}>{offer.paid_leave} 天</span>
            </div>
            <div style={styles.detailItem}>
              <span style={styles.detailLabel}>考量模型</span>
              <span style={styles.detailValue}>{userProfileMap[offer.user_profile] || '默认模型'}</span>
            </div>
        </div>
      </main>

      <footer style={styles.footer}>
        报告生成于 {new Date().toLocaleDateString('zh-CN')} - 由 OfferScore™ 评估引擎强力驱动
      </footer>
    </div>
  );
}