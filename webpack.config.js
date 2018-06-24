module.exports = {
    entry: {
        main: './test/test.js'
    },
    output: {
        filename: 'bundle.js' // 打包好的文件位置
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }]
    }
}