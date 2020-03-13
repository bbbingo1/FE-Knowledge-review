// 判断类型 Object.prototype.toString.call()
function isType(type) {
  return function (a) {
    return Object.prototype.toString.call(a).includes(type)
  }
}
//将isType包装成一个高阶函数，用来批量生成函数
let typeArr = ['Array', 'Function', 'Boolean', 'Object', 'String', 'Null', 'Undefined']
let fns = {}
typeArr.forEach(type => {
  fns['is' + type] = isType(type)
})
let a = {}
console.log(fns.isArray(a))//false
 console.log(fns.isObject(a))//true  //函数柯里化(这里保证每个函数的参数只有一个) 
// 高阶函数
//lodash after 高阶函数库，源码棒棒