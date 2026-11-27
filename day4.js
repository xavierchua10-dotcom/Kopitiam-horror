/* DAY 4 — the truth. A wrecked, red shop; the full news; the collapse; the run home; the banging; three gentle knocks. */
export default function install(G){
const {THREE,scene,P,EYE,A,CINE,D,WPS,atuk,CROWD,HOME,FEET,shutter,
  $,sleep,say,sp,cineIn,cineOut,camTo,yawTo,csleep,tween,handAct,pose,objT,setClock,setTime,applyLights,bulbSet,flicker,tapOff,lids,drawClock,
  showCrowd,drawBoard,day1Props,shutBlock,M,box,ctex}=G;

const card=async(h,sm,ms=2400)=>{const dc=$('dcard');dc.innerHTML=h+'<small>'+sm+'</small>';dc.style.opacity=1;await sleep(ms);dc.style.opacity=0};
const rnd=(a,b)=>a+Math.random()*(b-a);
const pace=(x,z,sp_=1.7)=>{const x0=P.x,z0=P.z,L=Math.hypot(x-x0,z-z0);if(L<.9)return Promise.resolve();let st=0;
  return tween(k=>{const e=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;P.x=x0+(x-x0)*e;P.z=z0+(z-z0)*e;st++;EYE.y=1.6+Math.sin(performance.now()/110)*.035*Math.min(1,Math.min(k,1-k)*8);if(st%16===0)A.step()},Math.max(700,L/sp_*1000)).then(()=>{EYE.y=1.6})};

/* ================= the wrecked, red shop (built once, kept in a group so Day 5 can hide it) ================= */
const RED=new THREE.Group();scene.add(RED);RED.visible=false;
let built=false,wrecked=[];
function buildRed(){if(built)return;built=true;
  const R1='#4a0806',R2='#7a0d0a',R3='#a8160e';
  const dec=(w,h,px,py,fn,pos,ry,rx=0)=>{const c=document.createElement('canvas');c.width=px;c.height=py;const g=c.getContext('2d');fn(g,px,py);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;
    const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshLambertMaterial({map:t,transparent:true,alphaTest:.04,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-3}));m.position.set(...pos);m.rotation.set(rx,ry,0);RED.add(m);return m};
  const drip=(g,x,y,l,w)=>{g.fillStyle=R1;g.fillRect(x-w/2,y,w,l);g.fillStyle=R2;g.fillRect(x-w/2+1,y,Math.max(1,w-2),l);g.fillStyle=R1;g.beginPath();g.arc(x,y+l,w*.8,0,7);g.fill()};
  const palm=(g,x,y,sc,rot,smear)=>{g.save();g.translate(x,y);g.rotate(rot);g.scale(sc,sc);
    if(smear){g.fillStyle='rgba(90,10,8,.55)';g.fillRect(-9,0,18,smear)}
    g.fillStyle=R2;g.beginPath();g.ellipse(0,0,10,12,0,0,7);g.fill();
    for(const [fx,fy,fl,fr] of [[-9,-12,16,-.35],[-4,-16,19,-.1],[2,-17,19,.05],[8,-14,17,.25]]){g.save();g.translate(fx,fy);g.rotate(fr);g.fillStyle=R2;g.fillRect(-2.2,-fl,4.4,fl);g.beginPath();g.arc(0,-fl,2.2,0,7);g.fill();g.restore()}
    g.save();g.translate(-10,4);g.rotate(-1.1);g.fillRect(-2.4,-12,4.8,12);g.beginPath();g.arc(0,-12,2.4,0,7);g.fill();g.restore();
    g.fillStyle=R3;g.globalAlpha=.55;g.beginPath();g.ellipse(2,2,5,6,0,0,7);g.fill();g.globalAlpha=1;
    g.fillStyle=R1;for(let i=0;i<3;i++)drip(g,-8+i*8,10,6+Math.random()*10,2.2);g.restore()};
  const cjk=(g,txt,x,y,size)=>{g.save();g.font=`900 ${size}px "Noto Serif CJK SC","Noto Sans CJK SC","Microsoft YaHei","PingFang SC",serif`;g.textAlign='center';g.textBaseline='middle';
    g.shadowColor=R1;g.shadowBlur=6;g.fillStyle=R1;g.fillText(txt,x+2,y+2);g.shadowBlur=0;g.fillStyle=R2;g.fillText(txt,x,y);g.strokeStyle=R3;g.lineWidth=2;g.globalAlpha=.55;g.strokeText(txt,x-1,y-1);g.globalAlpha=1;
    const w=g.measureText(txt).width;for(let i=0;i<Math.max(3,txt.length*2);i++)drip(g,x-w/2+Math.random()*w,y+size*.25+Math.random()*size*.2,20+Math.random()*60,3+Math.random()*3);g.restore()};
  const palms=n=>(g,px,py)=>{for(let i=0;i<n;i++)palm(g,Math.random()*px*.9+px*.05,Math.random()*py*.8+py*.15,1.2+Math.random()*1.3,(Math.random()-.5)*1.1,Math.random()<.4?10+Math.random()*30:0)};
  const scorch=(w,h,px,py,pos,ry)=>dec(w,h,px,py,(g,x,y)=>{const q=g.createRadialGradient(x*.5,y*.9,4,x*.5,y*.9,x*.55);q.addColorStop(0,'rgba(8,6,5,.9)');q.addColorStop(1,'rgba(8,6,5,0)');g.fillStyle=q;g.fillRect(0,0,x,y)},pos,ry);
  /* walls: the curse words and a few palms */
  dec(3.6,2.3,512,328,(g,px,py)=>{cjk(g,'还我命',px*.5,py*.42,150);palms(4)(g,px,py)},[-3.1,1.55,-3.96],0);
  dec(2.0,2.0,256,256,palms(3),[2.3,1.45,-3.96],0);
  dec(4.4,2.6,512,300,(g,px,py)=>{cjk(g,'冤',px*.34,py*.45,200);cjk(g,'救命',px*.74,py*.5,120);palms(5)(g,px,py)},[-4.96,1.6,-2.0],Math.PI/2);
  dec(3.2,2.4,400,300,(g,px,py)=>{cjk(g,'对不起',px*.5,py*.4,100);palms(3)(g,px,py)},[4.96,1.5,-2.2],-Math.PI/2);
  dec(3,2.4,360,288,(g,px,py)=>{cjk(g,'走',px*.5,py*.42,190);palms(3)(g,px,py)},[-3.5,1.5,3.96],Math.PI);
  /* ceiling: curse marks, scorch, a burnt hole glowing orange */
  dec(5,3.2,640,410,(g,px,py)=>{cjk(g,'冤',px*.28,py*.5,170);palm(g,px*.62,py*.3,2.2,.4,24);palm(g,px*.72,py*.62,1.8,-.5,0);palm(g,px*.5,py*.82,1.4,.2,18);
    const sc=g.createRadialGradient(px*.78,py*.4,6,px*.78,py*.4,120);sc.addColorStop(0,'rgba(8,6,5,.95)');sc.addColorStop(.6,'rgba(18,14,12,.75)');sc.addColorStop(1,'rgba(18,14,12,0)');g.fillStyle=sc;g.fillRect(0,0,px,py);
    g.fillStyle='#050403';g.beginPath();g.moveTo(px*.7,py*.28);for(let i=0;i<14;i++){const a=i/14*Math.PI*2,r=34+Math.random()*30;g.lineTo(px*.78+Math.cos(a)*r*1.3,py*.4+Math.sin(a)*r)}g.fill();
    const gl=g.createRadialGradient(px*.78,py*.4,2,px*.78,py*.4,44);gl.addColorStop(0,'rgba(255,150,40,.9)');gl.addColorStop(1,'rgba(255,90,10,0)');g.fillStyle=gl;g.fillRect(px*.6,py*.15,px*.36,py*.5)},[0,2.955,.2],0,Math.PI/2);
  dec(3,2,380,250,(g,px,py)=>{palm(g,px*.3,py*.5,2,.3,20);palm(g,px*.66,py*.35,1.6,-.4,0);cjk(g,'救命',px*.55,py*.72,70)},[-2.8,2.956,-2.2],0,Math.PI/2);
  scorch(3.4,1.6,340,160,[0,2.4,-3.95],0);scorch(2.6,1.8,260,180,[4.95,2.2,1.3],-Math.PI/2);
  /* floor: smeared trail, cracks */
  dec(1.6,6,160,600,(g,px,py)=>{g.fillStyle='rgba(74,8,6,.8)';for(let i=0;i<40;i++){const y=py-i*14-Math.random()*8;g.beginPath();g.ellipse(px*.5+(Math.random()-.5)*60+Math.sin(i)*20,y,10+Math.random()*16,5+Math.random()*7,0,0,7);g.fill()}g.fillStyle=R2;for(let i=0;i<60;i++){g.beginPath();g.arc(Math.random()*px,Math.random()*py,1+Math.random()*3,0,7);g.fill()}},[.4,.02,.6],0,-Math.PI/2);
  dec(3.5,3.5,350,350,(g,px,py)=>{g.strokeStyle='rgba(15,15,15,.85)';g.lineWidth=2;const cr=(x,y,n)=>{g.beginPath();g.moveTo(x,y);for(let i=0;i<n;i++){x+=(Math.random()-.4)*45;y+=(Math.random()-.5)*35;g.lineTo(x,y)}g.stroke()};for(let i=0;i<6;i++)cr(px*.5,py*.5,7)},[-.6,.017,-.2],0,-Math.PI/2);
  /* tables: smears, ash */
  for(const [x,z] of [[-3,-1.8],[-3,1.2],[2.8,-1.8],[-1.7,.3]]){const m=dec(1.1,.7,220,140,(g,px,py)=>{palm(g,30+Math.random()*(px-60),30+Math.random()*(py-60),.85,Math.random()*6,Math.random()<.5?14:0);g.fillStyle='rgba(60,60,60,.45)';for(let i=0;i<6;i++){g.beginPath();g.ellipse(Math.random()*px,Math.random()*py,10+Math.random()*16,6+Math.random()*8,0,0,7);g.fill()}},[x,.79,z],0,-Math.PI/2);m.rotation.z=Math.random()*6}
  /* debris */
  const ashM=M(0x3a3836),plank=M(0x3a2a1c),shard=new THREE.MeshBasicMaterial({color:0xcfe6ee,transparent:true,opacity:.75});
  for(const [x,z,r] of [[-1.2,1.6,.35],[1.6,-.8,.3],[2.4,2.2,.3],[-3.9,-1.5,.3],[.5,-2.8,.4]]){const a=new THREE.Mesh(new THREE.SphereGeometry(r,8,5),ashM);a.scale.y=.22;a.position.set(x,.03,z);RED.add(a)}
  for(const [x,z,ry,l] of [[.9,.9,.6,1.2],[-.2,2.6,-.4,.9],[1.9,-2.3,1.2,1.1],[-2.3,3.1,.2,.8],[3.1,1,-.9,.7]]){const p=new THREE.Mesh(new THREE.BoxGeometry(l,.05,.12),plank);p.position.set(x,.04,z);p.rotation.y=ry;p.rotation.z=.04;RED.add(p)}
  for(let i=0;i<46;i++){const t=new THREE.Mesh(new THREE.ConeGeometry(.04+Math.random()*.05,.09,3),shard);t.position.set(-3+Math.random()*6,.03,-2.5+Math.random()*5.5);t.rotation.set(Math.PI/2*Math.random()+1.2,Math.random()*6,Math.random());RED.add(t)}
  /* toppled stools, bent fan, a dead hanging tube */
  wrecked=[];[0,2,5,6].forEach((i,k)=>{const st=G.stools[i];if(!st)return;wrecked.push([st,st.rotation.clone(),st.position.clone()]);st.rotation.z=1.45;st.rotation.y=k*1.3;st.position.y=.17});
  wrecked.push([G.fan,G.fan.rotation.clone(),G.fan.position.clone()]);G.fan.rotation.z=.32;G.fan.position.y=2.6;
  const tube=scene.children.find(m=>m.isMesh&&Math.abs(m.position.y-2.94)<.01&&Math.abs(m.position.z-1.4)<.01);
  if(tube){wrecked.push([tube,tube.rotation.clone(),tube.position.clone()]);tube.rotation.z=.5;tube.position.y=2.55}
}
G.unwreck=()=>{RED.visible=false;for(const [o,r,p] of wrecked){o.rotation.copy(r);o.position.copy(p)}};

/* ================= fire sprites for the street ================= */
const FIRE=[];
function mkFire(){if(FIRE.length)return;const c=document.createElement('canvas');c.width=c.height=64;const g=c.getContext('2d'),gr=g.createRadialGradient(32,40,2,32,36,30);gr.addColorStop(0,'rgba(255,240,170,1)');gr.addColorStop(.35,'rgba(255,150,40,.85)');gr.addColorStop(1,'rgba(255,60,10,0)');g.fillStyle=gr;g.fillRect(0,0,64,64);
  const tx=new THREE.CanvasTexture(c);
  for(let i=0;i<16;i++){const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:tx,transparent:true,depthWrite:false,fog:false,blending:THREE.AdditiveBlending}));sp.visible=false;sp.userData.ph=Math.random()*6;scene.add(sp);FIRE.push(sp)}}
G.tick.push(()=>{const t=performance.now()/1000;for(const f of FIRE){if(!f.visible)continue;const s=1+Math.sin(t*9+f.userData.ph)*.15+Math.sin(t*23+f.userData.ph)*.1;f.scale.set(1.9*s,3.0*s,1);f.position.y=1.5+Math.sin(t*7+f.userData.ph)*.1}});

/* ================= opening ================= */
let beep=false,atukMats=[];
async function beepLoop(){beep=true;while(beep){A.tone(900,900,.14,.1,'sine');await sleep(1250)}}
async function start(){
  G.busy=true;G.state='d4_intro';
  setTime('dusk');G.setLights(true);applyLights(1);bulbSet(1);tapOff();setClock('6:30 AM');
  shutter.position.y=3.6;shutBlock(false);drawBoard(5);day1Props(true);G.tvSet('off');G.FIG.visible=false;
  G.details();G.gore();buildRed();RED.visible=true;
  showCrowd(true);D.crowd=true;CROWD.forEach((c,i)=>{c.position.set(HOME[i][0],0,HOME[i][1]);c.rotation.y=HOME[i][2];pose(c,0,'sit')});
  atuk.position.set(3.9,0,3.5);atuk.rotation.y=1.0;pose(atuk,0,'stand');FEET.visible=false;
  atukMats=[];atuk.traverse(o=>{if(o.isMesh&&o.material&&!o.material.map){o.material=o.material.clone();o.material.transparent=true;o.material.opacity=.72;atukMats.push(o.material)}});
  G.haze.style.background='radial-gradient(ellipse at 50% 55%,rgba(170,60,40,.08) 0%,rgba(140,30,22,.5) 100%)';G.haze.style.opacity=1;
  CINE.noclip=true;EYE.y=.62;P.x=14.5;P.z=17.0;P.yaw=0;P.pitch=1.1;P.tx=null;P.fy=null;lids(0,0);G.setBlur(true);
  $('fade').style.transition='opacity 1s';$('fade').style.opacity=1;
  await card('DAY 4','6:30 AM',2200);
  await cineIn();
  $('fade').style.transition='opacity 1.4s';$('fade').style.opacity=0;beepLoop();await sleep(2000);
  await lids(.25,600);await sleep(300);await lids(0,260);await sleep(400);G.setBlur(false);await lids(1,1000);
  await camTo(14.5,17.0,0,-.02,1000);
  await say('The alarm is slow now. Steady. Like a machine.',2800);
  beep=false;setClock('6:55 AM');drawClock(6,55);
  await say(sp('YOU','...This is not a dream.'),2400);
  await say('Dust on everything. The air tastes of smoke.',2600);
  await Promise.all([tween(k=>{EYE.y=.62+(1.6-.62)*k},1200),camTo(13.1,18.2,Math.PI,0,1200)]);
  EYE.y=1.6;CINE.noclip=false;await cineOut();
  G.state='d4_go';objT('Go to the kopitiam');G.busy=false}

/* ================= the shop ================= */
WPS.d4_go={x:2.8,z:3.05,r:.6,go:1,fn:greet};
async function greet(){if(G.busy||CINE.on)return;G.busy=true;await cineIn();
  await pace(2.95,3.05);
  await camTo(P.x,P.z,yawTo(-3,-1),-.02,1100);
  await say('The shop is wrecked. Red marks on every wall.',2800);
  await say('Nobody looks up. Nobody ever looks up.',2400);
  await camTo(P.x,P.z,yawTo(atuk.position.x,atuk.position.z),.02,1000);
  await say(sp('ATUK','Eh, you ah. Who make the kopi today?'),2400);
  await say(sp('YOU','Me, Atuk. I did.'),1800);
  await say(sp('ATUK','Oh. ...Good. Atuk forget things lately.'),2800);
  await say(sp('YOU','Atuk, what happened to the shop?'),2200);
  await csleep(900);
  await say(sp('ATUK','Which shop? ...Same like always.'),2600);
  await say(sp('YOU','Look around!'),1600);
  await say(sp('ATUK','...Don\'t look too long, cucu.'),2600);
  await camTo(P.x,P.z,0,0,600);
  G.state='d4_look';ci=0;setClock('11:05 AM');objT(LK[0].obj);G.busy=false;await cineOut()}

/* ---------- each customer slips into the truth without noticing ---------- */
let ci=0;
const Y=t=>say(sp('YOU',t),2200);
const fade=a=>atukMats.forEach(m=>m.opacity=a);
const LK=[
 {obj:'Talk to Ah Seng',m:[-2.15,-.85],c:0,pit:-.5,clk:'11:15 AM',run:async c=>{await Y('Ah Seng... your watch.');await say('"Stopped at 12:41. Funny, no? Like time also tired."',3200,c);await say(sp('YOU','What happens at 12:41?'),2000);await say('"Teh-C peng, please. ...Why so cold today?"',2800,c)}},
 {obj:'Talk to Mak Cik Salmah',m:[-2.2,-2.6],c:1,pit:-.45,clk:'11:22 AM',run:async c=>{await Y('Mak Cik, your arm...');await say('"Why so hot in here, cucu? My arm is burning."',3000,c);await say('She is shivering. Nothing is on fire.',2600);await say('"Teh tarik. Panas-panas. Please."',2400,c)}},
 {obj:'Talk to Raj',m:[-2.15,.45],c:2,pit:-.5,clk:'11:30 AM',run:async c=>{await Y('Raj, where is your other shoe?');await say('"I keep looking. I walked in with two, I swear."',3000,c);await say('"I was only going to buy kopi, then go to work."',3000,c);await say('He stares at his sock. It is a long time before he looks up.',3000)}},
 {obj:'Talk to Pak Hassan',m:[-.95,-.5],c:3,pit:-.35,clk:'11:37 AM',run:async c=>{await Y('Pak Hassan, same page again?');await say('"Page seven. I cannot turn it. Strange."',2800,c);await say('The newspaper is dated today. The headline is blank.',2800);await say('"Roti bakar. Kurang butter."',2200,c)}},
 {obj:'Talk to Mei Ling',m:[-.9,1.15],c:4,pit:-.3,clk:'11:44 AM',run:async c=>{await Y('Mei Ling... how is your daughter?');await say('"Her birthday is next week. I must go home."',3000,c);await say('"I must go home, I must go home..."',2600,c);await say(sp('YOU','...I know. I know you must.'),2800)}}];
WPS.d4_look={get x(){return LK[Math.min(ci,LK.length-1)].m[0]},get z(){return LK[Math.min(ci,LK.length-1)].m[1]},r:.6,go:1,get fn(){return lookRun}};
async function lookRun(){if(G.busy||CINE.on)return;G.busy=true;const k=LK[ci],c=CROWD[k.c];A.click();await cineIn();
  await camTo(k.m[0],k.m[1],yawTo(c.position.x,c.position.z),0,900);
  await camTo(k.m[0],k.m[1],yawTo(c.position.x,c.position.z),k.pit,700);
  await k.run(c);
  await camTo(k.m[0],k.m[1],yawTo(c.position.x,c.position.z),0,500);
  setClock(k.clk);ci++;fade(.72-ci*.1);
  if(ci>=LK.length){G.state='d4_tv';objT('The TV is on');await say('The TV is on. Nobody turned it on.',2600)}else objT(LK[ci].obj);
  G.busy=false;await cineOut()}

/* ================= the news, the collapse, the run, the door ================= */
const newsLine=(t,ms)=>say(sp('NEWS',t),ms);
const turnToYou=(ms=1500)=>{const all=CROWD.concat([atuk]);const st=all.map(g=>g.rotation.y);const tg=all.map((g,i)=>{const dx=P.x-g.position.x,dz=P.z-g.position.z;let d=Math.atan2(dx,dz)-Math.PI-st[i];d=Math.atan2(Math.sin(d),Math.cos(d));return d});
  return tween(k=>{all.forEach((g,i)=>{g.rotation.y=st[i]+tg[i]*k})},ms)};
WPS.d4_tv={x:3.4,z:.5,r:.6,go:1,fn:tvAndAfter};
async function tvAndAfter(){if(G.busy||CINE.on)return;G.busy=true;await cineIn();
  await camTo(3.4,.5,yawTo(4.9,.5),.27,1200);
  G.tvSet('static');A.static(.25);await csleep(900);
  G.tvSet('crash');A.static(.05);await csleep(500);
  await newsLine('Breaking news. A lorry lost control early this morning and crashed into a kopitiam on Jalan Besar.',4200);
  await newsLine('The lorry burst into flames. The driver survived and is in police custody.',3600);
  await newsLine('Six people died at the scene: the owner, an elderly man, and five customers.',3800);
  await csleep(600);
  await newsLine('One person survived. The owner\'s grandson was found unconscious and rushed to hospital. He has not woken up.',4600);
  G.tvSet('static');A.static(.3);await csleep(700);G.tvSet('off');A.static(0);
  await csleep(900);
  /* everyone turns and looks at you */
  await say(sp('YOU','...That is me. That is all of us.'),2800);
  A.tone(60,40,1.2,.2,'sine');
  await camTo(3.4,.5,yawTo(-2,.5),0,1300);
  await turnToYou(1600);
  await csleep(1200);
  await say(sp('ATUK','Dengar ah, cucu.'),2000);
  await say(sp('ATUK','It is time. Do not be afraid.'),3400);
  /* the collapse: slow, then all at once */
  A.rumble&&A.rumble();A.sting();
  const hz=(r,g,b,a1,a2)=>{G.haze.style.background=`radial-gradient(ellipse at 50% 55%,rgba(${r},${g},${b},${a1}) 0%,rgba(${Math.round(r*.8)},${Math.round(g*.3)},${Math.round(b*.3)},${a2}) 100%)`};
  const tubeM=scene.children.find(m=>m.isMesh&&Math.abs(m.position.x)<.01&&Math.abs(m.position.z-1.4)<.01&&m.position.y>2&&m.position.y<2.7);
  const dust=[];for(let i=0;i<26;i++){const d=new THREE.Mesh(new THREE.BoxGeometry(.05+Math.random()*.1,.05+Math.random()*.08,.05+Math.random()*.1),M(Math.random()<.5?0x4a4440:0x6a5a4a));d.position.set(P.x-3+Math.random()*6,3.1,P.z-3+Math.random()*6);d.userData.v=.5+Math.random()*1.5;scene.add(d);dust.push(d)}
  const shake=(amp,ms)=>tween(k=>{P.pitch=Math.sin(k*90)*amp*(1-k*.4);P.yaw+=Math.sin(k*70)*amp*.18},ms);
  const fall=()=>{for(const d of dust){d.position.y=Math.max(.04,d.position.y-d.userData.v*.05);d.rotation.x+=.1}};
  const fl=setInterval(fall,50);
  await flicker([.7,.1,.6,0,.5]);A.tone(70,40,1.6,.25,'sine');
  hz(230,70,40,.2,.62);shake(.012,1600);await csleep(1600);
  say('The walls are cracking.',1800);A.nz&&A.nz(.5,200,500,.2,'lowpass',1);
  await flicker([.4,0,.6,0,0,.5,0]);hz(255,90,40,.3,.72);
  await shake(.02,1800);
  if(tubeM){tubeM.position.y=.12;tubeM.rotation.z=1.4;A.tone(180,60,.5,.25,'sawtooth')}
  applyLights(0);bulbSet(0);
  await say(sp('ATUK','Lari! Lari, cucu!'),1500);
  await shake(.03,1400);
  clearInterval(fl);dust.forEach(d=>scene.remove(d));
  hz(255,120,40,.18,.6);
  for(const c of CROWD){c.userData.f0&&0;const dx=P.x-c.position.x,dz=P.z-c.position.z;A.tone(300,120,.2,.08,'sawtooth');c.visible=false;await csleep(420)}
  await say(sp('ATUK','Balik rumah. Lock the door. Atuk... follow.'),2400);
  atuk.visible=false;A.tone(260,60,.7,.15,'sawtooth');await csleep(700);
  await say(sp('YOU','RUN.'),1200);
  /* hand the controls back: the chase */
  mkFire();FIRE.forEach((f,i)=>{const t=(i>>1)/8,x=.9+(5.6-.9)*t+(i%2?3.2:-3.2),z=6.6+(13-6.6)*t+(i%2?-1:1);f.position.set(x,1.5,z);f.visible=true});
  const dg=window.__doorG;if(dg)dg.rotation.y=-1.25;
  const FIG=G.FIG;FIG.position.set(-1.5,0,-3.2);FIG.visible=true;
  RT=0;G.spd=1.9;chase=true;
  G.state='d4_run';objT('RUN home!');G.busy=false;await cineOut()}

/* the chase: you steer, it never quite catches you — but it never stops */
let chase=false,RT=0,hb=0;
const ROUTE=[[.5,4.7],[.9,6.8],[5.6,13.0],[6.1,15.4],[6.1,17.4],[6.5,20.8],[13.1,20.8],[13.1,18.9]];
WPS.d4_run={get x(){return ROUTE[Math.min(RT,ROUTE.length-1)][0]},get z(){return ROUTE[Math.min(RT,ROUTE.length-1)][1]},r:.95,get fn(){return runStep}};
function runStep(){if(!chase)return;RT++;if(RT>=ROUTE.length){chase=false;G.spd=1;finish()}}
G.tick.push(dt=>{if(!chase)return;const FIG=G.FIG,t=performance.now()/1000;
  const dx=P.x-FIG.position.x,dz=P.z-FIG.position.z,d=Math.hypot(dx,dz);
  const want=d>2.6?(d>9?4.6:3.7):0;
  if(want){FIG.position.x+=dx/d*want*dt;FIG.position.z+=dz/d*want*dt}
  FIG.rotation.y=Math.atan2(dx,dz)+Math.PI;FIG.visible=d<16;
  const near=Math.max(0,Math.min(1,(9-d)/6.5));
  G.haze.style.opacity=.8+near*.2+Math.sin(t*(6+near*8))*.08;
  hb-=dt;if(hb<=0){hb=1.1-near*.6;A.tone(70,45,.14,.18+near*.15,'sine')}
  if(near>.85&&Math.random()<dt*.8)A.nz&&A.nz(.3,500,300,.1,'bandpass',1.2);
  if(G.state==='d4_run'&&RT===0&&Math.random()<dt*.05)say('"maaf... maaf..."',1500)});

async function finish(){await cineIn();FIG0();await bedroom();
  $('fade').style.transition='opacity 2.2s';$('fade').style.opacity=1;await sleep(2600);
  CINE.noclip=false;EYE.y=1.6;await cineOut();
  if(G.day5){G.busy=false;G.state='d5_intro';G.day5();return}
  $('endh').textContent='END OF DAY 4';$('endp').textContent='Three gentle knocks. "It\'s us."';$('endl').textContent='Last Order · Day 5 is coming';
  $('end').style.display='flex';G.busy=false;G.state='end'}
function FIG0(){G.FIG.visible=false;FIRE.forEach(f=>f.visible=false);G.busy=true}
async function bedroom(){
  const dg2=scene.children.find(o=>o.isGroup&&Math.abs(o.position.x-12.6)<.02&&Math.abs(o.position.z-19.4)<.02);
  setTime('night');applyLights(.1);bulbSet(0);G.haze.style.background='radial-gradient(ellipse at 50% 55%,rgba(120,30,25,.1) 0%,rgba(90,15,12,.55) 100%)';G.haze.style.opacity=1;
  await camTo(13.1,18.7,Math.PI,0,500);
  if(dg2){const r0=dg2.rotation.y;await tween(k=>{dg2.rotation.y=r0*(1-k)},700)}
  A.click();handAct('reach',1200);await csleep(500);A.click();
  await say('You lock it. Your back against the door.',2400);
  await camTo(13.1,17.9,Math.PI,0,900);
  await csleep(1400);
  /* the banging: slow, then frantic */
  const rattle=async(n,gap)=>{for(let i=0;i<n;i++){A.knock();if(dg2)dg2.rotation.y=(i%2?.02:-.02);await csleep(gap);if(dg2)dg2.rotation.y=0}};
  await rattle(3,700);await csleep(500);
  say('"Open the door!"',1100);await rattle(5,330);
  say('"BUKA! BUKA PINTU!"',1100);await rattle(7,200);
  say('"Can you hear me?! Wake up!"',1300);
  await tween(k=>{P.pitch=Math.sin(k*80)*.025;P.yaw=Math.PI+Math.sin(k*65)*.01},1300);
  for(let i=0;i<9;i++){A.knock();await csleep(150)}
  A.static(0);await csleep(2400);
  /* silence. then three gentle knocks. */
  await say('...',1600);
  await csleep(1800);
  for(let i=0;i<3;i++){A.tone(120,90,.16,.2,'sine');await csleep(1100)}
  await csleep(600);
  applyLights(.5);bulbSet(.7);G.haze.style.opacity=0;
  await say(sp('ATUK','...It\'s us.'),3200);
  await say('You let out a breath you did not know you were holding.',3200)}

G.day4=start}
