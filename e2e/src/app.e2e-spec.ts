import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display Wallcraft Store', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Wallcraft Store');
  });

  it('should be 20 cards', () => {
    page.navigateTo();
    expect(page.getProducts().count()).toBe(20);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
