#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// 定义所有需要替换的中文标点符号
const replacements = [
  // 中文引号
  [/"/g, '"'],     // U+201C 左双引号
  [/"/g, '"'],     // U+201D 右双引号  
  [/'/g, "'"],     // U+2018 左单引号
  [/'/g, "'"],     // U+2019 右单引号
  [/″/g, '"'],     // U+2033 双撇号
  [/‴/g, "'"],     // U+2034 三撇号
  [/〝/g, '"'],    // U+301D 日式左双引号
  [/〞/g, '"'],    // U+301E 日式右双引号
  [/「/g, '"'],    // U+300C 日式左引号
  [/」/g, '"'],    // U+300D 日式右引号
  [/『/g, '"'],    // U+300E 日式左双引号
  [/』/g, '"'],    // U+300F 日式右双引号
  
  // 中文标点
  [/，/g, ','],    // U+FF0C 全角逗号
  [/。/g, '.'],    // U+3002 中文句号
  [/、/g, ','],    // U+3001 顿号
  [/；/g, ';'],    // U+FF1B 全角分号
  [/：/g, ':'],    // U+FF1A 全角冒号
  [/？/g, '?'],    // U+FF1F 全角问号
  [/！/g, '!'],    // U+FF01 全角感叹号
  [/（/g, '('],    // U+FF08 全角左括号
  [/）/g, ')'],    // U+FF09 全角右括号
  [/【/g, '['],    // U+3010 左方括号
  [/】/g, ']'],    // U+3011 右方括号
  [/《/g, '<'],    // U+300A 左书名号
  [/》/g, '>'],    // U+300B 右书名号
  [/－/g, '-'],    // U+FF0D 全角减号
  [/～/g, '~'],    // U+FF5E 全角波浪号
  [/…/g, '...'],  // U+2026 省略号
  [/—/g, '-'],    // U+2014 破折号
  [/–/g, '-'],    // U+2013 短破折号
  
  // 其他可能的引号变体
  [/\u0022/g, '"'],  // 标准双引号
  [/\u0027/g, "'"],  // 标准单引号
  [/\u201c/g, '"'],  // 左双引号
  [/\u201d/g, '"'],  // 右双引号
  [/\u2018/g, "'"],  // 左单引号
  [/\u2019/g, "'"],  // 右单引号
  [/\u201e/g, '"'],  // 低双引号
  [/\u201a/g, "'"],  // 低单引号
  [/\u201f/g, '"'],  // 双高反引号
  [/\u201b/g, "'"],  // 单高反引号
];

// 修复单个JSON文件
function fixJsonFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    
    // 应用所有替换规则
    replacements.forEach(([pattern, replacement]) => {
      content = content.replace(pattern, replacement);
    });
    
    // 验证JSON格式
    try {
      JSON.parse(content);
      
      // 如果内容有变化，写回文件
      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ 修复了文件: ${path.basename(filePath)}`);
        return true;
      } else {
        console.log(`✔️  文件已经是正确格式: ${path.basename(filePath)}`);
        return false;
      }
    } catch (parseError) {
      console.error(`❌ 文件 ${path.basename(filePath)} 修复后仍有JSON格式错误:`, parseError.message);
      // 保存修复后的内容，即使JSON解析失败
      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`⚠️  已尝试修复，但仍有JSON错误`);
      }
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
  
  console.log('开始检查和修复JSON文件中的中文标点符号...\n');
  
  let fixedCount = 0;
  let errorCount = 0;
  
  files.forEach(file => {
    const filePath = path.join(dataDir, file);
    const result = fixJsonFile(filePath);
    if (result === true) {
      fixedCount++;
    } else if (result === false && file.includes('❌')) {
      errorCount++;
    }
  });
  
  console.log(`\n✨ 完成！`);
  console.log(`   ✅ 修复了 ${fixedCount} 个文件`);
  if (errorCount > 0) {
    console.log(`   ⚠️  ${errorCount} 个文件可能需要手动检查`);
  }
  
  return errorCount === 0;
}

// 如果直接运行脚本
if (require.main === module) {
  const success = fixAllDataFiles();
  process.exit(success ? 0 : 1);
}

module.exports = { fixJsonFile, fixAllDataFiles };