// 高级优雅配色主题
export const theme = {
  // 色彩系统 - 基于深海圈风格
  colors: {
    // 主色调 - 深海绿
    primary: {
      50: '#e6f5f0',
      100: '#b3e2d2',
      200: '#80cfb4',
      300: '#4dbc96',
      400: '#26ad7f',
      500: '#00a968', // 主色 - 深海绿
      600: '#009960',
      700: '#008652',
      800: '#007344',
      900: '#005236'
    },
    // 辅助色 - 温暖黄
    accent: {
      50: '#fff9e6',
      100: '#ffecb3',
      200: '#ffdf80',
      300: '#ffd24d',
      400: '#ffc526',
      500: '#ffb800', // 主色 - 温暖黄
      600: '#e6a600',
      700: '#cc9400',
      800: '#b38200',
      900: '#806000'
    },
    // 中性色 - 深邃灰
    neutral: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#9e9e9e',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
      950: '#0a0a0a' // 极深灰
    },
    // 功能色
    success: '#52c41a',
    warning: '#faad14',
    error: '#ff4d4f',
    info: '#1890ff'
  },
  
  // 渐变色
  gradients: {
    primary: 'linear-gradient(135deg, #00a968 0%, #26ad7f 100%)',
    accent: 'linear-gradient(135deg, #ffb800 0%, #ffc526 100%)',
    neutral: 'linear-gradient(135deg, #424242 0%, #616161 100%)',
    glass: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
    overlay: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.02) 100%)'
  },
  
  // 阴影系统 - 更柔和
  shadows: {
    xs: '0 1px 2px rgba(0, 0, 0, 0.04)',
    sm: '0 2px 4px rgba(0, 0, 0, 0.06)',
    md: '0 4px 8px rgba(0, 0, 0, 0.08)',
    lg: '0 8px 16px rgba(0, 0, 0, 0.10)',
    xl: '0 16px 32px rgba(0, 0, 0, 0.12)',
    inner: 'inset 0 1px 2px rgba(0, 0, 0, 0.06)',
    glow: '0 0 20px rgba(0, 169, 104, 0.15)'
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
    sm: '6px',
    md: '10px',
    lg: '16px',
    xl: '20px',
    '2xl': '24px',
    full: '9999px'
  },
  
  // 动画时长
  transitions: {
    fast: '150ms',
    normal: '250ms',
    slow: '350ms'
  },
  
  // 字体系统
  fonts: {
    sans: '-apple-system, BlinkMacSystemFont, "PingFang SC", "Helvetica Neue", "Segoe UI", "Microsoft YaHei", sans-serif',
    mono: '"SF Mono", "Monaco", "Inconsolata", "Fira Code", monospace'
  }
};

export default theme;