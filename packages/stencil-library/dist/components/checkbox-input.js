import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { g as getComponentId } from './utils.js';

const checkboxInputCss = ":host{display:block}";

const CheckboxInput = /*@__PURE__*/ proxyCustomElement(class CheckboxInput extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.valueChange = createEvent(this, "valueChange", 7);
        this.valueInput = createEvent(this, "valueInput", 7);
        this.checked = false;
        this.value = undefined;
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
        this.checked = e.target['checked'];
        if (eventToEmit === 'change') {
            this.valueChange.emit(e.target['checked']);
        }
        else {
            this.valueInput.emit(e.target['checked']);
        }
    }
    componentWillLoad() {
        // console.log(this.disabled);
    }
    render() {
        return (h(Host, { class: 'wab-form-checkbox-wrapper' }, h("slot", { name: 'label' }, this.label && (h("label", { part: 'label', htmlFor: this.id }, this.label))), h("input", { part: 'input', type: 'checkbox', checked: this.checked, id: this.id, disabled: this.disabled, value: this.value, onInput: e => this.valueChangedHandler(e), onChange: e => this.valueChangedHandler(e, 'change') }), h("slot", { name: 'details' }, this.details && h("div", { part: 'details' }, this.details)), h("slot", { name: 'errors' }, this.errors && h("div", { part: 'errors' }, this.errors))));
    }
    static get style() { return checkboxInputCss; }
}, [1, "wab-checkbox-input", {
        "checked": [1028],
        "value": [1],
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
    const components = ["wab-checkbox-input"];
    components.forEach(tagName => { switch (tagName) {
        case "wab-checkbox-input":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, CheckboxInput);
            }
            break;
    } });
}

export { CheckboxInput as C, defineCustomElement as d };

//# sourceMappingURL=checkbox-input.js.map