/**
 * <1>.把长度为n的输入序列分成两个长度为n/2的子序列；
   <2>.对这两个子序列分别采用归并排序；
   <3>.将两个排序好的子序列合并成一个最终的排序序列。
 * @param {Array} arr 
 */

function mergeSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    let middle = Math.floor(arr.length / 2)
    let left = arr.slice(0, middle),
        right = arr.slice(middle, arr.length)
    return merge(mergeSort(left), mergeSort(right))
}
function merge(left, right) {
    var result = [];
    while (left.length && right.length) {
        if (left[0] < right[0]) {
            result.push(left.shift())
        }
        else {
            result.push(right.shift())
        }
    }
    while (left.length) {
        result.push(left.shift())
    }
    while (right.length) {
        result.push(right.shift())
    }
    return result;
}

var arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
console.log(mergeSort(arr)); // [2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]