export default function Industry({ data = {} }) {
  // 兼容旧数据格式（数组）和新数据格式（对象）
  const items = Array.isArray(data) ? data : [];
  const companies = !Array.isArray(data) ? (data.companies || []) : [];
  const products = !Array.isArray(data) ? (data.products || []) : [];
  const revenue = !Array.isArray(data) ? (data.revenue || []) : [];
  
  const allItems = [...items, ...companies, ...products, ...revenue];
  
  if (allItems.length === 0) {
    return null;
  }

  return (
    <section id="industry" className="section">
      <div className="section-header">
        <span className="section-icon">📊</span>
        <h2 className="section-title">行业动态</h2>
      </div>
      
      {/* 公司动态 */}
      {companies.length > 0 && (
        <>
          <h3 className="subsection-title">公司动态</h3>
          <div className="industry-list">
            {companies.map((item, index) => (
              <div key={`company-${index}`} className="industry-item">
                <div className="industry-icon">
                  🏢
                </div>
                <div className="industry-content">
                  <div className="industry-header">
                    <h4 className="industry-title">{item.company}</h4>
                  </div>
                  <p className="industry-description">{item.news}</p>
                  {item.source && (
                    <div className="industry-source">
                      <span className="source-label">来源：</span>
                      <span className="source-value">
                        {typeof item.source === 'string' 
                          ? item.source 
                          : item.source.name}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* 产品发布 */}
      {products.length > 0 && (
        <>
          <h3 className="subsection-title" style={{marginTop: companies.length > 0 ? '32px' : '0'}}>
            产品发布
          </h3>
          <div className="industry-list">
            {products.map((item, index) => (
              <div key={`product-${index}`} className="industry-item">
                <div className="industry-icon">
                  🚀
                </div>
                <div className="industry-content">
                  <div className="industry-header">
                    <h4 className="industry-title">{item.name}</h4>
                  </div>
                  <p className="industry-description">{item.description}</p>
                  {item.source && (
                    <div className="industry-source">
                      <span className="source-label">来源：</span>
                      <span className="source-value">
                        {typeof item.source === 'string' 
                          ? item.source 
                          : item.source.name}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* 收入数据 */}
      {revenue.length > 0 && (
        <>
          <h3 className="subsection-title" style={{marginTop: (companies.length > 0 || products.length > 0) ? '32px' : '0'}}>
            收入动态
          </h3>
          <div className="industry-list">
            {revenue.map((item, index) => (
              <div key={`revenue-${index}`} className="industry-item">
                <div className="industry-icon">
                  💰
                </div>
                <div className="industry-content">
                  <div className="industry-header">
                    <h4 className="industry-title">{item.company}</h4>
                  </div>
                  <p className="industry-description">{item.data}</p>
                  {item.source && (
                    <div className="industry-source">
                      <span className="source-label">来源：</span>
                      <span className="source-value">
                        {typeof item.source === 'string' 
                          ? item.source 
                          : item.source.name}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* 兼容旧格式 */}
      {items.length > 0 && (
        <div className="industry-list">
          {items.map((item, index) => (
            <div key={`item-${index}`} className="industry-item">
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
      )}

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

        .subsection-title {
          font-size: 16px;
          font-weight: 600;
          color: #374151;
          margin-bottom: 16px;
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
          border: 1px solid transparent;
          transition: all 0.2s ease;
        }

        .industry-item:hover {
          background: #f7f7f7;
          border-color: #00a968;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 169, 104, 0.1);
        }

        .industry-icon {
          width: 36px;
          height: 36px;
          background: #f3f4f6;
          color: #6b7280;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 16px;
          flex-shrink: 0;
        }

        .industry-content {
          flex: 1;
        }

        .industry-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 8px;
        }

        .industry-title {
          font-size: 16px;
          font-weight: 600;
          color: #111827;
          line-height: 1.4;
        }

        .industry-type {
          padding: 3px 10px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
        }

        .type-funding {
          background: #dbeafe;
          color: #1e40af;
        }

        .type-acquisition {
          background: #f3e8ff;
          color: #6b21a8;
        }

        .type-product {
          background: #d1fae5;
          color: #065f46;
        }

        .type-partnership {
          background: #fed7aa;
          color: #92400e;
        }

        .industry-description {
          font-size: 14px;
          color: #4b5563;
          line-height: 1.6;
          margin-bottom: 12px;
        }

        .industry-highlight {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: #059669;
          margin-bottom: 8px;
        }

        .highlight-icon {
          font-size: 14px;
        }

        .highlight-text {
          font-weight: 500;
        }

        .industry-insight {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          padding: 12px;
          background: rgba(0, 169, 104, 0.08);
          border-radius: 8px;
          border-left: 3px solid #00a968;
          margin-top: 12px;
        }

        .insight-icon {
          font-size: 14px;
          margin-top: 2px;
        }

        .insight-text {
          font-size: 13px;
          color: #374151;
          line-height: 1.5;
        }

        .industry-source {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          color: #9ca3af;
          margin-top: 8px;
        }

        .source-label {
          color: #9ca3af;
        }

        .source-value {
          color: #6b7280;
        }

        @media (max-width: 768px) {
          .section {
            padding: 20px;
          }

          .industry-item {
            padding: 16px;
          }

          .industry-title {
            font-size: 15px;
          }

          .industry-description {
            font-size: 13px;
          }
        }
      `}</style>
    </section>
  );
}

function getTypeLabel(type) {
  const typeMap = {
    funding: '融资',
    acquisition: '收购',
    product: '产品',
    partnership: '合作'
  };
  return typeMap[type] || type;
}