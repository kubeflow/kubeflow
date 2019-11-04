import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

export const CommonCss = {
  accent: '#000',
  main: '#fff',
};

export const palette = {
  primary: {
    dark: CommonCss.accent,
    main: CommonCss.accent,
  },
  secondary: {
    main: 'rgba(0, 0, 0, .38)',
  },
};

export const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      containedPrimary: {
        '&:hover': {
          backgroundColor: '#313332',
        },
        backgroundColor: '#000',
      },
      root: {
        fontFamily: '"google sans", Helvetica',
        fontWeight: 'inherit',
        textTransform: 'none',
      },
    },
    MuiFormLabel: {
      root: {
        color: '#333',
        fontSize: 18,
        fontWeight: 500,
      },
    },
    MuiInputLabel: {
      root: {
        color: '#555',
      },
    },
  },
  palette,
  typography: {
    useNextVariants: true,
  },
});
