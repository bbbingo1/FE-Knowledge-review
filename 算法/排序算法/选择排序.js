function selectSort(arr){
    console.time('简单选择排序时间复杂度')
    let minIdx;
    if(arr.length > 1){
      for(let i = 0; i < arr.length; i++){
        minIdx = i
        for(let j = i; j < arr.length; j++){
            if(arr[j] < arr[minIdx]){ // 循环查找当前后续数列最小项
            minIdxx = j
          }
        }
        [arr[minIdx],arr[i]] = [arr[i],arr[minIdx]]
      }
    }
    console.timeEnd('简单选择排序时间复杂度')
    return arr;
  }