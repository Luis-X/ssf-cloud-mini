import Taro, { Component } from '@tarojs/taro';

module.exports = {
  host: currentHost,
  envConfigs: envConfigs,
  setEnvType: setEnvType,
};

const configs = [
  {
    env: 'release',
    name: '正式',
    type: 0,
    shop: 'https://shop.m.showjoy.com',
    console: 'https://console-shop.showjoy.com',
    appServer: 'https://shopappserver.showjoy.com',
  },
  {
    env: 'preview',
    name: '预发',
    type: 1,
    shop: 'https://shop.m.showjoy.com',
    console: 'https://console-shop.showjoy.com',
    appServer: 'https://shopappserver.showjoy.com',
  },
  {
    env: 'dev',
    name: '开发',
    type: 2,
    shop: 'https://shop.m.showjoy.net',
    console: 'https://console-shop.showjoy.net',
    appServer: 'https://shopappserver.showjoy.net',
  },
];

// 当前环境（默认：正式，0正式，1预发，2开发）
function currentHost() {
  var result = {};
  var type = getEnvType() ? getEnvType() : 0;
  configs.forEach((item) => {
    if (item.type === type) {
      result = item;
    }
  });
  return result;
}

// 环境配置
function envConfigs() {
  return configs;
}

const key = 'app-env';

// 存储type
function setEnvType(data) {
  try {
    Taro.setStorageSync(key, data);
  } catch (error) {
    console.error(`setStorageSync调用失败`);
  }
}

// 获取type
function getEnvType() {
  try {
    var value = Taro.getStorageSync(key);
    if (value) {
      return value;
    }
  } catch (e) {
    console.error(`getStorageSync调用失败`);
    return '';
  }
  return '';
}

// 清理type
function clearCookie() {
  Taro.removeStorage({
    key: key,
  });
}
