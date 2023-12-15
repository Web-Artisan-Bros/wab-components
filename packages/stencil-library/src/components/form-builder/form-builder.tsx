import {
  Component,
  Element,
  Host,
  Prop,
  State,
  Watch,
  h,
  ComponentInterface,
  JSX,
  Method,
} from '@stencil/core'
import { WabFormSchema, WabFormSchemaField } from './wab-form-schema';
import * as yup from 'yup';

@Component({
  tag: 'wab-form-builder',
  styleUrl: 'form-builder.css',
  shadow: false,
})
export class FormBuilder implements ComponentInterface {
  @Prop() action: string;
  @Prop() method: string;
  @Prop() useAjax: Boolean = false;
  @Prop() schema: string | WabFormSchema;
  @Prop({ mutable: true }) loading: boolean = false;
  
  @State() formData: any;
  @State() formSchema: WabFormSchema;
  @State() formValidator: yup.Schema;
  @State() submitComplete: boolean = false
  @State() showAfterSubmitEl: boolean = false
  
  @Element() el: HTMLElement;
  
  afterSubmitSlot: Element
  formEl: HTMLFormElement;
  initialValues: any;
  
  /**
   * Event handler for the form submission
   *
   * @param {Event} e
   */
  async onSubmit (e: Event) {
    e.preventDefault();
    
    const slottedInputs = this.el.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>('input, select, textarea');
    
    this.resetValidationErrors();
    this.submitComplete = false
    
    try {
      // Retrieve all data from the form
      const dataToSubmit = {};
      
      Object.keys(this.formData).forEach(key => {
        let value = this.formData[key];
        
        const field = this.formSchema.fields.find(field => field.name === key);
        
        if (field.type === 'checkbox') {
          value = value ? (field.value ?? true) : '';
        }
        
        dataToSubmit[key] = value;
      });
      
      slottedInputs.forEach(input => (dataToSubmit[input.name] = input.value));
      
      // Validate form
      await this.formValidator.validate(dataToSubmit, {
        abortEarly: false,
      });
      
      this.loading = true;
      
      // console.log('onbeforesubmit');
      await this.invokeEventFn('onBeforeSubmit', dataToSubmit);
      
      if (!this.formSchema.useAjax) {
        this.submitFakeForm(dataToSubmit);
      } else {
        await this.invokeEventFn('onSubmit', dataToSubmit);
      }
      
      // console.log('after submit');
      await this.invokeEventFn('onAfterSubmit', dataToSubmit);
      
      this.submitComplete = true
    } catch (e) {
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
  async onReset (e: Event) {
    e.preventDefault();
    
    await this.invokeEventFn('onBeforeReset', this.formData);
    
    this.formData = { ...this.initialValues };
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
  @Watch('schema')
  onSchemaChange (newValue: string | WabFormSchema) {
    if (!newValue) {
      throw new Error('You must provide a schema to the form');
    }
    
    let schema: WabFormSchema;
    
    // If the schema is a string (JSON), parse it
    if (typeof newValue === 'string') {
      // ensure the schema is a valid JSON
      try {
        schema = JSON.parse(newValue);
      } catch (e) {
        throw new Error('The schema is not a valid JSON');
      }
    } else {
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
  @Watch('formData')
  onFormDataChange () {
    this.buildValidatorSchema();
  }
  
  /**
   * Return the actual form data
   */
  @Method()
  async getFormData () {
    return this.formData;
  }
  
  /**
   * Event handler for the input value change. This will be on keyup for text inputs
   *
   * @param {WabFormSchemaField} field
   * @param {any} value
   */
  async onInputValueChange (field: WabFormSchemaField, value: any) {
    this.formData = {
      ...this.formData,
      [field.name]: value,
    };
    
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
  resetValidationErrors (field?: WabFormSchemaField) {
    const newFormSchema = { ...this.formSchema };
    
    // If a field is provided, reset only its "errors" property
    if (field) {
      this.setFieldErrors(newFormSchema, field.name, undefined);
    } else {
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
  async storeValidationErrors (e: yup.ValidationError) {
    const newSchema = { ...this.formSchema };
    const errors: { field: string, error: string }[] = [];
    
    // If the error has inner errors, it means there are multiple errors
    if (e.inner.length) {
      // for each error, find the corresponding field and set its "errors" property
      e.inner.forEach((err: yup.ValidationError) => {
        errors.push({
          field: err.path,
          error: err.message,
        });
      });
    } else {
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
  setFieldErrors (schema: WabFormSchema, fieldName: string, error: string) {
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
  buildValidatorSchema () {
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
  checkCondition (field: WabFormSchemaField, conditionKey: string, defaultValue: boolean = false): boolean {
    let toReturn = defaultValue;
    
    // If the key exists on the field, check if the value is a function and eventually invoke it
    // with the formData as argument, otherwise return the value
    if (field.hasOwnProperty(conditionKey)) {
      if (typeof field[conditionKey] === 'function') {
        toReturn = field[conditionKey](this.formData);
      } else {
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
  checkField (field: WabFormSchemaField): {
    condition: boolean;
    disabled: boolean;
    readonly: boolean;
  } {
    return {
      condition: this.checkCondition(field, 'conditions', true),
      disabled: this.checkCondition(field, 'disabled'),
      readonly: this.checkCondition(field, 'readonly'),
    };
  }
  
  async validateSingleField (field: WabFormSchemaField) {
    this.resetValidationErrors(field);
    
    try {
      await this.formValidator.validateAt(field.name, this.formData);
    } catch (e) {
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
  submitFakeForm (dataToSubmit: any) {
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
  
  async invokeEventFn (name: string, ...args: any): Promise<void> {
    if (this.formSchema.hasOwnProperty(name)) {
      return this.formSchema[name](...args);
    }
    
    return Promise.resolve();
  }
  
  @Watch('submitComplete')
  onAfterSubmitSlotChange () {
    this.showAfterSubmitEl = !!this.afterSubmitSlot.children.length
  }
  
  /**
   * Get the right component for the field based on its type
   *
   * @param {WabFormSchemaField} field
   * @returns {JSX.Element}
   */
  getRightComponent (field: WabFormSchemaField): JSX.Element {
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
      exportparts:"label, input, details, errors",
      onValueInput: (e: CustomEvent) => this.onInputValueChange(field, e.detail),
    };
    
    // If the form is lazy, add the onValueChange event handler to trigger the validation of the field
    if (this.formSchema.lazy) {
      props['onValueChange'] = () => this.validateSingleField(field);
    }
    
    switch (field.type) {
      case 'text':
      case 'email':
      case 'password':
        return (
          <wab-text-input {...field}
                          {...props}
                          value={this.formData[field.name]}
                          onKeyUp={e => e.key === 'Enter' && this.formEl.requestSubmit()}
          />
        );
      case 'checkbox':
        return (<wab-checkbox-input {...field}
                                    {...props}
                                    checked={this.formData[field.name]}
        ></wab-checkbox-input>);
      default:
        return <div>Unknown field type</div>;
    }
  }
  
  /**
   * Lifecycle hook
   * When the component is loaded, parse the schema and assign initial values to formData
   */
  componentWillLoad () {
    this.onSchemaChange(this.schema);
    
    // console.log(this.schema);
    
    // Assign initial values to formData
    this.initialValues = this.formSchema?.fields.reduce((acc, field) => {
      let value = field.value ?? '';
      
      if (field.type === 'checkbox') {
        value = field.checked ?? false;
      }
      
      return { ...acc, [field.name]: value };
    }, {});
    this.formData = { ...this.initialValues };
  }
  
  /**
   * Lifecycle hook
   * Render the component
   */
  render () {
    return (
      <Host class={{ 'loading': this.loading }}>
        
        <form action={this.action}
              method={this.method}
              ref={el => (this.formEl = el)}
              style={{ display: this.showAfterSubmitEl ? 'none': ''}}
              onSubmit={e => this.onSubmit(e)}
              onReset={e => this.onReset(e)}>
          
          {/* Custom inputs. Usually hidden ones */}
          <slot></slot>
          
          {this.formSchema?.fields.map(field => this.getRightComponent(field))}
          
          <slot name='actions'>
            <button type='reset' part='resetBtn' disabled={this.loading}>
              Reset
            </button>
            <button type='submit' part='submitBtn' disabled={this.loading}>
              Submit
            </button>
          </slot>
        </form>
        
        <div ref={(e) => this.afterSubmitSlot = e} style={{ display: this.showAfterSubmitEl ? 'block': 'none'}}>
          <slot name="afterSubmit"
          ></slot>
        </div>
      </Host>
    );
  }
}
