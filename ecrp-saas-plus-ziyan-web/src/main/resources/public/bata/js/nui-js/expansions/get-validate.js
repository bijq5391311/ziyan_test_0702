'use strict';

exports.__esModule = true;
exports.getValidate = getValidate;
/**
 * 返回表单校验规则，如手机号码，电子邮箱等
 */
function getValidate(type) {
  switch (type) {
    case 'empty':
      return [{ required: true, message: '不能为空' }]; // 目前仅适用于输入框
    case 'email':
      return [{ type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }];
    case 'number':
      return [{ type: 'string', message: '请输入整数或小数', pattern: /^[0-9]+([.][0-9]+){0,1}$/, trigger: 'blur,change' }];
    case 'letter ':
      return [{ type: 'string', message: '请输入英文字母', pattern: /^[A-Za-z]+$/, trigger: 'blur,change' }];
    case 'lower':
      return [{ type: 'string', message: '请输入小写字母', pattern: /^[a-z]+$/, trigger: 'blur,change' }];
    case 'upper':
      return [{ type: 'string', message: '请输入大写字母', pattern: /^[A-Z]+$/, trigger: 'blur,change' }];
    case 'telephone':
      return [{ type: 'string', message: '请输入正确的手机号码', pattern: /^1[3|4|5|7|8][0-9]{9}$/, trigger: 'blur' }];
    case 'identify':
      return [
      // {type: 'string', message: '请输入18位的身份证号码', pattern: /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/, trigger: 'blur'},
      // {type: 'string', message: '请输入15位的身份证号码', pattern: /^[1-9]\d{5}\d{2}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/, trigger: 'blur'}
      { type: 'string', message: '请输入15或18位正确的身份证号码', pattern: /^([1-9]\d{5}\d{2}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|([1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$)/, trigger: 'blur' }];
    case 'zipcode':
      return [{ type: 'string', message: '请输入6位数的邮政编码', pattern: /^[1-9]\d{5}$/, trigger: 'blur' }];
    // case 'date':
    //   return [{type: 'date', message: '请选择日期', trigger: 'change'}];
    default:
      return '';
  }
  // if (format) format();
};