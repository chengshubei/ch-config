'use strict';

module.exports = (config) => {
    return {
        host: config.host || '127.0.0.1',
        port: config.port || 3306,
        database: config.database,
        username: config.username || 'root',
        password: config.password || '123456',
        dialect: config.dialect || 'mysql',
        pool: {
            //连接池最大分配的连接数
            max: config.max_connection || 100,
            //连接池空闲时保持的最小连接数
            min: config.min_connection || 1,
            //获取连接超时(抛错)时间
            acquire: 30000,
            //空闲连接超时释放时间
            idle: 20000
        },
        dialectOptions: {
            //设置decimal类型字段，返还值为数字类型，而不是默认的string
            decimalNumbers: true,
            //设定连接池中每个connection的最大max_prepared_stmt_count, 默认值为16000。而mysql的max_prepared_stmt_count默认配置为16382，并且是连到该服务器上所有连接的总和, 通常可以修改大一些。
            maxPreparedStatements: 200
        },
        logging: config.logger ? console.warn : false,
        timezone: '+08:00',
        define: {
            freezeTableName: true,
            timestamps: false,
            underscored: true,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci'
        }
    };
};