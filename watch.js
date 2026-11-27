/* "The Watcher": the black figure stands somewhere in the background of ordinary moments, Days 2-3 (Day 1 stays normal).
   It never moves while you look at it. Look away after seeing it and it is gone. Each time it is a little closer. */
export default function install(G){
  const P=G.P,CINE=G.CINE,A=G.A,AMB=G.AMB,R=a=>a*Math.PI/180;
  const ST={2:['d2_chores','d2_rule','d2_radio'],3:['d3_rule','d3_talk','d3_tv']};
  const PLAN={2:['street','kitchen'],3:['kitchen','back']};
  const SPOT={
    street:{x:.3,z:10.5,cone:24,minD:5,ok:p=>G.shutter.position.y>3&&p.z>.4&&p.z<3.7&&Math.abs(p.x)<3.2},
    kitchen:{x:3.8,z:-4.75,cone:26,minD:4.5,ok:p=>p.z>-3&&p.z<2.5&&p.x>-3.8&&p.x<3.2},
    back:{x:-3.9,z:-3.35,cone:26,minD:5,ok:p=>p.z>-.5&&p.z<3&&p.x>-2&&p.x<4}};
  const day=()=>{const m=/^d([1-5])_/.exec(G.state);return m?+m[1]:0};
  const allowed=()=>{const d=day();return d&&ST[d]&&ST[d].includes(G.state)&&!G.busy&&!CINE.on};
  const ang=(x,z)=>{let d=Math.atan2(-(x-P.x),-(z-P.z))-P.yaw;d=Math.atan2(Math.sin(d),Math.cos(d));return Math.abs(d)};
  const done={1:0,2:0,3:0},next={};let act=null;
  const MAX={2:2,3:2};
  function spawn(name){const F=G.FIG,s=SPOT[name];
    F.position.set(s.x,0,s.z);F.rotation.y=Math.atan2(P.x-s.x,P.z-s.z);F.visible=true;
    act={name,x:s.x,z:s.z,t:0,look:0};AMB.duck(3000)}
  function vanish(){if(act){G.FIG.visible=false;act=null}}
  G.WATCH={force:name=>spawn(name),active:()=>act&&act.name,done};
  G.tick.push(dt=>{
    const now=performance.now()/1000;
    if(act){const F=G.FIG;
      if(!F.visible||Math.hypot(F.position.x-act.x,F.position.z-act.z)>.01){act=null;return}   /* a scene took the figure over */
      if(!allowed()){vanish();return}
      const a=ang(act.x,act.z),d=Math.hypot(P.x-act.x,P.z-act.z);
      F.rotation.y=Math.atan2(P.x-act.x,P.z-act.z);act.t+=dt;
      if(a<R(22))act.look+=dt;
      if((act.look>.9&&a>R(58))||d<3.1||act.t>16||(act.look<.01&&act.t>5))vanish();
      return}
    const d=day();if(!d||!PLAN[d]||!allowed()||G.FIG.visible)return;
    if(done[d]>=MAX[d])return;
    if(next[d]===undefined){next[d]=now+25+Math.random()*20;return}
    if(now<next[d])return;
    const name=PLAN[d][done[d]],s=SPOT[name];if(!s||!s.ok(P))return;
    if(Math.hypot(P.x-s.x,P.z-s.z)<s.minD||ang(s.x,s.z)>R(s.cone))return;
    done[d]++;next[d]=now+70+Math.random()*30;spawn(name)});
}
