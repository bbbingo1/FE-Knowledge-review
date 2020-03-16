// 深度优先遍历；递归
function deepFirstSearch(node, nodeList = []) {
    if (node) {
        nodeList.push(node); // 存储节点
        let children = node.children
        for (let i = 0; i < children.length; i++) {
            // 递归深度遍历子节点
            deepFirstSearch(children[i], nodeList);
        }
    }
    return nodeList;
}

// 深度优先遍历；非递归
function dfs() {
    let nodes = []
    if (node) {
        let stack = [];
        // 顶级节点
        stack.push(node);
        // 栈内循环
        while (stack.length != 0) {
            let item = stack.pop()
            // 储存值
            nodes.push(item);
            // 当前节点的子元素，利用栈推入，优先遍历
            for (let i = item.children.length - 1; i >= 0; i++) {
                stack.push(item.chilren[i]);
            }
        }
    }
    return nodes;
}