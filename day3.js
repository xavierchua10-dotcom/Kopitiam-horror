/* DAY 3 — the first hint. Smoke in the air, quiet customers, half a news sentence, a figure across the road, a man crying at night. */
export default function install(G){
const {THREE,scene,camera,P,EYE,A,CINE,D,WPS,atuk,CROWD,HOME,FEET,shutter,
  $,sleep,say,sp,cineIn,cineOut,camTo,yawTo,csleep,tween,handAct,pose,objT,setClock,setTime,applyLights,bulbSet,flicker,tapOn,tapOff,STREAM,lids,startAlarm,stopAlarm,drawClock,
  showCrowd,drawBoard,day1Props,shutBlock,atukLeave,M,B,box,ctex}=G;
const yawFrom=G.yawFrom;

const pace=(x,z,sp_=1.7)=>{const x0=P.x,z0=P.z,L=Math.hypot(x-x0,z-z0);if(L<.9)return Promise.resolve();let st=0;
  return tween(k=>{const e=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;P.x=x0+(x-x0)*e;P.z=z0+(z-z0)*e;st++;EYE.y=1.6+Math.sin(performance.now()/110)*.035*Math.min(1,Math.min(k,1-k)*8);if(st%16===0)A.step()},Math.max(700,L/sp_*1000)).then(()=>{EYE.y=1.6})};
const card=async(h,sm,ms=2400)=>{const dc=$('dcard');dc.innerHTML=h+'<small>'+sm+'</small>';dc.style.opacity=1;await sleep(ms);dc.style.opacity=0};

/* smoke haze: a soft warm-grey wash over the picture, only on Day 3 */
const haze=document.createElement('div');haze.style.cssText='position:fixed;inset:0;pointer-events:none;opacity:0;transition:opacity 2.5s;z-index:3;background:radial-gradient(ellipse at 50% 55%,rgba(150,50,40,.05) 0%,rgba(120,28,24,.36) 100%);animation:lo-beat 3.4s ease-in-out infinite';
{const st=document.createElement('style');st.textContent='@keyframes lo-beat{0%,100%{filter:brightness(.8)}12%{filter:brightness(1.25)}24%{filter:brightness(.9)}36%{filter:brightness(1.15)}}';document.head.appendChild(st)}
document.body.appendChild(haze);

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
    if(tvMode==='crash'){c.fillStyle='#1a0a06';c.fillRect(0,0,96,60);for(let i=0;i<10;i++){const x=i*10+Math.random()*4,h=14+Math.random()*24;c.fillStyle=i%2?'#ff7a1a':'#ffb030';c.beginPath();c.moveTo(x-6,42);c.lineTo(x+Math.random()*3,42-h);c.lineTo(x+6,42);c.fill()}
      c.fillStyle='#c0272d';c.fillRect(0,0,96,9);c.fillStyle='#fff';c.font='bold 7px sans-serif';c.fillText('BERITA TERKINI',3,7);c.fillStyle='rgba(0,0,0,.75)';c.fillRect(0,42,96,18);c.fillStyle='#fff';c.fillText('LORI LANGGAR KEDAI KOPI',2,50);c.fillStyle='#ffd24a';c.fillText('6 MAUT · 1 TERSELAMAT',2,58)}
    const im=c.getImageData(0,0,96,60),d=im.data,amt=tvMode==='static'?1:tvMode==='crash'?.08:.35;
    for(let i=0;i<d.length;i+=4){if(Math.random()<amt){const v=60+Math.random()*190|0;d[i]=d[i+1]=d[i+2]=v}}
    c.putImageData(im,0,0)}
  tvT.needsUpdate=true}
tvSet0();
G.tick.push(()=>{if(tvMode==='off')return;const n=performance.now();if(n-tvLast>90){tvLast=n;drawTV()}});
const tvSet=m=>{tvMode=m;drawTV()};function tvSet0(){tvMode='off';drawTV()}

/* the figure across the road */
const FIG=new THREE.Group();FIG.position.set(-6,0,10.3);FIG.visible=false;scene.add(FIG);
/* the black figure: built like the other people (round head, arms, legs), all black, only the eyes are white. its front is +z at rotation 0. */
{const K=0x050506,pm=G.person(0,0,Math.PI,K,K,K,{bot:K,shoe:K,f:{}});scene.remove(pm);FIG.add(pm);pm.position.set(0,0,0);pm.rotation.y=Math.PI;pm.visible=true;pm.scale.setScalar(1.04);
 pm.userData.head.traverse(o=>{if(o.isMesh&&o.material&&o.material.map)o.material=new THREE.MeshLambertMaterial({color:0x050506})});   /* no painted face: smile and blush would make him friendly */
 const wm=new THREE.MeshBasicMaterial({color:0xf2f0e6,fog:false});
 for(const q of[-1,1]){const e=new THREE.Mesh(new THREE.PlaneGeometry(.045,.05),wm);e.position.set(q*.065,.02,.172);pm.userData.head.add(e)}
 FIG.userData.pm=pm;let ph=0,lx=null,lz=null;
 G.tick.push(dt=>{if(!FIG.visible){lx=null;return}
   if(lx!==null){const d=Math.hypot(FIG.position.x-lx,FIG.position.z-lz);
     if(d/Math.max(dt,.001)>.4&&d<3){ph+=d*3.3;G.pose(pm,ph,'walk')}else G.pose(pm,0,'stand')}
   lx=FIG.position.x;lz=FIG.position.z;pm.userData.head.rotation.x=.2})}


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
   pm=new THREE.Mesh(new THREE.PlaneGeometry(.36,.48),new THREE.MeshLambertMaterial({map:t}));pm.rotation.x=-Math.PI/2;pm.rotation.z=.12;pm.position.set(-1.7,.785,.0);scene.add(pm);goreFloor.push(pm)}
}


/* ---- blood / burn texture painting ---- */
const mkT=(w,h,draw)=>{const c=document.createElement('canvas');c.width=w;c.height=h;draw(c.getContext('2d'),w,h);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;return t};
const rnd=(a,b)=>a+Math.random()*(b-a);
const blob=(g,x,y,r,cols)=>{for(let k=0;k<cols.length;k++){g.fillStyle=cols[k];const rr=r*(1-k*.22);g.beginPath();for(let i=0;i<=12;i++){const an=i/12*Math.PI*2,rad=rr*rnd(.7,1.15);i?g.lineTo(x+Math.cos(an)*rad*1.1,y+Math.sin(an)*rad):g.moveTo(x+Math.cos(an)*rad*1.1,y+Math.sin(an)*rad)}g.closePath();g.fill()}};
const drips=(g,x,y,n,spread,len,wd)=>{for(let i=0;i<n;i++){const dx=x+rnd(-spread,spread),l=rnd(len*.4,len),w=rnd(wd*.6,wd);g.fillStyle='#4a0806';g.fillRect(dx-w/2,y,w,l);g.fillStyle='#8a100c';g.fillRect(dx-w/2+.5,y,Math.max(1,w-1.5),l);g.fillStyle='#4a0806';g.beginPath();g.arc(dx,y+l,w*.8,0,7);g.fill();g.fillStyle='#c2281c';g.fillRect(dx-w/2+.5,y+2,1,l*.6)}};
const BL=['#3c0605','#6e0b09','#a8160e'];
/* wrap-around texture for a body shell: front is at u=0 (drawn at both ends) */
const shellTex=(w,h,draw)=>mkT(w,h,(g,W,H)=>{for(const ox of[0,W])draw(g,ox,W,H)});
const shell=(parent,rt,rb,h,y,sz,tex,sx=1)=>{const m=new THREE.Mesh(new THREE.CylinderGeometry(rt,rb,h,14,1,true),new THREE.MeshLambertMaterial({map:tex,transparent:true,alphaTest:.04,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-2,side:THREE.DoubleSide}));m.position.y=y;m.scale.z=sz;m.scale.x=sx;parent.add(m);return m};
const capS=(parent,r,y,tex,sx=1,sy=1,sz=1)=>{const m=new THREE.Mesh(new THREE.SphereGeometry(r,10,8),new THREE.MeshLambertMaterial({map:tex,transparent:true,alphaTest:.04,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-2}));m.position.y=y;m.scale.set(sx,sy,sz);parent.add(m);return m};
/* paint straight onto a person's face texture so it sticks to the skin */
const faceCv=hd=>{const m=hd.children[0].material.map;return[m.image.getContext('2d'),m]};
const FP=(hd,fn)=>{const[g,m]=faceCv(hd);fn(g);m.needsUpdate=true};
const faceGash=(g,x,y,w)=>{g.fillStyle='#3c0605';g.fillRect(x,y,w,2);g.fillStyle='#a8160e';g.fillRect(x+1,y,w-2,1);g.fillStyle='#e04a3a';g.fillRect(x+2,y,2,1)};
const faceDrip=(g,x,y,l,w=2)=>{g.fillStyle='#4a0806';g.fillRect(x,y,w,l);g.fillStyle='#b01810';g.fillRect(x,y,1,l-1);g.fillStyle='#4a0806';g.fillRect(x-1,y+l,w+2,2);g.fillStyle='#c2281c';g.fillRect(x,y+l,1,1)};
const faceSoot=(g,x,y,w,h,a=.55)=>{g.fillStyle=`rgba(18,14,12,${a})`;g.fillRect(x,y,w,h);g.fillStyle=`rgba(18,14,12,${a*.6})`;g.fillRect(x-1,y+1,w+2,h-2)};
const faceBlister=(g,x,y)=>{g.fillStyle='#d9705a';g.fillRect(x,y,4,3);g.fillStyle='#f0b0a0';g.fillRect(x+1,y,2,1);g.fillStyle='#7a2a20';g.fillRect(x,y+3,4,1)};
const raw=(w,h)=>shellTex(w,h,(g,ox,W,H)=>{g.fillStyle='#c9604a';g.fillRect(ox-W*.3,0,W*.6,H);for(let i=0;i<14;i++)blob(g,ox+rnd(-W*.28,W*.28),rnd(0,H),rnd(5,12),['#3a1410','#7a2a20']);for(let i=0;i<7;i++){const x=ox+rnd(-W*.25,W*.25),y=rnd(4,H-4);g.fillStyle='#e8a090';g.beginPath();g.arc(x,y,rnd(3,5),0,7);g.fill();g.fillStyle='rgba(255,255,255,.55)';g.fillRect(x-1,y-2,2,1)}drips(g,ox,H*.55,4,W*.18,H*.4,3)});
const splat=(w,h,n,r0,dr)=>shellTex(w,h,(g,ox,W,H)=>{blob(g,ox+rnd(-W*.05,W*.05),H*.38,r0,BL);for(let i=0;i<n;i++)blob(g,ox+rnd(-W*.22,W*.22),rnd(H*.1,H*.85),rnd(3,r0*.55),BL);drips(g,ox,H*.45,dr,W*.2,H*.5,4);for(let i=0;i<30;i++){g.fillStyle=BL[1];g.beginPath();g.arc(ox+rnd(-W*.3,W*.3),rnd(0,H),rnd(.6,1.8),0,7);g.fill()}});
const soot=(w,h)=>shellTex(w,h,(g,ox,W,H)=>{for(let i=0;i<10;i++)blob(g,ox+rnd(-W*.25,W*.25),rnd(0,H),rnd(6,16),['rgba(16,13,11,.75)','rgba(16,13,11,.55)'])});
let goreDone=false;const goreFloor=[];
function goreDetails(){if(goreDone)return;goreDone=true;
  const U=i=>CROWD[i].userData;
  /* Mak Cik Salmah: raw blistered burn from hand to elbow, charred sleeve, scorched face */
  {const u=U(1);for(const arm of[u.aL,u.aR]){shell(arm.fo,.071,.06,.24,-.12,1,raw(64,48));capS(arm.fo,.078,-.26,raw(48,48))}
   shell(u.aL.up,.086,.07,.26,-.13,1,soot(64,40));shell(u.body,.249,.224,.56,1.17,.72,soot(96,48));
   FP(u.head,g=>{faceSoot(g,4,7,10,6);faceSoot(g,18,15,8,5,.45);faceBlister(g,20,12);faceBlister(g,6,16);faceBlister(g,14,9);g.fillStyle='#8a2a20';g.fillRect(3,17,6,3);faceDrip(g,22,17,5)})}
  /* Ah Seng: split forehead, blood sheeting down his face and shirt, cracked watch */
  {const u=U(0),fo=u.aL.fo,band=new THREE.Mesh(new THREE.CylinderGeometry(.068,.068,.045,10),M(0x9a9a9a));band.position.y=-.2;fo.add(band);
   const wf=new THREE.Mesh(new THREE.BoxGeometry(.05,.012,.05),new THREE.MeshBasicMaterial({color:0xe8e4d4}));wf.position.set(0,-.2,.072);fo.add(wf);
   shell(fo,.071,.06,.24,-.12,1,splat(64,48,6,10,3));capS(fo,.078,-.26,splat(48,48,3,9,2));
   shell(u.body,.249,.224,.56,1.17,.72,splat(96,64,10,16,6));
   FP(u.head,g=>{faceGash(g,6,6,11);g.fillStyle='#7a0d0a';g.fillRect(8,8,9,2);faceDrip(g,8,9,15,3);faceDrip(g,12,9,10);faceDrip(g,15,9,7);g.fillStyle='rgba(120,12,9,.8)';g.fillRect(6,11,4,8);faceSoot(g,19,14,7,6,.4)})}
  /* Raj: shoe gone, foot torn and bloody, shin skinned */
  {const u=U(2),sh=u.L.sh,shoe=sh.children[2];shoe.visible=false;
   shell(sh,.085,.069,.4,-.2,1,raw(64,64));capS(sh,.082,-.41,splat(48,48,4,10,3),1.1,.62,1.9);
   shell(u.R.sh,.085,.069,.4,-.2,1,splat(64,64,4,12,4));shell(u.body,.249,.224,.56,1.17,.72,soot(96,48));
   FP(u.head,g=>{faceSoot(g,5,8,9,5);g.fillStyle='#8a2a20';g.fillRect(17,14,7,2);g.fillStyle='#4a0806';g.fillRect(18,15,5,1);faceDrip(g,21,16,6,2);faceSoot(g,2,15,7,8,.4)})}
  /* Mei Ling: soaked top, blood from hairline through her face, bloody hands */
  {const u=U(4);shell(u.body,.249,.224,.56,1.17,.72,splat(96,64,14,24,9));
   for(const arm of[u.aL,u.aR]){shell(arm.fo,.071,.06,.24,-.12,1,splat(64,48,7,12,4));capS(arm.fo,.078,-.26,splat(48,48,4,10,2))}
   FP(u.head,g=>{g.fillStyle='#4a0806';g.fillRect(17,5,7,4);g.fillStyle='#a8160e';g.fillRect(18,5,5,3);faceDrip(g,19,8,16,3);faceDrip(g,23,8,9);faceDrip(g,15,9,6);g.fillStyle='rgba(110,12,9,.7)';g.fillRect(19,16,6,6);faceDrip(g,18,21,6)})}
  /* Pak Hassan: bruised eye, blood from nose, a bloody hand over the newspaper */
  {const t=mkT(60,80,(g)=>{g.fillStyle='#d9d2bd';g.fillRect(0,0,60,80);g.fillStyle='#2a2824';g.fillRect(4,5,52,9);g.fillStyle='#555';for(let y=20;y<74;y+=4)g.fillRect(5,y,50,1.5);
     g.fillStyle='#222';g.font='bold 8px sans-serif';g.fillText('7',27,78);g.fillStyle='rgba(30,25,20,.6)';g.beginPath();g.ellipse(30,44,22,15,.3,0,7);g.fill();
     blob(g,34,50,13,BL);g.fillStyle='#4a0806';for(const [x,w,y,l] of [[20,5,52,13],[26,5,49,16],[32,5,50,15],[38,5,52,13]]){g.fillRect(x,y,w,l);g.beginPath();g.arc(x+2,y,3,0,7);g.fill()}g.fillStyle='#4a0806';g.beginPath();g.ellipse(30,68,11,7,0,0,7);g.fill();drips(g,34,56,5,10,18,2)}),
   pm=new THREE.Mesh(new THREE.PlaneGeometry(.36,.48),new THREE.MeshLambertMaterial({map:t}));pm.rotation.x=-Math.PI/2;pm.rotation.z=.12;pm.position.set(-1.7,.785,.0);scene.add(pm);
   const u=U(3);shell(u.aR.fo,.071,.06,.24,-.12,1,splat(64,48,6,10,3));capS(u.aR.fo,.078,-.26,splat(48,48,3,9,2));shell(u.body,.249,.224,.56,1.17,.72,splat(96,64,9,15,5));
   FP(u.head,g=>{g.fillStyle='rgba(70,40,90,.75)';g.fillRect(4,10,9,6);g.fillStyle='rgba(40,20,50,.6)';g.fillRect(5,11,7,3);g.fillStyle='#4a0806';g.fillRect(14,15,3,6);g.fillStyle='#a8160e';g.fillRect(14,15,2,5);faceDrip(g,15,20,4,2);g.fillStyle='#4a0806';g.fillRect(14,21,5,2)})}
  /* floor: irregular dark pools with a wet shine, and a drip trail */
  const poolT=r=>mkT(96,96,(g)=>{blob(g,48,48,r*1.9,['#2a0403','#4a0806','#6e0b09']);for(let i=0;i<5;i++)blob(g,48+rnd(-30,30),48+rnd(-30,30),rnd(6,14),['#3c0605','#5a0908']);g.fillStyle='rgba(255,170,150,.35)';g.fillRect(40,38,16,3)});
  for(const [x,z,r] of [[-3,-1.0,.5],[-3,.4,.55],[-1.7,-.5,.45],[-1.7,1.1,.5],[-3,-2.6,.4]]){const p=new THREE.Mesh(new THREE.PlaneGeometry(r*2,r*2),new THREE.MeshLambertMaterial({map:poolT(14),transparent:true,alphaTest:.04,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-2}));p.rotation.x=-Math.PI/2;p.rotation.z=Math.random()*6;p.position.set(x,.014,z);scene.add(p);goreFloor.push(p)}
}

/* ---------- opening: same alarm, with smoke ---------- */
async function start(){
  G.busy=true;G.state='d3_intro';
  setTime('day');G.setLights(true);applyLights(1);bulbSet(1);tapOff();setClock('6:30 AM');
  shutter.position.y=3.6;shutBlock(false);drawBoard(3);day1Props(true);tvSet('off');FIG.visible=false;details();
  showCrowd(true);D.crowd=true;CROWD.forEach((c,i)=>{c.position.set(HOME[i][0],0,HOME[i][1]);c.rotation.y=HOME[i][2];pose(c,0,'sit')});
  atuk.position.set(3.9,0,3.5);atuk.rotation.y=1.0;pose(atuk,0,'stand');FEET.visible=false;
  window.__doorG.rotation.y=0;CINE.noclip=true;EYE.y=.62;P.x=14.5;P.z=17.0;P.yaw=0;P.pitch=1.1;P.tx=null;P.fy=null;lids(0,0);G.setBlur(true);
  $('fade').style.transition='opacity 1s';$('fade').style.opacity=1;
  await card('DAY 3',G.tm('6:30 AM'),2200);
  await cineIn();haze.style.opacity=1;
  $('fade').style.transition='opacity 1.2s';$('fade').style.opacity=0;startAlarm();await sleep(1600);
  await lids(.2,500);await sleep(240);await lids(0,220);await sleep(300);await lids(.6,560);await lids(0,200);await sleep(200);
  G.setBlur(false);await lids(1,800);
  await camTo(14.5,17.0,0,-.02,1000);
  handAct('knock',900);await sleep(480);A.click();stopAlarm();await sleep(500);
  await say(sp('YOU','...A dream. There was fire. Everyone was...'),2800);
  await say(sp('YOU','Just a dream.'),1500);
  setClock('6:55 AM');drawClock(5,55);await say(sp('YOU','5:55.'),1300);
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
  await say(sp('ATUK','Dapur. Always the kitchen. ...Eh, your face pucat. Go wash first.'),3200);
  await camTo(P.x,P.z,0,0,700);
  G.state='d3_bath';setClock('6:58 AM');tapOn();objT('Wash your face');G.busy=false;await cineOut()}

/* ---------- the bathroom: the tap will not stop, then the red words ---------- */
const bm=[];let bmG=null;
function bathBuild(){if(bmG)return;bmG=new THREE.Group();scene.add(bmG);
  const R1='#4a0806',R2='#8a0f0b';
  const mk=(w,h,px,py,draw,pos,ry)=>{const c=document.createElement('canvas');c.width=px;c.height=py;draw(c.getContext('2d'),px,py);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;
    const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map:t,transparent:true,opacity:0,depthWrite:false,fog:false,polygonOffset:true,polygonOffsetFactor:-4}));m.position.set(...pos);m.rotation.y=ry;bmG.add(m);bm.push(m)};
  const word=(txt,size)=>(g,px,py)=>{g.font=`900 ${size}px "Noto Serif CJK SC","Noto Sans CJK SC","Microsoft YaHei","PingFang SC",serif`;g.textAlign='center';g.textBaseline='middle';
    g.fillStyle=R1;g.fillText(txt,px/2+2,py*.4+2);g.fillStyle=R2;g.fillText(txt,px/2,py*.4);const w=g.measureText(txt).width;
    for(let i=0;i<Math.max(3,txt.length*2);i++){const x=px/2-w/2+Math.random()*w,y=py*.4+size*.3,l=14+Math.random()*py*.3;g.fillStyle=R2;g.fillRect(x-1.5,y,3,l);g.beginPath();g.arc(x,y+l,2.6,0,7);g.fill()}};
  const palm=(g,px,py)=>{g.save();g.translate(px/2,py*.58);g.fillStyle=R2;g.beginPath();g.ellipse(0,0,22,26,0,0,7);g.fill();
    for(const [fx,fy,fl,fr] of [[-18,-24,34,-.35],[-8,-34,40,-.1],[4,-36,40,.05],[16,-30,36,.25]]){g.save();g.translate(fx,fy);g.rotate(fr);g.fillRect(-4.5,-fl,9,fl);g.beginPath();g.arc(0,-fl,4.5,0,7);g.fill();g.restore()}
    g.save();g.translate(-22,8);g.rotate(-1.1);g.fillRect(-5,-24,10,24);g.restore();g.fillStyle=R1;for(let i=0;i<4;i++){const x=-16+i*11,l=14+Math.random()*30;g.fillRect(x-1.8,24,3.6,l);g.beginPath();g.arc(x,24+l,3.4,0,7);g.fill()}g.restore()};
  mk(.62,.82,128,170,palm,[-7.7,1.7,1.06],0);                         /* a hand on the mirror */
  mk(.9,.9,160,160,word('冤',140),[-8.75,1.85,1.06],0);                /* wall beside the mirror */
  mk(1.7,.85,360,180,word('还我命',130),[-9.46,1.75,2.5],Math.PI/2);    /* west wall */
  mk(.9,.8,200,170,word('救命',90),[-7.04,1.7,3.5],-Math.PI/2);          /* east wall */
  mk(1.2,.6,260,130,word('对不起',80),[-8.25,1.3,3.96],Math.PI)}        /* south wall */
const fadeIn=(m,ms)=>tween(k=>{m.material.opacity=.88*k},ms);
WPS.d3_bath={x:-7.7,z:2.5,r:.6,go:1,fn:bathScene};
/* the bathroom door, the floodwater, the shaking */
let leaf=null,flood=null,shk=0;
G.tick.push(()=>{const cv=$('c');if(shk>0){const a=shk;cv.style.transform=`translate(${(Math.random()-.5)*9*a}px,${(Math.random()-.5)*9*a}px) rotate(${(Math.random()-.5)*.012*a}rad) scale(1.05)`}else if(cv.style.transform)cv.style.transform=''});
function floodBuild(){if(flood)return;
  const t=ctex(64,64,c=>{c.fillStyle='#7fb2d0';c.fillRect(0,0,64,64);c.strokeStyle='rgba(255,255,255,.55)';c.lineWidth=1.2;for(const r of[8,16,24,31]){c.beginPath();c.arc(32,32,r,0,7);c.stroke()}});
  flood=new THREE.Mesh(new THREE.CircleGeometry(1,24),new THREE.MeshBasicMaterial({map:t,transparent:true,opacity:.62,depthWrite:false,fog:false,polygonOffset:true,polygonOffsetFactor:-2}));
  flood.rotation.x=-Math.PI/2;flood.position.set(-7.9,.03,1.7);flood.visible=false;scene.add(flood)}
async function bathScene(){if(G.busy||CINE.on)return;G.busy=true;await cineIn();bathBuild();floodBuild();if(G.crack)G.crack.visible=true;
  if(!leaf)leaf=scene.children.find(o=>o.isGroup&&Math.abs(o.position.x+7)<.02&&Math.abs(o.position.z-2)<.02);
  const hz0=haze.style.background,sc0=STREAM.material.color.getHex(),lf0=leaf?leaf.rotation.y:0;
  /* in: the water is already running. close the door behind you */
  await camTo(-7.7,2.5,yawFrom(-7.7,2.5,-7.7,1.1),-.05,1100);
  await say('The tap is already running. It has been running all night.',2600);
  await camTo(-7.7,2.5,yawFrom(-7.7,2.5,-6,2.5),0,900);
  if(leaf){const r0=leaf.rotation.y;await tween(k=>{leaf.rotation.y=r0+(-Math.PI/2-r0)*k},900);A.click();A.tone(120,70,.15,.2,'sine')}
  await camTo(-7.7,2.5,yawFrom(-7.7,2.5,-7.7,1.1),-.05,1000);
  /* try to shut it off: it will not shut off. it overflows */
  await say(sp('YOU','Okay. Off. Off...'),1800);
  handAct('reach',1400);await csleep(700);tapOff();A.click();await csleep(600);
  tapOn();STREAM.scale.x=2.8;A.tone(900,300,.3,.12,'sawtooth');
  const gush=setInterval(()=>A.nz(.3,4800,2800,.16,'highpass'),240);
  flood.visible=true;flood.scale.set(.3,.3,1);
  tween(k=>{const r=.3+k*2.1;flood.scale.set(r,r,1)},7000);
  await say('The handle spins loose. The water will not stop.',2800);
  await camTo(-7.7,2.5,yawFrom(-7.7,2.5,-7.7,1.7),-.75,900);
  await say('It is filling the floor. Over the sink, over everything.',2800);
  await camTo(-7.7,2.5,yawFrom(-7.7,2.5,-7.7,1.1),-.05,800);
  await say(sp('YOU','...Fucked it. Fine.'),1700);
  await camTo(-7.7,1.95,yawFrom(-7.7,1.95,-7.7,1.0),-.55,1200);
  handAct('reach',2400);await lids(0,500);A.nz(.4,3000,1200,.22,'bandpass');await csleep(1700);
  await lids(1,900);await camTo(-7.7,1.95,yawFrom(-7.7,1.95,-7.7,1.0),.02,800);
  /* the red comes in: the whole room, hard */
  A.rumble();A.tone(55,40,2.6,.3,'sine');shk=1;
  haze.style.background='radial-gradient(ellipse at 50% 50%,rgba(210,25,18,.38) 0%,rgba(120,0,0,.88) 100%)';haze.style.opacity=1;
  STREAM.material.color.set(0x8a0a0a);flood.material.color.set(0xb02020);
  flicker([.5,0,.4,0,0,.3],70);
  const hbL=setInterval(()=>{A.tone(65,40,.16,.34,'sine');setTimeout(()=>A.tone(65,40,.13,.26,'sine'),230)},1000);
  const marks=(async()=>{for(let i=0;i<bm.length;i++){fadeIn(bm[i],900);A.tone(70+i*14,40,.7,.28,'sawtooth');A.nz(.4,2400,300,.22,'bandpass',2);shk=1+i*.35;await csleep(850)}})();
  await csleep(500);await camTo(-7.7,1.95,yawFrom(-7.7,1.95,-9.4,2.2),0,1500);await csleep(700);
  await camTo(-7.7,1.95,yawFrom(-7.7,1.95,-8.4,4.0),0,1300);await csleep(400);
  await camTo(-7.7,1.95,yawFrom(-7.7,1.95,-7.7,1.0),.02,1200);await marks;
  await say('Red. On every wall. The water is red.',2400);
  await say(sp('YOU','...No. No, no, no.'),1900);
  /* blink: gone */
  await lids(0,220);shk=0;clearInterval(hbL);clearInterval(gush);tapOff();STREAM.scale.x=1;STREAM.material.color.setHex(sc0);
  bm.forEach(m=>m.material.opacity=0);flood.visible=false;flood.material.color.set(0xffffff);haze.style.background=hz0;A.click();
  if(leaf)leaf.rotation.y=lf0;await csleep(1600);
  await lids(1,900);
  await say('A drip. Only that.',2400);
  await say(sp('YOU','Just a dream.'),1800);
  await camTo(-7.9,2.6,yawFrom(-7.9,2.6,-6,2.5),0,1000);
  G.state='d3_look';setClock('7:20 AM');ci=0;objT(LK[0].obj);G.busy=false;await cineOut()}

/* ---------- ask each customer: nobody answers straight ---------- */
let ci=0;
const Y=t=>say(sp('YOU',t),2200);
const LK=[
 {obj:'Ask Mak Cik Salmah',m:[-2.2,-2.6],c:1,pit:-.45,clk:'8:05 AM',run:async c=>{await Y('Mak Cik... your hand. Are you okay?');await say('"Teh tarik, adik. Panas-panas."',2600,c);await say('She slides her hand under the table. A shiny red mark, up to the wrist.',3000)}},
 {obj:'Ask Ah Seng',m:[-2.15,-.85],c:0,pit:-.55,clk:'8:40 AM',run:async c=>{await Y('Ah Seng, your watch stopped.');await say('"Teh-C peng."',2200,c);await say('The hands are frozen at 5:48.',2600)}},
 {obj:'Ask Mei Ling',m:[-.9,1.15],c:4,pit:-.3,clk:'9:50 AM',run:async c=>{await Y('Mei Ling, how is your daughter?');await say('"Her birthday is next week. I must buy a cake..."',3000,c);await say('"Milo dinosaur."',1800,c);await say('She said "next week" yesterday too.',2600);await say(sp('YOU','It is just a bad dream. It has to be.'),2600)}}];
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
  await camTo(3.4,.5,yawFrom(3.4,.5,4.9,.5),.27,1200);
  tvSet('static');A.static(.2);await say('The TV turned itself on. Static.',2400);
  tvSet('news');A.static(.08);await csleep(600);
  await say('"...sebuah lori hilang kawalan dan melanggar sebuah kedai kopi di Jalan—"',3400);
  tvSet('static');A.static(.5);await csleep(500);
  tvSet('off');A.static(0);A.tone(60,40,.7,.1,'sine');await csleep(900);
  await camTo(3.4,.5,yawFrom(3.4,.5,atuk.position.x,atuk.position.z),0,1100);
  await say(sp('YOU','Atuk... did you hear that?'),2200);
  await say(sp('ATUK','Hear what?'),1800);
  await say('He is staring at the black screen. He did not blink.',2800);
  G.state='d3_talk';setClock('11:45 AM');objT('Talk to Atuk');G.busy=false;await cineOut()}

/* ---------- Atuk forgets ---------- */
WPS.d3_talk={x:2.8,z:3.05,r:.6,go:1,fn:atukTalk};
WPS.d3_rule={x:2.8,z:3.05,r:.6,go:1,fn:atukRule};
async function atukTalk(){if(G.busy||CINE.on)return;G.busy=true;await cineIn();
  await pace(2.95,3.05);await camTo(P.x,P.z,yawTo(atuk.position.x,atuk.position.z),.02,500);
  await say(sp('YOU','The TV said "lorry". A kopitiam.'),2400);
  await csleep(900);
  await say(sp('ATUK','TV rosak. Don\'t watch. Don\'t ask.'),2600);
  $('fade').style.transition='opacity 1.4s';$('fade').style.opacity=1;await sleep(1600);
  showCrowd(false);atuk.visible=true;atuk.position.set(3.9,0,3.5);atuk.rotation.y=1.0;
  setTime('dusk');setClock('5:40 PM');P.x=.6;P.z=2.3;P.yaw=-2.14;P.pitch=0;P.tx=null;
  await card('LATE NIGHT',G.tm('5:40 PM'),1800);
  $('fade').style.opacity=0;G.state='d3_rule';objT('Talk to Atuk');G.busy=false;await cineOut()}
async function atukRule(){if(G.busy||CINE.on)return;G.busy=true;await cineIn();
  await pace(2.95,3.05);await camTo(P.x,P.z,yawTo(atuk.position.x,atuk.position.z),.02,500);
  await say(sp('ATUK','Dengar ah. Tonight, if anybody knock, three knock only.'),3000);
  await say(sp('YOU>ATUK','Even if somebody is crying outside?'),2200);
  await csleep(900);
  await say(sp('ATUK','...Especially if somebody is crying.'),2800);
  await say(sp('ATUK','Atuk balik dulu. Lock properly.'),2200);
  G.state='d3_lock';objT('Lock up');setClock('6:00 PM');G.busy=false;atukLeave();await cineOut()}

/* ---------- lock up: someone across the road ---------- */
WPS.d3_lock={x:.3,z:5.3,r:.6,go:1,fn:lockUp};
async function lockUp(){if(G.busy||CINE.on||D.walking)return;G.busy=true;await cineIn();
  await camTo(.3,5.2,yawFrom(.3,5.2,0,3.9),.1,900);
  handAct('lift',2000);A.shutter();await tween(k=>{shutter.position.y=3.6-2.4*k;P.pitch=.1-.25*k},1800);shutBlock(true);
  A.click();handAct('reach',1200);await say('You pull the padlock through. Click.',2200);
  /* the quiet before it: dim light, a heartbeat, a footstep behind you */
  applyLights(.4);await csleep(1300);
  await camTo(.3,5.2,yawFrom(.3,5.2,6.1,14),0,1500);
  for(let i=0;i<2;i++){A.tone(52,44,.22,.22,'sine');await csleep(380);A.tone(52,44,.22,.22,'sine');await csleep(1000)}
  A.step();await csleep(600);A.step();await csleep(1100);
  /* you spin round: he is right there, face to face */
  FIG.position.set(.3,0,4.05);FIG.rotation.y=0;FIG.visible=true;
  await camTo(.3,5.2,yawFrom(.3,5.2,.3,4.05),.12,260);
  A.sting();A.nz(.6,1200,200,.4,'lowpass');applyLights(0);
  await tween(k=>{P.pitch=.12+Math.sin(k*46)*.05*(1-k);P.yaw+=Math.sin(k*60)*.004*(1-k)},520);
  await csleep(1100);
  await say('"...maaf..."',2200);
  for(let i=0;i<3;i++){A.tone(170+Math.random()*40,140,.5,.06,'sine');await csleep(420)}
  $('fade').style.transition='opacity .06s';$('fade').style.opacity=1;await sleep(240);FIG.visible=false;applyLights(1);$('fade').style.opacity=0;
  await csleep(1000);
  await say(sp('YOU','...He was crying.'),2200);
  await camTo(.3,5.2,yawFrom(.3,5.2,6.1,14),0,1100);
  G.state='d3_home';window.__doorG.rotation.y=0;setClock('6:10 PM');objT('Go home');G.busy=false;await cineOut()}
WPS.d3_home={x:6.1,z:14.0,r:.6,go:1,fn:homeNight};

/* ---------- home, then a man crying outside ---------- */
async function cry(n){for(let i=0;i<n;i++){A.tone(170+Math.random()*40,140,.55,.05,'sine');A.tone(340+Math.random()*60,280,.4,.018,'sine');await csleep(520+Math.random()*260)}}
async function homeNight(){if(G.busy||CINE.on)return;G.busy=true;await cineIn();const dg=window.__doorG;dg.rotation.y=0;
  await camTo(6.1,13.5,yawFrom(6.1,13.5,6.1,15),.03,900);
  handAct('knock',2300);for(let i=0;i<3;i++){A.knock();await csleep(650)}
  await csleep(600);A.tone(170,110,.7,.05,'sawtooth');
  atuk.visible=true;atuk.position.set(6.1,0,15.85);atuk.rotation.y=0;pose(atuk,0,'stand');
  A.door();await tween(k=>{dg.rotation.y=-1.25*k},900);
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
  CINE.noclip=false;EYE.y=1.6;await cineOut();
  if(G.day4){G.busy=false;G.state='d4_intro';G.day4();return}
  haze.style.opacity=0;
  $('endh').textContent='END OF DAY 3';$('endp').textContent='Somebody was crying at the door. Atuk did not answer.';$('endl').textContent='Last Order · Day 4 is coming';
  $('end').style.display='flex';G.busy=false;G.state='end'}

G.gore=goreDetails;G.goreVis=v=>goreFloor.forEach(o=>o.visible=v);G.details=details;G.FIG=FIG;G.tvSet=tvSet;G.haze=haze;
G.day3=start}
