import { Host, h } from "@stencil/core";
import { getComponentId } from "../../../utils/utils";
export class CheckboxInput {
    constructor() {
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
    static get is() { return "wab-checkbox-input"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["checkbox-input.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["checkbox-input.css"]
        };
    }
    static get properties() {
        return {
            "checked": {
                "type": "boolean",
                "mutable": true,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "attribute": "checked",
                "reflect": false,
                "defaultValue": "false"
            },
            "value": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "attribute": "value",
                "reflect": false
            },
            "disabled": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "attribute": "disabled",
                "reflect": false,
                "defaultValue": "false"
            },
            "readonly": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "attribute": "readonly",
                "reflect": false,
                "defaultValue": "false"
            },
            "name": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": true,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "attribute": "name",
                "reflect": false
            },
            "label": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "attribute": "label",
                "reflect": false
            },
            "details": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "attribute": "details",
                "reflect": false
            },
            "errors": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "attribute": "errors",
                "reflect": false
            }
        };
    }
    static get events() {
        return [{
                "method": "valueChange",
                "name": "valueChange",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Fired when the value of the input changes, usually on change event"
                },
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                }
            }, {
                "method": "valueInput",
                "name": "valueInput",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Fired when the value of the input changes, usually on input event keyUp"
                },
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                }
            }];
    }
}
//# sourceMappingURL=checkbox-input.js.map
