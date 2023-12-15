function format(first, middle, last) {
    return (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '');
}
function getComponentId(name) {
    return 'wab-' + (name ? (name + '-') : '') + 'form-input';
}

export { getComponentId as g };

//# sourceMappingURL=utils-ea428fc4.js.map