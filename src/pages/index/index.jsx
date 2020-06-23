import Taro, { Component } from '@tarojs/taro';
import { View, Text, SwiperItem, Swiper } from '@tarojs/components';
import { AtGrid, AtSearchBar } from 'taro-ui';
import './index.scss';
import categoryJSON from '../../config/category.json';

const app = Taro.getApp();

export default class Index extends Component {
  componentWillMount() {}

  componentDidMount() {
    Taro.showShareMenu({
      withShareTicket: true,
    });
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  config = {
    navigationBarTitleText: 'SweetSevenFlower',
  };

  constructor() {
    super(...arguments);
    this.state = {
      inputValue: '',
      categoryList: categoryJSON,
    };
  }

  clickCategory(item) {
    Taro.navigateTo({
      url: `/pages/searchList/searchList?category=${item.category}&value=${item.value}&banner=${item.banner}`,
    });
  }

  inputOnChange(value) {
    this.setState({
      inputValue: value,
    });
  }

  inputOnActionClick() {
    Taro.navigateTo({
      url: `/pages/searchList/searchList?search_query=${this.state.inputValue}`,
    });
  }

  render() {
    return (
      <View className="container">
        <AtSearchBar
          fixed
          showActionButton
          value={this.state.inputValue}
          onChange={this.inputOnChange.bind(this)}
          onActionClick={this.inputOnActionClick.bind(this)}
        />
        <Swiper className="banner" circular autoplay>
          {this.state.categoryList.map((item, index) => {
            return item.banner ? (
              <SwiperItem>
                <Image
                  className="banner-img"
                  src={item.banner}
                  mode="aspectFill"
                  onClick={this.clickCategory.bind(this, item)}></Image>
                <Text className="banner-title">{item.value}</Text>
              </SwiperItem>
            ) : null;
          })}
        </Swiper>
        <AtGrid
          className="category-box"
          mode="square"
          hasBorder={true}
          columnNum={2}
          data={this.state.categoryList}
          onClick={this.clickCategory.bind(this)}
        />
      </View>
    );
  }
}
