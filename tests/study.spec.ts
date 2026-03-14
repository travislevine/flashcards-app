import { test, expect } from '@playwright/test';

test.describe('Study Mode', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/study');
  });

  test('should display category selection with correct layout', async ({ page }) => {
    await expect(page.locator('h2')).toHaveText('Select a Category for Study');
    await expect(page.locator('a:has-text("Animals")')).toBeVisible();
    await expect(page.locator('a:has-text("Food")')).toBeVisible();
    await expect(page.locator('a:has-text("Verbs")')).toBeVisible();
    await expect(page.locator('a:has-text("Back to Home")')).toBeVisible();
  });

  test('should navigate to flashcards when a category is selected', async ({ page }) => {
    await page.click('text=Animals');
    await expect(page).toHaveURL(/\/study\/animals$/);
    await expect(page.locator('h2')).toContainText('Study Mode: animals');
  });

  test('should complete a study session for a category', async ({ page }) => {
    // Navigate to food category
    await page.goto('/study/food');
    
    // Food category has 3 cards: la manzana, el pan, el queso
    // Card 1
    await expect(page.locator('text=Card 1 of 3')).toBeVisible();
    await expect(page.locator('text=la manzana')).toBeVisible();
    await expect(page.locator('text=Click to reveal translation')).toBeVisible();
    
    // Flip card 1
    await page.locator('.flashcard').click();
    await expect(page.locator('text=the apple')).toBeVisible();
    await expect(page.locator('button:has-text("✅ Right")')).toBeVisible();
    await expect(page.locator('button:has-text("❌ Wrong")')).toBeVisible();
    
    // Mark card 1 as Right
    await page.click('button:has-text("✅ Right")');
    
    // Card 2
    await expect(page.locator('text=Card 2 of 3')).toBeVisible();
    await expect(page.locator('text=el pan')).toBeVisible();
    
    // Flip card 2
    await page.locator('.flashcard').click();
    await expect(page.locator('text=the bread')).toBeVisible();
    
    // Mark card 2 as Wrong
    await page.click('button:has-text("❌ Wrong")');
    
    // Card 3
    await expect(page.locator('text=Card 3 of 3')).toBeVisible();
    await expect(page.locator('text=el queso')).toBeVisible();
    
    // Flip card 3
    await page.locator('.flashcard').click();
    await expect(page.locator('text=the cheese')).toBeVisible();
    
    // Mark card 3 as Right
    await page.click('button:has-text("✅ Right")');
    
    // Check completion screen
    await expect(page.locator('h2')).toHaveText('Study Session Complete!');
    await expect(page.locator('text=You finished all cards in the food category.')).toBeVisible();
    // Since we got 1 wrong:
    await expect(page.locator('text=Cards marked wrong: 1')).toBeVisible();
    
    // Check navigation buttons on completion screen
    await expect(page.locator('a:has-text("Pick another category")')).toBeVisible();
    await expect(page.locator('a:has-text("Back to Home")')).toBeVisible();
    
    // Navigate back to home
    await page.click('a:has-text("Back to Home")');
    await expect(page).toHaveURL('http://localhost:5173/');
    await expect(page.locator('h1')).toHaveText('Spanish Flashcards');
  });
});