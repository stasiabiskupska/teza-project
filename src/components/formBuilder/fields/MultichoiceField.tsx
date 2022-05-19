/** @jsxImportSource @emotion/react */
import { CheckboxLabel, FormLabel } from '../formParts';
import { FieldProps } from './types';

export const MultichoiceField: React.FC<FieldProps<string[]>> = ({
  element,
  value,
  onChange,
  error,
  touched,
}) => {
  return (
    <FormLabel element={element} error={error} touched={touched}>
      <div
        css={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}
      >
        {element.metadata.options?.map(option => (
          <CheckboxLabel key={option.value} title={option.label}>
            <input
              aria-label={option.value}
              type="checkbox"
              name={element.id}
              checked={value?.includes(option.value)}
              onChange={e => {
                onChange(
                  element.id,
                  e.target.checked
                    ? [...(value || []), option.value]
                    : value?.filter(v => v !== option.value) || [],
                );
              }}
            />
            {option.label}
          </CheckboxLabel>
        ))}
      </div>
    </FormLabel>
  );
};
