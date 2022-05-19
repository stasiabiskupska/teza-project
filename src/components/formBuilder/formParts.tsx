/** @jsxImportSource @emotion/react */

import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';
import { htmlId } from './helpers';

export const ValidationError = styled.div`
  color: ${p => p.theme.color.error};
  margin-top: 0.5em;
`;

export const LabelText = styled.div`
  margin-bottom: 0.5em;
`;

export const LabelRoot = styled.label<{ invalid?: boolean }>`
  display: block;
  & + label {
    margin-top: 1em;
  }

  input,
  textarea {
    border: 1px solid gray;
    padding: 0.5em;
    width: 80%;
  }

  input[type='checkbox'] {
    width: auto;
  }

  textarea {
    height: 30ch;
  }

  ${p =>
    p.invalid &&
    `
    input, textarea {
      border: 1px solid red;
    }
  `}
`;

export const CheckboxLabel = styled.label`
  margin-right: 1em;
  padding: 0.33em;
  width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const BooleanButton = styled.button<{ active?: boolean }>`
  border: 1px solid ${p => p.theme.color.secondary};
  background: transparent;
  color: ${p => p.theme.color.text};

  :hover {
    background: ${p => p.theme.color.secondary};
    color: ${p => p.theme.color.text};
  }
  ${p =>
    p.active &&
    `
    background: ${p.theme.color.secondary};
    color: ${p.theme.color.text};
  `}
  padding: 0.5em 2em 0.5em 2em;
  cursor: pointer;
  & + button {
    margin-left: 1em;
  }
`;

export const FormLabel: React.FC<{
  element: Frontier.Element;
  error?: string;
  touched?: boolean;
}> = ({ element, error, touched, children }) => {
  const theme = useTheme();
  return (
    <LabelRoot invalid={touched && !!error} htmlFor={htmlId(element.id)}>
      <LabelText>
        {element.question_text}
        {element.metadata.required ? (
          <strong css={{ color: error ? theme.color.error : 'inherit' }}>
            *
          </strong>
        ) : (
          ''
        )}
        :
      </LabelText>
      {children}
      {touched && error ? (
        <ValidationError data-testid={`${element.id}_error`}>
          {error}
        </ValidationError>
      ) : null}
    </LabelRoot>
  );
};
