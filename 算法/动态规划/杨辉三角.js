/**
 * 输入n，求n行构成的杨辉三角，以数组表示
 * 示例:
    输入: 5
    输出:
    [
        [1],
        [1,1],
    [1,2,1],
    [1,3,3,1],
    [1,4,6,4,1]
]
 * @param {Number} n 
 */
function triangle(n) {
    let arr = []
    for (let i = 1; i <= n; i++) {
        pushArr(arr, i)
    }
    return arr;
}

function pushArr(arr, n) {
    arr.push([])
    if (n == 1) {
        arr[n - 1] = [1]
    } else {
        for (let i = 0; i < n; i++) {
            let pre = arr[n - 2][i - 1] || 0;
            let nex = arr[n - 2][i] || 0;
            arr[n - 1][i] = pre + nex
        }
    }
    return arr;
}
console.log(triangle(6))
