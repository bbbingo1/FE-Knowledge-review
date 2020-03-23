/**
 * https://leetcode-cn.com/problems/median-of-two-sorted-arrays/
 * 
 * 题目：寻找两个有序数组的中位数
 * 给定两个大小为 m 和 n 的有序数组 nums1 和 nums2。
 * 请你找出这两个有序数组的中位数，并且要求算法的时间复杂度为 O(log(m + n))。
 * 你可以假设 nums1 和 nums2 不会同时为空。
 * 
 * 示例1：nums1 = [1, 3]; nums2 = [2]；则中位数是 2.0
 * 示例2：nums1 = [1, 2]; nums2 = [3, 4]；则中位数是 (2 + 3)/2 = 2.5
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    let m = nums1.length;
    let n = nums2.length;
    let s = m + n;
    let j=0, k=0;
    if(s% 2){
        //奇数
        for(let i = 0; i < Math.floor(s/2) ; i++){
            if(j === m || j === -1){
               j = -1;
               k++;
               continue; 
            } else if(k === n || k === -1){
                k = -1;
                j++;
                continue;
            }else if(nums1[j] <= nums2[k]){
                j++;
                continue;
            }else{
                k++;
            }
        }   
        return (j === m || j === -1)? nums2[k] : (k === n || k === -1)? nums1[j] : Math.min(nums1[j],nums2[k])
    }else{
        // test 偶数
        let last;
        for(let i = 0; i < s/2 ; i++){
            if(j === m || j === -1){
               j = -1;
               k++;
               last = nums2[k-1];
               continue; 
            } else if(k === n || k === -1){
                k = -1;
                j++;
                last = nums1[j-1];
                continue;
            }else if(nums1[j] <= nums2[k]){
                j++;
                last = nums1[j-1];
                continue;
            }else{
                k++;
                last = nums2[k-1];
            }
        }   
        return (j === m || j === -1)? (nums2[k]+last)/2 : (k === n || k === -1)? (nums1[j]+last)/2 : (Math.min(nums1[j],nums2[k])+last)/2
    }
};

console.log(findMedianSortedArrays([1,2,3],[2,7,8,25]))