import { Host, h, Prop, Event, EventEmitter, Component } from '@stencil/core';
import { getComponentId } from '../../../utils/utils';
import FormComponentInterface from '../../../interfaces/FormComponentInterface';

@Component({
  tag: 'wab-checkbox-input',
  styleUrl: 'checkbox-input.css',
  shadow: true,
})
export class CheckboxInput implements FormComponentInterface {
  @Prop({ mutable: true }) checked: boolean = false;
  @Prop() value: string;
  @Prop() disabled: boolean = false;
  @Prop() readonly: boolean = false;
  @Prop() name!: string;
  @Prop() label: string;
  @Prop() details: string;
  @Prop() errors: string;
  
  @Event() valueChanged: EventEmitter<string>;
  
  get id () {
    return getComponentId(this.name);
  }
  
  valueChangedHandler (e: InputEvent) {
    this.checked = e.target['checked'];
    this.valueChanged.emit(e.target['checked']);
  }
  
  componentWillLoad () {
    // console.log(this.disabled);
  }
  
  render () {
    return (
      <Host class='wab-form-input-wrapper'>
        <slot name='label'>
          {this.label && (
            <label part='label' htmlFor={this.id}>
              {this.label}
            </label>
          )}
        </slot>
        {/* poters cegliere se si vuole usare la checkbox html o una custom, nascondendo quella reale */}
        <input part='input'
               type='checkbox'
               checked={this.checked}
               id={this.id}
               disabled={this.disabled}
               value={this.value}
               onInput={e => this.valueChangedHandler(e)} />
        
        <slot name='details'>{this.details && <div part='details'>{this.details}</div>}</slot>
        
        <slot name='errors'>{this.errors && <div part='errors'>{this.errors}</div>}</slot>
      </Host>
    );
  }
  
}
