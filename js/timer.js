let timerSeconds = 0;
let timerInterval = null;

const timerDisplay = document.getElementById("timer-display");
const timerInput = document.getElementById("timer-input");
const timerPlus = document.getElementById("timer-plus");
const timerMinus = document.getElementById("timer-minus");
const timerToggle = document.getElementById("timer-toggle");

function updateTimerDisplay() {
    const minutes = String(Math.floor(timerSeconds / 60)).padStart(2, "0");
    const seconds = String(timerSeconds % 60).padStart(2, "0");
    timerDisplay.textContent = `${minutes}:${seconds}`;
}

timerPlus.addEventListener("click", () => {
    timerSeconds += 60;
    updateTimerDisplay();
});

timerMinus.addEventListener("click", () => {
    timerSeconds = Math.max(0, timerSeconds - 60);
    updateTimerDisplay();
});

timerInput.addEventListener("change", () => {
    timerSeconds = Math.max(0, parseInt(timerInput.value || 0));
    updateTimerDisplay();
});

timerToggle.addEventListener("click", () => {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
        return;
    }

    if (timerSeconds <= 0) return;

    timerInterval = setInterval(() => {
        timerSeconds--;
        updateTimerDisplay();

        if (timerSeconds <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            alert("⏰ Temps écoulé !");
        }
    }, 1000);
});

updateTimerDisplay();
