"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReactComponent = void 0;
const react_1 = require("react");
const utils_1 = require("./utils");
const createReactComponent = (tagName, ReactComponentContext, manipulatePropsFunction, defineCustomElement) => {
    if (defineCustomElement !== undefined) {
        defineCustomElement();
    }
    const displayName = (0, utils_1.dashToPascalCase)(tagName);
    const ReactComponent = class extends react_1.default.Component {
        constructor(props) {
            super(props);
            this.setComponentElRef = (element) => {
                this.componentEl = element;
            };
        }
        componentDidMount() {
            this.componentDidUpdate(this.props);
        }
        componentDidUpdate(prevProps) {
            (0, utils_1.attachProps)(this.componentEl, this.props, prevProps);
        }
        render() {
            const _a = this.props, { children, forwardedRef, style, className, ref } = _a, cProps = __rest(_a, ["children", "forwardedRef", "style", "className", "ref"]);
            let propsToPass = Object.keys(cProps).reduce((acc, name) => {
                const value = cProps[name];
                if (name.indexOf('on') === 0 && name[2] === name[2].toUpperCase()) {
                    const eventName = name.substring(2).toLowerCase();
                    if (typeof document !== 'undefined' && (0, utils_1.isCoveredByReact)(eventName)) {
                        acc[name] = value;
                    }
                }
                else {
                    const type = typeof value;
                    if (type === 'string' || type === 'boolean' || type === 'number') {
                        acc[(0, utils_1.camelToDashCase)(name)] = value;
                    }
                }
                return acc;
            }, {});
            if (manipulatePropsFunction) {
                propsToPass = manipulatePropsFunction(this.props, propsToPass);
            }
            const newProps = Object.assign(Object.assign({}, propsToPass), { ref: (0, utils_1.mergeRefs)(forwardedRef, this.setComponentElRef), style });
            return (0, react_1.createElement)(tagName, newProps, children);
        }
        static get displayName() {
            return displayName;
        }
    };
    if (ReactComponentContext) {
        ReactComponent.contextType = ReactComponentContext;
    }
    return (0, utils_1.createForwardRef)(ReactComponent, displayName);
};
exports.createReactComponent = createReactComponent;
//# sourceMappingURL=createComponent.js.map