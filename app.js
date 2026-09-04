/**
 * ============================================================================
 * TEACHERS' DAY 2026 - OPULENT ANTI-GRAVITY TRIBUTE ENGINE
 * ============================================================================
 * Clean, zero-dependency ES6+ JavaScript featuring:
 * - Real-time procedural Web Audio API synthesis
 * - Continuous Anti-Gravity floating background engine
 * - Interactive Quote Carousel with auto-advance & pause
 * - LocalStorage-persisted Gratitude Wall with search & reactions
 * - 60fps GPU Confetti Physics Particle Engine
 * - High-DPI 1200x800 Greeting Card Studio Canvas Renderer
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. PROCEDURAL WEB AUDIO ENGINE (Zero-Dependency Synthesis)
     ========================================================================== */
  class ProceduralAudioEngine {
    constructor() {
      this.ctx = null;
      this.isMuted = true;
      this.ambientTimer = null;
      this.ambientScale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25]; // C Major Pentatonic
    }

    init() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioCtx();
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    // Play a resonant bell harmonic
    playBellTone(freq = 523.25, duration = 2.4, gainLevel = 0.15) {
      if (this.isMuted) return;
      this.init();

      const harmonics = [1, 2.01, 3.02, 4.1];
      const harmonicGains = [gainLevel, gainLevel * 0.45, gainLevel * 0.2, gainLevel * 0.08];

      harmonics.forEach((h, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const now = this.ctx.currentTime;

        osc.type = idx === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq * h, now);

        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.linearRampToValueAtTime(harmonicGains[idx], now + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + duration);
      });
    }

    // Celebratory arpeggio chime for tribute submission
    playCelebrationChime() {
      if (this.isMuted) return;
      this.init();
      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
      notes.forEach((freq, idx) => {
        setTimeout(() => this.playBellTone(freq, 1.8, 0.12), idx * 80);
      });
    }

    // Subtle click / tap sound
    playSoftTap() {
      if (this.isMuted) return;
      this.init();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(440, now + 0.08);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.08);
    }

    toggleAmbient(onStateChange) {
      this.isMuted = !this.isMuted;
      if (!this.isMuted) {
        this.init();
        this.playCelebrationChime();
        this.startAmbientLoop();
      } else {
        this.stopAmbientLoop();
      }
      if (onStateChange) onStateChange(!this.isMuted);
    }

    startAmbientLoop() {
      const triggerNextBell = () => {
        if (this.isMuted) return;
        const randomFreq = this.ambientScale[Math.floor(Math.random() * this.ambientScale.length)];
        this.playBellTone(randomFreq, 3.2, 0.08);
        const nextDelay = 3500 + Math.random() * 4500;
        this.ambientTimer = setTimeout(triggerNextBell, nextDelay);
      };
      this.ambientTimer = setTimeout(triggerNextBell, 1200);
    }

    stopAmbientLoop() {
      if (this.ambientTimer) {
        clearTimeout(this.ambientTimer);
        this.ambientTimer = null;
      }
    }
  }

  const soundEngine = new ProceduralAudioEngine();

  // Audio Toggle UI Binding
  const audioToggleBtn = document.getElementById('audioToggleBtn');
  const audioIcon = document.getElementById('audioIcon');
  const audioText = document.getElementById('audioText');

  if (audioToggleBtn) {
    audioToggleBtn.addEventListener('click', () => {
      soundEngine.toggleAmbient((isPlaying) => {
        if (isPlaying) {
          audioToggleBtn.classList.add('playing');
          audioIcon.textContent = '🔊';
          audioText.textContent = 'Ambient: On';
        } else {
          audioToggleBtn.classList.remove('playing');
          audioIcon.textContent = '🔔';
          audioText.textContent = 'Peaceful Chime';
        }
      });
    });
  }


  /* ==========================================================================
     2. ANTI-GRAVITY FLOATING ELEMENTS SYSTEM
     ========================================================================== */
  const antigravityContainer = document.getElementById('antigravityContainer');
  const floatingIconsPool = [
    '#icon-apple',
    '#icon-book',
    '#icon-pencil',
    '#icon-cap',
    '#icon-lightbulb',
    '#icon-atom',
    '#icon-star'
  ];

  function initAntiGravityParticles(count = 22) {
    if (!antigravityContainer) return;
    antigravityContainer.innerHTML = '';

    for (let i = 0; i < count; i++) {
      const iconWrapper = document.createElement('div');
      iconWrapper.className = 'floating-icon';

      // Distribute randomly across screen width
      const leftPercent = Math.random() * 96; // 0% to 96%
      const duration = 14 + Math.random() * 16; // 14s to 30s
      const delay = Math.random() * -28; // staggered initial start
      const swayDuration = 3.5 + Math.random() * 4.5;
      const swayDelay = Math.random() * -5;
      const swayX = 18 + Math.random() * 32; // 18px to 50px sway
      const size = 26 + Math.random() * 26; // 26px to 52px
      const maxOpacity = 0.18 + Math.random() * 0.28;

      iconWrapper.style.left = `${leftPercent}%`;
      iconWrapper.style.setProperty('--duration', `${duration}s`);
      iconWrapper.style.setProperty('--delay', `${delay}s`);
      iconWrapper.style.setProperty('--max-opacity', maxOpacity);

      const iconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      iconSvg.style.setProperty('--size', `${size}px`);
      iconSvg.style.setProperty('--sway-duration', `${swayDuration}s`);
      iconSvg.style.setProperty('--sway-delay', `${swayDelay}s`);
      iconSvg.style.setProperty('--sway-x', `${swayX}px`);

      const useEl = document.createElementNS('http://www.w3.org/2000/svg', 'use');
      const randomIconHref = floatingIconsPool[Math.floor(Math.random() * floatingIconsPool.length)];
      useEl.setAttribute('href', randomIconHref);

      iconSvg.appendChild(useEl);
      iconWrapper.appendChild(iconSvg);
      antigravityContainer.appendChild(iconWrapper);
    }
  }

  initAntiGravityParticles(window.innerWidth < 768 ? 14 : 24);

  // Subtle Mouse Parallax Physics
  const parallaxLayer = document.getElementById('mainContent');
  let mouseX = 0, mouseY = 0;
  let targetX = 0, targetY = 0;

  window.addEventListener('mousemove', (e) => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    targetX = (e.clientX - cx) * 0.015;
    targetY = (e.clientY - cy) * 0.015;
  }, { passive: true });

  function animateParallax() {
    mouseX += (targetX - mouseX) * 0.08;
    mouseY += (targetY - mouseY) * 0.08;
    if (parallaxLayer && window.innerWidth > 992) {
      parallaxLayer.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    }
    requestAnimationFrame(animateParallax);
  }
  requestAnimationFrame(animateParallax);


  /* ==========================================================================
     3. QUOTE CAROUSEL ENGINE
     ========================================================================== */
  const quoteCards = Array.from(document.querySelectorAll('.quote-card'));
  const dotBtns = Array.from(document.querySelectorAll('.dot-btn'));
  const prevQuoteBtn = document.getElementById('prevQuoteBtn');
  const nextQuoteBtn = document.getElementById('nextQuoteBtn');
  const quotesCarousel = document.getElementById('quotesCarousel');

  let currentQuoteIndex = 0;
  let quoteAutoTimer = null;
  const AUTO_SLIDE_DELAY = 6500;

  function showQuote(index) {
    if (index < 0) index = quoteCards.length - 1;
    if (index >= quoteCards.length) index = 0;

    currentQuoteIndex = index;

    quoteCards.forEach((card, idx) => {
      if (idx === currentQuoteIndex) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });

    dotBtns.forEach((dot, idx) => {
      if (idx === currentQuoteIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  function startQuoteAutoPlay() {
    stopQuoteAutoPlay();
    quoteAutoTimer = setInterval(() => {
      showQuote(currentQuoteIndex + 1);
    }, AUTO_SLIDE_DELAY);
  }

  function stopQuoteAutoPlay() {
    if (quoteAutoTimer) {
      clearInterval(quoteAutoTimer);
      quoteAutoTimer = null;
    }
  }

  if (prevQuoteBtn && nextQuoteBtn) {
    prevQuoteBtn.addEventListener('click', () => {
      soundEngine.playSoftTap();
      showQuote(currentQuoteIndex - 1);
      startQuoteAutoPlay();
    });

    nextQuoteBtn.addEventListener('click', () => {
      soundEngine.playSoftTap();
      showQuote(currentQuoteIndex + 1);
      startQuoteAutoPlay();
    });
  }

  dotBtns.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const idx = parseInt(e.currentTarget.dataset.index, 10);
      soundEngine.playSoftTap();
      showQuote(idx);
      startQuoteAutoPlay();
    });
  });

  if (quotesCarousel) {
    quotesCarousel.addEventListener('mouseenter', stopQuoteAutoPlay);
    quotesCarousel.addEventListener('mouseleave', startQuoteAutoPlay);
  }

  startQuoteAutoPlay();


  /* ==========================================================================
     4. INTERACTIVE GRATITUDE WALL (With LocalStorage & Reactivity)
     ========================================================================== */
  const STORAGE_KEY = 'teachers_day_tributes_v2026';

  // Seed Tributes Data
  const defaultTributes = [
    {
      id: 'tribute_1',
      student: 'Rohit Sengupta',
      teacher: 'Prof. Alok Nath Mukherjee',
      subject: 'Theoretical Physics',
      category: 'Inspiring',
      message: 'You taught us that physics is not just formulas on a blackboard, but poetry written into the fabric of the universe. Thank you for igniting my curious mind!',
      theme: 'gold',
      pin: '📌',
      likes: 42,
      date: 'Sept 4, 2026'
    },
    {
      id: 'tribute_2',
      student: 'Sarah Jenkins',
      teacher: 'Mrs. Eleanor Vance',
      subject: 'English Literature',
      category: 'Life Changer',
      message: 'When I was too shy to speak up, you saw a voice in my essays and encouraged me to join the debate team. You changed the trajectory of my entire life.',
      theme: 'rose',
      pin: '💖',
      likes: 58,
      date: 'Sept 4, 2026'
    },
    {
      id: 'tribute_3',
      student: 'Vikram & Friends',
      teacher: 'Dr. Sunita Deshmukh',
      subject: 'Organic Chemistry',
      category: 'Patience',
      message: 'Thank you for staying back after classes for hours until all 40 of us understood reaction mechanisms. Your patience is truly saintly!',
      theme: 'cyan',
      pin: '🌟',
      likes: 35,
      date: 'Sept 3, 2026'
    },
    {
      id: 'tribute_4',
      student: 'David Kim',
      teacher: 'Master Chen',
      subject: 'Mathematics & Logic',
      category: 'Mentorship',
      message: 'A great teacher takes a hand, opens a mind, and touches a heart. Thank you for believing in me during difficult exams.',
      theme: 'slate',
      pin: '🎓',
      likes: 29,
      date: 'Sept 3, 2026'
    },
    {
      id: 'tribute_5',
      student: 'Meera Nambiar',
      teacher: 'Sister Maria',
      subject: 'High School Biology',
      category: 'Inspiring',
      message: 'You made science feel like pure magic. Today I am graduating medical school because of the seed of wonder you planted in 9th grade!',
      theme: 'gold',
      pin: '🍎',
      likes: 64,
      date: 'Sept 2, 2026'
    },
    {
      id: 'tribute_6',
      student: 'Arjun Verma',
      teacher: 'Coach Rajesh',
      subject: 'Athletics & Discipline',
      category: 'Life Changer',
      message: 'You taught us that winning is a habit, but resilience in failure is the true measure of character. Happy Teachers’ Day, Sir!',
      theme: 'rose',
      pin: '📌',
      likes: 19,
      date: 'Sept 2, 2026'
    }
  ];

  function loadTributes() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('LocalStorage load fallback', e);
    }
    return [...defaultTributes];
  }

  function saveTributes(tributes) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tributes));
    } catch (e) {
      console.warn('LocalStorage save error', e);
    }
  }

  let allTributes = loadTributes();
  let currentFilter = 'all';
  let currentSearchQuery = '';

  const stickyWallGrid = document.getElementById('stickyWallGrid');
  const totalTributesCount = document.getElementById('totalTributesCount');
  const tributeForm = document.getElementById('tributeForm');
  const wallSearchInput = document.getElementById('wallSearchInput');
  const filterTagButtons = Array.from(document.querySelectorAll('#filterTags .tag-btn'));

  // Customizer State
  let selectedTheme = 'gold';
  let selectedPin = '📌';

  // Swatch Buttons
  const colorSwatchBtns = document.querySelectorAll('.color-swatch-btn');
  colorSwatchBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      colorSwatchBtns.forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      selectedTheme = e.currentTarget.dataset.theme;
      soundEngine.playSoftTap();
    });
  });

  // Pin Buttons
  const pinBtns = document.querySelectorAll('.pin-btn');
  pinBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      pinBtns.forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      selectedPin = e.currentTarget.dataset.pin;
      soundEngine.playSoftTap();
    });
  });

  // Render Grid
  function renderTributeGrid() {
    if (!stickyWallGrid) return;

    let filtered = allTributes.filter(item => {
      const matchFilter = (currentFilter === 'all') || (item.category === currentFilter);
      const query = currentSearchQuery.toLowerCase().trim();
      const matchSearch = !query || 
        item.teacher.toLowerCase().includes(query) ||
        item.student.toLowerCase().includes(query) ||
        (item.subject && item.subject.toLowerCase().includes(query)) ||
        item.message.toLowerCase().includes(query);
      return matchFilter && matchSearch;
    });

    if (totalTributesCount) {
      totalTributesCount.textContent = allTributes.length;
    }

    if (filtered.length === 0) {
      stickyWallGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
          <p style="font-size: 1.5rem; margin-bottom: 0.5rem;">🍃</p>
          <p style="font-size: 1.1rem; color: var(--text-secondary);">No tribute notes found matching your criteria.</p>
          <p style="font-size: 0.9rem;">Be the first to pin one above!</p>
        </div>
      `;
      return;
    }

    stickyWallGrid.innerHTML = filtered.map((tribute, idx) => {
      // Natural slight rotation for realistic pinboard look (-2.5deg to 2.5deg)
      const rotations = [-2.2, 1.8, -1.2, 2.5, -1.8, 1.2, -2.5, 2.0];
      const rot = rotations[idx % rotations.length];

      return `
        <article class="sticky-card theme-${escapeHTML(tribute.theme)}" style="--rot: ${rot}deg;" data-id="${tribute.id}">
          <div class="sticky-pin">${escapeHTML(tribute.pin || '📌')}</div>
          
          <div class="sticky-header">
            <h3 class="sticky-teacher-name">${escapeHTML(tribute.teacher)}</h3>
            <span class="sticky-subject-tag">${escapeHTML(tribute.subject || tribute.category)}</span>
          </div>

          <p class="sticky-body">“${escapeHTML(tribute.message)}”</p>

          <div class="sticky-footer">
            <div class="sticky-author">By: <strong>${escapeHTML(tribute.student)}</strong></div>
            <div class="sticky-actions">
              <button type="button" class="sticky-react-btn" data-id="${tribute.id}" aria-label="Heart this tribute">
                <span>💖</span>
                <span class="like-count">${tribute.likes || 0}</span>
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');

    // Attach like listeners
    document.querySelectorAll('.sticky-react-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        handleLikeTribute(id, e.currentTarget);
      });
    });
  }

  function handleLikeTribute(id, btnEl) {
    const target = allTributes.find(t => t.id === id);
    if (!target) return;

    target.likes = (target.likes || 0) + 1;
    saveTributes(allTributes);
    soundEngine.playSoftTap();

    const countEl = btnEl.querySelector('.like-count');
    if (countEl) countEl.textContent = target.likes;
    btnEl.classList.add('liked');

    // Mini celebratory burst
    btnEl.style.transform = 'scale(1.35)';
    setTimeout(() => { btnEl.style.transform = ''; }, 200);
  }

  // Filter Buttons
  filterTagButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterTagButtons.forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      currentFilter = e.currentTarget.dataset.filter;
      soundEngine.playSoftTap();
      renderTributeGrid();
    });
  });

  // Search Input
  if (wallSearchInput) {
    wallSearchInput.addEventListener('input', (e) => {
      currentSearchQuery = e.target.value;
      renderTributeGrid();
    });
  }

  // Form Submit Handler
  if (tributeForm) {
    tributeForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const studentName = document.getElementById('studentName').value.trim();
      const teacherName = document.getElementById('teacherName').value.trim();
      const subjectTag = document.getElementById('subjectTag').value.trim();
      const categoryTag = document.getElementById('categoryTag').value;
      const messageText = document.getElementById('messageText').value.trim();

      if (!studentName || !teacherName || !messageText) return;

      const newTribute = {
        id: 'tribute_' + Date.now(),
        student: studentName,
        teacher: teacherName,
        subject: subjectTag || categoryTag,
        category: categoryTag,
        message: messageText,
        theme: selectedTheme,
        pin: selectedPin,
        likes: 1,
        date: 'Today, 2026'
      };

      allTributes.unshift(newTribute);
      saveTributes(allTributes);

      // Trigger Confetti Explosion & Sound Chime!
      launchConfetti();
      soundEngine.playCelebrationChime();

      // Reset Form
      tributeForm.reset();
      selectedTheme = 'gold';
      selectedPin = '📌';
      colorSwatchBtns.forEach(b => b.classList.toggle('active', b.dataset.theme === 'gold'));
      pinBtns.forEach(b => b.classList.toggle('active', b.dataset.pin === '📌'));

      // Re-render and scroll smoothly to grid
      renderTributeGrid();

      const firstCard = stickyWallGrid.firstElementChild;
      if (firstCard) {
        firstCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstCard.style.animation = 'pulseGlow 1.2s ease';
      }
    });
  }

  renderTributeGrid();


  /* ==========================================================================
     5. DEDICATION CARD STUDIO (1200x800 Canvas Studio Engine)
     ========================================================================== */
  const canvas = document.getElementById('tributeCardCanvas');
  const cardTeacherInput = document.getElementById('cardTeacherInput');
  const cardStudentInput = document.getElementById('cardStudentInput');
  const cardMessageInput = document.getElementById('cardMessageInput');
  const cardThemeSelect = document.getElementById('cardThemeSelect');
  const downloadCardBtn = document.getElementById('downloadCardBtn');
  const shareWhatsappBtn = document.getElementById('shareWhatsappBtn');

  function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ');
    let line = '';
    let curY = y;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line, x, curY);
        line = words[n] + ' ';
        curY += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, x, curY);
    return curY;
  }

  function renderCardCanvas() {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = 1200;
    const height = 800;

    const teacher = cardTeacherInput ? cardTeacherInput.value || 'Respected Mentor' : 'Respected Mentor';
    const student = cardStudentInput ? cardStudentInput.value || 'Grateful Student' : 'Grateful Student';
    const message = cardMessageInput ? cardMessageInput.value || 'Thank you for being our guiding light.' : 'Thank you for being our guiding light.';
    const theme = cardThemeSelect ? cardThemeSelect.value : 'midnightGold';

    // 1. Draw Background Theme
    if (theme === 'midnightGold') {
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, '#060b19');
      bgGrad.addColorStop(0.5, '#0c1b3a');
      bgGrad.addColorStop(1, '#060b19');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Star dust radial
      const radial = ctx.createRadialGradient(width / 2, height / 2, 50, width / 2, height / 2, 500);
      radial.addColorStop(0, 'rgba(255, 183, 3, 0.15)');
      radial.addColorStop(1, 'transparent');
      ctx.fillStyle = radial;
      ctx.fillRect(0, 0, width, height);
    } else if (theme === 'classicChalk') {
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, '#0d2818');
      bgGrad.addColorStop(0.5, '#163d26');
      bgGrad.addColorStop(1, '#081c10');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);
    } else {
      // Royal Parchment
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, '#fef3c7');
      bgGrad.addColorStop(0.5, '#fffbeb');
      bgGrad.addColorStop(1, '#fde68a');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);
    }

    const isLight = theme === 'royalParchment';

    // 2. Ornate Golden Borders
    ctx.strokeStyle = isLight ? '#b45309' : '#FFB703';
    ctx.lineWidth = 4;
    ctx.strokeRect(40, 40, width - 80, height - 80);

    ctx.strokeStyle = isLight ? 'rgba(180, 83, 9, 0.4)' : 'rgba(255, 183, 3, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(55, 55, width - 110, height - 110);

    // Corner Ornaments
    const cornerSize = 25;
    const drawCorner = (cx, cy) => {
      ctx.fillStyle = isLight ? '#b45309' : '#FFB703';
      ctx.beginPath();
      ctx.arc(cx, cy, 6, 0, Math.PI * 2);
      ctx.fill();
    };
    drawCorner(55, 55);
    drawCorner(width - 55, 55);
    drawCorner(55, height - 55);
    drawCorner(width - 55, height - 55);

    // 3. Header Typography
    ctx.textAlign = 'center';
    ctx.fillStyle = isLight ? '#78350f' : '#FCD34D';
    ctx.font = '600 24px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('✦ CERTIFICATE OF ENDLESS GRATITUDE ✦', width / 2, 115);

    ctx.fillStyle = isLight ? '#1e293b' : '#FFFFFF';
    ctx.font = 'bold 54px "Playfair Display", Georgia, serif';
    ctx.fillText("Happy Teachers' Day 2026", width / 2, 185);

    // Divider Ribbon Line
    ctx.strokeStyle = isLight ? '#d97706' : '#FFB703';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(width / 2 - 160, 215);
    ctx.lineTo(width / 2 + 160, 215);
    ctx.stroke();

    ctx.fillStyle = isLight ? '#92400e' : '#FFE885';
    ctx.font = '500 22px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Presented with profound admiration to', width / 2, 265);

    // Teacher Name Calligraphy
    ctx.fillStyle = isLight ? '#b45309' : '#FFB703';
    ctx.font = 'bold 58px "Playfair Display", Georgia, serif';
    ctx.fillText(teacher, width / 2, 340);

    // Message Body
    ctx.fillStyle = isLight ? '#334155' : '#E2DAC8';
    ctx.font = 'italic 28px "Playfair Display", serif';
    wrapText(ctx, `“${message}”`, width / 2, 420, 880, 42);

    // Bottom Seal & Signature
    ctx.fillStyle = isLight ? '#78350f' : '#FFE885';
    ctx.font = '600 24px "Caveat", cursive';
    ctx.fillText(`With eternal reverence,`, width / 2, 650);

    ctx.fillStyle = isLight ? '#0f172a' : '#FFFFFF';
    ctx.font = 'bold 28px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(student, width / 2, 695);

    ctx.fillStyle = isLight ? '#64748b' : '#94A3B8';
    ctx.font = '500 16px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('September 5, 2026 • Teachers\' Tribute Seal', width / 2, 735);
  }

  // Bind input changes to real-time render
  [cardTeacherInput, cardStudentInput, cardMessageInput, cardThemeSelect].forEach(input => {
    if (input) {
      input.addEventListener('input', renderCardCanvas);
      input.addEventListener('change', renderCardCanvas);
    }
  });

  // Export & Share
  if (downloadCardBtn && canvas) {
    downloadCardBtn.addEventListener('click', () => {
      soundEngine.playCelebrationChime();
      launchConfetti();
      const link = document.createElement('a');
      link.download = `Teachers_Day_2026_Tribute.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  }

  if (shareWhatsappBtn) {
    shareWhatsappBtn.addEventListener('click', () => {
      const teacher = cardTeacherInput ? cardTeacherInput.value : 'Teacher';
      const text = `🌟 Happy Teachers' Day 2026! Dear ${teacher}, thank you for your guidance and wisdom. Check out our tribute at: ${window.location.href}`;
      const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank');
    });
  }

  // Initial Card Render
  setTimeout(renderCardCanvas, 150);


  /* ==========================================================================
     6. ZERO-LAG CONFETTI CELEBRATION ENGINE
     ========================================================================== */
  const confettiCanvas = document.getElementById('confettiCanvas');
  let confettiParticles = [];
  let confettiAnimationId = null;

  function resizeConfettiCanvas() {
    if (!confettiCanvas) return;
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeConfettiCanvas);
  resizeConfettiCanvas();

  function launchConfetti(count = 90) {
    if (!confettiCanvas) return;
    resizeConfettiCanvas();

    const colors = ['#FFB703', '#FFE885', '#38bdf8', '#fb7185', '#34d399', '#ffffff'];
    const emojis = ['✨', '🎓', '🌟', '🍎', '💖'];

    for (let i = 0; i < count; i++) {
      confettiParticles.push({
        x: window.innerWidth * (0.2 + Math.random() * 0.6),
        y: window.innerHeight * 0.45,
        vx: (Math.random() - 0.5) * 18,
        vy: -12 - Math.random() * 14,
        size: 8 + Math.random() * 8,
        color: colors[Math.floor(Math.random() * colors.length)],
        emoji: Math.random() > 0.65 ? emojis[Math.floor(Math.random() * emojis.length)] : null,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 12,
        alpha: 1,
        gravity: 0.45 + Math.random() * 0.2
      });
    }

    if (!confettiAnimationId) {
      animateConfetti();
    }
  }

  function animateConfetti() {
    if (!confettiCanvas) return;
    const ctx = confettiCanvas.getContext('2d');
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

    for (let i = confettiParticles.length - 1; i >= 0; i--) {
      const p = confettiParticles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.vx *= 0.98;
      p.rotation += p.rotSpeed;
      p.alpha -= 0.009;

      if (p.alpha <= 0 || p.y > window.innerHeight + 50) {
        confettiParticles.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = Math.max(0, p.alpha);

      if (p.emoji) {
        ctx.font = '22px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(p.emoji, 0, 0);
      } else {
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      }

      ctx.restore();
    }

    if (confettiParticles.length > 0) {
      confettiAnimationId = requestAnimationFrame(animateConfetti);
    } else {
      confettiAnimationId = null;
      ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    }
  }


  /* ==========================================================================
     7. NAVIGATION & BACK-TO-TOP UTILITIES
     ========================================================================== */
  const backToTopBtn = document.getElementById('backToTopBtn');
  const mobileNavToggle = document.getElementById('mobileNavToggle');
  const siteHeader = document.getElementById('siteHeader');

  window.addEventListener('scroll', () => {
    if (backToTopBtn) {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  }, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      soundEngine.playSoftTap();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  if (mobileNavToggle && siteHeader) {
    mobileNavToggle.addEventListener('click', () => {
      siteHeader.classList.toggle('mobile-menu-open');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        siteHeader.classList.remove('mobile-menu-open');
      });
    });
  }

  // Safe HTML Escaping for User-Generated Inputs
  function escapeHTML(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

});
