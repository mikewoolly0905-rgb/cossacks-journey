/**
 * Cossack's Journey: Chronicles of the Carpathian Woods
 * MODULE: data.js - World 1: The Runic Thicket (Full 33-Letter Alphabet Curriculum)
 */

window.WeatherData = [
  { id: 'clear', name: 'Ясна ніч (Clear Night)', icon: '🌙', bgClass: 'bg-transparent' },
  { id: 'fog', name: 'Густий туман (Mountain Fog)', icon: '🌫️', bgClass: 'bg-slate-900/40 backdrop-blur-[1px]' },
  { id: 'storm', name: 'Гроза (Carpathian Storm)', icon: '⛈️', bgClass: 'bg-indigo-950/45' }
];

window.CurriculumData = {
  worldId: 1,
  worldTitle: "World 1: The Runic Thicket (Лісові Руни)",
  tiers: [
    // -------------------------------------------------------------------------
    // STAGE 1: True Cognates & Opening Anchors (7 Letters)
    // -------------------------------------------------------------------------
    {
      id: 1,
      roman: "I",
      world: 1,
      stageTitle: "The Crossroads • First Steps",
      name: "Stage 1: Familiar Anchors",
      subtitle: "Master the direct cognates and initial false friends",
      enemyName: "Woodland Imp (Лісовий Чорт)",
      enemyMaxHp: 45,
      enemyDamage: 12,
      enemyAttackName: "Obsidian Scratch",
      enemySvg: `
        <svg class="w-20 h-20" viewBox="0 0 100 120" fill="none">
          <ellipse cx="50" cy="72" rx="24" ry="30" fill="#27272a" stroke="#71717a" stroke-width="2"/>
          <circle cx="50" cy="40" r="18" fill="#3f3f46" stroke="#71717a" stroke-width="2"/>
          <path d="M40 28 Q 28 8 20 18 Q 30 25 36 34" fill="#d4d4d8"/>
          <path d="M60 28 Q 72 8 80 18 Q 70 25 64 34" fill="#d4d4d8"/>
          <ellipse cx="43" cy="40" rx="3.5" ry="5" fill="#ef4444"/>
          <ellipse cx="57" cy="40" rx="3.5" ry="5" fill="#ef4444"/>
          <polygon points="44,50 46,55 49,50" fill="#fafafa"/>
          <polygon points="51,50 54,55 56,50" fill="#fafafa"/>
        </svg>
      `,
      items: [
        { cyrillic: "А", speakText: "а", sound: "A (open 'ah' as in Father)", mnemonic: "Pure vowel anchor: open your throat like saying 'Ah'!", wrong: ["O (as in Orbit)", "U (as in Rule)", "E (as in Echo)"] },
        { cyrillic: "О", speakText: "о", sound: "O (as in Orbit)", mnemonic: "Round mouth rune: crisp 'O' sound!", wrong: ["A (as in Father)", "U (as in Rule)", "I (as in Meet)"] },
        { cyrillic: "М", speakText: "м", sound: "M (as in Moon)", mnemonic: "Twin peaks like English M — hums with a clear M sound!", wrong: ["N (as in Nest)", "L (as in Lake)", "V (as in Vine)"] },
        { cyrillic: "Т", speakText: "т", sound: "T (as in Timber)", mnemonic: "Firm crossbar T — sounds like Timber!", wrong: ["M (as in Mist)", "P (as in Path)", "G (as in Goat)"] },
        { cyrillic: "К", speakText: "к", sound: "K (as in Cossack)", mnemonic: "Sharp, familiar K sound!", wrong: ["R (as in River)", "H (as in Home)", "V (as in Vine)"] },
        { cyrillic: "В", speakText: "в", sound: "V (as in Vine)", mnemonic: "Looks like English B, but sounds like V in Vampire!", wrong: ["B (as in Boat)", "R (as in River)", "N (as in Nest)"] },
        { cyrillic: "Н", speakText: "н", sound: "N (as in Noon)", mnemonic: "Looks like H, but crossbridge connects N as in No!", wrong: ["H (as in House)", "P (as in Path)", "M (as in Mist)"] }
      ],
      heavyPool: [
        { cyrillic: "ТАК", speakText: "так", prompt: "Blend Т + А + К to form the affirmative:", sound: "TAK (Yes)", mnemonic: "Т (T) + А (A) + К (K) = ТАК (Yes)!", wrong: ["MAK (Poppy)", "RAK (Crab)", "PAK (Box)"] },
        { cyrillic: "ТАМ", speakText: "там", prompt: "Blend Т + А + М into sound:", sound: "TAM (There)", mnemonic: "Т (T) + А (A) + М (M) = ТАМ (There).", wrong: ["SAM (Alone)", "VAM (To you)", "NAM (To us)"] },
        { cyrillic: "МАМА", speakText: "мама", prompt: "Blend the familiar cognates М + А + М + А:", sound: "MAMA (Mother)", mnemonic: "М (M) + А (A) + М (M) + А (A) = МАМА (Mother).", wrong: ["TATO (Father)", "VODA (Water)", "BABA (Grandmother)"] }
      ]
    },

    // -------------------------------------------------------------------------
    // STAGE 2: False Friends & Heavy Consonants (7 Letters)
    // -------------------------------------------------------------------------
    {
      id: 2,
      roman: "II",
      world: 1,
      stageTitle: "The Deceptive Trail • False Friends",
      name: "Stage 2: Deceptive Paths",
      subtitle: "Break English reading habits with trickster runes",
      enemyName: "Mist Sprite (Потерча)",
      enemyMaxHp: 65,
      enemyDamage: 18,
      enemyAttackName: "Spectral Vapour",
      enemySvg: `
        <svg class="w-20 h-20" viewBox="0 0 100 120" fill="none">
          <ellipse cx="50" cy="65" rx="22" ry="28" fill="#1e293b" opacity="0.85"/>
          <circle cx="50" cy="35" r="15" fill="#334155"/>
          <circle cx="44" cy="34" r="3" fill="#38bdf8"/>
          <circle cx="56" cy="34" r="3" fill="#38bdf8"/>
          <path d="M30 80 Q 50 110 70 80" stroke="#64748b" stroke-width="3" fill="none"/>
        </svg>
      `,
      items: [
        { cyrillic: "Р", speakText: "р", sound: "R (rolled as in River)", mnemonic: "Looks like P, but rolls like R in Rocket!", wrong: ["P (as in Pine)", "B (as in Bear)", "S (as in Sun)"] },
        { cyrillic: "С", speakText: "с", sound: "S (hissing soft as in Sun)", mnemonic: "Looks like C, but is ALWAYS a hissing S sound!", wrong: ["K (as in Cat)", "CH (as in Chest)", "Z (as in Zone)"] },
        { cyrillic: "П", speakText: "п", sound: "P (portal as in Pine)", mnemonic: "Pillar portal (Greek Pi) — makes the crisp P sound!", wrong: ["N (as in Night)", "L (as in Leaf)", "T (as in Tree)"] },
        { cyrillic: "Д", speakText: "д", sound: "D (as in Door)", mnemonic: "Looks like a house on pillars: D for Door and Dome!", wrong: ["L (as in Lake)", "A (as in Father)", "P (as in Pine)"] },
        { cyrillic: "Б", speakText: "б", sound: "B (as in Bear)", mnemonic: "Has a top sunshade bar: true B as in Bear!", wrong: ["V (as in Vine)", "R (as in River)", "P (as in Pine)"] },
        { cyrillic: "Л", speakText: "л", sound: "L (as in Leaf)", mnemonic: "Gentle peak arch: makes the L sound as in Leaf!", wrong: ["P (as in Pine)", "D (as in Door)", "T (as in Tree)"] },
        { cyrillic: "Е", speakText: "е", sound: "E (short as in Echo)", mnemonic: "Clean, non-diphthong E as in Echo!", wrong: ["EE (as in Meet)", "YE (as in Yes)", "A (as in Father)"] }
      ],
      heavyPool: [
        { cyrillic: "СОН", speakText: "сон", prompt: "Blend False Friends С + О + Н into sound:", sound: "SON (Dream / Sleep)", mnemonic: "С (S) + О (O) + Н (N) = СОН (Son - Dream).", wrong: ["COH (Ash)", "PON (Bridge)", "BON (Bell)"] },
        { cyrillic: "ПАРК", speakText: "парк", prompt: "Combine portal П and rolled Р to read ПАРК:", sound: "PARK (Park)", mnemonic: "П (P) + А (A) + Р (R) + К (K) = ПАРК (Park)!", wrong: ["NAPK (Cloth)", "BAPK (Tower)", "SAPK (Boot)"] },
        { cyrillic: "ПЕС", speakText: "пес", prompt: "Blend portal П + Е + hissing С into sound:", sound: "PES (Dog)", mnemonic: "П (P) + Е (E) + С (S) = ПЕС (Pes - Dog).", wrong: ["LES (Forest)", "NOS (Nose)", "KOS (Blackbird)"] }
      ]
    },

    // -------------------------------------------------------------------------
    // STAGE 3: Distinctive Ukrainian Phonetics (7 Letters)
    // -------------------------------------------------------------------------
    {
      id: 3,
      roman: "III",
      world: 1,
      stageTitle: "Pine Grove • Unique Sounds",
      name: "Stage 3: Sacred Forest Sounds",
      subtitle: "Master the unique vowels and fricatives of Ukrainian",
      enemyName: "Woodland Mavka (Мавка)",
      enemyMaxHp: 75,
      enemyDamage: 20,
      enemyAttackName: "Willow Branch Lash",
      enemySvg: `
        <svg class="w-20 h-20" viewBox="0 0 100 120" fill="none">
          <ellipse cx="50" cy="76" rx="20" ry="32" fill="#064e3b" opacity="0.85"/>
          <circle cx="50" cy="38" r="16" fill="#115e59"/>
          <circle cx="44" cy="38" r="3" fill="#a7f3d0"/>
          <circle cx="56" cy="38" r="3" fill="#a7f3d0"/>
          <path d="M34 32 C 18 50, 20 85, 30 98" stroke="#10b981" stroke-width="3.5" stroke-linecap="round"/>
          <path d="M66 32 C 82 50, 80 85, 70 98" stroke="#10b981" stroke-width="3.5" stroke-linecap="round"/>
        </svg>
      `,
      items: [
        { cyrillic: "І", speakText: "і", sound: "EE (clean as in Meet)", mnemonic: "Single dot pillar makes a clean, bright 'EE' sound.", wrong: ["EYE (as in Kite)", "YI (as in Yield)", "OO (as in Moon)"] },
        { cyrillic: "Ї", speakText: "ї", sound: "YI (as in Yield / Yeast)", mnemonic: "Uniquely Ukrainian! Two dots ALWAYS mean 'YI'.", wrong: ["EE (as in Meet)", "YE (as in Yes)", "YA (as in Yard)"] },
        { cyrillic: "Є", speakText: "є", sound: "YE (as in Yes)", mnemonic: "A crescent facing right: sounds like 'YE' in Yes!", wrong: ["YI (as in Yield)", "ZH (as in Measure)", "G (as in Goose)"] },
        { cyrillic: "Г", speakText: "г", sound: "Voiced H (as in Ahead)", mnemonic: "Warm throat breath: plain Г is a voiced H sound!", wrong: ["Hard G (as in Goat)", "R (as in River)", "P (as in Pine)"] },
        { cyrillic: "Ґ", speakText: "ґ", sound: "Hard G (as in Goose)", mnemonic: "Upturned horn on top gives it a hard G sound!", wrong: ["Soft H (as in Hope)", "T (as in Tree)", "K (as in King)"] },
        { cyrillic: "Ж", speakText: "ж", sound: "ZH (as in Measure)", mnemonic: "Shaped like a beetle — buzzes with a soft 'ZH' sound!", wrong: ["SH (as in Ship)", "K (as in Key)", "CH (as in Charm)"] },
        { cyrillic: "Ч", speakText: "ч", sound: "CH (as in Church)", mnemonic: "Looks like a cup or chalice — makes a 'CH' sound!", wrong: ["SH (as in Shield)", "TS (as in Cats)", "V (as in Vine)"] }
      ],
      heavyPool: [
        { cyrillic: "КИЇВ", speakText: "Київ", prompt: "How does two-dotted Ї shape the capital's name?", sound: "KYIV (Capital of Ukraine)", mnemonic: "Ї = YI and В = V, giving КИЇВ (Kyiv)!", wrong: ["KIEV (Russian spelling)", "KUV (Crow)", "KOYV (Boat)"] },
        { cyrillic: "НІЧ", speakText: "ніч", prompt: "Combine Н + І + Ч to read this word:", sound: "NICH (Night)", mnemonic: "Н (N) + І (EE) + Ч (CH) = НІЧ (Night).", wrong: ["HISH (Wolf)", "PICH (River)", "MICH (Sword)"] },
        { cyrillic: "ЧАС", speakText: "час", prompt: "Combine Ч + А + С to read this word:", sound: "CHAS (Time)", mnemonic: "Ч (CH) + А (A) + С (S) = ЧАС (Time).", wrong: ["SHAS (Step)", "KAS (Chest)", "PAS (Belt)"] }
      ]
    },

    // -------------------------------------------------------------------------
    // STAGE 4: Sibilants, Gutturals & The Soft Sign (8 Letters)
    // -------------------------------------------------------------------------
    {
      id: 4,
      roman: "IV",
      world: 1,
      stageTitle: "Dark Bog • Sibilants & Softening",
      name: "Stage 4: The Whispering Marshes",
      subtitle: "Learn the softening sign and complex whistling runes",
      enemyName: "Bog Lurker (Болотник)",
      enemyMaxHp: 85,
      enemyDamage: 24,
      enemyAttackName: "Mud Tendril Grasp",
      enemySvg: `
        <svg class="w-20 h-20" viewBox="0 0 100 120" fill="none">
          <ellipse cx="50" cy="74" rx="27" ry="32" fill="#1e293b" stroke="#475569" stroke-width="2"/>
          <circle cx="50" cy="40" r="20" fill="#334155" stroke="#64748b" stroke-width="2"/>
          <circle cx="42" cy="40" r="4" fill="#38bdf8"/>
          <circle cx="58" cy="40" r="4" fill="#38bdf8"/>
          <path d="M35 55 Q 50 65 65 55" stroke="#94a3b8" stroke-width="2"/>
        </svg>
      `,
      items: [
        { cyrillic: "Ш", speakText: "ш", sound: "SH (as in Shadow)", mnemonic: "Three pine needles — whispers 'SH' in the wind!", wrong: ["ZH (as in Treasure)", "CH (as in Chest)", "M (as in Mist)"] },
        { cyrillic: "Щ", speakText: "щ", sound: "SHCH (as in Borscht)", mnemonic: "Trident with a tail — double sound 'SHCH'!", wrong: ["SH (as in Shadow)", "CH (as in Church)", "TS (as in Cats)"] },
        { cyrillic: "З", speakText: "з", sound: "Z (as in Zero)", mnemonic: "Looks like the number 3, buzzes like a Z!", wrong: ["E (as in Echo)", "V (as in Vine)", "S (as in Sun)"] },
        { cyrillic: "Ц", speakText: "ц", sound: "TS (as in Cats)", mnemonic: "Chair with a little foot tail — makes 'TS' as in Tsunami!", wrong: ["CH (as in Church)", "SH (as in Ship)", "P (as in Pine)"] },
        { cyrillic: "Ю", speakText: "ю", sound: "YU (as in Universe)", mnemonic: "Pillar linked to a loop — sounds like 'YU'!", wrong: ["OO (as in Moon)", "YA (as in Yard)", "YO (as in Yolk)"] },
        { cyrillic: "Я", speakText: "я", sound: "YA (as in Yard) / 'I'", mnemonic: "Reversed R — means 'YA' and also the pronoun 'I'!", wrong: ["R (as in River)", "YE (as in Yes)", "YU (as in Youth)"] },
        { cyrillic: "Х", speakText: "х", sound: "KH (throaty H as in Bach)", mnemonic: "Crossing sabres — raspy throat friction 'KH'!", wrong: ["K (as in King)", "X (as in Box)", "S (as in Sun)"] },
        { cyrillic: "Ь", speakText: "м'який знак", sound: "Soft Sign (Softens consonants)", mnemonic: "Makes no sound itself; softens the letter right before it!", wrong: ["B (as in Boat)", "V (as in Vine)", "P (as in Pine)"] }
      ],
      heavyPool: [
        { cyrillic: "ДЕНЬ", speakText: "день", prompt: "How does the soft sign (Ь) change Д + Е + Н?", sound: "DEN' (Day - softened N)", mnemonic: "Д (D) + Е (E) + НЬ (soft N) = ДЕНЬ (Day)!", wrong: ["DEN (Hard N)", "DOM (House)", "DUR (Hole)"] },
        { cyrillic: "ЩО", speakText: "що", prompt: "Read this common question word using Щ:", sound: "SHCHO (What)", mnemonic: "Щ (SHCH) + О (O) = ЩО (Shcho - What)!", wrong: ["SHO (Short)", "KTO (Who)", "GDE (Where)"] },
        { cyrillic: "ЦАР", speakText: "цар", prompt: "Combine Ц + А + Р to read:", sound: "TSAR (Ruler)", mnemonic: "Ц (TS) + А (A) + Р (R) = ЦАР (Tsar).", wrong: ["CHAR (Spell)", "PAR (Steam)", "DAR (Gift)"] }
      ]
    },

    // -------------------------------------------------------------------------
    // STAGE 5: WORLD 1 FINAL CLIMAX BOSS (33-Letter Comprehensive Review)
    // -------------------------------------------------------------------------
    {
      id: 5,
      roman: "V",
      world: 1,
      stageTitle: "Ancient Beech • WORLD BOSS",
      name: "World Boss: Master of the Woods",
      subtitle: "The ultimate trial of the 33-letter Cyrillic script",
      enemyName: "Elder Lisovyk (Старий Лісовик)",
      enemyMaxHp: 130,
      enemyDamage: 28,
      enemyAttackName: "Roots of the Carpathian Oaks",
      enemySvg: `
        <svg class="w-20 h-20" viewBox="0 0 100 120" fill="none">
          <ellipse cx="50" cy="74" rx="28" ry="34" fill="#2d1f14" stroke="#78350f" stroke-width="2.5"/>
          <circle cx="50" cy="38" r="22" fill="#451a03" stroke="#92400e" stroke-width="2.5"/>
          <circle cx="41" cy="36" r="4" fill="#facc15"/>
          <circle cx="59" cy="36" r="4" fill="#facc15"/>
          <path d="M32 20 Q 15 5 10 18 Q 24 16 34 26" fill="#78350f"/>
          <path d="M68 20 Q 85 5 90 18 Q 76 16 66 26" fill="#78350f"/>
        </svg>
      `,
      items: [
        { cyrillic: "В", speakText: "в", sound: "V (as in Vine)", mnemonic: "Looks like B, speaks like V!", wrong: ["B (as in Boat)", "R (as in River)", "N (as in Nest)"] },
        { cyrillic: "Р", speakText: "р", sound: "R (rolled as in River)", mnemonic: "Looks like P, rolls like R!", wrong: ["P (as in Pine)", "B (as in Bear)", "S (as in Sun)"] },
        { cyrillic: "Ї", speakText: "ї", sound: "YI (as in Yield)", mnemonic: "Crown dots: YI sound!", wrong: ["EE (as in Meet)", "YE (as in Yes)", "YA (as in Yard)"] },
        { cyrillic: "Ж", speakText: "ж", sound: "ZH (as in Measure)", mnemonic: "The beetle rune: soft ZH!", wrong: ["SH (as in Ship)", "K (as in Key)", "CH (as in Charm)"] },
        { cyrillic: "Ґ", speakText: "ґ", sound: "Hard G (as in Goose)", mnemonic: "Upturned horn: hard G!", wrong: ["Soft H (as in Hope)", "T (as in Tree)", "K (as in King)"] },
        { cyrillic: "Щ", speakText: "щ", sound: "SHCH (as in Borscht)", mnemonic: "Tailed trident: double SHCH!", wrong: ["SH (as in Shadow)", "CH (as in Church)", "TS (as in Cats)"] },
        { cyrillic: "Я", speakText: "я", sound: "YA (as in Yard) / 'I'", mnemonic: "Reversed R: YA!", wrong: ["R (as in River)", "YE (as in Yes)", "YU (as in Youth)"] },
        { cyrillic: "Х", speakText: "х", sound: "KH (throaty H as in Bach)", mnemonic: "Crossing sabres: raspy KH!", wrong: ["K (as in King)", "X (as in Box)", "S (as in Sun)"] }
      ],
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
