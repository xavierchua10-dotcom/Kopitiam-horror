/* DAY 5 — the last orders. A calm shop, five goodbyes, Atuk, the driver's knock, and waking up. */
export default function install(G){
const {THREE,scene,P,EYE,A,CINE,D,WPS,atuk,CROWD,HOME,FEET,shutter,
  $,sleep,say,sp,cineIn,cineOut,camTo,yawTo,csleep,tween,handAct,pose,objT,setClock,setTime,applyLights,bulbSet,tapOff,lids,
  drawBoard,day1Props,shutBlock,M}=G;
const yawFrom=G.yawFrom;

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
  G.busy=true;G.state='d5_intro';objT('');
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
  await camTo(2.9,3.0,yawFrom(2.9,3.0,3.9,3.5),-.12,1100);
  handAct('reach',1500);A.nz(.5,2500,1500,.08,'highpass');A.click();await csleep(1500);
  await pace(k.m[0],k.m[1],1.9);await camTo(k.m[0],k.m[1],yawTo(c.position.x,c.position.z),k.pit,600);
  cupMesh(k,k.cp);A.tone(500,520,.15,.06,'sine');
  await say('You set it down. Their eyes go soft.',2400);
  await say2(2);await say2(3);await say2(4);
  await tween(t=>{fadeP(c,1-t)},2600);c.visible=false;A.tone(660,330,1.2,.08,'sine');
  await csleep(900);
  ci++;setClock(k.clk);
  if(ci>=LAST.length){G.state='d5_door';setTime('dusk');applyLights(.7);setClock('5:40 PM');objT('Answer the knock');
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
  await say(sp('YOU>DRIVER','I know.'),2000);
  await say(sp('YOU>DRIVER','...I forgive you.'),3000);
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
  await sleep(1200);
  await hospital(w);
  $('endh').textContent='LAST ORDER';$('endp').textContent='Some goodbyes come too soon.';$('endl').textContent='If you are carrying one, talk to someone you trust.';
  $('end').style.display='flex';G.busy=false;G.state='end'}


/* ---------- the hospital: you wake up, your parents are there, the news is on ---------- */
let HX=40,HOSP=null,HTV=null;
function buildHospital(){if(HOSP)return;const T=THREE,S=scene,X=HX;HOSP={};
  const L=(c,o={})=>new T.MeshLambertMaterial(Object.assign({color:c},o));
  const bx=(w,h,d,m,x,y,z)=>{const q=new T.Mesh(new T.BoxGeometry(w,h,d),m);q.position.set(X+x,y,z);S.add(q);return q};
  const mk=(W,H,draw)=>{const c=document.createElement('canvas');c.width=W;c.height=H;draw(c.getContext('2d'),W,H);const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;return t};
  bx(6,.05,7,L(0xc9d2cf),0,0,0);bx(6,.05,7,L(0xe8ecea),0,3,0);
  bx(6,3,.1,L(0xdfe6e2),0,1.5,-3.5);bx(.1,3,7,L(0xdfe6e2),-3,1.5,0);bx(.1,3,7,L(0xdfe6e2),3,1.5,0);bx(6,3,.1,L(0xdfe6e2),0,1.5,3.5);
  bx(6,.9,.12,L(0x9fc4b8),0,.45,-3.46);bx(.12,.9,7,L(0x9fc4b8),-2.96,.45,0);bx(.12,.9,7,L(0x9fc4b8),2.96,.45,0);
  const win=new T.Mesh(new T.PlaneGeometry(2.4,1.5),new T.MeshBasicMaterial({color:0xf4fbff}));win.position.set(X-2.93,1.7,-.4);win.rotation.y=Math.PI/2;S.add(win);
  const fr=L(0xb8b8b0);bx(.06,1.6,.06,fr,-2.92,1.7,-1.62);bx(.06,1.6,.06,fr,-2.92,1.7,.82);bx(.06,.06,2.5,fr,-2.92,2.47,-.4);bx(.06,.06,2.5,fr,-2.92,.93,-.4);bx(.06,1.5,.04,fr,-2.92,1.7,-.4);
  bx(1.1,.45,2.1,L(0x7f8a90),0,.3,-.2);bx(1.0,.12,2.0,L(0xffffff),0,.58,-.2);bx(1.0,.14,1.3,L(0xaed3e6),0,.68,.35);bx(.9,.1,.5,L(0xffffff),0,.7,-.95);
  bx(.04,.35,1.9,L(0xb9bec2),-.58,.78,-.2);bx(.04,.35,1.9,L(0xb9bec2),.58,.78,-.2);
  bx(.05,1.9,.05,L(0xaaaaaa),.95,.95,-1.15);bx(.14,.28,.05,L(0xdbe9ef),.95,1.75,-1.15);
  const mon=new T.Mesh(new T.PlaneGeometry(.7,.45),new T.MeshBasicMaterial({map:mk(128,80,(x,W,H)=>{x.fillStyle='#04120a';x.fillRect(0,0,W,H);x.strokeStyle='#31ff7a';x.lineWidth=2;x.beginPath();x.moveTo(0,50);for(let i=0;i<W;i++){const k=i%32;x.lineTo(i,k===10?18:k===12?64:50)}x.stroke();x.fillStyle='#31ff7a';x.font='bold 14px monospace';x.fillText('72',100,16)})}));mon.position.set(X-2.0,1.45,-3.05);mon.rotation.y=.35;S.add(mon);bx(.75,.5,.1,L(0x222428),-2.0,1.45,-3.12);
  /* the TV: three baked news stills (the wrecked shop, police tape, the seven bags) + a headline banner, slow push-in */
  HOSP.imgs=[0,1,2].map(i=>{const t=new T.TextureLoader().load('news'+i+'.jpg');t.colorSpace=T.SRGBColorSpace;return t});
  const HL=[['LORRY CRASHES INTO KOPITIAM','4 days ago · Jalan Besar'],['7 DEAD IN KOPITIAM CRASH','Owner, five customers and the driver'],['1 SURVIVOR: OWNER’S GRANDSON','Critical condition · pulled from the fire']];
  const bann=n=>mk(512,72,(x,W,H)=>{x.fillStyle='rgba(176,16,16,.94)';x.fillRect(0,0,W,H);x.fillStyle='#fff';x.font='bold 15px sans-serif';x.fillText('BREAKING NEWS',14,20);x.font='bold 22px sans-serif';x.fillText(HL[n][0],14,46);x.font='15px sans-serif';x.fillText(HL[n][1],14,64);x.fillStyle='#fff';x.fillRect(W-84,8,76,19);x.fillStyle='#b01010';x.font='bold 12px sans-serif';x.fillText('FOOTAGE',W-76,22)});
  const tv=new T.Mesh(new T.PlaneGeometry(1.5,.85),new T.MeshBasicMaterial({map:HOSP.imgs[0],side:T.DoubleSide}));tv.position.set(X+2.84,1.9,-.5);tv.rotation.y=-Math.PI/2;S.add(tv);bx(.08,.95,1.6,L(0x111111),2.9,1.9,-.5);HTV=tv;
  const bn=new T.Mesh(new T.PlaneGeometry(1.5,.211),new T.MeshBasicMaterial({map:bann(0),transparent:true}));bn.position.set(X+2.835,1.9-.425+.1055,-.5);bn.rotation.y=-Math.PI/2;S.add(bn);
  HOSP.show=n=>{const t=HOSP.imgs[n];HTV.material.map=t;HTV.material.needsUpdate=true;bn.material.map=bann(n);bn.material.needsUpdate=true;
    const dx=[.03,-.03,0][n],dy=[.02,0,-.02][n];tween(k=>{const r=1-.16*k;t.repeat.set(r,r);t.offset.set((1-r)/2+dx*k,(1-r)/2+dy*k)},4400)};
  const lg=new T.PointLight(0xfff2de,14,10,1.4);lg.position.set(X,2.7,0);S.add(lg);const l2=new T.PointLight(0xdfeeff,8,8,1.5);l2.position.set(X-2.3,1.7,-.4);S.add(l2);
  const pp=G.person;
  HOSP.mama=pp(X-.95,-1.3,0,0xc77a8a,0x1a1210,0xc9a27e,{long:true,bot:0x4a4a58});HOSP.papa=pp(X+.95,-1.5,0,0x4a6a8a,0x1a1a1a,0xc9a27e,{bot:0x2a2a30});
  HOSP.mama.visible=HOSP.papa.visible=true;pose(HOSP.mama,0,'stand');pose(HOSP.papa,0,'stand')}
G.tick.push(()=>{if(!HOSP)return;for(const g of[HOSP.mama,HOSP.papa]){const u=g.userData;let m=0;const tk=u.talk;if(tk){const t=(performance.now()-tk.t0)/1000;if(t>tk.end+.2)u.talk=null;else for(const [st,dd,a] of tk.syl){if(t>=st&&t<=st+dd){m=Math.sin((t-st)/dd*Math.PI)*a;break}}}u.mouth.visible=m>.08;u.mouth.scale.y=.08+m;u.mouth.scale.x=1.5-m*.3}});
G.d5parents=()=>HOSP&&[HOSP.mama,HOSP.papa];
async function hospital(w){
  buildHospital();const c=$('c'),X=HX;if(!CINE.on)await cineIn();   /* no walking in the hospital */
  HOSP.mama.userData.f0=215;HOSP.papa.userData.f0=105;const MA=HOSP.mama,PA=HOSP.papa;
  setTime('day');applyLights(1);bulbSet(1);scene.fog.density=.003;CINE.noclip=true;
  for(const [m,x,z] of[[HOSP.mama,X-.75,-1.9],[HOSP.papa,X+.85,-2.0]]){m.position.set(x,0,z);m.rotation.y=G.yawFrom(x,z,X,-.8);m.userData.head.rotation.x=.3}
  P.x=X;P.z=-.8;P.yaw=0;P.pitch=.6;EYE.y=1.0;
  c.style.filter='blur(9px) brightness(1.1)';
  /* the white lifts, the room swims into focus */
  w.style.transition='opacity 3.2s';w.style.opacity=0;
  tween(k=>{c.style.filter=`blur(${9*(1-k)}px) brightness(1.1)`;P.pitch=.6-.12*k},4200);
  await sleep(2600);
  const sw=(t,ms)=>say(t,ms);
  await say(sp('MAMA','Sayang...? Can you hear Mama?'),3000,MA);
  await say(sp('PAPA','He is awake. Look... he is really awake.'),3200,PA);
  await say(sp('MAMA','Four days. You slept four days, sayang.'),3200,MA);
  await sw(sp('YOU','...Mama?'),2000);
  await say(sp('MAMA','Shh. Do not talk. Mama is here. Papa is here.'),3200,MA);
  await sw(sp('YOU','Atuk...?'),2200);
  await csleep(900);
  await sw('Mama does not answer. She only holds your hand tighter.',3400);
  /* the TV */
  w.remove();c.style.filter='';HOSP.papa.position.set(X+.5,0,-3.0);
  await camTo(X+1.1,-.5,G.yawFrom(X+1.1,-.5,X+3,-.5),.5,2600);
  HOSP.show(0);A.tone(300,300,.05,.05,'square');
  await say(sp('NEWS','Four days ago, a lorry lost control and crashed into a kopitiam on Jalan Besar.'),4200);
  HOSP.show(1);await say(sp('NEWS','Seven people died: the owner, five customers, and the lorry driver.'),4000);
  HOSP.show(2);await say(sp('NEWS','The owner’s grandson was pulled from the fire. He is the only survivor.'),4200);
  await csleep(900);
  HOSP.papa.position.set(X+.85,0,-2.0);await camTo(X,-.8,G.yawFrom(X,-.8,X-.75,-1.9),.42,1800);
  await say(sp('YOU','...I was there.'),2400);
  await say(sp('MAMA','You were. And you came back to us, sayang. That is enough.'),3600,MA);
  await csleep(900);
  $('fade').style.transition='opacity 2.8s';$('fade').style.opacity=1;await sleep(3200);
  scene.fog.density=.012;CINE.noclip=false;EYE.y=1.6;await cineOut()}
G.d5hospital=async()=>{const w=document.createElement('div');w.id='hosp';w.style.cssText='position:fixed;inset:0;z-index:60;background:#f4f7f9;opacity:1;pointer-events:none';document.body.appendChild(w);G.busy=true;
  await hospital(w);$('endh').textContent='LAST ORDER';$('endp').textContent='Some goodbyes come too soon.';$('endl').textContent='If you are carrying one, talk to someone you trust.';$('end').style.display='flex';G.busy=false;G.state='end'};
G.day5=start}
