declare var _default: ({
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
    onwarn: (warning: any, defaultWarn: any) => void;
} | {
    input: {
        index: any;
    };
    output: {
        dir: string;
        format: string;
        sourcemap: boolean;
    }[];
    plugins: any[];
    external: (id: any) => boolean;
    treeshake: {
        moduleSideEffects: boolean;
    };
    onwarn?: undefined;
})[];
export default _default;
