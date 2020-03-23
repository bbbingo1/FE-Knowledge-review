/**
 * 题目描述
 * 输入一个链表，输出该链表中倒数第k个结点。
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
// 双指针
var getKthFromEnd = function (head, k) {
    let j = i = head;
    while (j.next) {
      j = j.next;
      if (--k <= 0) { i = i.next; }
    }
    return i
  };