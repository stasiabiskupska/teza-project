/** @jsxImportSource @emotion/react */

import { useTheme } from '@emotion/react';
import { Stepper } from 'components/ui/Stepper';
import React, { useCallback } from 'react';
import { BooleanField } from './fields/BooleanField';
import { MultichoiceField } from './fields/MultichoiceField';
import { TextareaField } from './fields/TextareaField';
import { TextField } from './fields/TextField';
import { FieldProps } from './fields/types';
import { FormValues } from './types';
import { useFormState } from './useFormState';

const FIELD_TYPE_TO_COMPONENT: Record<
  Frontier.Element['type'],
  React.ComponentType<FieldProps>
> = {
  boolean: BooleanField,
  text: TextField,
  textarea: TextareaField,
  multichoice: MultichoiceField,
};

export const FormBuilder: React.FC<{ config: Frontier.Job }> = ({ config }) => {
  const handleSubmit = useCallback(
    (values: FormValues) => console.log(values),
    [],
  );
  const {
    getFieldError,
    isFieldTouched,
    setFieldValue,
    getFieldValue,
    activeSection,
    step,
    totalSteps,
    goBack,
    submitStep,
    activeSectionInvalid,
    activeSectionSubmitted,
  } = useFormState(config, handleSubmit);

  const theme = useTheme();

  return (
    <div>
      <Stepper step={step} totalSteps={totalSteps}>
        Step {step} of {totalSteps}
      </Stepper>
      <h2>{activeSection.title}</h2>
      <div>
        {activeSection.content.map(element => {
          const Component = FIELD_TYPE_TO_COMPONENT[element.type];
          return (
            Component && (
              <Component
                key={element.id}
                element={element}
                onChange={setFieldValue}
                touched={isFieldTouched(element.id)}
                value={getFieldValue<boolean>(element.id)}
                error={getFieldError(element.id)}
              />
            )
          );
        })}
      </div>
      <button
        css={{
          marginTop: '2em',
          background: theme.color.primary,
          padding: '0.5em 2em',
          border: `1px solid ${theme.color.primary}`,
          color: theme.color.contrastText,
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
        onClick={submitStep}
        disabled={activeSectionSubmitted && activeSectionInvalid}
      >
        {step < totalSteps ? 'Next' : 'Submit'}
      </button>
      <br />
      {step > 1 ? (
        <button
          css={{
            display: 'inline-block',
            marginTop: '1em',
            border: 'none',
            textDecoration: 'underline',
            cursor: 'pointer',
            color: '#623cea'
          }}
          onClick={e => {
            goBack();
          }}
        >
          Go back
        </button>
      ) : null}
    </div>
  );
};
