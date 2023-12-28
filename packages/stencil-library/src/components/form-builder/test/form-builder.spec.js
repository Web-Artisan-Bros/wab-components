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
const form_builder_1 = require("../form-builder");
describe('form-builder', () => {
    it('should throw an error due to missing schema', () => __awaiter(void 0, void 0, void 0, function* () {
        const page = () => __awaiter(void 0, void 0, void 0, function* () {
            return yield (0, testing_1.newSpecPage)({
                components: [form_builder_1.FormBuilder],
                html: `<wab-form-builder></wab-form-builder>`,
            });
        });
        yield expect(page()).rejects.toThrowError('You must provide a schema to the form');
    }));
});
//# sourceMappingURL=form-builder.spec.js.map