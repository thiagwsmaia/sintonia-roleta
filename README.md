# Sintonia Roleta

Um jogo local para grupos: uma pessoa ve o alvo secreto, da uma dica dentro de
um tema, e o resto da mesa tenta posicionar o ponteiro no lugar certo. A base
vem com 50 temas e sugestoes de dicas para acelerar as rodadas.

## Como jogar

1. Abra uma nova rodada.
2. A pessoa da vez segura o botao do mestre, olha o alvo secreto e escolhe uma dica.
3. O grupo discute e move o ponteiro.
4. Revele o alvo, some os pontos e troque a pessoa da vez.

## Pontuacao

- 4 pontos: distancia de 0 a 4 do alvo
- 3 pontos: distancia de 5 a 9 do alvo
- 2 pontos: distancia de 10 a 16 do alvo
- 1 ponto: distancia de 17 a 24 do alvo
- 0 pontos: qualquer palpite mais distante

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
- `ideas`: exemplos rapidos para inspirar a dica

## Licenca

MIT
