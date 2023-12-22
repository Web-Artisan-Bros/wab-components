import { Component, Event, EventEmitter, Host, Prop, h } from '@stencil/core';
import { getComponentId } from '../../../utils/utils';
import FormComponentInterface from '../../../interfaces/FormComponentInterface';

@Component({
  tag: 'wab-text-input',
  styleUrls: ['text-input.css', '../../../commons/wab-input.css'],
  shadow: true,
})
export class TextInput implements FormComponentInterface {
  @Prop({ mutable: true }) value: string;
  @Prop() placeholder: string;
  @Prop() type: string = 'text';
  @Prop() disabled: boolean = false;
  @Prop() readonly: boolean = false;
  @Prop() name!: string;
  @Prop() label: string;
  @Prop() details: string;
  @Prop() errors: string;
  
  @Event() valueChange: EventEmitter<string>;
  @Event() valueInput: EventEmitter<string>;

  get id() {
    return getComponentId(this.name);
  }
  
  valueChangedHandler (e: InputEvent | Event, eventToEmit?: string) {
    this.value = e.target['value'];
    
    if (eventToEmit === 'change') {
      this.valueChange.emit(e.target['value']);
    } else {
      this.valueInput.emit(e.target['value']);
    }
  }
  componentWillLoad() {
    // console.log(this.disabled);
  }

  render() {
    return (
      <Host class="wab-form-control">
        <slot name="label">
          {this.label && (
            <label part="label" htmlFor={this.id}>
              {this.label}
            </label>
          )}
        </slot>
        
        <input part='input'
               type={this.type}
               placeholder={this.placeholder}
               value={this.value}
               id={this.id}
               disabled={this.disabled}
               readonly={this.readonly}
               onInput={e => this.valueChangedHandler(e)}
               onChange={e => this.valueChangedHandler(e, 'change')} />

        <slot name="details">{this.details && <div part="details">{this.details}</div>}</slot>

        <slot name="errors">{this.errors && <div part="errors">{this.errors}</div>}</slot>
      </Host>
    );
  }
  
}
