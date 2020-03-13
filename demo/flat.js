const arr = [1, 2, 3, 4, [1, 2, 3, [1, 2, 3, [1, 2, 3]]], 5, "string", { name: "周杰伦同学" }];
// 使用forEach+concat递归实现
function flat(arr){
  let arrResult = [];
  arr.forEach(item => {
    if(Array.isArray(item)){
      arrResult = arrResult.concat(arguments.callee(item)); // 递归
    } else{
      arrResult.push(item);
    }
  });
  return arrResult;
}
flat(arr);
// [1, 2, 3, 4, 1, 2, 3, 1, 2, 3, 1, 2, 3, 5, "string", { name: "周杰伦同学" }];