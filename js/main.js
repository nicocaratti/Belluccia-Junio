(() => {
    "use strict";

    // 1. Spotlight (Efecto linterna)
    const spot = document.querySelector(".spotlight");
    if (spot) {
        window.addEventListener("pointermove", e => {
            spot.style.setProperty("--mx", e.clientX + "px");
            spot.style.setProperty("--my", e.clientY + "px");
        }, { passive: true });
    }

    // 2. Intersection Observer (Reveal suave)
    const io = new IntersectionObserver(entries => {
        entries.forEach(en => {
            if (en.isIntersecting) {
                en.target.classList.add("in");
                io.unobserve(en.target);
            }
        });
    }, { threshold: 0.12 });
    
    document.querySelectorAll(".reveal").forEach(el => io.observe(el));

    // 3. Mar de Iguales
    const sea = document.querySelector("#sea");
    if (sea) {
        const TOTAL = 36;
        const STAR = 22;
        
        for (let i = 0; i < TOTAL; i++) {
            const d = document.createElement("span");
            d.className = "same" + (i === STAR ? " same--star" : "");
            sea.appendChild(d);
        }
    }

    // 4. ParalaX en la Galería Masonry
    const items = document.querySelectorAll(".mg__item");
    if (items.length > 0) {
        window.addEventListener("scroll", () => {
            const vh = window.innerHeight;
            items.forEach(it => {
                const r = it.getBoundingClientRect();
                if (r.bottom < 0 || r.top > vh) return;
                const speed = parseFloat(it.dataset.speed || "1");
                it.style.transform = `translateY(${(r.top - vh / 2) * (speed - 1) * 0.12}px)`;
            });
        }, { passive: true });
    }
})();