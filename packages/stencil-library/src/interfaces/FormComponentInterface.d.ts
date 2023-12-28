import { ComponentInterface, EventEmitter } from '@stencil/core';
export default interface FormComponentInterface extends ComponentInterface {
    value: string | boolean | number;
    disabled: boolean;
    readonly: boolean;
    name: string;
    label: string;
    details: string;
    errors: string;
    valueInput: EventEmitter<any>;
    valueChange: EventEmitter<any>;
    get id(): string;
}
