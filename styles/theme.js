// 现代化UI主题配置
export const theme = {
  // 品牌色彩系统
  colors: {
    // 主色调 - 深邃科技蓝
    primary: {
      50: '#e6f2ff',
      100: '#b3d9ff',
      200: '#80bfff',
      300: '#4da6ff',
      400: '#1a8cff',
      500: '#0066cc', // 主色
      600: '#0052a3',
      700: '#003d7a',
      800: '#002952',
      900: '#001429'
    },
    // 辅助色 - 活力橙
    accent: {
      50: '#fff4e6',
      100: '#ffe0b3',
      200: '#ffcc80',
      300: '#ffb74d',
      400: '#ffa31a',
      500: '#ff8c00', // 主色
      600: '#cc7000',
      700: '#995400',
      800: '#663800',
      900: '#331c00'
    },
    // 成功色 - 翠绿
    success: {
      50: '#e8f5e9',
      100: '#c8e6c9',
      200: '#a5d6a7',
      300: '#81c784',
      400: '#66bb6a',
      500: '#4caf50',
      600: '#43a047',
      700: '#388e3c',
      800: '#2e7d32',
      900: '#1b5e20'
    },
    // 警告色 - 琥珀黄
    warning: {
      50: '#fff8e1',
      100: '#ffecb3',
      200: '#ffe082',
      300: '#ffd54f',
      400: '#ffca28',
      500: '#ffc107',
      600: '#ffb300',
      700: '#ffa000',
      800: '#ff8f00',
      900: '#ff6f00'
    },
    // 危险色 - 朱红
    danger: {
      50: '#ffebee',
      100: '#ffcdd2',
      200: '#ef9a9a',
      300: '#e57373',
      400: '#ef5350',
      500: '#f44336',
      600: '#e53935',
      700: '#d32f2f',
      800: '#c62828',
      900: '#b71c1c'
    },
    // 中性色
    gray: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#9e9e9e',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121'
    }
  },
  
  // 渐变色
  gradients: {
    primary: 'linear-gradient(135deg, #0066cc 0%, #1a8cff 100%)',
    accent: 'linear-gradient(135deg, #ff8c00 0%, #ffa31a 100%)',
    vibrant: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    warm: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    cool: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    dark: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)'
  },
  
  // 阴影系统
  shadows: {
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    glow: '0 0 15px rgba(0, 102, 204, 0.3)'
  },
  
  // 间距系统
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
    '3xl': '64px'
  },
  
  // 圆角系统
  radius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    '2xl': '20px',
    full: '9999px'
  },
  
  // 动画时长
  transitions: {
    fast: '150ms',
    normal: '250ms',
    slow: '350ms'
  }
};

export default theme;