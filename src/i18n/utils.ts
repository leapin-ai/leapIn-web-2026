import zhTranslations from './locales/zh.json';
import enTranslations from './locales/en.json';

export type Language = 'zh' | 'en';

const translations = {
  zh: zhTranslations,
  en: enTranslations,
};

export function getTranslations(lang: Language) {
  return translations[lang] || translations.zh;
}

export function detectLanguage(): Language {
  // 服务端渲染时返回默认语言
  if (typeof window === 'undefined') {
    return 'zh';
  }

  // 0. 先检查 runtimeEnv（通过 npm-tools entryHtml 注入的环境变量优先级最高）
  if ((window as any).runtimeEnv?.locale === 'en') {
    return 'en';
  }

  // 1. 再检查 localStorage
  const savedLang = localStorage.getItem('language');
  if (savedLang === 'zh' || savedLang === 'en') {
    return savedLang;
  }

  // 2. 检查浏览器语言
  const browserLang = navigator.language.toLowerCase();
  
  // 如果是中文相关语言，返回中文
  if (browserLang.startsWith('zh')) {
    return 'zh';
  }
  
  // 如果是英文相关语言，返回英文
  if (browserLang.startsWith('en')) {
    return 'en';
  }

  // 3. 其他语言默认返回中文
  return 'zh';
}

export function setLanguage(lang: Language) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('language', lang);
  }
}

export function getCurrentLanguage(): Language {
  if (typeof window === 'undefined') {
    return 'zh';
  }
  
  const path = window.location.pathname;
  return path.startsWith('/en') ? 'en' : 'zh';
}
