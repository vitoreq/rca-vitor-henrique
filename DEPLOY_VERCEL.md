# Deploy no GitHub + Vercel

Este projeto está preparado para publicar o site na Vercel usando:

- arquivos estáticos na raiz: `index.html`, `styles.css`, `app.js`
- função segura de backend: `api/analyze.js`
- variáveis de ambiente na Vercel: `OPENAI_API_KEY` e `OPENAI_MODEL`

## 1. Antes de subir para o GitHub

Confirme que o arquivo `.env` não será enviado. Ele já está no `.gitignore`.

Não coloque sua chave da OpenAI em nenhum arquivo do GitHub.

## 2. Criar repositório no GitHub

1. Acesse https://github.com
2. Crie um novo repositório, por exemplo `rca-vitor-henrique`
3. Deixe privado no início, se preferir
4. Suba os arquivos do projeto

## 3. Conectar na Vercel

1. Acesse https://vercel.com
2. Faça login com sua conta do GitHub
3. Clique em `Add New` > `Project`
4. Escolha o repositório do RCA
5. Framework: deixe como `Other`
6. Build command: deixe vazio
7. Output directory: deixe vazio
8. Clique em `Deploy`

## 4. Configurar variáveis de ambiente

No projeto da Vercel:

1. Abra `Settings`
2. Abra `Environment Variables`
3. Adicione:

```env
OPENAI_API_KEY=sua_chave_da_openai
OPENAI_MODEL=gpt-5.5
```

4. Salve
5. Faça um novo deploy

## 5. Testar

Abra a URL gerada pela Vercel, por exemplo:

```text
https://rca-vitor-henrique.vercel.app
```

Clique em `Generate example` e depois em `Analyze`.

## Observação importante

A análise com `gpt-5.5` pode demorar. A função da Vercel foi configurada com limite de 60 segundos. Se o plano usado na Vercel não permitir esse tempo ou se a análise demorar mais que isso, a chamada pode expirar. Nesse caso, as opções são:

- reduzir a complexidade do schema;
- usar um modelo mais rápido para deploy público;
- contratar um plano com maior limite de execução;
- hospedar o backend em Render, Railway ou Azure App Service.
