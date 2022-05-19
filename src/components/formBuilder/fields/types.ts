import { FieldValue } from '../types';

export type FieldProps<T extends Exclude<FieldValue, null> = any> = {
  element: Frontier.Element;
  value: T | null;
  onChange: (fieldName: Frontier.Element['id'], value: T | null) => void;
  touched?: boolean;
  error?: string;
};
