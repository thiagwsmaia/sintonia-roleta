"use client";

import { useEffect, useMemo, useState } from "react";

type Card = {
  theme: string;
  left: string;
  right: string;
  ideas: string[];
};

type Round = {
  card: Card;
  target: number;
};

const cards: Card[] = [
  { theme: "Filme", left: "Filme bom", right: "Filme ruim", ideas: ["Titanic", "Velozes e Furiosos 9", "Shrek", "Cats", "Barbie", "Crepusculo"] },
  { theme: "Traicao", left: "Quase nada", right: "Imperdoavel", ideas: ["Curtir foto antiga", "Apagar conversa", "Beijar outra pessoa", "Ter app de namoro", "Mentir sobre rolê", "Dormir na casa do ex"] },
  { theme: "Vergonha alheia", left: "Fofo", right: "Sumir da cidade", ideas: ["Mandar audio errado", "Cair na festa", "Chamar a professora de mãe", "Dançar sozinho", "Errar parabens", "Falar alto no cinema"] },
  { theme: "Gasto sem noção", left: "Investimento", right: "Falencia emocional", ideas: ["Delivery caro", "Skin de jogo", "Ingresso VIP", "Air fryer nova", "Curso que nunca abre", "Uber de 3 quadras"] },
  { theme: "Crime contra amizade", left: "Perdoavel", right: "Fim do grupo", ideas: ["Demorar pra responder", "Furar rolê", "Ver episodio sem a pessoa", "Vazar segredo", "Sumir no aniversario", "Nao defender no grupo"] },
  { theme: "Maturidade", left: "Ainda caos", right: "Adulto premium", ideas: ["Lavar louça na hora", "Pedir desculpa direito", "Guardar dinheiro", "Marcar medico", "Ler contrato", "Dormir cedo"] },
  { theme: "Drama de familia", left: "Tranquilo", right: "Ceia cancelada", ideas: ["Opinar no cabelo", "Comparar primos", "Falar de politica", "Perguntar namoro", "Criticar comida", "Lembrar heranca"] },
  { theme: "Coragem", left: "Medinho", right: "Sem amor a vida", ideas: ["Cantar karaoke", "Pedir aumento", "Mandar mensagem pro crush", "Fazer stand-up", "Pular de paraquedas", "Cortar o cabelo radical"] },
  { theme: "Comida", left: "Delicia", right: "Crime culinario", ideas: ["Pizza de abacaxi", "Sushi quente", "Ketchup na pizza", "Strogonoff", "Feijao doce", "Queijo em tudo"] },
  { theme: "Primeiro encontro", left: "Fofo", right: "Alerta vermelho", ideas: ["Levar flor", "Falar do ex", "Dividir conta", "Chegar atrasado", "Escolher cinema", "Pedir casamento"] },
  { theme: "Mensagem", left: "Educada", right: "Passivo-agressiva", ideas: ["Ok.", "Bom dia sumido", "A gente conversa depois", "Kkk", "Como voce quiser", "Visualizou e sumiu"] },
  { theme: "Presente", left: "Perfeito", right: "Constrangedor", ideas: ["Livro", "Meia", "Perfume forte", "Vale-presente", "Dinheiro", "Panela"] },
  { theme: "Musica", left: "Obra-prima", right: "Pular agora", ideas: ["Evidencias", "Baby Shark", "Anitta", "Bohemian Rhapsody", "Pagode antigo", "Jingle de loja"] },
  { theme: "Festa", left: "Rolê lendario", right: "Ir embora cedo", ideas: ["Open bar", "Fila enorme", "DJ bom", "Som estourado", "Ex no local", "Sem banheiro"] },
  { theme: "Pessoa famosa", left: "Querida", right: "Cancelavel", ideas: ["Keanu Reeves", "Neymar", "Taylor Swift", "Elon Musk", "Influencer fitness", "Apresentador antigo"] },
  { theme: "Aplicativo", left: "Essencial", right: "Desinstalar", ideas: ["WhatsApp", "TikTok", "LinkedIn", "Uber", "Tinder", "App de banco"] },
  { theme: "Superpoder", left: "Incrivel", right: "Inutil", ideas: ["Voar", "Ler mentes", "Ficar invisivel", "Falar com peixe", "Dormir rapido", "Achar controle remoto"] },
  { theme: "Desculpa", left: "Aceitavel", right: "Ninguem acredita", ideas: ["Transito", "Bateria acabou", "Cachorro comeu", "Dormi sem querer", "Tive reunião", "Esqueci total"] },
  { theme: "Vilao", left: "Tem razao", right: "Maldade pura", ideas: ["Thanos", "Scar", "Darth Vader", "Coringa", "Miranda Priestly", "Regina George"] },
  { theme: "Herói", left: "Inspirador", right: "Insuportavel", ideas: ["Batman", "Homem de Ferro", "Superman", "Capitao America", "Shrek", "Harry Potter"] },
  { theme: "Moda", left: "Estiloso", right: "Nao da", ideas: ["Crocs", "Calça skinny", "Pochete", "Oculos Juliet", "Look all black", "Chinelo com meia"] },
  { theme: "Casa", left: "Aconchegante", right: "Caotica", ideas: ["Planta na sala", "Louça na pia", "Cheiro de café", "Cama sem lençol", "Banheiro molhado", "Luz branca"] },
  { theme: "Viagem", left: "Sonho", right: "Perrengue", ideas: ["Praia vazia", "Hostel barato", "Mala perdida", "Chuva todo dia", "Upgrade gratis", "Voo de madrugada"] },
  { theme: "Trabalho", left: "Profissional", right: "Pedir demissao", ideas: ["Reunião curta", "Chefe no WhatsApp", "Planilha linda", "Feedback surpresa", "Happy hour obrigatorio", "Sistema fora"] },
  { theme: "Escola", left: "Nostalgia", right: "Trauma", ideas: ["Recreio", "Prova oral", "Educação fisica", "Trabalho em grupo", "Chamada", "Feira de ciencias"] },
  { theme: "Bebida", left: "Perfeita", right: "Arrependimento", ideas: ["Agua gelada", "Caipirinha", "Energético", "Suco detox", "Cerveja quente", "Cafe sem açucar"] },
  { theme: "Animal de estimação", left: "Anjo", right: "Terror da casa", ideas: ["Dormir no colo", "Comer chinelo", "Derrubar vaso", "Pedir carinho", "Latir 3h", "Roubar comida"] },
  { theme: "Reality show", left: "Entretenimento puro", right: "Vergonha nacional", ideas: ["BBB treta", "Prova de resistencia", "Casal fake", "Votação surpresa", "Barraco ao vivo", "Eliminação injusta"] },
  { theme: "Esporte", left: "Lindo de ver", right: "Sofrimento", ideas: ["Gol no final", "VAR", "Penalty perdido", "Virada historica", "0 a 0", "Torcida cantando"] },
  { theme: "Tecnologia", left: "Revolucionaria", right: "So complica", ideas: ["Pix", "Senha facial", "Chatbot", "Smartwatch", "Geladeira smart", "Atualização obrigatoria"] },
  { theme: "Grupo de WhatsApp", left: "Util", right: "Silenciar pra sempre", ideas: ["Grupo da familia", "Grupo do predio", "Memes", "Bom dia com flor", "Audio de 5 min", "Aviso importante"] },
  { theme: "Transporte", left: "Confortavel", right: "Teste de paciencia", ideas: ["Metro vazio", "Onibus lotado", "Carona boa", "Moto app", "Voo com criança", "Trem atrasado"] },
  { theme: "Banheiro publico", left: "Aceitavel", right: "Zona de guerra", ideas: ["Shopping", "Posto de estrada", "Aeroporto", "Bar lotado", "Praia", "Casa de amigo"] },
  { theme: "Cafe da manha", left: "Perfeito", right: "Triste", ideas: ["Pão quente", "Fruta", "Cereal murcho", "Cafe frio", "Hotel buffet", "Bolacha agua e sal"] },
  { theme: "Mentira", left: "Inofensiva", right: "Muito grave", ideas: ["Gostei do presente", "Ja estou chegando", "Li os termos", "Estou bem", "Nao vi sua mensagem", "Nunca fiz isso"] },
  { theme: "Pix", left: "Justo", right: "Abusivo", ideas: ["R$ 2", "R$ 17,43", "Dividir gasolina", "Cobrar bala", "Conta do date", "Presente coletivo"] },
  { theme: "Sogra", left: "Parceira", right: "Chefona final", ideas: ["Levar comida", "Opinar na casa", "Ligar todo dia", "Defender voce", "Comparar ex", "Aparecer sem avisar"] },
  { theme: "Criança", left: "Uma graça", right: "Caos absoluto", ideas: ["Fantasia fofa", "Birra no mercado", "Pergunta sincera", "Desenho na parede", "Riso contagiante", "Choro no avião"] },
  { theme: "Cabelo", left: "Transformação", right: "Arrependimento", ideas: ["Franja", "Loiro platinado", "Raspar", "Cortar em casa", "Hidratação", "Tinta fantasia"] },
  { theme: "Academia", left: "Saudavel", right: "Humilhação publica", ideas: ["Esteira", "Agachamento", "Selfie no espelho", "Personal gritando", "Primeira aula", "Esquecer toalha"] },
  { theme: "Decoracao", left: "Chique", right: "Casa de terror", ideas: ["Luz quente", "Quadro abstrato", "Tapete peludo", "Parede cinza", "Muitos espelhos", "Enfeite de porcelana"] },
  { theme: "Internet antiga", left: "Saudade", right: "Ainda bem que acabou", ideas: ["MSN", "Orkut", "Depoimento", "Lan house", "Foto com glitter", "Corrente de email"] },
  { theme: "Nome de bebê", left: "Lindo", right: "Processo futuro", ideas: ["Alice", "Enzo", "Thor", "Valentina", "Kayky", "Princesa"] },
  { theme: "Tatuagem", left: "Arte", right: "Laser urgente", ideas: ["Nome do amor", "Frase em ingles", "Estrela", "Pet", "Codigo de barras", "Desenho autoral"] },
  { theme: "Pedido de desculpas", left: "Maduro", right: "Piorou tudo", ideas: ["Foi mal se voce se ofendeu", "Eu errei", "Mas voce tambem", "Comprei chocolate", "Sumir por dias", "Texto enorme"] },
  { theme: "Morar junto", left: "Romantico", right: "Teste final", ideas: ["Dividir aluguel", "Louça", "Escolher sofá", "Conta conjunta", "Ronco", "Faxina de domingo"] },
  { theme: "Objeto perdido", left: "Tanto faz", right: "Desespero", ideas: ["Caneta", "Chave", "Celular", "Documento", "Fone esquerdo", "Aliança"] },
  { theme: "Cheiro", left: "Maravilhoso", right: "Evacuar", ideas: ["Pão assando", "Gasolina", "Perfume doce", "Chulé", "Chuva", "Comida no microondas"] },
  { theme: "Som", left: "Agradavel", right: "Insuportavel", ideas: ["Chuva", "Unha no quadro", "Notificação", "Risada alta", "Obra cedo", "Pipoca estourando"] },
  { theme: "Habilidade social", left: "Carismatico", right: "Sem condição", ideas: ["Puxar assunto", "Cortar alguem", "Dar feedback", "Fazer brinde", "Sair sem despedir", "Lembrar nome"] },
];

const scoreBands = [
  { points: 4, label: "centro", range: "0-2" },
  { points: 3, label: "colado", range: "3-5" },
  { points: 2, label: "perto", range: "6-8" },
  { points: 1, label: "borda", range: "9-12" },
];

const initialRound: Round = {
  card: cards[0],
  target: 50,
};

function makeRound(): Round {
  return {
    card: cards[Math.floor(Math.random() * cards.length)],
    target: 50,
  };
}

function scoreFor(distance: number) {
  if (distance <= 2) return 4;
  if (distance <= 5) return 3;
  if (distance <= 8) return 2;
  if (distance <= 12) return 1;
  return 0;
}

function angleFor(value: number) {
  return -132 + value * 2.64;
}

export default function Home() {
  const [round, setRound] = useState<Round>(initialRound);
  const [leftLabel, setLeftLabel] = useState(initialRound.card.left);
  const [rightLabel, setRightLabel] = useState(initialRound.card.right);
  const [guess, setGuess] = useState(50);
  const [revealed, setRevealed] = useState(false);
  const [peeking, setPeeking] = useState(false);
  const [score, setScore] = useState(0);
  const [roundNumber, setRoundNumber] = useState(1);
  const [clue, setClue] = useState("");
  const [lastPoints, setLastPoints] = useState<number | null>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const next = makeRound();
      setRound(next);
      setLeftLabel(next.card.left);
      setRightLabel(next.card.right);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const distance = Math.abs(guess - round.target);
  const currentPoints = scoreFor(distance);
  const showTarget = peeking || revealed;

  const dialStyle = useMemo(
    () =>
      ({
        "--guess-angle": `${angleFor(guess)}deg`,
        "--target-angle": `${angleFor(round.target)}deg`,
      }) as React.CSSProperties,
    [guess, round.target],
  );

  function nextRound() {
    const next = makeRound();
    setRound(next);
    setLeftLabel(next.card.left);
    setRightLabel(next.card.right);
    setGuess(50);
    setRevealed(false);
    setPeeking(false);
    setClue("");
    setLastPoints(null);
    setRoundNumber((value) => value + 1);
  }

  function setTarget(target: number) {
    setRound((value) => ({
      ...value,
      target,
    }));
  }

  function reveal() {
    setRevealed(true);
    setPeeking(false);
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

        <div className="prompt-strip">
          <input
            aria-label="Editar extremo esquerdo"
            value={leftLabel}
            onChange={(event) => setLeftLabel(event.target.value)}
          />
          <span>{round.card.theme}</span>
          <input
            aria-label="Editar extremo direito"
            value={rightLabel}
            onChange={(event) => setRightLabel(event.target.value)}
          />
        </div>

        <div className="stage">
          <aside className="round-panel">
            <div className="panel-head">
              <p className="eyebrow">rodada {roundNumber}</p>
              <span>{cards.length} temas</span>
            </div>
            <h2>{round.card.theme}</h2>
            <div className="scale-labels">
              <label>
                <span>Extremo esquerdo</span>
                <input
                  value={leftLabel}
                  onChange={(event) => setLeftLabel(event.target.value)}
                />
              </label>
              <label>
                <span>Extremo direito</span>
                <input
                  value={rightLabel}
                  onChange={(event) => setRightLabel(event.target.value)}
                />
              </label>
            </div>
            <div className="idea-stack" aria-label="Ideias para a dica">
              {round.card.ideas.map((idea) => (
                <button
                  type="button"
                  key={idea}
                  onClick={() => setClue(idea)}
                  disabled={revealed}
                >
                  {idea}
                </button>
              ))}
            </div>
            <label className="clue-box">
              <span>Dica escolhida</span>
              <input
                value={clue}
                onChange={(event) => setClue(event.target.value)}
                placeholder="toque numa ideia ou escreva outra"
              />
            </label>
            <div className="master-box">
              <div>
                <span>Área do mestre</span>
                <strong>{round.target}</strong>
              </div>
              <input
                aria-label="Definir centro da pontuacao maxima"
                type="range"
                min="6"
                max="94"
                value={round.target}
                onChange={(event) => setTarget(Number(event.target.value))}
                disabled={revealed}
              />
              <small>
                Posicione onde fica o centro amarelo de 4 pontos. O grupo so ve
                quando voce segurar para mostrar ou revelar.
              </small>
            </div>
          </aside>

          <section
            className={`dial-card ${showTarget ? "show-zones" : ""} ${revealed ? "is-revealed" : ""}`}
          >
            <div className="dial" style={dialStyle} aria-label="Roleta de palpite">
              <div className="side-label left-label">{leftLabel}</div>
              <div className="side-label right-label">{rightLabel}</div>
              <div className="dial-face">
                <div className="score-zones" />
                <div className="privacy-shield">
                  {showTarget ? (
                    <span>{revealed ? "revelado" : "mestre vendo"}</span>
                  ) : (
                    <span>alvo escondido</span>
                  )}
                </div>
                <div className="needle target-needle" />
                <div className="needle guess-needle" />
                <div className="hub">
                  <span>{guess}</span>
                  <small>palpite</small>
                </div>
              </div>
            </div>

            <div className="range-row">
              <span>{leftLabel}</span>
              <input
                aria-label="Mover ponteiro"
                type="range"
                min="0"
                max="100"
                value={guess}
                onChange={(event) => setGuess(Number(event.target.value))}
                disabled={revealed}
              />
              <span>{rightLabel}</span>
            </div>

            <div className="controls">
              <button
                className="peek-button"
                type="button"
                onMouseDown={() => setPeeking(true)}
                onMouseUp={() => setPeeking(false)}
                onMouseLeave={() => setPeeking(false)}
                onTouchStart={() => setPeeking(true)}
                onTouchEnd={() => setPeeking(false)}
                disabled={revealed}
              >
                Segurar para o mestre ver
              </button>
              <button className="primary-button" onClick={reveal} disabled={revealed}>
                Revelar e pontuar
              </button>
              <button className="ghost-button" onClick={nextRound}>
                Nova rodada
              </button>
            </div>
          </section>

          <aside className="result-panel">
            <p className="eyebrow">regioes de pontuação</p>
            <div className="score-bands">
              {scoreBands.map((band) => (
                <div className={`score-band band-${band.points}`} key={band.points}>
                  <strong>{band.points}</strong>
                  <span>{band.label}</span>
                  <small>{band.range} de distancia</small>
                </div>
              ))}
            </div>
            <div className="target-readout">
              {showTarget ? round.target : "??"}
              <span>/100</span>
            </div>
            <div className="result-copy">
              {revealed ? (
                <>
                  <strong>{currentPoints} pontos</strong>
                  <span>o palpite ficou a {distance} do alvo</span>
                </>
              ) : (
                <>
                  <strong>{peeking ? "O mestre esta vendo" : "Alvo escondido"}</strong>
                  <span>defina a faixa maxima, segure para conferir e solte antes do grupo palpitar.</span>
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
          <p>O mestre escolhe onde fica a faixa maxima e prepara a dica.</p>
        </div>
        <div>
          <span>2</span>
          <p>O grupo discute e gira o ponteiro sem ver a pontuação.</p>
        </div>
        <div>
          <span>3</span>
          <p>Revela, soma pela faixa estreita e troca o mestre.</p>
        </div>
      </section>
    </main>
  );
}
