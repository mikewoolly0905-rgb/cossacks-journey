/**
 * Cossack's Journey: Chronicles of the Carpathian Woods
 * MODULE: data.js - Curriculum, Bestiary, Weather, & Balance Constants
 */

window.GameData = {
  // --- CURRICULUM DATA ---
  curriculum: {
    runes: [
      { id: 'r1', symbol: 'В', name: 'Ve', sound: '/v/ as in Victory', hint: 'Sounds like English V' },
      { id: 'r2', symbol: 'Н', name: 'En', sound: '/n/ as in Night', hint: 'Looks like H, sounds like N' },
      { id: 'r3', symbol: 'Р', name: 'Er', sound: '/r/ as in Rolled R', hint: 'Looks like P, sounds like R' },
      { id: 'r4', symbol: 'І', name: 'I', sound: '/ee/ as in Meet', hint: 'Soft Ukrainian I' },
      { id: 'r5', symbol: 'Ж', name: 'Zhe', sound: '/zh/ as in Measure', hint: 'Six-legged beetle rune' },
      { id: 'r6', symbol: 'М', name: 'Em', sound: '/m/ as in Moon', hint: 'Familiar M sound' },
      { id: 'r7', symbol: 'К', name: 'Ka', sound: '/k/ as in Cossack', hint: 'Sharp K sound' },
      { id: 'r8', symbol: 'Т', name: 'Te', sound: '/t/ as in Timber', hint: 'Firm T sound' },
      { id: 'r9', symbol: 'Є', name: 'Ye', sound: '/ye/ as in Yes', hint: 'Unique Ukrainian soft E' },
      { id: 'r10', symbol: 'Ї', name: 'Yi', sound: '/yee/ as in Yield', hint: 'Double-dotted crown letter' },
      { id: 'r11', symbol: 'Ґ', name: 'Ge', sound: '/g/ as in Gold', hint: 'Turned-up horn G' },
      { id: 'r12', symbol: 'Щ', name: 'Shcha', sound: '/shch/ as in Borscht', hint: 'Tailed trident letter' },
      { id: 'r13', symbol: 'Ч', name: 'Che', sound: '/ch/ as in Church', hint: 'Cup-shaped Ch' },
      { id: 'r14', symbol: 'Ш', name: 'Sha', sound: '/sh/ as in Shadow', hint: 'Three-pronged Sh' }
    ],

    nouns: [
      { id: 'n1', word: 'Вода', translit: 'Voda', meaning: 'Water', category: 'nature' },
      { id: 'n2', word: 'Вогонь', translit: 'Vohon', meaning: 'Fire', category: 'element' },
      { id: 'n3', word: 'Мед', translit: 'Med', meaning: 'Honey', category: 'sustenance' },
      { id: 'n4', word: 'Хліб', translit: 'Khlib', meaning: 'Bread', category: 'sustenance' },
      { id: 'n5', word: 'Ніж', translit: 'Nizh', meaning: 'Dagger', category: 'tool' },
      { id: 'n6', word: 'Дім', translit: 'Dim', meaning: 'Home', category: 'shelter' },
      { id: 'n7', word: 'Ліс', translit: 'Lis', meaning: 'Forest', category: 'nature' },
      { id: 'n8', word: 'Шабля', translit: 'Shablya', meaning: 'Sabre', category: 'weapon' }
    ],

    verbs: [
      { id: 'v1', word: 'Бачу', translit: 'Bachu', meaning: 'I see', sense: 'sight' },
      { id: 'v2', word: 'Чую', translit: 'Chuyu', meaning: 'I hear', sense: 'hearing' },
      { id: 'v3', word: 'Знаю', translit: 'Znayu', meaning: 'I know', sense: 'mind' },
      { id: 'v4', word: 'Іду', translit: 'Idu', meaning: 'I walk / I go', sense: 'action' },
      { id: 'v5', word: 'Хочу', translit: 'Khochu', meaning: 'I want', sense: 'will' },
      { id: 'v6', word: 'Тримаю', translit: 'Trymayu', meaning: 'I hold', sense: 'combat' },
      { id: 'v7', word: 'Бʼю', translit: 'Byu', meaning: 'I strike', sense: 'combat' }
    ]
  },

  // --- BESTIARY & ENCOUNTER STAGES ---
  bestiary: [
    {
      stage: 1,
      id: 'chort',
      name: 'Лісовий Чорт',
      title: 'Woodland Imp',
      description: 'A nimble forest devil lurking in thickets, testing young Cossacks with quick strikes.',
      maxHp: 55,
      attackDamage: 12,
      attackInterval: 3400,
      parryWindow: 1500, // ms
      goldReward: 20,
      xpReward: 35,
      avatar: '👺',
      themeColor: '#b45309'
    },
    {
      stage: 2,
      id: 'mavka',
      name: 'Карпатська Мавка',
      title: 'Forest Nymph',
      description: 'An ethereal woodland spirit guarding the sacred groves with deceptive illusions.',
      maxHp: 80,
      attackDamage: 18,
      attackInterval: 3000,
      parryWindow: 1350,
      goldReward: 35,
      xpReward: 60,
      avatar: '🌿',
      themeColor: '#059669'
    },
    {
      stage: 3,
      id: 'lisovyk',
      name: 'Старий Лісовик',
      title: 'Carpathian Ancient',
      description: 'The ancient master of trees and stone, swinging gnarly oak clubs with unyielding force.',
      maxHp: 120,
      attackDamage: 26,
      attackInterval: 2800,
      parryWindow: 1200,
      goldReward: 60,
      xpReward: 100,
      avatar: '🗿',
      themeColor: '#4338ca'
    }
  ],

  // --- WEATHER CONDITIONS ---
  weatherModifiers: [
    { id: 'clear', name: 'Clear Starlit Night (Ясна Ніч)', icon: '✨', critBonus: 0, parryBonus: 0, note: 'Normal conditions' },
    { id: 'fog', name: 'Carpathian Mist (Карпатський Туман)', icon: '🌫️', critBonus: -0.1, parryBonus: 200, note: '+200ms Parry reaction window' },
    { id: 'storm', name: 'Mountain Gales (Гірська Буря)', icon: '⛈️', critBonus: 0.15, parryBonus: -150, note: '+15% Crit damage, faster enemy attacks' }
  ],

  // --- BALANCE CONSTANTS ---
  balance: {
    playerBaseHp: 100,
    quickStrikeDamage: 14,
    cleaveDamage: 38,
    riposteCounterDamage: 10,
    critMultiplier: 1.5,
    critTimeThresholdMs: 2000, // <2.0s triggers critical strike
    keenEdgeBonusDmg: 4,
    foresightParryWindowBonusMs: 800,
    maxPouchSlots: 3,
    elixirHealAmount: 35
  }
}
