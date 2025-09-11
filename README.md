# Playwright + Cucumber + Allure Boilerplate (TypeScript)

This project demonstrates how to build a **Playwright + Cucumber (BDD)** testing framework with **Allure reporting** from scratch, using **TypeScript** and `ts-node` to run `.ts` step definitions.

---

## 📦 Requirements

- [Node.js](https://nodejs.org/) (>= 18 recommended)
- [Java 8+](https://adoptopenjdk.net/) (required for Allure CLI to generate reports)
- npm or yarn

---

## 🚀 Setup

### 1. Initialize project

```bash
mkdir pw-cucumber-allure
cd pw-cucumber-allure
npm init -y


# Playwright + browsers
npm i -D playwright

# Cucumber (runner), TypeScript, ts-node, types
npm i -D @cucumber/cucumber typescript ts-node @types/node

# Allure adapter p/ cucumber + allure-cli
npm i -D allure-cucumberjs allure-commandline

# formatador opcional (melhora saída no console)
npm i -D @cucumber/pretty-formatter


npx playwright install


npx tsc --init


pw-cucumber-allure/
├─ features/
│  └─ login.feature
├─ test/
│  ├─ steps/
│  │  └─ login.steps.ts
│  └─ support/
│     ├─ world.ts
│     └─ hooks.ts
├─ cucumber.js
├─ tsconfig.json
└─ package.json

#To run 

##Headless mode 
npx playwright test

##UI mode 

npx playwright test --ui

#Allure Reports
npx allure generate ./allure-results --clean -o ./allure-report
npx allure open ./allure-report
