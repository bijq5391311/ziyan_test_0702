'use strict';

exports.__esModule = true;

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _dom = require('nui-js/lib/utils/dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hasModal = false;

var getModal = function getModal(nesting) {
  if (_vue2.default.prototype.$isServer) return;
  var modalDom = PopupManager.modalDom;
  if (modalDom) {
    hasModal = true;

    // 方法二：（关于嵌套dialog）的遮罩调整 当结构嵌套到dialo内时，需要再创建一层遮罩
    /*   if (nesting) {
         hasModal = false;
         modalDom = document.createElement('div');
         PopupManager.modalDom = modalDom;
    
         modalDom.addEventListener('touchmove', function(event) {
           event.preventDefault();
           event.stopPropagation();
         });
    
         modalDom.addEventListener('click', function() {
           PopupManager.doOnModalClick && PopupManager.doOnModalClick();
         });
       }*/
  } else {
    hasModal = false;
    modalDom = document.createElement('div');
    PopupManager.modalDom = modalDom;

    modalDom.addEventListener('touchmove', function (event) {
      event.preventDefault();
      event.stopPropagation();
    });

    modalDom.addEventListener('click', function () {
      PopupManager.doOnModalClick && PopupManager.doOnModalClick();
    });
  }

  return modalDom;
};

var instances = {};

var PopupManager = {
  zIndex: 2000,

  modalFade: true,

  getInstance: function getInstance(id) {
    return instances[id];
  },

  register: function register(id, instance) {
    if (id && instance) {
      instances[id] = instance;
    }
  },

  deregister: function deregister(id) {
    if (id) {
      instances[id] = null;
      delete instances[id];
    }
  },

  nextZIndex: function nextZIndex() {
    return PopupManager.zIndex++;
  },

  modalStack: [],

  doOnModalClick: function doOnModalClick() {
    var topItem = PopupManager.modalStack[PopupManager.modalStack.length - 1];
    if (!topItem) return;

    var instance = PopupManager.getInstance(topItem.id);
    if (instance && instance.closeOnClickModal) {
      instance.close();
    }
  },

  openModal: function openModal(id, zIndex, dom, modalClass, modalFade, nesting) {
    if (_vue2.default.prototype.$isServer) return;
    if (!id || zIndex === undefined) return;
    this.modalFade = modalFade;

    var modalStack = this.modalStack;

    for (var i = 0, j = modalStack.length; i < j; i++) {
      var item = modalStack[i];
      if (item.id === id) {
        return;
      }
    }

    var modalDom = getModal(nesting);

    (0, _dom.addClass)(modalDom, 'v-modal');
    if (this.modalFade && !hasModal) {
      (0, _dom.addClass)(modalDom, 'v-modal-enter');
    }
    if (modalClass) {
      var classArr = modalClass.trim().split(/\s+/);
      classArr.forEach(function (item) {
        return (0, _dom.addClass)(modalDom, item);
      });
    }
    setTimeout(function () {
      (0, _dom.removeClass)(modalDom, 'v-modal-enter');
    }, 200);

    if (dom && dom.parentNode && dom.parentNode.nodeType !== 11) {
      dom.parentNode.appendChild(modalDom);
    } else {
      document.body.appendChild(modalDom);
    }

    if (zIndex) {
      modalDom.style.zIndex = zIndex;
    }
    modalDom.style.display = '';

    this.modalStack.push({ id: id, zIndex: zIndex, modalClass: modalClass });
  },

  closeModal: function closeModal(id, nesting, dom, hasNesting) {
    var modalStack = this.modalStack;
    var modalDom = getModal();
    // 方法二：（关于嵌套dialog）的遮罩调整 确认是否是嵌套结构，如果是的话则将dom父级的遮罩结构传出
    /* const modalDom = nesting ? dom.parentNode.lastChild : getModal();
     if (dom && dom.parentNode && dom.parentNode.nodeType !== 11) {
       if (dom.parentNode.lastChild === modalDom) {
         dom.parentNode.removeChild(modalDom);
       }
     }*/
    if (modalStack.length > 0) {
      var topItem = modalStack[modalStack.length - 1];
      if (topItem.id === id) {
        if (topItem.modalClass) {
          var classArr = topItem.modalClass.trim().split(/\s+/);
          classArr.forEach(function (item) {
            return (0, _dom.removeClass)(modalDom, item);
          });
        }

        modalStack.pop();
        if (modalStack.length > 0) {
          modalDom.style.zIndex = modalStack[modalStack.length - 1].zIndex;
        }
      } else {
        for (var i = modalStack.length - 1; i >= 0; i--) {
          if (modalStack[i].id === id) {
            modalStack.splice(i, 1);
            break;
          }
        }
      }
    }

    if (modalStack.length === 0) {
      if (this.modalFade) {
        (0, _dom.addClass)(modalDom, 'v-modal-leave');
      }
      setTimeout(function () {
        if (modalStack.length === 0) {
          if (modalDom.parentNode) modalDom.parentNode.removeChild(modalDom);
          // 方法二：（关于嵌套dialog）的遮罩调整  当嵌套了dialog，且在当前dialog关闭后还存在着遮罩，则需要再次清空掉遮罩
          /*   if (hasNesting) {
               let modalStill = document.querySelector('.v-modal');
               if (modalStill) {
                 modalStill.parentNode.removeChild(modalStill);
               }
             }*/
          modalDom.style.display = 'none';
          PopupManager.modalDom = undefined;
        }
        (0, _dom.removeClass)(modalDom, 'v-modal-leave');
      }, 200);
    }
  }
};

var getTopPopup = function getTopPopup() {
  if (_vue2.default.prototype.$isServer) return;
  if (PopupManager.modalStack.length > 0) {
    var topPopup = PopupManager.modalStack[PopupManager.modalStack.length - 1];
    if (!topPopup) return;
    var instance = PopupManager.getInstance(topPopup.id);

    return instance;
  }
};

if (!_vue2.default.prototype.$isServer) {
  // handle `esc` key when the popup is shown
  window.addEventListener('keydown', function (event) {
    if (event.keyCode === 27) {
      var topPopup = getTopPopup();

      if (topPopup && topPopup.closeOnPressEscape) {
        topPopup.handleClose ? topPopup.handleClose() : topPopup.handleAction ? topPopup.handleAction('cancel') : topPopup.close();
      }
    }
  });
}

exports.default = PopupManager;