'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-c49f6a6e.js');

/*
 Stencil Client Patch Browser v4.8.2 | MIT Licensed | https://stenciljs.com
 */
const patchBrowser = () => {
    const importMeta = (typeof document === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : (document.currentScript && document.currentScript.src || new URL('wab-components.cjs.js', document.baseURI).href));
    const opts = {};
    if (importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
    }
    return index.promiseResolve(opts);
};

patchBrowser().then(options => {
  return index.bootstrapLazy([["wab-checkbox-input_4.cjs",[[4,"wab-form-builder",{"action":[1],"method":[1],"useAjax":[16],"schema":[1],"loading":[1028],"formData":[32],"formSchema":[32],"formValidator":[32],"submitComplete":[32],"showAfterSubmitEl":[32],"getFormData":[64]},null,{"schema":["onSchemaChange"],"formData":["onFormDataChange"],"submitComplete":["onAfterSubmitSlotChange"]}],[1,"wab-checkbox-input",{"checked":[1028],"value":[1],"disabled":[4],"readonly":[4],"name":[1],"label":[1],"labelPosition":[1,"label-position"],"details":[1],"errors":[1],"useNative":[4,"use-native"]}],[1,"wab-select-input",{"value":[1032],"placeholder":[1],"disabled":[4],"readonly":[4],"name":[1],"label":[1],"details":[1],"errors":[1],"options":[16],"multiple":[4],"initialValue":[1032,"initial-value"],"selectedOptions":[32],"inputValue":[32],"hoverOption":[32],"isDropdownOpen":[32],"dropdownEl":[32]},null,{"value":["onValueChanged"]}],[1,"wab-text-input",{"value":[1025],"placeholder":[1],"type":[1],"disabled":[4],"readonly":[4],"name":[1],"label":[1],"details":[1],"errors":[1]}]]]], options);
});

exports.setNonce = index.setNonce;

//# sourceMappingURL=wab-components.cjs.js.map