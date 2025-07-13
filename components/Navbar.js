import { useState } from 'react';

export default function Navbar({ availableDates = [], currentDate, onDateChange }) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return `${date.getMonth() + 1}月${date.getDate()}日`;
  };

  const formatFullDate = (dateStr) => {
    const date = new Date(dateStr);
    const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    const dayOfWeek = days[date.getDay()];
    return `${dateStr} · ${dayOfWeek}`;
  };

  const currentReport = availableDates.find(report => report.date === currentDate);

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="logo">
          <span className="logo-text">AI日报·深海圈</span>
        </div>
        
        <div className="date-section">
          
          <div className="date-picker">
            {availableDates.slice(-4).map((report) => (
              <button
                key={report.date}
                className={`date-pill ${currentDate === report.date ? 'active' : ''}`}
                onClick={() => onDateChange(report.date)}
              >
                {formatDate(report.date)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .navbar {
          position: sticky;
          top: 0;
          background: #ffffff;
          border-bottom: 1px solid #f0f0f0;
          z-index: 100;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }

        .navbar-content {
          max-width: 1280px;
          margin: 0 auto;
          padding: 20px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo {
          display: flex;
          align-items: center;
        }

        .logo-text {
          font-size: 22px;
          font-weight: 700;
          color: #212121;
          letter-spacing: 0.5px;
        }


        .date-section {
          display: flex;
          align-items: center;
        }

        .date-picker {
          display: flex;
          gap: 8px;
          position: relative;
          padding: 4px;
          background: #f5f5f5;
          border-radius: 24px;
        }

        .date-pill {
          padding: 10px 24px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 500;
          color: #666666;
          background: transparent;
          border: none;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          white-space: nowrap;
          position: relative;
          z-index: 2;
        }


        .date-pill:hover:not(.active) {
          color: #333333;
          transform: scale(1.05);
        }


        .date-pill:active {
          transform: translateY(0);
        }

        .date-pill.active {
          background: #ffffff;
          color: #00a968;
          font-weight: 600;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }


        @media (max-width: 768px) {
          .navbar-content {
            flex-direction: column;
            gap: 12px;
            padding: 12px 16px;
          }

          .date-section {
            flex-direction: column;
            gap: 8px;
          }

          .current-date {
            font-size: 14px;
          }

          .date-picker {
            flex-wrap: wrap;
          }

          .date-pill {
            padding: 6px 12px;
            font-size: 13px;
          }
        }

        @media (max-width: 480px) {
          .logo-text {
            font-size: 20px;
          }
          
          .logo-subtitle {
            font-size: 11px;
          }
        }
      `}</style>
    </nav>
  );
}