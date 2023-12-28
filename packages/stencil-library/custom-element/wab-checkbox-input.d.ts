import type { Components, JSX } from "../dist/types/components";

interface WabCheckboxInput extends Components.WabCheckboxInput, HTMLElement {}
export const WabCheckboxInput: {
    prototype: WabCheckboxInput;
    new (): WabCheckboxInput;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
