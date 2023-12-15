import { r as registerInstance, h, a as Host } from './index-f60b9468.js';

const selectInputCss = ":host{display:block}";

const SelectInput = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        return (h(Host, null, h("slot", null)));
    }
};
SelectInput.style = selectInputCss;

export { SelectInput as select_input };

//# sourceMappingURL=select-input.entry.js.map