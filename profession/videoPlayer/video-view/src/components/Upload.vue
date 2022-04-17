<template>
  <input type="file" ref="fileInput">

    <el-button type="success" @click="upload">
      upload to server
    </el-button>
</template>

<script setup>
import { FileUploaderClient } from 'easy-file-uploader-client'
import { ref } from 'vue'
import axios from 'axios'

const fileInput = ref(null)
const HOST = 'http://localhost:3001/'
let uploadId = ''

// 实例化模块对象
const fileUploaderClient = new FileUploaderClient({
  // 传入的分片大小
   chunkSize: 2 * 1024 * 1024,
   requestOptions: {
      // 上传失败重新上传的次数 
      retryTimes: 2,
      // 初始化上传目录的函数
      initFilePartUploadFunc: async () => {
        const fileName = fileInput.value.files[0].name
        const { data } = await axios.post(`${HOST}api/initUpload`, {
          name: fileName,
        })
        uploadId = data.uploadId
        console.log('初始化上传完成')
      },
      // 上传分片的函数
       uploadPartFileFunc: async (chunk, index) => {
        const formData = new FormData()
        formData.append('uploadId', uploadId)
        formData.append('partIndex', index.toString())
        formData.append('partFile', chunk)

        await axios.post(`${HOST}api/uploadPart`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        console.log(`上传分片 ${index}完成`)
      },
      // 上传完分片后的合并文件函数
      finishFilePartUploadFunc: async (md5) => {
        const fileName = fileInput.value.files[0].name
        const { data } = await axios.post(`${HOST}api/finishUpload`, {
          name: fileName,
          uploadId,
          md5,
        })
        console.log(`上传完成，存储地址为：${HOST}${data.path}`)
      }
   }
})
// 上传按钮点击后触发的事件
const upload = () => {
    fileUploaderClient.uploadFile(fileInput.value.files[0])
}
</script>