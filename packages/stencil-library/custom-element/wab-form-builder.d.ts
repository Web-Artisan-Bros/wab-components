import type { Components, JSX } from "../dist/types/components";

interface WabFormBuilder extends Components.WabFormBuilder, HTMLElement {}
export const WabFormBuilder: {
    prototype: WabFormBuilder;
    new (): WabFormBuilder;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
