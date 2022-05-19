/** @jsxImportSource @emotion/react */
import { useCallback } from 'react';
import { FormLabel } from '../formParts';
import { htmlId } from '../helpers';
import { FieldProps } from './types';

export const TextField: React.FC<FieldProps<string | number>> = ({
  element,
  value,
  onChange,
  error,
  touched,
}) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value as string | number | null;
      if (element.metadata.format === 'number') {
        value = parseInt(e.target.value, 10);
        if (Number.isNaN(value)) {
          value = null;
        }
      }
      onChange(element.id, value);
    },
     // eslint-disable-next-line
    [element],
  );

  return (
    <FormLabel element={element} error={error} touched={touched}>
      <input
        aria-label={element.question_text}
        name={element.id}
        id={htmlId(element.id)}
        value={value || ''}
        type={element.metadata.format || 'text'}
        onChange={handleChange}
        step={element.metadata.step}
      />
    </FormLabel>
  );
};
