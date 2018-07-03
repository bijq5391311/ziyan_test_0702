'use strict';

exports.__esModule = true;
exports.getText = getText;
/**
 * 获取表单组件文本框、复选框、单选框、下拉等组件的选中后文本（输入框显示的文本）
 */
function getText(text, value, format) {
  if (typeof format === 'function') {
    return format(text, value);
  } else {
    return text;
  }
  // if (format) format();
};