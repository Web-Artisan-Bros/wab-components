import { Host, h, Prop, Event, EventEmitter, Component } from '@stencil/core';
import { getComponentId } from '../../../utils/utils';
import FormComponentInterface from '../../../interfaces/FormComponentInterface';

@Component({
  tag: 'wab-checkbox-input',
  styleUrls: ['../../../commons/wab-input.css', 'checkbox-input.css'],
  shadow: true,
})
export class CheckboxInput implements FormComponentInterface {
  @Prop({ mutable: true }) checked: boolean = false;
  @Prop() value: string;
  @Prop() disabled: boolean = false;
  @Prop() readonly: boolean = false;
  @Prop() name!: string;
  @Prop() label: string;
  @Prop() labelPosition: 'left' | 'right' = 'right'
  @Prop() details: string;
  @Prop() errors: string;
  
  /**
   * Use the native checkbox html element instead of the custom css one
   */
  @Prop() useNative: boolean = false
  
  @Event() valueChange: EventEmitter<string>;
  @Event() valueInput: EventEmitter<string>;
  
  get id () {
    return getComponentId(this.name);
  }
  
  valueChangedHandler (e: InputEvent | Event, eventToEmit?: string) {
    this.checked = e.target['checked'];
    
    if (eventToEmit === 'change') {
      this.valueChange.emit(e.target['checked']);
    } else {
      this.valueInput.emit(e.target['checked']);
    }
  }
  
  componentWillLoad () {
    // console.log(this.disabled);
  }
  
  render () {
    return (
      <Host class="wab-form-control">
        <label part="label" >
          {this.labelPosition === 'left' && <span part='labelText' innerHTML={this.label}></span>}
          
          <input part="input"
                 type="checkbox"
                 checked={this.checked}
                 id={this.id}
                 disabled={this.disabled}
                 value={this.value}
                 style={{ "display": this.useNative ? 'inline-block' : 'none' }}
                 onInput={e => this.valueChangedHandler(e)}
                 onChange={e => this.valueChangedHandler(e, 'change')}
          />
          
          {this.useNative ? null : (<span part="customInput"><span part="customInputCheckmark"></span></span>)}
          
          {this.labelPosition === 'right' && <span part='labelText' innerHTML={this.label}></span>}
        </label>
        
        <slot name='details'>{this.details && <div part='details'>{this.details}</div>}</slot>
        
        <slot name='errors'>{this.errors && <div part='errors'>{this.errors}</div>}</slot>
      </Host>
    );
  }
  
}
