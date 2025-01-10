export function buildBabelLoader() {
    return {
        test: /\.tsx$/,
        exclude: /node_modules/,
        use: {
            loader: "babel-loader",
            // options: сам находит путь к bable.config.json
        }
    }
}