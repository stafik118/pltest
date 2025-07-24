import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://osstep.github.io/assertion_tohavevalue');
});

test('1. Проверка начальных значений полей', async ({ page }) => {
  // Задание: Проверить начальные значения всех полей формы
  // 1. Найти поле "Имя пользователя" по лейблу и проверить значение "Гость"
  // 2. Найти поле "Электронная почта" и проверить что оно пустое
  // 3. Найти поле "Телефон" и проверить значение "+7"
  // 4. Найти поле "Комментарии" и проверить что оно пустое
  // 5. Найти выпадающий список "Страна" и проверить значение "ru"
  const usernameInput = page.getByLabel('Имя пользователя');
  await expect(usernameInput).toHaveValue('Гость');

  // 2. Найти поле "Электронная почта" и проверить что оно пустое
  const emailInput = page.getByLabel('Электронная почта');
  await expect(emailInput).toHaveValue('');

  // 3. Найти поле "Телефон" и проверить значение "+7"
  const phoneInput = page.getByLabel('Телефон');
  await expect(phoneInput).toHaveValue('+7');

  // 4. Найти поле "Комментарии" (textarea) и проверить что оно пустое
  const commentsTextarea = page.getByLabel('Комментарии');
  await expect(commentsTextarea).toHaveValue('');

  // 5. Найти выпадающий список "Страна" и проверить значение "ru"
  const countrySelect = page.getByLabel('Страна');
  await expect(countrySelect).toHaveValue('ru');
});

test('2. Проверка изменения значений полей', async ({ page }) => {
  // Задание: Проверить обновление значений полей
  // 1. Заполнить поле "Имя пользователя" значением "Алексей"
  // 2. Заполнить поле "Электронная почта" значением "alex@example.com"
  // 3. Заполнить поле "Телефон" значением "+7 (123) 456-78-90"
  // 4. Заполнить поле "Комментарии" значением "Тестовый комментарий"
  // 5. Выбрать в списке "Страна" значение "Казахстан" (kz)
  // 6. Проверить что все поля содержат новые значения

  // 1. Заполнить поле "Имя пользователя" значением "Алексей"
  const usernameInput = page.getByLabel('Имя пользователя');
  await usernameInput.fill('Алексей');

  // 2. Заполнить поле "Электронная почта" значением "alex@example.com"
  const emailInput = page.getByLabel('Электронная почта');
  await emailInput.fill('alex@example.com');

  // 3. Заполнить поле "Телефон" значением "+7 (123) 456-78-90"
  const phoneInput = page.getByLabel('Телефон');
  await phoneInput.fill('+7 (123) 456-78-90');

  // 4. Заполнить поле "Комментарии" значением "Тестовый комментарий"
  const commentsTextarea = page.getByLabel('Комментарии');
  await commentsTextarea.fill('Тестовый комментарий');

  // 5. Выбрать в списке "Страна" значение "Казахстан" (kz)
  const countrySelect = page.getByLabel('Страна');
  await countrySelect.selectOption('kz');

  // 6. Проверить что все поля содержат новые значения
  await expect(usernameInput).toHaveValue('Алексей');
  await expect(emailInput).toHaveValue('alex@example.com');
  await expect(phoneInput).toHaveValue('+7 (123) 456-78-90');
  await expect(commentsTextarea).toHaveValue('Тестовый комментарий');
  await expect(countrySelect).toHaveValue('kz');
});

test('3. Проверка сброса формы', async ({ page }) => {
  // Задание: Проверить сброс значений формы к начальным
  // 1. Изменить поле "Имя пользователя" на "Петр"
  // 2. Изменить поле "Электронная почта" на "test@test.ru"
  // 3. Выбрать в списке "Страна" значение "Беларусь" (by)
  // 4. Нажать кнопку "Сбросить"
  // 5. Проверить что поле "Имя пользователя" содержит "Гость"
  // 6. Проверить что поле "Электронная почта" пустое
  // 7. Проверить что поле "Телефон" содержит "+7"
  // 8. Проверить что список "Страна" содержит значение "ru"
  const usernameInput = page.getByLabel('Имя пользователя');
  await usernameInput.fill('Петр');

  // 2. Изменить поле "Электронная почта" на "test@test.ru"
  const emailInput = page.getByLabel('Электронная почта');
  await emailInput.fill('test@test.ru');

  // 3. Выбрать в списке "Страна" значение "Беларусь" (by)
  const countrySelect = page.getByLabel('Страна');
  await countrySelect.selectOption('by');

  // 4. Нажать кнопку "Сбросить"
  // Предполагается, что кнопка имеет текст "Сбросить"
  const resetButton = page.getByRole('button', { name: 'Сбросить' });
  await resetButton.click();

  // 5. Проверить что поле "Имя пользователя" содержит "Гость"
  await expect(usernameInput).toHaveValue('Гость');

  // 6. Проверить что поле "Электронная почта" пустое
  await expect(emailInput).toHaveValue('');

  // 7. Проверить что поле "Телефон" содержит "+7"
  const phoneInput = page.getByLabel('Телефон');
  await expect(phoneInput).toHaveValue('+7');

  // 8. Проверить что список "Страна" содержит значение "ru"
  await expect(countrySelect).toHaveValue('ru');
});

test('4. Проверка обновления данных', async ({ page }) => {
  // Задание: Проверить отображение введенных данных
  // 1. Заполнить поле "Имя пользователя" значением "Мария"
  // 2. Заполнить поле "Электронная почта" значением "maria@mail.ru"
  // 3. Заполнить поле "Комментарии" значением "Важный комментарий"
  // 4. Нажать кнопку "Обновить данные"
  // 5. Проверить что в блоке вывода содержится текст с введенными данными
  // 1. Заполнить поле "Имя пользователя" значением "Мария"
  const usernameInput = page.getByLabel('Имя пользователя');
  await usernameInput.fill('Мария');

  // 2. Заполнить поле "Электронная почта" значением "maria@mail.ru"
  const emailInput = page.getByLabel('Электронная почта');
  await emailInput.fill('maria@mail.ru');

  // 3. Заполнить поле "Комментарии" значением "Важный комментарий"
  const commentsTextarea = page.getByLabel('Комментарии');
  await commentsTextarea.fill('Важный комментарий');

  // 4. Нажать кнопку "Обновить данные"
  const updateButton = page.getByRole('button', { name: 'Обновить данные' });
  await updateButton.click();

  // 5. Проверить что в блоке вывода содержится текст с введенными данными
  // Предполагаем, что блок вывода имеет id="output" (замените на актуальный селектор)
  const outputBlock = page.locator('#output');

  await expect(outputBlock).toContainText('Мария');
  await expect(outputBlock).toContainText('maria@mail.ru');
  await expect(outputBlock).toContainText('Важный комментарий');
});

test('5. Проверка пустых значений', async ({ page }) => {
  // Задание: Проверить обработку пустых значений
  // 1. Очистить поле "Имя пользователя"
  // 2. Очистить поле "Телефон"
  // 3. Выбрать пустое значение в списке "Страна"
  // 4. Проверить что поле "Имя пользователя" пустое
  // 5. Проверить что поле "Телефон" пустое
  // 6. Проверить что список "Страна" содержит пустое значение
  // 7. Проверить что изначально пустое поле "Электронная почта" осталось пустым
  const usernameInput = page.getByLabel('Имя пользователя');
  await usernameInput.fill('');

  // 2. Очистить поле "Телефон"
  const phoneInput = page.getByLabel('Телефон');
  await phoneInput.fill('');

  // 3. Выбрать пустое значение в списке "Страна"
  const countrySelect = page.getByLabel('Страна');
  // Предполагается, что пустое значение имеет value="" или текст пустой
  await countrySelect.selectOption('');

  // 4. Проверить что поле "Имя пользователя" пустое
  await expect(usernameInput).toHaveValue('');

  // 5. Проверить что поле "Телефон" пустое
  await expect(phoneInput).toHaveValue('');

  // 6. Проверить что список "Страна" содержит пустое значение
  // Проверим, что выбранное значение пустое
  await expect(countrySelect).toHaveValue('');

  // 7. Проверить что изначально пустое поле "Электронная почта" осталось пустым
  const emailInput = page.getByLabel('Электронная почта');
  await expect(emailInput).toHaveValue('');
});
