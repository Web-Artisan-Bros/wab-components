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
const select_input_1 = require("../select-input");
describe('select-input', () => {
    it('renders', () => __awaiter(void 0, void 0, void 0, function* () {
        const page = yield (0, testing_1.newSpecPage)({
            components: [select_input_1.SelectInput],
            html: `<select-input></select-input>`,
        });
        expect(page.root).toEqualHtml(`
      <select-input>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </select-input>
    `);
    }));
});
//# sourceMappingURL=select-input.spec.js.map