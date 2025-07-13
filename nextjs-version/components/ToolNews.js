export default function ToolNews({ data = [] }) {
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <section id="tools" className="section">
      <div className="section-header">
        <span className="section-icon">🛠</span>
        <h2 className="section-title">工具情报</h2>
      </div>
      
      <div className="tools-list">
        {data.map((tool, index) => (
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

        .tools-list {
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
          border: 1px solid #f0f0f0;
          transition: all 0.2s ease;
          cursor: pointer;
        }

        .tool-item:hover {
          background: #f8f9fa;
          transform: translateX(4px);
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        }

        .tool-item:active {
          transform: translateX(2px);
        }

        .tool-icon {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #00a968 0%, #00c97a 100%);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          font-weight: 700;
          flex-shrink: 0;
          color: white;
          box-shadow: 0 2px 6px rgba(0, 169, 104, 0.25);
        }

        .tool-content {
          flex: 1;
          min-width: 0;
        }

        .tool-name {
          font-size: 16px;
          font-weight: 600;
          color: #111827;
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .tool-description {
          font-size: 14px;
          color: #4b5563;
          line-height: 1.5;
          margin-bottom: 8px;
        }

        .tool-highlight {
          font-size: 14px;
          color: #4b5563;
          line-height: 1.5;
          margin-bottom: 8px;
        }

        .tool-features {
          font-size: 14px;
          color: #4b5563;
          margin: 8px 0;
          padding-left: 16px;
        }

        .tool-features li {
          margin-bottom: 4px;
        }

        .tool-pricing {
          font-size: 14px;
          margin-top: 8px;
        }

        .pricing-label {
          color: #6b7280;
        }

        .pricing-value {
          color: #579d8d;
          font-weight: 600;
        }

        .tool-action {
          flex-shrink: 0;
        }

        .tool-link {
          padding: 8px 16px;
          background: #00a968;
          color: white;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .tool-link:hover {
          background: #009960;
          transform: translateY(-1px);
        }

        .tag {
          display: inline-flex;
          align-items: center;
          padding: 3px 10px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 500;
        }

        .tag-new {
          background: #00a968;
          color: white;
        }

        .tag-update {
          background: #ffb800;
          color: #5d4e00;
        }

        .tag-hot {
          background: #ff4d4f;
          color: white;
        }

        @media (max-width: 768px) {
          .tool-item {
            flex-direction: column;
            gap: 12px;
          }

          .tool-action {
            align-self: flex-start;
          }
        }
      `}</style>
    </section>
  );
}
