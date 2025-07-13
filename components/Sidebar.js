export default function Sidebar({ sections = [], activeSection, onSectionClick }) {
  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <h3 className="nav-title">快速导航</h3>
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={`nav-item ${activeSection === section.id ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              onSectionClick(section.id);
            }}
          >
            <span className="nav-icon">{section.icon}</span>
            <span className="nav-text">{section.title}</span>
            {section.count > 0 && (
              <span className="nav-badge">{section.count}</span>
            )}
          </a>
        ))}
      </nav>

      <style jsx>{`
        .sidebar {
          width: 220px;
          flex-shrink: 0;
        }

        .sidebar-nav {
          position: sticky;
          top: 100px;
          background: #ffffff;
          border-radius: 16px;
          padding: 24px 16px;
          border: 1px solid #f0f0f0;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        }

        .nav-title {
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          color: #9e9e9e;
          margin-bottom: 16px;
          padding: 0 12px;
          letter-spacing: 0.5px;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: 10px;
          color: #616161;
          text-decoration: none;
          font-size: 14px;
          font-weight: 400;
          transition: all 0.2s ease;
          margin-bottom: 4px;
          position: relative;
        }

        .nav-item::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 3px;
          height: 0;
          background: #00a968;
          border-radius: 0 2px 2px 0;
          transition: height 0.2s ease;
        }

        .nav-item:hover {
          background: #f5f5f5;
          color: #212121;
          transform: translateX(2px);
        }

        .nav-item.active {
          background: rgba(0, 169, 104, 0.1);
          color: #00a968;
          font-weight: 500;
        }

        .nav-item.active::before {
          height: 20px;
        }

        .nav-icon {
          font-size: 18px;
          width: 24px;
          text-align: center;
        }

        .nav-text {
          flex: 1;
        }
        
        .nav-badge {
          min-width: 20px;
          height: 20px;
          padding: 0 6px;
          background: #00a968;
          color: white;
          border-radius: 10px;
          font-size: 11px;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .nav-item:hover .nav-badge {
          background: #00c97a;
        }
        
        .nav-item.active .nav-badge {
          background: #fff;
          color: #00a968;
        }


        /* 响应式设计 */
        @media (max-width: 768px) {
          .sidebar {
            width: 100%;
          }

          .sidebar-nav {
            position: static;
            display: flex;
            overflow-x: auto;
            padding: 8px 4px;
            gap: 4px;
            border-radius: 8px;
          }

          .nav-title {
            display: none;
          }

          .nav-item {
            flex-shrink: 0;
            margin-bottom: 0;
            white-space: nowrap;
            padding: 8px 12px;
          }

          .nav-item::before {
            display: none;
          }

          .nav-item::after {
            display: none;
          }

          .nav-text {
            display: none;
          }

          .nav-icon {
            font-size: 18px;
          }
        }
      `}</style>
    </aside>
  );
}