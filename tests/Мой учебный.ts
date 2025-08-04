import { test, expect } from '@playwright/test';

const elements = [
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

test('Проверка отображения элементов навигации хедера', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  elements.forEach(({ locator, name }) => {
    test.step(`Проверка отображения элемента ${name}`, async () => {
      await expect.soft(locator(page)).toBeVisible();
    });
  });
});

//   await expect.soft(page.getByRole('link', { name: 'Docs' })).toBeVisible();
//   await expect.soft(page.getByRole('link', { name: 'API' })).toBeVisible();
//   await expect.soft(page.getByRole('button', { name: 'Node.js' })).toBeVisible();
//   await expect.soft(page.getByRole('link', { name: 'Community' })).toBeVisible();
//   await expect.soft(page.getByRole('link', { name: 'GitHub repository' })).toBeVisible();
//   await expect.soft(page.getByRole('link', { name: 'Discord server' })).toBeVisible();
//   await expect
//     .soft(page.getByRole('button', { name: 'Switch between dark and light' }))
//     .toBeVisible();
//   await expect.soft(page.getByRole('button', { name: 'Search (Ctrl+K)' })).toBeVisible();
// });

test('Проверка названий элементов навигации', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page.getByRole('link', { name: 'Playwright logo Playwright' })).toContainText(
    'Playwright',
  );

  await expect(page.getByRole('link', { name: 'Docs' })).toContainText('Docs');
  await expect(page.getByRole('link', { name: 'API' })).toContainText('API');
  await expect(page.getByRole('button', { name: 'Node.js' })).toContainText('Node.js');
  await expect(page.getByRole('link', { name: 'Community' })).toContainText('Community');
});

test('Проверка href', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page.getByRole('link', { name: 'Playwright logo Playwright' })).toHaveAttribute(
    'href',
    '/',
  );

  await expect(page.getByRole('link', { name: 'Docs' })).toHaveAttribute('href', '/docs/intro');
  await expect(page.getByRole('link', { name: 'API' })).toHaveAttribute(
    'href',
    '/docs/api/class-playwright',
  );
  await expect(page.getByRole('link', { name: 'Community' })).toHaveAttribute(
    'href',
    '/community/welcome',
  );
  await expect(page.getByRole('link', { name: 'GitHub repository' })).toHaveAttribute(
    'href',
    'https://github.com/microsoft/playwright',
  );
  await expect(page.getByRole('link', { name: 'Discord server' })).toHaveAttribute(
    'href',
    'https://aka.ms/playwright/discord',
  );
});
