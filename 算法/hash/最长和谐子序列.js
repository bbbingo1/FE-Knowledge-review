/**
 * https://leetcode-cn.com/problems/longest-harmonious-subsequence/
 * 
  和谐数组是指一个数组里元素的最大值和最小值之间的差别正好是1。
  现在，给定一个整数数组，你需要在所有可能的子序列中找到最长的和谐子序列的长度。
  示例 1:
  输入: [1,3,2,2,5,2,3,7]
  输出: 5
  原因: 最长的和谐数组是：[3,2,2,2,3].
  说明: 输入的数组长度最大不超过20,000.
 * @param {number[]} nums
 * @return {number}
 */
var findLHS = function(nums) {
    let obj = {};
    for(let i of nums){
        if(!obj[i]) obj[i] = 1;
        else{
            obj[i]++
        }
    }
    let max=0;
    for(let i of Object.keys(obj)){
        i = Number(i)
        if(obj[i+1]){
            if(obj[i]+obj[i+1]>max) max = obj[i]+obj[i+1]
        }
    }
    return max
  };