import * as yupContent from 'yup';

export interface WabFormSchemaField {
  name: string;
  label: string;
  type: string;
  options?: string[];
  required?: boolean;
  value?: any;
  disabled?: boolean;
  visible?: boolean;
  validators?: (yup, yupSchema: yupContent.Schema) => yupContent.StringSchema;
  errors?: string;
  details?: string;

}

export interface WabFormSchema {
  fields: WabFormSchemaField[];
}
