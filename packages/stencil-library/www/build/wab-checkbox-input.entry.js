import { r as registerInstance, e as createEvent, h, a as Host } from './index-f60b9468.js';
import { g as getComponentId } from './utils-ea428fc4.js';

const checkboxInputCss = ":host {\n  --size: 1rem;\n  --border-color: #ccc;\n  --chcecked-bg-color: transparent;\n  --check-color: #000;\n  --check-size: 50%;\n  --check-width: 3px;\n  --transition-duration: .2s;\n  --transition-ease: ease-in-out;\n  \n  display: block;\n  \n  [part=\"label\"] {\n    display: flex;\n    align-items: center;\n  }\n  \n  [part=\"input\"] {\n  }\n  \n  [part=\"details\"] {\n    font-size: .75rem;\n  }\n  \n  [part=\"errors\"] {\n    font-size: .75rem;\n    color: red;\n  }\n  \n  [part=\"input\"]:checked ~ [part=\"customInput\"] {\n    background-color: var(--chcecked-bg-color);\n  }\n  \n  [part=\"input\"]:checked ~ [part=\"customInput\"] [part=\"customInputCheckmark\"] {\n    opacity: 1;\n  }\n  \n  [part=\"customInput\"] {\n    width: var(--size);\n    height: var(--size);\n    border: 1px solid var(--border-color);\n    \n    display: flex;\n    align-items: center;\n    justify-content: center;\n    \n    transition: background-color var(--transition-duration) var(--transition-ease);\n  }\n  \n  [part=\"customInputCheckmark\"] {\n    display: inline-block;\n    width: calc(var(--check-size) / 2);\n    height: var(--check-size);\n    border: solid var(--check-color);\n    border-width: 0 var(--check-width) var(--check-width) 0;\n    transform: rotate(45deg) translate(-10%, -10%);\n    opacity: 0;\n    transition: opacity var(--transition-duration) var(--transition-ease);\n  }\n  \n}\n";

const CheckboxInput = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
};
CheckboxInput.style = checkboxInputCss;

export { CheckboxInput as wab_checkbox_input };

//# sourceMappingURL=wab-checkbox-input.entry.js.map