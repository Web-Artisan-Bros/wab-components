import { newE2EPage } from "@stencil/core/testing";
describe('select-input', () => {
    it('renders', async () => {
        const page = await newE2EPage();
        await page.setContent('<select-input></select-input>');
        const element = await page.find('select-input');
        expect(element).toHaveClass('hydrated');
    });
});
//# sourceMappingURL=select-input.e2e.js.map
