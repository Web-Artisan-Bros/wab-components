import { r as registerInstance, e as createEvent, h, a as Host } from './index-f60b9468.js';
import { g as getComponentId } from './utils-ea428fc4.js';

const textInputCss = ":host {\n  display: block;\n\n  [part=\"label\"] {\n    display: block;\n  }\n\n  [part=\"input\"] {}\n\n  [part=\"details\"] {\n    font-size: .75rem;\n  }\n\n  [part=\"errors\"] {\n    font-size: .75rem;\n    color: red;\n  }\n\n}\n";

const TextInput = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
};
TextInput.style = textInputCss;

export { TextInput as wab_text_input };

//# sourceMappingURL=wab-text-input.entry.js.map