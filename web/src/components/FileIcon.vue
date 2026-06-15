<template>
  <component 
    v-if="showIcon"
    :is="iconComponent" 
    :class="className"
    :theme="theme"
    :size="size"
    :fill="fill"
    :strokeWidth="strokeWidth"
  />
  <van-image
    v-else-if="showImagePreview"
    :src="imageSrc"
    :alt="fileName"
    fit="cover"
    lazy-load
    :class="className"
    :key="imageSrc + '/' + fileName"
  />
</template>

<script setup>
import { computed } from 'vue';
import { 
  SeoFolder, 
  VideoTwo, 
  VideoFile,
  ImageFiles, 
  FileZip, 
  AudioFile, 
  FileDoc, 
  FileExcel, 
  AdobePhotoshop,
  FilePdfOne,
  FileCodeOne,
  DataFile
} from '@icon-park/vue-next';
import { Image } from 'vant';
import { determineFileType } from '@/tools/tools';

const props = defineProps({
  suffix: {
    type: String,
    default: ''
  },
  isDirectory: {
    type: Boolean,
    default: false
  },
  size: {
    type: [String, Number],
    default: 24
  },
  theme: {
    type: String,
    default: 'outline'
  },
  fill: {
    type: String,
    default: ''
  },
  strokeWidth: {
    type: [String, Number],
    default: 2
  },
  className: {
    type: String,
    default: 'icon-svg'
  },
  showVideoThumbnail: {
    type: Boolean,
    default: false
  },
  showImagePreview: {
    type: Boolean,
    default: false
  },
  imageSrc: {
    type: String,
    default: ''
  },
  fileName: {
    type: String,
    default: ''
  }
});

const fileType = computed(() => {
  if (props.isDirectory) {
    return 'DIRECTORY';
  }
  return determineFileType(props.suffix);
});

const showIcon = computed(() => {
  if (props.isDirectory) {
    return true;
  }
  if (fileType.value === 'VIDEO' && props.showVideoThumbnail && props.showImagePreview) {
    return false;
  }
  if (fileType.value === 'IMG' && props.showImagePreview) {
    return false;
  }
  return true;
});

const iconComponent = computed(() => {
  if (props.isDirectory) {
    return SeoFolder;
  }
  
  const iconMap = {
    'VIDEO': props.theme === 'filled' ? VideoFile : VideoTwo,
    'IMG': ImageFiles,
    'ZIP': FileZip,
    'AUDIO': AudioFile,
    'DOC': FileDoc,
    'EXCEL': FileExcel,
    'PS': AdobePhotoshop,
    'PSF': FilePdfOne,
    'DATA': DataFile,
    'UNKNOWN': FileCodeOne
  };
  
  return iconMap[fileType.value] || FileCodeOne;
});
</script>
