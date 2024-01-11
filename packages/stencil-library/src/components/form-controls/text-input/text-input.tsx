import { Component, Event, EventEmitter, Host, Prop, h, State, Element } from '@stencil/core'
import { getComponentId, partName } from '../../../utils/utils'
import FormComponentInterface from '../../../interfaces/FormComponentInterface';
import { Label as WabLabel } from '../partials/Label'

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
  
  @Element() el
  
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
    this.el.querySelector('[part*=\'label\']')?.setAttribute('part', partName("label", this.focused, !!this.value))
  }
  
  componentDidUpdate () {
    this.el.querySelector('[part*=\'label\']')?.setAttribute('part', partName("label", this.focused, !!this.value))
    // Non è una buona idea applicare il part direttamente sullo slot
    // altrimenti lo stile si applica in maniera sbagliata a tutto il contenuto
    
    // const parts = this.getLabelPart()
    // this.slotRefs["label"].setAttribute("part", parts)
    // console.log(parts)
  }
  
  render() {
    if (this.details === '_static_text_') {
      return <Host class="wab-form-control wab-form-control-static">
        <div>{this.value}</div>
      </Host>
    }
    
    return (
      <Host class="wab-form-control" name={this.name}>
        {this.labelPosition === 'top' && <WabLabel focused={this.focused} hasValue={!!this.value} id={this.id} label={this.label}/>}
        
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
        
        {this.labelPosition === 'bottom' && <WabLabel focused={this.focused} hasValue={!!this.value} id={this.id} label={this.label}/>}
        
        <slot name="details">{this.details && <div part="details" innerHTML={this.details}></div>}</slot>

        <slot name="errors">{this.errors && <div part="errors">{this.errors}</div>}</slot>
      </Host>
    );
  }
  
}
