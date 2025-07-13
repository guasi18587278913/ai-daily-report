import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="zh-CN">
        <Head>
          {/* Tailwind CSS */}
          <script src="https://cdn.tailwindcss.com"></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                tailwind.config = {
                  theme: {
                    extend: {
                      colors: {
                        'orange': {
                          '50': '#fff7ed',
                          '100': '#ffedd5',
                          '200': '#fed7aa',
                          '300': '#fdba74',
                          '400': '#fb923c',
                          '500': '#FF6B35',
                          '600': '#ea580c',
                          '700': '#c2410c',
                          '800': '#9a3412',
                          '900': '#7c2d12',
                          '950': '#431407',
                        }
                      }
                    }
                  }
                }
              `,
            }}
          />
          
          {/* Font Awesome */}
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" crossOrigin="anonymous" />
          <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" crossOrigin="anonymous" />
          
          {/* Google Fonts */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
          
          <style jsx global>{`
            :root {
              --orange-primary: #FF6B35;
              --orange-light: #FF8C42;
              --orange-dark: #E85D2F;
            }
            
            * {
              box-sizing: border-box;
              margin: 0;
              padding: 0;
            }
            
            body {
              background-color: #000000 !important;
              color: #ffffff !important;
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
              line-height: 1.6;
              overflow-x: hidden;
            }
            
            .highlight-orange {
              color: #FF6B35 !important;
            }
            
            .gradient-orange {
              background: linear-gradient(135deg, rgba(255,107,53,0.8) 0%, rgba(255,107,53,0.1) 100%) !important;
            }
            
            .gradient-glow {
              background: radial-gradient(circle at center, rgba(255,107,53,0.4) 0%, rgba(255,107,53,0) 70%) !important;
            }
            
            .gradient-text {
              background: linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%) !important;
              -webkit-background-clip: text !important;
              -webkit-text-fill-color: transparent !important;
              background-clip: text !important;
              color: #FF6B35 !important; /* fallback */
              display: inline-block !important;
            }
            
            /* 确保Safari兼容性 */
            @supports not (-webkit-background-clip: text) {
              .gradient-text {
                color: #FF6B35 !important;
                background: none !important;
              }
            }
            
            .bento-item {
              background: rgba(255,255,255,0.05) !important;
              border: 1px solid rgba(255,107,53,0.3) !important;
              backdrop-filter: blur(10px) !important;
              transition: all 0.3s ease !important;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1) !important;
            }
            
            .bento-item:hover {
              background: rgba(255,107,53,0.08) !important;
              border-color: rgba(255,107,53,0.5) !important;
              transform: translateY(-2px) !important;
              box-shadow: 0 8px 25px rgba(255,107,53,0.15) !important;
            }
            
            .super-large {
              font-size: clamp(3rem, 8vw, 6rem) !important;
              font-weight: 900 !important;
              line-height: 0.9 !important;
            }
            
            .large-text {
              font-size: clamp(2.5rem, 5vw, 3.5rem) !important;
              font-weight: 800 !important;
            }
            
            .section-icon {
              font-size: 2rem !important;
              color: #FF6B35 !important;
              opacity: 0.8 !important;
            }
            
            .markdown-content h3 {
              color: var(--orange-primary) !important;
              font-size: 1.5rem !important;
              font-weight: bold !important;
              margin: 1.5rem 0 1rem 0 !important;
            }
            
            .markdown-content h4 {
              color: var(--orange-light) !important;
              font-size: 1.25rem !important;
              font-weight: bold !important;
              margin: 1rem 0 0.5rem 0 !important;
            }
            
            .markdown-content strong {
              color: var(--orange-primary) !important;
            }
            
            .markdown-content ul {
              margin: 1rem 0 !important;
              padding-left: 1.5rem !important;
            }
            
            .markdown-content li {
              margin: 0.5rem 0 !important;
              color: #d1d5db !important;
            }
            
            .markdown-content p {
              margin: 1rem 0 !important;
              color: #e5e7eb !important;
              line-height: 1.8 !important;
              max-width: 800px !important;
            }
            
            .line-clamp-2 {
              display: -webkit-box !important;
              -webkit-line-clamp: 2 !important;
              -webkit-box-orient: vertical !important;
              overflow: hidden !important;
            }
            
            @keyframes float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-20px); }
            }
            
            .float-animation {
              animation: float 6s ease-in-out infinite;
            }
            
            /* 确保容器正确显示 */
            .container {
              max-width: 1200px !important;
              margin-left: auto !important;
              margin-right: auto !important;
              padding-left: 1rem !important;
              padding-right: 1rem !important;
            }
            
            /* 网格布局 */
            .grid {
              display: grid !important;
            }
            
            .grid-cols-1 {
              grid-template-columns: repeat(1, minmax(0, 1fr)) !important;
            }
            
            @media (min-width: 768px) {
              .md\\:grid-cols-3 {
                grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
              }
              .md\\:grid-cols-2 {
                grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
              }
            }
            
            @media (min-width: 1024px) {
              .lg\\:grid-cols-2 {
                grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
              }
              .lg\\:grid-cols-3 {
                grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
              }
              .lg\\:col-span-2 {
                grid-column: span 2 / span 2 !important;
              }
              .lg\\:mr-80 {
                margin-right: 20rem !important;
              }
              .lg\\:block {
                display: block !important;
              }
            }
            
            .gap-6 {
              gap: 1.5rem !important;
            }
            
            .gap-8 {
              gap: 2rem !important;
            }
            
            .gap-4 {
              gap: 1rem !important;
            }
            
            .gap-2 {
              gap: 0.5rem !important;
            }
            
            .gap-3 {
              gap: 0.75rem !important;
            }
            
            /* 间距 */
            .p-4 { padding: 1rem !important; }
            .p-6 { padding: 1.5rem !important; }
            .p-8 { padding: 2rem !important; }
            .p-10 { padding: 2.5rem !important; }
            .px-4 { padding-left: 1rem !important; padding-right: 1rem !important; }
            .px-6 { padding-left: 1.5rem !important; padding-right: 1.5rem !important; }
            .py-4 { padding-top: 1rem !important; padding-bottom: 1rem !important; }
            .py-6 { padding-top: 1.5rem !important; padding-bottom: 1.5rem !important; }
            .py-10 { padding-top: 2.5rem !important; padding-bottom: 2.5rem !important; }
            .py-12 { padding-top: 3rem !important; padding-bottom: 3rem !important; }
            .py-20 { padding-top: 5rem !important; padding-bottom: 5rem !important; }
            .pt-24 { padding-top: 6rem !important; }
            .pb-12 { padding-bottom: 3rem !important; }
            .mb-4 { margin-bottom: 1rem !important; }
            .mb-6 { margin-bottom: 1.5rem !important; }
            .mb-12 { margin-bottom: 3rem !important; }
            .mt-4 { margin-top: 1rem !important; }
            .mt-6 { margin-top: 1.5rem !important; }
            .mt-20 { margin-top: 5rem !important; }
            .mx-auto { margin-left: auto !important; margin-right: auto !important; }
            
            /* 文本样式 */
            .text-center { text-align: center !important; }
            .text-2xl { font-size: 1.5rem !important; line-height: 2rem !important; }
            .text-xl { font-size: 1.25rem !important; line-height: 1.75rem !important; }
            .text-lg { font-size: 1.125rem !important; line-height: 1.75rem !important; }
            .text-sm { font-size: 0.875rem !important; line-height: 1.25rem !important; }
            .text-xs { font-size: 0.75rem !important; line-height: 1rem !important; }
            .font-bold { font-weight: 700 !important; }
            .font-semibold { font-weight: 600 !important; }
            .font-black { font-weight: 900 !important; }
            .italic { font-style: italic !important; }
            
            /* 颜色 */
            .text-gray-400 { color: #9ca3af !important; }
            .text-gray-500 { color: #6b7280 !important; }
            .text-gray-300 { color: #d1d5db !important; }
            .text-orange-500 { color: var(--orange-primary) !important; }
            .text-orange-300 { color: var(--orange-light) !important; }
            .text-orange-400 { color: #fb923c !important; }
            
            /* 背景 */
            .bg-black { background-color: #000000 !important; }
            .bg-gray-800 { background-color: #1f2937 !important; }
            
            /* 边框 */
            .border { border-width: 1px !important; }
            .border-t { border-top-width: 1px !important; }
            .border-l { border-left-width: 1px !important; }
            .border-l-4 { border-left-width: 4px !important; }
            .border-gray-800 { border-color: #1f2937 !important; }
            .border-orange-500 { border-color: var(--orange-primary) !important; }
            .rounded-lg { border-radius: 0.5rem !important; }
            .rounded-xl { border-radius: 0.75rem !important; }
            .rounded-2xl { border-radius: 1rem !important; }
            .rounded-full { border-radius: 9999px !important; }
            
            /* 布局 */
            .relative { position: relative !important; }
            .absolute { position: absolute !important; }
            .fixed { position: fixed !important; }
            .inset-0 { top: 0 !important; right: 0 !important; bottom: 0 !important; left: 0 !important; }
            .top-0 { top: 0 !important; }
            .right-0 { right: 0 !important; }
            .bottom-0 { bottom: 0 !important; }
            .left-0 { left: 0 !important; }
            .top-20 { top: 5rem !important; }
            .left-20 { left: 5rem !important; }
            .bottom-20 { bottom: 5rem !important; }
            .right-20 { right: 5rem !important; }
            .z-10 { z-index: 10 !important; }
            .z-50 { z-index: 50 !important; }
            
            /* Flexbox */
            .flex { display: flex !important; }
            .items-center { align-items: center !important; }
            .items-start { align-items: flex-start !important; }
            .justify-center { justify-content: center !important; }
            .justify-between { justify-content: space-between !important; }
            .flex-1 { flex: 1 1 0% !important; }
            .space-y-3 > * + * { margin-top: 0.75rem !important; }
            .space-y-4 > * + * { margin-top: 1rem !important; }
            .space-y-8 > * + * { margin-top: 2rem !important; }
            
            /* 尺寸 */
            .h-full { height: 100% !important; }
            .h-screen { height: 100vh !important; }
            .w-full { width: 100% !important; }
            .w-80 { width: 20rem !important; }
            .w-32 { width: 8rem !important; }
            .w-48 { width: 12rem !important; }
            .w-20 { width: 5rem !important; }
            .h-32 { height: 8rem !important; }
            .h-48 { height: 12rem !important; }
            .h-20 { height: 5rem !important; }
            .min-h-screen { min-height: 100vh !important; }
            .max-w-2xl { max-width: 42rem !important; }
            .max-w-sm { max-width: 24rem !important; }
            
            /* 显示/隐藏 */
            .hidden { display: none !important; }
            .block { display: block !important; }
            .overflow-hidden { overflow: hidden !important; }
            .overflow-y-auto { overflow-y: auto !important; }
            .pointer-events-none { pointer-events: none !important; }
            
            /* 透明度和模糊 */
            .opacity-20 { opacity: 0.2 !important; }
            .opacity-10 { opacity: 0.1 !important; }
            .opacity-80 { opacity: 0.8 !important; }
            .blur-3xl { filter: blur(64px) !important; }
            
            /* 过渡效果 */
            .transition { transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter !important; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1) !important; transition-duration: 150ms !important; }
            
            /* 行高和字间距 */
            .leading-relaxed { line-height: 1.625 !important; }
            
            /* 调试边框 */
            .debug-border {
              border: 1px solid red !important;
            }
            
            /* Hero区域样式 */
            .hero-section {
              min-height: 60vh !important;
              display: flex !important;
              align-items: center !important;
              justify-content: center !important;
            }
            
            /* 响应式 */
            @media (max-width: 1023px) {
              .lg\\:mr-80 { margin-right: 0 !important; }
              .lg\\:block { display: none !important; }
            }
          `}</style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument