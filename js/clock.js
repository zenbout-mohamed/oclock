const clockDisplay = document.getElementById("clock-time");

function updateClock() {
    const now = new Date();

    // Heure française UTC +1
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const parisTime = new Date(utc + 3600000);

    const hours = String(parisTime.getHours()).padStart(2, "0");
    const minutes = String(parisTime.getMinutes()).padStart(2, "0");
    const seconds = String(parisTime.getSeconds()).padStart(2, "0");

    clockDisplay.textContent = `${hours}:${minutes}:${seconds}`;
}

setInterval(updateClock, 1000);
updateClock();
