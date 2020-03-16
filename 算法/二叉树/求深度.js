/**
 * 题目描述
 * 输入一棵二叉树，求该树的深度。从根结点到叶结点依次经过的结点（含根、叶结点）形成树的一条路径，最长路径的长度为树的深度。
 * @param {TreeNode} pRoot 
 */
/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
function getTreeDeep(root) {
    if (!root) return 0;
    else {
        return Math.max(getTreeDeep(root.left), getTreeDeep(root.right)) + 1
    }
}