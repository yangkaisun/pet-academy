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
    { id: "space-sticker", name: "Space Sticker", icon: "🪐", type: "sticker", cost: 12 },
    { id: "dino-sticker", name: "Dino Sticker", icon: "🦕", type: "sticker", cost: 15 },
    { id: "art-sticker", name: "Artist Sticker", icon: "🎨", type: "sticker", cost: 18 },
    { id: "gold-trophy", name: "Golden Trophy", icon: "🏆", type: "decor", cost: 25 },
    { id: "strawberry-hat", name: "Strawberry Hat", icon: "🍓", type: "outfit", cost: 28 },
    { id: "wizard-hat", name: "Starry Wizard Hat", icon: "🧙", type: "outfit", cost: 32 },
    { id: "frog-hat", name: "Frog Bucket Hat", icon: "🐸", type: "outfit", cost: 36 },
    { id: "daisy-bonnet", name: "Daisy Bonnet", icon: "🌼", type: "outfit", cost: 40 },
    { id: "galaxy-hat", name: "Galaxy Hat", icon: "🌌", type: "outfit", cost: 45 },
    { id: "star-wand", name: "Golden Star Wand", icon: "⭐", type: "outfit", cost: 35 },
    { id: "rainbow-wand", name: "Rainbow Wand", icon: "🌈", type: "outfit", cost: 42 },
    { id: "moon-wand", name: "Moon Wand", icon: "🌙", type: "outfit", cost: 50 },
  ];

  const accessoryFrames = { hat: 0, bow: 1, glasses: 2, flower: 3, scarf: 4, crown: 5 };
  const accessoryFits = {
    dog: {
      hat: { x: 0, y: -187, size: 136 }, bow: { x: 0, y: 55, size: 130 },
      glasses: { x: 0, y: -115, size: 130 }, flower: { x: 72, y: -153, size: 86 },
      scarf: { x: 0, y: 70, size: 156 }, crown: { x: 0, y: -180, size: 124 },
    },
    cat: {
      hat: { x: 0, y: -142, size: 132 }, bow: { x: 0, y: 61, size: 124 },
      glasses: { x: 0, y: -72, size: 130 }, flower: { x: 67, y: -110, size: 82 },
      scarf: { x: 0, y: 72, size: 148 }, crown: { x: 0, y: -137, size: 120 },
    },
    bunny: {
      hat: { x: 0, y: -151, size: 108 }, bow: { x: 0, y: 69, size: 116 },
      glasses: { x: 0, y: -57, size: 130 }, flower: { x: 76, y: -142, size: 72 },
      scarf: { x: 0, y: 77, size: 140 }, crown: { x: 0, y: -147, size: 102 },
    },
  };

  const premiumAccessoryFrames = {
    "strawberry-hat": 0, "wizard-hat": 1, "frog-hat": 2, "daisy-bonnet": 3,
    "galaxy-hat": 4, "star-wand": 5, "rainbow-wand": 6, "moon-wand": 7,
  };
  const premiumAccessoryFits = {
    dog: {
      "strawberry-hat": { x: 0, y: -184, size: 140 }, "wizard-hat": { x: 0, y: -183, size: 145 },
      "frog-hat": { x: 0, y: -181, size: 142 }, "daisy-bonnet": { x: 0, y: -105, size: 188 },
      "galaxy-hat": { x: 0, y: -183, size: 145 }, "star-wand": { x: 105, y: 52, size: 185, angle: 10 },
      "rainbow-wand": { x: 105, y: 52, size: 185, angle: 10 }, "moon-wand": { x: 105, y: 52, size: 185, angle: 10 },
    },
    cat: {
      "strawberry-hat": { x: 0, y: -139, size: 134 }, "wizard-hat": { x: 0, y: -139, size: 140 },
      "frog-hat": { x: 0, y: -138, size: 136 }, "daisy-bonnet": { x: 0, y: -72, size: 178 },
      "galaxy-hat": { x: 0, y: -139, size: 140 }, "star-wand": { x: 100, y: 60, size: 178, angle: 10 },
      "rainbow-wand": { x: 100, y: 60, size: 178, angle: 10 }, "moon-wand": { x: 100, y: 60, size: 178, angle: 10 },
    },
    bunny: {
      "strawberry-hat": { x: 0, y: -151, size: 112 }, "wizard-hat": { x: 0, y: -154, size: 120 },
      "frog-hat": { x: 0, y: -149, size: 116 }, "daisy-bonnet": { x: 0, y: -55, size: 170 },
      "galaxy-hat": { x: 0, y: -154, size: 120 }, "star-wand": { x: 106, y: 72, size: 170, angle: 10 },
      "rainbow-wand": { x: 106, y: 72, size: 170, angle: 10 }, "moon-wand": { x: 106, y: 72, size: 170, angle: 10 },
    },
  };

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

  const lessonQuestions = {
    "gym-movers": [
      { id: "run", answer: "Running", picture: "🏃", hint: "Moving quickly on your feet" },
      { id: "cartwheel", answer: "Doing a cartwheel", picture: "🤸", hint: "Turning sideways with your hands on the ground" },
      { id: "weights", answer: "Lifting weights", picture: "🏋️", hint: "Raising a heavy bar" },
      { id: "basketball", answer: "Playing basketball", picture: "⛹️", hint: "Bouncing and shooting a ball toward a hoop" },
      { id: "dance", answer: "Dancing", picture: "💃", hint: "Moving your body to music" },
      { id: "swim", answer: "Swimming", picture: "🏊", hint: "Moving through water" },
      { id: "bike", answer: "Riding a bike", picture: "🚴", hint: "Pedaling on two wheels" },
      { id: "row", answer: "Rowing a boat", picture: "🚣", hint: "Using oars to move across water" },
    ],
    "gym-sports": [
      { id: "soccer", answer: "Soccer", picture: "⚽", hint: "Players kick this ball toward a goal" },
      { id: "basketball-sport", answer: "Basketball", picture: "🏀", hint: "Players bounce and shoot this ball" },
      { id: "tennis", answer: "Tennis", picture: "🎾", hint: "Players use rackets across a net" },
      { id: "baseball", answer: "Baseball", picture: "⚾", hint: "Players use a bat and run around bases" },
      { id: "volleyball", answer: "Volleyball", picture: "🏐", hint: "Players hit this ball over a high net" },
      { id: "hockey", answer: "Hockey", picture: "🏒", hint: "Players use sticks to move a puck" },
      { id: "martial-arts", answer: "Martial arts", picture: "🥋", hint: "Athletes may wear this uniform and practice forms" },
      { id: "archery", answer: "Archery", picture: "🏹", hint: "Athletes aim arrows at a target" },
    ],
    "gym-adventure": [
      { id: "yoga", answer: "Yoga", picture: "🧘", hint: "Holding poses while breathing calmly" },
      { id: "walk", answer: "Walking", picture: "🚶", hint: "Moving one step at a time" },
      { id: "climb", answer: "Climbing", picture: "🧗", hint: "Moving upward using hands and feet" },
      { id: "ski", answer: "Skiing", picture: "⛷️", hint: "Gliding over snow on two long skis" },
      { id: "surf", answer: "Surfing", picture: "🏄", hint: "Riding an ocean wave on a board" },
      { id: "fence", answer: "Fencing", picture: "🤺", hint: "Two athletes practice with special swords" },
      { id: "skate", answer: "Skateboarding", picture: "🛹", hint: "Riding a board with four wheels" },
      { id: "horse", answer: "Horseback riding", picture: "🏇", hint: "Riding and guiding a horse" },
    ],
    "science-basics": [
      { id: "plant", prompt: "What helps this plant grow?", picture: "🌱", answer: "Sunlight and water", choices: ["Sunlight and water", "Candy and toys", "Paint and glue"], hint: "Plants need light and water" },
      { id: "magnet", prompt: "What can a magnet attract?", picture: "🧲", answer: "Some metals", choices: ["Some metals", "Every kind of wood", "Clouds"], hint: "Magnets can pull on iron and some other metals" },
      { id: "rain", prompt: "What kind of weather is this?", picture: "🌧️", answer: "Rainy", choices: ["Rainy", "Snowy", "Windless"], hint: "Water is falling from clouds" },
      { id: "planet", prompt: "What travels around a star?", picture: "🪐", answer: "A planet", choices: ["A planet", "A sandwich", "A paintbrush"], hint: "Earth travels around the Sun" },
      { id: "butterfly", prompt: "What can a caterpillar become?", picture: "🐛", answer: "A butterfly", choices: ["A butterfly", "A fish", "A pine tree"], hint: "It changes inside a chrysalis" },
      { id: "lungs", prompt: "Which body part helps us breathe?", picture: "🫁", answer: "Lungs", choices: ["Lungs", "Elbows", "Fingernails"], hint: "Air moves in and out of these organs" },
      { id: "ice", prompt: "What happens when ice gets warm?", picture: "🧊", answer: "It melts", choices: ["It melts", "It grows fur", "It becomes louder"], hint: "Solid water changes into liquid water" },
      { id: "bee", prompt: "How do bees help many flowers?", picture: "🐝", answer: "They pollinate them", choices: ["They pollinate them", "They turn them into rocks", "They paint them"], hint: "Bees carry pollen between flowers" },
    ],
    "history-basics": [
      { id: "past", prompt: "What do historians study?", picture: "📜", answer: "The past", choices: ["The past", "Only tomorrow", "Imaginary planets"], hint: "History is the story of people and events before today" },
      { id: "archaeologist", prompt: "Who studies objects from long ago?", picture: "🏺", answer: "An archaeologist", choices: ["An archaeologist", "A weather reporter", "A veterinarian"], hint: "They study artifacts and ancient places" },
      { id: "pyramids", prompt: "Which civilization built these pyramids?", picture: "🔺", answer: "Ancient Egyptians", choices: ["Ancient Egyptians", "Modern astronauts", "Vikings in Canada"], hint: "They were built beside the Nile River" },
      { id: "letters", prompt: "What carried messages before phones?", picture: "✉️", answer: "Letters", choices: ["Letters", "Television remotes", "Video games"], hint: "People wrote messages on paper and delivered them" },
      { id: "carriage", prompt: "What was common before cars?", picture: "🐎", answer: "Horse-drawn carriages", choices: ["Horse-drawn carriages", "Rocket scooters", "Submarines on roads"], hint: "Horses pulled wheeled vehicles" },
      { id: "timeline", prompt: "What does a timeline show?", picture: "🗓️", answer: "Events in order", choices: ["Events in order", "Only animal sizes", "A recipe"], hint: "It arranges events from earlier to later" },
      { id: "museum", prompt: "Why do museums preserve old objects?", picture: "🏛️", answer: "To learn about the past", choices: ["To learn about the past", "To hide every object", "To make them disappear"], hint: "Old objects can teach us how people lived" },
      { id: "cave-art", prompt: "Where did some early people make art?", picture: "🪨", answer: "On cave walls", choices: ["On cave walls", "On computer screens", "On plastic toys"], hint: "Some ancient paintings survive inside caves" },
    ],
    "art-basics": [
      { id: "brush", prompt: "Which tool can spread paint?", picture: "🖌️", answer: "A paintbrush", choices: ["A paintbrush", "A telescope", "A spoon"], hint: "Its bristles hold and spread paint" },
      { id: "palette", prompt: "What does an artist use this for?", picture: "🎨", answer: "Mixing paint colors", choices: ["Mixing paint colors", "Measuring rainfall", "Planting seeds"], hint: "Paint colors can be placed and mixed on it" },
      { id: "purple", prompt: "What can red and blue make together?", picture: "🔴 + 🔵", answer: "Purple", choices: ["Purple", "Green", "Orange"], hint: "Mix these two colors to make a violet color" },
      { id: "green", prompt: "What can blue and yellow make together?", picture: "🔵 + 🟡", answer: "Green", choices: ["Green", "Purple", "Pink"], hint: "This mixture matches the color of many leaves" },
      { id: "sculpture", prompt: "What kind of art can you walk around?", picture: "🗿", answer: "A sculpture", choices: ["A sculpture", "A song", "A photograph on a screen"], hint: "It is a three-dimensional artwork" },
      { id: "collage", prompt: "What is art made by gluing pieces together?", picture: "✂️", answer: "A collage", choices: ["A collage", "A solo", "A telescope"], hint: "Paper, fabric, and pictures can be combined" },
      { id: "portrait", prompt: "What is a picture of a person called?", picture: "🖼️", answer: "A portrait", choices: ["A portrait", "A landscape", "A map"], hint: "It usually focuses on a face or person" },
      { id: "pattern", prompt: "What repeats in a design?", picture: "🔷🔶🔷🔶", answer: "A pattern", choices: ["A pattern", "A shadow", "A whisper"], hint: "Shapes or colors repeat in a predictable way" },
    ],
    "science-space": [
      { id: "sun-star", prompt: "What kind of object is the Sun?", picture: "☀️", answer: "A star", choices: ["A star", "A moon", "A comet"], hint: "It makes its own light and heat" },
      { id: "earth-planet", prompt: "What kind of object is Earth?", picture: "🌍", answer: "A planet", choices: ["A planet", "A star", "A galaxy"], hint: "It travels around the Sun" },
      { id: "moon-orbit", prompt: "What does the Moon travel around?", picture: "🌙", answer: "Earth", choices: ["Earth", "Mars", "A cloud"], hint: "The Moon is Earth's natural satellite" },
      { id: "astronaut", prompt: "Who travels and works in space?", picture: "🧑‍🚀", answer: "An astronaut", choices: ["An astronaut", "A lifeguard", "A gardener"], hint: "They train to work in spacecraft" },
      { id: "gravity", prompt: "What pulls objects toward Earth?", picture: "🍎⬇️", answer: "Gravity", choices: ["Gravity", "Moonlight", "Sound"], hint: "It keeps our feet on the ground" },
    ],
    "science-animals": [
      { id: "habitat", prompt: "What is an animal's home called?", picture: "🏡", answer: "A habitat", choices: ["A habitat", "A compass", "A recipe"], hint: "It provides food, water, and shelter" },
      { id: "herbivore", prompt: "What does a herbivore mainly eat?", picture: "🦒🌿", answer: "Plants", choices: ["Plants", "Rocks", "Metal"], hint: "Cows, giraffes, and rabbits are examples" },
      { id: "nocturnal", prompt: "When are nocturnal animals active?", picture: "🦉🌙", answer: "At night", choices: ["At night", "Only at noon", "Only in winter"], hint: "Owls and many bats are active after dark" },
      { id: "backbone", prompt: "What does a vertebrate have?", picture: "🐕", answer: "A backbone", choices: ["A backbone", "Six wings", "No body"], hint: "Dogs, fish, birds, and people are vertebrates" },
      { id: "amphibian", prompt: "Which animal is an amphibian?", picture: "🐸", answer: "A frog", choices: ["A frog", "A cat", "An eagle"], hint: "Many amphibians spend part of life in water and part on land" },
    ],
    "science-earth": [
      { id: "evaporation", prompt: "What happens when the Sun warms water?", picture: "☀️💧", answer: "It can evaporate", choices: ["It can evaporate", "It becomes a rock", "It grows leaves"], hint: "Liquid water can become water vapor" },
      { id: "clouds", prompt: "What are clouds made from?", picture: "☁️", answer: "Tiny water drops or ice", choices: ["Tiny water drops or ice", "Cotton candy", "Dry sand"], hint: "Water in the air cools and gathers together" },
      { id: "earthquake", prompt: "What happens during an earthquake?", picture: "🏠〰️", answer: "The ground shakes", choices: ["The ground shakes", "The Sun turns off", "All rivers freeze"], hint: "Movement in Earth's crust can shake the ground" },
      { id: "recycle", prompt: "What can recycling help reduce?", picture: "♻️", answer: "Waste", choices: ["Waste", "Kindness", "Daylight"], hint: "Materials can be used again instead of thrown away" },
      { id: "seasons", prompt: "Why do Earth’s seasons change?", picture: "🌍☀️", answer: "Earth is tilted as it orbits", choices: ["Earth is tilted as it orbits", "The Moon changes color", "Clouds move north"], hint: "Different parts of Earth receive different sunlight during the year" },
    ],
    "history-ancient": [
      { id: "greek-games", prompt: "Where did the ancient Olympic Games begin?", picture: "🏅", answer: "Ancient Greece", choices: ["Ancient Greece", "Ancient Antarctica", "Modern Australia"], hint: "Athletes gathered at Olympia" },
      { id: "roman-roads", prompt: "What helped Romans travel across their empire?", picture: "🛣️", answer: "A network of roads", choices: ["A network of roads", "Airplanes", "Subway trains"], hint: "Roman engineers built many long-lasting roads" },
      { id: "egypt-nile", prompt: "Which river was central to ancient Egypt?", picture: "🏞️", answer: "The Nile", choices: ["The Nile", "The Amazon", "The Mississippi"], hint: "Its floods helped farmers grow food" },
      { id: "maya", prompt: "What did Maya scholars carefully study?", picture: "🌌", answer: "The sky and calendars", choices: ["The sky and calendars", "Television", "Steam engines"], hint: "They were skilled astronomers and mathematicians" },
      { id: "great-wall", prompt: "Where is the Great Wall?", picture: "🧱", answer: "China", choices: ["China", "Egypt", "Brazil"], hint: "Many sections were built across northern China" },
    ],
    "history-inventions": [
      { id: "wheel", prompt: "What invention made carts easier to move?", picture: "🛞", answer: "The wheel", choices: ["The wheel", "The pillow", "The paint tube"], hint: "It rolls around an axle" },
      { id: "printing", prompt: "What helped make many copies of books?", picture: "📚", answer: "The printing press", choices: ["The printing press", "The telescope", "The compass"], hint: "Movable type made printed pages faster to produce" },
      { id: "compass", prompt: "What helps travelers find direction?", picture: "🧭", answer: "A compass", choices: ["A compass", "A candle", "A drum"], hint: "Its needle points toward magnetic north" },
      { id: "telephone", prompt: "What invention let voices travel far away?", picture: "☎️", answer: "The telephone", choices: ["The telephone", "The wheelbarrow", "The sundial"], hint: "People could speak without being in the same place" },
      { id: "steam", prompt: "What powered many early trains?", picture: "🚂", answer: "Steam engines", choices: ["Steam engines", "Solar panels", "Batteries"], hint: "Heated water created steam that moved machinery" },
    ],
    "history-detectives": [
      { id: "artifact", prompt: "What is an artifact?", picture: "🏺", answer: "An object made or used by people", choices: ["An object made or used by people", "A kind of weather", "A future prediction"], hint: "Artifacts give clues about life in the past" },
      { id: "primary-source", prompt: "Which is a primary source?", picture: "📔", answer: "A diary written at the time", choices: ["A diary written at the time", "A new fictional story", "A guess with no evidence"], hint: "It was created during the time being studied" },
      { id: "oral-history", prompt: "What is oral history?", picture: "🗣️", answer: "Memories shared by speaking", choices: ["Memories shared by speaking", "A map of oceans", "A list of math facts"], hint: "People record stories told by those who experienced events" },
      { id: "map-clue", prompt: "What can an old map teach us?", picture: "🗺️", answer: "How people understood places", choices: ["How people understood places", "Tomorrow's weather", "How every animal sounds"], hint: "Maps show routes, borders, and place names from their time" },
      { id: "evidence", prompt: "What should historians use to support an idea?", picture: "🔎", answer: "Evidence", choices: ["Evidence", "A random guess", "A magic trick"], hint: "Sources and artifacts help explain what likely happened" },
    ],
    "art-lines": [
      { id: "horizontal", prompt: "Which direction is horizontal?", picture: "↔️", answer: "Side to side", choices: ["Side to side", "Up and down", "In a circle only"], hint: "The horizon stretches from left to right" },
      { id: "vertical", prompt: "Which direction is vertical?", picture: "↕️", answer: "Up and down", choices: ["Up and down", "Side to side", "Zigzag only"], hint: "A standing tree trunk is mostly vertical" },
      { id: "curve", prompt: "What kind of line bends smoothly?", picture: "〰️", answer: "A curved line", choices: ["A curved line", "A straight line", "A dotted point"], hint: "It changes direction without a sharp corner" },
      { id: "geometric", prompt: "Which is a geometric shape?", picture: "🔺", answer: "A triangle", choices: ["A triangle", "A cloud", "A splash"], hint: "It has three straight sides" },
      { id: "symmetry", prompt: "What does symmetry mean?", picture: "🦋", answer: "Two sides match", choices: ["Two sides match", "Every color is red", "Nothing has a shape"], hint: "A butterfly's wings are a helpful example" },
    ],
    "art-materials": [
      { id: "watercolor", prompt: "What is mixed with watercolor paint?", picture: "💧🎨", answer: "Water", choices: ["Water", "Sand", "Cooking oil"], hint: "Water thins the paint and carries color" },
      { id: "clay", prompt: "Which material can be shaped into pottery?", picture: "🏺", answer: "Clay", choices: ["Clay", "Glass marbles", "Paper clips"], hint: "It is soft when wet and hard after firing" },
      { id: "charcoal", prompt: "Which material can make rich black drawings?", picture: "✍️", answer: "Charcoal", choices: ["Charcoal", "Water", "Yarn"], hint: "Artists use soft charcoal sticks for dark marks" },
      { id: "weaving", prompt: "What does weaving combine?", picture: "🧶", answer: "Threads or yarn", choices: ["Threads or yarn", "Rocks and water", "Metal spoons"], hint: "Strands cross over and under each other" },
      { id: "printmaking", prompt: "What does printmaking transfer?", picture: "🖼️", answer: "Ink from a surface", choices: ["Ink from a surface", "Music from a drum", "Light from the Moon"], hint: "A prepared surface can make more than one image" },
    ],
    "art-forms": [
      { id: "landscape", prompt: "What does a landscape usually show?", picture: "🏞️", answer: "A place or scenery", choices: ["A place or scenery", "Only a person's face", "A math equation"], hint: "Mountains, fields, cities, and oceans can be landscapes" },
      { id: "illustration", prompt: "What can an illustration help do?", picture: "📖", answer: "Tell or explain a story", choices: ["Tell or explain a story", "Measure temperature", "Repair a bicycle"], hint: "Pictures can add meaning to words" },
      { id: "photography", prompt: "Which art form uses a camera?", picture: "📷", answer: "Photography", choices: ["Photography", "Pottery", "Weaving"], hint: "Photographers compose images with light" },
      { id: "architecture", prompt: "What does an architect design?", picture: "🏛️", answer: "Buildings and spaces", choices: ["Buildings and spaces", "Only songs", "Weather forecasts"], hint: "Architecture combines function, structure, and beauty" },
      { id: "performing", prompt: "Which is a performing art?", picture: "💃", answer: "Dance", choices: ["Dance", "Sculpture", "Drawing"], hint: "It is performed live through movement" },
    ],
  };

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
            <button data-classroom="gym" data-class-level="movers">🌱 Movers <span class="small">Name the activity</span></button>
            <button data-classroom="gym" data-class-level="sports">🏅 Sports Stars <span class="small">Identify the sport</span></button>
            <button data-classroom="gym" data-class-level="adventure">🏔️ Adventure <span class="small">Trickier activities</span></button>
          </div>
          <div class="class-tile science-tile">
            <span class="class-icon">🔬</span><h3>Science Lab</h3>
            <button data-classroom="science" data-class-level="basics">🌱 Living World <span class="small">Plants, weather, and the body</span></button>
            <button data-classroom="science" data-class-level="space">🚀 Space Explorers <span class="small">Earth, Moon, Sun, and gravity</span></button>
            <button data-classroom="science" data-class-level="animals">🦉 Animal Experts <span class="small">Habitats and animal traits</span></button>
            <button data-classroom="science" data-class-level="earth">🌍 Earth Science <span class="small">Water, seasons, and our planet</span></button>
          </div>
          <div class="class-tile history-tile">
            <span class="class-icon">🏛️</span><h3>Time Travelers</h3>
            <button data-classroom="history" data-class-level="basics">📜 History Basics <span class="small">Objects, timelines, and the past</span></button>
            <button data-classroom="history" data-class-level="ancient">🏺 Ancient Worlds <span class="small">Greece, Egypt, Rome, Maya, and China</span></button>
            <button data-classroom="history" data-class-level="inventions">💡 Inventions & Ideas <span class="small">Tools that changed daily life</span></button>
            <button data-classroom="history" data-class-level="detectives">🔎 History Detectives <span class="small">Sources, evidence, and artifacts</span></button>
          </div>
          <div class="class-tile art-tile">
            <span class="class-icon">🎨</span><h3>Art Studio</h3>
            <button data-classroom="art" data-class-level="basics">🎨 Color & Tools <span class="small">Mixing, tools, and art words</span></button>
            <button data-classroom="art" data-class-level="lines">🔷 Lines & Shapes <span class="small">Direction, curves, and symmetry</span></button>
            <button data-classroom="art" data-class-level="materials">🧶 Materials & Making <span class="small">Paint, clay, fiber, and prints</span></button>
            <button data-classroom="art" data-class-level="forms">🖼️ Art Forms <span class="small">Photos, buildings, dance, and more</span></button>
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
            <strong>${item.name}</strong><small>${item.type === "outfit" ? "Pet outfit" : "Room decoration"}</small>
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
      const { action, pet, color, name, difficulty, reward, classroom, classLevel, buy } = button.dataset;
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
      if (classroom) startClass(classroom, classLevel);
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

  function makeLessonQuestion(lessonKey, used) {
    const pool = lessonQuestions[lessonKey];
    const remaining = pool.filter((question) => !used.has(question.id));
    const question = Phaser.Math.RND.pick(remaining.length ? remaining : pool);
    used.add(question.id);
    const generatedChoices = Phaser.Utils.Array.Shuffle(pool.filter((item) => item.id !== question.id))
      .slice(0, 2).map((item) => item.answer);
    return {
      prompt: question.prompt || (lessonKey === "gym-sports" ? "Which sport uses this?" : "What are they doing?"),
      picture: question.picture,
      hint: question.hint,
      answer: question.answer,
      choices: Phaser.Utils.Array.Shuffle(question.choices || [question.answer, ...generatedChoices]),
    };
  }

  function startClass(classType, classLevel) {
    currentClass = classType;
    const lessonKey = classType === "math" ? "math" : `${classType}-${classLevel || (classType === "gym" ? "movers" : "basics")}`;
    const usedQuestions = new Set();
    const nextQuestion = () => classType === "math" ? makeMathQuestion() : makeLessonQuestion(lessonKey, usedQuestions);
    const classNames = {
      math: "Math Meadow",
      "science-basics": "Science Lab · Living World",
      "science-space": "Science Lab · Space Explorers",
      "science-animals": "Science Lab · Animal Experts",
      "science-earth": "Science Lab · Earth Science",
      "history-basics": "Time Travelers · History Basics",
      "history-ancient": "Time Travelers · Ancient Worlds",
      "history-inventions": "Time Travelers · Inventions & Ideas",
      "history-detectives": "Time Travelers · History Detectives",
      "art-basics": "Art Studio · Color & Tools",
      "art-lines": "Art Studio · Lines & Shapes",
      "art-materials": "Art Studio · Materials & Making",
      "art-forms": "Art Studio · Art Forms",
      "gym-movers": "Giggle Gym · Movers",
      "gym-sports": "Giggle Gym · Sports Stars",
      "gym-adventure": "Giggle Gym · Adventure",
    };
    const className = classNames[lessonKey] || classNames[classType];
    const state = { number: 1, mistakes: 0, question: nextQuestion(), locked: false };
    currentScreen = "class";
    scene?.redraw();

    const show = () => {
      ui.innerHTML = `${hud()}<div class="panel class-card">
        <div class="progress">${className} · Question ${state.number} of 5</div>
        ${state.question.picture ? `<div class="activity-picture" role="img" aria-label="Question illustration">${state.question.picture}</div>` : ""}
        <h2 class="question ${state.question.picture ? "word-question" : ""}">${state.question.prompt}</h2>
        <div class="answers">${state.question.choices.map((choice) => `<button class="answer ${state.question.picture ? "word-answer" : ""}" data-answer="${escapeHtml(choice)}">${escapeHtml(choice)}</button>`).join("")}</div>
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
        const hint = classType === "math" ? mathHint : `Hint: ${state.question.hint}.`;
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
      this.load.spritesheet("accessories", "assets/accessories-transparent-v1.png", { frameWidth: 418, frameHeight: 418 });
      this.load.spritesheet("premium-accessories", "assets/premium-accessories-transparent-v3.png", { frameWidth: 418, frameHeight: 418 });
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
        "space-sticker": { icon: "🪐", x: .19, y: .14, angle: -5 },
        "dino-sticker": { icon: "🦕", x: .91, y: .47, angle: 3 },
        "art-sticker": { icon: "🎨", x: .08, y: .43, angle: -6 },
        "gold-trophy": { icon: "🏆", x: .74, y: .59, angle: 0 },
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
      const isPremium = premiumAccessoryFrames[outfit] !== undefined;
      const accessoryFrame = isPremium ? premiumAccessoryFrames[outfit] : accessoryFrames[outfit];
      const fit = isPremium ? premiumAccessoryFits[save.petType]?.[outfit] : accessoryFits[save.petType]?.[outfit];
      if (accessoryFrame !== undefined && fit) {
        const accessory = this.add.sprite(fit.x, fit.y, isPremium ? "premium-accessories" : "accessories", accessoryFrame)
          .setDisplaySize(fit.size, fit.size).setAngle(fit.angle || 0);
        container.add(accessory);
      }
      container.setSize(370, 370).setInteractive({ useHandCursor: true });
      container.on("pointerdown", () => {
        this.tweens.add({ targets: container, y: y - 22, duration: 170, yoyo: true, ease: "Quad.easeOut" });
        sound(620, .1);
        const bubble = document.querySelector(".speech");
        if (bubble) bubble.textContent = Phaser.Math.RND.pick(["You’re my favorite study buddy!", "Let’s earn some stars!", "Hi-five! Great to see you!"]);
      });
      this.tweens.add({ targets: container, y: { from: y - 1, to: y + 2 }, duration: 2100, yoyo: true, repeat: -1, ease: "Sine.easeInOut" });
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
