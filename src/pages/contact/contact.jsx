import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtCard } from 'taro-ui';
import './contact.scss';

const app = Taro.getApp();

export default class Index extends Component {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  constructor() {
    super(...arguments);
    this.state = {
      logo: 'https://www.jandewitenzonen.com/img/logo_head.png',
      phone: '0421-6923313',
      email: 'lylyflower@163.com',
      company: '凌源鹭岩蕙花卉有限责任公司',
      address: '辽宁省凌源市花卉市场南楼16号',
      markers: [
        {
          id: 0,
          iconPath:
            'http://cdn1.showjoy.com/shop/images/20200610/CYDM2S1HVI9MZVLCN1KD1591772881990.png',
          label: {
            content: '凌源鹭岩蕙花卉有限责任公司',
          },
          latitude: 41.229994,
          longitude: 119.430149,
          width: 30,
          height: 30,
        },
      ],
    };
  }

  config = {
    navigationBarTitleText: '联系我们',
  };

  clickPhone() {
    Taro.makePhoneCall({
      phoneNumber: this.state.phone,
    });
  }

  render() {
    return (
      <View className="container">
        <Map
          className="card-map"
          longitude={this.state.markers[0].longitude}
          latitude={this.state.markers[0].latitude}
          scale="16"
          show-location="true"
          markers={this.state.markers}
          include-points={this.state.markers}></Map>
        <AtCard
          className="card-box"
          note="欢迎随时联系我们"
          title="联系方式"
          thumb="http://cdn1.showjoy.com/shop/images/20200605/97WTQX54FIPCAYZZ2CSU1591351647183.png"
          onClick={this.clickPhone.bind(this)}>
          <View className="card-info">
            {/* <Image
              className="card-img"
              src={this.state.logo}
              mode="aspectFit"
            ></Image> */}
            <Text className="card-text">公司：{this.state.company}</Text>
            <Text className="card-text">电话：{this.state.phone}</Text>
            <Text className="card-text">邮箱：{this.state.email}</Text>
            <Text className="card-text">地址：{this.state.address}</Text>
          </View>
        </AtCard>
      </View>
    );
  }
}
