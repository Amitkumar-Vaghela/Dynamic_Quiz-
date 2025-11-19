/* app.js - Modern Dynamic Quiz */
const QUESTION_BANK = [
  {id:1, category:"General", difficulty:"easy", question:"Which language runs in a web browser?", options:["Java","C","Python","JavaScript"], answerIndex:3},
  {id:2, category:"Programming", difficulty:"easy", question:"Which company developed Java?", options:["Microsoft","Sun Microsystems","Google","IBM"], answerIndex:1},
  {id:3, category:"Science", difficulty:"easy", question:"What planet is known as the Red Planet?", options:["Venus","Saturn","Mars","Jupiter"], answerIndex:2},
  {id:4, category:"General", difficulty:"medium", question:"What does HTTP stand for?", options:["HyperText Transfer Protocol","High Transfer Text Protocol","Hyperlink Transfer Text Process","None"], answerIndex:0},
  {id:5, category:"Programming", difficulty:"medium", question:"Which keyword is used to create a function in JavaScript?", options:["func","def","function","lambda"], answerIndex:2}
];

const landing = document.getElementById('landing');
const startBtn = document.getElementById('startBtn');
const categoryEl = document.getElementById('category');
const difficultyEl = document.getElementById('difficulty');
const qcountEl = document.getElementById('qcount');

const quiz = document.getElementById('quiz');
const questionText = document.getElementById('questionText');
const optionsForm = document.getElementById('optionsForm');
const progress = document.getElementById('progress');
const timerEl = document.getElementById('timeValue');
const categoryTitle = document.getElementById('categoryTitle');

const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const submitBtn = document.getElementById('submitBtn');

const resultPage = document.getElementById('result');
const correctCountEl = document.getElementById('correctCount');
const incorrectCountEl = document.getElementById('incorrectCount');
const avgTimeEl = document.getElementById('avgTime');
const scoreSummary = document.getElementById('scoreSummary');
const retryBtn = document.getElementById('retryBtn');
const homeBtn = document.getElementById('homeBtn');
const timeChartCtx = document.getElementById('timeChart').getContext('2d');

let questions = [];
let currentIndex = 0;
let answers = [];
let timeSpent = [];
let timer = null;
let timePerQuestion = 30;
let chartInstance = null;

function prepareQuestions(category, difficulty, count){
  const filtered = QUESTION_BANK.filter(q => q.category === category && (q.difficulty === difficulty));
  const pool = filtered.length >= count ? filtered : QUESTION_BANK;
  const shuffled = pool.sort(()=>Math.random()-0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

function showLanding(){ landing.classList.remove('hidden'); quiz.classList.add('hidden'); resultPage.classList.add('hidden'); }
function showQuiz(){ landing.classList.add('hidden'); quiz.classList.remove('hidden'); resultPage.classList.add('hidden'); }
function showResult(){ landing.classList.add('hidden'); quiz.classList.add('hidden'); resultPage.classList.remove('hidden'); }

function startTimerFor(index){
  clearInterval(timer);
  let remaining = timePerQuestion;
  timerEl.textContent = remaining;
  const startTs = Date.now();
  timer = setInterval(()=>{
    remaining--;
    timerEl.textContent = remaining;
    if(remaining <= 0){
      clearInterval(timer);
      timeSpent[index] = ((Date.now() - startTs) / 1000) || timePerQuestion;
      if(index + 1 < questions.length){ currentIndex = index + 1; renderQuestion(currentIndex); } else { computeAndShowResult(); }
    }
  }, 1000);
  optionsForm.dataset.startedAt = startTs;
}

function renderQuestion(i){
  const q = questions[i];
  categoryTitle.textContent = q.category || 'Quiz';
  progress.textContent = `Question ${i+1} / ${questions.length}`;
  questionText.textContent = q.question;
  optionsForm.innerHTML = '';
  q.options.forEach((opt, idx) => {
    const id = `q${i}_opt${idx}`;
    const checked = answers[i] === idx ? 'checked' : '';
    const label = document.createElement('label');
    label.className = 'opt';
    label.setAttribute('for', id);
    label.innerHTML = `<input type="radio" id="${id}" name="opt" value="${idx}" data-idx="${idx}" ${checked} /><div class="opt-text">${opt}</div>`;
    optionsForm.appendChild(label);
  });
  prevBtn.disabled = i === 0;
  nextBtn.disabled = i === questions.length - 1;
  startTimerFor(i);
}

function recordAndMove(direction){
  const startedAt = parseInt(optionsForm.dataset.startedAt || 0);
  const elapsed = startedAt ? ((Date.now() - startedAt) / 1000) : 0;
  timeSpent[currentIndex] = Math.max(1, Number(elapsed.toFixed(1)));
  const selected = optionsForm.querySelector('input[name="opt"]:checked');
  answers[currentIndex] = selected ? Number(selected.value) : null;
  const newIndex = currentIndex + direction;
  if(newIndex >= 0 && newIndex < questions.length){ currentIndex = newIndex; renderQuestion(currentIndex); } else { computeAndShowResult(); }
}

function computeAndShowResult(){
  clearInterval(timer);
  for(let i=0;i<questions.length;i++){ if(!timeSpent[i]) timeSpent[i] = timePerQuestion; }
  let correct = 0;
  questions.forEach((q, idx) => { if(answers[idx] === q.answerIndex) correct++; });
  const incorrect = questions.length - correct;
  const avg = (timeSpent.reduce((a,b)=>a+b,0) / timeSpent.length).toFixed(1);
  correctCountEl.textContent = `${correct}`;
  incorrectCountEl.textContent = `${incorrect}`;
  avgTimeEl.textContent = `${avg}s`;
  scoreSummary.innerHTML = `<strong>${correct} / ${questions.length}</strong> — ${Math.round((correct/questions.length)*100)}%`;
  const labels = questions.map((_,i)=>`Q${i+1}`);
  const data = timeSpent.map(t => Number(t.toFixed(1)));
  if(chartInstance) chartInstance.destroy();
  chartInstance = new Chart(timeChartCtx, {
    type: 'bar',
    data: { labels, datasets: [{ label: 'Time (s)', data, backgroundColor: labels.map(()=> 'rgba(124,58,237,0.75)'), borderRadius: 6 }]},
    options: { responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }
  });
  showResult();
}

startBtn.addEventListener('click', () => {
  const category = categoryEl.value;
  const difficulty = difficultyEl.value;
  const qcount = Math.max(1, Math.min(10, Number(qcountEl.value) || 3));
  questions = prepareQuestions(category, difficulty, qcount);
  currentIndex = 0;
  answers = new Array(questions.length).fill(null);
  timeSpent = new Array(questions.length).fill(0);
  showQuiz();
  renderQuestion(0);
});

prevBtn.addEventListener('click', ()=> recordAndMove(-1));
nextBtn.addEventListener('click', ()=> recordAndMove(1));
submitBtn.addEventListener('click', computeAndShowResult);
retryBtn.addEventListener('click', () => { answers = new Array(questions.length).fill(null); timeSpent = new Array(questions.length).fill(0); currentIndex = 0; showQuiz(); renderQuestion(0); });
homeBtn.addEventListener('click', ()=> { clearInterval(timer); showLanding(); });

optionsForm.addEventListener('keydown', (e)=> {
  const radios = Array.from(optionsForm.querySelectorAll('input[name="opt"]'));
  if(radios.length === 0) return;
  const focused = document.activeElement;
  let idx = radios.indexOf(focused);
  if(e.key === 'ArrowDown' || e.key === 'ArrowRight'){ e.preventDefault(); const next = radios[(idx+1) % radios.length]; next.focus(); next.checked = true; }
  else if(e.key === 'ArrowUp' || e.key === 'ArrowLeft'){ e.preventDefault(); const prev = radios[(idx-1+radios.length) % radios.length]; prev.focus(); prev.checked = true; }
});

showLanding();
