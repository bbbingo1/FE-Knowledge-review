/**
  * 获取队中从前到后每个人与前方身高高于自己的人的最短距离
  * @param height int整型一维数组 队中从前到后每个人与前方身高高于自己的人的最短距离
  * @return int整型一维数组
  */
function DistanceToHigher(height) {
    // write code here
    let len = height.length;
    if (len == 1) return [0]
    let arr = [];
    for (let i = 0; i < len; i++) {
        arr[i] = 0;
        for (let j = i - 1; j >= 0; j--) {
            if (height[j] > height[i]) {
                arr[i] = i-j;
                break;
            }
        }
    }
    return arr;

}
console.log(DistanceToHigher([175, 173, 174, 163, 182, 177]))