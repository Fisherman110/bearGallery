import { createI18n } from 'vue-i18n'
import zh from '../locales/zh.json'
import en from '../locales/en.json'

// 获取浏览器语言或默认使用中文
const getSavedLanguage = () => {
  const saved = localStorage.getItem('user-lang')
  if (saved) return saved
  
  const navLang = navigator.language || navigator.userLanguage
  if (navLang && navLang.startsWith('en')) {
    return 'en'
  }
  return 'zh'
}

const i18n = createI18n({
  legacy: false, // 使用 Composition API
  locale: getSavedLanguage(),
  fallbackLocale: 'zh',
  messages: {
    zh,
    en
  }
})

export default i18n
export { getSavedLanguage }
