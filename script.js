const SHEET_URL="https://script.google.com/macros/s/AKfycbxnzsSmzYo3cYnj5FejZQ9nHZDjspHNw9Tn64WU-MSzylRgGy8D71eP10YRS19r2OYV/exec"; /* <-- Google Apps Script Web App URL ekhane paste koro */
const PROMPTS=[
"DIU-te tomar shobcheye funny ghotona ki? 😂","Class-e tumi kon kaj-ta kore dhora porechho? 🙈","Cafeteria-r shobcheye bhalo khabar ki? 🍛",
"Bondhuder kothay ekta compliment dao ❤️","Exam-er age tumi ki kaj koro? 📚","DIU-te tumi ki bodlate chao? 🤔",
"Tomar shobcheye boro varsity shopno ki? 🎓","Ekta secret jeta keu jane na 🤫","Tomar jonno best class-er somoy kon-ta? ⏰","Notun student-der jonno ekta tip dao 💡"];
const $=id=>document.getElementById(id);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const pick=()=>PROMPTS[Math.floor(Math.random()*PROMPTS.length)];
$("prompt").textContent=pick();$("shuf").onclick=()=>$("prompt").textContent=pick();
try{$("name").value=localStorage.getItem("chit_name")||""}catch(e){}
$("text").oninput=()=>$("cnt").textContent=$("text").value.length;

$("send").onclick=()=>{
 const name=$("name").value.trim(),text=$("text").value.trim();
 if(!name)return say("Age naam likho 😅");
 if(!text)return say("Kichu likho tarpor pathao 😄");
 if(!SHEET_URL)return say("Admin ekhono setup shesh kore nai.");
 const now=Date.now(),lastT=+(localStorage.getItem("chit_t")||0);
 if(now-lastT<15000)return say("Ektu opekkha koro, 15 second por abar pathao ⏳");
 $("send").disabled=true;
 fetch(SHEET_URL,{method:"POST",mode:"no-cors",headers:{"Content-Type":"text/plain"},
  body:JSON.stringify({name,dept:$("dept").value,prompt:$("prompt").textContent,text})})
 .then(()=>{try{localStorage.setItem("chit_name",name);localStorage.setItem("chit_t",now)}catch(e){}
  $("text").value="";$("cnt").textContent=0;say("✅ Pathano hoyeche! Dhonnobad 🌼");})
 .catch(()=>say("Pathano jaini, abar try koro"))
 .finally(()=>$("send").disabled=false);};
function say(t){$("msg").textContent=t;}

function wall(){
 if(!SHEET_URL){$("wall").textContent="Ekhono kichu nei.";return;}
 fetch(SHEET_URL).then(r=>r.json()).then(l=>{
  $("wall").innerHTML=l.length?l.map(c=>'<div class="chit"><small>'+esc(c.prompt)+'</small>'+esc(c.text)+'</div>').join(""):"Ekhono kono chit approve hoy nai.";
 }).catch(()=>{$("wall").textContent="Wall load hoy nai.";});}
wall();
