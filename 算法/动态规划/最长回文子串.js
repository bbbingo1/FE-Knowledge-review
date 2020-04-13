/**
 * 给定一个字符串 s，找到 s 中最长的回文子串。你可以假设 s 的最大长度为 1000。
	示例 1：

	输入: "babad"
	输出: "bab"
	注意: "aba" 也是一个有效答案。
	示例 2：

	输入: "cbbd"
	输出: "bb"

	链接：https://leetcode-cn.com/problems/longest-palindromic-substring
 */
/**
 * @param {string} s
 * @return {string}
 */
// 执行用时:332 ms  内存消耗:80.1 MB
var longestPalindrome = function (s) {
    let n = s.length;
    let dp = Array.from(new Array(n), (() => new Array(n).fill(0)));
    let res = '';
    for (let i = n - 1; i >= 0; i--) {
        for (let j = i; j < n; j++) {
            dp[i][j] = s[i] == s[j] && (j - i < 2 || dp[i + 1][j - 1]);
            if (dp[i][j] && j - i >= res.length) {
                res = s.slice(i, j + 1)
            }
        }
    }
    return res;
};