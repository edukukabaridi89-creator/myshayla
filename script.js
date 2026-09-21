const state = {
  answers: [],
  signature: "",
  startedAt: new Date().toISOString()
};

const message = `My Shylaaa,

If you're reading this, I want you to know that I made this little place for one reason: to remind us that what we have is worth being intentional about.

I don't expect us to be perfect. I don't expect every day to be easy. I just want us to keep choosing honesty, respect, patience, laughter, forgiveness and each other.

There are things I dream of sharing with you — quiet mornings, big wins, ordinary days, crazy adventures, prayers, a home, memories, and all the little moments nobody else gets to see.

So take this slowly.

There are a few things I want us to promise each other.`;

const questions = [
  {
    text: "I, Susan Wanjiru, choose to treat my partner with respect — even when I am angry or disappointed.",
    hint: "Respect should not disappear just because an argument starts."
  },
  {
    text: "I promise to make our relationship a safe place for honest communication, where we can talk without trying to hurt or embarrass each other.",
    hint: "Speak to understand, not just to win."
  },
  {
    text: "When we argue, I will not use threats of leaving, throwing someone out, or ending the relationship as a weapon.",
    hint: "This one matters. If emotions get too high, we can pause, cool down, and return to the conversation instead."
  },
  {
    text: "I promise that our private relationship matters, and I will not casually share our problems, plans, or sensitive conversations with other people.",
    hint: "When we genuinely need outside help, we can choose a trustworthy person together."
  },
  {
    text: "I will try to be better for us — not perfect, but willing to listen, learn, apologize, and grow.",
    hint: "Growth is something we both do."
  },
  {
    text: "I promise to celebrate my partner's progress instead of competing with it or making their success feel small.",
    hint: "Your partner's wins can become shared joy."
  },
  {
    text: "I will protect our trust by being honest about things that could affect our relationship.",
    hint: "Trust is built through consistency, not one big promise."
  },
  {
    text: "I will make room for affection, quality time, laughter, and small thoughtful gestures — even when life gets busy.",
    hint: "Love also lives in ordinary days."
  },
  {
    text: "When one of us needs space to cool down, I will respect that space and come back to the conversation instead of disappearing indefinitely.",
    hint: "A pause is different from punishment or silent treatment."
  },
  {
    text: "I choose to keep building this relationship with patience, honesty, teamwork and intention.",
    hint: "Not because everything will always be easy, but because we are worth the effort."
  }
];

const captions = [
  "This is the beginning — two people who found each other.",
  "I want us to keep faith, pray, and grow through life together.",
  "I want a partnership where we both carry the weight and both enjoy the wins.",
  "I want us to build enough that money becomes a tool for our dreams, not the thing that controls them.",
  "A home, a car, and a life that feels like ours.",
  "Not one person carrying everything — both of us showing up.",
  "Girlfriend → engaged → wife. One chapter at a time.",
  "And one day, a picture that says we made it to another beautiful chapter."
];

let currentPhoto = 0;
let currentQuestion = 0;
let typingTimer;

const $ = (id) => document.getElementById(id);
const screens = [...document.querySelectorAll(".screen")];

function show(id){
  screens.forEach(s => s.classList.toggle("active", s.id === id));
  window.scrollTo({top:0, behavior:"smooth"});
}

function spawnHeart(){
  const h = document.createElement("div");
  h.className = "heart";
  h.textContent = Math.random() > .25 ? "♥" : "✦";
  h.style.left = `${Math.random()*100}%`;
  h.style.fontSize = `${12 + Math.random()*20}px`;
  h.style.animationDuration = `${5 + Math.random()*5}s`;
  $("hearts").appendChild(h);
  setTimeout(()=>h.remove(),10000);
}
setInterval(spawnHeart, 900);

function typeMessage(){
  clearInterval(typingTimer);
  const el = $("typedMessage");
  el.textContent = "";
  let i = 0;
  typingTimer = setInterval(()=>{
    el.textContent = message.slice(0, i++);
    if(i > message.length){
      clearInterval(typingTimer);
      $("message").querySelector(".next-btn").classList.remove("hidden");
    }
  }, 18);
}

document.querySelectorAll("[data-action='start']").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    show("message");
    typeMessage();
  });
});

document.querySelectorAll("[data-next]").forEach(btn=>{
  btn.addEventListener("click", ()=>show(btn.dataset.next));
});

function renderPhoto(){
  $("galleryImage").src = `/images/${String(currentPhoto+1).padStart(2,"0")}-${[
    "introduction","bible","partnership","money","home-car","both-keys","future","wedding"
  ][currentPhoto]}.jpg`;
  $("galleryImage").onerror = () => {
    $("galleryImage").src = `/images/${String(currentPhoto+1).padStart(2,"0")}-${[
      "introduction","bible","partnership","money","home-car","both-keys","future","wedding"
    ][currentPhoto]}.png`;
  };
  $("galleryCaption").textContent = captions[currentPhoto];
  $("photoNumber").textContent = currentPhoto+1;
  $("prevPhoto").disabled = currentPhoto === 0;
  $("prevPhoto").style.opacity = currentPhoto === 0 ? .35 : 1;
}
$("nextPhoto").addEventListener("click", ()=>{
  if(currentPhoto < 7){ currentPhoto++; renderPhoto(); }
  else show("hard-easy");
});
$("prevPhoto").addEventListener("click", ()=>{
  if(currentPhoto > 0){ currentPhoto--; renderPhoto(); }
});
renderPhoto();

function renderQuestion(){
  const q = questions[currentQuestion];
  $("questionText").textContent = q.text;
  $("questionHint").textContent = q.hint;
  $("promiseNumber").textContent = String(currentQuestion+1).padStart(2,"0");
  $("questionLabel").textContent = `Promise ${currentQuestion+1} of ${questions.length}`;
  const pct = Math.round(((currentQuestion+1)/questions.length)*100);
  $("progressPercent").textContent = `${pct}%`;
  $("progressBar").style.width = `${pct}%`;
}
document.querySelectorAll(".answer").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    state.answers[currentQuestion] = btn.dataset.answer;
    if(currentQuestion < questions.length-1){
      currentQuestion++;
      renderQuestion();
    } else {
      renderSummary();
      show("final-check");
    }
  });
});
renderQuestion();

function renderSummary(){
  $("answerSummary").innerHTML = questions.map((q,i)=>`
    <div class="summary-item">
      <strong>${escapeHtml(q.text)}</strong>
      <span>${state.answers[i] === "YES" ? "YES — AGREED ❤️" : "NO — NOT YET"}</span>
    </div>
  `).join("");
}

$("goSign").addEventListener("click", ()=>show("signature"));

function escapeHtml(s){
  return s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
}

/* =========================
   SIGNATURE PAD
========================= */

const canvas = $("signatureCanvas");
const ctx = canvas.getContext("2d");

let drawing = false;
let hasSignature = false;

function setupCanvas() {
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;

  canvas.width = Math.max(1, Math.round(rect.width * dpr));
  canvas.height = Math.max(1, Math.round(rect.height * dpr));

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  ctx.lineWidth = 3;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.strokeStyle = "#1b0d14";
}

setupCanvas();
window.addEventListener("resize", setupCanvas);

function getPointerPosition(event) {
  const rect = canvas.getBoundingClientRect();

  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
}

canvas.addEventListener("pointerdown", (event) => {
  event.preventDefault();

  drawing = true;
  hasSignature = true;

  canvas.setPointerCapture(event.pointerId);

  const point = getPointerPosition(event);

  ctx.beginPath();
  ctx.moveTo(point.x, point.y);
});

canvas.addEventListener("pointermove", (event) => {
  if (!drawing) return;

  event.preventDefault();

  const point = getPointerPosition(event);

  ctx.lineTo(point.x, point.y);
  ctx.stroke();
});

function stopDrawing(event) {
  if (!drawing) return;

  drawing = false;

  try {
    if (canvas.hasPointerCapture(event.pointerId)) {
      canvas.releasePointerCapture(event.pointerId);
    }
  } catch (error) {}

  ctx.closePath();
}

canvas.addEventListener("pointerup", stopDrawing);
canvas.addEventListener("pointercancel", stopDrawing);

$("clearSignature").addEventListener("click", () => {
  const rect = canvas.getBoundingClientRect();

  ctx.clearRect(0, 0, rect.width, rect.height);

  hasSignature = false;
  state.signature = "";
});

$("finish").addEventListener("click", async () => {
  if (!hasSignature) {
    alert("Shylaaa, you need to sign first ❤️");
    return;
  }

  state.signature = canvas.toDataURL("image/png");
  $("savedSignature").src = state.signature;

  renderFinalLetter();
  show("finale");

  setTimeout(() => {
    $("handwritten").classList.add("show");
  }, 150);

  await sendToTelegram();
});

function renderFinalLetter() {
  const accepted = questions.map((q, i) => `
    <p>
      <strong>${i + 1}. ${escapeHtml(q.text)}</strong><br>
      <span style="color:${state.answers[i] === "YES" ? "#ff9fba" : "#b7aab4"}">
        ${state.answers[i] === "YES" ? "YES — accepted ❤️" : "NO — not yet"}
      </span>
    </p>
  `).join("");

  $("finalLetter").innerHTML = `
    <p><strong>My Shylaaa,</strong></p>
    <p>We found each other. Now we get to choose how we treat what we found.</p>
    <p>Whatever life brings, I hope we keep choosing respect over pride, conversation over assumptions, teamwork over competition, and patience over words we cannot take back.</p>
    <p><strong>Our commitments:</strong></p>
    ${accepted}
    <p>These aren't chains or rules. They're promises we can keep revisiting, talking about, and improving together.</p>
    <p>Here's to the ordinary days, the big dreams, the hard conversations, the laughter, the prayers, the adventures, and every chapter still ahead.</p>
  `;
}

async function sendToTelegram() {
  try {
    const payload = {
      timestamp: new Date().toISOString(),
      answers: questions.map((q, i) => ({
        question: q.text,
        answer: state.answers[i]
      })),
      signature: state.signature
    };

    const response = await fetch("/api/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      console.warn("Telegram submission failed.");
    }
  } catch (err) {
    console.warn("Telegram submission error:", err);
  }
}
