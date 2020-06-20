import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './style.scss';

class GoodsCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      index: props.index,
    };
  }

  handleClick() {
    this.props.onClick();
  }

  render() {
    const item = this.state.data;
    const index = this.state.index;
    return (
      <View class="goods-cell" onClick={this.handleClick.bind(this)}>
        <View class="goods-img-box">
          <Image
            class="goods-img"
            mode="aspectFill"
            src={`https://www.jandewitenzonen.com/${item.image}`}
          />
        </View>
        <View class="goods-info-box">
          {item.lint && item.lint.val_tr ? (
            <Text className="goods-spc-tag" style={`background-color: ${item.lint.color};`}>
              {item.lint.val_tr}
            </Text>
          ) : null}
          <Text class="goods-title">{item.name}</Text>
          <Text class="goods-sub-title">{item.name_clean}</Text>
          <View class="goods-info-tag-box">
            {item.showTags.map((jtem, jndex) => {
              return jtem.content ? <Text className="goods-info-tag">{jtem.content}</Text> : null;
            })}
          </View>
        </View>
      </View>
    );
  }
}
