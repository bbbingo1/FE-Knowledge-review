/**
 * https://leetcode-cn.com/problems/longest-palindrome/
 * 
给定一个包含大写字母和小写字母的字符串，找到通过这些字母构造成的最长的回文串。
在构造过程中，请注意区分大小写。比如 "Aa" 不能当做一个回文字符串。
注意:
假设字符串的长度不会超过 1010。
示例 1:
输入:
"abccccdd"
输出:
7
解释:
我们可以构造的最长的回文串是"dccaccd", 它的长度是 7。
 * @param {string} s
 * @return {number}
 */
var longestPalindrome = function (s) {
    let obj = {};
    var idx = null;
    for (let o of s) {
      idx = o.charCodeAt()
      if (idx > 64 && idx < 91) {
        if (!obj[idx - 64]) {
          obj[idx - 64] = 1
        }
        else {
          obj[idx - 64]++
        }
      }
      else {
        if (!obj[idx - 70]) {
          obj[idx - 70] = 1
        }
        else {
          obj[idx - 70]++
  
        }
      }
    }
    let i = 0;
    idx = 0;
    console.log(obj)
    for (let p of Object.values(obj)) {
      if (p % 2) {
        idx = 1
      }
      i += p % 2 ? (p - 1) : p
    }
    return idx + i
  };