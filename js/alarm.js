// Tableau local pour gérer l'affichage
const alarms = [];

const alarmList = document.getElementById("alarm-list");
const alertBox = document.getElementById("alarm-alert");

// Fonction pour calculer le temps restant
function getRemainingTime(alarmDate) {
    const diff = alarmDate - new Date();

    if (diff <= 0) return "passée";

    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    return `dans ${minutes} min ${seconds}s`;
}

// Fonction pour afficher les alarmes
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

// Récupération des alarmes depuis la base au chargement
fetch("get_alarms.php")
    .then(res => res.json())
    .then(data => {
        data.forEach(alarmDB => {
            const [hours, minutes] = alarmDB.alarm_time.split(":");
            const alarmDate = new Date();
            alarmDate.setHours(hours, minutes, 0, 0);

            // Si l'heure est passée, ajouter 1 jour
            if (alarmDate < new Date()) {
                alarmDate.setDate(alarmDate.getDate() + 1);
            }

            alarms.push({
                id: alarmDB.id,
                time: alarmDB.alarm_time,
                message: alarmDB.message,
                date: alarmDate,
                triggered: alarmDB.triggered == 1
            });
        });

        renderAlarms();
    });

// --- 2️⃣ Ajouter une alarme dans la base ---
document.getElementById("add-alarm").addEventListener("click", () => {
    const time = document.getElementById("alarm-time").value;
    const message = document.getElementById("alarm-message").value;

    if (!time || !message) return;

    // Envoyer au serveur
    fetch("add_alarm.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `time=${time}&message=${message}`
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            // Ajouter localement pour l'affichage immédiat
            const [hours, minutes] = time.split(":");
            const alarmDate = new Date();
            alarmDate.setHours(hours, minutes, 0, 0);
            if (alarmDate < new Date()) alarmDate.setDate(alarmDate.getDate() + 1);

            alarms.push({
                id: data.id || null,
                time,
                message,
                date: alarmDate,
                triggered: false
            });

            renderAlarms();
        }
    });
});

// --- 3️⃣ Vérification périodique des alarmes ---
setInterval(() => {
    const now = new Date();

    alarms.forEach(alarm => {
        if (!alarm.triggered && now >= alarm.date) {
            alarm.triggered = true;

            // Affichage de l'alerte visuelle
            alertBox.textContent = alarm.message;
            alertBox.classList.remove("hidden");
            setTimeout(() => alertBox.classList.add("hidden"), 5000);

            // Mise à jour de la base
            if (alarm.id) {
                fetch("update_alarm.php", {
                    method: "POST",
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: `id=${alarm.id}`
                });
            }
        }
    });

    renderAlarms();
}, 1000);
