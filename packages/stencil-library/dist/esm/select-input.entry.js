import { r as registerInstance, h, H as Host } from './index-dc609f77.js';

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