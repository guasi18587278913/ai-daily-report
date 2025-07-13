// 徽章组件 - 用于显示标签
export default function Badge({ type = 'default', children, size = 'medium' }) {
  const getTypeStyles = () => {
    switch (type) {
      case 'primary':
        return {
          background: '#00a968',
          color: 'white',
        };
      case 'accent':
        return {
          background: '#ffb800',
          color: '#5d4e00',
        };
      case 'success':
        return {
          background: 'rgba(82, 196, 26, 0.1)',
          color: '#52c41a',
          border: '1px solid rgba(82, 196, 26, 0.2)',
        };
      case 'warning':
        return {
          background: 'rgba(250, 173, 20, 0.1)',
          color: '#d48806',
          border: '1px solid rgba(250, 173, 20, 0.2)',
        };
      case 'error':
        return {
          background: 'rgba(255, 77, 79, 0.1)',
          color: '#ff4d4f',
          border: '1px solid rgba(255, 77, 79, 0.2)',
        };
      case 'info':
        return {
          background: 'rgba(24, 144, 255, 0.1)',
          color: '#1890ff',
          border: '1px solid rgba(24, 144, 255, 0.2)',
        };
      default:
        return {
          background: '#f5f5f5',
          color: '#616161',
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          padding: '2px 8px',
          fontSize: '12px',
          borderRadius: '12px',
        };
      case 'large':
        return {
          padding: '6px 16px',
          fontSize: '16px',
          borderRadius: '20px',
        };
      default: // medium
        return {
          padding: '4px 12px',
          fontSize: '14px',
          borderRadius: '16px',
        };
    }
  };

  const typeStyles = getTypeStyles();
  const sizeStyles = getSizeStyles();

  return (
    <span
      className="badge"
      style={{
        ...typeStyles,
        ...sizeStyles,
      }}
    >
      {children}
      <style jsx>{`
        .badge {
          display: inline-flex;
          align-items: center;
          font-weight: 500;
          line-height: 1;
          white-space: nowrap;
          transition: all 0.2s ease;
          border: 1px solid transparent;
        }

        .badge:hover {
          opacity: 0.85;
          transform: translateY(-1px);
        }
      `}</style>
    </span>
  );
}