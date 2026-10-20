import { setWorldConstructor, World } from '@cucumber/cucumber';
import type { Browser, Page } from 'playwright';

export class CustomWorld extends World {
    page!: Page;
    browser!: Browser;
}

setWorldConstructor(CustomWorld);