// Lernwelt – Logik der App (Muss-Funktionen)
// Braucht fragen.js (BEREICHE, FRAGEN), das vorher geladen wird.

(function () {
  "use strict";

  // ---------- Einstellungen ----------
  const RUNDE = 10; // Fragen pro Übungsrunde
  const SPEICHER_SCHLUESSEL = "lernwelt-fortschritt";
  const DATEN_VERSION = 1;

  const PRUEFUNG_PRO_BEREICH = 5; // Fragen pro Bereich in der Prüfung
  const PRUEFUNG_MINUTEN = 15;
  const KNAPP_MS = 60 * 1000; // ab hier wird der Timer rot
  const MAX_PRUEFUNGEN = 5; // so viele Ergebnisse werden gespeichert

  // IHK-Punkteschlüssel: [ab Punkte, Note, Text]
  const NOTEN = [
    [92, 1, "sehr gut"],
    [81, 2, "gut"],
    [67, 3, "befriedigend"],
    [50, 4, "ausreichend"],
    [30, 5, "mangelhaft"],
    [0, 6, "ungenügend"]
  ];

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
      if (Array.isArray(daten.pruefungen)) {
        leer.pruefungen = daten.pruefungen
          .filter((p) => p && typeof p.datum === "string" &&
            Number.isInteger(p.punkte) && p.punkte >= 0 && p.punkte <= 100 &&
            Number.isInteger(p.note) && p.note >= 1 && p.note <= 6)
          .map((p) => ({ datum: p.datum, punkte: p.punkte, note: p.note }))
          .slice(0, MAX_PRUEFUNGEN);
      }
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

  // Merkt sich eine Antwort. Speichert sofort, außer speichern = false.
  function antwortMerken(id, istRichtig, speichern = true) {
    const e = fortschritt.fragen[id] || { beantwortet: 0, richtig: 0, zuletztRichtig: false };
    e.beantwortet++;
    if (istRichtig) e.richtig++;
    e.zuletztRichtig = istRichtig;
    fortschritt.fragen[id] = e;
    if (speichern) speichereFortschritt();
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

  // ---------- Prüfungsmodus ----------
  const timer = el("timer");
  const timerZeit = el("timer-zeit");
  const pZaehler = el("pruefung-zaehler");
  const pBereich = el("pruefung-bereich");
  const pText = el("pruefung-text");
  const pAntworten = el("pruefung-antworten");
  const pNummern = el("pruefung-nummern");
  const pOffen = el("pruefung-offen");
  const btnPZurueck = el("btn-p-zurueck");
  const btnPWeiter = el("btn-p-weiter");

  let pruefung = null; // { fragen, reihenfolgen, antworten, index, endeZeit, intervall }

  function noteFuer(punkte) {
    const eintrag = NOTEN.find((n) => punkte >= n[0]);
    return { note: eintrag[1], text: eintrag[2] };
  }

  function warnungBeimVerlassen(e) {
    e.preventDefault();
    e.returnValue = "";
  }

  function startePruefung() {
    let fragen = [];
    BEREICHE.forEach((b) => {
      const ausBereich = FRAGEN.filter((f) => f.bereich === b.key);
      fragen = fragen.concat(mische(ausBereich).slice(0, PRUEFUNG_PRO_BEREICH));
    });
    fragen = mische(fragen);

    if (pruefung) clearInterval(pruefung.intervall);
    pruefung = {
      fragen: fragen,
      reihenfolgen: fragen.map(() => mische([0, 1, 2, 3])),
      antworten: fragen.map(() => null),
      index: 0,
      endeZeit: Date.now() + PRUEFUNG_MINUTEN * 60 * 1000,
      intervall: null
    };
    pruefung.intervall = setInterval(tick, 250);
    window.addEventListener("beforeunload", warnungBeimVerlassen);

    timer.hidden = false;
    tick();
    zeigePruefungsfrage(true);
  }

  function formatiereZeit(ms) {
    const sekunden = Math.max(0, Math.ceil(ms / 1000));
    const m = Math.floor(sekunden / 60);
    const s = sekunden % 60;
    return String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
  }

  function tick() {
    if (!pruefung) return;
    const rest = pruefung.endeZeit - Date.now();
    timerZeit.textContent = formatiereZeit(rest);
    timer.classList.toggle("ist-knapp", rest <= KNAPP_MS);
    if (rest <= 0) pruefungAbgeben(true);
  }

  function stoppePruefung() {
    if (!pruefung) return;
    clearInterval(pruefung.intervall);
    window.removeEventListener("beforeunload", warnungBeimVerlassen);
    timer.hidden = true;
    timer.classList.remove("ist-knapp");
  }

  // Zeigt die aktuelle Prüfungsfrage. Ohne Rückmeldung zu richtig/falsch.
  function zeigePruefungsfrage(neueAnsicht) {
    const i = pruefung.index;
    const frage = pruefung.fragen[i];
    const gewaehlt = pruefung.antworten[i];

    pZaehler.textContent = "Frage " + (i + 1) + " von " + pruefung.fragen.length;
    pBereich.textContent = bereichName(frage.bereich);
    pText.textContent = frage.frage;

    pAntworten.replaceChildren();
    pruefung.reihenfolgen[i].forEach((nr) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "antwort";
      btn.dataset.nr = String(nr);
      btn.setAttribute("aria-pressed", String(nr === gewaehlt));
      if (nr === gewaehlt) btn.classList.add("ist-ausgewaehlt");

      const zeichen = document.createElement("span");
      zeichen.className = "antwort-zeichen";
      zeichen.setAttribute("aria-hidden", "true");
      zeichen.textContent = nr === gewaehlt ? "●" : "○";

      const text = document.createElement("span");
      text.className = "antwort-text";
      text.textContent = frage.antworten[nr];

      btn.append(zeichen, text);
      btn.addEventListener("click", () => waehlePruefungsantwort(nr));
      pAntworten.appendChild(btn);
    });

    btnPZurueck.disabled = i === 0;
    btnPWeiter.disabled = i === pruefung.fragen.length - 1;
    baueNummern();

    if (neueAnsicht) zeigeAnsicht("pruefung");
  }

  function baueNummern() {
    pNummern.replaceChildren();
    pruefung.fragen.forEach((f, i) => {
      const beantwortet = pruefung.antworten[i] !== null;
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "nummer";
      btn.textContent = String(i + 1);
      btn.setAttribute("aria-label", "Frage " + (i + 1) + (beantwortet ? ", beantwortet" : ", offen"));
      if (beantwortet) btn.classList.add("ist-beantwortet");
      if (i === pruefung.index) btn.setAttribute("aria-current", "step");
      btn.addEventListener("click", () => springeZu(i));
      pNummern.appendChild(btn);
    });
    const offen = anzahlOffen();
    pOffen.textContent = offen === 0 ? "Alle Fragen beantwortet." : "Noch " + offen + " von " + pruefung.fragen.length + " Fragen offen.";
  }

  function anzahlOffen() {
    return pruefung.antworten.filter((a) => a === null).length;
  }

  function waehlePruefungsantwort(nr) {
    if (!pruefung) return;
    pruefung.antworten[pruefung.index] = nr;
    zeigePruefungsfrage(false);
    const btn = pAntworten.querySelector('[data-nr="' + nr + '"]');
    if (btn) btn.focus();
  }

  function springeZu(i) {
    if (!pruefung || i < 0 || i >= pruefung.fragen.length) return;
    pruefung.index = i;
    zeigePruefungsfrage(true);
  }

  function pruefungAbgeben(automatisch) {
    if (!pruefung) return;
    const offen = anzahlOffen();
    if (!automatisch && offen > 0 &&
        !window.confirm("Noch " + offen + (offen === 1 ? " Frage" : " Fragen") + " offen. Trotzdem abgeben?")) {
      return;
    }
    stoppePruefung();

    const gesamt = pruefung.fragen.length;
    let richtige = 0;
    pruefung.fragen.forEach((f, i) => {
      const a = pruefung.antworten[i];
      if (a === null) return; // offene Fragen zählen nicht für den Fortschritt
      const ok = a === f.richtig;
      if (ok) richtige++;
      antwortMerken(f.id, ok, false);
    });

    const punkte = Math.round((richtige / gesamt) * 100);
    const note = noteFuer(punkte);
    fortschritt.pruefungen.unshift({ datum: new Date().toISOString(), punkte: punkte, note: note.note });
    fortschritt.pruefungen = fortschritt.pruefungen.slice(0, MAX_PRUEFUNGEN);
    speichereFortschritt();

    const ergebnis = { fragen: pruefung.fragen, antworten: pruefung.antworten, richtige, gesamt, punkte, note, automatisch };
    pruefung = null;
    zeigePruefungsergebnis(ergebnis);
  }

  function pruefungAbbrechen() {
    stoppePruefung();
    pruefung = null;
  }

  function zeile(klasse, text) {
    const p = document.createElement("p");
    p.className = klasse;
    p.textContent = text;
    return p;
  }

  function zeigePruefungsergebnis(e) {
    el("ergebnis-titel").textContent = e.automatisch ? "Die Zeit ist abgelaufen" : "Prüfung abgegeben";
    el("ergebnis-punkte").textContent = e.punkte + " Punkte";
    el("ergebnis-note").textContent = "Note " + e.note.note + " – " + e.note.text;
    el("ergebnis-richtig").textContent = e.richtige + " von " + e.gesamt + " Fragen richtig";

    const liste = el("auswertung");
    liste.replaceChildren();
    e.fragen.forEach((f, i) => {
      const a = e.antworten[i];
      const li = document.createElement("li");
      li.className = "auswertung-eintrag";

      li.appendChild(zeile("auswertung-frage", f.frage));
      if (a === null) {
        li.classList.add("ist-offen");
        li.appendChild(zeile("auswertung-antwort ist-falsch", "✗ Keine Antwort"));
      } else if (a === f.richtig) {
        li.classList.add("ist-richtig");
        li.appendChild(zeile("auswertung-antwort ist-richtig", "✓ Deine Antwort: " + f.antworten[a]));
      } else {
        li.classList.add("ist-falsch");
        li.appendChild(zeile("auswertung-antwort ist-falsch", "✗ Deine Antwort: " + f.antworten[a]));
      }
      if (a !== f.richtig) {
        li.appendChild(zeile("auswertung-loesung", "Richtig: " + f.antworten[f.richtig]));
      }
      li.appendChild(zeile("auswertung-erklaerung", f.erklaerung));
      liste.appendChild(li);
    });

    zeigeAnsicht("pruefung-ergebnis");
  }

  function zurStartseite() {
    if (pruefung) {
      if (!window.confirm("Prüfung wirklich abbrechen? Sie wird nicht gewertet.")) return;
      pruefungAbbrechen();
    }
    zeigeStart();
  }

  // ---------- Start der App ----------
  pruefeFragen();
  if (!speicherVerfuegbar) hinweisSpeicher.hidden = false;
  baueBereichListe();

  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) tick();
  });

  el("btn-home").addEventListener("click", zurStartseite);
  el("btn-pruefung").addEventListener("click", startePruefung);
  btnPZurueck.addEventListener("click", () => springeZu(pruefung.index - 1));
  btnPWeiter.addEventListener("click", () => springeZu(pruefung.index + 1));
  el("btn-abgeben").addEventListener("click", () => pruefungAbgeben(false));
  el("btn-neue-pruefung").addEventListener("click", startePruefung);
  el("btn-ergebnis-start").addEventListener("click", () => zeigeStart());
  el("btn-ueben").addEventListener("click", () => zeigeAnsicht("bereich"));
  el("btn-reset").addEventListener("click", fortschrittZuruecksetzen);
  btnWeiter.addEventListener("click", weiter);
  el("btn-nochmal").addEventListener("click", () => starteRunde(runde.auswahl));
  el("btn-zurueck").addEventListener("click", () => zeigeStart());

  zeigeStart(false);
})();
