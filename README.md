# Automação E2E com Cypress

Este repositório contém testes E2E da loja QAZANDO para fins de estudo e prática de automação com Cypress.

## Requisitos

- Node.js 24
- npm

## Instalação

```bash
git clone https://github.com/slusarzrafael/qazandoshop-cypress-test.git
cd qazandoshop-cypress-test
npm ci
```

## Executar os testes

Todos os testes:

```bash
npm run cy:run
```

Uma suíte específica:

| Suíte | Comando |
|---|---|
| Acessibilidade | `npm run cy:run:a11y` |
| Carrinho | `npm run cy:run:carrinho` |
| Catálogo | `npm run cy:run:catalogo` |
| Checkout | `npm run cy:run:checkout` |
| Conta e autenticação | `npm run cy:run:conta` |
| Contato | `npm run cy:run:contato` |
| FAQ | `npm run cy:run -- --spec cypress/e2e/faq/faq.cy.js` |
| Navegação | `npm run cy:run:navegacao` |
| Rastreamento de pedidos | `npm run cy:run:pedidos` |
| Responsividade | `npm run cy:run:responsivo` |

Para abrir o Cypress e executar visualmente:

```bash
npm run cy:open
```

Os specs ficam em `cypress/e2e/`. Vídeos e screenshots de falhas são salvos em `cypress/videos/` e `cypress/screenshots/`.

## GitHub Actions

O workflow em `.github/workflows/cypress.yml` executa a suíte completa em cada `push`. Para ver as execuções, abra a aba **Actions** do repositório e selecione **Cypress E2E**.

### Cypress Cloud

As execuções do CI também ficam disponíveis publicamente no Cypress Cloud, com resultados, erros, screenshots e vídeos de cada spec:

**[Ver execuções no Cypress Cloud](https://cloud.cypress.io/projects/wyg2aw/runs)**

O workflow grava os resultados no Cypress Cloud. Para ativar o vínculo:

1. O Project ID do Cypress Cloud (`wyg2aw`) já está em `cypress.config.js`.
2. No Environment `CYPRESS_RECORD_KEY`, adicione o secret `CYPRESS_RECORD_KEY` com a Record Key do projeto.
3. Faça um `push` ou execute o workflow pela aba **Actions**.

O Project ID é público. A Record Key é secreta e não deve ser commitada nem compartilhada no código. Execuções locais continuam funcionando sem essas configurações; o modo de gravação é usado pelo GitHub Actions.