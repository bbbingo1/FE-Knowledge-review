/**
 * https://leetcode-cn.com/problems/first-missing-positive/
 * 
 * 给定一个未排序的整数数组，找出其中没有出现的最小的正整数。
    示例 1:
    输入: [1,2,0]
    输出: 3
    示例 2:
    输入: [3,4,-1,1]
    输出: 2
    示例 3:
    输入: [7,8,9,11,12]
    输出: 1
 */
/**
 * @param {number[]} nums
 * @return {number}
*/
// 利用字典，哈希解法：时间复杂度o(n);空间复杂的o(n)
// 执行用时:60ms;内存消耗:34.1MB
var firstMissingPositive = function (nums) {
    if (!nums) return 1;
    let obj = {}
    nums.forEach(num => {
        obj[num] = 1;
    })
    for (let i = 1; i <= nums.length + 1; i++) {
        if (!obj[i]) return i;
    }
    return 1
};

// 计数排序 - 原地交换版：时间复杂度o(n);空间复杂的o(1)
// 执行用时:72ms;内存消耗:35.6MB
var firstMissingPositive = function (nums) {
    if (!nums) return 1
    const n = nums.length;
    for (let i = 0; i <= n; i++) {
        while (nums[i] > 0 && nums[i] < n && nums[i] != nums[nums[i]]) {
            // 重复原地交换直至nums[i]<=0或者nums[i] == nums[nums[i]或者nums[i]比数组的长度更大
            [nums[nums[i]], nums[i]] = [nums[i], nums[nums[i]]]
        }
    }
    for (let i = 1; i <= n; i++) {
        if (nums[i] != i) return i
    }
    return n + 1
}
