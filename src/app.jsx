import Taro, { Component } from '@tarojs/taro';
import Index from './pages/index/index';

//公共模块
import HUD from './utils/hud'
import request from './utils/request'

import './app.scss';
import 'taro-ui/dist/style/index.scss';
// import './theme/custom-theme.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {
  HUD = HUD
  request = request

  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  config = {
    pages: [
      'pages/index/index',
      'pages/contact/contact',
      'pages/user/user',
      'pages/searchList/searchList',
      'pages/goodsDetail/goodsDetail',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'SweetSevenFlower',
      navigationBarTextStyle: 'black',
    },
  };

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return <Index />;
  }
}

Taro.render(<App />, document.getElementById('app'));
