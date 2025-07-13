import { useEffect } from 'react';
import { useRouter } from 'next/router';
import fs from 'fs';
import path from 'path';

export default function Home({ latestDate }) {
  const router = useRouter();

  useEffect(() => {
    if (latestDate) {
      // 自动重定向到最新日报
      router.replace(`/${latestDate}`);
    }
  }, [latestDate, router]);

  return (
    <div className="loading-container">
      <div className="loader">
        <div className="spinner"></div>
        <p>正在跳转到最新日报...</p>
      </div>

      <style jsx>{`
        .loading-container {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background: #f8f9fa;
        }

        .loader {
          text-align: center;
        }

        .spinner {
          width: 40px;
          height: 40px;
          border: 3px solid #e5e7eb;
          border-top-color: #579d8d;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 16px;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        p {
          color: #6b7280;
          font-size: 16px;
        }
      `}</style>
    </div>
  );
}

export async function getStaticProps() {
  try {
    const dataDir = path.join(process.cwd(), 'data');
    const indexPath = path.join(dataDir, 'index.json');
    const indexData = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
    
    // 获取最新日期
    const latestReport = indexData.reports[indexData.reports.length - 1];
    const latestDate = latestReport?.date;

    return {
      props: {
        latestDate: latestDate || null,
      }
    };
  } catch (error) {
    console.error('Error loading latest date:', error);
    return {
      props: {
        latestDate: null,
      }
    };
  }
}