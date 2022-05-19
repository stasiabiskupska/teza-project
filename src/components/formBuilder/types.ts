export type FieldId = Frontier.Element['id'];
export type SectionId = Frontier.Section['id'];
export type FieldValue = string | number | boolean | string[] | null;
export type FieldType = Exclude<FieldValue, null>;
export type FieldConfig = Frontier.Element & { sectionId: string };
export type FormValues = Record<SectionId, Record<FieldId, FieldValue>>;
