import { test, expect } from '@playwright/test';

test.describe('Quiz Mode', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/quiz');
  });

  test('should display quiz selection with options and categories', async ({ page }) => {
    await expect(page.locator('h2')).toHaveText('Quiz Setup');
    // Quiz types
    await expect(page.locator('button:has-text("Multiple Choice")')).toBeVisible();
    await expect(page.locator('button:has-text("Fill in Blank")')).toBeVisible();
    
    // Categories
    await expect(page.locator('a:has-text("Animals")')).toBeVisible();
    await expect(page.locator('a:has-text("Food")')).toBeVisible();
    await expect(page.locator('a:has-text("Verbs")')).toBeVisible();
  });

  test('should complete a multiple choice quiz', async ({ page }) => {
    // Select Multiple Choice (default) and Animals
    await page.click('button:has-text("Multiple Choice")');
    await page.click('a:has-text("Animals")');
    
    await expect(page).toHaveURL(/\/quiz\/animals\?type=multiple-choice/);
    await expect(page.locator('h2')).toContainText('Quiz: animals', { ignoreCase: true });
    
    // Card 1 (el gato) -> the cat
    await expect(page.locator('text=el gato')).toBeVisible();
    await page.click('button:has-text("the cat")');
    await expect(page.locator('text=✅ Correct!')).toBeVisible();
    await page.click('button:has-text("Next Question")');
    
    // Card 2 (el perro) -> get it wrong (the cat)
    await expect(page.locator('text=el perro')).toBeVisible();
    await page.click('button:has-text("the cat")');
    await expect(page.locator('text=❌ Wrong! The correct answer is: the dog')).toBeVisible();
    await page.click('button:has-text("Next Question")');
    
    // Card 3 (el pájaro) -> the bird
    await expect(page.locator('text=el pájaro')).toBeVisible();
    await page.click('button:has-text("the bird")');
    await expect(page.locator('text=✅ Correct!')).toBeVisible();
    await page.click('button:has-text("Next Question")');
    
    // Complete screen
    await expect(page.locator('h2')).toHaveText('Quiz Complete!');
    await expect(page.locator('text=You scored 2 out of 3.')).toBeVisible();
  });

  test('should complete a fill in the blank quiz', async ({ page }) => {
    // Select Fill in Blank and Food
    await page.click('button:has-text("Fill in Blank")');
    await page.click('a:has-text("Food")');
    
    await expect(page).toHaveURL(/\/quiz\/food\?type=fill-in-the-blank/);
    
    // Card 1 (la manzana) -> the apple
    await expect(page.locator('text=la manzana')).toBeVisible();
    await page.fill('input[type="text"]', 'the apple');
    await page.click('button:has-text("Submit Answer")');
    await expect(page.locator('text=✅ Correct!')).toBeVisible();
    await page.click('button:has-text("Next Question")');
    
    // Card 2 (el pan) -> get it wrong (bread)
    await expect(page.locator('text=el pan')).toBeVisible();
    await page.fill('input[type="text"]', 'bread'); // Missing "the"
    await page.click('button:has-text("Submit Answer")');
    await expect(page.locator('text=❌ Wrong! The correct answer is: the bread')).toBeVisible();
    await page.click('button:has-text("Next Question")');
    
    // Card 3 (el queso) -> THE CHEESE (test case insensitivity)
    await expect(page.locator('text=el queso')).toBeVisible();
    await page.fill('input[type="text"]', 'THE CHEESE');
    await page.click('button:has-text("Submit Answer")');
    await expect(page.locator('text=✅ Correct!')).toBeVisible();
    await page.click('button:has-text("Next Question")');
    
    // Complete screen
    await expect(page.locator('h2')).toHaveText('Quiz Complete!');
    await expect(page.locator('text=You scored 2 out of 3.')).toBeVisible();
  });
});
