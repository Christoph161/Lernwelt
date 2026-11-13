// Lernwelt – Logik der App (Muss-Funktionen)
// Braucht fragen.js (BEREICHE, FRAGEN), das vorher geladen wird.

(function () {
  "use strict";

  // ---------- Einstellungen ----------
  const RUNDE = 10; // Fragen pro Übungsrunde
  const SPEICHER_SCHLUESSEL = "lernwelt-fortschritt";
  const DATEN_VERSION = 1;

  // ---------- Elemente ----------
  const el = (id) => document.getElementById(id);

  const hinweisSpeicher = el("hinweis-speicher");
  const resetMeldung = el("reset-meldung");
  const bereichListe = el("bereich-liste");
  const frageZaehler = el("frage-zaehler");
  const frageBereich = el("frage-bereich");
  const frageText = el("frage-text");
  const antwortenBox = el("antworten");
  const feedback = el("feedback");
  const feedbackErgebnis = el("feedback-ergebnis");
  const feedbackErklaerung = el("feedback-erklaerung");
  const btnWeiter = el("btn-weiter");
  const endeErgebnis = el("ende-ergebnis");
  const endeText = el("ende-text");

  // ---------- Datenprüfung ----------
  // Prüft den Fragenkatalog beim Start und meldet Fehler in der Browser-Konsole.
  function pruefeFragen() {
    const fehler = [];
    const ids = new Set();
    const anzahl = {};
    BEREICHE.forEach((b) => { anzahl[b.key] = 0; });

    FRAGEN.forEach((f, i) => {
      const name = f.id || "Frage Nr. " + (i + 1);
      if (!f.id) fehler.push(name + ": ID fehlt");
      else if (ids.has(f.id)) fehler.push(name + ": ID doppelt");
      ids.add(f.id);

      if (!(f.bereich in anzahl)) fehler.push(name + ": unbekannter Bereich „" + f.bereich + "“");
      else anzahl[f.bereich]++;

      if (!f.frage) fehler.push(name + ": Fragetext fehlt");
      if (!Array.isArray(f.antworten) || f.antworten.length !== 4) {
        fehler.push(name + ": braucht genau 4 Antworten");
      } else if (f.antworten.some((a) => !a)) {
        fehler.push(name + ": leere Antwort");
      }
      if (!Number.isInteger(f.richtig) || f.richtig < 0 || f.richtig > 3) {
        fehler.push(name + ": „richtig“ muss 0 bis 3 sein");
      }
      if (!f.erklaerung) fehler.push(name + ": Erklärung fehlt");
    });

    BEREICHE.forEach((b) => {
      if (anzahl[b.key] !== 10) {
        fehler.push("Bereich „" + b.name + "“ hat " + anzahl[b.key] + " statt 10 Fragen");
      }
    });

    fehler.forEach((t) => console.error("Fragenkatalog: " + t));
  }

  // ---------- Speicher (localStorage) ----------
  function pruefeSpeicher() {
    try {
      const test = "__lernwelt_test__";
      localStorage.setItem(test, "1");
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  const speicherVerfuegbar = pruefeSpeicher();

  function leererFortschritt() {
    return { version: DATEN_VERSION, fragen: {}, pruefungen: [] };
  }

  function istZahl(x) {
    return Number.isInteger(x) && x >= 0;
  }

  // Liest den Fortschritt. Bei kaputten Daten gibt es einen leeren Fortschritt.
  function ladeFortschritt() {
    const leer = leererFortschritt();
    if (!speicherVerfuegbar) return leer;

    try {
      const roh = localStorage.getItem(SPEICHER_SCHLUESSEL);
      if (!roh) return leer;

      const daten = JSON.parse(roh);
      if (!daten || typeof daten !== "object" || daten.version !== DATEN_VERSION) return leer;
      if (!daten.fragen || typeof daten.fragen !== "object" || Array.isArray(daten.fragen)) return leer;

      // Nur gültige Einträge zu Fragen übernehmen, die es noch gibt.
      const bekannteIds = new Set(FRAGEN.map((f) => f.id));
      Object.keys(daten.fragen).forEach((id) => {
        const e = daten.fragen[id];
        if (bekannteIds.has(id) && e && istZahl(e.beantwortet) && istZahl(e.richtig) &&
            typeof e.zuletztRichtig === "boolean") {
          leer.fragen[id] = {
            beantwortet: e.beantwortet,
            richtig: e.richtig,
            zuletztRichtig: e.zuletztRichtig
          };
        }
      });
      if (Array.isArray(daten.pruefungen)) leer.pruefungen = daten.pruefungen;
      return leer;
    } catch (e) {
      console.warn("Gespeicherter Fortschritt war unlesbar und wird ignoriert.", e);
      return leererFortschritt();
    }
  }

  function speichereFortschritt() {
    if (!speicherVerfuegbar) return;
    try {
      localStorage.setItem(SPEICHER_SCHLUESSEL, JSON.stringify(fortschritt));
    } catch (e) {
      console.warn("Fortschritt konnte nicht gespeichert werden.", e);
    }
  }

  function loescheFortschritt() {
    fortschritt = leererFortschritt();
    if (!speicherVerfuegbar) return;
    try {
      localStorage.removeItem(SPEICHER_SCHLUESSEL);
    } catch (e) {
      console.warn("Fortschritt konnte nicht gelöscht werden.", e);
    }
  }

  // Merkt sich eine Antwort und speichert sofort.
  function antwortMerken(id, istRichtig) {
    const e = fortschritt.fragen[id] || { beantwortet: 0, richtig: 0, zuletztRichtig: false };
    e.beantwortet++;
    if (istRichtig) e.richtig++;
    e.zuletztRichtig = istRichtig;
    fortschritt.fragen[id] = e;
    speichereFortschritt();
  }

  let fortschritt = ladeFortschritt();

  // ---------- Hilfen ----------
  // Mischt eine Liste (Fisher-Yates) und gibt eine neue Liste zurück.
  function mische(liste) {
    const kopie = liste.slice();
    for (let i = kopie.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [kopie[i], kopie[j]] = [kopie[j], kopie[i]];
    }
    return kopie;
  }

  function bereichName(key) {
    const b = BEREICHE.find((x) => x.key === key);
    return b ? b.name : key;
  }

  // Zeigt eine Ansicht und setzt den Fokus auf ihre Überschrift.
  function zeigeAnsicht(name, fokus) {
    document.querySelectorAll(".ansicht").forEach((s) => {
      s.hidden = s.id !== "ansicht-" + name;
    });
    window.scrollTo(0, 0);
    if (fokus !== false) {
      const ueberschrift = document.querySelector("#ansicht-" + name + " h1");
      if (ueberschrift) ueberschrift.focus({ preventScroll: true });
    }
  }

  function erstelleKnopf(text, klasse, beiKlick) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "knopf " + klasse;
    btn.textContent = text;
    btn.addEventListener("click", beiKlick);
    return btn;
  }

  // ---------- Startseite ----------
  function zeigeStart(fokus) {
    runde = null;
    resetMeldung.textContent = "";
    zeigeAnsicht("start", fokus);
  }

  function fortschrittZuruecksetzen() {
    if (!window.confirm("Wirklich alles löschen? Dein gesamter Lernfortschritt geht verloren.")) {
      return;
    }
    loescheFortschritt();
    resetMeldung.textContent = "Dein Fortschritt wurde gelöscht.";
  }

  // ---------- Bereich wählen ----------
  function baueBereichListe() {
    BEREICHE.forEach((b) => {
      bereichListe.appendChild(erstelleKnopf(b.name, "knopf-zweit", () => starteRunde(b.key)));
    });
    bereichListe.appendChild(
      erstelleKnopf("Alle Bereiche gemischt", "knopf-haupt", () => starteRunde("alle"))
    );
  }

  // ---------- Übungsrunde ----------
  let runde = null; // { auswahl, fragen, index, richtige, beantwortet }

  function starteRunde(auswahl) {
    const pool = auswahl === "alle" ? FRAGEN : FRAGEN.filter((f) => f.bereich === auswahl);
    if (pool.length === 0) {
      console.error("Keine Fragen für die Auswahl „" + auswahl + "“ gefunden.");
      return;
    }
    runde = {
      auswahl: auswahl,
      fragen: mische(pool).slice(0, RUNDE),
      index: 0,
      richtige: 0,
      beantwortet: false
    };
    zeigeFrage();
  }

  function zeigeFrage() {
    const frage = runde.fragen[runde.index];
    runde.beantwortet = false;

    frageZaehler.textContent = "Frage " + (runde.index + 1) + " von " + runde.fragen.length;
    frageBereich.textContent = bereichName(frage.bereich);
    frageText.textContent = frage.frage;

    antwortenBox.replaceChildren();
    mische([0, 1, 2, 3]).forEach((nr) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "antwort";
      btn.dataset.nr = String(nr);

      const zeichen = document.createElement("span");
      zeichen.className = "antwort-zeichen";
      zeichen.setAttribute("aria-hidden", "true");

      const text = document.createElement("span");
      text.className = "antwort-text";
      text.textContent = frage.antworten[nr];

      const zusatz = document.createElement("span");
      zusatz.className = "nur-vorlesen";

      btn.append(zeichen, text, zusatz);
      btn.addEventListener("click", () => beantworte(nr));
      antwortenBox.appendChild(btn);
    });

    feedback.hidden = true;
    feedbackErgebnis.textContent = "";
    feedbackErklaerung.textContent = "";
    btnWeiter.textContent = runde.index + 1 < runde.fragen.length ? "Weiter" : "Ergebnis anzeigen";

    zeigeAnsicht("frage");
  }

  function beantworte(gewaehlt) {
    if (!runde || runde.beantwortet) return;
    runde.beantwortet = true;

    const frage = runde.fragen[runde.index];
    const istRichtig = gewaehlt === frage.richtig;
    if (istRichtig) runde.richtige++;
    antwortMerken(frage.id, istRichtig);

    antwortenBox.querySelectorAll(".antwort").forEach((btn) => {
      const nr = Number(btn.dataset.nr);
      btn.disabled = true;
      const zeichen = btn.querySelector(".antwort-zeichen");
      const zusatz = btn.querySelector(".nur-vorlesen");

      if (nr === frage.richtig) {
        btn.classList.add("ist-richtig");
        zeichen.textContent = "✓";
        zusatz.textContent = nr === gewaehlt ? " (deine Antwort, richtig)" : " (richtige Antwort)";
      } else if (nr === gewaehlt) {
        btn.classList.add("ist-falsch");
        zeichen.textContent = "✗";
        zusatz.textContent = " (deine Antwort, falsch)";
      }
      if (nr === gewaehlt) btn.classList.add("ist-gewaehlt");
    });

    feedbackErgebnis.textContent = istRichtig ? "✓ Richtig!" : "✗ Leider falsch.";
    feedbackErgebnis.className = "feedback-ergebnis " + (istRichtig ? "ist-richtig" : "ist-falsch");
    feedbackErklaerung.textContent = frage.erklaerung;
    feedback.hidden = false;
    btnWeiter.focus();
  }

  function weiter() {
    if (!runde || !runde.beantwortet) return;
    runde.index++;
    if (runde.index < runde.fragen.length) zeigeFrage();
    else zeigeEnde();
  }

  function zeigeEnde() {
    const gesamt = runde.fragen.length;
    const anteil = runde.richtige / gesamt;
    endeErgebnis.textContent = runde.richtige + " von " + gesamt + " richtig";

    if (anteil >= 0.8) endeText.textContent = "Sehr stark! Du bist auf einem guten Weg.";
    else if (anteil >= 0.5) endeText.textContent = "Gut gemacht! Lies dir die Erklärungen noch einmal durch und übe weiter.";
    else endeText.textContent = "Dranbleiben lohnt sich! Wiederhole diesen Bereich, dann wird es besser.";

    zeigeAnsicht("ende");
  }

  // ---------- Start der App ----------
  pruefeFragen();
  if (!speicherVerfuegbar) hinweisSpeicher.hidden = false;
  baueBereichListe();

  el("btn-home").addEventListener("click", () => zeigeStart());
  el("btn-ueben").addEventListener("click", () => zeigeAnsicht("bereich"));
  el("btn-reset").addEventListener("click", fortschrittZuruecksetzen);
  btnWeiter.addEventListener("click", weiter);
  el("btn-nochmal").addEventListener("click", () => starteRunde(runde.auswahl));
  el("btn-zurueck").addEventListener("click", () => zeigeStart());

  zeigeStart(false);
})();
