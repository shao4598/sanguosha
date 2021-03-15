## 编译客户端代码

0. 自行配置 Node.js 与 npm 环境。

1. 打开 client 文件夹。

2. 使用命令行下载第三方依赖库。

```shell
$ npm i
```

3. 使用命令行编译客户端代码。

开发模式

> 使用 ```webpack.dev.js``` 作为 ```webpack``` 的配置文件,实时打包

```shell
$ npm run watch
```

生产模式

> 使用 ```webpack.prod.js``` 作为 ```webpack``` 的配置文件,打包成最小文件

```shell
$ npm run build
```

4. 打包成功后会在自动生成 ```dist``` 文件夹，该文件夹下有三个打包后的文件：```index.html```、```app.bundle.js```、```vendor.bundle.js```。

5. 为了方便，可以修改通过 ```webpack.common.js``` 下的 ```path: path.resolve('./', 'dist')```，指定打包到服务端的 ```views``` 目录下，例如 ``` path: path.resolve('../server_node', 'views')```。

```javascript
output: {
    filename: '[name].bundle.js',
    path: path.resolve('./', 'dist'),
    publicPath: './',
}
```