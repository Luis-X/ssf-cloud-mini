import Taro, { Component } from '@tarojs/taro';

module.exports = {
  setCookie: setCookie,
  getCookie: getCookie,
  clearCookie: clearCookie
}

const key = 'cookie';

// 存储Cookie
function setCookie(data) {
  try {
    Taro.setStorageSync(key, data);
  } catch (error) {
    console.error(`setStorageSync调用失败`);
  }
}

// 获取Cookie
function getCookie() {
  try {
    var value = Taro.getStorageSync(key)
    if (value) {
     return value;
    }
  } catch (e) {
    console.error(`getStorageSync调用失败`);
    return '';
  }
  return '';
}

// 清理Cookie
function clearCookie() {
  Taro.removeStorage({
    key: key,
  })
}