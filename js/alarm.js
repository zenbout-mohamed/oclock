const alarms = [];

const alarmList = document.getElementById("alarm-list");
const alertBox = document.getElementById("alarm-alert");

function getRemainingTime(alarmDate) {
    const diff = alarmDate - new Date();

    if (diff <= 0) return "passée";

    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    return `dans ${minutes} min ${seconds}s`;
}

function renderAlarms() {
    alarmList.innerHTML = "";

    alarms.forEach(alarm => {
        const li = document.createElement("li");

        const status = getRemainingTime(alarm.date);

        li.textContent = `${alarm.time} — ${alarm.message} (${status})`;
        li.className =
            status === "passée"
                ? "text-red-600"
                : "text-green-600";

        alarmList.appendChild(li);
    });
}

document.getElementById("add-alarm").addEventListener("click", () => {
    const time = document.getElementById("alarm-time").value;
    const message = document.getElementById("alarm-message").value;

    if (!time || !message) return;

    const [hours, minutes] = time.split(":");
    const alarmDate = new Date();
    alarmDate.setHours(hours, minutes, 0, 0);

    if (alarmDate < new Date()) {
        alarmDate.setDate(alarmDate.getDate() + 1);
    }

    alarms.push({
        time,
        message,
        date: alarmDate,
        triggered: false
    });

    renderAlarms();
});

setInterval(() => {
    const now = new Date();

    alarms.forEach(alarm => {
        if (!alarm.triggered && now >= alarm.date) {
            alarm.triggered = true;

            alertBox.textContent = alarm.message;
            alertBox.classList.remove("hidden");

            setTimeout(() => {
                alertBox.classList.add("hidden");
            }, 5000);
        }
    });

    renderAlarms();
}, 1000);
