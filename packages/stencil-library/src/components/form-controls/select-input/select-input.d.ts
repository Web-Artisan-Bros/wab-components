/// <reference types="react" />
/// <reference types="react" />
import { EventEmitter } from '@stencil/core';
import FormComponentInterface from '../../../interfaces/FormComponentInterface';
export interface SelectOption {
    label: string;
    value: string;
}
export declare class SelectInput implements FormComponentInterface {
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
    onValueChanged(newValue: string | string[]): void;
    onOptionSelect(option: SelectOption): void;
    onKeyUp(e: KeyboardEvent): void;
    toggleFocus(e: any, isFocused: boolean): void;
    updateInputValue(): void;
    emitValueChange(): void;
    closeDropdown(): void;
    render(): import("react").JSX.Element;
}
