let stopwatchTime = 0;
let stopwatchInterval = null;

const stopwatchDisplay = document.getElementById("stopwatch-display");
const lapsList = document.getElementById("laps");
const stopwatchToggle = document.getElementById("stopwatch-toggle");
const stopwatchLap = document.getElementById("stopwatch-lap");
const stopwatchReset = document.getElementById("stopwatch-reset");

function formatStopwatch(ms) {
    const minutes = String(Math.floor(ms / 60000)).padStart(2, "0");
    const seconds = String(Math.floor((ms % 60000) / 1000)).padStart(2, "0");
    const millis = String(ms % 1000).padStart(3, "0");
    return `${minutes}:${seconds}.${millis}`;
}

function updateStopwatch() {
    stopwatchDisplay.textContent = formatStopwatch(stopwatchTime);
}

stopwatchToggle.addEventListener("click", () => {
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

stopwatchLap.addEventListener("click", () => {
    if (!stopwatchInterval) return;

    const li = document.createElement("li");
    li.textContent = formatStopwatch(stopwatchTime);
    li.className = "border-b py-1";
    lapsList.appendChild(li);
});

stopwatchReset.addEventListener("click", () => {
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
    stopwatchTime = 0;
    lapsList.innerHTML = "";
    updateStopwatch();
});

updateStopwatch();
