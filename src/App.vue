<script setup>
import { RouterView } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

// 切换语言函数
const toggleLanguage = () => {
  const nextLang = locale.value === 'zh' ? 'en' : 'zh'
  locale.value = nextLang
  localStorage.setItem('user-lang', nextLang)
}
</script>

<template>
  <!-- 全局语言切换按钮 -->
  <button class="lang-toggle-btn" @click="toggleLanguage" :title="locale === 'zh' ? 'Switch to English' : '切换为中文'">
    <span class="lang-icon">🌐</span>
    <span class="lang-text">{{ locale === 'zh' ? 'EN' : '中文' }}</span>
  </button>

  <RouterView />
</template>

<style>
/* 全局样式重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* 全局悬浮语言切换按钮样式 */
.lang-toggle-btn {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 999;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(0, 0, 0, 0.08);
  color: #2c3e50;
  padding: 10px 16px;
  border-radius: 30px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.lang-toggle-btn:hover {
  background: white;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  border-color: rgba(0, 0, 0, 0.15);
}

.lang-toggle-btn:active {
  transform: translateY(0);
}

.lang-icon {
  font-size: 16px;
}

/* 手机端按钮位置微调，避免遮挡内容 */
@media (max-width: 767px) {
  .lang-toggle-btn {
    top: 15px;
    right: 15px;
    padding: 8px 12px;
    font-size: 12px;
  }
}
</style>
