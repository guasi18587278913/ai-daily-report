import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import fs from 'fs';
import path from 'path';
import Layout from '../components/Layout';
import DailyHighlights from '../components/DailyHighlights';
import HotTopics from '../components/HotTopics';
import ToolNews from '../components/ToolNews';
import Practice from '../components/Practice';
import Industry from '../components/Industry';
import QA from '../components/QA';
import RiskWarning from '../components/RiskWarning';

export default function DailyReport({ reportData, availableDates, error }) {
  const router = useRouter();
  const { date } = router.query;
  const [activeSection, setActiveSection] = useState('highlights');

  // 键盘快捷键支持
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const currentIndex = availableDates.findIndex(d => d.date === date);
        if (e.key === 'ArrowLeft' && currentIndex > 0) {
          router.push(`/${availableDates[currentIndex - 1].date}`);
        } else if (e.key === 'ArrowRight' && currentIndex < availableDates.length - 1) {
          router.push(`/${availableDates[currentIndex + 1].date}`);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [date, availableDates, router]);

  if (error) {
    return (
      <Layout availableDates={availableDates}>
        <div className="error-container">
          <h1>😕 找不到该日期的日报</h1>
          <p>请选择其他日期查看</p>
        </div>
      </Layout>
    );
  }

  if (!reportData) {
    return (
      <Layout availableDates={availableDates}>
        <div className="loading">加载中...</div>
      </Layout>
    );
  }

  const sections = [
    { id: 'highlights', icon: '📌', title: '今日要点', count: reportData.highlights?.length || 0 },
    { id: 'hot-topics', icon: '🔥', title: '热门话题', count: reportData.hotTopics?.length || 0 },
    { id: 'tools', icon: '🛠', title: '工具情报', count: reportData.toolNews?.length || 0 },
    { id: 'practice', icon: '💡', title: '实战干货', count: reportData.practice?.length || 0 },
    { id: 'industry', icon: '📊', title: '行业动态', count: reportData.industry?.length || 0 },
    { id: 'qa', icon: '💬', title: '问答精选', count: reportData.qa?.length || 0 },
    { id: 'risk-warning', icon: '⚠️', title: '风险提示', count: reportData.riskWarning?.length || 0 }
  ];

  return (
    <Layout 
      availableDates={availableDates} 
      currentDate={date}
      sections={sections}
      activeSection={activeSection}
      onSectionChange={setActiveSection}
    >
      <div className="content">
        {/* 今日要点 */}
        <DailyHighlights highlights={reportData.highlights || []} />

        {/* 热门话题 */}
        <HotTopics data={reportData.hotTopics} />

        {/* 工具情报 */}
        <ToolNews data={reportData.toolNews} />

        {/* 实战干货 */}
        <Practice data={reportData.practice} />

        {/* 行业动态 */}
        <Industry data={reportData.industry} />

        {/* 问答精选 */}
        <QA data={reportData.qa} />

        {/* 风险提醒 */}
        <RiskWarning data={reportData.riskWarning} />
      </div>

      <style jsx>{`
        .content {
          flex: 1;
          min-width: 0;
        }

        .section {
          background: white;
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 20px;
          border: 1px solid #e5e7eb;
          scroll-margin-top: 90px;
          transition: all 0.2s ease;
        }

        .section:hover {
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
        }

        .section-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
          padding-bottom: 16px;
          border-bottom: 1px solid #e5e7eb;
        }

        .section-icon {
          font-size: 24px;
        }

        .section-title {
          font-size: 20px;
          font-weight: 700;
          color: #111827;
          flex: 1;
        }

        .highlights-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .highlight-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 12px;
          background: #f3f4f6;
          border-radius: 8px;
          font-size: 15px;
          color: #4b5563;
          line-height: 1.5;
          transition: all 0.2s ease;
        }

        .highlight-item:hover {
          background: #f8f9fa;
          transform: translateX(4px);
        }

        .highlight-bullet {
          color: #579d8d;
          font-weight: 700;
          flex-shrink: 0;
        }

        .error-container, .loading {
          text-align: center;
          padding: 80px 20px;
          color: #6b7280;
        }

        .error-container h1 {
          font-size: 48px;
          margin-bottom: 20px;
        }
      `}</style>
    </Layout>
  );
}

// 服务端渲染 - 获取静态路径
export async function getStaticPaths() {
  const dataDir = path.join(process.cwd(), 'data');
  let paths = [];

  try {
    const indexPath = path.join(dataDir, 'index.json');
    const indexData = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
    
    paths = indexData.reports.map(report => ({
      params: { date: report.date }
    }));
  } catch (error) {
    console.error('Error reading index.json:', error);
  }

  return {
    paths,
    fallback: false // 仅支持预定义的路径
  };
}

// 服务端渲染 - 获取静态属性
export async function getStaticProps({ params }) {
  const { date } = params;
  const dataDir = path.join(process.cwd(), 'data');

  try {
    // 读取可用日期列表
    const indexPath = path.join(dataDir, 'index.json');
    const indexData = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
    const availableDates = indexData.reports;

    // 读取具体日期的数据
    const reportPath = path.join(dataDir, `${date}.json`);
    
    if (!fs.existsSync(reportPath)) {
      return {
        props: {
          error: true,
          availableDates,
        }
      };
    }

    const reportData = JSON.parse(fs.readFileSync(reportPath, 'utf8'));

    return {
      props: {
        reportData,
        availableDates,
      },
    };
  } catch (error) {
    console.error('Error loading report data:', error);
    return {
      props: {
        error: true,
        availableDates: [],
      },
    };
  }
}