const consola = require('consola')
const { ci, project, baseSetting } = require('./config')
const { log } = require('./log')
const { version } = require('../utils.js')

  (async () => {
    consola.start('正在生成预览…')
    const result = await ci.preview({
      project,
      desc: `环境：${process.env.APP_ENV}；版本：v${version}`, // 此备注将显示在“小程序助手”开发版列表中
      setting: {
        ...baseSetting,
      },
      qrcodeFormat: 'image',
      qrcodeOutputDest: `./dist/destination.jpg`,
      pagePath: 'pages/home/index', // 预览页面
      robot: 1,
      onProgressUpdate: console.log,
    })

    log(result)
    consola.success(`预览成功`)

    process.exit()
  })()
