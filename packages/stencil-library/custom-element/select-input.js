import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { g as getComponentId } from './utils.js';

const wabInputCss = ":host {\n    display: block;\n    font-size: 1em;\n    \n    * {\n        -webkit-box-sizing: border-box;\n        box-sizing: border-box;\n    }\n    \n    [part=\"label\"] {\n        display: block;\n    }\n    \n    [part=\"input\"] {\n        width: 100%;\n        font-size: inherit;\n    }\n    \n    [part=\"details\"] {\n        font-size: .75rem;\n    }\n    \n    [part=\"errors\"] {\n        font-size: .75rem;\n        color: red;\n    }\n    \n}\n";

const selectInputCss = ":host {\n  --dropdown-border-color: #8f8f9d;\n  --dropdown-border-width: 1px;\n  --dropdown-focus-border-color: #5bb5f5;\n  \n  --dropdown-bg: white;\n  --dropdown-padding: .2rem 0;\n  \n  --dropdown-placeholder-color: #8f8f9d;\n  \n  --dropdown-item-padding: .3rem .5rem;\n  \n  /* hover */\n  --dropdown-item-hover-bg: #eee;\n  --dropdown-item-hover-color: inherit;\n  \n  /* hover & selected */\n  --dropdown-item-hover-selected-bg: #51a2db;\n  --dropdown-item-hover-selected-color: #fff;\n  \n  /* active */\n  --dropdown-item-active-bg: #d0d0d0;\n  --dropdown-item-active-color: inherit;\n  \n  /* selected */\n  --dropdown-item-selected-bg: #5bb5f5;\n  --dropdown-item-selected-color: #fff;\n  \n  [part=\"input-wrapper\"] {\n    position: relative;\n    border: var(--dropdown-border-width) solid var(--dropdown-border-color);\n    \n    &.focus {\n      border-color: var(--dropdown-focus-border-color);\n    }\n  }\n  \n  [part=\"input\"] {\n    position: relative;\n    border: none;\n    background-color: transparent;\n    \n    &.placeholder {\n      color: var(--dropdown-placeholder-color);\n    }\n    \n    &:focus {\n      outline: none;\n    }\n  }\n  \n  [part=\"dropdown\"] {\n    list-style: none;\n    margin: 0;\n    position: absolute;\n    left: 0;\n    right: 0;\n    top: 100%;\n    min-width: 100%;\n    background-color: var(--dropdown-bg);\n    border: var(--dropdown-border-width) solid var(--dropdown-border-color);\n    padding: var(--dropdown-padding);\n    display: none;\n    \n    &.dropdown-open {\n      display: block;\n      -webkit-animation: open .2s ease-in-out forwards;\n      animation: open .2s ease-in-out forwards;\n    }\n    \n    &.dropdown-close {\n      display: block;\n      -webkit-animation: close .2s ease-in-out forwards;\n      animation: close .2s ease-in-out forwards;\n    }\n  }\n  \n  [part=\"dropdown-item\"] {\n    padding: var(--dropdown-item-padding);\n    cursor: pointer;\n    font-size: 1em;\n    -webkit-transition: background-color .2s ease-in-out, color .2s ease-in-out;\n    transition: background-color .2s ease-in-out, color .2s ease-in-out;\n    \n    &.selected {\n      background-color: var(--dropdown-item-selected-bg);\n      color: var(--dropdown-item-selected-color);\n      \n      &.hover, &:hover {\n        background-color: var(--dropdown-item-hover-selected-bg);\n        color: var(--dropdown-item-hover-selected-color);\n      }\n    }\n    \n    &:not(.selected) {\n      &.hover, &:hover {\n        background-color: var(--dropdown-item-hover-bg);\n        color: var(--dropdown-item-hover-color);\n      }\n      \n      &:active {\n        background-color: var(--dropdown-item-active-bg);\n        color: var(--dropdown-item-active-color);\n      }\n    }\n  }\n}\n\n@-webkit-keyframes open {\n  0% {\n    opacity: 0;\n    -webkit-transform: translateY(20px);\n    transform: translateY(20px);\n  }\n  10% {\n    opacity: 0;\n    -webkit-transform: translateY(10px);\n    transform: translateY(10px);\n  }\n  90% {\n    -webkit-transform: translateY(0);\n    transform: translateY(0);\n  }\n  100% {\n    opacity: 1;\n    -webkit-transform: translateY(0);\n    transform: translateY(0);\n  }\n}\n\n@keyframes open {\n  0% {\n    opacity: 0;\n    -webkit-transform: translateY(20px);\n    transform: translateY(20px);\n  }\n  10% {\n    opacity: 0;\n    -webkit-transform: translateY(10px);\n    transform: translateY(10px);\n  }\n  90% {\n    -webkit-transform: translateY(0);\n    transform: translateY(0);\n  }\n  100% {\n    opacity: 1;\n    -webkit-transform: translateY(0);\n    transform: translateY(0);\n  }\n}\n\n@-webkit-keyframes close {\n  0% {\n    opacity: 1;\n    -webkit-transform: translateY(0);\n    transform: translateY(0);\n  }\n  100% {\n    opacity: 0;\n    -webkit-transform: translateY(10px);\n    transform: translateY(10px);\n  }\n}\n\n@keyframes close {\n  0% {\n    opacity: 1;\n    -webkit-transform: translateY(0);\n    transform: translateY(0);\n  }\n  100% {\n    opacity: 0;\n    -webkit-transform: translateY(10px);\n    transform: translateY(10px);\n  }\n}\n";

const SelectInput = /*@__PURE__*/ proxyCustomElement(class SelectInput extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.valueChange = createEvent(this, "valueChange", 7);
        this.valueInput = createEvent(this, "valueInput", 7);
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
    static get watchers() { return {
        "value": ["onValueChanged"]
    }; }
    static get style() { return wabInputCss + selectInputCss; }
}, [1, "wab-select-input", {
        "value": [1032],
        "placeholder": [1],
        "disabled": [4],
        "readonly": [4],
        "name": [1],
        "label": [1],
        "details": [1],
        "errors": [1],
        "options": [16],
        "multiple": [4],
        "initialValue": [1032, "initial-value"],
        "selectedOptions": [32],
        "inputValue": [32],
        "hoverOption": [32],
        "isDropdownOpen": [32],
        "dropdownEl": [32]
    }, undefined, {
        "value": ["onValueChanged"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wab-select-input"];
    components.forEach(tagName => { switch (tagName) {
        case "wab-select-input":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SelectInput);
            }
            break;
    } });
}

export { SelectInput as S, defineCustomElement as d };

//# sourceMappingURL=select-input.js.map