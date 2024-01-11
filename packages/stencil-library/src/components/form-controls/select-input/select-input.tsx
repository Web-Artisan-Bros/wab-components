import { Component, Host, h, Prop, Event, EventEmitter, State, Watch } from '@stencil/core'
import FormComponentInterface from '../../../interfaces/FormComponentInterface'
import { getComponentId, partName } from '../../../utils/utils'
import { Label as WabLabel } from '../partials/Label'

export interface SelectOption {
  label: string
  value: string
}

@Component({
  tag: 'wab-select-input',
  styleUrls: ['../../../commons/wab-input.css', 'select-input.css'],
  shadow: true,
})
export class SelectInput implements FormComponentInterface {
  /**
   * The input value
   * if multiple is true, value is a string separated by commas
   * @type {string}
   */
  @Prop({ mutable: true }) value: any
  @Prop() placeholder: string
  @Prop() disabled: boolean = false
  @Prop() readonly: boolean = false
  @Prop() name!: string
  @Prop() label: string
  @Prop() labelPosition: 'top' | 'bottom' = 'top'
  @Prop() details: string
  @Prop() errors: string
  @Prop() options: { label: string, value: string }[]
  @Prop() multiple: boolean = false
  @Prop({ mutable: true }) initialValue
  
  @State() focused: boolean = false
  
  @Event() valueChange: EventEmitter<string | string[]>
  @Event() valueInput: EventEmitter<string | string[]>
  
  @State() selectedOptions: SelectOption[] = []
  @State() inputValue: string
  @State() hoverOption: SelectOption
  @State() isDropdownOpen: boolean = false
  @State() dropdownEl: HTMLElement
  
  get id () {
    return getComponentId(this.name)
  }
  
  componentWillLoad (): Promise<void> | void {
    this.initialValue = this.initialValue ?? this.value
    this.onValueChanged(this.value)
  }
  
  componentDidLoad () {
    this.dropdownEl.addEventListener('animationend', () => {
      this.dropdownEl.classList.toggle('dropdown-close', false)
    })
  }
  
  /**
   * When the value changes, update the selectedOptions and the input value
   * @param newValue
   */
  @Watch('value')
  onValueChanged (newValue: string | string[]) {
    console.log('onValueChanged', newValue)
    // Because the value can be a string separated by commas, we need to split it
    if (this.multiple) {
      this.selectedOptions = this.options.filter(option => {
        if (newValue instanceof Array) {
          return newValue.includes(option.value)
        } else {
          return newValue.split(',').includes(option.value)
        }
      })
    } else {
      this.selectedOptions = this.options.filter(option => option.value === newValue)
    }
    
    this.updateInputValue()
  }
  
  onOptionSelect (option: SelectOption) {
    if (!option) return
    
    if (!this.multiple) {
      this.selectedOptions = [option]
      
      this.closeDropdown()
    } else {
      const alreadySelected = this.selectedOptions?.find(o => o.value === option.value)
      
      if (alreadySelected) {
        this.selectedOptions = this.selectedOptions.filter(o => o.value !== option.value)
      } else {
        this.selectedOptions = [...this.selectedOptions, option]
      }
    }
    
    this.updateInputValue()
    this.emitValueChange()
  }
  
  onKeyUp (e: KeyboardEvent) {
    const lastSelectedOption = this.selectedOptions[this.selectedOptions.length - 1]
    const currentIndex = this.options.findIndex(option => option.value === (this.hoverOption?.value ?? lastSelectedOption?.value))
    let nextOptionIndex: number
    
    if (!this.isDropdownOpen) return
    console.log(e)
    switch (e.code) {
      case 'ArrowDown':
        nextOptionIndex = currentIndex + 1
        break
      case 'ArrowUp':
        nextOptionIndex = currentIndex - 1
        break
      case 'Enter':
      case 'Space':
        this.onOptionSelect(this.hoverOption)
        return
      default:
        return
    }
    
    if (nextOptionIndex < 0) nextOptionIndex = this.options.length - 1
    if (nextOptionIndex >= this.options.length) nextOptionIndex = 0
    
    this.hoverOption = this.options[nextOptionIndex]
  }
  
  toggleFocus (e, isFocused: boolean) {
    e.preventDefault()
    
    // console.log(e)
    // console.log('toggleFocus', isFocused)
    
    // gestire animazione tramite js aspettando che questa sia completa
    this.isDropdownOpen = isFocused
    
    this.focused = isFocused
    
    this.dropdownEl.classList.toggle('dropdown-open', this.isDropdownOpen)
    this.dropdownEl.classList.toggle('dropdown-close', !this.isDropdownOpen)
    
    if (this.isDropdownOpen) {
      this.dropdownEl.focus()
    }
  }
  
  /**
   * Update the internal input value based on the selected options
   */
  updateInputValue () {
    if (this.selectedOptions.length === 0) {
      this.inputValue = null
      
    } else if (this.selectedOptions.length === 1) {
      this.inputValue = this.selectedOptions[0].label
      
    } else {
      this.inputValue = this.selectedOptions.map(option => option.label).join(', ')
      
    }
  }
  
  /**
   * Emit the valueChange event
   * and update the "value" property
   */
  emitValueChange () {
    const toEmit = this.multiple
      ? this.selectedOptions.map(o => o.value)
      : this.selectedOptions.map(option => option.value).join(',')
    
    this.value = toEmit
    this.valueInput.emit(toEmit)
    this.valueChange.emit(toEmit)
  }
  
  closeDropdown () {
    this.isDropdownOpen = false
    this.hoverOption = null;
    this.focused = false;
  }
  
  render() {
    return (
      <Host class="wab-form-control">
        {this.labelPosition === 'top' &&
            <WabLabel focused={this.focused} hasValue={!!this.value} id={this.id} label={this.label}/>}
        
        <div part={partName('input-wrapper', this.focused, !!this.value)} id={this.id} tabindex="0"
             onFocusin={(e) => this.toggleFocus(e, true)}
             onFocusout={(e) => this.toggleFocus(e, false)}
             onKeyUp={e => this.onKeyUp(e)}
             class={{ 'focus': this.isDropdownOpen }}
        >
          <div part="input"
               onFocusin={e => e.stopPropagation()}
               onFocusout={e => e.stopPropagation()}
               class={{ 'placeholder': !this.inputValue }}
          >{this.inputValue ?? this.placeholder ?? '\xa0'}</div>
          
          <ul part="dropdown" ref={(e) => this.dropdownEl = e}>
            {this.options?.map(option => (
              <li part="dropdown-item"
                  key={option.value}
                  data-value={option.value}
                  onClick={() => this.onOptionSelect(option)}
                  class={{
                    'selected': !!this.selectedOptions?.find(o => o.value === option.value),
                    'hover': this.hoverOption?.value === option.value
                  }}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
        
        {this.labelPosition === 'bottom' &&
            <WabLabel focused={this.focused} hasValue={!!this.value} id={this.id} label={this.label}/>}
        
        <slot name="details">{this.details && <div part="details">{this.details}</div>}</slot>
        
        <slot name="errors">{this.errors && <div part="errors">{this.errors}</div>}</slot>
      </Host>
    );
  }

}
