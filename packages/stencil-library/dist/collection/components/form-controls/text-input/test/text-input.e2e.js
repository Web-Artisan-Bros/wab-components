import { newE2EPage } from "@stencil/core/testing";
describe('text-input', () => {
    let page;
    let elm;
    beforeEach(async () => {
        page = await newE2EPage({
            html: `<wab-text-input></wab-text-input>`,
        });
        elm = await page.find('wab-text-input');
    });
    it('renders only the input and default slots', async () => {
        expect(elm).toHaveClass('hydrated');
        expect(elm.shadowRoot).toEqualHtml(`
      <slot name='label'></slot>
      <input part='input' type='text' id='wab-form-input'>
      <slot name='details'></slot>
      <slot name='errors'></slot>
    `);
    });
    it('should have a label', async () => {
        elm.setAttribute('label', 'Test Label');
        await page.waitForChanges();
        const label = await page.find('wab-text-input >>> label');
        expect(label).not.toBeNull();
        expect(label).toEqualText('Test Label');
    });
    it('should have a description', async () => {
        elm.setAttribute('details', 'Something to inform the user');
        await page.waitForChanges();
        const details = await page.find('wab-text-input >>> [part="details"]');
        expect(details).not.toBeNull();
        expect(details).toEqualText('Something to inform the user');
    });
    it('should have an error', async () => {
        elm.setAttribute('errors', 'Something bad happened');
        await page.waitForChanges();
        const errors = await page.find('wab-text-input >>> [part="errors"]');
        expect(errors).not.toBeNull();
        expect(errors).toEqualText('Something bad happened');
    });
});
//# sourceMappingURL=text-input.e2e.js.map
