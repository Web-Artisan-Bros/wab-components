import { ComponentInterface, EventEmitter } from '../stencil-public-runtime';
export default interface FormComponentInterface extends ComponentInterface {
    value: string | boolean | number;
    disabled: boolean;
    readonly: boolean;
    name: string;
    label: string;
    details: string;
    errors: string;
    /**
     * Fired when the value of the input changes, usually on input event keyUp
     */
    valueInput: EventEmitter<string>;
    /**
     * Fired when the value of the input changes, usually on change event
     */
    valueChange: EventEmitter<string>;
    /**
     * Return an id for the input
     */
    get id(): string;
}
