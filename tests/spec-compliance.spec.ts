import { test, expect } from '@playwright/test';

test.describe('DS-10 Site Spec Compliance', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('loads the splash page', async ({ page }) => {
    await expect(page).toHaveTitle(/DS-10/);
  });

  test('has correct hero section with full viewport height', async ({ page }) => {
    const hero = page.locator('.hero');
    await expect(hero).toBeVisible();
    
    // Check hero is full viewport height
    const viewportHeight = await page.viewportSize()?.height;
    const heroBox = await hero.boundingBox();
    expect(heroBox?.height).toBe(viewportHeight);
  });

  test('has animated background elements', async ({ page }) => {
    // Check for background elements
    await expect(page.locator('.modern-background')).toBeVisible();
    await expect(page.locator('.grid-overlay')).toBeVisible();
    await expect(page.locator('.constellation-canvas')).toBeVisible();
  });

  test('Hero buttons have correct styling and behavior', async ({ page }) => {
    const serverDetailsBtn = page.locator('button:has-text("Server Details")');
    const quickStartBtn = page.locator('button:has-text("Install")');
    
    await expect(serverDetailsBtn).toBeVisible();
    await expect(quickStartBtn).toBeVisible();
    
    // Test Server Details button scroll
    await serverDetailsBtn.click();
    await page.waitForTimeout(1000);
    const serverDetails = page.locator('#server-details');
    await expect(serverDetails).toBeInViewport();
    
    // Scroll back to top
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);
    
    // Test Install button scroll
    await quickStartBtn.click();
    await page.waitForTimeout(1000);
    const setupSection = page.locator('#setup-instructions');
    await expect(setupSection).toBeInViewport();
  });

  test('setup instructions have correct card layout', async ({ page }) => {
    const cards = page.locator('.modern-card');
    await expect(cards).toHaveCount(3);
    
    // Check step indicators
    await expect(page.locator('.step-indicator:has-text("1")')).toBeVisible();
    await expect(page.locator('.step-indicator:has-text("2")')).toBeVisible();
    await expect(page.locator('.step-indicator:has-text("3")')).toBeVisible();
  });

  test('download button opens GitHub in new tab and specifies deepspace10.rar', async ({ page, context }) => {
    const downloadLink = page.locator('a:has-text("Download")');
    await expect(downloadLink).toHaveAttribute('target', '_blank');
    await expect(downloadLink).toHaveAttribute('href', 'https://github.com/chreez/deep-space-10-valheim/releases');
    
    // Check for deepspace10.rar instruction
    const downloadInstruction = page.locator('.download-instruction');
    await expect(downloadInstruction).toContainText('deepspace10.rar');
  });

  test('install folder hint reveals on click', async ({ page }) => {
    const hintButton = page.locator('button:has-text("Where do I find it?")');
    const hintBox = page.locator('.hint-box');
    
    // Initially hidden
    await expect(hintBox).not.toBeVisible();
    
    // Click to reveal
    await hintButton.click();
    await expect(hintBox).toBeVisible();
    await expect(hintBox).toContainText('Right click Valheim in Steam');
  });

  test('IP address field copies to clipboard and shows feedback', async ({ page, context }) => {
    // Grant clipboard permissions
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    
    const ipField = page.locator('.modern-ip-field');
    await expect(ipField).toContainText('95.173.217.154:2456');
    
    // Click to copy
    await ipField.click();
    
    // Check for copy animation
    await expect(ipField).toHaveClass(/copied/);
    
    // Check tooltip appears
    const tooltip = page.locator('.modern-tooltip');
    await expect(tooltip).toHaveClass(/show/);
    await expect(tooltip).toContainText('Copied');
    
    // Verify clipboard content
    const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboardText).toBe('95.173.217.154:2456');
  });

  test('password hint is displayed correctly', async ({ page }) => {
    const passwordHint = page.locator('.password-hint');
    await expect(passwordHint).toBeVisible();
    await expect(passwordHint).toContainText("Derek's favorite animal");
  });

  test('fonts are loaded correctly', async ({ page }) => {
    // Check Orbitron is applied to hero title
    const heroTitle = page.locator('.hero-title');
    const fontFamily = await heroTitle.evaluate(el => 
      window.getComputedStyle(el).fontFamily
    );
    expect(fontFamily).toContain('Orbitron');
  });

  test('responsive layout at different viewports', async ({ page }) => {
    const viewports = [
      { width: 375, height: 667 },   // Mobile
      { width: 768, height: 1024 },  // Tablet
      { width: 1280, height: 800 }   // Desktop
    ];
    
    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await page.waitForTimeout(500);
      
      // Take screenshot for visual verification
      await page.screenshot({ 
        path: `tests/screenshots/viewport-${viewport.width}x${viewport.height}.png`,
        fullPage: true 
      });
      
      // Verify key elements are visible
      await expect(page.locator('.hero')).toBeVisible();
      await expect(page.locator('.modern-card').first()).toBeVisible();
    }
  });

  test('all interactive elements have proper ARIA labels', async ({ page }) => {
    // Hero buttons
    const serverDetailsBtn = page.locator('button:has-text("Server Details")');
    const quickStartBtn = page.locator('button:has-text("Install")');
    await expect(serverDetailsBtn).toHaveAttribute('aria-label', 'Scroll to server connection details');
    await expect(quickStartBtn).toHaveAttribute('aria-label', 'Scroll to setup instructions');
    
    // Download button
    const downloadButton = page.locator('a:has-text("Download")');
    await expect(downloadButton).toHaveAttribute('aria-label', 'Download deepspace10.rar modpack from GitHub (opens in new tab)');
    
    // IP copy field
    const ipField = page.locator('.modern-ip-field');
    await expect(ipField).toHaveAttribute('aria-label', 'Copy server IP address to clipboard');
    await expect(ipField).toHaveAttribute('aria-live', 'polite');
    await expect(ipField).toHaveAttribute('aria-atomic', 'true');
  });

  test('keyboard navigation works correctly', async ({ page }) => {
    // Tab through interactive elements
    await page.keyboard.press('Tab'); // Should focus first button
    const serverDetailsBtn = page.locator('button:has-text("Server Details")');
    await expect(serverDetailsBtn).toBeFocused();
    
    // Tab to next button
    await page.keyboard.press('Tab');
    const quickStartBtn = page.locator('button:has-text("Install")');
    await expect(quickStartBtn).toBeFocused();
  });

  test('colors match design system', async ({ page }) => {
    // Check CSS variables are defined
    const rootStyles = await page.evaluate(() => {
      const root = document.documentElement;
      const computedStyle = window.getComputedStyle(root);
      return {
        deepSpaceBlack: computedStyle.getPropertyValue('--deep-space-black').trim(),
        meteorGray: computedStyle.getPropertyValue('--meteor-gray').trim(),
        moonstoneSteel: computedStyle.getPropertyValue('--moonstone-steel').trim(),
        runestoneBlue: computedStyle.getPropertyValue('--runestone-blue').trim(),
        solarFlareAmber: computedStyle.getPropertyValue('--solar-flare-amber').trim(),
      };
    });
    
    expect(rootStyles.deepSpaceBlack).toBe('#0B0C10');
    expect(rootStyles.meteorGray).toBe('#1F1F23');
    expect(rootStyles.moonstoneSteel).toBe('#C7CCD6');
    expect(rootStyles.runestoneBlue).toBe('#4B91E2');
    expect(rootStyles.solarFlareAmber).toBe('#D88C3D');
  });

  test('page loads within performance budget', async ({ page }) => {
    const metrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      return {
        fcp: navigation.responseEnd - navigation.fetchStart,
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.fetchStart,
      };
    });
    
    // Check First Contentful Paint < 1.5s (1500ms)
    expect(metrics.fcp).toBeLessThan(1500);
  });

  test('BepInEx confirmation message is displayed', async ({ page }) => {
    const successIndicator = page.locator('.success-indicator');
    await expect(successIndicator).toBeVisible();
    await expect(successIndicator).toContainText('BepInEx');
    await expect(successIndicator).toContainText('confirming successful mod installation');
  });
});