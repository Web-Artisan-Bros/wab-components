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
exports.CheckboxInput = void 0;
const core_1 = require("@stencil/core");
const utils_1 = require("../../../utils/utils");
let CheckboxInput = class CheckboxInput {
    constructor() {
        this.checked = false;
        this.disabled = false;
        this.readonly = false;
        this.labelPosition = 'right';
        this.useNative = false;
    }
    get id() {
        return (0, utils_1.getComponentId)(this.name);
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
    }
    render() {
        return (<core_1.Host class="wab-form-control">
        <label part="label">
          {this.labelPosition === 'left' && <span part='labelText'>{this.label}</span>}
          
          <input part="input" type="checkbox" checked={this.checked} id={this.id} disabled={this.disabled} value={this.value} style={{ display: this.useNative ? 'inline-block' : 'none' }} onInput={e => this.valueChangedHandler(e)} onChange={e => this.valueChangedHandler(e, 'change')}/>
          
          {this.useNative ? null : (<span part="customInput"><span part="customInputCheckmark"></span></span>)}
          
          {this.labelPosition === 'right' && <span part='labelText'>{this.label}</span>}
        </label>
        
        <slot name='details'>{this.details && <div part='details'>{this.details}</div>}</slot>
        
        <slot name='errors'>{this.errors && <div part='errors'>{this.errors}</div>}</slot>
      </core_1.Host>);
    }
};
exports.CheckboxInput = CheckboxInput;
__decorate([
    (0, core_1.Prop)({ mutable: true }),
    __metadata("design:type", Boolean)
], CheckboxInput.prototype, "checked", void 0);
__decorate([
    (0, core_1.Prop)(),
    __metadata("design:type", String)
], CheckboxInput.prototype, "value", void 0);
__decorate([
    (0, core_1.Prop)(),
    __metadata("design:type", Boolean)
], CheckboxInput.prototype, "disabled", void 0);
__decorate([
    (0, core_1.Prop)(),
    __metadata("design:type", Boolean)
], CheckboxInput.prototype, "readonly", void 0);
__decorate([
    (0, core_1.Prop)(),
    __metadata("design:type", String)
], CheckboxInput.prototype, "name", void 0);
__decorate([
    (0, core_1.Prop)(),
    __metadata("design:type", String)
], CheckboxInput.prototype, "label", void 0);
__decorate([
    (0, core_1.Prop)(),
    __metadata("design:type", String)
], CheckboxInput.prototype, "labelPosition", void 0);
__decorate([
    (0, core_1.Prop)(),
    __metadata("design:type", String)
], CheckboxInput.prototype, "details", void 0);
__decorate([
    (0, core_1.Prop)(),
    __metadata("design:type", String)
], CheckboxInput.prototype, "errors", void 0);
__decorate([
    (0, core_1.Prop)(),
    __metadata("design:type", Boolean)
], CheckboxInput.prototype, "useNative", void 0);
__decorate([
    (0, core_1.Event)(),
    __metadata("design:type", Object)
], CheckboxInput.prototype, "valueChange", void 0);
__decorate([
    (0, core_1.Event)(),
    __metadata("design:type", Object)
], CheckboxInput.prototype, "valueInput", void 0);
exports.CheckboxInput = CheckboxInput = __decorate([
    (0, core_1.Component)({
        tag: 'wab-checkbox-input',
        styleUrls: ['../../../commons/wab-input.css', 'checkbox-input.css'],
        shadow: true,
    })
], CheckboxInput);
//# sourceMappingURL=checkbox-input.js.map