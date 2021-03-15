##  启动 Java 版服务端代码

0. 自行配置 JDK Maven 环境。

1. 按 Maven 工程打开 server_java 文件夹。

2. 拷贝客户端生成的 ```index.html``` 到本工程 ```resources/templates``` 目录下。

3. 拷贝客户端生成的 ```app.bundle.js```、```vendor.bundle.js``` 到本工程 ```resources/static``` 目录下。

4. 使用 Maven package 打包

5. 用命令行启动生成的 jar 包

```shell
$ java -jar ./target/sgs.jar
```

6. 使用浏览器访问 ```http://localhost:9900```