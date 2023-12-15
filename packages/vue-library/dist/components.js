import { defineContainer } from './vue-component-lib/utils';
export const SelectInput = defineContainer('select-input', undefined);
export const WabCheckboxInput = defineContainer('wab-checkbox-input', undefined, [
    'checked',
    'value',
    'disabled',
    'readonly',
    'name',
    'label',
    'details',
    'errors',
    'valueChange',
    'valueInput'
]);
export const WabFormBuilder = defineContainer('wab-form-builder', undefined, [
    'action',
    'method',
    'useAjax',
    'schema',
    'loading'
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