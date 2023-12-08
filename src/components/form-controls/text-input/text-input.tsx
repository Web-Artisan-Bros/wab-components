import { Component, Event, EventEmitter, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'wab-text-input',
  styleUrl: 'text-input.css',
  shadow: true,
})
export class TextInput {
  @Prop({ mutable: true }) value: string;
  @Prop() placeholder: string;
  @Prop() type: string = 'text';
  @Prop() disabled: boolean = false;
  @Prop() name!: string;
  @Prop() label: string;
  @Prop() details: string;
  @Prop() errors: string;

  @Event() valueChanged: EventEmitter<string>;

  get id() {
    return 'wab-' + (this.name ? this.name + '-' : '') + 'text-input';
  }

  valueChangedHandler(e: InputEvent) {
    this.value = e.target['value'];
    this.valueChanged.emit(e.target['value']);
  }
  componentWillLoad() {
    // console.log(this.disabled);
  }

  render() {
    return (
      <Host class="wab-form-input-wrapper">
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
               onInput={e => this.valueChangedHandler(e)} />

        <slot name="details">{this.details && <div part="details">{this.details}</div>}</slot>

        <slot name="errors">{this.errors && <div part="errors">{this.errors}</div>}</slot>
      </Host>
    );
  }
}
