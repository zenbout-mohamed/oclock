let remainingTime = 0;
let timerInterval = null;

const display = document.getElementById("timer-display");
const input = document.getElementById("timer-input");

function updateTimerDisplay() {
    const minutes = String(Math.floor(remainingTime / 60)).padStart(2, "0");
    const seconds = String(remainingTime % 60).padStart(2, "0");
    display.textContent = `${minutes}:${seconds}`;
}

document.getElementById("timer-plus").addEventListener("click", () => {
    remainingTime += 60;
    updateTimerDisplay();
});

document.getElementById("timer-minus").addEventListener("click", () => {
    remainingTime = Math.max(0, remainingTime - 60);
    updateTimerDisplay();
});

input.addEventListener("change", () => {
    remainingTime = Number(input.value);
    updateTimerDisplay();
});

document.getElementById("timer-toggle").addEventListener("click", () => {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
        return;
    }

    timerInterval = setInterval(() => {
        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            alert("Temps écoulé !");
            return;
        }
        remainingTime--;
        updateTimerDisplay();
    }, 1000);
});
