import { test, expect } from '@playwright/test';

test.describe('Redo Mode', () => {
  test('should allow redos of wrong cards', async ({ page }) => {
    // 1. Navigate to study and complete session with 2 wrong cards
    await page.goto('/study/food');
    
    // Card 1 (manzana) -> right
    await page.locator('.flashcard').click();
    await page.click('button:has-text("✅ Right")');
    
    // Card 2 (pan) -> wrong
    await page.locator('.flashcard').click();
    await page.click('button:has-text("❌ Wrong")');
    
    // Card 3 (queso) -> wrong
    await page.locator('.flashcard').click();
    await page.click('button:has-text("❌ Wrong")');
    
    // 2. Check complete screen for "Redo Wrong Cards" button
    await expect(page.locator('h2')).toHaveText('Study Session Complete!');
    await expect(page.locator('text=Cards marked wrong: 2')).toBeVisible();
    await expect(page.locator('a:has-text("Redo Wrong Cards (2)")')).toBeVisible();
    
    // 3. Enter redo mode
    await page.click('a:has-text("Redo Wrong Cards (2)")');
    await expect(page).toHaveURL(/.*\/redo\/food\?wrong=f2.*f3/);
    await expect(page.locator('h2')).toContainText('Redo Mode: food');
    
    // 4. Verify only the 2 wrong cards show up
    // First redo card: pan
    await expect(page.locator('text=Card 1 of 2')).toBeVisible();
    await expect(page.locator('text=el pan')).toBeVisible();
    await page.locator('.flashcard').click();
    await page.click('button:has-text("✅ Right")'); // We get it right this time!
    
    // Second redo card: queso
    await expect(page.locator('text=Card 2 of 2')).toBeVisible();
    await expect(page.locator('text=el queso')).toBeVisible();
    await page.locator('.flashcard').click();
    await page.click('button:has-text("❌ Wrong")'); // We get it wrong again!
    
    // 5. Check the redo completion screen
    await expect(page.locator('h2')).toHaveText('Redo Session Complete!');
    await expect(page.locator('text=Cards you still need to review: 1')).toBeVisible();
    await expect(page.locator('a:has-text("Redo Remaining Cards (1)")')).toBeVisible();
    
    // 6. Test the reset / "Back to Categories" button exits the redo cycle gracefully
    await page.click('a:has-text("Pick another category")');
    await expect(page).toHaveURL('http://localhost:5173/study');
  });
});