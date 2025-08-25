// ================== POOL DOMANDE (AMPLIABILE) ==================
const ALL_QUESTIONS = [
  {
    q: "Qual è il risultato di: typeof null ?",
    options: ["'null'", "'object'", "'undefined'", "'number'"],
    correctIndex: 1,
    explain: "Storico 'bug': typeof null ritorna 'object' per ragioni legacy.",
  },
  {
    q: "Quale parola chiave crea variabili con scope di blocco?",
    options: ["var", "let", "const", "static"],
    correctIndex: 1,
    explain:
      "`let` (e `const`) hanno scope di blocco; `var` ha scope di funzione.",
  },
  {
    q: "Cosa stampa console.log([1,2] == [1,2]) ?",
    options: ["true", "false", "1", "Errore"],
    correctIndex: 1,
    explain:
      "Gli array sono oggetti: si confronta il riferimento, non i valori.",
  },
  {
    q: "Il valore di `this` in una arrow function è…",
    options: [
      "Dipende dalla chiamata",
      "È sempre `window`",
      "Lessicalmente ereditato dallo scope esterno",
      "`undefined`",
    ],
    correctIndex: 2,
    explain:
      "Le arrow function **non** legano `this`: ereditano dallo scope esterno.",
  },
  {
    q: "Quale metodo converte una stringa JSON in oggetto?",
    options: [
      "JSON.parse()",
      "JSON.decode()",
      "JSON.toObject()",
      "JSON.stringify()",
    ],
    correctIndex: 0,
    explain:
      "`JSON.parse()` converte stringa → oggetto. `stringify()` fa il contrario.",
  },
  {
    q: "Quale di questi valori è *falsy* in JavaScript?",
    options: ["'0'", "[]", "{}", "0"],
    correctIndex: 3,
    explain: "Falsy: 0, '', null, undefined, NaN, false, 0n.",
  },
  {
    q: "Che valore ha Number('  42  ')?",
    options: ["NaN", "42", "'42'", "Errore"],
    correctIndex: 1,
    explain: "Gli spazi vengono ignorati → 42.",
  },
  {
    q: "Differenza tra == e === ?",
    options: [
      "`==` confronta anche il tipo, `===` no",
      "`===` confronta anche il tipo, `==` no",
      "Sono equivalenti",
      "Dipende dal browser",
    ],
    correctIndex: 1,
    explain:
      "`===` è confronto stretto (no coercizione). `==` fa coercizione di tipo.",
  },
  {
    q: "Dove vengono salvati i dati di localStorage?",
    options: [
      "Su un DB remoto",
      "Sul server",
      "Nel browser dell’utente senza scadenza",
      "Nella RAM e svaniscono al reload",
    ],
    correctIndex: 2,
    explain:
      "localStorage persiste lato client (per dominio), finché non lo svuoti.",
  },
  {
    q: "Quale metodo rimuove l’ultimo elemento di un array?",
    options: [".shift()", ".pop()", ".push()", ".slice()"],
    correctIndex: 1,
    explain: "pop() rimuove e restituisce l’ultimo elemento.",
  },
  {
    q: "Cosa restituisce '5' + 3 ?",
    options: ["8", "'53'", "NaN", "Errore"],
    correctIndex: 1,
    explain: "Con `+` se uno dei due è stringa → concatenazione.",
  },
  {
    q: "Che tipo di valore restituisce Math.random()?",
    options: [
      "Intero tra 0 e 1",
      "Numero decimale tra 0 e 1",
      "Boolean",
      "Errore",
    ],
    correctIndex: 1,
    explain: "Restituisce un float ≥ 0 e < 1.",
  },
  {
    q: "Quale istruzione termina un ciclo for?",
    options: ["stop", "break", "exit", "halt"],
    correctIndex: 1,
    explain: "`break` esce dal ciclo corrente.",
  },
  {
    q: "Operatore per valori null/undefined (nullish coalescing)?",
    options: ["??", "?.", "||", "??="],
    correctIndex: 0,
    explain:
      "`??` usa il valore a destra solo se a sinistra è null o undefined.",
  },
  {
    q: "Quale metodo crea un NUOVO array trasformando ogni elemento?",
    options: [".filter()", ".reduce()", ".map()", ".sort()"],
    correctIndex: 2,
    explain: "`map` trasforma ogni elemento, mantenendo la stessa lunghezza.",
  },
  {
    q: "Quale metodo filtra gli elementi in base a una condizione?",
    options: [".map()", ".filter()", ".reduce()", ".forEach()"],
    correctIndex: 1,
    explain:
      "`filter` mantiene solo gli elementi che rispettano la condizione.",
  },
  {
    q: "Quale metodo restituisce un singolo valore accumulando l’array?",
    options: [".reduce()", ".map()", ".some()", ".find()"],
    correctIndex: 0,
    explain: "`reduce(acc, el) => ...` riduce l’array a un singolo valore.",
  },
  {
    q: "Quale metodo controlla se almeno un elemento soddisfa la condizione?",
    options: [".every()", ".some()", ".includes()", ".findIndex()"],
    correctIndex: 1,
    explain:
      "`some` ritorna true se almeno un elemento soddisfa la condizione.",
  },
  {
    q: "Quale metodo restituisce l’indice del primo elemento che soddisfa la condizione?",
    options: [".indexOf()", ".find()", ".findIndex()", ".includes()"],
    correctIndex: 2,
    explain:
      "`findIndex` → indice del primo match (o -1). `find` → l’elemento.",
  },
  {
    q: "Qual è il risultato di Boolean('0') ?",
    options: ["true", "false", "NaN", "Errore"],
    correctIndex: 0,
    explain: "Qualunque stringa non vuota è truthy → true.",
  },
];

// ================== UTILITY ==================
const $ = (sel) => document.querySelector(sel);

// shuffle in-place
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// estrae N elementi casuali dal pool, senza modificare l'originale
function sample(arr, n) {
  return shuffle([...arr]).slice(0, n);
}

// ================== RIFERIMENTI DOM ==================
const questionEl = $("#question");
const answersEl = $("#answers");
const explanationEl = $("#explanation");
const progressBarEl = $("#progressBar");
const qCounterEl = $("#qCounter");
const scoreEl = $("#score");
const bestScoreEl = $("#bestScore");
const nextBtn = $("#nextBtn");
const skipBtn = $("#skipBtn");
const cardEl = $("#card");
const resultCardEl = $("#resultCard");
const resultTextEl = $("#resultText");
const retryBtn = $("#retryBtn");
const reviewBtn = $("#reviewBtn");

// ================== STATO ==================
let state = {
  current: 0, // indice domanda corrente
  score: 0, // punteggio corrente
  questions: [], // domande scelte per questa run
  answers: [], // indice scelto per ogni domanda o null
  reviewMode: false, // se true, stai rivedendo le domande
};

// ================== INIT ==================
function init() {
  // Estrai 10 domande casuali dal pool
  state.questions = sample(ALL_QUESTIONS, 10);
  state.current = 0;
  state.score = 0;
  state.answers = Array(state.questions.length).fill(null);
  state.reviewMode = false;

  // Record da localStorage
  const best = Number(localStorage.getItem("jsquiz_best") || 0);
  bestScoreEl.textContent = `Record: ${best}`;

  // Mostra card quiz, nascondi risultato
  resultCardEl.classList.add("hidden");
  cardEl.classList.remove("hidden");

  renderQuestion();
}

document.addEventListener("DOMContentLoaded", init);

// ================== RENDER DOMANDA ==================
function _render() {
  const item = state.questions[state.current];

  // progress e contatori
  qCounterEl.textContent = `Domanda ${state.current + 1}/${
    state.questions.length
  }`;
  scoreEl.textContent = `Punteggio: ${state.score}`;
  const progress = (state.current / state.questions.length) * 100;
  progressBarEl.style.width = `${progress}%`;

  // testo e risposte
  questionEl.textContent = item.q;
  answersEl.innerHTML = "";
  item.options.forEach((opt, i) => {
    const li = document.createElement("li");
    li.className = "answer";
    li.textContent = opt;
    li.dataset.index = i;
    answersEl.appendChild(li);
  });

  // reset feedback
  explanationEl.classList.add("hidden");
  explanationEl.textContent = "";
  nextBtn.disabled = true;
}

// wrapper per poter “decorare” in review mode
let renderQuestion = _render;

// ================== CLICK RISPOSTA (event delegation) ==================
answersEl.addEventListener("click", (e) => {
  const target = e.target;
  if (!target.classList.contains("answer")) return;
  if (state.reviewMode) return;

  const chosen = Number(target.dataset.index);
  const item = state.questions[state.current];

  // salva risposta
  state.answers[state.current] = chosen;

  // disabilita interazioni
  [...answersEl.children].forEach((li) => li.classList.add("disabled"));

  // marca corretto/errato
  const correctLi = [...answersEl.children][item.correctIndex];
  if (chosen === item.correctIndex) {
    target.classList.add("correct");
    state.score++;
  } else {
    target.classList.add("wrong");
    correctLi.classList.add("correct");
  }

  // spiegazione
  explanationEl.textContent = item.explain;
  explanationEl.classList.remove("hidden");

  // abilita avanti e aggiorna punteggio live
  nextBtn.disabled = false;
  scoreEl.textContent = `Punteggio: ${state.score}`;
});

// ================== AVANTI / SALTA ==================
nextBtn.addEventListener("click", () => {
  if (state.current >= state.questions.length - 1) {
    showResult();
    return;
  }
  state.current++;
  renderQuestion();
});

skipBtn.addEventListener("click", () => {
  if (state.reviewMode) return; // in review non ha senso
  if (state.current >= state.questions.length - 1) {
    showResult();
    return;
  }
  // non assegna punti, lascia risposta null
  state.current++;
  renderQuestion();
});

// ================== RISULTATO ==================
function showResult() {
  progressBarEl.style.width = "100%";

  const total = state.questions.length;
  const perc = Math.round((state.score / total) * 100);

  // aggiorna record
  const best = Number(localStorage.getItem("jsquiz_best") || 0);
  const newBest = Math.max(best, state.score);
  localStorage.setItem("jsquiz_best", String(newBest));
  bestScoreEl.textContent = `Record: ${newBest}`;

  // testo esito
  resultTextEl.textContent = `Hai totalizzato ${state.score}/${total} (${perc}%).`;

  // mostra card risultato
  cardEl.classList.add("hidden");
  resultCardEl.classList.remove("hidden");
}

// Ricomincia: nuove 10 domande random + ordine nuovo
retryBtn.addEventListener("click", () => {
  init();
});

// ================== REVIEW MODE ==================
reviewBtn.addEventListener("click", () => {
  state.reviewMode = true;
  state.current = 0;

  resultCardEl.classList.add("hidden");
  cardEl.classList.remove("hidden");

  renderQuestion();
  applyReviewDecorations();
});

function applyReviewDecorations() {
  const item = state.questions[state.current];
  const chosen = state.answers[state.current];

  // disabilita click
  [...answersEl.children].forEach((li) => li.classList.add("disabled"));

  if (chosen == null) {
    // non risposto -> mostra solo la corretta
    [...answersEl.children][item.correctIndex].classList.add("correct");
  } else {
    if (chosen === item.correctIndex) {
      [...answersEl.children][chosen].classList.add("correct");
    } else {
      [...answersEl.children][chosen].classList.add("wrong");
      [...answersEl.children][item.correctIndex].classList.add("correct");
    }
  }

  // mostra spiegazione e abilita avanti
  explanationEl.textContent = item.explain;
  explanationEl.classList.remove("hidden");
  nextBtn.disabled = false;

  // aggiorna contatori (il punteggio resta quello della run)
  qCounterEl.textContent = `Domanda ${state.current + 1}/${
    state.questions.length
  }`;
  scoreEl.textContent = `Punteggio: ${state.score}`;
  const progress = (state.current / state.questions.length) * 100;
  progressBarEl.style.width = `${progress}%`;
}

// quando renderizziamo, se siamo in review, applica decorazioni automatiche
renderQuestion = function () {
  _render();
  if (state.reviewMode) applyReviewDecorations();
};
