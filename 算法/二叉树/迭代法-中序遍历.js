/**
 * https://leetcode-cn.com/problems/binary-tree-inorder-traversal
 * 
 * 给定一个二叉树，返回它的中序 遍历。
    示例:
    输入: [1,null,2,3]
    1
        \
        2
        /
    3
    输出: [1,3,2]
    进阶: 递归算法很简单，你可以通过迭代算法完成吗？
 * 
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */

// 迭代+栈 56 ms 34 MB
var inorderTraversal = function (root) {
    let result = [];
    let stack = [];
    while (stack.length || root) {
        if (root){
            stack.push(root);
            root = root.left;
        }else{
            let node = stack.pop();
            result.push(node.val);
            root = node.right;
        }
    }
    return result;
};
