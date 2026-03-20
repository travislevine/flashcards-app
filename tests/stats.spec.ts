import { test, expect } from '@playwright/test';

test.describe('Stats Page', () => {
  test('should record and display statistics across study and quiz modes', async ({ page }) => {
    // 1. Initially check stats page is empty
    await page.goto('/stats');
    await expect(page.locator('text=Your Statistics')).toBeVisible();
    await expect(page.locator('.stats-card')).toContainText('0Total Cards');
    
    // 2. Play a Study session (Animals: 1 right, 1 wrong)
    await page.goto('/study/animals');
    await page.locator('.flashcard').click(); // a1
    await page.click('button:has-text("✅ Right")'); 
    await page.locator('.flashcard').click(); // a2
    await page.click('button:has-text("❌ Wrong")');
    
    // 3. Play a Quiz session (Food: 1 right)
    await page.goto('/quiz/food?type=multiple-choice');
    await page.click('button:has-text("the apple")'); // f1 correct
    
    // 4. Verify stats on Stats Page
    await page.goto('/stats');
    
    // Overall totals: 3 total cards (2 animals + 1 food)
    await expect(page.locator('.stats-card')).toContainText('3Total Cards');
    await expect(page.locator('.stats-card')).toContainText('2Correct');
    await expect(page.locator('.stats-card')).toContainText('1Incorrect');
    await expect(page.locator('.stats-card')).toContainText('67%Accuracy'); // 2/3 = 67%
    
    // Category Breakdown (Animals)
    const animalsRow = page.locator('.category-stat-row').filter({ hasText: 'animals' });
    await expect(animalsRow).toBeVisible();
    await expect(animalsRow).toContainText('2 cards studied');
    await expect(animalsRow).toContainText('Accuracy: 50%'); // 1 right, 1 wrong
    
    // Category Breakdown (Food)
    const foodRow = page.locator('.category-stat-row').filter({ hasText: 'food' });
    await expect(foodRow).toBeVisible();
    await expect(foodRow).toContainText('1 cards studied');
    await expect(foodRow).toContainText('Accuracy: 100%'); // 1 right
    
    // Test resetting the stats
    page.on('dialog', dialog => dialog.accept()); // Accept the confirmation alert
    await page.click('button:has-text("Reset All Stats")');
    
    await expect(page.locator('.stats-card')).toContainText('0Total Cards');
  });
});