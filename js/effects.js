/**
 * Knight Rider - Visual Effects
 * Confetti, puffs, toasts and other eye candy ✨
 */

const Effects = (() => {
    const reducedMotion = window.matchMedia
        ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
        : false;

    const COLORS = ['#ffe58a', '#f8bd2f', '#a78bfa', '#7c3aed', '#22c55e', '#7dd8ff', '#ff5a6e', '#ffffff'];

    let canvas = null;
    let ctx = null;
    let particles = [];
    let rafId = null;

    function ensureCanvas() {
        if (!canvas) {
            canvas = document.getElementById('fx-canvas');
            if (!canvas || !canvas.getContext) return false;
            ctx = canvas.getContext('2d');
            window.addEventListener('resize', resizeCanvas);
        }
        resizeCanvas();
        return true;
    }

    function resizeCanvas() {
        if (!canvas) return;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.round(window.innerWidth * dpr);
        canvas.height = Math.round(window.innerHeight * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function pick(list) {
        return list[Math.floor(Math.random() * list.length)];
    }

    function createParticle(x, y, angleDeg, speed, emojis, emojiRatio) {
        const rad = angleDeg * Math.PI / 180;
        const isEmoji = emojis.length > 0 && Math.random() < emojiRatio;
        return {
            x, y,
            vx: Math.cos(rad) * speed,
            vy: Math.sin(rad) * speed,
            rot: Math.random() * Math.PI * 2,
            vr: (Math.random() - 0.5) * 0.3,
            tilt: Math.random() * Math.PI * 2,
            size: isEmoji ? 18 + Math.random() * 14 : 6 + Math.random() * 6,
            color: pick(COLORS),
            emoji: isEmoji ? pick(emojis) : null,
            life: 0,
            maxLife: 200 + Math.random() * 90
        };
    }

    /**
     * Fire confetti cannons from both bottom corners (+ optional rain from above)
     */
    function confetti({ amount = 140, emojis = ['💩', '🚽', '✨', '🎉'], emojiRatio = 0.18, rain = false } = {}) {
        if (reducedMotion || !ensureCanvas()) return;

        const w = window.innerWidth;
        const h = window.innerHeight;

        for (let i = 0; i < amount; i++) {
            const fromLeft = i % 2 === 0;
            const angle = (fromLeft ? -62 : -118) + (Math.random() * 30 - 15);
            const speed = 11 + Math.random() * 11;
            particles.push(createParticle(fromLeft ? -10 : w + 10, h * 0.9, angle, speed, emojis, emojiRatio));
        }

        if (rain) {
            for (let i = 0; i < amount * 0.6; i++) {
                const p = createParticle(Math.random() * w, -20 - Math.random() * h * 0.5, 90, 2 + Math.random() * 3, emojis, emojiRatio);
                p.maxLife = 260 + Math.random() * 80;
                particles.push(p);
            }
        }

        if (!rafId) rafId = requestAnimationFrame(step);
    }

    function step() {
        const w = window.innerWidth;
        const h = window.innerHeight;
        ctx.clearRect(0, 0, w, h);

        particles = particles.filter(p => p.life < p.maxLife && p.y < h + 80);

        for (const p of particles) {
            p.life++;
            p.vx *= 0.985;
            p.vy = p.vy * 0.985 + 0.3;
            p.x += p.vx + Math.sin(p.tilt) * 0.6;
            p.y += p.vy;
            p.rot += p.vr;
            p.tilt += 0.08;

            ctx.save();
            ctx.globalAlpha = Math.min(1, (p.maxLife - p.life) / 40);
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rot);

            if (p.emoji) {
                ctx.font = `${p.size}px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(p.emoji, 0, 0);
            } else {
                ctx.fillStyle = p.color;
                const flip = Math.abs(Math.cos(p.tilt));
                ctx.fillRect(-p.size / 2, -p.size * 0.3 * flip, p.size, p.size * 0.6 * flip + 1);
            }
            ctx.restore();
        }

        if (particles.length) {
            rafId = requestAnimationFrame(step);
        } else {
            rafId = null;
            ctx.clearRect(0, 0, w, h);
        }
    }

    /**
     * Small floating emoji puff (e.g. 💨) at a position in percent of the container
     */
    function puff(container, xPct, yPct, { emoji = '💨', count = 1, spread = 30, rise = 40, duration = 900, scale = 1 } = {}) {
        if (!container || reducedMotion) return;

        for (let i = 0; i < count; i++) {
            const el = document.createElement('span');
            el.className = 'puff';
            el.textContent = Array.isArray(emoji) ? pick(emoji) : emoji;
            el.style.left = `${xPct}%`;
            el.style.top = `${yPct}%`;
            container.appendChild(el);

            if (!el.animate) {
                setTimeout(() => el.remove(), duration);
                continue;
            }

            const dx = (Math.random() - 0.5) * spread;
            const dy = -rise * (0.7 + Math.random() * 0.6);
            const anim = el.animate([
                { transform: `translate(-50%, -50%) translate(0px, 0px) scale(${0.3 * scale})`, opacity: 0 },
                { transform: `translate(-50%, -50%) translate(${dx * 0.3}px, ${dy * 0.2}px) scale(${scale})`, opacity: 1, offset: 0.2 },
                { transform: `translate(-50%, -50%) translate(${dx}px, ${dy}px) scale(${1.6 * scale})`, opacity: 0 }
            ], {
                duration: duration + Math.random() * 300,
                delay: i * 70,
                easing: 'cubic-bezier(.2,.7,.3,1)',
                fill: 'both'
            });
            anim.onfinish = () => el.remove();
        }
    }

    /**
     * Toast notification (replaces alert())
     */
    function toast(message, type = 'info', duration = 2800) {
        const stack = document.getElementById('toast-stack');
        if (!stack) return;

        const el = document.createElement('div');
        el.className = `toast toast--${type}`;
        el.setAttribute('role', type === 'error' ? 'alert' : 'status');
        el.textContent = message;
        stack.appendChild(el);

        setTimeout(() => {
            el.classList.add('is-leaving');
            setTimeout(() => el.remove(), 320);
        }, duration);
    }

    /**
     * Animate a number counting up inside an element
     */
    function countUp(el, to, duration = 900) {
        if (!el) return;
        const target = Number(to) || 0;
        if (reducedMotion || !window.requestAnimationFrame) {
            el.textContent = target;
            return;
        }
        const start = performance.now();
        const tick = (now) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            el.textContent = Math.round(target * eased);
            if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    }

    /**
     * Restart a CSS animation class on an element
     */
    function replayClass(el, className) {
        if (!el) return;
        el.classList.remove(className);
        void el.offsetWidth; // force reflow
        el.classList.add(className);
    }

    return { reducedMotion, confetti, puff, toast, countUp, replayClass };
})();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Effects };
}
