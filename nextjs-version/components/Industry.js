export default function Industry({ data = [] }) {
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <section id="industry" className="section">
      <div className="section-header">
        <span className="section-icon">📊</span>
        <h2 className="section-title">行业动态</h2>
      </div>
      
      <div className="industry-list">
        {data.map((item, index) => (
          <div key={index} className="industry-item">
            <div className="industry-icon">
              {index + 1}
            </div>
            <div className="industry-content">
              <div className="industry-header">
                <h4 className="industry-title">{item.title || item.name}</h4>
                {item.type && (
                  <span className={`industry-type type-${item.type}`}>
                    {getTypeLabel(item.type)}
                  </span>
                )}
              </div>
              
              <p className="industry-description">
                {item.description || item.content}
              </p>
              
              {item.amount && (
                <div className="industry-highlight">
                  <span className="highlight-icon">💰</span>
                  <span className="highlight-text">交易金额：{item.amount}</span>
                </div>
              )}
              
              {item.impact && (
                <div className="industry-highlight">
                  <span className="highlight-icon">📈</span>
                  <span className="highlight-text">影响：{item.impact}</span>
                </div>
              )}
              
              {item.significance && (
                <div className="industry-insight">
                  <span className="insight-icon">🎯</span>
                  <span className="insight-text">{item.significance}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .section {
          background: #ffffff;
          border-radius: 20px;
          padding: 32px;
          margin-bottom: 24px;
          border: 1px solid #f0f0f0;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
          scroll-margin-top: 90px;
          transition: all 0.3s ease;
        }

        .section:hover {
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
        }

        .section-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
        }

        .section-icon {
          font-size: 24px;
        }

        .section-title {
          font-size: 20px;
          font-weight: 600;
          color: #212121;
          flex: 1;
        }

        .industry-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .industry-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 20px;
          background: #fafafa;
          border-radius: 16px;
          transition: all 0.2s ease;
          border: 1px solid #f0f0f0;
        }

        .industry-item:hover {
          transform: translateX(4px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        .industry-icon {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #00a968 0%, #00c97a 100%);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          font-weight: 700;
          color: white;
          flex-shrink: 0;
          box-shadow: 0 2px 6px rgba(0, 169, 104, 0.25);
        }

        .industry-content {
          flex: 1;
          min-width: 0;
        }

        .industry-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 8px;
          flex-wrap: wrap;
        }

        .industry-title {
          font-size: 16px;
          font-weight: 600;
          color: #111827;
          line-height: 1.3;
        }

        .industry-type {
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          flex-shrink: 0;
        }

        .type-merger {
          background: rgba(255, 77, 79, 0.1);
          color: #ff4d4f;
        }

        .type-funding {
          background: rgba(82, 196, 26, 0.1);
          color: #52c41a;
        }

        .type-layoff {
          background: rgba(250, 173, 20, 0.1);
          color: #faad14;
        }

        .type-product {
          background: rgba(24, 144, 255, 0.1);
          color: #1890ff;
        }

        .type-partnership {
          background: rgba(114, 46, 209, 0.1);
          color: #722ed1;
        }

        .industry-description {
          font-size: 14px;
          color: #4b5563;
          line-height: 1.5;
          margin-bottom: 12px;
        }

        .industry-highlight {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-right: 16px;
          margin-bottom: 8px;
          font-size: 14px;
        }

        .highlight-icon {
          font-size: 16px;
        }

        .highlight-text {
          color: #00a968;
          font-weight: 500;
        }

        .industry-insight {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          margin-top: 12px;
          padding: 12px 16px;
          background: rgba(0, 169, 104, 0.08);
          border-radius: 10px;
          border-left: 3px solid #00a968;
        }

        .insight-icon {
          font-size: 16px;
          color: #3b82f6;
          flex-shrink: 0;
        }

        .insight-text {
          font-size: 14px;
          color: #4b5563;
          line-height: 1.5;
        }

        @media (max-width: 768px) {
          .industry-item {
            flex-direction: column;
            gap: 12px;
          }

          .industry-header {
            flex-direction: column;
            gap: 8px;
          }

          .industry-type {
            align-self: flex-start;
          }
        }
      `}</style>
    </section>
  );
}


// 获取类型标签
function getTypeLabel(type) {
  const labels = {
    merger: '收购',
    funding: '融资',
    layoff: '裁员',
    product: '发布',
    partnership: '合作'
  };
  return labels[type] || type;
}