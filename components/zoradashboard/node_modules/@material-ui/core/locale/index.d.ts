import { ComponentsPropsList } from '../styles/props';
export interface Localization {
    components?: {
        MuiAlert?: {
            defaultProps: Pick<ComponentsPropsList['MuiAlert'], 'closeText'>;
        };
        MuiBreadcrumbs?: {
            defaultProps: Pick<ComponentsPropsList['MuiBreadcrumbs'], 'expandText'>;
        };
        MuiTablePagination?: {
            defaultProps: Pick<ComponentsPropsList['MuiTablePagination'], 'labelRowsPerPage' | 'labelDisplayedRows' | 'getItemAriaLabel'>;
        };
        MuiRating?: {
            defaultProps: Pick<ComponentsPropsList['MuiRating'], 'emptyLabelText' | 'getLabelText'>;
        };
        MuiAutocomplete?: {
            defaultProps: Pick<ComponentsPropsList['MuiAutocomplete'], 'clearText' | 'closeText' | 'loadingText' | 'noOptionsText' | 'openText'>;
        };
        MuiPagination?: {
            defaultProps: Pick<ComponentsPropsList['MuiPagination'], 'aria-label' | 'getItemAriaLabel'>;
        };
    };
}
export declare const arEG: Localization;
export declare const azAZ: Localization;
export declare const bnBD: Localization;
export declare const bgBG: Localization;
export declare const caES: Localization;
export declare const csCZ: Localization;
export declare const deDE: Localization;
export declare const elGR: Localization;
export declare const enUS: Localization;
export declare const esES: Localization;
export declare const etEE: Localization;
export declare const faIR: Localization;
export declare const fiFI: Localization;
export declare const frFR: Localization;
export declare const heIL: Localization;
export declare const hiIN: Localization;
export declare const huHU: Localization;
export declare const hyAM: Localization;
export declare const idID: Localization;
export declare const isIS: Localization;
export declare const itIT: Localization;
export declare const jaJP: Localization;
export declare const koKR: Localization;
export declare const kzKZ: Localization;
export declare const nlNL: Localization;
export declare const plPL: Localization;
export declare const ptBR: Localization;
export declare const ptPT: Localization;
export declare const roRO: Localization;
export declare const ruRU: Localization;
export declare const siLK: Localization;
export declare const skSK: Localization;
export declare const svSE: Localization;
export declare const thTH: Localization;
export declare const trTR: Localization;
export declare const ukUA: Localization;
export declare const viVN: Localization;
export declare const zhCN: Localization;
export declare const zhHK: Localization;
export declare const zhTW: Localization;
