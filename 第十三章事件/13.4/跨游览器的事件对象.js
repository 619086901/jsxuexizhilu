let EventUtil = {
  addHandler: function (element, type, handler) {
    //添加事件处理程序
    if (element.addEventListener) {
      element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
      element.attachEvent('on' + type, handler);
    } else {
      element['on' + type] = handler;
    }
  },

  getEvent: function (event) {
    //返回对event对象的引用
    return event ? event /*DOM*/ : window.event; //IE
  },

  getTarget: function (event) {
    //返回事件目标
    return event.target || event.srcElement;
  },

  getCharCode: function (event) {
    if (typeof event.charCode == 'number') {
      return event.charCode;
    } else {
      return event.keyCode;
    }
  },

  getButton: function (event) {
    //获取mousedown或mouseup按下或释放的按钮是鼠标中的哪一个
    if (document.implementation.hasFeature('MouseEvents', '2.0')) {
      return event.button;
    } else {
      switch (
        event.button //将IE模型下的button属性映射为DOM模型下的button属性
      ) {
        case 0:
        case 1:
        case 3:
        case 5:
        case 7:
          return 0; //按下的是鼠标主按钮（一般是左键）
        case 2:
        case 6:
          return 2; //按下的是中间的鼠标按钮
        case 4:
          return 1; //鼠标次按钮（一般是右键）
      }
    }
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
    //移除事件处理程序
    if (element.removeEventListener) {
      element.removeEventListener(type, handler, false);
    } else if (element.detachEvent) {
      element.detachEvent('on' + type, handler);
    } else {
      element['on' + type] = null;
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
  }
};
