import { EmailSharp } from '@mui/icons-material';
import { extendTheme } from '@mui/joy/styles';

declare module '@mui/joy/styles' {
  interface Palette {
    ems: {
      background: string;
      bodyBg: string;
      surface: string;
      primary: string;
      header: string;
    };
  }
}

const emsColors = {
    background: 'linear-gradient(180deg, rgba(46,48,52,1) 0%, rgba(46,48,52,1) 50%, rgba(22,24,25,1) 100%)',
    bodyBg: '#16171b',
    surface: '#1f2125',
    primary: 'red',
    border: '#008fff',
    header: '#c1c1c1'
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
        },
      }
    },
  },
});

export default emsTheme;