'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-c6146eac.js');

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
  return index.bootstrapLazy([["select-input.cjs",[[1,"select-input"]]],["wab-checkbox-input_3.cjs",[[4,"wab-form-builder",{"action":[1],"method":[1],"useAjax":[16],"schema":[1],"loading":[1028],"formData":[32],"formSchema":[32],"formValidator":[32],"getFormData":[64]},null,{"schema":["onSchemaChange"],"formData":["onFormDataChange"]}],[1,"wab-checkbox-input",{"checked":[1028],"value":[1],"disabled":[4],"readonly":[4],"name":[1],"label":[1],"details":[1],"errors":[1]}],[1,"wab-text-input",{"value":[1025],"placeholder":[1],"type":[1],"disabled":[4],"readonly":[4],"name":[1],"label":[1],"details":[1],"errors":[1]}]]]], options);
});

exports.setNonce = index.setNonce;

//# sourceMappingURL=wab-components.cjs.js.map