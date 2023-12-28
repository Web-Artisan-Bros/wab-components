"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const react_output_target_1 = require("@stencil/react-output-target");
const vue_output_target_1 = require("@stencil/vue-output-target");
exports.config = {
    namespace: 'wab-components',
    globalStyle: "src/globals/app.css",
    hashFileNames: false,
    buildEs5: 'prod',
    outputTargets: [
        {
            type: 'dist-custom-elements',
            dir: 'custom-element',
            empty: true
        },
        {
            type: 'dist',
            esmLoaderPath: '../loader',
        },
        {
            type: 'docs-readme',
        },
        {
            type: 'www',
            serviceWorker: null,
        },
        (0, react_output_target_1.reactOutputTarget)({
            componentCorePackage: 'wab-components',
            proxiesFile: '../react-library/lib/components/stencil-generated/index.ts',
        }),
        (0, vue_output_target_1.vueOutputTarget)({
            componentCorePackage: 'wab-components',
            proxiesFile: '../vue-library/lib/components.ts',
        }),
    ],
    testing: {
        browserHeadless: "new",
    },
    validatePrimaryPackageOutputTarget: true
};
//# sourceMappingURL=stencil.config.js.map