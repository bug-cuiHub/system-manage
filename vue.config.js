module.exports = {
    
    //配置项目启动端口
    devServer: {
        host: '0.0.0.0',
        port: 8087,
        https: false,
        open: true,
        hotOnly: false,
        proxy: null, // 设置代理
        before: app => { },
    },
}