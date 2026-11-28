import * as THREE from './three.module.min.js';
const $=id=>document.getElementById(id),sleep=ms=>new Promise(r=>setTimeout(r,ms));
const cv=$('c');
let renderer;
try{renderer=new THREE.WebGLRenderer({canvas:cv,antialias:false,powerPreference:'low-power'})}catch(e){document.body.insertAdjacentHTML('beforeend','<div class="card"><p>This game needs WebGL, which your browser did not start.</p></div>');throw e}
let RES=1;try{const v=parseFloat(localStorage.lo_res);if(v>=.4&&v<=1)RES=v}catch(_){}
function resize(){renderer.setPixelRatio(1);renderer.setSize(Math.max(120,Math.round(innerWidth*RES)),Math.max(200,Math.round(innerHeight*RES)),false);camera.aspect=innerWidth/innerHeight;camera.fov=camera.aspect>1?68:88;camera.updateProjectionMatrix()}
const isLand=()=>innerWidth>innerHeight*1.1;
const scene=new THREE.Scene();scene.background=new THREE.Color(0x05070a);scene.fog=new THREE.FogExp2(0x05070a,.075);
const camera=new THREE.PerspectiveCamera(88,1,.12,160);camera.rotation.order='YXZ';scene.add(camera);
addEventListener('resize',resize);

/* ---------- helpers ---------- */
const M=(c,o={})=>new THREE.MeshLambertMaterial(Object.assign({color:c,flatShading:true},o));
const B=(c,o={})=>new THREE.MeshBasicMaterial(Object.assign({color:c},o));
let SMOOTH=true;try{const v=localStorage.lo_smooth;if(v==='0')SMOOTH=false;else if(v==null&&navigator.deviceMemory&&navigator.deviceMemory<=2)SMOOTH=false}catch(_){}
function ctex(w,h,draw,rx=1,ry=1){const S=SMOOTH?4:1,c=document.createElement('canvas');c.width=w*S;c.height=h*S;const g=c.getContext('2d');g.save();g.scale(S,S);draw(g);g.restore();
  if(SMOOTH&&ry===1&&h>=20&&w>=24){const d=g.createLinearGradient(0,c.height*.62,0,c.height);d.addColorStop(0,'rgba(50,38,26,0)');d.addColorStop(1,'rgba(50,38,26,.30)');g.fillStyle=d;g.fillRect(0,c.height*.62,c.width,c.height*.38);
    for(let i=0;i<Math.max(3,w/8|0);i++){const sx=Math.random()*c.width,sw=3+Math.random()*10,sg=g.createLinearGradient(0,0,0,c.height);sg.addColorStop(0,'rgba(40,30,20,0)');sg.addColorStop(1,'rgba(40,30,20,.12)');g.fillStyle=sg;g.fillRect(sx,0,sw,c.height)}}
  if(SMOOTH&&w>=16){const id=g.getImageData(0,0,c.width,c.height),dd=id.data;for(let i=0;i<dd.length;i+=4){const n=(Math.random()-.5)*14;dd[i]+=n;dd[i+1]+=n;dd[i+2]+=n}g.putImageData(id,0,0)}
  const t=new THREE.CanvasTexture(c);if(SMOOTH){t.magFilter=THREE.LinearFilter;t.minFilter=THREE.LinearMipmapLinearFilter;t.anisotropy=4}else t.magFilter=t.minFilter=THREE.NearestFilter;t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(rx,ry);t.colorSpace=THREE.SRGBColorSpace;return t}
function box(w,h,d,mat,x,y,z,parent=scene){const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat);m.position.set(x,y,z);parent.add(m);return m}
const wallDraw=c=>{c.fillStyle='#8d8672';c.fillRect(0,0,32,32);c.fillStyle='#3f5f55';c.fillRect(0,17,32,15);c.fillStyle='#2a4038';for(let y=17;y<32;y+=5)c.fillRect(0,y,32,1);for(let x=0;x<32;x+=8)c.fillRect(x,17,1,15);c.fillStyle='#6b6553';c.fillRect(0,15,32,2)};
function wall(w,h,x,y,z,ry){const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),M(0xffffff,{map:ctex(32,32,wallDraw,w/2.4,h/3),side:THREE.DoubleSide}));m.position.set(x,y,z);m.rotation.y=ry;scene.add(m);return m}

/* ---------- room: x -5..5, z -4..4, height 3 ---------- */
const floor=new THREE.Mesh(new THREE.PlaneGeometry(10,8),M(0xffffff,{map:ctex(16,16,c=>{c.fillStyle='#5b5b61';c.fillRect(0,0,16,16);c.fillStyle='#3b3b41';c.fillRect(0,0,8,8);c.fillRect(8,8,8,8)},10,8)}));
floor.rotation.x=-Math.PI/2;scene.add(floor);
const ceil=new THREE.Mesh(new THREE.PlaneGeometry(10,8),M(0x2a2d3a));ceil.rotation.x=Math.PI/2;ceil.position.y=3;scene.add(ceil);
wall(6,3,-5,1.5,-1,Math.PI/2);wall(1,3,-5,1.5,3.5,Math.PI/2);wall(1,.6,-5,2.7,2.5,Math.PI/2);wall(8,3,5,1.5,0,-Math.PI/2);
wall(3.8,3,-3.1,1.5,-4,0);wall(2.1,3,2.25,1.5,-4,0);wall(.7,3,4.65,1.5,-4,0);wall(1,.6,3.8,2.7,-4,0);wall(2.4,1,0,.5,-4,0);wall(2.4,1,0,2.5,-4,0);
wall(3,3,-3.5,1.5,4,Math.PI);wall(3,3,3.5,1.5,4,Math.PI);wall(4,.6,0,2.7,4,Math.PI);
const ledge=box(2.6,.06,.5,M(0x5a4a30),0,1.0,-3.8);
const shutter=new THREE.Mesh(new THREE.PlaneGeometry(4,2.4),M(0xffffff,{map:ctex(8,16,c=>{c.fillStyle='#6a6e74';c.fillRect(0,0,8,16);c.fillStyle='#4b4f55';for(let y=0;y<16;y+=3)c.fillRect(0,y,8,1)},1,6),side:THREE.DoubleSide}));
shutter.position.set(0,3.6,3.96);shutter.rotation.y=Math.PI;scene.add(shutter);
/* menu board + clock */
const menu=new THREE.Mesh(new THREE.PlaneGeometry(.9,1.1),M(0xffffff,{map:ctex(64,80,c=>{c.fillStyle='#1a1a15';c.fillRect(0,0,64,80);c.fillStyle='#e8c35a';c.font='bold 9px monospace';c.fillText('KOPI  2.20',6,16);c.fillText('TEH   2.00',6,30);c.fillText('MILO  2.80',6,44);c.fillText('ROTI BAKAR',6,58);c.fillText('3.50',6,70)})}));menu.position.set(2.0,1.9,-3.97);scene.add(menu);
const clock=new THREE.Mesh(new THREE.CircleGeometry(.24,12),B(0x9a9a98));clock.position.set(-3.2,2.3,-3.96);scene.add(clock);
{const h1=box(.025,.12,.01,B(0x111111),-3.2,2.34,-3.95);const h2=box(.02,.17,.01,B(0x111111),-3.17,2.29,-3.95);h1.rotation.z=-1.6;h2.rotation.z=-.3}
/* tables + stools */
const TABLES=[[-3,-1.8],[-3,1.2],[2.8,-1.8],[-1.7,0.3]],AABB=[];
const stools=[];
const tm=M(0x6b5a3a),lm=M(0x3a301f),sm=M(0x8a2f2f);
for(const [x,z] of TABLES){box(1.2,.06,.8,tm,x,.75,z);for(const dx of[-.52,.52])for(const dz of[-.32,.32])box(.06,.75,.06,lm,x+dx,.37,z+dz);
  for(const dz of[-.8,.8]){const s=new THREE.Mesh(new THREE.CylinderGeometry(.2,.17,.45,6),sm);s.position.set(x,.23,z+dz);scene.add(s);stools.push(s)}
  AABB.push([x-.65,x+.65,z-.45,z+.45])}
const seat=stools[5]; /* table 3, south stool: z -1.0 */
box(1.0,1.0,3.0,M(0x4a3d27),4.2,.5,.5);box(1.04,.06,3.04,M(0x7a6745),4.2,1.02,.5);AABB.push([3.65,4.75,-1.05,2.05]);
/* ---------- kitchen, hall, bathroom ---------- */
function flo(x0,x1,z0,z1,ca,cb){const t=ctex(16,16,c=>{c.fillStyle=ca;c.fillRect(0,0,16,16);c.fillStyle=cb;c.fillRect(0,0,8,8);c.fillRect(8,8,8,8)},(x1-x0)*2,(z1-z0)*2);const m=new THREE.Mesh(new THREE.PlaneGeometry(x1-x0,z1-z0),M(0xffffff,{map:t}));m.rotation.x=-Math.PI/2;m.position.set((x0+x1)/2,0,(z0+z1)/2);scene.add(m);
  const c=new THREE.Mesh(new THREE.PlaneGeometry(x1-x0,z1-z0),M(0x2a2d3a));c.rotation.x=Math.PI/2;c.position.set((x0+x1)/2,3,(z0+z1)/2);scene.add(c)}
const steel=M(0x9aa0a6),dsteel=M(0x6b7075);
/* kitchen: x -2.5..5, z -7..-4 */
flo(-2.5,5,-7,-4,'#8a928c','#6d7570');wall(7.5,3,1.25,1.5,-7,0);wall(3,3,-2.5,1.5,-5.5,Math.PI/2);wall(3,3,5,1.5,-5.5,-Math.PI/2);
box(4.4,.9,.6,dsteel,-.2,.45,-6.65);box(4.5,.05,.65,steel,-.2,.92,-6.65);
{const u=new THREE.Mesh(new THREE.CylinderGeometry(.2,.2,.55,6),M(0xb9bec4));u.position.set(-1.4,1.22,-6.65);scene.add(u);const k=new THREE.Mesh(new THREE.CylinderGeometry(.12,.15,.2,6),M(0x7a7f85));k.position.set(.3,1.05,-6.65);scene.add(k)}
box(1.2,.9,.6,M(0x3a3d42),3.2,.45,-6.65);for(const x of[2.9,3.5]){const b=new THREE.Mesh(new THREE.CylinderGeometry(.18,.18,.02,8),M(0x111214));b.position.set(x,.92,-6.65);scene.add(b)}
box(.9,.9,.6,dsteel,4.5,.45,-6.65);box(.7,.04,.4,M(0x0e1113),4.5,.93,-6.65);box(.04,.3,.04,steel,4.5,1.08,-6.9);
box(1.4,.06,.7,steel,.8,.9,-5.1);for(const dx of[-.62,.62])for(const dz of[-.28,.28])box(.05,.9,.05,dsteel,.8+dx,.45,-5.1+dz);
box(1.6,.05,.3,M(0x5a4a30),-1.2,1.9,-6.85);box(1.6,.05,.3,M(0x5a4a30),-1.2,2.35,-6.85);
AABB.push([-2.4,2.0,-7,-6.3],[2.6,3.8,-7,-6.3],[4.05,4.95,-7,-6.3],[.05,1.55,-5.5,-4.7]);
/* hall: x -7..-5, z 2..3 */
flo(-7,-5,2,3,'#6a6a70','#55555b');wall(2,3,-6,1.5,2,0);wall(2,3,-6,1.5,3,Math.PI);
/* bathroom: x -9.5..-7, z 1..4 */
flo(-9.5,-7,1,4,'#cfd8dc','#aeb8bd');wall(3,3,-9.5,1.5,2.5,Math.PI/2);wall(2.5,3,-8.25,1.5,1,0);wall(2.5,3,-8.25,1.5,3.97,Math.PI);wall(1,3,-7,1.5,1.5,-Math.PI/2);wall(1,3,-7,1.5,3.5,-Math.PI/2);wall(1,.6,-7,2.7,2.5,-Math.PI/2);
const por=M(0xdfe4e6);
box(.4,.4,.55,por,-9.1,.2,1.35);box(.4,.55,.2,por,-9.1,.68,1.1);
box(.5,.15,.4,por,-7.7,.85,1.25);box(.15,.8,.15,por,-7.7,.4,1.25);
box(.68,.88,.02,M(0x444a4f),-7.7,1.65,1.02);{const mr=new THREE.Mesh(new THREE.PlaneGeometry(.6,.8),B(0x182126));mr.position.set(-7.7,1.65,1.035);scene.add(mr)}
box(.05,1.9,1.1,M(0x8a9aa2),-8.5,.95,1.55);
AABB.push([-9.45,-8.75,1,1.7],[-8.55,-8.45,1,2.1],[-8.0,-7.4,1,1.5]);
const bulbM=B(0xfff0c0,{fog:false}),BULB=new THREE.Group();BULB.position.set(-8.25,2.98,2.5);scene.add(BULB);
{box(.012,.62,.012,M(0x222222),0,-.31,0,BULB);const bb=new THREE.Mesh(new THREE.SphereGeometry(.08,8,6),bulbM);bb.position.y=-.68;BULB.add(bb);box(.2,.02,.2,M(0x888888),0,-.005,0,BULB)}
const GLOW=(()=>{const c=document.createElement('canvas');c.width=c.height=64;const x=c.getContext('2d'),g=x.createRadialGradient(32,32,2,32,32,32);g.addColorStop(0,'rgba(255,240,190,.95)');g.addColorStop(.35,'rgba(255,230,160,.35)');g.addColorStop(1,'rgba(255,230,160,0)');x.fillStyle=g;x.fillRect(0,0,64,64);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:t,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,fog:false}));sp.scale.set(1.1,1.1,1);sp.position.y=-.68;BULB.add(sp);return sp})();
function bulbSet(f){GLOW.material.opacity=f;bulbM.color.setRGB(1*f+.06*(1-f),.94*f+.06*(1-f),.75*f+.06*(1-f))}
const tapM=M(0xb8c0c4);box(.04,.04,.16,tapM,-7.7,1.2,1.14);box(.05,.28,.05,tapM,-7.7,1.065,1.08);box(.12,.025,.025,tapM,-7.7,1.24,1.08);
const STREAM=new THREE.Mesh(new THREE.BoxGeometry(.03,.26,.03),B(0xa8dcf0,{transparent:true,opacity:.75,fog:false}));STREAM.position.set(-7.7,1.06,1.21);STREAM.visible=false;scene.add(STREAM);
let tapTI=0,tapN=null;
/* running water: a steady soft band of sound plus little drips, not hissing bursts */
function tapSnd(on){if(!ac||!A.nb)return;
  if(on&&!tapN){
    if(G.SFX&&G.SFX.has('loop_rain'))tapN=G.SFX.loop('loop_rain',{g:.55,lp:2800,hp:350,rate:1.1,fade:.3});
    else{const s=ac.createBufferSource();s.buffer=A.nb;s.loop=true;const hp=ac.createBiquadFilter();hp.type='highpass';hp.frequency.value=600;const lp=ac.createBiquadFilter();lp.type='lowpass';lp.frequency.value=2200;const g=ac.createGain();g.gain.value=0;s.connect(hp);hp.connect(lp);lp.connect(g);g.connect(master);s.start();g.gain.setTargetAtTime(.04,ac.currentTime,.2);tapN={stop(){g.gain.setTargetAtTime(0,ac.currentTime,.1);setTimeout(()=>{try{s.stop()}catch(e){}},600)}}}}
  else if(!on&&tapN){const n=tapN;tapN=null;n.stop(.25)}}
function tapOn(){tapOff();tapSnd(true);tapTI=setInterval(()=>{if(G.SFX&&G.SFX.has('tap_drip')&&Math.random()<.06)G.SFX.play('tap_drip',{g:.5,wet:.3});else if(Math.random()<.5)A.tone(1500+Math.random()*1300,900+Math.random()*500,.06,.012,'sine');STREAM.scale.y=.85+Math.random()*.3},300);STREAM.visible=true}
function tapOff(){clearInterval(tapTI);tapTI=0;tapSnd(false);STREAM.visible=false}

const radio=new THREE.Group();radio.position.set(4.15,1.05,-.2);scene.add(radio);
box(.3,.2,.5,M(0x6b4a2b),0,.1,0,radio);box(.02,.14,.28,M(0x111111),-.16,.1,0,radio);box(.02,.04,.1,B(0xe8b44a),-.16,.17,.2,radio);box(.02,.3,.02,M(0x999999),.1,.3,-.2,radio);
const register=box(.4,.28,.34,M(0x3b3f45),4.2,1.19,1.3);
/* fuse box */
const fuse=new THREE.Group();fuse.position.set(-4.9,1.5,.5);scene.add(fuse);
box(.12,.7,.5,M(0x55595e),0,0,0,fuse);box(.02,.5,.34,M(0x3f4247),.07,0,0,fuse);const led=box(.02,.06,.06,B(0xff3b30),.08,.22,.14,fuse);
/* fan */
const fan=new THREE.Group();fan.position.set(0,2.78,-.3);scene.add(fan);
box(.14,.14,.14,M(0x333640),0,0,0,fan);for(let i=0;i<3;i++){const b=box(1.1,.02,.18,M(0x4a5163),.55,0,0,fan);b.geometry.translate(0,0,0);const g=new THREE.Group();scene.remove(b);g.add(b);g.rotation.y=i*Math.PI*2/3;fan.add(g)}
/* tubes + lights */
const tubeMat=[B(0xdff3ff),B(0xdff3ff)];
box(1.4,.05,.14,tubeMat[0],0,2.94,1.4);box(1.4,.05,.14,tubeMat[1],0,2.94,-1.7);
const L1=new THREE.PointLight(0xcfe8ff,0,16,2);L1.position.set(0,2.6,1.4);scene.add(L1);
const L2=new THREE.PointLight(0xcfe8ff,0,16,2);L2.position.set(0,2.6,-1.7);scene.add(L2);
box(1.4,.05,.14,(tubeMat[2]=B(0xdff3ff)),1.25,2.94,-5.5);box(.7,.05,.12,(tubeMat[3]=B(0xdff3ff)),-8.25,2.94,2.5);
const LZ=new THREE.PointLight(0xdfeee0,0,18,2);LZ.position.set(1.25,2.5,-5.5);scene.add(LZ);
let ZK=0;
const amb=new THREE.AmbientLight(0x6070a0,.02);scene.add(amb);
const torch=new THREE.SpotLight(0xfff4d6,0,14,.45,.55,1.4);torch.position.set(.15,-.1,0);camera.add(torch);torch.target.position.set(0,0,-5);camera.add(torch.target);
const dawn=new THREE.PointLight(0x7f9bff,0,10,2);dawn.position.set(0,1.6,4.6);scene.add(dawn);
/* things revealed later */
const cup=new THREE.Mesh(new THREE.CylinderGeometry(.07,.055,.11,7),M(0xd9d4c3));cup.position.set(0,1.09,-3.85);cup.visible=false;scene.add(cup);
const slip=box(.1,.005,.07,M(0xf1e9c8),.12,1.04,-3.78);slip.visible=false;
const fig=new THREE.Group();fig.position.set(2.8,0,-1.0);scene.add(fig);
const figM=M(0xc7c7d2,{emissive:0x15151c});box(.5,.62,.28,figM,0,.82,.02,fig);box(.46,.1,.46,figM,0,.52,-.12,fig);
const head=new THREE.Mesh(new THREE.SphereGeometry(.17,6,5),figM);head.position.set(0,1.3,.02);fig.add(head);
box(.14,.5,.14,figM,-.34,.82,-.08,fig);box(.14,.5,.14,figM,.34,.82,-.08,fig);fig.visible=false;

/* ---------- Atuk's table + people (hidden until the story uses them) ---------- */
box(1.2,.06,.8,tm,3.9,.75,2.9);for(const dx of[-.52,.52])for(const dz of[-.32,.32])box(.06,.75,.06,lm,3.9+dx,.37,2.9+dz);
AABB.push([3.25,4.55,2.45,3.35]);
function faceTex(o){const ct=document.createElement('canvas');ct.width=64;ct.height=32;const c=ct.getContext('2d');c.fillStyle=o.skin;c.fillRect(0,0,64,32);
  const cx=16;c.fillStyle=o.hair;c.fillRect(0,0,64,6);if(o.sides){c.fillRect(cx-13,0,5,15);c.fillRect(cx+8,0,5,15);c.fillRect(32,0,32,22)}else{c.fillRect(32,0,32,18)}
  c.fillStyle=o.brow;c.fillRect(cx-7,9,5,1);c.fillRect(cx+2,9,5,1);
  c.fillStyle='#fff';c.fillRect(cx-6,11,4,2);c.fillRect(cx+2,11,4,2);c.fillStyle='#161616';c.fillRect(cx-5,11,2,2);c.fillRect(cx+3,11,2,2);
  if(o.glasses){c.fillStyle='#2a2a2a';c.fillRect(cx-8,10,7,1);c.fillRect(cx+1,10,7,1);c.fillRect(cx-8,14,7,1);c.fillRect(cx+1,14,7,1);c.fillRect(cx-8,10,1,5);c.fillRect(cx-2,10,1,5);c.fillRect(cx+1,10,1,5);c.fillRect(cx+7,10,1,5);c.fillRect(cx-1,11,2,1)}
  c.fillStyle='rgba(110,65,45,.5)';c.fillRect(cx-1,14,2,3);c.fillStyle=o.mouth||'#6a3028';c.fillRect(cx-3,20,6,1);if(o.smile){c.fillRect(cx-4,19,1,1);c.fillRect(cx+3,19,1,1)}
  if(o.lash){c.fillStyle='#161616';c.fillRect(cx-7,10,6,1);c.fillRect(cx+1,10,6,1);c.fillRect(cx-8,11,1,1);c.fillRect(cx+7,11,1,1);c.fillRect(cx-8,10,1,1);c.fillRect(cx+7,10,1,1)}
  if(o.lips){c.fillStyle=o.mouth||'#b0404a';c.fillRect(cx-3,19,6,3);c.fillStyle='rgba(255,255,255,.25)';c.fillRect(cx-1,19,2,1)}
  if(o.wrinkle){c.fillStyle='rgba(90,60,40,.45)';c.fillRect(cx-8,16,2,1);c.fillRect(cx+6,16,2,1);c.fillRect(cx-5,7,10,1)}
  c.fillStyle='rgba(200,110,90,.25)';c.fillRect(cx-8,16,3,2);c.fillRect(cx+5,16,3,2);
  const t=new THREE.CanvasTexture(ct);t.magFilter=t.minFilter=THREE.NearestFilter;t.colorSpace=THREE.SRGBColorSpace;return t}
const nsph=(r,m,x,y,z,p,sx=1,sy=1,sz=1,ws=9,hs=7)=>{const s=new THREE.Mesh(new THREE.SphereGeometry(r,ws,hs),m);s.position.set(x,y,z);s.scale.set(sx,sy,sz);p.add(s);return s};
const ncyl=(rt,rb,h,m,x,y,z,p,seg=8)=>{const s=new THREE.Mesh(new THREE.CylinderGeometry(rt,rb,h,seg),m);s.position.set(x,y,z);p.add(s);return s};
const NM=(c,o={})=>new THREE.MeshLambertMaterial(Object.assign({color:c},o));
function person(x,z,rot,shirt,hair=0x222222,skin=0xc9a27e,o={}){const g=new THREE.Group();g.position.set(x,0,z);g.rotation.y=rot;scene.add(g);
  const inner=new THREE.Group();inner.rotation.y=Math.PI;g.add(inner);const body=new THREE.Group();inner.add(body);
  const sk=NM(skin),top=NM(shirt),bot=NM(o.bot||0x2a2a30),shoe=NM(o.shoe||0x222222),hm=NM(hair);
  const legM=o.shorts?sk:bot;
  const leg=sx=>{const th=new THREE.Group();th.position.set(sx,.86,0);body.add(th);nsph(.1,legM,0,0,0,th);ncyl(.1,.078,.4,legM,0,-.2,0,th,7);
    const sh=new THREE.Group();sh.position.y=-.4;th.add(sh);nsph(.078,legM,0,0,0,sh);ncyl(.078,.062,.4,legM,0,-.2,0,sh,7);nsph(.075,shoe,0,-.41,.05,sh,1,.6,1.8);
    if(o.shorts)ncyl(.108,.1,.38,bot,0,-.19,0,th,7);return{th,sh}};
  const L=leg(-.1),R=leg(.1);
  if(o.sarong){ncyl(.21,.31,.5,NM(o.sarong),0,.62,0,body,10).scale.z=.85;ncyl(.215,.215,.05,NM(0x2a2a2a),0,.87,0,body,10).scale.z=.8}
  else{nsph(.21,bot,0,.86,0,body,1,.6,.78);ncyl(.2,.2,.05,NM(0x1c1c1c),0,.89,0,body,10).scale.z=.78}
  ncyl(.24,.215,.56,top,0,1.17,0,body,10).scale.z=.72;nsph(.25,top,0,1.4,0,body,1,.5,.75);
  if(o.vest)ncyl(.05,.07,.28,sk,0,1.2,.17,body,6).scale.z=.3;
  const arm=sx=>{const up=new THREE.Group();up.position.set(sx,1.4,0);body.add(up);const am=o.sleeve===0?sk:top;nsph(.078,am,0,0,0,up);ncyl(.078,.062,.26,am,0,-.13,0,up,7);
    const fo=new THREE.Group();fo.position.y=-.26;up.add(fo);nsph(.062,sk,0,0,0,fo);ncyl(.062,.052,.24,sk,0,-.12,0,fo,7);nsph(.07,sk,0,-.26,0,fo);return{up,fo}};
  const aL=arm(-.3),aR=arm(.3);
  ncyl(.06,.07,.1,sk,0,1.52,0,body,6);
  const head=new THREE.Group();head.position.y=1.7;body.add(head);
  nsph(.17,new THREE.MeshLambertMaterial({map:faceTex(Object.assign({skin:'#'+skin.toString(16).padStart(6,'0'),hair:'#'+hair.toString(16).padStart(6,'0'),brow:'#111'},o.f||{}))}),0,0,0,head,1,1.08,1,12,9);
  nsph(.03,sk,0,-.01,.17,head,1,1,1.2,5,4);for(const q of[-1,1])nsph(.035,sk,q*.168,-.01,0,head,.5,1,.8,5,4);
  nsph(.18,hm,0,.045,-.03,head,1,.86,1.03,12,7);nsph(.15,hm,0,-.02,-.07,head,1,1,.9,8,6);if(o.hairUp)nsph(.1,hm,0,.16,0,head,1,.6,1,7,5);
  if(o.long)nsph(.19,hm,0,-.17,-.09,head,1,1.55,.8,10,8);
  if(o.tudung){nsph(.2,hm,0,.03,-.05,head,1,.95,1.02,12,8);nsph(.2,hm,0,-.17,-.05,head,1,.62,.95,10,7)}
  const mouth=nsph(.04,NM(0x3a0f0c),0,-.075,.158,head,1.5,.08,.5,6,4);mouth.visible=false;
  g.userData={L,R,aL,aR,body,head,mouth,f0:120,talk:null,sit:!!o.sit};pose(g,0,o.sit?'sit':'stand');g.visible=false;return g}
function pose(g,t,mode){const u=g.userData,s=mode==='walk'?Math.sin(t):0;
  if(mode==='sit'){u.L.th.rotation.x=u.R.th.rotation.x=-1.5;u.L.sh.rotation.x=u.R.sh.rotation.x=1.5;u.aL.up.rotation.x=u.aR.up.rotation.x=-.5;u.aL.fo.rotation.x=u.aR.fo.rotation.x=-1.0;u.body.position.y=-.34;u.body.rotation.set(0,0,0);return}
  u.L.th.rotation.x=s*.65;u.R.th.rotation.x=-s*.65;u.L.sh.rotation.x=Math.max(0,-s)*.7;u.R.sh.rotation.x=Math.max(0,s)*.7;
  u.aL.up.rotation.x=-s*.55;u.aR.up.rotation.x=s*.55;u.aL.fo.rotation.x=-.15-Math.max(0,s)*.5;u.aR.fo.rotation.x=-.15-Math.max(0,-s)*.5;
  u.body.position.y=mode==='walk'?Math.abs(Math.cos(t))*.03:0;u.body.rotation.z=s*.03;u.body.rotation.y=s*.07}
const CROWD=[person(-3,-1.0,0,0x3b5a7a,0x1a1a1a,0xc9a27e,{sit:1,sleeve:1,f:{smile:1}}),person(-3,-2.6,Math.PI,0x7a3b3b,0xb9b2c8,0xd8b08a,{sit:1,tudung:1,sarong:0x5a2a2a,f:{wrinkle:1,sides:1,brow:'#777',lash:1,lips:1,mouth:'#9a4a4a'}}),person(-3,.4,Math.PI,0x4a6a3b,0x111111,0x8a5836,{sit:1,shorts:1}),person(-1.7,-.5,Math.PI,0x6a5a3b,0x111111,0xc9a27e,{sit:1,f:{wrinkle:1}}),person(-1.7,1.1,0,0x5a3b6a,0x3a2a1a,0xc9a27e,{sit:1,hairUp:1,long:1,sarong:0x2f2a3d,f:{smile:1,sides:1,lash:1,lips:1,mouth:'#c0485a'}})];
const atuk=person(3.9,3.5,1.0,0xf1efe6,0xe6e6e6,0xb89572,{vest:1,bot:0x6b6f76,shoe:0x6a4a2a,f:{glasses:1,wrinkle:1,sides:1,brow:'#d8d8d8',mouth:'#6a3a2a'}});
const NAMEOF=new Map(CROWD.map((c,i)=>[c,['AH SENG','MAK CIK','RAJ','PAK HASSAN','MEI LING'][i]]));
const NPCS=CROWD.concat([atuk]);[118,98,135,108,185].forEach((f,i)=>CROWD[i].userData.f0=f);atuk.userData.f0=92;
const HOME=CROWD.map(c=>[c.position.x,c.position.z,c.rotation.y]);
/* the customers outside ARE the crowd: they queue, walk in, and sit */
const QI=[2,0,3,4,1],QUEUE=QI.map(i=>CROWD[i]),QPOS=[[-1.7,5.5,.15],[-2.7,5.1,-.1],[-3.5,5.8,.2],[-4.4,5.4,.05],[-5.2,5.9,.12]];
const QROUTE=[[[-.7,-1.0],[-2.5,-1.0],[-2.6,-.2]],[[-.7,-1.0],[-2.4,-1.0]],[[-.7,-.5]],[],[[-.7,-1.0],[-2.1,-1.0],[-2.1,-2.6]]];

function showCrowd(v){CROWD.forEach(c=>c.visible=v);atuk.visible=v}
const ZONES=[[-4.65,4.65,-3.65,3.6],[-2.2,4.65,-6.65,-4.35],[3.45,4.15,-4.4,-3.6],[-7.15,-4.35,2.15,2.85],[-9.15,-7.15,1.35,3.65]];

/* ---------- the street, the empty city, your house ---------- */
const LAMPS=[-20,-8,8,20];
const glowTex=ctex(32,32,c=>{const g=c.createRadialGradient(16,16,0,16,16,16);g.addColorStop(0,'rgba(255,214,130,.95)');g.addColorStop(1,'rgba(255,214,130,0)');c.fillStyle=g;c.fillRect(0,0,32,32)});glowTex.repeat.set(1,1);
function fl(x0,x1,z0,z1,mat,y=0){const m=new THREE.Mesh(new THREE.PlaneGeometry(x1-x0,z1-z0),mat);m.rotation.x=-Math.PI/2;m.position.set((x0+x1)/2,y,(z0+z1)/2);scene.add(m);return m}
function cl(x0,x1,z0,z1,mat,y=3){const m=new THREE.Mesh(new THREE.PlaneGeometry(x1-x0,z1-z0),mat);m.rotation.x=Math.PI/2;m.position.set((x0+x1)/2,y,(z0+z1)/2);scene.add(m)}
const chk=(a,b,rx,ry)=>M(0xffffff,{map:ctex(16,16,c=>{c.fillStyle=a;c.fillRect(0,0,16,16);c.fillStyle=b;c.fillRect(0,0,8,8);c.fillRect(8,8,8,8)},rx,ry)});
fl(-26,26,4,6.5,chk('#d9b48a','#b86f50',52,5));            /* five-foot way */
cl(-26,26,4,6.6,M(0x23252e));
for(const x of[-25,-15,-5,5,15,25]){box(.35,3,.35,M(0x5d5a52),x,1.5,6.4);AABB.push([x-.4,x+.4,6,6.8])}
fl(-60,60,6.5,13,SMOOTH?M(0xffffff,{map:ctex(32,32,c=>{c.fillStyle='#4d5059';c.fillRect(0,0,32,32);for(let i=0;i<40;i++){c.fillStyle='rgba(0,0,0,'+(.04+Math.random()*.08)+')';c.fillRect(Math.random()*32,Math.random()*32,2+Math.random()*5,1+Math.random()*3)}c.strokeStyle='rgba(20,20,24,.5)';c.lineWidth=.3;c.beginPath();c.moveTo(4,0);c.lineTo(9,14);c.lineTo(6,32);c.stroke()},40,5)}):M(0x4b4e57));if(SMOOTH){box(120,.16,.22,M(0xb7b4a8),0,.08,6.55);box(120,.16,.22,M(0xb7b4a8),0,.08,12.95)}
fl(-60,60,9.6,9.9,M(0xffffff,{map:ctex(32,2,c=>{c.fillStyle='#1c1d21';c.fillRect(0,0,32,2);c.fillStyle='#b9b6a4';c.fillRect(0,0,16,2)},60,1),transparent:false}),.01);
fl(-60,60,13,14.6,chk('#c9c3b4','#a7a090',100,2));
/* neighbour shoplots: closed shutters, dark signs */
const shutTex=(a='#5a5e64',b='#43474d')=>M(0xffffff,{map:ctex(8,16,c=>{c.fillStyle=a;c.fillRect(0,0,8,16);c.fillStyle=b;for(let y=0;y<16;y+=3)c.fillRect(0,y,8,1)},1,6)});
function facade(cx,w,col){const m=new THREE.Mesh(new THREE.PlaneGeometry(w,3),M(0xffffff,{map:ctex(32,24,c=>{c.fillStyle=col;c.fillRect(0,0,32,24);c.fillStyle='rgba(0,0,0,.18)';c.fillRect(0,17,32,7);c.fillStyle='#fff';c.fillRect(0,0,32,2);c.fillStyle='rgba(255,255,255,.35)';for(let x=2;x<32;x+=8)c.fillRect(x,5,4,8)},1,1)}));m.position.set(cx,1.5,4.03);scene.add(m)}
function sign(txt,x,bg,fg){const m=new THREE.Mesh(new THREE.PlaneGeometry(3.4,.55),M(0xffffff,{map:ctex(136,22,c=>{c.fillStyle=bg;c.fillRect(0,0,136,22);c.fillStyle=fg;c.font='bold 14px monospace';c.textAlign='center';c.fillText(txt,68,16)})}));m.position.set(x,2.78,4.06);scene.add(m)}
{const t=ctex(256,35,c=>{c.fillStyle='#5a1414';c.fillRect(0,0,256,35);c.strokeStyle='#e8c35a';c.lineWidth=2;c.strokeRect(3,3,250,29);c.fillStyle='#ffe9a8';c.font='bold 21px monospace';c.textAlign='center';c.fillText('ATUK KOPITIAM',128,25)});
 const sg=new THREE.Mesh(new THREE.PlaneGeometry(4.4,.6),new THREE.MeshBasicMaterial({map:t}));sg.position.set(0,2.7,4.07);scene.add(sg);
 const gl=new THREE.Sprite(new THREE.SpriteMaterial({map:glowTex,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false,fog:false,opacity:.35,color:0xff6a4a}));gl.position.set(0,2.7,4.3);gl.scale.set(7,2.2,1);scene.add(gl)}
[[-20,'KEDAI RUNCIT','#3f8fd0','#2d6aa0','#1d4f86','#ffffff'],[-10,'FARMASI','#2fae8a','#1f8a6c','#0e6e52','#f4fff8'],[10,'GUNTING RAMBUT','#d9577f','#b23f64','#9a2a50','#fff2f6'],[20,'KEDAI EMAS','#e89a2a','#c27a18','#8a1f1f','#ffe08a']].forEach(([cx,t,c1,c2,sb,sf])=>{
  wall(10,3,cx,1.5,4,0);const sh=new THREE.Mesh(new THREE.PlaneGeometry(4.2,2.4),shutTex());sh.position.set(cx,1.2,4.04);scene.add(sh);sign(t,cx,sb,sf);facade(cx,10,c1);
  wall(10,.01,cx,.01,4.05,0).visible=false});
/* the CCTV camera in the back corner: its red light blinks all through Day 1 */
box(.22,.16,.4,M(0x2a2a2e),3.0,2.72,-3.42);box(.06,.2,.06,M(0x222222),3.0,2.9,-3.55);
const CCLED=new THREE.Mesh(new THREE.SphereGeometry(.03,6,5),B(0xff2a1a,{fog:false}));CCLED.position.set(3.07,2.74,-3.22);scene.add(CCLED);
/* A-frame chalkboard beside the door (fades day by day) */
const boardCv=document.createElement('canvas');boardCv.width=256;boardCv.height=336;
const boardTex=new THREE.CanvasTexture(boardCv);boardTex.magFilter=boardTex.minFilter=THREE.NearestFilter;boardTex.colorSpace=THREE.SRGBColorSpace;
function drawBoard(day){const c=boardCv.getContext('2d'),w=256,h=336;c.clearRect(0,0,w,h);c.fillStyle='#6b5a3a';c.fillRect(0,0,w,h);c.fillStyle='#1f2a24';c.fillRect(10,10,w-20,h-20);
  const al=[1,.9,.65,.4,.0][Math.max(0,Math.min(4,day-1))];c.globalAlpha=al;c.fillStyle='#f3ead0';c.textAlign='center';
  c.strokeStyle='rgba(243,234,208,.45)';c.setLineDash([4,4]);c.strokeRect(20,20,w-40,h-40);c.setLineDash([]);
  c.font='bold 44px "Noto Sans CJK SC","Noto Sans SC","PingFang SC","Microsoft YaHei","Heiti SC",sans-serif';c.fillText('\u963f\u516c\u8336\u9910\u9986',w/2,110);
  c.font='bold 23px monospace';c.fillText('ATUK KOPITIAM',w/2,148);c.fillRect(48,168,160,2);
  c.font='bold 18px monospace';c.fillText('Kopi  Teh  Roti Bakar',w/2,206);
  if(day<4){c.font='bold 19px monospace';c.fillText(day<2?'7am - 5pm':'6pm - 1am',w/2,244)}
  if(day<2){c.beginPath();c.arc(w/2-8,278,12,0,Math.PI);c.lineWidth=2;c.strokeStyle='#f3ead0';c.stroke();c.fillRect(w/2+4,268,8,2)}
  c.globalAlpha=1;boardTex.needsUpdate=true}
drawBoard(1);
{const g=new THREE.Group();g.position.set(2.9,0,5.2);g.rotation.y=-.12;scene.add(g);const wood=M(0x6b5a3a);
 const fr=box(.74,.95,.05,wood,0,.46,.14,g);fr.rotation.x=-.27;const bk=box(.74,.95,.05,wood,0,.46,-.14,g);bk.rotation.x=.27;
 const face=new THREE.Mesh(new THREE.PlaneGeometry(.7,.92),new THREE.MeshBasicMaterial({map:boardTex,color:0xcfcfcf}));face.position.set(0,0,.03);fr.add(face);
 AABB.push([2.5,3.3,4.9,5.5])}

/* ---- colour pass ---- */
{const gnd=new THREE.Mesh(new THREE.PlaneGeometry(280,280),M(0x5f6459));gnd.rotation.x=-Math.PI/2;gnd.position.set(0,-.03,10);scene.add(gnd)}
facade(-3.5,3,'#f1deb0');facade(3.5,3,'#f1deb0');
{const m=new THREE.Mesh(new THREE.PlaneGeometry(4,.6),M(0xffffff,{map:ctex(32,6,c=>{c.fillStyle='#f1deb0';c.fillRect(0,0,32,6);c.fillStyle='#c4352a';c.fillRect(0,0,32,1)})}));m.position.set(0,2.7,4.03);scene.add(m)}
for(const lx of[-1.9,1.9]){const L=new THREE.Mesh(new THREE.SphereGeometry(.22,8,6),B(0xd63a2a));L.scale.y=1.2;L.position.set(lx,2.45,5.0);scene.add(L);box(.02,.4,.02,B(0x222222),lx,2.85,5.0);box(.14,.03,.14,B(0xe8c35a),lx,2.2,5.0)}
function plant(x,z){const pot=new THREE.Mesh(new THREE.CylinderGeometry(.28,.2,.4,8),M(0xb85a3a));pot.position.set(x,.2,z);scene.add(pot);
  for(const [dx,dy,dz,r] of[[0,.75,0,.38],[.18,.6,.1,.28],[-.18,.62,-.08,.26]]){const l=new THREE.Mesh(new THREE.SphereGeometry(r,7,5),M(0x3da34f));l.position.set(x+dx,dy,z+dz);scene.add(l)}
  for(const [dx,dy,dz] of[[.12,.95,.2],[-.2,.8,.15],[.22,.7,-.1]]){const f=new THREE.Mesh(new THREE.SphereGeometry(.07,5,4),B(0xff6f91));f.position.set(x+dx,dy,z+dz);scene.add(f)}}
for(const x of[-23,-17.5,-12.5,-7.5,-6.1,6.1,7.5,12.5,17.5,23])plant(x,5.6);
function bike(x,z,col,ry){const g=new THREE.Group();g.position.set(x,0,z);g.rotation.y=ry;scene.add(g);
  box(.22,.22,.9,M(col),0,.55,0,g);box(.26,.1,.4,M(0x222222),0,.72,-.1,g);box(.5,.04,.04,M(0x333333),0,.95,.38,g);box(.12,.35,.12,M(0xcfd3d8),0,.78,.34,g);
  for(const zz of[-.45,.45]){const w=new THREE.Mesh(new THREE.CylinderGeometry(.27,.27,.1,10),M(0x1a1a1a));w.rotation.z=Math.PI/2;w.position.set(0,.27,zz);g.add(w)}}
bike(-14,7.6,0xd9382a,1.45);bike(-13.2,8.1,0x2a6fd0,1.6);bike(-3.5,7.5,0xf0b020,1.5);bike(12.5,7.6,0x2fae8a,1.55);bike(18,8,0xb23f64,1.4);
function tree(x,z){const t=new THREE.Mesh(new THREE.CylinderGeometry(.14,.2,2.4,6),M(0x6b4a2e));t.position.set(x,1.2,z);scene.add(t);
  for(const [dx,dy,dz,r,c] of[[0,3.2,0,1.2,0x3f9a4a],[.7,2.8,.3,.9,0x4fae58],[-.7,2.9,-.2,.95,0x378a43]]){const l=new THREE.Mesh(new THREE.SphereGeometry(r,8,6),M(c));l.position.set(x+dx,dy,z+dz);scene.add(l)}}
for(const x of[-26,-14,-1,14,26])tree(x,x===14?12.9:13.9);
const SKYT={};let DOME;
{const mk=(stops,cl)=>{const t=ctex(256,128,c=>{const g=c.createLinearGradient(0,0,0,128);stops.forEach(([o,col])=>g.addColorStop(o,col));c.fillStyle=g;c.fillRect(0,0,256,128);c.fillStyle=cl;
   for(const [x,y,w] of[[30,40,34],[90,30,28],[150,50,40],[210,34,30],[60,62,26],[190,70,32]]){for(let k=0;k<4;k++){c.beginPath();c.ellipse(x+k*10-14,y+(k%2)*3,w/2.6,7,0,0,7);c.fill()}}});t.wrapS=THREE.RepeatWrapping;return t};
 SKYT.day=mk([[0,'#3d86d6'],[.55,'#8fc8f0'],[1,'#e4f3ff']],'rgba(255,255,255,.9)');
 SKYT.dusk=mk([[0,'#3e3a78'],[.5,'#c9707a'],[1,'#f6b878']],'rgba(255,190,160,.75)');
 DOME=new THREE.Mesh(new THREE.SphereGeometry(140,16,10),new THREE.MeshBasicMaterial({map:SKYT.day,side:THREE.BackSide,fog:false}));DOME.position.y=-10;DOME.visible=false;scene.add(DOME)}
/* ---- upper floors + longer shop row ---- */
{const COLS=['#f1deb0','#7fd1b9','#79b8e8','#f08fb0','#f2a65a','#c9b8e8','#f2d46a','#9fd08a','#f0a090'];
 const NAMES=['BAKERI','KEDAI KASUT','CAFE 24','SALON','KEDAI BUKU','LAUNDRI','MINIMART','KLINIK'];
 const upTex=col=>M(0xffffff,{map:ctex(40,24,c=>{c.fillStyle=col;c.fillRect(0,0,40,24);c.fillStyle='rgba(0,0,0,.12)';c.fillRect(0,20,40,4);c.fillStyle='#fff';c.fillRect(0,0,40,2);
   for(const wx of[5,27]){c.fillStyle='#fff';c.fillRect(wx-1,5,10,14);c.fillStyle='#2b3947';c.fillRect(wx,6,8,12);c.fillStyle='rgba(255,255,255,.25)';for(let y=7;y<18;y+=3)c.fillRect(wx,y,8,1);c.fillStyle='#fff';c.fillRect(wx+3,6,1,12)}})});
 const ext=[];for(let cx=-65;cx<=65;cx+=10){const i=Math.round((cx+65)/10),col=COLS[i%COLS.length];
   if(Math.abs(cx)>25){ext.push(cx);facade(cx,10,col);const sh=new THREE.Mesh(new THREE.PlaneGeometry(4.2,2.4),shutTex());sh.position.set(cx,1.2,4.04);scene.add(sh);sign(NAMES[i%NAMES.length],cx,'#1d4f86','#ffffff')}
   const f=new THREE.Mesh(new THREE.PlaneGeometry(10,3.7),upTex(cx===0?'#f1deb0':col));f.position.set(cx,4.85,6.56);scene.add(f);
   box(10,.5,.4,M(0xffffff),cx,6.8,6.55);box(.7,.45,.5,M(0xc9ced4),cx-2.75,3.75,6.8);
   box(2,.04,.04,M(0x555555),cx+2.75,5.55,6.9);[0xe84a5f,0x2a9d8f,0xf4d35e].forEach((cc,k)=>box(.4,.55,.02,B(cc),cx+2.2+k*.5,5.25,6.9));
   if(i%2===0){const t=new THREE.Mesh(new THREE.CylinderGeometry(.7,.7,1.1,8),M(0x3a7bbf));t.position.set(cx+3,7.5,5.6);scene.add(t);box(.1,.5,.1,M(0x444444),cx+3,6.95,5.6)}}
 fl(26,66,4,6.5,chk('#d9b48a','#b86f50',40,5));fl(-66,-26,4,6.5,chk('#d9b48a','#b86f50',40,5));cl(26,66,4,6.6,M(0x23252e));cl(-66,-26,4,6.6,M(0x23252e));
 for(const x of[-65,-55,-45,-35,35,45,55,65])box(.35,3,.35,M(0x5d5a52),x,1.5,6.4)}
/* lamps (cheap glow, no extra lights) */
const GLOWS=[];
for(const x of LAMPS){box(.12,3.6,.12,M(0x222428),x,1.8,13.6);box(.5,.1,.2,M(0x222428),x,3.6,13.4);box(.3,.08,.14,B(0xffd27a),x,3.52,13.3);
  const g=new THREE.Sprite(new THREE.SpriteMaterial({map:glowTex,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false,fog:false}));g.position.set(x,3.45,13.3);g.scale.set(4,4,1);scene.add(g);GLOWS.push(g)}
/* empty city blocks (dark windows) */
const winTex=(rx,ry,col='#15171d')=>M(0xffffff,{map:ctex(16,16,c=>{c.fillStyle=col;c.fillRect(0,0,16,16);c.fillStyle='#41627f';c.fillRect(3,3,10,10);c.fillStyle='rgba(255,255,255,.35)';c.fillRect(3,8,10,1)},rx,ry)});
(()=>{let sd=7;const R=()=>{sd=(sd*16807)%2147483647;return sd/2147483647};
 const PAL=['#e07a5f','#81b29a','#f2cc8f','#7b9acc','#d98fb0','#f4a259','#9bc4a8','#c98bb9','#e9c46a','#6d9dc5','#e8a0a0','#a3c4a0'];
 const stripe=(c1)=>M(0xffffff,{map:ctex(8,8,c=>{c.fillStyle=c1;c.fillRect(0,0,8,8);c.fillStyle='#fff';c.fillRect(0,0,4,8)},4,1),side:THREE.DoubleSide});
 /* front row across the road: z 15..23, leaves the house gap alone */
 let x=-62;while(x<62){const w=5.5+R()*4,h=5+Math.floor(R()*5)*1.2,x0=x,x1=x+w;x=x1+.15;
   if(x1>1.5&&x0<16.5)continue;
   const col=PAL[Math.floor(R()*PAL.length)],m=new THREE.Mesh(new THREE.BoxGeometry(w,h,8),winTex(w/2.5,h/2.5,col));m.position.set((x0+x1)/2,h/2,19);scene.add(m);
   /* ground-floor shutter + awning facing the street */
   const sh=new THREE.Mesh(new THREE.PlaneGeometry(w*.7,2.3),shutTex());sh.position.set((x0+x1)/2,1.15,14.97);sh.rotation.y=Math.PI;scene.add(sh);
   const aw=new THREE.Mesh(new THREE.BoxGeometry(w*.85,.08,1.0),stripe(PAL[Math.floor(R()*PAL.length)]));aw.position.set((x0+x1)/2,2.75,14.5);aw.rotation.x=.3;scene.add(aw)}
 /* tall back row for a real skyline */
 x=-80;while(x<80){const w=7+R()*7,h=12+R()*14,x0=x,x1=x+w;x=x1+.2;const col=['#b9a99a','#9fb0b8','#c4b5a0','#a9a2b8','#b2b9a4'][Math.floor(R()*5)],m=new THREE.Mesh(new THREE.BoxGeometry(w,h,9),winTex(w/2.5,h/2.5,col));m.position.set((x0+x1)/2,h/2,29);scene.add(m)}
})();
/* far hills */
for(const [hx,hr,hh] of[[-110,40,26],[-60,34,20],[-10,46,30],[45,38,22],[100,44,28]]){const c=new THREE.Mesh(new THREE.ConeGeometry(hr,hh,7),M(0x5f8f84));c.position.set(hx,hh/2-2,125);scene.add(c)}
/* utility poles + wires on the far pavement */
{const pm=M(0x6b5a4a);for(let px=-50;px<=46;px+=12){box(.16,6.4,.16,pm,px,3.2,14.2);box(1.3,.1,.1,pm,px,5.9,14.2);if(px<46)for(const wz of[-.5,0,.5])box(12,.025,.025,B(0x1a1a1a),px+6,5.85-Math.abs(wz)*.1,14.2+wz)}}
/* parked cars + zebra crossing */
function car(x,z,col){const g=new THREE.Group();g.position.set(x,0,z);scene.add(g);box(4,.55,1.8,M(col),0,.55,0,g);box(2.1,.5,1.55,M(col),-.2,1.05,0,g);box(1.9,.38,1.58,M(0x2a3a4a),-.2,1.07,0,g);
  for(const wx of[-1.25,1.25])for(const wz of[-.85,.85]){const w=new THREE.Mesh(new THREE.CylinderGeometry(.3,.3,.2,8),M(0x151515));w.rotation.x=Math.PI/2;w.position.set(wx,.3,wz);g.add(w)}}
car(-6,12.2,0xd9382a);car(11,12.3,0xe9e9ee);car(26,12.2,0x2a6fd0);car(-30,12.3,0xf0b020);
for(let i=0;i<5;i++)box(.5,.02,6.3,B(0xe8e6da),11+i*.95,.03,9.75);
for(const cx of[-6,11])AABB.push([cx-1.9,cx+1.9,11.3,13.2]);for(const px of[-14,-2,10,22])AABB.push([px-.3,px+.3,13.9,14.5]);

box(30,.2,10,M(0x15171d),-8,.1,32);
/* sky */
let STARS,MOON;
{const g=new THREE.BufferGeometry(),n=220,a=new Float32Array(n*3);for(let i=0;i<n;i++){const th=Math.random()*Math.PI*2,ph=Math.random()*1.2+.15,r=110;a[i*3]=Math.cos(th)*Math.cos(ph)*r;a[i*3+1]=Math.sin(ph)*r;a[i*3+2]=Math.sin(th)*Math.cos(ph)*r}
 g.setAttribute('position',new THREE.BufferAttribute(a,3));STARS=new THREE.Points(g,new THREE.PointsMaterial({color:0x9aa6c8,size:1.6,sizeAttenuation:false,fog:false}));scene.add(STARS);
 MOON=new THREE.Mesh(new THREE.SphereGeometry(4,8,6),new THREE.MeshBasicMaterial({color:0xcfd6e8,fog:false}));MOON.position.set(-55,45,95);scene.add(MOON)}
/* your house: x 3..15, z 15..23 */
const hwT=(w,h)=>M(0xffffff,{map:ctex(16,16,c=>{c.fillStyle='#b0a58c';c.fillRect(0,0,16,16);c.fillStyle='#8a8070';c.fillRect(0,10,16,6);c.fillStyle='#5a5446';c.fillRect(0,10,16,1)},w/2.4,1),side:THREE.DoubleSide});
function hw(w,h,x,y,z,ry){const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),hwT(w,h));m.position.set(x,y,z);m.rotation.y=ry;scene.add(m)}
hw(2.5,3,4.25,1.5,15,0);hw(8.3,3,10.85,1.5,15,0);hw(1.2,.8,6.1,2.6,15,0);hw(12,3,9,1.5,23,0);hw(8,3,3,1.5,19,Math.PI/2);hw(8,3,15,1.5,19,Math.PI/2);
/* new layout: dining x3..7.2 | Atuk x7.2..11.2 + mine x11.2..15 (z15..19.4) | back hall z19.4..23 */
hw(4.9,3,7.2,1.5,17.45,Math.PI/2);hw(1.9,3,7.2,1.5,22.05,Math.PI/2);hw(1.2,.8,7.2,2.6,20.5,Math.PI/2);
hw(4.4,3,11.2,1.5,17.2,Math.PI/2);
hw(1.4,3,7.9,1.5,19.4,0);hw(3,3,11.1,1.5,19.4,0);hw(1.4,3,14.3,1.5,19.4,0);hw(1,.8,9.1,2.6,19.4,0);hw(1,.8,13.1,2.6,19.4,0);
for(const dx of[8.6,9.6,12.6,13.6])box(.08,2.2,.12,M(0x5a3a28),dx,1.1,19.4);box(1.2,.08,.12,M(0x5a3a28),9.1,2.2,19.4);box(1.2,.08,.12,M(0x5a3a28),13.1,2.2,19.4);
function doorLeaf(hx,hz,th,w){const g=new THREE.Group();g.position.set(hx,0,hz);g.rotation.y=th;scene.add(g);box(w,2.1,.05,M(0x6a4630),w/2,1.05,0,g);box(.05,.12,.09,M(0xc9a24a),w-.1,1.0,0,g);return g}
doorLeaf(8.6,19.4,1.45,1.0);doorLeaf(12.6,19.4,1.45,1.0);doorLeaf(-7,2.0,-.12,1.0);
const RLGT=(()=>{const c=document.createElement('canvas');c.width=c.height=64;const x=c.getContext('2d'),g=x.createRadialGradient(32,32,2,32,32,32);g.addColorStop(0,'rgba(255,240,190,.9)');g.addColorStop(.4,'rgba(255,225,150,.28)');g.addColorStop(1,'rgba(255,225,150,0)');x.fillStyle=g;x.fillRect(0,0,64,64);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;return t})();
const ROOMLAMPS=[];
function roomLamp(x,z){const g=new THREE.Group();g.position.set(x,2.97,z);scene.add(g);
 box(.012,.34,.012,M(0x222222),0,-.17,0,g);
 const sh=new THREE.Mesh(new THREE.CylinderGeometry(.07,.24,.17,12,1,true),new THREE.MeshLambertMaterial({color:0xe6dcc4,side:THREE.DoubleSide,flatShading:true}));sh.position.y=-.43;g.add(sh);
 const bb=new THREE.Mesh(new THREE.SphereGeometry(.065,8,6),B(0xfff0c0,{fog:false}));bb.position.y=-.5;g.add(bb);
 const gl=new THREE.Sprite(new THREE.SpriteMaterial({map:RLGT,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,fog:false}));gl.scale.set(.55,.55,1);gl.material.opacity=.55;gl.position.y=-.52;g.add(gl);ROOMLAMPS.push(g)}
roomLamp(5.2,19);roomLamp(9.1,17.2);roomLamp(13.1,17.2);roomLamp(11,21.2);
fl(3,15,15,23,chk('#6b5a44','#5e4e3a',24,16));const HCEIL=new THREE.MeshBasicMaterial({color:0xcfc8b8});cl(3,15,15,23,HCEIL,2.97);
{const g=new THREE.Group();g.position.set(5.5,0,15);g.rotation.y=-1.25;scene.add(g);box(1.2,2.1,.06,M(0x5a3a28),.6,1.05,0,g);g.traverse(n=>{});window.__doorG=g}
const doorMesh=window.__doorG.children[0];
/* sofa faces the TV; the aisle from the front door to the altar stays clear */
{const SC=0x6a5a7a,SD=0x5a4a6a;box(.8,.42,1.8,M(SC),4.6,.21,18.5);box(.2,.58,1.8,M(SC),5.1,.71,18.5);box(.8,.18,.2,M(SD),4.6,.5,17.7);box(.8,.18,.2,M(SD),4.6,.5,19.3);box(.6,.12,.62,M(0x7a6a8a),4.55,.48,18.15);box(.6,.12,.62,M(0x7a6a8a),4.55,.48,18.85);AABB.push([4.0,5.2,17.6,19.4])}
/* dining table + chairs + clock */
/* the dining table sits in the kitchen corner, beside the fridge */
box(1.6,.06,.95,M(0x7a5a38),11.1,.75,21.3);for(const dx of[-.7,.7])for(const dz of[-.4,.4])box(.07,.72,.07,M(0x4a3420),11.1+dx,.36,21.3+dz);AABB.push([10.3,11.9,20.8,21.8]);
for(const [cx,cz] of[[10.55,22.150000000000002],[11.65,22.150000000000002],[10.55,20.45],[11.65,20.45]]){box(.42,.05,.42,M(0xb0453a),cx,.45,cz);box(.42,.5,.05,M(0xb0453a),cx,.72,cz+(cz>21.3?.2:-.2));for(const dx of[-.17,.17])for(const dz of[-.17,.17])box(.04,.43,.04,M(0x3a2a18),cx+dx,.22,cz+dz)}
{const ck=ctex(32,32,c=>{c.fillStyle='#f3efe2';c.beginPath();c.arc(16,16,15,0,7);c.fill();c.strokeStyle='#222';c.lineWidth=1.5;c.stroke();c.fillStyle='#222';for(let i=0;i<12;i++){const a=i/12*Math.PI*2;c.fillRect(16+Math.sin(a)*12.5-.8,16-Math.cos(a)*12.5-.8,1.6,1.6)}c.lineWidth=2;c.beginPath();c.moveTo(16,16);c.lineTo(16,6);c.stroke();c.lineWidth=2.6;c.beginPath();c.moveTo(16,16);c.lineTo(22,16);c.stroke();c.strokeStyle='#c4352a';c.lineWidth=1;c.beginPath();c.moveTo(16,16);c.lineTo(10,21);c.stroke()});

 /* big wall clock above sofa */const wc=new THREE.Mesh(new THREE.CircleGeometry(.32,20),new THREE.MeshBasicMaterial({map:ck}));wc.position.set(3.04,2.05,18.5);wc.rotation.y=Math.PI/2;scene.add(wc)}
/* TV cupboard on the west wall (where the photo table used to be) */
box(.5,.7,1.4,M(0x5a3a28),3.3,.35,18.5);box(.56,.05,1.5,M(0x6b4a30),3.3,.72,18.5);box(.04,.5,.04,M(0x3a2a18),3.3,.77,18.5);
box(.1,.56,.98,M(0x111114),3.42,1.04,18.5);{const sc=new THREE.Mesh(new THREE.BoxGeometry(.02,.48,.88),new THREE.MeshBasicMaterial({color:0x232b2e}));sc.position.set(3.475,1.04,18.5);scene.add(sc)}
AABB.push([3,3.7,17.7,19.3]);
/* photo table beside the altar, on the south wall */
box(1.3,.9,.5,M(0x5a3a28),4.55,.45,22.4);box(1.4,.05,.6,M(0x6b4a30),4.55,.92,22.4);const PHOTO=[];
{const fr=box(.54,.46,.04,M(0x222222),4.55,1.2,22.45);PHOTO.push(fr);
 const ph=new THREE.Mesh(new THREE.PlaneGeometry(.46,.38),B(0x9a9486));ph.position.set(4.55,1.2,22.42);ph.rotation.y=Math.PI;scene.add(ph);PHOTO.push(ph);
 /* the memory photo: you and Atuk in front of the shop */
 new THREE.TextureLoader().load('./photo.png',t=>{t.magFilter=THREE.NearestFilter;t.minFilter=THREE.NearestFilter;t.colorSpace=THREE.SRGBColorSpace;ph.material=new THREE.MeshBasicMaterial({map:t})})}
box(.12,.07,.12,M(0xd2a640),4.05,.985,22.4);for(const dx of[-.03,0,.03])box(.01,.2,.01,B(0xff5a3a),4.05+dx,1.12,22.4);
AABB.push([3.9,5.2,22.1,22.7]);

/* leaving the house at the start of every new day: open the door, step out, close it behind you */
const doorSeen={};
async function doorOut(){busy=true;await cineIn();const dg=window.__doorG;dg.rotation.y=0;
  const walk=(x,z,ms)=>{const x0=P.x,z0=P.z;let st=0;return tween(k=>{const e=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;P.x=x0+(x-x0)*e;P.z=z0+(z-z0)*e;st++;EYE.y=1.6+Math.sin(performance.now()/110)*.03;if(st%16===0)A.step()},ms).then(()=>{EYE.y=1.6})};
  CINE.noclip=true;await camTo(6.0,15.75,0,0,500);
  handAct('reach',1500);await csleep(450);A.click();A.nz(.8,300,520,.1,'bandpass',4);
  A.door();await tween(k=>{dg.rotation.y=-1.25*Math.min(1,k*1.15)},1000);
  await walk(6.1,14.5,1500);
  await camTo(6.1,14.5,Math.PI,0,750);handAct('reach',1500);await csleep(450);
  await tween(k=>{const e=k*k*(3-2*k);dg.rotation.y=-1.25*(1-e)},850);A.knock();A.nz(.18,160,60,.4,'lowpass');await csleep(500);
  await camTo(6.1,14.5,0,0,700);CINE.noclip=false;busy=false;await cineOut()}
/* family altar facing the front door: red cabinet, plaque, candles, burning joss sticks */
const ALT={fl:[],sm:[],tip:[]};
{const gp=new THREE.Group();gp.position.set(6.1,0,22.7);scene.add(gp);
 const bx=(w,h,d,c,x,y,z,e)=>box(w,h,d,M(c,e?{emissive:e}:{}),x,y,z,gp);
 const cy=(r,h,c,x,y,z,e,r2)=>{const m=new THREE.Mesh(new THREE.CylinderGeometry(r2||r,r,h,10),M(c,e?{emissive:e}:{}));m.position.set(x,y,z);gp.add(m);return m};
 const RED=0x8a1a14,DR=0x5e0f0b,GOLD=0xd2a640;
 bx(1.3,.9,.42,RED,0,.45,0);bx(1.36,.05,.48,GOLD,0,.93,-.01);bx(1.34,.05,.46,GOLD,0,.03,-.01);
 bx(.58,.68,.02,DR,-.32,.46,-.22);bx(.58,.68,.02,DR,.32,.46,-.22);bx(.04,.14,.03,GOLD,-.04,.46,-.24);bx(.04,.14,.03,GOLD,.04,.46,-.24);
 bx(1.2,.05,.02,GOLD,0,.84,-.22);bx(.5,.04,.02,GOLD,-.32,.1,-.22);bx(.5,.04,.02,GOLD,.32,.1,-.22);
 bx(1.3,.05,.34,RED,0,1.5,.04);bx(1.36,.04,.38,GOLD,0,1.53,.04);
 const plT=ctex(160,100,c=>{c.fillStyle='#8a1a14';c.fillRect(0,0,160,100);c.strokeStyle='#d2a640';c.lineWidth=4;c.strokeRect(5,5,150,90);c.lineWidth=1;c.strokeRect(12,12,136,76);
   c.fillStyle='#e8c25a';c.font='900 33px "Noto Serif CJK SC","Noto Sans CJK SC","Microsoft YaHei",serif';c.textAlign='center';c.textBaseline='middle';['天','官','赐','福'].forEach((h,i)=>c.fillText(h,32+i*32,50))});
 const pl=new THREE.Mesh(new THREE.PlaneGeometry(1.3,.82),B(0xffffff,{map:plT}));pl.position.set(0,2.05,.2);pl.rotation.y=Math.PI;gp.add(pl);
 cy(.09,.04,GOLD,0,1.57,.04,0x3a2a08);cy(.07,.22,GOLD,0,1.7,.04,0x3a2a08,.1);{const hd=new THREE.Mesh(new THREE.SphereGeometry(.06,10,8),M(GOLD,{emissive:0x3a2a08}));hd.position.set(0,1.87,.04);gp.add(hd)}
 const stex=d=>{const cv=document.createElement('canvas');cv.width=cv.height=64;d(cv.getContext('2d'));return new THREE.CanvasTexture(cv)};
 const fxT=stex(c=>{const gr=c.createRadialGradient(32,36,2,32,34,28);gr.addColorStop(0,'rgba(255,240,170,1)');gr.addColorStop(.4,'rgba(255,150,40,.8)');gr.addColorStop(1,'rgba(255,70,10,0)');c.fillStyle=gr;c.fillRect(0,0,64,64)});
 const smT=stex(c=>{const gr=c.createRadialGradient(32,32,2,32,32,30);gr.addColorStop(0,'rgba(235,235,235,.5)');gr.addColorStop(1,'rgba(235,235,235,0)');c.fillStyle=gr;c.fillRect(0,0,64,64)});
 const sp=(x,y,z,s,tex,op,add)=>{const m=new THREE.Sprite(new THREE.SpriteMaterial({map:tex,transparent:true,opacity:op,depthWrite:false,fog:false,blending:add?THREE.AdditiveBlending:THREE.NormalBlending}));m.position.set(x,y,z);m.scale.set(s,s,1);gp.add(m);return m};
 for(const [x,y,h] of[[-.5,1.64,.2],[.5,1.64,.2],[-.55,1.01,.16],[.55,1.01,.16]]){cy(.035,h,0xc0201a,x,y,-.04,0x300604);const f=sp(x,y+h/2+.13,-.04,.22,fxT,1,1);ALT.fl.push([f,.22])}
 cy(.1,.1,GOLD,0,.99,-.08,0x3a2a08,.12);cy(.085,.02,0x3a2a14,0,1.045,-.08);
 for(const [dx,dz] of[[-.04,0],[0,-.03],[.04,0],[-.02,.03],[.02,.03]]){cy(.005,.26,0x9a2a1a,dx,1.18,-.08+dz,0x200604);const tp=sp(dx,1.31,-.08+dz,.1,fxT,.9,1);ALT.tip.push(tp)}
 cy(.14,.015,0xe8e0d0,-.4,.96,-.08);for(const [x,z] of[[-.45,-.1],[-.35,-.1],[-.4,-.02]]){const o=new THREE.Mesh(new THREE.SphereGeometry(.05,8,6),M(0xf08a1a,{emissive:0x301800}));o.position.set(x,1.01,z);gp.add(o)}
 for(const x of[.3,.4,.5])cy(.03,.04,0xf2f0e8,x,.96,-.14);bx(.09,.13,.01,0xc0201a,.28,.98,-.18);
 for(let i=0;i<9;i++){const s=sp(0,1.4+i*.14,-.08,.12+i*.045,smT,Math.max(.1,.5-i*.05));ALT.sm.push([s,i])}
 const halo=sp(0,1.3,-.5,3.4,fxT,.2,1);ALT.halo=halo;
 AABB.push([5.4,6.8,22.2,23.1]);ALT.gp=gp}
function animAltar(t){for(const [f,s] of ALT.fl){const k=1+Math.sin(t*11+f.position.x*7)*.12+Math.sin(t*23+f.position.x)*.08;f.scale.set(s*k,s*1.5*k,1)}
  for(const tp of ALT.tip)tp.material.opacity=.7+Math.sin(t*3+tp.position.x*40)*.2;
  for(const [s,i] of ALT.sm){const ph=(t*.18+i*.11)%1.2;s.position.x=Math.sin(t*.9+i*1.3)*.05*(1+i*.4);s.material.opacity=Math.max(.06,.5-i*.05)*(.8+Math.sin(t*1.7+i)*.2)}
  if(ALT.halo)ALT.halo.material.opacity=.17+Math.sin(t*5)*.03}

/* Atuk's room */
box(1.0,.35,2.0,M(0x6a5a44),7.75,.18,16.15);box(.95,.12,1.9,M(0x3f6f8a),7.75,.42,16.25);box(.6,.12,.35,M(0xe8e4d8),7.75,.52,15.4);AABB.push([7.2,8.28,15.1,17.2]);
box(.9,2.0,.5,M(0x5a3a28),10.6,1.0,15.4);AABB.push([10.1,11.1,15.15,15.65]);box(.45,.5,.45,M(0x5a3a28),8.6,.25,15.4);box(.22,.04,.22,M(0xf2d48a),8.6,.55,15.4);AABB.push([8.35,8.85,15.15,15.65]);
box(.5,.02,.7,M(0x8a3a3a),8.95,.011,16.6);
/* my room extras */
box(1.1,.05,.5,M(0x6b4a30),12.0,.72,15.5);for(const dx of[-.5,.5])box(.05,.7,.05,M(0x3a301f),12.0+dx,.35,15.5);box(.35,.04,.35,M(0xf2d48a),12.3,.77,15.5);AABB.push([11.4,12.65,15.15,15.85]);
box(.7,1.7,.45,M(0x5a3a28),11.7,.85,18.95);AABB.push([11.35,12.05,18.7,19.2]);
box(2.2,.4,1.2,M(0x6a6f8a),13.9,.2,17);box(.3,.1,.8,M(0xd8d8d8),14.8,.45,17);AABB.push([12.8,15,16.4,17.6]);
box(.7,1.8,.7,M(0xc8ccd0),14.5,.9,22.5);AABB.push([14.1,15,22.1,22.9]);
ZONES.push([-1.7,1.7,3.5,4.45],[-24.5,24.5,4.4,14.3],[5.65,6.55,14.2,15.4],[3.35,6.85,15.35,22.65],[6.8,7.6,20.15,20.85],[7.55,10.85,15.35,19.05],[11.55,14.65,15.35,19.05],[7.55,14.65,19.75,22.65],[8.75,9.45,19.0,19.8],[12.75,13.45,19.0,19.8]);

const BALC=[];
/* ---- house exterior: upper floor, hip roof, balcony, porch, garden ---- */
{const paint='#f6e3a1';
 const front=M(0xffffff,{map:ctex(48,13,c=>{c.fillStyle=paint;c.fillRect(0,0,48,13);c.fillStyle='rgba(0,0,0,.1)';c.fillRect(0,11,48,2);c.fillStyle='#fff';c.fillRect(0,0,48,1);
   for(const wx of[6,34]){c.fillStyle='#fff';c.fillRect(wx-1,2,10,9);c.fillStyle='#2b3947';c.fillRect(wx,3,8,7);c.fillStyle='rgba(255,255,255,.25)';c.fillRect(wx,6,8,1);c.fillStyle='#fff';c.fillRect(wx+3,3,2,7);c.fillStyle='#b5651d';c.fillRect(wx-2,2,1,9);c.fillRect(wx+9,2,1,9)}
   c.fillStyle='#fff';c.fillRect(19,1,10,11);c.fillStyle='#e8c35a';c.fillRect(20,2,8,10);c.fillStyle='rgba(120,70,20,.5)';c.fillRect(23,2,2,10);c.fillStyle='#fff';c.fillRect(19,1,10,1)})});
 const sideM=M(0xf6e3a1),topM=M(0xd9c98a);
 const up=new THREE.Mesh(new THREE.BoxGeometry(12.1,3.2,8.1),[sideM,sideM,topM,topM,sideM,front]);up.position.set(9,4.6,19);scene.add(up);
 const rg=new THREE.ConeGeometry(1,2.3,4);rg.rotateY(Math.PI/4);
 const roof=new THREE.Mesh(rg,M(0xffffff,{map:ctex(16,16,c=>{c.fillStyle='#b5532f';c.fillRect(0,0,16,16);c.fillStyle='#8f3d20';for(let y=0;y<16;y+=4)c.fillRect(0,y,16,1);for(let x=0;x<16;x+=4)c.fillRect(x,0,1,16)},8,2)}));
 roof.scale.set(7.4/.7071,1,5.4/.7071);roof.position.set(9,7.35,19);scene.add(roof);
 box(14.2,.25,10.2,M(0x8f3d20),9,6.25,19);
 /* balcony + railing */
 box(4.6,.18,1.0,M(0xd9c98a),9,3.1,14.55);for(let i=0;i<=8;i++)box(.06,.7,.06,M(0xffffff),6.95+i*.55,3.5,14.1);box(4.6,.06,.08,M(0xffffff),9,3.85,14.1);
 for(const [px,col] of[[7.4,0xff6f91],[10.6,0xffb703]]){const pt=new THREE.Mesh(new THREE.CylinderGeometry(.15,.11,.22,7),M(0xb85a3a));pt.position.set(px,4.0,14.2);scene.add(pt);const b=new THREE.Mesh(new THREE.SphereGeometry(.2,6,5),M(0x3da34f));b.position.set(px,4.25,14.2);scene.add(b);const f=new THREE.Mesh(new THREE.SphereGeometry(.07,5,4),B(col));f.position.set(px+.08,4.4,14.28);scene.add(f);BALC.push(pt,b,f)}
 /* porch over the door + pillars */
 box(3.2,.14,1.3,M(0x8f3d20),6.1,2.85,14.45);for(const px of[4.6,7.6])box(.18,2.8,.18,M(0xffffff),px,1.4,13.9);AABB.push([4.45,4.75,13.75,14.05],[7.45,7.75,13.75,14.05]);
 /* low gate wall + plants + number plate */
 for(const px of[3.4,8.8,10.6,12.4,14.2]){const pt=new THREE.Mesh(new THREE.CylinderGeometry(.28,.2,.4,8),M(0xb85a3a));pt.position.set(px,.2,14.6);scene.add(pt);for(const [dx,dy,r] of[[0,.75,.36],[.16,.6,.26]]){const l=new THREE.Mesh(new THREE.SphereGeometry(r,7,5),M(0x3da34f));l.position.set(px+dx,dy,14.6);scene.add(l)}}
 const plate=new THREE.Mesh(new THREE.PlaneGeometry(.5,.3),B(0xffffff));plate.position.set(7.35,1.7,14.93);plate.rotation.y=Math.PI;scene.add(plate);
 const pt2=new THREE.Mesh(new THREE.PlaneGeometry(.46,.26),new THREE.MeshBasicMaterial({map:ctex(46,26,c=>{c.fillStyle='#f5f5f0';c.fillRect(0,0,46,26);c.fillStyle='#8f3d20';c.font='bold 18px monospace';c.textAlign='center';c.fillText('No.7',23,19)})}));pt2.position.set(7.35,1.7,14.92);pt2.rotation.y=Math.PI;scene.add(pt2);
 /* lit upstairs window (warm) */
 const lw=new THREE.Mesh(new THREE.PlaneGeometry(.8,.65),B(0xf2d48a));lw.position.set(9,4.55,14.93);lw.rotation.y=Math.PI;scene.add(lw)}
/* ---- waypoint: walk-to marker ---- */
const WPS={d1_go:{x:.9,z:5.5,r:.6,go:1,fn:d1Knock},d1_greet:{x:2.8,z:3.05,r:.6,go:1,fn:cineAtuk},d1_report:{x:2.8,z:3.05,r:.6,go:1,fn:cineAtuk},d1_back:{x:2.8,z:3.05,r:.6,go:1,fn:cineAtuk},d1_rule:{x:2.8,z:3.05,r:.6,go:1,fn:cineAtuk},d1_bath:{x:-8.2,z:2.5,r:.6,go:1,fn:cineBath},d1_fuse:{x:-4.0,z:.5,r:.7,go:1,fn:d1FuseAct},d1_lock:{x:.3,z:5.3,r:.6,go:1,fn:cineLock},d1_home:{x:6.1,z:14.0,r:.6,go:1,fn:cineHome}};
const WP={x:0,z:0,r:.6};
const WPG=new THREE.Group();WPG.position.set(WP.x,0,WP.z);scene.add(WPG);
{const ring=new THREE.Mesh(new THREE.RingGeometry(WP.r-.05,WP.r,40),new THREE.MeshBasicMaterial({color:0xE0A526,transparent:true,opacity:.6,depthWrite:false,fog:false,side:THREE.DoubleSide}));ring.material.opacity=.32;ring.rotation.x=-Math.PI/2;ring.position.y=.04;WPG.add(ring);
 const disc=new THREE.Mesh(new THREE.CircleGeometry(WP.r-.05,40),new THREE.MeshBasicMaterial({color:0xE0A526,transparent:true,opacity:.1,depthWrite:false,fog:false}));disc.rotation.x=-Math.PI/2;disc.position.y=.035;WPG.add(disc);
 const bt=ctex(8,64,c=>{const g=c.createLinearGradient(0,0,0,64);g.addColorStop(0,'rgba(255,205,90,0)');g.addColorStop(1,'rgba(255,205,90,.9)');c.fillStyle=g;c.fillRect(0,0,8,64)});
 const beam=new THREE.Mesh(new THREE.CylinderGeometry(.09,.09,2.6,10,1,true),new THREE.MeshBasicMaterial({map:bt,transparent:true,opacity:.3,depthWrite:false,fog:false,blending:THREE.AdditiveBlending,side:THREE.DoubleSide}));beam.visible=false;WPG.add(beam);
 const chev=new THREE.Mesh(new THREE.SphereGeometry(.04,10,8),new THREE.MeshBasicMaterial({color:0xF2B531,transparent:true,opacity:.9,fog:false,depthWrite:false}));chev.position.y=1.45;WPG.add(chev);
 const halo=new THREE.Sprite(new THREE.SpriteMaterial({map:GLOW.material.map,color:0xffc850,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,fog:false,opacity:.5}));halo.scale.set(.42,.42,1);chev.add(halo);chev.userData.halo=halo;
 WPG.userData={ring,disc,beam,chev}}
function wpTick(){const w=WPS[state];if(CINE.on){WPG.visible=false;return}if(!w||busy){WPG.visible=false;if(!w&&$('obj').textContent!==OBJB)$('obj').textContent=OBJB;return}
  const d=Math.hypot(P.x-w.x,P.z-w.z);WP.x=w.x;WP.z=w.z;WP.r=w.r;WPG.position.set(w.x,0,w.z);WPG.visible=w.go||d>w.r;
  const t=performance.now()/1000,k=1+Math.sin(t*3)*.04;WPG.userData.ring.scale.set(k,k,1);{const fd=Math.max(.2,Math.min(1,(d-.7)/1.6)),pl=.75+Math.sin(t*3)*.25,c=WPG.userData.chev;c.position.y=1.45+Math.sin(t*2)*.03;c.material.opacity=.9*fd*pl;c.userData.halo.material.opacity=.5*fd*pl;WPG.userData.ring.material.opacity=.14+.2*fd;WPG.userData.disc.material.opacity=.04+.04*fd}
  const txt=OBJB&&WPG.visible?OBJB+'  ·  '+Math.max(0,Math.round(d-w.r))+' m':OBJB;if($('obj').textContent!==txt)$('obj').textContent=txt}
/* ---------- audio ---------- */
let ac=null,master,hum,humG,statG,droneG;
function initAudio(){
  try{ac=new (window.AudioContext||window.webkitAudioContext)();master=ac.createGain();master.gain.value=.9;master.connect(ac.destination);
  const o1=ac.createOscillator(),o2=ac.createOscillator(),lp=ac.createBiquadFilter();droneG=ac.createGain();droneG.gain.value=.05;o1.frequency.value=55;o2.frequency.value=55.8;o1.type='sine';o2.type='triangle';lp.type='lowpass';lp.frequency.value=220;o1.connect(lp);o2.connect(lp);lp.connect(droneG);droneG.connect(master);o1.start();o2.start();
  hum=ac.createOscillator();hum.type='sawtooth';hum.frequency.value=100;const bp=ac.createBiquadFilter();bp.type='bandpass';bp.frequency.value=300;bp.Q.value=2;humG=ac.createGain();humG.gain.value=0;hum.connect(bp);bp.connect(humG);humG.connect(master);hum.start();
  const nb=ac.createBuffer(1,ac.sampleRate*2,ac.sampleRate),d=nb.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;A.nb=nb;
  const ns=ac.createBufferSource();ns.buffer=nb;ns.loop=true;const sb=ac.createBiquadFilter();sb.type='bandpass';sb.frequency.value=1800;sb.Q.value=.7;statG=ac.createGain();statG.gain.value=0;ns.connect(sb);sb.connect(statG);statG.connect(master);ns.start();
  try{ambInit()}catch(e){console.warn('amb',e)}
  }catch(e){ac=null}
}
const A={
  nz(dur,f0,f1,g,type='bandpass',q=1){if(!ac)return;const s=ac.createBufferSource();s.buffer=A.nb;const f=ac.createBiquadFilter();f.type=type;f.Q.value=q;const t=ac.currentTime;f.frequency.setValueAtTime(f0,t);f.frequency.exponentialRampToValueAtTime(f1,t+dur);const ga=ac.createGain();ga.gain.setValueAtTime(g,t);ga.gain.exponentialRampToValueAtTime(.0001,t+dur);s.connect(f);f.connect(ga);ga.connect(master);s.start(t,Math.random()*1.5,dur+.05)},
  tone(f0,f1,dur,g,type='sine'){if(!ac)return;const o=ac.createOscillator(),ga=ac.createGain(),t=ac.currentTime;o.type=type;o.frequency.setValueAtTime(f0,t);o.frequency.exponentialRampToValueAtTime(f1,t+dur);ga.gain.setValueAtTime(g,t);ga.gain.exponentialRampToValueAtTime(.0001,t+dur);o.connect(ga);ga.connect(master);o.start(t);o.stop(t+dur+.05)},
  step(){A.nz(.09,500,200,.1,'lowpass',.7)},
  knock(){A.tone(150,60,.14,.5);A.nz(.09,500,150,.35,'lowpass',.8)},
  click(){A.tone(1400,900,.05,.08,'square')},
  sting(){AMB.duck(3200);A.nz(.5,3000,500,.35,'highpass',.5);A.tone(90,30,.9,.5);A.tone(440,466,.35,.07,'sawtooth');A.tone(466,494,.35,.06,'sawtooth')},
  scrape(){A.nz(.9,250,900,.22,'bandpass',3)},
  clink(){A.tone(2600,2000,.07,.05)},door(){A.tone(90,60,.25,.18,'sine')},shutter(){A.scrape()},jiggle(){A.click()},
  rumble(){A.nz(2.6,90,60,.5,'lowpass',.7);A.tone(48,40,2.6,.25)},
  static(v){if(statG)statG.gain.setTargetAtTime(v,ac.currentTime,.08)},
  humv(v){if(humG)humG.gain.setTargetAtTime(v,ac.currentTime,.05)},
};

/* ---------- ambience: layered room sound that gets heavier each day ---------- */
let ambG=null,tenG=null,roomG=null,AMBT=0;
const AMBD=[null,
 {lv:.012,gap:[14,26],g:.5,ev:['creak','clink','far']},
 {lv:.03,gap:[11,20],g:.7,ev:['creak','clink','steps','chair','far']},
 {lv:.05,gap:[9,17],g:.9,ev:['creak','steps','chair','murmur','knock','far','clink']},
 {lv:.07,gap:[7,13],g:1.1,ev:['creak','steps','steps','murmur','knock','breath','chair']},
 {lv:.02,gap:[20,34],g:.4,ev:['clink','far','chair']}];
function ambInit(){
  ambG=ac.createGain();ambG.gain.value=1;ambG.connect(master);
  /* tension chord: low fifth-ish drone with a slow wobble */
  tenG=ac.createGain();tenG.gain.value=0;const tl=ac.createBiquadFilter();tl.type='lowpass';tl.frequency.value=260;tl.connect(tenG);tenG.connect(ambG);
  for(const [f,ty] of[[41.2,'sine'],[55.5,'triangle'],[82.8,'sine'],[87.3,'sine']]){const o=ac.createOscillator();o.type=ty;o.frequency.value=f;const lf=ac.createOscillator(),lg=ac.createGain();lf.frequency.value=.05+Math.random()*.08;lg.gain.value=f*.012;lf.connect(lg);lg.connect(o.frequency);const og=ac.createGain();og.gain.value=f>80?.35:.7;o.connect(og);og.connect(tl);o.start();lf.start()}
  /* room tone + a distant fridge hum */
  const rs=ac.createBufferSource();rs.buffer=A.nb;rs.loop=true;const rf=ac.createBiquadFilter();rf.type='lowpass';rf.frequency.value=420;roomG=ac.createGain();roomG.gain.value=.022;rs.connect(rf);rf.connect(roomG);roomG.connect(ambG);rs.start();
  const fo=ac.createOscillator();fo.type='sine';fo.frequency.value=100;const fg=ac.createGain();fg.gain.value=.006;fo.connect(fg);fg.connect(ambG);fo.start();
  ambTick()}
const aN=(dur,f0,f1,g,type,q,p,at=0)=>{if(!ac)return;const s=ac.createBufferSource();s.buffer=A.nb;const f=ac.createBiquadFilter();f.type=type;f.Q.value=q;const t=ac.currentTime+at;f.frequency.setValueAtTime(f0,t);f.frequency.exponentialRampToValueAtTime(f1,t+dur);const ga=ac.createGain();ga.gain.setValueAtTime(g,t);ga.gain.exponentialRampToValueAtTime(.0001,t+dur);let o=ga;if(ac.createStereoPanner){const pn=ac.createStereoPanner();pn.pan.value=p;ga.connect(pn);o=pn}s.connect(f);f.connect(ga);o.connect(ambG);s.start(t,Math.random()*1.5,dur+.05)};
const aT=(f0,f1,dur,g,type,p,lp,at=0)=>{if(!ac)return;const o=ac.createOscillator(),ga=ac.createGain(),t=ac.currentTime+at;o.type=type;o.frequency.setValueAtTime(f0,t);o.frequency.exponentialRampToValueAtTime(f1,t+dur);ga.gain.setValueAtTime(g,t);ga.gain.exponentialRampToValueAtTime(.0001,t+dur);let n=o;if(lp){const f=ac.createBiquadFilter();f.type='lowpass';f.frequency.value=lp;o.connect(f);n=f}n.connect(ga);let e=ga;if(ac.createStereoPanner){const pn=ac.createStereoPanner();pn.pan.value=p;ga.connect(pn);e=pn}e.connect(ambG);o.start(t);o.stop(t+dur+.05)};
const AEV={
 creak(g,p){aT(190,105,.9,.07*g,'sawtooth',p,520)},
 clink(g,p){aT(2900,2700,.35,.05*g,'sine',p);aT(4300,4000,.25,.03*g,'sine',p,0,.03)},
 far(g,p){aN(2.8,90,55,.28*g,'lowpass',.7,p)},
 steps(g,p){const n=3+(Math.random()*3|0);for(let i=0;i<n;i++)aN(.11,430,170,.34*g*(1-i*.05),'lowpass',.7,p+(i-n/2)*.05,i*(.55+Math.random()*.15))},
 chair(g,p){aN(.55,280,850,.1*g,'bandpass',3,p)},
 knock(g,p){for(let i=0;i<3;i++){aT(120,55,.16,.22*g,'sine',p,300,i*.5);aN(.09,350,120,.18*g,'lowpass',.8,p,i*.5)}},
 murmur(g,p){const n=5+(Math.random()*4|0);let t=0;for(let i=0;i<n;i++){const f=500+Math.random()*900;aN(.14,f,f*1.15,.07*g,'bandpass',4,p,t);t+=.16+Math.random()*.16}},
 breath(g,p){aN(1.5,700,260,.1*g,'bandpass',.9,p);aN(1.7,260,520,.07*g,'bandpass',.9,p,1.7)}};
function ambTick(){
  const day=(/^d([1-5])_/.exec(state)||[])[1]|0,cfg=AMBD[day];
  if(ac&&tenG){const lv=cfg?cfg.lv:0;tenG.gain.setTargetAtTime(lv,ac.currentTime,2.5);roomG.gain.setTargetAtTime((cfg?(day===5?.015:.022):.012)*(G.roomMul??1),ac.currentTime,2)}
  AMBT-=1;if(cfg&&AMBT<=0){AMBT=cfg.gap[0]+Math.random()*(cfg.gap[1]-cfg.gap[0]);
    const k=cfg.ev[Math.random()*cfg.ev.length|0],p=(Math.random()<.5?-1:1)*(.45+Math.random()*.5);try{AEV[k](cfg.g,p)}catch(_){}}
  setTimeout(ambTick,1000)}
const AMB={duck(ms){if(!ac||!ambG)return;const t=ac.currentTime;ambG.gain.cancelScheduledValues(t);ambG.gain.setTargetAtTime(.08,t,.05);ambG.gain.setTargetAtTime(1,t+ms/1000,1.2)},
  ev(k){if(AEV[k])AEV[k](1,Math.random()<.5?-.6:.6)}};

/* ---------- lights ---------- */
let lightF=0,lightsOn=false,TIME='night',AB=.02,AK=.4,SK=26,HK=16,LK=8;
const SKY={day:{bg:0xb4d2e6,fd:.012,amb:0xf2f5fa,ab:1.5,ak:.15,sk:0,hk:2,lk:2,lamp:0,star:0,drone:.012},
 dusk:{bg:0xc9805e,fd:.026,amb:0xffc4a0,ab:.8,ak:.2,sk:10,hk:8,lk:4,lamp:.6,star:0,drone:.03},
 night:{bg:0x05070a,fd:.075,amb:0x6070a0,ab:.02,ak:.4,sk:26,hk:16,lk:8,lamp:1,star:1,drone:.05}};
function setTime(t,raw){{const d=(/^d([1-5])_/.exec(state)||[])[1]|0;if(!raw&&d>=2&&d<=4&&(t==='day'||t==='dusk'))t='night'}TIME=t;const k=SKY[t];scene.background.setHex(k.bg);scene.fog.density=k.fd;if(t!=='night')scene.fog.color.setHex(k.bg);amb.color.setHex(k.amb);AB=k.ab;AK=k.ak;SK=k.sk;HK=k.hk;LK=k.lk;
 GLOWS.forEach(g=>{g.visible=k.lamp>0;g.material.opacity=k.lamp});if(DOME){DOME.visible=t!=='night';if(SKYT[t]){DOME.material.map=SKYT[t];DOME.material.needsUpdate=true}}STARS.visible=MOON.visible=k.star>0;if(droneG)droneG.gain.value=k.drone;applyLights(lightF)}
function applyLights(f){lightF=f;{const k=(.16+.3*Math.min(1,f))*({day:1,dusk:.6,night:.2})[TIME];HCEIL.color.setRGB(.81*k,.78*k,.72*k)}L1.intensity=f*LK;L2.intensity=f*LK;LZ.intensity=f*ZK;amb.intensity=AB+f*AK+(f>0&&TIME==='day'?.12:0);tubeMat.forEach(m=>m.color.setRGB(.2+.8*f,.22+.8*f,.25+.8*f));if(TIME==='night')scene.fog.color.setRGB(.02+.01*f,.027+.01*f,.04+.01*f);A.humv&&ac&&A.humv(f*.014)}
async function flicker(pat,gap=70){for(const v of pat){applyLights(v);await sleep(gap+Math.random()*50)}}
async function lightsOnNow(){await flicker([.3,0,.8,0,0,.6,1,.2,1]);lightsOn=true}
function lightsOffNow(){lightsOn=false;applyLights(0)}

/* ---------- state + story ---------- */
let state='title',busy=false,scareDone=false,lookT=0,walkT=0;
const P={x:0,z:3,yaw:0,pitch:0,tx:null,tz:null,bob:0,fy:null};
let OBJB='';const objT=s=>{OBJB=s;$('obj').textContent=s};
const VOW=[[730,1090],[530,1840],[270,2290],[570,840],[300,870]];
function speak(g,dur,f0,vol=1){const u=g.userData,rate=g===atuk?3.4:4.4,n=Math.max(2,Math.round(dur*rate)),seg=dur/n,syl=[];
  for(let k=0;k<n;k++)syl.push([k*seg+Math.random()*seg*.12,seg*(.55+Math.random()*.25),.55+Math.random()*.45]);
  u.talk={t0:performance.now(),syl,end:dur};if(!ac)return;const t0=ac.currentTime+.02;
  for(const [st,d,a] of syl){const v=VOW[Math.random()*5|0],f=f0*(1+(Math.random()-.5)*.25)*(1-.1*st/dur);
    const o=ac.createOscillator(),o2=ac.createOscillator(),ga=ac.createGain(),mix=ac.createGain();o.type=o2.type='sawtooth';o.frequency.value=f;o2.frequency.value=f*1.012;mix.gain.value=.5;o.connect(mix);o2.connect(mix);
    [[v[0],1],[v[1],.5]].forEach(([fc,w])=>{const b=ac.createBiquadFilter();b.type='bandpass';b.frequency.value=fc;b.Q.value=fc/110;const gg=ac.createGain();gg.gain.value=w;mix.connect(b);b.connect(gg);gg.connect(ga)});
    const T=t0+st,pk=.45*a*vol;ga.gain.setValueAtTime(0,T);ga.gain.linearRampToValueAtTime(pk,T+d*.25);ga.gain.linearRampToValueAtTime(0,T+d);ga.connect(master);o.start(T);o2.start(T);o.stop(T+d+.05);o2.stop(T+d+.05)}}
function npcTick(dt){for(const g of NPCS){if(!g.visible)continue;const u=g.userData,dx=P.x-g.position.x,dz=P.z-g.position.z,d=Math.hypot(dx,dz);
  let tgt=0;if(d<4.5){let a=Math.atan2(dx,dz)-(g.rotation.y+Math.PI);a=Math.atan2(Math.sin(a),Math.cos(a));if(Math.abs(a)<1.9)tgt=Math.max(-1.05,Math.min(1.05,a))}
  u.head.rotation.y+=(tgt-u.head.rotation.y)*Math.min(1,dt*5);u.head.rotation.x=tgt?.06:0;
  let m=0;const tk=u.talk;if(tk){const t=(performance.now()-tk.t0)/1000;if(t>tk.end+.2)u.talk=null;else for(const [st,dd,a] of tk.syl){if(t>=st&&t<=st+dd){m=Math.sin((t-st)/dd*Math.PI)*a;break}}}
  u.mouth.visible=m>.08;u.mouth.scale.y=.08+m;u.mouth.scale.x=1.5-m*.3}}
let lastNpc=null,lastNpcT=0;
const NCOL={'YOU':'#bfe3ff','ATUK':'#f2b531','AH SENG':'#7fe0a8','MAK CIK':'#ff9fc0','RAJ':'#ffb26b','PAK HASSAN':'#c4a6ff','MEI LING':'#ff7f7f','DRIVER':'#b8b8b8'};
const TR=[['kopi-o kurang manis, ya?','Black coffee, less sugar, yes?'],['kopi-o kurang manis','Black coffee, less sugar.'],['kopi, roti bakar. kurang butter.','Coffee, toast. Less butter.'],['teh tarik, adik. panas-panas.','Pulled tea, young one. Piping hot.'],['teh-c peng','Iced tea with milk.'],['faham, atuk','Understood, Atuk.'],['faham?','Understood?'],['atuk balik dulu','Atuk is going home first.'],['siapa tu?','Who is it?'],['belum buka lagi ke?','Not open yet?'],['petrol naik lagi, you tau?','Petrol went up again, you know?'],['semalam punya bola, tak tengok ke?',"Last night's football, you didn't watch?"],['roti bakar sini memang best.','The toast here is really the best.'],['dulu satu roti bakar, lima puluh sen je.','Before, one toast was only fifty sen.'],['panas betul hari ni.','So hot today.'],['kopi sini sama macam dulu-dulu.','The coffee here is the same as always.'],['kopi sini sama macam dulu','The coffee here is the same as before.'],['adik, rajin betul. seorang je jaga ke?','Young one, so hardworking. Looking after it alone?'],['boss, cepat sikit boleh? nak pergi kerja.','Boss, can you hurry a bit? I need to go to work.'],['eh, gula habis ke?','Eh, is the sugar finished?'],['tidur cepat','Sleep early.'],['jangan buka','Do not open.'],['jangan jawab','Do not answer.'],['dengar ah','Listen.'],['dia datang! lari, cucu! lari!',"He's coming! Run, grandchild! Run!"],['cucu! tolong! tolong!','Grandchild! Help! HELP!'],['cucu... tolong...','Grandchild... help...'],['maaf... tolong... buka pintu...','Sorry... help... open the door...'],['buka! buka pintu!','OPEN! OPEN THE DOOR!'],['sebuah lori hilang kawalan dan melanggar sebuah kedai kopi di jalan','a lorry lost control and crashed into a coffee shop on Jalan'],['balik rumah','Go home.'],['terima kasih','Thank you.'],['maaf','Sorry.'],['bangun','Wake up.'],['masuk','Come in.'],['tutup','closed'],
['eh... dah pukul berapa?','Eh... what time is it?'],['dah lewat... anak saya tunggu.','It is late... my child is waiting.'],['bos... kopi saya belum habis.',"Boss... my coffee isn't finished."],['muka surat tujuh... belum sempat.',"Page seven... haven't got to it yet."],['saya kena balik. hari jadi anak saya.',"I have to go home. It's my child's birthday."],['hati-hati balik, ya.','Take care going home, okay?']].sort((a,b)=>b[0].length-a[0].length);
function transOf(t){let w=t.toLowerCase().replace(/[“”"]/g,'').replace(/\s+/g,' '),full=w.replace(/[^a-z]/g,'').length,out=[],got=0;
  for(const [k,v] of TR){const p=w.indexOf(k);if(p<0)continue;const L=k.replace(/[^a-z]/g,'').length;w=w.slice(0,p)+' '.repeat(k.length)+w.slice(p+k.length);got+=L;out.push([k,v,L])}
  if(!out.length)return '';const whole=got/Math.max(1,full)>.6;
  return out.map(([k,v])=>whole?v:'“'+k+'” = '+v).join(' · ')}
async function say(t,ms=2600,who){const s=$('sub');{const w=t.startsWith('ATUK:')?atuk:who;if(w&&w.visible)speak(w,Math.max(.8,Math.min(ms/1000-.4,t.length*.06)),w.userData.f0,Math.max(.15,Math.min(1,2.2/(1+Math.hypot(P.x-w.position.x,P.z-w.position.z)))))}const mm=/^([A-Z][A-Z ]{1,11})(?:>([A-Z][A-Z ]{0,11}))?: (.*)$/.exec(t),nm=who&&NAMEOF.get(who);let nme=null,body=t,tgt=null;if(mm){nme=mm[1];tgt=mm[2]||null;body=mm[3]}else if(nm)nme=nm;
  if(nme==='ATUK'&&!tgt)tgt='YOU';
  let self=false;if(nme==='YOU'&&!tgt){if(/^\.*Atuk(\.\.\.|\?|,)/.test(body)||/,\s*Atuk[.?!,]/.test(body))tgt='ATUK';else{const cm=/(Mak Cik|Ah Seng|Mei Ling|Raj|Pak Hassan)/.exec(body);if(cm)tgt=cm[1].toUpperCase();else if(/^d(3_look|4_find|5_serve)/.test(state)&&lastNpc&&performance.now()-lastNpcT<30000)tgt=lastNpc;else if(!/^[^a-z]*[A-Z]{3,}[^a-z]*$/.test(body))self=true}}
  const tr=transOf(body),esc=x=>x.replace(/&/g,'&amp;').replace(/</g,'&lt;'),col=nme&&(NCOL[nme]||'var(--acc)'),tl=tgt==='YOU'?'you':tgt==='ALL'?'everyone':tgt?tgt.toLowerCase().replace(/(^|\s)\w/g,m=>m.toUpperCase()):'';
  if(nme&&nme!=='YOU'&&nme!=='ATUK'&&NAMEOF.size&&[...NAMEOF.values()].includes(nme)){lastNpc=nme;lastNpcT=performance.now()}
  s.className='';s.classList.toggle('nar',!nme);s.classList.toggle('self',self);
  s.innerHTML=(nme&&!self?'<b style="color:'+col+'">'+nme+(tl?'<span class="to"> to '+tl+'</span>':'')+'</b>':'')+(self?'<span class="sf">('+esc(body)+')</span>':esc(body))+(tr?'<i>'+esc(tr)+'</i>':'');s.dataset.k=t;s.classList.add('on');if(tr)ms+=900;await(CINE.on?csleep(ms):sleep(ms));if(s.dataset.k===t)s.classList.remove('on')}
const ITS=[];const lab=o=>typeof o.label==='function'?o.label():o.label;
function it(id,pos,label,enabled,act,meshes){const o={id,pos:new THREE.Vector3(...pos),label,enabled,act};for(const m of meshes)m.traverse(n=>{if(n.isMesh)n.userData.it=o});ITS.push(o);return o}
it('radio',[4.15,1.2,-.2],'Turn off the radio',()=>state==='lit1',radioAct,[radio]);
it('shutter',[0,1.2,3.9],()=>state==='d1_open'?'Lift the shutter':'Lower the shutter',()=>state==='lit1'||state==='d1_open',shutterAct,[shutter]);
it('fuse',[-4.9,1.5,.5],'Check the fuse box',()=>state==='dark',fuseAct,[fuse]);
it('hatch',[0,1.3,-3.9],'Check the kitchen hatch',()=>state==='lit2',hatchAct,[cup,slip,ledge]);
async function photoAct(){if(busy||CINE.on)return;busy=true;const x0=P.x,z0=P.z,y0=P.yaw;await cineIn();A.click();
  await camTo(4.55,21.3,Math.PI,-.02,700);
  await say(sp('YOU','Atuk and me, in front of the shop.'),2400);
  await say(sp('YOU','He told me to smile. Then he forgot to smile himself.'),3200);
  await camTo(x0,z0,y0,0,700);busy=false;await cineOut()}
/* manual chores: stand in the ring, then tap the button (nothing starts by itself) */
const MAN=it('man',[0,1.1,0],()=>{const w=WPS[state];return (w&&w.lab)||OBJB},()=>{const w=WPS[state];return !!(w&&w.manual&&!busy&&!CINE.on&&Math.hypot(P.x-w.x,P.z-w.z)<w.r+.55)},()=>{const w=WPS[state];if(w&&w.fn)w.fn()},[]);
it('photo',[4.55,1.2,22.45],'Look at the photo',()=>!busy&&!CINE.on&&P.x>3&&P.x<15.5&&P.z>15,photoAct,PHOTO);
const hatchIt=ITS[3];
it('housedoor',[6.1,1.2,15.1],'Go inside',()=>state==='leave',houseAct,[doorMesh]);
async function radioAct(){busy=true;A.click();A.static(.12);await say('The radio hisses. Nobody tuned it.',2400);A.static(.2);await say('"...order forty-two..."',2300);A.static(.28);await say('"...still waiting..."',2300);A.static(0);A.sting();lightsOffNow();torch.intensity=26;state='dark';objT('Find the fuse box');busy=false;say('Something scrapes, far off in the dark.',2800);setTimeout(()=>A.scrape(),600)}
async function fuseAct(){busy=true;A.click();await say('The breaker is warm to the touch.',1800);torch.intensity=0;await lightsOnNow();state='lit2';fig.visible=true;objT('Check the kitchen hatch');busy=false;say('The lights are back.',1800)}
async function doScare(){busy=true;lightsOffNow();A.sting();await sleep(800);fig.visible=false;seat.position.set(2.45,.23,-.55);seat.rotation.y=.7;A.scrape();await sleep(500);await lightsOnNow();scareDone=true;await say('The stool is still swaying.',2300);busy=false}
async function hatchAct(){busy=true;A.click();if(!scareDone){await doScare();busy=true}
  cup.visible=true;await say('A cold cup of kopi on the ledge.',2400);slip.visible=true;await say('Under it, a paper slip. No. 42.',2600);
  A.static(.25);await say('"...order forty-two. Ready."',2800);A.static(0);
  A.rumble();dawn.intensity=4;await sleep(2000);
  state='leave';objT('Go home');busy=false;say('Grey light outside. Your house is across the road.',3200)}
async function cineLock(){if(busy||CINE.on||D.walking)return;busy=true;await cineIn();
  await camTo(.3,5.2,yawFrom(.3,5.2,0,3.9),.1,900);
  handAct('lift',2000);A.scrape();await tween(k=>{shutter.position.y=3.6-2.4*k;P.pitch=.1-.25*k},1800);shutBlock(true);
  A.click();handAct('reach',1200);await say('You pull the padlock through. Click.',2200);
  await camTo(.3,5.2,yawFrom(.3,5.2,6.1,14),0,1200);
  state='d1_home';window.__doorG.rotation.y=0;setClock('6:45 PM');objT('Go home');busy=false;await cineOut()}
async function shutterAct(){A.click();
  if(state==='d1_open'){busy=true;A.shutter();shutBlock(false);atuk.visible=true;await tween(k=>{shutter.position.y=1.2+2.4*k},1700);state='d1_greet';setClock('7:02 AM');objT('Talk to Atuk');busy=false;queueIn();say('Warm air. Toast. The queue shuffles in behind you.',2800);return}
  if(state==='d1_lock'){if(P.z<4.3){say('Lock up from the outside.',2200);return}busy=true;A.shutter();await tween(k=>{shutter.position.y=3.6-2.4*k},1700);shutBlock(true);A.jiggle();await sleep(1200);A.click();await say('You pull the padlock through. Click.',2400);state='d1_home';window.__doorG.rotation.y=0;setClock('6:45 PM');objT('Go home');busy=false;return}
  busy=true;await say('It will not come down. Like something is holding it from outside.',2800);busy=false}
/* ---- Day 1 ending cutscene: knock, Atuk opens, step in, the fourth knock ---- */
const FEET=new THREE.Group();FEET.visible=false;scene.add(FEET);
{const st=new THREE.Mesh(new THREE.PlaneGeometry(1.15,.5),B(0xf2d48a,{transparent:true,opacity:.55,fog:false}));st.rotation.x=-Math.PI/2;st.position.set(6.1,.03,15.35);FEET.add(st);
 for(const dx of[-.3,.3]){const f=new THREE.Mesh(new THREE.PlaneGeometry(.2,.3),B(0x050506,{fog:false}));f.rotation.x=-Math.PI/2;f.position.set(6.1+dx,.04,15.2);FEET.add(f)}}
async function cineHome(){if(busy||CINE.on)return;busy=true;await cineIn();const dg=window.__doorG;dg.rotation.y=0;
  await camTo(6.1,13.5,yawFrom(6.1,13.5,6.1,15),.03,900);
  await say('The door is locked. Atuk is already home.',2200);
  handAct('knock',2300);for(let i=0;i<3;i++){A.knock();await csleep(650)}
  await csleep(700);A.tone(170,110,.7,.05,'sawtooth');
  atuk.visible=true;atuk.position.set(6.1,0,15.85);atuk.rotation.y=0;pose(atuk,0,'stand');
  await tween(k=>{dg.rotation.y=-1.25*k},900);
  await camTo(6.1,13.9,yawFrom(6.1,13.9,6.1,15.85),.05,700);
  await say(sp('ATUK','Three knock. Okay. Masuk.'),2400);
  await camTo(6.1,15.4,Math.PI,0,900);
  {let cx=6.1,cz=15.85;for(const [tx,tz] of [[6.1,17.0],[6.5,20.5],[7.2,20.5],[9.1,20.4],[9.1,19.4],[9.1,18.3]]){const dx=tx-cx,dz=tz-cz,L=Math.hypot(dx,dz),x0=cx,z0=cz,ry=atuk.rotation.y,ty=Math.atan2(-dx,-dz),dyy=((ty-ry+Math.PI*3)%(Math.PI*2))-Math.PI;
    await tween(k=>{atuk.position.set(x0+dx*k,0,z0+dz*k);atuk.rotation.y=ry+dyy*Math.min(1,k*6);pose(atuk,performance.now()/170,'walk');
      if(atuk.position.x<7.3){const dy=Math.atan2(Math.sin(yawTo(atuk.position.x,atuk.position.z)-P.yaw),Math.cos(yawTo(atuk.position.x,atuk.position.z)-P.yaw));P.yaw+=dy*.08}},L/2.0*1000);cx=tx;cz=tz}}
  atuk.visible=false;pose(atuk,0,'stand');
  await camTo(6.1,16.3,Math.PI,0,700);
  await tween(k=>{dg.rotation.y=-1.25*(1-k)},700);A.tone(90,60,.25,.18,'sine');A.click();
  await camTo(6.1,17.0,0,-.3,1100);
  flicker([.45,1,.3,.8],90);await csleep(900);
  FEET.visible=true;await csleep(2000);
  A.knock();await tween(k=>{P.pitch=-.3+Math.sin(k*18)*.012*(1-k)},320);await csleep(1500);
  await say(sp('ATUK','Jangan buka. Go sleep.'),2600);await csleep(600);
  $('fade').style.transition='opacity 1.6s';$('fade').style.opacity=1;await sleep(1800);
  FEET.visible=false;await cineOut();
  await midnight();
  if(G.day2){busy=false;state='d2_intro';G.day2();return}
  $('endh').textContent='END OF DAY 1';$('endp').textContent='Nothing strange happened today. Remember the rule: three knocks.';$('endl').textContent='Last Order · Day 2 is coming';
  $('end').style.display='flex';busy=false;state='end'}
/* ---- midnight: three knocks, Atuk at your bedroom door ---- */
const HALLGLOW=new THREE.PointLight(0xffb36b,0,7);HALLGLOW.position.set(13.1,2.1,21.2);scene.add(HALLGLOW);
let midDone=null;
WPS.d1_midnight={x:13.1,z:18.35,r:.6,tx:13.1,tz:19.4,lab:'Open the door',manual:true,go:1,fn:()=>midnightDoor()};
async function midnight(){
  busy=true;setTime('night');lightsOffNow();setClock('12:00 AM');atuk.visible=false;
  CINE.noclip=true;EYE.y=.62;P.x=14.5;P.z=17.0;P.yaw=Math.PI;P.pitch=.9;P.tx=null;P.fy=null;
  await cineIn();
  const dc=$('dcard');dc.innerHTML='MIDNIGHT<small>12:00 AM</small>';dc.style.opacity=1;$('fade').style.transition='opacity 1.2s';$('fade').style.opacity=0;await sleep(2200);dc.style.opacity=0;
  await sleep(900);for(let i=0;i<3;i++){A.knock();await sleep(700)}
  await say(sp('ATUK>YOU','Cucu. Bangun.'),1800);
  /* you get up: eyes up from the pillow, stand, control returns */
  await Promise.all([camTo(13.7,17.8,yawFrom(13.7,17.8,13.1,19.4),.02,1400),tween(k=>{EYE.y=.62+(1.6-.62)*k},1400)]);
  EYE.y=1.6;CINE.noclip=false;P.pitch=0;
  await say(sp('YOU','...Somebody is knocking.'),1800);
  state='d1_midnight';objT('Open the door');await cineOut();busy=false;
  await new Promise(r=>{midDone=r})}
async function midnightDoor(){
  if(busy||CINE.on)return;busy=true;A.click();await cineIn();
  await camTo(13.1,18.4,yawFrom(13.1,18.4,13.1,19.6),.02,800);
  HALLGLOW.intensity=1.3;atuk.visible=true;atuk.position.set(13.1,0,19.7);atuk.rotation.y=0;pose(atuk,0,'stand');A.door();await csleep(900);
  await say(sp('YOU>ATUK','Atuk...? What time is it?'),2200);
  await say(sp('ATUK','Listen. From tomorrow, shop open six in the evening. Close one in the morning.'),3600);
  await say(sp('YOU>ATUK','Six? But we always open seven to five...'),2600);
  await say(sp('ATUK','Customers still here, cucu. Tomorrow, six o\'clock. Do not be late.'),3400);
  /* he does not vanish: he turns and walks back to his own room */
  {let cx=13.1,cz=19.7;for(const [tx,tz] of [[13.1,20.0],[9.1,20.0],[9.1,19.4],[9.1,18.3]]){const dx=tx-cx,dz=tz-cz,L=Math.hypot(dx,dz),x0=cx,z0=cz,ry=atuk.rotation.y,ty=Math.atan2(-dx,-dz),dyy=((ty-ry+Math.PI*3)%(Math.PI*2))-Math.PI;
    await tween(k=>{atuk.position.set(x0+dx*k,0,z0+dz*k);atuk.rotation.y=ry+dyy*Math.min(1,k*6);pose(atuk,performance.now()/170,'walk');
      if(atuk.position.x>12.3){const w=yawTo(atuk.position.x,atuk.position.z),dy=Math.atan2(Math.sin(w-P.yaw),Math.cos(w-P.yaw));P.yaw+=dy*.08}},L/1.6*1000);cx=tx;cz=tz}}
  atuk.visible=false;pose(atuk,0,'stand');A.door();tween(k=>{HALLGLOW.intensity=1.3*(1-k)},900);await csleep(1000);
  await say("Atuk's door closes. The hall goes quiet.",2400);
  await say(sp('YOU','Six to one...? That is not how Atuk runs the shop.'),2800);
  $('fade').style.transition='opacity 1.6s';$('fade').style.opacity=1;await sleep(1800);
  EYE.y=1.6;CINE.noclip=false;P.pitch=0;await cineOut();busy=false;const r=midDone;midDone=null;if(r)r()}
async function houseAct(){
  busy=true;A.click();
  if(state==='d1_home'){await say('The door is locked. Atuk is already home.',2200);handAct('knock',2300);for(let i=0;i<3;i++){A.knock();await sleep(650)}await say(sp('ATUK','Three knock. Okay. Masuk.'),2400);$('endh').textContent='END OF DAY 1';$('endp').textContent='Nothing strange happened today. Remember the rule: three knocks.';$('endl').textContent='Last Order · Day 2 is coming'}
  $('fade').style.transition='opacity 1.6s';$('fade').style.opacity=1;await sleep(1800);$('end').style.display='flex';busy=false;state='end'}

/* ---------- DAY 1 ---------- */
const NIGHT=/[?&]night/.test(location.search);
const D={crowd:false,n:0,wipe:0,cups:0,kopi:0,serve:0,sugar:0,bath:0,walking:false};
const clk=$('clk');
/* Days 2-4 run the night shift (6 PM - 1 AM): old shop-day clock strings are remapped on the fly */
const dayNo=()=>(/^d([1-5])_/.exec(state)||[])[1]|0;
function nightClock(t){const m=/^(\d+):(\d\d) (AM|PM)$/.exec(t);if(!m)return t;let h=+m[1];const mi=m[2],ap=m[3];
  if(ap==='AM'&&h>=6&&h<=11)return ((h+11)%12||12)+':'+mi+' PM';
  if(ap==='PM'&&h===12)return '11:'+mi+' PM';
  if(ap==='PM'&&(h===5||h===6))return ((h+7)%12||12)+':'+mi+' AM';
  return t}
const setClock=t=>{const d=dayNo();clk.textContent=d>=2&&d<=4?nightClock(t):t};
/* ---- cinematic cutscenes: bars, auto camera, tap to skip a line ---- */
const CINE={on:false,skipR:null,skip(){const r=this.skipR;if(r){this.skipR=null;r()}}};
function csleep(ms){return new Promise(r=>{const t=setTimeout(()=>{CINE.skipR=null;r()},ms);CINE.skipR=()=>{clearTimeout(t);r()}})}
async function cineIn(){stk=null;look=null;stickEl.style.display='none';P.tx=null;P.fy=null;CINE.on=true;document.body.classList.add('cine');await sleep(480)}
async function cineOut(){document.body.classList.remove('cine');await sleep(480);CINE.on=false}
function camTo(x,z,yaw,pitch,ms){return new Promise(r=>{const x0=P.x,z0=P.z,p0=P.pitch,y0=P.yaw;let dy=yaw-y0;dy=Math.atan2(Math.sin(dy),Math.cos(dy));const t0=performance.now();(function f(){const k=Math.min(1,(performance.now()-t0)/ms),e=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;P.x=x0+(x-x0)*e;P.z=z0+(z-z0)*e;P.yaw=y0+dy*e;P.pitch=p0+(pitch-p0)*e;k<1?requestAnimationFrame(f):r()})()})}
const yawTo=(tx,tz)=>Math.atan2(-(tx-P.x),-(tz-P.z));
const yawFrom=(fx,fz,tx,tz)=>Math.atan2(-(tx-fx),-(tz-fz));
async function cineAtuk(){if(busy||CINE.on)return;busy=true;const was=state;await cineIn();
  {const tx=2.95,tz=3.05,x0=P.x,z0=P.z,L=Math.hypot(tx-x0,tz-z0),ms=Math.max(700,L/1.7*1000);let st=0;
   if(L>.9)await tween(k=>{const e=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;P.x=x0+(tx-x0)*e;P.z=z0+(tz-z0)*e;st+=1;EYE.y=1.6+Math.sin(performance.now()/110)*.035*Math.min(1,Math.min(k,1-k)*8);if(st%16===0)A.step();
     const want=yawTo(atuk.position.x,atuk.position.z);let dy=Math.atan2(Math.sin(want-P.yaw),Math.cos(want-P.yaw));P.yaw+=dy*.12;P.pitch+=(.02-P.pitch)*.1},ms);EYE.y=1.6;
   await camTo(tx,tz,yawTo(atuk.position.x,atuk.position.z),.02,350)}
  await atukAct();
  if(was==='d1_greet'){await camTo(P.x,P.z,yawTo(-3,-1),-.03,1000);await csleep(700);await camTo(P.x,P.z,0,.0,900)}
  else if(was==='d1_rule'){await camTo(P.x,P.z,yawTo(.9,5),.0,800);await csleep(1800)}
  else if(was==='d1_report'){await bathPeek()}
  await cineOut()}
async function bathPeek(){
  await camTo(-1.2,2.5,yawFrom(-1.2,2.5,-8.25,2.5),.1,1700);
  const pat=[.6,.18,.7,.1,.45,.8,.2,.55,.12,.7];
  for(const v of pat){applyLights(v*.8+.1);bulbSet(v);if(v<.3)A.tone(60,50,.06,.03,'square');await csleep(90+Math.random()*90)}
  applyLights(.72);bulbSet(.8);A.nz(.5,3000,1200,.05,'highpass');await csleep(900)}
async function cineBath(){if(busy||CINE.on)return;busy=true;await cineIn();
  await camTo(-7.4,2.5,yawFrom(-7.4,2.5,-8.25,2.5),.12,1500);
  const buzz=()=>A.tone(100,100,.08,.02,'sawtooth');
  for(const v of[.8,.15,.6,.1,.5,.9,.2,.7]){bulbSet(v);applyLights(.3+v*.5);if(v<.3)buzz();await csleep(110+Math.random()*80)}
  await camTo(-7.45,2.5,P.yaw,.5,900);
  await say(sp('YOU','Loose bulb again...'),1800);
  handAct('reach',2800);await tween(k=>{BULB.rotation.y=k*Math.PI*2},1500);A.click();
  for(const v of[.2,1,.3,1,1]){bulbSet(v);applyLights(.4+v*.6);await csleep(120)}
  tapOn();await csleep(1200);
  await camTo(-8.2,2.4,yawFrom(-8.2,2.4,-7.7,1.2),-.1,1100);
  await say(sp('YOU',"...the tap is running."),1800);await say("You didn't turn it on.",2200);
  await camTo(-7.95,2.0,yawFrom(-7.95,2.0,-7.7,1.15),-.3,1300);
  handAct('reach',1400);await csleep(700);tapOff();A.click();await csleep(500);
  A.tone(1300,900,.04,.04);await csleep(900);A.tone(1200,850,.04,.03);await csleep(900);
  applyLights(1);bulbSet(1);await say(sp('YOU','Okay. Done.'),1600);
  await camTo(-8.2,2.6,yawFrom(-8.2,2.6,-6,2.5),0,1000);
  state='d1_back';setClock('10:20 AM');objT('Tell Atuk');busy=false;await cineOut()}
const sp=(w,t)=>w+': '+t;
const SHB=[-2,2,3.8,4.1];
function shutBlock(on){const i=AABB.indexOf(SHB);if(on&&i<0)AABB.push(SHB);if(!on&&i>=0)AABB.splice(i,1)}
function tween(fn,ms){return new Promise(r=>{const t0=performance.now();(function s(){const k=Math.min(1,(performance.now()-t0)/ms);fn(k);k<1?requestAnimationFrame(s):r()})()})}
/* props */
const stT=(()=>{const c=document.createElement('canvas');c.width=c.height=128;const x=c.getContext('2d');x.translate(64,64);
  const blob=(cx,cy,rx,ry,n,seed)=>{const p=[];for(let i=0;i<n;i++){const a=i/n*Math.PI*2,r=1+Math.sin(i*2.3+seed)*.16+Math.cos(i*1.3+seed*2)*.1;p.push([cx+Math.cos(a)*rx*r,cy+Math.sin(a)*ry*r])}
    x.beginPath();for(let i=0;i<n;i++){const a=p[i],b=p[(i+1)%n],mx=(a[0]+b[0])/2,my=(a[1]+b[1])/2;if(i===0)x.moveTo(mx,my);else x.quadraticCurveTo(a[0],a[1],mx,my)}x.closePath()};
  x.shadowColor='rgba(40,22,8,.55)';x.shadowBlur=7;
  blob(-4,2,33,22,13,1);x.fillStyle='rgba(74,44,18,.46)';x.fill();
  x.shadowBlur=0;blob(-5,2,28,18,13,1);const gr=x.createRadialGradient(-5,2,3,-5,2,30);gr.addColorStop(0,'rgba(54,30,10,.62)');gr.addColorStop(1,'rgba(74,44,18,.22)');x.fillStyle=gr;x.fill();
  blob(-5,2,28,18,13,1);x.strokeStyle='rgba(38,20,6,.55)';x.lineWidth=1.6;x.stroke();
  x.fillStyle='rgba(60,34,12,.5)';for(const [dx,dy,r] of[[34,-6,3.2],[40,6,2],[26,18,2.6],[-38,-14,2.4],[-30,22,1.6],[14,-27,2.2],[44,-1,1.2]]){x.beginPath();x.arc(dx,dy,r,0,7);x.fill()}
  x.strokeStyle='rgba(60,34,12,.4)';x.lineWidth=3;x.lineCap='round';x.beginPath();x.moveTo(26,6);x.quadraticCurveTo(36,2,42,6);x.stroke();
  x.beginPath();x.arc(-6,-4,13,.2,4.8);x.strokeStyle='rgba(30,16,4,.28)';x.lineWidth=1.2;x.stroke();
  const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=4;return t})();
const stain=new THREE.Mesh(new THREE.PlaneGeometry(.95,.95),new THREE.MeshBasicMaterial({map:stT,transparent:true,opacity:.85,depthWrite:false}));stain.rotation.x=-Math.PI/2;stain.rotation.z=.35;stain.position.set(2.8,.786,-1.8);scene.add(stain);
const cupsD=[[-3.2,-1.7],[-2.75,-1.95],[-3.0,-1.55]].map(([x,z])=>{const m=new THREE.Mesh(new THREE.CylinderGeometry(.06,.05,.09,6),M(0xe4e0d2));m.position.set(x,.83,z);scene.add(m);return m});
const jar=new THREE.Mesh(new THREE.CylinderGeometry(.09,.09,.2,7),M(0xcfe0e8,{transparent:true,opacity:.42}));jar.position.set(4.2,1.15,.3);scene.add(jar);
const jarTop=new THREE.Mesh(new THREE.CylinderGeometry(.075,.075,.02,7),M(0x555a60));jarTop.position.set(4.2,1.26,.3);scene.add(jarTop);
const noteM=new THREE.Mesh(new THREE.PlaneGeometry(.34,.46),M(0xffffff,{map:ctex(34,46,c=>{c.fillStyle='#e8dfb8';c.fillRect(0,0,34,46);c.fillStyle='#3a3020';for(let y=6;y<44;y+=6)c.fillRect(4,y,26-((y*7)%9),1);c.fillRect(4,3,18,2)}),side:THREE.DoubleSide}));noteM.position.set(-4.96,1.5,-2.2);noteM.rotation.y=Math.PI/2;scene.add(noteM);
const SUG=(()=>{const g=new THREE.CylinderGeometry(.078,.078,.18,7);g.translate(0,.09,0);const m=new THREE.Mesh(g,M(0xf4efe0));m.position.set(4.2,1.05,.3);m.scale.y=.2;scene.add(m);return m})();
function day1Props(on){if(on){SUG.scale.y=.2;jarTop.position.set(4.2,1.26,.3);stain.material.opacity=.85}SUG.visible=on;stain.visible=on;cupsD.forEach(m=>m.visible=on);jar.visible=on;jarTop.visible=on;noteM.visible=on}
day1Props(!NIGHT);
const refreshObj=()=>objT(CH[Math.min(ci,CH.length-1)].obj);
const CLK=['7:20 AM','8:05 AM','9:10 AM','10:05 AM'];
/* ---- chores = automatic close-up mini playthroughs ---- */
const CH=[
 {k:'sugar',x:3.1,z:.3,tx:4.2,tz:.3,obj:'Refill the sugar',fn:()=>runChore(0)},
 {k:'wipe',x:2.8,z:-.8,tx:2.8,tz:-1.8,obj:'Wipe the table',fn:()=>runChore(1)},
 {k:'cups',x:-2.0,z:-1.8,tx:-3,tz:-1.8,obj:'Clear the cups',fn:()=>runChore(2)},
 {k:'kopi',x:-1.4,z:-5.7,tx:-1.4,tz:-6.4,obj:'Make the kopi',fn:()=>runChore(3)},
 {k:'serve',x:-2.45,z:1.75,tx:-3,tz:.95,obj:'Serve the kopi',fn:()=>runChore(4)}];
let ci=0;
WPS.d1_chores={get x(){return CH[ci].x},get z(){return CH[ci].z},get tx(){return CH[ci].tx},get tz(){return CH[ci].tz},get lab(){return CH[ci].obj},manual:true,r:.6,go:1,get fn(){return CH[ci].fn}};
const BAG=new THREE.Group();BAG.visible=false;scene.add(BAG);box(.14,.2,.07,M(0xe0d2a8),0,0,0,BAG);box(.15,.05,.075,M(0xb8452e),0,.06,0,BAG);
const GRAN=[];for(let i=0;i<18;i++){const g=new THREE.Mesh(new THREE.BoxGeometry(.012,.012,.012),B(0xffffff));g.visible=false;scene.add(g);GRAN.push(g)}
const KC=new THREE.Group();KC.position.set(-1.4,.95,-6.36);KC.scale.setScalar(1.4);KC.visible=false;scene.add(KC);
const KLIQ=(()=>{const g=new THREE.CylinderGeometry(.052,.044,.085,8);g.translate(0,.0425,0);const m=new THREE.Mesh(g,M(0x4a2a14));m.position.y=.003;m.scale.y=.01;KC.add(m);return m})();
{const c=new THREE.Mesh(new THREE.CylinderGeometry(.06,.05,.09,8),M(0xe4e0d2,{transparent:true,opacity:.9}));c.position.y=.045;KC.add(c)}
box(.035,.035,.1,M(0xb9bec4),-1.4,1.12,-6.42);
const KST=new THREE.Mesh(new THREE.BoxGeometry(.022,1,.022),B(0x3a2010));KST.visible=false;scene.add(KST);
function kStream(on,top=1.1,bot=1.0){KST.visible=on;if(on){KST.scale.y=Math.max(.01,top-bot);KST.position.set(-1.4,(top+bot)/2,-6.37)}}
async function chSugar(){
  await camTo(3.45,.3,yawFrom(3.45,.3,4.2,.3),-.5,1000);
  A.click();await tween(k=>{jarTop.position.set(4.2+.28*k,1.26-.2*k,.3+.15*k)},350);
  BAG.visible=true;await tween(k=>{BAG.position.set(4.12,1.75-.3*k,.3);BAG.rotation.z=1.0*k},650);
  handAct('reach',3000);A.nz(2.3,2600,1800,.05,'highpass');
  const t0=performance.now();let gi=0;
  await tween(k=>{SUG.scale.y=.2+.8*k;BAG.position.y=1.45+Math.sin(k*20)*.01;
    if((performance.now()-t0)/70>gi){const g=GRAN[gi%GRAN.length];g.visible=true;g.userData.t=performance.now();g.userData.x=4.2+(Math.random()-.5)*.03;gi++}
    for(const g of GRAN)if(g.visible){const a=(performance.now()-g.userData.t)/260;if(a>=1){g.visible=false}else g.position.set(g.userData.x,1.4-.2*a*a-.0*a,.3)}},2300);
  GRAN.forEach(g=>g.visible=false);
  await tween(k=>{BAG.position.y=1.45+.3*k;BAG.rotation.z=1.0*(1-k)},450);BAG.visible=false;
  await tween(k=>{jarTop.position.set(4.48-.28*k,1.06+.2*k,.45-.15*k)},350);A.click();
  await say('The jar was nearly empty. It never runs out, somehow.',2400)}
async function chWipe(){
  await Promise.all([camTo(2.8,-1.3,0,-.95,1100),tween(k=>{EYE.y=1.6-.38*k},1100)]);
  handAct('wipe',3800);const t0=performance.now();let nx=0;
  await tween(k=>{stain.material.opacity=.85*Math.max(0,1-k*1.15);P.yaw=Math.sin(k*20)*.06;if((performance.now()-t0)/430>nx){nx++;A.nz(.3,900,500,.1)}},3500);
  stain.visible=false;P.yaw=0;await tween(k=>{EYE.y=1.22+.38*k},500);EYE.y=1.6;
  await say('Wipe, wipe. Somebody always spills the teh.',2400)}
async function chCups(){
  await camTo(-2.05,-1.8,yawFrom(-2.05,-1.8,-3,-1.8),-.5,1000);
  for(const m of cupsD){const p0=m.position.clone();handAct('reach',800);await tween(k=>{m.position.set(p0.x+(-2.25-p0.x)*k,p0.y+.4*k,p0.z+(-1.8-p0.z)*k);m.scale.setScalar(1+.6*k)},520);A.clink();m.visible=false;m.position.copy(p0);m.scale.setScalar(1);await csleep(260)}
  await say('Three cups. Always the same table.',2400)}
async function chKopi(){
  await camTo(-.95,-5.7,yawFrom(-.95,-5.7,-1.4,-6.4),-.5,1100);
  KC.visible=true;KLIQ.scale.y=.01;await csleep(300);
  handAct('reach',3200);A.nz(2.8,700,400,.07,'bandpass');kStream(true,1.1,1.04);
  await tween(k=>{KLIQ.scale.y=.01+.99*k;kStream(true,1.1,.96+.0875*k)},2800);
  kStream(false);A.click();await csleep(300);
  await say('Pour, pull, pour. Kopi-O, less sugar.',2400);
  KC.visible=false;handAct('serve',600000)}
async function chServe(){
  await camTo(-2.45,1.75,yawFrom(-2.45,1.75,-3,.95),-.3,1000);
  KC.position.set(-3.0,.78,.95);KC.visible=true;handAct('serve',1);A.tone(2400,1800,.06,.05);await csleep(500);
  await camTo(-2.45,1.75,yawFrom(-2.45,1.75,-3,.4),.05,700);
  await say('"Kopi-O kurang manis, ya?" He nods without looking up.',2800)}
async function runChore(i){if(busy||CINE.on||i!==ci)return;busy=true;A.click();await cineIn();
  await [chSugar,chWipe,chCups,chKopi,chServe][i]();
  const key=CH[i].k;D[key]=1;if(key!=='kopi'){D.n++;setClock(CLK[D.n-1])}
  ci++;if(ci>=CH.length){state='d1_report';objT('Tell Atuk')}else objT(CH[ci].obj);
  await camTo(P.x,P.z,P.yaw,0,500);busy=false;await cineOut()}
it('bath',[-8.25,1.4,2.5],'Check the light',()=>false,bathAct,[]);
it('note',[-4.9,1.5,-2.2],'Read the note',()=>state==='d1_lock',noteAct,[noteM]);
it('atuk',[3.9,1.2,3.5],'Talk to Atuk',()=>false,cineAtuk,[atuk]);
async function bathAct(){busy=true;A.click();flicker([.5,1,.35,1],80);await say('Click. The light holds.',1800);A.nz(1.4,3000,2000,.08,'highpass');await say("The tap is running. You didn't turn it on.",2800);A.click();await say('You turn it off.',1800);state='d1_back';setClock('10:20 AM');objT('Tell Atuk');busy=false}
async function noteAct(){busy=true;A.click();await say("Taped to the wall. Atuk's handwriting.",2300);await say('1. Shutter down by 6.',1900);await say('2. Nobody comes in after dark.',2100);await say('3. Open only when Atuk knocks. Three times.',2700);await say('4. Kopi for everyone. Even the ones you do not see.',3000);busy=false}
async function queueIn(){QUEUE.forEach(q=>pose(q,0,'stand'));let left=QUEUE.length;for(let i=0;i<QUEUE.length;i++){(async()=>{const q=QUEUE[i],h=HOME[QI[i]];await sleep(i*1000);let cx=q.position.x,cz=q.position.z;const path=[[-.9+i*.05,4.7],[-.6,2.6],...QROUTE[i],[h[0],h[1]]];for(const [tx,tz] of path){const dx=tx-cx,dz=tz-cz,L=Math.hypot(dx,dz),x0=cx,z0=cz;if(L<.01)continue;const ry=q.rotation.y,ty=Math.atan2(-dx,-dz),dy=((ty-ry+Math.PI*3)%(Math.PI*2))-Math.PI;await tween(k=>{q.position.set(x0+dx*k,0,z0+dz*k);q.rotation.y=ry+dy*Math.min(1,k*5);pose(q,performance.now()/170,'walk')},L/1.8*1000);cx=tx;cz=tz}
    q.rotation.y=h[2];pose(q,0,'sit');if(--left===0)D.crowd=true})()}}
async function atukLeave(){D.walking=true;const path=[[1.0,3.6],[.9,5],[5.8,13.2],[6.1,16]];let cx=atuk.position.x,cz=atuk.position.z;
  for(const [tx,tz] of path){const dx=tx-cx,dz=tz-cz,L=Math.hypot(dx,dz);atuk.rotation.y=Math.atan2(-dx,-dz);const x0=cx,z0=cz;await tween(k=>{atuk.position.set(x0+dx*k,0,z0+dz*k);pose(atuk,performance.now()/170,'walk')},L/2.2*1000);cx=tx;cz=tz}
  atuk.visible=false;pose(atuk,0,'stand');D.walking=false}
async function atukAct(){busy=true;A.click();
  if(state==='d1_greet'){await say(sp('ATUK','Eh, late ah today. Customers all waiting outside.'),2800);await say(sp('ATUK','Kopi ready. But the tables nobody wipe. Go go.'),2900);state='d1_chores';setClock('7:10 AM');refreshObj();busy=false;return}
  if(state==='d1_report'){await say(sp('ATUK','Okay lah, not bad. Sit, eat roti bakar first.'),2800);await say(sp('ATUK','Eh, bathroom light kelip-kelip again. Go see.'),2800);state='d1_bath';setClock('10:15 AM');objT('Check the bathroom light');busy=false;return}
  if(state==='d1_back'){await say(sp('ATUK','Fixed? Good boy.'),2200);await say(sp('ATUK','Now sit. Let Atuk look at the customers a while.'),2800);await toEvening();return}
  if(state==='d1_rule'){await d1Evening();return}}
async function toEvening(){busy=true;await say('The day goes by. Kopi, toast, the same faces.',2200);
  $('fade').style.transition='opacity 1.4s';$('fade').style.opacity=1;await sleep(1600);
  showCrowd(true);atuk.position.set(3.9,0,3.5);atuk.rotation.y=1.0;
  setTime('dusk');setClock('5:40 PM');P.x=.6;P.z=2.3;P.yaw=-2.14;P.pitch=0;P.tx=null;
  const dc=$('dcard');dc.innerHTML='EVENING<small>5:40 PM</small>';dc.style.opacity=1;await sleep(1800);dc.style.opacity=0;
  $('fade').style.opacity=0;state='d1_rule';objT('Talk to Atuk');busy=false}
/* ---- Day 1 evening: the hints, the blackout (the crash, unseen), the fuse box, the customers leave ---- */
async function d1Evening(){
  await say(sp('ATUK','Still full house, hah. Nobody want go home today.'),2800);
  await say(sp('YOU','It is nearly six, Atuk. Should I tell them we are closing?'),3000);
  await say(sp('ATUK','Let them sit. Customers are customers.'),2400);
  await say(sp('ATUK','See? The kopi still hot. Since morning, never cold.'),3000);
  await say(sp('YOU','Atuk... what did we do before we opened today?'),2800);
  await say(sp('ATUK','Hm? ...Cucu. Atuk want to tell you one thing. Whatever happen later, you must not--'),3600);
  A.tone(190,184,1.1,.04,'sawtooth');await sleep(900);A.tone(190,184,1.6,.05,'sawtooth');await sleep(1000);
  await d1Blackout()}
async function d1Blackout(){
  lightsOffNow();torch.intensity=12;
  A.rumble();A.tone(46,36,1.8,.32,'sine');try{G.SFX&&G.SFX.play&&G.SFX.play('drone_doom',{g:.5})}catch(_){}
  CROWD.forEach((c,i)=>{const n=CROWD[(i+1)%CROWD.length];c.rotation.y=Math.atan2(-(n.position.x-c.position.x),-(n.position.z-c.position.z))});
  await sleep(900);
  {const y0=P.yaw,ty=yawFrom(P.x,P.z,-2.4,-.5),dy=((ty-y0+Math.PI*3)%(Math.PI*2))-Math.PI;await tween(k=>{P.yaw=y0+dy*(k*k*(3-2*k))},1100)}
  await say(sp('YOU','Damn... what happened?'),2000);
  await sleep(600);
  await say('The whole shop is dark. Nobody screams.',2600);
  await say('They are all staring at each other.',2600);
  await say(sp('YOU','Atuk...?'),1500);
  await say(sp('ATUK','Power cut, cucu. Go check the fuse box. Same place.'),3200);
  state='d1_fuse';setClock('5:48 PM');objT('Check the fuse box');busy=false}
async function d1FuseAct(){if(busy||CINE.on)return;busy=true;await cineIn();
  await camTo(-4.0,.5,Math.PI/2,0,800);A.click();
  await say('The breaker is warm to the touch.',2000);handAct('reach',900);await csleep(500);A.click();
  torch.intensity=0;await lightsOnNow();setClock('5:55 PM');
  await camTo(-4.0,.5,yawFrom(-4.0,.5,-1.5,-.5),0,900);
  await say('The lights are back.',1600);
  await crowdWake();
  await camTo(-4.0,.5,yawFrom(-4.0,.5,atuk.position.x,atuk.position.z),0,900);
  await say(sp('ATUK','Okay. Shop tutup now. Tonight, if anybody knock our door...'),3200);
  await say(sp('ATUK',"Don't open. Don't care who. Don't care what they say."),3200);
  await say(sp('ATUK','Only three knock. Same like this morning. That one is us. Faham?'),3400);
  await say(sp('YOU','Faham, Atuk.'),1800);
  await say(sp('ATUK','Good. Atuk balik dulu. Before you lock: mop the floor, clear the cups, rubbish go out the back.'),3800);
  if(G.closeInit){state='d1_close';G.closeInit()}else{state='d1_lock';objT('Lock up');setClock('6:00 PM')}
  busy=false;atukLeave();await cineOut()}
async function crowdWake(){
  await sleep(1500);
  const LINES={'AH SENG':'Eh... dah pukul berapa?','MAK CIK':'Dah lewat... anak saya tunggu.','RAJ':'Bos... kopi saya belum habis.','PAK HASSAN':'Muka surat tujuh... belum sempat.','MEI LING':'Saya kena balik. Hari jadi anak saya.'};
  const walks=[];
  const walk=async(q,i)=>{const path=[...QROUTE[i].slice().reverse(),[-.6,2.6],[-.9+i*.05,4.7],[-1.1,8.5]];let cx=q.position.x,cz=q.position.z;
    for(const [tx,tz] of path){const dx=tx-cx,dz=tz-cz,L=Math.hypot(dx,dz);if(L<.01)continue;const x0=cx,z0=cz,ry=q.rotation.y,ty=Math.atan2(-dx,-dz),dyy=((ty-ry+Math.PI*3)%(Math.PI*2))-Math.PI;
      await tween(k=>{q.position.set(x0+dx*k,0,z0+dz*k);q.rotation.y=ry+dyy*Math.min(1,k*5);pose(q,performance.now()/220,'walk')},L/1.25*1000);cx=tx;cz=tz}
    q.visible=false;pose(q,0,'stand')};
  for(let i=0;i<QUEUE.length;i++){const q=QUEUE[i];pose(q,0,'stand');const ln=LINES[NAMEOF.get(q)];if(ln)await say(ln,2300,q);walks.push(walk(q,i));await sleep(500)}
  atuk.visible=true;await say(sp('ATUK>ALL','Hati-hati balik, ya.'),2300);
  await sleep(700)}
async function d1Knock(){busy=true;state='d1_knock';await cineIn();
  await camTo(.3,4.6,0,.04,1800);
  handAct('knock',2300);for(let i=0;i<3;i++){A.knock();await sleep(650)}
  await say(sp('ATUK','Siapa tu?'),1700);await say(sp('YOU',"Atuk, it's me."),1800);
  const q=QUEUE[0],qy=q.rotation.y,qx=q.position.x,qz=q.position.z;await tween(k=>{q.rotation.y=qy+((Math.atan2(-(.3-qx),-(4.6-qz))-qy+Math.PI*3)%(Math.PI*2)-Math.PI)*k},350);
  await camTo(-.3,4.7,Math.atan2(-(qx+.3),-(qz-4.7)),.05,850);
  await say('"Boss, belum buka lagi ke?"',2300,q);q.rotation.y=qy;
  await camTo(.3,4.6,0,.04,850);
  await say(sp('ATUK','Three knock. Always three knock. That means is us.'),3000);await say(sp('ATUK',"Anybody else knock, don't open. Okay, I open now. Customers waiting."),3400);
  handAct('lift',1900);A.scrape();shutBlock(false);atuk.visible=true;await tween(k=>{shutter.position.y=1.2+2.4*k},1900);
  await camTo(P.x,P.z,0,.03,500);
  state='d1_greet';setClock('7:02 AM');objT('Go inside');queueIn();await say('Warm air. Toast. The queue shuffles in behind you.',2600);
  await cineOut();busy=false}
/* ---- wake-up opening: alarm, blinking, snooze, grab the clock ---- */
box(.5,.5,.4,M(0x5a3a28),14.4,.25,15.85);AABB.push([14.15,14.65,15.65,16.05]);
const ckc=document.createElement('canvas');ckc.width=ckc.height=128;const ckx=ckc.getContext('2d'),ckT=new THREE.CanvasTexture(ckc);ckT.colorSpace=THREE.SRGBColorSpace;
function drawClock(h,m){const c=ckx;c.clearRect(0,0,128,128);c.fillStyle='#f3efe2';c.beginPath();c.arc(64,64,62,0,7);c.fill();c.strokeStyle='#222';c.lineWidth=4;c.stroke();c.fillStyle='#222';
  for(let i=0;i<12;i++){const a=i/12*Math.PI*2;c.fillRect(64+Math.sin(a)*52-3,64-Math.cos(a)*52-3,6,6)}
  const hand=(a,l,w,col)=>{c.strokeStyle=col;c.lineWidth=w;c.lineCap='round';c.beginPath();c.moveTo(64,64);c.lineTo(64+Math.sin(a)*l,64-Math.cos(a)*l);c.stroke()};
  hand((h%12+m/60)*Math.PI/6,30,7,'#222');hand(m*Math.PI/30,46,4.5,'#222');hand(Math.PI*.9,40,2,'#c4352a');c.fillStyle='#222';c.beginPath();c.arc(64,64,5,0,7);c.fill();ckT.needsUpdate=true}
drawClock(6,30);
const ALK=new THREE.Group();ALK.position.set(14.4,.6,15.85);scene.add(ALK);
{const bd=new THREE.Mesh(new THREE.CylinderGeometry(.095,.095,.07,16),M(0xc23b2e));bd.rotation.x=Math.PI/2;ALK.add(bd);
 const fc=new THREE.Mesh(new THREE.CircleGeometry(.082,20),new THREE.MeshBasicMaterial({map:ckT}));fc.position.z=.037;ALK.add(fc);
 for(const dx of[-.06,.06]){const bl=new THREE.Mesh(new THREE.SphereGeometry(.036,8,6),M(0xd8d8d8));bl.position.set(dx,.098,0);bl.scale.y=.7;ALK.add(bl)}
 for(const dx of[-.06,.06]){const ft=new THREE.Mesh(new THREE.CylinderGeometry(.012,.012,.04,5),M(0x333333));ft.position.set(dx,-.1,0);ALK.add(ft)}}
let alarmTI=0,rattleTI=0;
function startAlarm(){stopAlarm();let k=0;const ring=()=>{for(let i=0;i<4;i++)setTimeout(()=>{A.tone(2300,2300,.07,.14,'square')},i*160)};ring();alarmTI=setInterval(ring,1100);
  rattleTI=setInterval(()=>{k++;ALK.rotation.z=Math.sin(k*2.4)*.07;ALK.position.y=.6+(k%2?.004:0)},33)}
function stopAlarm(){clearInterval(alarmTI);clearInterval(rattleTI);alarmTI=rattleTI=0;ALK.rotation.z=0;ALK.position.y=.6}
const lidT=$('lidT'),lidB=$('lidB');
async function lids(open,ms){const h=(1-open)*50;for(const l of[lidT,lidB]){l.style.transition='height '+ms+'ms ease';l.style.height=h+'%';l.classList.toggle('soft',open>0&&open<1)}await sleep(ms)}
async function wakeUp(){
  CINE.noclip=true;EYE.y=.62;P.x=14.5;P.z=17.0;P.yaw=0;P.pitch=1.1;P.tx=null;P.fy=null;
  lids(0,0);cv.style.filter='blur(8px)';await cineIn();
  $('fade').style.transition='opacity 1.2s';$('fade').style.opacity=0;startAlarm();await sleep(1800);
  await lids(.16,520);await sleep(260);await lids(0,240);await sleep(380);await lids(.5,620);await sleep(160);await lids(0,200);await sleep(300);
  cv.style.transition='filter 1.4s';cv.style.filter='blur(0px)';await lids(1,900);
  await say(sp('YOU','Mmm... what is that noise...'),2000);
  await camTo(14.5,17.0,0,-.02,1100);
  await say(sp('YOU','Five more minutes...'),1600);
  handAct('knock',900);await sleep(480);A.click();stopAlarm();ALK.position.z=15.82;await sleep(300);ALK.position.z=15.85;await sleep(700);
  await lids(0,650);setClock('6:55 AM');drawClock(6,55);await sleep(1600);
  await lids(.3,500);await lids(0,160);await lids(1,700);
  handAct('reach',2300);const p0=ALK.position.clone();await tween(k=>{ALK.position.set(p0.x+(14.5-p0.x)*k,p0.y+(.74-p0.y)*k,p0.z+(16.55-p0.z)*k);ALK.scale.setScalar(1+.6*k)},800);
  await say(sp('YOU','6:55?!'),1500);await say(sp('YOU',"Atuk opens at seven... I'm late!"),2400);
  await tween(k=>{ALK.position.set(14.5+(p0.x-14.5)*k,.74+(p0.y-.74)*k,16.55+(p0.z-16.55)*k);ALK.scale.setScalar(1.6-.6*k)},500);
  await Promise.all([tween(k=>{EYE.y=.62+(1.6-.62)*k},1300),camTo(13.1,18.2,Math.PI,0,1300)]);
  EYE.y=1.6;CINE.noclip=false;await cineOut();cv.style.transition='';cv.style.filter=''}
async function beginDay1(){
  setTime('day');lightsOn=true;applyLights(1);objT('');bulbSet(1);tapOff();ci=0;KC.visible=false;setClock('6:30 AM');
  shutter.position.y=1.2;shutBlock(true);showCrowd(false);D.crowd=false;QUEUE.forEach((q,i)=>{q.visible=true;q.position.set(QPOS[i][0],0,QPOS[i][1]);q.rotation.y=QPOS[i][2];pose(q,0,'stand')});drawBoard(1);day1Props(true);
  P.x=13;P.z=17.4;P.yaw=Math.PI/2;P.pitch=0;P.tx=null;
  state='d1_intro';const dc=$('dcard');dc.innerHTML='DAY 1<small>6:30 AM</small>';dc.style.opacity=1;await sleep(2600);dc.style.opacity=0;
  if(/[?&]skipwake/.test(location.search)){setClock('6:55 AM');$('fade').style.transition='opacity 1.6s';$('fade').style.opacity=0;P.x=13.1;P.z=18.2;P.yaw=Math.PI}else await wakeUp();
  state='d1_go';objT('Go to the kopitiam');$('hint').textContent=isLand()?'Left thumb: move · Right thumb: look':'Tap the floor to walk · drag to look';$('hint').classList.add('on');setTimeout(()=>$('hint').classList.remove('on'),8000);
  setTimeout(()=>{if(state==='d1_go')say("Atuk's bed is empty. He always opens the shop early.",3200)},1500)}
const CHAT=[["Petrol naik lagi, you tau?","Semalam punya bola, tak tengok ke?"],["Roti bakar sini memang best.","Dulu satu roti bakar, lima puluh sen je."],["Panas betul hari ni.","Kopi sini sama macam dulu-dulu."],["Adik, rajin betul. Seorang je jaga ke?","Kopi sini sama macam dulu."],["Boss, cepat sikit boleh? Nak pergi kerja.","Eh, gula habis ke?"]];
const CHATST=['d1_greet','d1_chores','d1_report','d1_bath','d1_back'];
let chatT=4,ambT=1;
function revealCrowd(){if(D.crowd)return;D.crowd=true;CROWD.forEach(c=>c.visible=true)}
function d1tick(dt){
  for(const f of G.tick)f(dt);
  CCLED.visible=Math.sin(performance.now()/420)>-.2;
  if(state==='d1_bath'&&!CINE.on){const t=performance.now()/1000;bulbSet(Math.sin(t*23)+Math.sin(t*37)>1.3?.15:.85)}
  {const w=WPS[state];if(w&&w.manual)MAN.pos.set(w.tx,1.1,w.tz);else if(w&&w.fn&&!busy&&!CINE.on&&Math.hypot(P.x-w.x,P.z-w.z)<w.r)w.fn()}
  wpTick();
  if(CHATST.includes(state)){chatT-=dt;
    if(chatT<0&&!busy&&!$('sub').classList.contains('on')){let bi=-1,bd2=2.6;CROWD.forEach((c,i)=>{const d=Math.hypot(c.position.x-P.x,c.position.z-P.z);if(d<bd2){bd2=d;bi=i}});if(bi>=0){chatT=8+Math.random()*6;say('"'+CHAT[bi][Math.random()*2|0]+'"',2600,CROWD[bi])}}
    ambT-=dt;if(ambT<0){ambT=1+Math.random()*1.8;const v=P.z<4?1:.25;A.nz(.4,300+Math.random()*300,600+Math.random()*400,.03*v,'bandpass',1.2);if(Math.random()<.4)A.tone(2400,1800,.06,.025*v)}}}

/* ---------- input ---------- */
const ray=new THREE.Raycaster();let look=null,stk=null;
const stickEl=$('stick'),knobEl=$('knob'),SR=52;
const cap=(e)=>{try{cv.setPointerCapture(e.pointerId)}catch(_){}};
cv.addEventListener('pointerdown',e=>{if(state==='title'||state==='end')return;if(CINE.on){CINE.skip();return}
  if(isLand()&&e.clientX<innerWidth*.45&&!stk){stk={id:e.pointerId,ox:e.clientX,oy:e.clientY,vx:0,vy:0};stickEl.style.left=e.clientX+'px';stickEl.style.top=e.clientY+'px';stickEl.style.display='block';knobEl.style.transform='';P.tx=null;cap(e);return}
  if(!look){look={id:e.pointerId,x:e.clientX,y:e.clientY,lx:e.clientX,ly:e.clientY,t:performance.now(),drag:false};cap(e)}});
cv.addEventListener('pointermove',e=>{
  if(stk&&e.pointerId===stk.id){let dx=e.clientX-stk.ox,dy=e.clientY-stk.oy;const l=Math.hypot(dx,dy);if(l>SR){dx*=SR/l;dy*=SR/l}stk.vx=dx/SR;stk.vy=dy/SR;knobEl.style.transform='translate('+dx+'px,'+dy+'px)';return}
  if(!look||e.pointerId!==look.id)return;const dx=e.clientX-look.lx,dy=e.clientY-look.ly;look.lx=e.clientX;look.ly=e.clientY;
  if(!look.drag&&Math.hypot(e.clientX-look.x,e.clientY-look.y)>10){look.drag=true;P.tx=null;P.fy=null}
  if(look.drag){P.yaw-=dx*.0062;P.pitch=Math.max(-.85,Math.min(.85,P.pitch-dy*.0062))}});
const up=e=>{if(stk&&e.pointerId===stk.id){stk=null;stickEl.style.display='none';return}
  if(!look||e.pointerId!==look.id)return;const p=look;look=null;if(!p.drag&&performance.now()-p.t<400)tap(e.clientX,e.clientY)};
cv.addEventListener('pointerup',up);cv.addEventListener('pointercancel',up);
const keys={};addEventListener('keyup',e=>{keys[e.key.toLowerCase()]=0});
function tap(x,y){if(state==='title'||state==='end')return;
  ray.setFromCamera(new THREE.Vector2(x/innerWidth*2-1,-(y/innerHeight)*2+1),camera);
  const hits=ray.intersectObjects(scene.children.filter(o=>o===floor||o.userData.it||o.isGroup&&o!==fan&&o!==fig||o===shutter||o===ledge||o===cup||o===slip),true);
  for(const h of hits){const o=h.object.userData.it;
    if(o){const d=Math.hypot(P.x-o.pos.x,P.z-o.pos.z);if(o.enabled()&&d<3.4&&!busy){go(o);return}if(d>=3.4&&!isLand()){const dx=o.pos.x-P.x,dz=o.pos.z-P.z,L=Math.hypot(dx,dz);P.tx=o.pos.x-dx/L*1.6;P.tz=o.pos.z-dz/L*1.6;return}return}
    if(h.object===floor){if(isLand())return;P.tx=h.point.x;P.tz=h.point.z;return}}}
addEventListener('keydown',e=>{keys[e.key.toLowerCase()]=1;if(e.key==='e'||e.key==='Enter'){const c=cur;if(c&&!busy)go(c)}});
const prompt=$('prompt');let cur=null;
prompt.addEventListener('pointerdown',e=>{e.stopPropagation()});
prompt.addEventListener('click',e=>{e.stopPropagation();if(cur&&!busy)go(cur)});

/* first-person hands (only while interacting) */
const hands=new THREE.Group();camera.add(hands);hands.visible=false;
const HMt=c=>{const m=NM(c);m.depthTest=false;return m};const skinH=HMt(0xc9a27e),sleeveH=HMt(0x4a5a72),clothH=HMt(0xe9e4d2),cupH=HMt(0xeeeeee),cupT=HMt(0x3a1d10);
function mkArm(){const g=new THREE.Group();hands.add(g);const up=new THREE.Group();g.add(up);
  for(const [geo,m,z] of [[new THREE.CylinderGeometry(.075,.09,.46,8),sleeveH,-.23],[new THREE.CylinderGeometry(.048,.062,.24,8),skinH,-.58]]){const me=new THREE.Mesh(geo,m);me.rotation.x=Math.PI/2;me.position.z=z;me.renderOrder=40;up.add(me)}
  const hd=new THREE.Mesh(new THREE.SphereGeometry(.075,8,6),skinH);hd.scale.set(1,.7,1.35);hd.position.z=-.72;hd.renderOrder=40;up.add(hd);
  const cloth=new THREE.Mesh(new THREE.BoxGeometry(.17,.03,.15),clothH);cloth.position.set(0,-.06,-.76);cloth.renderOrder=41;cloth.visible=false;up.add(cloth);
  const cup=new THREE.Group();cup.position.set(0,.07,-.74);cup.visible=false;up.add(cup);
  const cb=new THREE.Mesh(new THREE.CylinderGeometry(.06,.045,.1,8),cupH);cb.renderOrder=41;cup.add(cb);const ct=new THREE.Mesh(new THREE.CylinderGeometry(.052,.052,.012,8),cupT);ct.position.y=.045;ct.renderOrder=42;cup.add(ct);
  return {g,up,hd,cloth,cup}}
const HR=mkArm(),HL=mkArm();let hMode='idle',hT=0,hV=0,hGoal=0,hTO=0;
const handle=new THREE.Mesh(new THREE.BoxGeometry(.7,.07,.09),NM(0x2c2f33));handle.position.set(0,-1.12,0);shutter.add(handle);
const _v=new THREE.Vector3(),_u=new THREE.Vector3(0,0,-1),_d=new THREE.Vector3();
function aim(a,side,tx,ty,tz){a.g.position.set(side*.3,-.55,-.05);_d.set(tx-side*.3,ty+.55,tz+.05);const L=_d.length();_d.normalize();a.g.quaternion.setFromUnitVectors(_u,_d);a.up.scale.set(.85,.85,Math.max(.6,L/.78))}
function setHands(mode,t,ht){HR.cloth.visible=HL.cloth.visible=HR.cup.visible=HL.cup.visible=false;HR.hd.scale.set(1,.7,1.35);
  aim(HL,-1,-.3,-.45,-.5);aim(HR,1,.3,-.45,-.5);
  if(mode==='wipe'){aim(HR,1,Math.sin(t)*.22,.0,-.6);HR.cloth.visible=true}
  else if(mode==='reach'){const k=Math.sin(Math.min(1,ht/.8)*Math.PI);aim(HR,1,.14,-.32+k*.06,-.5-k*.18)}
  else if(mode==='kopi'){aim(HR,1,.14,-.3,-.52);HR.cup.visible=true;aim(HL,-1,-.12,-.36,-.5)}
  else if(mode==='serve'){aim(HR,1,.2,-.26,-.64);HR.cup.visible=true}
  else if(mode==='knock'){aim(HR,1,.1,-.12,-.55-.08*Math.max(0,Math.sin(t*1.9)));HR.hd.scale.set(1.15,1,1.15)}
  else if(mode==='lift'){handle.getWorldPosition(_v);camera.worldToLocal(_v);aim(HR,1,_v.x+.13,_v.y,_v.z);aim(HL,-1,_v.x-.13,_v.y,_v.z)}}
function handAct(mode,ms){hMode=mode;hT=0;hGoal=1;clearTimeout(hTO);hTO=setTimeout(()=>{hGoal=0},ms)}
function handTick(dt){hV+=(hGoal-hV)*Math.min(1,dt*9);if(hGoal===0&&hV<.03)hV=0;hands.visible=hV>.03;if(!hands.visible)return;hT+=dt;hands.position.y=-(1-hV)*.7;
  if(hMode==='lift'){handle.getWorldPosition(_v);const hz=Math.max(.8,Math.abs(3.96-P.z)),want=hGoal?Math.max(-.7,Math.min(.6,Math.atan2(_v.y-1.6,hz)+.12)):0;P.pitch+=(want-P.pitch)*Math.min(1,dt*4)}
  camera.rotation.x=P.pitch;camera.updateMatrixWorld(true);setHands(hMode,hT*7,hT)}
const HMODE={wipe:['wipe',1500],cups:['reach',1200],kopi:['kopi',1700],serve:['serve',1700],sugar:['reach',1200],bath:['reach',1200],note:['reach',1200],housedoor:['reach',1200],radio:['reach',1100],fuse:['reach',1100],hatch:['reach',1100],shutter:['lift',1900]};
function go(o){const dx=o.pos.x-P.x,dz=o.pos.z-P.z;if(Math.hypot(dx,dz)>.3)P.fy=Math.atan2(-dx,-dz);const h=HMODE[o.id];if(h&&!(o.id==='shutter'&&state==='d1_lock'&&P.z<4.3)&&!(o.id==='housedoor'&&state==='d1_home'))handAct(h[0],h[1]);o.act()}
/* markers */
const MK={};
const HF=[[6.4,4.6,2.5,10,1.25],[9.4,2.4,2.5,11,1.25],[12.4,3,2.5,10.5,1.25],[15.4,5.4,2.4,9,1.2],[5.4,10,13.4,9,4.5],[2.6,9.6,2.6,8,1.3,-32,3.9,13.6]];
const ICONS={touch:{r:HF},wipe:{r:HF,p:'M3 22q4.5 -2.6 9 0t9 0'},grab:{r:[[6.4,8,11.6,4.2,2.1],[6,11.4,12.4,4,2],[6.4,14.6,11.6,4,2],[5,6,14,13.4,5],[3.2,7.4,5,3,1.5,25,5.7,8.9]]},
 knock:{r:[[5,8,14,11,4.5],[5.6,4.6,2.8,5,1.4],[8.6,3.6,2.8,6,1.4],[11.6,3.6,2.8,6,1.4],[14.6,4.6,2.8,5,1.4]],p:'M1.5 8.5l2-1.2M1 12h2.4M1.5 15.5l2 1.2'}};
const iconSvg=k=>{const d=ICONS[k];return 'url("data:image/svg+xml;utf8,'+encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><g fill='#fff'>"+d.r.map(r=>"<rect x='"+r[0]+"' y='"+r[1]+"' width='"+r[2]+"' height='"+r[3]+"' rx='"+r[4]+"'"+(r[5]?" transform='rotate("+r[5]+" "+r[6]+" "+r[7]+")'":'')+'/>').join('')+"</g>"+(d.p?"<path d='"+d.p+"' stroke='#6b4400' stroke-width='1.3' stroke-linecap='round' fill='none'/>":'')+'</svg>')+'")'};
const ICF={shutter:'grab',wipe:'wipe',cups:'grab',kopi:'grab',serve:'grab',sugar:'grab',housedoor:'knock'},icOf=o=>ICF[o.id]||'touch';ICF.man='grab';
const mkTexs={};function mkTexFor(k){if(mkTexs[k])return mkTexs[k];const d=ICONS[k];const t=mkTexs[k]=ctex(48,48,c=>{c.fillStyle='rgba(20,16,10,.78)';c.beginPath();c.arc(24,24,21,0,7);c.fill();c.strokeStyle='#F2B531';c.lineWidth=2.6;c.stroke();c.save();c.translate(24,24);c.scale(1.15,1.15);c.translate(-12,-12);c.fillStyle='#fff';
  for(const r of d.r){c.save();if(r[5]){c.translate(r[6],r[7]);c.rotate(r[5]*Math.PI/180);c.translate(-r[6],-r[7])}const x=r[0],y=r[1],w=r[2],h=r[3],q=Math.min(r[4],w/2,h/2);c.beginPath();c.moveTo(x+q,y);c.arcTo(x+w,y,x+w,y+h,q);c.arcTo(x+w,y+h,x,y+h,q);c.arcTo(x,y+h,x,y,q);c.arcTo(x,y,x+w,y,q);c.closePath();c.fill();c.restore()}
  if(d.p){c.strokeStyle='#F2B531';c.lineWidth=1.3;c.lineCap='round';c.stroke(new Path2D(d.p))}c.restore()});t.minFilter=t.magFilter=THREE.LinearFilter;return t}
function markers(t){const arrow=$('arrow');let tgt=null,td=1e9;
  for(const o of ITS){const on=o.enabled()&&o.id!=='atuk'||o.enabled();let m=MK[o.id];if(!m){m=MK[o.id]=new THREE.Sprite(new THREE.SpriteMaterial({map:mkTexFor(icOf(o)),depthTest:false,transparent:true,fog:false}));m.renderOrder=20;m.visible=false;scene.add(m)}
    const d=Math.hypot(o.pos.x-P.x,o.pos.z-P.z);m.visible=!!(on&&d>2.2&&d<14&&!CINE.on);if(on&&d<td&&d>2.2){td=d;tgt=o}
    if(m.visible){m.position.set(o.pos.x,o.pos.y+.55+Math.sin(t/260)*.05,o.pos.z);const sc=.2+d*.045;m.scale.set(sc,sc,1)}}
  if(tgt){const v=tgt.pos.clone().project(camera);let x=v.x,y=v.y;const behind=v.z>1;if(behind){x=-x;y=-y}
    if(!behind&&Math.abs(x)<.92&&Math.abs(y)<.85){arrow.style.display='none'}else{const a=Math.atan2(y,x);let ex=Math.cos(a),ey=Math.sin(a);const k=Math.max(Math.abs(ex)/.9,Math.abs(ey)/.8);ex/=k;ey/=k;arrow.style.display='block';arrow.style.left=(innerWidth*(ex+1)/2-11)+'px';arrow.style.top=(innerHeight*(1-ey)/2-11)+'px';arrow.style.transform='rotate('+(Math.PI/2-a)*57.3+'deg)'}}
  else arrow.style.display='none'}
/* ---------- loop ---------- */
const EYE={y:1.6};
function collide(){if(CINE.noclip)return;let bd=1e9,bx=P.x,bz=P.z;for(const [a,b,c,d] of ZONES){const x=Math.max(a,Math.min(b,P.x)),z=Math.max(c,Math.min(d,P.z)),q=(x-P.x)**2+(z-P.z)**2;if(q<bd){bd=q;bx=x;bz=z}}P.x=bx;P.z=bz;const r=.32;
  for(const [a,b,c,d] of AABB){if(P.x>a-r&&P.x<b+r&&P.z>c-r&&P.z<d+r){const l=P.x-(a-r),rr=(b+r)-P.x,t=P.z-(c-r),bt=(d+r)-P.z,m=Math.min(l,rr,t,bt);if(m===l)P.x=a-r;else if(m===rr)P.x=b+r;else if(m===t)P.z=c-r;else P.z=d+r}}}
let last=0,acc=0,flickT=3;
function update(dt){
  {const inside=P.x>3&&P.x<15&&P.z>15&&P.z<23;if(BALC[0].visible===inside)BALC.forEach(m=>m.visible=!inside)}
  animAltar(performance.now()/1000);
  if(!busy&&!CINE.on&&/^d[2-5]_go$/.test(state)&&!doorSeen[state]&&Math.hypot(P.x-6.1,P.z-15.9)<.75){doorSeen[state]=1;doorOut()}
  let moving=false;
  if(CINE.on){P.tx=null;stk=null;look=null}
  if(P.tx!==null&&state!=='end'){const dx=P.tx-P.x,dz=P.tz-P.z,d=Math.hypot(dx,dz);
    if(d<.12)P.tx=null;else{const sp=1.9*dt*(G.spd||1),k=Math.min(1,sp/d);const ox=P.x,oz=P.z;P.x+=dx*k;P.z+=dz*k;collide();moving=true;
      if(Math.hypot(P.x-ox,P.z-oz)<sp*.2)P.tx=null;
      const hd=Math.atan2(-dx,-dz);let df=hd-P.yaw;df=Math.atan2(Math.sin(df),Math.cos(df));P.yaw+=df*Math.min(1,dt*3.2)}}
  {let jx=0,jy=0;if(stk&&(Math.abs(stk.vx)>.12||Math.abs(stk.vy)>.12)){jx=stk.vx;jy=stk.vy}
   if(CINE.on){jx=jy=0}else{if(keys.w||keys.arrowup)jy-=1;if(keys.s||keys.arrowdown)jy+=1;if(keys.a)jx-=1;if(keys.d)jx+=1;if(keys.arrowleft)P.yaw+=dt*1.6;if(keys.arrowright)P.yaw-=dt*1.6}
   const mag=Math.min(1,Math.hypot(jx,jy));
   if(mag>.01&&state!=='end'&&!CINE.on){P.tx=null;const fx=-Math.sin(P.yaw),fz=-Math.cos(P.yaw),rx=Math.cos(P.yaw),rz=-Math.sin(P.yaw),sp=2.1*dt*mag*(G.spd||1),l=Math.hypot(jx,jy);const ox=P.x,oz=P.z;
     P.x+=((-jy/l)*fx+(jx/l)*rx)*sp;P.z+=((-jy/l)*fz+(jx/l)*rz)*sp;collide();moving=Math.hypot(P.x-ox,P.z-oz)>sp*.15}}
  if(moving){P.bob+=dt*9;walkT+=dt;if(walkT>.52){walkT=0;A.step()}}
  camera.position.set(P.x,EYE.y+(moving?Math.sin(P.bob)*.035:0),P.z);camera.rotation.y=P.yaw;camera.rotation.x=P.pitch;
  {let zx=0,zy=2.5,zz=0,zk=0;
   if(P.z>4.2&&P.z<14.8&&(P.z>14.2?!(P.x>3&&P.x<15.2):true)){let lx=LAMPS[0];for(const l of LAMPS)if(Math.abs(l-P.x)<Math.abs(lx-P.x))lx=l;zx=lx;zy=3.5;zz=10.5;zk=SK}
   else if(P.z>=14.8&&P.x>3&&P.x<15.2){zk=({day:3.8,dusk:5.5,night:4.2})[TIME];zy=2.3;if(P.x<7.2){zx=5.2;zz=19}else if(P.z<19.4){zx=P.x<11.2?9.1:13.1;zz=17.2}else{zx=11;zz=21.2}}
   else if(P.z<-4.2&&P.x>-2.7){zx=1.25;zz=-5.5;zk=7}
   else if(P.x<-6.8){zx=-8.25;zz=2.5;zk=6}
   LZ.position.set(zx,zy,zz);if(zk!==ZK){ZK=zk}LZ.intensity=lightF*ZK}
  fan.rotation.y+=dt*(lightsOn?2.2:.4);
  d1tick(dt);npcTick(dt);markers(performance.now());handTick(dt);
  if(P.fy!==null){let df=P.fy-P.yaw;df=Math.atan2(Math.sin(df),Math.cos(df));if(Math.abs(df)<.02)P.fy=null;else P.yaw+=df*Math.min(1,dt*6)}
  led.visible=state==='dark'?(Math.floor(performance.now()/450)%2===0):false;
  if(lightsOn&&!busy&&TIME==='night'){flickT-=dt;if(flickT<0){flickT=3+Math.random()*6;if(Math.random()<.5)flicker([.35,1],60)}}
  /* prompt */
  let best=null,bd=9;const fw=new THREE.Vector3(-Math.sin(P.yaw),0,-Math.cos(P.yaw));
  if(!busy)for(const o of ITS){if(!o.enabled())continue;const dx=o.pos.x-P.x,dz=o.pos.z-P.z,d=Math.hypot(dx,dz);if(d<3.4&&(dx*fw.x+dz*fw.z)/d>.1&&d<bd){bd=d;best=o}}
  if(best!==cur){cur=best;prompt.style.display=cur?'flex':'none'}
  if(cur){const l=lab(cur);if(prompt.textContent!==l)prompt.textContent=l;const k=icOf(cur);if(prompt.dataset.ic!==k){prompt.dataset.ic=k;prompt.style.setProperty('--ic',iconSvg(k))}}
  /* scare trigger: look at the figure, or get close */
  if(state==='lit2'&&!scareDone&&!busy&&fig.visible&&lightsOn){const dx=fig.position.x-P.x,dz=fig.position.z-P.z,d=Math.hypot(dx,dz);const vis=(dx*fw.x+dz*fw.z)/d;
    if(vis>.8&&d<7)lookT+=dt;else lookT=Math.max(0,lookT-dt*.5);
    if(lookT>1.4||d<2.2){lookT=0;doScare()}}
}
let ema=33,adT=0;
function frame(t){requestAnimationFrame(frame);const raw=t-last;if(raw<30)return;const dt=Math.min(.07,raw/1000);last=t;ema=ema*.93+Math.min(raw,200)*.07;adT+=raw;
  if(adT>1800){adT=0;if(ema>44&&RES>.4){RES=Math.max(.4,RES-.1);try{localStorage.lo_res=RES}catch(_){}resize()}}
  update(dt);renderer.render(scene,camera)}

/* ---------- hook for the later days (day2.js ...) ---------- */
const G={tm:nightClock,yawFrom,ZONES,AABB,AMB,person,THREE,scene,camera,P,EYE,A,CINE,D,WPS,atuk,CROWD,HOME,QUEUE,FEET,shutter,radio,BULB,STREAM,ALK,stain,cupsD,tick:[],day2:null,day3:null,day4:null,day5:null,stools,fan,
  $,sleep,say,sp,cineIn,cineOut,camTo,yawTo,csleep,tween,handAct,pose,objT,setClock,setTime,applyLights,bulbSet,flicker,tapOn,tapOff,lids,startAlarm,stopAlarm,drawClock,
  showCrowd,drawBoard,day1Props,shutBlock,chWipe,chCups,ctex,isLand,atukLeave,M,B,box,
  AEV,AMBD,get ac(){return ac},get master(){return master},get ambG(){return ambG},
  get state(){return state},set state(v){state=v},get busy(){return busy},set busy(v){busy=v},
  setLights(v){lightsOn=v},setBlur(v){cv.style.transition='filter 1.4s';cv.style.filter=v?'blur(8px)':''}};
const V=new URL(import.meta.url).search,BUILD='202611273022';{const b=document.getElementById('bld');if(b)b.textContent='build '+BUILD}
import('./day2.js'+V).then(m=>m.default(G)).catch(e=>console.warn('day2 not loaded',e));
import('./day3.js'+V).then(m=>m.default(G)).catch(e=>console.warn('day3 not loaded',e));
import('./day4.js'+V).then(m=>m.default(G)).catch(e=>console.warn('day4 not loaded',e));
import('./day5.js'+V).then(m=>m.default(G)).catch(e=>console.warn('day5 not loaded',e));
import('./close.js'+V).then(m=>m.default(G)).catch(e=>console.warn('close not loaded',e));
import('./sfx.js'+V).then(m=>m.default(G)).catch(e=>console.warn('sfx not loaded',e));
import('./watch.js'+V).then(m=>m.default(G)).catch(e=>console.warn('watch not loaded',e));

/* ---------- start ---------- */
resize();
async function goFull(){try{const d=document.documentElement;if(!document.fullscreenElement&&d.requestFullscreen)await d.requestFullscreen({navigationUI:'hide'})}catch(_){}try{await screen.orientation.lock('landscape')}catch(_){}}
async function begin(){goFull();$('title').style.display='none';initAudio();if(ac&&ac.state==='suspended')ac.resume();
  if(/[?&]day5/.test(location.search)&&G.day5)return G.day5();
  if(/[?&]day4/.test(location.search)&&G.day4)return G.day4();
  if(/[?&]day3/.test(location.search)&&G.day3)return G.day3();
  if(/[?&]day2/.test(location.search)&&G.day2)return G.day2();
  if(!NIGHT)return beginDay1();setTime('night');
  P.x=0;P.z=3;P.yaw=0;P.pitch=0;P.tx=null;applyLights(0);objT('');
  $('fade').style.transition='opacity 1.6s';$('fade').style.opacity=1;await sleep(300);
  state='intro';lightsOn=true;applyLights(.0);await lightsOnNow();$('fade').style.opacity=0;
  state='lit1';objT('Close up for the night');$('hint').textContent=isLand()?'Left thumb: move · Right thumb: look':'Tap the floor to walk · drag to look';$('hint').classList.add('on');setTimeout(()=>$('hint').classList.remove('on'),8000);
  A.static(.04);setTimeout(()=>A.static(0),2500)}
const gqs=[...document.querySelectorAll('#gq button')];
const gqMark=()=>gqs.forEach(x=>x.classList.toggle('on',Math.abs(parseFloat(x.dataset.r)-RES)<.16));gqMark();
gqs.forEach(x=>x.addEventListener('click',()=>{RES=parseFloat(x.dataset.r);try{localStorage.lo_res=RES}catch(_){}resize();gqMark()}));
document.documentElement.classList.toggle('sm',SMOOTH);
document.querySelectorAll('#cq button').forEach(x=>{x.classList.toggle('on',(x.dataset.s==='1')===SMOOTH);x.addEventListener('click',()=>{if((x.dataset.s==='1')===SMOOTH)return;try{localStorage.lo_smooth=x.dataset.s}catch(_){}location.reload()})});
$('begin').addEventListener('click',begin);
$('again').addEventListener('click',()=>location.reload());
if('serviceWorker' in navigator){const rg=()=>navigator.serviceWorker.register('sw.js').catch(()=>{});document.readyState==='complete'?rg():addEventListener('load',rg)}
requestAnimationFrame(t=>{last=t;frame(t)});
window.__lo={G,day5:()=>G.day5&&G.day5(),day4:()=>G.day4&&G.day4(),day2:()=>G.day2&&G.day2(),day3:()=>G.day3&&G.day3(),hand:()=>[hV,hMode],D:()=>D,setState:v=>{state=v},setTime,shut:()=>shutter.position.y,board:drawBoard,crowd:showCrowd,land:isLand,st:()=>({state,busy,scareDone,x:P.x,z:P.z,yaw:P.yaw,lights:lightsOn,cur:cur&&cur.id}),goto:(x,z)=>{P.tx=x;P.tz=z},tp:(x,z,y)=>{P.x=x;P.z=z;P.yaw=y||0;P.tx=null},look:(y,p)=>{P.yaw=y;P.pitch=p||0},act:id=>{const o=ITS.find(i=>i.id===id);o.act()},begin};
