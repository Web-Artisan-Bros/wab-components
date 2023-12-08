import { newSpecPage } from '@stencil/core/testing';
import { FormBuilder } from '../form-builder';

describe('form-builder', () => {
  it('should throw an error due to missing schema', async () => {
    const page = async () => await newSpecPage({
      components: [FormBuilder],
      html: `<wab-form-builder></wab-form-builder>`,
    });
    
    await expect(page()).rejects.toThrowError('You must provide a schema to the form');
  });
  
  it('should throw an error due to missing schema', async () => {
    const schema = {
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Name',
        },
      ],
    };
    
    const page = await newSpecPage({
      components: [FormBuilder],
      html: `<wab-form-builder schema='${JSON.stringify(schema)}'></wab-form-builder>`,
    });
    
    await expect(page.root).toEqualHtml(`
      <wab-form-builder>
      </wab-form-builder>
    `)
  });
});
