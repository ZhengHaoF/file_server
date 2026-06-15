// 文件类型判断工具类

// 定义各种文件类型的后缀数组
const VIDEO_TYPES = [".MP4", ".AVI", ".MOV", ".FLV", ".MKV", ".TS"];
const IMG_TYPES = [".JPG", ".JPEG", ".PNG", ".WEBP"];
const PS_TYPES = [".PSD"];
const ZIP_TYPES = [".RAR", ".ZIP", ".7Z"];
const AUDIO_TYPES = [".WAV", ".MP3", ".OGG"];
const DOC_TYPES = [".DOC", ".DOCX"];
const EXCEL_TYPES = [".XLS", ".XLSX"];

/**
 * 判断是否为视频文件
 * @param {string} fileSuffix - 文件后缀名
 * @returns {boolean} 是否为视频文件
 */
export function isVideo(fileSuffix) {
  if (!fileSuffix) return false;
  return VIDEO_TYPES.includes(fileSuffix.toUpperCase());
}

/**
 * 判断是否为图片文件
 * @param {string} fileSuffix - 文件后缀名
 * @returns {boolean} 是否为图片文件
 */
export function isImg(fileSuffix) {
  if (!fileSuffix) return false;
  return IMG_TYPES.includes(fileSuffix.toUpperCase());
}

/**
 * 判断是否为PSD文件
 * @param {string} fileSuffix - 文件后缀名
 * @returns {boolean} 是否为PSD文件
 */
export function isPs(fileSuffix) {
  if (!fileSuffix) return false;
  return PS_TYPES.includes(fileSuffix.toUpperCase());
}

/**
 * 判断是否为压缩文件
 * @param {string} fileSuffix - 文件后缀名
 * @returns {boolean} 是否为压缩文件
 */
export function isZip(fileSuffix) {
  if (!fileSuffix) return false;
  return ZIP_TYPES.includes(fileSuffix.toUpperCase());
}

/**
 * 判断是否为音频文件
 * @param {string} fileSuffix - 文件后缀名
 * @returns {boolean} 是否为音频文件
 */
export function isAudio(fileSuffix) {
  if (!fileSuffix) return false;
  return AUDIO_TYPES.includes(fileSuffix.toUpperCase());
}

/**
 * 判断是否为Word文档
 * @param {string} fileSuffix - 文件后缀名
 * @returns {boolean} 是否为Word文档
 */
export function isDoc(fileSuffix) {
  if (!fileSuffix) return false;
  return DOC_TYPES.includes(fileSuffix.toUpperCase());
}

/**
 * 判断是否为Excel文档
 * @param {string} fileSuffix - 文件后缀名
 * @returns {boolean} 是否为Excel文档
 */
export function isExcel(fileSuffix) {
  if (!fileSuffix) return false;
  return EXCEL_TYPES.includes(fileSuffix.toUpperCase());
}

/**
 * 获取文件类型
 * @param {string} fileSuffix - 文件后缀名
 * @returns {string} 文件类型描述
 */
export function getFileType(fileSuffix) {
  if (!fileSuffix) return "未知类型";
  
  if (isVideo(fileSuffix)) return "视频文件";
  if (isImg(fileSuffix)) return "图片文件";
  if (isAudio(fileSuffix)) return "音频文件";
  if (isDoc(fileSuffix)) return "Word文档";
  if (isExcel(fileSuffix)) return "Excel文档";
  if (isPs(fileSuffix)) return "Photoshop文档";
  if (isZip(fileSuffix)) return "压缩文件";
  
  return "其他文件";
}