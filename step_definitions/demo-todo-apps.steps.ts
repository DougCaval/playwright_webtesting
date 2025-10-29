import { Given, When, Then } from '@cucumber/cucumber';
import { expect, type Page } from '@playwright/test';
import { chromium } from 'playwright';

let page: Page;

const TODO_ITEMS = [
'buy some cheese',
'feed the cat',
'book a doctors appointment'
];

Given('the user is on the TodoMVC page', async function () {
const browser = await chromium.launch();
const context = await browser.newContext();
page = await context.newPage();
await page.goto('[https://demo.playwright.dev/todomvc](https://demo.playwright.dev/todomvc)');
});

When('the user adds todo items {string} and {string}', async function (item1: string, item2: string) {
const newTodo = page.getByPlaceholder('What needs to be done?');
await newTodo.fill(item1);
await newTodo.press('Enter');
await newTodo.fill(item2);
await newTodo.press('Enter');
});

Then('the list should display {string} and {string}', async function (item1: string, item2: string) {
await expect(page.getByTestId('todo-title')).toHaveText([item1, item2]);
});

When('the user adds a todo item {string}', async function (item: string) {
const newTodo = page.getByPlaceholder('What needs to be done?');
await newTodo.fill(item);
await newTodo.press('Enter');
});

Then('the input field should be empty', async function () {
const newTodo = page.getByPlaceholder('What needs to be done?');
await expect(newTodo).toBeEmpty();
});

Given('the user has added default todos', async function () {
const newTodo = page.getByPlaceholder('What needs to be done?');
for (const item of TODO_ITEMS) {
await newTodo.fill(item);
await newTodo.press('Enter');
}
});

Then('the list should show {string}', async function (text: string) {
await expect(page.getByTestId('todo-count')).toHaveText(text);
});

When('the user marks all items as completed', async function () {
await page.getByLabel('Mark all as complete').check();
});

Then('all items should appear completed', async function () {
await expect(page.getByTestId('todo-item')).toHaveClass(['completed', 'completed', 'completed']);
});

When('the user marks all items as completed and then unchecks them', async function () {
const toggleAll = page.getByLabel('Mark all as complete');
await toggleAll.check();
await toggleAll.uncheck();
});

Then('no items should appear completed', async function () {
await expect(page.getByTestId('todo-item')).toHaveClass(['', '', '']);
});

When('the user marks all and unmarks one item', async function () {
const toggleAll = page.getByLabel('Mark all as complete');
await toggleAll.check();
const firstTodo = page.getByTestId('todo-item').nth(0);
await firstTodo.getByRole('checkbox').uncheck();
});

Then('the toggle all checkbox should reflect the correct state', async function () {
const toggleAll = page.getByLabel('Mark all as complete');
await expect(toggleAll).not.toBeChecked();
});

When('the user marks {string} and {string} as completed', async function (item1: string, item2: string) {
const newTodo = page.getByPlaceholder('What needs to be done?');
await newTodo.fill(item1);
await newTodo.press('Enter');
await newTodo.fill(item2);
await newTodo.press('Enter');
const first = page.getByTestId('todo-item').nth(0);
const second = page.getByTestId('todo-item').nth(1);
await first.getByRole('checkbox').check();
await second.getByRole('checkbox').check();
});

Then('both should have the completed class', async function () {
await expect(page.getByTestId('todo-item')).toHaveClass(['completed', 'completed']);
});

When('the user unmarks an item', async function () {
const firstTodo = page.getByTestId('todo-item').nth(0);
await firstTodo.getByRole('checkbox').check();
await firstTodo.getByRole('checkbox').uncheck();
});

Then('it should not have the completed class', async function () {
const firstTodo = page.getByTestId('todo-item').nth(0);
await expect(firstTodo).not.toHaveClass('completed');
});

When('the user edits the second todo to {string}', async function (newText: string) {
const todoItems = page.getByTestId('todo-item');
const secondTodo = todoItems.nth(1);
await secondTodo.dblclick();
await secondTodo.getByRole('textbox', { name: 'Edit' }).fill(newText);
await secondTodo.getByRole('textbox', { name: 'Edit' }).press('Enter');
});

Then('the list should show updated text', async function () {
await expect(page.getByTestId('todo-item')).toContainText(['buy some sausages']);
});

When('the user edits the second item', async function () {
const todoItem = page.getByTestId('todo-item').nth(1);
await todoItem.dblclick();
});

Then('its checkbox and label should not be visible', async function () {
const todoItem = page.getByTestId('todo-item').nth(1);
await expect(todoItem.getByRole('checkbox')).not.toBeVisible();
});

When('the user edits the second todo and moves focus away', async function () {
const todoItem = page.getByTestId('todo-item').nth(1);
await todoItem.dblclick();
await todoItem.getByRole('textbox', { name: 'Edit' }).fill('buy some sausages');
await todoItem.getByRole('textbox', { name: 'Edit' }).dispatchEvent('blur');
});

Then('the new text should be saved', async function () {
await expect(page.getByTestId('todo-item')).toContainText(['buy some sausages']);
});

When('the user edits the second todo adding spaces', async function () {
const todoItem = page.getByTestId('todo-item').nth(1);
await todoItem.dblclick();
await todoItem.getByRole('textbox', { name: 'Edit' }).fill('    buy some sausages    ');
await todoItem.getByRole('textbox', { name: 'Edit' }).press('Enter');
});

Then('the text should be trimmed before saving', async function () {
await expect(page.getByTestId('todo-item')).toContainText(['buy some sausages']);
});

When('the user deletes the text of a todo', async function () {
const todoItem = page.getByTestId('todo-item').nth(1);
await todoItem.dblclick();
await todoItem.getByRole('textbox', { name: 'Edit' }).fill('');
await todoItem.getByRole('textbox', { name: 'Edit' }).press('Enter');
});

Then('the item should be removed', async function () {
await expect(page.getByTestId('todo-item')).toHaveCount(2);
});

When('the user presses escape while editing', async function () {
const todoItem = page.getByTestId('todo-item').nth(1);
await todoItem.dblclick();
await todoItem.getByRole('textbox', { name: 'Edit' }).fill('changed text');
await todoItem.getByRole('textbox', { name: 'Edit' }).press('Escape');
});

Then('the text should remain unchanged', async function () {
await expect(page.getByTestId('todo-item')).toHaveText(TODO_ITEMS);
});

When('the user adds todo items', async function () {
const newTodo = page.getByPlaceholder('What needs to be done?');
await newTodo.fill('buy some cheese');
await newTodo.press('Enter');
await newTodo.fill('feed the cat');
await newTodo.press('Enter');
});

Then('the counter should display the correct number of remaining items', async function () {
await expect(page.getByTestId('todo-count')).toContainText('2');
});

When('the user completes one item', async function () {
await page.locator('.todo-list li .toggle').first().check();
});

Then('the "Clear completed" button should be visible', async function () {
await expect(page.getByRole('button', { name: 'Clear completed' })).toBeVisible();
});

When('the user clicks "Clear completed"', async function () {
await page.getByRole('button', { name: 'Clear completed' }).click();
});

Then('only uncompleted items should remain', async function () {
await expect(page.getByTestId('todo-item')).toHaveCount(2);
});

When('all items are cleared', async function () {
await page.locator('.todo-list li .toggle').first().check();
await page.getByRole('button', { name: 'Clear completed' }).click();
});

Then('the "Clear completed" button should be hidden', async function () {
await expect(page.getByRole('button', { name: 'Clear completed' })).toBeHidden();
});

When('the user adds two todos and marks one completed', async function () {
const newTodo = page.getByPlaceholder('What needs to be done?');
await newTodo.fill('buy some cheese');
await newTodo.press('Enter');
await newTodo.fill('feed the cat');
await newTodo.press('Enter');
await page.getByTestId('todo-item').nth(0).getByRole('checkbox').check();
await page.reload();
});

Then('after reloading the page the data should remain the same', async function () {
const todoItems = page.getByTestId('todo-item');
await expect(todoItems).toHaveText(['buy some cheese', 'feed the cat']);
});

When('the user filters by Active', async function () {
await page.getByRole('link', { name: 'Active' }).click();
});

Then('only uncompleted items should be visible', async function () {
const items = await page.getByTestId('todo-item').allTextContents();
expect(items.length).toBeGreaterThan(0);
});

When('the user filters by Completed', async function () {
await page.getByRole('link', { name: 'Completed' }).click();
});

Then('only completed items should be visible', async function () {
await expect(page.getByTestId('todo-item')).toHaveCount(1);
});

When('the user filters by All', async function () {
await page.getByRole('link', { name: 'All' }).click();
});

Then('all items should be visible', async function () {
await expect(page.getByTestId('todo-item')).toHaveCount(3);
});

When('the user selects the {string} or {string} filter', async function (filter1: string, filter2: string) {
await page.getByRole('link', { name: filter1 }).click();
await page.getByRole('link', { name: filter2 }).click();
});

Then('the selected filter should be highlighted', async function () {
await expect(page.getByRole('link', { name: 'Completed' })).toHaveClass(/selected/);
});
