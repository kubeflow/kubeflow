import { createMuiTheme } from '@material-ui/core';

export const CommonCss = {
  accent: '#3b78e7',
};

export const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      containedPrimary: {
        '&:hover': {
          backgroundColor: '#3d8df5',
        },
        backgroundColor: '#1a73e8',
      },
      root: {
        color: CommonCss.accent,
        fontFamily: '"google sans", Helvetica',
        fontWeight: 'inherit',
        textTransform: 'none',
      },
    },
    MuiFormLabel: {
      focused: {
        color: CommonCss.accent + ' !important',
      },
      root: {
        color: '#333',
        fontSize: 18,
        fontWeight: 500,
        margin: '12px 10px',
      },
    },
    MuiInput: {
      input: {
        color: '#555',
        fontSize: 15,
        height: 40,
        padding: '0 10px',
      },
      root: {
        marginTop: '25px !important',
      },
      underline: {
        '&:after': {
          borderBottom: `2px solid ${CommonCss.accent}`,
        },
        '&:before': {
          borderBottom: '1px solid #ccc',
        },
        '&:hover:not($disabled):not($focused):not($error):before': {
          borderBottom: '1px solid #555',
        },
      },
    },
    MuiInputLabel: {
      root: {
        color: '#555',
      },
    },
  },
});
