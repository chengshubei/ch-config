# ch-config

    一些后端常用模块的配置封装

## Installation

```
$ npm install ch-config
```

## Usage
```
//log4js模块配置(依赖log4js版本: ^6.1.0)

const log4js = require('log4js);
const getConfig = require('ch-config/log4js');
log4js.configure(getConfig({
    fileName: 'app',    //日志文件名(默认: 'app')
    filePath: null,     //日志文件存储路径(默认: null, 即不保存文件)
    isCompress: false,  //日志是否压缩(默认: false)
    keepDays: 30        //日志保存天数(默认: 30)
}));

```

```
//sequelize模块配置(依赖log4js版本: ^5.21.2)

const sequelize = require('sequelize);
const getConfig = require('ch-config/sequelize');
let sequelize = new Sequelize(getConfig({
    host: '127.0.0.1',      //地址(默认: '127.0.0.1')
    port: 3306,             //端口(默认: 3306)
    database: '',           //库名(必填)
    username: '',           //用户名(必填)
    password: '',           //密码(必填)
    dialect: 'mysql',       //数据库类型(默认: 'mysql)
    max_connection: 100,    //最大连接数(默认: 100)
    min_connection: 1,      //最小连接数(默认: 1)
    logger: false           //是否打印日志(默认: false)
}));

```

## 使用开源的配置文件，总会给自己一种不安的感觉，且不便于修改，所以我也不建议各位朋友使用该模块，仅仅作为参考。

# License

  MIT
