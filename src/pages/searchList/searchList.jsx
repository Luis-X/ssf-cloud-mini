import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtSearchBar } from 'taro-ui';
import { GoodsCell } from '../../components/goods-cell/index';
import { GoodsFilter } from '../../components/goods-filter/index';

import './searchList.scss';
import lilyJSON from '../../config/lily.json';
import tulipJSON from '../../config/tulip.json';

const app = Taro.getApp();

export default class Index extends Component {
  componentWillMount() {
    const self = this;
    const params = self.$router.params;
    const category = params.category || '';
    const search_query = params.search_query || '';
    const value = params.value || '';
    const banner = params.banner || '';

    var filterData = [];
    if (category === 'tulip') {
      filterData = tulipJSON;
    } else if (category === 'lily') {
      filterData = lilyJSON;
    }

    self.setState(
      {
        category: category,
        search_query: search_query,
        filterData: filterData,
        value: value,
        banner: banner,
      },
      () => {
        self.requestData();
      }
    );
  }

  onReachBottom() {
    this.requestData();
  }

  componentDidMount() {
    Taro.setNavigationBarTitle({
      title: this.state.value,
    });
    Taro.showShareMenu({
      withShareTicket: true,
    });
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  onShareAppMessage (res) {
    return {
      title: `${this.state.value}产品列表`,
      path: `/pages/searchList/searchList?category=${this.state.category}&search_query${this.state.search_query}&banner${this.state.banner}&value${this.state.value}`,
      imageUrl: this.state.banner
    }
  }

  constructor() {
    super(...arguments);
    this.state = {
      category: '', // 类目
      search_query: '', // 搜索，关键词
      banner: '', // 图片
      value: '',  // 类目值
      page: 1, // 起始页码
      dataSource: {}, // 原始数据
      list: [], // 数据列表
      filterShow: false, // 筛选视图
      selectFilterList: [], // 筛选（已选数据）
      filterData: [], // 筛选（显示数据）
    };
  }

  config = {
    navigationBarTitleText: '',
  };

  // 请求数据
  requestData() {
    const self = this;

    if (self.state.dataSource.totalNumPages <= self.state.page) {
      app.HUD.showToastMessage('最后一页');
      return;
    }

    const data = {
      category: self.state.category,
      search_query: self.state.search_query,
      pagenumber: self.state.page,
      resultsPerPage: 15,
      displayType: 'tiles',
      cf: '',
      fromCf: false,
    };

    // 筛选参数处理 ( request 的 fromdata 中存在相同的 key，转为 string )
    let paramString = '';
    if (self.state.selectFilterList.length > 0) {
      Object.keys(data).forEach((key) => {
        paramString = paramString.concat(`${key}=${data[key]}&`);
      });
      self.state.selectFilterList.forEach((element) => {
        paramString = paramString.concat(`filters[${element.name}][]=${element.value}&`);
      });
      paramString = paramString.slice(0, paramString.length - 1);
      // console.log(paramString);
    }
    
    app.HUD.showLoading('加载中');

    app.request.post(
      '/shop/v1/jw/search/list',
      paramString ? paramString : data,
      (res) => {
        app.HUD.hideLoading();
        if (!res.data) {
          return;
        }
        var results = res.data.results;
        if (!results) {
          app.HUD.showToastMessage('加载中');
          return;
        }
        results.forEach((element) => {
          element.showTags = self.propertiesHandler(element.properties);
        });

        self.setState({
          dataSource: res.data,
          list: self.state.list.concat(results),
          page: self.state.page + 1,
        });
      }
    );
  }

  // tag处理
  propertiesHandler(prop) {
    var list = [];
    Object.keys(prop).forEach((key) => {
      var subObj = prop[key];
      var result = {
        title: subObj.prop_tr,
        content: [subObj.val_tr],
      };
      if (key === 'KLEUR' || key === 'EPW' || key === 'GROEIPERIODE' || key === 'LENGTE') {
        list.push(result);
      }
    });
    return list;
  }

  // 详情
  clickGoodsDetail(itemData) {
    const self = this;
    var params = {
      category: itemData.category,
      id: itemData.id,
      image: itemData.image,
      picture: itemData.picture,
      name: itemData.name,
      name_clean: itemData.name_clean,
      lint: itemData.lint,
      pic: `https://www.jandewitenzonen.com/img/products/${itemData.category.toLowerCase()}/${
        itemData.picture
      }`,
    };

    const propList = self.goodsDetailPropHandler(itemData.id, itemData.properties);
    const jsonPropList = encodeURIComponent(JSON.stringify(propList));
    const jsonObj = JSON.stringify(params);
    Taro.navigateTo({
      url: `/pages/goodsDetail/goodsDetail?item=${jsonObj}&propList=${jsonPropList}`,
    });
  }

  // 属性处理
  goodsDetailPropHandler(id, prop) {
    var list = [];
    Object.keys(prop).forEach((key) => {
      var subObj = prop[key];
      var result = {
        title: subObj.prop_tr,
        content: [subObj.val_tr || ''],
        icon: 'check-circle',
        color: 'green',
      };
      list.push(result);
    });
    return list;
  }

  inputOnChange(value) {
    const self = this;
    self.setState({
      search_query: value,
    });
  }

  // 搜索
  inputOnActionClick() {
    const self = this;
    self.setState(
      {
        page: 1,
        dataSource: {},
        list: [],
        selectFilterList: [],
      },
      () => {
        self.requestData();
      }
    );
  }

  // 筛选
  clickFilterButton() {
    const self = this;
    self.setState({
      filterShow: true,
    });
  }

  // 查看
  clickFilterViewSearch(selectList) {
    const self = this;
    self.setState(
      {
        page: 1,
        dataSource: {},
        list: [],
        filterShow: false,
        selectFilterList: selectList,
      },
      () => {
        self.requestData();
      }
    );
  }

  // 关闭
  clickFilterViewClose() {
    const self = this;
    self.setState({
      filterShow: false,
    });
  }

  render() {
    return (
      <View className="container">
        {this.state.filterData.length > 0 && !this.state.filterShow ? (
          <Text className="top-tools-button" onClick={this.clickFilterButton.bind(this)}>
            筛选
          </Text>
        ) : null}
        <GoodsFilter
          show={this.state.filterShow}
          data={this.state.filterData}
          onClose={this.clickFilterViewClose.bind(this)}
          onSure={this.clickFilterViewSearch.bind(this)}></GoodsFilter>
        <AtSearchBar
          fixed
          showActionButton
          value={this.state.inputValue}
          onChange={this.inputOnChange.bind(this)}
          onActionClick={this.inputOnActionClick.bind(this)}
        />
        <ScrollView className="scrollview" scrollY scrollWithAnimation>
          {this.state.list.map((item, index) => {
            return item.name ? (
              <GoodsCell
                data={item}
                index={index}
                onClick={this.clickGoodsDetail.bind(this, item)}></GoodsCell>
            ) : null;
          })}
        </ScrollView>
      </View>
    );
  }
}
