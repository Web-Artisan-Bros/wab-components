import { Host, h } from "@stencil/core";
import * as yup from "yup";
export class FormBuilder {
    constructor() {
        this.action = undefined;
        this.method = undefined;
        this.useAjax = false;
        this.schema = undefined;
        this.loading = false;
        this.formData = undefined;
        this.formSchema = undefined;
        this.formValidator = undefined;
    }
    /**
     * Event handler for the form submission
     *
     * @param {Event} e
     */
    async onSubmit(e) {
        e.preventDefault();
        const slottedInputs = this.el.querySelectorAll('input, select, textarea');
        this.resetValidationErrors();
        try {
            // Retrieve all data from the form
            const dataToSubmit = {};
            Object.keys(this.formData).forEach(key => {
                var _a;
                let value = this.formData[key];
                const field = this.formSchema.fields.find(field => field.name === key);
                if (field.type === 'checkbox') {
                    value = value ? ((_a = field.value) !== null && _a !== void 0 ? _a : true) : '';
                }
                dataToSubmit[key] = value;
            });
            slottedInputs.forEach(input => (dataToSubmit[input.name] = input.value));
            // Validate form
            await this.formValidator.validate(dataToSubmit, {
                abortEarly: false,
            });
            this.loading = true;
            console.log('onbeforesubmit');
            await this.invokeEventFn('onBeforeSubmit', dataToSubmit);
            if (!this.formSchema.useAjax) {
                this.submitFakeForm(dataToSubmit);
            }
            else {
                await this.invokeEventFn('onSubmit', dataToSubmit);
            }
            console.log('after submit');
            await this.invokeEventFn('onAfterSubmit', dataToSubmit);
        }
        catch (e) {
            if (e.name === 'ValidationError') {
                await this.storeValidationErrors(e);
            }
            await this.invokeEventFn('onSubmitError', e);
        }
        this.loading = false;
    }
    /**
     * Event handler for the form reset
     *
     * @param {Event} e
     */
    async onReset(e) {
        e.preventDefault();
        await this.invokeEventFn('onBeforeReset', this.formData);
        this.formData = Object.assign({}, this.initialValues);
        this.resetValidationErrors();
        await this.invokeEventFn('onAfterReset', this.formData);
    }
    /**
     * Watcher for the schema prop change.
     * When this changes, we need to parse the schema and add an id to each field and store it
     * in the this.formSchema state
     *
     * @param {string | WabFormSchema} newValue
     */
    onSchemaChange(newValue) {
        if (!newValue) {
            throw new Error('You must provide a schema to the form');
        }
        let schema;
        // If the schema is a string (JSON), parse it
        if (typeof newValue === 'string') {
            // ensure the schema is a valid JSON
            try {
                schema = JSON.parse(newValue);
            }
            catch (e) {
                throw new Error('The schema is not a valid JSON');
            }
        }
        else {
            schema = newValue;
        }
        schema.fields.map(field => {
            // If the field has no id, create one.
            // This id will be used to link the label to the input
            field.id = (field.id || field.name) + '_' + Math.random().toString(36).substring(2, 9);
        });
        this.formSchema = schema;
    }
    /**
     * Watcher for the formData prop change.
     * When this changes, we need to rebuild the validator schema
     */
    onFormDataChange() {
        this.buildValidatorSchema();
    }
    async getFormData() {
        return this.formData;
    }
    /**
     * Event handler for the input value change. This will be on keyup for text inputs
     *
     * @param {WabFormSchemaField} field
     * @param {any} value
     */
    async onInputValueChange(field, value) {
        this.formData = Object.assign(Object.assign({}, this.formData), { [field.name]: value });
        // If the field is not lazy, validate it immediately
        if (!this.formSchema.lazy) {
            await this.validateSingleField(field);
        }
    }
    /**
     * Reset the validation errors by resetting the form validator
     * and setting to undefined each field's "errors" property
     *
     * @param {WabFormSchemaField} field
     */
    resetValidationErrors(field) {
        const newFormSchema = Object.assign({}, this.formSchema);
        // If a field is provided, reset only its "errors" property
        if (field) {
            this.setFieldErrors(newFormSchema, field.name, undefined);
        }
        else {
            // reset the form validator
            newFormSchema.fields.forEach(field => (field.errors = undefined));
        }
        this.formSchema = newFormSchema;
    }
    /**
     * Store the validation errors in the form schema
     * by setting the "errors" property of each field
     *
     * @param {yup.ValidationError} e
     */
    async storeValidationErrors(e) {
        const newSchema = Object.assign({}, this.formSchema);
        const errors = [];
        // If the error has inner errors, it means there are multiple errors
        if (e.inner.length) {
            // for each error, find the corresponding field and set its "errors" property
            e.inner.forEach((err) => {
                errors.push({
                    field: err.path,
                    error: err.message,
                });
            });
        }
        else {
            errors.push({
                field: e.path,
                error: e.message,
            });
        }
        errors.forEach(err => {
            this.setFieldErrors(newSchema, err.field, err.error);
        });
        this.formSchema = newSchema;
        await this.invokeEventFn('onValidationErrors', this.formData, e);
    }
    /**
     * Set the "errors" property of a field
     *
     * @param schema
     * @param fieldName
     * @param error
     */
    setFieldErrors(schema, fieldName, error) {
        const field = schema.fields.find(field => field.name === fieldName);
        // If the field is found, set its "errors" property
        if (field) {
            field.errors = error;
        }
    }
    /**
     * Build the validator schema based on the form schema
     *
     * While building the schema, we check if the field is disabled or readonly or is visible
     * If so, none of its validators will be added to the schema and evaluated
     *
     */
    buildValidatorSchema() {
        const rawSchema = {};
        this.formSchema.fields.forEach(field => {
            const { condition, disabled, readonly } = this.checkField(field);
            // If the field is disabled or readonly or not visible, skip it
            if (disabled || readonly || !condition || !field.validators) {
                return;
            }
            // Add the field to the validator schema
            rawSchema[field.name] = field.validators(yup, this.formValidator);
        });
        // console.log('validators', rawSchema);
        // Create the validator schema
        this.formValidator = yup.object(rawSchema);
    }
    /**
     * Check the computed value of a property of a field.
     * If the property is a function, call it with the formData as argument.
     *
     * @param {WabFormSchemaField} field
     * @param {string} conditionKey
     * @param {boolean} defaultValue - The default value to return if the key is not found on the field
     * @returns {boolean}
     */
    checkCondition(field, conditionKey, defaultValue = false) {
        let toReturn = defaultValue;
        // If the key exists on the field, check if the value is a function and eventually invoke it
        // with the formData as argument, otherwise return the value
        if (field.hasOwnProperty(conditionKey)) {
            if (typeof field[conditionKey] === 'function') {
                toReturn = field[conditionKey](this.formData);
            }
            else {
                toReturn = field[conditionKey];
            }
        }
        return toReturn;
    }
    /**
     * Check if the field is visible, disabled or readonly
     *
     * @param {WabFormSchemaField} field
     * @returns {{condition: boolean, disabled: boolean, readonly: boolean}}
     */
    checkField(field) {
        return {
            condition: this.checkCondition(field, 'conditions', true),
            disabled: this.checkCondition(field, 'disabled'),
            readonly: this.checkCondition(field, 'readonly'),
        };
    }
    async validateSingleField(field) {
        this.resetValidationErrors(field);
        try {
            await this.formValidator.validateAt(field.name, this.formData);
        }
        catch (e) {
            if (e.name === 'ValidationError') {
                await this.storeValidationErrors(e);
            }
        }
    }
    /**
     * Create a fake form and submit it
     * Use only if "useAjax" is false
     *
     * @param {any} dataToSubmit
     */
    submitFakeForm(dataToSubmit) {
        const form = document.createElement('form');
        form.action = this.action;
        form.method = this.method;
        // Add all the data to submit as hidden inputs to the form
        Object.keys(dataToSubmit).forEach(key => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = dataToSubmit[key];
            form.appendChild(input);
        });
        // Append the form to the body and submit it
        document.body.appendChild(form);
        form.submit();
    }
    async invokeEventFn(name, ...args) {
        if (this.formSchema.hasOwnProperty(name)) {
            return this.formSchema[name](...args);
        }
        return Promise.resolve();
    }
    /**
     * Get the right component for the field based on its type
     *
     * @param {WabFormSchemaField} field
     * @returns {JSX.Element}
     */
    getRightComponent(field) {
        const { condition, disabled, readonly } = this.checkField(field);
        // If the field is not visible, return null and reset its value
        if (!condition) {
            // Reset the value of the field. This will also trigger the onValueChanged event
            this.formData[field.name] = '';
            return null;
        }
        const props = {
            key: field.id,
            disabled: disabled,
            readonly: readonly,
            part: field.type,
            exportparts: "label, input, details, errors",
            onValueInput: (e) => this.onInputValueChange(field, e.detail),
        };
        // If the form is lazy, add the onValueChange event handler to trigger the validation of the field
        if (this.formSchema.lazy) {
            props['onValueChange'] = () => this.validateSingleField(field);
        }
        switch (field.type) {
            case 'text':
            case 'email':
            case 'password':
                return (h("wab-text-input", Object.assign({}, field, props, { value: this.formData[field.name], onKeyUp: e => e.key === 'Enter' && this.formEl.requestSubmit() })));
            case 'checkbox':
                return (h("wab-checkbox-input", Object.assign({}, field, props, { checked: this.formData[field.name] })));
            default:
                return h("div", null, "Unknown field type");
        }
    }
    /**
     * Lifecycle hook
     * When the component is loaded, parse the schema and assign initial values to formData
     */
    componentWillLoad() {
        var _a;
        this.onSchemaChange(this.schema);
        // console.log(this.schema);
        // Assign initial values to formData
        this.initialValues = (_a = this.formSchema) === null || _a === void 0 ? void 0 : _a.fields.reduce((acc, field) => {
            var _a, _b;
            let value = (_a = field.value) !== null && _a !== void 0 ? _a : '';
            if (field.type === 'checkbox') {
                value = (_b = field.checked) !== null && _b !== void 0 ? _b : false;
            }
            return Object.assign(Object.assign({}, acc), { [field.name]: value });
        }, {});
        this.formData = Object.assign({}, this.initialValues);
    }
    /**
     * Lifecycle hook
     * Render the component
     */
    render() {
        var _a;
        return (h(Host, { class: { 'loading': this.loading } }, h("form", { action: this.action, method: this.method, ref: el => (this.formEl = el), onSubmit: e => this.onSubmit(e), onReset: e => this.onReset(e) }, h("slot", null), (_a = this.formSchema) === null || _a === void 0 ? void 0 :
            _a.fields.map(field => this.getRightComponent(field)), h("slot", { name: 'actions' }, h("button", { type: 'reset', part: 'resetBtn', disabled: this.loading }, "Reset"), h("button", { type: 'submit', part: 'submitBtn', disabled: this.loading }, "Submit")))));
    }
    static get is() { return "wab-form-builder"; }
    static get originalStyleUrls() {
        return {
            "$": ["form-builder.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["form-builder.css"]
        };
    }
    static get properties() {
        return {
            "action": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "attribute": "action",
                "reflect": false
            },
            "method": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "attribute": "method",
                "reflect": false
            },
            "useAjax": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "Boolean",
                    "resolved": "Boolean",
                    "references": {
                        "Boolean": {
                            "location": "global",
                            "id": "global::Boolean"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "defaultValue": "false"
            },
            "schema": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string | WabFormSchema",
                    "resolved": "WabFormSchema | string",
                    "references": {
                        "WabFormSchema": {
                            "location": "import",
                            "path": "./wab-form-schema",
                            "id": "src/components/form-builder/wab-form-schema.ts::WabFormSchema"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "attribute": "schema",
                "reflect": false
            },
            "loading": {
                "type": "boolean",
                "mutable": true,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "attribute": "loading",
                "reflect": false,
                "defaultValue": "false"
            }
        };
    }
    static get states() {
        return {
            "formData": {},
            "formSchema": {},
            "formValidator": {}
        };
    }
    static get methods() {
        return {
            "getFormData": {
                "complexType": {
                    "signature": "() => Promise<any>",
                    "parameters": [],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<any>"
                },
                "docs": {
                    "text": "",
                    "tags": []
                }
            }
        };
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "schema",
                "methodName": "onSchemaChange"
            }, {
                "propName": "formData",
                "methodName": "onFormDataChange"
            }];
    }
}
//# sourceMappingURL=form-builder.js.map
