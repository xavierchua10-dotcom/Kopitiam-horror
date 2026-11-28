# Kopitiam horror: project notes

## Core idea
A short, story-based 3D horror game set in a Malaysian kopitiam. The player lives five days of a normal routine that slowly goes wrong. The voice outside the shutter is the real world trying to reach the player; their grief makes it sound like Atuk. Atuk died years ago. Tone: grief and a mind stuck in a loop, not "the player is crazy". The end screen carries a gentle line ("If this felt close to you, talk to someone you trust").

## Five-day plan
- Day 1: warm and full. Customers chat, chores, Atuk gives the rule "don't open the shutter at night until I knock three times". The rules note is in the player's own handwriting.
- Day 2: fewer customers, one repeats yesterday's line, clock stuck at 3:07. Night: first knock, voice in Atuk's voice.
- Day 3: customers quiet, old dates on order slips, Atuk forgets things. Radio "order forty-two". Night: voice gets one habit wrong, wrong knock count.
- Day 4: nearly empty, dust, altar with photo and incense appears in the kitchen. Pale figure scare. Night: voice begs, says the player's real name.
- Day 5: grey, empty, dusty. Three knocks and a real person's voice: "Atuk's gone. I've been knocking for weeks. Come out." Choice: open the shutter (let go, dawn, call someone) or stay (loop back to Day 1).

## Ideas added later (01:13, Nov 27)
- Do not close the shutter first. Open the world instead: build the shoplots outside, an empty city street, and the player's house.
- Mock up the player's house.

## Story details (agreed direction, Nov 27)
- Atuk: stern outside, caring inside. Reads his newspaper, says "Makan dulu" first, saves the best kopi for the player.
- Player: Atuk's grandchild, raised in the kopitiam.
- Backstory: every dawn Atuk came back from the market and knocked three times on the shutter. One morning there was no knock. The clock stopped at 3:07 AM. The player keeps living the same day in their head and keeps the rule.
- The voice outside at night is family (aunt, neighbour) calling the player out; the player's mind turns it into Atuk's voice.
- Day 5: three knocks in the aunt's real voice. Open = dawn, aunt hugs the player, end line "Atuk won't come through that door again. But you can." Stay = back to Day 1.
- Build one day at a time, test, then next day.

## Set-piece idea (Nov 27)
- One short scripted chase on Day 4 night: something follows the player along the empty street, run for the house door. Fixed path, no enemy AI. No game over: if caught, lights cut and the player wakes at the start of that night. Do after Days 1 to 3.

## Built so far
- Landscape two-thumb controls, fullscreen, installable.
- Shop floor, kitchen, hall, bathroom, Atuk's table. Customers and Atuk exist but are hidden until the Day 1 story.
- Outside world: five-foot-way walkway, empty road, closed neighbour shoplots (KEDAI RUNCIT, FARMASI, GUNTING RAMBUT, KEDAI EMAS), dark empty city blocks, lamps, stars and moon. Shutter now starts open.
- A-frame chalkboard beside the door: 阿公茶餐馆 / ATUK KOPITIAM / Kopi Teh Roti Bakar / 7am - 5pm. Chalk fades by day (function drawBoard(day); hours vanish on Day 3, blank by Day 5).
- Your house across the road: living room with altar and photo, bedroom, kitchen. Ending now triggers at the house door.
- The original 3:07 AM closing-night scene (radio, blackout, fuse box, pale figure, hatch, shutter ending).

## Day 1 (built Nov 27)
- Plays by default. The old 3:07 AM night scene is still at `?night`.
- Flow: wake in bedroom 6:55 AM → cross the road → three knocks from inside the shutter → lift it → customers + Atuk → 4 chores (wipe table, clear cups, make kopi + serve, refill sugar) → Atuk sends you to the bathroom light (the tap is running) → evening fade, dusk → Atuk's rule (don't open at night, only three knocks) → he walks home → read the rules note (optional), lower the shutter from outside → go home → End of Day 1.
- Daylight/dusk/night via setTime(). Customer chatter by proximity (Manglish). Tiny wrong things: the knock from inside a locked shop, the running tap, jar never empties, "Even the ones you do not see", Atuk's room dark.
- Test script idea: __lo.setState / __lo.setTime / __lo.D hooks exist for scripted runs.

## NPCs + graphics (Nov 27)
- NPCs rebuilt as rounded low-poly people: faces drawn on the head, two-segment arms and legs, seated pose for customers, walk cycle for Atuk (singlet + grey trousers, glasses, white hair).
- Title screen has a Graphics switch: Sharp (100%) / Normal (70%) / Light (50%). Saved in localStorage `lo_res`; the game still auto-lowers on slow phones.

## Talking NPCs (Nov 27)
- NPCs now turn their head to you within ~4.5m, mouths open/close in time with a synthesized mumble voice (speak()). Atuk's voice f0 92Hz, customers 98-185Hz. Voice gets quieter with distance. Plan if wanted later: swap in recorded lines per subtitle (file per line), keep speak() as fallback.

## Friendlier interactions (Nov 27)
- Yellow diamond markers float over whatever you can do right now (only enabled interactables, hidden within 2.2m and beyond 14m); edge arrow points to the nearest when off-screen.
- Prompt button reaches 3.4m with a looser facing angle; pressing it (or tapping the object) turns your view toward the object.
- Gotcha: three.js needs sprite.visible to be a real boolean (visible=0 still renders).

## First-person hands (Nov 27)
- Hands are hidden normally; slide up only while interacting (go() → handAct). Modes: wipe, reach, kopi (cup), serve (cup), lift (shutter, both hands), knock (fist during the 3 knocks). No hands when talking to Atuk. Hands use depthTest=false so they never clip into walls.
- Hands v2: arms now come up from below the screen with long sleeves and every action aims them at a target (aim()). The shutter has a handle bar; both hands grip it and follow it while the view tilts to track it.

## Colourful street (Nov 27)
- Painted shophouse facades (Atuk cream; neighbours mint/blue/pink/orange with matching shutters + bright signs), terracotta five-foot-way tiles, red lanterns, potted plants, parked motorbikes, trees, coloured far buildings, sky dome with clouds (day/dusk textures; hidden at night). Dusk/night lighting tints it automatically.

## Street v3 (Nov 27)
- Shophouses have upper floors (windows, AC units, laundry, parapet, water tanks) and the shop row runs x -65..65. Far side of the road: generated non-overlapping painted row (fixes z-fighting glitch seen on phone) + tall back skyline, hills, utility poles with wires, parked cars (with simple collision), zebra crossing. Camera near plane .12.
- Gotcha: coplanar overlapping boxes flicker on phone GPUs; never overlap building faces.

## House v2 (Nov 27)
- Player's house now two-storey: cream upper floor with windows + balcony door, terracotta hip roof + eave, balcony with railing/plants, porch roof + pillars (collision), gate plants, "No.7" plate, warm lit upstairs window (visible at dusk). Exterior only; interior/ZONES unchanged.

## Modern UI (Nov 27)
- Glass-pill clock + OBJECTIVE box, rounded subtitle bubble with amber speaker name (say() parses "NAME: text"; dataset.k replaces textContent compare), pill interact button with ring icon, segmented Graphics switch, solid amber start button, light wide day card. CSS block "modern UI" at end of <style>.

## Day 1 story logic + glitch fixes (Nov 27)
- Fixed: house ceiling z-fight (house ceiling plane y 3 vs upper-floor box bottom) -> ceiling at 2.97. Fixed: sky slit above shopfronts (upper facade now 3.0..6.7, five-foot-way ceiling extends to z 6.6).
- Day 1 flow: Atuk's bed empty -> 3 customers queue outside closed shutter -> you knock 3x, Atuk answers inside ("Three knock. That means is us. Anybody else, don't open") -> lift shutter -> queue walks in, regulars appear when you step inside -> chores... -> evening rule (don't open the door to anyone; only three knocks) -> lock shop -> knock 3x at house door, Atuk opens -> END OF DAY 1.

## Smooth city (Nov 27)
- ctex() now renders canvas textures at 4x with linear/mipmap filtering, plaster grain, wall-bottom dirt + streaks; textured asphalt road + stone curbs; lighter scanlines, smoothed canvas upscaling (html.sm). Title has "Smooth city / Basic" switch (localStorage lo_smooth, reloads page). Default ON unless navigator.deviceMemory<=2. Texture memory ~16MB vs ~1MB.
- GOTCHA: when patching one-line functions with python, check the replacement text is complete (multi-line) and never use s.index('return t}') across functions.

## Hotfix (Nov 27)
- Interact prompt was always visible (CSS display:flex!important from modern UI overrode JS none). Removed !important; JS now toggles 'flex'/'none'.

## Hand-gesture interact (Nov 27)
- Interact prompt = label pill + 58px round amber button with a hand icon; world markers are hand-icon discs. ICONS table (touch/grab/knock/wipe) drives both canvas marker textures (mkTexFor) and the CSS button (--ic data-URI). ICF maps interactable id -> icon; default touch.

## Walk-to waypoint (Nov 27)
- Ground ring (r .6, dim amber) + faint thin beam + small spinning arrow. Table WPS by state: d1_go (trigger: knock cutscene starts only when you step inside the ring in front of Atuk's shutter), d1_bath, d1_lock, d1_home (guidance only; hidden when you arrive). Objective box appends distance ("· 5 m"). OBJB holds base objective text; wpTick() runs from d1tick. Tests: d1.py now teleports to (0.9,5.5) for the knock.

## Cinematic cutscenes (Nov 27)
- CINE system: letterbox bars (#cbt/#cbb via body.cine), HUD/markers hidden, input locked (cineIn clears stick/look), camTo() eased auto camera, tap = skip current line (csleep), subtitles sit above bars.
- Walk-to rings now trigger scenes (WPS[state].fn): d1_go -> d1Knock (knock, Atuk answers, shutter opens by itself, queue walks in, crowd revealed 2.3s later); d1_greet/report/back/rule ring inside shop -> cineAtuk (camera frames Atuk, atukAct lines, greet adds glance at customers, rule follows him toward the door). Atuk hand-button still works (calls cineAtuk).
- Test: d1.py waits for state + !busy + no body.cine.

## Knock scene v2 (Nov 27)
- d1Knock choreography: you walk up to the shutter (camTo .3,4.6) and knock with hand; Atuk answers (muffled); camera cuts to the queue customer who turns to face you and speaks; camera swings back; Atuk explains the rule; you lift the shutter with the 'lift' hand animation; queue walks in.

## Home layout v2 (Nov 27)
- Dining/living x3..7.2 (smaller): dining table with tabletop clock + chairs, sofa, phone, wall clock above sofa. Atuk's room x7.2..11.2 and My room x11.2..15 (z15..19.4) beside the front door, each with a doorway frame onto the back hall (z19.4..23: table, fridge) which connects to the dining room via an opening in the x=7.2 wall. ZONES/AABBs rewritten; start position (13,17.4) is in My room.

## Wake-up opening cutscene
- Day 1 now opens in bed at 6:30 AM: eyelid overlay blinks with blur clearing, alarm clock on bedside table rings and rattles, you slap it (snooze), eyes close, clock jumps to 6:55, you grab the clock to read it ("I'm late!"), then sit up and get control. `?skipwake` skips it. Tap skips dialogue lines.

## No button for Atuk talks
- Talking to Atuk (greet/report/back/rule) has no interact button anymore; walking into the marker ring plays the cutscene only.

## Customers walk in and sit
- The 5 customers waiting outside are the same people who sit in the shop (no more vanishing/pop-in). After the shutter opens they walk through the door, around the tables, turn and sit at their seats, staggered 1s apart.

## Day 1 ending cutscene
- Walk into the marker at your house door (no button): knock x3, Atuk opens ("Three knock. Okay. Masuk."), you step in, door shuts, camera turns to the door, two shadows of feet block the light under it, one slow fourth knock, Atuk: "Jangan buka. Go sleep.", fade to end card. Tap skips lines.

## Bathroom light cutscenes
- After Atuk says the bathroom light is flickering, camera walks a few steps and turns to the bathroom lamp (visible hanging through the doorway with a glow) while the whole place dims and flickers; lights stay slightly dim until fixed.
- Walking into the bathroom marker (no button) plays a cutscene: lamp flickers, you screw the bulb in, tap starts running by itself (water stream + sound), you turn it off, lights return, objective "Tell Atuk".

## Lock-up cutscene
- End of shift: no shutter button. Walk into the marker outside the shutter; cutscene pulls the shutter down, padlock click, camera turns toward home. Objective "Go home".

## Atuk walks to his room
- In the ending, Atuk walks through the living room, the gap to the back hall, and in through his bedroom doorway (no teleport); camera follows him while he's in the dining room.

## Tidy-up: house
- House ceiling is now warm off-white instead of dark navy; the house light follows you room by room (dining, Atuk's room, your room, back hall) and is a bit brighter.
- Added door leaves (standing ajar) to Atuk's room, your room, and the kopitiam bathroom.

## House lamps
- Hanging cone-shade lamps with a warm bulb + glow in the dining room, Atuk's room, your room and the back hall. House ceiling no longer shows a bright hotspot (unlit ceiling that dims with the lights); the light now reads as coming from the bulb.

## Lamp/ceiling balance
- Lamp glow smaller and softer; house ceiling darker than the walls; house light stronger; small ambient lift when lights are on.

## House light by time of day
- House light and ceiling now follow day/dusk/night: bright in the morning, warm and dim in the evening, dark and cold at night with the lamp as the warm spot. Ambient lift only in the day.

## Atuk's station + auto-walk to talk
- Atuk's small table moved to the south end of the big counter (3.9,2.9), stools removed, Atuk stands behind it (3.9,3.5) facing the shop - no more leg/stool overlap.
- Talk markers moved to (0.9,2.6); walking into one now auto-walks you (with footsteps + bob) to Atuk, then the talk cutscene starts.

## Chores = automatic close-up mini playthroughs
- Chores run in order with a marker each: Refill sugar -> Wipe table -> Clear cups -> Make kopi -> Serve kopi. Walking into the marker plays an automatic close-up (bag pours sugar and the jar fills; cloth wipes the stain away; cups lifted one by one; kopi pours into a cup; you carry the cup and set it down). No buttons. Tap skips lines.

- Cutscene lock: joystick, keyboard, tap-to-walk and look are ignored while any cutscene runs (chores included).
- Wipe chore: camera leans in close over the table (eye lowered), cloth + arm rest on the tabletop and wipe the stain; eye height restores after.

- Talk-to-Atuk marker moved next to Atuk (2.8,3.05): player walks up to him, no door-marker sprint (auto-walk only if >0.9 away).

- Files split: index.html (page), style.css (looks), game.js (all game code), three.module.min.js. Edit game.js / style.css from now on.

- DAY 2 (day2.js, loaded by game.js through the G hook): Day 1 night flows straight into Day 2 (no end card). Same 6:55 alarm; everyone already inside repeating Day 1 lines; Atuk repeats his greeting; chores = wipe table + clear cups (still full, cold); radio cuts at "...lori..."; bathroom tap runs again + cracked mirror; evening rule talk ("especially if they call your name"); lock up; night 2:07 AM knock with a woman voice "Can you hear me? Squeeze my hand." + Atuk "Jangan buka / jangan jawab"; ends with END OF DAY 2 card. Later days: add day3.js the same way.

- Shortcut: add ?day2 to the URL to start straight at Day 2 (index.html?day2).

- Day 2 radio: Atuk lunges in from behind, slaps it off, camera whips to his face (jump scare), then camera drifts down the hall to the flickering bathroom bulb with the tap running (clue to go there). Bathroom door leaf now opens outward into the hall (no longer blocks the sink/mirror); Day 2 bathroom camera is centred on the mirror.

- DAY 3 (day3.js): Day 2 night flows into it. Smoke haze overlay, quiet shop, Atuk asks what day it is; walk-to markers to ask each customer (Mak Cik burn, Ah Seng stopped watch 12:41, Raj one shoe, Mei Ling next-week cake, Pak Hassan page 7), they only answer with their last order; TV (east wall, appears Day 3) shows static + half a news sentence; Atuk forgets things; evening rule talk where he forgets what he was saying; lock-up with a dark figure across the road that vanishes; night 3:07 AM a man crying "maaf" outside the door, then sits against it. End card Day 3. Shortcut: ?day3.

- Fixes: TV is now in the world from Day 1 (only shows news on Day 3). Raj has brown skin. Mak Cik Salmah wears a tudung + skirt, Mei Ling has long hair, lashes, lips, skirt (new person options: long, tudung, lash, lips). Day 3 visible details: burn marks, stopped watch + soot, one shoe, blood stain, smudged newspaper page 7. Lock-up: figure now appears close in the road with a sting + lights cut the moment you turn from the shutter, then vanishes on a blink.

- Day 3 gore pass: blood/burns painted onto faces (face canvas), wrapped on shirts/arms/legs (shell cylinders), pools on floor. Customer subtitles now carry a name tag like YOU/ATUK do (AH SENG, MAK CIK, RAJ, PAK HASSAN, MEI LING).
- Day 3 dialogue now reacts to the wounds (you ask about the blood/burns; they only answer with their order; Atuk deflects "smoke from the kitchen").
- Day 3 reworked (escalation ladder): subtle visible clues only (soot, burn mark, stopped watch, one shoe, smudged page 7), faint pulsing red dream tint, wake-up "just a dream", 3 customer walk-ups (Mak Cik, Ah Seng, Mei Ling), no Atuk-forgets scenes (moved to Day 4). The gore pass is kept as G.gore() for Day 4. Day 5 plan: blood gone, customers calm and clean.
- Day 3 lock-up is now a real jump scare: dim light, heartbeat, a footstep behind you, you spin round and the lorry driver (hunched, wide white eyes, trembling) stands 1m from you with a loud hit, whispers "maaf", then a blink and he is gone.
- Day 4 (day4.js, ?day4): wrecked red shop (RED group: Chinese words, palms, ceiling scorch/hole, toppled stools), full news cutscene (TV 'crash'), collapse, auto-run home through burning street, bedroom door locked, banging, three gentle knocks 'It's us.'. Chains to G.day5 if present. G.unwreck() restores shop.
- Day 4 v2: 5 customer walk-ups (d4_look) before TV, Atuk fades per talk; slower collapse (cracking, falling debris, tube drops, vanish one by one); playable chase (G.spd 1.9x run speed, FIG follows, checkpoints ROUTE) then bedroom door + knocks.
- Day 4 v3: silent turn scene (one marker in the middle, customers slowly turn, no dialogue, heartbeat), TV news now cuts to CCTV footage (clean shop, lorry crash, explosion, SIGNAL LOST) via G.person fake crowd; G.goreVis toggles blood pools.
- Day 3 bathroom: Atuk sends you to wash your face (d3_bath, marker -7.7,2.5); tap gushes and won't turn off, eyes shut, red Chinese words + handprint creep over mirror/walls, blink and they vanish. Cracked mirror persists (G.crack from day2).
- Day 3 bathroom v2: tap already running on the walk there; door closes behind you; tap won't shut and the floor floods; red takeover = red screen, shake, heartbeat, flicker, red water; blink and all gone, door reopens.
- Day 4 v4 (extended): after the banging you hide in the corner, try to wake (beep + nurse 'squeeze my hand'), hear Atuk/customers scream for help, walk back through the dark to the burning shop, find the 5 customers one by one (they fade and leave items: watch, glass, page7, shoe, card in G.d4items), Atuk: 'Not yet. Still one more. Tomorrow.' Replaces the three-knocks ending.
- Day 4 v5: warning before the chase (lights flicker, dark figure closer each time, camera snaps to him, Atuk shouts run); search now scattered: Hassan at table, Ah Seng NW corner (ticking watch), Mei Ling at the entrance (crying), Mak Cik kitchen corner (calling), Raj in toilet (tap running), with sound cues + objective hints.
- Cache fix: index.html loads game.js with ?v=timestamp, day modules inherit it, SW keys by path (ignores query), SW registers even after load; title screen shows 'build N' (BUILD in game.js + CACHE in sw.js, bump both each push).
- Day 4 consistency fixes: clock after 12:41 for the news (12:30/12:48), death count 'elderly owner and five customers', banging at the bedroom door is the driver (crying 'maaf'), screams are Atuk and customers in the shop.
- Day 5 (day5.js, ?day5): clean cast via G.person, wake calm, Atuk greet, five last orders (cup + item on table, warm goodbye, fade), dusk, three knocks on the shutter, driver says maaf, forgiveness, Atuk's goodbye, white hospital overlay (monitor, nurse 'squeeze my hand'), end card. Day 4 now chains into it.
- 202611272640: Family altar (天官赐福, candles, burning joss sticks, offerings) in the house facing the front door; sofa moved west; big wall clock moved to the east living-room wall.
- 202611272735: clock above sideboard photo; soft real coffee-stain texture; bathroom wall z-fight fixed (glitter); balcony/tree greenery no longer shows inside rooms; Atuk's bed in the corner; door cutscene (open, step out, close behind) at start of Day 2-5.
- 202611272820: Ambience system: tension drone + room tone that scale per day (d5 calm), random unseen events (creak, cup clink, footsteps, chair, far knock, murmur, breath) panned L/R, silence dip after every sting.
- 202611272905: Day 4 fire rebuilt: flipbook flame frames (particle-drawn), side tongue, glow, rising embers, smoke per fire.
- 202611272958: Back door (kitchen east wall) + back lane/trash area (close.js). Day 1 closing chores: mop, clear cups into bin, carry bag to lane; each ends with the black figure watching (back of shop / in the street / in the lit kitchen doorway). Atuk now tells you the chores before he leaves.
- Real recorded sounds (sfx/*.mp3, 31 used, ~1MB): piano stingers replace synth sting, metal rumble layer, ambience events (moans, laughs, zombie/growl, distant scream, choir on Day 5), chase growls, room echo. sfx.js loads them after audio starts; falls back to synth if missing. Source pack: github Horror-sound (original wavs, not in game).
- Tap sound now steady soft water + drips (was hissy bursts); mirror crack = sharp snap + ticks; closing chores are manual: walk to each marker (cups at back-left, trash near kitchen), no auto-chain.
- Day 4 smoky look: 3 flames in the burning shop (kitchen door/back corner/shutter) + 2 orange flicker lights + darker haze/fog; chase has 6 flames. Sounds v2 (sfx 79 files ~3MB, 53 used): real footsteps sliced from walking recording, AC room-tone loop, radio static loop, rain loop as tap water + tap drips, shutter drag, house creaks, breathing, distant yell, bell on forgiveness, mop slosh, bag rustle.
- House/office sounds: real door knocks (sliced), door squeak, shutter motor, light-switch click for A.click, can clink for cups, fluorescent buzz loop for lights, fridge loop (kitchen louder), wall clock tick in your house, handle jiggle on lock-up, kitchen chop/drawer/metal-scrape random events.
- Day 5: after the last customer the shutter comes down by itself, three knocks, objective 'Answer the knock'; Atuk already stands by the shutter ('He knocks so softly. He is afraid.'); 'You did well, Atuk is proud' moved to the goodbye. Background hums turned down ~half (drone, air-con, fridge, fluorescent).
- Black figure rebuilt like the NPCs (round head, arms, legs, all black, white eyes, no painted face), walks with real strides; its front is +z at rotation 0; chase/faceFig now actually face the player. New watch.js 'The Watcher' (Days 1-3, max 1/2/2 per day): street (D1,D2), kitchen doorway (D2,D3), back corner (D3); spawns when you face the spot, ducks the ambience, vanishes when you look away after seeing it, if you get within 3m, or after 16s. Not on Day 4/5 (figure already hunts you / forgiveness).
- Watcher removed from Day 1 (Day 1 stays normal).
- 202611273008: house — memory photo (you + Atuk) in the side-cabinet frame with tap 'Look at the photo'; dining table, chairs and alarm clock moved to the kitchen corner beside the fridge (small side table removed)
- 202611273009: living room re-laid — TV cupboard on west wall (where the photo table was), sofa faces the TV with a clear aisle door→altar, photo table + incense moved beside the altar (photo look camera updated)
- 202611273010: STORY RESTRUCTURE (night shift). Day 1 stays a normal 7AM-5PM day; evening the customers stay (hints from Atuk, far horn), then BLACKOUT (= the crash, unseen, real crash time 5:48 PM), everyone stares, you flip the fuse box (WPS d1_fuse), customers wake and walk out, Atuk leaves, closing chores (close.js clock now 6:05 PM), home, 4th-knock scare, then MIDNIGHT scene: three knocks, Atuk at your bedroom door: shop now 6PM-1AM. Days 2-4: old shop-day clocks are remapped at runtime (setClock -> nightClock; setTime day/dusk -> night for d2-d4; setTime(t,true) bypasses). Board sign shows 6pm-1am. Corner CCTV camera with blinking red light on Day 1; Day 4 TV footage is now the Day 1 evening (17:47-17:48 stamp, dusk look). Ah Seng's watch frozen at 5:48. Day 5 stays daylight; Atuk finishes his sentence ("do not be angry"). WIP branch night-shift-wip kept as backup.
- 202611273011: playtest fixes. (1) Chores are MANUAL now: the ring only guides, a tap button ("Wipe the table" etc.) starts the chore (WPS entries with manual:true, tx/tz/lab; generic interactable 'man' in game.js) for Day 1 morning chores, closing chores and Day 2 chores. (2) Serve-the-kopi marker moved to (-2.45,1.75): the old one sat inside Mei Ling's seat. (3) Cutscene cameras now aim from where the camera ENDS UP (yawFrom) instead of from wherever you stood when it started: fixes breaker cutscene looking at the wall and the off-centre chore close-ups (camTo(...,yawTo()) -> yawFrom everywhere). (4) Day 2/3 "EVENING 5:40 PM" cards now "LATE NIGHT" with night-shift time. (5) Day 2 wake line follows Atuk's midnight words.
- 202611273012: Post-breaker customer lines (BM) + Atuk 'Hati-hati balik'; BM lines show small italic English translation under them (TR table in game.js, mixed lines show "phrase" = meaning); each speaker has own name colour (NCOL).
- 202611273013: Label style C: 'NAME to target' (you/everyone/Atuk), self-talk = (blue italic, no name), narration = dim italic with no box. Explicit target via sp('YOU>ATUK',..).
- 202611273014: Blackout no longer jumps to night sky (stays dusk); lights cut instantly, player turns to face the crowd, thought '(Damn... what happened?)'.
- 202611273015: Midnight: 3 knocks, you get out of bed, walk to the door marker, tap 'Open the door'; Atuk talks then walks back to his own room (no vanish).
- 202611273016: Waypoint marker = small glowing floating dot + faint floor ring (no beam/big arrow); fades when you are close.
- 202611273018: Home: dining table moved away from bedroom door, table clock removed. Day 1: no long idle wait after customers leave. Closing chores now 5 taps: mop, cups, take bag (at bin), open back door (marker), throw bag (lane marker); cameras aimed from destination so cups/bag/door/mop are on screen; closing clock no longer goes backwards.
- 202611273019: Day 1 scares removed (no mop figure, no street figure, no lane black shape). Hints only: lights flicker when you open the back door; after throwing the trash a cup rolls off the stove by itself as you walk back in.
- 202611273020: Playthrough fixes: home clock no longer goes backwards (6:45 PM), objective cleared at each day intro / set at Day 5 door, YOU lines to customers labelled 'YOU to <name>' (Days 3-5), Driver's off-screen maaf labelled.
- 202611273021: Driver is dead (story fix): news says he could not get out of the cabin, 7 died, TV headline 7 MAUT.
- 202611273022: Atuk clinging lines Days 2-4 ("Stay a while, cucu", "Where you want to go?", "Everybody leaves... just not you"); Day 2 walk-home street scare (player in control, driver figure ahead, snaps close when you look, whispers maaf).
- 202611273023: Marker A (small bobbing arrow + thick ring, no beam); fuse box cutscene walks you to the box with torch, breaker switches visible, LED turns green, lights on.
- 202611273024: Midnight knock: bedroom door is closed while Atuk knocks, swings open when you tap Open the door.
- 202611273025: Atuk's bedroom door swings shut after he walks back at midnight.
- 202611273026: Day 1 closing: shadow figure stands in the kitchen when you turn around on the way to lock up; 'We... we are closing.' and it is gone (also fires on arrival if you never turn).
- 202611273027: Wake-up: held alarm clock now centred at eye level, no longer cut off at the top.
- 202611273028: Closing chores: no stray cups left on tables (morning cups hidden, the falling cup only appears when the camera turns to it).
- 202611273029: Closing chores: the served kopi cup left on the table since the morning is now picked up with the other cups at the first stop. Reverted the earlier stray-cup tweaks (falling cup stays on the counter).
- 202611273030: Day 1: after the kitchen figure vanishes you wonder if you slept enough; at midnight Atuk is already standing behind the door and is revealed as it opens (no pop-in).
- 202611273031: Day 1 closing: the kitchen figure is already standing there (placed while you look away, or at cutscene start) so there is no delayed pop-in; it only vanishes after you speak.
- 202611273032: (superseded by 033)
- 202611273033: Photo beside the altar: only the floating arrow and icon disappear after you look once; the Look at the photo button stays.
- 202611273034: Day 1 home front door starts closed (blocks the doorway); tap the door icon (Open the door), walk out, it closes behind you.
- 202611273035: Chapters button on the title screen: jump to Day 1 morning/evening/closing/midnight or Days 2-5 (test aid; remove before public release).
- 202611273036: Store room (option C) west of the kitchen: doorway in the kitchen's west wall, open door, three shelf units, sacks and crates, bare bulb; walkable (store.js).
- 202611273037: Doors are now normal gameplay: tap the door button to open, tap again to close, no cutscene (front door, both bedroom doors, bathroom, store room). Closed doors block you. Autoplay door cutscene on Days 2-5 removed.
- 202611273038: Store room shelf posts no longer poke through the dining room's back wall (three red poles visible from the dining room).
- 202611273039: Back to the old door behaviour (reverted 037): doors play the short door scene again; Day 1 front door still starts closed with the door button. Store room shelf fix kept.
- 202611273040: Store room door only: tap the button to open or close it freely (no scene). Other doors keep the old scenes.
- build 041 (202611281445): Day 1 polish: home-door camera pulled back (Atuk and No.7 fit), feet shot looks down further, midnight ending camera settles on Atuk's closing door, back lane brick/concrete brightened.
- build 042 (202611281500): after the Day 1 blackout the camera turns to face the fuse box instead of ending on the wall.
- build 043 (202611281545): test-only Scenes menu (open the game once with ?dev; ?dev=0 turns it off): play any Day 1 cutscene on its own, Replay / Scenes chips after it. Chapters link replaced; hidden for normal players.
- build 044 (202611281610): fuse box scene: after the lights return the camera steps back to a wide view so customers no longer stand in your face.
- build 045 (202611281650): lamps: warm light pools on floor/ceiling for house, street, kitchen and bathroom lamps (visible from far); the moving zone light now fades between lamps instead of popping; 'Open the door' icon at the front door on Days 2-5 (door blocks until tapped).
- build 047 (202611281735): reverted build 046 (the fixed house light looked chopped); house lighting is back to the lamp-pool version from build 045.
- build 048 (202611281820): Day 1 drinks: after Raj's kopi, four more orders (teh tarik Mak Cik, kopi susu Ah Seng, kopi-O kosong Pak Hassan, Milo ais Mei Ling): make each drink at the counter, walk it over; each customer drops a hint line. Served cups vanish when you report to Atuk.
- build 049 (202611281905): Day 1 restock: fetch the last kopi powder from the store room (Atuk's note about the tired driver), then refill the kopi machine. Clock now runs on to 11:30 AM before reporting to Atuk.
- Build 050 (202611281955): Day 2 gets restock (store room bag + refill, Atuk: "Atuk make extra every night"), the bathroom mirror now shows a live reflection (shadow figure behind you, mirror cracks, figure gone, "I'm just tired"), and Atuk's rules lead into the Day 1 closing chores (mop, cups, trash) before lock-up. Live mirror runs only during that scene.
- Build 051 (202611282010): Day 2 closing: the shadow figure now SITS on a stool at the kitchen opening and stares (Day 1 it stands). After it vanishes: "...What's wrong with me today?"
- Build 052 (202611282045): Day 2 lock-up: no kitchen stare; as the shutter comes down a figure sits sideways at a customer table, head turned to you; line "...Why am I seeing things this frequently?", flicker, gone. Day 2 closing chores skip the falling-cup scene (Day 1 only). Day 2 sitting figure uses the FIG sit pose (day3.js tick honours userData.sit).
- Build 053 (202611282105): Day 2 closing: after the last chore (back door closed behind you) the shadow figure is already standing in the middle of the shop between you and the shutter (free roam, no cutscene). Walk within ~3 steps and the lights flicker and it is gone. Lock-up still has the sitting figure at the customer table.
- Build 054 (202611282120): removed the sitting figure from the Day 2 lock-up (shutter closes plain again). Day 2 closing keeps only the figure standing in the middle of the shop.
- Build 055 (202611282150): Day 2 closing: the throw-trash chore now stops at the bins and gives you control (free roam). As you turn from the bins toward the back door the shadow figure appears at your shoulder, on the side you are turning away from, a low drone plays. Look at it ~1.7s (or get close, or walk inside) and the lane lamp + shop lights flicker and it is gone. The back door closes itself once you are inside. The middle-of-the-shop figure is removed. Day 1 closing unchanged.
- Build 056 (202611282205): Scenes (test) menu now has a "Day 2 (play it)" group: chores + restock, bathroom mirror, Atuk rules then closing chores, closing chores + lane scare, lock up + walk home. Test only (needs ?dev).
- Build 057 (202611282225): Day 2 lane scare moved: the figure is already standing in front of the back door when you turn from the bins (instead of at your shoulder). Walk within ~3 steps and the lamp flickers and it's gone.
- Build 058 (202611282240): fixed the Day 2 test scenes showing daylight; they now use night lighting like the real Day 2 (the real Day 2 was already night).
- Build 059 (202611282255): Day 2 lane scare: no light flicker. The figure stays in front of the back door while you walk or stand still (the old distance trigger removed it before you turned around). It only vanishes, silently, after you look at it for about half a second, or if you go back inside.
- Build 060 (202611282330): Day 3 is longer. New: check the kitchen for smoke (stove burnt black, smoke wisps), wipe soot off the table, make-then-serve a drink for Mak Cik / Ah Seng / Mei Ling and ask each your question, fetch + change the gas tank (store room, stove), then Atuk's rules lead into the Day 1 closing chores (mop, cups, bin, no falling cup). After the last chore the shadow figure is sitting at a table in the shop with its head in its hands, crying (free roam); look at it and it whispers "...maaf..." and is gone. The face-to-face lock-up scare is removed (plain lock-up). Bathroom swearing line cleaned. Scenes (test) has a Day 3 group.
- Build 061 (202611282345): Day 3 toilet scare. After the mop you hear crying in the toilet and glitter spills out (check marker). Slow cutscene leans over the bowl, a black figure stands there with its back to you, you ask who it is, it turns, looks up, lunges and vanishes. Free roam after: turn round at the bathroom door and it is standing in the hall until you look at it.
- Build 062 (202611282352): Day 3 toilet scare simplified: the cutscene only looks at the empty bowl (glitter fades, 'I must have imagined it...'); the figure no longer appears in it. Walk out and it is suddenly standing in the hall.
- Build 063 (202611282358): Day 3 toilet scare: glitter and its light removed (crying + empty bowl only).
- Build 064 (202611290008): Day 3 after the shutter: you stay in free roam (no auto walk home). Turn round and the black figure is standing close beside you in the five-foot way; look at it and it is gone, then 'What do you want from me.' Go home marker stays.
- Build 065 (202611290016): Day 3 after the shutter: the camera no longer spins toward home by itself. You stay facing the shutter and turn yourself; that is what brings the figure out beside you.
- Build 066 (202611290022): Scenes menu: Day 3 'Shutter + figure beside you' jumps straight to lock-up for quick testing.
- Build 067 (202611290041): Day 4 burning-shop search. Darker shop with orange firelight only near the three flames (dark brown air, 3 flame lights). The black figure now stalks you in free roam: after each person you find it stands closer (far corner, between tables, near the table, near you), only placed while you are not looking, and it is gone if you walk up to it. After the fifth it stands in the hall with its back to you, crying; go to it and it turns round: burnt, bloody face, says maaf, vanishes, then Atuk. Scenes menu: Day 4 (play it) has the search and the hall reveal.
- Build 068 (202611290058): Day 4 search: black burn marks (soot above and beside each of the three flames, scorched floor under them). Scenes menu Day 4 test scenes now build the wrecked shop (red Chinese writing, handprints, toppled stools) like the real flow.
- Build 069 (202611290112): Day 5 ending replaced: after the nurse's squeeze you wake in a bright hospital room (blur lifts), Mama and Papa beside the bed talk to you, you ask about Atuk and Mama only holds your hand, then the wall TV runs the news (lorry crash, 7 dead, 1 survivor: the owner's grandson), you say you were there, Mama: you came back to us. Scenes menu: Day 5 (play it) jumps to it.
- Build 070 (202611290124): Day 5 hospital: controls locked (no walking), Mama and Papa now talk like Atuk (mouths open and close, voices) and their lines are spoken by them.
- Build 071 (202611290136): Day 5 hospital TV now shows real in-game aftermath stills (wrecked shop, police tape, evidence markers, seven black body bags) with a breaking-news banner and slow push-in, instead of the drawn placeholder.
- Build 072 (202611290148): Day 5 hospital plays the song "Forgotten Memories" (sfx/forgotten_memories.mp3): fades in as you wake, fades out into the end card; end card credit line. TODO: artist name + licence unknown, add to credit here and README when known.
- Build 073 (202611290156): hospital song now sits low (18%) under Mama/Papa/news voices so they can be heard, then swells to 45% on Mama's last line before the fade.
- Build 074 (202611290208): hospital Mama, Papa and the TV news now speak real words using the phone's built-in text-to-speech (Mama higher/softer, Papa deeper, news anchor neutral), mouths move while speaking; falls back to the old mumble if the phone has no English voice.
- Build 075 (202611290222): sharper picture: anti-aliasing ON, render at up to 1.5x the screen's CSS size (was 1x), auto-quality can no longer drop below 60% (was 40%), and a one-time reset clears any previously saved low auto-quality. Watch frame rate on the phone; if it lags, set the pixel ratio cap to 1.25.
- Build 076 (202611290238): realism pass: soft real shadows inside the shop (one shadow spotlight, small 512 map, only furniture/people cast, only active while you are inside the shop), a cool-shadow/warm-light colour grade overlay (#grade) and light film grain (#grain). No bloom (too costly). If the phone lags: delete the shadow block or set SH.castShadow=false; grain/grade are plain CSS.
- Build 077 (202611290246): film grain no longer moves (static overlay).
- Build 078 (202611290302): lived-in pass: glossy floor tile, table props (sugar jars, napkins, soy sauce, newspaper), damp streaks + calendar on the north wall, slow dust in the shop. Kept props non-removable so cup chores still work. Floor is MeshStandardMaterial (slightly heavier than Lambert): revert in the 'lived-in pass' block if the phone lags.
- Build 079 (202611290310): film grain much fainter (opacity .06 -> .025).
- Build 080 (202611290325): polish everywhere: ALL people (Atuk, customers, parents, Day 5 cast) get cloth folds, collar/buttons/cuffs, belt buckle, shoe soles, eye shine, hair sheen, soft foot shadow (black figure + driver skipped); Day 4 Atuk fade handles textured cloth. Street: puddles that show at dusk/night, bin bags, crates, cardboard, bottles along the five-foot way. Not yet: house interior, bathroom, hospital room props.
- Build 081 (202611290342): full-force pass: people use 16-segment spheres/cylinders (smooth round silhouettes, was 7-9), house floor glossy, soft light shafts in the shop at night, ward details in the hospital (curtain, wall clock, get-well cards, flowers, tissues, plant), auto-lite safety (turns off shadows + shafts if the phone stays below ~19fps at the lowest quality for 5s). Not done: bathroom, 3D bloom, bigger body-shape rebuild.
- Build 082 (202611290358): last pass: character bodies rebuilt (shaped torso with shoulders/waist, real hands with fingers + thumb, chin), lamp glow halos on the shop lights (night/dusk), bathroom details (bucket, brush, toilet roll, towel, puddle) and glossy bathroom/hall floors.
- Build 083 (202611290410): title screen Effects setting: Auto (default, auto-lite safety), Full (never auto-lowers), Off (no shadows, shafts, dust, glow, puddles, grain/grade). Saved in localStorage lo_fx, applies live.
- Build 084 (202611290424): fixed a dark floating slab in the Day 4 burning shop: the soot-decal raycast was sticking soot onto the new decorative planes (light shafts, wall streaks). Soot now ignores transparent meshes and anything marked userData.noSoot. LESSON: any new transparent decor must not be raycast targets.
- Build 085 (202611290448): scary night: on Days 2-3 (and Day 4 outside the burning shop) at night the shop lights run at 55%, fog turns cold dark blue and thickens (to .04). Day 2-3 free-roam ambient figure: every ~55-105s, while you are inside the shop and not in a scene, the black figure may be standing in a far spot outside your view (hall doorway, back corners); look at it ~0.5s (or 28s passes) and it is gone with a quick light flicker. Never overrides scripted scares. Test: window.__ambNow().
- Build 086 (202611290512): thick walls (visual only, collision untouched): street shopfronts get jamb posts, lintel strip, cornice, plinth and pilasters between shops; upper-floor windows get raised frames and sills; inside doorways (hall, bathroom, kitchen), serving hatch and shop entrance get linings + architraves. One merged mesh per colour, marked noSoot. To undo: git revert this commit.
- Build 087 (202611290530): thick walls in your house: architraves on the front door, both bedroom doors, and a full lining + architrave on the dining-to-back-hall doorway. Hospital ward already has solid box walls, so unchanged.
- Build 088 (202611290552): horror cards: title screen now uses the dark shop + figure backdrop with a red glitch title; every day (1-5) opens with a full-screen card (big glitching day number, name: Opening/Again/The Knock/The Fire/Goodbye, hint line, clock). Backgrounds in cards/*.jpg (precached). cover.jpg = landscape game card for sharing (og:image set).
- Build 089 (202611290610): game renamed KOPITIAM HORROR (Last Order was taken): title screen, tab title, share preview, installed-app name, end-card footers, cover.jpg. Tagline 'One last order'. The final ending card still says LAST ORDER on purpose.
