/**
 * Cossack's Journey: Chronicles of the Carpathian Woods
 * MODULE: game.js - State Machine, Camp Rituals, Audio Synth, & Combat Engine
 */

// Global State
window.GameState = {
  player: {
    hp: 100,
    maxHp: 100,
    gold: 0,
    xp: 0,
    level: 1,
    pouch: ['elixir'],
    maxPouch: 3,
    buffs: {
      keenEdgeCharges: 0,
      foresight: false
    }
  },
  combat: {
    stageIndex: 0,
    phase: 'PLAYER_IDLE', // PLAYER_IDLE, STRIKE_PRIMED, RESOLVING, ENEMY_TURN
    momentumPips: 0,
    strikeTimerStart: 0,
    critTimerInterval: null,
    enemyTimer: null,
    currentQuestion: null,
    weather: null,
    enemyHp: 55,
    enemyMaxHp: 55,
    enemyAttacking: false,
    parryPromptTime: 0
  },
  camp: {
    whetstoneAttempts: 0,
    scoutStrikes: 0,
    cauldronLocked: false,
    whetstoneLocked: false,
    scoutLocked: false
  },
  soundEnabled: true,
  devMode: false
};

// Web Audio Procedural Synthesizer
window.AudioFX = {
  ctx: null,
  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) this.ctx = new AudioContext();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  },
  playTone(freq, type = 'sine', duration = 0.15, gainVal = 0.1) {
    if (!GameState.soundEnabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch(e) {}
  },
  playCrit() {
    this.playTone(587.33, 'triangle', 0.1, 0.15);
    setTimeout(() => this.playTone(880, 'triangle', 0.25, 0.2), 90);
  },
  playParry() {
    this.playTone(880, 'sine', 0.08, 0.2);
    setTimeout(() => this.playTone(1320, 'sine', 0.18, 0.25), 60);
  },
  playDamage() {
    this.playTone(130, 'sawtooth', 0.25, 0.2);
  },
  playBrew() {
    this.playTone(440, 'sine', 0.12, 0.1);
    setTimeout(() => this.playTone(660, 'sine', 0.18, 0.12), 100);
  }
};

// UI & Notification Helpers
window.UI = {
  flash(type) {
    const el = document.getElementById('screen-flash');
    if (!el) return;
    el.className = 'absolute inset-0 pointer-events-none z-30 flash-' + type;
    setTimeout(() => { el.className = 'absolute inset-0 pointer-events-none z-30'; }, 400);
  },
  showFloatDamage(amount, isCrit = false, target = 'enemy') {
    const parent = target === 'enemy' ? document.getElementById('enemy-portrait-box') : document.getElementById('player-avatar-box');
    if (!parent) return;
    const badge = document.createElement('div');
    badge.className = `absolute z-40 font-black font-fantasy text-sm sm:text-base animate-float-damage ${isCrit ? 'text-amber-300 drop-shadow-[0_2px_4px_rgba(245,158,11,0.8)]' : 'text-rose-400'}`;
    badge.textContent = `-${amount}${isCrit ? ' ⚡CRIT!' : ''}`;
    parent.appendChild(badge);
    setTimeout(() => badge.remove(), 1050);
  },
  updateHeader() {
    const p = GameState.player;
    const hpBar = document.getElementById('player-hp-bar');
    const hpLabel = document.getElementById('player-hp-label');
    const pouchLabel = document.getElementById('pouch-count-label');
    const xpBar = document.getElementById('header-xp-bar');
    const xpText = document.getElementById('player-banner-xp');
    
    if (hpBar) hpBar.style.width = `${Math.max(0, (p.hp / p.maxHp) * 100)}%`;
    if (hpLabel) hpLabel.textContent = `${p.hp}/${p.maxHp} HP`;
    if (pouchLabel) pouchLabel.textContent = `${p.pouch.length}/${p.maxPouch}`;
    if (xpBar) xpBar.style.width = `${Math.min(100, (p.xp % 100))}%`;
    if (xpText) xpText.textContent = `${p.xp} XP`;

    // Camp readiness badges
    const keenBadge = document.getElementById('badge-camp-edge');
    const sightBadge = document.getElementById('badge-camp-sight');
    if (keenBadge) {
      keenBadge.className = p.buffs.keenEdgeCharges > 0 
        ? 'px-2 py-1 rounded bg-amber-900/60 border border-amber-500 text-amber-300 text-xs font-mono font-bold'
        : 'px-2 py-1 rounded bg-stone-900 border border-stone-800 text-stone-600 text-xs font-mono';
      keenBadge.textContent = p.buffs.keenEdgeCharges > 0 ? `⚔️ Keen Edge (${p.buffs.keenEdgeCharges})` : '⚔️ Sabre Dull';
    }
    if (sightBadge) {
      sightBadge.className = p.buffs.foresight
        ? 'px-2 py-1 rounded bg-sky-900/60 border border-sky-500 text-sky-300 text-xs font-mono font-bold'
        : 'px-2 py-1 rounded bg-stone-900 border border-stone-800 text-stone-600 text-xs font-mono';
      sightBadge.textContent = p.buffs.foresight ? '👁️ Foresight Active' : '👁️ Blind Trail';
    }
  }
};

// Camp System (Rituals & Preparation)
window.CampSystem = {
  currentRune: null,
  currentNouns: [],
  currentVerb: null,

  init() {
    this.refreshWhetstone();
    this.refreshCauldron();
    this.refreshScout();
  },

  refreshWhetstone() {
    const runes = GameData.curriculum.runes;
    this.currentRune = runes[Math.floor(Math.random() * runes.length)];
    const symbolEl = document.getElementById('whetstone-rune-symbol');
    if (symbolEl) symbolEl.textContent = this.currentRune.symbol;

    // Distractors
    const options = [this.currentRune.name];
    while (options.length < 3) {
      const pick = runes[Math.floor(Math.random() * runes.length)].name;
      if (!options.includes(pick)) options.push(pick);
    }
    options.sort(() => Math.random() - 0.5);

    const container = document.getElementById('whetstone-options');
    if (container) {
      container.innerHTML = '';
      options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'w-full py-2 px-3 bg-stone-900 hover:bg-amber-950/80 border border-amber-800/60 text-amber-200 text-xs rounded-xl font-fantasy transition-all active:scale-95';
        btn.textContent = opt;
        btn.onclick = () => this.answerWhetstone(opt);
        container.appendChild(btn);
      });
    }
  },

  answerWhetstone(selected) {
    if (GameState.camp.whetstoneLocked) return;
    if (selected === this.currentRune.name) {
      GameState.player.buffs.keenEdgeCharges = 3;
      AudioFX.playParry();
      UI.flash('crit');
      this.refreshWhetstone();
      UI.updateHeader();
    } else {
      GameState.camp.whetstoneLocked = true;
      AudioFX.playDamage();
      UI.flash('damage');
      setTimeout(() => {
        GameState.camp.whetstoneLocked = false;
        this.refreshWhetstone();
      }, 1200);
    }
  },

  refreshCauldron() {
    const nouns = GameData.curriculum.nouns;
    this.currentNouns = [...nouns].sort(() => Math.random() - 0.5).slice(0, 4);
    const target = this.currentNouns[0];
    const targetLabel = document.getElementById('cauldron-target-label');
    if (targetLabel) targetLabel.textContent = `Combine: ${target.meaning.toUpperCase()}`;

    const container = document.getElementById('cauldron-options');
    if (container) {
      container.innerHTML = '';
      const shuffled = [...this.currentNouns].sort(() => Math.random() - 0.5);
      shuffled.forEach(n => {
        const btn = document.createElement('button');
        btn.className = 'py-2 px-2 bg-stone-900 hover:bg-emerald-950/80 border border-emerald-800/60 text-emerald-200 text-xs rounded-xl font-folk transition-all active:scale-95';
        btn.textContent = n.word;
        btn.onclick = () => this.answerCauldron(n.id === target.id);
        container.appendChild(btn);
      });
    }
  },

  answerCauldron(isCorrect) {
    if (GameState.camp.cauldronLocked) return;
    if (isCorrect) {
      if (GameState.player.pouch.length < GameState.player.maxPouch) {
        GameState.player.pouch.push('elixir');
      }
      AudioFX.playBrew();
      UI.flash('heal');
      this.refreshCauldron();
      UI.updateHeader();
    } else {
      GameState.camp.cauldronLocked = true;
      AudioFX.playDamage();
      UI.flash('damage');
      setTimeout(() => {
        GameState.camp.cauldronLocked = false;
        this.refreshCauldron();
      }, 1200);
    }
  },

  refreshScout() {
    const verbs = GameData.curriculum.verbs;
    this.currentVerb = verbs[Math.floor(Math.random() * verbs.length)];
    const promptEl = document.getElementById('scout-verb-prompt');
    if (promptEl) promptEl.textContent = `"${this.currentVerb.meaning}"`;

    const options = [this.currentVerb.word];
    while (options.length < 3) {
      const pick = verbs[Math.floor(Math.random() * verbs.length)].word;
      if (!options.includes(pick)) options.push(pick);
    }
    options.sort(() => Math.random() - 0.5);

    const container = document.getElementById('scout-options');
    if (container) {
      container.innerHTML = '';
      options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'w-full py-2 px-3 bg-stone-900 hover:bg-sky-950/80 border border-sky-800/60 text-sky-200 text-xs rounded-xl font-fantasy transition-all active:scale-95';
        btn.textContent = opt;
        btn.onclick = () => this.answerScout(opt === this.currentVerb.word);
        container.appendChild(btn);
      });
    }
  },

  answerScout(isCorrect) {
    if (GameState.camp.scoutLocked) return;
    if (isCorrect) {
      GameState.player.buffs.foresight = true;
      AudioFX.playCrit();
      UI.flash('parry');
      this.refreshScout();
      UI.updateHeader();
    } else {
      GameState.camp.scoutStrikes++;
      if (GameState.camp.scoutStrikes >= 2) {
        GameState.camp.scoutLocked = true;
        AudioFX.playDamage();
        UI.flash('damage');
        setTimeout(() => {
          GameState.camp.scoutLocked = false;
          GameState.camp.scoutStrikes = 0;
          this.refreshScout();
        }, 1500);
      }
    }
  }
};

// Combat Engine
window.CombatEngine = {
  startEncounter(stageIndex = 0) {
    GameState.combat.stageIndex = stageIndex;
    const enemyData = GameData.bestiary[stageIndex] || GameData.bestiary[0];
    GameState.combat.enemyHp = enemyData.maxHp;
    GameState.combat.enemyMaxHp = enemyData.maxHp;
    GameState.combat.momentumPips = 0;
    GameState.combat.phase = 'PLAYER_IDLE';

    // Weather roll
    const weathers = GameData.weatherModifiers;
    GameState.combat.weather = weathers[Math.floor(Math.random() * weathers.length)];

    // Switch view
    document.getElementById('view-camp').classList.add('hidden');
    document.getElementById('view-combat').classList.remove('hidden');

    // Render enemy
    document.getElementById('enemy-name-label').textContent = enemyData.name;
    document.getElementById('enemy-title-label').textContent = enemyData.title;
    document.getElementById('enemy-avatar-char').textContent = enemyData.avatar;
    document.getElementById('weather-tag').textContent = `${GameState.combat.weather.icon} ${GameState.combat.weather.name}`;

    this.updateCombatUI();
    this.drawNewPrompt();
  },

  updateCombatUI() {
    const c = GameState.combat;
    const hpBar = document.getElementById('enemy-hp-bar');
    const hpLabel = document.getElementById('enemy-hp-label');
    if (hpBar) hpBar.style.width = `${Math.max(0, (c.enemyHp / c.enemyMaxHp) * 100)}%`;
    if (hpLabel) hpLabel.textContent = `${c.enemyHp}/${c.enemyMaxHp} HP`;

    // Momentum pips
    for (let i = 1; i <= 3; i++) {
      const pip = document.getElementById(`pip-${i}`);
      if (pip) {
        pip.className = i <= c.momentumPips
          ? 'w-4 h-4 rounded-full bg-amber-400 border border-amber-300 shadow-[0_0_8px_rgba(245,158,11,0.9)]'
          : 'w-4 h-4 rounded-full bg-stone-800 border border-stone-700';
      }
    }

    const cleaveBtn = document.getElementById('btn-cleave');
    if (cleaveBtn) {
      cleaveBtn.disabled = c.momentumPips < 3 || c.phase !== 'PLAYER_IDLE';
      cleaveBtn.className = c.momentumPips >= 3 && c.phase === 'PLAYER_IDLE'
        ? 'flex-1 py-3 px-3 rounded-2xl bg-gradient-to-r from-amber-600 to-rose-700 border-2 border-amber-400 text-amber-100 font-fantasy font-black text-xs uppercase tracking-wider glow-gold-pulse active:scale-95 transition-all'
        : 'flex-1 py-3 px-3 rounded-2xl bg-stone-900 border border-stone-800 text-stone-600 font-fantasy font-bold text-xs uppercase tracking-wider cursor-not-allowed';
    }

    const unleashBtn = document.getElementById('btn-unleash');
    if (unleashBtn) {
      unleashBtn.disabled = c.phase !== 'PLAYER_IDLE';
    }
  },

  drawNewPrompt() {
    const items = [...GameData.curriculum.runes, ...GameData.curriculum.nouns];
    const picked = items[Math.floor(Math.random() * items.length)];
    const isRune = !!picked.symbol;

    GameState.combat.currentQuestion = {
      prompt: isRune ? picked.symbol : picked.word,
      correct: isRune ? picked.name : picked.meaning,
      hint: isRune ? picked.sound : picked.translit
    };

    document.getElementById('combat-target-symbol').textContent = GameState.combat.currentQuestion.prompt;
    document.getElementById('combat-target-hint').textContent = `Hint: ${GameState.combat.currentQuestion.hint}`;

    // Options
    const distractors = isRune 
      ? GameData.curriculum.runes.map(r => r.name)
      : GameData.curriculum.nouns.map(n => n.meaning);

    const options = [GameState.combat.currentQuestion.correct];
    while (options.length < 3) {
      const d = distractors[Math.floor(Math.random() * distractors.length)];
      if (!options.includes(d)) options.push(d);
    }
    options.sort(() => Math.random() - 0.5);

    const container = document.getElementById('combat-options-grid');
    if (container) {
      container.innerHTML = '';
      options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'w-full py-3 px-3 bg-stone-900 hover:bg-amber-950 border border-amber-700/60 rounded-xl text-amber-200 text-sm font-fantasy active:scale-95 transition-all';
        btn.textContent = opt;
        btn.onclick = () => this.handlePlayerAnswer(opt);
        container.appendChild(btn);
      });
    }

    GameState.combat.phase = 'PLAYER_IDLE';
    this.updateCombatUI();
  },

  unleashStrike() {
    if (GameState.combat.phase !== 'PLAYER_IDLE') return;
    GameState.combat.phase = 'STRIKE_PRIMED';
    GameState.combat.strikeTimerStart = Date.now();

    const critBar = document.getElementById('crit-timer-bar');
    critBar.style.width = '100%';

    const startTime = Date.now();
    const duration = 4000;

    clearInterval(GameState.combat.critTimerInterval);
    GameState.combat.critTimerInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.max(0, 100 - (elapsed / duration) * 100);
      critBar.style.width = `${pct}%`;
      if (pct <= 50) {
        critBar.className = 'h-full bg-rose-600 transition-all';
      } else {
        critBar.className = 'h-full bg-amber-400 transition-all';
      }

      if (elapsed >= duration) {
        clearInterval(GameState.combat.critTimerInterval);
        this.resolveStrike(false, false);
      }
    }, 40);
  },

  handlePlayerAnswer(answer) {
    if (GameState.combat.phase === 'PLAYER_IDLE') {
      this.unleashStrike();
    }
    if (GameState.combat.phase !== 'STRIKE_PRIMED') return;

    clearInterval(GameState.combat.critTimerInterval);
    const elapsed = Date.now() - GameState.combat.strikeTimerStart;
    const isCorrect = (answer === GameState.combat.currentQuestion.correct);
    const isCrit = isCorrect && (elapsed < GameData.balance.critTimeThresholdMs);

    this.resolveStrike(isCorrect, isCrit);
  },

  resolveStrike(isCorrect, isCrit, isCleave = false) {
    GameState.combat.phase = 'RESOLVING';
    const b = GameData.balance;

    if (isCorrect) {
      let dmg = isCleave ? b.cleaveDamage : b.quickStrikeDamage;
      if (GameState.player.buffs.keenEdgeCharges > 0) {
        dmg += b.keenEdgeBonusDmg;
        GameState.player.buffs.keenEdgeCharges--;
      }
      if (isCrit) dmg = Math.round(dmg * b.critMultiplier);

      GameState.combat.enemyHp = Math.max(0, GameState.combat.enemyHp - dmg);
      UI.showFloatDamage(dmg, isCrit, 'enemy');
      AudioFX.playCrit();
      UI.flash(isCrit ? 'crit' : 'damage');

      if (!isCleave && GameState.combat.momentumPips < 3) {
        GameState.combat.momentumPips++;
      } else if (isCleave) {
        GameState.combat.momentumPips = 0;
      }
    } else {
      AudioFX.playDamage();
      UI.flash('damage');
      if (isCleave) GameState.combat.momentumPips = 0; // Shattered momentum on miss
    }

    this.updateCombatUI();
    UI.updateHeader();

    // Check Victory
    if (GameState.combat.enemyHp <= 0) {
      setTimeout(() => this.handleVictory(), 800);
      return;
    }

    // Trigger Enemy Turn
    setTimeout(() => this.triggerEnemyAttack(), 1000);
  },

  triggerEnemyAttack() {
    GameState.combat.phase = 'ENEMY_TURN';
    const enemyData = GameData.bestiary[GameState.combat.stageIndex];
    let parryWindow = enemyData.parryWindow;
    if (GameState.player.buffs.foresight) {
      parryWindow += GameData.balance.foresightParryWindowBonusMs;
    }

    const parryPrompt = document.getElementById('parry-prompt-box');
    if (parryPrompt) parryPrompt.classList.remove('hidden');

    GameState.combat.parryPromptTime = Date.now();
    clearTimeout(GameState.combat.enemyTimer);
    GameState.combat.enemyTimer = setTimeout(() => {
      this.resolveParry(false);
    }, parryWindow);
  },

  parry() {
    if (GameState.combat.phase !== 'ENEMY_TURN') return;
    clearTimeout(GameState.combat.enemyTimer);
    const elapsed = Date.now() - GameState.combat.parryPromptTime;
    const isRiposte = elapsed <= 1500;
    this.resolveParry(true, isRiposte);
  },

  resolveParry(success, isRiposte = false) {
    const parryPrompt = document.getElementById('parry-prompt-box');
    if (parryPrompt) parryPrompt.classList.add('hidden');

    const enemyData = GameData.bestiary[GameState.combat.stageIndex];
    if (success) {
      AudioFX.playParry();
      UI.flash('parry');
      if (isRiposte) {
        GameState.combat.enemyHp = Math.max(0, GameState.combat.enemyHp - GameData.balance.riposteCounterDamage);
        UI.showFloatDamage(GameData.balance.riposteCounterDamage, true, 'enemy');
      }
    } else {
      GameState.player.hp = Math.max(0, GameState.player.hp - enemyData.attackDamage);
      UI.showFloatDamage(enemyData.attackDamage, false, 'player');
      AudioFX.playDamage();
      UI.flash('damage');
    }

    this.updateCombatUI();
    UI.updateHeader();

    if (GameState.player.hp <= 0) {
      setTimeout(() => alert('You fell in battle. Rest at camp to recover.'), 600);
      this.returnToCamp();
      return;
    }

    this.drawNewPrompt();
  },

  executeCleave() {
    if (GameState.combat.momentumPips < 3 || GameState.combat.phase !== 'PLAYER_IDLE') return;
    this.resolveStrike(true, true, true);
  },

  handleVictory() {
    const enemyData = GameData.bestiary[GameState.combat.stageIndex];
    GameState.player.gold += enemyData.goldReward;
    GameState.player.xp += enemyData.xpReward;
    alert(`Перемога! (Victory!)\nEarned +${enemyData.goldReward} Gold, +${enemyData.xpReward} XP.`);
    this.returnToCamp();
  },

  returnToCamp() {
    clearTimeout(GameState.combat.enemyTimer);
    clearInterval(GameState.combat.critTimerInterval);
    GameState.player.hp = GameState.player.maxHp;
    document.getElementById('view-combat').classList.add('hidden');
    document.getElementById('view-camp').classList.remove('hidden');
    UI.updateHeader();
  }
};

// Application Bootstrap
document.addEventListener('DOMContentLoaded', () => {
  CampSystem.init();
  UI.updateHeader();

  // Camp Navigation
  document.getElementById('btn-march-woods')?.addEventListener('click', () => {
    CombatEngine.startEncounter(0);
  });

  // Combat Bindings
  document.getElementById('btn-unleash')?.addEventListener('click', () => {
    CombatEngine.unleashStrike();
  });
  document.getElementById('btn-cleave')?.addEventListener('click', () => {
    CombatEngine.executeCleave();
  });
  document.getElementById('btn-parry-action')?.addEventListener('click', () => {
    CombatEngine.parry();
  });
  document.getElementById('btn-use-elixir')?.addEventListener('click', () => {
    const p = GameState.player;
    if (p.pouch.length > 0) {
      p.pouch.pop();
      p.hp = Math.min(p.maxHp, p.hp + GameData.balance.elixirHealAmount);
      AudioFX.playBrew();
      UI.flash('heal');
      UI.updateHeader();
    }
  });

  // Sound toggle
  document.getElementById('btn-toggle-sound')?.addEventListener('click', () => {
    GameState.soundEnabled = !GameState.soundEnabled;
    document.getElementById('icon-sound-on')?.classList.toggle('hidden', !GameState.soundEnabled);
    document.getElementById('icon-sound-off')?.classList.toggle('hidden', GameState.soundEnabled);
  });
});
