# Pet Academy — Product Specification

**Status:** First draft  
**Audience:** Kids ages 6–12  
**Platform:** Web browser (desktop and tablet)  
**Working title:** Pet Academy

## 1. Product Summary

Pet Academy is a cozy educational game where children adopt a cute pet and help it learn at a magical school. Players complete short, age-appropriate learning activities to earn stars, help their pet grow, and unlock playful rewards such as tricks, outfits, classroom decorations, and new activities.

The game should feel like caring for and going on adventures with a pet—not like completing a worksheet.

## 2. Product Goals

- Make practicing school skills feel playful and rewarding.
- Create a game that a 6-year-old can understand with little or no help.
- Give older children enough choice, progression, and collection to stay interested.
- Keep play sessions short and easy to return to.
- Provide a safe, private, ad-free experience with no account required.
- Keep the first version small enough for a family to build and test together.

## 3. Design Principles

### Cute and cozy

Characters, environments, sound, and animation should feel warm, friendly, and inviting. Mistakes should never feel scary or punishing.

Pets should use gentle storybook realism: recognizable fur, paws, ears, eyes, and species-specific proportions softened with friendly rounded shapes. They should feel like real young animals living in a warm illustrated world, while remaining cute and emotionally expressive rather than photorealistic.

### Learning through play

Questions are part of helping the pet succeed in class. Feedback should explain and encourage rather than simply mark an answer wrong.

### Short and satisfying

A class should take approximately 3–5 minutes. Every session should include visible progress or a small reward.

### Easy to understand

Use large buttons, short instructions, clear icons, limited text, and optional read-aloud support where practical.

### Choice without overload

Offer a few meaningful choices at a time: which pet, which class, or which reward to use.

## 4. Target Players

### Primary audience

Children ages 6–12 who enjoy animals, collecting, customization, and light educational games.

### Player needs

- Ages 6–8 need simple navigation, visual instructions, read-aloud support, and beginner questions.
- Ages 9–12 need greater challenge, more customization, and longer-term goals.
- All players need supportive feedback and the freedom to retry without losing progress.

## 5. Core Gameplay Loop

1. The player chooses or visits their pet.
2. The player selects a class.
3. The teacher introduces a short activity.
4. The player answers 3–5 questions.
5. Correct answers earn stars and pet experience.
6. Incorrect answers receive a helpful hint and another try.
7. The pet celebrates, grows, or earns a small reward.
8. The player returns to the school or pet room and chooses what to do next.

## 6. First Playable Version (MVP)

The MVP should prove that choosing a pet, completing a class, and earning a reward is fun.

### Included

- Three starter pet species: dog, cat, and bunny.
- Three color choices for each pet species:
  - Dog: golden, cream, or chocolate.
  - Cat: orange, gray, or black.
  - Bunny: white, tan, or pink.
- A pet naming step.
- One school location with a math classroom and gym.
- Two playable classes: Math and Gym.
- Five math difficulty levels:
  - Beginner: addition within 10.
  - Explorer: addition and subtraction within 20.
  - Trailblazer: addition and subtraction within 100.
  - Times Tables: multiplication by 2, 5, and 10.
  - Division Detective: exact division by 2, 5, and 10, with no remainders.
- Gym questions show a picture of a person performing an activity. The player identifies what the person is doing from three written answer choices.
- Each class session contains 5 multiple-choice questions.
- Friendly feedback, hints, and unlimited retries.
- Stars awarded after each class.
- A Star Shop where stars can be redeemed for room stickers and pet outfits.
- A simple pet experience bar and level system.
- Three unlockable cosmetic rewards, such as a hat, bow, and glasses.
- A pet room where the player can equip one reward.
- Local save data in the browser.
- A reset-progress option behind a parent-facing confirmation.
- Basic sound controls.

### Not included in the MVP

- User accounts or cloud saves.
- Multiplayer or social features.
- Chat, sharing, leaderboards, or user-generated content.
- Purchases, advertising, or subscriptions.
- School subjects beyond Math and Gym.
- Many pets, rooms, or complex pet evolution.
- A strict real-world daily limit that prevents continued play.

## 7. Gameplay Systems

### Pet selection and identity

Players choose a dog, cat, or bunny and then select one of three colors for that species. They name their pet and see it react through simple idle and celebration animations. Pet appearance and names are stored only in the local browser.

All pets share a consistent plush-inspired body shape with species-specific details:

- Dogs have small floppy ears.
- Cats have small triangular ears and a curved tail.
- Bunnies have long rounded ears and a small puff tail.
- Color options change the main fur color while preserving sufficient contrast for the face and accessories.

### Classes and questions

Each class contains a short introduction, 5 questions, immediate feedback, and an end-of-class celebration. Questions should be generated within the selected difficulty range and checked to avoid invalid or confusing answers.

For each question:

- Show one prompt and 3 large answer choices.
- Allow the player to hear or reread the prompt.
- Celebrate a correct answer with a brief animation and sound.
- On an incorrect answer, give a small visual hint and allow another attempt.
- Do not remove stars or shame the player for mistakes.

### Math class

Math class presents a written number problem with three numeric answer choices. It offers five levels: addition within 10; addition and subtraction within 20; addition and subtraction within 100; multiplication by 2, 5, and 10; and exact division by 2, 5, and 10. Every class contains 5 questions, provides hints, and allows unlimited retries.

### Gym class

Gym class practices action-word recognition through pictures. Each question shows one clear illustration of a person doing an activity and asks, “What are they doing?” The player chooses from three written answers.

The first activity set should include familiar actions such as:

- Running
- Jumping
- Stretching
- Throwing
- Catching
- Kicking
- Dancing
- Swimming

Illustrations should show one unambiguous action, include children with varied appearances, and avoid relying on gender, skin color, clothing, or physical ability as clues. Where practical, the question and answer choices should support read-aloud audio so early readers can play independently.

### Rewards and progression

- Completing a class awards 1–3 stars based on participation and independent correct answers.
- Every completed class grants pet experience.
- Gaining enough experience raises the pet's level.
- Selected levels unlock cosmetic items.
- Rewards are shown before the player returns to the pet room.

### Star Shop

Stars are a spendable reward currency. Players can visit the Star Shop from the pet room and redeem stars for collectible prizes. Purchases are permanent and saved locally.

The first shop inventory includes:

| Prize | Type | Cost |
| --- | --- | ---: |
| Star Sticker | Room sticker | 3 stars |
| Paw Sticker | Room sticker | 4 stars |
| Rainbow Sticker | Room sticker | 6 stars |
| Sunny Flower | Pet outfit | 7 stars |
| School Scarf | Pet outfit | 8 stars |
| Golden Crown | Pet outfit | 10 stars |

Purchased stickers automatically appear in the pet room. Purchased outfits appear in the closet and can be equipped or removed at any time. The store must clearly show the player's current star balance, item costs, owned items, and whether an unowned item is affordable.

The exact numbers can change during playtesting. The MVP can begin with:

| Level | Experience needed | Reward |
| --- | ---: | --- |
| 1 | 0 | Starter pet |
| 2 | 10 | Party hat |
| 3 | 25 | Colorful bow |
| 4 | 45 | Star glasses |

### Daily play

The game may label the first class played each calendar day as the pet's “class of the day” and give it a small bonus. Players should still be allowed to continue playing afterward.

## 8. User Experience and Screens

### MVP screen flow

1. **Title screen** — Play, sound settings, and a parent/info link.
2. **Pet selection** — Choose dog, cat, or bunny.
3. **Pet color selection** — Choose one of three colors for the selected species.
4. **Name your pet** — Enter or choose a friendly name.
5. **Pet room** — View the pet, level, stars, color, room stickers, and equipped item.
6. **Star Shop** — Redeem stars for stickers and outfits.
7. **School map** — Choose Math class or Gym class.
8. **Class introduction** — Teacher explains the activity.
9. **Question screen** — Prompt, picture when applicable, answer choices, hint, and progress.
10. **Class results** — Stars, experience, and unlocked reward.
11. **Reward/customization screen** — Equip an unlocked or purchased item.

## 9. Visual and Audio Direction

- Soft, cheerful colors with strong contrast for important controls.
- Storybook-realistic animals with visible fur texture, believable anatomy, warm expressive eyes, and gentle animation.
- Cozy environments with believable natural light, depth, wood, fabric, plants, and classroom materials rather than flat geometric backgrounds.
- Original character designs and environments rather than copies of an existing brand or character.
- Each pet species must remain recognizable in all three available colors.
- Cozy school spaces with playful animal-sized details.
- Large readable type and minimal text per screen.
- Short, pleasant sound effects with no harsh failure sounds.
- Music and sound effects must be independently muted or easy to disable.
- The game should remain understandable when muted.

## 10. Accessibility and Child Safety

- Use large touch targets and support mouse, keyboard, and touch input.
- Do not rely on color alone to communicate correct and incorrect answers.
- Keep instructions short and pair them with icons or animation.
- Avoid timers in core learning activities.
- Provide reduced-motion and sound controls where practical.
- Collect no personal information and use no third-party advertising or tracking.
- Do not include external links in the child-facing play flow.
- Place destructive actions and external information behind a simple parent gate.

## 11. Technical Approach

- **Game framework:** Phaser.js.
- **Language:** JavaScript or TypeScript, with TypeScript preferred if it remains comfortable for the family team.
- **Hosting:** GitHub Pages.
- **Save system:** Browser `localStorage` for pet species, color, name, experience, spendable stars, purchased prizes, unlocked rewards, settings, and last-play date.
- **Gym content:** A small curated set of original activity illustrations paired with action labels and plausible incorrect choices.
- **Assets:** Original, openly licensed, or properly purchased art, fonts, music, and sound effects.
- **Layout:** Responsive landscape layout, with support for common laptop and tablet sizes.

The game should work as a static site with no backend for the MVP.

## 12. Success Criteria for the MVP

The first version is successful if:

- A new player can choose a species, choose a color, and name a pet without adult explanation.
- A player can finish either 5-question class in under 5 minutes.
- Children can identify the action shown in each Gym illustration without needing extra explanation.
- Progress remains after closing and reopening the browser.
- Children understand what they earned and how to equip it.
- Children understand that stars can be spent and can successfully buy a shop prize.
- Children voluntarily choose to play another class or ask what unlocks next.
- No screen leaves a player stuck without a clear next action.

## 13. Future Possibilities

These are ideas for later, not promises for the first version:

- Reading, science, art, and music classes.
- More pets and pet evolution paths.
- Tricks and pet abilities.
- Classroom and bedroom decoration.
- Mini-games tied to different subjects.
- A question difficulty system that adapts to the player.
- Multiple local player profiles for siblings.
- Optional parent view showing skills practiced.
- Seasonal school events and collectible rewards.

## 14. Open Questions to Refine Together

- Should players type a pet name, choose from a list, or have both options?
- Should the two children have separate local profiles in the first version?
- How realistic should future art become while still feeling friendly and playful to younger children?
- Should questions be read aloud in the first version?
- Should Gym answers always be action words such as “running,” or short phrases such as “they are running”?
- Which activities should be included in the first five Gym questions?
- How should a pet visually change when it levels up?
- Which reward would feel most exciting after the very first class?
- Should difficulty be chosen by the player, a parent, or automatically adjusted?

## 15. Suggested Build Order

1. Create the shared squishy pet body and let it react when clicked.
2. Add dog, cat, and bunny features plus three colors for each species.
3. Build one complete math question with answer feedback.
4. Turn it into a 5-question Math class.
5. Build one illustrated action question and turn it into a 5-question Gym class.
6. Add stars, experience, and the results screen.
7. Add pet selection, color selection, and naming.
8. Add one unlockable outfit and the pet room.
9. Save and restore progress locally.
10. Add polish: animation, sound, read-aloud support, accessibility, and additional rewards.
