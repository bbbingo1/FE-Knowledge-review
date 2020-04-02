/**
 * https://leetcode-cn.com/problems/spiral-matrix/
 * 题目描述：
   给定一个包含 m x n 个元素的矩阵（m 行, n 列），请按照顺时针螺旋顺序，返回矩阵中的所有元素。
	示例 1:

	输入:
	[
	[ 1, 2, 3 ],
	[ 4, 5, 6 ],
	[ 7, 8, 9 ]
	]
	输出: [1,2,3,6,9,8,7,4,5]
	示例 2:

	输入:
	[
	[1, 2, 3, 4],
	[5, 6, 7, 8],
	[9,10,11,12]
	]
	输出: [1,2,3,4,8,12,11,10,9,5,6,7]
 */
/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function (matrix) {
    if (!matrix.length) return [];
    let left = 0, top = 0, right = matrix[0].length - 1, bottom = matrix.length - 1; // 四个边界
    let dire = 0; // 四个方向，没走完一行或一列+1；用dire%4控制
    let i = 0, j = 0;
    let result = [];
    result.push(matrix[i][j])
    let len = (right + 1) * (bottom + 1)
    while (result.length < len) {
        switch (dire % 4) {
            case 0: goRight(); break;
            case 1: goBottom(); break;
            case 2: goLeft(); break;
            case 3: goTop(); break;
        }
    }
    function goRight() {
        while (j < right) {
            j++;
            result.push(matrix[i][j])
        }
        top++;
        dire++;
    }

    function goBottom() {
        while (i < bottom) {
            i++;
            result.push(matrix[i][j])
        }
        right--;
        dire++;
    }

    function goLeft() {
        while (j > left) {
            j--;
            result.push(matrix[i][j])
        }
        bottom--;
        dire++;
    }

    function goTop() {
        while (i > top) {
            i--;
            result.push(matrix[i][j])
        }
        left++;
        dire++;
    }
    return result;
};