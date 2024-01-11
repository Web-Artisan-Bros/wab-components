import { Component, Host, Prop, h } from '@stencil/core'

export function Label (props: { focused: boolean, hasValue: boolean, id: string, label: string }) {
  function getPart () {
    const part = ['label']
    
    if (props.focused) {
      part.push('focus-within')
    }
    
    if (props.hasValue) {
      part.push('value-within')
    }
    
    return part.join(' ')
  }
  
  return (
    <slot name="label">
      {props.label && <label part={getPart()} htmlFor={props.id} innerHTML={props.label}></label>}
    </slot>
  )
}
