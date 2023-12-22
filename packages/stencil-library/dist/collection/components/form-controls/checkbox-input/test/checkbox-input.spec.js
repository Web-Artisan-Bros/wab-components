import { newSpecPage } from "@stencil/core/testing";
import { CheckboxInput } from "../checkbox-input";
describe('checkbox-input', () => {
    it('renders', async () => {
        const page = await newSpecPage({
            components: [CheckboxInput],
            html: `<wab-checkbox-input></wab-checkbox-input>`,
        });
        expect(page.root).toEqualHtml(`
      <wab-checkbox-input class='wab-form-input-wrapper'>
        <mock:shadow-root>
          <slot name='label'></slot>
          <input id='wab-form-input' part='input' type='checkbox'>
          <slot name='details'></slot>
          <slot name='errors'></slot>
        </mock:shadow-root>
      </wab-checkbox-input>
    `);
    });
});
//# sourceMappingURL=checkbox-input.spec.js.map
