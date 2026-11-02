/**
 * LA STORIA DI INTERNET - LOGICA APPLICATIVA
 * Gestione Video Player, Timeline Dinamica, Glossario con Ricerca e Quiz Interattivo
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initVideoPlayer();
  initTimeline();
  initGlossary();
  initQuiz();
});

/* ==========================================================================
   1. GESTIONE TEMA CHIARO / SCURO
   ========================================================================== */
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  
  // Controlla preferenza salvata
  const savedTheme = localStorage.getItem('theme-preference') || 'dark';
  if (savedTheme === 'light') {
    document.body.classList.remove('dark-theme');
    document.body.classList.add('light-theme');
    themeIcon.textContent = '🌙';
  }

  toggleBtn.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light-theme');
    document.body.classList.toggle('dark-theme', !isLight);
    themeIcon.textContent = isLight ? '🌙' : '☀️';
    localStorage.setItem('theme-preference', isLight ? 'light' : 'dark');
  });
}

/* ==========================================================================
   2. VIDEO PLAYER & PLAYLIST
   ========================================================================== */
const videoList = [
  {
    id: '3EQ35ogcAZg',
    title: 'Come è nato Internet e come funziona',
    channel: 'Geopop (Italiano)',
    duration: '11:20'
  },
  {
    id: 'AEaKrq3SpW8',
    title: 'The Internet: Crash Course Computer Science #29',
    channel: 'CrashCourse (Tecnico)',
    duration: '12:05'
  },
  {
    id: '21eFwbb48sE',
    title: 'ARPANET and the Origin of the Internet',
    channel: 'Computerphile / Archive',
    duration: '08:45'
  }
];

function initVideoPlayer() {
  const iframe = document.getElementById('youtube-player');
  const playlistContainer = document.getElementById('video-playlist');
  const customInput = document.getElementById('custom-video-input');
  const customBtn = document.getElementById('btn-load-custom-video');

  // Render Playlist
  videoList.forEach((video, index) => {
    const item = document.createElement('div');
    item.className = `playlist-item ${index === 0 ? 'active' : ''}`;
    item.innerHTML = `
      <div class="play-badge">▶</div>
      <div class="playlist-info">
        <h4>${video.title}</h4>
        <p>${video.channel} • ${video.duration}</p>
      </div>
    `;

    item.addEventListener('click', () => {
      document.querySelectorAll('.playlist-item').forEach(el => el.classList.remove('active'));
      item.classList.add('active');
      loadVideoById(video.id);
    });

    playlistContainer.appendChild(item);
  });

  // Caricamento video custom
  customBtn.addEventListener('click', () => {
    const val = customInput.value.trim();
    if (!val) return;
    const extractedId = extractYouTubeID(val);
    if (extractedId) {
      loadVideoById(extractedId);
      document.querySelectorAll('.playlist-item').forEach(el => el.classList.remove('active'));
      customInput.value = '';
    } else {
      alert('Inserisci un link o un ID YouTube valido (es: 3EQ35ogcAZg o https://www.youtube.com/watch?v=...)');
    }
  });

  function loadVideoById(videoId) {
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1&rel=0`;
  }

  function extractYouTubeID(urlOrId) {
    if (urlOrId.length === 11 && !urlOrId.includes('/') && !urlOrId.includes('.')) {
      return urlOrId;
    }
    const regExp = /(?:youtu\.be\/|youtube\.com\/(?:watch\?.*v=|embed\/|v\/|shorts\/))([\w-]{11})/;
    const match = urlOrId.match(regExp);
    return match ? match[1] : null;
  }
}

/* ==========================================================================
   3. TIMELINE INTERATTIVA
   ========================================================================== */
const timelineEvents = [
  {
    year: '1969',
    title: 'Il primo respiro di ARPANET',
    category: 'pionieri',
    categoryLabel: 'I Pionieri',
    description: 'Il 29 ottobre 1969, due computer (uno all’UCLA di Los Angeles e uno allo Stanford Research Institute) provano a comunicare. L’obiettivo era inviare la parola "LOGIN", ma il sistema andò in crash dopo le prime due lettere: il primo messaggio trasmesso nella storia fu quindi "LO"!',
    curiosity: 'La commutazione di pacchetto permise per la prima volta di dividere un file in frammenti che viaggiavano su percorsi diversi.'
  },
  {
    year: '1974',
    title: 'La nascita di TCP/IP',
    category: 'pionieri',
    categoryLabel: 'I Pionieri',
    description: 'Vinton Cerf e Robert Kahn pubblicano le specifiche dei protocolli TCP (Transmission Control Protocol) e IP (Internet Protocol). Si trattava del "linguaggio universale" necessario affinché reti con hardware e sistemi operativi completamente diversi potessero scambiarsi pacchetti senza errori.',
    curiosity: 'Vint Cerf è spesso definito come uno dei "padri di Internet".'
  },
  {
    year: '1983',
    title: 'Il "Flag Day": nasce ufficialmente Internet',
    category: 'espansione',
    categoryLabel: 'L\'Invenzione del Web',
    description: 'Il 1° gennaio 1983 è considerato il compleanno anagrafico di Internet: tutti i computer collegati ad ARPANET abbandonano il vecchio protocollo NCP per adottare definitivamente la suite TCP/IP.',
    curiosity: 'Senza questo passaggio simultaneo coordinato, non sarebbe mai nata una rete globale unificata.'
  },
  {
    year: '1986',
    title: 'L\'Italia si connette alla Rete (Pisa)',
    category: 'espansione',
    categoryLabel: 'L\'Invenzione del Web',
    description: 'Il 30 aprile 1986, dal Centro Nazionale Universitario di Calcolo Elettronico (CNUCE) del CNR di Pisa, parte il primo segnale di rete verso gli Stati Uniti (Roettingen e poi oltreoceano). L\'Italia diventa il quarto paese in Europa a essere connesso ad ARPANET/Internet.',
    curiosity: 'Il primo messaggio italiano fu un semplice "ping" di pochi byte che aprì una nuova era per la ricerca scientifica italiana.'
  },
  {
    year: '1989 - 1991',
    title: 'Tim Berners-Lee inventa il World Wide Web',
    category: 'espansione',
    categoryLabel: 'L\'Invenzione del Web',
    description: 'Al CERN di Ginevra, lo scienziato britannico Tim Berners-Lee progetta un sistema ipertestuale per condividere documenti tra ricercatori. Nascono i tre pilastri della navigazione odierna: il linguaggio HTML, il protocollo HTTP e gli indirizzi URL.',
    curiosity: 'Il 6 agosto 1991 viene pubblicato il primissimo sito web della storia (ancora consultabile online sul sito del CERN!).'
  },
  {
    year: '1993',
    title: 'Mosaic: Il Web diventa visuale',
    category: 'espansione',
    categoryLabel: 'L\'Invenzione del Web',
    description: 'Marc Andreessen crea NCSA Mosaic, il primo browser web grafico in grado di visualizzare immagini insieme al testo nella stessa pagina, aprendo la navigazione a chiunque senza bisogno di usare la riga di comando.',
    curiosity: 'Dall\'esperienza di Mosaic nacque Netscape Navigator, il browser protagonista del primo boom commerciale di Internet.'
  },
  {
    year: '1998',
    title: 'Nasce Google: La ricerca intelligente',
    category: 'espansione',
    categoryLabel: 'L\'Invenzione del Web',
    description: 'Larry Page e Sergey Brin fondano Google in un garage a Menlo Park. Il loro algoritmo PageRank trasforma radicalmente il modo di cercare informazioni sul web, basando l\'importanza di una pagina sui collegamenti ricevuti da altri siti.',
    curiosity: 'Il nome originario del progetto universitario era "BackRub".'
  },
  {
    year: '2004 - 2007',
    title: 'Web 2.0, Social Network e lo Smartphone',
    category: 'moderna',
    categoryLabel: 'Social & Mobile',
    description: 'Gli utenti passano da semplici lettori passivi a creatori di contenuti con Wikipedia, Facebook e YouTube. Nel 2007 il lancio dell’iPhone inaugura l’era del Mobile Internet: la rete esce dai desktop per entrare nelle tasche di miliardi di persone.',
    curiosity: 'Il termine Web 2.0 fu reso celebre da Tim O\'Reilly durante una conferenza del 2004.'
  },
  {
    year: 'Oggi e Futuro',
    title: 'Cloud, Internet delle Cose e Intelligenza Artificiale',
    category: 'moderna',
    categoryLabel: 'AI & Cloud',
    description: 'Oggi oltre il 65% della popolazione mondiale è connesso. Con l\'esplosione dei dispositivi smart (IoT), del Cloud Computing globale e dei modelli di Intelligenza Artificiale, la rete non è più solo una raccolta di pagine, ma un cervello computazionale planetario in tempo reale.',
    curiosity: 'Ogni giorno sul web vengono scambiati oltre 300 miliardi di email e miliardi di terabyte di dati video.'
  }
];

function initTimeline() {
  const container = document.getElementById('timeline-container');
  const filters = document.querySelectorAll('.filter-btn');

  function renderTimeline(filter = 'all') {
    container.innerHTML = '';
    const filteredEvents = filter === 'all' 
      ? timelineEvents 
      : timelineEvents.filter(e => e.category === filter);

    filteredEvents.forEach(evt => {
      const item = document.createElement('div');
      item.className = 'timeline-item';
      item.innerHTML = `
        <div class="timeline-card">
          <div class="tl-meta">
            <span class="tl-year">${evt.year}</span>
            <span class="tl-category">${evt.categoryLabel}</span>
          </div>
          <h3 class="tl-title">${evt.title}</h3>
          <p class="tl-desc">${evt.description}</p>
          <div class="tl-curiosity">
            <span>💡 Curiosità:</span>
            ${evt.curiosity}
          </div>
        </div>
      `;
      container.appendChild(item);
    });
  }

  // Gestione pulsanti filtri
  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderTimeline(btn.dataset.filter);
    });
  });

  renderTimeline('all');
}

/* ==========================================================================
   4. GLOSSARIO TECNICO CON RICERCA REAL-TIME
   ========================================================================== */
const glossaryItems = [
  {
    term: 'ARPANET',
    def: 'La prima rete a commutazione di pacchetto realizzata nel 1969 dall\'agenzia DARPA del Dipartimento della Difesa USA. È l\'antenata diretta di Internet.'
  },
  {
    term: 'Commutazione di Pacchetto',
    def: 'Tecnologia che scompone i file in piccoli frammenti (pacchetti) inviati separatamente sulla rete e riassemblati al loro arrivo, garantendo massima efficienza e resilienza.'
  },
  {
    term: 'TCP/IP',
    def: 'Transmission Control Protocol / Internet Protocol: la suite di protocolli di comunicazione su cui si basa il funzionamento universale di Internet dal 1983.'
  },
  {
    term: 'DNS (Domain Name System)',
    def: 'L\'elenco telefonico di Internet: converte nomi facili da ricordare per gli umani (come "google.com") in indirizzi numerici IP (come "142.250.180.14").'
  },
  {
    term: 'World Wide Web (WWW)',
    def: 'Creato nel 1989 da Tim Berners-Lee: un servizio che gira sopra Internet per visualizzare documenti ipertestuali interconnessi tramite browser.'
  },
  {
    term: 'HTML & HTTP',
    def: 'HTML è il linguaggio di formattazione delle pagine web; HTTP è il protocollo con cui client e server si scambiano le pagine stesse in rete.'
  },
  {
    term: 'Browser',
    def: 'Software applicativo (come Chrome, Firefox, Safari) che interpreta il codice HTML, CSS e JavaScript e mostra visivamente la pagina web all\'utente.'
  },
  {
    term: 'Fibra Ottica & Cavi Sottomarini',
    def: 'L\'infrastruttura fisica di Internet: oltre il 95% del traffico intercontinentale viaggia su fasci di fibra ottica posati sui fondali oceanici alla velocità della luce.'
  }
];

function initGlossary() {
  const grid = document.getElementById('glossary-grid');
  const searchInput = document.getElementById('glossary-search');

  function renderGlossary(filterText = '') {
    grid.innerHTML = '';
    const cleanFilter = filterText.toLowerCase().trim();

    const filtered = glossaryItems.filter(item => 
      item.term.toLowerCase().includes(cleanFilter) || 
      item.def.toLowerCase().includes(cleanFilter)
    );

    if (filtered.length === 0) {
      grid.innerHTML = `<p style="grid-column: 1 / -1; text-align: center; color: var(--text-muted);">Nessun termine trovato con "${filterText}".</p>`;
      return;
    }

    filtered.forEach(item => {
      const card = document.createElement('div');
      card.className = 'glossary-card';
      card.innerHTML = `
        <h4 class="glossary-term">${item.term}</h4>
        <p class="glossary-def">${item.def}</p>
      `;
      grid.appendChild(card);
    });
  }

  searchInput.addEventListener('input', (e) => {
    renderGlossary(e.target.value);
  });

  renderGlossary();
}

/* ==========================================================================
   5. QUIZ INTERATTIVO SULLA STORIA DI INTERNET
   ========================================================================== */
const quizQuestions = [
  {
    question: 'Qual è stato il primo messaggio inviato attraverso la rete ARPANET nel 1969?',
    options: [
      'HELLO WORLD',
      'LO (il sistema crashò prima di finire "LOGIN")',
      'INTERNET IS ALIVE',
      'PING UCLA'
    ],
    correctIndex: 1,
    explanation: 'I ricercatori volevano digitare "LOGIN", ma il computer crashò dopo le prime due lettere "LO". È comunque rimasto nella storia!'
  },
  {
    question: 'In quale data ARPANET ha adottato ufficialmente il protocollo TCP/IP (Flag Day)?',
    options: [
      '1° Gennaio 1983',
      '20 Luglio 1969',
      '25 Dicembre 1991',
      '14 Ottobre 1998'
    ],
    correctIndex: 0,
    explanation: 'Il 1° gennaio 1983 è considerato il giorno ufficiale di transizione a TCP/IP e la nascita convenzionale di Internet.'
  },
  {
    question: 'In quale città italiana è avvenuta la prima connessione a Internet nel 1986?',
    options: [
      'Milano (Politecnico)',
      'Roma (CNR centrale)',
      'Pisa (Centro CNUCE del CNR)',
      'Torino (CSELT)'
    ],
    correctIndex: 2,
    explanation: 'Il 30 aprile 1986, i ricercatori del CNUCE di Pisa stabilirono la prima storica connessione italiana con gli Stati Uniti.'
  },
  {
    question: 'Chi ha inventato il World Wide Web (WWW) al CERN di Ginevra?',
    options: [
      'Steve Jobs',
      'Alan Turing',
      'Bill Gates',
      'Tim Berners-Lee'
    ],
    correctIndex: 3,
    explanation: 'Tim Berners-Lee progettò il WWW, l’HTML e il protocollo HTTP nel 1989 per consentire agli scienziati di condividere ipertesti.'
  },
  {
    question: 'Qual è la differenza fondamentale tra "Internet" e "World Wide Web"?',
    options: [
      'Sono esattamente la stessa cosa con due nomi diversi',
      'Internet è l\'infrastruttura di reti globali; il Web è uno dei servizi che viaggia su di essa',
      'Internet è stato inventato al CERN, il Web negli Stati Uniti',
      'Internet funziona solo con i computer, il Web solo con gli smartphone'
    ],
    correctIndex: 1,
    explanation: 'Internet è l\'infrastruttura hardware e di rete sottostante; il Web (WWW), la posta elettronica (email) e lo streaming sono servizi che funzionano sopra Internet.'
  }
];

function initQuiz() {
  let currentIndex = 0;
  let score = 0;
  let answered = false;

  const currentQNum = document.getElementById('current-q-num');
  const totalQNum = document.getElementById('total-q-num');
  const currentScore = document.getElementById('current-score');
  const progressFill = document.getElementById('quiz-progress-fill');
  const questionEl = document.getElementById('quiz-question');
  const optionsEl = document.getElementById('quiz-options');
  const feedbackEl = document.getElementById('quiz-feedback');
  const nextBtn = document.getElementById('btn-next-question');
  const quizCard = document.getElementById('quiz-card');
  const resultsCard = document.getElementById('quiz-results');
  const resultsScore = document.getElementById('results-score');
  const restartBtn = document.getElementById('btn-restart-quiz');

  totalQNum.textContent = quizQuestions.length;

  function loadQuestion(index) {
    answered = false;
    nextBtn.style.display = 'none';
    feedbackEl.style.display = 'none';
    feedbackEl.className = 'quiz-feedback';

    const q = quizQuestions[index];
    currentQNum.textContent = index + 1;
    progressFill.style.width = `${((index + 1) / quizQuestions.length) * 100}%`;
    questionEl.textContent = q.question;

    optionsEl.innerHTML = '';
    q.options.forEach((optText, optIndex) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-opt-btn';
      btn.textContent = optText;
      btn.addEventListener('click', () => handleSelectOption(optIndex, btn));
      optionsEl.appendChild(btn);
    });
  }

  function handleSelectOption(selectedIndex, selectedBtn) {
    if (answered) return;
    answered = true;

    const q = quizQuestions[currentIndex];
    const buttons = optionsEl.querySelectorAll('.quiz-opt-btn');

    buttons.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === q.correctIndex) {
        btn.classList.add('correct');
      }
    });

    if (selectedIndex === q.correctIndex) {
      score++;
      currentScore.textContent = score;
      feedbackEl.textContent = `✅ Risposta esatta! ${q.explanation}`;
      feedbackEl.className = 'quiz-feedback show-correct';
    } else {
      selectedBtn.classList.add('wrong');
      feedbackEl.textContent = `❌ Sbagliato! ${q.explanation}`;
      feedbackEl.className = 'quiz-feedback show-wrong';
    }

    if (currentIndex < quizQuestions.length - 1) {
      nextBtn.textContent = 'Prossima Domanda →';
    } else {
      nextBtn.textContent = 'Guarda i Risultati 🏆';
    }
    nextBtn.style.display = 'inline-flex';
  }

  nextBtn.addEventListener('click', () => {
    currentIndex++;
    if (currentIndex < quizQuestions.length) {
      loadQuestion(currentIndex);
    } else {
      showResults();
    }
  });

  function showResults() {
    quizCard.style.display = 'none';
    resultsCard.style.display = 'block';
    resultsScore.textContent = `Hai totalizzato: ${score} su ${quizQuestions.length}`;

    const titleEl = document.getElementById('results-title');
    const descEl = document.getElementById('results-desc');
    const iconEl = document.getElementById('results-icon');

    if (score === quizQuestions.length) {
      iconEl.textContent = '🌟';
      titleEl.textContent = 'Punteggio Perfetto! Sei un Guru del Web!';
      descEl.textContent = 'Conosci ogni singolo dettaglio dalle origini di ARPANET al Web moderno.';
    } else if (score >= 3) {
      iconEl.textContent = '👏';
      titleEl.textContent = 'Ottima Conoscenza!';
      descEl.textContent = 'Hai buone basi sulla nascita e l\'evoluzione di Internet.';
    } else {
      iconEl.textContent = '📚';
      titleEl.textContent = 'Buon inizio!';
      descEl.textContent = 'Riguarda il video e rileggi la timeline per migliorare il tuo punteggio.';
    }
  }

  restartBtn.addEventListener('click', () => {
    currentIndex = 0;
    score = 0;
    currentScore.textContent = score;
    resultsCard.style.display = 'none';
    quizCard.style.display = 'block';
    loadQuestion(0);
  });

  loadQuestion(0);
}
