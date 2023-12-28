import * as yupContent from 'yup';
import { ValidationError } from 'yup';
export interface WabFormSchemaField {
    id?: string;
    name: string;
    label: string;
    type: 'text' | 'email' | 'password' | 'textarea' | 'select' | 'checkbox';
    placeholder?: string;
    options?: {
        label: string;
        value: string;
    }[];
    value?: any;
    checked?: any;
    disabled?: boolean | ((formData: any) => boolean);
    readonly?: boolean | ((formData: any) => boolean);
    multiple?: boolean;
    validators?: (yup: any, yupSchema: yupContent.Schema) => yupContent.StringSchema;
    conditions?: (formData: any) => boolean;
    errors?: string;
    details?: string;
}
export interface WabFormSchema {
    lazy?: boolean;
    useAjax?: boolean;
    fields: WabFormSchemaField[];
    onBeforeSubmit?: (formData: any) => Promise<void>;
    onSubmit?: (formData: any) => Promise<void>;
    onAfterSubmit?: (formData: any) => Promise<void>;
    onSubmitError?: (formData: any) => Promise<void>;
    onBeforeReset?: (formData: any) => Promise<void>;
    onAfterReset?: (formData: any) => Promise<void>;
    onValidationErrors?: (formData: any, e: ValidationError) => void;
}
