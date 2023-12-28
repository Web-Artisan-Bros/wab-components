import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { g as getComponentId } from './utils.js';

const wabInputCss = ":host {\n    display: block;\n    font-size: 1em;\n    \n    * {\n        -webkit-box-sizing: border-box;\n        box-sizing: border-box;\n    }\n    \n    [part=\"label\"] {\n        display: block;\n    }\n    \n    [part=\"input\"] {\n        width: 100%;\n        font-size: inherit;\n    }\n    \n    [part=\"details\"] {\n        font-size: .75rem;\n    }\n    \n    [part=\"errors\"] {\n        font-size: .75rem;\n        color: red;\n    }\n    \n}\n";

const checkboxInputCss = ":host {\n  --size: 1rem;\n  --border-color: #ccc;\n  --chcecked-bg-color: transparent;\n  --check-color: #000;\n  --check-size: 50%;\n  --check-width: 3px;\n  --transition-duration: .2s;\n  --transition-ease: ease-in-out;\n  \n  [part=\"label\"] {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-align: center;\n    align-items: center;\n  }\n\n  [part=\"input\"]:checked ~ [part=\"customInput\"] {\n    background-color: var(--chcecked-bg-color);\n  }\n  \n  [part=\"input\"]:checked ~ [part=\"customInput\"] [part=\"customInputCheckmark\"] {\n    opacity: 1;\n  }\n  \n  [part=\"customInput\"] {\n    width: var(--size);\n    height: var(--size);\n    border: 1px solid var(--border-color);\n    \n    display: -ms-flexbox;\n    \n    display: flex;\n    -ms-flex-align: center;\n    align-items: center;\n    -ms-flex-pack: center;\n    justify-content: center;\n    \n    -webkit-transition: background-color var(--transition-duration) var(--transition-ease);\n    \n    transition: background-color var(--transition-duration) var(--transition-ease);\n  }\n  \n  [part=\"customInputCheckmark\"] {\n    display: inline-block;\n    width: calc(var(--check-size) / 2);\n    height: var(--check-size);\n    border: solid var(--check-color);\n    border-width: 0 var(--check-width) var(--check-width) 0;\n    -webkit-transform: rotate(45deg) translate(-10%, -10%);\n    transform: rotate(45deg) translate(-10%, -10%);\n    opacity: 0;\n    -webkit-transition: opacity var(--transition-duration) var(--transition-ease);\n    transition: opacity var(--transition-duration) var(--transition-ease);\n  }\n  \n}\n";

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
        this.labelPosition = 'right';
        this.details = undefined;
        this.errors = undefined;
        this.useNative = false;
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
        return (h(Host, { class: "wab-form-control" }, h("label", { part: "label" }, this.labelPosition === 'left' && h("span", { part: 'labelText' }, this.label), h("input", { part: "input", type: "checkbox", checked: this.checked, id: this.id, disabled: this.disabled, value: this.value, style: { display: this.useNative ? 'inline-block' : 'none' }, onInput: e => this.valueChangedHandler(e), onChange: e => this.valueChangedHandler(e, 'change') }), this.useNative ? null : (h("span", { part: "customInput" }, h("span", { part: "customInputCheckmark" }))), this.labelPosition === 'right' && h("span", { part: 'labelText' }, this.label)), h("slot", { name: 'details' }, this.details && h("div", { part: 'details' }, this.details)), h("slot", { name: 'errors' }, this.errors && h("div", { part: 'errors' }, this.errors))));
    }
    static get style() { return wabInputCss + checkboxInputCss; }
}, [1, "wab-checkbox-input", {
        "checked": [1028],
        "value": [1],
        "disabled": [4],
        "readonly": [4],
        "name": [1],
        "label": [1],
        "labelPosition": [1, "label-position"],
        "details": [1],
        "errors": [1],
        "useNative": [4, "use-native"]
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