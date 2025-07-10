#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// 将Markdown转换为JSON的函数
function convertMarkdownToJson(mdFilePath) {
    const content = fs.readFileSync(mdFilePath, 'utf-8');
    
    // 提取元数据
    const metaMatch = content.match(/^---\n([\s\S]*?)\n---/);
    if (!metaMatch) {
        console.error(`No metadata found in ${mdFilePath}`);
        return null;
    }
    
    const metaContent = metaMatch[1];
    const bodyContent = content.replace(/^---\n[\s\S]*?\n---\n/, '');
    
    // 解析元数据
    const meta = {};
    metaContent.split('\n').forEach(line => {
        const match = line.match(/^(\w+):\s*"?(.+?)"?$/);
        if (match) {
            meta[match[1]] = match[2];
        }
    });
    
    // 解析各个部分
    const sections = {};
    const sectionRegex = /^#{1,3}\s+(.+)$/gm;
    let match;
    const sectionPositions = [];
    
    while ((match = sectionRegex.exec(bodyContent)) !== null) {
        sectionPositions.push({
            title: match[1],
            start: match.index,
            level: match[0].match(/^#+/)[0].length
        });
    }
    
    // 提取每个部分的内容
    for (let i = 0; i < sectionPositions.length; i++) {
        const section = sectionPositions[i];
        const nextSection = sectionPositions[i + 1];
        const content = bodyContent.substring(
            section.start + section.title.length + section.level + 2,
            nextSection ? nextSection.start : bodyContent.length
        ).trim();
        
        sections[section.title] = content;
    }
    
    return {
        ...meta,
        sections: sections,
        rawContent: bodyContent
    };
}

// 主函数
function main() {
    const dailyDir = path.join(__dirname, 'daily');
    const dataDir = path.join(__dirname, 'data');
    
    // 确保data目录存在
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir);
    }
    
    // 读取所有markdown文件
    const files = fs.readdirSync(dailyDir)
        .filter(file => file.endsWith('.md'))
        .sort();
    
    const index = { reports: [] };
    
    files.forEach(file => {
        console.log(`Converting ${file}...`);
        const mdPath = path.join(dailyDir, file);
        const jsonData = convertMarkdownToJson(mdPath);
        
        if (jsonData) {
            // 保存JSON文件
            const jsonPath = path.join(dataDir, file.replace('.md', '.json'));
            fs.writeFileSync(jsonPath, JSON.stringify(jsonData, null, 2));
            
            // 更新索引
            index.reports.push({
                date: jsonData.date,
                dateRange: jsonData.dateRange,
                dayOfWeek: jsonData.dayOfWeek,
                title: jsonData.title || jsonData.highlights?.[0] || '',
                summary: jsonData.summary
            });
        }
    });
    
    // 保存索引文件
    fs.writeFileSync(
        path.join(dataDir, 'index.json'),
        JSON.stringify(index, null, 2)
    );
    
    console.log('Conversion complete!');
}

// 运行
if (require.main === module) {
    main();
}