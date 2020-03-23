function search(arr, val) {
    let left = 0;
    let right = arr.length - 1;
    let mid = Math.floor((left + right) / 2)
    if (arr[mid] === val) return mid; // 此处获取到元素
    if (arr[mid] < val) return search(arr.slice(mid + 1, right + 1), val)
    else { return search(arr.slice(0, mid), val) }
}
var a = [1, 2, 34, 56, 78, 99, 999, 1111]
console.log(search(a, 34))

// 非递归实现
function binarySeach(array, key) {
    if (!array[0] || key < array[0] || key > array[array.length - 1]) return -1;
    let left = 0;
    let right = array.length - 1;
    let middle;
    while (left <= right) {
        middle = Math.floor((left + right) / 2);
        if (array[middle] < key) {
            left = middle + 1;
        }
        else if (array[middle] > key) {
            right = middle - 1;
        }else{
            return middle;
        }
    }
    return -1;
}