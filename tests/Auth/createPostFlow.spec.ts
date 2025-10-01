import { test, expect } from '../../fixtures/pomFixtures';
import postData from '../testData/testData.json';


test('Create a new post', async ({ page, buzzPage }) => {

    const postResponsePromise = page.waitForResponse(response =>
        response.url().includes('/api/v2/buzz/posts') && response.request().method() === 'POST'
    );

    // await page.route('**/api/v2/buzz/posts', route => {
    //     route.fulfill({
    //         status: 500,
    //         contentType: 'application/json',
    //         body: JSON.stringify({ error: 'Internal server error' })
    //     });
    // });

    await buzzPage.createNewPost(postData.postInput);
    page.pause();
    const postResponse = await postResponsePromise;
    expect(postResponse.status()).toBe(400);
    await expect(page.getByText(postData.postInput).first()).toBeVisible();
});
