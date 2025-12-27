let stopwatchTime = 0;
let stopwatchInterval = null;

const display = document.getElementById("stopwatch-display");
const lapsList = document.getElementById("laps");

function formatStopwatch(ms) {
    const minutes = String(Math.floor(ms / 60000)).padStart(2, "0");
    const seconds = String(Math.floor((ms % 60000) / 1000)).padStart(2, "0");
    const millis = String(ms % 1000).padStart(3, "0");
    return `${minutes}:${seconds}.${millis}`;
}

function updateStopwatch() {
    display.textContent = formatStopwatch(stopwatchTime);
}

document.getElementById("stopwatch-toggle").addEventListener("click", () => {
    if (stopwatchInterval) {
        clearInterval(stopwatchInterval);
        stopwatchInterval = null;
        return;
    }

    stopwatchInterval = setInterval(() => {
        stopwatchTime += 10;
        updateStopwatch();
    }, 10);
});

document.getElementById("stopwatch-lap").addEventListener("click", () => {
    if (!stopwatchInterval) return;

    const li = document.createElement("li");
    li.textContent = formatStopwatch(stopwatchTime);
    li.className = "border-b py-1";
    lapsList.appendChild(li);
});

document.getElementById("stopwatch-reset").addEventListener("click", () => {
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
    stopwatchTime = 0;
    lapsList.innerHTML = "";
    updateStopwatch();
});

updateStopwatch();
