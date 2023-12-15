import type { Components, JSX } from "../types/components";

interface WabSelectInput extends Components.WabSelectInput, HTMLElement {}
export const WabSelectInput: {
    prototype: WabSelectInput;
    new (): WabSelectInput;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
