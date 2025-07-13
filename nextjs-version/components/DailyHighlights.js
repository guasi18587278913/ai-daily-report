import { useState } from 'react';

export default function DailyHighlights({ highlights = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!highlights || highlights.length === 0) {
    return null;
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? highlights.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === highlights.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="highlights-section">
      <div className="section-header">
        <h1 className="section-title">
          <span className="title-icon">📌</span>
          今日要点
        </h1>
        <span className="subtitle">精选 {highlights.length} 条关键资讯</span>
      </div>

      {/* 桌面端：一行式摘要列表 */}
      <div className="highlights-list desktop-only">
        {highlights.map((item, index) => (
          <div key={index} className="highlight-item">
            <span className="highlight-number">{index + 1}</span>
            <span className="highlight-text">{item}</span>
          </div>
        ))}
      </div>

      {/* 移动端：滑动卡片 */}
      <div className="highlights-carousel mobile-only">
        <button className="carousel-btn prev" onClick={handlePrev}>‹</button>
        <div className="carousel-content">
          <div className="highlight-card">
            <span className="card-number">{currentIndex + 1}/{highlights.length}</span>
            <p className="card-text">{highlights[currentIndex]}</p>
          </div>
        </div>
        <button className="carousel-btn next" onClick={handleNext}>›</button>
      </div>

      <style jsx>{`
        .highlights-section {
          background: #ffffff;
          border-radius: 24px;
          padding: 32px;
          margin-bottom: 32px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          border: 1px solid rgba(0, 0, 0, 0.06);
          transition: all 0.3s ease;
        }

        .highlights-section:hover {
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
          transform: translateY(-2px);
        }

        .section-header {
          display: flex;
          align-items: baseline;
          gap: 16px;
          margin-bottom: 28px;
          padding-bottom: 20px;
          border-bottom: 2px solid #f0f0f0;
        }

        .section-title {
          font-size: 28px;
          font-weight: 800;
          color: #222222;
          letter-spacing: -0.5px;
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 0;
        }

        .title-icon {
          font-size: 24px;
        }

        .subtitle {
          font-size: 14px;
          color: #666666;
          font-weight: 400;
        }

        /* 桌面端列表样式 */
        .highlights-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .highlight-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 20px;
          background: #fafafa;
          border-radius: 12px;
          transition: all 0.2s ease;
          cursor: pointer;
        }

        .highlight-item:hover {
          background: #f5f5f5;
          transform: translateX(8px);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        }

        .highlight-number {
          width: 28px;
          height: 28px;
          background: linear-gradient(135deg, #00a968 0%, #00c97a 100%);
          color: white;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 14px;
          flex-shrink: 0;
          box-shadow: 0 2px 6px rgba(0, 169, 104, 0.25);
        }

        .highlight-text {
          font-size: 16px;
          color: #333333;
          line-height: 1.5;
          font-weight: 500;
        }

        /* 移动端轮播样式 */
        .highlights-carousel {
          display: none;
          align-items: center;
          gap: 16px;
        }

        .carousel-btn {
          width: 40px;
          height: 40px;
          border: none;
          background: #f5f5f5;
          color: #666666;
          border-radius: 50%;
          font-size: 20px;
          cursor: pointer;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }

        .carousel-btn:hover {
          background: #00a968;
          color: white;
          transform: scale(1.1);
        }

        .carousel-content {
          flex: 1;
          overflow: hidden;
        }

        .highlight-card {
          background: linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%);
          border-radius: 16px;
          padding: 24px;
          text-align: center;
          position: relative;
        }

        .card-number {
          position: absolute;
          top: 12px;
          right: 12px;
          font-size: 12px;
          color: #999999;
          font-weight: 500;
        }

        .card-text {
          font-size: 18px;
          color: #333333;
          line-height: 1.6;
          font-weight: 500;
          margin: 0;
        }

        /* 响应式 */
        .desktop-only {
          display: flex;
        }
        .mobile-only {
          display: none;
        }

        @media (max-width: 768px) {
          .desktop-only {
            display: none;
          }
          .mobile-only {
            display: flex;
          }

          .highlights-section {
            padding: 24px 20px;
            border-radius: 20px;
          }

          .section-title {
            font-size: 24px;
          }

          .card-text {
            font-size: 16px;
          }
        }
      `}</style>
    </section>
  );
}