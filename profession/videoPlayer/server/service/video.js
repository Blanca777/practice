const router = require('express').Router()
const fs = require('fs')
const path = require('path')

// 方案一：直接返回视频资源
router.get('/video', (req, res) => {
  let vpath = path.resolve(__dirname, '../video/1.mp4')
  fs.readFile(vpath, (err, data) => {
    if (err) {
      res.sendStatus(500).json({
        code: 0,
        msg: 'service error'
      })
    }
    res.send(data)
  })
})

// 方案二：使用文件流读取和传输
router.get('/video2', (req, res) => {
  let vpath = path.resolve(__dirname, '../video/1.mp4')
  let readStream = fs.createReadStream(vpath)
  readStream.pipe(res)
})

// 方案三：通过m3u8索引文件来读取
router.get('/video3', async (req, res) => {
  let plist = await getAllVideoIdxPath()
  res.status(200)
  res.json({
    plist
  })
})

/**
 * 读取mergedUploadFile目录下的所有视频索引文件
 * 返回这些索引文件路径的数组
 */
function getAllVideoIdxPath() {
  return new Promise((res, rej) => {
    let vpath = path.resolve(__dirname, '../public/mergedUploadFile')
    fs.readdir(vpath, (err, files) => {
      if (err) {
        rej(err)
      }
      let plist = files.map((item) => {
        return `mergedUploadFile/${item}/chunk/index.m3u8`
      })
      res(plist)
    })
  })
}

module.exports = router
