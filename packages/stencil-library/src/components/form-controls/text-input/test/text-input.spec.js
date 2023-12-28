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
const text_input_1 = require("../text-input");
describe('text-input', () => {
    it('renders', () => __awaiter(void 0, void 0, void 0, function* () {
        const page = yield (0, testing_1.newSpecPage)({
            components: [text_input_1.TextInput],
            html: `<wab-text-input></wab-text-input>`,
        });
        expect(page.root).toEqualHtml(`
      <wab-text-input class='wab-form-input-wrapper'>
        <mock:shadow-root>
           <slot name='label'></slot>
           <input id='wab-form-input' part='input' type='text'>
           <slot name='details'></slot>
           <slot name='errors'></slot>
        </mock:shadow-root>
      </wab-text-input>
    `);
    }));
});
//# sourceMappingURL=text-input.spec.js.map