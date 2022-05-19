import { current } from 'immer';
import { useMemo } from 'react';
import { useImmer } from 'use-immer';
import {
  FieldConfig,
  FieldId,
  FieldType,
  FieldValue,
  FormValues,
  SectionId,
} from './types';

const getValidationError = (
  value: FieldValue,
  { required, pattern }: Frontier.ElementMeta,
) => {
  if (
    required &&
    (value === null ||
      value === '' ||
      (Array.isArray(value) && value.length === 0))
  ) {
    return 'Field is required';
  }
  if (pattern) {
    
    if (typeof value !== 'string' || !value.match(pattern)) {
      return 'Field does not match the format'; 
    }
  }

  return null;
};

const stateInitializer = (config: Frontier.Job) => () => {
  const fieldsMap: Record<FieldId, FieldConfig> = {};
  const sectionMap: Record<SectionId, Frontier.Section & { index: number }> =
    {};

  const values: FormValues = {};
  const errors: Record<SectionId, Record<FieldId, string>> = {};
  const touched: Record<SectionId, Record<FieldId, boolean>> = {};
  const sectionSubmitted: Record<SectionId, boolean> = {};

   // eslint-disable-next-line
  config.sections.map((section, sectionIndex) => {
    sectionMap[section.id] = { ...section, index: sectionIndex };
    values[section.id] = {};
    errors[section.id] = {};
    touched[section.id] = {};
    section.content.forEach(element => {
      fieldsMap[element.id] = { ...element, sectionId: section.id };
      values[section.id][element.id] = null;
      if (element.type === 'multichoice') {
        values[section.id][element.id] = [];
      }
      if (element.type === 'text' && element.metadata.format !== 'number') {
        values[section.id][element.id] = '';
      }
      const errorMessage = getValidationError(null, element.metadata);
      if (errorMessage) {
        errors[section.id][element.id] = errorMessage;
      }
    });
  });

  return {
    config,
    fieldsMap,
    sectionMap,
    values,
    errors,
    touched,
    sectionSubmitted,
    activeSectionId: config.sections[0].id, 
  };
};

export const useFormState = (
  config: Frontier.Job,
  handleSubmit: (values: FormValues) => void,
) => {
  const initialState = useMemo(() => stateInitializer(config), [config]);
  const [state, setState] = useImmer(initialState);

  const formApi = useMemo(
    () => ({
      setFieldValue(field: string, value: FieldValue) {
        setState(draft => {
          const { sectionId, metadata } = draft.fieldsMap[field];
          draft.values[sectionId][field] = value;
          draft.touched[sectionId][field] = true;
          const validationError = getValidationError(value, metadata);
          if (validationError) {
            draft.errors[sectionId][field] = validationError;
          } else {
            delete draft.errors[sectionId][field];
          }
        });
      },
      goBack() {
        setState(draft => {
          const activeSectionId = draft.activeSectionId;
          const sectionIndex = draft.sectionMap[activeSectionId].index;
          if (sectionIndex !== 0) {
            draft.activeSectionId = draft.config.sections[sectionIndex - 1].id;
          }
        });
      },
      submitStep() {
        setState(draft => {
          const activeSectionId = draft.activeSectionId;
          draft.sectionSubmitted[activeSectionId] = true;
          if (Object.keys(draft.errors[activeSectionId]).length === 0) {
            const sectionIndex = draft.sectionMap[activeSectionId].index;

            if (sectionIndex === draft.config.sections.length - 1) {
              handleSubmit(current(draft.values));
            } else {
              draft.activeSectionId =
                draft.config.sections[sectionIndex + 1].id;
            }
          }
        });
      },
      activeSectionInvalid:
        Object.keys(state.errors[state.activeSectionId]).length > 0,
      activeSectionSubmitted: !!state.sectionSubmitted[state.activeSectionId],
      activeSection: state.sectionMap[state.activeSectionId],
      step: state.sectionMap[state.activeSectionId].index + 1,
      totalSteps: state.config.sections.length,
      state,
      getFieldError(field: string) {
        const { sectionId } = state.fieldsMap[field];

        return state.errors[sectionId][field] || undefined;
      },
      getFieldValue<T extends FieldType = string>(field: string) {
        const { sectionId } = state.fieldsMap[field];

        return state.values[sectionId][field] as T | null;
      },
      isFieldTouched(field: string) {
        const { sectionId } = state.fieldsMap[field];

        return !!(
          state.sectionSubmitted[sectionId] || state.touched[sectionId][field]
        );
      },
    }),
     // eslint-disable-next-line
    [state, handleSubmit],
  );

  return formApi;
};
