import { newE2EPage } from '@stencil/core/testing';

describe('checkbox-input', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<wab-checkbox-input></wab-checkbox-input>');

    const element = await page.find('wab-checkbox-input');
    expect(element).toHaveClass('hydrated');
  });
});
