import { defineContainer } from './vue-component-lib/utils';
export const WabCheckboxInput = defineContainer('wab-checkbox-input', undefined, [
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
export const WabFormBuilder = defineContainer('wab-form-builder', undefined, [
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
export const WabSelectInput = defineContainer('wab-select-input', undefined, [
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
export const WabTextInput = defineContainer('wab-text-input', undefined, [
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