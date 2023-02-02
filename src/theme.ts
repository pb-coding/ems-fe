import { extendTheme } from '@mui/joy/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ThemeCssVarOverrides } from '@mui/joy'

declare module '@mui/joy/styles' {
  interface Palette {
    ems: {
      background: string;
      bodyBg: string;
      surface: string;
      primary: string;
      header: string;
      primaryFont: string;
      secondaryFont: string;
    };
  }
}

const emsColors = {
    background: 'linear-gradient(90deg, rgba(37,47,66,1) 0%, rgba(1,46,102,1) 50%, rgba(37,47,66,1) 100%);',
    bodyBg: '#16171b',
    surface: '#1f2125',
    primary: '#096bde',
    border: '#008fff',
    header: '#c1c1c1',
    primaryFont: '#ffffff',
    secondaryFont: '#919397',
};

const emsTheme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
            outlinedBg: emsColors.surface,
            outlinedBorder: emsColors.border,
        },
        ems: {
            bodyBg: emsColors.bodyBg,
            background: emsColors.background,
            surface: emsColors.surface,
            primary: emsColors.primary,
            header: emsColors.header,
            primaryFont: emsColors.primaryFont,
            secondaryFont: emsColors.secondaryFont,
        },
      }
    },
  },
});

const responsive = (
  breakpoint: string,
  classTrue: ThemeCssVarOverrides,
  classFalse: ThemeCssVarOverrides
) => {
  const matches = useMediaQuery(breakpoint);
  return matches ? classTrue : classFalse;
}

const customTheme = {
  emsTheme,
  emsColors,
  responsive,
}


export default customTheme;