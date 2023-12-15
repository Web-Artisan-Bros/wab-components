import { E2EPage, newE2EPage } from '@stencil/core/testing';

describe('form-builder', () => {
  let page: E2EPage;
  
  beforeEach(async () => {
    page = await newE2EPage();
  });
  
  it('renders', async () => {
    await page.setContent('<wab-form-builder></wab-form-builder>');
    const element = await page.find('wab-form-builder');
    
    expect(element).toHaveClass('hydrated');
    expect(element.shadowRoot).toEqualHtml(`<form>
        <slot></slot>
        <slot name='actions'>
          <button part='resetBtn' type='reset'>Reset</button>
          <button part='submitBtn' type='submit'>Submit</button>
      </slot>
      </form>`)
  });
});
