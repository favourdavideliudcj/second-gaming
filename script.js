document.addEventListener('DOMContentLoaded', () => {
    // 1. Roster Division Filtering
    const tabButtons = document.querySelectorAll('.tab-btn');
    const playerCards = document.querySelectorAll('.player-card');
  
    tabButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        tabButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
  
        const division = btn.dataset.division;
        playerCards.forEach((card) => {
          if (division === 'all' || card.dataset.division === division) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  
    // 2. Reaction Speed Benchmark Logic
    const modal = document.getElementById('reactionModal');
    const pad = document.getElementById('reactionPad');
    const bestScoreEl = document.getElementById('bestScore');
  
    let state = 'idle'; // idle | waiting | ready
    let startTime = 0;
    let timeoutId = null;
    let bestTime = null;
  
    function openModal() {
      modal.classList.add('active');
      resetPad();
    }
  
    function closeModal() {
      modal.classList.remove('active');
      clearTimeout(timeoutId);
    }
  
    function resetPad() {
      clearTimeout(timeoutId);
      state = 'idle';
      pad.className = 'reaction-pad state-idle';
      pad.textContent = 'CLICK TO START';
    }
  
    pad.addEventListener('mousedown', () => {
      if (state === 'idle') {
        state = 'waiting';
        pad.className = 'reaction-pad state-wait';
        pad.textContent = 'WAIT FOR GREEN...';
  
        const delay = Math.floor(Math.random() * 2500) + 1200;
        timeoutId = setTimeout(() => {
          state = 'ready';
          startTime = performance.now();
          pad.className = 'reaction-pad state-go';
          pad.textContent = 'CLICK NOW!';
        }, delay);
      } else if (state === 'waiting') {
        clearTimeout(timeoutId);
        state = 'idle';
        pad.className = 'reaction-pad state-idle';
        pad.textContent = 'TOO EARLY! CLICK TO RETRY';
      } else if (state === 'ready') {
        const reactionTime = Math.round(performance.now() - startTime);
        state = 'idle';
        pad.className = 'reaction-pad state-idle';
        pad.textContent = `${reactionTime} ms — CLICK TO PLAY AGAIN`;
  
        if (bestTime === null || reactionTime < bestTime) {
          bestTime = reactionTime;
          bestScoreEl.textContent = bestTime;
        }
      }
    });
  
    document.getElementById('openTestNav').addEventListener('click', openModal);
    document.getElementById('openTestHero').addEventListener('click', openModal);
    document.getElementById('closeReactionModal').addEventListener('click', closeModal);
  });
  