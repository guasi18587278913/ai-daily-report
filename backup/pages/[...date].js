import { useState, useEffect } from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';

export default function DailyReport({ report, allReports, currentDate }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  if (!report) return <div>报告未找到</div>;

  const { data: metadata, content } = report;
  
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

  // 找到上一期和下一期
  const currentIndex = allReports.findIndex(r => r.slug === currentDate);
  const prevReport = allReports[currentIndex + 1];
  const nextReport = allReports[currentIndex - 1];

  return (
    <>
      <Head>
        <title>AI日报 - {metadata.date}</title>
        <meta name="description" content={metadata.summary} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Tailwind CSS */}
        <script src="https://cdn.tailwindcss.com"></script>
        
        {/* Font Awesome */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
        
        <style jsx global>{`
          :root {
            --orange-primary: #FF6B35;
            --orange-light: #FF8C42;
            --orange-dark: #E85D2F;
          }
          
          body {
            background-color: #000;
            color: #fff;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          }
          
          .highlight-orange {
            color: var(--orange-primary);
          }
          
          .gradient-orange {
            background: linear-gradient(135deg, rgba(255,107,53,0.8) 0%, rgba(255,107,53,0.2) 100%);
          }
          
          .gradient-text {
            background: linear-gradient(135deg, var(--orange-primary) 0%, var(--orange-light) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          
          .bento-item {
            background: rgba(255,255,255,0.03);
            border: 1px solid rgba(255,107,53,0.2);
            backdrop-filter: blur(10px);
            transition: all 0.3s ease;
          }
          
          .bento-item:hover {
            background: rgba(255,107,53,0.05);
            border-color: rgba(255,107,53,0.4);
            transform: translateY(-2px);
          }
          
          .super-large {
            font-size: clamp(3rem, 8vw, 6rem);
            font-weight: 900;
            line-height: 0.9;
          }
          
          .large-text {
            font-size: clamp(2rem, 4vw, 3rem);
            font-weight: 800;
          }
          
          .section-icon {
            font-size: 2rem;
            color: var(--orange-primary);
            opacity: 0.8;
          }
          
          .markdown-content h3 {
            color: var(--orange-primary);
            font-size: 1.5rem;
            font-weight: bold;
            margin: 1.5rem 0 1rem 0;
          }
          
          .markdown-content h4 {
            color: var(--orange-light);
            font-size: 1.25rem;
            font-weight: bold;
            margin: 1rem 0 0.5rem 0;
          }
          
          .markdown-content strong {
            color: var(--orange-primary);
          }
          
          .markdown-content ul {
            margin: 1rem 0;
            padding-left: 1.5rem;
          }
          
          .markdown-content li {
            margin: 0.5rem 0;
            color: #d1d5db;
          }
          
          .markdown-content p {
            margin: 1rem 0;
            color: #d1d5db;
            line-height: 1.6;
          }
        `}</style>
      </Head>

      <div className="min-h-screen">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-gray-800">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2">
              <i className="fas fa-home text-orange-500"></i>
              <span className="font-bold">AI日报</span>
            </Link>
            
            <div className="flex items-center gap-4">
              {prevReport && (
                <Link 
                  href={`/${prevReport.slug.replace(/-/g, '/')}/`}
                  className="flex items-center gap-2 px-4 py-2 bento-item rounded-lg text-sm"
                >
                  <i className="fas fa-chevron-left"></i>
                  上一期
                </Link>
              )}
              
              {nextReport && (
                <Link 
                  href={`/${nextReport.slug.replace(/-/g, '/')}/`}
                  className="flex items-center gap-2 px-4 py-2 bento-item rounded-lg text-sm"
                >
                  下一期
                  <i className="fas fa-chevron-right"></i>
                </Link>
              )}
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <motion.div 
          className="relative pt-24 pb-12 flex items-center justify-center overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div 
            className="text-center z-10 container mx-auto px-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <motion.h1 className="super-large mb-4">
              <span className="gradient-text">AI日报</span>
            </motion.h1>
            <motion.p className="text-2xl text-gray-400">
              {metadata.date} <span className="text-sm">{metadata.dayOfWeek}</span>
            </motion.p>
            <motion.p 
              className="text-lg text-gray-500 mt-4 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {metadata.summary}
            </motion.p>
          </motion.div>
          
          {/* Floating Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div 
              className="absolute top-20 left-20 w-32 h-32 gradient-orange rounded-full blur-3xl opacity-20"
              animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
              transition={{ duration: 20, repeat: Infinity }}
            />
            <motion.div 
              className="absolute bottom-20 right-20 w-48 h-48 gradient-orange rounded-full blur-3xl opacity-10"
              animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
              transition={{ duration: 25, repeat: Infinity }}
            />
          </div>
        </motion.div>

        {/* 主内容区域 */}
        <div className="container mx-auto px-4">
          {/* 今日要点 */}
          {sections['今日要点'] && (
            <section className="py-20">
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-4 mb-12">
                  <i className="fas fa-thumbtack section-icon"></i>
                  <h2 className="large-text">今日要点</h2>
                </div>
                
                <motion.div 
                  className="bento-item p-10 rounded-2xl markdown-content"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  viewport={{ once: true }}
                  dangerouslySetInnerHTML={{ __html: marked(sections['今日要点']) }}
                />
              </motion.div>
            </section>
          )}

          {/* 热门话题 */}
          {sections['热门话题'] && (
            <section className="py-20">
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-4 mb-12">
                  <i className="fas fa-fire section-icon"></i>
                  <h2 className="large-text">热门话题</h2>
                </div>
                
                <motion.div 
                  className="bento-item p-10 rounded-2xl markdown-content"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  viewport={{ once: true }}
                  dangerouslySetInnerHTML={{ __html: marked(sections['热门话题']) }}
                />
              </motion.div>
            </section>
          )}

          {/* 工具情报 */}
          {sections['工具情报'] && (
            <section className="py-20">
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-4 mb-12">
                  <i className="fas fa-tools section-icon"></i>
                  <h2 className="large-text">工具情报</h2>
                </div>
                
                <motion.div 
                  className="bento-item p-10 rounded-2xl markdown-content"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  viewport={{ once: true }}
                  dangerouslySetInnerHTML={{ __html: marked(sections['工具情报']) }}
                />
              </motion.div>
            </section>
          )}

          {/* 实战干货 */}
          {sections['实战干货'] && (
            <section className="py-20">
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-4 mb-12">
                  <i className="fas fa-rocket section-icon"></i>
                  <h2 className="large-text">实战干货</h2>
                </div>
                
                <motion.div 
                  className="bento-item p-10 rounded-2xl markdown-content"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  viewport={{ once: true }}
                  dangerouslySetInnerHTML={{ __html: marked(sections['实战干货']) }}
                />
              </motion.div>
            </section>
          )}

          {/* 行业动态 */}
          {sections['行业动态'] && (
            <section className="py-20">
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-4 mb-12">
                  <i className="fas fa-chart-line section-icon"></i>
                  <h2 className="large-text">行业动态</h2>
                </div>
                
                <motion.div 
                  className="bento-item p-10 rounded-2xl markdown-content"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  viewport={{ once: true }}
                  dangerouslySetInnerHTML={{ __html: marked(sections['行业动态']) }}
                />
              </motion.div>
            </section>
          )}

          {/* 问答精选 */}
          {sections['问答精选'] && (
            <section className="py-20">
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-4 mb-12">
                  <i className="fas fa-comments section-icon"></i>
                  <h2 className="large-text">问答精选</h2>
                </div>
                
                <motion.div 
                  className="bento-item p-10 rounded-2xl markdown-content"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  viewport={{ once: true }}
                  dangerouslySetInnerHTML={{ __html: marked(sections['问答精选']) }}
                />
              </motion.div>
            </section>
          )}
        </div>

        {/* Navigation Footer */}
        <section className="py-12 border-t border-gray-800">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              {prevReport ? (
                <Link 
                  href={`/${prevReport.slug.replace(/-/g, '/')}/`}
                  className="flex items-center gap-4 bento-item p-6 rounded-2xl max-w-sm"
                >
                  <i className="fas fa-chevron-left text-orange-500 text-2xl"></i>
                  <div>
                    <p className="text-sm text-gray-500">上一期</p>
                    <p className="font-bold">{prevReport.date}</p>
                    <p className="text-sm text-gray-400 line-clamp-2">{prevReport.summary}</p>
                  </div>
                </Link>
              ) : (
                <div></div>
              )}
              
              {nextReport ? (
                <Link 
                  href={`/${nextReport.slug.replace(/-/g, '/')}/`}
                  className="flex items-center gap-4 bento-item p-6 rounded-2xl max-w-sm text-right"
                >
                  <div>
                    <p className="text-sm text-gray-500">下一期</p>
                    <p className="font-bold">{nextReport.date}</p>
                    <p className="text-sm text-gray-400 line-clamp-2">{nextReport.summary}</p>
                  </div>
                  <i className="fas fa-chevron-right text-orange-500 text-2xl"></i>
                </Link>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-800 mt-20">
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

export async function getStaticPaths() {
  const dailyDir = path.join(process.cwd(), 'daily');
  
  try {
    const files = fs.readdirSync(dailyDir).filter(file => file.endsWith('.md'));
    
    const paths = files.map(file => {
      const slug = file.replace('.md', '');
      const [year, month, day] = slug.split('-');
      return {
        params: { 
          date: [year, month, day]
        }
      };
    });
    
    return {
      paths,
      fallback: false
    };
  } catch (error) {
    return {
      paths: [],
      fallback: false
    };
  }
}

export async function getStaticProps({ params }) {
  const { date } = params;
  const currentDate = date.join('-');
  const dailyDir = path.join(process.cwd(), 'daily');
  
  try {
    // 获取当前报告
    const reportPath = path.join(dailyDir, `${currentDate}.md`);
    const reportContent = fs.readFileSync(reportPath, 'utf8');
    const report = matter(reportContent);
    
    // 获取所有报告用于导航
    const files = fs.readdirSync(dailyDir)
      .filter(file => file.endsWith('.md'))
      .sort()
      .reverse();
    
    const allReports = files.map(file => {
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
        report,
        allReports,
        currentDate
      }
    };
  } catch (error) {
    return {
      notFound: true
    };
  }
}