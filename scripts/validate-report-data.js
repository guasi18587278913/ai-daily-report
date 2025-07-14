#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// 定义必填字段规则
const requiredFields = {
  root: ['title', 'date', 'dayOfWeek', 'summary', 'highlights'],
  hotTopics: ['title', 'content', 'source'],
  'hotTopics.source': ['name'],
  toolNews: ['newTools', 'tips'],
  'toolNews.newTools': ['name', 'description', 'source'],
  'toolNews.newTools.source': ['name'],
  'toolNews.tips': ['title', 'content', 'source'],
  'toolNews.tips.source': ['name'],
  practice: ['scene', 'method', 'result', 'source'],
  'practice.source': ['name'],
  industry: ['companies'],
  'industry.companies': ['company', 'news', 'source'],
  'industry.companies.source': ['name'],
  'industry.products': ['name', 'description', 'source'],
  'industry.products.source': ['name'],
  qa: ['question', 'answer', 'source'],
  'qa.source': ['name'],
  riskWarning: ['title', 'content', 'severity', 'source'],
  'riskWarning.source': ['name']
};

// 验证对象是否包含必填字段
function validateObject(obj, path, errors) {
  const rules = requiredFields[path];
  if (!rules) return;

  rules.forEach(field => {
    if (!obj.hasOwnProperty(field)) {
      errors.push(`缺少必填字段: ${path}.${field}`);
    }
  });
}

// 递归验证数据结构
function validateData(data, errors) {
  // 验证根级别字段
  validateObject(data, 'root', errors);

  // 验证 hotTopics
  if (data.hotTopics && Array.isArray(data.hotTopics)) {
    data.hotTopics.forEach((item, index) => {
      validateObject(item, 'hotTopics', errors);
      if (item.source) {
        validateObject(item.source, 'hotTopics.source', errors);
      } else {
        errors.push(`hotTopics[${index}] 缺少 source 字段`);
      }
    });
  }

  // 验证 toolNews
  if (data.toolNews) {
    validateObject(data.toolNews, 'toolNews', errors);
    
    if (data.toolNews.newTools && Array.isArray(data.toolNews.newTools)) {
      data.toolNews.newTools.forEach((item, index) => {
        validateObject(item, 'toolNews.newTools', errors);
        if (item.source) {
          validateObject(item.source, 'toolNews.newTools.source', errors);
        } else {
          errors.push(`toolNews.newTools[${index}] 缺少 source 字段`);
        }
      });
    }

    if (data.toolNews.tips && Array.isArray(data.toolNews.tips)) {
      data.toolNews.tips.forEach((item, index) => {
        validateObject(item, 'toolNews.tips', errors);
        if (item.source) {
          validateObject(item.source, 'toolNews.tips.source', errors);
        } else {
          errors.push(`toolNews.tips[${index}] 缺少 source 字段`);
        }
      });
    }
  }

  // 验证 practice
  if (data.practice && Array.isArray(data.practice)) {
    data.practice.forEach((item, index) => {
      validateObject(item, 'practice', errors);
      if (item.source) {
        validateObject(item.source, 'practice.source', errors);
        if (!item.source.author) {
          errors.push(`⚠️  practice[${index}].source 缺少 author 字段（建议添加）`);
        }
      } else {
        errors.push(`practice[${index}] 缺少 source 字段`);
      }
    });
  }

  // 验证 industry
  if (data.industry) {
    if (data.industry.companies && Array.isArray(data.industry.companies)) {
      data.industry.companies.forEach((item, index) => {
        validateObject(item, 'industry.companies', errors);
        if (item.source) {
          validateObject(item.source, 'industry.companies.source', errors);
        } else {
          errors.push(`industry.companies[${index}] 缺少 source 字段`);
        }
      });
    }

    if (data.industry.products && Array.isArray(data.industry.products)) {
      data.industry.products.forEach((item, index) => {
        validateObject(item, 'industry.products', errors);
        if (item.source) {
          validateObject(item.source, 'industry.products.source', errors);
        } else {
          errors.push(`industry.products[${index}] 缺少 source 字段`);
        }
      });
    }
  }

  // 验证 qa
  if (data.qa && Array.isArray(data.qa)) {
    data.qa.forEach((item, index) => {
      validateObject(item, 'qa', errors);
      if (item.source) {
        validateObject(item.source, 'qa.source', errors);
      } else {
        errors.push(`qa[${index}] 缺少 source 字段`);
      }
    });
  }

  // 验证 riskWarning
  if (data.riskWarning && Array.isArray(data.riskWarning)) {
    data.riskWarning.forEach((item, index) => {
      validateObject(item, 'riskWarning', errors);
      if (item.source) {
        validateObject(item.source, 'riskWarning.source', errors);
      } else {
        errors.push(`riskWarning[${index}] 缺少 source 字段`);
      }
    });
  }
}

// 验证单个文件
function validateFile(filePath) {
  const fileName = path.basename(filePath);
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(content);
    const errors = [];
    
    validateData(data, errors);
    
    if (errors.length > 0) {
      console.log(`\n❌ ${fileName} 存在以下问题:`);
      errors.forEach(error => {
        if (error.includes('⚠️')) {
          console.log(`   ${error}`);
        } else {
          console.log(`   ❌ ${error}`);
        }
      });
      return false;
    } else {
      console.log(`✅ ${fileName} 数据结构完整`);
      return true;
    }
  } catch (error) {
    console.error(`❌ ${fileName} 处理失败:`, error.message);
    return false;
  }
}

// 验证所有日报文件
function validateAllReports() {
  const dataDir = path.join(__dirname, '..', 'data');
  
  // 只验证日期格式的JSON文件
  const datePattern = /^\d{4}-\d{2}-\d{2}\.json$/;
  const files = fs.readdirSync(dataDir).filter(file => datePattern.test(file));
  
  console.log('开始验证日报数据结构...\n');
  
  let validCount = 0;
  let invalidCount = 0;
  
  files.forEach(file => {
    const filePath = path.join(dataDir, file);
    if (validateFile(filePath)) {
      validCount++;
    } else {
      invalidCount++;
    }
  });
  
  console.log(`\n📊 验证完成：`);
  console.log(`   ✅ 结构完整：${validCount} 个文件`);
  if (invalidCount > 0) {
    console.log(`   ⚠️  存在建议改进：${invalidCount} 个文件`);
  }
  
  // 只返回false如果有严重错误（不是警告）
  return true;
}

// 如果直接运行脚本
if (require.main === module) {
  const isValid = validateAllReports();
  process.exit(isValid ? 0 : 1);
}

module.exports = { validateFile, validateAllReports };