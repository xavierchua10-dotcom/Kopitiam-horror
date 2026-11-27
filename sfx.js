/* Real recorded sounds (sfx/*.mp3) layered on top of the synthesized ones.
   Everything here is optional: if a file is missing or audio is off, the game falls back to the old sounds. */
export default function install(G){
  const NAMES=['piano_stinger_dissonent','piano_stinger_dissonent_2','stinger','slow_stinger','metal_resonance','metal_twang',
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
  G.SFX={play,has:n=>!!buf[n]};

  /* stingers: real piano hits instead of the thin synth chord (old one stays as fallback) */
  const A=G.A,sting0=A.sting,rumble0=A.rumble;let si=0;
  const ST=['piano_stinger_dissonent','stinger','piano_stinger_dissonent_2','slow_stinger'];
  A.sting=()=>{const n=ST[si++%ST.length];
    if(!buf[n]){sting0();return}
    G.AMB.duck(3600);A.tone(90,30,.9,.4);play(n,{g:.95,wet:.35})};
  A.rumble=()=>{rumble0();play('metal_resonance',{g:.55,rate:.75,wet:.4})};

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
  const D=G.AMBD;
  D[1].ev.push('metal');
  D[2].ev.push('metal','moan','scratch','bed');
  D[3].ev.push('moan','deepmoan','laugh','zombie','scratch','bed','hiss');
  D[4].ev.push('growl','zombie','moan','deepmoan','scream','drone','hiss');
  D[5].ev.push('choir','harm');

  /* the chase: something follows, and you hear it */
  let gt=3;
  G.tick.push(dt=>{
    if(G.state!=='d4_run'||!G.FIG||!G.FIG.visible)return;
    gt-=dt;if(gt>0)return;gt=3.2+Math.random()*3;
    const d=Math.hypot(G.P.x-G.FIG.position.x,G.P.z-G.FIG.position.z),k=Math.max(.15,Math.min(1,(14-d)/10));
    play(pick(['monster_growl_5','monster_roar_4','zombie_6','monster_growl_1']),{g:.6*k,lp:900+k*1800,rate:.8+Math.random()*.15,p:Math.random()<.5?-.5:.5})});
}
