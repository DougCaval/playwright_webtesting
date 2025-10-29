import { Given, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { page } from "../hooks/world.js"; // exemplo de uso de contexto compartilhado

Given("has title", async function () {
  await page.goto("https://playwright.dev/");
  const title = await page.title();
  console.log("Page title:", title);
  expect(title).toContain("Playwright");
});

Then("get started link", async function () {
  const getStarted = page.locator('a:has-text("Get Started")');
  await expect(getStarted).toBeVisible();
  console.log("Get Started link found!");
});
