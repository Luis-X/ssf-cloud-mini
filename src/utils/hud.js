import Taro, { Component } from '@tarojs/taro';

module.exports = {
  showToastMessage,
  showToastSuccess,
  showToastLoading,
  showLoading,
  hideLoading,
  showModalChoose,
  showModalConfirm,
  showActionSheet,
};

/*
消息提示框

title		  提示的内容
icon		  图标，有效值 "success", "loading", "none"
image		  自定义图标的本地路径，image 的优先级高于 icon
duration	提示的延迟时间，单位毫秒，默认：1500
mask		  是否显示透明蒙层，防止触摸穿透，默认：false
*/
function baseShowToast(title, icon, image, duration, mask) {
  Taro.showToast({
    title: title,
    icon: icon,
    image: image,
    duration: duration,
    mask: mask,
  });
}

function showToastMessage(title) {
  baseShowToast(title, 'none', '', 2000, false);
}

function showToastSuccess(title) {
  baseShowToast(title, 'success', '', 2000, false);
}

function showToastLoading(title) {
  baseShowToast(title, 'loading', '', 2000, false);
}

/*
加载提示框

title		  提示的内容
mask		  是否显示透明蒙层，防止触摸穿透，默认：false
*/
function showLoading(title) {
  Taro.showLoading({
    title: title ? title : '',
    mask: true,
  });
}

function hideLoading() {
  Taro.hideLoading();
}

/*
模态弹窗

title			      提示的标题
content			    提示的内容
showCancel			是否显示取消按钮，默认为 true
cancelText			取消按钮的文字，默认为"取消"，最多 4 个字符
cancelColor			取消按钮的文字颜色，默认为"#000000"
confirmText			确定按钮的文字，默认为"确定"，最多 4 个字符
confirmColor		确定按钮的文字颜色，默认为"#3CC51F"
callback        选择返回值
*/
function baseShowModal(
  title,
  content,
  showCancel,
  cancelText,
  cancelColor,
  confirmText,
  confirmColor,
  callback
) {
  Taro.showModal({
    title: title ? title : '',
    content: content ? content : '',
    showCancel: showCancel,
    cancelText: cancelText,
    cancelColor: cancelColor,
    confirmText: confirmText,
    confirmColor: confirmColor,
    success: function(res) {
      callback(res);
    },
  });
}

function showModalChoose(item, callback) {
  const title = item.title;
  const content = item.content;
  const confirmText = item.confirmText ? item.confirmText : '确认';
  const cancelText = item.cancelText ? item.cancelText : '取消';
  baseShowModal(title, content, true, cancelText, '#000000', confirmText, '#f93450', (res) => {
    callback(res);
  });
}

function showModalConfirm(item, callback) {
  const title = item.title;
  const content = item.content;
  const confirmText = item.confirmText ? item.confirmText : '确认';
  baseShowModal(title, content, false, '', '#000000', confirmText, '#f93450', (res) => {
    callback(res);
  });
}

/*
​显示操作菜单

itemList	  按钮的文字数组，数组长度最大为6个
itemColor	  按钮的文字颜色，默认为"#000000"
success	    接口调用成功的回调函数，详见返回参数说明
callback    选择返回值
*/

function baseShowActionSheet(itemList, itemColor, callback) {
  Taro.showActionSheet({
    itemList: itemList,
    itemColor: itemColor,
    success: function(res) {
      callback(res);
    },
  });
}

function showActionSheet(itemList, callback) {
  baseShowActionSheet(itemList, '#000000', (res) => {
    callback(res);
  });
}
