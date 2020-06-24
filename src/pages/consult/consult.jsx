import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image, Picker } from '@tarojs/components';
import { AtForm, AtInput, AtButton, AtTextarea, AtList, AtListItem } from 'taro-ui';
import { AreaPicker } from '../../components/area-picker/index';
import './consult.scss';

const app = Taro.getApp();

export default class Index extends Component {
  componentWillMount() {
    console.log(app.date.dateFormatter(new Date(), 11));
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  config = {
    navigationBarTitleText: '预约咨询',
  };

  constructor() {
    super(...arguments);
    this.state = {
      optionList: [
        {
          type: 'input',
          title: '姓名',
          placeholder: '您的姓名',
          value: '',
        },
        {
          type: 'input',
          title: '电话',
          placeholder: '您的电话',
          value: '',
        },
        {
          type: 'input',
          title: '微信',
          placeholder: '您的微信',
          value: '',
        },
        {
          type: 'textarea',
          title: '描述',
          placeholder: '您的需求和问题...',
          value: '',
        },
        {
          type: 'area-picker',
          title: '种植地区',
          placeholder: '请选择地区',
          value: '',
        },
        {
          type: 'picker',
          mode: 'date',
          start: app.date.dateFormatter(new Date(), 1),
          title: '种植日期',
          placeholder: '请选择日期',
          value: '',
          range: [],
        },
      ],
    };
  }

  // 输入处理
  optionInputChange(index, value) {
    const self = this;
    const optionList = self.state.optionList;
    optionList[index].value = value;
    this.setState({
      optionList: optionList,
    });
  }

  // 选择器
  optionPickerChange = (item, index, e) => {
    console.log(e);
    const self = this;
    const optionList = self.state.optionList;
    var item = optionList[index];
    if (item.mode === 'selector') {
      item.value = item.range[e.detail.value];
    } else {
      item.value = e.detail.value;
    }
    self.setState({
      optionList: optionList,
    });
  };

  // 提交
  clickSubmit() {
    const self = this;
    const optionList = self.state.optionList;
    let enableSubmit = true;
    for (let i = 0; i < optionList.length; i++) {
      const element = optionList[i];
      if (element.value) {
        console.log(`已填写：${element.title}-${element.value}`);
      } else {
        app.HUD.showToastMessage(`请填写${element.title}`);
        enableSubmit = false;
        break;
      }
    }
    if (enableSubmit) {
      app.HUD.showToastSuccess('提交成功');
    }
  }

  // 重置
  clickReset() {
    const self = this;
    const optionList = self.state.optionList;
    optionList.forEach((element) => {
      element.value = '';
    });
    self.setState({
      optionList: optionList,
    });
  }

  // 渲染输入框
  renderOptionInput(item, index) {
    let optionInput = null;
    if (item.type === 'input') {
      optionInput = (
        <AtInput
          className="input"
          name="value"
          title={item.title}
          type="text"
          placeholder={item.placeholder}
          value={item.value}
          onChange={this.optionInputChange.bind(this, index)}
        />
      );
    } else if (item.type === 'textarea') {
      optionInput = (
        <AtTextarea
          className="textarea"
          value={item.value}
          onChange={this.optionInputChange.bind(this, index)}
          maxLength={500}
          height={300}
          placeholder={item.placeholder}
        />
      );
    } else if (item.type === 'area-picker') {
      optionInput = (
        <AreaPicker
          title={item.title}
          Division="-"
          getCity={this.optionInputChange.bind(this, index)}
        />
      );
    } else if (item.type === 'picker') {
      optionInput = (
        <Picker
          className="picker"
          mode={item.mode}
          range={item.range}
          start={item.start}
          onChange={this.optionPickerChange.bind(this, item, index)}>
          <AtList>
            <AtListItem title={item.title} extraText={item.value} />
          </AtList>
        </Picker>
      );
    }
    return optionInput;
  }

  render() {
    return (
      <View className="container">
        <AtForm className="form">
          {this.state.optionList.map((item, index) => {
            return this.renderOptionInput(item, index);
          })}
        </AtForm>
        <AtButton className="button" type="primary" onClick={this.clickSubmit.bind(this)}>
          提交
        </AtButton>
        <AtButton className="button" type="secondary" onClick={this.clickReset.bind(this)}>
          重置
        </AtButton>
      </View>
    );
  }
}
