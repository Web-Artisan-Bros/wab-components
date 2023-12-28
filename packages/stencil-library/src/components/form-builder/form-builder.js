"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormBuilder = void 0;
const core_1 = require("@stencil/core");
const yup = require("yup");
let FormBuilder = class FormBuilder {
    constructor() {
        this.useAjax = false;
        this.loading = false;
        this.submitComplete = false;
        this.showAfterSubmitEl = false;
    }
    onSubmit(e) {
        return __awaiter(this, void 0, void 0, function* () {
            e.preventDefault();
            e.stopPropagation();
            const slottedInputs = this.el.querySelectorAll('input, select, textarea');
            this.resetValidationErrors();
            this.submitComplete = false;
            try {
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
                yield this.formValidator.validate(dataToSubmit, {
                    abortEarly: false,
                });
                this.loading = true;
                yield this.invokeEventFn('onBeforeSubmit', dataToSubmit);
                if (!this.formSchema.useAjax) {
                    this.submitFakeForm(dataToSubmit);
                }
                else {
                    yield this.invokeEventFn('onSubmit', dataToSubmit);
                }
                yield this.invokeEventFn('onAfterSubmit', dataToSubmit);
                this.submitComplete = true;
            }
            catch (e) {
                if (e.name === 'ValidationError') {
                    yield this.storeValidationErrors(e);
                }
                yield this.invokeEventFn('onSubmitError', e);
            }
            this.loading = false;
        });
    }
    onReset(e) {
        return __awaiter(this, void 0, void 0, function* () {
            e.preventDefault();
            e.stopPropagation();
            yield this.invokeEventFn('onBeforeReset', this.formData);
            this.formData = Object.assign({}, this.initialValues);
            this.resetValidationErrors();
            yield this.invokeEventFn('onAfterReset', this.formData);
        });
    }
    onSchemaChange(newValue) {
        if (!newValue) {
            throw new Error('You must provide a schema to the form');
        }
        let schema;
        if (typeof newValue === 'string') {
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
            field.id = (field.id || field.name) + '_' + Math.random().toString(36).substring(2, 9);
        });
        this.formSchema = schema;
    }
    onFormDataChange() {
        this.buildValidatorSchema();
    }
    getFormData() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.formData;
        });
    }
    onInputValueChange(field, value) {
        return __awaiter(this, void 0, void 0, function* () {
            this.formData = Object.assign(Object.assign({}, this.formData), { [field.name]: value });
            if (!this.formSchema.lazy) {
                yield this.validateSingleField(field);
            }
        });
    }
    resetValidationErrors(field) {
        const newFormSchema = Object.assign({}, this.formSchema);
        if (field) {
            this.setFieldErrors(newFormSchema, field.name, undefined);
        }
        else {
            newFormSchema.fields.forEach(field => (field.errors = undefined));
        }
        this.formSchema = newFormSchema;
    }
    storeValidationErrors(e) {
        return __awaiter(this, void 0, void 0, function* () {
            const newSchema = Object.assign({}, this.formSchema);
            const errors = [];
            if (e.inner.length) {
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
            yield this.invokeEventFn('onValidationErrors', { formData: this.formData, errors: e });
        });
    }
    setFieldErrors(schema, fieldName, error) {
        const field = schema.fields.find(field => field.name === fieldName);
        if (field) {
            field.errors = error;
        }
    }
    buildValidatorSchema() {
        const rawSchema = {};
        this.formSchema.fields.forEach(field => {
            const { condition, disabled, readonly } = this.checkField(field);
            if (disabled || readonly || !condition || !field.validators) {
                return;
            }
            rawSchema[field.name] = field.validators(yup, this.formValidator);
        });
        this.formValidator = yup.object(rawSchema);
    }
    checkCondition(field, conditionKey, defaultValue = false) {
        let toReturn = defaultValue;
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
    checkField(field) {
        return {
            condition: this.checkCondition(field, 'conditions', true),
            disabled: this.checkCondition(field, 'disabled'),
            readonly: this.checkCondition(field, 'readonly'),
        };
    }
    validateSingleField(field) {
        return __awaiter(this, void 0, void 0, function* () {
            this.resetValidationErrors(field);
            try {
                yield this.formValidator.validateAt(field.name, this.formData);
            }
            catch (e) {
                if (e.name === 'ValidationError') {
                    yield this.storeValidationErrors(e);
                }
            }
        });
    }
    submitFakeForm(dataToSubmit) {
        const form = document.createElement('form');
        form.action = this.action;
        form.method = this.method;
        Object.keys(dataToSubmit).forEach(key => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = dataToSubmit[key];
            form.appendChild(input);
        });
        document.body.appendChild(form);
        form.submit();
    }
    invokeEventFn(name, ...args) {
        return __awaiter(this, void 0, void 0, function* () {
            let eventToEmit = name.replace('on', 'wab');
            const toEmit = (args && args.length > 1 ? [args] : args);
            this[eventToEmit].emit(...toEmit);
            if (this.formSchema.hasOwnProperty(name)) {
                return this.formSchema[name](...args);
            }
            return Promise.resolve();
        });
    }
    onAfterSubmitSlotChange() {
        this.showAfterSubmitEl = !!this.afterSubmitSlot.children.length;
    }
    getRightComponent(field) {
        const { condition, disabled, readonly } = this.checkField(field);
        console.log('getRightComponent', field.name, this.formData[field.name]);
        if (!condition) {
            this.formData[field.name] = '';
            return null;
        }
        const props = {
            key: field.id,
            disabled: disabled,
            readonly: readonly,
            part: field.type,
            onValueInput: (e) => this.onInputValueChange(field, e.detail),
        };
        if (this.formSchema.lazy) {
            props['onValueChange'] = () => this.validateSingleField(field);
        }
        switch (field.type) {
            case 'text':
            case 'email':
            case 'password':
                return (<wab-text-input {...field} {...props} value={this.formData[field.name]} onKeyUp={e => e.key === 'Enter' && this.formEl.requestSubmit()}/>);
            case 'checkbox':
                return (<wab-checkbox-input {...field} {...props} checked={this.formData[field.name]}></wab-checkbox-input>);
            case 'select':
                return (<wab-select-input {...field} {...props} value={this.formData[field.name]}/>);
            default:
                return <div>Unknown field type</div>;
        }
    }
    componentWillLoad() {
        var _a;
        this.onSchemaChange(this.schema);
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
    render() {
        var _a;
        return (<core_1.Host class={{ 'loading': this.loading }}>
        
        <form action={this.action} method={this.method} ref={el => (this.formEl = el)} style={{ display: this.showAfterSubmitEl ? 'none' : '' }} onSubmit={e => this.onSubmit(e)} onReset={e => this.onReset(e)}>
          
          
          <slot></slot>
          
          {(_a = this.formSchema) === null || _a === void 0 ? void 0 : _a.fields.map(field => this.getRightComponent(field))}
          
          <slot name='actions'>
            <button type='reset' part='resetBtn' disabled={this.loading}>
              Reset
            </button>
            <button type='submit' part='submitBtn' disabled={this.loading}>
              Submit
            </button>
          </slot>
        </form>
        
        <div ref={(e) => this.afterSubmitSlot = e} style={{ display: this.showAfterSubmitEl ? 'block' : 'none' }}>
          <slot name="afterSubmit"></slot>
        </div>
      </core_1.Host>);
    }
};
exports.FormBuilder = FormBuilder;
__decorate([
    (0, core_1.Prop)(),
    __metadata("design:type", String)
], FormBuilder.prototype, "action", void 0);
__decorate([
    (0, core_1.Prop)(),
    __metadata("design:type", String)
], FormBuilder.prototype, "method", void 0);
__decorate([
    (0, core_1.Prop)(),
    __metadata("design:type", Boolean)
], FormBuilder.prototype, "useAjax", void 0);
__decorate([
    (0, core_1.Prop)(),
    __metadata("design:type", Object)
], FormBuilder.prototype, "schema", void 0);
__decorate([
    (0, core_1.Prop)({ mutable: true }),
    __metadata("design:type", Boolean)
], FormBuilder.prototype, "loading", void 0);
__decorate([
    (0, core_1.State)(),
    __metadata("design:type", Object)
], FormBuilder.prototype, "formData", void 0);
__decorate([
    (0, core_1.State)(),
    __metadata("design:type", Object)
], FormBuilder.prototype, "formSchema", void 0);
__decorate([
    (0, core_1.State)(),
    __metadata("design:type", yup.Schema)
], FormBuilder.prototype, "formValidator", void 0);
__decorate([
    (0, core_1.State)(),
    __metadata("design:type", Boolean)
], FormBuilder.prototype, "submitComplete", void 0);
__decorate([
    (0, core_1.State)(),
    __metadata("design:type", Boolean)
], FormBuilder.prototype, "showAfterSubmitEl", void 0);
__decorate([
    (0, core_1.Element)(),
    __metadata("design:type", Object)
], FormBuilder.prototype, "el", void 0);
__decorate([
    (0, core_1.Event)(),
    __metadata("design:type", Object)
], FormBuilder.prototype, "wabBeforeSubmit", void 0);
__decorate([
    (0, core_1.Event)(),
    __metadata("design:type", Object)
], FormBuilder.prototype, "wabSubmit", void 0);
__decorate([
    (0, core_1.Event)(),
    __metadata("design:type", Object)
], FormBuilder.prototype, "wabAfterSubmit", void 0);
__decorate([
    (0, core_1.Event)(),
    __metadata("design:type", Object)
], FormBuilder.prototype, "wabSubmitError", void 0);
__decorate([
    (0, core_1.Event)(),
    __metadata("design:type", Object)
], FormBuilder.prototype, "wabBeforeReset", void 0);
__decorate([
    (0, core_1.Event)(),
    __metadata("design:type", Object)
], FormBuilder.prototype, "wabAfterReset", void 0);
__decorate([
    (0, core_1.Event)(),
    __metadata("design:type", Object)
], FormBuilder.prototype, "wabValidationErrors", void 0);
__decorate([
    (0, core_1.Watch)('schema'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FormBuilder.prototype, "onSchemaChange", null);
__decorate([
    (0, core_1.Watch)('formData'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FormBuilder.prototype, "onFormDataChange", null);
__decorate([
    (0, core_1.Method)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FormBuilder.prototype, "getFormData", null);
__decorate([
    (0, core_1.Watch)('submitComplete'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FormBuilder.prototype, "onAfterSubmitSlotChange", null);
exports.FormBuilder = FormBuilder = __decorate([
    (0, core_1.Component)({
        tag: 'wab-form-builder',
        styleUrl: 'form-builder.css',
        shadow: false,
    })
], FormBuilder);
//# sourceMappingURL=form-builder.js.map