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
