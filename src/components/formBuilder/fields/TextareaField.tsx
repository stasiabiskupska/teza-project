/** @jsxImportSource @emotion/react */
import { FormLabel } from '../formParts';
import { htmlId } from '../helpers';
import { FieldProps } from './types';

export const TextareaField: React.FC<FieldProps<string>> = ({
  element,
  value,
  onChange,
  error,
  touched,
}) => {
  return (
    <FormLabel element={element} error={error} touched={touched}>
      <textarea
        id={htmlId(element.id)}
        aria-label={element.question_text}
        name={element.id}
        onChange={e => onChange(element.id, e.target.value)}
      />
    </FormLabel>
  );
};
