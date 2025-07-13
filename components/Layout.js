import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function Layout({ 
  children, 
  availableDates = [], 
  currentDate, 
  sections = [],
  activeSection,
  onSectionChange 
}) {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 监听滚动，更新活跃section
  useEffect(() => {
    if (!onSectionChange) return;

    const handleScroll = () => {
      const sections = document.querySelectorAll('.section');
      const scrollPosition = window.scrollY + 100;

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          onSectionChange(sectionId);
        }
      });
    };

    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', scrollListener);
    return () => window.removeEventListener('scroll', scrollListener);
  }, [onSectionChange]);

  const handleDateChange = (date) => {
    router.push(`/${date}`);
  };

  const handleSectionClick = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // 获取当前日报的标题
  const currentReport = availableDates.find(report => report.date === currentDate);
  const pageTitle = currentReport 
    ? `AI日报 - ${currentReport.date} ${currentReport.dayOfWeek}`
    : 'AI日报';

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={currentReport?.summary || "AI行业日报，每日精选AI技术动态、工具推荐和实战经验"} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="app">
        <Navbar 
          availableDates={availableDates}
          currentDate={currentDate}
          onDateChange={handleDateChange}
        />
        
        <div className="container">
          {!isMobile && (
            <Sidebar
              sections={sections}
              activeSection={activeSection}
              onSectionClick={handleSectionClick}
            />
          )}
          
          <main className="main-content">
            {children}
          </main>
        </div>
      </div>

      <style jsx>{`
        .app {
          min-height: 100vh;
          background: #fafafa;
        }

        .container {
          max-width: 1280px;
          margin: 0 auto;
          display: flex;
          gap: 40px;
          padding: 32px;
        }

        .main-content {
          flex: 1;
          min-width: 0;
        }

        @media (max-width: 768px) {
          .container {
            flex-direction: column;
            padding: 16px;
          }
        }
      `}</style>

      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'PingFang SC', sans-serif;
          background-color: #f8f9fa;
          color: #111827;
          line-height: 1.6;
          -webkit-font-smoothing: antialiased;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        button {
          font-family: inherit;
          cursor: pointer;
        }

        /* 滚动条样式 */
        ::-webkit-scrollbar {
          width: 6px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }

        ::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 3px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }
      `}</style>
    </>
  );
}