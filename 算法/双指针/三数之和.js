/**
 * https://leetcode-cn.com/problems/3sum/
 * 
 * @param {number[]} nums
 * @return {number[][]}
 */
// 排序+双指针
/* 时间复杂度：O\left(n^{2}\right)O(n^2)，
    数组排序 O(NlogN)，遍历数组 O(n)，双指针遍历 O\left(n\right)O(n)，
    总体 O(NlogN)+O(n)∗O(n)，O(n^2)
   空间复杂度：O(1)
*/
var threeSum = function (nums) {
    nums.sort((a, b) => a - b)
    let res = []
    if (nums[0] > 0 || nums[nums.length] < 0) { return [] }
    for (let i = 0; i < nums.length - 2; i++) {
      if (i >= 1 && nums[i] === nums[i - 1]) {
        continue
      }
      let first = i + 1;
      let last = nums.length - 1;
      while (first < last) {
        let sum = nums[i] + nums[first] + nums[last];
        if (sum === 0) {
          res.push([nums[i], nums[first], nums[last]]);
          while (nums[first] === nums[++first]) { }
          while (nums[last] === nums[--last]) { }
        }
        else if (sum < 0) {
          while (nums[first] === nums[++first] && first < last) { }
        }
        else {
          while (nums[last] === nums[--last] && first < last) { }
        }
      }
    }
    return res;
  };