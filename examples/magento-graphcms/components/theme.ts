/// <reference types="@graphcommerce/next-ui/types" />

import {
  breakpointVal,
  MuiButtonPill,
  MuiButtonResponsive,
  themeBaseDefaults,
  MuiSnackbar,
  MuiFabSizes,
  MuiSlider,
  MuiChip,
  MuiButtonInline,
  NextLink,
  createTheme,
  createResponsiveTemplate,
} from '@graphcommerce/next-ui'
import { Theme, alpha, LinkProps } from '@mui/material'
import { Components, PaletteOptions } from '@mui/material/styles'

const lightPalette: PaletteOptions = {
  mode: 'light',
  primary: {
    main: '#47C489',
    contrastText: '#ffffff',
    dark: '#47C489',
  },
  secondary: {
    main: '#006bff',
    light: '#d1e4ff',
    contrastText: '#ffffff',
  },
  background: {
    default: '#f9f9f9',
    paper: '#ffffff',
    image: '#ffffff',
  },
  divider: '#00000015',
  success: {
    main: '#01d26a',
  },
  action: {
    hoverOpacity: 0.16,
  },
  text: {
    primary: '#000000',
    secondary: '#00000050',
    disabled: '#00000030',
  },
}

const darkPalette: PaletteOptions = {
  mode: 'dark',
  primary: {
    main: '#62C7B0',
    contrastText: '#ffffff',
    dark: '#62C7B0',
  },
  secondary: {
    main: '#62C7B0',
    light: '#62C7B0',
    contrastText: '#ffffff',
  },
  background: {
    default: '#001727',
    paper: '#15293B',
    image: '#ffffff',
  },
  divider: '#ffffff30',
  success: {
    main: '#01D26A',
  },
  action: {
    hoverOpacity: 0.16,
  },
  text: {
    primary: '#ffffff',
    secondary: '#ffffff80',
    disabled: '#ffffff30',
  },
}

const fontSize = (from: number, to: number) =>
  breakpointVal('fontSize', from, to, themeBaseDefaults.breakpoints.values)

const responsiveTemplate = createResponsiveTemplate(themeBaseDefaults.breakpoints.values)

// Create a theme instance.
const createThemeWithPalette = (palette: PaletteOptions) =>
  createTheme({
    palette,
    shape: { borderRadius: 3 },
    typography: {
      fontFamily:
        '-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji',
      // @see docs typography.md
      h1: {
        ...fontSize(28, 64),
        fontWeight: 700,
        fontVariationSettings: "'wght' 660",
        lineHeight: 1.22,
      },
      h2: {
        ...fontSize(25, 40),
        fontWeight: 700,
        fontVariationSettings: "'wght' 630",
        lineHeight: 1.35,
      },
      h3: {
        ...fontSize(22, 30),
        fontWeight: 700,
        fontVariationSettings: "'wght' 660",
        lineHeight: 1.55,
      },
      h4: {
        ...fontSize(18, 26),
        fontWeight: 550,
        fontVariationSettings: "'wght' 550",
        lineHeight: 1.55,
      },
      h5: {
        ...fontSize(17, 20),
        fontWeight: 650,
        fontVariationSettings: "'wght' 650",
        lineHeight: 1.55,
      },
      h6: {
        ...fontSize(17, 20),
        fontWeight: 550,
        fontVariationSettings: "'wght' 510",
        lineHeight: 1.8,
      },
      subtitle1: {
        ...fontSize(16, 19),
        fontWeight: 450,
        fontVariationSettings: "'wght' 460",
        lineHeight: 1.7,
      },
      fontWeightBold: 600,
      body1: {
        ...fontSize(14, 18),
        lineHeight: 1.7,
      },
      subtitle2: {
        ...fontSize(14, 16),
        fontWeight: 500,
        fontVariationSettings: "'wght' 520",
        lineHeight: 1.7,
      },
      body2: {
        ...fontSize(13, 15),
        lineHeight: 1.7,
      },
      caption: {
        // https://web.dev/font-size/#how-the-lighthouse-font-size-audit-fails
        ...fontSize(12, 13),
      },
      button: {},
      overline: {
        // https://web.dev/font-size/#how-the-lighthouse-font-size-audit-fails
        ...fontSize(12, 14),
        fontWeight: 500,
        letterSpacing: 1,
        lineHeight: 1.2,
        textTransform: 'uppercase',
      },
    },
    spacings: {
      xxs: responsiveTemplate`${[10, 16]}px`,
      xs: responsiveTemplate`${[12, 20]}px`,
      sm: responsiveTemplate`${[12, 20]}px`,
      md: responsiveTemplate`${[16, 50]}px`,
      lg: responsiveTemplate`${[24, 80]}px`,
      xl: responsiveTemplate`${[40, 100]}px`,
      xxl: responsiveTemplate`${[80, 160]}px`,
    },
    page: {
      horizontal: responsiveTemplate`${[10, 30]}px`,
      vertical: responsiveTemplate`${[10, 30]}px`,
    },
    appShell: {
      headerHeightSm: '46px',
      headerHeightMd: '100px',
      appBarHeightMd: '80px',
      appBarInnerHeightMd: '46px',
    },
  })

// todo: move most of the styles to the graphcommerce library while still allowing for extensibility.
const createOverrides = (theme: Theme): Components => ({
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        overflowY: 'scroll',
      },
      '::selection': { background: alpha(theme.palette.primary.main, 0.6) },
      '::-moz-selection': { background: alpha(theme.palette.primary.main, 0.6) },
      '#__next': {
        position: 'relative',
      },
      'picture img': {
        filter: 'brightness(1.03)',
        willChange: 'filter',
      },
    },
  },

  // https://mui.com/material-ui/guides/routing/#global-theme-link
  // https://www.graphcommerce.org/docs/framework/links
  MuiLink: { defaultProps: { component: NextLink } as LinkProps },
  MuiButtonBase: { defaultProps: { LinkComponent: NextLink } },

  MuiContainer: {
    variants: [
      {
        props: { disableGutters: false },
        style: theme.unstable_sx({
          paddingLeft: theme.page.horizontal,
          paddingRight: theme.page.horizontal,
          [theme.breakpoints.up('sm')]: {
            paddingLeft: theme.page.horizontal,
            paddingRight: theme.page.horizontal,
          },

          // Containers should never be nested, but when they are, remove padding.
          '& .MuiContainer-root': { paddingLeft: 0, paddingRight: 0 },
        }),
      },
    ],
  },

  MuiInputBase: {
    styleOverrides: {
      root: {
        fontSize: '16px', // https://css-tricks.com/16px-or-larger-text-prevents-ios-form-zoom/
      },
    },
  },

  MuiButton: {
    defaultProps: { color: 'inherit' },
    variants: [
      ...MuiButtonResponsive,
      ...MuiButtonPill,
      ...MuiButtonInline,
      {
        props: { variant: 'contained', color: 'inherit' },
        style: { backgroundColor: theme.palette.background.paper },
      },
      {
        props: { variant: 'outlined' },
        style: {
          ...breakpointVal(
            'borderRadius',
            theme.shape.borderRadius * 2,
            theme.shape.borderRadius * 3,
            theme.breakpoints.values,
          ),
        },
      },
      {
        props: { variant: 'text' },
        style: { borderRadius: '99em' },
      },
      {
        props: { variant: 'inline' },
        style: { borderRadius: '99em' },
      },
      {
        props: { color: 'primary' },
        style: {
          '&:not(.Mui-disabled)': {
            boxShadow: 'none',
          },
        },
      },
      {
        props: { color: 'secondary' },
        style: {
          '&:not(.Mui-disabled)': {
            boxShadow: 'none',
          },
        },
      },
    ],
  },

  MuiFab: {
    styleOverrides: {
      root: {
        backgroundColor: theme.palette.background.paper,
        '&:hover': {
          backgroundColor: theme.palette.background.paper,
        },
        color: theme.palette.text.primary,
      },
      colorInherit: {
        backgroundColor: 'inherit',
        '&:hover, &:focus': {
          backgroundColor: 'inherit',
        },
        boxShadow: 'none',
      },
      primary: {
        color: theme.palette.text.primary,
      },
      secondary: {
        color: theme.palette.text.primary,
      },
      extended: {
        fontWeight: 400,
        textTransform: 'none',
      },
    },

    variants: [...MuiFabSizes],
  },

  MuiTextField: {
    defaultProps: { color: 'secondary' },
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root': {
          ...breakpointVal(
            'borderRadius',
            theme.shape.borderRadius * 1.5,
            theme.shape.borderRadius * 2,
            theme.breakpoints.values,
          ),
        },
      },
    },
  },

  MuiListItemIcon: {
    styleOverrides: {
      root: {
        color: theme.palette.text.primary,
      },
    },
  },

  MuiChip: {
    variants: [...MuiChip],
  },

  MuiCheckbox: {
    styleOverrides: {
      colorPrimary: {
        color: theme.palette.text.disabled,
        '&.Mui-checked': {
          color: theme.palette.primary.main,
        },
      },
      colorSecondary: {
        color: theme.palette.text.disabled,
        '&.Mui-checked': {
          color: theme.palette.secondary.main,
        },
      },
    },

    variants: [
      {
        props: { size: 'medium' },
        style: {
          padding: 7,
        },
      },
    ],
  },

  MuiSwitch: {
    styleOverrides: {
      thumb: {
        boxShadow: theme.shadows[6],
      },
    },
  },

  MuiSnackbar: { variants: [...MuiSnackbar] },

  MuiAvatar: {
    styleOverrides: {
      colorDefault: {
        backgroundColor: theme.palette.text.disabled,
      },
    },
  },

  MuiSlider: { variants: [...MuiSlider] },

  MuiCircularProgress: {
    defaultProps: {
      thickness: 2,
    },
  },
})

export const lightTheme = createThemeWithPalette(lightPalette)
lightTheme.components = createOverrides(lightTheme)

export const darkTheme = createThemeWithPalette(darkPalette)
darkTheme.components = createOverrides(darkTheme)
