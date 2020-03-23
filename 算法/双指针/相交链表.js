/**
 * https://leetcode-cn.com/problems/intersection-of-two-linked-lists/
 * 
 * 编写一个程序，找到两个单链表相交的起始节点。
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
// 解决方法1：仿照哈希表的思路，给headA的每一个节点加上sep属性标记，再遍历headB寻找标记，找到的第一个标记即相交的第一个节点
var getIntersectionNode = function (headA, headB) {
    while (headA) {
        headA.sep = 1;
        headA = headA.next;
    }
    while (headB) {
        if (headB.sep) return headB;
        headB = headB.next
    }
};

// 解决方法2：双指针法：初始化两个指针pA和pB分别指向headA和headB，同时开始各走一步，当pA触底时接着走headB，pB触底走headA；
// 这样pA和pB走的都是A+B（或B+A），也就是说，路程长度一样，而且最后都会同时走上相交的公共部分。
var getIntersectionNode = function (headA, headB) {
    let pA = headA, pB = headB;
    while (pA !== pB) {
        pA = pA ? pA.next : headB;
        pB = pB ? pB.next : headA;
    }
    return pA;
};