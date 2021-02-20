var EventUtil = {
    addHandler: function (element, type, handler) {
      //添加事件处理程序
      if (element.addEventListener) {
        element.addEventListener(type, handler, false);
      } else if (element.attachEvent) {
        element.attachEvent("on" + type, handler);
      } else {
        element["on" + type] = handler;
      }
    },

    getEvent: function (event) {
      return event ? event /*DOM*/ : window.event; //IE
    },

    getTarget: function (event) {
      return event.target || event.srcElement;
    },

    getCharCode: function (event) {
        if (typeof event.charCode== "number") {
            return event.charCode;
        } else {
            return event.keyCode;
        }
    },

    getClipboardText: function (event) {
        var clipboardData = (event.clipboardData || window.clipboardData);
        return clipboardData.getData("text");
    },

    preventDefault: function (event) {
      //阻止默认行为
      if (event.preventDefault) {
        event.preventDefault();
      } else {
        event.returnValue = false;
      }
    },

    removeHandler: function (element, type, handler) {
      //移除
      if (element.removeEventListener) {
        element.removeEventListener(type, handler, false);
      } else if (element.detachEvent) {
        element.detachEvent("on" + type, handler);
      } else {
        element["on" + type] = null;
      }
    },

    stopPropagation: function (event) {
      //停止冒泡
      if (event.stopPropagation) {
        //检测有没有这个方法，有的话返回这个方法
        event.stopPropagation();
      } else {
        event.cancelBubble = true;
      }
    },
  };