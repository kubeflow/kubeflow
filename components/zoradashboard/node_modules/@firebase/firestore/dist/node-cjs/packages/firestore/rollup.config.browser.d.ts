declare var _default: ({
    input: string;
    output: {
        file: string;
        format: string;
        sourcemap: boolean;
        dir?: undefined;
    };
    plugins: any[];
    external: (id: any) => boolean;
    treeshake: {
        moduleSideEffects: boolean;
    };
    onwarn: (warning: any, defaultWarn: any) => void;
} | {
    input: {
        index: string;
        bundle: string;
    };
    output: {
        dir: string;
        format: string;
        sourcemap: boolean;
        file?: undefined;
    };
    plugins: any[];
    external: (id: any) => boolean;
    treeshake: {
        moduleSideEffects: boolean;
    };
    onwarn?: undefined;
} | {
    input: {
        index: any;
        bundle: any;
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
