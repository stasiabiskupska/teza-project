/** @jsxImportSource @emotion/react */
import { useCallback } from 'react';
import { BooleanButton, FormLabel } from '../formParts';
import { FieldProps } from './types';

export const BooleanField: React.FC<FieldProps<boolean>> = ({
  element,
  value,
  onChange,
  error,
  touched,
}) => {
  const handleChange = useCallback(
    (_value: boolean) => {
      onChange(element.id, value === _value ? null : _value);
    },
    [element, value, onChange],
  );
  return (
    <FormLabel error={error} element={element} touched={touched}>
      <BooleanButton
        data-testid={`${element.id}_yes`}
        active={value === true}
        data-pressed={value === true}
        onClick={() => handleChange(true)}
        aria-label="yes"
      >
        yes
      </BooleanButton>
      <BooleanButton
        data-testid={`${element.id}_no`}
        aria-label="no"
        active={value === false}
        data-pressed={value === false}
        onClick={() => handleChange(false)}
      >
        no
      </BooleanButton>
    </FormLabel>
  );
};
