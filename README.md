# Taro小程序

```shell
# 项目目录
├── client                                  小程序端目录
│   ├── config                              配置目录
│   │   ├── dev.js                          开发时配置
│   │   ├── index.js                        默认配置
│   │   └── prod.js                         打包时配置
│   ├── dist                                编译结果目录
│   ├── package.json
│   ├── src                                 源码目录
│   │   ├── app.scss                        项目总通用样式
│   │   ├── app.js                          项目入口文件
│   │   ├── components                      组件文件目录
│   │   │   └── login                       login 组件目录
│   │   │       └── index.weapp.js          login 组件逻辑
│   │   └── pages                           页面文件目录
│   │       └── index                       index 页面目录
│   │           ├── index.scss              index 页面逻辑
│   │           └── index.js                index 页面样式
├── cloud                                   服务端目录
│   └── functions                           云函数目录
│       └── login                           login 云函数
│           ├── index.js                    login 函数逻辑
│           └── package.json
└── project.config.json                     小程序项目配置
```



### 一、项目搭建

[Taro](<https://taro-docs.jd.com/taro/docs/README>)官网

[TaroUI](<https://taro-ui.jd.com/#/>)



1. 安装依赖

   - 安装 [node.js 和 npm]( https://docs.npmjs.com/)
   - 全局安装 @tarojs/cli

   >

   ```shell
   # 使用 npm 安装 CLI
   $ npm install -g @tarojs/cli
   # OR 使用 yarn 安装 CLI
   $ yarn global add @tarojs/cli
   # OR 安装了 cnpm，使用 cnpm 安装 CLI
   $ cnpm install -g @tarojs/cli
   ```

   注意：如果安装过程出现`sass`相关的安装错误，请在安装[`mirror-config-china`](https://www.npmjs.com/package/mirror-config-china)后重试

   ```shell
   $ npm install -g mirror-config-china
   ```



2. 项目初始化

```shell
taro init ssf-mini-program
```

![image-20200522102147078](/Users/luisx/Library/Application Support/typora-user-images/image-20200522102147078.png)

4. 依赖检测

```shell
# 使用 yarn 安装依赖
$ yarn
# OR 使用 cnpm 安装依赖
$ cnpm install
# OR 使用 npm 安装依赖
$ npm install
```

5. 运行

```shell
# 微信小程序
# yarn
$ yarn dev:weapp
$ yarn build:weapp
# npm script
$ npm run dev:weapp
$ npm run build:weapp
# 仅限全局安装
$ taro build --type weapp --watch
$ taro build --type weapp
# npx 用户也可以使用
$ npx taro build --type weapp --watch
$ npx taro build --type weapp

# 其他小程序（百度，支付宝，字节，QQ，京东，快应用，H5，React Native）
# 参考：https://taro-docs.jd.com/taro/docs/GETTING-STARTED
```

![image-20200522103205901](/Users/luisx/Library/Application Support/typora-user-images/image-20200522103205901.png)

6. 开发，使用相应的小程序开发工具打开

![image-20200522103605770](/Users/luisx/Library/Application Support/typora-user-images/image-20200522103605770.png)

7. 安装Taro-UI

```shell
npm install taro-ui
```

注意：遇到`Unhandled rejection RangeError: Maximum call stack size exceededill`, 由于node.js和npm不兼容

```shell
npm install -g npm@5.4.0
npm install
```



### 二、云开发

腾讯云开发官网：<https://www.cloudbase.net/>



1.安装

```powershell
sudo npm i -g @cloudbase/cli
```



2.初始化

```
cloudbase init
```

![image-20200623144028538](/Users/luisx/Library/Application Support/typora-user-images/image-20200623144028538.png)

![image-20200623144434808](/Users/luisx/Library/Application Support/typora-user-images/image-20200623144434808.png)

3.本地调试配置 （`project.config.json` 文件，新增 `cloudfunctionRoot` 字段）

```json
{
   "cloudfunctionRoot": "./functions/"
}
```

![image-20200623144247788](/Users/luisx/Library/Application Support/typora-user-images/image-20200623144247788.png)



4.安装云函数

```shell
npm install --save wx-server-sdk@latest
```



5.第一个云函数

![image-20200623144847595](/Users/luisx/Library/Application Support/typora-user-images/image-20200623144847595.png)

```javascript
// 新建add.js云函数：

// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  return {
    sum: event.a + event.b
  }
}
```



```javascript
// 小程序端调用：

wx.cloud.init();

wx.cloud.callFunction({
  // 云函数名称
  name: 'add',
  // 传给云函数的参数
  data: {
    a: 1,
    b: 2,
  },
  success: function(res) {
    console.log(res.result.sum) // 3
  },
  fail: console.error
})
```

