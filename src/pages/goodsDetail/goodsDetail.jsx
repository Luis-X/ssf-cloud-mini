import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtTimeline, AtDivider } from 'taro-ui';
import './goodsDetail.scss';

const app = Taro.getApp();

export default class Index extends Component {
  componentWillMount() {
    const self = this;
    const params = self.$router.params;
    const item = JSON.parse(params.item);
    const propList = JSON.parse(decodeURIComponent(params.propList));

    self.setState(
      {
        data: item,
        propList: propList
      },
      () => {
        console.log(self.state);
      }
    );
  }

  componentDidMount() {
    const self = this;
    Taro.setNavigationBarTitle({
      title: self.state.data.name,
    });
    Taro.showShareMenu({
      withShareTicket: true,
    });
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  onShareAppMessage (res) {
    var jsonObj = JSON.stringify(this.state.data);
    const jsonPropList = encodeURIComponent(JSON.stringify(this.state.propList));

    return {
      title: this.state.data.name,
      path: `/pages/goodsDetail/goodsDetail?item=${jsonObj}&propList=${jsonPropList}`,
      imageUrl: `https://www.jandewitenzonen.com/${this.state.data.image}`
    }
  }

  constructor() {
    super(...arguments);
    this.state = {
      propList: [],
      data: {
        image: '',
        name: '',
        name_clean: '',
        lint: {},
      },
    };
  }

  clickPreivewImg() {
    const url = this.state.data.pic;
    Taro.previewImage({
      current: url,
      urls: [url],
    });
  }

  config = {
    navigationBarTitleText: '',
  };

  render() {
    return (
      <View className="container">
        <View className="at-article">
          <View className="at-article__h1">{this.state.data.name}</View>
          <View className="at-article__info">{this.state.data.name_clean}</View>
          <View className="at-article__content">
            <View className="at-article__section">
              <Image
                className="at-article__img"
                src={this.state.data.pic}
                mode="widthFix"
                onClick={this.clickPreivewImg.bind(this)}
              />
            </View>
          </View>
        </View>
        {this.state.data.lint && this.state.data.lint.val_tr ? (
          <Text className="tag" style={`background-color: ${this.state.data.lint.color};`}>
            {this.state.data.lint.val_tr}
          </Text>
        ) : null}
        <AtDivider content="详细信息" fontColor="#2d8cf0" lineColor="#2d8cf0" />
        <AtTimeline className="timeline" pending items={this.state.propList}></AtTimeline>
      </View>
    );
  }
}
