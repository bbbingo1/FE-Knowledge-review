/**
 * 题目描述
 * 输入一棵二叉搜索树，将该二叉搜索树转换成一个排序的双向链表。
 * 要求不能创建任何新的结点，只能调整树中结点指针的指向。
 */
/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
// 利用中序遍历+递归：现将二叉树中序遍历到一个数组，再改变数组元素的left和right
function Convert(pRootOfTree) {
    // write code here
    if (!pRootOfTree) return null;
    const nodeArr = []
    midTravel(pRootOfTree, nodeArr);
    nodeArr.reduce((pre, cur) => {
        pre.right = cur || null;
        cur.left = pre || null;
        return cur;
    })
    return nodeArr[0];
}
function midTravel(node, nodeArr) {
    node.left && midTravel(node.left, nodeArr);
    nodeArr.push(node);
    node.right && midTravel(node.right, nodeArr);
}