'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-c6146eac.js');

const selectInputCss = ":host{display:block}";

const SelectInput = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    render() {
        return (index.h(index.Host, null, index.h("slot", null)));
    }
};
SelectInput.style = selectInputCss;

exports.select_input = SelectInput;

//# sourceMappingURL=select-input.cjs.entry.js.map