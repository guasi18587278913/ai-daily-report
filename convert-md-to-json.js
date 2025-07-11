#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// 解析带来源信息的内容
function parseContentWithSource(content) {
    // 匹配格式: 内容 | 来源：[群组名] 或 内容 | 来源：[群组名] - [发言人]
    const sourcePattern = /^(.+?)\s*\|\s*来源：\[([^\]]+)\](?:\s*-\s*\[([^\]]+)\])?$/;
    const match = content.trim().match(sourcePattern);
    
    if (match) {
        return {
            text: match[1].trim(),
            source: {
                group: match[2],
                author: match[3] || null
            }
        };
    }
    
    // 如果没有来源信息，返回原内容
    return {
        text: content.trim(),
        source: null
    };
}

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
        const match = line.match(/^(\w+):\s*(.+)$/);
        if (match) {
            let value = match[2].trim();
            // 处理字符串值（去除引号）
            if (value.startsWith('"') && value.endsWith('"')) {
                value = value.slice(1, -1);
            }
            // 处理数组（highlights）
            else if (match[1] === 'highlights') {
                // 收集所有highlights行
                return;
            }
            meta[match[1]] = value;
        }
    });
    
    // 特殊处理highlights数组
    const highlightsMatch = metaContent.match(/highlights:\s*\n((?:\s+-\s+.+\n?)+)/);
    if (highlightsMatch) {
        meta.highlights = highlightsMatch[1]
            .split('\n')
            .filter(line => line.trim())
            .map(line => line.replace(/^\s*-\s+"?(.+?)"?$/, '$1'));
    }
    
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
        
        // 解析包含来源信息的内容
        const lines = content.split('\n').filter(line => line.trim());
        const parsedContent = lines.map(line => {
            // 处理列表项
            if (line.match(/^[-*]\s+/) || line.match(/^\d+\.\s+/)) {
                const listMatch = line.match(/^([-*]|\d+\.)\s+(.+)$/);
                if (listMatch) {
                    const parsedItem = parseContentWithSource(listMatch[2]);
                    return {
                        type: 'list',
                        prefix: listMatch[1],
                        ...parsedItem
                    };
                }
            }
            // 处理普通段落
            return {
                type: 'paragraph',
                ...parseContentWithSource(line)
            };
        });
        
        sections[section.title] = {
            raw: content,
            parsed: parsedContent
        };
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