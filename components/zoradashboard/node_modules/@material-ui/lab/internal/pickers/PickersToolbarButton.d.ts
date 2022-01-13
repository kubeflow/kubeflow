import * as React from 'react';
import { ButtonProps } from '@material-ui/core/Button';
import { TypographyProps } from '@material-ui/core/Typography';
import { ExtendMui } from './typings/helpers';
export interface PickersToolbarButtonProps extends ExtendMui<ButtonProps, 'value' | 'variant'> {
    align?: TypographyProps['align'];
    selected: boolean;
    typographyClassName?: string;
    value: React.ReactNode;
    variant: TypographyProps['variant'];
}
declare const PickersToolbarButton: React.FunctionComponent<PickersToolbarButtonProps>;
export default PickersToolbarButton;
