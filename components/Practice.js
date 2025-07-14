export default function Practice({ data = [] }) {
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <section id="practice" className="section">
      <div className="section-header">
        <span className="section-icon">💡</span>
        <h2 className="section-title">实战干货</h2>
      </div>
      
      <div className="practice-list">
        {data.map((item, index) => (
          <div key={index} className="practice-item">
            <div className="practice-icon">
              {index + 1}
            </div>
            <div className="practice-content">
              <h4 className="practice-title">{item.title || item.name}</h4>
              
              {item.scene && (
                <div className="practice-section">
                  <h5 className="section-label">应用场景</h5>
                  <p className="section-content">{item.scene}</p>
                </div>
              )}
              
              {item.method && (
                <div className="practice-section">
                  <h5 className="section-label">实现方法</h5>
                  <p className="section-content">{item.method}</p>
                </div>
              )}
              
              {item.result && (
                <div className="practice-section">
                  <h5 className="section-label">实现效果</h5>
                  <p className="section-content">{item.result}</p>
                </div>
              )}
              
              {item.effect && (
                <div className="practice-section">
                  <h5 className="section-label">效果</h5>
                  <p className="section-content">{item.effect}</p>
                </div>
              )}
              
              {item.keyData && (
                <div className="practice-section">
                  <h5 className="section-label">关键数据</h5>
                  <p className="section-content">{item.keyData}</p>
                </div>
              )}
              
              {item.successFactors && (
                <div className="practice-section">
                  <h5 className="section-label">成功要素</h5>
                  <p className="section-content">{item.successFactors}</p>
                </div>
              )}
              
              {item.insights && (
                <div className="practice-section">
                  <h5 className="section-label">可复用经验</h5>
                  <p className="section-content insights">{item.insights}</p>
                </div>
              )}
              
              {item.learnings && (
                <div className="practice-section">
                  <h5 className="section-label">可借鉴点</h5>
                  <p className="section-content insights">{item.learnings}</p>
                </div>
              )}
              
              {item.source && (
                <div className="practice-source">
                  <span className="source-label">来源：</span>
                  <span className="source-name">{item.source.name}</span>
                  {item.source.author && (
                    <>
                      <span className="source-divider">·</span>
                      <span className="source-author">{item.source.author}</span>
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

        .practice-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .practice-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 20px;
          background: #f3f4f6;
          border-radius: 12px;
          transition: all 0.2s ease;
          border: 1px solid transparent;
        }

        .practice-item:hover {
          background: #f8f9fa;
          border-color: #579d8d;
          transform: translateY(-1px);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .practice-icon {
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

        .practice-content {
          flex: 1;
          min-width: 0;
        }

        .practice-title {
          font-size: 18px;
          font-weight: 700;
          color: #111827;
          margin-bottom: 16px;
          line-height: 1.3;
        }

        .practice-section {
          margin-bottom: 12px;
        }

        .practice-section:last-child {
          margin-bottom: 0;
        }

        .section-label {
          font-size: 14px;
          font-weight: 700;
          color: #6b7280;
          margin-bottom: 4px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .section-content {
          font-size: 15px;
          color: #4b5563;
          line-height: 1.6;
        }

        .insights {
          background: rgba(87, 157, 141, 0.1);
          padding: 12px;
          border-radius: 8px;
          border-left: 3px solid #579d8d;
          position: relative;
        }

        .insights::before {
          content: '💡';
          position: absolute;
          top: 12px;
          left: 12px;
          font-size: 16px;
        }

        .insights {
          padding-left: 40px;
        }

        .practice-source {
          margin-top: 16px;
          padding-top: 12px;
          border-top: 1px solid #e5e7eb;
          font-size: 13px;
          color: #6b7280;
          display: flex;
          align-items: center;
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

        .source-author {
          color: #579d8d;
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .practice-item {
            flex-direction: column;
            gap: 12px;
            padding: 16px;
          }

          .practice-icon {
            width: 40px;
            height: 40px;
            font-size: 20px;
          }

          .practice-title {
            font-size: 16px;
          }

          .section-content {
            font-size: 14px;
          }
        }
      `}</style>
    </section>
  );
}