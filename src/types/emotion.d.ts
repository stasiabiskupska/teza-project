import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    color: {
      primary: string;
      secondary: string;
      background: string;
      text: string;
      contrastText: string;
      error: string;
    };
  }
}
