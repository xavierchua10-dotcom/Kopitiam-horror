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
