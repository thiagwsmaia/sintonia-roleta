# Sintonia Roleta

Um jogo local para grupos: uma pessoa ve o alvo secreto, da uma dica dentro de
um tema, e o resto da mesa tenta posicionar o ponteiro no lugar certo.

## Como jogar

1. Abra uma nova rodada.
2. A pessoa da vez olha o alvo secreto e escreve/fala uma dica.
3. O grupo discute e move o ponteiro.
4. Revele o alvo, some os pontos e troque a pessoa da vez.

## Rodar localmente

Requisitos:

- Node.js 22.13 ou superior

Comandos:

```bash
npm install
npm run dev
```

Depois abra o endereco local mostrado no terminal.

## Build

```bash
npm run build
npm test
```

## Customizar cartas

As cartas ficam em `app/page.tsx`, no array `cards`. Cada carta tem:

- `theme`: tema da rodada
- `left`: extremo esquerdo da escala
- `right`: extremo direito da escala
- `examples`: exemplos rapidos para inspirar a dica

## Licenca

MIT
