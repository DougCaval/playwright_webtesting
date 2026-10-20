import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';
import { expect } from 'playwright/test';
import locators from '../locators/locators.json';

//Adicionar produtos ao carrinho
When('eu adiciono um produto ao carrinho', async function (this: CustomWorld) {
   await this.page.locator(locators.produtos.botaoBikeLight).click();
});
Then('o produto deve aparecer no carrinho', async function (this: CustomWorld) {
    await this.page.locator(locators.carrinho.iconeCarrinho).click();

    await expect(
        this.page.locator(locators.carrinho.itemCarrinho)
            .filter({ hasText: 'Sauce Labs Bike Light' })
    ).toBeVisible();
});
Then('o contador do carrinho deve ser atualizado', async function (this: CustomWorld) {
    await expect(this.page.locator(locators.carrinho.contadorCarrinho)).toHaveText('1');
});

//Adicionar múltiplos produtos ao carrinho

When('eu adiciono o primeiro produto ao carrinho', async function (this: CustomWorld) {
    await this.page.locator(locators.produtos.botaoBikeLight).click();
});
When('eu adiciono o segundo produto ao carrinho', async function (this: CustomWorld) {
    await this.page.locator(locators.produtos.botaoBoltTShirt).click();
});
Then('os dois produtos devem aparecer no carrinho', async function (this: CustomWorld) {
    await this.page.locator(locators.carrinho.iconeCarrinho).click();

    await expect(
        this.page.locator(locators.carrinho.itemCarrinho)
            .filter({ hasText: 'Sauce Labs Bike Light' })
    ).toBeVisible();

    await expect(
        this.page.locator(locators.carrinho.itemCarrinho)
            .filter({ hasText: 'Sauce Labs Bolt T-Shirt' })
    ).toBeVisible();
});
Then('o contador do carrinho deve apresentar dois itens', async function (this: CustomWorld) {
    await expect(
        this.page.locator(locators.carrinho.contadorCarrinho)
    ).toHaveText('2');
});


//Remover um produto do carrinho
Given('que existe um produto no carrinho', async function (this: CustomWorld) {
  await this.page.goto('https://www.saucedemo.com/');

  await this.page.locator(locators.login.campoUsuario).fill('standard_user');
  await this.page.locator(locators.login.campoSenha).fill('secret_sauce');
  await this.page.locator(locators.login.botaoLogin).click();

  await this.page.locator(locators.produtos.botaoBikeLight).click();
});
When('eu acesso o carrinho', async function (this: CustomWorld) {
  await this.page.locator(locators.carrinho.iconeCarrinho).click();
});
When('eu removo o produto do carrinho', async function (this: CustomWorld) {
  await this.page.locator(locators.carrinho.botaoRemoverBikeLight).click();
});
Then('o produto não deve aparecer no carrinho', async function (this: CustomWorld) {
  await expect(
    this.page.locator(locators.carrinho.itemCarrinho)
      .filter({ hasText: 'Sauce Labs Bike Light' })
  ).not.toBeVisible();
});
Then('o contador do carrinho não deve apresentar itens', async function (this: CustomWorld) {
  await expect(
    this.page.locator(locators.carrinho.contadorCarrinho)
  ).toHaveCount(0);
});

//Validar informações do produto no carrinho
Then('devo visualizar o nome correto do produto', async function (this: CustomWorld) {
  await expect(
    this.page.locator(locators.carrinho.itemCarrinho)
      .locator(locators.produtos.nomeProduto)
  ).toHaveText('Sauce Labs Bike Light');
});
Then('devo visualizar a quantidade correta do produto', async function (this: CustomWorld) {
  await expect(
    this.page.locator(locators.carrinho.itemCarrinho)
      .locator(locators.carrinho.quantidadeProduto)
  ).toHaveText('1');
});
Then('devo visualizar o preço correto do produto', async function (this: CustomWorld) {
  await expect(
    this.page.locator(locators.carrinho.itemCarrinho)
     .locator(locators.carrinho.precoProduto)
  ).toHaveText('$9.99');
});

//Validar informações do produto no carrinho
