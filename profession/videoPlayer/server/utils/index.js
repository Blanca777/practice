const exec = require('child_process').exec
const path = require('path')
const fs = require('fs')

/**
 * 视频切片方法
 * @param {string} inputPath 输入视频文件路径
 * @returns string
 */
async function sliceVideoFromFFmpeg(inputPath) {
  // 将视频路径使用path.sep进行分割成数组，path.sep兼容window和linux的路径分隔符
  const pathlist = inputPath.split(path.sep)
  // 获取视频路径目录
  const pathDir = pathlist.slice(0, pathlist.length - 1).join(path.sep)
  // 获取视频名字
  const tempName = pathlist.at(-1).slice(0, pathlist.at(-1).lastIndexOf('.'))

  // 转换成ts格式的视频文件路径
  const outputPath = path.resolve(`${pathDir}/${tempName}.ts`)
  // 生成视频的索引文件路径
  const m3u8Path = path.resolve(`${pathDir}/chunk/index.m3u8`)
  // 视频切片后每个切片的文件路径
  const videoPath = path.resolve(`${pathDir}/chunk/${tempName}-%04d.ts`)
  // 切片命令
  const command = `ffmpeg -i ${outputPath} -c copy -map 0 -f segment -segment_list ${m3u8Path} -segment_time 10 ${videoPath}`
  // 先执行转换格式的方法
  await VideoToTs(inputPath, outputPath)
  // 创建切片和索引文件存放的目录
  fs.mkdir(path.join(`${pathDir}`, 'chunk'), (err) => {
    if (err) {
      console.log(err)
    }
    // 执行切片命令
    exec(command, (err, stdout, stderr) => {
      if (err) {
        console.log(err)
      }
    })
  })
  return m3u8Path
}

/**
 * 将视频格式转换成ts格式
 * @param {string} input 需要转换视频的路径
 * @param {string} output 转换后输出的路径
 * @returns
 */
function VideoToTs(input, output) {
  return new Promise((res, rej) => {
    // 定义转换视频的命令
    const command = `ffmpeg -y -i ${input} -vcodec copy -acodec copy -vbsf h264_mp4toannexb ${output}`
    exec(command, (err) => {
      // 执行命令
      if (err) {
        rej(err)
      }
      res()
    })
  })
}

module.exports = {
  sliceVideoFromFFmpeg
}
