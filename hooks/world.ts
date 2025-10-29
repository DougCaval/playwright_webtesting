import { After, Before, type IWorldOptions, setWorldConstructor, World } from "@cucumber/cucumber";
import { type Browser, type Page, chromium } from "playwright";

export class CustomWorld extends World {
  browser!: Browser;
  page!: Page;

  constructor(options: IWorldOptions) {
    super(options);
  }

  async init() {
    this.browser = await chromium.launch({ headless: true });
    this.page = await this.browser.newPage();
  }

  async close() {
    await this.browser.close();
  }

  getPage() {
    return this.page;
  }
}

setWorldConstructor(CustomWorld);

export let page: Page;

Before(async function () {
  await this.init();
  page = this.getPage();
});

After(async function () {
  await this.close();
});
