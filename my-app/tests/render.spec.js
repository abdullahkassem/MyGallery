const { test, expect } = require('@playwright/test');

test('test if page is loaded', async ({ page }) => {
    await page.goto('');
    const title = await page.title();
    expect(title).toBe('Carousel Gallery');
});

test('checks that the carousel has rendered ', async ({ page }) => {
    await page.goto('');
    const carousel = await page.locator('.galleryContainer');
    await expect(carousel).toBeVisible();
});

test('Check navigation button functionality and make sure correct number of images are loaded', async ({ page }) => {
    await page.goto('');
    // Add a listner on cosole messages ?
    let consoleMessages = [];
    page.on('console', msg => {
        consoleMessages.push(msg.text());
      });    
    const carousel = await page.locator('.galleryContainer');
    const forwardButton = await carousel.locator('button').nth(1);
    let count = 0;
    const expectedMessage='outofBounds';
    while(!consoleMessages.includes(expectedMessage) && count < 15){
        count+=1;
        await forwardButton.click();
        await page.waitForTimeout(500);
    }
    // console.log('count is ',count);
    expect(count).toBe(6);
})

test('Check that if button is pressed multiple times it does not go out of bounds', async ({ page }) => {
    await page.goto('');
    const carousel = await page.locator('.galleryContainer');
    const backwardsButton = await carousel.locator('button').nth(0);
    const forwardButton = await carousel.locator('button').nth(1);
    
    let consoleMessages = [];
    page.on('console', msg => {
        consoleMessages.push(msg.text());
      });   

    // press the button multiple times quickly
    for(let i=0;i<15;i++)
    {
        await forwardButton.click();
        await page.waitForTimeout(10);
    }

    // then press once backwards and image should be the 2nd to last aka the 5th
    await backwardsButton.click();
    const expectedMessage="curImgIndex: 4";
    console.log('last console message',consoleMessages.at(-1));
    expect(consoleMessages.at(-1)).toBe(expectedMessage);
})
