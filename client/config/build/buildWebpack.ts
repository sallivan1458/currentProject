import webpack from "webpack";
import path from "node:path";
import {buildDevServer} from "./buildDevServer";
import {buildLoaders} from "./buildLoaders";
import {buildPlugins} from "./buildPlugins";
import {buildResolvers} from "./buildResolvers";
import {IBuildOptions} from "./types/types";

export function buildWebpack(options:IBuildOptions):webpack.Configuration {

    const {mode, paths} = options;
    const isDev = mode === "development";
    const isProd = mode === "production";

    return {
        mode: options.mode,
        entry: paths.entry,
        output: {
            path: paths.output,
            filename: '[name].[contenthash].js',
            clean: true
        },
        plugins: buildPlugins(options),
        module: {
            rules: buildLoaders(options)
        },
        resolve: buildResolvers(options),
        devtool: isDev && "inline-source-map",
        devServer: isDev ? buildDevServer(options): undefined
    }
}