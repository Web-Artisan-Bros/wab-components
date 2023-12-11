import * as yupContent from 'yup';
import { ValidationError } from 'yup';

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
  /**
   * Allow to show or hide the field
   *
   * @param formData
   */
  conditions?: (formData: any) => boolean;
  errors?: string;
  details?: string;
}

export interface WabFormSchema {
  // Options
  
  /**
   * If true, the form will be validated on change event instead on input event
   */
  lazy?: boolean;
  
  /**
   * If true, the form will be submitted using ajax instead of the default form submit
   */
  useAjax?: boolean;
  
  // fields schema
  fields: WabFormSchemaField[];
  
  // Events
  onBeforeSubmit?: (formData: any) => void;
  onSubmit?: (formData: any) => void;
  onAfterSubmit?: (formData: any) => void;
  onSubmitError?: (formData: any) => void;
  
  onBeforeReset?: (formData: any) => void;
  onAfterReset?: (formData: any) => void;
  
  onValidationErrors?: (formData: any, e: ValidationError) => void;
}
