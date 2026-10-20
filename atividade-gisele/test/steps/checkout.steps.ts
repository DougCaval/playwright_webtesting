import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';
import { expect } from 'playwright/test';
import locators from '../locators/locators.json';

//Finalizar compra com dados válidos
When('eu inicio a finalização da compra', async function (this: CustomWorld) {
  await this.page.locator(locators.carrinho.iconeCarrinho).click();
  await this.page.locator(locators.checkout.botaoCheckout).click();
});
When('preencho os dados obrigatórios corretamente', async function (this: CustomWorld) {
  await this.page.locator(locators.checkout.campoNome).fill('John');
  await this.page.locator(locators.checkout.campoSobrenome).fill('Doe');
  await this.page.locator(locators.checkout.campoCep).fill('12345');
  await this.page.locator(locators.checkout.botaoContinuar).click();
});
When('confirmo a finalização da compra', async function (this: CustomWorld) {
    await this.page.locator(locators.checkout.botaoFinalizar).click();
});
Then('devo visualizar a mensagem de compra concluída com sucesso', async function (this: CustomWorld) {
  await expect(
    this.page.locator(locators.checkout.mensagemSucesso)
  ).toHaveText('Thank you for your order!');
});

//Validar campos obrigatórios do checkout
Then('tento continuar sem preencher os dados obrigatórios', async function (this: CustomWorld) {
    await this.page.locator(locators.checkout.botaoContinuar).click();
}); 
Then('devo visualizar uma mensagem de campo obrigatório', async function (this: CustomWorld) {
  await expect(
    this.page.locator(locators.checkout.mensagemErro)
  ).toHaveText('Error: First Name is required');
});

//Cancelar a finalização da compra
When('cancelo a finalização da compra', async function (this: CustomWorld) {
    await this.page.locator(locators.checkout.botaoCancelar).click();
});