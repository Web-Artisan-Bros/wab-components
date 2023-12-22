# wab-form-builder



<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description | Type                      | Default     |
| --------- | --------- | ----------- | ------------------------- | ----------- |
| `action`  | `action`  |             | `string`                  | `undefined` |
| `loading` | `loading` |             | `boolean`                 | `false`     |
| `method`  | `method`  |             | `string`                  | `undefined` |
| `schema`  | `schema`  |             | `WabFormSchema \| string` | `undefined` |
| `useAjax` | --        |             | `Boolean`                 | `false`     |


## Events

| Event                 | Description | Type                                                                       |
| --------------------- | ----------- | -------------------------------------------------------------------------- |
| `wabAfterReset`       |             | `CustomEvent<any>`                                                         |
| `wabAfterSubmit`      |             | `CustomEvent<any>`                                                         |
| `wabBeforeReset`      |             | `CustomEvent<any>`                                                         |
| `wabBeforeSubmit`     |             | `CustomEvent<any>`                                                         |
| `wabSubmit`           |             | `CustomEvent<any>`                                                         |
| `wabSubmitError`      |             | `CustomEvent<any>`                                                         |
| `wabValidationErrors` |             | `CustomEvent<{ formData: Record<string, any>; errors: ValidationError; }>` |


## Methods

### `getFormData() => Promise<any>`

Return the actual form data

#### Returns

Type: `Promise<any>`




## Shadow Parts

| Part          | Description |
| ------------- | ----------- |
| `"resetbtn"`  |             |
| `"submitbtn"` |             |


## Dependencies

### Depends on

- [wab-text-input](../form-controls/text-input)
- [wab-checkbox-input](../form-controls/checkbox-input)
- [wab-select-input](../form-controls/select-input)

### Graph
```mermaid
graph TD;
  wab-form-builder --> wab-text-input
  wab-form-builder --> wab-checkbox-input
  wab-form-builder --> wab-select-input
  style wab-form-builder fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
