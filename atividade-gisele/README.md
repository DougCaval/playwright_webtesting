# Automação de Testes Web — Playwright + Cucumber + TypeScript

## Sobre o projeto

Projeto de automação de testes desenvolvido para validar funcionalidades da aplicação web [SauceDemo](https://www.saucedemo.com/), utilizando Playwright, Cucumber e TypeScript.

O projeto utiliza a abordagem BDD (*Behavior Driven Development*), com cenários escritos em Gherkin, permitindo descrever os comportamentos esperados da aplicação de forma clara e organizada.

## Tecnologias utilizadas

- Playwright — automação de testes web
- Cucumber — execução de cenários BDD
- TypeScript — linguagem de programação
- Gherkin — descrição dos cenários de teste
- Node.js — ambiente de execução
- Allure Report — geração de relatórios de testes
- Git e GitHub — versionamento do projeto

## Funcionalidades testadas

Foram automatizados 15 cenários de teste, distribuídos em quatro funcionalidades.

| Funcionalidade | Quantidade de cenários |
|---|---:|
| Login | 5 |
| Produtos | 3 |
| Carrinho de compras | 4 |
| Finalização de compra | 3 |
| **Total** | **15** |

Os testes contemplam autenticação, validação de mensagens de erro, visualização e ordenação de produtos, operações no carrinho e fluxo de checkout.

## Estrutura do projeto

```text
pw-cucumber-allure/
├── features/
│   ├── login.feature
│   ├── produtos.feature
│   ├── carrinho.feature
│   └── checkout.feature
├── test/
│   ├── steps/
│   │   ├── login.steps.ts
│   │   ├── produtos.steps.ts
│   │   ├── carrinho.steps.ts
│   │   └── checkout.steps.ts
│   ├── locators/
│   │   └── locators.json
│   └── support/
│       ├── hooks.ts
│       └── world.ts
├── cucumber.js
├── package.json
├── package-lock.json
├── tsconfig.json
├── .gitignore
└── README.md
```

## Como executar o projeto

**1. Clonar o repositório**

```bash
git clone URL_DO_REPOSITORIO
```

**2. Acessar a pasta do projeto**

```bash
cd pw-cucumber-allure
```

**3. Instalar as dependências**

```bash
npm install
```

**4. Instalar o navegador utilizado pelo Playwright**

```bash
npx playwright install chromium
```

**5. Executar os testes automatizados**

```bash
npx cucumber-js
```

## Relatório Allure

Os resultados das execuções são armazenados na pasta `allure-results`, utilizada para gerar o relatório Allure.

Para visualizar o relatório no navegador:

```bash
npx allure serve allure-results
```

Para gerar uma versão do relatório na pasta `allure-report`:

```bash
npx allure generate allure-results --clean -o allure-report
```

## Resultado da execução

Na execução final realizada em 20/10/2026, foram obtidos os seguintes resultados:

- **15 cenários executados**
- **15 cenários aprovados**
- **0 cenários com falha**
- **100% de aprovação**

Os resultados foram confirmados no relatório Allure.

## Objetivo

Aplicar conhecimentos de Quality Assurance (QA), incluindo planejamento de cenários, automação de testes funcionais, organização de localizadores, execução automatizada e análise de resultados.

O projeto também tem como objetivo demonstrar conhecimentos práticos em automação de testes para composição de portfólio profissional de QA.