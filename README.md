# SignalDeck

Quarto projeto do portfolio: um cockpit de analytics para perfis publicos do GitHub.

## O que ele demonstra

- consumo de API externa com fallback seguro
- charts animadas com Recharts
- layout inedito em relacao aos outros projetos
- leitura autoexplicativa para o usuario final
- estrutura de componentes reutilizaveis

## Rotina principal

1. buscar um usuario publico do GitHub
2. carregar perfil e repositorios
3. recalcular metricas, timeline, linguagem e comparativos
4. fallback para mock se a API falhar

## Como rodar

1. `npm install`
2. `npm run dev`
## Publicar no GitHub Pages

Este projeto esta preparado para GitHub Pages com export estatico do Next.js.

`ash
npm install
npm run build:static
`

Para publicar:

1. Envie o projeto para um repositorio no GitHub.
2. Garanta que a branch principal se chama main.
3. Em Settings > Pages, selecione GitHub Actions em Build and deployment.
4. Faca push para main.

O workflow .github/workflows/deploy.yml gera a pasta out/ e publica automaticamente.