/**
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
// 前序遍历
var preorderTraversal = function (root) {
    var result = [];
    if (!root) return null;
    function pushRoot(node) {
        if (node) {
            result.push(node.val);
            node.left && pushRoot(node.left);
            node.right && pushRoot(node.right);
        }
    }
    pushRoot(node)
    return result;
};

// 中序遍历
var inorderTraversal = function (root) {
    var result = [];
    if (!root) return null;
    function pushRoot(node) {
        if (node) {
            node.left && pushRoot(node.left);
            result.push(node.val);
            node.right && pushRoot(node.right);
        }
    }
    pushRoot(node)
    return result;
};

// 后序遍历
var postorderTraversal = function (root) {
    var result = [];
    if (!root) return null;
    function pushRoot(node) {
        if (node) {
            node.left && pushRoot(node.left);
            node.right && pushRoot(node.right);
            result.push(node.val);
        }
    }
    pushRoot(node)
    return result;
};
