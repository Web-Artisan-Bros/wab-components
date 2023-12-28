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
describe('form-builder', () => {
    let page;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        page = yield (0, testing_1.newE2EPage)();
    }));
    it('renders', () => __awaiter(void 0, void 0, void 0, function* () {
        yield page.setContent('<wab-form-builder></wab-form-builder>');
        const element = yield page.find('wab-form-builder');
        expect(element).toHaveClass('hydrated');
        expect(element.shadowRoot).toEqualHtml(`<form>
        <slot></slot>
        <slot name='actions'>
          <button part='resetBtn' type='reset'>Reset</button>
          <button part='submitBtn' type='submit'>Submit</button>
      </slot>
      </form>`);
    }));
});
//# sourceMappingURL=form-builder.e2e.js.map