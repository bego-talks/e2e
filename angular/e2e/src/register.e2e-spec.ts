import { AppPage } from './app.po';
import { browser, logging } from 'protractor';
import { initSandbox, checkinSandbox } from '../helpers/sandbox';
import { createFactory, Factory } from '../helpers/factory';

describe('Register', () => {
  let page: AppPage;
  let sandboxId: string;

  beforeEach(async (done) => {
    sandboxId = await initSandbox();
    page = new AppPage();
    done();
  });

  it('registers and logs in', async () => {
    await page.navigateTo();
    await page.navigation.register.click();
    expect(await page.currentUrl()).toContain('register');

    await page.register.name.sendKeys('Joe');
    await page.register.password.sendKeys('password');
    await page.register.submit.click();

    expect(await page.currentUrl()).not.toContain('register');
  });

  afterEach(async (done) => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE,
      } as logging.Entry)
    );

    await checkinSandbox(sandboxId);
    await browser.executeScript('window.localStorage.clear();');
    done();
  });
});
