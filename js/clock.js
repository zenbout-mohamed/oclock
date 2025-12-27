function updateClock() {
    const now = new Date();
    // UTC + 1 (heure française)
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const franceTime = new Date(utc + 3600000);

    const h = String(franceTime.getHours()).padStart(2, "0");
    const m = String(franceTime.getMinutes()).padStart(2, "0");
    const s = String(franceTime.getSeconds()).padStart(2, "0");

    document.getElementById("clock-time").textContent = `${h}:${m}:${s}`;
}

updateClock();
setInterval(updateClock, 1000);
