/* The store room: behind the kitchen, through a doorway in the kitchen's west wall. Shelves, sacks, cartons, one bare bulb. */
export default function install(G){
const {THREE,scene,M,B,box,ZONES,AABB}=G,T=THREE;
/* open the kitchen's west wall (x -2.5) with a doorway at z -6..-5 */
let kw=null;scene.children.forEach(o=>{if(o.isMesh&&o.geometry.type==='PlaneGeometry'&&Math.abs(o.position.x+2.5)<.01&&Math.abs(o.position.z+5.5)<.01&&o.geometry.parameters.width===3&&Math.abs(Math.abs(o.rotation.y)-Math.PI/2)<.01)kw=o});
if(!kw){console.warn('store: kitchen west wall not found');return}
scene.remove(kw);const km=kw.material,ry=kw.rotation.y;
const seg=(w,h,y,z,x=-2.5)=>{const m=new T.Mesh(new T.PlaneGeometry(w,h),km);m.position.set(x,y,z);m.rotation.y=ry;scene.add(m);return m};
seg(1,3,1.5,-6.5);seg(1,3,1.5,-4.5);seg(1,.9,2.55,-5.5);
/* the room: x -5..-2.5, z -7..-4 (the dining room's back wall and west wall already close two sides) */
G.flo(-5,-2.5,-7,-4,'#7d7a70','#66635a');
G.wall(2.5,3,-3.75,1.5,-7,0);G.wall(3,3,-5,1.5,-5.5,Math.PI/2);
/* the kitchen side of the same walls, so the room is a closed box from the inside too */
const wood=M(0x6a4a2e),post=M(0x4f3a28);
const cols=[0xb08a5a,0x9c7a4c,0xc9b98a,0xd8d0b8,0x7a8a6a,0xa8553a,0xe4e0d2,0x5a6a7a].map(c=>M(c));
let seed=17;const rnd=()=>{seed=(seed*9301+49297)%233280;return seed/233280};
function shelf(x,z,len,alongX){
  const dp=.42,lv=[.2,.78,1.36,1.94],n=Math.max(2,Math.round(len/.9));
  for(let i=0;i<=n;i++){const p=-len/2+i*(len/n);for(const s of[-1,1])alongX?box(.06,2.1,.06,post,x+p,1.05,z+s*dp/2):box(.06,2.1,.06,post,x+s*dp/2,1.05,z+p)}
  for(const y of lv){alongX?box(len,.04,dp,wood,x,y,z):box(dp,.04,len,wood,x,y,z);
    let u=-len/2+.12;while(u<len/2-.3){const w=.2+rnd()*.26,hh=.14+rnd()*.26,c=cols[Math.floor(rnd()*cols.length)];
      if(rnd()<.18){u+=.28;continue}
      alongX?box(w,hh,dp*.72,c,x+u+w/2,y+.02+hh/2,z):box(dp*.72,hh,w,c,x,y+.02+hh/2,z+u+w/2);u+=w+.05}}}
shelf(-4.78,-5.5,2.6,false);   /* west wall */
shelf(-3.75,-6.78,1.9,true);   /* north wall */
shelf(-3.9,-4.22,1.5,true);    /* south wall */
AABB.push([-5,-4.5,-6.9,-4.1],[-4.7,-2.8,-7,-6.55],[-4.65,-3.15,-4.45,-4]);
/* floor clutter: a kopi sack stack and a crate by the door */
box(.5,.18,.4,M(0xc9b98a),-3.0,.09,-6.55);box(.46,.16,.38,M(0xbfae80),-3.02,.26,-6.55);box(.5,.4,.5,M(0x7a5a38),-3.05,.2,-4.5);
AABB.push([-3.3,-2.7,-6.8,-6.3],[-3.35,-2.75,-4.75,-4.25]);
/* one bare bulb */
{const g=new T.Group();g.position.set(-3.75,3,-5.5);scene.add(g);box(.012,.5,.012,M(0x222222),0,-.25,0,g);const b=new T.Mesh(new T.SphereGeometry(.07,8,6),B(0xfff0c0));b.position.y=-.55;g.add(b)}
/* the door, standing open into the kitchen */
G.doorLeaf(-2.5,-5.0,.2,1.0).rotation.y=.2;
/* walkable: the room, and the doorway joining it to the kitchen */
ZONES.push([-4.7,-2.85,-6.65,-4.35],[-2.95,-2.1,-5.9,-5.1]);
}
