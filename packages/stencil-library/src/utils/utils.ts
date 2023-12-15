export function format(first: string, middle: string, last: string): string {
  return (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '');
}

export function getComponentId(name?:string): string {
  return 'wab-' + (name ? (name + '-') : '') + 'form-input';
}
