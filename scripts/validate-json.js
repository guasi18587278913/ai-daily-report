#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// 验证单个JSON文件
function validateJsonFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // 检查是否包含中文标点和特殊Unicode字符
    const chineseChars = {};
    
    // 检测所有非ASCII引号字符
    const quoteRegex = /[\u2018-\u201F\u2032-\u2037\u301D-\u301F\u300C-\u300F\u201A\u201B\u201E\u201F]/g;
    const quotes = content.match(quoteRegex) || [];
    quotes.forEach(char => {
      const code = char.charCodeAt(0).toString(16).toUpperCase();
      chineseChars[char] = `Unicode U+${code}`;
    });
    
    // 添加其他中文标点
    const punctuations = {
      '，': '中文逗号',
      '。': '中文句号',
      '、': '顿号',
      '；': '中文分号',
      '：': '中文冒号',
      '？': '中文问号',
      '！': '中文感叹号',
      '（': '中文左括号',
      '）': '中文右括号',
      '【': '左方括号',
      '】': '右方括号',
      '《': '左书名号',
      '》': '右书名号',
      '－': '全角减号',
      '～': '全角波浪号',
      '…': '省略号',
      '—': '破折号',
      '–': '短破折号'
    };
    
    Object.entries(punctuations).forEach(([char, name]) => {
      if (content.includes(char)) {
        chineseChars[char] = name;
      }
    });
    
    const foundChineseChars = [];
    for (const [char, name] of Object.entries(chineseChars)) {
      if (content.includes(char)) {
        foundChineseChars.push(`${char} (${name})`);
      }
    }
    
    // 验证JSON格式
    try {
      const data = JSON.parse(content);
      
      if (foundChineseChars.length > 0) {
        console.log(`⚠️  ${path.basename(filePath)} 包含中文标点符号:`);
        foundChineseChars.forEach(char => console.log(`   - ${char}`));
        return false;
      }
      
      console.log(`✅ ${path.basename(filePath)} 格式正确`);
      return true;
    } catch (parseError) {
      console.error(`❌ ${path.basename(filePath)} JSON格式错误:`, parseError.message);
      if (foundChineseChars.length > 0) {
        console.log(`   可能原因：包含中文标点符号`);
        foundChineseChars.forEach(char => console.log(`   - ${char}`));
      }
      return false;
    }
  } catch (error) {
    console.error(`❌ 无法读取文件 ${filePath}:`, error.message);
    return false;
  }
}

// 验证所有数据文件
function validateAllDataFiles() {
  const dataDir = path.join(__dirname, '..', 'data');
  const files = fs.readdirSync(dataDir).filter(file => file.endsWith('.json'));
  
  console.log('开始验证JSON文件...\n');
  
  let validCount = 0;
  let invalidCount = 0;
  
  files.forEach(file => {
    const filePath = path.join(dataDir, file);
    if (validateJsonFile(filePath)) {
      validCount++;
    } else {
      invalidCount++;
    }
  });
  
  console.log(`\n📊 验证完成：`);
  console.log(`   ✅ 有效文件：${validCount}`);
  console.log(`   ❌ 无效文件：${invalidCount}`);
  
  return invalidCount === 0;
}

// 如果直接运行脚本
if (require.main === module) {
  const isValid = validateAllDataFiles();
  process.exit(isValid ? 0 : 1);
}

module.exports = { validateJsonFile, validateAllDataFiles };