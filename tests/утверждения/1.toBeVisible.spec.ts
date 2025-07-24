const { test, expect } = require('@playwright/test');

test.describe('Тестирование видимости элементов с toBeVisible()', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/assertion_tobevisible');
  });

  test('Базовый тест видимости элемента', async ({ page }) => {
    // Задание 1: Проверка видимости элемента
    // 1. Найти элемент с id "always-visible"
    // 2. Проверить что элемент видим с помощью toBeVisible()
    // 3. Проверить что элемент содержит текст "Всегда видимый элемент"
    const Vis = page.locator('#always-visible');
    await expect(Vis).toBeVisible;
    await expect(Vis).toHaveText('Всегда видимый элемент');
  });

  test('Тест элементов с разными типами скрытия', async ({ page }) => {
    // Задание 2: Проверка скрытых элементов
    // 1. Найти три элемента с разными способами скрытия:
    //    - #toggle-display (display: none)
    //    - #toggle-visibility (visibility: hidden)
    //    - #toggle-opacity (opacity: 0)
    // 2. Проверить что #toggle-display и #toggle-visibility не видны с помощью not.toBeVisible()
    // 3. Проверить что #toggle-opacity виден с помощью toBeVisible()
    const togD = page.locator('#toggle-display');
    const togV = page.locator('##toggle-visibility');
    const togO = page.locator('#toggle-opacity');
    await expect(togD).not.toBeVisible;
    await expect(togV).not.toBeVisible;
    await expect(togO).toBeVisible;
  });

  test('Тест изменения видимости элементов', async ({ page }) => {
    // Задание 3: Проверка изменения видимости
    // 1. Найти три кнопки для показа элементов:
    //    - #show-display
    //    - #show-visibility
    //    - #show-opacity
    // 2. Кликнуть по каждой кнопке
    // 3. После каждого клика проверить:
    //    - что соответствующий элемент стал видимым (toBeVisible())
    //    - что CSS свойства изменились на:
    //      - display: block
    //      - visibility: visible
    //      - opacity: 1
    const showD = page.locator('#show-display');
    const showV = page.locator('#show-visibility');
    const ShowO = page.locator('#show-opacity');

    const elemDisplay = page.getByText('Элемент с display: none');
    const elemVisibility = page.getByText('Элемент с visibility: hidden');
    const elemOpacity = page.getByText('Элемент с opacity:');

    await showD.click();
    await expect(elemDisplay).toBeVisible();
    await expect(elemDisplay).toHaveCSS('display', 'block');

    await showV.click();
    await expect(elemVisibility).toBeVisible();
    await expect(elemVisibility).toHaveCSS('visibility', 'visible');

    await ShowO.click();
    await expect(elemOpacity).toBeVisible();
    await expect(elemOpacity).toHaveCSS('opacity', '1');
  });

  test('Тест элемента с задержкой появления', async ({ page }) => {
    // Задание 4: Проверка элемента с задержкой
    // 1. Найти элемент #delayed-element
    // 2. Проверить что он не видим
    // 3. Найти кнопку #show-delayed и кликнуть по ней
    // 4. С таймаутом 3 секунды дождаться появления элемента
    // 5. Проверить что элемент содержит текст "Элемент с задержкой появления"
    const del = page.locator('#delayed-element');
    await expect(del).not.toBeVisible;

    const sdel = page.locator('#show-delayed');
    await sdel.click();
    const sdel1 = page.getByText('Элемент с задержкой появления');
    await expect(sdel1).toBeVisible({ timeout: 3000 });
    await expect(sdel1).toHaveText('Элемент с задержкой появления');
  });
});
