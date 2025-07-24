import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://osstep.github.io/assertion_tohaveurl');
});

test('1. Проверка изменения URL при навигации', async ({ page }) => {
  // Задание: Проверить изменение URL при клике по ссылкам
  // 1. Нажать на ссылку "О нас"
  // 2. Проверить что URL изменился и содержит "#about"
  // 3. Нажать на ссылку "Контакты"
  // 4. Проверить что URL изменился и содержит "#contacts"
  // 5. Нажать на ссылку "Главная"
  // 6. Проверить что URL снова содержит "#home"
  const about = page.locator('#about-link');
  await about.click();
  await expect(page).toHaveURL(/#about/);

  const contacts = page.locator('#contacts-link');
  await contacts.click();
  await expect(page).toHaveURL(/#contacts/);

  const home = page.locator('#home-link');
  await home.click();
  await expect(page).toHaveURL(/#home/);
});

test('2. Проверка URL при программной навигации', async ({ page }) => {
  // Задание: Проверить URL после программного перехода
  // 1. Нажать кнопку "Перейти в раздел"
  // 2. Проверить что URL изменился на "#contacts"
  // 3. Нажать кнопку "Вернуться назад" (back() в истории)
  // 4. Проверить что URL вернулся к "#home"
  // Находим кнопку "Перейти в раздел" и кликаем
  const goToSectionBtn = page.locator('#redirect-btn');
  await goToSectionBtn.click();

  // Проверяем, что URL изменился на "#contacts"
  await expect(page).toHaveURL(/#contacts/);

  // Нажимаем "Назад" в истории браузера
  await page.goBack();

  // Проверяем, что URL вернулся к "#home"
  await expect(page).toHaveURL(/#home/);
});

test('3. Проверка URL после ручного ввода', async ({ page }) => {
  // Задание: Проверить обработку ручного ввода URL
  // 1. Перейти напрямую по URL с хешем "#about"
  // 2. Проверить что страница отображает раздел "О нас"
  // 3. Проверить что URL содержит "#about"
  // 4. Обновить страницу
  // 5. Проверить что URL сохранился с "#about"
  // Шаг 1: Перейти напрямую по URL с хешем "#about"
  await page.goto('https://osstep.github.io/assertion_tohaveurl#about');

  // Шаг 2: Проверить, что отображается раздел "О нас"
  await expect(page.locator('#about-section')).toBeVisible();

  // Шаг 3: Проверить, что URL содержит "#about"
  await expect(page).toHaveURL(/#about/);

  // Шаг 4: Обновить страницу
  await page.reload();

  // Шаг 5: Проверить, что URL сохранился с "#about"
  await expect(page).toHaveURL(/#about/);
});
