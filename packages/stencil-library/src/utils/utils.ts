export function format(first: string, middle: string, last: string): string {
  return (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '');
}

export function getComponentId(name?:string): string {
  return 'wab-' + (name ? (name + '-') : '') + 'form-input';
}

export function partName (root: string, focused: boolean, hasValue: boolean) {
  const part = [root]
  
  if (focused) {
    part.push('focus-within')
  }
  
  if (hasValue) {
    part.push('value-within')
  }
  
  return part.join(' ')
}
