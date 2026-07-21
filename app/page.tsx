"use client";

import { useEffect, useMemo, useState } from "react";

type Card = {
  theme: string;
  left: string;
  right: string;
  examples: string[];
};

type Round = {
  card: Card;
  target: number;
  band: number;
};

const cards: Card[] = [
  {
    theme: "Traicao",
    left: "Quase nada",
    right: "Imperdoavel",
    examples: ["Curtir foto antiga", "Mentir sobre rolê", "Beijar outra pessoa"],
  },
  {
    theme: "Vergonha alheia",
    left: "Fofo",
    right: "Sumir da cidade",
    examples: ["Mandar audio errado", "Cair na festa", "Chamar a professora de mãe"],
  },
  {
    theme: "Gasto sem noção",
    left: "Economia",
    right: "Falência emocional",
    examples: ["Delivery caro", "Skin de jogo", "Comprar ingresso sem olhar preço"],
  },
  {
    theme: "Crime contra a amizade",
    left: "Perdoavel",
    right: "Fim do grupo",
    examples: ["Demorar pra responder", "Furar rolê", "Ver episódio sem a pessoa"],
  },
  {
    theme: "Sinal de maturidade",
    left: "Ainda caos",
    right: "Adulto premium",
    examples: ["Lavar louça na hora", "Pedir desculpa direito", "Guardar dinheiro"],
  },
  {
    theme: "Drama de família",
    left: "Tranquilo",
    right: "Ceia cancelada",
    examples: ["Opinar no cabelo", "Comparar primos", "Falar de política no almoço"],
  },
  {
    theme: "Coragem",
    left: "Medinho",
    right: "Sem amor à vida",
    examples: ["Cantar no karaoke", "Pedir aumento", "Mandar mensagem pro crush"],
  },
  {
    theme: "Pecado gastronomico",
    left: "Aceitavel",
    right: "Chamar a policia",
    examples: ["Ketchup na pizza", "Feijão doce", "Queijo em tudo"],
  },
];

const initialRound: Round = {
  card: cards[0],
  target: 72,
  band: 9,
};

function makeRound(): Round {
  return {
    card: cards[Math.floor(Math.random() * cards.length)],
    target: Math.floor(8 + Math.random() * 84),
    band: 9,
  };
}

function scoreFor(distance: number) {
  if (distance <= 4) return 4;
  if (distance <= 9) return 3;
  if (distance <= 16) return 2;
  if (distance <= 24) return 1;
  return 0;
}

function angleFor(value: number) {
  return -132 + value * 2.64;
}

export default function Home() {
  const [round, setRound] = useState<Round>(initialRound);
  const [guess, setGuess] = useState(50);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [roundNumber, setRoundNumber] = useState(1);
  const [clue, setClue] = useState("");
  const [lastPoints, setLastPoints] = useState<number | null>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setRound(makeRound()));
    return () => cancelAnimationFrame(frame);
  }, []);

  const distance = Math.abs(guess - round.target);
  const currentPoints = scoreFor(distance);
  const targetStart = Math.max(0, round.target - round.band);
  const targetSize = Math.min(100, round.target + round.band) - targetStart;

  const dialStyle = useMemo(
    () =>
      ({
        "--guess-angle": `${angleFor(guess)}deg`,
        "--target-angle": `${angleFor(round.target)}deg`,
        "--target-start": `${targetStart}%`,
        "--target-size": `${targetSize}%`,
      }) as React.CSSProperties,
    [guess, round.target, targetSize, targetStart],
  );

  function nextRound() {
    setRound(makeRound());
    setGuess(50);
    setRevealed(false);
    setClue("");
    setLastPoints(null);
    setRoundNumber((value) => value + 1);
  }

  function reveal() {
    setRevealed(true);
    setLastPoints(currentPoints);
    setScore((value) => value + currentPoints);
  }

  return (
    <main className="game-shell">
      <section className="hero-band">
        <nav className="topbar" aria-label="Jogo">
          <div className="brand-mark" aria-hidden="true">
            SR
          </div>
          <div>
            <p className="eyebrow">jogo de mesa local</p>
            <h1>Sintonia Roleta</h1>
          </div>
          <div className="score-pill" aria-label={`Pontuacao total ${score}`}>
            <span>{score}</span>
            pontos
          </div>
        </nav>

        <div className="stage">
          <aside className="round-panel">
            <p className="eyebrow">rodada {roundNumber}</p>
            <h2>{round.card.theme}</h2>
            <div className="scale-labels">
              <span>{round.card.left}</span>
              <span>{round.card.right}</span>
            </div>
            <div className="example-stack" aria-label="Exemplos de cartas">
              {round.card.examples.map((example) => (
                <span key={example}>{example}</span>
              ))}
            </div>
            <label className="clue-box">
              <span>Dica da pessoa que viu o alvo</span>
              <input
                value={clue}
                onChange={(event) => setClue(event.target.value)}
                placeholder="ex: beijar outra pessoa"
              />
            </label>
          </aside>

          <section className={`dial-card ${revealed ? "is-revealed" : ""}`}>
            <div className="dial" style={dialStyle} aria-label="Roleta de palpite">
              <div className="dial-face">
                <div className="target-arc" />
                <div className="needle target-needle" />
                <div className="needle guess-needle" />
                <div className="hub">
                  <span>{guess}</span>
                  <small>palpite</small>
                </div>
              </div>
            </div>

            <div className="range-row">
              <span>{round.card.left}</span>
              <input
                aria-label="Mover ponteiro"
                type="range"
                min="0"
                max="100"
                value={guess}
                onChange={(event) => setGuess(Number(event.target.value))}
                disabled={revealed}
              />
              <span>{round.card.right}</span>
            </div>

            <div className="controls">
              <button className="primary-button" onClick={reveal} disabled={revealed}>
                Revelar alvo
              </button>
              <button className="ghost-button" onClick={nextRound}>
                Nova rodada
              </button>
            </div>
          </section>

          <aside className="result-panel">
            <p className="eyebrow">alvo secreto</p>
            <div className="target-readout">
              {revealed ? round.target : "??"}
              <span>/100</span>
            </div>
            <div className="meter">
              <span style={{ width: revealed ? `${100 - distance}%` : "42%" }} />
            </div>
            <div className="result-copy">
              {revealed ? (
                <>
                  <strong>{currentPoints} pontos</strong>
                  <span>distancia de {distance}</span>
                </>
              ) : (
                <>
                  <strong>Alvo escondido</strong>
                  <span>A pessoa da dica olha, o grupo gira.</span>
                </>
              )}
            </div>
            {lastPoints !== null ? (
              <p className="last-score">Somou {lastPoints} nesta rodada.</p>
            ) : null}
          </aside>
        </div>
      </section>

      <section className="rules-band" aria-label="Fluxo da rodada">
        <div>
          <span>1</span>
          <p>Uma pessoa vê o alvo e escolhe a dica.</p>
        </div>
        <div>
          <span>2</span>
          <p>O grupo debate e posiciona o ponteiro.</p>
        </div>
        <div>
          <span>3</span>
          <p>Revela, soma pontos e troca o mestre.</p>
        </div>
      </section>
    </main>
  );
}
