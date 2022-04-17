<template>
  <div>
    <video v-for="item in vpathlist" :key="item" class="player" :data-src="item" :ref="videos" controls></video>
  </div>
</template>

<script setup>
import HLS from 'hls.js'
import { ref, onMounted, nextTick } from 'vue'
import axios from 'axios'

// 视频索引路径数组
const vpathlist = ref([])
// video标签dom节点数组
const players = ref([])

const HOST = 'http://localhost:3001'

const videos = (el) => {
  players.value.push(el)
}

onMounted(async () => {
  // 发送请求获取所有的视频索引文件
  const plist = await axios.get(`${HOST}/video3`)
  vpathlist.value = plist.data.plist

  nextTick(() => {
    // 遍历players数组
    // 通过hls.js的模块给每一个video都赋值一个索引文件
    players.value.forEach(el => {
      if(HLS.isSupported()) {
        const hls = new HLS()
        hls.loadSource(`${HOST}/${el.dataset.src}`)
        hls.attachMedia(el)
      } else if (el.canPlayType('application/vnd.apple.mpegurl')) {
        el.src = `${HOST}/${el.dataset.src}`
      }
    })
  })
})
</script>
<style>
.player {
  width: 60vw;
  display: block;
  margin-top: 50px;
}
</style>