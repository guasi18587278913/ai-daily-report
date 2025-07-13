export default function RiskWarning({ data = [] }) {
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <section id="risk-warning" className="section">
      <div className="section-header">
        <span className="section-icon">⚠️</span>
        <h2 className="section-title">风险提示</h2>
      </div>
      
      <div className="risk-list">
        {data.map((risk, index) => (
          <div key={index} className={`risk-item severity-${risk.severity || 'medium'}`}>
            <div className="risk-icon">
              {index + 1}
            </div>
            <div className="risk-content">
              <div className="risk-header">
                <h4 className="risk-title">{risk.title || risk.name}</h4>
                <span className={`risk-level level-${risk.severity || 'medium'}`}>
                  {getSeverityLabel(risk.severity)}
                </span>
              </div>
              
              <p className="risk-description">
                {risk.description || risk.content}
              </p>
              
              {risk.impact && (
                <div className="risk-section">
                  <h5 className="section-label">影响范围</h5>
                  <p className="section-content">{risk.impact}</p>
                </div>
              )}
              
              {risk.timeframe && (
                <div className="risk-section">
                  <h5 className="section-label">时间窗口</h5>
                  <p className="section-content">{risk.timeframe}</p>
                </div>
              )}
              
              {risk.suggestion && (
                <div className="risk-suggestion">
                  <span className="suggestion-icon">▶</span>
                  <span className="suggestion-text">{risk.suggestion}</span>
                </div>
              )}
              
              {risk.preventive && (
                <div className="risk-preventive">
                  <span className="preventive-icon">▶</span>
                  <span className="preventive-text">{risk.preventive}</span>
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

        .risk-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .risk-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 16px;
          background: #f3f4f6;
          border-radius: 10px;
          transition: all 0.2s ease;
          border-left: 4px solid transparent;
        }

        .severity-high {
          border-left-color: #ef4444;
          background: linear-gradient(135deg, rgba(239, 68, 68, 0.05), rgba(239, 68, 68, 0.02));
        }

        .severity-medium {
          border-left-color: #f59e0b;
          background: linear-gradient(135deg, rgba(245, 158, 11, 0.05), rgba(245, 158, 11, 0.02));
        }

        .severity-low {
          border-left-color: #10b981;
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.05), rgba(16, 185, 129, 0.02));
        }

        .risk-item:hover {
          background: #f8f9fa;
          transform: translateX(2px);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .risk-icon {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #ff4d4f 0%, #ff6b6d 100%);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          font-weight: 700;
          color: white;
          flex-shrink: 0;
          box-shadow: 0 2px 6px rgba(255, 77, 79, 0.25);
        }

        .risk-content {
          flex: 1;
          min-width: 0;
        }

        .risk-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 8px;
          flex-wrap: wrap;
        }

        .risk-title {
          font-size: 16px;
          font-weight: 600;
          color: #111827;
          line-height: 1.3;
        }

        .risk-level {
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          flex-shrink: 0;
        }

        .level-high {
          background: rgba(239, 68, 68, 0.1);
          color: #dc2626;
        }

        .level-medium {
          background: rgba(245, 158, 11, 0.1);
          color: #d97706;
        }

        .level-low {
          background: rgba(16, 185, 129, 0.1);
          color: #059669;
        }

        .risk-description {
          font-size: 14px;
          color: #4b5563;
          line-height: 1.5;
          margin-bottom: 12px;
        }

        .risk-section {
          margin-bottom: 12px;
        }

        .section-label {
          font-size: 12px;
          font-weight: 700;
          color: #6b7280;
          margin-bottom: 4px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .section-content {
          font-size: 14px;
          color: #4b5563;
          line-height: 1.5;
        }

        .risk-suggestion {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          margin-top: 12px;
          padding: 12px;
          background: rgba(59, 130, 246, 0.1);
          border-radius: 8px;
          border-left: 3px solid #3b82f6;
        }

        .suggestion-icon {
          font-size: 12px;
          color: #3b82f6;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .suggestion-text {
          font-size: 14px;
          color: #4b5563;
          line-height: 1.5;
        }

        .risk-preventive {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          margin-top: 8px;
          padding: 12px;
          background: rgba(16, 185, 129, 0.1);
          border-radius: 8px;
          border-left: 3px solid #10b981;
        }

        .preventive-icon {
          font-size: 12px;
          color: #10b981;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .preventive-text {
          font-size: 14px;
          color: #4b5563;
          line-height: 1.5;
        }

        /* 动画效果 */
        .risk-item {
          animation: slideInLeft 0.3s ease;
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @media (max-width: 768px) {
          .risk-item {
            flex-direction: column;
            gap: 12px;
          }

          .risk-header {
            flex-direction: column;
            gap: 8px;
          }

          .risk-level {
            align-self: flex-start;
          }
        }
      `}</style>
    </section>
  );
}


// 获取风险等级标签
function getSeverityLabel(severity) {
  const labels = {
    high: '高风险',
    medium: '中风险',
    low: '低风险'
  };
  return labels[severity] || '中风险';
}