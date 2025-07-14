import { useState } from 'react';

export default function QA({ data = [] }) {
  const [expandedItems, setExpandedItems] = useState(new Set());

  if (!data || data.length === 0) {
    return null;
  }

  const toggleItem = (index) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  return (
    <section id="qa" className="section">
      <div className="section-header">
        <span className="section-icon">💬</span>
        <h2 className="section-title">问答精选</h2>
      </div>
      
      <div className="qa-list">
        {data.map((item, index) => (
          <div 
            key={index} 
            className={`qa-item ${expandedItems.has(index) ? 'expanded' : ''}`}
          >
            <div 
              className="qa-question"
              onClick={() => toggleItem(index)}
            >
              <span className="question-text">{item.question}</span>
              <span className="qa-toggle">
                {expandedItems.has(index) ? '▲' : '▼'}
              </span>
            </div>
            
            <div className="qa-answer">
              {item.description && (
                <div className="qa-description">
                  <strong>问题描述：</strong>{item.description}
                </div>
              )}
              <div className="qa-answer-content">
                {item.answer}
              </div>
              
              {item.source && (
                <div className="qa-source">
                  <span className="source-label">来源：</span>
                  <span className="source-name">{item.source.name}</span>
                  {item.source.questioner && (
                    <>
                      <span className="source-divider">·</span>
                      <span className="source-role">提问者：{item.source.questioner}</span>
                    </>
                  )}
                  {item.source.answerer && (
                    <>
                      <span className="source-divider">·</span>
                      <span className="source-role">回答者：{item.source.answerer}</span>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
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

        .qa-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .qa-item {
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          overflow: hidden;
          transition: all 0.2s ease;
          background: white;
        }

        .qa-item:hover {
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
          border-color: #8b5cf6;
        }

        .qa-question {
          padding: 16px;
          background: #f3f4f6;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: all 0.2s ease;
          user-select: none;
          position: relative;
          overflow: hidden;
        }

        .qa-question::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.1), transparent);
          transition: left 0.6s ease;
        }

        .qa-question:hover {
          background: #f8f9fa;
        }

        .qa-question:hover::before {
          left: 100%;
        }

        .qa-question:active {
          background: #f3f4f6;
        }

        .question-text {
          font-weight: 600;
          color: #111827;
          font-size: 16px;
          line-height: 1.4;
          flex: 1;
          position: relative;
          z-index: 1;
        }

        .qa-toggle {
          color: #6b7280;
          transition: all 0.2s ease;
          font-size: 14px;
          font-weight: 700;
          position: relative;
          z-index: 1;
        }

        .qa-item.expanded .qa-toggle {
          color: #8b5cf6;
        }

        .qa-answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease, padding 0.3s ease;
        }

        .qa-item.expanded .qa-answer {
          max-height: 1000px;
          padding: 16px;
        }

        .qa-description {
          padding: 12px;
          background: #f3f4f6;
          border-radius: 8px;
          margin-bottom: 12px;
          font-size: 14px;
          color: #4b5563;
          line-height: 1.5;
        }

        .qa-answer-content {
          font-size: 15px;
          color: #4b5563;
          line-height: 1.6;
          position: relative;
          padding-left: 20px;
        }

        .qa-answer-content::before {
          content: '💡';
          position: absolute;
          left: 0;
          top: 0;
          font-size: 16px;
        }

        .qa-source {
          margin-top: 12px;
          padding-top: 12px;
          border-top: 1px solid #e5e7eb;
          font-size: 13px;
          color: #6b7280;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 4px;
        }

        .source-label {
          font-weight: 500;
        }

        .source-name {
          color: #4b5563;
          font-weight: 600;
        }

        .source-divider {
          color: #d1d5db;
        }

        .source-role {
          color: #8b5cf6;
          font-weight: 500;
        }

        /* 动画效果 */
        .qa-item {
          animation: fadeInUp 0.3s ease;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .qa-question {
            padding: 12px;
          }

          .question-text {
            font-size: 15px;
          }

          .qa-item.expanded .qa-answer {
            padding: 12px;
          }

          .qa-answer-content {
            font-size: 14px;
          }
        }
      `}</style>
    </section>
  );
}