/* script.js - Corregido:
   - evita que el panel de resultados aparezca prematuramente
   - aplica colores de paleta de forma consistente (clases CSS)
   - timer seguro (no infinito), reinicio correcto
   - separación clara entre Teoría y Quiz (oculta/mostrar)
   - usa palette classes y garantiza contraste
*/

/* -------------------------
   Preguntas (50) - mismas que ya tenías
-------------------------*/
const QUESTIONS = [
  { q: "¿Qué son los requerimientos de un sistema?", options: [
      "Las herramientas de desarrollo necesarias",
      "Lo que el sistema debe cumplir para alcanzar un objetivo",
      "Los diseños gráficos del sistema",
      "La programación avanzada del sistema"
    ], a:1 },
  { q: "¿Cuál es la finalidad principal de documentar requerimientos en lenguaje formal?", options:[
      "Que solo los desarrolladores lo entiendan",
      "Transformar necesidades en tareas viables y claras para cliente y equipo",
      "Para mejorar la interfaz gráfica",
      "Para eliminar tests"
    ], a:1 },
  { q: "¿Qué son los requisitos mínimos o imprescindibles?", options:[
      "Características estéticas del sistema",
      "Requisitos que se deben cumplir sí o sí, sin los cuales el sistema falla",
      "Opciones que el usuario puede activar",
      "Mejoras opcionales"
    ], a:1 },
  { q: "¿Qué son los requisitos deseables?", options:[
      "Requisitos obligatorios según la ley",
      "Mejoras que no son obligatorias pero aportan mayor desempeño",
      "Errores que deben corregirse",
      "Requerimientos de seguridad solamente"
    ], a:1 },
  { q: "¿Qué son los Requerimientos de Usuario?", options:[
      "Declaraciones de la visión del cliente en lenguaje natural",
      "Instrucciones para configurar servidores",
      "Pruebas unitarias",
      "Los manuales de mantenimiento"
    ], a:0 },
  { q: "¿Qué contienen los Requerimientos de Software?", options:[
      "Procedimientos de RRHH",
      "Funciones, servicios y restricciones operativas del sistema con detalle",
      "Listas de precios",
      "Sólo diagramas"
    ], a:1 },
  { q: "¿Qué definen los requerimientos funcionales?", options:[
      "Capacidades o servicios que debe proporcionar el sistema",
      "Materiales de oficina",
      "Protocolos de comunicación física",
      "Hojas de estilo CSS"
    ], a:0 },
  { q: "¿Qué son los requerimientos no funcionales?", options:[
      "Atributos o restricciones del servicio (tiempo, fiabilidad, seguridad)",
      "Sólo la interfaz de usuario",
      "Listas de tareas sin prioridad",
      "Funciones obligatorias del usuario"
    ], a:0 },
  { q: "¿En qué tres categorías se dividen los requerimientos no funcionales (según el documento)?", options:[
      "Producto, organizacionales y externos",
      "Desarrollo, testing y diseño",
      "Front-end, Back-end y Infra",
      "Usuarios, Admin y Soporte"
    ], a:0 },
  { q: "¿Qué significa escalabilidad en un sistema?", options:[
      "Que se vea bonito en pantallas grandes",
      "La capacidad de aumentar la carga sin perder calidad",
      "Que se pueda imprimir rápidamente",
      "La posibilidad de cambiar el lenguaje de programación"
    ], a:1 },
  { q: "¿Qué implica confiabilidad y disponibilidad?", options:[
      "Capacidad de comportarse de forma consistente en su entorno",
      "Que el sistema sea open source",
      "Solo la disponibilidad por horarios",
      "Requerimientos de hardware"
    ], a:0 },
  { q: "¿Qué es usabilidad?", options:[
      "La facilidad de aprendizaje y operación del sistema",
      "Capacidad de soportar grandes datos",
      "Tiempo de descarga",
      "Nivel de seguridad"
    ], a:0 },
  { q: "¿Qué se entiende por performance?", options:[
      "Capacidad de procesar información dentro de tiempos establecidos",
      "Diseño visual del sistema",
      "El layout en móviles",
      "La documentación legal"
    ], a:0 },
  { q: "¿Qué es la robustez en un sistema?", options:[
      "Que el código esté minificado",
      "Capacidad de funcionar correctamente ante entradas inválidas o estrés",
      "Tener una base de datos pequeña",
      "Que sea fácil de instalar"
    ], a:1 },
  { q: "¿Qué implica seguridad en requerimientos?", options:[
      "Manejar, proteger y distribuir información restringida",
      "Que el sistema tenga muchos colores",
      "Un manual de usuario",
      "Tener múltiples botones"
    ], a:0 },
  { q: "¿La seguridad es siempre no funcional?", options:[
      "Siempre es no funcional y nunca funcional",
      "Puede empezar como no funcional pero dar lugar a requerimientos funcionales como autenticación",
      "No tiene relación con requerimientos",
      "Solo es parte del hardware"
    ], a:1 },
  { q: "¿Qué es la gestión de requisitos?", options:[
      "Conjunto de tareas para entender qué quiere el cliente y cómo impacta en el negocio",
      "La programación del sistema",
      "La instalación del servidor",
      "Diseñar los íconos"
    ], a:0 },
  { q: "¿Cómo suelen especificarse los requerimientos?", options:[
      "En lenguaje natural, individuales y jerárquicos",
      "Solo con diagramas UML",
      "Únicamente en código fuente",
      "En notas manuscritas"
    ], a:0 },
  { q: "Un buen requisito debe ser...", options:[
      "Ambiguo y general",
      "Claro, concreto, conciso, completo y consistente",
      "Largo y poético",
      "Difícil de entender"
    ], a:1 },
  { q: "¿Qué debe incluir un requisito (además de lo que hace el sistema)?", options:[
      "Su justificación (por qué y quién lo propuso)",
      "Solo el nombre del desarrollador",
      "El color de los botones",
      "La fecha de la próxima reunión"
    ], a:0 },
  { q: "¿Cómo deberían redactarse los requerimientos funcionales?", options:[
      "Para usuarios sin conocimientos técnicos avanzados, especificando comportamiento externo",
      "Solo en lenguaje técnico muy complejo",
      "Como un poema",
      "Sin priorización"
    ], a:0 },
  { q: "¿Cómo deben especificarse los requerimientos no funcionales?", options:[
      "Cuantitativamente siempre que sea posible",
      "Solo con frases generales",
      "En imágenes",
      "En boletines internos"
    ], a:0 },
  { q: "¿Por qué la especificación 'activar/desactivar cuadrícula...' fue marcada MAL?", options:[
      "Porque es demasiado técnica",
      "Porque amalgama varios requisitos (no es precisa y ambigua)",
      "Porque es inválida",
      "Porque requiere hardware"
    ], a:1 },
  { q: "Qué ejemplo es mejor para usabilidad (verificable)?", options:[
      "El sistema será fácil de usar",
      "Un usuario experimentado, tras 2 horas de entrenamiento, no cometerá más de 3 errores diarios en media",
      "El sistema tendrá colores agradables",
      "El sistema será intuitivo"
    ], a:1 },
  { q: "Qué ejemplo es un requisito de performance verificable?", options:[
      "El sistema será rápido",
      "Con hasta 100 usuarios simultáneos, tiempo de respuesta no superior a 2 segundos",
      "Los usuarios estarán satisfechos",
      "Se verá bien en móviles"
    ], a:1 },
  { q: "¿Qué debe contener la Introducción del documento de requerimientos?", options:[
      "Propósito, alcance, definiciones, referencias y visión general",
      "Solo el título del proyecto",
      "La lista de programadores",
      "El logo de la empresa"
    ], a:0 },
  { q: "¿Qué es el 'alcance' en la introducción?", options:[
      "Identificar el producto, qué debe y qué no debe hacer, beneficios y objetivos",
      "La lista de requisitos técnicos",
      "Un resumen financiero",
      "El plan de marketing"
    ], a:0 },
  { q: "¿Qué debe incluir 'definiciones, siglas y abreviaturas'?", options:[
      "Términos y siglas necesarios para interpretar el documento",
      "Solo ejemplos técnicos complejos",
      "Un glosario de programación avanzado",
      "Nombres de usuarios"
    ], a:0 },
  { q: "¿Qué se lista en 'referencias'?", options:[
      "Todos los documentos consultados e identificación para localizarlos",
      "Solo libros de texto",
      "Nombres de amigos",
      "Archivos irrelevantes"
    ], a:0 },
  { q: "En 'descripción general', ¿qué no se debe hacer?", options:[
      "Establecer requerimientos específicos",
      "Dar contexto para los requerimientos",
      "Describir la perspectiva del producto",
      "Listar restricciones generales"
    ], a:0 },
  { q: "¿Qué describe la 'perspectiva del producto'?", options:[
      "Cómo el producto opera respecto a otros productos y las interfaces que tiene",
      "Solo la interfaz de usuario",
      "El presupuesto del proyecto",
      "La fecha de entrega"
    ], a:0 },
  { q: "¿Qué se incluye en 'funciones del producto'?", options:[
      "Resumen de las funciones importantes que debe realizar el software",
      "Solo la documentación legal",
      "Los contratos laborales",
      "Los iconos de la aplicación"
    ], a:0 },
  { q: "¿Por qué describir las 'características de los usuarios' es importante?", options:[
      "Para diseñar una interfaz adecuada según nivel educativo y experiencia",
      "Para decidir el presupuesto",
      "Para contratar personal",
      "No es importante"
    ], a:0 },
  { q: "¿Qué son 'restricciones generales'?", options:[
      "Elementos que limitan las opciones de desarrollo (herramientas, hardware, protocolos)",
      "Sugerencias de diseño",
      "Opciones deseables",
      "Requerimientos legales solamente"
    ], a:0 },
  { q: "¿Qué son 'supuestos y dependencias'?", options:[
      "Factores externos que afectan a los requerimientos y que, si cambian, pueden afectar el sistema",
      "Avisos internos sin importancia",
      "Solo documentación del cliente",
      "Lo mismo que restricciones"
    ], a:0 },
  { q: "¿Qué deben cumplir los 'requerimientos específicos' en sección 3.1?", options:[
      "Detallar a un nivel que permita diseñar y verificar el sistema",
      "Ser vagos para flexibilidad",
      "Ser meramente ilustrativos",
      "No necesitar verificación"
    ], a:0 },
  { q: "¿Qué elementos capturan las especificaciones suplementarias?", options:[
      "Requerimientos que no están en los casos de uso (performance, mantenibilidad, usabilidad, etc.)",
      "Solo funciones del usuario",
      "Diagramas de flujo únicamente",
      "Testing manual"
    ], a:0 },
  { q: "¿Cómo deben identificarse los requerimientos?", options:[
      "Cada uno con una identificación única y clara",
      "Con el nombre del desarrollador",
      "Con una etiqueta genérica",
      "Sin identificación"
    ], a:0 },
  { q: "¿Para qué sirven los documentos de requerimientos en la planificación?", options:[
      "Base para la estimación de tamaño, costo y tiempo",
      "Para decorar la presentación",
      "Solo para testers",
      "Para escribir el código automáticamente"
    ], a:0 },
  { q: "¿Quiénes usan el documento para validar la funcionalidad de alto nivel?", options:[
      "Clientes y usuarios",
      "Solo testers",
      "Solo gerentes",
      "Solo desarrolladores"
    ], a:0 },
  { q: "¿Qué rol tiene el equipo de Soporte respecto al documento?", options:[
      "Desarrollar planes de capacitación y manuales de usuario",
      "Programar la base de datos",
      "Crear gráficos de la UI",
      "Hacer marketing"
    ], a:0 },
  { q: "¿Por qué es importante evitar ambigüedades en requerimientos?", options:[
      "Para permitir que diseñadores y testers interpreten consistentemente lo que se espera",
      "Para hacer el documento más largo",
      "Para complicar el trabajo",
      "No es importante"
    ], a:0 },
  { q: "¿Qué significa que un requisito sea 'verificable'?", options:[
      "Que se pueda probar con criterios concretos y medibles",
      "Que suene bien",
      "Que lo acepte el cliente sin pruebas",
      "Que no se pueda testear"
    ], a:0 },
  { q: "¿Qué debería pasar si un supuesto clave cambia (por ejemplo base de datos externa deja de existir)?", options:[
      "Los requerimientos pueden verse afectados y necesitar revisión",
      "Nada, el proyecto continua igual",
      "Solo cambian los colores",
      "Se ignora el cambio"
    ], a:0 },
  { q: "¿Cómo ayuda la sección 'visión general' del documento a un lector nuevo?", options:[
      "Resume qué contiene cada parte del documento y cómo está organizado",
      "Da los requisitos técnicos detallados",
      "Incluye la lista de programadores",
      "Contiene las pruebas unitarias"
    ], a:0 }
];

/* -------------------------
   UI selectors
-------------------------*/
const $ = sel => document.querySelector(sel);
const $$ = sel => document.querySelectorAll(sel);

const tabTheory = $('#tab-theory');
const tabQuiz = $('#tab-quiz');
const viewTheory = $('#view-theory');
const viewQuiz = $('#view-quiz');

const quizSetup = $('#quiz-setup');
const quizUI = $('#quiz-ui');
const setupChoices = $$('.btn-choose');

const btnStart = $('#btn-start');
const btnRestart = $('#btn-restart');
const quizArea = $('#quiz-area');
const quizCard = $('#question-card');
const qText = $('#question-text');
const optionsEl = $('#options');
const timerEl = $('#timer');
const qIndexEl = $('#q-index');
const qTotalEl = $('#q-total');
const progressFill = $('#progress-fill');
const feedbackEl = $('#feedback');

const resultArea = $('#result-area');
const correctCountEl = $('#correct-count');
const percentEl = $('#percent');
const resultMsgEl = $('#result-msg');
const answersList = $('#answers-list');
const btnDownload = $('#btn-download');
const btnBack = $('#btn-back');
const tinyLoves = $('#tiny-loves');

let QUESTIONS_SHUFFLED = [];
let selectedTotal = 50;
let currentIndex = 0;
let correctCount = 0;
let userAnswers = [];
let timerInterval = null;
let timePerQuestion = 20; // segundos por pregunta
let remaining = timePerQuestion;

/* Palette mapping (index maps to CSS palette-X classes) */
const PALETTE_COUNT = 4;

/* Tiny love phrases (editable) */
const tinyPhrases = [
  "Te amo, lo hiciste bien 💚",
  "Amorcito, buen esfuerzo c:",
  "no te pongas triste, te apoyo siempre ❤️",
  "A repasar, mi bonito",
  "Sos re capaz — sigue así 💫"
];

/* -------------------------
   Utility helpers
-------------------------*/
function shuffle(arr){
  let a = arr.slice();
  for(let i=a.length-1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function showView(view){
  if(view === 'theory'){
    tabTheory.classList.add('active');
    tabQuiz.classList.remove('active');
    viewTheory.classList.remove('hidden');
    viewQuiz.classList.add('hidden');

    // ensure quiz UI is hidden and reset
    quizSetup.classList.remove('hidden');
    quizUI.classList.add('hidden');
  } else {
    tabTheory.classList.remove('active');
    tabQuiz.classList.add('active');
    viewTheory.classList.add('hidden');
    viewQuiz.classList.remove('hidden');

    // show setup, hide quiz content until selection
    quizSetup.classList.remove('hidden');
    quizUI.classList.add('hidden');
  }
}

/* TABS */
tabTheory.addEventListener('click', ()=> showView('theory'));
tabQuiz.addEventListener('click', ()=> showView('quiz'));

/* Accordion behavior for theory */
document.addEventListener('click', (e)=>{
  if(e.target.classList.contains('acc-btn')){
    const panel = e.target.nextElementSibling;
    panel.style.display = (panel.style.display === 'block') ? 'none' : 'block';
  }
});

/* -------------------------
   Setup choices (25/50)
-------------------------*/
setupChoices.forEach(btn => {
  btn.addEventListener('click', (e)=>{
    const count = parseInt(btn.dataset.count,10) || 50;
    selectedTotal = count;
    prepareQuiz(selectedTotal);
    // reveal quiz UI (not auto-start)
    quizSetup.classList.add('hidden');
    quizUI.classList.remove('hidden');
    quizArea.classList.add('hidden');
    btnStart.style.display = 'inline-block';
    btnRestart.style.display = 'none';
    qTotalEl.textContent = selectedTotal;
    $('#total-count').textContent = selectedTotal;
  });
});

/* -------------------------
   Prepare quiz (shuffle, reset)
-------------------------*/
function prepareQuiz(n){
  QUESTIONS_SHUFFLED = shuffle(QUESTIONS).slice(0, n);
  currentIndex = 0;
  correctCount = 0;
  userAnswers = [];
  qIndexEl.textContent = '0';
  progressFill.style.width = '0%';

  // Ensure result area hidden until finished
  resultArea.classList.add('hidden');
  resultArea.setAttribute('aria-hidden','true');

  // Hide quiz area until start pressed
  quizArea.classList.add('hidden');

  // Clear any running timer
  if(timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }

  feedbackEl.textContent = '';
}

/* -------------------------
   Start quiz
-------------------------*/
btnStart.addEventListener('click', ()=>{
  if(QUESTIONS_SHUFFLED.length === 0) prepareQuiz(selectedTotal);
  btnStart.style.display = 'none';
  btnRestart.style.display = 'inline-block';
  quizArea.classList.remove('hidden');
  resultArea.classList.add('hidden');
  resultArea.setAttribute('aria-hidden','true');
  nextQuestion();
});

/* Restart (with confirmation) */
btnRestart.addEventListener('click', ()=> {
  if(confirm('Reiniciar el quiz desde cero?')){
    prepareQuiz(selectedTotal);
    btnStart.style.display = 'none';
    btnRestart.style.display = 'inline-block';
    quizArea.classList.remove('hidden');
    nextQuestion();
  }
});

/* -------------------------
   Render question and options
   - Apply palette class to question card (palette-0..3)
   - Ensure option buttons have readable dark backgrounds
-------------------------*/
function renderOptions(options){
  optionsEl.innerHTML = '';
  options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = `<span>${opt}</span>`;
    btn.dataset.index = i;
    btn.addEventListener('click', onOptionClick);
    optionsEl.appendChild(btn);
  });
}

function applyPaletteClass(cardEl, paletteIndex){
  // remove previous palette classes
  for(let i=0;i<PALETTE_COUNT;i++){
    cardEl.classList.remove(`palette-${i}`);
  }
  // add new
  cardEl.classList.add(`palette-${paletteIndex}`);
}

function displayQuestion(qObj, idx){
  qText.textContent = qObj.q;
  renderOptions(qObj.options);
  qIndexEl.textContent = `${idx+1}`;
  const percent = Math.round((idx/selectedTotal)*100);
  progressFill.style.width = `${(idx/selectedTotal)*100}%`;

  // pick palette and apply CSS class for consistent styling
  const paletteIndex = Math.floor(Math.random()*PALETTE_COUNT);
  applyPaletteClass(quizCard, paletteIndex);

  // ensure the option buttons get the readable background via CSS (palette class)
  quizCard.classList.add('fade-in');
  setTimeout(()=> quizCard.classList.remove('fade-in'), 380);
}

/* -------------------------
   Interaction & timer
-------------------------*/
function onOptionClick(e){
  const chosen = parseInt(this.dataset.index,10);
  lockQuestion(chosen);
}

function lockQuestion(chosen){
  // prevent double-lock
  if(timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  const qObj = QUESTIONS_SHUFFLED[currentIndex];
  const correct = qObj.a;
  const optionBtns = Array.from($$('#options .option-btn'));

  optionBtns.forEach((btn) => {
    const idx = parseInt(btn.dataset.index,10);
    if(idx === correct) btn.classList.add('correct');
    if(idx === chosen && idx !== correct) btn.classList.add('wrong');
    btn.disabled = true;
  });

  const isCorrect = chosen === correct;
  if(isCorrect) correctCount++;
  userAnswers.push({
    question: qObj.q,
    chosen: qObj.options[chosen] ?? null,
    correct: qObj.options[correct],
    correctIndex: correct,
    timeLeft: remaining
  });

  feedbackEl.textContent = isCorrect ? 'Correcto ✔' : `Incorrecto — la correcta: ${qObj.options[correct]}`;
  maybeShowTinyLove(isCorrect);

  setTimeout(()=> {
    currentIndex++;
    if(currentIndex >= QUESTIONS_SHUFFLED.length) finishQuiz();
    else nextQuestion();
  }, 900);
}

function autoMarkAndContinue(){
  // Called when time runs out
  if(timerInterval){
    clearInterval(timerInterval);
    timerInterval = null;
  }
  const qObj = QUESTIONS_SHUFFLED[currentIndex];
  const correct = qObj.a;
  userAnswers.push({
    question: qObj.q,
    chosen: null,
    correct: qObj.options[correct],
    correctIndex: correct,
    timeLeft: 0
  });

  // mark correct visually
  const optionBtns = Array.from($$('#options .option-btn'));
  optionBtns.forEach((btn) => {
    const idx = parseInt(btn.dataset.index,10);
    if(idx === correct) btn.classList.add('correct');
    btn.disabled = true;
  });

  feedbackEl.textContent = `Se acabó el tiempo — correcta: ${qObj.options[correct]}`;
  maybeShowTinyLove(false);

  setTimeout(()=> {
    currentIndex++;
    if(currentIndex >= QUESTIONS_SHUFFLED.length) finishQuiz();
    else nextQuestion();
  }, 900);
}

function nextQuestion(){
  // Reset timer and UI
  remaining = timePerQuestion;
  timerEl.textContent = remaining;
  feedbackEl.textContent = '';
  const qObj = QUESTIONS_SHUFFLED[currentIndex];
  displayQuestion(qObj, currentIndex);

  // Make absolutely sure previous timer cleared
  if(timerInterval){
    clearInterval(timerInterval);
    timerInterval = null;
  }

  // Start a reliable timer
  timerInterval = setInterval(()=> {
    remaining--;
    if(remaining < 0) remaining = 0;
    timerEl.textContent = remaining;
    if(remaining <= 0){
      // stop and auto-mark
      clearInterval(timerInterval);
      timerInterval = null;
      autoMarkAndContinue();
    }
  }, 1000);
}

/* -------------------------
   Finish quiz and results
-------------------------*/
function finishQuiz(){
  // ensure timer stopped
  if(timerInterval){
    clearInterval(timerInterval);
    timerInterval = null;
  }

  quizArea.classList.add('hidden');
  resultArea.classList.remove('hidden');
  resultArea.setAttribute('aria-hidden','false');

  correctCountEl.textContent = correctCount;
  $('#total-count').textContent = QUESTIONS_SHUFFLED.length;
  const percent = Math.round((correctCount / QUESTIONS_SHUFFLED.length)*100);
  percentEl.textContent = `${percent}%`;

  let msg = '';
  if(percent >= 90) msg = 'Excelente — dominás el tema 😎';
  else if(percent >= 75) msg = 'Muy bien — un repaso puntual y listo 👍';
  else if(percent >= 50) msg = 'Bien, pero repasá los no funcionales y la estructura principal.';
  else msg = 'Necesario repasar: enfocate en definiciones claras y ejemplos verificables.';
  resultMsgEl.textContent = msg;

  answersList.innerHTML = '';
  userAnswers.forEach((ans, i) => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>Q${i+1}.</strong> ${ans.question}
      <div class="small" style="color:var(--muted)">Tu respuesta: ${ans.chosen ?? '<em>Sin respuesta</em>'} — Correcta: ${ans.correct}</div>`;
    answersList.appendChild(li);
  });

  setTimeout(()=> maybeShowTinyLove(correctCount/QUESTIONS_SHUFFLED.length >= 0.8), 600);
}

/* -------------------------
   Download result JSON
-------------------------*/
btnDownload.addEventListener('click', ()=>{
  const payload = {
    date: new Date().toISOString(),
    score: correctCount,
    total: QUESTIONS_SHUFFLED.length,
    percent: Math.round((correctCount/QUESTIONS_SHUFFLED.length)*100),
    answers: userAnswers
  };
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(payload, null, 2));
  const dl = document.createElement('a');
  dl.setAttribute('href', dataStr);
  dl.setAttribute('download', `resultado_quiz_requerimientos_${new Date().toISOString().slice(0,10)}.json`);
  dl.click();
});

/* Back to theory */
btnBack.addEventListener('click', ()=> showView('theory'));

/* -------------------------
   Tiny love messages (subtle)
-------------------------*/
function maybeShowTinyLove(condition){
  const show = Math.random() < (condition ? 0.6 : 0.16);
  if(!show) return;
  const idx = Math.floor(Math.random()*tinyPhrases.length);
  const div = document.createElement('div');
  div.className = 'tiny-love';
  div.textContent = tinyPhrases[idx];
  tinyLoves.appendChild(div);
  setTimeout(()=> {
    div.style.transition = 'opacity 300ms, transform 300ms';
    div.style.opacity = '0';
    div.style.transform = 'translateY(-12px)';
  }, 3000);
  setTimeout(()=> div.remove(), 3800);
}

/* -------------------------
   Modo resumen / Compacto
-------------------------*/
$('#toggle-summary').addEventListener('click', ()=>{
  document.body.classList.toggle('summary-mode');
  const active = document.body.classList.contains('summary-mode');
  $('#toggle-summary').textContent = active ? 'Modo completo' : 'Modo resumen';
  $$('.acc-panel').forEach(p => p.style.display = active ? 'none' : 'block');
});

$('#pref-compact').addEventListener('change', (e)=>{
  document.body.classList.toggle('compact', e.target.checked);
});

/* -------------------------
   Init app (ensure correct initial visibility)
-------------------------*/
(function init(){
  // Start with theory visible and quiz hidden
  showView('theory');

  // Ensure result area hidden (safety)
  resultArea.classList.add('hidden');
  resultArea.setAttribute('aria-hidden','true');

  // Ensure quiz UI hidden until selection
  quizUI.classList.add('hidden');
  quizSetup.classList.remove('hidden');

  // Clear any previous timers
  if(timerInterval){ clearInterval(timerInterval); timerInterval = null; }
})();

/* Accessibility: keyboard numbers for options */
document.addEventListener('keydown', (e) => {
  if(viewQuiz.classList.contains('hidden')) return;
  if(e.key === '1' || e.key === '2' || e.key === '3' || e.key === '4'){
    const idx = parseInt(e.key,10) - 1;
    const btn = $(`#options .option-btn[data-index="${idx}"]`);
    if(btn) btn.click();
  }
});
