import { EventEmitter } from '../../../stencil-public-runtime';
import FormComponentInterface from '../../../interfaces/FormComponentInterface';
export declare class TextInput implements FormComponentInterface {
    value: string;
    placeholder: string;
    type: string;
    disabled: boolean;
    readonly: boolean;
    name: string;
    label: string;
    details: string;
    errors: string;
    valueChange: EventEmitter<string>;
    valueInput: EventEmitter<string>;
    get id(): string;
    valueChangedHandler(e: InputEvent | Event, eventToEmit?: string): void;
    componentWillLoad(): void;
    render(): any;
}
