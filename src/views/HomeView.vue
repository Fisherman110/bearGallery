<script setup>
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const { t } = useI18n()

const goToSeekingPage = () => {
  router.push('/seeking')
}

const goToLifePage = () => {
  router.push('/life')
}
</script>

<template>
  <div class="page-container home-page">
    <div class="card">
      <div class="icon-wrapper">
        <span class="icon">🐻</span>
      </div>
      <h1 class="title">{{ t('home.title') }}</h1>
      <p class="subtitle">{{ t('home.subtitle') }}</p>
      <div class="divider"></div>
      <p class="description">
        {{ t('home.description') }}
      </p>
      
      <div class="button-group">
        <button class="btn btn-seeking" @click="goToSeekingPage">
          <span class="btn-icon">🎓</span>
          {{ t('home.btnSeeking') }}
          <span class="arrow">→</span>
        </button>
        
        <button class="btn btn-life" @click="goToLifePage">
          <span class="btn-icon">🌸</span>
          {{ t('home.btnLife') }}
          <span class="arrow">→</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  padding: 20px;
  box-sizing: border-box;
}

.card {
  background: white;
  border-radius: 20px;
  padding: 50px 40px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 520px;
  width: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.8);
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.icon-wrapper {
  font-size: 54px;
  margin-bottom: 20px;
  display: inline-block;
  background: #eef2f7;
  width: 90px;
  height: 90px;
  line-height: 90px;
  border-radius: 50%;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
}

.title {
  color: #2c3e50;
  font-size: 32px;
  margin-bottom: 6px;
  font-weight: 700;
  letter-spacing: 1px;
}

.subtitle {
  color: #7f8c8d;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 20px;
  letter-spacing: 2px;
}

.divider {
  height: 3px;
  width: 80px;
  background: linear-gradient(90deg, #3498db, #9b59b6);
  margin: 0 auto 24px auto;
  border-radius: 2px;
}

.description {
  color: #7f8c8d;
  font-size: 16px;
  line-height: 1.7;
  margin-bottom: 35px;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
}

.btn {
  color: white;
  border: none;
  padding: 16px 28px;
  font-size: 17px;
  font-weight: 600;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.btn-icon {
  font-size: 20px;
  margin-right: 8px;
}

.arrow {
  transition: transform 0.2s ease;
  font-size: 18px;
}

/* 四年求索按钮样式 */
.btn-seeking {
  background: linear-gradient(135deg, #5dade2 0%, #3498db 100%);
  box-shadow: 0 6px 15px rgba(52, 152, 219, 0.3);
}

.btn-seeking:hover {
  background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
  box-shadow: 0 8px 20px rgba(52, 152, 219, 0.4);
  transform: translateY(-2px);
}

/* 人间四年按钮样式 */
.btn-life {
  background: linear-gradient(135deg, #af7ac5 0%, #9b59b6 100%);
  box-shadow: 0 6px 15px rgba(155, 89, 182, 0.3);
}

.btn-life:hover {
  background: linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%);
  box-shadow: 0 8px 20px rgba(155, 89, 182, 0.4);
  transform: translateY(-2px);
}

.btn:active {
  transform: translateY(1px);
}

.btn:hover .arrow {
  transform: translateX(4px);
}

/* ==========================================================================
   媒体查询适配 (Media Queries for Responsiveness)
   ========================================================================== */

/* 平板设备 (Tablets: 768px ~ 1024px) */
@media (min-width: 768px) and (max-width: 1024px) {
  .card {
    padding: 40px 30px;
    max-width: 480px;
  }
  
  .icon-wrapper {
    width: 80px;
    height: 80px;
    line-height: 80px;
    font-size: 48px;
  }
  
  .title {
    font-size: 28px;
  }
  
  .subtitle {
    font-size: 15px;
  }
  
  .description {
    font-size: 15px;
    margin-bottom: 30px;
  }
  
  .btn {
    padding: 14px 24px;
    font-size: 16px;
  }
}

/* 手机设备 (Mobile Phones: 小于 768px) */
@media (max-width: 767px) {
  .page-container {
    padding: 15px;
  }

  .card {
    padding: 30px 20px;
    border-radius: 16px;
  }
  
  .icon-wrapper {
    width: 75px;
    height: 75px;
    line-height: 75px;
    font-size: 42px;
    margin-bottom: 16px;
  }
  
  .title {
    font-size: 24px;
    margin-bottom: 4px;
  }
  
  .subtitle {
    font-size: 14px;
    margin-bottom: 16px;
    letter-spacing: 1px;
  }
  
  .divider {
    width: 60px;
    margin-bottom: 16px;
  }
  
  .description {
    font-size: 14px;
    line-height: 1.6;
    margin-bottom: 24px;
  }
  
  .button-group {
    gap: 12px;
  }
  
  .btn {
    padding: 12px 20px;
    font-size: 15px;
    border-radius: 10px;
  }
  
  .btn-icon {
    font-size: 18px;
  }
}
</style>
