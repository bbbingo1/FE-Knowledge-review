function quickSort(arr) {
    if (arr.length <= 1) return arr;
    // 定义左右指针
    let left = 0;
    let right = arr.length - 1;
    while (left < right) {
        // 寻找右边比arr[0]小的数的下标
        while (arr[right] >= arr[0] && left<right) {
            right--
        }
        // 寻找左边比arr[0]大的数的下标
        while (arr[left] <= arr[0] && left<right) {
            left++
        }
        // 当左边指针与右边指针相遇后，交换arr[0]与当前两个指针所在的元素
        if (right == left) {
            [arr[0], arr[right]] = [arr[right], arr[0]]
        }
        // 当左指针小于右指针的位置，交换两个指针当前位置的元素
        if (left < right) {
            [arr[left], arr[right]] = [arr[right], arr[left]]
        }
    }
    return quickSort(arr.slice(0, right)).concat(arr.slice(right, right + 1), quickSort(arr.slice(right + 1, arr.length)))
}
var arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
console.log(quickSort(arr)); // [2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]