import { useState } from 'react';

export default function HotTopics({ data = [] }) {
  const [expandedInsights, setExpandedInsights] = useState(new Set());

  if (!data || data.length === 0) {
    return null;
  }

  const toggleInsight = (index) => {
    const newExpanded = new Set(expandedInsights);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedInsights(newExpanded);
  };

  return (
    <section id="hot-topics" className="section">
      <div className="section-header">
        <span className="section-icon">🔥</span>
        <h2 className="section-title">热门话题 (TOP {data.length})</h2>
      </div>
      
      <div className="hot-topics-grid">
        {data.map((topic, index) => (
          <div key={index} className="hot-topic-card">
            <div className="hot-topic-header">
              <div className="hot-topic-number">{index + 1}</div>
              <h3 className="hot-topic-title">{topic.title}</h3>
            </div>
            
            <p className="hot-topic-content">{topic.content}</p>
            
            <div className="hot-topic-meta">
              {topic.keyData && (
                <span className="hot-topic-meta-item">
                  <span className="meta-icon">📊</span>
                  <span>{topic.keyData}</span>
                </span>
              )}
              {topic.source && (
                <span className="hot-topic-meta-item">
                  <span className="meta-icon">💬</span>
                  <span>
                    {typeof topic.source === 'string' 
                      ? topic.source 
                      : topic.source.name + (topic.source.author ? ` - ${topic.source.author}` : '')}
                  </span>
                </span>
              )}
              {topic.tools && (
                <span className="hot-topic-meta-item">
                  <span className="meta-icon">🛠</span>
                  <span>{topic.tools}</span>
                </span>
              )}
              {topic.insight && (
                <div className="topic-insight-wrapper">
                  <button 
                    className="insight-toggle"
                    onClick={() => toggleInsight(index)}
                  >
                    <span className="toggle-icon">💡</span>
                    <span className="toggle-text">
                      {expandedInsights.has(index) ? '收起洞察' : '展开洞察'}
                    </span>
                    <span className="toggle-arrow">
                      {expandedInsights.has(index) ? '▲' : '▼'}
                    </span>
                  </button>
                  {expandedInsights.has(index) && (
                    <div className="topic-insight">
                      <span>{topic.insight}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .section {
          background: #ffffff;
          border-radius: 24px;
          padding: 40px;
          margin-bottom: 32px;
          border: 1px solid rgba(0, 0, 0, 0.06);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          scroll-margin-top: 90px;
          transition: all 0.3s ease;
          position: relative;
        }

        .section:hover {
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
          transform: translateY(-2px);
        }

        .section-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 32px;
          padding-bottom: 24px;
          border-bottom: 2px solid #f0f0f0;
        }

        .section-icon {
          font-size: 24px;
        }

        .section-title {
          font-size: 24px;
          font-weight: 700;
          color: #222222;
          flex: 1;
          letter-spacing: -0.5px;
        }

        .hot-topics-grid {
          display: grid;
          gap: 20px;
        }

        .hot-topic-card {
          background: #fafafa;
          border-radius: 16px;
          padding: 28px;
          border: 1px solid rgba(0, 0, 0, 0.04);
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          position: relative;
        }


        .hot-topic-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
          border-color: rgba(0, 169, 104, 0.2);
        }


        .hot-topic-card:active {
          transform: translateY(0);
        }

        .hot-topic-header {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 12px;
        }

        .hot-topic-number {
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, #00a968 0%, #00c97a 100%);
          color: white;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 16px;
          flex-shrink: 0;
          box-shadow: 0 3px 8px rgba(0, 169, 104, 0.3);
        }

        .hot-topic-title {
          font-size: 16px;
          font-weight: 600;
          color: #212121;
          line-height: 1.4;
        }

        .hot-topic-content {
          font-size: 15px;
          color: #333333;
          line-height: 1.7;
          margin-bottom: 20px;
          font-weight: 400;
        }

        .hot-topic-meta {
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-size: 13px;
          color: #9e9e9e;
        }

        .hot-topic-meta-item {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .meta-icon {
          font-size: 14px;
        }

        .topic-insight-wrapper {
          margin-top: 12px;
        }

        .insight-toggle {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          background: transparent;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          font-size: 13px;
          color: #666666;
          cursor: pointer;
          transition: all 0.2s ease;
          width: 100%;
          text-align: left;
        }

        .insight-toggle:hover {
          background: #f5f5f5;
          border-color: #00a968;
          color: #00a968;
        }

        .toggle-icon {
          font-size: 14px;
        }

        .toggle-text {
          flex: 1;
          font-weight: 500;
        }

        .toggle-arrow {
          font-size: 12px;
          color: #999999;
        }

        .topic-insight {
          margin-top: 8px;
          padding: 12px 16px;
          background: rgba(0, 169, 104, 0.08);
          border-radius: 10px;
          border-left: 3px solid #00a968;
          font-size: 14px;
          color: #333333;
          line-height: 1.6;
          animation: slideDown 0.3s ease;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .hot-topic-card {
            padding: 16px;
          }

          .hot-topic-title {
            font-size: 16px;
          }

          .hot-topic-content {
            font-size: 14px;
          }

          .hot-topic-meta {
            font-size: 12px;
          }
        }
      `}</style>
    </section>
  );
}