const router = require('express').Router()
const bodyParser = require('body-parser')
const path = require('path')
const multer = require('multer')
const { FileUploaderServer } = require('easy-file-uploader-server')
const { sliceVideoFromFFmpeg } = require('../utils')

const urlencodedParser = bodyParser.urlencoded({ extended: false })

const upload = multer()
const fileUploader = new FileUploaderServer({
  tempFileLocation: path.join(__dirname, '../public/tempUploadFile'),
  mergedFileLocation: path.join(__dirname, '../public/mergedUploadFile')
})

// 上传初始化接口，用来创建上传文件分片存储目录
router.post('/api/initUpload', urlencodedParser, async (req, res) => {
  const { name } = req.body
  const uploadId = await fileUploader.initFilePartUpload(name)
  res.status(200)
  res.json({ uploadId })
})

// 接收分片
router.post('/api/uploadPart', upload.single('partFile'), async (req, res) => {
  const { buffer } = req.file
  const { uploadId, partIndex } = req.body
  const partFileMd5 = await fileUploader.uploadPartFile(
    uploadId,
    partIndex,
    buffer
  )
  res.status(200)
  res.json({ partFileMd5 })
})

// 合并分片
router.post('/api/finishUpload', bodyParser.json(), async (req, res) => {
  const { uploadId, name, md5 } = req.body
  const { path: filePathOnServer } = await fileUploader.finishFilePartUpload(
    uploadId,
    name,
    md5
  )
  // 在合并分片后，将合并的视频文件进行分片
  let suffix = await sliceVideoFromFFmpeg(filePathOnServer)
  // 返回分片后生成的m3u8索引地址
  let m3u8Path = suffix.split('public')[1].replaceAll('\\', '/').slice(1)
  res.status(200)
  res.json({ path: m3u8Path })
})

module.exports = router
