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

  // 1. 仅当用户主动切换语言时使用 localStorage
  if (localStorage.getItem('languageManual') === '1') {
    const savedLang = localStorage.getItem('language');
    if (savedLang === 'zh' || savedLang === 'en') {
      return savedLang;
    }
  }

  // 2. 中文站默认中文（不跟随浏览器/系统语言）
  return 'zh';
}

export function setLanguage(lang: Language) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('language', lang);
    localStorage.setItem('languageManual', '1');
  }
}

export function getCurrentLanguage(): Language {
  if (typeof window === 'undefined') {
    return 'zh';
  }
  
  const path = window.location.pathname;
  return path.startsWith('/en') ? 'en' : 'zh';
}
