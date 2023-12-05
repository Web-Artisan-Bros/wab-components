import { Component, Element, Host, Prop, State, Watch, h } from '@stencil/core';
import { WabFormSchema, WabFormSchemaField } from './wab-form-schema';
import * as yup from 'yup';

@Component({
  tag: 'wab-form-builder',
  styleUrl: 'form-builder.css',
  shadow: true,
})
export class FormBuilder {
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

  async onSubmit(e: Event) {
    e.preventDefault();

    const slottedInputs = this.el.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>('input, select, textarea');

    this.resetValidationErrors();

    try {
      // Retrieve all data from the form
      const dataToSubmit = {};

      Object.keys(this.formData).forEach(key => (dataToSubmit[key] = this.formData[key]));
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

  onReset(e: Event) {
    e.preventDefault();

    this.formData = { ...this.initialValues };
    console.log(this.formData);

    this.resetValidationErrors();
  }

  @Watch('schema')
  onSchemaChange(newValue: string | WabFormSchema) {
    if (typeof newValue === 'string') {
      this.formSchema = JSON.parse(newValue);
    } else {
      this.formSchema = newValue;
    }
  }

  resetValidationErrors() {
    const newFormSchema = { ...this.formSchema };

    // reset the form validator
    newFormSchema.fields.forEach(field => (field.errors = undefined));

    this.formSchema = newFormSchema;
  }

  storeValidationErrors(e: yup.ValidationError) {
    const newSchema = { ...this.formSchema };

    e.inner.forEach((err: yup.ValidationError) => {
      const field = newSchema.fields.find(field => field.name === err.path);

      if (field) {
        field.errors = err.message;
      }
    });

    this.formSchema = newSchema;
  }

  componentWillLoad() {
    this.onSchemaChange(this.schema);

    // Assign initial values to formData
    this.initialValues = this.formSchema?.fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {});
    this.formData = { ...this.initialValues };

    // Create the validator schema
    this.formValidator = yup.object(
      this.formSchema.fields
        .filter(field => field.validators)
        .reduce((acc, field) => {
          const validator = field.validators(yup, this.formValidator);

          acc[field.name] = validator;

          return acc;
        }, {}),
    );
  }

  updateFormData(field: WabFormSchemaField, value: any) {
    this.formData = {
      ...this.formData,
      [field.name]: value,
    };

    console.log(this.formData);
  }

  getRightComponent(field: WabFormSchemaField) {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'password':
        return (
          <wab-text-input
            {...field}
            value={this.formData[field.name]}
            onKeyUp={e => e.key === 'Enter' && this.formEl.requestSubmit()}
            onValueChanged={e => this.updateFormData(field, e.target.value)}
          />
        );
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

  render() {
    return (
      <Host>
        <form action={this.action} method={this.method} ref={el => (this.formEl = el)} onSubmit={e => this.onSubmit(e)} onReset={e => this.onReset(e)}>
          {/* Custom inputs. Usually hidden ones */}
          <slot></slot>

          {this.formSchema?.fields.map(field => this.getRightComponent(field))}

          <slot name="actions">
            <button type="reset" part="resetBtn">
              Reset
            </button>
            <button type="submit" part="submitBtn">
              Submit
            </button>
          </slot>
        </form>
      </Host>
    );
  }
}
