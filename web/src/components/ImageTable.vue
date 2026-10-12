<template>
  <div class="box" ref="gridBox">
    <RecycleScroller
      class="grid-scroller"
      :items="gridRows"
      :item-size="rowHeight"
      :buffer="rowHeight * 2"
      key-field="id"
      v-slot="{ item: row }"
    >
    <van-grid :column-num="columns"  class="image-grid" :border="false">
      <van-grid-item 
          style="padding: 2px;"
          v-for="data in row.files"
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
              :style="{height: `${Math.max(48, rowHeight - 52)}px`}"
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
    </RecycleScroller>
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
import {previewUrl, videoPreviewUrl} from '@/tools/fileApi';
import {useElementSize} from '@vueuse/core';
import {RecycleScroller} from 'vue-virtual-scroller';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';

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
  return videoPreviewUrl(props.serverBaseUrl, data.path);
}

const getImageSrc = (data) => {
  if (determineFileType(data.suffix) === 'VIDEO' && props.videoThumbnail) {
    return getVideoPreviewUrl(data);
  }
  if (determineFileType(data.suffix) === 'IMG') {
    return previewUrl(data.url, props.imgSize);
  }
  return '';
}

const key = ref(0);
const gridBox = ref(null);
const {width: gridWidth} = useElementSize(gridBox);
const rowHeight = computed(() => Math.max(100, Math.ceil((gridWidth.value - 20) / props.columns) + 52));
const gridRows = computed(() => {
  const rows = [];
  const files = getShowTableData.value;
  for (let index = 0; index < files.length; index += props.columns) {
    rows.push({id: index, files: files.slice(index, index + props.columns)});
  }
  return rows;
});

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
  box-sizing: border-box;
  height: 100%;
}

.grid-scroller {
  height: 100%;
  overflow-y: auto;
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
