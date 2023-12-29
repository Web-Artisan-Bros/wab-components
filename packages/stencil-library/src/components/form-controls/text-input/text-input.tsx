import { Component, Event, EventEmitter, Host, Prop, h, State } from '@stencil/core'
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
  @Prop() labelPosition: 'top' | 'bottom' = 'top'
  @Prop() details: string;
  @Prop() errors: string;
  @Prop() cols: number;
  @Prop() rows: number = 5;
  
  @State() focused: boolean = false
  
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
  
  getLabelPart () {
    const part = ['label']
    
    if (this.focused) {
      part.push('focus-within')
    }
    
    if (this.value) {
      part.push('value-within')
    }
    
    return part.join(' ')
  }
  
  componentWillLoad() {
    // console.log(this.disabled);
  }

  render() {
    return (
      <Host class="wab-form-control">
        {this.labelPosition === 'top' && <slot name="label">
          {this.label && (
            <label part={this.getLabelPart()} htmlFor={this.id}>
              {this.label}
            </label>
          )}
        </slot>}
        
        {this.type !== 'textarea'
          ?
          <input part="input"
                 type={this.type}
                 placeholder={this.placeholder}
                 value={this.value}
                 id={this.id}
                 name={this.name}
                 disabled={this.disabled}
                 readonly={this.readonly}
                 onInput={e => this.valueChangedHandler(e)}
                 onChange={e => this.valueChangedHandler(e, 'change')}
                 onFocusin={() => this.focused = true}
                 onFocusout={() => this.focused = false}/>
          :
          <textarea part="input"
                    placeholder={this.placeholder}
                    id={this.id}
                    name={this.name}
                    disabled={this.disabled}
                    readonly={this.readonly}
                    onInput={e => this.valueChangedHandler(e)}
                    onChange={e => this.valueChangedHandler(e, 'change')}
                    onFocusin={() => this.focused = true}
                    onFocusout={() => this.focused = false}
                    cols={this.cols}
                    rows={this.rows}>{this.value}</textarea>
        }
        
        {this.labelPosition === 'bottom' && <slot name="label">
          {this.label && (
            <label part={this.getLabelPart()} htmlFor={this.id}>
              {this.label}
            </label>
          )}
        </slot>}

        <slot name="details">{this.details && <div part="details">{this.details}</div>}</slot>

        <slot name="errors">{this.errors && <div part="errors">{this.errors}</div>}</slot>
      </Host>
    );
  }
  
}
