//Node版本7.0以上
let fs = require('fs')
//同步“异步操作”的返回结果（“并行”：paralle  “串行”：series）
function after(times, callback) { // 使用after函数 简化异步操作
  let arr = [];
  return function (err, data) {
    if (err) {
      throw new Error(err)
    }
    arr.push(data) // 把结果传递到对应的callback中
    if (--times == 0) {
      callback(arr)
    }
  }
}

let newFn = after(2, function (arr) {
  console.log(arr) // 所有异步完成后触发此方法
})

fs.readFile('./name.txt', 'utf8', function (err, data) {
  newFn(err, data) // 错误优先
})
fs.readFile('./age.txt', 'utf8', function (err, data) {
  newFn(err, data)
})