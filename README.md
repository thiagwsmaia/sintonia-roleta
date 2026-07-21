# Sintonia Roleta

Um jogo local para grupos: uma pessoa ve o alvo secreto, da uma dica dentro de
um tema, e o resto da mesa tenta posicionar o ponteiro no lugar certo. A base
vem com 50 temas e sugestoes de dicas para acelerar as rodadas.

## Como jogar

1. Abra uma nova rodada.
2. A pessoa da vez usa a Area do mestre para definir onde fica a faixa maxima.
3. Ela escolhe uma dica que combine com aquele ponto da escala.
4. O grupo discute e move o ponteiro.
5. Revele o alvo, some os pontos e troque a pessoa da vez.

## Pontuacao

- 4 pontos: distancia de 0 a 2 do alvo
- 3 pontos: distancia de 3 a 5 do alvo
- 2 pontos: distancia de 6 a 8 do alvo
- 1 ponto: distancia de 9 a 12 do alvo
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
