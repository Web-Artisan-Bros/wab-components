"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineCustomElement = exports.createForwardRef = exports.mergeRefs = exports.setRef = void 0;
const react_1 = require("react");
const setRef = (ref, value) => {
    if (typeof ref === 'function') {
        ref(value);
    }
    else if (ref != null) {
        ref.current = value;
    }
};
exports.setRef = setRef;
const mergeRefs = (...refs) => {
    return (value) => {
        refs.forEach((ref) => {
            (0, exports.setRef)(ref, value);
        });
    };
};
exports.mergeRefs = mergeRefs;
const createForwardRef = (ReactComponent, displayName) => {
    const forwardRef = (props, ref) => {
        return <ReactComponent {...props} forwardedRef={ref}/>;
    };
    forwardRef.displayName = displayName;
    return react_1.default.forwardRef(forwardRef);
};
exports.createForwardRef = createForwardRef;
const defineCustomElement = (tagName, customElement) => {
    if (customElement !== undefined && typeof customElements !== 'undefined' && !customElements.get(tagName)) {
        customElements.define(tagName, customElement);
    }
};
exports.defineCustomElement = defineCustomElement;
__exportStar(require("./attachProps"), exports);
__exportStar(require("./case"), exports);
//# sourceMappingURL=index.js.map