/* Real recorded sounds (sfx/*.mp3) layered on top of the synthesized ones.
   Everything here is optional: if a file is missing or audio is off, the game falls back to the old sounds. */
export default function install(G){
  const NAMES=['knock_1','knock_2','knock_3','knock_4','switch','clink','door_squeak','jiggle','shutter_motor','loop_fluor','loop_fridge','clock','chop','drawer_squeak','metal_scrape','step_1','step_2','step_3','step_4','step_5','step_6','loop_ac','loop_static','loop_rain','tap_drip','screech_drag','slosh','bag',
    'house_creak','mech_moan','creepy_3','creepy_5','breath_slow','breath_fast','yell_far','drone_doom','bell_low',
    'piano_stinger_dissonent','piano_stinger_dissonent_2','stinger','slow_stinger','metal_resonance','metal_twang',
    'monster_growl_1','monster_growl_5','monster_roar_2','monster_roar_4','monster_grunt_long','monster_breath',
    'zombie','zombie_6','zombie_8','tone_moaning','tone_moaning_deep_3','ghost_moan_2','ghost_scream_3','ghost_chior',
    'harmonized_tone_pleasant_but_spooky','child_laugh','child_laugh_7','laugh_spooky_4','scratch_high_pitch','hiss',
    'piano_drone_low_sustained_2','spooky_ambience','suspenseful_pitch_increase','bite','injured'];
  const buf={},pick=a=>a[Math.random()*a.length|0];
  let started=false,verb=null;

  async function load(){
    const ac=G.ac;if(!ac)return;started=true;
    /* small room echo so the sounds feel like they are in the kopitiam, not in your ear */
    try{const len=Math.floor(ac.sampleRate*1.3),ir=ac.createBuffer(2,len,ac.sampleRate);
      for(let c=0;c<2;c++){const d=ir.getChannelData(c);let lp=0;for(let i=0;i<len;i++){lp+=((Math.random()*2-1)-lp)*.35;d[i]=lp*Math.pow(1-i/len,3.2)}}
      verb=ac.createConvolver();verb.buffer=ir;const vg=ac.createGain();vg.gain.value=.8;verb.connect(vg);vg.connect(G.master)}catch(e){verb=null}
    for(const n of NAMES){
      try{const r=await fetch('./sfx/'+n+'.mp3');const a=await r.arrayBuffer();
        buf[n]=await new Promise((ok,no)=>ac.decodeAudioData(a,ok,no))}catch(e){console.warn('sfx',n,e)}
      await new Promise(r=>setTimeout(r,30))}
  }
  G.tick.push(()=>{if(!started&&G.ac)load()});

  /* o: g gain, p pan, rate, lp lowpass (muffled/far), wet room echo, amb route through the ambience bus (ducks after stings), at delay */
  function play(n,o={}){
    const ac=G.ac,b=buf[n];if(!ac||!b)return null;
    const s=ac.createBufferSource();s.buffer=b;s.playbackRate.value=o.rate||1;
    let node=s;
    if(o.lp){const f=ac.createBiquadFilter();f.type='lowpass';f.frequency.value=o.lp;node.connect(f);node=f}
    const g=ac.createGain(),t=ac.currentTime+(o.at||0);g.gain.value=o.g??1;node.connect(g);node=g;
    if(o.p&&ac.createStereoPanner){const p=ac.createStereoPanner();p.pan.value=o.p;node.connect(p);node=p}
    node.connect(o.amb&&G.ambG?G.ambG:G.master);
    if(verb&&o.wet!==0){const w=ac.createGain();w.gain.value=o.wet??.3;node.connect(w);w.connect(verb)}
    s.start(t);return s}
  /* a looping sound with its own fade. o: g, lp, hp, rate, fade. returns {stop(sec)} */
  function loop(n,o={}){
    const ac=G.ac,b=buf[n];if(!ac||!b)return {stop(){}};
    const s=ac.createBufferSource();s.buffer=b;s.loop=true;s.playbackRate.value=o.rate||1;let node=s;
    if(o.hp){const f=ac.createBiquadFilter();f.type='highpass';f.frequency.value=o.hp;node.connect(f);node=f}
    if(o.lp){const f=ac.createBiquadFilter();f.type='lowpass';f.frequency.value=o.lp;node.connect(f);node=f}
    const g=ac.createGain(),t=ac.currentTime;g.gain.value=0;g.gain.setTargetAtTime(o.g??1,t,o.fade||.5);node.connect(g);g.connect(o.amb&&G.ambG?G.ambG:G.master);
    s.start(t,Math.random()*b.duration*.5);
    return {g,stop(sec=.4){const tt=ac.currentTime;g.gain.cancelScheduledValues(tt);g.gain.setTargetAtTime(0,tt,sec/3);setTimeout(()=>{try{s.stop()}catch(e){}},sec*1000+300)}}}
  G.SFX={play,loop,has:n=>!!buf[n]};

  /* stingers: real piano hits instead of the thin synth chord (old one stays as fallback) */
  const A=G.A,sting0=A.sting,rumble0=A.rumble,step0=A.step,scrape0=A.scrape,static0=A.static,knock0=A.knock,click0=A.click,clink0=A.clink,door0=A.door,shutter0=A.shutter,jiggle0=A.jiggle,humv0=A.humv;let si=0,lastStep=0;
  const ST=['piano_stinger_dissonent','stinger','piano_stinger_dissonent_2','slow_stinger'];
  A.sting=()=>{const n=ST[si++%ST.length];
    if(!buf[n]){sting0();return}
    G.AMB.duck(3600);A.tone(90,30,.9,.4);play(n,{g:.95,wet:.35})};
  A.rumble=()=>{rumble0();play('metal_resonance',{g:.55,rate:.75,wet:.4})};
  /* real footsteps (cut from your walking recording), shutter drag, radio static */
  A.step=()=>{if(!buf.step_1){step0();return}let k;do{k=1+(Math.random()*6|0)}while(k===lastStep);lastStep=k;
    play('step_'+k,{g:.34+Math.random()*.14,rate:.93+Math.random()*.14,wet:.1})};
  A.scrape=()=>{if(buf.screech_drag)play('screech_drag',{g:.55,rate:.9+Math.random()*.2,wet:.25});else scrape0()};
  /* house and office sounds: real knocks, doors, light switch, shutter motor, handle jiggle, fluorescent buzz */
  let kl=0;
  A.knock=()=>{if(!buf.knock_1){knock0();return}let k;do{k=1+(Math.random()*4|0)}while(k===kl);kl=k;A.tone(110,55,.12,.12);play('knock_'+k,{g:.9,rate:.95+Math.random()*.1,wet:.2})};
  A.click=()=>{if(!buf.switch){click0();return}play('switch',{g:.3,rate:.9+Math.random()*.25,wet:0})};
  A.clink=()=>{if(!buf.clink){clink0();return}play('clink',{g:.45,rate:.9+Math.random()*.3,wet:.15})};
  A.door=()=>{if(!buf.door_squeak){door0();return}play('door_squeak',{g:.7,rate:.95+Math.random()*.1,wet:.25})};
  A.shutter=()=>{if(!buf.shutter_motor){shutter0();return}play('shutter_motor',{g:.8,wet:.25})};
  A.jiggle=()=>{if(!buf.jiggle){jiggle0();return}play('jiggle',{g:.7,wet:.2})};
  let humL=null;
  A.humv=v=>{if(!buf.loop_fluor){humv0&&humv0(v);return}
    if(!humL){humL=loop('loop_fluor',{g:0,fade:.3});humv0&&humv0(0)}
    humL.g.gain.setTargetAtTime(v*5,G.ac.currentTime,.1)};
  let stL=null,stV=0;
  A.static=v=>{if(!buf.loop_static){static0(v);return}
    if(v>0&&!stL)stL=loop('loop_static',{g:0,fade:.1});
    if(stL)stL.g.gain.setTargetAtTime(v*1.8,G.ac.currentTime,.08);stV=v;
    if(!v&&stL){const l=stL;stL=null;setTimeout(()=>{if(!stV)l.stop(.3);else stL=l},400)}};

  /* random unseen sounds. Same bus as the old ambience, so they duck after a sting. */
  const E=G.AEV,mk=(names,o)=>(g,p)=>{play(pick(names),{...o,g:(o.g||.3)*g,p,amb:true})};
  E.metal=mk(['metal_twang'],{g:.3,lp:2600,rate:.85});
  E.moan=mk(['tone_moaning','ghost_moan_2'],{g:.4,lp:1800});
  E.deepmoan=mk(['tone_moaning_deep_3'],{g:.45,lp:1500});
  E.laugh=mk(['child_laugh_7','child_laugh','laugh_spooky_4'],{g:.32,lp:3000});
  E.zombie=mk(['zombie','zombie_6','zombie_8'],{g:.45,lp:1500});
  E.growl=mk(['monster_growl_1','monster_growl_5','monster_grunt_long'],{g:.45,lp:1400,rate:.82});
  E.scream=mk(['ghost_scream_3'],{g:.24,lp:1100,rate:.9});
  E.scratch=mk(['scratch_high_pitch'],{g:.22,lp:3500});
  E.hiss=mk(['hiss'],{g:.2,lp:3000});
  E.bed=mk(['spooky_ambience'],{g:.3,lp:2400});
  E.drone=mk(['piano_drone_low_sustained_2'],{g:.35,lp:1200});
  E.choir=mk(['ghost_chior'],{g:.3,lp:3000,wet:.5});
  E.harm=mk(['harmonized_tone_pleasant_but_spooky'],{g:.25,lp:3500,wet:.5});
  const breath0=E.breath;E.breath=(g,p)=>{if(buf.monster_breath)play('monster_breath',{g:.4*g,lp:1500,p,amb:true});else breath0(g,p)};
  const creak0=E.creak;E.creak=(g,p)=>{if(buf.house_creak&&Math.random()<.7)play('house_creak',{g:.5*g,lp:2400,p,amb:true,rate:.9+Math.random()*.2,wet:.3});else creak0(g,p)};
  E.breath=(g,p)=>{play(pick(['breath_slow','breath_fast','monster_breath']),{g:.45*g,lp:1800,p,amb:true,wet:.3})};
  E.creepy=mk(['creepy_3','creepy_5'],{g:.3,lp:2400,wet:.4});
  E.mech=mk(['mech_moan'],{g:.3,lp:1800});
  E.doom=mk(['drone_doom'],{g:.4,lp:900});
  E.yell=mk(['yell_far'],{g:.32,lp:1500,wet:.6});
  E.bell=mk(['bell_low'],{g:.28,lp:3000,wet:.6});
  /* a real room tone (air-con hum) under every day, in place of the synthetic hiss */
  let toneL=null;const tn=setInterval(()=>{if(toneL||!buf.loop_ac)return;G.roomMul=.15;toneL=loop('loop_ac',{g:.0,fade:2,amb:true})},1000);
  setInterval(()=>{if(!toneL)return;const day=(/^d([1-5])_/.exec(G.state)||[])[1]|0,v=[.08,.12,.14,.17,.19,.09][day];toneL.g.gain.setTargetAtTime(v,G.ac.currentTime,2)},1000);
  E.chop=mk(['chop'],{g:.35,lp:3000,wet:.35});
  E.drawer=mk(['drawer_squeak'],{g:.3,lp:2600,wet:.3});
  E.metalscr=mk(['metal_scrape'],{g:.28,lp:3000,wet:.3});
  /* places: the fridge hums in the shop and louder in the kitchen; the wall clock ticks inside your house */
  let frL=null,ckL=null;setInterval(()=>{const ac=G.ac,P=G.P;if(!ac||!buf.loop_fridge||!buf.clock)return;
    if(!frL){frL=loop('loop_fridge',{g:0,fade:1,amb:true});ckL=loop('clock',{g:0,fade:1})}
    const shop=P.x>-5&&P.x<5&&P.z>-4&&P.z<4.2,kit=P.x>-2.6&&P.x<5.1&&P.z<=-4&&P.z>-7.2,home=P.x>3&&P.x<15&&P.z>15&&P.z<23;
    frL.g.gain.setTargetAtTime(kit?.28:shop?.07:0,ac.currentTime,.6);ckL.g.gain.setTargetAtTime(home?.3:0,ac.currentTime,.6)},700);
  const D=G.AMBD;
  D[1].ev.push('metal','chop');
  D[2].ev.push('metal','moan','scratch','bed','creepy','chop','drawer');
  D[3].ev.push('moan','deepmoan','laugh','scratch','bed','hiss','creepy','mech','doom','chop','drawer','metalscr');
  D[4].ev.push('moan','deepmoan','scream','drone','hiss','creepy','mech','doom','yell','metalscr');
  D[5].ev.push('choir','harm','bell');

  /* the chase: something follows, and you hear it */
  let gt=3;
  G.tick.push(dt=>{
    if(G.state!=='d4_run'||!G.FIG||!G.FIG.visible)return;
    gt-=dt;if(gt>0)return;gt=3.2+Math.random()*3;
    const d=Math.hypot(G.P.x-G.FIG.position.x,G.P.z-G.FIG.position.z),k=Math.max(.15,Math.min(1,(14-d)/10));
    play(pick(['monster_growl_5','monster_roar_4','zombie_6','monster_growl_1']),{g:.6*k,lp:900+k*1800,rate:.8+Math.random()*.15,p:Math.random()<.5?-.5:.5})});
}
