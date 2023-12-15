import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const selectInputCss = ":host{display:block}";

const SelectInput$1 = /*@__PURE__*/ proxyCustomElement(class SelectInput extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
    }
    render() {
        return (h(Host, null, h("slot", null)));
    }
    static get style() { return selectInputCss; }
}, [1, "select-input"]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["select-input"];
    components.forEach(tagName => { switch (tagName) {
        case "select-input":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SelectInput$1);
            }
            break;
    } });
}

const SelectInput = SelectInput$1;
const defineCustomElement = defineCustomElement$1;

export { SelectInput, defineCustomElement };

//# sourceMappingURL=select-input.js.map