declare var _default: {
    input: {
        index: string;
    };
    output: {
        dir: string;
        format: string;
        sourcemap: boolean;
    };
    plugins: any[];
    external: (id: any) => boolean;
    treeshake: {
        moduleSideEffects: boolean;
    };
}[];
export default _default;
