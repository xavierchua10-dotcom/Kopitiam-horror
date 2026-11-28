/* DAY 5 — the last orders. A calm shop, five goodbyes, Atuk, the driver's knock, and waking up. */
export default function install(G){
const {THREE,scene,P,EYE,A,CINE,D,WPS,atuk,CROWD,HOME,FEET,shutter,
  $,sleep,say,sp,cineIn,cineOut,camTo,yawTo,csleep,tween,handAct,pose,objT,setClock,setTime,applyLights,bulbSet,tapOff,lids,
  drawBoard,day1Props,shutBlock,M}=G;

const card=async(h,sm,ms=2400)=>{const dc=$('dcard');dc.innerHTML=h+'<small>'+sm+'</small>';dc.style.opacity=1;await sleep(ms);dc.style.opacity=0};
const pace=(x,z,sp_=1.7)=>{const x0=P.x,z0=P.z,L=Math.hypot(x-x0,z-z0);if(L<.9)return Promise.resolve();let st=0;
  return tween(k=>{const e=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;P.x=x0+(x-x0)*e;P.z=z0+(z-z0)*e;st++;EYE.y=1.6+Math.sin(performance.now()/110)*.035*Math.min(1,Math.min(k,1-k)*8);if(st%16===0)A.step()},Math.max(700,L/sp_*1000)).then(()=>{EYE.y=1.6})};
const fadeP=(c,a)=>{if(!c.userData.fm){c.userData.fm=[];c.traverse(o=>{if(o.isMesh&&o.material){o.material=o.material.clone();o.material.transparent=true;c.userData.fm.push(o.material)}})}c.userData.fm.forEach(m=>m.opacity=a)};
const turnTo=(g,ms)=>{const r0=g.rotation.y,dx=P.x-g.position.x,dz=P.z-g.position.z;let d=Math.atan2(dx,dz)-Math.PI-r0;d=Math.atan2(Math.sin(d),Math.cos(d));return tween(k=>{const e=k*k*(3-2*k);g.rotation.y=r0+d*e},ms)};

/* ---- a clean cast: no blood, no fading, just people ---- */
let CL=null,CA=null,cups=[];
function cast(){if(CL)return;const pp=G.person;
  CL=[pp(-3,-1.0,0,0x3b5a7a,0x1a1a1a,0xc9a27e,{sit:1,sleeve:1,f:{smile:1}}),pp(-3,-2.6,Math.PI,0x7a3b3b,0xb9b2c8,0xd8b08a,{sit:1,tudung:1,sarong:0x5a2a2a,f:{wrinkle:1,sides:1,brow:'#777',lash:1,lips:1,mouth:'#9a4a4a'}}),pp(-3,.4,Math.PI,0x4a6a3b,0x111111,0x8a5836,{sit:1,shorts:1,f:{smile:1}}),pp(-1.7,-.5,Math.PI,0x6a5a3b,0x111111,0xc9a27e,{sit:1,f:{wrinkle:1}}),pp(-1.7,1.1,0,0x5a3b6a,0x3a2a1a,0xc9a27e,{sit:1,hairUp:1,long:1,sarong:0x2f2a3d,f:{smile:1,sides:1,lash:1,lips:1,mouth:'#c0485a'}})];
  CA=pp(3.9,3.5,1.0,0xf1efe6,0xe6e6e6,0xb89572,{vest:1,bot:0x6b6f76,shoe:0x6a4a2a,f:{glasses:1,wrinkle:1,sides:1,brow:'#d8d8d8',mouth:'#6a3a2a'}});
  CL.forEach((c,i)=>{c.position.set(HOME[i][0],0,HOME[i][1]);c.rotation.y=HOME[i][2];pose(c,0,'sit');c.visible=true});pose(CA,0,'stand');CA.visible=true}

/* ---------- opening: no beep, no smoke ---------- */
async function start(){
  G.busy=true;G.state='d5_intro';
  G.unwreck&&G.unwreck();G.goreVis&&G.goreVis(false);G.haze.style.opacity=0;G.haze.style.background='';
  G.FIG.visible=false;(G.d4meshes||[]).forEach(m=>m.visible=false);
  setTime('day');G.setLights(true);applyLights(1);bulbSet(1);tapOff();setClock('6:30 AM');
  shutter.position.y=3.6;shutBlock(false);drawBoard(5);day1Props(true);G.tvSet('off');
  CROWD.forEach(c=>c.visible=false);atuk.visible=false;FEET.visible=false;D.crowd=true;cast();
  window.__doorG.rotation.y=0;CINE.noclip=true;EYE.y=.62;P.x=14.5;P.z=17.0;P.yaw=0;P.pitch=1.1;P.tx=null;P.fy=null;lids(0,0);
  $('fade').style.transition='opacity 1s';$('fade').style.opacity=1;
  await card('DAY 5','Last Order',2600);
  await cineIn();
  $('fade').style.transition='opacity 1.8s';$('fade').style.opacity=0;await sleep(2000);
  await lids(.3,900);await lids(1,1400);
  await camTo(14.5,17.0,0,-.02,1000);
  await say('No beep. No smoke. Just morning.',2800);
  await say(sp('YOU','...It is so quiet. It is warm.'),2600);
  await Promise.all([tween(k=>{EYE.y=.62+(1.6-.62)*k},1200),camTo(13.1,18.2,Math.PI,0,1200)]);
  EYE.y=1.6;CINE.noclip=false;await cineOut();
  G.state='d5_go';objT('Go to the kopitiam');G.busy=false}

/* ---------- the shop: calm ---------- */
WPS.d5_go={x:2.8,z:3.05,r:.6,go:1,fn:greet};
let ci=0;
async function greet(){if(G.busy||CINE.on)return;G.busy=true;await cineIn();
  await pace(2.95,3.05);
  await camTo(P.x,P.z,yawTo(-2.5,-.5),-.02,1100);
  await say('The shop is clean. Sunlight on the floor. Everyone is here.',3200);
  await camTo(P.x,P.z,yawTo(CA.position.x,CA.position.z),.02,1000);
  await say(sp('ATUK','Ah, cucu. Good morning. Shutter open already, you see?'),3000);
  await say(sp('YOU','Atuk... you are here.'),2000);
  await say(sp('ATUK','Where else would Atuk be?'),2200);
  await say(sp('ATUK','Today is the last order, cucu. Make each one properly.'),3200);
  await camTo(P.x,P.z,0,0,700);
  ci=0;G.state='d5_serve';setClock('7:15 AM');objT(LAST[0].obj);G.busy=false;await cineOut()}

/* ---------- five last orders ---------- */
const CUP={tehc:[0xe6c8a0,.13],tarik:[0xd9b88a,.1],kopio:[0x2a1a10,.09],kopi:[0x2a1a10,.09],milo:[0x6a4a30,.13]};
const LAST=[
 {obj:'Take Ah Seng\'s order',m:[-2.15,-.85],c:0,pit:-.4,clk:'7:40 AM',cup:'tehc',cp:[-3.12,-1.5],it:'watch',nm:'AH SENG',
  L:[['AH SENG','"Teh-C peng, please. Last one, ya?"'],['YOU','Last one, Ah Seng.'],['AH SENG','"Cold. Just how I like it. ...You know, 5:48 never bothered me. Time was only tired."'],['YOU','Thank you for every morning.'],['AH SENG','"Eh, do not cry. Go and wake up, boy."']]},
 {obj:'Take Mak Cik\'s order',m:[-2.2,-2.6],c:1,pit:-.4,clk:'8:30 AM',cup:'tarik',cp:[-2.85,-2.1],it:'glass',nm:'MAK CIK',
  L:[['MAK CIK','"Teh tarik, adik. Panas-panas."'],['YOU','Not too hot this time, Mak Cik.'],['MAK CIK','"Your Atuk pulled it higher than anyone. Do not forget how."'],['YOU','I will not.'],['MAK CIK','"Good boy. My arm does not hurt anymore."']]},
 {obj:'Take Raj\'s order',m:[-2.15,.45],c:2,pit:-.4,clk:'9:20 AM',cup:'kopio',cp:[-3.0,.95],it:'shoe',nm:'RAJ',
  L:[['RAJ','"Kopi-O kurang manis. Same as always."'],['YOU','Same as always.'],['RAJ','"I only came for a coffee before work. I am glad it was yours."'],['YOU','Do you have your shoe?'],['RAJ','"Both. I am going home now."']]},
 {obj:'Take Pak Hassan\'s order',m:[-.95,-.5],c:3,pit:-.3,clk:'10:10 AM',cup:'kopi',cp:[-1.7,-.05],it:'page7',nm:'PAK HASSAN',
  L:[['PAK HASSAN','"Kopi, roti bakar. Kurang butter."'],['YOU','Page seven?'],['PAK HASSAN','"I turned it, finally. Nothing on it. Funny, all these years."'],['YOU','What is on the next one?'],['PAK HASSAN','"Tomorrow, I think. Go and read it for me."']]},
 {obj:'Take Mei Ling\'s order',m:[-.9,1.15],c:4,pit:-.3,clk:'11:00 AM',cup:'milo',cp:[-1.7,.65],it:'card',nm:'MEI LING',
  L:[['MEI LING','"Milo dinosaur. For my daughter."'],['YOU','Is it her birthday?'],['MEI LING','"Next week. ...It was always next week."'],['YOU','I am sorry, Mei Ling.'],['MEI LING','"Do not be. Tell her mama made it on time."']]}];
WPS.d5_serve={get x(){return LAST[Math.min(ci,LAST.length-1)].m[0]},get z(){return LAST[Math.min(ci,LAST.length-1)].m[1]},r:.65,go:1,get fn(){return serveRun}};
const ITM={watch:[0xe8e8e0,[.05,.015,.05]],glass:[0xe6c8a0,[.05,.1,.05]],shoe:[0x6a4a2a,[.11,.07,.26]],page7:[0xe8e4d0,[.2,.006,.28]],card:[0xf2d6e0,[.2,.008,.14]]};
function cupMesh(k,p){const [col,h]=CUP[k.cup],T=THREE;const m=new T.Mesh(new T.CylinderGeometry(.06,.05,h,10),new T.MeshLambertMaterial({color:col}));m.position.set(p[0],.78+h/2,p[1]);scene.add(m);cups.push(m);
  const [ic,sz]=ITM[k.it];const g=k.it==='watch'||k.it==='glass'?new T.CylinderGeometry(sz[0],sz[0],sz[1],10):new T.BoxGeometry(...sz);
  const it=new T.Mesh(g,new T.MeshBasicMaterial({color:ic}));it.position.set(p[0]+.22,.8+sz[1]/2,p[1]+.05);it.rotation.y=.5;scene.add(it);cups.push(it)}
async function serveRun(){if(G.busy||CINE.on)return;G.busy=true;const k=LAST[ci],c=CL[k.c];A.click();await cineIn();
  await camTo(k.m[0],k.m[1],yawTo(c.position.x,c.position.z),-.02,900);
  await camTo(k.m[0],k.m[1],yawTo(c.position.x,c.position.z),k.pit,500);
  const L=k.L,say2=(i)=>say(sp(L[i][0],L[i][1]),i===2||i===4?3400:2300);
  await say2(0);await say2(1);
  /* make it */
  await camTo(2.9,3.0,yawTo(3.9,3.5),-.12,1100);
  handAct('reach',1500);A.nz(.5,2500,1500,.08,'highpass');A.click();await csleep(1500);
  await pace(k.m[0],k.m[1],1.9);await camTo(k.m[0],k.m[1],yawTo(c.position.x,c.position.z),k.pit,600);
  cupMesh(k,k.cp);A.tone(500,520,.15,.06,'sine');
  await say('You set it down. Their eyes go soft.',2400);
  await say2(2);await say2(3);await say2(4);
  await tween(t=>{fadeP(c,1-t)},2600);c.visible=false;A.tone(660,330,1.2,.08,'sine');
  await csleep(900);
  ci++;setClock(k.clk);
  if(ci>=LAST.length){G.state='d5_door';setTime('dusk');applyLights(.7);setClock('5:40 PM');
    /* the shop empties. the shutter comes down by itself, and someone knocks. Atuk is already standing by it. */
    CA.position.set(1.5,0,3.1);CA.rotation.y=Math.PI;
    await csleep(900);(A.shutter||A.scrape)();await tween(k=>{shutter.position.y=3.6-2.4*k},1800);shutBlock(true);
    await csleep(1000);for(let i=0;i<3;i++){A.knock();await csleep(1200)}
    objT('Answer the knock')}else objT(LAST[ci].obj);
  G.busy=false;await cineOut()}

/* ---------- Atuk, then the last knock ---------- */
WPS.d5_door={x:.3,z:2.4,r:.8,go:1,fn:atukLast};
async function atukLast(){if(G.busy||CINE.on)return;G.busy=true;await cineIn();
  await camTo(P.x,P.z,yawTo(CA.position.x,CA.position.z),.02,800);
  await say(sp('YOU','Atuk... who is it?'),2000);
  await say(sp('ATUK','He has been standing outside since morning. He knocks so softly. He is afraid.'),3600);
  await say(sp('ATUK','Let him in, cucu. It is okay.'),2800);
  await camTo(P.x,P.z,yawTo(0,4),0,700);
  await tween(k=>{shutter.position.y=1.2+2.4*k},1900);(A.shutter||A.scrape)();shutBlock(false);
  const F=G.FIG;F.position.set(.1,0,5.4);F.rotation.y=Math.PI;F.visible=true;
  await say('Dusk. A man stands in the doorway with his head down.',3000);
  await tween(k=>{F.position.z=5.4-1.7*k},2400);
  await camTo(P.x,P.z,yawTo(F.position.x,F.position.z),0,500);
  await say(sp('DRIVER','...Maaf. Maaf. I did not see them.'),3200);
  await say(sp('DRIVER','I closed my eyes for one second. Only one.'),3200);
  await csleep(800);
  await say(sp('YOU','I know.'),2000);
  await say(sp('YOU','...I forgive you.'),3000);
  A.tone(396,440,1.6,.1,'sine');G.SFX&&G.SFX.play('bell_low',{g:.6,wet:.5});
  await tween(k=>{fadeP(F,1-k)},3000);F.visible=false;
  await say(sp('DRIVER','Terima kasih.'),2400);
  /* Atuk's goodbye */
  await camTo(P.x,P.z,yawTo(CA.position.x,CA.position.z),.02,1100);
  await say(sp('ATUK','That was the last one.'),2400);
  await say(sp('ATUK','That evening, Atuk never finish what Atuk want to say.'),3200);
  await say(sp('ATUK','Whatever happen, cucu... do not be angry.'),3200);
  await say(sp('ATUK','You did well, cucu. Atuk is proud.'),2800);
  await say(sp('YOU','Atuk... I do not want to go.'),2600);
  await say(sp('ATUK','I know, cucu. But your mama is waiting. Somebody is holding your hand.'),3600);
  await say(sp('ATUK','Squeeze it. Atuk will be fine.'),3000);
  await tween(k=>{fadeP(CA,1-k)},3200);CA.visible=false;
  /* white */
  A.tone(900,900,.14,.1,'sine');
  const w=document.createElement('div');w.id='hosp';w.style.cssText='position:fixed;inset:0;z-index:60;background:#f4f7f9;opacity:0;transition:opacity 3s;pointer-events:none';
  w.innerHTML='<svg viewBox="0 0 844 390" preserveAspectRatio="xMidYMid slice" style="width:100%;height:100%"><rect x="60" y="60" width="240" height="140" rx="14" fill="#0e1614" stroke="#3c4246" stroke-width="6"/><polyline id="ecg" fill="none" stroke="#5aff96" stroke-width="3" points="76,130 140,130 146,92 150,156 156,120 220,130 284,130"/><text x="78" y="86" fill="#5aff96" font-family="monospace" font-size="16" font-weight="bold">HR 72</text><rect x="0" y="300" width="844" height="90" fill="#d6e0e6"/><rect x="340" y="262" width="280" height="68" rx="30" fill="#eceff4"/><rect x="430" y="225" width="130" height="63" rx="26" fill="#deb896"/><rect x="552" y="232" width="48" height="12" rx="6" fill="#deb896"/><rect x="554" y="246" width="48" height="12" rx="6" fill="#deb896"/><rect x="556" y="260" width="48" height="12" rx="6" fill="#deb896"/></svg>';
  document.body.appendChild(w);requestAnimationFrame(()=>w.style.opacity=1);
  let on=true;(async()=>{while(on){A.tone(900,900,.14,.1,'sine');await sleep(1100)}})();
  await sleep(3400);
  await say(sp('NURSE','Can you hear me?'),2600);
  await say(sp('NURSE','If you can hear me... squeeze my hand.'),3400);
  await csleep(1500);A.click();
  on=false;(async()=>{for(let i=0;i<6;i++){A.tone(900,900,.1,.12,'sine');await sleep(520)}})();
  await sleep(1200);
  await say(sp('NURSE','He squeezed! Somebody, call the doctor!'),3200);
  await sleep(1800);
  $('fade').style.transition='opacity 2.5s';$('fade').style.opacity=1;await sleep(2800);
  w.remove();CINE.noclip=false;EYE.y=1.6;await cineOut();
  $('endh').textContent='LAST ORDER';$('endp').textContent='Some goodbyes come too soon.';$('endl').textContent='If you are carrying one, talk to someone you trust.';
  $('end').style.display='flex';G.busy=false;G.state='end'}

G.day5=start}
