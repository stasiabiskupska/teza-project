/** @jsxImportSource @emotion/react */
import { Global, ThemeProvider } from '@emotion/react';
import { getThemeFromJob } from 'lib/theme';
import React, { useMemo } from 'react';
import formInstructions from '../data/form_instructions.json';
import { FormBuilder } from './formBuilder/FormBuilder';

function App() {
  const job = formInstructions as Frontier.Job;

  const theme = useMemo(() => getThemeFromJob(job), [job]);

  return (
    <ThemeProvider theme={theme}>
      <div css={{ width: 1200 }}>
        <Global
          styles={{
            body: {
              display: 'flex',
              justifyContent: 'center',
              color: theme.color.text,
              padding: '2em',
              margin: 0,
              background: theme.color.background,
              '& h1, h2, h3, input': {
                color: '#0f1b33',
              },
              fontFamily:
                '"Maison Neue", "system","Helvetica Neue","Helvetica","sans-serif"',
              '& :disabled': {
                opacity: 0.5,
              },
            },
          }}
        />
        <h1>The Highly Complex Form Builder</h1>
        <FormBuilder config={job} />
      </div>
    </ThemeProvider>
  );
}

export default App;
