import { EventEmitter } from '../../../stencil-public-runtime';
import FormComponentInterface from '../../../interfaces/FormComponentInterface';
export interface SelectOption {
    label: string;
    value: string;
}
export declare class SelectInput implements FormComponentInterface {
    /**
     * The input value
     * if multiple is true, value is a string separated by commas
     * @type {string}
     */
    value: any;
    placeholder: string;
    disabled: boolean;
    readonly: boolean;
    name: string;
    label: string;
    details: string;
    errors: string;
    options: {
        label: string;
        value: string;
    }[];
    multiple: boolean;
    initialValue: any;
    valueChange: EventEmitter<string | string[]>;
    valueInput: EventEmitter<string | string[]>;
    selectedOptions: SelectOption[];
    inputValue: string;
    hoverOption: SelectOption;
    isDropdownOpen: boolean;
    dropdownEl: HTMLElement;
    get id(): string;
    componentWillLoad(): Promise<void> | void;
    componentDidLoad(): void;
    /**
     * When the value changes, update the selectedOptions and the input value
     * @param newValue
     */
    onValueChanged(newValue: string | string[]): void;
    onOptionSelect(option: SelectOption): void;
    onKeyUp(e: KeyboardEvent): void;
    toggleFocus(e: any, isFocused: boolean): void;
    /**
     * Update the internal input value based on the selected options
     */
    updateInputValue(): void;
    /**
     * Emit the valueChange event
     * and update the "value" property
     */
    emitValueChange(): void;
    closeDropdown(): void;
    render(): any;
}
