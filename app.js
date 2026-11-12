(() => {
  "use strict";
  const app = document.getElementById("app");
  const BANK = window.QUESTION_BANK || [];
  const BLOCKS = {
    "productividad": {title:"Producción y productividad", icon:"⚙️", desc:"Productividad de un factor, global, índices y tasas de variación."},
    "costes": {title:"Costes de producción", icon:"📊", desc:"CF, CV, CT, costes medios, marginales, directos e indirectos."},
    "punto-muerto": {title:"Punto muerto", icon:"🎯", desc:"Umbral de rentabilidad, beneficio y decisiones de comprar o fabricar."},
    "fifo-pmp": {title:"FIFO y PMP", icon:"📦", desc:"Valoración de existencias, ficha de almacén y comparación entre métodos."}
  };
  const LEVELS = {
    "Básico": {cls:"basic", desc:"Conceptos, fórmulas y relaciones fundamentales."},
    "Medio": {cls:"medium", desc:"Cálculos breves e interpretación de resultados."},
    "Reto": {cls:"reto", desc:"Preguntas PAU, datos combinados y decisiones razonadas."}
  };
  const STORE = "edmnTema4ProgressV1";
  let state = {mode:null, block:null, level:null, questions:[], index:0, attempts:0, answers:[], locked:false};

  const shuffle = arr => [...arr].sort(() => Math.random() - .5);
  const esc = s => String(s ?? "").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));
  const num = v => Number(String(v).replace(",",".").replace(/\s/g,""));
  const format = v => typeof v === "number" ? new Intl.NumberFormat("es-ES",{maximumFractionDigits:2}).format(v) : String(v);

  function loadProgress(){
    try { return JSON.parse(localStorage.getItem(STORE)) || {}; } catch { return {}; }
  }
  function saveOutcome(block, correct){
    const p=loadProgress();
    p[block] ||= {correct:0,total:0,sessions:0,best:0};
    p[block].total++; if(correct) p[block].correct++;
    localStorage.setItem(STORE,JSON.stringify(p));
  }
  function saveSession(block, pct){
    if(!block) return;
    const p=loadProgress(); p[block] ||= {correct:0,total:0,sessions:0,best:0};
    p[block].sessions++; p[block].best=Math.max(p[block].best||0,pct);
    localStorage.setItem(STORE,JSON.stringify(p));
  }
  function mastery(block){
    const s=loadProgress()[block];
    return s && s.total ? Math.round(s.correct/s.total*100) : 0;
  }
  function home(){
    state={mode:null,block:null,level:null,questions:[],index:0,attempts:0,answers:[],locked:false};
    const cards=Object.entries(BLOCKS).map(([id,b])=>{
      const pct=mastery(id), count=BANK.filter(q=>q.block===id).length;
      return `<article class="block-card">
        <div class="icon">${b.icon}</div><h3>${b.title}</h3><p>${b.desc}</p>
        <div class="progress"><span style="width:${pct}%"></span></div>
        <div class="progress-label"><span>Progreso guardado</span><strong>${pct}%</strong></div>
        <div class="levels">
          ${Object.keys(LEVELS).map(l=>`<button class="level-btn" data-start="${id}" data-level="${l}">${l}</button>`).join("")}
        </div>
        <small style="display:block;margin-top:12px;color:var(--muted)">${count} preguntas en la batería · 10 aleatorias por práctica</small>
      </article>`;
    }).join("");
    app.innerHTML=`
      <section class="hero">
        <div class="hero-main">
          <span class="eyebrow">Tema 4 · Función productiva</span>
          <h1>Practica la PAU<br>sin hacer siempre el mismo test</h1>
          <p class="lead">Elige bloque y nivel. Cada práctica selecciona 10 preguntas aleatorias para consolidar las bases de los ejercicios antes de resolverlos completos.</p>
          <div class="mode-row">
            <button class="btn btn-primary" id="examStart">Modo examen · 15 preguntas</button>
            <button class="btn btn-secondary" id="resetProgress">Borrar mi progreso</button>
          </div>
        </div>
        <aside class="hero-side">
          <h3>¿Cómo funciona?</h3>
          <ul>
            <li>3 niveles: Básico, Medio y Reto.</li>
            <li>Segundo intento antes de ver la solución.</li>
            <li>Explicación breve de cada respuesta.</li>
            <li>Progreso guardado solo en este navegador.</li>
            <li>Calculadora disponible en todo momento.</li>
          </ul>
        </aside>
      </section>
      <div class="section-head"><div><h2>Elige qué quieres practicar</h2><p>Los cuatro bloques prácticos del Tema 4.</p></div></div>
      <section class="blocks">${cards}</section>`;
    bindHome();
  }

  function bindHome(){
    app.querySelectorAll("[data-start]").forEach(b=>b.onclick=()=>startPractice(b.dataset.start,b.dataset.level));
    app.querySelector("#examStart").onclick=startExam;
    app.querySelector("#resetProgress").onclick=()=>{
      if(confirm("¿Quieres borrar el progreso guardado en este navegador?")){localStorage.removeItem(STORE);home();}
    };
  }

  function startPractice(block,level){
    const pool=BANK.filter(q=>q.block===block && q.level===level);
    state={mode:"practice",block,level,questions:shuffle(pool).slice(0,10),index:0,attempts:0,answers:[],locked:false};
    renderQuestion();
  }

  function startExam(){
    const picks=[];
    const ids=Object.keys(BLOCKS);
    ids.forEach((id,i)=>{
      const take=i<3?4:3;
      picks.push(...shuffle(BANK.filter(q=>q.block===id)).slice(0,take));
    });
    state={mode:"exam",block:null,level:null,questions:shuffle(picks),index:0,attempts:0,answers:[],locked:false};
    renderQuestion();
  }

  function renderQuestion(){
    const q=state.questions[state.index];
    if(!q) return finish();
    const label=state.mode==="exam"?"Modo examen":BLOCKS[state.block].title;
    const progress=((state.index)/state.questions.length)*100;
    app.innerHTML=`<section class="quiz-wrap">
      <div class="quiz-meta"><span>${esc(label)}${state.level?" · "+esc(state.level):""}</span><span>Pregunta ${state.index+1} de ${state.questions.length}</span></div>
      <div class="question-progress"><span style="width:${progress}%"></span></div>
      <article class="quiz-card">
        <span class="badge badge-${LEVELS[q.level].cls}">${q.level}</span>
        <div class="question">${q.prompt}</div>
        <div id="answerArea">${answerUI(q)}</div>
        <div id="feedback"></div>
        <div class="quiz-actions">
          <button class="btn btn-ghost" id="quitBtn">Salir</button>
          <button class="btn btn-primary" id="checkBtn">${state.mode==="exam"?"Guardar respuesta":"Comprobar"}</button>
        </div>
      </article>
    </section>`;
    document.getElementById("quitBtn").onclick=home;
    document.getElementById("checkBtn").onclick=check;
    const input=document.getElementById("numAnswer");
    if(input){input.focus();input.onkeydown=e=>{if(e.key==="Enter") check();};}
  }

  function answerUI(q){
    if(q.type==="mcq") return `<div class="options">${q.options.map(o=>`<button class="option" data-value="${esc(o)}">${esc(o)}</button>`).join("")}</div>`;
    if(q.type==="tf") return `<div class="options"><button class="option" data-value="true">Verdadero</button><button class="option" data-value="false">Falso</button></div>`;
    return `<div class="number-row"><input id="numAnswer" type="text" inputmode="decimal" placeholder="Escribe tu resultado"><span style="align-self:center;color:var(--muted)">Usa coma o punto decimal</span></div>`;
  }

  document.addEventListener("click",e=>{
    const o=e.target.closest(".option");
    if(!o || !app.contains(o) || state.locked) return;
    o.parentElement.querySelectorAll(".option").forEach(x=>x.classList.remove("selected"));
    o.classList.add("selected");
  });

  function userValue(q){
    if(q.type==="number") return document.getElementById("numAnswer").value.trim();
    const s=app.querySelector(".option.selected");
    return s?s.dataset.value:null;
  }
  function isCorrect(q,v){
    if(v===null || v==="") return false;
    if(q.type==="number"){
      const got=num(v); if(!Number.isFinite(got)) return false;
      const tol=q.tolerance ?? Math.max(.02,Math.abs(Number(q.answer))*.005);
      return Math.abs(got-Number(q.answer))<=tol;
    }
    if(q.type==="tf") return (v==="true")===q.answer;
    return v===String(q.answer);
  }

  function check(){
    const q=state.questions[state.index], v=userValue(q);
    if(v===null || v===""){showFeedback("hint","Falta una respuesta","Elige una opción o escribe un resultado antes de continuar.");return;}
    if(state.mode==="exam"){
      state.answers.push({q,value:v,correct:isCorrect(q,v)});
      state.index++; renderQuestion(); return;
    }
    if(state.locked){next();return;}
    state.attempts++;
    const ok=isCorrect(q,v);
    if(ok){
      state.locked=true;
      saveOutcome(q.block,true);
      state.answers.push({q,value:v,correct:true,attempts:state.attempts});
      markOptions(q,v,true);
      showFeedback("good","¡Correcto!",q.explanation);
      setNextButton();
    } else if(state.attempts===1){
      markOptions(q,v,false);
      showFeedback("hint","No es correcto. Te queda un segundo intento.",q.hint || "Revisa el planteamiento antes de responder de nuevo.");
      if(q.type!=="number") app.querySelectorAll(".option").forEach(x=>{x.disabled=false;x.classList.remove("selected");});
    } else {
      state.locked=true;
      saveOutcome(q.block,false);
      state.answers.push({q,value:v,correct:false,attempts:2});
      markOptions(q,v,false,true);
      showFeedback("bad","Respuesta incorrecta",`La respuesta correcta es <strong>${esc(displayAnswer(q))}</strong>. ${q.explanation}`);
      setNextButton();
    }
  }

  function displayAnswer(q){
    if(q.type==="tf") return q.answer?"Verdadero":"Falso";
    return format(q.answer);
  }
  function markOptions(q,v,final=false){
    if(q.type==="number") return;
    app.querySelectorAll(".option").forEach(o=>{
      o.disabled=final || state.locked;
      if(o.dataset.value===String(v)) o.classList.add(isCorrect(q,v)?"correct":"wrong");
      if(final && isCorrect(q,o.dataset.value)) o.classList.add("correct");
    });
  }
  function showFeedback(cls,title,body){
    document.getElementById("feedback").innerHTML=`<div class="feedback ${cls}"><strong>${title}</strong><div>${body}</div></div>`;
  }
  function setNextButton(){
    const b=document.getElementById("checkBtn"); b.textContent=state.index===state.questions.length-1?"Ver resultado":"Siguiente"; b.onclick=next;
  }
  function next(){state.index++;state.attempts=0;state.locked=false;renderQuestion();}

  function finish(){
    const total=state.answers.length;
    const correct=state.answers.filter(a=>a.correct).length;
    const pct=total?Math.round(correct/total*100):0;
    if(state.mode==="practice") saveSession(state.block,pct);
    const title=state.mode==="exam"?"Resultado del modo examen":"Práctica completada";
    const review=state.answers.map((a,i)=>`<div class="review-item">
      <strong class="${a.correct?"ok":"ko"}">${a.correct?"✓":"✗"} Pregunta ${i+1}</strong>
      <p>${a.q.prompt.replace(/<[^>]+>/g,"")}</p>
      <small><b>Respuesta:</b> ${esc(displayAnswer(a.q))}. ${esc(a.q.explanation)}</small>
    </div>`).join("");
    app.innerHTML=`<section class="result-card">
      <span class="eyebrow">${title}</span>
      <div class="score-ring" style="--score:${pct*3.6}deg"><strong>${pct}%</strong></div>
      <h2>${correct} de ${total} correctas</h2>
      <p style="color:var(--muted)">${pct>=80?"Muy buen dominio de las bases.":pct>=60?"Buen punto de partida; revisa los errores antes de repetir.":"Conviene repetir este bloque y apoyarte en las explicaciones."}</p>
      <div class="mode-row" style="justify-content:center">
        ${state.mode==="practice"?`<button class="btn btn-primary" id="repeat">Otra práctica aleatoria</button>`:""}
        <button class="btn btn-secondary" id="backHome">Volver al inicio</button>
      </div>
      <div class="review"><h3>Revisión</h3>${review}</div>
    </section>`;
    document.getElementById("backHome").onclick=home;
    const repeat=document.getElementById("repeat"); if(repeat) repeat.onclick=()=>startPractice(state.block,state.level);
  }

  // Calculadora
  const calc=document.getElementById("calculator"), display=document.getElementById("calcDisplay");
  document.getElementById("calcToggle").onclick=()=>{calc.classList.add("open");calc.setAttribute("aria-hidden","false");};
  document.getElementById("calcClose").onclick=()=>{calc.classList.remove("open");calc.setAttribute("aria-hidden","true");};
  document.querySelectorAll("[data-calc]").forEach(b=>b.onclick=()=>{
    const v=b.dataset.calc;
    if(v==="C") display.value="";
    else if(v==="⌫") display.value=display.value.slice(0,-1);
    else if(v==="="){
      try{
        const expr=display.value.replace(/,/g,".");
        if(!/^[0-9+\-*/().\s]+$/.test(expr)) throw 0;
        display.value=Function('"use strict";return ('+expr+')')().toString().replace(".",",");
      }catch{display.value="Error";}
    } else display.value += v;
  });
  document.getElementById("homeBtn").onclick=home;
  document.querySelectorAll("[data-home]").forEach(x=>x.onclick=e=>{e.preventDefault();home();});

  if(BANK.length!==160){
    app.innerHTML=`<div class="notice"><strong>La batería necesita revisión.</strong> Se han cargado ${BANK.length} preguntas en lugar de 160.</div>`;
  } else home();
})();