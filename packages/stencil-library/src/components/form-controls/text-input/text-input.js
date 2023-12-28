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
exports.TextInput = void 0;
const core_1 = require("@stencil/core");
const utils_1 = require("../../../utils/utils");
let TextInput = class TextInput {
    constructor() {
        this.type = 'text';
        this.disabled = false;
        this.readonly = false;
    }
    get id() {
        return (0, utils_1.getComponentId)(this.name);
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
    }
    render() {
        return (<core_1.Host class="wab-form-control">
        <slot name="label">
          {this.label && (<label part="label" htmlFor={this.id}>
              {this.label}
            </label>)}
        </slot>
        
        <input part='input' type={this.type} placeholder={this.placeholder} value={this.value} id={this.id} disabled={this.disabled} readonly={this.readonly} onInput={e => this.valueChangedHandler(e)} onChange={e => this.valueChangedHandler(e, 'change')}/>

        <slot name="details">{this.details && <div part="details">{this.details}</div>}</slot>

        <slot name="errors">{this.errors && <div part="errors">{this.errors}</div>}</slot>
      </core_1.Host>);
    }
};
exports.TextInput = TextInput;
__decorate([
    (0, core_1.Prop)({ mutable: true }),
    __metadata("design:type", String)
], TextInput.prototype, "value", void 0);
__decorate([
    (0, core_1.Prop)(),
    __metadata("design:type", String)
], TextInput.prototype, "placeholder", void 0);
__decorate([
    (0, core_1.Prop)(),
    __metadata("design:type", String)
], TextInput.prototype, "type", void 0);
__decorate([
    (0, core_1.Prop)(),
    __metadata("design:type", Boolean)
], TextInput.prototype, "disabled", void 0);
__decorate([
    (0, core_1.Prop)(),
    __metadata("design:type", Boolean)
], TextInput.prototype, "readonly", void 0);
__decorate([
    (0, core_1.Prop)(),
    __metadata("design:type", String)
], TextInput.prototype, "name", void 0);
__decorate([
    (0, core_1.Prop)(),
    __metadata("design:type", String)
], TextInput.prototype, "label", void 0);
__decorate([
    (0, core_1.Prop)(),
    __metadata("design:type", String)
], TextInput.prototype, "details", void 0);
__decorate([
    (0, core_1.Prop)(),
    __metadata("design:type", String)
], TextInput.prototype, "errors", void 0);
__decorate([
    (0, core_1.Event)(),
    __metadata("design:type", Object)
], TextInput.prototype, "valueChange", void 0);
__decorate([
    (0, core_1.Event)(),
    __metadata("design:type", Object)
], TextInput.prototype, "valueInput", void 0);
exports.TextInput = TextInput = __decorate([
    (0, core_1.Component)({
        tag: 'wab-text-input',
        styleUrls: ['text-input.css', '../../../commons/wab-input.css'],
        shadow: true,
    })
], TextInput);
//# sourceMappingURL=text-input.js.map