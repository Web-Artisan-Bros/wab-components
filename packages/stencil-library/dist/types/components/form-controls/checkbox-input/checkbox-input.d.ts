import { EventEmitter } from '../../../stencil-public-runtime';
import FormComponentInterface from '../../../interfaces/FormComponentInterface';
export declare class CheckboxInput implements FormComponentInterface {
    checked: boolean;
    value: string;
    disabled: boolean;
    readonly: boolean;
    name: string;
    label: string;
    labelPosition: 'left' | 'right';
    details: string;
    errors: string;
    /**
     * Use the native checkbox html element instead of the custom css one
     */
    useNative: boolean;
    valueChange: EventEmitter<string>;
    valueInput: EventEmitter<string>;
    get id(): string;
    valueChangedHandler(e: InputEvent | Event, eventToEmit?: string): void;
    componentWillLoad(): void;
    render(): any;
}
