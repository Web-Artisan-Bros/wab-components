import * as yupContent from 'yup';
import { ValidationError } from 'yup';

export interface WabFormSchemaField {
  id?: string;
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'textarea' | 'select' | 'checkbox';
  placeholder?: string;
  
  /**
   * Only for select
   */
  options?: { label: string, value: string }[];
  value?: any;
  checked?: any;
  disabled?: boolean | ((formData: any) => boolean);
  readonly?: boolean | ((formData: any) => boolean);
  multiple?: boolean; // Only for select
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
  onBeforeSubmit?: (formData: any) => Promise<void>;
  onSubmit?: (formData: any) => Promise<void>;
  onAfterSubmit?: (formData: any) => Promise<void>;
  onSubmitError?: (formData: any) => Promise<void>;
  
  onBeforeReset?: (formData: any) => Promise<void>;
  onAfterReset?: (formData: any) => Promise<void>;
  
  onValidationErrors?: (formData: any, e: ValidationError) => void;
}
