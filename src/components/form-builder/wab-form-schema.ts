import * as yupContent from 'yup';

export interface WabFormSchemaField {
  id?: string;
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  /**
   * Only for select
   */
  options?: string[];
  value?: any;
  checked?: any;
  disabled?: boolean | ((formData: any) => boolean);
  readonly?: boolean | ((formData: any) => boolean);
  validators?: (yup, yupSchema: yupContent.Schema) => yupContent.StringSchema;
  conditions?: (formData: any) => boolean;
  errors?: string;
  details?: string;

}

export interface WabFormSchema {
  fields: WabFormSchemaField[];
}
