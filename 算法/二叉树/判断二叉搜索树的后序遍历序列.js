/**
 * 题目描述
 * 输入一个整数数组，判断该数组是不是某二叉搜索树的后序遍历的结果。
 * 如果是则输出Yes,否则输出No。假设输入的数组的任意两个数字都互不相同。
 * @param {Array} sequence 
 */
function VerifySquenceOfBST(sequence) {
    if (!sequence.length) {
        return false;
    }
    return VerifySquence(sequence, 0, sequence.length - 1)
}

function VerifySquence(sequence, start, end) {
    if (start >= end) return true
    let i = start
    while (sequence[i] < sequence[end] && i < end) {
        i++;
    }
    for (var j = i; j < end; j++) {
        if (sequence[j] < sequence[end]) return false;
    }
    return VerifySquence(sequence, 0, i - 1) && VerifySquence(sequence, i, end - 1)
}