import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the app title and welcome message', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('Spanish Flashcards');
    await expect(page.locator('text=Welcome to your Spanish learning companion!')).toBeVisible();
  });

  test('should navigate to Study Mode category selection', async ({ page }) => {
    await page.click('text=Study Mode');
    await expect(page).toHaveURL(/\/study$/);
    await expect(page.locator('h2')).toHaveText('Select a Category for Study');
  });

  test('should navigate to Quiz Mode category selection', async ({ page }) => {
    await page.click('text=Quiz Mode');
    await expect(page).toHaveURL(/\/quiz$/);
    await expect(page.locator('h2')).toHaveText('Quiz Setup');
  });

  test('should navigate to Stats Page', async ({ page }) => {
    await page.click('text=Stats Page');
    await expect(page).toHaveURL(/\/stats$/);
    await expect(page.locator('h2')).toHaveText('Your Statistics');
  });
});