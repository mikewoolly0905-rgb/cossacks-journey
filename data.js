/**
 * Cossack's Journey: Chronicles of the Carpathian Woods
 * MODULE: data.js - Dynamic Curriculum & Carpathian Bestiary
 */

window.GameBalance = {
  playerBaseHp: 100,
  quickStrikeDamage: 10,
  cleaveDamage: 30,
  riposteCounterDamage: 12,
  critMultiplier: 1.5,
  streakThreshold: 4,
  keenEdgeBonusDmg: 4,
  keenEdgeDurationHits: 3,
  elixirHealAmount: 35
};

window.WeatherData = [
  { id: 'clear', name: 'Ясна ніч (Clear Night)', icon: '🌙', bgClass: 'bg-transparent' },
  { id: 'fog', name: 'Густий туман (Mountain Fog)', icon: '🌫️', bgClass: 'bg-slate-900/40 backdrop-blur-[1px]' },
  { id: 'storm', name: 'Гроза (Carpathian Storm)', icon: '⛈️', bgClass: 'bg-indigo-950/45' }
];

const Stage1Items = [
  { cyrillic: "А", speakText: "а", sound: "A (open 'ah' as in Father)", mnemonic: "Pure vowel anchor: open your throat like saying 'Ah'!", wrong: ["O (as in Orbit)", "U (as in Rule)", "E (as in Echo)"] },
  { cyrillic: "О", speakText: "о", sound: "O (as in Orbit)", mnemonic: "Round mouth rune: crisp 'O' sound!", wrong: ["A (as in Father)", "U (as in Rule)", "I (as in Meet)"] },
  { cyrillic: "М", speakText: "м", sound: "M (as in Moon)", mnemonic: "Twin peaks like English M — hums with a clear M sound!", wrong: ["N (as in Nest)", "L (as in Lake)", "V (as in Vine)"] },
  { cyrillic: "Т", speakText: "т", sound: "T (as in Timber)", mnemonic: "Firm crossbar T — sounds like Timber!", wrong: ["M (as in Mist)", "P (as in Path)", "G (as in Goat)"] },
  { cyrillic: "К", speakText: "к", sound: "K (as in Cossack)", mnemonic: "Sharp, familiar K sound!", wrong: ["R (as in River)", "H (as in Home)", "V (as in Vine)"] },
  { cyrillic: "В", speakText: "в", sound: "V (as in Vine)", mnemonic: "Looks like English B, but sounds like V in Vampire!", wrong: ["B (as in Boat)", "R (as in River)", "N (as in Nest)"] },
  { cyrillic: "Н", speakText: "н", sound: "N (as in Noon)", mnemonic: "Looks like H, but crossbridge connects N as in No!", wrong: ["H (as in House)", "P (as in Path)", "M (as in Mist)"] }
];

const Stage2Items = [
  { cyrillic: "Р", speakText: "р", sound: "R (rolled as in River)", mnemonic: "Looks like P, but rolls like R in Rocket!", wrong: ["P (as in Pine)", "B (as in Bear)", "S (as in Sun)"] },
  { cyrillic: "С", speakText: "с", sound: "S (hissing soft as in Sun)", mnemonic: "Looks like C, but is ALWAYS a hissing S sound!", wrong: ["K (as in Cat)", "CH (as in Chest)", "Z (as in Zone)"] },
  { cyrillic: "П", speakText: "п", sound: "P (portal as in Pine)", mnemonic: "Pillar portal (Greek Pi) — makes the crisp P sound!", wrong: ["N (as in Night)", "L (as in Leaf)", "T (as in Tree)"] },
  { cyrillic: "Д", speakText: "д", sound: "D (as in Door)", mnemonic: "Looks like a house on pillars: D for Door and Dome!", wrong: ["L (as in Lake)", "A (as in Father)", "P (as in Pine)"] },
  { cyrillic: "Б", speakText: "б", sound: "B (as in Bear)", mnemonic: "Has a top sunshade bar: true B as in Bear!", wrong: ["V (as in Vine)", "R (as in River)", "P (as in Pine)"] },
  { cyrillic: "Л", speakText: "л", sound: "L (as in Leaf)", mnemonic: "Gentle peak arch: makes the L sound as in Leaf!", wrong: ["P (as in Pine)", "D (as in Door)", "T (as in Tree)"] },
  { cyrillic: "Е", speakText: "е", sound: "E (short as in Echo)", mnemonic: "Clean, non-diphthong E as in Echo!", wrong: ["EE (as in Meet)", "YE (as in Yes)", "A (as in Father)"] }
];

const Stage3Items = [
  { cyrillic: "І", speakText: "і", sound: "EE (clean as in Meet)", mnemonic: "Single dot pillar makes a clean, bright 'EE' sound.", wrong: ["EYE (as in Kite)", "YI (as in Yield)", "OO (as in Moon)"] },
  { cyrillic: "Ї", speakText: "ї", sound: "YI (as in Yield / Yeast)", mnemonic: "Uniquely Ukrainian! Two dots ALWAYS mean 'YI'.", wrong: ["EE (as in Meet)", "YE (as in Yes)", "YA (as in Yard)"] },
  { cyrillic: "Є", speakText: "є", sound: "YE (as in Yes)", mnemonic: "A crescent facing right: sounds like 'YE' in Yes!", wrong: ["YI (as in Yield)", "ZH (as in Measure)", "G (as in Goose)"] },
  { cyrillic: "Г", speakText: "г", sound: "Voiced H (as in Ahead)", mnemonic: "Warm throat breath: plain Г is a voiced H sound!", wrong: ["Hard G (as in Goat)", "R (as in River)", "P (as in Pine)"] },
  { cyrillic: "Ґ", speakText: "ґ", sound: "Hard G (as in Goose)", mnemonic: "Upturned horn on top gives it a hard G sound!", wrong: ["Soft H (as in Hope)", "T (as in Tree)", "K (as in King)"] },
  { cyrillic: "Ж", speakText: "ж", sound: "ZH (as in Measure)", mnemonic: "Shaped like a beetle — buzzes with a soft 'ZH' sound!", wrong: ["SH (as in Ship)", "K (as in Key)", "CH (as in Charm)"] },
  { cyrillic: "Ч", speakText: "ч", sound: "CH (as in Church)", mnemonic: "Looks like a cup or chalice — makes a 'CH' sound!", wrong: ["SH (as in Shield)", "TS (as in Cats)", "V (as in Vine)"] }
];

const Stage4Items = [
  { cyrillic: "Ш", speakText: "ш", sound: "SH (as in Shadow)", mnemonic: "Three pine needles — whispers 'SH' in the wind!", wrong: ["ZH (as in Treasure)", "CH (as in Chest)", "M (as in Mist)"] },
  { cyrillic: "Щ", speakText: "щ", sound: "SHCH (as in Borscht)", mnemonic: "Trident with a tail — double sound 'SHCH'!", wrong: ["SH (as in Shadow)", "CH (as in Church)", "TS (as in Cats)"] },
  { cyrillic: "З", speakText: "з", sound: "Z (as in Zero)", mnemonic: "Looks like the number 3, buzzes like a Z!", wrong: ["E (as in Echo)", "V (as in Vine)", "S (as in Sun)"] },
  { cyrillic: "Ц", speakText: "ц", sound: "TS (as in Cats)", mnemonic: "Chair with a little foot tail — makes 'TS' as in Tsunami!", wrong: ["CH (as in Church)", "SH (as in Ship)", "P (as in Pine)"] },
  { cyrillic: "Ю", speakText: "ю", sound: "YU (as in Universe)", mnemonic: "Pillar linked to a loop — sounds like 'YU'!", wrong: ["OO (as in Moon)", "YA (as in Yard)", "YO (as in Yolk)"] },
  { cyrillic: "Я", speakText: "я", sound: "YA (as in Yard) / 'I'", mnemonic: "Reversed R — means 'YA' and also the pronoun 'I'!", wrong: ["R (as in River)", "YE (as in Yes)", "YU (as in Youth)"] },
  { cyrillic: "Х", speakText: "х", sound: "KH (throaty H as in Bach)", mnemonic: "Crossing sabres: raspy throat friction 'KH'!", wrong: ["K (as in King)", "X (as in Box)", "S (as in Sun)"] },
  { cyrillic: "Ь", speakText: "ть", sound: "Soft Sign (Softens preceding letter)", mnemonic: "Makes no sound itself; softens the letter right before it!", wrong: ["B (as in Boat)", "V (as in Vine)", "P (as in Pine)"] }
];

window.CurriculumData = {
  worldId: 1,
  worldTitle: "World 1: The Runic Thicket (Лісові Руни)",
  tiers: [
    {
      id: 1,
      roman: "I",
      world: 1,
      stageTitle: "The Crossroads • First Steps",
      name: "Stage 1: Familiar Anchors",
      subtitle: "Master the direct cognates and initial false friends",
      enemyName: "Woodland Imp (Лісовий Чорт)",
      enemyMaxHp: 75,
      enemyDamage: 10,
      enemyAttackName: "Obsidian Scratch",
      enemySvgId: "svg-enemy-chort",
      items: Stage1Items,
      heavyPool: [
        { cyrillic: "ТАК", speakText: "так", prompt: "Blend Т + А + К to form the affirmative:", sound: "TAK (Yes)", mnemonic: "Т (T) + А (A) + К (K) = ТАК (Yes)!", wrong: ["MAK (Poppy)", "RAK (Crab)", "PAK (Box)"] },
        { cyrillic: "ТАМ", speakText: "там", prompt: "Blend Т + А + М into sound:", sound: "TAM (There)", mnemonic: "Т (T) + А (A) + М (M) = ТАМ (There).", wrong: ["SAM (Alone)", "VAM (To you)", "NAM (To us)"] },
        { cyrillic: "МАМА", speakText: "мама", prompt: "Blend the familiar cognates М + А + М + А:", sound: "MAMA (Mother)", mnemonic: "М (M) + А (A) + М (M) + А (A) = МАМА (Mother).", wrong: ["TATO (Father)", "VODA (Water)", "BABA (Grandmother)"] }
      ]
    },
    {
      id: 2,
      roman: "II",
      world: 1,
      stageTitle: "The Deceptive Trail • False Friends",
      name: "Stage 2: Deceptive Paths",
      subtitle: "Break English reading habits with trickster runes",
      enemyName: "Mist Sprite (Потерча)",
      enemyMaxHp: 105,
      enemyDamage: 16,
      enemyAttackName: "Spectral Vapour",
      enemySvgId: "svg-enemy-potercha",
      items: Stage2Items,
      heavyPool: [
        { cyrillic: "СОН", speakText: "сон", prompt: "Blend False Friends С + О + Н into sound:", sound: "SON (Dream / Sleep)", mnemonic: "С (S) + О (O) + Н (N) = СОН (Son - Dream).", wrong: ["COH (Ash)", "PON (Bridge)", "BON (Bell)"] },
        { cyrillic: "ПАРК", speakText: "парк", prompt: "Combine portal П and rolled Р to read ПАРК:", sound: "PARK (Park)", mnemonic: "П (P) + А (A) + Р (R) + К (K) = ПАРК (Park)!", wrong: ["NAPK (Cloth)", "BAPK (Tower)", "SAPK (Boot)"] },
        { cyrillic: "ПЕС", speakText: "пес", prompt: "Blend portal П + Е + hissing С into sound:", sound: "PES (Dog)", mnemonic: "П (P) + Е (E) + С (S) = ПЕС (Pes - Dog).", wrong: ["LES (Forest)", "NOS (Nose)", "KOS (Blackbird)"] }
      ]
    },
    {
      id: 3,
      roman: "III",
      world: 1,
      stageTitle: "Pine Grove • Unique Sounds",
      name: "Stage 3: Sacred Forest Sounds",
      subtitle: "Master the unique vowels and fricatives of Ukrainian",
      enemyName: "Woodland Mavka (Мавка)",
      enemyMaxHp: 135,
      enemyDamage: 20,
      enemyAttackName: "Willow Branch Lash",
      enemySvgId: "svg-enemy-mavka",
      items: Stage3Items,
      heavyPool: [
        { cyrillic: "КИЇВ", speakText: "Київ", prompt: "How does two-dotted Ї shape the capital's name?", sound: "KYIV (Capital of Ukraine)", mnemonic: "Ї = YI and В = V, giving КИЇВ (Kyiv)!", wrong: ["KIEV (Russian spelling)", "KUV (Crow)", "KOYV (Boat)"] },
        { cyrillic: "НІЧ", speakText: "ніч", prompt: "Combine Н + І + Ч to read this word:", sound: "NICH (Night)", mnemonic: "Н (N) + І (EE) + Ч (CH) = НІЧ (Night).", wrong: ["HISH (Wolf)", "PICH (River)", "MICH (Sword)"] },
        { cyrillic: "ЧАС", speakText: "час", prompt: "Combine Ч + А + С to read this word:", sound: "CHAS (Time)", mnemonic: "Ч (CH) + А (A) + С (S) = ЧАС (Time).", wrong: ["SHAS (Step)", "KAS (Chest)", "PAS (Belt)"] }
      ]
    },
    {
      id: 4,
      roman: "IV",
      world: 1,
      stageTitle: "Dark Bog • Sibilants & Softening",
      name: "Stage 4: The Whispering Marshes",
      subtitle: "Learn the softening sign and complex whistling runes",
      enemyName: "Bog Lurker (Болотник)",
      enemyMaxHp: 165,
      enemyDamage: 24,
      enemyAttackName: "Mud Tendril Grasp",
      enemySvgId: "svg-enemy-bolotnyk",
      items: Stage4Items,
      heavyPool: [
        { cyrillic: "ДЕНЬ", speakText: "день", prompt: "How does the soft sign (Ь) change Д + Е + Н?", sound: "DEN' (Day - softened N)", mnemonic: "Д (D) + Е (E) + НЬ (soft N) = ДЕНЬ (Day)!", wrong: ["DEN (Hard N)", "DOM (House)", "DUR (Hole)"] },
        { cyrillic: "ЩО", speakText: "що", prompt: "Read this common question word using Щ:", sound: "SHCHO (What)", mnemonic: "Щ (SHCH) + О (O) = ЩО (Shcho - What)!", wrong: ["SHO (Short)", "KTO (Who)", "GDE (Where)"] },
        { cyrillic: "ЦАР", speakText: "цар", prompt: "Combine Ц + А + Р to read:", sound: "TSAR (Ruler)", mnemonic: "Ц (TS) + А (A) + Р (R) = ЦАР (Tsar).", wrong: ["CHAR (Spell)", "PAR (Steam)", "DAR (Gift)"] }
      ]
    },
    {
      id: 5,
      roman: "V",
      world: 1,
      stageTitle: "Ancient Beech • WORLD BOSS",
      name: "World Boss: Master of the Woods",
      subtitle: "The ultimate trial of the 33-letter Cyrillic script",
      enemyName: "Elder Lisovyk (Старий Лісовик)",
      enemyMaxHp: 220,
      enemyDamage: 28,
      enemyAttackName: "Roots of the Carpathian Oaks",
      enemySvgId: "svg-enemy-lisovyk",
      // Dynamically compiles all 29 unique runes taught across stages 1-4 for the grand review
      items: [...Stage1Items, ...Stage2Items, ...Stage3Items, ...Stage4Items],
      heavyPool: [
        { cyrillic: "КИЇВ", speakText: "Київ", prompt: "Decipher the ancient capital to shatter Lisovyk's roots:", sound: "KYIV (Capital of Ukraine)", mnemonic: "КИЇВ (Kyiv) combines К + И + Ї + В.", wrong: ["KIEV", "KUV", "KOYV"] },
        { cyrillic: "ВОДА І ВОГОНЬ", speakText: "вода і вогонь", prompt: "Balance the primal elements against the Elder:", sound: "Water and Fire", mnemonic: "Вода (Water) + і (and) + Вогонь (Fire).", wrong: ["Bread and Honey", "Home and Forest", "Night and Day"] },
        { cyrillic: "Я ЗНАЮ РУНИ", speakText: "я знаю руни", prompt: "Proclaim your total mastery over the Carpathian forest:", sound: "I know the runes", mnemonic: "Я (I) + знаю (know) + руни (runes).", wrong: ["I see the tree", "I hear the imp", "Thank you elder"] }
      ]
    }
  ]
};

window.CodexData = {
  beasts: [
    { name: "Чорт (Chort)", pronounce: "chort", epithet: "Woodland Trickster Spirit", icon: "🐐", lore: "In Slavic folklore, the Chort is a cunning horned prankster of thickets and bogs. He confuses travellers with False Friend letters." },
    { name: "Потерча (Potercha)", pronounce: "potercha", epithet: "Mist Sprite of Lost Trails", icon: "🌫️", lore: "Spirits of twilight who manifest in the Carpathian mountain fog, tempting young Cossacks with deceptive mirages." },
    { name: "Мавка (Mavka)", pronounce: "mavka", epithet: "Guardian of Birch Groves", icon: "🌿", lore: "Immortalized in Lesya Ukrainka's 'The Forest Song', Mavkas speak in the soft vowels and whispering runes of the woods." },
    { name: "Болотник (Bolotnyk)", pronounce: "bolotnyk", epithet: "Lurker of the Black Marsh", icon: "🐸", lore: "A sedentary spirit draped in moss and reeds who tests Cossacks with sibilant hisses and soft-sign riddles." },
    { name: "Старий Лісовик (Lisovyk)", pronounce: "lisovyk", epithet: "World Boss • Master of Trees", icon: "🌲", lore: "The ancient keeper of the primeval Carpathian oaks. Only those who have mastered all 33 runes of the forest can parry his great roots." }
  ],
  sacred: [
    { name: "Хліб-Сіль (Bread & Salt)", pronounce: "khlib sil", epithet: "Sacred Covenant of Hospitality", icon: "🍞", lore: "Bread signifies life, sustenance, and light; salt wards against dark witchcraft. Offering them seals an unbreakable oath." },
    { name: "Цвіт Папороті (Fern Flower)", pronounce: "tsvit paporoti", epithet: "Kupala Night Miracle Bloom", icon: "🌸", lore: "A mythical golden bloom that opens for a single second at midnight on Kupala Night, granting power to understand all speech." }
  ]
};
