# css

### link和@import的区别

1. link是在页面加载的同时加载，@import会等页面渲染完再加载
2. 样式权重上，link权重高于@import
3. link可以dom操作改变样式，@import不可以
4. link是标签，@import是css提供的

### css单位

| 单位 | 描述                                                         |
| ---- | ------------------------------------------------------------ |
| em   | 它是描述相对于应用在当前元素的字体尺寸，所以它也是相对长度单位。一般浏览器字体大小默认为16px，则2em == 32px； |
| px   | 像素                                                         |
| vw   | viewpoint width，视窗宽度，1vw=视窗宽度的1%                  |
| vh   | viewpoint height，视窗高度，1vh=视窗高度的1%                 |
| rem  | 根元素（html）的 font-size                                   |
| vmax | vw和vh中的较大值，横竖屏时很有用                             |
| vmin | vw和vh中的较小值，横竖屏常用                                 |

### 单行省略号

```css
overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;
```

### 隐藏元素的方法

1. **`display:none`：使元素消失，不占空间且不可交互**
2. **`visibility:hidden`：使元素看不到，仍占据空间但不可交互**
3. **`opacity:0`：使元素透明，仍占据空间且可以交互**
4. `overflow:hidden`：隐藏元素溢出部分，
5. `z-index:-9999`: 原理是将层级放到底部，这样就被覆盖了，看起来隐藏了
6. `transform:scale(0,0)`：将元素缩小，仍占据空间，但不可交互

### 定位方式？

- static: 正常文档流定位，此时 top, right, bottom, left 和 z-index 属性无效，块级元素从上往下纵向排布，行级元素从左向右排列。
- relative：相对定位，此时的『相对』是相对于其正常文档流的位置。
- absolute：相对于最近的非 static 定位祖先元素的偏移，来确定元素位置，比如一个绝对定位元素它的父级、和祖父级元素都为relative，它会相对他的父级而产生偏移。
- fixed：指定元素相对于屏幕视口（viewport）的位置来指定元素位置。元素的位置在屏幕滚动时不会改变，比如那种回到顶部的按钮一般都是用此定位方式。
- **sticky**：粘性定位，特性近似于relative和fixed的合体，其在实际应用中的近似效果就是IOS通讯录滚动的时候的『顶屁股』。

### 清除浮动✨

- Clearfix 方法

- overflow: auto或overflow: hidden方法，使用BFC

- after

  ```css
  .dad{
    zoom:1
  }
  .dad:after{
    content:'';
    overflow:hidden;
    clear:both;
    visibility: hidden; /*形成BFC*/
  }
  ```

### BFC✨

BFC是指**一个独立的渲染区域，只有Block-level Box参与， 它规定了内部的Block-level Box如何布局，并且与这个区域外部毫不相干**.

作用：

- 一块独立的区域，让处于BFC内部的元素与外部的元素互相隔离.
- 防止margin发生重叠
- 两栏布局，防止文字环绕等
- 防止内部浮动造成元素塌陷

触发条件:

- 根元素，即HTML元素
- position: fixed/absolute
- float 不为none
- overflow不为visible
- display的值为inline-block、table-cell、table-caption

### 媒体查询

媒体查询包含一个可选的媒体类型和满足CSS3规范的条件下的包含零个或多个表达式

```html
<!-- link元素中的CSS媒体查询 -->
<link rel="stylesheet" media="(max-width: 800px)" href="example.css" />

<!-- 样式表中的CSS媒体查询 -->
<style>
@media (max-width: 600px) {
  .facet_sidebar {
    display: none;
  }
}
</style>
```



### 为什么有时候人们用translate来改变位置而不是定位？✨

translate()是transform的一个值。**改变transform或opacity不会触发浏览器重新布局（reflow）或重绘（repaint）**，只会触发复合（compositions）。而改变绝对定位会触发重新布局，进而触发重绘和复合。transform使浏览器为元素创建一个 GPU 图层，但改变绝对定位会使用到 CPU。 因此translate()更高效，可以缩短平滑动画的绘制时间。

而translate改变位置时，元素依然会占据其原始空间，绝对定位就不会发生这种情况。

### 画三角形

```css
#item {
	width: 0;
	height: 0;
	border-left: 50px solid transparent;
	border-right: 50px solid transparent;
	border-top: 50px solid transparent;
	border-bottom: 50px solid blue;
	background: white;
}
```

解释：四个`border`按对角线划分，当内容为0时，就形成了三角形

### 三栏布局

1. 流式布局：三个同级元素浮动
2. BFC，两个浮动+一个overflow
3. flex

### 自适应布局

思路：

1. 左侧浮动或者绝对定位，然后右侧margin撑开
2. 使用div包含，然后靠负margin形成bfc
3. 使用flex
4. 父元素table
5. 绝对定位
6. 两边固定，中间自适应：float、position：absolute同理；两遍定位和浮动，中间margin撑开；flex利用space-between。

### flex✨

**说一下你了解的弹性flex布局**

使用flex布局的容器（flex container），它内部的元素自动成为flex项目（flex item）。

容器的属性：

**flex-direction**:**row(主轴为水平方向)/column(主轴为竖直方向)/row-reverse(从右到左水平方向)/column-reverse(从下至上竖直方向)**

**flex-wrap:nowrap(自动缩小项目，不换行)/wrap(换行，且第一行在上方)/wrap-reverse(换行**，**第一行在下面****)**

合在一起：**flex-flow:row nowrap/row wrap/column wrap-reverse...，**默认值为**row nowrap**，即横向排列 不换行。flex-flow是flex-direction和flex-wrap的简写形式

**justify-content:flex-start(左对齐)/flex-end(右对齐)/center(居中对齐)/space- between(两端对齐)/space-around(沿轴线均匀分布)**

**align-items:flex-start(顶端对齐)/flex-end(底部对齐)/center(竖直方向上居中对齐)/baseline(基线对齐)/stretch(当item未设置高度时，item将和容器等高对齐)**

**align-content:flex-start(顶端对齐)/flex-end(底部对齐)/center(竖直方向上居中对齐)/space- between(两端对齐)/space-around(沿轴线均匀分布)/stretch(当item未设置高度时，item将和容器等高对齐)**

项目的属性：

**order：排列顺序。数值越小，排列越靠前，默认为0。**

**flex-grow：定义项目的放大比例，默认为`0`，即便有剩余空间也不放大；如果所有项目的`flex-grow`属性都为1，则它们将等分剩余空间**

**flex-shrink：定义缩小比例，默认为1，如果空间不足，会缩小；如果所有项目的`flex-shrink`属性都为1，当空间不足时，都将等比例缩小**

**flex-basis：分配多余空间前项目占据的主轴空间，默认auto，即本来大小，可以设置跟width、height等同样的值，则项目占据固定空间**

**flex：前面三个的合体；有两个快捷值：`auto` (`1 1 auto`) 和 none (`0 0 auto`)。**

**align-self：允许单个项目有与其他项目不一样的对齐方式，可覆盖`align-items`属性。默认值为`auto`，表示继承父元素的`align-items`属性，如果没有父元素，则等同于`stretch`。**

#### 内容宽度等分

父元素`desplay:flex`的情况下，只要作为子元素的div都设置了`flex:1`即可

#### 左边定宽右边自适应

父元素`desplay:flex`的情况下，左边设置如`width:300px`；右边`width:100%`

#### 作为子元素居中

`flex-direction:row /*排列方式，默认row*/`
`justify-content: center; /*主轴对齐方式 默认垂直居中*/`          
`align-items: center;/*副轴对齐方式 默认水平居中*/`

> http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html

### animation

![img](https://user-gold-cdn.xitu.io/2018/9/9/165bd6dede39a8b8?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)