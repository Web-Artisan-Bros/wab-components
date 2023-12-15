import { ComponentInterface, JSX } from '../../stencil-public-runtime';
import { WabFormSchema, WabFormSchemaField } from './wab-form-schema';
import * as yup from 'yup';
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
    afterSubmitSlot: Element;
    formEl: HTMLFormElement;
    initialValues: any;
    /**
     * Event handler for the form submission
     *
     * @param {Event} e
     */
    onSubmit(e: Event): Promise<void>;
    /**
     * Event handler for the form reset
     *
     * @param {Event} e
     */
    onReset(e: Event): Promise<void>;
    /**
     * Watcher for the schema prop change.
     * When this changes, we need to parse the schema and add an id to each field and store it
     * in the this.formSchema state
     *
     * @param {string | WabFormSchema} newValue
     */
    onSchemaChange(newValue: string | WabFormSchema): void;
    /**
     * Watcher for the formData prop change.
     * When this changes, we need to rebuild the validator schema
     */
    onFormDataChange(): void;
    /**
     * Return the actual form data
     */
    getFormData(): Promise<any>;
    /**
     * Event handler for the input value change. This will be on keyup for text inputs
     *
     * @param {WabFormSchemaField} field
     * @param {any} value
     */
    onInputValueChange(field: WabFormSchemaField, value: any): Promise<void>;
    /**
     * Reset the validation errors by resetting the form validator
     * and setting to undefined each field's "errors" property
     *
     * @param {WabFormSchemaField} field
     */
    resetValidationErrors(field?: WabFormSchemaField): void;
    /**
     * Store the validation errors in the form schema
     * by setting the "errors" property of each field
     *
     * @param {yup.ValidationError} e
     */
    storeValidationErrors(e: yup.ValidationError): Promise<void>;
    /**
     * Set the "errors" property of a field
     *
     * @param schema
     * @param fieldName
     * @param error
     */
    setFieldErrors(schema: WabFormSchema, fieldName: string, error: string): void;
    /**
     * Build the validator schema based on the form schema
     *
     * While building the schema, we check if the field is disabled or readonly or is visible
     * If so, none of its validators will be added to the schema and evaluated
     *
     */
    buildValidatorSchema(): void;
    /**
     * Check the computed value of a property of a field.
     * If the property is a function, call it with the formData as argument.
     *
     * @param {WabFormSchemaField} field
     * @param {string} conditionKey
     * @param {boolean} defaultValue - The default value to return if the key is not found on the field
     * @returns {boolean}
     */
    checkCondition(field: WabFormSchemaField, conditionKey: string, defaultValue?: boolean): boolean;
    /**
     * Check if the field is visible, disabled or readonly
     *
     * @param {WabFormSchemaField} field
     * @returns {{condition: boolean, disabled: boolean, readonly: boolean}}
     */
    checkField(field: WabFormSchemaField): {
        condition: boolean;
        disabled: boolean;
        readonly: boolean;
    };
    validateSingleField(field: WabFormSchemaField): Promise<void>;
    /**
     * Create a fake form and submit it
     * Use only if "useAjax" is false
     *
     * @param {any} dataToSubmit
     */
    submitFakeForm(dataToSubmit: any): void;
    invokeEventFn(name: string, ...args: any): Promise<void>;
    onAfterSubmitSlotChange(): void;
    /**
     * Get the right component for the field based on its type
     *
     * @param {WabFormSchemaField} field
     * @returns {JSX.Element}
     */
    getRightComponent(field: WabFormSchemaField): JSX.Element;
    /**
     * Lifecycle hook
     * When the component is loaded, parse the schema and assign initial values to formData
     */
    componentWillLoad(): void;
    /**
     * Lifecycle hook
     * Render the component
     */
    render(): any;
}
