import * as yupContent from 'yup';

export interface WabFormSchemaField {
  id?: string;
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  options?: string[];
  value?: any;
  disabled?: boolean;
  validators?: (yup, yupSchema: yupContent.Schema) => yupContent.StringSchema;
  conditions?: (formData: any) => boolean;
  errors?: string;
  details?: string;

}

export interface WabFormSchema {
  fields: WabFormSchemaField[];
}
