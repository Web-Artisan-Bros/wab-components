export function format(first, middle, last) {
    return (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '');
}
export function getComponentId(name) {
    return 'wab-' + (name ? (name + '-') : '') + 'form-input';
}
//# sourceMappingURL=utils.js.map
