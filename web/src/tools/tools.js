import {isVideo, isImg, isPs, isZip, isAudio, isDoc, isExcel} from "../../utils/fileTypeUtils";

/**
 * 存储当前文件夹的滚动位置
 */
export const setScroll = (path,scroll) => {
    console.log(path,scroll,"设置滚动位置");
    sessionStorage.setItem(path,scroll)
}

/**
 * 获取当前文件夹的滚动位置
 */
export const getScroll = (path) => {
    console.log(path,sessionStorage.getItem(path) || 0,"获取滚动位置");
    return sessionStorage.getItem(path) || 0;
}

export function sum(a, b) {
    return a + b
}

/*
 *  根据某个字段实现对json数组的排序
 * @param   array  要排序的json数组对象
 * @param   field  排序字段（此参数必须为字符串）
 * @param   reverse 是否倒序（默认为false）
 * @return  array  返回排序后的json数组
*/
export const jsonSort = function (array, field, reverse) {
    // 数组长度小于2 或 没有指定排序字段 或 不是json格式数据
    if (array.length < 2 || !field || typeof array[0] !== "object") return array;
    // 数字类型排序
    if (typeof array[0][field] === "number") {
        array.sort(function (x, y) { return x[field] - y[field] });
    }
    // 字符串类型排序
    if (typeof array[0][field] === "string") {
        array.sort(function (x, y) { return x[field].localeCompare(y[field]) });
    }
    // 判断是否需要倒序
    if (reverse) {
        array.reverse();
    }
    return array;
}

export const determineFileType = function (suffix){
    if (isVideo(suffix)) {
        return 'VIDEO';
    } else if (isImg(suffix)) {
        return 'IMG';
    } else if (isPs(suffix)) {
        return 'PS';
    } else if (isZip(suffix)) {
        return 'ZIP';
    } else if (isAudio(suffix)) {
        return 'AUDIO';
    } else if (isDoc(suffix)) {
        return 'DOC';
    } else if (isExcel(suffix)) {
        return 'EXCEL';
    } else {
        // 检查其他特殊文件类型
        const upperSuffix = suffix.toUpperCase();
        const PDF = [".PDF"];
        const DATA = [".SQL"];
        
        if (PDF.includes(upperSuffix)) {
            return 'PDF';
        } else if (DATA.includes(upperSuffix)) {
            return 'DATA';
        } else {
            return 'UNKNOWN';
        }
    }
}

/**
 * 有些链接有多个斜杠，有些没有，统一给他格式化一下
 * @param url 链接
 */
export const urlFormatting = (url)=>{
  const [protocol, rest] = url.split(/:\/\//, 2);
  if (!protocol) {
    return url; // 如果不是有效的URL（没有协议），则返回原URL
  }
  return protocol + '://' + rest.replace(/\/{2,}/g, '/');
}
