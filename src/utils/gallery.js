/**
 * 动态扫描并加载指定目录下的图片与 info.json 描述文件，
 * 并将其合并为画廊所需的结构化数据。
 */

// 1. 扫描 4Yschool 目录下的所有图片和 info.json
const schoolImages = import.meta.glob('../img/4Yschool/*.{png,jpg,jpeg,PNG,JPG,JPEG}', { eager: true, import: 'default' })
const schoolInfo = import.meta.glob('../img/4Yschool/info.json', { eager: true, import: 'default' })

// 2. 扫描 4Yearth 目录下的所有图片和 info.json
const earthImages = import.meta.glob('../img/4Yearth/*.{png,jpg,jpeg,PNG,JPG,JPEG}', { eager: true, import: 'default' })
const earthInfo = import.meta.glob('../img/4Yearth/info.json', { eager: true, import: 'default' })

/**
 * 核心解析函数：将 import.meta.glob 扫描到的图片和 JSON 描述进行匹配
 * @param {Object} imagesGlob 扫描到的图片模块对象
 * @param {Object} infoGlob 扫描到的 JSON 描述模块对象
 * @returns {Array} 匹配合并后的画廊项列表
 */
function resolveGalleryData(imagesGlob, infoGlob) {
  // 获取 info.json 里的配置列表（通常只有一个 info.json）
  const infoKey = Object.keys(infoGlob)[0]
  const infoList = infoKey ? infoGlob[infoKey] : []
  
  if (!Array.isArray(infoList)) {
    console.warn('Gallery Loader: info.json content is not an array.')
    return []
  }

  const galleryItems = []

  // 遍历 info.json，匹配对应的图片资源
  infoList.forEach((info, index) => {
    const filename = info.filename
    
    // 在 glob 扫描到的键中寻找匹配的文件名
    const matchedKey = Object.keys(imagesGlob).find(key => key.endsWith(`/${filename}`))
    
    if (matchedKey) {
      galleryItems.push({
        id: index + 1,
        url: imagesGlob[matchedKey], // 经过 Vite 编译后的静态资源 URL
        filename: filename,
        zh: info.zh,
        en: info.en
      })
    } else {
      console.warn(`Gallery Loader: Image file "${filename}" not found in directory.`)
    }
  })

  return galleryItems
}

/**
 * 获取“四年求索”画廊数据
 */
export function getSchoolGallery() {
  return resolveGalleryData(schoolImages, schoolInfo)
}

/**
 * 获取“人间四年”画廊数据
 */
export function getEarthGallery() {
  return resolveGalleryData(earthImages, earthInfo)
}
