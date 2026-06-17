<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { getSchoolGallery } from '../utils/gallery'

const router = useRouter()
const { t, locale } = useI18n()

const goBack = () => {
  router.push('/')
}

// 动态扫描并加载的原始画廊数据
const rawGalleryItems = ref([])

onMounted(() => {
  // 从工具函数获取动态匹配的画廊数据
  rawGalleryItems.value = getSchoolGallery()
})

// 响应式的图片数据列表，动态获取当前语言的翻译内容
const galleryItems = computed(() => {
  return rawGalleryItems.value.map(item => {
    const langData = item[locale.value] || item.zh // 备用中文
    return {
      id: item.id,
      url: item.url,
      title: langData.title,
      desc: langData.desc,
      date: langData.date
    }
  })
})

// 灯箱预览状态
const isLightboxOpen = ref(false)
const activeImage = ref(null)

const openLightbox = (item) => {
  activeImage.value = item
  isLightboxOpen.value = true
}

const closeLightbox = () => {
  isLightboxOpen.value = false
  activeImage.value = null
}

// 横向滚动控制
const scrollContainer = ref(null)

const scrollLeft = () => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollBy({ left: -320, behavior: 'smooth' })
  }
}

const scrollRight = () => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollBy({ left: 320, behavior: 'smooth' })
  }
}
</script>

<template>
  <div class="page-container seeking-page">
    <div class="content-wrapper">
      <!-- 头部介绍卡片 -->
      <div class="card intro-card">
        <div class="icon-wrapper">
          <span class="icon">🎓</span>
        </div>
        <h1 class="title">{{ t('seeking.title') }}</h1>
        <p class="subtitle">{{ t('seeking.subtitle') }}</p>
        <div class="divider"></div>
        <p class="description">
          {{ t('seeking.description') }}
        </p>
        <button class="btn btn-seeking" @click="goBack">
          <span class="arrow">←</span>
          {{ t('common.backHome') }}
        </button>
      </div>

      <!-- 图片画廊区域 (支持横向/纵向平滑滚动) -->
      <div class="gallery-section">
        <div class="section-header">
          <h2 class="section-title">📷 {{ t('seeking.gallerySection') }}</h2>
          <!-- 滚动导航按钮 (PC端/平板端可见) -->
          <div class="scroll-controls" v-if="galleryItems.length > 0">
            <button class="scroll-btn prev" @click="scrollLeft" aria-label="Scroll Left">‹</button>
            <button class="scroll-btn next" @click="scrollRight" aria-label="Scroll Right">›</button>
          </div>
        </div>

        <!-- 滚动容器 -->
        <div class="gallery-scroll-container" ref="scrollContainer">
          <div 
            v-for="item in galleryItems" 
            :key="item.id" 
            class="gallery-item"
            @click="openLightbox(item)"
          >
            <div class="image-container">
              <img :src="item.url" :alt="item.title" class="gallery-img" loading="lazy" />
              <div class="image-overlay">
                <span class="zoom-icon">🔍 {{ t('common.clickZoom') }}</span>
              </div>
              <span class="tag-date">{{ item.date }}</span>
            </div>
            <div class="item-info">
              <h3 class="item-title">{{ item.title }}</h3>
              <p class="item-desc">{{ item.desc }}</p>
            </div>
          </div>

          <!-- 空白提示 -->
          <div v-if="galleryItems.length === 0" class="empty-gallery">
            <p>暂无图片，请在 src/img/4Yschool 目录中放置图片并配置 info.json</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 全屏图片预览灯箱 -->
    <Transition name="fade">
      <div v-if="isLightboxOpen" class="lightbox-overlay" @click="closeLightbox">
        <button class="close-btn" @click.stop="closeLightbox">&times;</button>
        <div class="lightbox-content" @click.stop>
          <img :src="activeImage.url" :alt="activeImage.title" class="lightbox-img" />
          <div class="lightbox-caption">
            <h3>{{ activeImage.title }}</h3>
            <p>{{ activeImage.desc }}</p>
            <span class="lightbox-date">{{ activeImage.date }}</span>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  padding: 40px 20px;
  box-sizing: border-box;
  overflow-x: hidden;
}

.content-wrapper {
  max-width: 1500px; /* 让 PC 端更加开阔，展示大尺寸画面 */
  width: 100%;
  display: flex;
  flex-direction: column; /* 保持上下布局 */
  gap: 30px;
  align-items: stretch;
}

/* 介绍卡片样式 - PC端采用超扁平、高集成的横向 Grid 布局 */
.intro-card {
  background: white;
  border-radius: 16px;
  padding: 20px 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  display: grid;
  grid-template-columns: auto auto 1fr auto;
  grid-template-rows: auto auto;
  align-items: center;
  gap: 6px 20px;
  border: 1px solid rgba(255, 255, 255, 0.8);
  width: 100%;
  box-sizing: border-box;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.intro-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.12);
}

.icon-wrapper {
  grid-column: 1;
  grid-row: 1 / span 2;
  font-size: 32px;
  background: #f0f3ff;
  width: 60px;
  height: 60px;
  line-height: 60px;
  border-radius: 50%;
  text-align: center;
  box-shadow: 0 4px 12px rgba(142, 197, 252, 0.2);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 0;
}

.title {
  grid-column: 2;
  grid-row: 1;
  color: #2c3e50;
  font-size: 24px;
  font-weight: 700;
  margin: 0;
  letter-spacing: 0.5px;
}

.subtitle {
  grid-column: 2;
  grid-row: 2;
  color: #95a5a6;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0;
}

.divider {
  display: none; /* 扁平化设计隐藏长分割线 */
}

.description {
  grid-column: 3;
  grid-row: 1 / span 2;
  color: #5d6d7e;
  font-size: 14px;
  line-height: 1.6;
  margin: 0;
  padding: 0 25px;
  border-left: 1px solid rgba(0, 0, 0, 0.08);
}

.btn {
  grid-column: 4;
  grid-row: 1 / span 2;
  background: linear-gradient(135deg, #8ec5fc 0%, #a1c4fd 100%);
  color: #2c3e50;
  border: none;
  padding: 12px 26px;
  font-size: 15px;
  font-weight: 600;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-shadow: 0 5px 15px rgba(142, 197, 252, 0.25);
  white-space: nowrap;
  width: auto;
}

.btn:hover {
  background: linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%);
  box-shadow: 0 6px 18px rgba(142, 197, 252, 0.35);
  transform: translateY(-2px);
}

.btn:active {
  transform: translateY(1px);
}

.arrow {
  transition: transform 0.2s ease;
}

.btn:hover .arrow {
  transform: translateX(-4px);
}

.btn:hover .arrow {
  transform: translateX(-4px);
}

/* 画廊区域样式 - 占据剩余 75% 空间 (> 2/3) */
.gallery-section {
  flex: 1; /* 弹性拉伸，占满并列剩余所有空间 */
  min-width: 0; /* 极其重要：防止 Flexbox 子元素溢出 */
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section-title {
  color: white;
  font-size: 24px;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  letter-spacing: 1px;
}

.scroll-controls {
  display: flex;
  gap: 10px;
}

.scroll-btn {
  background: rgba(255, 255, 255, 0.8);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 24px;
  line-height: 38px;
  color: #2c3e50;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.scroll-btn:hover {
  background: white;
  transform: scale(1.05);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
}

.scroll-btn:active {
  transform: scale(0.95);
}

/* 核心滚动容器 */
.gallery-scroll-container {
  display: flex;
  gap: 30px;
  overflow-x: auto; /* 启用横向滚动 */
  overflow-y: hidden;
  padding: 10px 5px 25px 5px;
  width: 100%;
  scroll-behavior: smooth;
  /* 隐藏滚动条，但保留滚动功能 */
  scrollbar-width: thin; /* Firefox */
  scrollbar-color: rgba(255, 255, 255, 0.5) transparent;
}

/* Chrome, Safari, Opera 滚动条样式 */
.gallery-scroll-container::-webkit-scrollbar {
  height: 8px;
}

.gallery-scroll-container::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}

.gallery-scroll-container::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
}

.gallery-scroll-container::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.8);
}

.gallery-item {
  flex: 0 0 520px; /* PC端画廊卡片宽度从 420px 调大至 520px (大幅度增加图片显示占比) */
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.5);
}

.gallery-item:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.15);
}

.image-container {
  position: relative;
  width: 100%;
  padding-top: 80%; /* 比例从 68% 调大至 80%，让图片高大、显眼，视觉重心极其突出 */
  background-color: #f7f9fa;
  overflow: hidden;
}

.gallery-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.gallery-item:hover .gallery-img {
  transform: scale(1.06);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.35);
  opacity: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.3s ease;
}

.gallery-item:hover .image-overlay {
  opacity: 1;
}

.zoom-icon {
  color: white;
  background: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.tag-date {
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(142, 197, 252, 0.95);
  color: #2c3e50;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(2px);
}

.item-info {
  padding: 24px;
}

.item-title {
  color: #2c3e50;
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-desc {
  color: #7f8c8d;
  font-size: 14px;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 45px; /* 固定高度，防止文本高度不一导致卡片错落 */
}

.empty-gallery {
  width: 100%;
  text-align: center;
  padding: 40px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  color: white;
  border: 2px dashed rgba(255, 255, 255, 0.4);
}

/* 灯箱效果样式 */
.lightbox-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
}

.close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: white;
  font-size: 40px;
  cursor: pointer;
  z-index: 1010;
  transition: transform 0.2s ease, color 0.2s ease;
}

.close-btn:hover {
  transform: scale(1.1);
  color: #e0c3fc;
}

.lightbox-content {
  max-width: 800px;
  width: 100%;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
  animation: zoomIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.lightbox-img {
  width: 100%;
  max-height: 70vh;
  object-fit: contain;
  background: #000;
  display: block;
}

.lightbox-caption {
  padding: 25px;
  background: white;
  position: relative;
}

.lightbox-caption h3 {
  color: #2c3e50;
  font-size: 20px;
  margin-bottom: 10px;
}

.lightbox-caption p {
  color: #7f8c8d;
  font-size: 15px;
  line-height: 1.6;
}

.lightbox-date {
  position: absolute;
  top: 25px;
  right: 25px;
  background: #f0f3ff;
  color: #3498db;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

/* 动效 */
@keyframes zoomIn {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* ==========================================================================
   媒体查询适配 (Media Queries for Responsiveness)
   ========================================================================== */

/* 平板设备 (Tablets: 768px ~ 1024px) */
@media (max-width: 1024px) {
  .content-wrapper {
    flex-direction: column;
    gap: 25px;
  }

  /* 平板端也采用横向 Grid 极简顶部，不占用过多垂直空间 */
  .intro-card {
    grid-template-columns: auto 1fr auto;
    grid-template-rows: auto auto;
    padding: 15px 25px;
    gap: 10px 20px;
    flex: none;
    position: static;
  }

  .intro-card .icon-wrapper {
    grid-column: 1;
    grid-row: 1 / span 2;
    width: 50px;
    height: 50px;
    line-height: 50px;
    font-size: 26px;
  }
  
  .intro-card .title {
    grid-column: 2;
    grid-row: 1;
    font-size: 20px;
  }

  .intro-card .subtitle {
    grid-column: 2;
    grid-row: 2;
    font-size: 11px;
  }

  .intro-card .description {
    display: none; /* 平板端隐藏描述以腾出空间给下方的图片 */
  }

  .intro-card .btn {
    grid-column: 3;
    grid-row: 1 / span 2;
    padding: 10px 20px;
    font-size: 14px;
    width: auto;
    margin: 0;
  }
  
  .gallery-scroll-container {
    gap: 20px;
  }

  .gallery-item {
    flex: 0 0 440px; /* 平板端卡片稍微收紧，保持合适占比 */
  }
  
  .item-info {
    padding: 20px;
  }
  
  .lightbox-content {
    max-width: 90%;
  }
}

/* 手机设备 (Mobile Phones: 小于 768px) */
@media (max-width: 767px) {
  .page-container {
    padding: 15px 10px;
    height: 100vh; /* 手机端填满全屏高度 */
    overflow-y: hidden; /* 整体页面不允许上下滚动 */
  }

  .content-wrapper {
    flex-direction: column;
    height: 100%;
    gap: 15px;
    justify-content: space-between;
  }

  /* 极致缩减手机端的头部介绍栏，确保它占整个屏幕高度的比例低于 15% */
  .intro-card {
    display: flex !important; /* 强制覆盖 Grid，采用 Flex */
    flex-direction: row;
    align-items: center;
    justify-content: space-between; /* 横向并排 */
    padding: 12px 16px;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
    text-align: left;
    gap: 10px;
    flex: 0 0 auto;
    width: 100%;
    box-sizing: border-box;
  }
  
  /* 隐藏所有多余的元素，把高度完全腾给下方的画廊区域 */
  .intro-card .icon-wrapper,
  .intro-card .subtitle,
  .intro-card .divider,
  .intro-card .description {
    display: none !important;
  }
  
  .intro-card .title {
    grid-column: auto;
    grid-row: auto;
    font-size: 18px; /* 大幅缩小标题 */
    margin: 0;
    font-weight: 800;
    color: #2c3e50;
  }
  
  .intro-card .btn {
    grid-column: auto;
    grid-row: auto;
    padding: 8px 16px;
    font-size: 13px;
    border-radius: 15px;
    width: auto; /* 恢复自适应宽度 */
    margin: 0;
  }

  .gallery-section {
    flex: 1; /* 让画廊区域填满剩余的所有空间（此时占了大概 80% 以上的屏幕高度！） */
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 0; /* 关键：允许子项自由收缩 */
  }

  .section-header {
    margin-bottom: 10px;
    padding: 0 5px;
  }

  .section-title {
    font-size: 16px;
  }

  /* 手机端允许横向滑动，同时支持手势滑动，取消左右控制按钮 */
  .scroll-controls {
    display: none;
  }

  .gallery-scroll-container {
    gap: 15px;
    padding: 5px;
    flex: 1;
    align-items: center; /* 垂直居中 */
  }

  .gallery-item {
    flex: 0 0 85vw; /* 手机端每张卡片占据视口 85% 宽度，直接成为绝对焦点！ */
    height: calc(100% - 20px); /* 让卡片高度几乎填满画廊容器 */
    max-height: 58vh; /* 严格限高，保证其优雅地立于手机屏幕中央 */
    display: flex;
    flex-direction: column;
  }

  .image-container {
    flex: 1; /* 让图片占满卡片除文字外的所有空间，直接顶满 */
    padding-top: 0; /* 禁用原有的 padding 百分比撑高，交由 flex 自由拉伸 */
    height: 0;
  }

  .item-info {
    padding: 14px;
    flex: 0 0 auto; /* 高度自适应 */
  }

  .item-title {
    font-size: 15px;
    margin-bottom: 4px;
  }

  .item-desc {
    font-size: 12px;
    line-height: 1.4;
    height: 34px;
    -webkit-line-clamp: 2;
  }

  .lightbox-caption {
    padding: 15px;
  }

  .lightbox-caption h3 {
    font-size: 18px;
    margin-bottom: 6px;
  }

  .lightbox-caption p {
    font-size: 13px;
    line-height: 1.5;
  }

  .lightbox-date {
    top: 15px;
    right: 15px;
  }
}
</style>
