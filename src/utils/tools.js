/**
 * @author qiqingfu
 * @date 2020-01-08 23:10
 */

/**
 * 转换语言中地区为大写
 *
 * @param {string} lang 需要转换的语言
 * @return {string}
 *
 * @example
 * transformLang('zh-cn') => 'zh-CN'
 * trnasformLang('en-us') => 'en-us'
 * transformLang('en') => 'en'
 */

export const transformLang = (lang) => {
  const arr = lang.split('-');

  if (arr.length === 1) {
    return arr;
  }

  arr.splice(arr.length - 1, 1, arr.slice(-1)[0].toUpperCase());

  return arr.join('-');
};

export const temp = true;
