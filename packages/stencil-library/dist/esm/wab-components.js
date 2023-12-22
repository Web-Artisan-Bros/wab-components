import { p as promiseResolve, b as bootstrapLazy } from './index-31344b45.js';
export { s as setNonce } from './index-31344b45.js';

/*
 Stencil Client Patch Browser v4.8.2 | MIT Licensed | https://stenciljs.com
 */
const patchBrowser = () => {
    const importMeta = import.meta.url;
    const opts = {};
    if (importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
    }
    return promiseResolve(opts);
};

patchBrowser().then(options => {
  return bootstrapLazy([["wab-checkbox-input_4",[[4,"wab-form-builder",{"action":[1],"method":[1],"useAjax":[16],"schema":[1],"loading":[1028],"formData":[32],"formSchema":[32],"formValidator":[32],"submitComplete":[32],"showAfterSubmitEl":[32],"getFormData":[64]},null,{"schema":["onSchemaChange"],"formData":["onFormDataChange"],"submitComplete":["onAfterSubmitSlotChange"]}],[1,"wab-checkbox-input",{"checked":[1028],"value":[1],"disabled":[4],"readonly":[4],"name":[1],"label":[1],"labelPosition":[1,"label-position"],"details":[1],"errors":[1],"useNative":[4,"use-native"]}],[1,"wab-select-input",{"value":[1032],"placeholder":[1],"disabled":[4],"readonly":[4],"name":[1],"label":[1],"details":[1],"errors":[1],"options":[16],"multiple":[4],"initialValue":[1032,"initial-value"],"selectedOptions":[32],"inputValue":[32],"hoverOption":[32],"isDropdownOpen":[32],"dropdownEl":[32]},null,{"value":["onValueChanged"]}],[1,"wab-text-input",{"value":[1025],"placeholder":[1],"type":[1],"disabled":[4],"readonly":[4],"name":[1],"label":[1],"details":[1],"errors":[1]}]]]], options);
});

//# sourceMappingURL=wab-components.js.map