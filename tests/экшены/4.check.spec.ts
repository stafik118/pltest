import { test, expect } from '@playwright/test';

test.describe('Работа с базовыми чекбоксами', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/action_check');
  });

  // Тест 1: Проверка и снятие отметки с чекбокса
  // 1. Найти чекбокс "Подписаться на рассылку" по label
  // 2. Проверить что чекбокс изначально не выбран
  // 3. Выбрать чекбокс методом check()
  // 4. Проверить что статус изменился на "Подписаны"
  // 5. Снять выбор методом uncheck()
  // 6. Проверить что статус вернулся к исходному
  test('Изменение состояния чекбокса', async ({ page }) => {
    const newsletterCheckbox = page.getByLabel('Подписаться на рассылку');
    const status = page.locator('#newsletter-status');

    await expect(newsletterCheckbox).not.toBeChecked();
    await newsletterCheckbox.check();
    await expect(newsletterCheckbox).toBeChecked();
    await expect(status).toHaveText('Подписаны');
    await expect(status).toHaveClass(/checked/);

    await newsletterCheckbox.uncheck();
    await expect(newsletterCheckbox).not.toBeChecked();
    await expect(status).toHaveText('Не подписаны');
  });

  // Тест 2: Проверка обязательного чекбокса
  // 1. Найти обязательный чекбокс условий
  // 2. Проверить наличие required атрибута
  // 3. Выбрать чекбокс
  // 4. Проверить что стал выбранным
  test('Работа с обязательным чекбоксом', async ({ page }) => {
    const termsCheckbox = page.getByLabel('Я принимаю условия соглашения');

    await expect(termsCheckbox).toHaveAttribute('required', '');
    await termsCheckbox.check();
    await expect(termsCheckbox).toBeChecked();
  });
});

test.describe('Сложные сценарии работы с check()', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/action_check');
  });

  // Тест 1: Работа с кастомными элементами
  // 1. Найти чекбокс соглашения с условиями
  // 2. Проскроллить к контейнеру с условиями
  // 3. Выбрать чекбокс
  // 4. Проверить что выбран
  test('Работа с кастомным чекбоксом после скролла', async ({ page }) => {
    const agreeCheckbox = page.getByLabel('Я прочитал и согласен с условиями');
    const tosContainer = page.locator('.tos-container');

    await tosContainer.scrollIntoViewIfNeeded();
    await agreeCheckbox.check();
    await expect(agreeCheckbox).toBeChecked();
  });

  // Тест 2: Динамически добавляемые чекбоксы
  // 1. Дождаться появления динамических чекбоксов
  // 2. Найти чекбокс по label
  // 3. Проверить что второй чекбокс выбран по умолчанию
  // 4. Выбрать первый чекбокс
  // 5. Проверить оба состояния
  test('Работа с динамически добавленными чекбоксами', async ({ page }) => {
    const dynamicCheckbox1 = page.getByLabel('Динамический чекбокс 1');
    const dynamicCheckbox2 = page.getByLabel('Динамический чекбокс 2');

    await expect(dynamicCheckbox1).toBeVisible({ timeout: 2000 });
    await expect(dynamicCheckbox2).toBeChecked();

    await dynamicCheckbox1.check();
    await expect(dynamicCheckbox1).toBeChecked();
    await expect(dynamicCheckbox2).toBeChecked();
  });
});

test.describe('Комплексное тестирование формы с чекбоксами', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/action_check');
  });

  // Тест: Полное заполнение формы
  // 1. Подписаться на рассылку
  // 2. Принять условия соглашения
  // 3. Выбрать интересы: Спорт и Кино
  // 4. Выбрать способ доставки: Почта России
  // 5. Принять условия использования
  // 6. Проверить все состояния
  test('Полное заполнение формы с проверкой состояний', async ({ page }) => {
    // Чекбоксы
    const rassil = page.getByLabel('Подписаться на рассылку');
    await rassil.check();
    const sogl = page.getByLabel('Я принимаю условия соглашения');
    await sogl.check();

    // Группа интересов

    const Sport = page.getByLabel('Спорт');
    await Sport.check();
    const Music = page.getByLabel('Музыка');
    await Music.uncheck();
    const Kino = page.getByLabel('Кино');
    await Kino.check();
    const Ros = page.getByLabel('Почта России');
    await Ros.check();
    const Usedd = page.getByLabel('Я прочитал и согласен с условиями');
    await Usedd.check();

    // Радио-кнопки
    // твой код

    // Кастомный элемент
    await page.locator('.tos-container').scrollIntoViewIfNeeded();
    // твой код

    // Проверки
    await expect(page.getByLabel('Подписаться на рассылку')).toBeChecked();
    await expect(page.getByLabel('Почта России')).toBeChecked();
    await expect(page.getByLabel('Спорт')).toBeChecked();
    await expect(page.getByLabel('Музыка')).not.toBeChecked();
  });
});
