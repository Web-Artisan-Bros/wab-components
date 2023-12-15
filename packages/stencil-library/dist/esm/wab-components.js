import { p as promiseResolve, b as bootstrapLazy } from './index-dc609f77.js';
export { s as setNonce } from './index-dc609f77.js';

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
  return bootstrapLazy([["select-input",[[1,"select-input"]]],["wab-checkbox-input_3",[[4,"wab-form-builder",{"action":[1],"method":[1],"useAjax":[16],"schema":[1],"loading":[1028],"formData":[32],"formSchema":[32],"formValidator":[32],"getFormData":[64]},null,{"schema":["onSchemaChange"],"formData":["onFormDataChange"]}],[1,"wab-checkbox-input",{"checked":[1028],"value":[1],"disabled":[4],"readonly":[4],"name":[1],"label":[1],"details":[1],"errors":[1]}],[1,"wab-text-input",{"value":[1025],"placeholder":[1],"type":[1],"disabled":[4],"readonly":[4],"name":[1],"label":[1],"details":[1],"errors":[1]}]]]], options);
});

//# sourceMappingURL=wab-components.js.map