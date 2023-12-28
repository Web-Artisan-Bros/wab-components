"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectInput = void 0;
const core_1 = require("@stencil/core");
const utils_1 = require("../../../utils/utils");
let SelectInput = class SelectInput {
    constructor() {
        this.disabled = false;
        this.readonly = false;
        this.multiple = false;
        this.selectedOptions = [];
        this.isDropdownOpen = false;
    }
    get id() {
        return (0, utils_1.getComponentId)(this.name);
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
    onValueChanged(newValue) {
        console.log('onValueChanged', newValue);
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
        this.isDropdownOpen = isFocused;
        this.dropdownEl.classList.toggle('dropdown-open', this.isDropdownOpen);
        this.dropdownEl.classList.toggle('dropdown-close', !this.isDropdownOpen);
        if (this.isDropdownOpen) {
            this.dropdownEl.focus();
        }
    }
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
        return (<core_1.Host class="wab-form-control">
        <slot name="label">
          {this.label && (<label part="label" htmlFor={this.id}>
              {this.label}
            </label>)}
        </slot>
        
        <div part="input-wrapper" id={this.id} tabindex="0" onFocusin={(e) => this.toggleFocus(e, true)} onFocusout={(e) => this.toggleFocus(e, false)} onKeyUp={e => this.onKeyUp(e)} class={{ 'focus': this.isDropdownOpen }}>
          <div part="input" onFocusin={e => e.stopPropagation()} onFocusout={e => e.stopPropagation()} class={{ 'placeholder': !this.inputValue }}>{(_b = (_a = this.inputValue) !== null && _a !== void 0 ? _a : this.placeholder) !== null && _b !== void 0 ? _b : '\xa0'}</div>
          
          <ul part="dropdown" ref={(e) => this.dropdownEl = e}>
            {(_c = this.options) === null || _c === void 0 ? void 0 : _c.map(option => {
                var _a, _b;
                return (<li part="dropdown-item" key={option.value} data-value={option.value} onClick={() => this.onOptionSelect(option)} class={{
                        'selected': !!((_a = this.selectedOptions) === null || _a === void 0 ? void 0 : _a.find(o => o.value === option.value)),
                        'hover': ((_b = this.hoverOption) === null || _b === void 0 ? void 0 : _b.value) === option.value
                    }}>
                {option.label}
              </li>);
            })}
          </ul>
        </div>
        
        <slot name="details">{this.details && <div part="details">{this.details}</div>}</slot>
        
        <slot name="errors">{this.errors && <div part="errors">{this.errors}</div>}</slot>
      </core_1.Host>);
    }
};
exports.SelectInput = SelectInput;
__decorate([
    (0, core_1.Prop)({ mutable: true }),
    __metadata("design:type", Object)
], SelectInput.prototype, "value", void 0);
__decorate([
    (0, core_1.Prop)(),
    __metadata("design:type", String)
], SelectInput.prototype, "placeholder", void 0);
__decorate([
    (0, core_1.Prop)(),
    __metadata("design:type", Boolean)
], SelectInput.prototype, "disabled", void 0);
__decorate([
    (0, core_1.Prop)(),
    __metadata("design:type", Boolean)
], SelectInput.prototype, "readonly", void 0);
__decorate([
    (0, core_1.Prop)(),
    __metadata("design:type", String)
], SelectInput.prototype, "name", void 0);
__decorate([
    (0, core_1.Prop)(),
    __metadata("design:type", String)
], SelectInput.prototype, "label", void 0);
__decorate([
    (0, core_1.Prop)(),
    __metadata("design:type", String)
], SelectInput.prototype, "details", void 0);
__decorate([
    (0, core_1.Prop)(),
    __metadata("design:type", String)
], SelectInput.prototype, "errors", void 0);
__decorate([
    (0, core_1.Prop)(),
    __metadata("design:type", Array)
], SelectInput.prototype, "options", void 0);
__decorate([
    (0, core_1.Prop)(),
    __metadata("design:type", Boolean)
], SelectInput.prototype, "multiple", void 0);
__decorate([
    (0, core_1.Prop)({ mutable: true }),
    __metadata("design:type", Object)
], SelectInput.prototype, "initialValue", void 0);
__decorate([
    (0, core_1.Event)(),
    __metadata("design:type", Object)
], SelectInput.prototype, "valueChange", void 0);
__decorate([
    (0, core_1.Event)(),
    __metadata("design:type", Object)
], SelectInput.prototype, "valueInput", void 0);
__decorate([
    (0, core_1.State)(),
    __metadata("design:type", Array)
], SelectInput.prototype, "selectedOptions", void 0);
__decorate([
    (0, core_1.State)(),
    __metadata("design:type", String)
], SelectInput.prototype, "inputValue", void 0);
__decorate([
    (0, core_1.State)(),
    __metadata("design:type", Object)
], SelectInput.prototype, "hoverOption", void 0);
__decorate([
    (0, core_1.State)(),
    __metadata("design:type", Boolean)
], SelectInput.prototype, "isDropdownOpen", void 0);
__decorate([
    (0, core_1.State)(),
    __metadata("design:type", Object)
], SelectInput.prototype, "dropdownEl", void 0);
__decorate([
    (0, core_1.Watch)('value'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SelectInput.prototype, "onValueChanged", null);
exports.SelectInput = SelectInput = __decorate([
    (0, core_1.Component)({
        tag: 'wab-select-input',
        styleUrls: ['../../../commons/wab-input.css', 'select-input.css'],
        shadow: true,
    })
], SelectInput);
//# sourceMappingURL=select-input.js.map