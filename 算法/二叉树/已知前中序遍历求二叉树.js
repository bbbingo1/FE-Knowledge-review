function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
}
/**
 * 题目描述
 * 输入某二叉树的前序遍历和中序遍历的结果，请重建出该二叉树。
 * 假设输入的前序遍历和中序遍历的结果中都不含重复的数字。
 * 例如输入前序遍历序列{1,2,4,7,3,5,6,8}和中序遍历序列{4,7,2,1,5,3,8,6}，则重建二叉树并返回。
 * @param {Array} pre 
 * @param {Array} vin 
 */
function reConstructBinaryTree(pre, vin) {
    let result = null;
    if (pre.length > 1) {
        let root = pre[0]; // 前序遍历的第一个元素即当前节点
        pre.shift(); // 去掉当前节点后，队列中剩下为左节点（树）的前序遍历+右节点（树）的前序遍历
        let index = vin.indexOf(root)
        let vinLeft = vin.slice(0, index) // 中序遍历中，当前节点为左节点和右节点的分割点
        let vinRight = vin.slice(index + 1)
        let preLeft = pre.slice(0, vinLeft.length)
        let preRight = pre.slice(vinLeft.length)
        result = {
            val: root,
            left: reConstructBinaryTree(preLeft, vinLeft),
            right: reConstructBinaryTree(preRight, vinRight)
        }

    } else if(pre.length ===1){
        result = {
            val: pre[0],
            left: null,
            right: null
        }
    }
    return result;
}
console.log(reConstructBinaryTree([1, 2, 4, 7, 3, 5, 6, 8], [4, 7, 2, 1, 5, 3, 8, 6]))