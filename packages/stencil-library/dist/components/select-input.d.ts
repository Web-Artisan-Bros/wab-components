import type { Components, JSX } from "../types/components";

interface SelectInput extends Components.SelectInput, HTMLElement {}
export const SelectInput: {
    prototype: SelectInput;
    new (): SelectInput;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
