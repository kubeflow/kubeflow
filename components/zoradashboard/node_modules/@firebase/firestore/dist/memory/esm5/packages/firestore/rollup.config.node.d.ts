declare var _default: ({
    input: {
        index: string;
        bundle: string;
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
} | {
    input: {
        index: string;
        bundle: string;
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
    external: (id: any) => boolean;
    treeshake: {
        moduleSideEffects: boolean;
    };
    plugins?: undefined;
    onwarn?: undefined;
})[];
export default _default;
