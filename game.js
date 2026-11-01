/**
 * Cossack's Journey: Chronicles of the Carpathian Woods
 * MODULE: game.js - Stable Combat & Ritual Engine
 */

const DevSettings = {
  isDevMode: true,
  godMode: false,
  overrideEnemyDamage: null
};

const TimerManager = {
  activeIds: new Set(),
  activeRafs: new Set(),

  set(callback, delay) {
    const id = setTimeout(() => {
      this.activeIds.delete(id);
      callback();
    }, delay);
    this.activeIds.add(id);
    return id;
  },

  clearAll() {
    this.activeIds.forEach(id => clearTimeout(id));
    this.activeIds.clear();
    this.activeRafs.forEach(id => cancelAnimationFrame(id));
    this.activeRafs.clear();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
};

const AudioEngine = {
  ctx: null,
  enabled: true,
  ukVoice: null,
  useLocalAudio: false, // Set to true once you drop your recorded .mp3/.wav files into /audio

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    this.initVoices();
  },

  initVoices() {
    if (!('speechSynthesis' in window)) return;

    const findVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      if (!voices || voices.length === 0) return;

      // 1. Primary: Exact Ukrainian voice
      this.ukVoice = voices.find(v => v.lang && (v.lang.toLowerCase().startsWith('uk') || v.lang.includes('UA')));

      // 2. Fallback: If device lacks Ukrainian (common on iOS / Windows),
      // fallback to an available Slavic/Eastern voice, or system default
      // rather than failing silently with zero audio.
      if (!this.ukVoice) {
        this.ukVoice = voices.find(v => v.lang && v.lang.startsWith('ru')) || 
                       voices.find(v => v.default) || 
                       voices[0];
      }
    };

    findVoice();
    if ('onvoiceschanged' in window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = findVoice;
    }
  },

  playTone(freq, type = 'sine', duration = 0.15, vol = 0.2) {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(vol, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {}
  },

  whetstoneSpark() {
    this.playTone(880, 'triangle', 0.1, 0.25);
    TimerManager.set(() => this.playTone(1200, 'sawtooth', 0.12, 0.2), 40);
  },

  strike() {
    this.playTone(480, 'triangle', 0.12, 0.25);
    TimerManager.set(() => this.playTone(240, 'sawtooth', 0.14, 0.2), 50);
  },

  critStrike() {
    this.playTone(523, 'triangle', 0.12, 0.3);
    TimerManager.set(() => this.playTone(784, 'triangle', 0.14, 0.35), 55);
    TimerManager.set(() => this.playTone(1046, 'sawtooth', 0.22, 0.4), 110);
  },

  heavyStrike() {
    this.playTone(600, 'triangle', 0.18, 0.3);
    TimerManager.set(() => this.playTone(300, 'sawtooth', 0.22, 0.3), 60);
    TimerManager.set(() => this.playTone(150, 'sawtooth', 0.28, 0.35), 120);
  },

  parryBlock() {
    this.playTone(520, 'square', 0.08, 0.2);
    TimerManager.set(() => this.playTone(680, 'triangle', 0.15, 0.22), 45);
  },

  parryRiposte() {
    this.playTone(700, 'square', 0.09, 0.25);
    TimerManager.set(() => this.playTone(920, 'triangle', 0.18, 0.3), 50);
    TimerManager.set(() => this.playTone(1250, 'sine', 0.25, 0.35), 110);
  },

  heal() {
    [330, 440, 554, 660].forEach((f, i) => {
      TimerManager.set(() => this.playTone(f, 'sine', 0.18, 0.18), i * 60);
    });
  },

  scrollChime() {
    [523, 659, 784].forEach((f, i) => {
      TimerManager.set(() => this.playTone(f, 'triangle', 0.15, 0.16), i * 60);
    });
  },

  wrong() {
    this.playTone(165, 'sawtooth', 0.18, 0.25);
    TimerManager.set(() => this.playTone(125, 'sawtooth', 0.22, 0.25), 80);
  },

  victory() {
    [392, 523, 659, 784].forEach((f, i) => {
      TimerManager.set(() => this.playTone(f, 'triangle', 0.22, 0.22), i * 110);
    });
  },

  pronounce(text, audioFileKey = null) {
    if (!this.enabled) return;
    this.playTone(528, 'sine', 0.08, 0.08);

    if (this.useLocalAudio) {
      const cleanKey = (audioFileKey || text).toString().trim().toLowerCase();
      const sound = new Audio(`audio/${encodeURIComponent(cleanKey)}.mp3`);
      sound.playsInline = true;

      sound.play().catch(() => {
        this.fallbackSpeechSynthesis(text);
      });
      return;
    }

    this.fallbackSpeechSynthesis(text);
  },

  fallbackSpeechSynthesis(text) {
    if (!('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();

      const cleanText = String(text).replace(/\s*\/\s*/g, ', ');
      const utter = new SpeechSynthesisUtterance(cleanText);

      if (this.ukVoice) {
        utter.voice = this.ukVoice;
        utter.lang = this.ukVoice.lang || 'uk-UA';
      } else {
        utter.lang = 'uk-UA';
      }

      utter.rate = 0.85;
      utter.pitch = 1.0;
      utter.volume = 1.0;

      window.speechSynthesis.speak(utter);
    } catch (e) {
      console.warn("SpeechSynthesis error:", e);
    }
  }
};

const DeckManager = {
  bags: {},

  shuffle(arr) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  },

  draw(bagId, items) {
    if (!items || items.length === 0) return null;
    if (!this.bags[bagId] || this.bags[bagId].length === 0) {
      this.bags[bagId] = this.shuffle(items);
    }
    return this.bags[bagId].shift();
  }
};

const GameState = {
  playerHp: 100,
  maxPlayerHp: 100,
  xp: 0,
  unlockedTier: 1,
  selectedTierId: 1,
  pouch: ['elixir'],
  focusCharges: 0,

  buffKeenEdge: false,
  buffKeenEdgeStrikesLeft: 0,
  buffForesight: false,

  load() {
    try {
      const raw = localStorage.getItem('cossack_rpg_p3_save');
      if (raw) {
        const data = JSON.parse(raw);
        if (typeof data.playerHp === 'number') this.playerHp = Math.max(1, Math.min(100, data.playerHp));
        if (typeof data.xp === 'number') this.xp = data.xp;
        const maxAvailableTiers = (window.CurriculumData && CurriculumData.tiers) ? CurriculumData.tiers.length : 5;
        if (typeof data.unlockedTier === 'number') this.unlockedTier = Math.min(maxAvailableTiers, Math.max(1, data.unlockedTier));
        if (typeof data.selectedTierId === 'number') this.selectedTierId = Math.min(this.unlockedTier, Math.max(1, data.selectedTierId));
        if (Array.isArray(data.pouch)) this.pouch = data.pouch.slice(0, 3);
      }
    } catch (e) {}
    this.syncUI();
  },

  save() {
    try {
      localStorage.setItem('cossack_rpg_p3_save', JSON.stringify({
        playerHp: this.playerHp,
        xp: this.xp,
        unlockedTier: this.unlockedTier,
        selectedTierId: this.selectedTierId,
        pouch: this.pouch
      }));
    } catch (e) {}
    this.syncUI();
  },

  reset() {
    this.playerHp = 100;
    this.xp = 0;
    this.unlockedTier = 1;
    this.selectedTierId = 1;
    this.pouch = ['elixir'];
    this.focusCharges = 0;
    this.buffKeenEdge = false;
    this.buffKeenEdgeStrikesLeft = 0;
    this.buffForesight = false;
    this.save();
  },

  addXp(val) {
    this.xp += val;
    this.save();
  },

  getLevel() {
    return Math.floor(this.xp / 60) + 1;
  },

  getLevelPct() {
    return Math.min(100, Math.round(((this.xp % 60) / 60) * 100));
  },

  addItem(item) {
    if (this.pouch.length >= 3) return false;
    this.pouch.push(item);
    this.save();
    return true;
  },

  removeItem(index) {
    if (index >= 0 && index < this.pouch.length) {
      this.pouch.splice(index, 1);
      this.save();
      return true;
    }
    return false;
  },

  consumeItem(type) {
    const idx = this.pouch.indexOf(type);
    if (idx !== -1) {
      this.pouch.splice(idx, 1);
      this.save();
      return true;
    }
    return false;
  },

  getCounts() {
    const elixirs = this.pouch.filter(x => x === 'elixir').length;
    const scrolls = this.pouch.filter(x => x === 'scroll').length;
    return { elixirs, scrolls, total: this.pouch.length };
  },

  setFocus(val) {
    this.focusCharges = Math.max(0, Math.min(2, val));
    this.renderFocusPips();

    if (this.focusCharges >= 2) {
      CombatEngine.switchTab('heavy', true);
    }
  },

  renderFocusPips() {
    const lbl = document.getElementById('lbl-focus-count');
    if (lbl) lbl.textContent = `${this.focusCharges}/2 Charges`;

    for (let i = 1; i <= 2; i++) {
      const pip = document.getElementById(`focus-pip-${i}`);
      if (!pip) continue;
      if (i <= this.focusCharges) {
        pip.className = "w-5 h-5 rounded-md border border-amber-400 bg-amber-500 text-stone-950 font-bold flex items-center justify-center text-[10px] shadow-[0_0_8px_rgba(245,158,11,0.8)]";
      } else {
        pip.className = "w-5 h-5 rounded-md border border-stone-700 bg-stone-900 flex items-center justify-center text-[10px] text-stone-600 font-bold";
      }
    }

    const quickTab = document.getElementById('btn-tab-quick');
    const heavyTab = document.getElementById('btn-tab-heavy');
    const heavySub = document.getElementById('tab-heavy-sublabel');
    const quickSub = document.getElementById('tab-quick-sublabel');

    if (heavyTab && heavySub) {
      if (this.focusCharges >= 2) {
        heavyTab.disabled = false;
        heavySub.textContent = "READY! (30 DMG)";
        heavySub.className = "text-[9px] font-mono text-amber-300 font-bold animate-pulse";
        heavyTab.className = "tactical-tab border-2 border-amber-400 bg-amber-950 text-amber-100 py-1.5 px-1 rounded-xl text-xs font-fantasy font-bold flex flex-col items-center transition-all shadow cursor-pointer";

        if (quickTab && quickSub) {
          quickTab.disabled = true;
          quickTab.className = "tactical-tab border-2 border-stone-800 bg-stone-950/40 text-stone-600 opacity-50 cursor-not-allowed py-1.5 px-1 rounded-xl text-xs font-fantasy font-bold flex flex-col items-center transition-all";
          quickSub.textContent = "Locked (Cleave Ready)";
        }
      } else {
        if (CombatEngine.tier && CombatEngine.activeTab === 'heavy') {
          CombatEngine.switchTab('quick');
        }
        heavyTab.disabled = true;
        heavySub.textContent = `Locked (${this.focusCharges}/2 ⚡)`;
        heavySub.className = "text-[9px] font-mono text-stone-500";
        heavyTab.className = "tactical-tab border-2 border-stone-800 bg-stone-950/50 text-stone-600 opacity-60 cursor-not-allowed py-1.5 px-1 rounded-xl text-xs font-fantasy font-bold flex flex-col items-center transition-all shadow";

        if (quickTab && quickSub) {
          quickTab.disabled = false;
          quickSub.textContent = "+1 Focus • 10 DMG";
        }
      }
    }
  },

  syncUI() {
    document.getElementById('header-level-badge').textContent = `LVL ${this.getLevel()}`;
    document.getElementById('player-banner-xp').textContent = `${this.xp} XP`;
    document.getElementById('header-xp-bar').style.width = `${this.getLevelPct()}%`;

    const counts = this.getCounts();
    document.getElementById('pouch-count-label').textContent = `${counts.total}/3`;

    this.renderPouchSlots('camp-pouch-slots');
    this.renderPouchSlots('cauldron-pouch-slots');
    this.renderCampStageCards();
    this.renderFocusPips();
    this.renderReadinessBadges();

    const tier = (window.CurriculumData && CurriculumData.tiers)
      ? (CurriculumData.tiers.find(t => t.id === this.selectedTierId) || CurriculumData.tiers[0])
      : { roman: 'I' };
    document.getElementById('lbl-fight-stage').textContent = tier.roman;
    document.getElementById('god-mode-indicator').classList.toggle('hidden', !DevSettings.godMode);
  },

  renderReadinessBadges() {
    const edgeBadge = document.getElementById('buff-keen-edge-badge');
    const foresightBadge = document.getElementById('buff-foresight-badge');
    const scoreLabel = document.getElementById('camp-readiness-score');

    let buffsCount = 0;
    if (this.buffKeenEdge) {
      buffsCount++;
      edgeBadge.className = "flex items-center gap-1.5 p-1.5 rounded-xl border border-amber-600 bg-amber-950/70 text-amber-300 font-bold";
      edgeBadge.innerHTML = "<span>⚔️</span><span>Keen Edge (+4 DMG)</span>";
    } else {
      edgeBadge.className = "flex items-center gap-1.5 p-1.5 rounded-xl border border-stone-800 bg-stone-900/50 text-stone-500";
      edgeBadge.innerHTML = "<span>⚔️</span><span>Blade: Dull</span>";
    }

    if (this.buffForesight) {
      buffsCount++;
      foresightBadge.className = "flex items-center gap-1.5 p-1.5 rounded-xl border border-sky-600 bg-sky-950/70 text-sky-300 font-bold";
      foresightBadge.innerHTML = "<span>👁️</span><span>Foresight Active</span>";
    } else {
      foresightBadge.className = "flex items-center gap-1.5 p-1.5 rounded-xl border border-stone-800 bg-stone-900/50 text-stone-500";
      foresightBadge.innerHTML = "<span>👁️</span><span>Scout: Blind</span>";
    }

    if (buffsCount === 2) {
      scoreLabel.textContent = "⚔️ Fully Armed (+2 Buffs)";
      scoreLabel.className = "text-[10px] font-mono bg-amber-950 text-amber-300 px-2 py-0.5 rounded border border-amber-600 font-bold";
    } else if (buffsCount === 1) {
      scoreLabel.textContent = "🛡️ Partially Ready (+1 Buff)";
      scoreLabel.className = "text-[10px] font-mono bg-stone-900 text-amber-400 px-2 py-0.5 rounded border border-stone-700";
    } else {
      scoreLabel.textContent = "Unprepared";
      scoreLabel.className = "text-[10px] font-mono bg-stone-900 text-stone-400 px-2 py-0.5 rounded border border-stone-800";
    }
  },

  renderPouchSlots(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';

    for (let i = 0; i < 3; i++) {
      const item = this.pouch[i];
      const slot = document.createElement('div');
      if (item) {
        const isElixir = item === 'elixir';
        slot.className = `relative flex items-center gap-1 px-2 py-1 rounded-lg border text-xs font-mono ${
          isElixir ? 'bg-emerald-950/80 border-emerald-600 text-emerald-200' : 'bg-sky-950/80 border-sky-600 text-sky-200'
        }`;
        slot.innerHTML = `
          <span>${isElixir ? '🧪' : '📜'}</span>
          <button data-idx="${i}" title="Discard" class="btn-discard text-[10px] text-stone-400 hover:text-rose-400 font-bold ml-0.5">×</button>
        `;
      } else {
        slot.className = "w-8 h-7 rounded-lg border border-dashed border-stone-700 bg-stone-900/50 flex items-center justify-center text-[10px] text-stone-600 font-mono";
        slot.textContent = "—";
      }
      container.appendChild(slot);
    }

    container.querySelectorAll('.btn-discard').forEach(b => {
      b.addEventListener('click', (e) => {
        e.stopPropagation();
        this.removeItem(parseInt(b.getAttribute('data-idx'), 10));
      });
    });
  },

  renderCampStageCards() {
    const container = document.getElementById('camp-stages-container');
    if (!container) return;
    container.innerHTML = '';

    if (!window.CurriculumData || !CurriculumData.tiers) return;

    CurriculumData.tiers.forEach(tier => {
      const isUnlocked = tier.id <= this.unlockedTier;
      const isSelected = tier.id === this.selectedTierId;
      const effectiveDmg = DevSettings.overrideEnemyDamage !== null ? DevSettings.overrideEnemyDamage : tier.enemyDamage;

      const card = document.createElement('div');
      card.className = `rounded-xl p-2.5 transition-all flex items-center justify-between border ${
        !isUnlocked
          ? 'border-stone-800/80 bg-stone-950/40 opacity-55 cursor-not-allowed'
          : isSelected
            ? 'border-amber-500 bg-amber-950/35 shadow-md cursor-pointer'
            : 'border-stone-800 bg-stone-950/80 hover:border-amber-700/70 cursor-pointer'
      }`;

      card.innerHTML = `
        <div class="flex items-center gap-2.5 min-w-0">
          <div class="w-8 h-8 rounded-lg shrink-0 flex items-center justify-center font-fantasy font-bold text-xs border ${
            !isUnlocked ? 'bg-stone-900 border-stone-800 text-stone-500' : isSelected ? 'bg-amber-600 border-amber-400 text-stone-950' : 'bg-amber-950 border-amber-700 text-amber-400'
          }">
            ${tier.roman}
          </div>
          <div class="min-w-0">
            <h3 class="font-fantasy font-bold text-xs text-stone-100 truncate">${tier.stageTitle}</h3>
            <p class="text-[10px] text-stone-400 truncate">${tier.enemyName} • ${effectiveDmg} DMG</p>
          </div>
        </div>
        <span class="text-[10px] font-mono px-2 py-0.5 rounded border ${
          !isUnlocked ? 'bg-stone-900 border-stone-800 text-stone-500' : isSelected ? 'bg-emerald-950 border-emerald-600 text-emerald-300 font-bold' : 'bg-stone-900 border-stone-700 text-stone-300'
        }">
          ${!isUnlocked ? 'Locked' : isSelected ? 'Active' : 'Choose'}
        </span>
      `;

      if (isUnlocked) {
        card.addEventListener('click', () => {
          this.selectedTierId = tier.id;
          this.save();
        });
      }
      container.appendChild(card);
    });
  }
};

const RitualSystem = {
  whetstoneStep: 0,
  whetstoneCurrentItem: null,
  whetstoneBusy: false,

  cauldronType: 'elixir',
  cauldronStep: 0,
  cauldronCurrentItem: null,
  cauldronBusy: false,

  scoutStep: 0,
  scoutCurrentItem: null,
  scoutBusy: false,

  openWhetstone() {
    this.whetstoneStep = 0;
    this.whetstoneBusy = false;
    this.nextWhetstoneRune();
  },

  updateWhetstonePips() {
    for (let i = 1; i <= 3; i++) {
      const pip = document.getElementById(`whetstone-pip-${i}`);
      if (!pip) continue;
      if (i <= this.whetstoneStep) {
        pip.className = "w-7 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.8)]";
      } else {
        pip.className = "w-7 h-2 rounded-full bg-stone-800";
      }
    }
  },

  nextWhetstoneRune() {
    this.whetstoneBusy = false;
    this.updateWhetstonePips();

    const activeTier = CurriculumData.tiers.find(t => t.id === GameState.selectedTierId) || CurriculumData.tiers[0];
    const item = DeckManager.draw(`whetstone_${activeTier.id}`, activeTier.items);
    this.whetstoneCurrentItem = item;

    document.getElementById('whetstone-target-rune').textContent = item.cyrillic;
    document.getElementById('whetstone-feedback').textContent = '';

    const options = DeckManager.shuffle([item.sound, ...item.wrong.slice(0, 3)]);
    const grid = document.getElementById('whetstone-choices-grid');
    grid.innerHTML = '';

    options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = "whetstone-opt-btn py-2.5 px-2 text-xs font-fantasy font-bold rounded-xl border border-stone-700 bg-stone-800 hover:bg-stone-700 text-stone-100 active:scale-95 transition-all";
      btn.textContent = opt;
      btn.addEventListener('click', () => this.resolveWhetstoneChoice(opt, item, btn));
      grid.appendChild(btn);
    });
  },

  resolveWhetstoneChoice(selectedText, item, btn) {
    if (this.whetstoneBusy) return;
    this.whetstoneBusy = true;

    document.querySelectorAll('.whetstone-opt-btn').forEach(b => b.disabled = true);
    const feedback = document.getElementById('whetstone-feedback');

    if (selectedText === item.sound) {
      AudioEngine.whetstoneSpark();
      AudioEngine.pronounce(item.speakText || item.cyrillic);
      btn.className = "whetstone-opt-btn py-2.5 px-2 text-xs font-fantasy font-bold rounded-xl border-2 border-amber-400 bg-amber-950 text-amber-200";

      this.whetstoneStep++;
      this.updateWhetstonePips();

      if (this.whetstoneStep >= 3) {
        GameState.buffKeenEdge = true;
        GameState.buffKeenEdgeStrikesLeft = 3;
        GameState.addXp(15);
        feedback.textContent = "⚔️ Blade Honed! 'Гостре лезо' active (+4 DMG next 3 hits)!";
        feedback.className = "text-xs font-mono mt-3 min-h-[22px] font-bold text-amber-300";
        TimerManager.set(() => {
          ViewRouter.show('view-camp');
        }, 1300);
      } else {
        feedback.textContent = `Steel sparks! Stroke ${this.whetstoneStep}/3 complete.`;
        feedback.className = "text-xs font-mono mt-3 min-h-[22px] font-bold text-amber-400";
        TimerManager.set(() => this.nextWhetstoneRune(), 750);
      }
    } else {
      AudioEngine.wrong();
      this.whetstoneStep = Math.max(0, this.whetstoneStep - 1);
      this.updateWhetstonePips();
      btn.className = "whetstone-opt-btn py-2.5 px-2 text-xs font-fantasy font-bold rounded-xl border border-rose-600 bg-rose-950 text-rose-200 line-through opacity-75";
      feedback.textContent = `Blade slipped (-1 stroke)! Tip: ${item.mnemonic}`;
      feedback.className = "text-xs font-mono mt-3 min-h-[22px] font-bold text-rose-400";
      TimerManager.set(() => this.nextWhetstoneRune(), 1400);
    }
  },

  openCauldron() {
    this.cauldronStep = 0;
    this.cauldronBusy = false;
    this.nextCauldronHerb();
  },

  updateCauldronPips() {
    document.getElementById('cauldron-step-badge').textContent = `Ingredient ${Math.min(3, this.cauldronStep + 1)} of 3`;
    for (let i = 1; i <= 3; i++) {
      const pip = document.getElementById(`cauldron-pip-${i}`);
      if (!pip) continue;
      if (i <= this.cauldronStep) {
        pip.className = "h-1.5 rounded-full bg-emerald-400";
      } else {
        pip.className = "h-1.5 rounded-full bg-stone-800";
      }
    }
  },

  nextCauldronHerb() {
    this.cauldronBusy = false;
    this.updateCauldronPips();

    const activeTier = CurriculumData.tiers.find(t => t.id === GameState.selectedTierId) || CurriculumData.tiers[0];
    const herbsPool = activeTier.items;
    const item = DeckManager.draw(`cauldron_${activeTier.id}`, herbsPool);
    this.cauldronCurrentItem = item;

    document.getElementById('cauldron-prompt-word').textContent = item.cyrillic;
    document.getElementById('cauldron-status-msg').textContent = '';

    const options = DeckManager.shuffle([item.sound, ...item.wrong.slice(0, 3)]);
    const grid = document.getElementById('cauldron-choice-grid');
    grid.innerHTML = '';

    options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = "cauldron-opt-btn py-2.5 px-2 text-xs font-fantasy font-bold rounded-xl border border-emerald-900/70 bg-stone-900 hover:bg-emerald-950/60 text-stone-100 active:scale-95 transition-all";
      btn.textContent = opt;
      btn.addEventListener('click', () => this.resolveCauldronChoice(opt, item, btn));
      grid.appendChild(btn);
    });
  },

  resolveCauldronChoice(selectedText, item, btn) {
    if (this.cauldronBusy) return;
    this.cauldronBusy = true;

    document.querySelectorAll('.cauldron-opt-btn').forEach(b => b.disabled = true);
    const msg = document.getElementById('cauldron-status-msg');

    if (selectedText === item.sound) {
      AudioEngine.pronounce(item.speakText || item.cyrillic);
      btn.className = "cauldron-opt-btn py-2.5 px-2 text-xs font-fantasy font-bold rounded-xl border-2 border-emerald-400 bg-emerald-950 text-emerald-200";

      this.cauldronStep++;
      this.updateCauldronPips();

      if (this.cauldronStep >= 3) {
        AudioEngine.heal();
        const added = GameState.addItem(this.cauldronType);
        const itemName = this.cauldronType === 'elixir' ? 'Healing Elixir (+35 HP)' : 'Scroll of Clarity';
        if (added) {
          GameState.addXp(12);
          msg.textContent = `✨ Bottled ${itemName} into Belt Pouch! (+12 XP)`;
          msg.className = "text-xs font-mono mt-3 min-h-[22px] font-bold text-emerald-400";
        } else {
          msg.textContent = `🎒 Belt Pouch full (3/3)! Free a slot below to bottle.`;
          msg.className = "text-xs font-mono mt-3 min-h-[22px] font-bold text-amber-400";
        }
        TimerManager.set(() => {
          this.cauldronStep = 0;
          this.nextCauldronHerb();
        }, 1300);
      } else {
        AudioEngine.strike();
        msg.textContent = `Herb added (${this.cauldronStep}/3)! Next ingredient...`;
        msg.className = "text-xs font-mono mt-3 min-h-[22px] font-bold text-emerald-300";
        TimerManager.set(() => this.nextCauldronHerb(), 750);
      }
    } else {
      AudioEngine.wrong();
      this.cauldronStep = 0;
      this.updateCauldronPips();
      btn.className = "cauldron-opt-btn py-2.5 px-2 text-xs font-fantasy font-bold rounded-xl border border-rose-600 bg-rose-950 text-rose-200 line-through opacity-75";
      msg.textContent = `Mixture spoiled (reset to 0/3)! ${item.mnemonic}`;
      msg.className = "text-xs font-mono mt-3 min-h-[22px] font-bold text-rose-400";
      TimerManager.set(() => this.nextCauldronHerb(), 1400);
    }
  },

  openScout() {
    this.scoutStep = 0;
    this.scoutBusy = false;
    this.scoutFails = 0;
    this.scoutResolved = false;
    this.nextScoutVerb();
  },

  updateScoutPips() {
    for (let i = 1; i <= 3; i++) {
      const pip = document.getElementById(`scout-pip-${i}`);
      if (!pip) continue;
      if (i <= this.scoutStep) {
        pip.className = "w-7 h-2 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]";
      } else {
        pip.className = "w-7 h-2 rounded-full bg-stone-800";
      }
    }
  },

  nextScoutVerb() {
    if (this.scoutResolved) return;
    this.scoutBusy = false;
    this.scoutFails = 0;
    this.updateScoutPips();

    const activeTier = CurriculumData.tiers.find(t => t.id === GameState.selectedTierId) || CurriculumData.tiers[0];
    const pool = activeTier.items;
    const item = DeckManager.draw(`scout_${activeTier.id}`, pool);
    this.scoutCurrentItem = item;

    document.getElementById('scout-prompt-verb').textContent = item.cyrillic;
    document.getElementById('scout-status-msg').textContent = '';

    const options = DeckManager.shuffle([item.sound, ...item.wrong.slice(0, 3)]);
    const grid = document.getElementById('scout-choice-grid');
    grid.innerHTML = '';

    options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = "scout-opt-btn py-2.5 px-2 text-xs font-fantasy font-bold rounded-xl border border-sky-900/70 bg-stone-900 hover:bg-sky-950/60 text-stone-100 active:scale-95 transition-all";
      btn.textContent = opt;
      btn.addEventListener('click', () => this.resolveScoutChoice(opt, item, btn));
      grid.appendChild(btn);
    });
  },

  resolveScoutChoice(selectedText, item, btn) {
    if (this.scoutBusy || this.scoutResolved) return;
    this.scoutBusy = true;

    document.querySelectorAll('.scout-opt-btn').forEach(b => b.disabled = true);
    const msg = document.getElementById('scout-status-msg');

    if (selectedText === item.sound) {
      AudioEngine.pronounce(item.speakText || item.cyrillic);
      btn.className = "scout-opt-btn py-2.5 px-2 text-xs font-fantasy font-bold rounded-xl border-2 border-sky-400 bg-sky-950 text-sky-200";

      this.scoutStep++;
      this.updateScoutPips();

      if (this.scoutStep >= 3) {
        this.scoutResolved = true;
        GameState.buffForesight = true;
        GameState.addXp(15);
        msg.textContent = "👁️ Forest Scouted! 'Передбачення' active (Enemy Intent Revealed)!";
        msg.className = "text-xs font-mono mt-3 min-h-[22px] font-bold text-sky-300";
        TimerManager.set(() => {
          ViewRouter.show('view-camp');
        }, 1300);
      } else {
        msg.textContent = `Branches crack! Instinct ${this.scoutStep}/3 sharpened.`;
        msg.className = "text-xs font-mono mt-3 min-h-[22px] font-bold text-sky-300";
        TimerManager.set(() => this.nextScoutVerb(), 750);
      }
    } else {
      btn.className = "scout-opt-btn py-2.5 px-2 text-xs font-fantasy font-bold rounded-xl border border-rose-800 bg-rose-950/50 text-rose-300/40 cursor-not-allowed line-through";
      AudioEngine.wrong();

      this.scoutFails = (this.scoutFails || 0) + 1;

      if (this.scoutFails >= 2) {
        this.scoutResolved = true;
        msg.textContent = "Сліди загублено! Trail went cold in the thicket. No Foresight buff granted.";
        msg.className = "text-xs font-mono mt-3 min-h-[22px] font-bold text-rose-400";
        TimerManager.set(() => {
          ViewRouter.show('view-camp');
        }, 1500);
      } else {
        msg.textContent = `Shadows shift! Drawing new trail (1 attempt left). Tip: ${item.mnemonic}`;
        msg.className = "text-xs font-mono mt-3 min-h-[22px] font-bold text-amber-400";
        TimerManager.set(() => this.nextScoutVerb(), 1400);
      }
    }
  }
};

const CombatEngine = {
  tier: null,
  weather: null,
  playerHp: 100,
  playerMaxHp: 100,
  enemyHp: 75,
  enemyMaxHp: 75,
  turnNumber: 1,
  playerActionsSinceParry: 0,
  phase: 'IDLE',
  activeTab: 'quick',
  lastAttackTab: 'quick',
  isDazedDebuff: false,
  streak: 0,
  maxStreak: 4,

  lockedChallenges: {
    quick: null,
    heavy: null,
    parry: null
  },

  getEffectiveEnemyDamage() {
    if (DevSettings.overrideEnemyDamage !== null) {
      return DevSettings.overrideEnemyDamage;
    }
    return this.tier ? this.tier.enemyDamage : 12;
  },

  startBattle(tierId) {
    TimerManager.clearAll();
    const targetTier = CurriculumData.tiers.find(t => t.id === tierId) || CurriculumData.tiers[0];
    this.tier = targetTier;

    this.weather = WeatherData[Math.floor(Math.random() * WeatherData.length)];
    this.applyWeather();

    this.playerMaxHp = 100;
    this.playerHp = GameState.playerHp || 100;
    this.enemyMaxHp = targetTier.enemyMaxHp;
    this.enemyHp = targetTier.enemyMaxHp;
    this.turnNumber = 1;
    this.playerActionsSinceParry = 0;
    this.phase = 'IDLE';
    this.activeTab = 'quick';
    this.lastAttackTab = 'quick';
    this.isDazedDebuff = false;
    this.streak = 0;

    GameState.setFocus(0);

    const stageBadge = document.getElementById('combat-stage-badge');
    if (stageBadge) stageBadge.textContent = `STAGE ${targetTier.roman}: ${targetTier.enemyName.split(' (')[0].toUpperCase()}`;
    const eName = document.getElementById('enemy-name');
    if (eName) eName.textContent = targetTier.enemyName.split(' (')[0];
    const eSvg = document.getElementById('enemy-svg-box');
    if (eSvg) eSvg.innerHTML = targetTier.enemySvg;
    const tCounter = document.getElementById('combat-turn-counter');
    if (tCounter) tCounter.textContent = '1';

    document.getElementById('enemy-telegraph-banner').classList.add('hidden');
    document.getElementById('modal-victory').classList.add('hidden');
    document.getElementById('modal-defeat').classList.add('hidden');
    document.getElementById('debuff-dazed-badge').classList.add('hidden');
    document.getElementById('combat-continue-box').classList.add('hidden');

    if (GameState.buffForesight) {
      this.showFeedback("👁️ Scout's Foresight active: Incoming strikes telegraphed early!", "text-sky-300");
    } else {
      this.hideFeedback();
    }

    this.updateHpBars();
    this.renderStreakUI();
    this.lockTurnChallenges();
    this.switchTab('quick');
  },

  applyWeather() {
    const wName = document.getElementById('lbl-weather-name');
    if (wName && this.weather) wName.textContent = this.weather.name.split(' (')[0];
    const overlay = document.getElementById('arena-weather-overlay');
    if (overlay && this.weather) {
      overlay.className = `absolute inset-0 pointer-events-none transition-opacity duration-700 ${this.weather.bgClass}`;
      overlay.style.opacity = this.weather.id === 'clear' ? '0' : '0.45';
    }
  },

  renderStreakUI() {
    const lbl = document.getElementById('lbl-streak-bonus');
    const pill = document.getElementById('crit-status-pill');

    if (lbl) {
      if (this.streak >= this.maxStreak) {
        lbl.textContent = "⚡ CRIT READY!";
        lbl.className = "text-[9px] font-mono text-amber-300 ml-1 font-black animate-pulse";
      } else {
        lbl.textContent = `${this.streak}/4`;
        lbl.className = "text-[9px] font-mono text-stone-400 ml-1 font-bold";
      }
    }

    for (let i = 1; i <= 4; i++) {
      const pip = document.getElementById(`streak-pip-${i}`);
      if (!pip) continue;
      if (i <= this.streak) {
        pip.className = "w-2.5 h-2.5 rounded-full border border-amber-400 bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.9)]";
      } else {
        pip.className = "w-2.5 h-2.5 rounded-full border border-stone-700 bg-stone-900";
      }
    }

    if (pill && this.phase !== 'PARRY_PRIMED' && this.phase !== 'PARRY_ACTIVE') {
      if (this.isDazedDebuff) {
        pill.textContent = "DAZED (No Crits)";
        pill.className = "text-[9px] font-mono px-1.5 py-0.2 bg-rose-950 border border-rose-600 text-rose-300 rounded font-bold";
      } else if (this.streak >= this.maxStreak) {
        pill.textContent = "⚡ CRIT PRIMED (1.5x DMG)";
        pill.className = "text-[9px] font-mono px-1.5 py-0.2 bg-amber-950 border border-amber-400 text-amber-300 rounded font-bold animate-pulse";
      } else {
        pill.textContent = `Streak: ${this.streak}/4`;
        pill.className = "text-[9px] font-mono px-1.5 py-0.2 bg-stone-900 border border-stone-700 text-stone-400 rounded";
      }
    }
  },

  lockTurnChallenges() {
    const quickItem = DeckManager.draw(`quick_${this.tier.id}`, this.tier.items);
    const heavyItem = DeckManager.draw(`heavy_${this.tier.id}`, this.tier.heavyPool);

    this.lockedChallenges.quick = this.buildChallenge(
      quickItem,
      'quick',
      'Quick Strike • 10 DMG (+1 ⚡ Focus)',
      'Select the sound of this Ukrainian rune:'
    );

    this.lockedChallenges.heavy = this.buildChallenge(
      heavyItem,
      'heavy',
      'Runic Cleave • 30 DMG (Consumes 2 ⚡)',
      heavyItem.prompt || 'Translate this Ukrainian blend to unleash Cleave:'
    );

    this.lockedChallenges.parry = null;
  },

  buildChallenge(item, type, modeBanner, subtitle) {
    const rawOptions = [
      { text: item.sound, isCorrect: true, eliminated: false },
      ...item.wrong.slice(0, 3).map(w => ({ text: w, isCorrect: false, eliminated: false }))
    ];
    return {
      type,
      cyrillic: item.cyrillic,
      speakText: item.speakText || item.cyrillic,
      correctAnswer: item.sound,
      mnemonic: item.mnemonic,
      modeBanner,
      subtitle,
      options: DeckManager.shuffle(rawOptions),
      scrollApplied: false
    };
  },

  switchTab(tabName, force = false) {
    if (!force && (this.phase === 'ACTIVE_WAITING' || this.phase === 'PARRY_ACTIVE' || this.phase === 'PARRY_PRIMED' || this.phase === 'RESOLVING')) return;

    if (tabName === 'quick' && GameState.focusCharges >= 2) {
      this.showFeedback("⚡ Runic Cleave is primed! Blend the word to strike!", "text-amber-300");
      tabName = 'heavy';
    } else if (tabName === 'heavy' && GameState.focusCharges < 2) {
      this.showFeedback("⚡ Runic Cleave requires 2/2 Focus! Land Quick Strikes first.", "text-amber-400");
      tabName = 'quick';
    }

    this.activeTab = tabName;
    if (tabName === 'quick' || tabName === 'heavy') this.lastAttackTab = tabName;

    const tabQuick = document.getElementById('btn-tab-quick');
    const tabHeavy = document.getElementById('btn-tab-heavy');
    const tabPouch = document.getElementById('btn-tab-pouch');

    const activeClass = "tactical-tab border-2 border-amber-500 bg-amber-950/85 text-amber-100 py-1.5 px-1 rounded-xl text-xs font-fantasy font-bold flex flex-col items-center shadow";
    const inactiveClass = "tactical-tab border-2 border-stone-800 bg-stone-950/75 text-stone-400 hover:text-stone-200 py-1.5 px-1 rounded-xl text-xs font-fantasy font-bold flex flex-col items-center shadow";

    if (tabQuick) tabQuick.className = tabName === 'quick' ? activeClass : inactiveClass;
    if (tabHeavy && GameState.focusCharges >= 2) {
      tabHeavy.className = tabName === 'heavy' ? activeClass : inactiveClass;
    }
    if (tabPouch) tabPouch.className = tabName === 'pouch' ? activeClass : inactiveClass;

    const counts = GameState.getCounts();
    const pouchCountEl = document.getElementById('combat-tab-pouch-count');
    if (pouchCountEl) pouchCountEl.textContent = `${counts.total}/3 Items`;

    document.getElementById('combat-continue-box').classList.add('hidden');

    if (tabName === 'pouch') {
      document.getElementById('combat-prime-box').classList.add('hidden');
      document.getElementById('combat-choices-grid').classList.add('hidden');
      document.getElementById('combat-parry-box').classList.add('hidden');
      document.getElementById('combat-pouch-drawer').classList.remove('hidden');
      document.getElementById('count-elixir').textContent = counts.elixirs;
      document.getElementById('count-scroll').textContent = counts.scrolls;
    } else {
      document.getElementById('combat-pouch-drawer').classList.add('hidden');
      const targetChallenge = this.lockedChallenges[tabName] || this.lockedChallenges.quick;
      this.renderPrimeState(targetChallenge);
    }
  },

  renderPrimeState(challenge) {
    if (!challenge) return;
    this.phase = 'PRIMED';

    document.getElementById('combat-choices-grid').classList.add('hidden');
    document.getElementById('combat-parry-box').classList.add('hidden');
    document.getElementById('combat-continue-box').classList.add('hidden');
    document.getElementById('combat-prime-box').classList.remove('hidden');

    document.getElementById('combat-lock-label').textContent = `Turn #${this.turnNumber} (${challenge.type === 'quick' ? 'Light' : 'Heavy'})`;
    document.getElementById('combat-prompt-mode').textContent = challenge.modeBanner;
    document.getElementById('combat-cyrillic-prompt').textContent = challenge.cyrillic;
    document.getElementById('combat-prompt-subtitle').textContent = challenge.type === 'heavy'
      ? "⚡ Runic Cleave Ready! Inspect the Ukrainian blend and unleash:"
      : "Inspect the rune and sound. Click below when ready to strike:";

    this.renderStreakUI();
  },

  unleashPlayerStrike() {
    if (this.phase !== 'PRIMED' && this.phase !== 'IDLE') return;
    this.phase = 'ACTIVE_WAITING';

    const challenge = this.lockedChallenges[this.activeTab] || this.lockedChallenges.quick;
    if (!challenge) return;

    document.getElementById('combat-prime-box').classList.add('hidden');
    document.getElementById('combat-continue-box').classList.add('hidden');

    const grid = document.getElementById('combat-choices-grid');
    grid.classList.remove('hidden');
    grid.innerHTML = '';

    challenge.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      if (opt.eliminated) {
        btn.disabled = true;
        btn.className = "border border-stone-800 bg-stone-950/40 text-stone-600 line-through font-fantasy text-xs py-3 px-2 rounded-xl opacity-40";
        btn.textContent = opt.text;
      } else {
        btn.className = "border-2 border-amber-950/85 bg-gradient-to-b from-stone-800 to-stone-900 hover:from-stone-700 hover:to-stone-800 active:scale-95 text-stone-100 font-fantasy text-xs sm:text-sm font-bold py-3 px-2 rounded-xl transition-all shadow";
        btn.textContent = opt.text;
        btn.addEventListener('click', () => this.handleOptionSelected(idx));
      }
      grid.appendChild(btn);
    });

    document.getElementById('combat-prompt-subtitle').textContent = challenge.subtitle;
  },

  handleOptionSelected(idx) {
    if (this.phase !== 'ACTIVE_WAITING' && this.phase !== 'PARRY_ACTIVE') return;

    const isParry = this.phase === 'PARRY_ACTIVE';
    const challenge = isParry ? this.lockedChallenges.parry : (this.lockedChallenges[this.activeTab] || this.lockedChallenges.quick);
    if (!challenge) return;

    const opt = challenge.options[idx];
    if (!opt || opt.eliminated) return;

    this.phase = 'RESOLVING';
    TimerManager.clearAll();

    try {
      AudioEngine.pronounce(challenge.speakText);
    } catch (e) {}

    const grid = document.getElementById('combat-choices-grid');
    if (grid) {
      const buttons = grid.children;
      challenge.options.forEach((o, i) => {
        const b = buttons[i];
        if (!b) return;
        b.disabled = true;
        if (o.isCorrect) {
          b.className = "border-2 border-emerald-400 bg-emerald-950 text-emerald-100 font-fantasy text-xs sm:text-sm font-bold py-3 px-2 rounded-xl shadow";
        } else if (i === idx && !o.isCorrect) {
          b.className = "border-2 border-rose-500 bg-rose-950 text-rose-100 font-fantasy text-xs sm:text-sm font-bold py-3 px-2 rounded-xl shadow";
        }
      });
    }

    if (isParry) {
      this.resolveParry(opt.isCorrect, challenge);
    } else {
      this.resolveAttack(opt.isCorrect, challenge);
    }
  },

  resolveAttack(isCorrect, challenge) {
    if (isCorrect) {
      const isCrit = this.streak >= this.maxStreak && !this.isDazedDebuff;
      const isHeavy = challenge.type === 'heavy';

      let baseDmg = isHeavy ? 30 : 10;
      if (GameState.buffKeenEdge && GameState.buffKeenEdgeStrikesLeft > 0) {
        baseDmg += 4;
        GameState.buffKeenEdgeStrikesLeft--;
        if (GameState.buffKeenEdgeStrikesLeft <= 0) GameState.buffKeenEdge = false;
      }

      const finalDmg = isCrit ? Math.round(baseDmg * 1.5) : baseDmg;

      this.showFeedback("Rune recognized!", "text-emerald-400");

      TimerManager.set(() => {
        const pSprite = document.getElementById('player-sprite');
        if (pSprite) pSprite.classList.add('translate-x-5');

        if (isCrit) {
          AudioEngine.critStrike();
          this.triggerScreenEffect('flash-crit', 'shake-heavy');
        } else if (isHeavy) {
          AudioEngine.heavyStrike();
          this.triggerScreenEffect('flash-crit', 'shake-light');
        } else {
          AudioEngine.strike();
          this.triggerScreenEffect('', 'shake-light');
        }
      }, 380);

      TimerManager.set(() => {
        const pSprite = document.getElementById('player-sprite');
        const slash = document.getElementById('enemy-slash-fx');
        if (pSprite) pSprite.classList.remove('translate-x-5');
        if (slash) {
          slash.classList.remove('hidden');
          TimerManager.set(() => slash.classList.add('hidden'), 280);
        }

        this.enemyHp = Math.max(0, this.enemyHp - finalDmg);
        const tag = isCrit ? `КРИТ! -${finalDmg}` : `-${finalDmg}`;
        this.spawnFloat('enemy-dmg-anchor', tag, isCrit ? 'text-yellow-300 font-black text-xl' : isHeavy ? 'text-amber-300 font-bold' : 'text-amber-100');
        this.updateHpBars();

        if (isCrit) {
          this.streak = 0;
        } else {
          this.streak = Math.min(this.maxStreak, this.streak + 1);
        }
        this.renderStreakUI();

        if (isHeavy) {
          GameState.setFocus(0);
          this.lastAttackTab = 'quick';
        } else {
          GameState.setFocus(GameState.focusCharges + 1);
        }

        if (this.isDazedDebuff) {
          this.isDazedDebuff = false;
          const dBadge = document.getElementById('debuff-dazed-badge');
          if (dBadge) dBadge.classList.add('hidden');
        }

        this.showFeedback(
          isCrit
            ? `⚡ 4-STREAK CRITICAL! Dealt ${finalDmg} DMG!`
            : isHeavy
              ? `⚡ Runic Cleave crushed for ${finalDmg} DMG!`
              : `🗡 Quick Strike landed for ${finalDmg} DMG! (${this.streak}/4 Streak)`,
          isCrit ? 'text-yellow-300' : 'text-emerald-400'
        );

        if (this.enemyHp <= 0) {
          TimerManager.set(() => this.handleVictory(), 850);
          return;
        }

        this.playerActionsSinceParry++;
        this.scheduleNextTurnTransition(1200);
      }, 750);

    } else {
      AudioEngine.wrong();
      this.streak = 0;
      this.renderStreakUI();

      if (challenge.type === 'heavy') {
        GameState.setFocus(0);
        this.lastAttackTab = 'quick';
      }

      this.showFeedback(`Strike missed (Streak broken)! Tip: ${challenge.mnemonic}`, 'text-rose-400');

      TimerManager.set(() => {
        const counterDmg = Math.max(8, Math.round(this.getEffectiveEnemyDamage() * 0.7));
        this.damagePlayer(counterDmg);

        if (this.playerHp <= 0) {
          TimerManager.set(() => this.handleDefeat(), 1000);
          return;
        }

        this.playerActionsSinceParry++;
        this.scheduleNextTurnTransition(1400);
      }, 500);
    }
  },

  scheduleNextTurnTransition(delayMs) {
    const contBox = document.getElementById('combat-continue-box');
    if (contBox) contBox.classList.remove('hidden');

    TimerManager.set(() => {
      this.advanceTurn();
    }, delayMs);
  },

  advanceTurn() {
    TimerManager.clearAll();
    const contBox = document.getElementById('combat-continue-box');
    if (contBox) contBox.classList.add('hidden');

    if (this.enemyHp <= 0) {
      this.handleVictory();
      return;
    }
    if (this.playerHp <= 0) {
      this.handleDefeat();
      return;
    }

    this.phase = 'IDLE';

    if (this.playerActionsSinceParry >= 2) {
      this.playerActionsSinceParry = 0;
      this.primeEnemyParry();
    } else {
      this.turnNumber++;
      const tCounter = document.getElementById('combat-turn-counter');
      if (tCounter) tCounter.textContent = this.turnNumber;
      this.hideFeedback();
      this.lockTurnChallenges();
      const nextTab = (GameState.focusCharges >= 2) ? 'heavy' : 'quick';
      this.switchTab(nextTab);
    }
  },

  primeEnemyParry() {
    this.phase = 'PARRY_PRIMED';
    const dmg = this.getEffectiveEnemyDamage();
    const banner = document.getElementById('enemy-telegraph-banner');
    const telText = document.getElementById('telegraph-text');
    if (telText) telText.textContent = `${this.tier.enemyName.split(' (')[0]} winds up ${this.tier.enemyAttackName} (${dmg} DMG)!`;
    if (banner) banner.classList.remove('hidden');

    const parryItem = DeckManager.draw(`parry_${this.tier.id}`, this.tier.items);
    this.lockedChallenges.parry = this.buildChallenge(
      parryItem,
      'parry',
      `DEFENSIVE PARRY • BLOCK ${dmg} DMG`,
      'Match ward rune to deflect the incoming strike:'
    );

    document.getElementById('combat-prime-box').classList.add('hidden');
    document.getElementById('combat-choices-grid').classList.add('hidden');
    document.getElementById('combat-pouch-drawer').classList.add('hidden');
    document.getElementById('combat-continue-box').classList.add('hidden');
    document.getElementById('combat-parry-box').classList.remove('hidden');

    document.getElementById('combat-lock-label').textContent = `Turn #${this.turnNumber} Parry Stance`;
    document.getElementById('combat-prompt-mode').textContent = `🛡️ INCOMING STRIKE: ${dmg} DMG`;
    document.getElementById('combat-cyrillic-prompt').textContent = parryItem.cyrillic;
    document.getElementById('combat-prompt-subtitle').textContent = "Raise your shield when ready to choose the ward rune:";
    const pill = document.getElementById('crit-status-pill');
    if (pill) {
      pill.textContent = GameState.buffForesight ? "👁️ Foresight Riposte Ready" : "Defensive Stance";
      pill.className = GameState.buffForesight
        ? "text-[9px] font-mono px-1.5 py-0.2 bg-sky-950 border border-sky-400 text-sky-300 rounded font-bold animate-pulse"
        : "text-[9px] font-mono px-1.5 py-0.2 bg-sky-950 border border-sky-700 text-sky-300 rounded font-bold";
    }
  },

  unleashRaiseShield() {
    if (this.phase !== 'PARRY_PRIMED') return;
    this.phase = 'PARRY_ACTIVE';
    const challenge = this.lockedChallenges.parry;
    if (!challenge) return;

    document.getElementById('combat-parry-box').classList.add('hidden');
    const grid = document.getElementById('combat-choices-grid');
    grid.classList.remove('hidden');
    grid.innerHTML = '';

    challenge.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = "border-2 border-sky-950/85 bg-gradient-to-b from-stone-800 to-stone-900 hover:from-stone-700 active:scale-95 text-stone-100 font-fantasy text-xs sm:text-sm font-bold py-3 px-2 rounded-xl transition-all shadow";
      btn.textContent = opt.text;
      btn.addEventListener('click', () => this.handleOptionSelected(idx));
      grid.appendChild(btn);
    });

    document.getElementById('combat-prompt-subtitle').textContent = challenge.subtitle;
  },

  resolveParry(isCorrect, challenge) {
    const banner = document.getElementById('enemy-telegraph-banner');
    if (banner) banner.classList.add('hidden');

    if (isCorrect) {
      const isRiposte = GameState.buffForesight;

      if (isRiposte) {
        AudioEngine.parryRiposte();
        this.triggerScreenEffect('flash-parry', 'shake-light');
        const counter = 12;
        this.enemyHp = Math.max(0, this.enemyHp - counter);
        this.spawnFloat('enemy-dmg-anchor', `RIPOSTE! -${counter}`, 'text-sky-300 font-bold');
        this.spawnFloat('player-dmg-anchor', 'PARRIED!', 'text-emerald-400');
        this.showFeedback(`⚔️ FORESIGHT RIPOSTE! Deflected blow + dealt ${counter} Counter DMG!`, 'text-sky-300');
        this.updateHpBars();

        if (this.enemyHp <= 0) {
          TimerManager.set(() => this.handleVictory(), 850);
          return;
        }
      } else {
        AudioEngine.parryBlock();
        this.triggerScreenEffect('flash-parry', '');
        this.spawnFloat('player-dmg-anchor', 'BLOCKED!', 'text-emerald-400');
        this.showFeedback("🛡️ Clean Block! Negated incoming spirit damage.", "text-emerald-300");
      }

      this.scheduleNextTurnTransition(1200);
    } else {
      AudioEngine.wrong();
      const dmg = this.getEffectiveEnemyDamage();
      this.damagePlayer(dmg);

      this.isDazedDebuff = true;
      const dazedBadge = document.getElementById('debuff-dazed-badge');
      if (dazedBadge) dazedBadge.classList.remove('hidden');
      this.showFeedback(`Guard shattered (-${dmg} HP)! DAZED for 1 turn. Tip: ${challenge.mnemonic}`, 'text-rose-400');

      if (this.playerHp <= 0) {
        TimerManager.set(() => this.handleDefeat(), 1050);
        return;
      }

      this.scheduleNextTurnTransition(1500);
    }
  },

  useElixir() {
    if (this.playerHp >= this.playerMaxHp) {
      this.showFeedback("Vitality already at 100/100 HP!", "text-amber-300");
      return;
    }
    if (!GameState.consumeItem('elixir')) {
      this.showFeedback("No Elixirs left! Brew more in the Cauldron.", "text-rose-400");
      return;
    }

    AudioEngine.heal();
    this.triggerScreenEffect('flash-heal', '');
    const healAmt = Math.min(35, this.playerMaxHp - this.playerHp);
    this.playerHp += healAmt;
    GameState.playerHp = this.playerHp;
    GameState.save();

    this.updateHpBars();
    this.spawnFloat('player-dmg-anchor', `+${healAmt} HP`, 'text-emerald-400');
    this.showFeedback(`🧪 Drank Carpathian Elixir! Restored +${healAmt} HP!`, 'text-emerald-400');
    this.switchTab(this.lastAttackTab);
  },

  useScroll() {
    const challenge = this.lockedChallenges[this.lastAttackTab];
    if (!challenge) return;

    if (challenge.scrollApplied) {
      this.showFeedback("Scroll of Clarity already revealed answers for this attack!", "text-sky-300");
      this.switchTab(this.lastAttackTab);
      return;
    }

    if (!GameState.consumeItem('scroll')) {
      this.showFeedback("No Scrolls left! Craft more in the Clearing.", "text-rose-400");
      return;
    }

    let eliminated = 0;
    for (const o of challenge.options) {
      if (!o.isCorrect && !o.eliminated && eliminated < 2) {
        o.eliminated = true;
        eliminated++;
      }
    }
    challenge.scrollApplied = true;

    AudioEngine.scrollChime();
    this.showFeedback("📜 Scroll of Clarity shines! 2 incorrect runes dissolved.", "text-sky-300");
    this.switchTab(this.lastAttackTab);
  },

  damagePlayer(dmg) {
    if (DevSettings.godMode) {
      this.spawnFloat('player-dmg-anchor', 'IMMUNE', 'text-amber-300');
      return;
    }

    const eSprite = document.getElementById('enemy-sprite');
    if (eSprite) {
      eSprite.classList.add('-translate-x-4');
      TimerManager.set(() => eSprite.classList.remove('-translate-x-4'), 300);
    }

    this.triggerScreenEffect('flash-damage', 'shake-light');
    this.playerHp = Math.max(0, this.playerHp - dmg);
    GameState.playerHp = this.playerHp;
    GameState.save();

    this.spawnFloat('player-dmg-anchor', `-${dmg}`, 'text-rose-500');
    this.updateHpBars();
  },

  updateHpBars() {
    const pPct = Math.max(0, Math.round((this.playerHp / this.playerMaxHp) * 100));
    const ePct = Math.max(0, Math.round((this.enemyHp / this.enemyMaxHp) * 100));

    document.getElementById('player-hp-text').textContent = `${this.playerHp}/${this.playerMaxHp}`;
    document.getElementById('enemy-hp-text').textContent = `${this.enemyHp}/${this.enemyMaxHp}`;

    const pBar = document.getElementById('player-hp-bar');
    pBar.style.width = `${pPct}%`;
    pBar.className = pPct > 50 ? "bg-gradient-to-r from-emerald-500 to-green-400 h-full transition-all duration-300" : pPct > 25 ? "bg-gradient-to-r from-amber-500 to-yellow-400 h-full transition-all duration-300" : "bg-gradient-to-r from-red-600 to-rose-500 h-full transition-all duration-300";

    document.getElementById('enemy-hp-bar').style.width = `${ePct}%`;
  },

  spawnFloat(anchorId, text, colorClass) {
    const el = document.getElementById(anchorId);
    if (!el) return;
    el.innerHTML = `<span class="inline-block animate-float-damage ${colorClass}">${text}</span>`;
  },

  triggerScreenEffect(flashClass, shakeClass) {
    if (flashClass) {
      const flash = document.getElementById('screen-flash');
      flash.className = `absolute inset-0 pointer-events-none z-30 ${flashClass}`;
      TimerManager.set(() => flash.className = "absolute inset-0 pointer-events-none z-30", 450);
    }
    if (shakeClass) {
      const container = document.getElementById('app-container');
      container.classList.add(shakeClass);
      TimerManager.set(() => container.classList.remove(shakeClass), 400);
    }
  },

  showFeedback(msg, colorClass = 'text-amber-300') {
    const fb = document.getElementById('combat-feedback');
    fb.textContent = msg;
    fb.className = `min-h-[20px] px-2 flex items-center justify-center text-center text-[11px] font-mono font-bold transition-opacity opacity-100 leading-tight ${colorClass}`;
  },

  hideFeedback() {
    const fb = document.getElementById('combat-feedback');
    fb.className = "min-h-[20px] px-2 flex items-center justify-center text-center text-[11px] font-mono font-bold transition-opacity opacity-0 leading-tight";
  },

  handleVictory() {
    this.phase = 'BATTLE_ENDED';
    AudioEngine.victory();

    GameState.playerHp = this.playerHp;

    const maxAvailableTiers = (window.CurriculumData && CurriculumData.tiers) ? CurriculumData.tiers.length : 5;
    const xpReward = 50 + this.tier.id * 15;
    const unlockedNext = this.tier.id === GameState.unlockedTier && GameState.unlockedTier < maxAvailableTiers;
    if (unlockedNext) {
      GameState.unlockedTier++;
      GameState.selectedTierId = GameState.unlockedTier;
    }
    GameState.addXp(xpReward);

    document.getElementById('victory-xp-text').textContent = `+${xpReward} XP`;
    document.getElementById('victory-unlock-text').textContent = unlockedNext ? `Stage ${CurriculumData.tiers[GameState.unlockedTier - 1].roman} Open!` : `Stage ${this.tier.roman} Cleared!`;

    const modal = document.getElementById('modal-victory');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  },

  handleDefeat() {
    this.phase = 'BATTLE_ENDED';
    AudioEngine.wrong();

    GameState.unlockedTier = 1;
    GameState.selectedTierId = 1;
    GameState.playerHp = 100;
    this.playerHp = 100;
    GameState.save();

    const modal = document.getElementById('modal-defeat');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
};

const ViewRouter = {
  show(viewId) {
    TimerManager.clearAll();
    ['view-camp', 'view-whetstone', 'view-cauldron', 'view-scout', 'view-codex', 'view-battle'].forEach(id => {
      const el = document.getElementById(id);
      if (id === viewId) {
        el.classList.remove('hidden');
        el.classList.add('flex');
      } else {
        el.classList.add('hidden');
        el.classList.remove('flex');
      }
    });
    document.getElementById('modal-victory').classList.add('hidden');
    document.getElementById('modal-defeat').classList.add('hidden');
    GameState.syncUI();
  }
};

const CodexSystem = {
  activeCategory: 'beasts',

  render() {
    const container = document.getElementById('codex-entries-container');
    if (!container) return;
    container.innerHTML = '';

    const list = this.activeCategory === 'beasts' ? CodexData.beasts : CodexData.sacred;
    list.forEach(item => {
      const card = document.createElement('div');
      card.className = "bg-stone-950/90 border border-indigo-900/50 rounded-2xl p-3.5 space-y-1.5 shadow-md";
      card.innerHTML = `
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="text-2xl">${item.icon}</span>
            <div>
              <h4 class="font-fantasy font-bold text-xs text-indigo-200">${item.name}</h4>
              <p class="text-[10px] text-stone-400 font-mono italic">${item.epithet}</p>
            </div>
          </div>
          <button data-word="${item.pronounce}" class="btn-codex-audio p-1.5 rounded-lg bg-stone-900 border border-indigo-800 text-indigo-300 active:scale-90">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5L6 9H2v6h4l5 4V5zM15.54 8.46a5 5 0 010 7.07"></path></svg>
          </button>
        </div>
        <p class="text-xs text-stone-300 font-folk leading-relaxed">${item.lore}</p>
      `;
      container.appendChild(card);
    });

    container.querySelectorAll('.btn-codex-audio').forEach(b => {
      b.addEventListener('click', () => AudioEngine.pronounce(b.getAttribute('data-word')));
    });
  }
};

window.addEventListener('DOMContentLoaded', () => {
  GameState.load();
// Unlock audio context on initial iPhone/browser touch
  const unlockAudio = () => {
    AudioEngine.init();
    if (AudioEngine.ctx && AudioEngine.ctx.state === 'suspended') {
      AudioEngine.ctx.resume();
    }
    document.removeEventListener('touchstart', unlockAudio);
    document.removeEventListener('click', unlockAudio);
  };
  document.addEventListener('touchstart', unlockAudio, { once: true, passive: true });
  document.addEventListener('click', unlockAudio, { once: true });
  document.getElementById('btn-toggle-dev').addEventListener('click', () => {
    const modal = document.getElementById('modal-dev-panel');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  });

  document.getElementById('btn-close-dev').addEventListener('click', () => {
    const modal = document.getElementById('modal-dev-panel');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  });

  document.getElementById('btn-toggle-sound').addEventListener('click', () => {
    AudioEngine.enabled = !AudioEngine.enabled;
    document.getElementById('icon-sound-on').classList.toggle('hidden', !AudioEngine.enabled);
    document.getElementById('icon-sound-off').classList.toggle('hidden', AudioEngine.enabled);
  });

  document.getElementById('btn-reset-data').addEventListener('click', () => {
    const modal = document.getElementById('modal-reset');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  });

  document.getElementById('btn-cancel-reset').addEventListener('click', () => {
    const modal = document.getElementById('modal-reset');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  });

  document.getElementById('btn-confirm-reset').addEventListener('click', () => {
    GameState.reset();
    const modal = document.getElementById('modal-reset');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    ViewRouter.show('view-camp');
  });

  const dmgSlider = document.getElementById('slider-enemy-dmg');
  const dmgSliderVal = document.getElementById('dev-slider-val');

  dmgSlider.addEventListener('input', (e) => {
    const val = parseInt(e.target.value, 10);
    DevSettings.overrideEnemyDamage = val;
    dmgSliderVal.textContent = `${val} DMG`;
    GameState.syncUI();
  });

  document.getElementById('btn-dev-reset-dmg').addEventListener('click', () => {
    DevSettings.overrideEnemyDamage = null;
    dmgSliderVal.textContent = "Default";
    GameState.syncUI();
  });

  const godBtn = document.getElementById('btn-dev-toggle-god');
  godBtn.addEventListener('click', () => {
    DevSettings.godMode = !DevSettings.godMode;
    godBtn.textContent = DevSettings.godMode ? 'ACTIVE (ON)' : 'OFF';
    godBtn.className = DevSettings.godMode ? "px-2.5 py-1 rounded text-[11px] font-mono font-bold bg-amber-500 text-stone-950 border border-amber-400" : "px-2.5 py-1 rounded text-[11px] font-mono font-bold bg-stone-800 text-stone-400 border border-stone-700";
    GameState.syncUI();
  });

  document.getElementById('btn-dev-fill-focus')?.addEventListener('click', () => GameState.setFocus(2));
  document.getElementById('btn-dev-focus-0')?.addEventListener('click', () => GameState.setFocus(0));
  document.getElementById('btn-dev-focus-1')?.addEventListener('click', () => GameState.setFocus(1));

  document.getElementById('btn-dev-streak-0')?.addEventListener('click', () => {
    CombatEngine.streak = 0;
    CombatEngine.renderStreakUI();
  });
  document.getElementById('btn-dev-streak-4')?.addEventListener('click', () => {
    CombatEngine.streak = 4;
    CombatEngine.renderStreakUI();
  });

  document.getElementById('btn-dev-refill-hp')?.addEventListener('click', () => {
    GameState.playerHp = 100;
    CombatEngine.playerHp = 100;
    CombatEngine.updateHpBars();
    GameState.save();
  });

  document.getElementById('btn-dev-slay-enemy').addEventListener('click', () => {
    const battle = document.getElementById('view-battle');
    if (!battle.classList.contains('hidden') && CombatEngine.phase !== 'BATTLE_ENDED') {
      CombatEngine.enemyHp = 0;
      CombatEngine.updateHpBars();
      CombatEngine.handleVictory();
      document.getElementById('modal-dev-panel').classList.add('hidden');
      document.getElementById('modal-dev-panel').classList.remove('flex');
    }
  });

  document.getElementById('btn-dev-unlock-all').addEventListener('click', () => {
    const maxAvailableTiers = (window.CurriculumData && CurriculumData.tiers) ? CurriculumData.tiers.length : 5;
    GameState.unlockedTier = maxAvailableTiers;
    GameState.save();
    GameState.syncUI();
  });

  document.getElementById('btn-dev-refill-pouch').addEventListener('click', () => {
    GameState.pouch = ['elixir', 'elixir', 'scroll'];
    GameState.save();
  });

  document.getElementById('btn-open-whetstone').addEventListener('click', () => {
    RitualSystem.openWhetstone();
    ViewRouter.show('view-whetstone');
  });

  document.getElementById('btn-open-cauldron').addEventListener('click', () => {
    RitualSystem.openCauldron();
    ViewRouter.show('view-cauldron');
  });

  document.getElementById('btn-open-scout').addEventListener('click', () => {
    RitualSystem.openScout();
    ViewRouter.show('view-scout');
  });

  document.getElementById('btn-open-codex').addEventListener('click', () => {
    CodexSystem.render();
    ViewRouter.show('view-codex');
  });

  document.getElementById('btn-camp-launch-battle').addEventListener('click', () => {
    ViewRouter.show('view-battle');
    CombatEngine.startBattle(GameState.selectedTierId);
  });

  document.getElementById('btn-close-whetstone').addEventListener('click', () => ViewRouter.show('view-camp'));
  document.getElementById('btn-close-cauldron').addEventListener('click', () => ViewRouter.show('view-camp'));
  document.getElementById('btn-close-scout').addEventListener('click', () => ViewRouter.show('view-camp'));
  document.getElementById('btn-close-codex').addEventListener('click', () => ViewRouter.show('view-camp'));

  document.getElementById('btn-whetstone-speak').addEventListener('click', () => {
    if (RitualSystem.whetstoneCurrentItem) {
      AudioEngine.pronounce(RitualSystem.whetstoneCurrentItem.speakText || RitualSystem.whetstoneCurrentItem.cyrillic);
    }
  });

  document.getElementById('btn-cauldron-speak').addEventListener('click', () => {
    if (RitualSystem.cauldronCurrentItem) {
      AudioEngine.pronounce(RitualSystem.cauldronCurrentItem.speakText || RitualSystem.cauldronCurrentItem.cyrillic);
    }
  });

  document.getElementById('btn-scout-speak').addEventListener('click', () => {
    if (RitualSystem.scoutCurrentItem) {
      AudioEngine.pronounce(RitualSystem.scoutCurrentItem.speakText || RitualSystem.scoutCurrentItem.cyrillic);
    }
  });

  document.getElementById('btn-select-brew-elixir').addEventListener('click', () => {
    RitualSystem.cauldronType = 'elixir';
    document.getElementById('btn-select-brew-elixir').className = "p-2.5 rounded-xl border-2 border-emerald-500 bg-emerald-950/70 text-left flex items-center gap-2.5 shadow";
    document.getElementById('btn-select-brew-scroll').className = "p-2.5 rounded-xl border-2 border-stone-800 bg-stone-900/70 text-left flex items-center gap-2.5 opacity-65";
  });

  document.getElementById('btn-select-brew-scroll').addEventListener('click', () => {
    RitualSystem.cauldronType = 'scroll';
    document.getElementById('btn-select-brew-scroll').className = "p-2.5 rounded-xl border-2 border-sky-500 bg-sky-950/70 text-left flex items-center gap-2.5 shadow";
    document.getElementById('btn-select-brew-elixir').className = "p-2.5 rounded-xl border-2 border-stone-800 bg-stone-900/70 text-left flex items-center gap-2.5 opacity-65";
  });

  const codexBeasts = document.getElementById('btn-codex-tab-beasts');
  const codexSacred = document.getElementById('btn-codex-tab-sacred');

  codexBeasts.addEventListener('click', () => {
    CodexSystem.activeCategory = 'beasts';
    codexBeasts.className = "flex-1 py-1.5 rounded-lg font-fantasy text-xs font-bold bg-indigo-900/60 text-indigo-200 border border-indigo-600";
    codexSacred.className = "flex-1 py-1.5 rounded-lg font-fantasy text-xs font-bold text-stone-400 hover:text-indigo-200";
    CodexSystem.render();
  });

  codexSacred.addEventListener('click', () => {
    CodexSystem.activeCategory = 'sacred';
    codexSacred.className = "flex-1 py-1.5 rounded-lg font-fantasy text-xs font-bold bg-indigo-900/60 text-indigo-200 border border-indigo-600";
    codexBeasts.className = "flex-1 py-1.5 rounded-lg font-fantasy text-xs font-bold text-stone-400 hover:text-indigo-200";
    CodexSystem.render();
  });

  document.getElementById('btn-flee-combat').addEventListener('click', () => ViewRouter.show('view-camp'));

  document.getElementById('btn-tab-quick').addEventListener('click', () => CombatEngine.switchTab('quick'));
  document.getElementById('btn-tab-heavy').addEventListener('click', () => CombatEngine.switchTab('heavy'));
  document.getElementById('btn-tab-pouch').addEventListener('click', () => CombatEngine.switchTab('pouch'));

  document.getElementById('btn-unleash-strike').addEventListener('click', () => CombatEngine.unleashPlayerStrike());
  document.getElementById('btn-raise-shield').addEventListener('click', () => CombatEngine.unleashRaiseShield());
  document.getElementById('btn-force-next-turn').addEventListener('click', () => CombatEngine.advanceTurn());

  document.getElementById('btn-combat-pronounce').addEventListener('click', () => {
    const ch = (CombatEngine.phase === 'PARRY_PRIMED' || CombatEngine.phase === 'PARRY_ACTIVE')
      ? CombatEngine.lockedChallenges.parry
      : CombatEngine.lockedChallenges[CombatEngine.lastAttackTab];
    if (ch) AudioEngine.pronounce(ch.speakText);
  });

  document.getElementById('btn-use-elixir').addEventListener('click', () => CombatEngine.useElixir());
  document.getElementById('btn-use-scroll').addEventListener('click', () => CombatEngine.useScroll());

  document.getElementById('btn-victory-camp').addEventListener('click', () => ViewRouter.show('view-camp'));
  document.getElementById('btn-defeat-retry').addEventListener('click', () => CombatEngine.startBattle(GameState.selectedTierId));
  document.getElementById('btn-defeat-camp').addEventListener('click', () => ViewRouter.show('view-camp'));
});
