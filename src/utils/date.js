import Taro, { Component } from '@tarojs/taro';

module.exports = {
  dateFormatter: dateFormatter,
};

// 补0
function numberAddZero(num) {
  return num < 10 ? '0' + num : num;
}

// 时间
// style:
// 0 (MM月dd日 hh:mm)
// 10 (yyyy-MM-dd hh:mm:ss)
// 11 (yyyy-MM-dd)
// 20 (yyyy.MM.dd)
// 21 (yyyy.MM.dd hh:mm)
//
function dateFormatter(timeValue, style) {
  var date = new Date(timeValue);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  if (style === 0) {
    return (
      numberAddZero(month) +
      '月' +
      numberAddZero(day) +
      '日' +
      numberAddZero(hour) +
      ':' +
      numberAddZero(minute)
    );
  } else if (style === 10) {
    return (
      year +
      '-' +
      numberAddZero(month) +
      '-' +
      numberAddZero(day) +
      ' ' +
      numberAddZero(hour) +
      ':' +
      numberAddZero(minute) +
      ':' +
      numberAddZero(second)
    );
  } else if (style === 11) {
    return year + '-' + numberAddZero(month) + '-' + numberAddZero(day);
  } else if (style === 20) {
    return year + '.' + numberAddZero(month) + '.' + numberAddZero(day);
  } else if (style === 21) {
    return (
      year +
      '-' +
      numberAddZero(month) +
      '-' +
      numberAddZero(day) +
      ' ' +
      numberAddZero(hour) +
      ':' +
      numberAddZero(minute)
    );
  }
  return (
    year +
    '-' +
    numberAddZero(month) +
    '-' +
    numberAddZero(day) +
    ' ' +
    numberAddZero(hour) +
    ':' +
    numberAddZero(minute)
  );
}
