import { Component, Element, Host, Prop, State, Watch, h, ComponentInterface, JSX } from '@stencil/core';
import { WabFormSchema, WabFormSchemaField } from './wab-form-schema';
import * as yup from 'yup';

@Component({
  tag: 'wab-form-builder',
  styleUrl: 'form-builder.css',
  shadow: true,
})
export class FormBuilder implements ComponentInterface {
  @Prop() action: string;
  @Prop() method: string;
  @Prop() useAjax: Boolean = false;
  @Prop() schema: string | WabFormSchema;
  
  @State() formData;
  @State() formSchema: WabFormSchema;
  @State() formValidator: yup.Schema<any>;
  
  @Element() el: HTMLElement;
  
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
      
      if (!this.useAjax) {
        this.submitFakeForm(dataToSubmit);
      }
    } catch (e) {
      if (e.name === 'ValidationError') {
        this.storeValidationErrors(e);
      }
    }
  }
  
  /**
   * Event handler for the form reset
   *
   * @param {Event} e
   */
  onReset (e: Event) {
    e.preventDefault();
    
    this.formData = { ...this.initialValues };
    console.log(this.formData);
    
    this.resetValidationErrors();
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
   * Event handler for the input value change
   *
   * @param {WabFormSchemaField} field
   * @param {any} value
   */
  onInputValueChange (field: WabFormSchemaField, value: any) {
    // TODO:: Handle lazy validation
    
    this.formData = {
      ...this.formData,
      [field.name]: value,
    };
  }
  
  /**
   * Reset the validation errors by resetting the form validator
   * and setting to undefined each field's "errors" property
   */
  resetValidationErrors () {
    const newFormSchema = { ...this.formSchema };
    
    // reset the form validator
    newFormSchema.fields.forEach(field => (field.errors = undefined));
    
    this.formSchema = newFormSchema;
  }
  
  /**
   * Store the validation errors in the form schema
   * by setting the "errors" property of each field
   *
   * @param {yup.ValidationError} e
   */
  storeValidationErrors (e: yup.ValidationError) {
    const newSchema = { ...this.formSchema };
    
    // for each error, find the corresponding field and set its "errors" property
    e.inner.forEach((err: yup.ValidationError) => {
      const field = newSchema.fields.find(field => field.name === err.path);
      
      // If the field is found, set its "errors" property
      if (field) {
        field.errors = err.message;
      }
    });
    
    this.formSchema = newSchema;
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
      onValueChange: (e: {
        detail: any;
      }) => this.onInputValueChange(field, e.detail),
    };
    
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
      <Host>
        <form action={this.action} method={this.method} ref={el => (this.formEl = el)} onSubmit={e => this.onSubmit(e)}
              onReset={e => this.onReset(e)}>
          {/* Custom inputs. Usually hidden ones */}
          <slot></slot>
          
          {this.formSchema?.fields.map(field => this.getRightComponent(field))}
          
          <slot name='actions'>
            <button type='reset' part='resetBtn'>
              Reset
            </button>
            <button type='submit' part='submitBtn'>
              Submit
            </button>
          </slot>
        </form>
      </Host>
    );
  }
}
