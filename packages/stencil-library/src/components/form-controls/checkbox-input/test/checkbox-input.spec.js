"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@stencil/core/testing");
const checkbox_input_1 = require("../checkbox-input");
describe('checkbox-input', () => {
    it('renders', () => __awaiter(void 0, void 0, void 0, function* () {
        const page = yield (0, testing_1.newSpecPage)({
            components: [checkbox_input_1.CheckboxInput],
            html: `<wab-checkbox-input></wab-checkbox-input>`,
        });
        expect(page.root).toEqualHtml(`
      <wab-checkbox-input class='wab-form-input-wrapper'>
        <mock:shadow-root>
          <slot name='label'></slot>
          <input id='wab-form-input' part='input' type='checkbox'>
          <slot name='details'></slot>
          <slot name='errors'></slot>
        </mock:shadow-root>
      </wab-checkbox-input>
    `);
    }));
});
//# sourceMappingURL=checkbox-input.spec.js.map