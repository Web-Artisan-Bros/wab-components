import { ComponentInterface, EventEmitter } from '@stencil/core';

export default interface FormComponentInterface extends ComponentInterface {
  value: string | boolean | number;
  disabled: boolean;
  readonly : boolean;
  name: string;
  label: string;
  details: string;
  errors: string;
  
  /**
   * Fired when the value of the input changes, usually on input event keyUp
   */
  valueInput: EventEmitter<any>;
  
  /**
   * Fired when the value of the input changes, usually on change event
   */
  valueChange: EventEmitter<any>;
  
  /**
   * Return an id for the input
   */
  get id (): string;
}
