/// <reference types="react" />
/// <reference types="node" />
/// <reference types="react" />
import { ComponentInterface, EventEmitter, JSX } from '@stencil/core';
import { WabFormSchema, WabFormSchemaField } from './wab-form-schema';
import * as yup from 'yup';
import { ValidationError } from 'yup';
export declare class FormBuilder implements ComponentInterface {
    action: string;
    method: string;
    useAjax: Boolean;
    schema: string | WabFormSchema;
    loading: boolean;
    formData: any;
    formSchema: WabFormSchema;
    formValidator: yup.Schema;
    submitComplete: boolean;
    showAfterSubmitEl: boolean;
    el: HTMLElement;
    wabBeforeSubmit: EventEmitter<any>;
    wabSubmit: EventEmitter<any>;
    wabAfterSubmit: EventEmitter<any>;
    wabSubmitError: EventEmitter<any>;
    wabBeforeReset: EventEmitter<any>;
    wabAfterReset: EventEmitter<any>;
    wabValidationErrors: EventEmitter<{
        formData: Record<string, any>;
        errors: ValidationError;
    }>;
    afterSubmitSlot: Element;
    formEl: HTMLFormElement;
    initialValues: any;
    onSubmit(e: Event): Promise<void>;
    onReset(e: Event): Promise<void>;
    onSchemaChange(newValue: string | WabFormSchema): void;
    onFormDataChange(): void;
    getFormData(): Promise<any>;
    onInputValueChange(field: WabFormSchemaField, value: any): Promise<void>;
    resetValidationErrors(field?: WabFormSchemaField): void;
    storeValidationErrors(e: yup.ValidationError): Promise<void>;
    setFieldErrors(schema: WabFormSchema, fieldName: string, error: string): void;
    buildValidatorSchema(): void;
    checkCondition(field: WabFormSchemaField, conditionKey: string, defaultValue?: boolean): boolean;
    checkField(field: WabFormSchemaField): {
        condition: boolean;
        disabled: boolean;
        readonly: boolean;
    };
    validateSingleField(field: WabFormSchemaField): Promise<void>;
    submitFakeForm(dataToSubmit: any): void;
    invokeEventFn(name: string, ...args: any): Promise<void>;
    onAfterSubmitSlotChange(): void;
    getRightComponent(field: WabFormSchemaField): JSX.Element;
    componentWillLoad(): void;
    render(): import("react").JSX.Element;
}
