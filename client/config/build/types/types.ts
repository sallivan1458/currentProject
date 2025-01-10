export interface IBuildPaths {
    entry: string;
    html: string;
    output: string;
    public: string;
    src: string;
}

export type IBuildMode = "development" | "production";


export interface IBuildOptions {
    port: number,
    paths: IBuildPaths,
    mode: IBuildMode
    analyzer?: boolean

}