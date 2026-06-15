<template>
  <div class="video-container" :class="{ 'landscape': isLandscape }">
    <div class="video-wrapper">
      <video 
        ref="videoRef"
        class="video-player" 
        :src="currentUrl" 
        controls="controls"
        playsinline
        webkit-playsinline
        x5-playsinline
        preload="metadata"
      ></video>
      
      <Transition name="fade">
        <div v-if="showPlaylist" class="playlist-overlay" @click="togglePlaylist"></div>
      </Transition>
      
      <Transition name="slide">
        <div v-if="showPlaylist" class="playlist-panel" :class="{ 'landscape': isLandscape }">
          <div class="playlist-header">
            <h3>播放列表 ({{ videoList?.length || 0 }})</h3>
            <button class="close-btn" @click="togglePlaylist">✕</button>
          </div>
          <div class="playlist-content">
            <div 
              v-for="(video, index) in videoList" 
              :key="index"
              class="playlist-item"
              :class="{ 'active': index === currentIndex }"
              @click="selectVideo(index)"
            >
              <span class="index">{{ index + 1 }}</span>
              <span class="name">{{ video.name }}</span>
              <span v-if="index === currentIndex" class="playing-icon">▶</span>
            </div>
          </div>
        </div>
      </Transition>
    </div>
    
    <div class="video-controls">
      <button class="control-btn" @click="togglePlaylist">
        📋 播放列表
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from "vue";

const props = defineProps({
  url: {
    type: String,
    default: ""
  },
  videoList: {
    type: Array,
    default: () => []
  },
  currentIndex: {
    type: Number,
    default: 0
  }
});

const emit = defineEmits(['videoChange']);

const videoRef = ref(null);
const showPlaylist = ref(false);
const isLandscape = ref(false);

const currentUrl = computed(() => {
  return props.url;
});

const checkOrientation = () => {
  isLandscape.value = window.innerWidth > window.innerHeight;
};

const togglePlaylist = () => {
  showPlaylist.value = !showPlaylist.value;
};

const selectVideo = (index) => {
  if (index !== props.currentIndex) {
    emit('videoChange', index);
  }
  showPlaylist.value = false;
};

const handleResize = () => {
  checkOrientation();
};

const handleKeydown = (e) => {
  if (e.key === 'Escape' && showPlaylist.value) {
    showPlaylist.value = false;
  }
};

onMounted(() => {
  checkOrientation();
  window.addEventListener('resize', handleResize);
  window.addEventListener('orientationchange', handleResize);
  window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  window.removeEventListener('orientationchange', handleResize);
  window.removeEventListener('keydown', handleKeydown);
  
  if (videoRef.value) {
    videoRef.value.pause();
    videoRef.value.src = '';
    videoRef.value.load();
  }
});

watch(() => props.currentIndex, (newIndex) => {
  if (videoRef.value && newIndex >= 0 && newIndex < props.videoList.length) {
    videoRef.value.load();
  }
});
</script>

<style scoped>
.video-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: #000;
  overflow: hidden;
}

.video-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000;
  position: relative;
  overflow: hidden;
}

.video-player {
  width: 100%;
  height: auto;
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
  background-color: #000;
  overflow: hidden;
}

.video-controls {
  display: flex;
  padding: 15px 10px;
  background-color: #1a1a1a;
  border-top: 1px solid #333;
  gap: 10px;
  min-height: 40px;
  flex-shrink: 0;
}

.control-btn {
  flex: 1;
  padding: 5px 16px;
  background-color: #56dc57;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.control-btn:active {
  background-color: #4ac74b;
}

.playlist-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
}

.playlist-panel {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  max-height: 60vh;
  background-color: #2a2a2a;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  z-index: 20;
  display: flex;
  flex-direction: column;
}

.playlist-panel.landscape {
  top: 0;
  bottom: 0;
  left: auto;
  right: 0;
  max-height: 100vh;
  max-width: 350px;
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
  border-top-right-radius: 0;
}

.playlist-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #444;
  flex-shrink: 0;
}

.playlist-header h3 {
  margin: 0;
  font-size: 16px;
  color: #fff;
}

.close-btn {
  background: none;
  border: none;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.close-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.playlist-content {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 8px;
}

.playlist-item {
  display: flex;
  align-items: center;
  padding: 12px;
  margin-bottom: 4px;
  background-color: #333;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.playlist-item:hover {
  background-color: #444;
}

.playlist-item.active {
  background-color: #56dc57;
}

.playlist-item .index {
  min-width: 30px;
  color: #888;
  font-size: 14px;
}

.playlist-item.active .index {
  color: #fff;
}

.playlist-item .name {
  flex: 1;
  color: #fff;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 8px;
}

.playlist-item .playing-icon {
  color: #fff;
  font-size: 12px;
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(100%);
}

.playlist-panel.landscape .slide-enter-from,
.playlist-panel.landscape .slide-leave-to {
  transform: translateX(100%);
}

@media screen and (orientation: landscape) {
  .video-container {
    flex-direction: row;
  }
  
  .video-wrapper {
    flex: 1;
    max-height: 100vh;
    overflow: hidden;
  }
  
  .video-controls {
    flex-direction: column;
    width: 120px;
    padding: 20px 10px;
    border-top: none;
    border-left: 1px solid #333;
    min-height: auto;
    height: 100vh;
    flex-shrink: 0;
  }
  
  .control-btn {
    writing-mode: vertical-rl;
    text-orientation: mixed;
  }
}

@media screen and (min-width: 768px) and (max-width: 1024px) {
  .video-controls {
    padding: 20px 15px;
    gap: 15px;
  }
  
  .control-btn {
    padding: 15px 20px;
    font-size: 16px;
  }
  
  .playlist-panel.landscape {
    max-width: 400px;
  }
}

@media screen and (max-width: 375px) {
  .video-controls {
    padding: 12px 8px;
    gap: 8px;
  }
  
  .control-btn {
    padding: 10px 12px;
    font-size: 13px;
  }
  
  .playlist-header {
    padding: 12px;
  }
  
  .playlist-header h3 {
    font-size: 14px;
  }
  
  .playlist-item {
    padding: 10px;
  }
  
  .playlist-item .name {
    font-size: 13px;
  }
}

video::-webkit-media-controls {
  transform: translateZ(0);
}

.video-player:fullscreen {
  object-fit: contain;
}

.video-player:-webkit-full-screen {
  object-fit: contain;
}

.video-player:-moz-full-screen {
  object-fit: contain;
}

.video-player:-ms-fullscreen {
  object-fit: contain;
}
</style>
