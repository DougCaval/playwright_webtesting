import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';
import { expect } from 'playwright/test';
import locators from '../locators/locators.json';

// Login com usuário e senha válidos

Given('que estou na página de login do Sauce Demo', async function (this: CustomWorld) {
    await this.page.goto('https://www.saucedemo.com/');
    });
When('informo um usuário válido', async function (this: CustomWorld) {
    await this.page.locator(locators.login.campoUsuario).fill('standard_user');
});
When('informo uma senha válida', async function (this: CustomWorld) {
    await this.page.locator(locators.login.campoSenha).fill('secret_sauce');
});
When('clico no botão de login', async function (this: CustomWorld) {
    await this.page.locator(locators.login.botaoLogin).click();
});
Then('devo ser direcionado para a página de produtos', async function (this: CustomWorld) {
    await this.page.waitForURL('**/inventory.html');
});


// Login com senha inválida
When('informo uma senha inválida', async function (this: CustomWorld) {
    await this.page.locator(locators.login.campoSenha).fill('wrong_password');
});     
Then('devo visualizar uma mensagem de erro informando que a senha está incorreta', async function (this: CustomWorld) {
    await expect(this.page.locator(locators.login.mensagemErro))
        .toContainText('Username and password do not match');
});


// Login com usuário inválido
When('informo um usuário inválido', async function (this: CustomWorld) {
    await this.page.locator(locators.login.campoUsuario).fill('invalid_user');
});     
Then('devo visualizar uma mensagem de erro informando login invalido', async function (this: CustomWorld) {
    await expect(this.page.locator(locators.login.mensagemErro))
        .toContainText('Username and password do not match');
});     


// Login com campos vazios
Then('devo visualizar uma mensagem informando que o usuário e a senha são obrigatórios', async function (this: CustomWorld) {
    await expect(this.page.locator(locators.login.mensagemErro))
        .toContainText('Username is required');
});


//Login com usuário bloqueado
When('informo o usuário bloqueado', async function (this: CustomWorld) {
    await this.page.locator(locators.login.campoUsuario).fill('locked_out_user');
});
Then('devo visualizar uma mensagem informando que o usuário está bloqueado', async function (this: CustomWorld) {
    await expect(this.page.locator(locators.login.mensagemErro))
        .toContainText('Sorry, this user has been locked out.');
});   

