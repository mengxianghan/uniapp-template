const process = require('node:process')
const consola = require('consola')
const { version } = require('../utils.js')
const { ci, project, baseSetting } = require('./config')
const { log, onProgressUpdate } = require('./utils')

consola.start('正在生成预览…')
ci.preview({
  project,
  desc: `环境：${process.env.APP_ENV}；版本：v${version}`, // 此备注将显示在“小程序助手”开发版列表中
  setting: {
    ...baseSetting,
  },
  qrcodeFormat: 'image',
  qrcodeOutputDest: `./dist/destination.jpg`,
  pagePath: 'pages/home/index',
  robot: 1,
  onProgressUpdate,
}).then((result) => {
  log(result)
  consola.success(`预览成功`)

  process.exit()
})
