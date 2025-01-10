import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {IBuildOptions} from "./types/types";
import {ModuleOptions} from "webpack"
import ReactRefreshTypeScript from "react-refresh-typescript";
import {buildBabelLoader} from "./babel/buildBabelLoader";

export function buildLoaders({mode}: IBuildOptions): ModuleOptions["rules"] {


    const isProd = mode === "production";
    const isDev = mode === "development";


    const assetLoader = {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
    }
    const svgrLoader = {
        test: /\.svg$/,
        use: [
            {
                loader:'@svgr/webpack',
                options: {
                    icon:true,
                    svgoConfig: {
                        plugins: [
                            {
                                name: "convertColors",
                                params: {
                                    currentColor:true
                                }
                            }
                        ]
                    }
                }
            }
        ],
    }




    const cssLoader = {
        loader: "css-loader",
        options: {
            modules: {
                localIdentName: isDev ? "[path][name]__[local]" : "[hash:base64:8]"
            },
        }
    }

    const scssLoader = {
        test: /\.s[ac]ss$/i,
        use: [
            // Creates `style` nodes from JS strings
            isProd ? MiniCssExtractPlugin.loader : "style-loader",
            // Translates CSS into CommonJS
            cssLoader,
            // Compiles Sass to CSS
            "sass-loader",
        ],
    }


    const tsLoader = {
        exclude: /node_modules/,
        test: /\.tsx$/,
        use:[
            {
                loader: 'ts-loader',
                options: {
                    //true -> уберает проверку типов
                    transpileOnly: true,
                    getCustomTransformers: () => ({
                        before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
                    }),
                }
            }
        ]
    }
    const babelLoader = buildBabelLoader()



    return [
        assetLoader,
        svgrLoader,
        scssLoader,
        babelLoader
        // tsLoader
    ]
}