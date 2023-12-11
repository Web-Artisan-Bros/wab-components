import { ComponentInterface, EventEmitter } from '@stencil/core';

export default interface FormComponentInterface extends ComponentInterface {
  value: string | boolean | number;
  disabled: boolean;
  readonly : boolean;
  name: string;
  label: string;
  details: string;
  errors: string;
  
  valueChanged: EventEmitter<string>;
  
  /**
   * Return an id for the input
   */
  get id (): string;
}
