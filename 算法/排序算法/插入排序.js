function insertSort(arr) {
    console.time('插入排序耗时')
    let currentVal, preIndex;
    for (let i = 1; i < arr.length; i++) {
        currentVal = arr[i]
        preIndex = i - 1;
        while (arr[preIndex] >= currentVal && preIndex >= 0) {
            arr[preIndex + 1] = arr[preIndex];
            preIndex--;
        }
        arr[preIndex + 1] = currentVal

    }
    console.timeEnd('插入排序耗时')
    return arr;
}
var arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
console.log(insertSort(arr));//[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]