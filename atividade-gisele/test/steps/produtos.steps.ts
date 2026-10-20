import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';
import { expect } from 'playwright/test';
import locators from '../locators/locators.json';       


//Visualizar a lista de produtos
When('acesso a página de produtos', async function (this: CustomWorld) {
    await expect(this.page).toHaveURL(/inventory\.html/);
});     
Then('devo visualizar a lista de produtos disponíveis', async function (this: CustomWorld) {
    const productList = this.page.locator(locators.produtos.listaProdutos);
    await expect(productList.first()).toBeVisible();
    const productCount = await productList.count();
    expect(productCount).toBeGreaterThan(0);
});
Then('cada produto deve apresentar nome, preço e imagem', async function (this: CustomWorld) {
    const productItems = await this.page.locator(locators.produtos.listaProdutos);
    const productCount = await productItems.count();                                                                                                            
    for (let i = 0; i < productCount; i++) {
        const productName = await productItems.nth(i).locator(locators.produtos.nomeProduto);
        const productPrice = await productItems.nth(i).locator(locators.produtos.precoProduto);
        const productImage = productItems.nth(i).locator(locators.produtos.imagemProduto);      
            await expect(productName).toBeVisible();
            await expect(productPrice).toBeVisible();
            await expect(productImage).toBeVisible();
    }
    });     
                

    //Ordenar produtos por preço crescente
Given('que estou na página de produtos', async function (this: CustomWorld) {
    await this.page.goto('https://www.saucedemo.com/');
    await this.page.locator(locators.login.campoUsuario).fill('standard_user');
    await this.page.locator(locators.login.campoSenha).fill('secret_sauce');
    await this.page.locator(locators.login.botaoLogin).click();
    await expect(this.page).toHaveURL(/inventory\.html/);
});
When('seleciono a ordenação por preço crescente', async function (this: CustomWorld) {
    await this.page.locator(locators.produtos.ordenacaoProdutos).selectOption('lohi');
});
Then('os produtos devem ser apresentados do menor para o maior preço', async function (this: CustomWorld) {
    const productPrices = await this.page.locator(locators.produtos.precoProduto);
    const prices: number[] = [];
    const productCount = await productPrices.count();                                                                                                                                                                                                                                                                                                                                                                                                           
    for (let i = 0; i < productCount; i++) {
        const priceText = await productPrices.nth(i).textContent();
        if (priceText) {
            const price = parseFloat(priceText.replace('$', ''));
            prices.push(price);
        }
    }
    const sortedPrices = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sortedPrices);
}); 

//Ordenar produtos por preço decrescente

When('eu seleciono a ordenação por preço decrescente', async function (this: CustomWorld) {
    await this.page.locator(locators.produtos.ordenacaoProdutos).selectOption('hilo');
}); 
Then('os produtos devem ser apresentados do maior para o menor preço', async function (this: CustomWorld) {
    const productPrices = await this.page.locator(locators.produtos.precoProduto);
    const prices: number[] = [];
    const productCount = await productPrices.count();
    for (let i = 0; i < productCount; i++) {
        const priceText = await productPrices.nth(i).textContent(); 
        if (priceText) {
            const price = parseFloat(priceText.replace('$', ''));
            prices.push(price);
        }   
    }
    const sortedPrices = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sortedPrices);
});         