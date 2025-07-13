import { useState, useEffect, useRef } from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import Head from 'next/head';
import Script from 'next/script';

export default function Home({ latestReport, recentReports }) {
  const [mounted, setMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setMounted(true);
    
    // 滚动监听
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // 初始化图表
    if (typeof window !== 'undefined' && window.Chart) {
      const ctx = document.getElementById('topicsChart');
      if (ctx) {
        new window.Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Cursor', 'Augment', 'Claude Code', 'GitHub Copilot'],
            datasets: [{
              label: '开发者使用率',
              data: [45, 78, 65, 52],
              backgroundColor: 'rgba(255, 107, 53, 0.8)',
              borderColor: '#FF6B35',
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                labels: { color: '#fff' }
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                grid: { color: 'rgba(255,255,255,0.1)' },
                ticks: { color: '#fff' }
              },
              x: {
                grid: { display: false },
                ticks: { color: '#fff' }
              }
            }
          }
        });
      }
    }
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) return <div style={{background: '#000', color: '#fff', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Loading...</div>;

  const { data: metadata, content } = latestReport || { data: {}, content: '' };
  
  // 解析 Markdown 内容的不同板块
  const parseContent = (content) => {
    const sections = {};
    const lines = content.split('\n');
    let currentSection = '';
    let currentContent = [];
    
    lines.forEach(line => {
      if (line.startsWith('## ')) {
        if (currentSection) {
          sections[currentSection] = currentContent.join('\n');
        }
        currentSection = line.replace('## ', '').replace(/[📌🔥🛠💡📊💬]/g, '').trim();
        currentContent = [];
      } else if (currentSection) {
        currentContent.push(line);
      }
    });
    
    if (currentSection) {
      sections[currentSection] = currentContent.join('\n');
    }
    
    return sections;
  };

  const sections = parseContent(content);

  return (
    <>
      <Head>
        <title>AI日报 - {metadata.date}</title>
        <meta name="description" content={metadata.summary} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
      </Head>

      <div className="min-h-screen">
        {/* Hero Section */}
        <div className="hero-section relative overflow-hidden">
          <div className="text-center z-10 px-4" style={{
            transform: `translateY(${scrollY * 0.3}px)`,
            opacity: 1 - scrollY / 600
          }}>
            <div className="mb-2">
              <div className="text-xs uppercase tracking-[0.5em] text-gray-600 mb-4">
                DAILY INTELLIGENCE
              </div>
              <h1 className="super-large mb-2" style={{
                background: 'linear-gradient(135deg, #FF6B35 0%, #FFA500 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                display: 'inline-block',
                fontWeight: 900,
                letterSpacing: '-0.04em',
                textShadow: '0 0 120px rgba(255,107,53,0.6)',
                fontSize: 'clamp(4rem, 10vw, 8rem)'
              }}>
                AI日报
              </h1>
            </div>
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="text-3xl font-bold text-white">
                {metadata.date}
              </span>
              <span className="text-sm uppercase tracking-wider text-gray-500">
                {metadata.dayOfWeek}
              </span>
            </div>
            <p className="text-lg text-gray-400 mt-4 max-w-2xl mx-auto font-medium">
              {metadata.summary}
            </p>
          </div>
          
          {/* Floating Elements & Graphics */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-20 w-32 h-32 gradient-orange rounded-full blur-3xl opacity-20 float-animation" />
            <div className="absolute bottom-20 right-20 w-48 h-48 gradient-orange rounded-full blur-3xl opacity-10 float-animation" style={{animationDelay: '2s'}} />
            
            {/* 简洁勾线图形 */}
            <svg className="absolute top-10 right-10 w-24 h-24 opacity-10" viewBox="0 0 100 100">
              <rect x="10" y="10" width="80" height="80" fill="none" stroke="#FF6B35" strokeWidth="1" />
              <circle cx="50" cy="50" r="30" fill="none" stroke="#FF6B35" strokeWidth="1" />
            </svg>
            
            <svg className="absolute bottom-10 left-10 w-32 h-32 opacity-10" viewBox="0 0 100 100">
              <path d="M 20 80 L 50 20 L 80 80" fill="none" stroke="#FF6B35" strokeWidth="1" />
              <circle cx="50" cy="50" r="5" fill="#FF6B35" opacity="0.5" />
            </svg>
          </div>
        </div>

        {/* 侧边栏：最近报告 */}
        <div className="fixed top-0 right-0 h-full w-80 bg-black/80 backdrop-blur-lg border-l border-gray-800 z-50 p-6 overflow-y-auto hidden lg:block">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <i className="fas fa-history text-orange-500"></i>
            最近报告
          </h3>
          <div className="space-y-3">
            {recentReports.map((report, index) => (
              <a
                key={report.slug}
                href={`/${report.slug.replace(/-/g, '/')}/`}
                className="block bento-item p-4 rounded-lg text-sm"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">{report.date}</span>
                  <span className="text-gray-400 text-xs">{report.dayOfWeek}</span>
                </div>
                <p className="text-gray-400 text-xs line-clamp-2">{report.summary}</p>
              </a>
            ))}
          </div>
        </div>

        {/* 主内容区域 */}
        <div className="lg:mr-80">
          {/* 今日要点 */}
          {sections['今日要点'] && (
            <section className="container mx-auto px-4 py-24">
              <div>
                <div className="mb-12">
                  <div className="flex items-center gap-4 mb-2">
                    <i className="fas fa-thumbtack" style={{fontSize: '3rem', color: '#FF6B35', opacity: 0.9}}></i>
                    <div>
                      <div className="text-xs uppercase tracking-[0.3em] text-gray-600 mb-1">
                        TODAY'S HIGHLIGHTS
                      </div>
                      <h2 className="large-text" style={{fontWeight: 900}}>今日要点</h2>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {metadata.highlights?.map((highlight, index) => (
                    <div 
                      key={index}
                      className="bento-item p-6 rounded-2xl"
                      style={{
                        background: 'rgba(255,255,255,0.08)',
                        border: '1px solid rgba(255,107,53,0.4)',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        backdropFilter: 'blur(10px)'
                      }}
                    >
                      <div className="mb-6">
                        <div className="text-8xl font-black mb-2" style={{
                          color: '#FF6B35',
                          lineHeight: '0.8',
                          letterSpacing: '-0.05em'
                        }}>
                          {String(index + 1).padStart(2, '0')}
                        </div>
                        <div className="text-xs uppercase tracking-widest text-gray-500 mb-4">
                          HIGHLIGHT {index + 1}
                        </div>
                      </div>
                      <p className="text-gray-300 leading-relaxed text-base font-medium">
                        {highlight}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* 热门话题 */}
          {sections['热门话题'] && (
            <section className="container mx-auto px-4 py-24">
              <div>
                <div className="mb-12">
                  <div className="flex items-center gap-4 mb-2">
                    <i className="fas fa-fire" style={{fontSize: '3rem', color: '#FF6B35', opacity: 0.9}}></i>
                    <div>
                      <div className="text-xs uppercase tracking-[0.3em] text-gray-600 mb-1">
                        HOT TOPICS
                      </div>
                      <h2 className="large-text" style={{fontWeight: 900}}>热门话题</h2>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
                  <div 
                    className="bento-item p-10 rounded-2xl markdown-content"
                    style={{
                      background: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,107,53,0.4)',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                      backdropFilter: 'blur(10px)'
                    }}
                    dangerouslySetInnerHTML={{ __html: marked(sections['热门话题']) }}
                  />
                  
                  <div 
                    className="bento-item p-10 rounded-2xl"
                    style={{
                      background: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,107,53,0.4)',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                      backdropFilter: 'blur(10px)'
                    }}
                  >
                    <h3 className="text-xl font-bold mb-6 text-white">AI编程工具使用趋势</h3>
                    <div style={{height: '300px'}}>
                      <canvas id="topicsChart"></canvas>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* 工具情报 */}
          {sections['工具情报'] && (
            <section className="container mx-auto px-4 py-24">
              <div>
                <div className="flex items-center gap-4 mb-12">
                  <i className="fas fa-tools" style={{fontSize: '3rem', color: '#FF6B35', opacity: 0.9}}></i>
                  <h2 className="large-text">工具情报</h2>
                </div>
                
                <div 
                  className="bento-item p-10 rounded-2xl markdown-content max-w-5xl mx-auto"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,107,53,0.4)',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    backdropFilter: 'blur(10px)'
                  }}
                  dangerouslySetInnerHTML={{ __html: marked(sections['工具情报']) }}
                />
              </div>
            </section>
          )}

          {/* 实战干货 */}
          {sections['实战干货'] && (
            <section className="container mx-auto px-4 py-24">
              <div>
                <div className="flex items-center gap-4 mb-12">
                  <i className="fas fa-rocket" style={{fontSize: '3rem', color: '#FF6B35', opacity: 0.9}}></i>
                  <h2 className="large-text">实战干货</h2>
                </div>
                
                <div 
                  className="bento-item p-10 rounded-2xl markdown-content max-w-5xl mx-auto"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,107,53,0.4)',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    backdropFilter: 'blur(10px)'
                  }}
                  dangerouslySetInnerHTML={{ __html: marked(sections['实战干货']) }}
                />
              </div>
            </section>
          )}

          {/* 行业动态 */}
          {sections['行业动态'] && (
            <section className="container mx-auto px-4 py-24">
              <div>
                <div className="flex items-center gap-4 mb-12">
                  <i className="fas fa-chart-line" style={{fontSize: '3rem', color: '#FF6B35', opacity: 0.9}}></i>
                  <h2 className="large-text">行业动态</h2>
                </div>
                
                <div 
                  className="bento-item p-10 rounded-2xl markdown-content max-w-5xl mx-auto"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,107,53,0.4)',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    backdropFilter: 'blur(10px)'
                  }}
                  dangerouslySetInnerHTML={{ __html: marked(sections['行业动态']) }}
                />
              </div>
            </section>
          )}

          {/* 问答精选 */}
          {sections['问答精选'] && (
            <section className="container mx-auto px-4 py-24">
              <div>
                <div className="flex items-center gap-4 mb-12">
                  <i className="fas fa-comments" style={{fontSize: '3rem', color: '#FF6B35', opacity: 0.9}}></i>
                  <h2 className="large-text">问答精选</h2>
                </div>
                
                <div 
                  className="bento-item p-10 rounded-2xl markdown-content max-w-5xl mx-auto"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,107,53,0.4)',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    backdropFilter: 'blur(10px)'
                  }}
                  dangerouslySetInnerHTML={{ __html: marked(sections['问答精选']) }}
                />
              </div>
            </section>
          )}
        </div>

        {/* Footer */}
        <footer className="border-t border-gray-800 mt-20 lg:mr-80">
          <div className="container mx-auto px-4 py-10">
            <div className="text-center">
              <p className="text-gray-500">
                AI Daily Report · 2025
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const dailyDir = path.join(process.cwd(), 'daily');
  
  try {
    const files = fs.readdirSync(dailyDir)
      .filter(file => file.endsWith('.md'))
      .sort()
      .reverse(); // 最新的在前
    
    if (files.length === 0) {
      return {
        props: {
          latestReport: { data: {}, content: '' },
          recentReports: []
        }
      };
    }
    
    // 获取最新报告
    const latestFile = files[0];
    const latestContent = fs.readFileSync(path.join(dailyDir, latestFile), 'utf8');
    const latestReportRaw = matter(latestContent);
    const latestReport = {
      data: latestReportRaw.data,
      content: latestReportRaw.content
    };
    
    // 获取最近几期报告
    const recentReports = files.slice(0, 7).map(file => {
      const content = fs.readFileSync(path.join(dailyDir, file), 'utf8');
      const { data } = matter(content);
      return {
        slug: file.replace('.md', ''),
        date: data.date,
        dayOfWeek: data.dayOfWeek,
        summary: data.summary
      };
    });
    
    return {
      props: {
        latestReport,
        recentReports
      }
    };
  } catch (error) {
    console.error('Error reading daily reports:', error);
    return {
      props: {
        latestReport: { data: {}, content: '' },
        recentReports: []
      }
    };
  }
}