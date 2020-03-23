/*
 * @url: https://leetcode-cn.com/problems/gas-station
 * @Description: 
 * 在一条环路上有 N 个加油站，其中第 i 个加油站有汽油 gas[i] 升。
 * 你有一辆油箱容量无限的的汽车，从第 i 个加油站开往第 i+1 个加油站需要消耗汽油 cost[i] 升。你从其中的一个加油站出发，开始时油箱为空。
 * 如果你可以绕环路行驶一周，则返回出发时加油站的编号，否则返回 -1。
 * 说明: 
    如果题目有解，该答案即为唯一答案。
    输入数组均为非空数组，且长度相同。
    输入数组中的元素均为非负数。
 * @example: 
    输入: 
    gas  = [1,2,3,4,5]
    cost = [3,4,5,1,2]
    输出: 3
 * 
 * @summary: 
 */

/**
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
// Solution 1:
// Runtime: 104 ms
var canCompleteCircuit = function (gas, cost) {
    //定义currentGas记录实时的油量
    let currentGas = 0;
    let n = gas.length;
    let j;
    let i;
    for (i = 0; i < n; i++) {
      //遍历从每个加油站出发的n中情况
      currentGas = gas[i];//初始油量
      j = i
      while (1) {
        currentGas -= cost[j];//开往下一站花费
        if (j < n - 1) { j++ }
        else { j = 0 }
        if (currentGas < 0 || j == i) {//若油量小于零（失败）则跳出该循环，考虑下一个加油站出发；若行驶一周，同样跳出循环，环绕成功√
          break;
        }
        else {
          currentGas += gas[j];//可以到达下一个站；加上油
          continue;
        }
      }
      if (currentGas >= 0) break;//出现行驶一周成功的情况；跳出遍历
    }
    //如果你可以绕环路行驶一周，则返回出发时加油站的编号，否则返回 -1。
    if (currentGas >= 0) return i;
    else { return -1 }
  };
  
  canCompleteCircuit([1, 2, 3, 4, 5], [3, 4, 5, 1, 2])//3
  
  /**
   * @param {number[]} gas
   * @param {number[]} cost
   * @return {number}
   */
  // Solution 2:贪心算法
  // Runtime: 64 ms
  //该题目是贪心算法的典型案例。
  // 如果无法环绕一周，那么gas[i]-cost[i]的差值累加必然小于0,；否则，就是能够环绕一周。
  // 一次遍历，在遍历中一边累加total一边寻找正确的start。
  var canCompleteCircuit = function (gas, cost) {
    let total = 0;//定义total记录gas[i]-cost[i]的差值累加
    let start = 0;//寻找可用的起点
    let sum = 0;//
    for (let i = 0; i < gas.length; i++) {
      total += (gas[i] - cost[i])
      if (sum < 0) {
        //一旦有出现油不够用的情况，则说明目前该起点不可用
        sum = gas[i] - cost[i]
        start = i
      }
      else {
        sum += (gas[i] - cost[i])
      }
    }
    return total >= 0 ? start : -1// 只要total>=0，就能环绕一圈。
  };
  
  canCompleteCircuit([1, 2, 3, 4, 5], [3, 4, 5, 1, 2])//3