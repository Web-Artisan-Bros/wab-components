import { Component, Element, Host, Prop, State, Watch, h, ComponentInterface } from '@stencil/core';
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
  rawValidationSchema = [];
  
  initialValues: any;
  
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
  
  onReset (e: Event) {
    e.preventDefault();
    
    this.formData = { ...this.initialValues };
    console.log(this.formData);
    
    this.resetValidationErrors();
  }
  
  @Watch('schema')
  onSchemaChange (newValue: string | WabFormSchema) {
    if (!newValue) {
      throw new Error('You must provide a schema to the form');
    }
    
    let schema: WabFormSchema;
    
    if (typeof newValue === 'string') {
      schema = JSON.parse(newValue);
    } else {
      schema = newValue;
    }
    
    schema.fields.map(field => {
      field.id = (field.id || field.name) + '_' + Math.random().toString(36).substring(2, 9);
    });
    
    this.formSchema = schema;
  }
  
  @Watch('formData')
  onFormDataChange () {
    this.setFormValidator();
  }
  
  resetValidationErrors () {
    const newFormSchema = { ...this.formSchema };
    
    // reset the form validator
    newFormSchema.fields.forEach(field => (field.errors = undefined));
    
    this.formSchema = newFormSchema;
  }
  
  storeValidationErrors (e: yup.ValidationError) {
    const newSchema = { ...this.formSchema };
    
    e.inner.forEach((err: yup.ValidationError) => {
      const field = newSchema.fields.find(field => field.name === err.path);
      
      if (field) {
        field.errors = err.message;
      }
    });
    
    this.formSchema = newSchema;
  }
  
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
 
  setFormValidator () {
    const rawSchema = {};
    
    this.formSchema.fields.forEach(field => {
      const { condition, disabled, readonly } = this.checkField(field);
      
      if (disabled || readonly || !condition || !field.validators) {
        return;
      }
      
      const validation = field.validators(yup, this.formValidator);
      
      rawSchema[field.name] = validation
    });
    
    console.log('validators', rawSchema);
    
    // Create the validator schema
    this.formValidator = yup.object(rawSchema);
  }
  
  checkCondition (field: WabFormSchemaField, conditionKey: string) {
    let toReturn = false;
    
    // If the field is disabled, check if the condition is a function
    // If it is, call it with the formData
    if (field.hasOwnProperty(conditionKey)) {
      if (typeof field[conditionKey] === 'function') {
        toReturn = field[conditionKey](this.formData);
      } else {
        toReturn = field[conditionKey];
      }
    }
    
    return toReturn;
  }
  
  checkField (field: WabFormSchemaField) {
    const condition = field.hasOwnProperty('conditions') ? field.conditions(this.formData) : true;
    const disabled = this.checkCondition(field, 'disabled');
    const readonly = this.checkCondition(field, 'readonly');
    
    return {
      condition,
      disabled,
      readonly,
    };
  }
  
  updateFormData (field: WabFormSchemaField, value: any) {
    this.formData = {
      ...this.formData,
      [field.name]: value,
    };
    
    console.log(this.formData);
  }
  
  /**
   * Get the right component for the field based on its type
   * @param field
   */
  getRightComponent (field: WabFormSchemaField) {
    const { condition, disabled, readonly } = this.checkField(field);
    
    // If the field is not visible, return null and reset its value
    if (!condition) {
      // Reset the value of the field
      this.formData[field.name] = '';
      
      return null;
    }
    
    switch (field.type) {
      case 'text':
      case 'email':
      case 'password':
        return (
          <wab-text-input key={field.id}
                          {...field}
                          disabled={disabled}
                          readonly={readonly}
                          value={this.formData[field.name]}
                          onKeyUp={e => e.key === 'Enter' && this.formEl.requestSubmit()}
                          onValueChanged={e => this.updateFormData(field, e.detail)}
          />
        );
      case 'checkbox':
        return (<wab-checkbox-input key={field.id}
                                    {...field}
                                    disabled={disabled}
                                    readonly={readonly}
                                    checked={this.formData[field.name]}
                                    onValueChanged={e => this.updateFormData(field, e.detail)}
        ></wab-checkbox-input>);
      default:
        return <div>Unknown field type</div>;
    }
  }
  
  /**
   * Create a fake form and submit it
   * Use only if useAjax is false
   *
   * @param dataToSubmit
   */
  submitFakeForm (dataToSubmit) {
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
