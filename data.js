/**
 * Cossack's Journey: Chronicles of the Carpathian Woods
 * MODULE: data.js - Complete Curriculum, Weather, Codex & Bestiary Data
 */

window.WeatherData = [
  { id: 'clear', name: 'Ясна ніч (Clear Night)', icon: '🌙', bgClass: 'bg-transparent' },
  { id: 'fog', name: 'Густий туман (Mountain Fog)', icon: '🌫️', bgClass: 'bg-slate-900/40 backdrop-blur-[1px]' },
  { id: 'storm', name: 'Гроза (Carpathian Storm)', icon: '⛈️', bgClass: 'bg-indigo-950/45' }
];

window.CurriculumData = {
  tiers: [
    {
      id: 1,
      roman: "I",
      stageTitle: "Forest Edge • Околиця",
      name: "Tier 1: False Friends",
      subtitle: "Letters that look familiar but make different sounds",
      enemyName: "Shadow Chort (Тіньовий Чорт)",
      enemyMaxHp: 45,
      enemyDamage: 15,
      enemyAttackName: "Obsidian Claw Swipe",
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
        { cyrillic: "В", speakText: "в", sound: "V (as in Vine)", mnemonic: "Looks like English B, but sounds like V in Vampire!", wrong: ["B (as in Boat)", "R (as in River)", "N (as in Nest)"] },
        { cyrillic: "Н", speakText: "н", sound: "N (as in Noon)", mnemonic: "Looks like H, but crossbridge connects N as in No!", wrong: ["H (as in House)", "P (as in Path)", "M (as in Mist)"] },
        { cyrillic: "Р", speakText: "р", sound: "R (rolled R as in River)", mnemonic: "Looks like P, but rolls like R in Rocket!", wrong: ["P (as in Pine)", "B (as in Bear)", "S (as in Sun)"] },
        { cyrillic: "П", speakText: "п", sound: "P (as in Pine)", mnemonic: "Pillar portal (Greek Pi) — makes the crisp P sound!", wrong: ["N (as in Night)", "L (as in Leaf)", "T (as in Tree)"] },
        { cyrillic: "С", speakText: "с", sound: "S (soft S as in Sun)", mnemonic: "Looks like C, but is ALWAYS a hissing S sound!", wrong: ["K (as in Cat)", "CH (as in Chest)", "Z (as in Zone)"] },
        { cyrillic: "М", speakText: "м", sound: "M (as in Mountain)", mnemonic: "Twin peaks like English M — hums with a clear M sound!", wrong: ["N (as in Nest)", "L (as in Lake)", "V (as in Vine)"] },
        { cyrillic: "К", speakText: "к", sound: "K (as in Kite)", mnemonic: "Matches English K — crisp K sound!", wrong: ["R (as in River)", "H (as in Home)", "ZH (as in Measure)"] },
        { cyrillic: "Т", speakText: "т", sound: "T (as in Tree)", mnemonic: "Strong crossbar T — crisp T sound!", wrong: ["M (as in Mist)", "P (as in Path)", "G (as in Goat)"] }
      ],
      heavyPool: [
        { cyrillic: "СОН", speakText: "сон", prompt: "Blend False Friends С + О + Н into sound:", sound: "SON (Dream / Sleep)", mnemonic: "С (S) + О (O) + Н (N) = СОН (Son - Dream).", wrong: ["COH (Ash)", "PON (Bridge)", "BON (Bell)"] },
        { cyrillic: "ВОДА", speakText: "вода", prompt: "Read this word starting with False Friend В:", sound: "VODA (Water)", mnemonic: "В is V, so ВОДА sounds like Voda (Water), not Boda!", wrong: ["BODA (Stone)", "RODA (Wheel)", "NODA (Note)"] },
        { cyrillic: "ПАРК", speakText: "парк", prompt: "Combine portal П and rolled Р to read ПАРК:", sound: "PARK (Park)", mnemonic: "П (P) + А (A) + Р (R) + К (K) = ПАРК (Park)!", wrong: ["NAPK (Cloth)", "BAPK (Tower)", "SAPK (Boot)"] },
        { cyrillic: "МІСТ", speakText: "міст", prompt: "Blend М + І + С + Т into sound:", sound: "MIST (Bridge)", mnemonic: "М (M) + І (EE) + С (S) + Т (T) = МІСТ (Bridge).", wrong: ["BICT (Leaf)", "PICT (Horn)", "NICT (Thread)"] }
      ]
    },
    {
      id: 2,
      roman: "II",
      stageTitle: "Deep Pine Grove • Сосновий Гай",
      name: "Tier 2: Distinctive Ukrainian Runes",
      subtitle: "Letters unique to the Ukrainian alphabet & spirit realm",
      enemyName: "Woodland Mavka (Мавка)",
      enemyMaxHp: 65,
      enemyDamage: 20,
      enemyAttackName: "Enchanted Willow Whip",
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
        { cyrillic: "І", speakText: "і", sound: "EE (pure 'ee' as in Meet)", mnemonic: "Single dot pillar makes a clean, bright 'EE' sound.", wrong: ["EYE (as in Kite)", "YI (as in Yield)", "OO (as in Moon)"] },
        { cyrillic: "Ї", speakText: "ї", sound: "YI (as in Yield / Yeast)", mnemonic: "Uniquely Ukrainian! Two dots ALWAYS mean 'YI'.", wrong: ["EE (as in Meet)", "YE (as in Yes)", "YA (as in Yard)"] },
        { cyrillic: "Є", speakText: "є", sound: "YE (as in Yes)", mnemonic: "A crescent facing right: sounds like 'YE' in Yes!", wrong: ["YI (as in Yield)", "ZH (as in Measure)", "G (as in Goose)"] },
        { cyrillic: "Г", speakText: "г", sound: "Voiced H (as in Aha!)", mnemonic: "Warm throat breath: plain Г is a voiced H sound!", wrong: ["Hard G (as in Goat)", "R (as in River)", "P (as in Pine)"] },
        { cyrillic: "Ґ", speakText: "ґ", sound: "Hard G (as in Goose)", mnemonic: "Upturned hook on top gives it a hard G sound!", wrong: ["Soft H (as in Hope)", "T (as in Tree)", "K (as in King)"] },
        { cyrillic: "Ж", speakText: "ж", sound: "ZH (as in Treasure)", mnemonic: "Shaped like a beetle — buzzes with a soft 'ZH' sound!", wrong: ["SH (as in Ship)", "K (as in Key)", "CH (as in Charm)"] },
        { cyrillic: "Ч", speakText: "ч", sound: "CH (as in Champion)", mnemonic: "Looks like a number 4 chalice — makes a 'CH' sound!", wrong: ["SH (as in Shield)", "TS (as in Cats)", "V (as in Vine)"] },
        { cyrillic: "Ш", speakText: "ш", sound: "SH (as in Shadow)", mnemonic: "Three pine needles — whispers 'SH' like wind in trees!", wrong: ["ZH (as in Treasure)", "CH (as in Chest)", "M (as in Mist)"] }
      ],
      heavyPool: [
        { cyrillic: "КИЇВ", speakText: "Київ", prompt: "How does two-dotted Ї shape the capital's name?", sound: "KYIV (Capital of Ukraine)", mnemonic: "Ї = YI and В = V, giving КИЇВ (Kyiv)!", wrong: ["KIEV (Russian vowel)", "KUV (Crow)", "KOYV (Boat)"] },
        { cyrillic: "ГОРА", speakText: "гора", prompt: "Using Ukrainian's voiced H rune (Г), read ГОРА:", sound: "HORA (Mountain)", mnemonic: "Г (H) + О + Р (R) + А = Гора (Hora - Mountain).", wrong: ["GORA (Hard G)", "PORA (Season)", "NORA (Burrow)"] },
        { cyrillic: "НІЧ", speakText: "ніч", prompt: "Combine Н + І + Ч to read this word:", sound: "NICH (Night)", mnemonic: "Н (N) + І (EE) + Ч (CH) = НІЧ (Night).", wrong: ["HISH (Wolf)", "PICH (River)", "MICH (Sword)"] }
      ]
    },
    {
      id: 3,
      roman: "III",
      stageTitle: "Ancient Thicket • Праліс",
      name: "Tier 3: The Herbalist's Wilds",
      subtitle: "Essential Ukrainian survival nouns & alchemical ingredients",
      enemyName: "Forest Spirit (Лісовик)",
      enemyMaxHp: 85,
      enemyDamage: 26,
      enemyAttackName: "Twisted Thorn Binding",
      enemySvg: `
        <svg class="w-20 h-20" viewBox="0 0 100 120" fill="none">
          <ellipse cx="50" cy="74" rx="27" ry="32" fill="#2d1f14" stroke="#78350f" stroke-width="2"/>
          <circle cx="50" cy="40" r="20" fill="#451a03" stroke="#92400e" stroke-width="2"/>
          <circle cx="42" cy="40" r="4" fill="#a3e635"/>
          <circle cx="58" cy="40" r="4" fill="#a3e635"/>
        </svg>
      `,
      items: [
        { cyrillic: "Вода", speakText: "вода", sound: "Water (Voh-DAH)", mnemonic: "Flows from valley like a dam: Вода is Water.", wrong: ["Fire (Vohon)", "Bread (Khlib)", "Honey (Med)"] },
        { cyrillic: "Вогонь", speakText: "вогонь", sound: "Fire (Voh-HOHN')", mnemonic: "Volcano gone hot: Вогонь is Fire!", wrong: ["Water (Voda)", "Forest (Lis)", "Home (Dim)"] },
        { cyrillic: "Хліб", speakText: "хліб", sound: "Bread (Khleeb)", mnemonic: "Rough Kh sound of crusty loaf: Хліб is Bread.", wrong: ["Water (Voda)", "Cat (Kit)", "Knife (Nizh)"] },
        { cyrillic: "Мед", speakText: "мед", sound: "Honey / Mead (Med)", mnemonic: "Medicinal Mead: Мед is Honey.", wrong: ["Home (Dim)", "Cat (Kit)", "Bread (Khlib)"] },
        { cyrillic: "Дім", speakText: "дім", sound: "Home / House (Deem)", mnemonic: "Where your dream room lives: Дім is Home.", wrong: ["Forest (Lis)", "Fire (Vohon)", "Knife (Nizh)"] },
        { cyrillic: "Ніж", speakText: "ніж", sound: "Knife (Neezh)", mnemonic: "Short blade that sniches twigs: Ніж is Knife.", wrong: ["Fire (Vohon)", "Water (Voda)", "Cat (Kit)"] },
        { cyrillic: "Кіт", speakText: "кіт", sound: "Cat (Keet)", mnemonic: "Sounds like 'Keet' kitten: Кіт is Cat.", wrong: ["Bread (Khlib)", "Water (Voda)", "Forest (Lis)"] },
        { cyrillic: "Ліс", speakText: "ліс", sound: "Forest (Lees)", mnemonic: "Sounds like leaves of deep woods: Ліс is Forest.", wrong: ["Home (Dim)", "Honey (Med)", "Bread (Khlib)"] }
      ],
      heavyPool: [
        { cyrillic: "ХЛІБ І ВОДА", speakText: "хліб і вода", prompt: "Translate this essential survival ration:", sound: "Bread and Water", mnemonic: "Хліб (Bread) + і (and) + Вода (Water).", wrong: ["Home and Cat", "Honey and Fire", "Forest and Knife"] },
        { cyrillic: "ВОГОНЬ І НІЖ", speakText: "вогонь і ніж", prompt: "Translate the campsite provisions:", sound: "Fire and Knife", mnemonic: "Вогонь (Fire) + і (and) + Ніж (Knife).", wrong: ["Water and Bread", "Cat and Home", "Forest and Honey"] },
        { cyrillic: "ДІМ І ЛІС", speakText: "дім і ліс", prompt: "Translate these two places:", sound: "Home and Forest", mnemonic: "Дім (Home) + і (and) + Ліс (Forest).", wrong: ["Fire and Water", "Bread and Honey", "Cat and Knife"] }
      ]
    },
    {
      id: 4,
      roman: "IV",
      stageTitle: "Mountain Ridge • Хребет",
      name: "Tier 4: The Ranger's Path",
      subtitle: "High-frequency survival verbs & tactical reaction commands",
      enemyName: "Mountain Giant (Чугайстер)",
      enemyMaxHp: 110,
      enemyDamage: 32,
      enemyAttackName: "Whirlwind Trepak Dance",
      enemySvg: `
        <svg class="w-20 h-20" viewBox="0 0 100 120" fill="none">
          <path d="M22 115 L32 45 L50 32 L68 45 L78 115 Z" fill="#451a03" stroke="#b45309" stroke-width="2.5"/>
          <circle cx="42" cy="52" r="4" fill="#38bdf8"/>
          <circle cx="58" cy="52" r="4" fill="#38bdf8"/>
          <path d="M36 70 Q 50 85 64 70" stroke="#fef3c7" stroke-width="4" stroke-linecap="round"/>
        </svg>
      `,
      items: [
        { cyrillic: "Бачу", speakText: "бачу", sound: "I see (BAH-choo)", mnemonic: "Binoculars: Ba-chu spots approaching spirits!", wrong: ["I hear (Chuyu)", "I walk (Idu)", "I want (Khochu)"] },
        { cyrillic: "Чую", speakText: "чую", sound: "I hear (CHOO-yoo)", mnemonic: "Chew quietly so you hear forest footsteps!", wrong: ["I see (Bachu)", "I know (Znayu)", "I go (Idu)"] },
        { cyrillic: "Знаю", speakText: "знаю", sound: "I know (ZNAH-yoo)", mnemonic: "Signals truth in mind: Знаю means 'I know'.", wrong: ["I see (Bachu)", "I want (Khochu)", "Thank you (Dyakuyu)"] },
        { cyrillic: "Іду", speakText: "іду", sound: "I go / walk (Ee-DOO)", mnemonic: "I 'do' walk the mountain trail: Іду is 'I walk'.", wrong: ["I see (Bachu)", "I hear (Chuyu)", "Hello (Pryvit)"] },
        { cyrillic: "Хочу", speakText: "хочу", sound: "I want (KHOH-choo)", mnemonic: "Craving hot food by the fire: Хочу is 'I want'.", wrong: ["I know (Znayu)", "I see (Bachu)", "I walk (Idu)"] },
        { cyrillic: "Привіт", speakText: "привіт", sound: "Hello (Pry-VEET)", mnemonic: "Friendly greeting on the trail: Привіт means Hello!", wrong: ["Thank you (Dyakuyu)", "I hear (Chuyu)", "I go (Idu)"] },
        { cyrillic: "Дякую", speakText: "дякую", sound: "Thank you (DYAH-koo-yoo)", mnemonic: "A warm dialogue of gratitude: Дякую is Thank you!", wrong: ["Hello (Pryvit)", "I want (Khochu)", "I know (Znayu)"] }
      ],
      heavyPool: [
        { cyrillic: "Я БАЧУ І ЧУЮ", speakText: "я бачу і чую", prompt: "Translate the scout's sensory report:", sound: "I see and I hear", mnemonic: "Я (I) + бачу (see) + і (and) + чую (hear).", wrong: ["I know and I want", "I go into house", "Hello and thank you"] },
        { cyrillic: "Я ЗНАЮ ЦЕЙ ЛІС", speakText: "я знаю цей ліс", prompt: "Declare knowledge of the mountains:", sound: "I know this forest", mnemonic: "Я (I) + знаю (know) + цей (this) + ліс (forest).", wrong: ["I want fresh bread", "I walk to water", "Thank you friend"] },
        { cyrillic: "Я ХОЧУ ХЛІБ І МЕД", speakText: "я хочу хліб і мед", prompt: "Translate the traveller's request:", sound: "I want bread and honey", mnemonic: "Я хочу (I want) + хліб (bread) + і (and) + мед (honey).", wrong: ["I see fire and water", "I know the cat", "Hello dark forest"] }
      ]
    }
  ]
};

window.CodexData = {
  beasts: [
    { name: "Чорт (Chort)", pronounce: "chort", epithet: "Woodland Trickster Spirit", icon: "🐐", lore: "In Slavic folklore, the Chort is a cunning horned prankster of thickets and bogs. He confuses travellers by mimicking wind murmurs." },
    { name: "Мавка (Mavka)", pronounce: "mavka", epithet: "Guardian of Birch Groves", icon: "🌿", lore: "Immortalized in Lesya Ukrainka's 'The Forest Song', Mavkas are emerald-haired spirits bound to mountain waters and birch trees." },
    { name: "Лісовик (Lisovyk)", pronounce: "lisovyk", epithet: "Master of Primeval Woods", icon: "🌲", lore: "The ancient keeper of the beech trees. He guards timber wolves and tests woodsmen with thorny labyrinths." },
    { name: "Чугайстер (Chuhayster)", pronounce: "chuhayster", epithet: "Dancing Forest Giant", icon: "🏔️", lore: "A tall, merry mountain giant who protects wanderers by firelight and challenges travellers to lively Trepak dances." }
  ],
  sacred: [
    { name: "Хліб-Сіль (Bread & Salt)", pronounce: "khlib sil", epithet: "Sacred Covenant of Hospitality", icon: "🍞", lore: "Bread signifies life, sustenance, and light; salt wards against dark witchcraft. Offering them seals an unbreakable oath." },
    { name: "Цвіт Папороті (Fern Flower)", pronounce: "tsvit paporoti", epithet: "Kupala Night Miracle Bloom", icon: "🌸", lore: "A mythical golden bloom that opens for a single second at midnight on Kupala Night, granting power to understand all speech." }
  ]
};
