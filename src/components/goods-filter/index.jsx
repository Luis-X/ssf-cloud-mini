import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtDrawer } from 'taro-ui';
import './style.scss';

class GoodsCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data || [],
      selectList: [],
    };
  }

  // 选中样式
  checkFilterStyle(item) {
    const self = this;
    var result = {};
    var includeIndex = -1;
    self.state.selectList.forEach((element, index) => {
      if (element.title === item.title) {
        includeIndex = index;
      }
    });
    result.backgroundColor = includeIndex <= -1 ? '#f2f2f2' : '#46a430';
    result.color = includeIndex <= -1 ? '#1A1210' : '#ffffff';
    return result;
  }

  // 关闭
  clickClose() {
    this.props.onClose();
  }

  // 重置
  clickCancel() {
    const self = this;
    self.setState(
      {
        selectList: [],
      },
      () => {
        // self.props.onCancel();
      }
    );
  }

  // 查询
  clickSure() {
    const self = this;
    const selectList = self.state.selectList;
    self.props.onSure(selectList);
  }

  // 选中
  clickFilterItem(item) {
    const self = this;
    const result = self.state.selectList;

    var includeIndex = -1;
    result.forEach((element, index) => {
      if (element.title === item.title) {
        includeIndex = index;
      }
    });

    if (includeIndex <= -1) {
      result.push(item);
    } else {
      result.splice(includeIndex, 1);
    }

    self.setState(
      {
        selectList: result,
      },
      () => {
        // console.log(self.state.selectList)
      }
    );
  }

  render() {
    const filterData = this.state.data;
    const show = this.props.show;
    return (
      <AtDrawer width="350px" right={true} show={show} mask onClose={this.clickClose.bind(this)}>
        <ScrollView className="filter-scrollview" scrollY scrollWithAnimation>
          {filterData.map((item, index) => {
            return item ? (
              <View className="filter-box">
                <Text className="filter-title">{item.optionTitle}</Text>
                <View className="filter-item-box">
                  {item.options.map((jtem, jndex) => {
                    return item ? (
                      <View
                        className="filter-item-title"
                        style={`background-color: ${
                          this.checkFilterStyle(jtem).backgroundColor
                        }; color: ${this.checkFilterStyle(jtem).color};`}
                        onClick={this.clickFilterItem.bind(this, jtem)}>
                        {jtem.title}
                      </View>
                    ) : null;
                  })}
                </View>
              </View>
            ) : null;
          })}
        </ScrollView>
        <View className="filter-bottom-tools">
          <Text className="filter-bottom-reset-button" onClick={this.clickCancel.bind(this)}>
            重置
          </Text>
          <Text className="filter-bottom-search-button" onClick={this.clickSure.bind(this)}>
            查看
          </Text>
        </View>
      </AtDrawer>
    );
  }
}
