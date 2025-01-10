import webpack from "webpack"
import {buildWebpack} from "./config/build/buildWebpack";
import {IBuildMode, IBuildPaths} from "./config/build/types/types";
import path from "node:path";


export interface IEnvVariabls{
    mode: IBuildMode,
    port: number
    analyzer: boolean
}

export default (env:IEnvVariabls) => {
    const paths: IBuildPaths = {
        output: path.resolve(__dirname, "build"),
        entry: path.resolve(__dirname, "src","index.tsx"),
        html: path.resolve(__dirname, "public" , "index.html"),
        public: path.resolve(__dirname, "public"),
        src: path.resolve(__dirname, "src"),
    }

    const config:webpack.Configuration = buildWebpack({
        port: env.port ?? 3000,
        mode: env.mode ?? "development",
        paths,
        analyzer: env.analyzer
    });
    return config
};