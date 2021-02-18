## 简介

这是一个三国杀斗地主战绩管理系统。

## 下载 npm 包

为了节省体积，所有工程都没有上传 ```node_modules``` 文件夹，需要使用命令行自行下载

```
$ npm i
```

## 编译客户端代码

```
$ cd client
```

开发模式

> 使用 ```webpack.dev.js``` 作为 ```webpack``` 的配置文件,实时打包

```
$ npm run watch
```

生产模式

> 使用 ```webpack.prod.js``` 作为 ```webpack``` 的配置文件,打包成最小文件

```
$ npm run build
```

打包成功后会在自动生成 ```dist``` 文件夹，该文件夹下有三个打包后的文件：```index.html```、```app.bundle.js```、```vendor.bundle.js```。

为了方便，可以修改通过 ```webpack.common.js``` 下的 ```path: path.resolve('./', 'dist')```，指定打包到服务端的 ```views``` 目录下，例如 ``` path: path.resolve('../server_node', 'views')```。

```javascript
output: {
    filename: '[name].bundle.js',
    path: path.resolve('./', 'dist'),
    publicPath: './',
}
```

##  启动 Node.js 版服务端代码

拷贝客户端生成的 ```index.html```、```app.bundle.js```、```vendor.bundle.js``` 到本工程 ```views``` 目录下，然后用命令行启动。

```
$ cd server_node

$ node index.js
```