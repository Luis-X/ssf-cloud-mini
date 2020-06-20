import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import './user.scss';

const app = Taro.getApp();

export default class Index extends Component {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  config = {
    navigationBarTitleText: '我的',
  };

  constructor() {
    super(...arguments);
    this.state = {
      optionList: [
        {
          title: '联系我们',
          icon: '',
          url: '/pages/contact/contact',
        },
      ],
    };
  }

  render() {
    return (
      <View class="container">
        <ScrollView className="scroller" scrollY scrollWithAnimation>
          <View class="info-cell">
            <Image
              class="info-avatar"
              src="{{userData.personalCenterVO.headImgUrl}}"
              mode="aspectFill"></Image>
            <View class="info-box">
              <Text class="info-name">{1111}</Text>
              <Text class="info-invite">用户ID: {1}</Text>
            </View>
          </View>

          <View class="option-cell-bg">
            <View class="option-cell-box">
              {this.state.optionList.map((item, index) => {
                return item ? (
                  <View class="option-cell">
                    <Image class="option-icon" mode="aspectFit" src="{{item.icon}}"></Image>
                    <Text class="option-title">{item.title}</Text>
                  </View>
                ) : null;
              })}
            </View>
          </View>

          <View class="option-cell-bg">
            <View class="option-cell-box">
              <Text class="logout-title">退出登录</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
