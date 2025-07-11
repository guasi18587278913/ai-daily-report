const fs = require('fs');
const path = require('path');

// 读取HTML文件
const htmlPath = path.join(__dirname, 'index.html');
let htmlContent = fs.readFileSync(htmlPath, 'utf-8');

// 定义多种来源信息的正则表达式模式
const patterns = [
    // 格式1: 来源：[群组名] - [作者名]
    {
        regex: /来源：\[([^\]]+)\]\s*-\s*\[([^\]]+)\]/g,
        replacement: (match, group, author) => {
            return `<span class="source-trigger" data-source="${group} - ${author}">📍</span>`;
        }
    },
    // 格式2: [作者名@群组名]
    {
        regex: /\[([^@\]]+)@([^\]]+)\]/g,
        replacement: (match, author, group) => {
            // 避免替换已经在HTML标签内的内容
            if (match.includes('class=') || match.includes('data-')) {
                return match;
            }
            return `<span class="source-trigger" data-source="${group} - ${author}">📍</span>`;
        }
    },
    // 格式3: 【群组名】
    {
        regex: /【([^】]+)】(?!.*?<\/)/g,
        replacement: (match, group) => {
            // 只在文本内容中替换，不在标签属性中替换
            return `<span class="source-trigger" data-source="${group}">📍</span>`;
        }
    },
    // 格式4: 来源：群组名 - 作者名（没有方括号）
    {
        regex: /来源：([^<>\n]+?)\s*-\s*([^<>\n]+?)(?=<|$)/g,
        replacement: (match, group, author) => {
            // 清理可能的多余空格
            group = group.trim();
            author = author.trim();
            return `<span class="source-trigger" data-source="${group} - ${author}">📍</span>`;
        }
    }
];

// 添加CSS样式（如果还没有）
const styleTag = `
<style>
.source-trigger {
    display: inline-block;
    cursor: pointer;
    font-size: 14px;
    margin-left: 5px;
    opacity: 0.6;
    transition: opacity 0.2s;
}

.source-trigger:hover {
    opacity: 1;
}

.source-tooltip {
    position: absolute;
    background: rgba(0, 0, 0, 0.9);
    color: white;
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 12px;
    white-space: nowrap;
    z-index: 1000;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.2s;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.source-tooltip.show {
    opacity: 1;
}
</style>
`;

// 添加JavaScript代码（如果还没有）
const scriptTag = `
<script>
document.addEventListener('DOMContentLoaded', function() {
    // 创建提示框元素
    const tooltip = document.createElement('div');
    tooltip.className = 'source-tooltip';
    document.body.appendChild(tooltip);
    
    // 为所有来源触发器添加事件监听
    const sourceTriggers = document.querySelectorAll('.source-trigger');
    
    sourceTriggers.forEach(trigger => {
        trigger.addEventListener('mouseenter', function(e) {
            const source = this.getAttribute('data-source');
            tooltip.textContent = '来源：' + source;
            tooltip.classList.add('show');
            
            // 定位提示框
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + 'px';
            tooltip.style.top = (rect.bottom + 5) + 'px';
        });
        
        trigger.addEventListener('mouseleave', function() {
            tooltip.classList.remove('show');
        });
    });
});
</script>
`;

// 检查是否已经有样式和脚本
if (!htmlContent.includes('source-trigger')) {
    // 在</head>标签前插入样式
    htmlContent = htmlContent.replace('</head>', styleTag + '</head>');
    
    // 在</body>标签前插入脚本
    htmlContent = htmlContent.replace('</body>', scriptTag + '</body>');
}

// 应用所有替换模式
let processedContent = htmlContent;
let totalReplacements = 0;

patterns.forEach(pattern => {
    const matches = processedContent.match(pattern.regex);
    if (matches) {
        console.log(`找到 ${matches.length} 个匹配项，模式: ${pattern.regex}`);
        matches.forEach(match => {
            console.log(`  - ${match}`);
        });
        totalReplacements += matches.length;
    }
    processedContent = processedContent.replace(pattern.regex, pattern.replacement);
});

// 保存修改后的文件
fs.writeFileSync(htmlPath, processedContent, 'utf-8');

console.log(`\n处理完成！`);
console.log(`共替换了 ${totalReplacements} 个来源信息`);
console.log(`文件已保存到: ${htmlPath}`);

// 创建备份
const backupPath = htmlPath.replace('.html', '_backup.html');
fs.copyFileSync(htmlPath, backupPath);
console.log(`备份已创建: ${backupPath}`);