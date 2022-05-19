/** @jsxImportSource @emotion/react */
import { useTheme } from '@emotion/react';
import React from 'react';

export const Stepper: React.FC<{ step: number; totalSteps: number }> = ({
  step,
  totalSteps,
  children,
}) => {
  const theme = useTheme();
  return (
    <div>
      Step {step} of {totalSteps}
      <div
        css={{
          background: theme.color.secondary,
          width: '100%',
          height: 3,
          marginTop: '0.5em',
        }}
      >
        <div
          css={{
            height: '100%',
            width: `${(step / totalSteps) * 100}%`,
            background: theme.color.primary,
          }}
        />
      </div>
    </div>
  );
};
