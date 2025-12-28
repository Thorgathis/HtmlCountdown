const $ = (elem) => document.querySelector(elem);

const pluralRu = (n, forms) => {
    const num = Math.abs(Number(n)) % 100;
    const n1 = num % 10;
    if (num > 10 && num < 20) return forms[2];
    if (n1 > 1 && n1 < 5) return forms[1];
    if (n1 === 1) return forms[0];
    return forms[2];
};

const resolveWord = (wordConfig, value) => {
    if (typeof wordConfig === "function") return wordConfig(value);
    if (Array.isArray(wordConfig) && wordConfig.length >= 3) {
        return pluralRu(value, wordConfig);
    }
    return wordConfig ?? "";
};

const countdown = function (_config) {
    const tarDate = $(_config.target).getAttribute("data-date").split("-");
    const day = parseInt(tarDate[0]);
    const month = parseInt(tarDate[1]);
    const year = parseInt(tarDate[2]);
    let tarTime = $(_config.target).getAttribute("data-time");
    let tarhour, tarmin;

    if (tarTime != null) {
        tarTime = tarTime.split(":");
        tarhour = parseInt(tarTime[0]);
        tarmin = parseInt(tarTime[1]);
    }

    let months = [
        31,
        new Date().getFullYear() % 4 == 0 ? 29 : 28,
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31,
    ];

    const countDownDate = new Date(
        year,
        month - 1,
        day,
        tarhour,
        tarmin,
        0,
        0
    ).getTime();

    const dayWordEl = $(_config.target + " .day .word");
    const hourWordEl = $(_config.target + " .hour .word");
    const minWordEl = $(_config.target + " .min .word");
    const secWordEl = $(_config.target + " .sec .word");

    const updateTime = () => {
        const now = new Date().getTime();

        const distance = countDownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        requestAnimationFrame(updateTime);

        $(_config.target + " .day .num").innerHTML = addZero(days);
        $(_config.target + " .hour .num").innerHTML = addZero(hours);
        $(_config.target + " .min .num").innerHTML = addZero(minutes);
        $(_config.target + " .sec .num").innerHTML = addZero(seconds);

        if (dayWordEl) dayWordEl.innerHTML = resolveWord(_config.dayWord, days);
        if (hourWordEl) hourWordEl.innerHTML = resolveWord(_config.hourWord, hours);
        if (minWordEl) minWordEl.innerHTML = resolveWord(_config.minWord, minutes);
        if (secWordEl) secWordEl.innerHTML = resolveWord(_config.secWord, seconds);

        if (distance < 0) {
            $("#countdown").innerHTML =
                '<h1 class="wrapper" >С НОВЫМ ГОДОМ</h1>';
        }
    };

    updateTime();
};

const addZero = (x) => (x < 10 && x >= 0 ? "0" + x : x);
