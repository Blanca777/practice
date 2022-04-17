const express = require('express')
const path = require('path')
const cors = require('cors')
const router = require('./service/video')
const uploadrouter = require('./service/upload')

const app = express()
app.use(cors())
app.use(router)
app.use(uploadrouter)

// 解决访问静态文件时候出现跨域的问题
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Authorization,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method'
  )
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PATCH, PUT, DELETE'
  )
  res.header('Allow', 'GET, POST, PATCH, OPTIONS, PUT, DELETE')
  next()
})

// 支持访问mergedUploadFile目录下的静态文件
app.use(
  '/mergedUploadFile',
  express.static(path.join(__dirname, './public/mergedUploadFile'))
)
app.use('/video', express.static(path.join(__dirname, './public/video')))

app.listen(3001, () => {
  console.log(`http://127.0.0.1:3001`)
})
