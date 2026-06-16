<template>
  <div class="main-container">
    <van-nav-bar
      left-arrow
      :theme="themeColor"
      @click-left="returnPath"
    >
      <template #title>
        <div class="path-display" :title="currentPath || '根目录'">
          {{ pathDisplayText }}
        </div>
      </template>
      <template #right>
        <div class="nav-right">
          <list-bottom
            v-if="model==='list'"
            @click="changeMode"
            theme="outline"
            size="28"
            :fill="themeColor"
            :strokeWidth="3"
          />
          <all-application
            v-else
            @click="changeMode"
            theme="outline"
            size="28"
            :fill="themeColor"
            :strokeWidth="3"
          />
          <setting-two
            @click="SetString"
            theme="outline"
            size="28"
            :fill="themeColor"
            :strokeWidth="3"
          />
        </div>
      </template>
    </van-nav-bar>
    <div class="content-area" ref="contentAreaRef">
    <InfoTable :key="infoTableKey" v-if="model === 'list'" ref="InfoTableRef" :table-data="getTableDate"
      :table-head="tableHeader" :theme-color="themeColor" @clickFile="clickFile"
      @del-file="delFile" @copy-url="copyUrl" @long-press="handleLongPress"></InfoTable>
    <ImageTable :key="imageTableKey" v-if="model === 'img'" ref="imageTableRef" :columns="columns" :img-size="imgSize"
      :onlyShowImages="onlyShowImages" :table-data="getTableDate" :table-head="tableHeader" :theme-color="themeColor"
      :server-base-url="serverBaseUrl" :video-thumbnail="videoThumbnail"
      @clickFile="clickFile" @del-file="delFile" @copy-url="copyUrl" @long-press="handleLongPress"></ImageTable>
    </div>
    <van-action-sheet
      v-model:show="showDialog"
      :actions="playActions"
      cancel-text="取消"
      @select="onPlaySelect"
    />
    <van-action-sheet
      v-model:show="showMediaActions"
      :actions="mediaActions"
      cancel-text="取消"
      @select="onMediaSelect"
    />
    <van-action-sheet
      v-model:show="showFileActions"
      :actions="fileActions"
      cancel-text="取消"
      @select="onFileSelect"
    />
    <van-action-sheet
      v-model:show="showFolderActions"
      :actions="folderActions"
      cancel-text="取消"
      @select="onFolderSelect"
    />
    <van-dialog
      v-model:show="delDialog"
      :title="delDialogTitle"
      show-cancel-button
      confirm-button-text="确定"
      cancel-button-text="取消"
      @confirm="delBtn"
      @cancel="closeBtn"
    >
      <div style="padding: 20px; text-align: center;">
        {{ delDialogMessage }}
      </div>
    </van-dialog>
    <van-popup
      v-model:show="setStringShow"
      position="right"
      :style="{ width: '80vw', height: '100%' }"
      round
    >
      <div class="settings-popup">
        <div class="settings-header">
          <van-icon name="arrow-left" @click="setStringShow = false" />
          <span class="settings-title">设置</span>
        </div>
        <div class="settings-content">
          <van-cell-group>
            <van-cell title="服务器地址">
              <template #value>
                <input class="server-url-input" v-model="serverBaseUrl" placeholder="服务器地址" />
              </template>
            </van-cell>
            <van-cell title="预览图像素">
              <template #value>
                <van-stepper v-model="imgSize" min="50" max="5000" />
              </template>
            </van-cell>
            <van-cell title="图片模式列数">
              <template #value>
                <van-stepper v-model="columns" min="2" max="6" />
              </template>
            </van-cell>
            <van-cell title="主题色">
              <template #value>
                <pick-colors :z-index="99999" width="50" v-model:value="themeColor" />
              </template>
            </van-cell>
            <van-cell title="视频打开方式">
              <template #value>
                <select class="select-input" v-model="playMode">
                  <option value="ask">每次询问</option>
                  <option value="vlc">VLC播放</option>
                  <option value="html">网页播放器</option>
                </select>
              </template>
            </van-cell>
            <van-cell title="文件排序方式">
              <template #value>
                <select class="select-input" v-model="fileSore">
                  <option value="timeStoB">时间正序</option>
                  <option value="timeBtoS">时间倒序</option>
                  <option value="sizeStoB">大小正序</option>
                  <option value="sizeBtoS">大小倒序</option>
                  <option value="nameStoB">名称正序</option>
                  <option value="nameBtoS">名称倒序</option>
                </select>
              </template>
            </van-cell>
            <van-cell title="文件夹位置">
              <template #value>
                <select class="select-input" v-model="folderSort">
                  <option value="start">最前</option>
                  <option value="end">最后</option>
                </select>
              </template>
            </van-cell>
            <van-cell title="图片模式只显示图片">
              <template #value>
                <van-switch v-model="onlyShowImages" size="20" />
              </template>
            </van-cell>
            <van-cell title="是否查看原图">
              <template #value>
                <van-switch v-model="viewOriginalImage" size="20" />
              </template>
            </van-cell>
            <van-cell title="开启视频缩略图">
              <template #value>
                <van-switch v-model="videoThumbnail" size="20" />
              </template>
            </van-cell>
          </van-cell-group>

          <van-cell-group title="系统操作">
            <van-cell title="清空缓存" is-link @click="clearCache" />
            <van-cell title="重启服务器">
              <template #value>
                <div class="restart-server">
                  <input type="number" class="PxInput" v-model="restartTheServerPwd" placeholder="密码" />
                  <van-button size="small" type="danger" @click="restartTheServer">重启</van-button>
                </div>
              </template>
            </van-cell>
          </van-cell-group>

          <div class="settings-footer">
            <van-button 
              block 
              @click="setOk"
              :color="themeColor"
              round
              size="large"
            >保存设置</van-button>
          </div>
        </div>
      </div>
    </van-popup>
    <!-- URL显示弹窗 -->
    <van-dialog
      v-model:show="showUrlDialog"
      title="文件链接"
      show-cancel-button
      confirm-button-text="复制链接"
      cancel-button-text="关闭"
      @confirm="copyCurrentUrl"
      @cancel="closeUrlDialog"
    >
      <div style="padding: 20px;">
        <div style="word-break: break-all; font-size: 14px; color: #666;">
          {{ currentFileUrl }}
        </div>
      </div>
    </van-dialog>
    <!-- 重命名弹窗 -->
    <van-dialog
      v-model:show="showRenameDialog"
      title="重命名"
      show-cancel-button
      confirm-button-text="确定"
      cancel-button-text="取消"
      @confirm="doRename"
      @cancel="closeRenameDialog"
    >
      <div style="padding: 20px;">
        <van-field v-model="renameValue" placeholder="请输入新文件名" input-align="left" />
      </div>
    </van-dialog>
    <Transition>
      <div style="height: calc(100vh - 40px);width: 100vw;position: absolute;bottom: 0;left: 0;" v-if="showVideoPlay">
        <html-video-play :key="videoKey" @video-change="handleVideoChange"
          :url="playUrl" :video-list="videoList" :current-index="playIndex"></html-video-play>
      </div>
    </Transition>
    <Transition>
      <div class="loading" v-if="showLoading">
        <div style="position: relative;width: 100%;height: 100%">
          <img class="turn" :src="loadingImg" alt="">
          <div class="text">加载中···</div>
        </div>
      </div>
    </Transition>
  </div>
</template>
<script setup>
import {AllApplication, ListBottom, SettingTwo} from "@icon-park/vue-next";
import {computed, nextTick, onMounted, onUnmounted, ref, watch} from "vue";
import axios from "axios";
import {onBeforeRouteUpdate, useRoute, useRouter} from "vue-router";
import {showImagePreview, showToast} from 'vant';
import ImageTable from "@/components/ImageTable.vue";
import InfoTable from "@/components/InfoTable.vue";
import PickColors from 'vue-pick-colors'
import {useFilePath} from '@/composables/useFilePath';
//加载框使用的图片
import loadingImg from "../assets/loading.png"
import {getScroll, jsonSort, setScroll} from "@/tools/tools";
import {getRatio} from "../../utils/utils";
import HtmlVideoPlay from "@/view/HtmlVideoPlay.vue";
import {isAudio, isImg, isText, isVideo} from "../../utils/fileTypeUtils";

const InfoTableRef = ref(null);
const imageTableRef = ref(null);
const contentAreaRef = ref(null);
const infoTableKey = ref(0);
const imageTableKey = ref(0);
const showDialog = ref(false);

const pathDisplayText = computed(() => {
  if (breadcrumbs.value.length <= 1) {
    return '根目录';
  }
  return breadcrumbs.value.map(crumb => crumb.name).join('/');
});
const playActions = [
  { name: 'VLC 播放', value: 'vlc' },
  { name: '网页播放器', value: 'html' }
];
const onPlaySelect = (action) => {
  showDialog.value = false;
  setTimeout(() => {
    playVideo(action.value);
  }, 300);
};

const mediaActions = [
  { name: '预览', value: 'preview' },
  { name: '复制链接', value: 'copy' },
  { name: '下载', value: 'download' },
  { name: '重命名', value: 'rename' },
  { name: '删除', value: 'delete' }
];
const showMediaActions = ref(false);
const onMediaSelect = (action) => {
  showMediaActions.value = false;
  setTimeout(() => {
    if (action.value === 'copy') {
      showUrlDialog.value = true;
    } else if (action.value === 'download') {
      downloadFile();
    } else if (action.value === 'preview') {
      handleFilePreview();
    } else if (action.value === 'rename') {
      const fileInfo = getTableDate.value[nowFileIndex.value];
      renamingFile.value = fileInfo;
      renameValue.value = fileInfo.name;
      showRenameDialog.value = true;
    } else if (action.value === 'delete') {
      delDialog.value = true;
    }
  }, 300);
};

const fileActions = [
  { name: '复制链接', value: 'copy' },
  { name: '下载', value: 'download' },
  { name: '重命名', value: 'rename' },
  { name: '删除', value: 'delete' }
];
const showFileActions = ref(false);
const onFileSelect = (action) => {
  showFileActions.value = false;
  setTimeout(() => {
    if (action.value === 'copy') {
      showUrlDialog.value = true;
    } else if (action.value === 'download') {
      downloadFile();
    } else if (action.value === 'rename') {
      const fileInfo = getTableDate.value[nowFileIndex.value];
      renamingFile.value = fileInfo;
      renameValue.value = fileInfo.name;
      showRenameDialog.value = true;
    } else if (action.value === 'delete') {
      delDialog.value = true;
    }
  }, 300);
};

const folderActions = [
  { name: '复制链接', value: 'copy' },
  { name: '重命名', value: 'rename' },
  { name: '删除', value: 'delete' }
];
const showFolderActions = ref(false);
const onFolderSelect = (action) => {
  showFolderActions.value = false;
  setTimeout(() => {
    if (action.value === 'copy') {
      showUrlDialog.value = true;
    } else if (action.value === 'rename') {
      const fileInfo = getTableDate.value[nowFileIndex.value];
      renamingFile.value = fileInfo;
      renameValue.value = fileInfo.name;
      showRenameDialog.value = true;
    } else if (action.value === 'delete') {
      delDialog.value = true;
    }
  }, 300);
};

const downloadFile = () => {
  let fileInfo = getTableDate.value[nowFileIndex.value];
  let a = document.createElement("a");
  a.href = getFileUrl(currentPath.value, fileInfo.name);
  a.download = fileInfo.name;
  a.target = "_blank";
  a.click();
};

const handleFilePreview = () => {
  let fileInfo = getTableDate.value[nowFileIndex.value];
  let fileSuffix = fileInfo.suffix;

  if (isVideo(fileSuffix)) {
    playUrl.value = getFileUrl(currentPath.value, fileInfo.name);
    if (playMode.value === 'ask') {
      showDialog.value = true;
    } else {
      playVideo(playMode.value);
    }
  } else if (isImg(fileSuffix)) {
    showImg();
  }
};

const delDialog = ref(false);
const delDialogTitle = computed(() => {
  const fileInfo = getTableDate.value[nowFileIndex.value];
  if (!fileInfo) return '提示';
  return fileInfo.isDirectory && !fileInfo.isFile ? '删除文件夹' : '删除文件';
});
const delDialogMessage = computed(() => {
  const fileInfo = getTableDate.value[nowFileIndex.value];
  if (!fileInfo) return '是否确认删除？';
  if (fileInfo.isDirectory && !fileInfo.isFile) {
    return `确定要删除文件夹"${fileInfo.name}"吗？文件夹内的所有内容都将被删除。`;
  }
  return `确定要删除文件"${fileInfo.name}"吗？`;
});

const router = useRouter()
const route = useRoute()
const {
  currentPath,
  breadcrumbs,
  isRoot,
  initializePath,
  enterDirectory,
  goBack,
  goToRoot,
  goToBreadcrumb
} = useFilePath()
const getDefaultServerUrl = () => {
  if(import.meta.env.MODE === "development"){
    return "http://localhost:3000";
  }
  return `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;
};
const serverBaseUrl = ref(localStorage.getItem('serverBaseUrl') || getDefaultServerUrl());
const tableData = ref([]);
const getTableDate = computed(()=>{
  let newTableDate = [];
  switch (fileSore.value) {
    case "timeStoB":
      newTableDate =  jsonSort(tableData.value, "mtime");
      break;
    case "timeBtoS":
      newTableDate = jsonSort(tableData.value, "mtime",true);
      break;
    case "sizeStoB":
      newTableDate = jsonSort(tableData.value, "sizeRow",true);
      break;
    case "sizeBtoS":
      newTableDate = jsonSort(tableData.value, "sizeRow");
      break;
    case "nameStoB":
      newTableDate = jsonSort(tableData.value, "name");
      break;
    case "nameBtoS":
      newTableDate = jsonSort(tableData.value, "name",true);
      break;
    default:
      newTableDate = tableData.value;
  }

  let newTableDate2 = [];
  switch (folderSort.value) {
    case "start":
      newTableDate.forEach((item)=>{
        if(item.isFile){
          newTableDate2.push(item)
        }else{
          newTableDate2.unshift(item)
        }
      })
      break;
    case "end":
      newTableDate.forEach((item)=>{
        if(item.isFile){
          newTableDate2.unshift(item)
        }else{
          newTableDate2.push(item)
        }
      })
      break;
    default:
      newTableDate2 = newTableDate.value;
  }
  return newTableDate2;
})
const tableHeader = ref([
  {
    span: "文件名",
    prop: "name",
    textColor: "",
    bgColor: "",
  },
  // {
  //   span: "大小",
  //   prop: "size",
  //   textColor: "red",
  //   bgColor: "red",
  // },
  // {
  //   span: "操作",
  //   prop: "cz",
  //   width: "80px",
  //   textColor: "green",
  //   bgColor: "green",
  // },
  // {
  //   span: "修改时间",
  //   prop: "mtime",
  //   width: "120px",
  //   textColor: "green",
  //   bgColor: "green",
  // },
])

//显示加载框
const showLoading = ref(false);
const showUrlDialog = ref(false);
const currentFileUrl = ref('');
// 重命名相关状态
const showRenameDialog = ref(false);
const renameValue = ref('');
const renamingFile = ref(null);

const returnPath = () => {
  if(showDialog.value || delDialog.value || setStringShow.value || showVideoPlay.value || showFileActions.value || showMediaActions.value || showRenameDialog.value){
    showDialog.value = false;
    delDialog.value = false;
    setStringShow.value = false;
    showVideoPlay.value = false;
    showFileActions.value = false;
    showMediaActions.value = false;
    showRenameDialog.value = false;
    window.history.pushState(null, null, window.location.href);
  }else if(!isRoot.value){
    goBack();
  }
}

const nowFileIndex = ref(0);


const nextVideo = () => {
  if (playIndex.value < videoList.value.length - 1) {
    playIndex.value++;
    const video = videoList.value[playIndex.value];
    playUrl.value = getFileUrl(currentPath.value, video.name);
    videoKey.value++;
  }
}

const preVideo = () => {
  if (playIndex.value > 0) {
    playIndex.value--;
    const video = videoList.value[playIndex.value];
    playUrl.value = getFileUrl(currentPath.value, video.name);
    videoKey.value++;
  }
}

const handleVideoChange = (index) => {
  if (index >= 0 && index < videoList.value.length) {
    playIndex.value = index;
    const video = videoList.value[index];
    playUrl.value = getFileUrl(currentPath.value, video.name);
    videoKey.value++;
  }
}

//查看图片
const showImg = () => {
  const currentFile = getTableDate.value[nowFileIndex.value];
  let w = (window.screen.width * getRatio() / 100).toFixed(0);

  const imageList = getTableDate.value
    .filter(item => isImg(item.suffix))
    .map((item, index) => {
      if (viewOriginalImage.value) {
        return getFileUrl(currentPath.value, item.name);
      } else {
        return getFileUrl(currentPath.value, item.name) + `!${w}x${w}`;
      }
    });

  const currentIndex = imageList.findIndex(
    url => url.includes(currentFile.name)
  );

  showImagePreview({
    images: imageList,
    startPosition: currentIndex >= 0 ? currentIndex : 0,
    closeable: true,
    closeIconPosition: 'top-left',
  });
}

const getFileUrl = (filePath, fileName) => {
  const cleanPath = filePath ? `/${filePath}` : '';
  return `${serverBaseUrl.value}/getFile${cleanPath}/${window.encodeURIComponent(fileName)}`;
}

const getFilePath = (filePath, fileName) => {
  return `${filePath}/${fileName}`;
}

const copyUrl = (index) => {
  let fileInfo = getTableDate.value[index];
  try {
    navigator.share({
      title: fileInfo.name,
      url: getFileUrl(currentPath.value, fileInfo.name),
    });
  } catch (e) {
    const url = getFileUrl(currentPath.value, fileInfo.name);
    navigator.clipboard.writeText(url).then(() => {
      showToast('链接已复制到剪贴板');
    }).catch(() => {
      showToast('复制失败');
    });
  }
}
const delFile = (index) => {
  delDialog.value = true;
  nowFileIndex.value = index;
}

const okBtn = () => {
  showDialog.value = false;
}
const closeBtn = () => {
  delDialog.value = false;
}

const delBtn = () => {
  delDialog.value = false;
  nextTick(() => {
    let fileInfo = getTableDate.value[nowFileIndex.value];
    axios.post(`${serverBaseUrl.value}/delFile`, {
      filePath: getFilePath(currentPath.value, fileInfo.name)
    }).then((res, err) => {
      if (res.status === 200) {
        getFileList();
      }
    })
  })
}

// 重命名相关
const closeRenameDialog = () => {
  showRenameDialog.value = false;
  renameValue.value = '';
  renamingFile.value = null;
}

const doRename = async () => {
  if (!renameValue.value.trim()) {
    showToast('文件名不能为空');
    return;
  }
  if (!renamingFile.value) return;

  const oldName = renamingFile.value.name;
  const newName = renameValue.value.trim();

  if (oldName === newName) {
    closeRenameDialog();
    return;
  }

  const oldPath = getFilePath(currentPath.value, oldName);
  const newPath = getFilePath(currentPath.value, newName);

  try {
    await axios.post(`${serverBaseUrl.value}/renameFile`, { oldPath, newPath });
    showToast('重命名成功');
    closeRenameDialog();
    getFileList();
  } catch (err) {
    showToast('重命名失败: ' + (err.response?.data?.msg || err.message));
  }
}


const playVideo = (t) => {
  showDialog.value = false;
  nextTick(() => {
    if (t === 'vlc') {
      window.open('vlc://' + playUrl.value)
    } else {
      showVideoPlay.value = true;
    }
  })
}

const playUrl = ref("");
const playIndex = ref(0);
const videoKey = ref(0);

const videoList = computed(() => {
  return tableData.value.filter(file => isVideo(file.suffix));
});
const clickFile = (index) => {
  //文件信息
  let fileInfo = getTableDate.value[index];
  nowFileIndex.value = index;
  if (fileInfo.isDirectory && !fileInfo.isFile) {
    const scrollY = contentAreaRef.value.scrollTop;
    setScroll(currentPath.value,scrollY)
    //是文件夹
    enterDirectory(fileInfo.name);
  } else {
    let fileSuffix = fileInfo.suffix;
    if (isVideo(fileSuffix) || isImg(fileSuffix)) {
      //视频和图片文件，弹出选择对话框（包含预览）
      currentFileUrl.value = getFileUrl(currentPath.value, fileInfo.name);
      showMediaActions.value = true;
    } else if (isAudio(fileSuffix)) {
      //音频
      router.push({
        path: "/AudioPlay",
        query: {
          url: getFileUrl(currentPath.value, fileInfo.name),
        }
      })
    } else if (isText(fileSuffix)) {
      //文本文件，跳转到文本查看器
      router.push({
        path: "/text-view",
        query: {
          url: getFileUrl(currentPath.value, fileInfo.name),
        }
      })
    } else {
      //其他文件类型，弹出选择对话框（不包含预览）
      currentFileUrl.value = getFileUrl(currentPath.value, fileInfo.name);
      showFileActions.value = true;
    }
  }
}

// 长按处理函数
const handleLongPress = (index) => {
  const fileInfo = getTableDate.value[index];
  nowFileIndex.value = index;
  currentFileUrl.value = getFileUrl(currentPath.value, fileInfo.name);
  
  if (fileInfo.isDirectory && !fileInfo.isFile) {
    // 文件夹：显示文件夹操作列表
    showFolderActions.value = true;
  } else {
    let fileSuffix = fileInfo.suffix;
    if (isVideo(fileSuffix) || isImg(fileSuffix)) {
      // 视频和图片文件：显示媒体操作列表
      showMediaActions.value = true;
    } else {
      // 其他文件类型：显示文件操作列表
      showFileActions.value = true;
    }
  }
  console.log('长按文件对象:', fileInfo);
  console.log('文件URL:', currentFileUrl.value);
}

// 关闭URL弹窗
const closeUrlDialog = () => {
  showUrlDialog.value = false;
  currentFileUrl.value = '';
}

// 复制当前URL
const copyCurrentUrl = () => {
  try {
    navigator.clipboard.writeText(currentFileUrl.value).then(() => {
      showToast('链接已复制到剪贴板');
    }).catch(() => {
      // 降级方案
      const textArea = document.createElement('textarea');
      textArea.value = currentFileUrl.value;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      showToast('链接已复制到剪贴板');
    });
  } catch (e) {
    showToast('复制失败，请手动复制');
  }
}
const getFileList = () => {
  return new Promise(resolve => {
    showLoading.value = true;
    axios.get(`${serverBaseUrl.value}/list/${window.encodeURIComponent(currentPath.value)}`).then((res, err) => {
      showLoading.value = false;
      if (res.status === 200) {
        let data = res?.data?.list;
        if (!data) {
          console.log("格式不匹配")
          return;
        }
        tableData.value = data.map((item) => {
          item['sizeRow'] = Number(item['size']);
          item['size'] = (Number(item['size']) / 1024 / 1024).toFixed(2) + "MB";
          if (item['isDirectory']) {
            item['size'] = "";
          } else {
            item['url'] = getFileUrl(currentPath.value, item.name);
            item['path'] = getFilePath(currentPath.value, item.name);
          }
          return item;
        })
        resolve();
      }
    }).catch((err) => {
      showLoading.value = false;
      if (err.response.status === 404) {
        console.log(err.response.data);
        goToRoot();
      }
      resolve();
    })
  })
}
const backChange = (event) => {
  if(event && event.preventDefault){
    event.preventDefault();
  }

  if(showDialog.value || delDialog.value || setStringShow.value || showVideoPlay.value || showRenameDialog.value){
    showDialog.value = false;
    delDialog.value = false;
    setStringShow.value = false;
    showVideoPlay.value = false;
    showRenameDialog.value = false;
    window.history.pushState(null, null, window.location.href);
    return false;
  }else{
    // 执行返回操作
    returnPath();
  }
}

onBeforeRouteUpdate((to, from, next)=>{
  console.log(to,from)
  next((vm)=>{
    getFileList();
  })
})
const model = ref("list")
//切换图片/列表模式
const changeMode = () => {
  model.value = model.value === "list" ? "img" : "list"
  localStorage.setItem("model", model.value)
}

const setStringShow = ref(false)
const showVideoPlay = ref(false)
const SetString = () => {
  setStringShow.value = true;
}

//设置菜单代码块

//主题色
const themeColor = ref("#FA7868")
//播放方式
const playMode = ref("ask");
//文件排序方式
const fileSore = ref("timeStoB");
//文件夹位置
const folderSort = ref("start");
//图片长边大小
const imgSize = ref(150)
//列数
const columns = ref(3)
const setOk = () => {
  setStringShow.value = false;
  localStorage.setItem("imgSize", String(imgSize.value))
  localStorage.setItem("playMode", String(playMode.value))
  localStorage.setItem("columns", String(columns.value))
  localStorage.setItem("fileSore", String(fileSore.value))
  localStorage.setItem("folderSort", String(folderSort.value))
  localStorage.setItem("themeColor", String(themeColor.value))
  localStorage.setItem("serverBaseUrl", String(serverBaseUrl.value))
  infoTableKey.value++;
  imageTableKey.value++;
}

const clearCache = () => {
  localStorage.clear();
  location.reload();
}


const restartTheServerPwd = ref("");
const restartTheServer = () => {
  axios.post(`${serverBaseUrl.value}/restartServer`, {
    pwd: restartTheServerPwd.value
  }).then((res) => {
    if (res.data.msg === "开始重启") {
      router.replace({
        name:"Home"
      })
    } else {
      alert(res.data.msg)
    }
  })

}

const onlyShowImages = ref(false);
const viewOriginalImage = ref(false);
const videoThumbnail = ref(true);
watch(onlyShowImages, (newName, oldName) => {
  localStorage.setItem("onlyShowImages", String(newName));
});
watch(viewOriginalImage, (newName, oldName) => {
  localStorage.setItem("viewOriginalImage", String(newName));
});
watch(videoThumbnail, (newName, oldName) => {
  localStorage.setItem("videoThumbnail", String(newName));
});


onMounted(async () => {
  initializePath();
  // 给 popstate 绑定一个方法 监听页面返回
  window.addEventListener('popstate', backChange, true);
  // 监听移动设备返回手势
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', () => {
      if (window.visualViewport.width < window.innerWidth) {
        if (showDialog.value || delDialog.value || setStringShow.value || showVideoPlay.value || showRenameDialog.value) {
          showDialog.value = false;
          delDialog.value = false;
          setStringShow.value = false;
          showVideoPlay.value = false;
          showRenameDialog.value = false;
          window.history.pushState(null, null, window.location.href);
        }
      }
    });
  }


  //预览图片大小
  imgSize.value = Number(localStorage.getItem("imgSize") || 500);
  //图片模式查看列数
  columns.value = Number(localStorage.getItem("columns") || 3);
  //默认播放方式
  playMode.value = localStorage.getItem("playMode") || "ask";
  //文件夹位置
  folderSort.value = localStorage.getItem("folderSort") || "start";
  //文件排序方式
  fileSore.value = localStorage.getItem("fileSore") || "timeStoB";
  //图片模式下只显示图片和文件夹
  onlyShowImages.value = localStorage.getItem("onlyShowImages") === 'true';
  viewOriginalImage.value = localStorage.getItem("viewOriginalImage") === 'true';
  videoThumbnail.value = localStorage.getItem("videoThumbnail") !== 'false';
  //主题色
  themeColor.value = localStorage.getItem("themeColor") || "#f6823b";
  model.value = localStorage.getItem("model") || "list";
  // addHistory();
  await getFileList();
  nextTick(() => {
    contentAreaRef.value.scrollTop = getScroll(currentPath.value)
  })
})

onUnmounted(() => {
  window.removeEventListener('popstate', backChange, true);//false阻止默认事件
})


</script>

<style lang="scss" scoped>
.main-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.nav-right {
  display: flex;
  gap: 12px;
  align-items: center;
}

::v-deep(.van-nav-bar) {
  flex-shrink: 0;

  .van-nav-bar__title {
    max-width: 60%;
  }
}

.path-display {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 16px;
  font-weight: 500;
}

.content-area {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
}

.settings-popup {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f7f8fa;

  .settings-header {
    display: flex;
    align-items: center;
    padding: 16px;
    background: white;
    border-bottom: 1px solid #ebedf0;
    font-size: 16px;
    font-weight: 500;

    .settings-title {
      margin-left: 12px;
    }
  }

  .settings-content {
    flex: 1;
    overflow-y: auto;
    padding: 12px 0;

    .restart-server {
      display: flex;
      gap: 8px;
      align-items: center;
    }
  }

  .settings-footer {
    padding: 16px;
    background: white;
    border-top: 1px solid #ebedf0;
  }
}

.select-input {
  padding: 4px 8px;
  border: 1px solid #dcdee0;
  border-radius: 4px;
  font-size: 12px;
}

.show-play {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  width: 80vw;
  height: 60vh;
}

.play-list {
  li {
    text-align: center;
    line-height: 40px;
    margin-left: 10px;
    margin-right: 10px;
    list-style: none;
    color: #333;
  }
}

.imgBox {
  z-index: 99999999999;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  box-sizing: border-box;

  .close-icon {
    background-color: black;
    width: 40px;
    height: 40px;
    text-align: center;
    line-height: 50px;
    position: absolute;
    top: 10px;
    right: 10px;
    opacity: 0.5;
    z-index: 9999;
    border-radius: 10px;
  }

  .blackScreen {
    width: 100vw;
    height: 100vh;
    background-color: black;
    overflow: hidden;
    position: fixed;
    opacity: 0.8;
  }

  .img {
    .left-btn {
      width: 40px;
      height: 40px;
      position: absolute;
      text-align: center;
      line-height: 50px;
      top: 50%;
      left: 0;
      transform: translate(0%, -50%);
      opacity: 0.5;
      background-color: black;
      border-radius: 10px;
    }

    .right-btn {
      width: 40px;
      height: 40px;
      position: absolute;
      text-align: center;
      line-height: 50px;
      top: 50%;
      right: 0;
      transform: translate(0%, -50%);
      opacity: 0.5;
      background-color: black;
      border-radius: 10px;
    }

    z-index: 10;
    box-sizing: border-box;
    overflow: hidden;
    position: absolute;
    width: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    img {
      width: 100%;
      object-fit: contain;
    }
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.PxInput {
  width: 80px;
}

.server-url-input {
  width: 100%;
  padding: 4px 8px;
  border: 1px solid #dcdee0;
  border-radius: 4px;
  font-size: 12px;
  box-sizing: border-box;
}

.select-input {
  padding: 2px;
}

.set-item {
  padding-top: 12px;
  padding-bottom: 5px;
  display: flex;

  span {
    align-self: center;
  }
}

.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 150px;
  height: 150px;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 20px;
  color: white;
  text-align: center;

  img {
    position: absolute;
    top: 20px;
    left: 30px;
  }

  .text {
    position: absolute;
    bottom: 10px;
    text-align: center;
    width: 100%;
    height: 20px;
    color: white;
  }

}

</style>
