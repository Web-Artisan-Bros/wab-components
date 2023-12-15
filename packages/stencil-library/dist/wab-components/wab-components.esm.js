import { B as BUILD, c as consoleDevInfo, H, d as doc, N as NAMESPACE, p as promiseResolve, b as bootstrapLazy } from './index-f60b9468.js';
export { s as setNonce } from './index-f60b9468.js';
import { g as globalScripts } from './app-globals-0f993ce5.js';

/*
 Stencil Client Patch Browser v4.8.2 | MIT Licensed | https://stenciljs.com
 */
const patchBrowser = () => {
    // NOTE!! This fn cannot use async/await!
    if (BUILD.isDev && !BUILD.isTesting) {
        consoleDevInfo('Running in development mode.');
    }
    if (BUILD.cloneNodeFix) {
        // opted-in to polyfill cloneNode() for slot polyfilled components
        patchCloneNodeFix(H.prototype);
    }
    const scriptElm = BUILD.scriptDataOpts
        ? Array.from(doc.querySelectorAll('script')).find((s) => new RegExp(`\/${NAMESPACE}(\\.esm)?\\.js($|\\?|#)`).test(s.src) ||
            s.getAttribute('data-stencil-namespace') === NAMESPACE)
        : null;
    const importMeta = import.meta.url;
    const opts = BUILD.scriptDataOpts ? (scriptElm || {})['data-opts'] || {} : {};
    if (importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
    }
    return promiseResolve(opts);
};
const patchCloneNodeFix = (HTMLElementPrototype) => {
    const nativeCloneNodeFn = HTMLElementPrototype.cloneNode;
    HTMLElementPrototype.cloneNode = function (deep) {
        if (this.nodeName === 'TEMPLATE') {
            return nativeCloneNodeFn.call(this, deep);
        }
        const clonedNode = nativeCloneNodeFn.call(this, false);
        const srcChildNodes = this.childNodes;
        if (deep) {
            for (let i = 0; i < srcChildNodes.length; i++) {
                // Node.ATTRIBUTE_NODE === 2, and checking because IE11
                if (srcChildNodes[i].nodeType !== 2) {
                    clonedNode.appendChild(srcChildNodes[i].cloneNode(true));
                }
            }
        }
        return clonedNode;
    };
};

patchBrowser().then(options => {
  globalScripts();
  return bootstrapLazy([["wab-form-builder",[[4,"wab-form-builder",{"action":[1],"method":[1],"useAjax":[16],"schema":[1],"loading":[1028],"formData":[32],"formSchema":[32],"formValidator":[32],"submitComplete":[32],"showAfterSubmitEl":[32],"getFormData":[64]},null,{"schema":["onSchemaChange"],"formData":["onFormDataChange"],"submitComplete":["onAfterSubmitSlotChange"]}]]],["wab-select-input",[[1,"wab-select-input"]]],["wab-checkbox-input",[[1,"wab-checkbox-input",{"checked":[1028],"value":[1],"disabled":[4],"readonly":[4],"name":[1],"label":[1],"labelPosition":[1,"label-position"],"details":[1],"errors":[1],"useNative":[4,"use-native"]}]]],["wab-text-input",[[1,"wab-text-input",{"value":[1025],"placeholder":[1],"type":[1],"disabled":[4],"readonly":[4],"name":[1],"label":[1],"details":[1],"errors":[1]}]]]], options);
});

//# sourceMappingURL=wab-components.esm.js.map