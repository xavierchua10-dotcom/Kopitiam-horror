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
