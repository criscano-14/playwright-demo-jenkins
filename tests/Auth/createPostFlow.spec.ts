import { test, expect } from '../../fixtures/pomFixtures';
import postData from '../testData/testData.json';


test('Create a new post', async ({ page, buzzPage }) => {
    await buzzPage.createNewPost(postData.postInput);
    await expect(page.getByText(postData.postInput).first()).toBeVisible();

    // await page.pause();
});
