// script.js — Solutions des exercices

/* --------------------------
   Partie 1 — Variables et portée
   -------------------------- */

// Exercice 1 — Déclarations et portée
function exercice1() {
  let log = [];

  // 3 variables
  var xVar = 1;           // function / global scope (non-strict block-scoped exception)
  let yLet = 2;           // block-scoped
  const zConst = 3;       // block-scoped, immutable binding

  log.push(`Avant bloc: xVar=${xVar}, yLet=${yLet}, zConst=${zConst}`);

  {
    // Nouvelle portée de bloc
    var xVar = 10;     // réaffecte la var dans la fonction/global scope (pas limité au bloc)
    let yLet = 20;     // nouvelle variable différente (shadowing)
    const zConst = 30; // nouvelle constante dans le bloc

    log.push(`Dans bloc: xVar=${xVar} (var réaffectée), yLet=${yLet} (let local), zConst=${zConst} (const local)`);
  }

  log.push(`Après bloc: xVar=${xVar} (var reste modifiée), yLet=${yLet} (let originale inchangée), zConst=${zConst} (const originale inchangée)`);

  // Question piège : réaffecter une const
  let trap = "Réaffecter une const provoque une erreur TypeError si on tente d'assigner une nouvelle valeur.";
  try {
    // Exemple de ce qui cause l'erreur :
    // zConst = 100; // décommenter provoquerait TypeError: Assignment to constant variable.
    // Pour démontrer sans lancer une erreur bloquante, on explique dans trap.
    trap += " (ex: zConst = 100 => TypeError)";
  } catch (e) {
    trap += " (erreur capturée)";
  }

  return { log, trap };
}

// Exercice 2 — Fonctions fléchées
// fonction classique
function sommeClassic(a, b) {
  return a + b;
}
// version fléchée avec return implicite
const sommeArrow = (a, b) => a + b;

/* --------------------------
   Partie 2 — Objets, Classes, Tableaux
   -------------------------- */

function exercice2_5_6_7() {
  let outputs = [];

  // Exercice 5 — Objet livre
  const livre = {
    titre: "Le Petit Prince",
    auteur: "Antoine de Saint-Exupéry",
    annee: 1943,
    getInfo() {
      return `${this.titre} — ${this.auteur} (${this.annee})`;
    }
  };
  outputs.push("Ex5 — getInfo: " + livre.getInfo());

  // Exercice 6 — Classe Etudiant
  class Etudiant {
    constructor(nom, note) {
      this.nom = nom;
      this.note = note;
    }
    getMention() {
      const n = this.note;
      if (n >= 16) return "Très bien";
      if (n >= 14) return "Bien";
      if (n >= 10) return "Passable";
      return "Échec";
    }
  }
  const etu1 = new Etudiant("Sara", 17);
  const etu2 = new Etudiant("Hamza", 15);
  const etu3 = new Etudiant("Lina", 9);
  outputs.push(`Ex6 — ${etu1.nom}: ${etu1.getMention()}, ${etu2.nom}: ${etu2.getMention()}, ${etu3.nom}: ${etu3.getMention()}`);

  // Exercice 7 — Tableaux avancés
  const notes = [12, 5, 17, 9, 20];

  // moyenne (reduce)
  const somme = notes.reduce((acc, v) => acc + v, 0);
  const moyenne = somme / notes.length;
  outputs.push(`Ex7.1 — Moyenne: ${moyenne.toFixed(2)}`);

  // tri décroissant
  const desc = [...notes].sort((a,b) => b - a);
  outputs.push(`Ex7.2 — Tri décroissant: [${desc.join(', ')}]`);

  // filtre >=10
  const admis = notes.filter(n => n >= 10);
  outputs.push(`Ex7.3 — Notes >=10: [${admis.join(', ')}]`);

  return outputs;
}
/* --------------------------
   Partie 3 — Asynchronisme et Fetch
   -------------------------- */

// Exercice 8 — wait promise
const wait = ms => new Promise(res => setTimeout(res, ms));

// Exercice 9 — fetch + async/await (utilise jsonplaceholder)
async function fetchFirstFiveTitles() {
  // Affiche les titres des 5 premiers posts
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!res.ok) throw new Error("Échec du fetch: " + res.status);
  const posts = await res.json();
  return posts.slice(0, 5).map(p => p.title);
}

/* --------------------------
   DOM wiring pour boutons
   -------------------------- */

document.getElementById("run-part1").addEventListener("click", () => {
  const out = document.getElementById("out1");
  const r1 = exercice1();
  let text = r1.log.join("\n");
  text += "\n\nQuestion piège sur const:\n" + r1.trap;
  text += `\n\nEx2 — sommeClassic(2,3) = ${sommeClassic(2,3)}\nEx2 — sommeArrow(2,3) = ${sommeArrow(2,3)}`;
  out.textContent = text;
});

document.getElementById("run-part2").addEventListener("click", () => {
  const out = document.getElementById("out2");
  const outputs = exercice2_5_6_7();
  out.textContent = outputs.join("\n");
});

document.getElementById("run-part3").addEventListener("click", async () => {
  const out = document.getElementById("out3");
  out.textContent = "Début\n(Attente 2s...)";
  await wait(2000);
  out.textContent += "\nFin de la promesse (2s écoulées)\n\nRécupération des titres via fetch...";
  try {
    const titles = await fetchFirstFiveTitles();
    out.textContent += "\n\n5 premiers titres:\n" + titles.map((t,i) => `${i+1}. ${t}`).join("\n");
  } catch (e) {
    out.textContent += "\nErreur fetch: " + e.message;
  }
});

