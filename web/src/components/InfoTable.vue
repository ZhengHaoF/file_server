<template>
    <div class="box" ref="box">
      <table>
        <tbody>
        <tr style="background-color: #f6f6f6">
          <th v-for="(item, index) in tableHead"
              :key="index"
              :class="{'bgRed':item.bgColor==='red','bgGreen':item.bgColor==='green','textRed':item.textColor==='red','textGreen':item.textColor==='green'} "
              :style="{'width':item.width}"
          >
            {{ item.span }}
          </th>
        </tr>

        <tr v-for="(data,index1) in showTableData" :key="index1">
          <td v-for="(head, index2) in tableHead"
              :key="index2"
              :class="{'textRed':head['textColor']==='red','textGreen':head['textColor']==='green'} ">
            <div v-if="head.prop === 'name'" class="file-name" 
                 @click="clickFile(index1)"
                 @mousedown="startLongPress(index1)"
                 @mouseup="endLongPress"
                 @mouseleave="endLongPress"
                 @touchstart="startLongPress(index1)"
                 @touchend="endLongPress"
                 @touchcancel="endLongPress">
              <div class="file-logo">
                <FileIcon 
                  :suffix="data.suffix" 
                  :is-directory="data.isDirectory"
                  :size="24"
                  theme="outline"
                  :fill="themeColor"
                  :stroke-width="2"
                />
              </div>
              <div class="file-text">
                {{ data[head.prop]}}
              </div>
              <div class="file-item">
                {{ formatDate(data['mtime'],'{y}-{m}-{d} {h}:{i}:{s}')}}
              </div>
              <div class="file-size">
                {{ data['size']}}
              </div>
            </div>
            <div v-else-if="head.prop === 'cz' && data.isFile" class="file-name" style="display: flex;text-align: center">
              <div style="flex: 1">
                <button @click="copyUrl(index1)" :style="{borderColor:themeColor}">分享</button>
              </div>
              <div style="flex: 1">
                <button @click="delFile(index1)" :style="{borderColor:themeColor}">删除</button>
              </div>
            </div>
            <div v-else class="file-name">{{ data[head.prop] }}</div>
          </td>
        </tr>

        <tr v-if="tableData.length !== 0"><td style="text-align: center;color: #999" colspan="3">到底了···</td></tr>
        </tbody>
      </table>
      <div v-if="tableData.length === 0" style="text-align: center;position: absolute;width: 100vw;height: 100vh;top: 0;left: 0;line-height: 100vh">
        当前数据为空
      </div>
    </div>
</template>
<script setup>
import {onMounted, ref, watch} from "vue";
import {formatDate} from "../../utils/utils";
import {useLongPress} from '@/composables/useLongPress';
import FileIcon from './FileIcon.vue';

const box = ref(null)
const show = ref(false);
const showTableData = ref([]);
const emit = defineEmits(['clickFile','copyUrl','delFile','longPress'])

const { startLongPress, endLongPress } = useLongPress((index) => {
  emit("longPress", index);
});

const props = defineProps({
  tableData: {
    type: Array,
    default: [],
  },
  tableHead: {
    type: Array,
    default: [],
  },
  showMax: {
    type: Number,
    default: 99999,
  },
  themeColor: {
    type: String,
    default: ""
  }
})

onMounted(() => {
  showTableData.value = props.tableData.slice(0, props.showMax);
})

const clickFile = (index) => {
  emit("clickFile", index)
}

const copyUrl = (index) => {
  emit("copyUrl", index)
}

const delFile = (index) => {
  emit("delFile", index)
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
}

table {
  width: 100%;
  font-size: 16px;

  .bgRed {
    color: #fc9c62;
    background-color: #fff2e9;
  }

  .bgGreen {
    color: #56dc57;
    background-color: #e8f6e9;
  }

  .textRed {
    color: #fc9c62;
  }

  .textGreen {
    color: #56dc57;
  }

  th {
    height: 40px;
  }

  td {
    height: 40px;
    border-bottom: 1px solid #c4c4c4;
  }

  tr:hover {
    color: blue;
    user-select: none;
    background-color: #f6f6f6;
    cursor: pointer;
  }
}

.show-all {
  user-select: none;
  font-size: 16px;
  display: flex;
  width: 94%;
  line-height: 30px;
  box-sizing: border-box;
  border-top: 1px solid #c4c4c4;
  margin: 0 auto;
}

.file-name {
  padding-top: 5px;
  padding-bottom: 5px;
  word-break: break-all;
  display: flex;
  flex-wrap: wrap;
  .icon-svg {
    vertical-align: middle;
  }

  .file-logo {
    min-width: 40px;
    text-align: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    flex-direction: column;
  }

  .file-text {
    font-size: 0.9rem;
    flex: calc(100% - 40px);
  }
  .file-size{
    flex: 50%;
    color: #999999;
    font-size: 0.8rem;
    text-align: right;
    box-sizing: border-box;
    padding-right: 10px;
  }
  .file-item{
    flex: 50%;
    color: #999999;
    font-size: 0.8rem;
    box-sizing: border-box;
    padding-left: 40px;
  }
  button{
    background-color: white;
    border: 1px solid black;
    border-radius: 5px;
    padding: 2px;
    color: #333;
  }
}
</style>
