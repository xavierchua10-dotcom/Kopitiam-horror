/* Closing time, Day 1: the back lane + three chores (mop, cups, trash). Each one ends with something watching. */
export default function install(G){
const {THREE,scene,camera,P,EYE,A,CINE,WPS,ZONES,AABB,cupsD,M,B,box,ctex,
  $,sleep,say,sp,cineIn,cineOut,camTo,yawTo,csleep,tween,handAct,objT,setClock,applyLights,flicker}=G;
const yawFrom=G.yawFrom;
const T=THREE;

/* ---------- the back lane (east of the kitchen) ---------- */
let kw=null;scene.children.forEach(o=>{if(o.isMesh&&o.geometry.type==='PlaneGeometry'&&Math.abs(o.position.x-5)<.01&&Math.abs(o.position.z+5.5)<.01&&o.geometry.parameters.width===3)kw=o});
if(kw){scene.remove(kw);const km=kw.material;
  const seg=(w,h,y,z)=>{const m=new T.Mesh(new T.PlaneGeometry(w,h),km);m.position.set(5,y,z);m.rotation.y=-Math.PI/2;scene.add(m)};
  seg(1.35,3,1.5,-6.325);seg(.55,3,1.5,-4.275);seg(1.1,.8,2.6,-5.1)}
const wood=M(0x5a3a28);
box(.1,2.2,.1,wood,5,1.1,-5.65);box(.1,2.2,.1,wood,5,1.1,-4.55);box(.1,.1,1.2,wood,5,2.2,-5.1);
const DC=Math.PI/2,DO=.35;
const KDOOR=new T.Group();KDOOR.position.set(5.05,0,-4.55);KDOOR.rotation.y=DC;scene.add(KDOOR);
{const l=new T.Mesh(new T.BoxGeometry(1.08,2.1,.05),M(0x6b7a80));l.position.set(.54,1.05,0);KDOOR.add(l);
 const h=new T.Mesh(new T.BoxGeometry(.2,.05,.07),M(0xc9c9c9));h.position.set(.95,1.0,.05);KDOOR.add(h)}
const dAt=k=>{KDOOR.rotation.y=DC+(DO-DC)*k};
const conc=ctex(64,64,c=>{c.fillStyle='#8d8d88';c.fillRect(0,0,64,64);c.strokeStyle='rgba(20,20,20,.4)';c.strokeRect(0,0,64,64)},4,3);
const lf=new T.Mesh(new T.PlaneGeometry(5.5,6.5),M(0xffffff,{map:conc}));lf.rotation.x=-Math.PI/2;lf.position.set(7.75,.005,-6.2);scene.add(lf);
const brick=ctex(64,64,c=>{c.fillStyle='#7a3f2d';c.fillRect(0,0,64,64);for(let y=0;y<64;y+=8)for(let x=(y/8%2)*8;x<64;x+=16){c.fillStyle=`hsl(${12+Math.random()*8},45%,${42+Math.random()*12}%)`;c.fillRect(x+1,y+1,14,6)}},3,1);
const bm=M(0xffffff,{map:brick,side:T.DoubleSide});
const bw=(w,x,z,ry)=>{const m=new T.Mesh(new T.PlaneGeometry(w,4.2),bm);m.position.set(x,2.1,z);m.rotation.y=ry;scene.add(m)};
bw(6.6,10.5,-6.2,-Math.PI/2);bw(5.5,7.75,-9.5,0);bw(2.5,5,-8.25,-Math.PI/2);bw(5.5,7.75,-2.9,0);
box(5.5,.1,6.6,M(0x1c1c1e),7.75,4.25,-6.2);
box(1.6,.12,.5,M(0x555555),6.0,3.0,-5.1);
const bin=(x,z,col,ry)=>{box(.75,1.0,.75,M(col),x,.5,z);box(.8,.08,.8,M(0x222222),x,1.04,z);AABB.push([x-.42,x+.42,z-.42,z+.42])};
bin(8.9,-8.7,0x2f6b3a);bin(9.85,-8.5,0x2f6b3a);bin(7.9,-8.8,0x1f4f7a);
const bag=(x,y,z,s=1)=>{const m=new T.Mesh(new T.SphereGeometry(.28*s,7,6),M(0x111114));m.scale.y=.85;m.position.set(x,y,z);scene.add(m);return m};
bag(6.6,.24,-8.8);bag(6.15,.22,-8.5,.9);bag(6.9,.2,-8.3,.8);
box(.8,.5,.6,M(0x9a7a52),6.2,.25,-6.7);box(.6,.4,.5,M(0xa88a60),6.45,.7,-6.6);AABB.push([5.8,6.6,-7.05,-6.35]);
box(.5,.35,.5,M(0x8a6a3a),9.5,.17,-4.4);box(.5,.35,.5,M(0x8a6a3a),9.5,.52,-4.4);AABB.push([9.2,9.8,-4.7,-4.1]);
{const mb=new T.Mesh(new T.CylinderGeometry(.2,.16,.3,8),M(0xd4b000));mb.position.set(5.8,.15,-6.1);scene.add(mb);box(.03,1.1,.03,M(0x8a5a3a),5.7,.8,-6.1)}
const pud=new T.Mesh(new T.CircleGeometry(.7,16),new T.MeshBasicMaterial({color:0x2a3138,transparent:true,opacity:.55}));pud.rotation.x=-Math.PI/2;pud.scale.y=.6;pud.position.set(7.8,.012,-6.6);scene.add(pud);
box(.5,.01,.5,M(0x1a1a1a),8.6,.012,-5.6);
box(.2,.1,.2,M(0x333333),5.15,2.55,-5.1);
const lc=document.createElement('canvas');lc.width=lc.height=64;{const x=lc.getContext('2d'),g=x.createRadialGradient(32,32,2,32,32,32);g.addColorStop(0,'rgba(255,235,170,.95)');g.addColorStop(.35,'rgba(255,200,110,.3)');g.addColorStop(1,'rgba(255,190,100,0)');x.fillStyle=g;x.fillRect(0,0,64,64)}
const LGLOW=new T.Sprite(new T.SpriteMaterial({map:new T.CanvasTexture(lc),transparent:true,depthWrite:false,blending:T.AdditiveBlending,fog:false}));LGLOW.scale.set(3.4,3.4,1);LGLOW.position.set(5.6,2.45,-5.1);scene.add(LGLOW);
const LBULBM=new T.MeshBasicMaterial({color:0xfff0c0});const LBULB=new T.Mesh(new T.SphereGeometry(.07,8,6),LBULBM);LBULB.position.set(5.4,2.45,-5.1);scene.add(LBULB);
const laneLamp=f=>{LGLOW.material.opacity=f;LBULBM.color.setRGB(f+.05*(1-f),.94*f+.05*(1-f),.75*f+.05*(1-f))};laneLamp(1);
const lampFlick=async pat=>{for(const v of pat){laneLamp(v);await sleep(60+Math.random()*60)}laneLamp(1)};
/* walkable + blocking */
ZONES.push([4.6,5.6,-5.6,-4.6],[5.6,9.9,-8.9,-3.4]);
const doorBlock=[4.92,5.18,-5.68,-4.52];AABB.push(doorBlock);

/* ---------- closing-time props ---------- */
const CUPS2=[[-3.15,.8,1.1],[-2.85,.8,1.3],[-1.6,.8,.35],[2.7,.8,-1.7],[3.0,.8,-1.95]].map(([x,y,z])=>{const m=new T.Mesh(new T.CylinderGeometry(.06,.05,.09,6),M(0xe4e0d2));m.position.set(x,y,z);m.visible=false;scene.add(m);return m});
const SBIN=new T.Group();SBIN.position.set(4.5,0,-2.2);scene.add(SBIN);
{const b=new T.Mesh(new T.CylinderGeometry(.24,.2,.62,10),M(0x777c82));b.position.y=.31;SBIN.add(b);const r=new T.Mesh(new T.CylinderGeometry(.26,.26,.03,10),M(0x4a4e53));r.position.y=.63;SBIN.add(r)}
SBIN.visible=false;
const BAGW=new T.Mesh(new T.SphereGeometry(.2,7,6),M(0x111114));BAGW.scale.y=.9;BAGW.position.set(4.5,.66,-2.2);BAGW.visible=false;scene.add(BAGW);
const WET=new T.Mesh(new T.PlaneGeometry(3.4,2.6),new T.MeshBasicMaterial({color:0x14171d,transparent:true,opacity:0,depthWrite:false}));WET.rotation.x=-Math.PI/2;WET.position.set(.4,.014,.9);scene.add(WET);
/* the mop, held in front of the camera */
const MOP=new T.Group();camera.add(MOP);MOP.visible=false;
{const nm=(c)=>{const m=new T.MeshBasicMaterial({color:c,depthTest:false});return m};
 const st=new T.Mesh(new T.CylinderGeometry(.018,.018,1.15,6),nm(0x8a6a44));st.position.set(0,.55,0);st.renderOrder=45;MOP.add(st);
 const hd=new T.Mesh(new T.BoxGeometry(.3,.04,.18),nm(0x777777));hd.position.set(0,-.02,0);hd.renderOrder=45;MOP.add(hd);
 for(let i=0;i<9;i++){const s=new T.Mesh(new T.BoxGeometry(.028,.16,.05),nm(i%2?0xd8d6cc:0xc4c2b6));s.position.set(-.12+i*.03,-.1,0);s.rotation.z=(i-4)*.05;s.renderOrder=46;MOP.add(s)}}
const TB=new T.Mesh(new T.SphereGeometry(.17,7,6),new T.MeshBasicMaterial({color:0x111114,depthTest:false}));TB.scale.y=1.1;TB.renderOrder=44;TB.visible=false;camera.add(TB);
const CFALL=new T.Mesh(new T.CylinderGeometry(.06,.05,.09,6),M(0xe4e0d2));CFALL.visible=false;scene.add(CFALL);

const pace=(x,z,ms,bag)=>{const x0=P.x,z0=P.z;let st=0;return tween(k=>{const e=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;P.x=x0+(x-x0)*e;P.z=z0+(z-z0)*e;st++;EYE.y=1.6+Math.sin(performance.now()/110)*.03;if(st%16===0)A.step()},ms).then(()=>{EYE.y=1.6})};
const FIG=()=>G.FIG;
const faceFig=(x,z)=>{const f=FIG();f.position.set(x,0,z);f.rotation.y=Math.atan2(P.x-x,P.z-z);f.visible=true};
const look=(x,z,pitch=0,ms=650)=>camTo(P.x,P.z,yawTo(x,z),pitch,ms);

/* ---------- the three chores ---------- */
const CL=[
 {x:.6,z:1.0,tx:-1.0,tz:1.0,obj:'Mop the floor',fn:()=>run(0)},
 {x:-3.0,z:-.2,tx:-3.7,tz:-.2,obj:'Clear the cups',fn:()=>run(1)},
 {x:3.0,z:-2.3,tx:4.5,tz:-2.2,obj:'Take the trash out',fn:()=>run(2)},
 {x:4.15,z:-5.1,tx:5.0,tz:-5.1,obj:'Open the back door',fn:()=>run(3)},
 {x:8.1,z:-7.5,tx:8.9,tz:-8.7,obj:'Throw the trash',fn:()=>run(4)}];
let ci=0,CLD=1;
WPS.d1_close={get x(){return CL[ci].x},get z(){return CL[ci].z},get tx(){return CL[ci].tx},get tz(){return CL[ci].tz},get lab(){return CL[ci].obj},manual:true,r:.6,go:1,get fn(){return CL[ci].fn}};
WPS.d2_close=WPS.d1_close;
G.closeJump=n=>{ci=n;objT(CL[n].obj)};
G.closeInit=(dn=1)=>{CLD=dn;lkDone=false;lnS=0;lnLook=0;lnSide=0;lnPrev=null;dsShut=false;ci=0;CFALL.position.set(3.3,.97,-6.45);CFALL.rotation.set(0,0,0);CFALL.scale.setScalar(1.7);CFALL.visible=true;dAt(0);if(AABB.indexOf(doorBlock)<0)AABB.push(doorBlock);SBIN.visible=true;CUPS2.forEach(m=>m.visible=true);BAGW.visible=false;setClock('6:05 PM');objT(CL[0].obj)};
async function run(i){if(G.busy||CINE.on||i!==ci)return;G.busy=true;A.click();await cineIn();
  await [mop,cups,bagUp,backDoor,throwBag][i]();
  setClock(['6:12 PM','6:20 PM','6:24 PM','6:27 PM','6:36 PM'][i]);ci++;if(ci>=CL.length){G.state='d'+CLD+'_lock';objT('Lock up')}else objT(CL[ci].obj);
  await camTo(P.x,P.z,P.yaw,0,500);G.busy=false;await cineOut()}

/* 1. mop — something stands at the back of the dark shop */
async function mop(){
  MOP.position.set(.24,-.22,-.8);MOP.rotation.set(-.3,0,-.12);MOP.visible=true;
  await Promise.all([camTo(1.7,.9,Math.PI/2+.1,-.5,1000),tween(k=>{EYE.y=1.6-.28*k},1000)]);
  await say('Mop the floor. Every night, same thing.',2200);
  const t0=performance.now();let nx=0,scared=false;
  await tween(k=>{
    const sw=Math.sin(k*30);P.x=1.7-3.2*k;P.yaw=Math.PI/2+.1+sw*.16;
    MOP.position.set(.24+sw*.08,-.22,-.8);MOP.rotation.set(-.3,0,-.12+sw*.1);
    WET.material.opacity=Math.min(.3,k*.9);
    if((performance.now()-t0)/420>nx){nx++;A.nz(.35,700,400,.08);if(nx%2)A.step();else G.SFX&&G.SFX.play('slosh',{g:.5,wet:.2,rate:.9+Math.random()*.2})}},3600);
  MOP.visible=false;
  await tween(k=>{WET.material.opacity=.3*(1-k)},900);WET.material.opacity=0;
  await say('Wet floor. It will be dry by morning.',2200)}

/* 2. cups — something stands out in the street, watching */
async function cups(){
  const stops=[[[-2.2,1.2],[0,1],-3,1.2],[[-1.0,-.1],[2],-1.7,.3],[[2.8,-.8],[3,4],2.8,-1.8]];
  for(let s=0;s<stops.length;s++){const [[px,pz],idx,tx,tz]=stops[s];
    await camTo(px,pz,yawFrom(px,pz,tx,tz),-.55,s?800:1000);
    for(const j of idx){const m=CUPS2[j],p0=m.position.clone();handAct('reach',800);
      await tween(k=>{m.position.set(p0.x+(px-p0.x)*k,p0.y+.4*k,p0.z+(pz-p0.z)*k);m.scale.setScalar(1+.6*k)},520);
      A.clink();m.visible=false;await csleep(220)}
    if(s===0&&G.KC&&G.KC.visible){const m=G.KC,p0=m.position.clone(),s0=m.scale.x;handAct('reach',800);
      await tween(k=>{m.position.set(p0.x+(px-p0.x)*k,p0.y+.4*k,p0.z+(pz-p0.z)*k);m.scale.setScalar(s0*(1+.6*k))},520);
      A.clink();m.visible=false;m.position.copy(p0);m.scale.setScalar(s0);await csleep(220)}
  }
  /* to the bin */
  await Promise.all([pace(3.0,-2.3,1300),camTo(3.0,-2.3,yawFrom(3.0,-2.3,4.5,-2.2),-.6,1300)]);
  for(let i=0;i<5;i++){A.tone(2400-i*120,1800,.08,.05);A.nz(.08,3000,1800,.05,'highpass');await csleep(260)}
  BAGW.visible=true;
  await say('All the cups. Into the bin. The bag is full.',2400)}

/* 3. trash, in three taps: pick up the bag, open the back door, throw it in the lane bin */
async function bagUp(){
  await camTo(P.x,P.z,yawFrom(P.x,P.z,4.5,-2.2),-.6,800);
  handAct('reach',1500);await csleep(500);A.nz(.3,500,300,.1);G.SFX&&G.SFX.play('bag',{g:.7,wet:.15});
  {const bx=BAGW.position.x,bz=BAGW.position.z;await tween(k=>{BAGW.position.set(bx+(P.x+Math.sin(-P.yaw)*.55-bx)*k,.66+.55*k,bz+(P.z-Math.cos(P.yaw)*.55-bz)*k)},650)}
  BAGW.visible=false;BAGW.position.set(4.5,.66,-2.2);
  TB.visible=true;TB.position.set(.22,-.42,-.62);
  await csleep(500);await say('Heavy. Out the back, then.',1900)}
async function backDoor(){
  CINE.noclip=true;
  await camTo(P.x,P.z,yawFrom(P.x,P.z,5.05,-5.1),-.08,700);
  handAct('reach',1500);await csleep(600);A.click();A.nz(.8,300,520,.1,'bandpass',4);
  await tween(k=>dAt(Math.min(1,k*1.1)),900);
  const di=AABB.indexOf(doorBlock);if(di>=0)AABB.splice(di,1);
  CINE.noclip=false;
  A.tone(70,50,.5,.08,'sine');lampFlick([.4,1,.15,.9]);await flicker([.5,0,.7,.2,1],85);
  await say('Cold air from the lane. The lights flicker once.',2200)}
async function throwBag(){
  CINE.noclip=true;
  await camTo(P.x,P.z,yawFrom(P.x,P.z,8.9,-8.7),-.3,800);
  await pace(8.2,-7.4,900);
  await camTo(P.x,P.z,yawTo(8.9,-8.7),-.3,500);
  await lampFlick([.4,1,.2,.8]);
  /* lid up, bag in */
  handAct('reach',1500);await csleep(700);A.nz(.3,600,300,.12);await csleep(300);
  TB.visible=false;A.nz(.25,200,90,.3,'lowpass');A.tone(90,60,.3,.2);
  await csleep(700);
  await say('Done. Shutter, then home.',1700);
  if(CLD===2){CINE.noclip=false;TB.visible=false;SBIN.visible=false;return}   /* Day 2: you walk back yourself */
  /* back inside: the door stays open, a cup rolls off the counter by itself */
  await pace(6.4,-5.1,1500);await camTo(P.x,P.z,yawFrom(P.x,P.z,5.1,-5.1),0,500);
  await pace(4.1,-5.1,1800);
  await camTo(P.x,P.z,yawFrom(P.x,P.z,3.2,-6.2),-.3,800);
  await csleep(900);
  if(CLD===1){await tween(k=>{CFALL.position.set(3.3,.97,-6.45+.1*k);CFALL.rotation.x=k*.45},500);
   A.tone(900,700,.03,.03);
   camTo(P.x,P.z,yawFrom(P.x,P.z,3.2,-6.0),-.55,900);await tween(k=>{CFALL.position.set(3.3-.05*k,.97-.9*k*k,-6.35+.25*k);CFALL.rotation.x=.45+k*2.4},420);
   A.clink();await tween(k=>{CFALL.position.set(3.25-.35*k,.08+Math.sin(k*Math.PI)*.06,-6.1+.2*k);CFALL.rotation.x=Math.PI/2;CFALL.rotation.z=k*2.4},560);A.clink()}
  if(CLD===1){await csleep(1200);
  await say('A cup rolls off the counter. Nobody touched it.',2400)}
  await camTo(P.x,P.z,yawFrom(P.x,P.z,5.1,-5.1),0,700);
  handAct('reach',1200);await csleep(400);
  await tween(k=>dAt(1-k),700);A.click();
  await csleep(400);
  CINE.noclip=false;SBIN.visible=false;TB.visible=false;if(AABB.indexOf(doorBlock)<0)AABB.push(doorBlock)}
/* ---------- Day 1 closing: something stands in the kitchen, watching. You turn, it stares, you say we are closing, it is gone. ---------- */
let lkDone=false;const LKX=3.8,LKZ=-4.75;
/* Day 2: free roam after the last bag. Turn from the bins toward the door and it is standing at your shoulder, on the side you are turning away from. Look at it and the lamp flickers; it is gone. */
let lnS=0,lnLook=0,lnSide=0,lnPrev=null,lnT=0,dsShut=false;
const lnGone=async()=>{lnS=2;G.busy=true;const F=G.FIG;lampFlick([.4,0,.8,.1,1]);await flicker([.45,0,.7,.2,1]);F.visible=false;G.busy=false};
G.tick.push(dt=>{
  if(G.state!=='d2_lock'||CINE.on||G.busy)return;
  const F=G.FIG;
  /* the back door closes by itself once you are back inside */
  if(!dsShut&&P.x<4.7&&KDOOR.rotation.y!==DC){dsShut=true;G.busy=true;(async()=>{await tween(k=>dAt(1-k),700);A.click();if(AABB.indexOf(doorBlock)<0)AABB.push(doorBlock);G.busy=false})();return}
  if(lnS===0){
    if(P.x<5.4){lnS=2;return}
    if(P.x<5.6||P.z>-3.4)return;
    const toDoor=Math.atan2(-(5.0-P.x),-(-5.1-P.z));let df=toDoor-P.yaw;df=Math.atan2(Math.sin(df),Math.cos(df));
    if(lnPrev!==null){let dy=P.yaw-lnPrev;dy=Math.atan2(Math.sin(dy),Math.cos(dy));if(Math.abs(dy)>.003)lnSide=dy>0?-1:1}   /* turning left: it is on your right */
    lnPrev=P.yaw;
    if(Math.abs(df)<1.0){if(!lnSide)lnSide=df>0?-1:1;const a=P.yaw+lnSide*.87;
      F.position.set(P.x-Math.sin(a)*.95,0,P.z-Math.cos(a)*.95);F.userData.sit=false;F.userData.d2sit=false;F.visible=true;lnS=1;lnT=0;lnLook=0;
      try{G.AMB.duck(3000)}catch(_){}A.tone(48,40,2.2,.14,'sine')}
    return}
  if(lnS===1){
    F.rotation.y=Math.atan2(P.x-F.position.x,P.z-F.position.z);lnT+=dt;
    const d=Math.hypot(P.x-F.position.x,P.z-F.position.z);
    let b=Math.atan2(-(F.position.x-P.x),-(F.position.z-P.z))-P.yaw;b=Math.abs(Math.atan2(Math.sin(b),Math.cos(b)));
    if(b<.6)lnLook+=dt;
    if(lnLook>1.7||P.x<4.9||lnT>14||d<.6)lnGone()}});
async function lockStare(cine){
  if(lkDone)return;lkDone=true;const F=G.FIG,was=G.busy;G.busy=true;
  F.position.set(LKX,0,LKZ);F.rotation.y=yawFrom(LKX,LKZ,P.x,P.z)+Math.PI;
  F.visible=true;
  if(cine)await camTo(P.x,P.z,yawFrom(P.x,P.z,LKX,LKZ),0,900);
  try{G.AMB.duck(4000)}catch(_){}A.tone(48,40,2.2,.14,'sine');
  await csleep(2200);
  await say(sp('YOU>HIM','We... we are closing.'),2200);
  await csleep(500);
  await flicker([.45,1]);F.visible=false;await csleep(900);
  await say(sp('YOU','...Did I not sleep enough?'),2600);
  G.busy=was}
G.lockStare=lockStare;
G.lockReveal=()=>{if(!lkDone){G.FIG.position.set(LKX,0,LKZ);G.FIG.visible=true}};
G.tick.push(dt=>{
  if(G.state!=='d1_lock'||lkDone||CINE.on||G.busy)return;
  {const F=G.FIG,d=Math.hypot(P.x-LKX,P.z-LKZ);let a=Math.atan2(-(LKX-P.x),-(LKZ-P.z))-P.yaw;a=Math.abs(Math.atan2(Math.sin(a),Math.cos(a)));
   if(!F.visible&&d>6&&a>1.0){F.position.set(LKX,0,LKZ);F.visible=true}   /* it is already standing there before you ever turn */
   if(F.visible)F.rotation.y=Math.atan2(P.x-LKX,P.z-LKZ)}
  if(P.z<2.0||P.z>4.6)return;
  const dy=Math.abs(Math.atan2(Math.sin(P.yaw),Math.cos(P.yaw)));
  if(dy<.6)lockStare(false)});

}
