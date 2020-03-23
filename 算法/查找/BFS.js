// 广度优先遍历
function breadthFirstSearch(node) {
    var nodeList = [];
    if (node) {
        var queue = [];
        // 顶级节点
        queue.unshift(node);
        // 队列内循环
        while (queue.length != 0) {
            // 队列第一项先存储
            let item = queue.shift();
            nodeList.push(item);
            // 当前节点子节点放到队列尾部，优先级小于当前节点的兄弟节点
            for (let i = 0; i < item.children.length; i++) {
                queue.push(item.children[i])
            }
        }
    }
    return nodeList;
}