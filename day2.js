/* DAY 2 — same day, wrong in small ways. Loaded by game.js, which hands us G (the shared bits of the game). */
export default function install(G){
const {THREE,scene,P,EYE,A,CINE,D,WPS,atuk,CROWD,HOME,FEET,shutter,radio,BULB,STREAM,stain,cupsD,
  $,sleep,say,sp,cineIn,cineOut,camTo,yawTo,csleep,tween,handAct,pose,objT,setClock,setTime,applyLights,bulbSet,flicker,tapOn,tapOff,lids,startAlarm,stopAlarm,drawClock,
  showCrowd,drawBoard,day1Props,shutBlock,chWipe,chCups,chStock,chRefill,ctex,atukLeave}=G;
const yawFrom=G.yawFrom;

/* the crack in the bathroom mirror (hidden until the bathroom scene) */
const crack=new THREE.Mesh(new THREE.PlaneGeometry(.6,.8),new THREE.MeshBasicMaterial({map:ctex(60,80,c=>{
  c.strokeStyle='rgba(235,240,245,.9)';c.lineWidth=1.3;c.lineCap='round';
  const L=(...p)=>{c.beginPath();c.moveTo(p[0],p[1]);for(let i=2;i<p.length;i+=2)c.lineTo(p[i],p[i+1]);c.stroke()};
  L(30,38,24,30,18,20,12,6);L(30,38,38,28,44,16,50,4);L(30,38,22,46,14,56,6,72);L(30,38,40,48,46,60,52,76);L(30,38,31,52,28,66,30,78);L(24,30,14,30,4,34);L(38,28,50,30,58,26);
  c.lineWidth=.8;L(30,38,34,30,36,22);L(22,46,12,44,3,48)}),transparent:true,depthWrite:false,fog:false}));
crack.position.set(-7.7,1.65,1.045);crack.visible=false;scene.add(crack);

/* live bathroom mirror: only switched on during the bathroom scene (it costs one extra scene render per frame) */
const MIR=(()=>{const T=THREE,mp=new T.Vector3(-7.7,1.65,1.04),n=new T.Vector3(0,0,1);
  const rt=new T.WebGLRenderTarget(320,400);
  const ck=document.createElement('canvas');ck.width=120;ck.height=160;{const x=ck.getContext('2d');x.strokeStyle='rgba(240,245,250,.95)';x.lineCap='round';
    const L=(w,...p)=>{x.lineWidth=w;x.beginPath();x.moveTo(p[0],p[1]);for(let i=2;i<p.length;i+=2)x.lineTo(p[i],p[i+1]);x.stroke()};
    L(2.6,62,60,48,44,36,26,22,4);L(2.6,62,60,78,40,90,22,104,2);L(2.6,62,60,44,78,26,98,10,140);L(2.6,62,60,82,82,92,108,100,150);L(2.2,62,60,60,96,52,124,58,158);L(1.6,48,44,28,46,6,54);L(1.6,78,40,100,44,118,36);L(1.6,44,78,22,74,2,84);L(1.4,36,26,30,12,34,2)}
  const mat=new T.ShaderMaterial({uniforms:{tex:{value:rt.texture},crk:{value:new T.CanvasTexture(ck)},tm:{value:new T.Matrix4()},amt:{value:0}},
    vertexShader:'uniform mat4 tm;varying vec4 vU;varying vec2 vV;void main(){vV=uv;vU=tm*vec4(position,1.);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
    fragmentShader:'uniform sampler2D tex;uniform sampler2D crk;uniform float amt;varying vec4 vU;varying vec2 vV;void main(){vec4 c=texture2DProj(tex,vU);c.rgb*=1.5*vec3(.9,1.0,1.05);vec4 k=texture2D(crk,vV);c.rgb=mix(c.rgb,k.rgb,k.a*amt);gl_FragColor=vec4(c.rgb,1.);}'});
  const m=new T.Mesh(new T.PlaneGeometry(.62,.8),mat);m.position.copy(mp);m.visible=false;scene.add(m);
  const body=G.person(-7.7,1.85,0,0x3b5a7a,0x1a1a1a,0xc9a27e,{});body.visible=false;
  const vc=new T.PerspectiveCamera(),pl=new T.Plane(new T.Vector3(0,0,1),-1.047);
  const refl=v=>{const dd=v.clone().sub(mp).dot(n);return v.clone().sub(n.clone().multiplyScalar(2*dd))};
  m.onBeforeRender=(r,sc,cam)=>{
    const pos=new T.Vector3().setFromMatrixPosition(cam.matrixWorld),dir=new T.Vector3(0,0,-1).applyQuaternion(cam.quaternion),up=new T.Vector3(0,1,0).applyQuaternion(cam.quaternion);
    const tgt=pos.clone().add(dir);vc.position.copy(refl(pos));
    vc.up.copy(up.clone().sub(n.clone().multiplyScalar(2*up.dot(n))));vc.lookAt(refl(tgt));
    vc.projectionMatrix.copy(cam.projectionMatrix);vc.updateMatrixWorld();vc.matrixWorldInverse.copy(vc.matrixWorld).invert();
    const tm=mat.uniforms.tm.value;tm.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1);tm.multiply(vc.projectionMatrix).multiply(vc.matrixWorldInverse).multiply(m.matrixWorld);
    m.visible=false;body.visible=true;const prev=r.getRenderTarget();r.clippingPlanes=[pl];r.setRenderTarget(rt);r.clear();r.render(sc,vc);r.setRenderTarget(prev);r.clippingPlanes=[];body.visible=false;m.visible=true};
  return {m,mat,on:v=>{m.visible=v;if(!v)mat.uniforms.amt.value=0}}})();

const pace=(x,z,sp_=1.7)=>{const x0=P.x,z0=P.z,L=Math.hypot(x-x0,z-z0);if(L<.9)return Promise.resolve();let st=0;
  return tween(k=>{const e=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;P.x=x0+(x-x0)*e;P.z=z0+(z-z0)*e;st++;EYE.y=1.6+Math.sin(performance.now()/110)*.035*Math.min(1,Math.min(k,1-k)*8);if(st%16===0)A.step()},Math.max(700,L/sp_*1000)).then(()=>{EYE.y=1.6})};
const card=async(h,sm,ms=2400)=>{const dc=$('dcard');dc.innerHTML=h+'<small>'+sm+'</small>';dc.style.opacity=1;await sleep(ms);dc.style.opacity=0};

/* ---------- opening: same alarm, same minute ---------- */
async function start(){
  G.busy=true;G.state='d2_intro';objT('');
  setTime('day');G.setLights(true);applyLights(1);bulbSet(1);tapOff();setClock('6:30 AM');crack.visible=false;MIR.on(false);
  shutter.position.y=3.6;shutBlock(false);drawBoard(2);day1Props(true);
  showCrowd(true);D.crowd=true;CROWD.forEach((c,i)=>{c.position.set(HOME[i][0],0,HOME[i][1]);c.rotation.y=HOME[i][2];pose(c,0,'sit')});
  atuk.position.set(3.9,0,3.5);atuk.rotation.y=1.0;pose(atuk,0,'stand');FEET.visible=false;
  window.__doorG.rotation.y=0;CINE.noclip=true;EYE.y=.62;P.x=14.5;P.z=17.0;P.yaw=0;P.pitch=1.1;P.tx=null;P.fy=null;lids(0,0);G.setBlur(true);
  $('fade').style.transition='opacity 1s';$('fade').style.opacity=1;
  await G.dayCard(2,G.tm('6:30 AM'),2800);
  await cineIn();
  $('fade').style.transition='opacity 1.2s';$('fade').style.opacity=0;startAlarm();await sleep(1600);
  await lids(.2,500);await sleep(240);await lids(0,220);await sleep(300);await lids(.6,560);await lids(0,200);await sleep(200);
  G.setBlur(false);await lids(1,800);
  await camTo(14.5,17.0,0,-.02,1000);
  handAct('knock',900);await sleep(480);A.click();stopAlarm();await sleep(500);
  setClock('6:55 AM');drawClock(5,55);await say(sp('YOU','5:55.'),1400);
  await say(sp('YOU','Six o\'clock, Atuk said. It is already dark outside.'),2600);
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
const CH=[{x:2.8,z:-.8,tx:2.8,tz:-1.8,obj:'Wipe the table',run:async()=>{await chWipe()}},
          {x:-2.0,z:-1.8,tx:-3,tz:-1.8,obj:'Clear the cups',run:async()=>{await chCups();
            await say('Still full. Cold. Nobody drank a drop.',2600);await say(sp('YOU','Nobody ever touches the kopi.'),2200)}},
          {x:-3.4,z:-5.45,tx:-3.75,tz:-6.6,obj:'Get kopi powder from the store room',run:async()=>{await chStock();
            await say(sp('YOU','Already the last bag? I filled the shelf yesterday.'),2800)}},
          {x:-1.4,z:-5.7,tx:-1.4,tz:-6.4,obj:'Refill the machine',run:async()=>{await chRefill();
            await say(sp('ATUK','Kopi powder habis laju, kan? Atuk make extra every night.'),3200);
            await say(sp('YOU','Extra? For who? Nobody drinks it.'),2400);
            await csleep(700);
            await say(sp('ATUK','...Just fill the machine, cucu.'),2600)}}];
let ci=0;
WPS.d2_chores={get x(){return CH[Math.min(ci,CH.length-1)].x},get z(){return CH[Math.min(ci,CH.length-1)].z},get tx(){return CH[Math.min(ci,CH.length-1)].tx},get tz(){return CH[Math.min(ci,CH.length-1)].tz},get lab(){return CH[Math.min(ci,CH.length-1)].obj},manual:true,r:.6,go:1,get fn(){return choreRun}};
async function choreRun(){if(G.busy||CINE.on)return;G.busy=true;const i=ci;A.click();await cineIn();await CH[i].run();
  ci++;setClock(['8:05 AM','9:10 AM','9:25 AM','9:40 AM'][i]);
  if(ci>=CH.length){G.state='d2_radio';objT('Check the radio')}else objT(CH[ci].obj);
  await camTo(P.x,P.z,P.yaw,0,500);G.busy=false;await cineOut()}

/* ---------- the radio ---------- */
WPS.d2_radio={x:3.5,z:.1,r:.6,go:1,fn:radioScene};
async function radioScene(){if(G.busy||CINE.on)return;G.busy=true;await cineIn();
  await camTo(3.5,.05,yawFrom(3.5,.05,4.15,-.2),-.55,1100);
  A.static(.14);await say('The radio is on. Nobody touched it.',2200);A.static(.22);
  await say('"...berita terkini. Sebuah lori hilang kawalan di..."',3000);
  A.static(.45);await csleep(500);
  /* Atuk lunges in from behind and slaps it off */
  atuk.visible=true;atuk.rotation.y=0;
  {const x0=atuk.position.x,z0=atuk.position.z,tx=4.05,tz=.5;
   await tween(k=>{atuk.position.set(x0+(tx-x0)*k,0,z0+(tz-z0)*k);pose(atuk,performance.now()/90,'walk')},620)}
  pose(atuk,0,'stand');A.static(0);A.click();A.sting();
  await csleep(120);
  atuk.rotation.y=Math.atan2(-(P.x-atuk.position.x),-(P.z-atuk.position.z));
  await camTo(P.x,P.z,yawTo(atuk.position.x,atuk.position.z),.06,230);
  await tween(k=>{P.pitch=.06+Math.sin(k*40)*.03*(1-k)},320);
  await say(sp('ATUK','MATIKAN!'),1300);
  await csleep(500);
  await say(sp('ATUK','News all lies. Bad luck to listen.'),2400);
  await say(sp('YOU','...Lori? What lorry?'),1800);
  await say(sp('ATUK','Nothing. Go. Wash your face.'),2200);
  /* he goes back to his table while the camera drifts down the hall: the tap is running */
  const back=(async()=>{const x0=atuk.position.x,z0=atuk.position.z,tx=3.9,tz=3.5;atuk.rotation.y=Math.atan2(-(tx-x0),-(tz-z0));
    await tween(k=>{atuk.position.set(x0+(tx-x0)*k,0,z0+(tz-z0)*k);pose(atuk,performance.now()/170,'walk')},2200);
    atuk.rotation.y=1.0;pose(atuk,0,'stand')})();
  await camTo(1.0,2.5,yawFrom(1.0,2.5,-7,2.5),0,1500);
  tapOn();await csleep(600);
  for(const v of[.8,.2,.7,.1,.9]){bulbSet(v);await csleep(130)}
  bulbSet(1);
  await say('Water running. Down the hall.',2400);
  await say(sp('YOU',"The tap... I'll go look."),1900);
  await back;
  G.state='d2_bath';setClock('10:15 AM');objT('The tap is running again');G.busy=false;await cineOut()}

/* ---------- the bathroom: tap, mirror ---------- */
WPS.d2_bath={x:-7.7,z:2.5,r:.6,go:1,fn:bathScene};
async function bathScene(){if(G.busy||CINE.on)return;G.busy=true;await cineIn();
  await camTo(-7.7,2.5,yawFrom(-7.7,2.5,-7.7,1.1),-.05,1300);
  await say(sp('YOU','Again. I turned this off yesterday.'),2200);
  /* the water keeps running while you look up into the mirror */
  MIR.on(true);
  await camTo(-7.7,1.75,yawFrom(-7.7,1.75,-7.7,1.0),-.02,1500);
  await csleep(900);
  await say('Your own face. Tired.',2000);
  A.tone(60,45,2.4,.1,'sine');
  await flicker([.5,1,.3,.9,.2],80);applyLights(.4);bulbSet(.4);
  const F=G.FIG;F.position.set(-7.4,0,2.3);F.rotation.y=Math.PI;F.visible=true;
  await csleep(1700);
  A.nz(.04,6500,3000,.3,'highpass');A.tone(170,80,.09,.22,'sine');[[70,4300,.18],[150,5300,.14],[260,3700,.12],[430,4900,.09]].forEach(([t,f,v])=>setTimeout(()=>A.nz(.05,f,f*.6,v,'bandpass',6),t));A.tone(5400,5000,.18,.012,'sine');
  MIR.mat.uniforms.amt.value=1;
  await csleep(1500);
  await flicker([.15,0,.5,0,.2,0]);F.visible=false;applyLights(1);bulbSet(1);
  await csleep(800);
  await say('A crack. Right where your face should be.',2800);
  await say(sp('YOU','...Was someone behind me?'),2200);
  await csleep(500);
  await say(sp('YOU',"No. I'm just tired."),2400);
  handAct('reach',1400);await csleep(700);tapOff();A.click();await csleep(900);
  A.tone(1300,900,.04,.04);await csleep(600);
  crack.visible=true;MIR.on(false);
  await say(sp('YOU',"It wasn't there yesterday."),2200);
  await camTo(-7.9,2.6,yawFrom(-7.9,2.6,-6,2.5),0,1000);
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
  await say(sp('ATUK','Stay a while, cucu. Atuk make roti bakar.'),2800);
  $('fade').style.transition='opacity 1.4s';$('fade').style.opacity=1;await sleep(1600);
  showCrowd(false);atuk.visible=true;atuk.position.set(3.9,0,3.5);atuk.rotation.y=1.0;
  setTime('dusk');setClock('5:40 PM');P.x=.6;P.z=2.3;P.yaw=-2.14;P.pitch=0;P.tx=null;
  await card('LATE NIGHT',G.tm('5:40 PM'),1800);
  $('fade').style.opacity=0;G.state='d2_rule';objT('Talk to Atuk');G.busy=false;await cineOut()}
async function atukRule(){if(G.busy||CINE.on)return;G.busy=true;await cineIn();
  await pace(2.95,3.05);await camTo(P.x,P.z,yawTo(atuk.position.x,atuk.position.z),.02,500);
  await say(sp('ATUK','Same like yesterday. Tonight, anybody knock...'),2800);
  await say(sp('ATUK','Three knock only. Anything else, don\'t open.'),2800);
  await say(sp('YOU>ATUK','Even if they call my name?'),2000);
  await csleep(900);
  await say(sp('ATUK','...Especially if they call your name.'),3000);
  await say(sp('ATUK','Atuk balik dulu. Before you lock: mop the floor, clear the cups, rubbish go out the back.'),3800);
  G.busy=false;atukLeave();
  if(G.closeInit){G.state='d2_close';G.closeInit(2)}else{G.state='d2_lock';objT('Lock up');setClock('6:00 PM')}
  await cineOut()}

/* ---------- lock up, go home ---------- */
WPS.d2_lock={x:.3,z:5.3,r:.6,go:1,fn:lockUp};
async function lockUp(){if(G.busy||CINE.on||D.walking)return;G.busy=true;G.FIG.visible=false;await cineIn();
  await camTo(.3,5.2,yawFrom(.3,5.2,0,3.9),.1,900);
  handAct('lift',2000);A.shutter();await tween(k=>{shutter.position.y=3.6-2.4*k;P.pitch=.1-.25*k},1800);shutBlock(true);
  A.click();handAct('reach',1200);await say('You pull the padlock through. Click.',2200);
  await camTo(.3,5.2,yawFrom(.3,5.2,6.1,14),0,1200);
  G.state='d2_home';window.__doorG.rotation.y=0;setClock('6:10 PM');objT('Go home');G.busy=false;await cineOut()}
WPS.d2_home={x:6.1,z:14.0,r:.6,go:1,fn:homeNight};

/* ---------- the walk home: turn around, and he is standing in the road. No cutscene, you keep control. ---------- */
let sFired=false,sArmed=false,sLook=0;
G.tick.push(dt=>{
  if(G.state==='d2_intro'){sFired=false;sArmed=false;sLook=0;return}
  if(G.state!=='d2_home'||sFired||CINE.on||G.busy)return;
  if(P.z>9.2)sArmed=true;if(!sArmed)return;
  const dy=Math.abs(Math.atan2(Math.sin(P.yaw),Math.cos(P.yaw)));
  if(dy<.55)sLook+=dt;else sLook=0;
  if(sLook>.25){sFired=true;streetScare()}});
async function streetScare(){
  const F=G.FIG,fx0=Math.max(-20,Math.min(20,P.x-Math.sin(P.yaw)*7.5)),fz0=Math.max(4.8,P.z-Math.cos(P.yaw)*7.5);
  F.position.set(fx0,0,fz0);F.rotation.y=Math.atan2(P.x-fx0,P.z-fz0);F.visible=true;
  G.AMB&&G.AMB.duck(3200);A.tone(60,42,1.4,.18,'sine');
  await sleep(1300);
  /* the snap: two metres away, one frame, full volume */
  const dx=fx0-P.x,dz=fz0-P.z,L=Math.hypot(dx,dz)||1;
  F.position.set(P.x+dx/L*2.1,0,P.z+dz/L*2.1);F.rotation.y=Math.atan2(P.x-F.position.x,P.z-F.position.z);
  try{G.SFX&&G.SFX.play&&G.SFX.play('ghost_scream_3',{g:.9})}catch(_){}
  A.nz(.5,200,90,.4,'lowpass');A.tone(880,110,.4,.22,'sawtooth');
  flicker([0,.7,0,.3,0],70);
  await sleep(900);
  F.visible=false;applyLights(1);
  await sleep(700);
  try{G.SFX&&G.SFX.play&&G.SFX.play('ghost_moan_2',{g:.35,wet:.4})}catch(_){}
  await say(sp('DRIVER','...maaf...'),2600)}


/* ---------- home, then the knock with a voice ---------- */
async function homeNight(){if(G.busy||CINE.on)return;G.busy=true;await cineIn();const dg=window.__doorG;dg.rotation.y=0;
  await camTo(6.1,13.5,yawFrom(6.1,13.5,6.1,15),.03,900);
  handAct('knock',2300);for(let i=0;i<3;i++){A.knock();await csleep(650)}
  await csleep(600);A.tone(170,110,.7,.05,'sawtooth');
  atuk.visible=true;atuk.position.set(6.1,0,15.85);atuk.rotation.y=0;pose(atuk,0,'stand');
  A.door();await tween(k=>{dg.rotation.y=-1.25*k},900);
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
  if(G.day3){G.busy=false;G.state='d3_intro';G.day3();return}
  $('endh').textContent='END OF DAY 2';$('endp').textContent='Atuk said not to answer. Someone is still asking.';$('endl').textContent='Kopitiam Horror · Day 3 is coming';
  $('end').style.display='flex';G.busy=false;G.state='end'}

G.crack=crack;G.day2=start}
