import { newE2EPage } from '@stencil/core/testing';

describe('text-input', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<text-input></text-input>');

    const element = await page.find('text-input');
    expect(element).toHaveClass('hydrated');
  });
});
