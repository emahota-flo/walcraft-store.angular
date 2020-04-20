import {browser, by, element} from 'protractor';

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  navigateToShoppingCart(): Promise<unknown> {
    return browser.get(browser.baseUrl + 'shopping-cart') as Promise<unknown>;
  }

  getProducts() {
    return element.all(by.css('mat-card'));
  }

  getTitleText(): Promise<string> {
    return element(by.css('.toolbar-title')).getText() as Promise<string>;
  }
}
