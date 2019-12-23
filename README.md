# vue-chat

启动项目：
1、找到项目主目录路径，使用 npm install 命令生成项目依赖包 node_modules。
2、使用 CMD 命令在主目录所在路径输入 npm run serve 即可启动项目
3、在谷歌浏览器打开对应域名及端口即可看到页面

主项目 src 下文件说明：
-components 页面组件
--ChatNavBar 顶部导航
--MessageForm 底部消息发送
--MessageList 右侧消息窗口
--RoomList 左侧群聊
-plugins 引入插件
--element 按需引入 ui 组件
-store 数据中心
--actions 数据处理
--Bus 兄弟组件通过 Bus 传值
--index 数据
--mutations 计算
-app 全局样式
-App vue 主文件
-main js 入口
-router 路由中心

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your tests

```
npm run test
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
