<template>
  <div class="box">
    <van-grid :column-num="columns"  class="image-grid" :border="false">
      <van-grid-item 
          style="padding: 2px;"
          v-for="(data, index) in getShowTableData" 
          :key="data.index"
          @click="clickFile(data.index)"
          @touchstart="startLongPress(data.index)"
          @touchend="endLongPress"
          @touchcancel="endLongPress">
        <div class="item">
          <div class="icon">
            <FileIcon 
              :suffix="data.suffix" 
              :is-directory="data.isDirectory"
              :size="iconSize"
              theme="filled"
              :fill="themeColor"
              :stroke-width="1"
              :show-video-thumbnail="videoThumbnail"
              :show-image-preview="determineFileType(data.suffix) === 'IMG' || (determineFileType(data.suffix) === 'VIDEO' && videoThumbnail)"
              :image-src="getImageSrc(data)"
              :file-name="data.name"
            />
          </div>
          <div class="file-name">
            {{data.name}}
          </div>
        </div>
      </van-grid-item>
    </van-grid>
    <div v-if="getShowTableData.length === 0" style="text-align: center;position: absolute;width: 100vw;height: 100vh;top: 0;left: 0;line-height: 100vh">
      当前数据为空
    </div>
  </div>
</template>
<script setup>
import {computed, onMounted, ref, watch} from "vue";
import {determineFileType} from "@/tools/tools";
import {Grid, GridItem, Image} from 'vant';
import {useLongPress} from '@/composables/useLongPress';
import FileIcon from './FileIcon.vue';

const show = ref(false);
const showTableData = ref([]);
const emit = defineEmits(['clickFile','copyUrl','delFile','longPress'])

const { startLongPress, endLongPress } = useLongPress((index) => {
  emit("longPress", index);
});

const iconSize = ref("100%")
const props = defineProps({
  tableData: {
    type: Array,
    default: [],
  },
  showMax: {
    type: Number,
    default: 99999,
  },
  imgSize:{
    type: Number,
    default: 500,
  },
  columns:{
    type: Number,
    default: 3,
  },
  themeColor: {
    type: String,
    default: ""
  },
  onlyShowImages: {
    type: Boolean,
    default: false
  },
  serverBaseUrl: {
    type: String,
    default: ''
  },
  videoThumbnail: {
    type: Boolean,
    default: true
  }
})

const getVideoPreviewUrl = (data) => {
  if (!props.serverBaseUrl || !data.path) return '';
  return `${props.serverBaseUrl}/getVideoPreview/${data.path}`;
}

const getImageSrc = (data) => {
  if (determineFileType(data.suffix) === 'VIDEO' && props.videoThumbnail) {
    return getVideoPreviewUrl(data);
  }
  if (determineFileType(data.suffix) === 'IMG') {
    return data.url + `!${props.imgSize}x${props.imgSize}`;
  }
  return '';
}

const key = ref(0);

onMounted(() => {
  showTableData.value = props.tableData.slice(0, props.showMax);
  key.value++;
})

const getShowTableData = computed(() => {
  let list = [];
  showTableData.value.forEach((item,index) => {
    if(props.onlyShowImages){
      if (determineFileType(item['suffix']) === "IMG" || item['isDirectory']){
        list.push({
          ...item,
          index:index
        })
      }
    }else{
      list.push({
        ...item,
        index:index
      })
    }
  })

  key.value++;
  return list;
})

const clickFile = (index) => {
  emit("clickFile", index)
}

watch(() => props.tableData, () => {
  show.value = false;
  if (props.tableData.length > props.showMax) {
    showTableData.value = props.tableData.slice(0, props.showMax)
  } else {
    showTableData.value = props.tableData;
  }
})

</script>

<style lang="scss" scoped>
.box {
  padding: 10px;
}

.image-grid {
  width: 100%;
}

.item {
  text-align: center;
  font-size: 14px;
  width: 100%;

  .icon {
    padding: 5px;
    display: flex;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
  }

  .file-name {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-break: break-all;
    margin-top: 5px;
  }

  .img-preview {
    width: 100%;
    aspect-ratio: 1 / 1;
    border-radius: 5px;
  }
}

.icon-svg {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
