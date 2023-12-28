"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WabTextInput = exports.WabSelectInput = exports.WabFormBuilder = exports.WabCheckboxInput = void 0;
const utils_1 = require("./vue-component-lib/utils");
exports.WabCheckboxInput = (0, utils_1.defineContainer)('wab-checkbox-input', undefined, [
    'checked',
    'value',
    'disabled',
    'readonly',
    'name',
    'label',
    'labelPosition',
    'details',
    'errors',
    'useNative',
    'valueChange',
    'valueInput'
]);
exports.WabFormBuilder = (0, utils_1.defineContainer)('wab-form-builder', undefined, [
    'action',
    'method',
    'useAjax',
    'schema',
    'loading',
    'wabBeforeSubmit',
    'wabSubmit',
    'wabAfterSubmit',
    'wabSubmitError',
    'wabBeforeReset',
    'wabAfterReset',
    'wabValidationErrors'
]);
exports.WabSelectInput = (0, utils_1.defineContainer)('wab-select-input', undefined, [
    'value',
    'placeholder',
    'disabled',
    'readonly',
    'name',
    'label',
    'details',
    'errors',
    'options',
    'multiple',
    'initialValue',
    'valueChange',
    'valueInput'
]);
exports.WabTextInput = (0, utils_1.defineContainer)('wab-text-input', undefined, [
    'value',
    'placeholder',
    'type',
    'disabled',
    'readonly',
    'name',
    'label',
    'details',
    'errors',
    'valueChange',
    'valueInput'
]);
//# sourceMappingURL=components.js.map