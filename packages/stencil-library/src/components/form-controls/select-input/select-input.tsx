import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'wab-select-input',
  styleUrl: 'select-input.css',
  shadow: true,
})
export class SelectInput {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
