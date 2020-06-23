import Taro, { Component } from '@tarojs/taro';
import HUD from './hud';
import env from './env';
import cookie from './cookie';

module.exports = {
  get: get,
  post: post,
};

// GET
function get(url, data, response) {
  baseRequest(
    url,
    data,
    { method: 'GET', contentType: 'application/json; charset=utf-8' },
    (res) => {
      response(res);
    }
  );
}

// POST
function post(url, data, response) {
  baseRequest(
    url,
    data,
    { method: 'POST', contentType: 'application/x-www-form-urlencoded; charset=UTF-8' },
    (res) => {
      response(res);
    }
  );
}

/*
请求

url			      开发者服务器接口地址
data	        请求的参数
header	      设置请求的 header，header 中不能设置 Referer。
config		    method OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT, 额外设置其他header字段等
dataType			如果设为json，会尝试对返回的数据做一次 JSON.parse
responseType	设置响应的数据类型。合法值：text、arraybuffer
response      返回值
*/

function baseRequest(url, data, config, response) {
  var cookieString = cookie.getCookie();

  const realUrl = checkUrl(url);

  Taro.request({
    url: realUrl,
    data: data,
    method: config.method,
    header: {
      cookie: cookieString,
      'content-type': config.contentType,
    },
    success: function(res) {
      console.debug('request', `${realUrl}\n${JSON.stringify(res)}`);
      if (res.data) {
        response(res.data);
      } else {
        response({});
        console.debug('request', `未响应：${JSON.stringify(res.data)}`);
      }
    },
    fail: function(err) {
      console.error('request', `异常：${JSON.stringify(err)}`);
      HUD.showToastMessage('网络服务异常，请检查您的网络设置');
    },
  });
}

// 校验路径
function checkUrl(url) {
  var host = env.host().console;
  if (url.startsWith('http')) {
      return url;
  }
  return `${host}${url}`;
}
