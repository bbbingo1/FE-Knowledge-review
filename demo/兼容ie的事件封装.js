var $ = function (id) {
  var dom = document.getElementById(id);
  return {
    on: function (eventType, element, callback) {
      if (document.addEventListener) {
        dom.addEventListener(eventType, function (e) {
          var ev = e || window.event;
          var target = ev.target || ev.srcElement
          if (target.tagName.toLowerCase() === element) {
            callback.call(target, ev);
          }
        }, false);
      } else {
        //兼容IE浏览器
        document.attachEvent("on" + eventType, function (e) {
          var ev = e || window.event;
          var target = ev.target || ev.srcElement
          if (target.tagName.toLowerCase() === element) {
            callback.call(target, ev);
          }
        });
      }
    }
  }
};