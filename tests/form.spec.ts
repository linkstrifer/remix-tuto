import { test, expect } from '@playwright/test';

const url = 'http://localhost:5173/form';

test('form loads user info by default', async ({ page }) => {
  await page.goto(url);

  await expect(page.getByText('Personal info')).toBeVisible();
});

test('form shows errors when submitting empty form', async ({ page }) => {
  await page.goto(url);

  await page.click('text=Next Step');

  await expect(page.getByText('Name is required')).toBeVisible();
  await expect(page.getByText('Email is required')).toBeVisible();
  await expect(page.getByText('Phone is required')).toBeVisible();
});

test('happy path', async ({ page }) => {
  await page.goto(url);

  await page.fill('input[name="name"]', 'John Doe');
  await page.fill('input[name="email"]', 'john@doe.com');
  await page.fill('input[name="phone"]', '1234567890');

  await page.click('text=Next Step');

  await expect(page.getByText('Select your plan')).toBeVisible();

  await page.click('label:has(input[name="plan"][value="advanced"])');

  await page.click('text=Next Step');

  await page.click('input[name="addons"][value="Online service"]');

  await page.click('text=Next Step');

  await expect(page.getByText('Online service')).toBeVisible();
});

test('expect default checked plan to be pro', async ({ page }) => {
  await page.goto(url + '?step=plan');

  expect(
    page.getAttribute('input[name="plan"][value="pro"]', 'checked')
  ).toBeTruthy();
});
test('expect nav bar to work', async ({ page }) => {
  await page.goto(url);

  await page.getByRole('link', { name: 'Select Plan' }).click();

  await page.waitForTimeout(2000);

  expect(page.url()).toContain('step=plan');

  await page.getByRole('link', { name: 'Add-ons' }).click();

  await page.waitForTimeout(2000);

  expect(page.url()).toContain('step=addons');

  await page.getByRole('link', { name: 'Summary' }).click();

  await page.waitForTimeout(2000);

  expect(page.url()).toContain('step=summary');

  await page.getByRole('link', { name: 'Your Info' }).click();

  await page.waitForTimeout(2000);

  expect(page.url()).toContain('step=userInfo');
});
