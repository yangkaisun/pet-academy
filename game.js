/* Pet Academy — intentionally dependency-light first playable version. */
(() => {
  "use strict";

  const SAVE_KEY = "pet-academy-save-v1";
  const rewards = [
    { id: "hat", name: "Party Hat", icon: "🎉", level: 2 },
    { id: "bow", name: "Colorful Bow", icon: "🎀", level: 3 },
    { id: "glasses", name: "Star Glasses", icon: "⭐", level: 4 },
  ];

  const storeItems = [
    { id: "star-sticker", name: "Star Sticker", icon: "⭐", type: "sticker", cost: 3 },
    { id: "paw-sticker", name: "Paw Sticker", icon: "🐾", type: "sticker", cost: 4 },
    { id: "rainbow-sticker", name: "Rainbow Sticker", icon: "🌈", type: "sticker", cost: 6 },
    { id: "flower", name: "Sunny Flower", icon: "🌼", type: "outfit", cost: 7 },
    { id: "scarf", name: "School Scarf", icon: "🧣", type: "outfit", cost: 8 },
    { id: "crown", name: "Golden Crown", icon: "👑", type: "outfit", cost: 10 },
  ];

  const defaultSave = {
    petType: null,
    petColor: null,
    petName: "",
    xp: 0,
    stars: 0,
    equipped: null,
    sound: true,
    difficulty: "beginner",
    lastPlayed: null,
    ownedItems: [],
  };

  function loadSave() {
    try {
      const loaded = { ...defaultSave, ...JSON.parse(localStorage.getItem(SAVE_KEY) || "{}") };
      loaded.ownedItems = Array.isArray(loaded.ownedItems) ? [...loaded.ownedItems] : [];
      return loaded;
    } catch {
      return { ...defaultSave };
    }
  }

  let save = loadSave();
  let currentScreen = save.petType ? "room" : "title";
  let scene;
  let petParts = [];
  let audioContext;
  let currentClass = "math";

  const petColors = {
    dog: [
      { id: "golden", name: "Golden", hex: 0xdca15f, css: "#dca15f" },
      { id: "cream", name: "Cream", hex: 0xf1d8ad, css: "#f1d8ad" },
      { id: "chocolate", name: "Chocolate", hex: 0x8f6047, css: "#8f6047" },
    ],
    cat: [
      { id: "orange", name: "Orange", hex: 0xdd9457, css: "#dd9457" },
      { id: "gray", name: "Gray", hex: 0x9da4ad, css: "#9da4ad" },
      { id: "black", name: "Midnight", hex: 0x4c5060, css: "#4c5060" },
    ],
    bunny: [
      { id: "white", name: "Snowy", hex: 0xf5eee5, css: "#f5eee5" },
      { id: "tan", name: "Honey", hex: 0xc99d75, css: "#c99d75" },
      { id: "pink", name: "Pink", hex: 0xf1b7c5, css: "#f1b7c5" },
    ],
  };

  const gymActivities = [
    { answer: "Running", picture: "🏃", hint: "Moving quickly on your feet" },
    { answer: "Doing a cartwheel", picture: "🤸", hint: "Turning sideways with your hands on the ground" },
    { answer: "Lifting weights", picture: "🏋️", hint: "Raising a heavy bar" },
    { answer: "Playing basketball", picture: "⛹️", hint: "Bouncing and shooting a ball toward a hoop" },
    { answer: "Dancing", picture: "💃", hint: "Moving your body to music" },
    { answer: "Swimming", picture: "🏊", hint: "Moving through water" },
    { answer: "Riding a bike", picture: "🚴", hint: "Pedaling on two wheels" },
    { answer: "Rowing a boat", picture: "🚣", hint: "Using oars to move across water" },
  ];

  const ui = document.querySelector("#ui");

  if (typeof Phaser === "undefined") {
    ui.innerHTML = `<div class="panel"><h2>Pet Academy needs the internet once</h2><p>Please reconnect and reload so the game engine can start.</p></div>`;
    return;
  }

  const levels = [
    { level: 1, xp: 0 },
    { level: 2, xp: 10 },
    { level: 3, xp: 25 },
    { level: 4, xp: 45 },
  ];

  function levelInfo(xp = save.xp) {
    let info = levels[0];
    levels.forEach((entry) => { if (xp >= entry.xp) info = entry; });
    const next = levels.find((entry) => entry.level === info.level + 1);
    return { ...info, next };
  }

  function selectedPetColor() {
    const colors = petColors[save.petType] || petColors.dog;
    return colors.find((color) => color.id === save.petColor) || colors[0];
  }

  function ownsItem(id) {
    return save.ownedItems.includes(id);
  }

  function persist() {
    localStorage.setItem(SAVE_KEY, JSON.stringify(save));
  }

  function escapeHtml(text) {
    return String(text).replace(/[&<>'"]/g, (char) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;",
    })[char]);
  }

  function setScreen(name) {
    currentScreen = name;
    render();
    if (scene) scene.redraw();
  }

  function sound(frequency = 520, duration = 0.1) {
    if (!save.sound) return;
    try {
      audioContext ||= new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      oscillator.type = "sine";
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(0.09, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
      oscillator.connect(gain).connect(audioContext.destination);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + duration);
    } catch { /* Audio is a bonus; the game remains playable without it. */ }
  }

  function hud() {
    const info = levelInfo();
    const progress = info.next
      ? Math.round(((save.xp - info.xp) / (info.next.xp - info.xp)) * 100)
      : 100;
    return `<div class="hud">
      <strong>${escapeHtml(save.petName)}</strong>
      <div class="stats">
        <span>⭐ ${save.stars}</span><span>Level ${info.level}</span>
        <div class="xp" aria-label="${progress}% progress to next level"><span style="width:${progress}%"></span></div>
        <button class="linkish" data-action="sound" aria-label="Turn sound ${save.sound ? "off" : "on"}">${save.sound ? "🔊" : "🔇"}</button>
      </div>
    </div>`;
  }

  function render() {
    const screens = {
      title: () => `<div class="panel">
        <p class="eyebrow">Welcome to</p><h1>Pet<br>Academy</h1>
        <p class="tagline">Adopt a buddy. Learn together. Earn cozy rewards!</p>
        <button class="big" data-action="start">Let’s play!</button>
        <p class="small" style="margin-top:22px">No ads · No login · Progress stays on this device</p>
      </div>`,
      choose: () => `<div class="panel">
        <p class="eyebrow">Step 1 of 3</p><h2>Choose your learning buddy</h2>
        <div class="pet-options">
          <button class="pet-choice" data-pet="dog"><span class="pet-preview dog"></span>Dog</button>
          <button class="pet-choice" data-pet="cat"><span class="pet-preview cat"></span>Cat</button>
          <button class="pet-choice" data-pet="bunny"><span class="pet-preview bunny"></span>Bunny</button>
        </div>
      </div>`,
      color: () => `<div class="panel">
        <p class="eyebrow">Step 2 of 3</p><h2>Choose a cozy color</h2>
        <div class="color-options">
          ${petColors[save.petType].map((color, index) => `<button class="color-choice" data-color="${color.id}">
            <span class="pet-preview color-preview" style="background-position:${index * 50}% ${{dog: 0, cat: 50, bunny: 100}[save.petType]}%"></span>${color.name}
          </button>`).join("")}
        </div>
        <button class="linkish" data-action="choose">← Pick another pet</button>
      </div>`,
      name: () => `<form class="panel" id="name-form">
        <p class="eyebrow">Step 3 of 3</p><h2>Name your new friend</h2>
        <label for="pet-name">Pet name</label>
        <input id="pet-name" maxlength="14" autocomplete="off" value="${escapeHtml(save.petName)}" placeholder="Type a name" required>
        <div class="row suggestions" aria-label="Suggested names">
          ${["Mochi", "Sunny", "Pepper"].map((name) => `<button type="button" data-name="${name}">${name}</button>`).join("")}
        </div>
        <button class="big" type="submit">Meet my pet!</button>
      </form>`,
      room: () => `${hud()}<div class="speech">${escapeHtml(save.petName)} is ready to learn! Tap your pet to say hello.</div>
        <div class="panel compact room-actions">
          <div class="row">
            <button class="big" data-action="school">Go to class ➜</button>
            <button class="shop-button" data-action="store">⭐ Star Shop</button>
            <button class="secondary" data-action="closet">Outfits</button>
            <button class="secondary" data-action="settings">Settings</button>
          </div>
        </div>`,
      school: () => `${hud()}<div class="panel class-card">
        <p class="eyebrow">Choose a class</p><h2>Where should we learn?</h2>
        <p>Complete 5 questions and help ${escapeHtml(save.petName)} earn stars!</p>
        <div class="class-options">
          <div class="class-tile math-tile">
            <span class="class-icon">🔢</span><h3>Math Meadow</h3>
            <button data-difficulty="beginner">🌱 Beginner <span class="small">Addition to 10</span></button>
            <button data-difficulty="explorer">🚀 Explorer <span class="small">+ and − to 20</span></button>
            <button data-difficulty="trailblazer">🧭 Trailblazer <span class="small">+ and − to 100</span></button>
            <button data-difficulty="multiplier">✖️ Times Tables <span class="small">Multiply by 2, 5, and 10</span></button>
            <button data-difficulty="divider">➗ Division Detective <span class="small">Divide by 2, 5, and 10</span></button>
          </div>
          <div class="class-tile gym-tile">
            <span class="class-icon">🏃</span><h3>Giggle Gym</h3>
            <p class="small">Look at the picture and name the activity.</p>
            <button data-classroom="gym">Let’s get moving!</button>
          </div>
        </div>
        <button class="linkish" data-action="room">← Pet room</button>
      </div>`,
      closet: () => `${hud()}<div class="panel">
        <p class="eyebrow">Pet closet</p><h2>Pick an outfit</h2>
        <div class="rewards">${[
          ...rewards,
          ...storeItems.filter((item) => item.type === "outfit"),
        ].map((reward) => {
          const isStoreItem = "cost" in reward;
          const unlocked = isStoreItem ? ownsItem(reward.id) : levelInfo().level >= reward.level;
          return `<button class="reward ${unlocked ? "" : "locked"} ${save.equipped === reward.id ? "equipped" : ""}"
            data-reward="${reward.id}" ${unlocked ? "" : "disabled"}>
            <span>${unlocked ? reward.icon : "🔒"}</span>${reward.name}<small>${isStoreItem ? (unlocked ? "Owned" : `⭐ ${reward.cost} in shop`) : `Level ${reward.level}`}</small>
          </button>`;
        }).join("")}</div>
        <div class="row" style="margin-top:24px">
          <button class="secondary" data-reward="none">No outfit</button>
          <button data-action="room">Back to room</button>
        </div>
      </div>`,
      store: () => `${hud()}<div class="panel shop-panel">
        <p class="eyebrow">Spend your stars</p><h2>⭐ Star Shop</h2>
        <p>You have <strong>${save.stars} star${save.stars === 1 ? "" : "s"}</strong>. Stickers decorate your room, and outfits appear in your closet.</p>
        <div class="shop-grid">${storeItems.map((item) => {
          const owned = ownsItem(item.id);
          const affordable = save.stars >= item.cost;
          return `<article class="shop-item ${owned ? "owned" : ""}">
            <span class="shop-icon">${item.icon}</span>
            <strong>${item.name}</strong><small>${item.type === "sticker" ? "Room sticker" : "Pet outfit"}</small>
            <button data-buy="${item.id}" ${owned || !affordable ? "disabled" : ""}>${owned ? "Owned ✓" : `⭐ ${item.cost}`}</button>
          </article>`;
        }).join("")}</div>
        <p class="feedback" id="shop-message">Complete classes to earn more stars!</p>
        <div class="row">
          <button class="secondary" data-action="closet">Open closet</button>
          <button data-action="room">Back to room</button>
        </div>
      </div>`,
      settings: () => `${hud()}<div class="panel">
        <h2>Grown-up settings</h2>
        <p>Progress is saved only in this browser.</p>
        <div class="stack" style="max-width:360px;margin:20px auto">
          <button class="secondary" data-action="sound">Sound: ${save.sound ? "On" : "Off"}</button>
          <button class="secondary" data-action="adopt">Change pet or color</button>
          <button class="danger" data-action="reset">Reset all progress</button>
          <button data-action="room">Back to pet room</button>
        </div>
      </div>`,
    };
    if (screens[currentScreen]) ui.innerHTML = screens[currentScreen]();
  }

  function bindUi() {
    ui.addEventListener("click", (event) => {
      const button = event.target.closest("button");
      if (!button) return;
      const { action, pet, color, name, difficulty, reward, classroom, buy } = button.dataset;
      sound(480, 0.06);

      if (action === "start") setScreen("choose");
      if (action === "choose") setScreen("choose");
      if (pet) { save.petType = pet; save.petColor = null; setScreen("color"); }
      if (color) {
        save.petColor = color;
        setScreen("name");
        setTimeout(() => document.querySelector("#pet-name")?.focus(), 0);
      }
      if (name) document.querySelector("#pet-name").value = name;
      if (action === "school") setScreen("school");
      if (action === "room") setScreen("room");
      if (action === "closet") setScreen("closet");
      if (action === "store") setScreen("store");
      if (action === "settings") setScreen("settings");
      if (action === "adopt") setScreen("choose");
      if (action === "sound") { save.sound = !save.sound; persist(); render(); }
      if (action === "reset" && window.confirm("Grown-ups: erase this pet and all progress?")) {
        localStorage.removeItem(SAVE_KEY);
        save = { ...defaultSave };
        setScreen("title");
      }
      if (difficulty) { save.difficulty = difficulty; persist(); startClass("math"); }
      if (classroom === "gym") startClass("gym");
      if (reward) {
        save.equipped = reward === "none" ? null : reward;
        persist();
        render();
        scene?.redraw();
      }
      if (buy) {
        const item = storeItems.find((candidate) => candidate.id === buy);
        if (!item || ownsItem(item.id) || save.stars < item.cost) return;
        save.stars -= item.cost;
        save.ownedItems.push(item.id);
        persist();
        render();
        scene?.redraw();
        sound(760, .12); setTimeout(() => sound(960, .15), 120);
        const message = document.querySelector("#shop-message");
        if (message) message.textContent = `${item.name} is yours!`;
      }
    });

    ui.addEventListener("submit", (event) => {
      if (event.target.id !== "name-form") return;
      event.preventDefault();
      const name = document.querySelector("#pet-name").value.trim().replace(/[^a-zA-Z0-9 '-]/g, "").slice(0, 14);
      if (!name) return;
      save.petName = name;
      persist();
      sound(660, 0.12);
      setScreen("room");
    });
  }

  function makeMathQuestion() {
    let a, b, operator, answer;
    switch (save.difficulty) {
      case "explorer":
      case "trailblazer": {
        const max = save.difficulty === "trailblazer" ? 100 : 20;
        if (Math.random() < 0.5) {
          a = Phaser.Math.Between(Math.ceil(max / 4), max);
          b = Phaser.Math.Between(1, a);
          operator = "−";
          answer = a - b;
        } else {
          a = Phaser.Math.Between(0, max);
          b = Phaser.Math.Between(0, max - a);
          operator = "+";
          answer = a + b;
        }
        break;
      }
      case "multiplier": {
        a = Phaser.Math.RND.pick([2, 5, 10]);
        b = Phaser.Math.Between(1, 10);
        operator = "×";
        answer = a * b;
        break;
      }
      case "divider": {
        b = Phaser.Math.RND.pick([2, 5, 10]);
        answer = Phaser.Math.Between(1, 10);
        a = b * answer;
        operator = "÷";
        break;
      }
      default: {
        a = Phaser.Math.Between(0, 10);
        b = Phaser.Math.Between(0, 10 - a);
        operator = "+";
        answer = a + b;
      }
    }
    const choices = new Set([answer]);
    while (choices.size < 3) choices.add(Math.max(0, answer + Phaser.Math.RND.pick([-3, -2, -1, 1, 2, 3])));
    return { prompt: `${a} ${operator} ${b} = ?`, answer: String(answer), choices: Phaser.Utils.Array.Shuffle([...choices]).map(String) };
  }

  function makeGymQuestion(used) {
    const remaining = gymActivities.filter((activity) => !used.has(activity.answer));
    const activity = Phaser.Math.RND.pick(remaining.length ? remaining : gymActivities);
    used.add(activity.answer);
    const distractors = Phaser.Utils.Array.Shuffle(gymActivities.filter((item) => item.answer !== activity.answer))
      .slice(0, 2).map((item) => item.answer);
    return {
      prompt: "What are they doing?",
      picture: activity.picture,
      hint: activity.hint,
      answer: activity.answer,
      choices: Phaser.Utils.Array.Shuffle([activity.answer, ...distractors]),
    };
  }

  function startClass(classType) {
    currentClass = classType;
    const usedActivities = new Set();
    const nextQuestion = () => classType === "gym" ? makeGymQuestion(usedActivities) : makeMathQuestion();
    const state = { number: 1, mistakes: 0, question: nextQuestion(), locked: false };
    currentScreen = "class";
    scene?.redraw();

    const show = () => {
      ui.innerHTML = `${hud()}<div class="panel class-card">
        <div class="progress">${classType === "gym" ? "Giggle Gym" : "Math Meadow"} · Question ${state.number} of 5</div>
        ${state.question.picture ? `<div class="activity-picture" role="img" aria-label="A person doing an activity">${state.question.picture}</div>` : ""}
        <h2 class="question ${state.question.picture ? "word-question" : ""}">${state.question.prompt}</h2>
        <div class="answers">${state.question.choices.map((choice) => `<button class="answer ${state.question.picture ? "word-answer" : ""}" data-answer="${choice}">${choice}</button>`).join("")}</div>
        <p class="feedback" id="feedback">You’ve got this!</p>
      </div>`;
    };

    show();
    const answerHandler = (event) => {
      const button = event.target.closest("[data-answer]");
      if (!button || state.locked) return;
      const choice = button.dataset.answer;
      const feedback = document.querySelector("#feedback");
      if (choice === state.question.answer) {
        state.locked = true;
        button.classList.add("correct");
        feedback.textContent = Phaser.Math.RND.pick(["Great thinking!", "You got it!", `${save.petName} is proud of you!`]);
        sound(700, .12); setTimeout(() => sound(880, .14), 110);
        setTimeout(() => {
          if (state.number === 5) finishClass(state.mistakes);
          else { state.number += 1; state.question = nextQuestion(); state.locked = false; show(); }
        }, 850);
      } else {
        state.mistakes += 1;
        button.classList.add("wrong");
        button.disabled = true;
        const mathHint = state.question.prompt.includes("+") ? "Try counting up."
          : state.question.prompt.includes("−") ? "Try counting back."
          : state.question.prompt.includes("×") ? "Think about equal groups."
          : "Think about sharing into equal groups.";
        const hint = classType === "gym" ? `Hint: ${state.question.hint}.` : mathHint;
        feedback.textContent = `Almost! ${hint}`;
        sound(260, .09);
      }
    };
    ui.addEventListener("click", answerHandler, { once: false });
  }

  function finishClass(mistakes) {
    const oldLevel = levelInfo().level;
    const earnedStars = mistakes === 0 ? 3 : mistakes <= 2 ? 2 : 1;
    const today = new Date().toISOString().slice(0, 10);
    const dailyBonus = save.lastPlayed !== today ? 2 : 0;
    save.stars += earnedStars + dailyBonus;
    save.xp += 10;
    save.lastPlayed = today;
    persist();
    const newLevel = levelInfo().level;
    const unlocked = rewards.find((reward) => reward.level === newLevel && newLevel > oldLevel);
    currentScreen = "result";
    scene?.redraw();
    ui.innerHTML = `<div class="panel">
      <div class="celebrate">🌟</div><p class="eyebrow">Class complete!</p>
      <h2>Wonderful work, ${escapeHtml(save.petName)}!</h2>
      <p>You earned <strong>${earnedStars} star${earnedStars === 1 ? "" : "s"}</strong> and <strong>10 XP</strong>.</p>
      ${dailyBonus ? `<p>First class today bonus: <strong>+${dailyBonus} stars</strong></p>` : ""}
      ${unlocked ? `<p><strong>New outfit unlocked:</strong> ${unlocked.icon} ${unlocked.name}!</p>` : ""}
      <div class="row">
        <button class="big" data-action="room">Visit pet room</button>
        <button class="secondary" data-action="school">Play another class</button>
      </div>
    </div>`;
    sound(660, .18); setTimeout(() => sound(820, .18), 160); setTimeout(() => sound(980, .2), 320);
  }

  class AcademyScene extends Phaser.Scene {
    constructor() { super("academy"); }
    preload() {
      this.load.spritesheet("pet-portraits", "assets/pet-grid-transparent-v2.png", { frameWidth: 418, frameHeight: 418 });
      this.load.image("pet-room", "assets/pet-room.png");
      this.load.image("classroom", "assets/classroom.png");
    }
    create() {
      scene = this;
      this.redraw();
      this.scale.on("resize", () => this.redraw());
    }

    redraw() {
      this.children.removeAll();
      const w = this.scale.width;
      const h = this.scale.height;
      const classroom = ["school", "class", "result"].includes(currentScreen);
      this.addCover(classroom ? "classroom" : "pet-room", w, h);
      this.add.rectangle(w / 2, h / 2, w, h, classroom ? 0xfff4dc : 0xe9fff6, classroom ? .12 : .06);

      if (["room", "closet", "settings", "store"].includes(currentScreen)) this.drawRoomStickers(w, h);
      if (save.petType && ["room", "closet", "settings"].includes(currentScreen)) this.drawPet(w / 2, h * .55);
    }

    addCover(key, width, height) {
      const texture = this.textures.get(key).getSourceImage();
      const scale = Math.max(width / texture.width, height / texture.height);
      this.add.image(width / 2, height / 2, key).setScale(scale).setDepth(-2);
    }

    drawRoomStickers(width, height) {
      const placements = {
        "star-sticker": { icon: "⭐", x: .13, y: .24, angle: -9 },
        "paw-sticker": { icon: "🐾", x: .87, y: .29, angle: 8 },
        "rainbow-sticker": { icon: "🌈", x: .82, y: .15, angle: 2 },
      };
      Object.entries(placements).forEach(([id, placement]) => {
        if (!ownsItem(id)) return;
        this.add.text(width * placement.x, height * placement.y, placement.icon, {
          fontSize: `${Math.max(42, Math.min(width, height) * .08)}px`,
        }).setOrigin(.5).setAngle(placement.angle).setAlpha(.92);
      });
    }

    drawPet(x, y) {
      const container = this.add.container(x, y);
      const speciesIndex = { dog: 0, cat: 1, bunny: 2 }[save.petType] ?? 0;
      const colorIndex = Math.max(0, (petColors[save.petType] || petColors.dog).findIndex((color) => color.id === selectedPetColor().id));
      const frame = speciesIndex * 3 + colorIndex;
      const petPortrait = this.add.sprite(0, 0, "pet-portraits", frame).setDisplaySize(370, 370);
      container.add(petPortrait);

      const outfit = save.equipped;
      const pet = this.add.graphics();
      if (outfit === "hat") {
        pet.fillStyle(0xffcf70).fillTriangle(-45, -110, 0, -205, 45, -110);
        pet.fillStyle(0xe96f75).fillCircle(0, -207, 13);
      }
      if (outfit === "bow") {
        pet.fillStyle(0xe96f75).fillTriangle(-12, 82, -70, 52, -64, 105).fillTriangle(12, 82, 70, 52, 64, 105).fillCircle(0, 80, 18);
      }
      if (outfit === "glasses") {
        const starPoints = (centerX) => Array.from({ length: 10 }, (_, index) => {
          const radius = index % 2 === 0 ? 34 : 17;
          const angle = -Math.PI / 2 + index * Math.PI / 5;
          return new Phaser.Geom.Point(centerX + Math.cos(angle) * radius, -44 + Math.sin(angle) * radius);
        });
        const leftStar = starPoints(-42);
        const rightStar = starPoints(42);
        pet.fillStyle(0xffe98a, .28).fillPoints(leftStar, true).fillPoints(rightStar, true);
        pet.lineStyle(8, 0x584d9e).strokePoints(leftStar, true).strokePoints(rightStar, true);
        pet.lineBetween(-10, -44, 10, -44).lineBetween(-76, -46, -100, -56).lineBetween(76, -46, 100, -56);
      }
      if (outfit === "flower") {
        pet.fillStyle(0xffd75e);
        [[84,-92], [104,-92], [94,-104], [94,-80]].forEach(([px, py]) => pet.fillCircle(px, py, 13));
        pet.fillStyle(0x9b6b32).fillCircle(94, -92, 10);
      }
      if (outfit === "scarf") {
        pet.fillStyle(0x5b55a5).fillRoundedRect(-67, 63, 134, 31, 14);
        pet.fillStyle(0x7169bd).fillRoundedRect(29, 78, 34, 82, 10);
        pet.fillStyle(0xffcf70).fillRect(-43, 64, 11, 29).fillRect(9, 64, 11, 29);
      }
      if (outfit === "crown") {
        pet.fillStyle(0xffcc4d).fillRect(-54, -152, 108, 42);
        pet.fillTriangle(-54, -152, -37, -198, -18, -152);
        pet.fillTriangle(-20, -152, 0, -210, 20, -152);
        pet.fillTriangle(18, -152, 37, -198, 54, -152);
        pet.fillStyle(0xe96f75).fillCircle(0, -137, 8);
      }
      container.add(pet);
      container.setSize(370, 370).setInteractive({ useHandCursor: true });
      container.on("pointerdown", () => {
        this.tweens.add({ targets: container, y: y - 22, duration: 170, yoyo: true, ease: "Quad.easeOut" });
        sound(620, .1);
        const bubble = document.querySelector(".speech");
        if (bubble) bubble.textContent = Phaser.Math.RND.pick(["You’re my favorite study buddy!", "Let’s earn some stars!", "Hi-five! Great to see you!"]);
      });
      this.tweens.add({ targets: container, angle: { from: -1.5, to: 1.5 }, duration: 1400, yoyo: true, repeat: -1, ease: "Sine.easeInOut" });
      petParts = [container];
    }
  }

  new Phaser.Game({
    type: Phaser.AUTO,
    parent: "game",
    backgroundColor: "#bfe8da",
    scale: { mode: Phaser.Scale.RESIZE, autoCenter: Phaser.Scale.CENTER_BOTH, width: "100%", height: "100%" },
    transparent: false,
    scene: AcademyScene,
  });

  bindUi();
  render();
})();
