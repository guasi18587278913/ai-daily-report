export default function ToolNews({ data = {} }) {
  // 兼容旧数据格式（数组）和新数据格式（对象）
  const tools = Array.isArray(data) ? data : (data.newTools || []);
  const tips = !Array.isArray(data) ? (data.tips || []) : [];
  
  if ((!tools || tools.length === 0) && (!tips || tips.length === 0)) {
    return null;
  }

  return (
    <section id="tools" className="section">
      <div className="section-header">
        <span className="section-icon">🛠</span>
        <h2 className="section-title">工具情报</h2>
      </div>
      
      {/* 新工具部分 */}
      {tools.length > 0 && (
        <>
          <h3 className="subsection-title">新工具/新功能</h3>
          <div className="tools-list">
            {tools.map((tool, index) => (
              <div key={index} className="tool-item">
                <div className="tool-icon">
                  {index + 1}
                </div>
                <div className="tool-content">
                  <h4 className="tool-name">
                    {tool.name}
                    {tool.isNew && <span className="tag tag-new">新工具</span>}
                    {tool.isUpdate && <span className="tag tag-update">更新</span>}
                    {tool.isHot && <span className="tag tag-hot">热门</span>}
                  </h4>
                  {tool.description && (
                    <p className="tool-description">{tool.description}</p>
                  )}
                  {tool.highlight && (
                    <p className="tool-highlight">
                      <strong>亮点：</strong>{tool.highlight}
                    </p>
                  )}
                  {tool.features && tool.features.length > 0 && (
                    <ul className="tool-features">
                      {tool.features.map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                  )}
                  {tool.pricing && (
                    <div className="tool-pricing">
                      <span className="pricing-label">价格：</span>
                      <span className="pricing-value">{tool.pricing}</span>
                    </div>
                  )}
                  {tool.source && (
                    <div className="tool-source">
                      <span className="source-label">来源：</span>
                      <span className="source-value">
                        {typeof tool.source === 'string' 
                          ? tool.source 
                          : tool.source.name + (tool.source.author ? ` - ${tool.source.author}` : '')}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* 使用技巧部分 */}
      {tips.length > 0 && (
        <>
          <h3 className="subsection-title" style={{marginTop: tools.length > 0 ? '32px' : '0'}}>
            使用技巧
          </h3>
          <div className="tips-list">
            {tips.map((tip, index) => (
              <div key={index} className="tip-item">
                <div className="tip-header">
                  <span className="tip-icon">💡</span>
                  <h4 className="tip-title">{tip.title}</h4>
                </div>
                <p className="tip-content">{tip.content}</p>
                {tip.source && (
                  <div className="tip-source">
                    <span className="source-label">来源：</span>
                    <span className="source-value">
                      {typeof tip.source === 'string' 
                        ? tip.source 
                        : tip.source.name + (tip.source.author ? ` - ${tip.source.author}` : '')}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
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

        .tools-list, .tips-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .tool-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 20px;
          background: #fafafa;
          border-radius: 16px;
          border: 1px solid transparent;
          transition: all 0.2s ease;
        }

        .tool-item:hover {
          background: #f7f7f7;
          border-color: #00a968;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 169, 104, 0.1);
        }

        .tool-icon {
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, #00a968 0%, #00c97a 100%);
          color: white;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 14px;
          flex-shrink: 0;
        }

        .tool-content {
          flex: 1;
        }

        .tool-name {
          font-size: 16px;
          font-weight: 600;
          color: #111827;
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .tag {
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
        }

        .tag-new {
          background: #10b981;
          color: white;
        }

        .tag-update {
          background: #3b82f6;
          color: white;
        }

        .tag-hot {
          background: #ef4444;
          color: white;
        }

        .tool-description {
          font-size: 14px;
          color: #4b5563;
          line-height: 1.6;
          margin-bottom: 8px;
        }

        .tool-highlight {
          font-size: 14px;
          color: #059669;
          line-height: 1.6;
          margin-bottom: 8px;
        }

        .tool-features {
          margin: 8px 0;
          padding-left: 20px;
        }

        .tool-features li {
          font-size: 13px;
          color: #6b7280;
          line-height: 1.8;
        }

        .tool-pricing {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 13px;
          margin-top: 8px;
        }

        .pricing-label {
          color: #6b7280;
        }

        .pricing-value {
          color: #111827;
          font-weight: 600;
        }

        .tool-source, .tip-source {
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

        /* 使用技巧样式 */
        .tip-item {
          padding: 20px;
          background: #f9fafb;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          transition: all 0.2s ease;
        }

        .tip-item:hover {
          background: #f3f4f6;
          border-color: #00a968;
          transform: translateY(-2px);
        }

        .tip-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
        }

        .tip-icon {
          font-size: 20px;
        }

        .tip-title {
          font-size: 15px;
          font-weight: 600;
          color: #111827;
        }

        .tip-content {
          font-size: 14px;
          color: #4b5563;
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .section {
            padding: 20px;
          }

          .tool-item {
            padding: 16px;
          }

          .tool-name {
            font-size: 15px;
          }

          .tool-description, .tip-content {
            font-size: 13px;
          }
        }
      `}</style>
    </section>
  );
}