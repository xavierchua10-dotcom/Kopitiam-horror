/* DAY 3 — the first hint. Smoke in the air, quiet customers, half a news sentence, a figure across the road, a man crying at night. */
export default function install(G){
const {THREE,scene,camera,P,EYE,A,CINE,D,WPS,atuk,CROWD,HOME,FEET,shutter,
  $,sleep,say,sp,cineIn,cineOut,camTo,yawTo,csleep,tween,handAct,pose,objT,setClock,setTime,applyLights,bulbSet,flicker,tapOff,lids,startAlarm,stopAlarm,drawClock,
  showCrowd,drawBoard,day1Props,shutBlock,atukLeave,M,B,box,ctex}=G;

const pace=(x,z,sp_=1.7)=>{const x0=P.x,z0=P.z,L=Math.hypot(x-x0,z-z0);if(L<.9)return Promise.resolve();let st=0;
  return tween(k=>{const e=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;P.x=x0+(x-x0)*e;P.z=z0+(z-z0)*e;st++;EYE.y=1.6+Math.sin(performance.now()/110)*.035*Math.min(1,Math.min(k,1-k)*8);if(st%16===0)A.step()},Math.max(700,L/sp_*1000)).then(()=>{EYE.y=1.6})};
const card=async(h,sm,ms=2400)=>{const dc=$('dcard');dc.innerHTML=h+'<small>'+sm+'</small>';dc.style.opacity=1;await sleep(ms);dc.style.opacity=0};

/* smoke haze: a soft warm-grey wash over the picture, only on Day 3 */
const haze=document.createElement('div');haze.style.cssText='position:fixed;inset:0;pointer-events:none;opacity:0;transition:opacity 2s;z-index:3;background:radial-gradient(ellipse at 50% 60%,rgba(120,100,80,.05) 0%,rgba(90,75,60,.32) 100%)';document.body.appendChild(haze);

/* the TV on the east wall */
const tvC=document.createElement('canvas');tvC.width=96;tvC.height=60;const tvX=tvC.getContext('2d'),tvT=new THREE.CanvasTexture(tvC);tvT.colorSpace=THREE.SRGBColorSpace;tvT.magFilter=THREE.NearestFilter;
const TV=new THREE.Group();TV.position.set(4.93,2.1,.5);TV.scale.set(1,1.35,1.35);scene.add(TV);
box(.08,.5,.78,M(0x1a1a1e),0,0,0,TV);
{const scr=new THREE.Mesh(new THREE.PlaneGeometry(.68,.42),new THREE.MeshBasicMaterial({map:tvT,fog:false}));scr.rotation.y=-Math.PI/2;scr.position.x=-.045;TV.add(scr)}
let tvMode='off',tvLast=0;
function drawTV(){const c=tvX;
  if(tvMode==='off'){c.fillStyle='#050607';c.fillRect(0,0,96,60)}
  else{
    if(tvMode==='news'){c.fillStyle='#12305c';c.fillRect(0,0,96,60);c.fillStyle='#c0272d';c.fillRect(0,6,96,10);c.fillStyle='#fff';c.font='bold 9px sans-serif';c.fillText('BERITA TERKINI',6,14);
      c.fillStyle='#e9e9e9';c.font='bold 8px sans-serif';c.fillText('LORI LANGGAR KEDAI',4,40);c.fillText('KOPI DI JALAN',4,50);
      c.fillStyle='rgba(255,255,255,.18)';for(let i=0;i<5;i++)c.fillRect(0,Math.random()*60,96,1+Math.random()*2)}
    const im=c.getImageData(0,0,96,60),d=im.data,amt=tvMode==='static'?1:.35;
    for(let i=0;i<d.length;i+=4){if(Math.random()<amt){const v=60+Math.random()*190|0;d[i]=d[i+1]=d[i+2]=v}}
    c.putImageData(im,0,0)}
  tvT.needsUpdate=true}
tvSet0();
G.tick.push(()=>{if(tvMode==='off')return;const n=performance.now();if(n-tvLast>90){tvLast=n;drawTV()}});
const tvSet=m=>{tvMode=m;drawTV()};function tvSet0(){tvMode='off';drawTV()}

/* the figure across the road */
const FIG=new THREE.Group();FIG.position.set(-6,0,10.3);FIG.visible=false;scene.add(FIG);
{const dk=M(0x040506);box(.17,.85,.2,dk,-.1,.43,0,FIG);box(.17,.85,.2,dk,.1,.43,0,FIG);box(.46,.7,.26,dk,0,1.2,0,FIG);box(.13,.7,.14,dk,-.3,1.15,0,FIG);box(.13,.7,.14,dk,.3,1.15,0,FIG);box(.24,.26,.24,dk,0,1.72,0,FIG)}


/* the little things that are wrong with each customer (they show up from Day 3) */
const sph=(r,m,x,y,z,p,sx=1,sy=1,sz=1)=>{const o=new THREE.Mesh(new THREE.SphereGeometry(r,8,6),m);o.position.set(x,y,z);o.scale.set(sx,sy,sz);p.add(o);return o};
let detDone=false;
function details(){if(detDone)return;detDone=true;
  const red=M(0xa22d22,{emissive:0x300806}),dark=M(0x3a0f0c),soot=M(0x24201c);
  /* Mak Cik Salmah: a burn up the arm */
  {const u=CROWD[1].userData;sph(.085,red,0,-.14,.02,u.aL.fo,1,2.4,.9);sph(.08,red,0,-.26,0,u.aL.fo,1.1,1.1,1.1);sph(.09,dark,.02,-.05,.03,u.aL.up,1,2,.9);sph(.06,red,0,-.14,.02,u.aR.fo,1,1.6,.8)}
  /* Ah Seng: a watch, soot on his shirt */
  {const u=CROWD[0].userData,fo=u.aL.fo,band=new THREE.Mesh(new THREE.CylinderGeometry(.068,.068,.045,10),M(0x9a9a9a));band.position.y=-.2;fo.add(band);
   const face=new THREE.Mesh(new THREE.BoxGeometry(.05,.012,.05),new THREE.MeshBasicMaterial({color:0xe8e4d4}));face.position.set(0,-.2,.072);fo.add(face);
   sph(.12,soot,.06,1.22,.12,u.body,1,1.3,.35);sph(.07,soot,-.1,1.35,.14,u.body,1,1,.4)}
  /* Raj: only one shoe, a scraped foot */
  {const u=CROWD[2].userData,sh=u.L.sh,shoe=sh.children[2];shoe.visible=false;
   sph(.072,M(0x8a5836),0,-.41,.05,sh,1,.6,1.8);sph(.05,red,.02,-.41,.09,sh,1,.5,1.2);sph(.1,soot,-.04,1.2,.14,u.body,1,1.2,.35)}
  /* Mei Ling: a dark stain on her top, soot on her hands */
  {const u=CROWD[4].userData;sph(.14,red,.09,1.22,.12,u.body,1,1.4,.32);sph(.07,dark,.14,1.1,.14,u.body,1,1,.3);sph(.065,soot,0,-.26,0,u.aR.fo)}
  /* Pak Hassan: the same newspaper page, smudged */
  {const t=ctex(60,80,c=>{c.fillStyle='#d9d2bd';c.fillRect(0,0,60,80);c.fillStyle='#2a2824';c.fillRect(4,5,52,9);c.fillStyle='#555';for(let y=20;y<74;y+=4)c.fillRect(5,y,50,1.5);
     c.fillStyle='#222';c.font='bold 8px sans-serif';c.fillText('7',27,78);c.fillStyle='rgba(30,25,20,.55)';c.beginPath();c.ellipse(30,44,20,14,.3,0,7);c.fill();c.fillStyle='rgba(120,20,16,.5)';c.beginPath();c.ellipse(40,52,9,7,0,0,7);c.fill()}),
   pm=new THREE.Mesh(new THREE.PlaneGeometry(.36,.48),new THREE.MeshLambertMaterial({map:t}));pm.rotation.x=-Math.PI/2;pm.rotation.z=.12;pm.position.set(-1.7,.785,.0);scene.add(pm)}
}

/* ---------- opening: same alarm, with smoke ---------- */
async function start(){
  G.busy=true;G.state='d3_intro';
  setTime('day');G.setLights(true);applyLights(1);bulbSet(1);tapOff();setClock('6:30 AM');
  shutter.position.y=3.6;shutBlock(false);drawBoard(3);day1Props(true);tvSet('off');FIG.visible=false;details();
  showCrowd(true);D.crowd=true;CROWD.forEach((c,i)=>{c.position.set(HOME[i][0],0,HOME[i][1]);c.rotation.y=HOME[i][2];pose(c,0,'sit')});
  atuk.position.set(3.9,0,3.5);atuk.rotation.y=1.0;pose(atuk,0,'stand');FEET.visible=false;
  CINE.noclip=true;EYE.y=.62;P.x=14.5;P.z=17.0;P.yaw=0;P.pitch=1.1;P.tx=null;P.fy=null;lids(0,0);G.setBlur(true);
  $('fade').style.transition='opacity 1s';$('fade').style.opacity=1;
  await card('DAY 3','6:30 AM',2200);
  await cineIn();haze.style.opacity=1;
  $('fade').style.transition='opacity 1.2s';$('fade').style.opacity=0;startAlarm();await sleep(1600);
  await lids(.2,500);await sleep(240);await lids(0,220);await sleep(300);await lids(.6,560);await lids(0,200);await sleep(200);
  G.setBlur(false);await lids(1,800);
  await camTo(14.5,17.0,0,-.02,1000);
  handAct('knock',900);await sleep(480);A.click();stopAlarm();await sleep(500);
  setClock('6:55 AM');drawClock(6,55);await say(sp('YOU','6:55.'),1300);
  await say('A faint smell of smoke.',2200);
  await Promise.all([tween(k=>{EYE.y=.62+(1.6-.62)*k},1200),camTo(13.1,18.2,Math.PI,0,1200)]);
  EYE.y=1.6;CINE.noclip=false;await cineOut();
  G.state='d3_go';objT('Go to the kopitiam');G.busy=false}

/* ---------- the shop: very quiet ---------- */
WPS.d3_go={x:2.8,z:3.05,r:.6,go:1,fn:greet};
async function greet(){if(G.busy||CINE.on)return;G.busy=true;await cineIn();
  await pace(2.95,3.05);
  await camTo(P.x,P.z,yawTo(-3,-1),-.02,1100);
  await say('Nobody is talking. The shop is very quiet.',2600);
  await camTo(P.x,P.z,yawTo(atuk.position.x,atuk.position.z),.02,1000);
  await say(sp('ATUK','Ah, you came. ...Eh, what day today ah?'),2800);
  await say(sp('YOU','Wednesday, Atuk.'),1800);
  await csleep(900);
  await say(sp('ATUK','Wednesday. Okay. ...Wednesday.'),2400);
  await say(sp('YOU','Atuk, do you smell smoke?'),2000);
  await say(sp('ATUK','Dapur. Always the kitchen. Go, see the customers.'),2800);
  await camTo(P.x,P.z,0,0,700);
  G.state='d3_look';setClock('7:20 AM');ci=0;objT(LK[0].obj);G.busy=false;await cineOut()}

/* ---------- ask each customer: nobody answers straight ---------- */
let ci=0;
const Y=t=>say(sp('YOU',t),2200);
const LK=[
 {obj:'Ask Mak Cik Salmah',m:[-2.2,-2.6],c:1,pit:-.45,clk:'8:05 AM',run:async c=>{await Y('Mak Cik... your hand. Are you okay?');await say('"Teh tarik, adik. Panas-panas."',2600,c);await say('She slides her hand under the table. A shiny red mark, up to the wrist.',3000)}},
 {obj:'Ask Ah Seng',m:[-2.15,-.85],c:0,pit:-.55,clk:'8:40 AM',run:async c=>{await Y('Ah Seng, your watch stopped.');await say('"Teh-C peng."',2200,c);await say('The hands are frozen at 12:41.',2600)}},
 {obj:'Ask Raj',m:[-3.95,.4],c:2,pit:-.7,clk:'9:15 AM',run:async c=>{await Y('Raj. Where is your other shoe?');await say('"Kopi-O kurang manis, boss."',2400,c);await say('One shoe. Only ever one shoe.',2400)}},
 {obj:'Ask Mei Ling',m:[-.9,1.15],c:4,pit:-.3,clk:'9:50 AM',run:async c=>{await Y('Mei Ling, how is your daughter?');await say('"Her birthday is next week. I must buy a cake..."',3000,c);await say('"Milo dinosaur."',1800,c);await say('She said "next week" yesterday too.',2600)}},
 {obj:'Ask Pak Hassan',m:[-.9,-.5],c:3,pit:-.5,clk:'10:30 AM',run:async c=>{await Y('Pak Hassan, that page again?');await say('"Kopi. Roti bakar."',2200,c);await say('Page seven. The print is smudged, like it got wet.',3000)}}];
WPS.d3_look={get x(){return LK[Math.min(ci,LK.length-1)].m[0]},get z(){return LK[Math.min(ci,LK.length-1)].m[1]},r:.6,go:1,get fn(){return lookRun}};
async function lookRun(){if(G.busy||CINE.on)return;G.busy=true;const k=LK[ci],c=CROWD[k.c];A.click();await cineIn();
  await camTo(k.m[0],k.m[1],yawTo(c.position.x,c.position.z),0,900);
  await camTo(k.m[0],k.m[1],yawTo(c.position.x,c.position.z),k.pit,700);
  await k.run(c);
  await camTo(k.m[0],k.m[1],yawTo(c.position.x,c.position.z),0,500);
  setClock(k.clk);ci++;
  if(ci>=LK.length){G.state='d3_tv';objT('The TV is on')}else objT(LK[ci].obj);
  G.busy=false;await cineOut()}

/* ---------- the TV ---------- */
WPS.d3_tv={x:3.4,z:.5,r:.6,go:1,fn:tvScene};
async function tvScene(){if(G.busy||CINE.on)return;G.busy=true;await cineIn();
  await camTo(3.4,.5,yawTo(4.9,.5),.27,1200);
  tvSet('static');A.static(.2);await say('The TV turned itself on. Static.',2400);
  tvSet('news');A.static(.08);await csleep(600);
  await say('"...sebuah lori hilang kawalan dan melanggar sebuah kedai kopi di Jalan—"',3400);
  tvSet('static');A.static(.5);await csleep(500);
  tvSet('off');A.static(0);A.tone(60,40,.7,.1,'sine');await csleep(900);
  await camTo(3.4,.5,yawTo(atuk.position.x,atuk.position.z),0,1100);
  await say(sp('YOU','Atuk... did you hear that?'),2200);
  await say(sp('ATUK','Hear what?'),1800);
  await say('He is staring at the black screen. He did not blink.',2800);
  G.state='d3_talk';setClock('11:45 AM');objT('Talk to Atuk');G.busy=false;await cineOut()}

/* ---------- Atuk forgets ---------- */
WPS.d3_talk={x:2.8,z:3.05,r:.6,go:1,fn:atukTalk};
WPS.d3_rule={x:2.8,z:3.05,r:.6,go:1,fn:atukRule};
async function atukTalk(){if(G.busy||CINE.on)return;G.busy=true;await cineIn();
  await pace(2.95,3.05);await camTo(P.x,P.z,yawTo(atuk.position.x,atuk.position.z),.02,500);
  await say(sp('ATUK','Eh, you ah. Who make the kopi today?'),2400);
  await say(sp('YOU','Me, Atuk. I did.'),1800);
  await say(sp('ATUK','Oh. ...Good. Atuk forget things lately.'),2800);
  await say(sp('YOU','The TV said "lorry". A kopitiam.'),2400);
  await csleep(1100);
  await say(sp('ATUK','TV rosak. Don\'t watch. Don\'t ask.'),2600);
  $('fade').style.transition='opacity 1.4s';$('fade').style.opacity=1;await sleep(1600);
  showCrowd(false);atuk.visible=true;atuk.position.set(3.9,0,3.5);atuk.rotation.y=1.0;
  setTime('dusk');setClock('5:40 PM');P.x=.6;P.z=2.3;P.yaw=-2.14;P.pitch=0;P.tx=null;
  await card('EVENING','5:40 PM',1800);
  $('fade').style.opacity=0;G.state='d3_rule';objT('Talk to Atuk');G.busy=false;await cineOut()}
async function atukRule(){if(G.busy||CINE.on)return;G.busy=true;await cineIn();
  await pace(2.95,3.05);await camTo(P.x,P.z,yawTo(atuk.position.x,atuk.position.z),.02,500);
  await say(sp('ATUK','Dengar ah. Tonight, if anybody knock...'),2600);
  await csleep(1300);
  await say(sp('ATUK','...Eh. What I was going to say?'),2400);
  await say(sp('YOU','Three knocks, Atuk. Only three.'),2400);
  await csleep(800);
  await say(sp('ATUK','Yes. Three knock. Good boy. You remember better than Atuk now.'),3200);
  await say(sp('ATUK','Atuk balik dulu. Lock properly.'),2200);
  G.state='d3_lock';objT('Lock up');setClock('6:00 PM');G.busy=false;atukLeave();await cineOut()}

/* ---------- lock up: someone across the road ---------- */
WPS.d3_lock={x:.3,z:5.3,r:.6,go:1,fn:lockUp};
async function lockUp(){if(G.busy||CINE.on||D.walking)return;G.busy=true;await cineIn();
  await camTo(.3,5.2,yawTo(0,3.9),.1,900);
  handAct('lift',2000);A.scrape();await tween(k=>{shutter.position.y=3.6-2.4*k;P.pitch=.1-.25*k},1800);shutBlock(true);
  A.click();handAct('reach',1200);await say('You pull the padlock through. Click.',2200);
  await csleep(500);
  await camTo(.3,5.2,yawTo(6.1,14),0,1000);
  await csleep(400);
  /* you turn back toward the shop... and it is right there, in the road */
  await camTo(.3,5.2,yawTo(0,3.9),0,500);
  FIG.position.set(-.1,0,8.3);FIG.visible=true;A.sting();applyLights(0);
  await camTo(.3,5.2,yawTo(-.1,8.3),.02,260);
  await tween(k=>{P.pitch=.02+Math.sin(k*40)*.03*(1-k)},300);
  await csleep(1500);
  $('fade').style.transition='opacity .08s';$('fade').style.opacity=1;await sleep(260);FIG.visible=false;applyLights(1);$('fade').style.opacity=0;
  await csleep(900);
  await say('Gone.',1600);
  await camTo(.3,5.2,yawTo(6.1,14),0,1100);
  G.state='d3_home';window.__doorG.rotation.y=0;setClock('6:10 PM');objT('Go home');G.busy=false;await cineOut()}
WPS.d3_home={x:6.1,z:14.0,r:.6,go:1,fn:homeNight};

/* ---------- home, then a man crying outside ---------- */
async function cry(n){for(let i=0;i<n;i++){A.tone(170+Math.random()*40,140,.55,.05,'sine');A.tone(340+Math.random()*60,280,.4,.018,'sine');await csleep(520+Math.random()*260)}}
async function homeNight(){if(G.busy||CINE.on)return;G.busy=true;await cineIn();const dg=window.__doorG;dg.rotation.y=0;
  await camTo(6.1,13.5,yawTo(6.1,15),.03,900);
  handAct('knock',2300);for(let i=0;i<3;i++){A.knock();await csleep(650)}
  await csleep(600);A.tone(170,110,.7,.05,'sawtooth');
  atuk.visible=true;atuk.position.set(6.1,0,15.85);atuk.rotation.y=0;pose(atuk,0,'stand');
  await tween(k=>{dg.rotation.y=-1.25*k},900);
  await say(sp('ATUK','Three knock. Okay. Masuk. Tidur.'),2400);
  await camTo(6.1,15.4,Math.PI,0,900);
  atuk.visible=false;await camTo(6.1,16.3,Math.PI,0,700);
  await tween(k=>{dg.rotation.y=-1.25*(1-k)},700);A.tone(90,60,.25,.18,'sine');A.click();
  $('fade').style.transition='opacity 1.2s';$('fade').style.opacity=1;await sleep(1400);
  setTime('night');applyLights(.12);bulbSet(0);setClock('3:07 AM');drawClock(3,7);
  CINE.noclip=true;EYE.y=.62;P.x=14.5;P.z=17.0;P.yaw=0;P.pitch=.55;
  await card('3:07 AM','Night 3',2200);
  $('fade').style.transition='opacity 1.6s';$('fade').style.opacity=0;await sleep(1800);
  await say('Something outside. Very faint.',2400);
  await cry(3);
  await say('A man. Crying.',2200);
  await cry(3);
  await say('"...maaf... maaf..."',3000);
  await cry(4);
  await say(sp('YOU','...Atuk?'),1800);
  await csleep(1400);
  await say('No answer from his room.',2200);
  await csleep(1200);
  await say('The crying stops. Then, a soft sound, like someone sitting down against the door.',3600);
  $('fade').style.transition='opacity 2s';$('fade').style.opacity=1;await sleep(2400);
  CINE.noclip=false;EYE.y=1.6;haze.style.opacity=0;await cineOut();
  $('endh').textContent='END OF DAY 3';$('endp').textContent='Somebody was crying at the door. Atuk did not answer.';$('endl').textContent='Last Order · Day 4 is coming';
  $('end').style.display='flex';G.busy=false;G.state='end'}

G.day3=start}
