/**
 * 给定一个非负索引 k，其中 k ≤ 33，返回杨辉三角的第 k 行。（在杨辉三角中，每个数是它左上方和右上方的数的和。）
 * 示例：
 * 输入: 3
 * 输出: [1,3,3,1]
 */
/**
* @param {number} rowIndex
* @return {number[]}
*/
var getRow = function (rowIndex) {
    if (rowIndex === 0) return [1];
    let arr = [1]
    for (let i = 1; i <= rowIndex; i++) {
        arr.unshift(1);
        for (let j = 1; j <= i; j++) {
            arr[j] = arr[j] + (arr[j + 1] || 0)
        }
    }
    return arr;
};
console.log(getRow(4))
