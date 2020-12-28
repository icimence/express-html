# express-html

*既然你已经打开了这个文档，可以求个star不？*😃

## 实现功能简述

** 可以登陆、注册、注销，保持登陆状态（一分钟自动清除）** 实现了首页的展示，同时可以使用首页的顶栏对任何页面进行浏览。可以通过顶栏中的登录按钮进行登陆。进入登录页面后如果没有帐户即可直接跳转到注册页面。注册失败会有提示，注册成功则是直接跳转到登陆页面，登录成功后跳转到首页。

## 启动方法

首先运行`web_userinfo.sql`，推荐使用MySQL5.7，如果使用MySQL8需要使用改变`root@localhost`的密码加密方式，改回MySQL5使用的mysql_native_password。

之后再文件夹中命令行运行

```bash
npm install
node bin/www
```

如果argon2出现问题请检查node-gyp。

访问localhost:3000即可。

## 项目说明

### 框架

本项目使用express+html实现，使用的是express的ejs模板，通过修改引擎来实现对html文件的渲染。

### 文件结构

```bash
├─bin
├─build
├─public
│  ├─img
│  ├─javascripts
│  └─stylesheets
├─routes
└─views
```
bin中是启动脚本，build文件中是`node-gyp`自动生成的配置文件。public中则是网站的基本所有网页和需要的资源文件，routes中是请求的应答js，views中有index主页。

### 代码修改

#### app.js

修改了`app.js`，将原本使用的ejs模板转换为html，同时对api端口的请求进行指定，由`routes/api.js`进行应答

#### api.js

这个文件中包含了大部分的应答工作