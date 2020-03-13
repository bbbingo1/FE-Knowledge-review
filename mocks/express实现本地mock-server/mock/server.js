const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express();

//json demo
const _ = require('underscore')
const path = require('path')
const fs = require('fs')
const mockDir = path.join(__dirname, 'data')
const base = {}
const files = fs.readdirSync(mockDir)
files.forEach((file) => {
  _.extend(base, require(path.resolve(mockDir, file)))
})

// mock server must be use cors
app.use(cors())
// parser json data
app.use(bodyParser.json({ type: 'application/json' }))

app.use('/static', express.static(path.join(__dirname, 'public')))

// 获取名称(供电局show2)
app.get('/newData/professionalView', (req, res) => {
  let data = base['professionalView']
  res.jsonp(data)
})
// 获取圆圈数据(供电局show2)
app.get('/newData/rightFourRate', (req, res) => {
  let data = base['rightFourRate']
  res.jsonp(data)
})
// 获取折线图数据(供电局redict)
app.get('/personSignNumber/getConstructionStrengthForecast', (req, res) => {
  let data = base['getConstructionStrengthForecast']
  res.jsonp(data)
})
// 获取折线图月数据(供电局redict)
app.get('/personSignNumber/getMonthConstructionStrengthForecast', (req, res) => {
  let data = base['getMonthConstructionStrengthForecast']
  res.jsonp(data)
})
// 获取折线图月数据(供电局redict)
app.get('/newData/threeRateGraph', (req, res) => {
  let data = base['threeRateGraph']
  res.jsonp(data)
})
// 绑定 9090 端口开启
app.listen(9090, function () {
  console.log('mock server is running in 9090!');
});