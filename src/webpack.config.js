module.exports = {
    //指定打包的入口文件，每有一个键值对，就是一个入口文件
    entry: {
        index: "./js/index"
    },
    //配置打包结果，path定义了输出的文件夹，filename则定义了打包结果文件的名称，filename里面的[name]会由entry中的键替换。
    output: {
        filename: "[name].js"
    },
    devtool: "source-map",
    //定义了解析模块路径时的配置，常用的就是extensions，可以用来指定模块的后缀，这样在引入模块时就不需要写后缀了，会自动补全.
    resolve: {
        extensions: [".js"]
    },
    //定义了对模块的处理逻辑，这里可以用loaders定义了一系列的加载器，以及一些正则。当需要加载的文件匹配test的正则时，就会进行处理。babel-loader是我们使用ES-6进行开发时用于生成JS文件。
    module: {
        rules: [
            {
                //一个匹配loaders所处理的文件的拓展名的正则表达式（必须）
                test: /\.js$/,
                //手动添加必须处理的文件（文件夹）或屏蔽不需要处理的文件（文件夹）（可选）；
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["es2015"]
                    }
                }
            }
        ]
    }
};
