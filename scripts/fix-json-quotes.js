#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// 修复单个JSON文件中的中文引号
function fixJsonQuotes(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    
    // 替换所有中文引号
    content = content
      .replace(/"/g, '"')  // 左双引号
      .replace(/"/g, '"')  // 右双引号  
      .replace(/'/g, "'")  // 左单引号
      .replace(/'/g, "'")  // 右单引号
      .replace(/（/g, "(")  // 中文左括号
      .replace(/）/g, ")")  // 中文右括号
      .replace(/，/g, ",")  // 中文逗号
      .replace(/。/g, ".")  // 中文句号
      .replace(/：/g, ":")  // 中文冒号
      .replace(/；/g, ";")  // 中文分号
      .replace(/！/g, "!")  // 中文感叹号
      .replace(/？/g, "?"); // 中文问号
    
    // 验证JSON格式
    try {
      JSON.parse(content);
      
      // 如果内容有变化，写回文件
      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ 修复了文件: ${path.basename(filePath)}`);
        return true;
      }
      return false;
    } catch (parseError) {
      console.error(`❌ 文件 ${path.basename(filePath)} 修复后仍有JSON格式错误:`, parseError.message);
      return false;
    }
  } catch (error) {
    console.error(`❌ 处理文件 ${filePath} 时出错:`, error.message);
    return false;
  }
}

// 处理所有数据文件
function fixAllDataFiles() {
  const dataDir = path.join(__dirname, '..', 'data');
  const files = fs.readdirSync(dataDir).filter(file => file.endsWith('.json'));
  
  console.log('开始检查和修复JSON文件...\n');
  
  let fixedCount = 0;
  files.forEach(file => {
    const filePath = path.join(dataDir, file);
    if (fixJsonQuotes(filePath)) {
      fixedCount++;
    }
  });
  
  console.log(`\n✨ 完成！共修复了 ${fixedCount} 个文件。`);
}

// 如果直接运行脚本
if (require.main === module) {
  fixAllDataFiles();
}

module.exports = { fixJsonQuotes, fixAllDataFiles };