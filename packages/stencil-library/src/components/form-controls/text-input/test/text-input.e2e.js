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
describe('text-input', () => {
    let page;
    let elm;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        page = yield (0, testing_1.newE2EPage)({
            html: `<wab-text-input></wab-text-input>`,
        });
        elm = yield page.find('wab-text-input');
    }));
    it('renders only the input and default slots', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(elm).toHaveClass('hydrated');
        expect(elm.shadowRoot).toEqualHtml(`
      <slot name='label'></slot>
      <input part='input' type='text' id='wab-form-input'>
      <slot name='details'></slot>
      <slot name='errors'></slot>
    `);
    }));
    it('should have a label', () => __awaiter(void 0, void 0, void 0, function* () {
        elm.setAttribute('label', 'Test Label');
        yield page.waitForChanges();
        const label = yield page.find('wab-text-input >>> label');
        expect(label).not.toBeNull();
        expect(label).toEqualText('Test Label');
    }));
    it('should have a description', () => __awaiter(void 0, void 0, void 0, function* () {
        elm.setAttribute('details', 'Something to inform the user');
        yield page.waitForChanges();
        const details = yield page.find('wab-text-input >>> [part="details"]');
        expect(details).not.toBeNull();
        expect(details).toEqualText('Something to inform the user');
    }));
    it('should have an error', () => __awaiter(void 0, void 0, void 0, function* () {
        elm.setAttribute('errors', 'Something bad happened');
        yield page.waitForChanges();
        const errors = yield page.find('wab-text-input >>> [part="errors"]');
        expect(errors).not.toBeNull();
        expect(errors).toEqualText('Something bad happened');
    }));
});
//# sourceMappingURL=text-input.e2e.js.map