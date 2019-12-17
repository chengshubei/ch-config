'use strict';

const path = require('path');

const defaultCfg = {
    appenders: {out: {type: 'stdout'}},
    categories: {default: {appenders: ['out'], level: 'debug'}}
};

module.exports = (config) => {
    //没有提供保存路径, 则返回基本配置, 不保存文件
    if (! config.filePath) return defaultCfg;
    let fileName = path.join(config.filePath, config.fileName || 'app');
    let instanceFlag = '';
    if (process.env.instances && process.env.instances > 1) {
        //PM2集群部署, 日志分开保存
        instanceFlag = `-${process.env.NODE_APP_INSTANCE}`;
    }
    return {
        disableClustering: true,
        appenders: {
            file: {
                type: 'file',
                filename: fileName + '-error.log',
                maxLogSize: 52428800, //最大文件大小
                numBackups: 10, //最大保存文件数量
                compress: Boolean(config.isCompress) || false, //历史是否压缩
                keepFileExt: true //日志文件是否保持后缀
            },
            dateFile: {
                type: 'dateFile',
                filename: fileName + instanceFlag,
                pattern: 'yyyy-MM-dd.log',
                compress: Boolean(config.isCompress) || false, //历史日志是否压缩
                alwaysIncludePattern: true, //日志滚动时保留模式yyyy-MM-dd
                keepFileExt: true, //日志滚动时保留文件扩展名
                daysToKeep: config.keepDays || 30 //配置日志文件保存时间
            },
            out: {
                type: 'stdout'
            },
            panicFile: {
                type: 'logLevelFilter', //分级日志
                appender: 'file',
                level: 'error' //触发的最小日志级别     
            }
        },
        categories: {
            default: {
                appenders: ['out', 'dateFile', 'panicFile'],
                level: 'info'
            }
        }
    };
};