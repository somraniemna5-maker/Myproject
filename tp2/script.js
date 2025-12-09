let tasks = [];


console.log("👋 Bienvenue ! Le script fonctionne correctement.");
function displayTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((tache, index) => {
        const li = document.createElement("li");

        const text = document.createElement("span");
        text.textContent = tache.text;
        if (tache.done) text.classList.add("done");

        const btnDelete = document.createElement("button");
        btnDelete.textContent = "Supprimer";

        const btnDone = document.createElement("button");
        btnDone.textContent = tache.done ? "↩️" : "✓";

        // Events
        btnDelete.onclick = () => supprimerTache(index);
        btnDone.onclick = () => terminerTache(index);

        li.appendChild(text);
        li.appendChild(btnDone);
        li.appendChild(btnDelete);

        list.appendChild(li);
    });
}
document.getElementById("addBtn").addEventListener("click", ajouterTache);

document.getElementById("taskInput").addEventListener("keydown", (e) => {
    if (e.key === "Enter") ajouterTache();
});
function ajouterTache() {
    let input = document.getElementById("taskInput");
    let texte = input.value.trim();

    if (texte === "") {
        alert("La tâche est vide. Ehhh ? 😭");
        return;
    }

    tasks.push({ text: texte, done: false });
    input.value = "";

    saveTasks();
    displayTasks();
}

function supprimerTache(index) {
    tasks.splice(index, 1);
    saveTasks();
    displayTasks();
}

function terminerTache(index) {
    tasks[index].done = !tasks[index].done;
    saveTasks();
    displayTasks();
}
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let data = localStorage.getItem("tasks");
    if (data) {
        tasks = JSON.parse(data);
    }
    displayTasks();
}

loadTasks(); // au chargement de la page
