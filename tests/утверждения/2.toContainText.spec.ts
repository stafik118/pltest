import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://osstep.github.io/assertion_tocontaintext');
});

test('1. Проверка статического текста', async ({ page }) => {
  // Задание: Проверить, что статический текстовый блок содержит определенные подстроки
  // 1. Найти элемент #static-text
  // 2. Проверить что он содержит текст "static text block"
  // 3. Проверить что он содержит текст "important information"
  // 4. Проверить что он НЕ содержит текст "dynamic content"
  const stat = page.locator('#static-text');
  await expect(stat).toContainText('static text block');
  await expect(stat).toContainText('important information');
  await expect(stat).not.toContainText('dynamic content');
});

test('2. Проверка динамически изменяемого текста', async ({ page }) => {
  // Задание: Проверить изменение динамического текста
  // 1. Найти элемент #dynamic-text и проверить что он содержит "Initial dynamic text"
  // 2. Нажать кнопку #change-text
  // 3. Проверить что текст теперь содержит "Text was changed at"
  // 4. Нажать кнопку #add-part
  // 5. Проверить что текст теперь содержит "(additional part)"
  const dyn = page.locator('#dynamic-text');
  await expect(dyn).toContainText('Initial dynamic text');

  const chan = page.locator('#change-text');
  await chan.click();
  await expect(dyn).toContainText('Text was changed at');

  const add = page.locator('#add-part');
  await add.click();
  await expect(dyn).toContainText('(additional part)');
});

test('3. Проверка списка элементов', async ({ page }) => {
  // Задание: Проверить содержимое списка
  // 1. Найти элемент #item-list
  // 2. Проверить что он содержит текст "Item 1: Basic"
  // 3. Проверить что он содержит текст "Intermediate"
  // 4. Нажать кнопку #add-item
  // 5. Проверить что список теперь содержит текст "New added item"
  const iti = page.locator('#item-list');
  await expect(iti).toContainText('Item 1: Basic');
  await expect(iti).toContainText('Intermediate');

  const add1 = page.locator('#add-item');
  await add1.click();
  await expect(iti).toContainText('New added item');
});

test('4. Проверка скрытого/отображаемого текста', async ({ page }) => {
  // Задание: Проверить отображение скрытого текста
  // 1. Найти элемент #hidden-content и проверить что он не видим
  // 2. Нажать кнопку #toggle-text
  // 3. Проверить что элемент теперь содержит текст "special content"
  // 4. Проверить что элемент содержит текст "hidden but now is visible"
  const hid = page.locator('#hidden-content');
  await expect(hid).not.toBeVisible();

  const togg = page.locator('#toggle-text');
  await togg.click();
  await expect(hid).toContainText('special content');
  await expect(hid).toContainText('hidden but now is visible');
});

test('5. Проверка частичного совпадения в длинном тексте', async ({ page }) => {
  // Задание: Проверить частичные совпадения в длинном тексте
  // 1. Найти элемент #partial-text
  // 2. Проверить что он содержит "quick brown fox"
  // 3. Проверить что он содержит "lazy dog"
  // 4. Проверить что он содержит "all letters of the English alphabet"
  // 5. Проверить что он НЕ содержит "all letters of the Russian alphabet"
  const part1 = page.locator('#partial-text');
  await expect(part1).toContainText('quick brown fox');
  await expect(part1).toContainText('lazy dog');
  await expect(part1).toContainText('all letters of the English alphabet');
  await expect(part1).not.toContainText('all letters of the Russian alphabet');
});
