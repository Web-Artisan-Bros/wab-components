"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getComponentId = exports.format = void 0;
function format(first, middle, last) {
    return (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '');
}
exports.format = format;
function getComponentId(name) {
    return 'wab-' + (name ? (name + '-') : '') + 'form-input';
}
exports.getComponentId = getComponentId;
//# sourceMappingURL=utils.js.map