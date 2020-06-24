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
      userInfo: {
        headImgUrl: 'http://cdn1.showjoy.com/shop/images/20200624/JHSEJ1A9NXCIBESVD3NT1592964381853.png',
        name: 'LuisX',
      },
      optionList: [
        {
          title: '收藏列表',
          icon: 'http://cdn1.showjoy.com/shop/images/20200624/JHSEJ1A9NXCIBESVD3NT1592964381853.png',
          url: '/pages/contact/contact',
        },
        {
          title: '订单列表',
          icon: 'http://cdn1.showjoy.com/shop/images/20200624/6AYOS1TRUBMO4LEJ33VK1592964330182.png',
          url: '/pages/contact/contact',
        },
        {
          title: '联系我们',
          icon: 'http://cdn1.showjoy.com/shop/images/20200624/UQBFSIBSEVP7ALBY9FCR1592964212298.png',
          url: '/pages/contact/contact',
        },
      ],
    };
  }

  clickOptionButton(item) {
    Taro.navigateTo({
      url: item.url,
    });
  }

  clickConsultButton() {
    Taro.navigateTo({
      url: '/pages/consult/consult',
    });
  }

  
  render() {
    return (
      <View className="container">
        <ScrollView className="scroller" scrollY scrollWithAnimation>
          <View className="info-cell">
            <Image
              className="info-avatar"
              src={this.state.userInfo.headImgUrl}
              mode="aspectFill"></Image>
            <View className="info-box">
              <Text className="info-name">{this.state.userInfo.name}</Text>
              <Text className="info-invite">用户ID: {1}</Text>
            </View>
          </View>

          <View className="option-cell-bg">
            <View className="option-cell-box">
              {this.state.optionList.map((item, index) => {
                return item ? (
                  <View className="option-cell" onClick={this.clickOptionButton.bind(this, item)}>
                    <Image className="option-icon" mode="aspectFit" src={item.icon}></Image>
                    <Text className="option-title">{item.title}</Text>
                  </View>
                ) : null;
              })}
            </View>
          </View>

          <View className="option-cell-bg">
            <View className="option-cell-box" onClick={this.clickConsultButton.bind(this)}>
              <Text className="logout-title">预约咨询</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
