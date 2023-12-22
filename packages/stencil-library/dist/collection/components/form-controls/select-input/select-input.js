import { Host, h } from "@stencil/core";
import { getComponentId } from "../../../utils/utils";
export class SelectInput {
    constructor() {
        this.value = undefined;
        this.placeholder = undefined;
        this.disabled = false;
        this.readonly = false;
        this.name = undefined;
        this.label = undefined;
        this.details = undefined;
        this.errors = undefined;
        this.options = undefined;
        this.multiple = false;
        this.initialValue = undefined;
        this.selectedOptions = [];
        this.inputValue = undefined;
        this.hoverOption = undefined;
        this.isDropdownOpen = false;
        this.dropdownEl = undefined;
    }
    get id() {
        return getComponentId(this.name);
    }
    componentWillLoad() {
        var _a;
        this.initialValue = (_a = this.initialValue) !== null && _a !== void 0 ? _a : this.value;
        this.onValueChanged(this.value);
    }
    componentDidLoad() {
        this.dropdownEl.addEventListener('animationend', () => {
            this.dropdownEl.classList.toggle('dropdown-close', false);
        });
    }
    /**
     * When the value changes, update the selectedOptions and the input value
     * @param newValue
     */
    onValueChanged(newValue) {
        console.log('onValueChanged', newValue);
        // Because the value can be a string separated by commas, we need to split it
        if (this.multiple) {
            this.selectedOptions = this.options.filter(option => {
                if (newValue instanceof Array) {
                    return newValue.includes(option.value);
                }
                else {
                    return newValue.split(',').includes(option.value);
                }
            });
        }
        else {
            this.selectedOptions = this.options.filter(option => option.value === newValue);
        }
        this.updateInputValue();
    }
    onOptionSelect(option) {
        var _a;
        if (!option)
            return;
        if (!this.multiple) {
            this.selectedOptions = [option];
            this.closeDropdown();
        }
        else {
            const alreadySelected = (_a = this.selectedOptions) === null || _a === void 0 ? void 0 : _a.find(o => o.value === option.value);
            if (alreadySelected) {
                this.selectedOptions = this.selectedOptions.filter(o => o.value !== option.value);
            }
            else {
                this.selectedOptions = [...this.selectedOptions, option];
            }
        }
        this.updateInputValue();
        this.emitValueChange();
    }
    onKeyUp(e) {
        const lastSelectedOption = this.selectedOptions[this.selectedOptions.length - 1];
        const currentIndex = this.options.findIndex(option => { var _a, _b; return option.value === ((_b = (_a = this.hoverOption) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : lastSelectedOption === null || lastSelectedOption === void 0 ? void 0 : lastSelectedOption.value); });
        let nextOptionIndex;
        if (!this.isDropdownOpen)
            return;
        console.log(e);
        switch (e.code) {
            case 'ArrowDown':
                nextOptionIndex = currentIndex + 1;
                break;
            case 'ArrowUp':
                nextOptionIndex = currentIndex - 1;
                break;
            case 'Enter':
            case 'Space':
                this.onOptionSelect(this.hoverOption);
                return;
            default:
                return;
        }
        if (nextOptionIndex < 0)
            nextOptionIndex = this.options.length - 1;
        if (nextOptionIndex >= this.options.length)
            nextOptionIndex = 0;
        this.hoverOption = this.options[nextOptionIndex];
    }
    toggleFocus(e, isFocused) {
        e.preventDefault();
        console.log(e);
        console.log('toggleFocus', isFocused);
        // gestire animazione tramite js aspettando che questa sia completa
        this.isDropdownOpen = isFocused;
        this.dropdownEl.classList.toggle('dropdown-open', this.isDropdownOpen);
        this.dropdownEl.classList.toggle('dropdown-close', !this.isDropdownOpen);
        if (this.isDropdownOpen) {
            this.dropdownEl.focus();
        }
    }
    /**
     * Update the internal input value based on the selected options
     */
    updateInputValue() {
        if (this.selectedOptions.length === 0) {
            this.inputValue = null;
        }
        else if (this.selectedOptions.length === 1) {
            this.inputValue = this.selectedOptions[0].label;
        }
        else {
            this.inputValue = this.selectedOptions.map(option => option.label).join(', ');
        }
    }
    /**
     * Emit the valueChange event
     * and update the "value" property
     */
    emitValueChange() {
        const toEmit = this.multiple
            ? this.selectedOptions.map(o => o.value)
            : this.selectedOptions.map(option => option.value).join(',');
        this.value = toEmit;
        this.valueInput.emit(toEmit);
        this.valueChange.emit(toEmit);
    }
    closeDropdown() {
        this.isDropdownOpen = false;
        this.hoverOption = null;
    }
    render() {
        var _a, _b, _c;
        return (h(Host, { class: "wab-form-control" }, h("slot", { name: "label" }, this.label && (h("label", { part: "label", htmlFor: this.id }, this.label))), h("div", { part: "input-wrapper", id: this.id, tabindex: "0", onFocusin: (e) => this.toggleFocus(e, true), onFocusout: (e) => this.toggleFocus(e, false), onKeyUp: e => this.onKeyUp(e), class: { 'focus': this.isDropdownOpen } }, h("div", { part: "input", onFocusin: e => e.stopPropagation(), onFocusout: e => e.stopPropagation(), class: { 'placeholder': !this.inputValue } }, (_b = (_a = this.inputValue) !== null && _a !== void 0 ? _a : this.placeholder) !== null && _b !== void 0 ? _b : '\xa0'), h("ul", { part: "dropdown", ref: (e) => this.dropdownEl = e }, (_c = this.options) === null || _c === void 0 ? void 0 : _c.map(option => {
            var _a, _b;
            return (h("li", { part: "dropdown-item", key: option.value, "data-value": option.value, onClick: () => this.onOptionSelect(option), class: {
                    'selected': !!((_a = this.selectedOptions) === null || _a === void 0 ? void 0 : _a.find(o => o.value === option.value)),
                    'hover': ((_b = this.hoverOption) === null || _b === void 0 ? void 0 : _b.value) === option.value
                } }, option.label));
        }))), h("slot", { name: "details" }, this.details && h("div", { part: "details" }, this.details)), h("slot", { name: "errors" }, this.errors && h("div", { part: "errors" }, this.errors))));
    }
    static get is() { return "wab-select-input"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["../../../commons/wab-input.css", "select-input.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["../../../commons/wab-input.css", "select-input.css"]
        };
    }
    static get properties() {
        return {
            "value": {
                "type": "any",
                "mutable": true,
                "complexType": {
                    "original": "any",
                    "resolved": "any",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [{
                            "name": "type",
                            "text": "{string}"
                        }],
                    "text": "The input value\nif multiple is true, value is a string separated by commas"
                },
                "attribute": "value",
                "reflect": false
            },
            "placeholder": {
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
                "attribute": "placeholder",
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
            },
            "options": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "{ label: string, value: string }[]",
                    "resolved": "{ label: string; value: string; }[]",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                }
            },
            "multiple": {
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
                "attribute": "multiple",
                "reflect": false,
                "defaultValue": "false"
            },
            "initialValue": {
                "type": "any",
                "mutable": true,
                "complexType": {
                    "original": "any",
                    "resolved": "any",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "attribute": "initial-value",
                "reflect": false
            }
        };
    }
    static get states() {
        return {
            "selectedOptions": {},
            "inputValue": {},
            "hoverOption": {},
            "isDropdownOpen": {},
            "dropdownEl": {}
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
                    "original": "string | string[]",
                    "resolved": "string | string[]",
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
                    "original": "string | string[]",
                    "resolved": "string | string[]",
                    "references": {}
                }
            }];
    }
    static get watchers() {
        return [{
                "propName": "value",
                "methodName": "onValueChanged"
            }];
    }
}
//# sourceMappingURL=select-input.js.map
