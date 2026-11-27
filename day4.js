/* DAY 4 — the truth. A wrecked, red shop; the full news; the collapse; the run home; the banging; three gentle knocks. */
export default function install(G){
const {THREE,scene,P,EYE,A,CINE,D,WPS,atuk,CROWD,HOME,FEET,shutter,
  $,sleep,say,sp,cineIn,cineOut,camTo,yawTo,csleep,tween,handAct,pose,objT,setClock,setTime,applyLights,bulbSet,flicker,tapOn,tapOff,lids,drawClock,
  showCrowd,drawBoard,day1Props,shutBlock,M,box,ctex}=G;

const card=async(h,sm,ms=2400)=>{const dc=$('dcard');dc.innerHTML=h+'<small>'+sm+'</small>';dc.style.opacity=1;await sleep(ms);dc.style.opacity=0};
const rnd=(a,b)=>a+Math.random()*(b-a);
const pace=(x,z,sp_=1.7)=>{const x0=P.x,z0=P.z,L=Math.hypot(x-x0,z-z0);if(L<.9)return Promise.resolve();let st=0;
  return tween(k=>{const e=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;P.x=x0+(x-x0)*e;P.z=z0+(z-z0)*e;st++;EYE.y=1.6+Math.sin(performance.now()/110)*.035*Math.min(1,Math.min(k,1-k)*8);if(st%16===0)A.step()},Math.max(700,L/sp_*1000)).then(()=>{EYE.y=1.6})};

/* ================= the wrecked, red shop (built once, kept in a group so Day 5 can hide it) ================= */
const RED=new THREE.Group();scene.add(RED);RED.visible=false;
let built=false,wrecked=[];
const setWreck=on=>{for(const w of wrecked){const [o,r,p,wr,wp]=w;if(on){o.rotation.copy(wr);o.position.copy(wp)}else{o.rotation.copy(r);o.position.copy(p)}}};
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
  wrecked=[];const rec=(o,f)=>{const r=o.rotation.clone(),p=o.position.clone();f(o);wrecked.push([o,r,p,o.rotation.clone(),o.position.clone()])};
  [0,2,5,6].forEach((i,k)=>{const st=G.stools[i];if(st)rec(st,o=>{o.rotation.z=1.45;o.rotation.y=k*1.3;o.position.y=.17})});
  rec(G.fan,o=>{o.rotation.z=.32;o.position.y=2.6});
  const tube=scene.children.find(m=>m.isMesh&&Math.abs(m.position.y-2.94)<.01&&Math.abs(m.position.z-1.4)<.01);
  if(tube)rec(tube,o=>{o.rotation.z=.5;o.position.y=2.55});
}
G.unwreck=()=>{RED.visible=false;setWreck(false)};

/* ================= fire sprites for the street ================= */
const FIRE=[];let FFR=null,FGL,FSM,FEM;
/* real-looking fire: flipbook flames drawn from tiny particles + glow, embers and smoke that follow each flame */
function flameFrame(seed){const W=96,H=170,c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');x.globalCompositeOperation='lighter';
  let sd=seed*9301+49297;const r=()=>{sd=(sd*9301+49297)%233280;return sd/233280};const sway=(r()-.5)*14;
  for(let i=0;i<240;i++){const u=Math.pow(r(),1.15),ph=r()*6,y=H-10-u*(H-26),wob=Math.sin(u*5.5+seed*1.7+ph*.2)*u*13+sway*u*u,spread=(1-u)*(1-u*.35)*20,px=W/2+wob+(r()+r()+r()-1.5)*spread*.9,rad=(1-u*.82)*13+2;
    const col=u<.18?[255,250,215]:u<.4?[255,214,110]:u<.65?[255,140,30]:[225,60,12],a=(1-u)*(1-u)*.5+.03,gr=x.createRadialGradient(px,y,0,px,y,rad);
    gr.addColorStop(0,`rgba(${col},${a})`);gr.addColorStop(1,`rgba(${col[0]},${Math.max(30,col[1]-70)},10,0)`);x.fillStyle=gr;x.beginPath();x.arc(px,y,rad,0,7);x.fill()}
  for(let k=0;k<3;k++){const bx=W/2+(r()-.5)*22,top=30+r()*40,gr=x.createLinearGradient(0,H-20,0,top);gr.addColorStop(0,'rgba(255,200,80,0)');gr.addColorStop(.3,'rgba(255,170,50,.35)');gr.addColorStop(1,'rgba(255,90,20,0)');x.fillStyle=gr;x.beginPath();x.moveTo(bx-8,H-22);x.quadraticCurveTo(bx+(r()-.5)*14,(H+top)/2,bx+(r()-.5)*6,top);x.quadraticCurveTo(bx+(r()-.5)*16,(H+top)/2,bx+8,H-22);x.fill()}
  const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;return t}
function radTex(n,stops){const c=document.createElement('canvas');c.width=c.height=n;const x=c.getContext('2d'),gr=x.createRadialGradient(n/2,n/2,0,n/2,n/2,n/2);stops.forEach(([o,col])=>gr.addColorStop(o,col));x.fillStyle=gr;x.fillRect(0,0,n,n);return new THREE.CanvasTexture(c)}
const fMat=(map,add,op)=>new THREE.SpriteMaterial({map,transparent:true,depthWrite:false,fog:false,opacity:op,blending:add?THREE.AdditiveBlending:THREE.NormalBlending});
function mkFire(){if(FIRE.length)return;
  FFR=[];for(let i=0;i<8;i++)FFR.push(flameFrame(i+3));
  FGL=radTex(64,[[0,'rgba(255,150,50,.55)'],[.5,'rgba(255,90,20,.18)'],[1,'rgba(255,60,10,0)']]);
  FSM=radTex(64,[[0,'rgba(30,26,24,.7)'],[1,'rgba(30,26,24,0)']]);
  FEM=radTex(16,[[0,'rgba(255,230,150,1)'],[1,'rgba(255,100,20,0)']]);
  for(let i=0;i<16;i++){const sp=new THREE.Sprite(fMat(FFR[0],true,1));sp.visible=false;const ph=Math.random()*6;
    const side=new THREE.Sprite(fMat(FFR[1],true,1)),gl=new THREE.Sprite(fMat(FGL,true,.85)),em=[],sm=[];
    for(let k=0;k<3;k++)em.push(new THREE.Sprite(fMat(FEM,true,1)));
    for(let k=0;k<(i%2?0:2);k++)sm.push(new THREE.Sprite(fMat(FSM,false,.4)));
    const comp=[side,gl,...em,...sm];comp.forEach(o=>{o.visible=false;scene.add(o)});
    sp.userData={ph,side,gl,em,sm,comp};scene.add(sp);FIRE.push(sp)}}
G.tick.push(()=>{if(!FFR)return;const t=performance.now()/1000;for(const f of FIRE){const u=f.userData;
  if(!f.visible){if(u.on){u.comp.forEach(o=>o.visible=false);u.on=false}continue}
  u.on=true;u.comp.forEach(o=>o.visible=true);const ph=u.ph,s=1+Math.sin(t*9+ph)*.1+Math.sin(t*21+ph)*.06,h=2.6*s*(1+Math.sin(t*5+ph)*.05),w=1.5*s;
  f.material.map=FFR[((t*11+ph*3)|0)%8];f.scale.set(w,h,1);
  const bx=f.position.x,by=f.position.y-h*.5,bz=f.position.z;
  u.side.material.map=FFR[((t*9+ph*5)|0)%8];u.side.scale.set(w*.6,h*.6,1);u.side.position.set(bx+.38+Math.sin(t*3+ph)*.05,by+h*.3,bz+.04);
  u.gl.material.opacity=.7+Math.sin(t*13+ph)*.12+Math.sin(t*29+ph*2)*.08;u.gl.scale.set(3.0,2.5,1);u.gl.position.set(bx,by+h*.5,bz+.1);
  u.em.forEach((e,k)=>{const q=((t*(.3+k*.18)+ph+k*.37)%1);e.position.set(bx+(k-1)*.35*(1+q)+Math.sin(t*3+ph*5+k)*.2*q,by+.6+q*2.6,bz+.1);e.material.opacity=1-q;const z=.08*(1-q*.6);e.scale.set(z,z,1)});
  u.sm.forEach((m,k)=>{const q=((t*.12+k*.5+ph*.1)%1);m.position.set(bx+Math.sin(t*.6+k*3)*.3*q+.1*q,by+h+.1+q*2.2,bz-.1);m.scale.set(1.2+q*2.2,1.2+q*2.2,1);m.material.opacity=Math.sin(q*Math.PI)*.4})}});

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
  window.__doorG.rotation.y=0;CINE.noclip=true;EYE.y=.62;P.x=14.5;P.z=17.0;P.yaw=0;P.pitch=1.1;P.tx=null;P.fy=null;lids(0,0);G.setBlur(true);
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
  G.state='d4_look';setClock('12:30 PM');objT('Look at the customers');G.busy=false;await cineOut()}

/* ---------- the silent turn: they only look at you ---------- */
const fade=a=>atukMats.forEach(m=>m.opacity=a);
const turnTo=(g,ms)=>{const r0=g.rotation.y,dx=P.x-g.position.x,dz=P.z-g.position.z;let d=Math.atan2(dx,dz)-Math.PI-r0;d=Math.atan2(Math.sin(d),Math.cos(d));return tween(k=>{const e=k*k*(3-2*k);g.rotation.y=r0+d*e},ms)};
const beatT=()=>{let on=true;(async()=>{while(on){A.tone(70,45,.14,.2,'sine');await sleep(260);A.tone(70,45,.12,.14,'sine');await sleep(900)}})();return()=>{on=false}};
WPS.d4_look={x:-.2,z:-.2,r:.75,go:1,fn:silent};
async function silent(){if(G.busy||CINE.on)return;G.busy=true;await cineIn();
  await pace(-.2,-.2,1.5);
  const stop=beatT();
  await camTo(-.2,-.2,yawTo(-3,-1.2),-.12,1100);
  await say('...What is this?',2600);
  for(const i of [1,0,3,2,4]){const c=CROWD[i];
    await camTo(-.2,-.2,yawTo(c.position.x,c.position.z),-.1,1000);
    turnTo(c,2000);await csleep(1500)}
  await camTo(-.2,-.2,yawTo(-2.6,-.7),-.1,900);
  fade(.5);await csleep(2200);stop();
  await newsScene()}

/* ================= the news, the collapse, the run, the door ================= */
const newsLine=(t,ms)=>say(sp('NEWS',t),ms);
const turnToYou=(ms=1500)=>{const all=[atuk];const st=all.map(g=>g.rotation.y);const tg=all.map((g,i)=>{const dx=P.x-g.position.x,dz=P.z-g.position.z;let d=Math.atan2(dx,dz)-Math.PI-st[i];d=Math.atan2(Math.sin(d),Math.cos(d));return d});
  return tween(k=>{all.forEach((g,i)=>{g.rotation.y=st[i]+tg[i]*k})},ms)};

/* ---- the CCTV footage the TV shows: a clean kopitiam, a normal morning, then the lorry ---- */
let cc=null,LOR=null,FAKE=null;
function ccBuild(){if(cc)return;
  cc=document.createElement('div');cc.id='cctv';
  cc.style.cssText='position:fixed;inset:0;z-index:40;pointer-events:none;opacity:0;transition:opacity .5s;background:repeating-linear-gradient(0deg,rgba(0,0,0,.2) 0 1px,transparent 1px 3px);box-shadow:inset 0 0 90px 40px rgba(0,0,0,.8);border:20px solid #0a0a0a;border-radius:44px;font:700 15px system-ui,sans-serif;color:#fff';
  cc.innerHTML='<div style="position:absolute;left:16px;top:10px"><span style="color:#e33">●</span> REC</div><div id="cctime" style="position:absolute;right:16px;top:10px"></div><div style="position:absolute;left:16px;bottom:58px;opacity:.8;font-size:12px">CAM 02  KEDAI KOPI ATUK</div><div style="position:absolute;left:12px;right:12px;bottom:10px;background:#a81414;padding:6px 12px;display:flex;gap:14px;align-items:center"><b style="font-size:18px">BERITA TERKINI</b><span style="color:#ffebc8;font-size:14px">LORI LANGGAR KEDAI KOPI</span></div><div id="ccflash" style="position:absolute;inset:0;background:#fff;opacity:0"></div><div id="ccsig" style="position:absolute;inset:0;display:none;align-items:center;justify-content:center;background:#050505;font-size:22px;letter-spacing:4px">SIGNAL LOST</div>';
  document.body.appendChild(cc)}
function fakeBuild(){if(FAKE)return;FAKE={};
  const T=THREE,pp=G.person;
  FAKE.crowd=[pp(-3,-1.0,0,0x3b5a7a,0x1a1a1a,0xc9a27e,{sit:1,sleeve:1,f:{smile:1}}),pp(-3,-2.6,Math.PI,0x7a3b3b,0xb9b2c8,0xd8b08a,{sit:1,tudung:1,sarong:0x5a2a2a,f:{wrinkle:1,sides:1,brow:'#777',lash:1,lips:1,mouth:'#9a4a4a'}}),pp(-3,.4,Math.PI,0x4a6a3b,0x111111,0x8a5836,{sit:1,shorts:1}),pp(-1.7,-.5,Math.PI,0x6a5a3b,0x111111,0xc9a27e,{sit:1,f:{wrinkle:1}}),pp(-1.7,1.1,0,0x5a3b6a,0x3a2a1a,0xc9a27e,{sit:1,hairUp:1,long:1,sarong:0x2f2a3d,f:{smile:1,sides:1,lash:1,lips:1,mouth:'#c0485a'}})];
  FAKE.atuk=pp(3.9,3.5,1.0,0xf1efe6,0xe6e6e6,0xb89572,{vest:1,bot:0x6b6f76,shoe:0x6a4a2a,f:{glasses:1,wrinkle:1,sides:1,brow:'#d8d8d8',mouth:'#6a3a2a'}});
  FAKE.me=pp(2.9,2.7,-2.4,0x2a4a3a,0x1a1a1a,0xc9a27e,{});
  FAKE.all=FAKE.crowd.concat([FAKE.atuk,FAKE.me]);FAKE.all.forEach(g=>g.visible=false);
  const L=new T.Group();scene.add(L);L.visible=false;
  const bx=(w,h,d,c,x,y,z,e)=>{const m=new T.Mesh(new T.BoxGeometry(w,h,d),new T.MeshLambertMaterial({color:c,emissive:e||0}));m.position.set(x,y,z);L.add(m);return m};
  bx(2.3,1.5,5.2,0xb8bcc0,0,2.0,2.6);bx(2.3,2.2,1.6,0xc23a2a,0,1.4,-.4);bx(2.0,.9,.1,0x1a2430,0,1.9,-1.2);bx(2.3,.3,2.3,0x333333,0,.45,0);bx(2.3,.4,.2,0xdddddd,0,.55,-1.28);
  bx(.4,.25,.1,0xfff2b0,-.8,.9,-1.28,0xffe890);bx(.4,.25,.1,0xfff2b0,.8,.9,-1.28,0xffe890);
  for(const x of[-1.2,1.2])for(const z of[-.4,2.6]){const w=new T.Mesh(new T.CylinderGeometry(.5,.5,.35,10),new T.MeshLambertMaterial({color:0x111111}));w.rotation.z=Math.PI/2;w.position.set(x,.5,z);L.add(w)}
  const hl=new T.SpotLight(0xfff0c0,6,25,.7,.5);hl.position.set(0,1,-1.2);hl.target.position.set(0,0,-10);L.add(hl);L.add(hl.target);
  const fl=new T.PointLight(0xff7a20,0,14);fl.position.set(0,2,3);scene.add(fl);FAKE.fl=fl;LOR=L;FAKE.L=L}
async function footage(){
  ccBuild();fakeBuild();mkFire();
  const cv=$('c'),fov0=G.camera.fov,P0={x:P.x,z:P.z,yaw:P.yaw,pitch:P.pitch},ey0=EYE.y,cl=$('cctime');
  /* hide the real, wrecked shop; show a clean one */
  CROWD.forEach(c=>c.visible=false);atuk.visible=false;RED.visible=false;G.goreVis&&G.goreVis(false);setWreck(false);
  G.haze.style.opacity=0;setTime('day');applyLights(1);bulbSet(1);
  FAKE.crowd.forEach((c,i)=>{c.visible=true;c.position.set(HOME[i][0],0,HOME[i][1]);c.rotation.set(0,HOME[i][2],0);pose(c,0,'sit')});
  const me=FAKE.me,ak=FAKE.atuk;me.visible=ak.visible=true;me.position.set(2.9,0,2.7);me.rotation.set(0,-2.4,0);ak.position.set(3.9,0,3.5);ak.rotation.set(0,1.0,0);pose(ak,0,'stand');pose(me,0,'stand');
  LOR.position.set(0,0,14);LOR.visible=true;FAKE.fl.intensity=0;
  const tm=(s)=>{cl.textContent='12:'+(40+((51+s)/60|0))+':'+String(Math.floor(51+s)%60).padStart(2,'0')};tm(0);
  cv.style.transition='none';cv.style.filter='grayscale(.78) contrast(1.15) brightness(1.1)';
  G.camera.fov=72;G.camera.updateProjectionMatrix();
  P.x=3.0;P.z=-3.5;EYE.y=2.75;P.yaw=Math.atan2(2.6,-7.2);P.pitch=-.2;CINE.noclip=true;
  cc.style.opacity=1;await csleep(600);
  /* 1: a normal morning, you are serving coffee */
  await tween(k=>{tm(k*8);const t=performance.now()/1000;const u=me.userData;u.aR&&(u.aR.up=1.1+Math.sin(t*3)*.35);FAKE.crowd.forEach((c,i)=>{const q=c.userData;q.aR&&(q.aR.up=.7+Math.max(0,Math.sin(t*1.2+i*1.7))*.6)})},3600);
  /* 2: headlights through the shutter */
  A.tone(55,70,2.4,.18,'sawtooth');
  await tween(k=>{tm(8+k*4);LOR.position.z=14-6.2*k*k},2400);
  A.tone(330,330,.7,.2,'square');await csleep(450);A.tone(330,330,.7,.2,'square');
  /* 3: it does not stop */
  const sh0=P.yaw;
  await tween(k=>{tm(12+k*.6);LOR.position.z=7.8-4.4*k},520);
  A.sting();A.rumble();FAKE.fl.intensity=4;
  FIRE.forEach((f,i)=>{if(i>9){f.visible=false;return}const q=[[-1.6,.3,4.4],[1.6,.3,4.4],[0,1,3.8],[-.9,.5,2.4],[1,.4,2.6],[-1.4,.4,3.3],[1.4,.5,3.2],[0,.6,3],[.5,1,2],[-.5,.8,2.2]][i];f.position.set(q[0],q[1]+.5,q[2]);f.visible=true});
  LOR.position.z=3.2;
  const dir=FAKE.crowd.map((c,i)=>[(Math.random()-.5)*1.4,-1.4-Math.random()*.6]);
  await tween(k=>{tm(12.6+k*1.6);P.yaw=sh0+Math.sin(k*90)*.03*(1-k);P.pitch=-.2+Math.sin(k*70)*.02*(1-k);
    FAKE.crowd.forEach((c,i)=>{const u=c.userData;u.aL&&(u.aL.up=2.6);u.aR&&(u.aR.up=2.6);c.position.y=Math.max(0,Math.sin(k*9+i)*.12*k);c.position.x+=dir[i][0]*.016;c.position.z+=dir[i][1]*.016;c.rotation.y+=.05});
    const u=ak.userData;u.aL&&(u.aL.up=2.6);u.aR&&(u.aR.up=2.6)},1800);
  /* 4: the explosion */
  A.rumble();A.tone(40,20,1.4,.45,'sine');A.nz(1.2,3000,200,.4,'lowpass',.8);
  LOR.position.z=1.2;FAKE.fl.intensity=10;FIRE.forEach((f,i)=>{if(i<9){const q=[[0,1.4,2.2],[-1.4,1.6,1.5],[1.4,1.6,1.5],[0,2.5,1.2],[-2,1,0],[2,1,0],[0,.8,-.4],[-1,2.4,.2],[1,2.4,.2]][i];f.position.set(q[0],q[1],q[2]);f.visible=true;f.scale.set(4,5,1)}});
  const fl=$('ccflash');fl.style.transition='opacity .08s';fl.style.opacity=1;await csleep(380);fl.style.transition='opacity .9s';fl.style.opacity=.6;await csleep(700);
  fl.style.transition='opacity .1s';fl.style.opacity=1;await csleep(250);
  $('ccsig').style.display='flex';A.static(.35);await csleep(1400);
  /* back to the room */
  A.static(0);cc.style.transition='opacity .1s';cc.style.opacity=0;$('ccsig').style.display='none';fl.style.opacity=0;
  cv.style.filter='';FAKE.all.forEach(g=>g.visible=false);LOR.visible=false;FAKE.fl.intensity=0;FIRE.forEach(f=>f.visible=false);
  G.camera.fov=fov0;G.camera.updateProjectionMatrix();
  P.x=P0.x;P.z=P0.z;P.yaw=P0.yaw;P.pitch=P0.pitch;EYE.y=ey0;
  CROWD.forEach(c=>c.visible=true);atuk.visible=true;RED.visible=true;G.goreVis&&G.goreVis(true);setWreck(true);setTime('dusk');applyLights(1);bulbSet(1);G.haze.style.opacity=1;
  cc.style.transition='opacity .5s'}

async function newsScene(){
  setClock('12:48 PM');
  await camTo(3.9,.5,yawTo(4.9,.5),.27,1400);
  G.tvSet('static');A.static(.25);await csleep(900);
  G.tvSet('crash');A.static(.05);await csleep(500);
  await newsLine('Breaking news. This morning, a lorry lost control and crashed into a kopitiam on Jalan Besar. This is CCTV from inside the shop.',4600);
  A.static(0);await footage();
  G.tvSet('static');A.static(.3);await csleep(900);G.tvSet('crash');A.static(.05);
  await newsLine('The lorry burst into flames. The driver survived and is in police custody.',3600);
  await newsLine('Six people died at the scene: the elderly owner and five customers.',3800);
  await csleep(600);
  await newsLine('One person survived. The owner\'s grandson was found unconscious and rushed to hospital. He has not woken up.',4600);
  G.tvSet('static');A.static(.3);await csleep(700);G.tvSet('off');A.static(0);
  await csleep(900);
  await say(sp('YOU','...That is me. That is all of us.'),2800);
  A.tone(60,40,1.2,.2,'sine');
  await camTo(3.9,.5,yawTo(2.5,2.5),0,1100);
  await turnToYou(1300);
  await say(sp('ATUK','Dengar ah, cucu.'),2000);
  await say(sp('ATUK','It is time. Do not be afraid.'),3000);

  /* the warning: he is coming. each time the lights flicker, he is closer */
  {const FIG=G.FIG;mkFire();
   const cry=()=>{A.tone(210,170,1.4,.09,'triangle');A.nz(.8,700,400,.05,'bandpass',2)};
   const look=(x,z,ms=500)=>camTo(P.x,P.z,yawTo(x,z),0,ms);
   await look(0,5,600);
   await flicker([.1,0,.2]);applyLights(.45);FIG.position.set(.2,0,13.5);FIG.rotation.y=Math.PI;FIG.visible=true;cry();
   await say('...maaf...',1800);
   await flicker([0,.3,0,.2]);applyLights(.35);FIG.position.set(.1,0,7.8);cry();await csleep(700);
   await flicker([0,0,.3,0]);applyLights(.3);FIG.position.set(-.4,0,-3.0);FIG.rotation.y=0;
   await look(-.4,-3.0,350);A.sting();
   await say(sp('ATUK','Dia datang! LARI, cucu! LARI!'),1800);
   await flicker([0,.2,0]);FIG.position.set(.4,0,-.4);FIG.rotation.y=Math.atan2(P.x-.4,P.z+.4)+Math.PI;await look(.4,-.4,300);cry();await csleep(500)}
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
  await shake(.03,1400);
  clearInterval(fl);dust.forEach(d=>scene.remove(d));
  hz(255,120,40,.18,.6);
  for(const c of CROWD){c.userData.f0&&0;const dx=P.x-c.position.x,dz=P.z-c.position.z;A.tone(300,120,.2,.08,'sawtooth');c.visible=false;await csleep(420)}
  await say(sp('ATUK','Balik rumah. Lock the door. Atuk... follow.'),2400);
  atuk.visible=false;A.tone(260,60,.7,.15,'sawtooth');await csleep(700);
  await say(sp('YOU','RUN.'),1200);
  /* hand the controls back: the chase */
  mkFire();FIRE.forEach((f,i)=>{if(i>5){f.visible=false;return}const t=(i>>1)*.3,x=.9+(5.6-.9)*t+(i%2?3.2:-3.2),z=6.6+(13-6.6)*t+(i%2?-1:1);f.position.set(x,1.5,z);f.visible=true});
  const dg=window.__doorG;if(dg)dg.rotation.y=-1.25;
  const FIG=G.FIG;FIG.position.set(.4,0,-.9);FIG.visible=true;
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

async function finish(){await cineIn();FIG0();await bedroom()}
function FIG0(){G.FIG.visible=false;FIRE.forEach(f=>f.visible=false);G.busy=true}
const smooth=[];let beepSoft=false;
async function beepQuiet(){beepSoft=true;while(beepSoft){A.tone(900,900,.14,.045,'sine');await sleep(1250)}}
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
  await say('A man outside, crying. "...maaf... tolong... buka pintu..."',3000);
  await rattle(3,700);await csleep(500);
  say('"Open the door!"',1100);await rattle(5,330);
  say('"BUKA! BUKA PINTU!"',1100);await rattle(7,200);
  say('"Can you hear me?! Wake up!"',1300);
  await tween(k=>{P.pitch=Math.sin(k*80)*.025;P.yaw=Math.PI+Math.sin(k*65)*.01},1300);
  for(let i=0;i<9;i++){A.knock();await csleep(150)}
  A.static(0);await csleep(2400);
  /* silence. you wait in the corner. you try to wake up. */
  await say('...',1600);
  await csleep(1400);
  await Promise.all([camTo(14.6,15.35,yawTo(13.1,19.4),.02,1600),tween(k=>{EYE.y=1.6-.85*k},1600)]);
  setClock('2:50 AM');
  await say('You sit in the corner. Hands over your ears. You do not sleep.',3200);
  await say(sp('YOU','Wake up. ...Wake up.'),2000);
  await lids(0,700);await csleep(1500);await lids(1,800);
  await say('The same corner. The same dark.',2400);
  await say(sp('YOU','Please. Wake up.'),1900);
  await lids(0,700);beepQuiet();await csleep(1800);
  await say(sp('NURSE','...squeeze my hand.'),2800);
  await lids(1,900);
  await say('Faint. Far away. A beep, and a voice that is not in this room.',3200);
  await csleep(900);
  /* the screams: they are not banging to hurt you */
  A.nz(.6,600,300,.12,'bandpass',1);G.SFX&&G.SFX.play('yell_far',{g:.45,lp:1800,wet:.6});
  await say(sp('ATUK','Cucu! Tolong! TOLONG!'),2200);
  await say(sp('MEI LING','Panas! Please! Somebody!'),2200);
  await say(sp('RAJ','We cannot get out!'),2000);
  await say(sp('YOU','That is not the man at the door. That is Atuk.'),3000);
  await say(sp('YOU','They are still in there. They are still in the fire.'),2800);
  await Promise.all([tween(k=>{EYE.y=.75+.85*k},1000),camTo(13.1,17.7,Math.PI,0,1100)]);
  A.click();handAct('reach',1100);await csleep(500);A.click();
  if(dg2){await tween(k=>{dg2.rotation.y=1.45*k},800);A.tone(110,80,.3,.15,'sine')}
  beepSoft=false;
  /* out into the dark: you walk, nobody chases you now */
  applyLights(.1);G.haze.style.background='radial-gradient(ellipse at 50% 55%,rgba(255,110,40,.1) 0%,rgba(110,18,10,.6) 100%)';
  mkFire();[[-1.4,1.4,4.6,0],[1.5,1.2,4.7,1],[0,2.4,4.3,2]].forEach(([x,y,z,i])=>{const f=FIRE[i];f.position.set(x,y,z);f.visible=true});
  const dgo=window.__doorG;if(dgo)dgo.rotation.y=-1.25;
  CINE.noclip=false;EYE.y=1.6;RB=0;G.spd=1;setClock('3:10 AM');
  G.state='d4_back';objT('Go to the kopitiam');G.busy=false;await cineOut()}

/* ---------- the walk back through the dark, and the search ---------- */
let RB=0,fx=0;
const ROUTE2=[[13.1,20.8],[6.5,20.8],[6.1,17.4],[6.1,15.4],[5.6,13.0],[.9,6.8],[.6,4.4]];
WPS.d4_back={get x(){return ROUTE2[Math.min(RB,ROUTE2.length-1)][0]},get z(){return ROUTE2[Math.min(RB,ROUTE2.length-1)][1]},r:.95,get fn(){return backStep}};
function backStep(){RB++;if(RB===5){say(sp('ATUK','...Cucu... tolong...'),1800)}
  if(RB>=ROUTE2.length){G.state='d4_find';ci2=0;setClock('3:40 AM');startFind()}}
const items={};let SM=null;
function mkSmoke(){if(SM)return;const c=document.createElement('canvas');c.width=c.height=64;const g=c.getContext('2d'),gr=g.createRadialGradient(32,32,2,32,32,30);gr.addColorStop(0,'rgba(44,38,35,.7)');gr.addColorStop(1,'rgba(44,38,35,0)');g.fillStyle=gr;g.fillRect(0,0,64,64);
  const tx=new THREE.CanvasTexture(c);SM=[];for(let i=0;i<14;i++){const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:tx,transparent:true,depthWrite:false,fog:false}));sp.position.set(-4+Math.random()*8,2.1+Math.random()*.9,-3+Math.random()*6.5);sp.scale.set(3.6,3.2,1);sp.visible=false;scene.add(sp);SM.push(sp)}}
const fadeP=(c,a)=>{if(!c.userData.fm){c.userData.fm=[];c.traverse(o=>{if(o.isMesh&&o.material){o.material=o.material.clone();o.material.transparent=true;c.userData.fm.push(o.material)}})}c.userData.fm.forEach(m=>m.opacity=a)};
const SPOT=[[3.7,.9,-3.4],[-3.2,.8,-2.4],[-1.4,.7,3.4]];   /* only three flames: kitchen door, back corner, shutter edge. the rest is smoke and glow */
let FL2=null,fogD0=null;
G.tick.push(()=>{if(!FL2)return;const on=G.state==='d4_find'||G.state==='d4_atuk',t=performance.now()/1000;
  FL2.forEach((l,i)=>{l.intensity=on?6+Math.sin(t*11+i*2)*1.6+Math.sin(t*27+i)*1:0})});
async function startFind(){G.busy=true;await cineIn();
  mkSmoke();SM.forEach(s=>s.visible=true);
  FIRE.forEach(f=>f.visible=false);SPOT.forEach((p,i)=>{const f=FIRE[i];f.position.set(p[0],p[1]+.6,p[2]);f.visible=true});
  if(!FL2){FL2=[SPOT[0],SPOT[1]].map(p=>{const l=new THREE.PointLight(0xff7a2a,0,9,1.6);l.position.set(p[0],p[1]+.8,p[2]+.6);scene.add(l);return l})}
  if(fogD0===null)fogD0=scene.fog.density;
  G.haze.style.background='radial-gradient(ellipse at 50% 58%,rgba(255,120,50,.08) 0%,rgba(46,22,14,.74) 100%)';
  applyLights(.2);scene.fog.density=fogD0*1.9;
  FIND.forEach(k=>{const c=CROWD[k.c];c.visible=true;c.position.set(k.pos[0],0,k.pos[1]);c.rotation.y=k.pos[2];pose(c,0,k.pos[3]);fadeP(c,.7)});
  tapOn();
  cueI=setInterval(cue,1300);
  atuk.visible=true;atuk.position.set(3.9,0,3.5);atuk.rotation.y=1.0;fadeP(atuk,.7);
  fx=setInterval(()=>A.nz(.14,2800+Math.random()*1500,1800,.06,'highpass'),380);
  await camTo(.6,2.9,yawTo(-2,-.5),-.05,1200);
  await say('Smoke. Small fires. Nobody is sitting where they were.',3000);
  await say(sp('YOU','Where are you...? Where did you go?'),2400);
  ci2=0;objT(FIND[0].obj);await csleep(300);G.busy=false;await cineOut()}
let ci2=0,cueI=0;
const cue=()=>{const k=FIND[Math.min(ci2,FIND.length-1)],c=CROWD[k.c];if(G.state!=='d4_find'||!c.visible)return;const d=Math.hypot(P.x-c.position.x,P.z-c.position.z),v=Math.max(0,1-d/16);if(v<.03)return;const q=.2*v+.03;
  if(k.cue==='tick'){A.tone(2200,1800,.03,q,'square');setTimeout(()=>A.tone(2200,1800,.03,q,'square'),500)}
  else if(k.cue==='cry'){A.tone(380,300,.9,q*.8,'triangle')}
  else if(k.cue==='call'){A.tone(260,220,.7,q*.9,'sawtooth')}
  else if(k.cue==='page'){A.nz(.35,3000,2400,q*.8,'highpass')}
  else if(k.cue==='tap'){A.nz(.6,5000,3000,q,'highpass')}};
const FIND=[
 {obj:'Someone is reading in the smoke',cue:'page',m:[-.95,-.5],c:3,pos:[-1.7,-.5,Math.PI,'sit'],pit:-.3,it:'page7',name:'PAK HASSAN',lines:['"Page seven. I finally turned it."','"Take it. Read the next one for me."']},
 {obj:'A watch is ticking in the corner',cue:'tick',m:[-4.0,-2.3],c:0,pos:[-4.25,-3.3,0,'stand'],pit:-.3,it:'watch',name:'AH SENG',lines:['"Cold... always so cold. Teh-C peng."','"My watch. Keep it. It was always tired."']},
 {obj:'Someone is crying at the entrance',cue:'cry',m:[.4,2.45],c:4,pos:[.4,3.55,Math.PI,'stand'],pit:-.15,it:'card',name:'MEI LING',lines:['"I must go home. Tell my daughter... happy birthday."','"Next week. I know it was never next week."']},
 {obj:'Someone is calling from the kitchen',cue:'call',m:[3.4,-5.35],c:1,pos:[3.2,-6.2,0,'stand'],pit:-.3,it:'glass',name:'MAK CIK',lines:['"Panas... so hot. You came, cucu."','"It is not so hot now."']},
 {obj:'The tap is running in the toilet',cue:'tap',m:[-7.7,2.45],c:2,pos:[-8.7,3.2,Math.PI/2,'stand'],pit:-.25,it:'shoe',name:'RAJ',lines:['"I stopped looking for my shoe."','"Keep this one. I will not need it."']}];
G.d4items=[];G.d4meshes=[];
WPS.d4_find={get x(){return FIND[Math.min(ci2,FIND.length-1)].m[0]},get z(){return FIND[Math.min(ci2,FIND.length-1)].m[1]},r:.65,go:1,get fn(){return findRun}};
function itemMesh(k,p){const T=THREE;let m;
  if(k==='watch'){m=new T.Mesh(new T.CylinderGeometry(.05,.05,.015,12),new T.MeshBasicMaterial({color:0xd8d8d0}))}
  else if(k==='glass'){m=new T.Mesh(new T.CylinderGeometry(.045,.035,.11,10),new T.MeshBasicMaterial({color:0xe6c8a0}))}
  else if(k==='page7'){m=new T.Mesh(new T.BoxGeometry(.2,.006,.28),new T.MeshBasicMaterial({color:0xe8e4d0}))}
  else if(k==='shoe'){m=new T.Mesh(new T.BoxGeometry(.11,.07,.26),new T.MeshBasicMaterial({color:0x6a4a2a}))}
  else{m=new T.Mesh(new T.BoxGeometry(.2,.008,.14),new T.MeshBasicMaterial({color:0xf2d6e0}))}
  m.position.set(p[0]+.3,p[1]+.05,p[2]+.1);m.rotation.y=Math.random()*3;scene.add(m);return m}
async function findRun(){if(G.busy||CINE.on)return;G.busy=true;const k=FIND[ci2],c=CROWD[k.c];A.click();await cineIn();
  await camTo(k.m[0],k.m[1],yawTo(c.position.x,c.position.z),-.02,900);
  await turnTo(c,1500);
  await camTo(k.m[0],k.m[1],yawTo(c.position.x,c.position.z),k.pit,600);
  const u=c.userData;u.aR&&(u.aR.up=1.6);A.tone(300,200,.4,.06,'sine');
  await say(sp(k.name,k.lines[0]),3000);
  await say(sp('YOU','I am here. I am here.'),1800);
  await say(sp(k.name,k.lines[1]),3200);
  await say('You touch their hand. It is warm, and then it is not there.',3000);
  const o=itemMesh(k.it,[c.position.x,0,c.position.z]);G.d4items.push(k.it);G.d4meshes.push(o);
  await tween(k=>{fadeP(c,.7*(1-k))},2400);c.visible=false;A.tone(500,200,.9,.08,'sine');
  await csleep(600);await say('They left something behind.',2200);
  await camTo(k.m[0],k.m[1],yawTo(c.position.x,c.position.z),-.02,500);
  ci2++;setClock(['3:52 AM','4:03 AM','4:15 AM','4:26 AM','4:41 AM'][ci2-1]);
  if(ci2>=FIND.length){G.state='d4_atuk';objT('Find Atuk')}else objT(FIND[ci2].obj);
  G.busy=false;await cineOut()}
WPS.d4_atuk={x:2.8,z:3.05,r:.7,go:1,fn:atukEnd};
async function atukEnd(){if(G.busy||CINE.on)return;G.busy=true;await cineIn();
  await pace(2.9,3.0,1.4);await camTo(P.x,P.z,yawTo(atuk.position.x,atuk.position.z),.02,900);
  await say(sp('ATUK','Cukup, cucu. Enough.'),2400);
  await say(sp('YOU','Atuk... I cannot wake up.'),2400);
  await say(sp('ATUK','Not yet.'),2000);
  await say(sp('YOU','What am I missing?'),2000);
  await csleep(900);
  await say(sp('ATUK','Still one more. Tomorrow. Open the shutter, make kopi.'),3600);
  await say(sp('ATUK','Atuk will be here.'),2400);
  await tween(k=>{fadeP(atuk,.7*(1-k*.8))},2600);
  /* the fires sink, the shop goes quiet, just the beep */
  clearInterval(fx);clearInterval(cueI);tapOff();await tween(k=>{FIRE.forEach(f=>f.scale.set(1.9*(1-k*.5),3*(1-k*.5),1))},1400);
  $('fade').style.transition='opacity 2.4s';$('fade').style.opacity=1;await sleep(2800);
  FIRE.forEach(f=>f.visible=false);SM&&SM.forEach(s=>s.visible=false);if(fogD0!==null)scene.fog.density=fogD0;
  beepQuiet();await sleep(3200);beepSoft=false;
  CINE.noclip=false;EYE.y=1.6;await cineOut();
  if(G.day5){G.busy=false;G.state='d5_intro';G.day5();return}
  $('endh').textContent='END OF DAY 4';$('endp').textContent='"Still one more. Tomorrow."';$('endl').textContent='Last Order · Day 5 is coming';
  $('end').style.display='flex';G.busy=false;G.state='end'}

G.day4=start}
