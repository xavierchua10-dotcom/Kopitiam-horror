/* DAY 2 — same day, wrong in small ways. Loaded by game.js, which hands us G (the shared bits of the game). */
export default function install(G){
const {THREE,scene,P,EYE,A,CINE,D,WPS,atuk,CROWD,HOME,FEET,shutter,radio,BULB,STREAM,stain,cupsD,
  $,sleep,say,sp,cineIn,cineOut,camTo,yawTo,csleep,tween,handAct,pose,objT,setClock,setTime,applyLights,bulbSet,flicker,tapOn,tapOff,lids,startAlarm,stopAlarm,drawClock,
  showCrowd,drawBoard,day1Props,shutBlock,chWipe,chCups,ctex,atukLeave}=G;

/* the crack in the bathroom mirror (hidden until the bathroom scene) */
const crack=new THREE.Mesh(new THREE.PlaneGeometry(.6,.8),new THREE.MeshBasicMaterial({map:ctex(60,80,c=>{
  c.strokeStyle='rgba(235,240,245,.9)';c.lineWidth=1.3;c.lineCap='round';
  const L=(...p)=>{c.beginPath();c.moveTo(p[0],p[1]);for(let i=2;i<p.length;i+=2)c.lineTo(p[i],p[i+1]);c.stroke()};
  L(30,38,24,30,18,20,12,6);L(30,38,38,28,44,16,50,4);L(30,38,22,46,14,56,6,72);L(30,38,40,48,46,60,52,76);L(30,38,31,52,28,66,30,78);L(24,30,14,30,4,34);L(38,28,50,30,58,26);
  c.lineWidth=.8;L(30,38,34,30,36,22);L(22,46,12,44,3,48)}),transparent:true,depthWrite:false,fog:false}));
crack.position.set(-7.7,1.65,1.045);crack.visible=false;scene.add(crack);

const pace=(x,z,sp_=1.7)=>{const x0=P.x,z0=P.z,L=Math.hypot(x-x0,z-z0);if(L<.9)return Promise.resolve();let st=0;
  return tween(k=>{const e=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;P.x=x0+(x-x0)*e;P.z=z0+(z-z0)*e;st++;EYE.y=1.6+Math.sin(performance.now()/110)*.035*Math.min(1,Math.min(k,1-k)*8);if(st%16===0)A.step()},Math.max(700,L/sp_*1000)).then(()=>{EYE.y=1.6})};
const card=async(h,sm,ms=2400)=>{const dc=$('dcard');dc.innerHTML=h+'<small>'+sm+'</small>';dc.style.opacity=1;await sleep(ms);dc.style.opacity=0};

/* ---------- opening: same alarm, same minute ---------- */
async function start(){
  G.busy=true;G.state='d2_intro';
  setTime('day');G.setLights(true);applyLights(1);bulbSet(1);tapOff();setClock('6:30 AM');crack.visible=false;
  shutter.position.y=3.6;shutBlock(false);drawBoard(2);day1Props(true);
  showCrowd(true);D.crowd=true;CROWD.forEach((c,i)=>{c.position.set(HOME[i][0],0,HOME[i][1]);c.rotation.y=HOME[i][2];pose(c,0,'sit')});
  atuk.position.set(3.9,0,3.5);atuk.rotation.y=1.0;pose(atuk,0,'stand');FEET.visible=false;
  CINE.noclip=true;EYE.y=.62;P.x=14.5;P.z=17.0;P.yaw=0;P.pitch=1.1;P.tx=null;P.fy=null;lids(0,0);G.setBlur(true);
  $('fade').style.transition='opacity 1s';$('fade').style.opacity=1;
  await card('DAY 2','6:30 AM',2200);
  await cineIn();
  $('fade').style.transition='opacity 1.2s';$('fade').style.opacity=0;startAlarm();await sleep(1600);
  await lids(.2,500);await sleep(240);await lids(0,220);await sleep(300);await lids(.6,560);await lids(0,200);await sleep(200);
  G.setBlur(false);await lids(1,800);
  await camTo(14.5,17.0,0,-.02,1000);
  handAct('knock',900);await sleep(480);A.click();stopAlarm();await sleep(500);
  setClock('6:55 AM');drawClock(6,55);await say(sp('YOU','6:55.'),1400);
  await say(sp('YOU','Same as yesterday. Exactly.'),2200);
  await Promise.all([tween(k=>{EYE.y=.62+(1.6-.62)*k},1200),camTo(13.1,18.2,Math.PI,0,1200)]);
  EYE.y=1.6;CINE.noclip=false;await cineOut();
  G.state='d2_go';objT('Go to the kopitiam');G.busy=false}

/* ---------- the shop: everyone is already inside, saying yesterday's words ---------- */
async function greet(){if(G.busy||CINE.on)return;G.busy=true;await cineIn();
  await pace(2.95,3.05);
  await camTo(P.x,P.z,yawTo(-3,-1),-.02,900);
  await say('"Petrol naik lagi, you tau?"',2300,CROWD[0]);
  await say('"Roti bakar sini memang best."',2300,CROWD[1]);
  await camTo(P.x,P.z,yawTo(atuk.position.x,atuk.position.z),.02,900);
  await say(sp('ATUK','Eh, late ah today. Customers all waiting outside.'),2800);
  await say(sp('YOU','Atuk... they are already inside.'),2200);
  await say(sp('ATUK','Hah? ...Kopi ready. But the tables nobody wipe. Go go.'),3000);
  await say(sp('YOU','He said that yesterday. Every word.'),2400);
  await camTo(P.x,P.z,0,0,700);
  G.state='d2_chores';setClock('7:10 AM');ci=0;objT(CH[0].obj);G.busy=false;await cineOut()}

WPS.d2_go={x:2.8,z:3.05,r:.6,go:1,fn:greet};
/* chores today: wipe the table, clear the cups */
const CH=[{x:2.8,z:-.8,obj:'Wipe the table',run:async()=>{await chWipe()}},
          {x:-2.0,z:-1.8,obj:'Clear the cups',run:async()=>{await chCups();
            await say('Still full. Cold. Nobody drank a drop.',2600);await say(sp('YOU','Nobody ever touches the kopi.'),2200)}}];
let ci=0;
WPS.d2_chores={get x(){return CH[Math.min(ci,1)].x},get z(){return CH[Math.min(ci,1)].z},r:.6,go:1,get fn(){return choreRun}};
async function choreRun(){if(G.busy||CINE.on)return;G.busy=true;const i=ci;A.click();await cineIn();await CH[i].run();
  ci++;setClock(['8:05 AM','9:10 AM'][i]);
  if(ci>=CH.length){G.state='d2_radio';objT('Check the radio')}else objT(CH[ci].obj);
  await camTo(P.x,P.z,P.yaw,0,500);G.busy=false;await cineOut()}

/* ---------- the radio ---------- */
WPS.d2_radio={x:3.5,z:.1,r:.6,go:1,fn:radioScene};
async function radioScene(){if(G.busy||CINE.on)return;G.busy=true;await cineIn();
  await camTo(3.5,.05,yawTo(4.15,-.2),-.55,1100);
  A.static(.14);await say('The radio is on. Nobody touched it.',2200);A.static(.22);
  await say('"...berita terkini. Sebuah lori hilang kawalan di..."',3000);
  A.static(.6);await csleep(250);A.static(0);A.tone(60,40,.9,.1,'sine');
  await csleep(1100);
  await say('"...lori..."',1500);A.static(.3);await csleep(500);A.static(0);
  await say(sp('ATUK','Matikan! Matikan radio tu!'),2000);
  handAct('reach',1200);await csleep(600);A.click();await csleep(500);
  await camTo(P.x,P.z,yawTo(atuk.position.x,atuk.position.z),0,900);
  await say(sp('ATUK','News all lies. Bad luck to listen.'),2400);
  await say(sp('YOU','Lori...? What lorry?'),1800);
  await camTo(P.x,P.z,0,0,600);
  G.state='d2_bath';setClock('10:15 AM');objT('The tap is running again');tapOn();G.busy=false;await cineOut()}

/* ---------- the bathroom: tap, mirror ---------- */
WPS.d2_bath={x:-7.7,z:2.2,r:.6,go:1,fn:bathScene};
async function bathScene(){if(G.busy||CINE.on)return;G.busy=true;await cineIn();
  await camTo(-7.7,2.4,yawTo(-7.7,1.1),-.05,1300);
  await say(sp('YOU','Again. I turned this off yesterday.'),2200);
  handAct('reach',1400);await csleep(700);tapOff();A.click();await csleep(900);
  A.tone(1300,900,.04,.04);await csleep(800);
  await camTo(-7.7,2.1,yawTo(-7.7,1.0),.03,1200);
  await csleep(500);
  flicker([.5,1,.3,.9],80);await csleep(500);
  A.nz(.25,5000,3000,.2,'highpass');A.tone(3200,2200,.12,.07,'square');crack.visible=true;
  await csleep(1400);
  await say('A crack. Right where your face should be.',2800);
  await say(sp('YOU',"It wasn't there yesterday."),2200);
  await camTo(-7.9,2.6,yawTo(-6,2.5),0,1000);
  applyLights(1);bulbSet(1);
  G.state='d2_back';setClock('10:25 AM');objT('Tell Atuk');G.busy=false;await cineOut()}

/* ---------- Atuk, then evening ---------- */
WPS.d2_back={x:2.8,z:3.05,r:.6,go:1,fn:atukDay};
WPS.d2_rule={x:2.8,z:3.05,r:.6,go:1,fn:atukRule};
async function atukDay(){if(G.busy||CINE.on)return;G.busy=true;await cineIn();
  await pace(2.95,3.05);await camTo(P.x,P.z,yawTo(atuk.position.x,atuk.position.z),.02,500);
  await say(sp('ATUK','Fixed? Good boy. You look pucat. Sleep enough or not?'),3000);
  await say(sp('YOU','Atuk... the radio said lorry.'),2200);
  await say(sp('ATUK','Sit. Eat. Don\'t think too much.'),2600);
  $('fade').style.transition='opacity 1.4s';$('fade').style.opacity=1;await sleep(1600);
  showCrowd(false);atuk.visible=true;atuk.position.set(3.9,0,3.5);atuk.rotation.y=1.0;
  setTime('dusk');setClock('5:40 PM');P.x=.6;P.z=2.3;P.yaw=-2.14;P.pitch=0;P.tx=null;
  await card('EVENING','5:40 PM',1800);
  $('fade').style.opacity=0;G.state='d2_rule';objT('Talk to Atuk');G.busy=false;await cineOut()}
async function atukRule(){if(G.busy||CINE.on)return;G.busy=true;await cineIn();
  await pace(2.95,3.05);await camTo(P.x,P.z,yawTo(atuk.position.x,atuk.position.z),.02,500);
  await say(sp('ATUK','Same like yesterday. Tonight, anybody knock...'),2800);
  await say(sp('ATUK','Three knock only. Anything else, don\'t open.'),2800);
  await say(sp('YOU','Even if they call my name?'),2000);
  await csleep(900);
  await say(sp('ATUK','...Especially if they call your name.'),3000);
  await say(sp('ATUK','Atuk balik dulu. Lock properly.'),2400);
  G.state='d2_lock';objT('Lock up');setClock('6:00 PM');G.busy=false;atukLeave();await cineOut()}

/* ---------- lock up, go home ---------- */
WPS.d2_lock={x:.3,z:5.3,r:.6,go:1,fn:lockUp};
async function lockUp(){if(G.busy||CINE.on||D.walking)return;G.busy=true;await cineIn();
  await camTo(.3,5.2,yawTo(0,3.9),.1,900);
  handAct('lift',2000);A.scrape();await tween(k=>{shutter.position.y=3.6-2.4*k;P.pitch=.1-.25*k},1800);shutBlock(true);
  A.click();handAct('reach',1200);await say('You pull the padlock through. Click.',2200);
  await camTo(.3,5.2,yawTo(6.1,14),0,1200);
  G.state='d2_home';window.__doorG.rotation.y=0;setClock('6:10 PM');objT('Go home');G.busy=false;await cineOut()}
WPS.d2_home={x:6.1,z:14.0,r:.6,go:1,fn:homeNight};

/* ---------- home, then the knock with a voice ---------- */
async function homeNight(){if(G.busy||CINE.on)return;G.busy=true;await cineIn();const dg=window.__doorG;dg.rotation.y=0;
  await camTo(6.1,13.5,yawTo(6.1,15),.03,900);
  handAct('knock',2300);for(let i=0;i<3;i++){A.knock();await csleep(650)}
  await csleep(600);A.tone(170,110,.7,.05,'sawtooth');
  atuk.visible=true;atuk.position.set(6.1,0,15.85);atuk.rotation.y=0;pose(atuk,0,'stand');
  await tween(k=>{dg.rotation.y=-1.25*k},900);
  await say(sp('ATUK','Three knock. Okay. Masuk. Tidur cepat.'),2600);
  await camTo(6.1,15.4,Math.PI,0,900);
  atuk.visible=false;await camTo(6.1,16.3,Math.PI,0,700);
  await tween(k=>{dg.rotation.y=-1.25*(1-k)},700);A.tone(90,60,.25,.18,'sine');A.click();
  /* night, in bed */
  $('fade').style.transition='opacity 1.2s';$('fade').style.opacity=1;await sleep(1400);
  setTime('night');applyLights(.12);bulbSet(0);setClock('2:07 AM');drawClock(2,7);
  CINE.noclip=true;EYE.y=.62;P.x=14.5;P.z=17.0;P.yaw=0;P.pitch=.55;
  await card('2:07 AM','Night 2',2200);
  $('fade').style.transition='opacity 1.6s';$('fade').style.opacity=0;await sleep(1800);
  A.knock();await csleep(1500);
  await say('Somebody is knocking. Far away. Slow.',2600);
  A.knock();await csleep(900);
  await say('"...Can you hear me?"',2800);
  await csleep(900);
  await say('"Squeeze my hand."',3000);
  handAct('reach',1500);await csleep(900);
  await say(sp('YOU','...Who is that?'),2000);
  await csleep(1300);
  await say(sp('ATUK','Jangan buka.'),2200);
  await csleep(700);
  await say(sp('ATUK','Jangan jawab.'),2200);
  await csleep(1500);
  await say('"...please. Squeeze my hand."',3200);
  $('fade').style.transition='opacity 2s';$('fade').style.opacity=1;await sleep(2400);
  CINE.noclip=false;EYE.y=1.6;await cineOut();
  $('endh').textContent='END OF DAY 2';$('endp').textContent='Atuk said not to answer. Someone is still asking.';$('endl').textContent='Last Order · Day 3 is coming';
  $('end').style.display='flex';G.busy=false;G.state='end'}

G.day2=start}
