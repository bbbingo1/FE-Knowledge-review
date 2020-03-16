/**
 * 
 * @param {TreeNode} root 
 */
/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
function Mirror(root)
{
    // write code here
    if(!root) return null;
    [root.left, root.right] = [Mirror(root.right), Mirror(root.left)]
    return root;
}