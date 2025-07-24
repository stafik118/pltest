import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://osstep.github.io/assertion_tohaveattribute');
});

test('1. Проверка атрибутов основной кнопки', async ({ page }) => {
  // Задание: Проверить атрибуты основной кнопки
  // 1. Найти кнопку "Отправить" по тексту
  // 2. Проверить что она имеет атрибут data-action="submit"
  // 3. Проверить что она имеет атрибут title="Основная кнопка"
  // 4. Нажать кнопку "Переключить атрибуты"
  // 5. Проверить что атрибут data-action изменился на "cancel"
  // 6. Проверить что атрибут title изменился на "Отмена действия"
  // 1. Найти кнопку "Отправить" по тексту
  const submitButton = page.getByRole('button', { name: 'Отправить' });

  // 2. Проверить что она имеет атрибут data-action="submit"
  await expect(submitButton).toHaveAttribute('data-action', 'submit');

  // 3. Проверить что она имеет атрибут title="Основная кнопка"
  await expect(submitButton).toHaveAttribute('title', 'Основная кнопка');

  // 4. Нажать кнопку "Переключить атрибуты"
  const toggleButton = page.getByRole('button', { name: 'Переключить атрибуты' });
  await toggleButton.click();

  // 5. Проверить что атрибут data-action изменился на "cancel"
  await expect(submitButton).toHaveAttribute('data-action', 'cancel');

  // 6. Проверить что атрибут title изменился на "Отмена действия"
  await expect(submitButton).toHaveAttribute('title', 'Отмена действия');
});

test('2. Проверка отключения кнопки', async ({ page }) => {
  // Задание: Проверить изменение состояния кнопки
  // 1. Найти кнопку "Отправить" и проверить что у нее нет атрибута disabled
  // 2. Нажать кнопку "Отключить кнопку"
  // 3. Проверить что кнопка "Отправить" получила атрибут disabled
  // 4. Проверить что значение атрибута disabled равно пустой строке
  // 5. Еще раз нажать "Отключить кнопку"
  // 6. Проверить что атрибут disabled отсутствует
  // 1. Найти кнопку "Отправить" и проверить что у нее нет атрибута disabled
  const submitButton = page.getByRole('button', { name: 'Отправить' });
  await expect(submitButton).not.toHaveAttribute('disabled');

  // 2. Нажать кнопку "Отключить кнопку"
  const toggleDisableButton = page.getByRole('button', { name: 'Отключить кнопку' });
  await toggleDisableButton.click();

  // 3. Проверить что кнопка "Отправить" получила атрибут disabled
  await expect(submitButton).toHaveAttribute('disabled');

  // 4. Проверить что значение атрибута disabled равно пустой строке
  const disabledAttr = await submitButton.getAttribute('disabled');
  expect(disabledAttr).toBe('');

  // 5. Еще раз нажать "Отключить кнопку"
  await toggleDisableButton.click();

  // 6. Проверить что атрибут disabled отсутствует
  await expect(submitButton).not.toHaveAttribute('disabled');
});

test('3. Проверка атрибутов изображения', async ({ page }) => {
  // Задание: Проверить атрибуты изображения
  // 1. Найти изображение по атрибуту alt
  // 2. Проверить что оно имеет src="user.jpg"
  // 3. Проверить что оно имеет alt="Аватар пользователя"
  // 4. Проверить что оно имеет width="200"
  const image = page.locator('img[alt="Аватар пользователя"]');
  await expect(image).toHaveAttribute('src', 'user.jpg');

  // 3. Проверить что оно имеет alt="Аватар пользователя"
  await expect(image).toHaveAttribute('alt', 'Аватар пользователя');

  // 4. Проверить что оно имеет width="200"
  await expect(image).toHaveAttribute('width', '200');
});

test('4. Проверка атрибутов формы', async ({ page }) => {
  // Задание: Проверить атрибуты полей формы
  // 1. Найти поле "Имя пользователя" и проверить:
  //    - имеет атрибут required
  //    - имеет атрибут minlength="3"
  // 2. Найти поле "Email" и проверить что оно имеет атрибут disabled
  // 3. Нажать кнопку "Активировать email"
  // 4. Проверить что поле "Email" больше не имеет атрибута disabled
  // 5. Проверить что placeholder изменился на "Введите ваш email"
  const Name1 = page.getByRole('textbox', { name: 'Имя пользователя' });
  await expect(Name1).toHaveAttribute('required');
  await expect(Name1).toHaveAttribute('minlength', '3');

  const em = page.locator('#email');
  await expect(em).toHaveAttribute('disabled');

  const act = page.getByRole('button', { name: 'Активировать email' });
  await act.click();
  await expect(em).not.toHaveAttribute('disabled');
  await expect(em).toHaveAttribute('placeholder', 'Введите ваш email');
});

test('5. Проверка data-атрибутов', async ({ page }) => {
  // Задание: Проверить data-атрибуты контейнера
  // 1. Найти контейнер по тексту
  // 2. Проверить что он имеет:
  //    - data-role="container"
  //    - data-visible="true"
  //    - data-user-id="12345"
  // 3. Нажать кнопку "Обновить data-атрибуты"
  // 4. Проверить что data-visible изменился на "false"
  // 5. Проверить что data-user-id изменился (не равен "12345")
  // 6. Еще раз нажать кнопку
  // 7. Проверить что data-visible снова "true"
  const kon = page.getByText('Контейнер с data-атрибутами');
  await expect(kon).toHaveAttribute('data-role', 'container');
  await expect(kon).toHaveAttribute('data-visible', 'true');
  await expect(kon).toHaveAttribute('data-user-id', '12345');

  const kon1 = page.getByRole('button', { name: 'Обновить data-атрибуты' });
  await kon1.click();
  await expect(kon).toHaveAttribute('data-visible', 'false');
  const daq = await kon.getAttribute('data-user-id');
  await expect(daq).not.toBe('12345');

  await kon1.click();
  await expect(kon).toHaveAttribute('data-visible', 'true');
});
