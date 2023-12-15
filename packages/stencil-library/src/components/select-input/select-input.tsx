import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'select-input',
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
