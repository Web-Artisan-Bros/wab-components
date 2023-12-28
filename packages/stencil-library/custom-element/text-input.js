import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { g as getComponentId } from './utils.js';

const textInputCss = "";

const wabInputCss = ":host {\n    display: block;\n    font-size: 1em;\n    \n    * {\n        -webkit-box-sizing: border-box;\n        box-sizing: border-box;\n    }\n    \n    [part=\"label\"] {\n        display: block;\n    }\n    \n    [part=\"input\"] {\n        width: 100%;\n        font-size: inherit;\n    }\n    \n    [part=\"details\"] {\n        font-size: .75rem;\n    }\n    \n    [part=\"errors\"] {\n        font-size: .75rem;\n        color: red;\n    }\n    \n}\n";

const TextInput = /*@__PURE__*/ proxyCustomElement(class TextInput extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.valueChange = createEvent(this, "valueChange", 7);
        this.valueInput = createEvent(this, "valueInput", 7);
        this.value = undefined;
        this.placeholder = undefined;
        this.type = 'text';
        this.disabled = false;
        this.readonly = false;
        this.name = undefined;
        this.label = undefined;
        this.details = undefined;
        this.errors = undefined;
    }
    get id() {
        return getComponentId(this.name);
    }
    valueChangedHandler(e, eventToEmit) {
        this.value = e.target['value'];
        if (eventToEmit === 'change') {
            this.valueChange.emit(e.target['value']);
        }
        else {
            this.valueInput.emit(e.target['value']);
        }
    }
    componentWillLoad() {
        // console.log(this.disabled);
    }
    render() {
        return (h(Host, { class: "wab-form-control" }, h("slot", { name: "label" }, this.label && (h("label", { part: "label", htmlFor: this.id }, this.label))), h("input", { part: 'input', type: this.type, placeholder: this.placeholder, value: this.value, id: this.id, disabled: this.disabled, readonly: this.readonly, onInput: e => this.valueChangedHandler(e), onChange: e => this.valueChangedHandler(e, 'change') }), h("slot", { name: "details" }, this.details && h("div", { part: "details" }, this.details)), h("slot", { name: "errors" }, this.errors && h("div", { part: "errors" }, this.errors))));
    }
    static get style() { return textInputCss + wabInputCss; }
}, [1, "wab-text-input", {
        "value": [1025],
        "placeholder": [1],
        "type": [1],
        "disabled": [4],
        "readonly": [4],
        "name": [1],
        "label": [1],
        "details": [1],
        "errors": [1]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wab-text-input"];
    components.forEach(tagName => { switch (tagName) {
        case "wab-text-input":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, TextInput);
            }
            break;
    } });
}

export { TextInput as T, defineCustomElement as d };

//# sourceMappingURL=text-input.js.map