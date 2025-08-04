import test, { expect, Locator, Page } from '@playwright/test';

interface Elements {
  locator: (page: Page) => Locator;
  name: string;
  text?: string;
  attribute?: {
    type: string;
    value: string;
  };
}

export class MainPage {
  readonly page: Page;
  readonly elements: Elements[];

  constructor(page: Page) {
    this.page = page;
    this.elements = [
      {
        locator: (page) => page.getByRole('link', { name: 'Playwright logo Playwright' }),
        name: 'Playwright logo',
      },
      {
        locator: (page) => page.getByRole('link', { name: 'Docs' }),
        name: 'Docs',
      },
      {
        locator: (page) => page.getByRole('link', { name: 'API' }),
        name: 'API',
      },
      {
        locator: (page) => page.getByRole('button', { name: 'Node.js' }),
        name: 'Node.js',
      },
      {
        locator: (page) => page.getByRole('link', { name: 'Community' }),
        name: 'Community',
      },
      {
        locator: (page) => page.getByRole('link', { name: 'GitHub repository' }),
        name: 'GH',
      },
      {
        locator: (page) => page.getByRole('link', { name: 'Discord server' }),
        name: 'DS',
      },
    ];
  }
  async openMainPage() {
    await this.page.goto('https://playwright.dev/');
  }
  async checkElenemt() {
    for (const { locator, name } of this.elements) {
      test.step(`Проверка отображения элемента ${name}`, async () => {
        await expect.soft(locator(this.page)).toBeVisible();
      });
    }
  }
}
