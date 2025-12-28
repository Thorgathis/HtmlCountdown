const efcc_countdown = new countdown({
    target: ".countdown",
    dayWord: [" день", " дня", " дней"],
    hourWord: [" час", " часа", " часов"],
    minWord: [" минута", " минуты", " минут"],
    secWord: [" секунда", " секунды", " секунд"],
});

(() => {
    const snowRoot = document.querySelector(".holiday-snow");
    if (!snowRoot) return;

    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (reducedMotion?.matches) return;

    const rand = (min, max) => min + Math.random() * (max - min);

    const applyParams = (flake) => {
        const size = Math.round(rand(3, 8));
        const duration = rand(10, 22);
        const drift = Math.round(rand(-80, 80));
        const scale = rand(0.75, 1.35);
        const left = rand(2, 98);

        flake.style.left = `${left}%`;
        flake.style.setProperty("--size", `${size}px`);
        flake.style.setProperty("--duration", `${duration.toFixed(2)}s`);
        flake.style.setProperty("--drift", `${drift}px`);
        flake.style.setProperty("--scale", `${scale.toFixed(2)}`);
        flake.style.setProperty("--delay", `0s`);
    };

    const MAX_FLAKES_ON_SCREEN = 90;
    const SPAWN_INTERVAL_MS = 140;

    const spawnOne = () => {
        if (snowRoot.childElementCount >= MAX_FLAKES_ON_SCREEN) return;

        const flake = document.createElement("span");
        flake.className = "holiday-snowflake";
        applyParams(flake);
        flake.addEventListener(
            "animationend",
            () => {
                flake.remove();
            },
            { once: true }
        );
        snowRoot.appendChild(flake);
    };

    snowRoot.classList.add("holiday-snow--ready");
    spawnOne();
    window.setInterval(spawnOne, SPAWN_INTERVAL_MS);
})();
