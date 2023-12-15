import { Host, h } from "@stencil/core";
export class SelectInput {
    render() {
        return (h(Host, null, h("slot", null)));
    }
    static get is() { return "select-input"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["select-input.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["select-input.css"]
        };
    }
}
//# sourceMappingURL=select-input.js.map
