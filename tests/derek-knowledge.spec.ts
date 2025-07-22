import { test, expect } from '@playwright/test';

test.describe('Derek Knowledge Test', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Server Details' }).click();
    await page.waitForTimeout(500); // Wait for smooth scroll
  });

  test('toggle button opens and closes the form', async ({ page }) => {
    const toggleButton = page.getByRole('button', { name: 'Test Your Derek Knowledge 🧠' });
    const form = page.locator('#derek-form');

    // Initially closed
    await expect(form).not.toBeVisible();

    // Open form
    await toggleButton.click();
    await expect(form).toBeVisible();

    // Close form
    await toggleButton.click();
    await expect(form).not.toBeVisible();
  });

  test('correct answer shows success message', async ({ page }) => {
    await page.getByRole('button', { name: 'Test Your Derek Knowledge 🧠' }).click();
    
    const input = page.getByLabel("What's Derek's favorite animal?");
    await input.fill('dragon');
    await page.getByRole('button', { name: 'Submit' }).click();

    // Wait for animation delay
    await page.waitForTimeout(600);

    const speechBubble = page.locator('.speechBubble');
    await expect(speechBubble).toBeVisible();
    await expect(speechBubble).toContainText('You really know me, bro.');
  });

  test('incorrect answer shows random error message', async ({ page }) => {
    await page.getByRole('button', { name: 'Test Your Derek Knowledge 🧠' }).click();
    
    const input = page.getByLabel("What's Derek's favorite animal?");
    await input.fill('wolf');
    await page.getByRole('button', { name: 'Submit' }).click();

    // Wait for animation delay
    await page.waitForTimeout(600);

    const speechBubble = page.locator('.speechBubble');
    await expect(speechBubble).toBeVisible();
    
    // Should show one of the random messages
    const text = await speechBubble.textContent();
    expect([
      "That's not my spirit animal, man.",
      "Try again, amateur.",
      "C'mon, I wore that shirt *every day*."
    ]).toContain(text);
  });

  test('cat answer shows special message', async ({ page }) => {
    await page.getByRole('button', { name: 'Test Your Derek Knowledge 🧠' }).click();
    
    const input = page.getByLabel("What's Derek's favorite animal?");
    await input.fill('cat');
    await page.getByRole('button', { name: 'Submit' }).click();

    // Wait for animation delay
    await page.waitForTimeout(600);

    const speechBubble = page.locator('.speechBubble');
    await expect(speechBubble).toBeVisible();
    await expect(speechBubble).toContainText("You think I'd pick a cat? Bro.");
  });

  test('answer with spaces shows format error', async ({ page }) => {
    await page.getByRole('button', { name: 'Test Your Derek Knowledge 🧠' }).click();
    
    const input = page.getByLabel("What's Derek's favorite animal?");
    await input.fill(' dragon ');
    await page.getByRole('button', { name: 'Submit' }).click();

    // Wait for animation delay
    await page.waitForTimeout(600);

    const speechBubble = page.locator('.speechBubble');
    await expect(speechBubble).toBeVisible();
    await expect(speechBubble).toContainText('The format contains spaces. Try without spaces.');
  });

  test('input field shakes on incorrect answer', async ({ page }) => {
    await page.getByRole('button', { name: 'Test Your Derek Knowledge 🧠' }).click();
    
    const input = page.getByLabel("What's Derek's favorite animal?");
    await input.fill('wrong');
    
    // Check that shake class is not present initially
    await expect(input).not.toHaveClass(/shake/);
    
    await page.getByRole('button', { name: 'Submit' }).click();
    
    // Check that shake class is applied
    await expect(input).toHaveClass(/shake/);
  });

  test('derek image pulses on response', async ({ page }) => {
    await page.getByRole('button', { name: 'Test Your Derek Knowledge 🧠' }).click();
    
    const derekImage = page.locator('img[alt="Derek"]');
    
    // Submit an answer
    await page.getByLabel("What's Derek's favorite animal?").fill('dragon');
    await page.getByRole('button', { name: 'Submit' }).click();
    
    // Wait for animation delay
    await page.waitForTimeout(600);
    
    // Check that pulse class is applied
    await expect(derekImage).toHaveClass(/pulse/);
  });

  test('button has hover effect', async ({ page }) => {
    const toggleButton = page.getByRole('button', { name: 'Test Your Derek Knowledge 🧠' });
    
    // Get initial background
    const initialBg = await toggleButton.evaluate(el => 
      window.getComputedStyle(el).background
    );
    
    // Hover over button
    await toggleButton.hover();
    await page.waitForTimeout(300); // Wait for transition
    
    // Get hover background
    const hoverBg = await toggleButton.evaluate(el => 
      window.getComputedStyle(el).background
    );
    
    // Should have different background on hover
    expect(hoverBg).not.toBe(initialBg);
  });

  test('responsive layout works on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.getByRole('button', { name: 'Test Your Derek Knowledge 🧠' }).click();
    
    // Submit an answer to show speech bubble
    await page.getByLabel("What's Derek's favorite animal?").fill('dragon');
    await page.getByRole('button', { name: 'Submit' }).click();
    
    await page.waitForTimeout(600);
    
    // Check that elements are visible and properly positioned
    const derekContainer = page.locator('.derekContainer');
    const speechBubble = page.locator('.speechBubble');
    
    await expect(derekContainer).toBeVisible();
    await expect(speechBubble).toBeVisible();
    
    // Speech bubble should be below Derek image on mobile
    const derekBox = await page.locator('img[alt="Derek"]').boundingBox();
    const speechBox = await speechBubble.boundingBox();
    
    expect(speechBox!.y).toBeGreaterThan(derekBox!.y);
  });
});