import { newSpecPage } from '@stencil/core/testing';
import { TextInput } from '../text-input';

describe('text-input', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TextInput],
      html: `<wab-text-input></wab-text-input>`,
    });
    expect(page.root).toEqualHtml(`
      <wab-text-input class='wab-form-input-wrapper'>
        <mock:shadow-root>
           <slot name='label'></slot>
           <input id='wab-text-input' part='input' type='text'>
           <slot name='details'></slot>
           <slot name='errors'></slot>
        </mock:shadow-root>
      </wab-text-input>
    `);
  });
});
