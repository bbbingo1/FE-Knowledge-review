var viewheight = document.documentElement.clientHeight//可视区域高度

function lazyload() {
    var els = document.querySelectorAll('img[data-src][lazyload]');

    Array.prototype.forEach.call(els, function (item, index) {
        var rect;

        if (item.dataset.src === '') return;
        rect = item.getBoundingClientRect();//返回元素的大小及相对于视口的位置数据

        if (rect.bottom >= 0 && rect.top < viewheight) {
            (function () {
                var img = new Image();
                img.src = item.dataset.src;
                img.onload = function () {
                    item.src = img.src
                }
                item.removeAttribute('data-src');
                item.removeAttribute('lazyload');
                delete img
            }())
        }
    })
}
lazyload()
document.addEventListener('scroll', lazyload)