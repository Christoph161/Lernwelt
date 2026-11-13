// Fragenkatalog der Lernwelt
// Selbst formulierte Übungsfragen im Stil der Abschlussprüfung Teil 2 (AO 2020).
// Keine echten IHK-Aufgaben. Inhalte vor dem Einsatz fachlich prüfen lassen.
//
// Aufbau einer Frage:
//   id         eindeutig: ver-, fin- oder wis- plus Nummer
//   bereich    vermoegen | finanzierung | wiso
//   frage      Text der Frage
//   antworten  genau 4 Antworten (die App mischt die Reihenfolge)
//   richtig    Position der richtigen Antwort in dieser Datei (0–3)
//   erklaerung kurze Begründung, 1–3 Sätze
//
// Regel: keine Antworten wie „Alle genannten“ oder „A und B“, weil gemischt wird.

const BEREICHE = [
  { key: "vermoegen", name: "Vermögen aufbauen und Risiken absichern" },
  { key: "finanzierung", name: "Finanzierungsvorhaben begleiten" },
  { key: "wiso", name: "Wirtschafts- und Sozialkunde" }
];

const FRAGEN = [
  // ---------- Vermögen aufbauen und Risiken absichern ----------
  {
    id: "ver-01",
    bereich: "vermoegen",
    frage: "Bis zu welchem Betrag sind Einlagen pro Kunde und Bank durch die gesetzliche Einlagensicherung in Deutschland geschützt?",
    antworten: ["50.000 €", "100.000 €", "250.000 €", "Ohne Obergrenze"],
    richtig: 1,
    erklaerung: "Die gesetzliche Einlagensicherung schützt Einlagen bis 100.000 € pro Kunde und Bank. Darüber hinaus können freiwillige Sicherungssysteme der Bankengruppen schützen."
  },
  {
    id: "ver-02",
    bereich: "vermoegen",
    frage: "Wie hoch ist der Sparer-Pauschbetrag für eine alleinstehende Person pro Jahr?",
    antworten: ["801 €", "1.602 €", "1.000 €", "2.000 €"],
    richtig: 2,
    erklaerung: "Seit 2023 beträgt der Sparer-Pauschbetrag 1.000 € für Alleinstehende und 2.000 € für zusammen veranlagte Ehepaare. Bis zu diesem Betrag bleiben Kapitalerträge steuerfrei."
  },
  {
    id: "ver-03",
    bereich: "vermoegen",
    frage: "Was bewirkt ein Freistellungsauftrag, den eine Kundin ihrer Bank erteilt?",
    antworten: [
      "Die Bank behält bis zur angegebenen Höhe keine Abgeltungsteuer auf Kapitalerträge ein.",
      "Die Kundin muss keine Einkommensteuererklärung mehr abgeben.",
      "Die Bank zahlt der Kundin höhere Zinsen.",
      "Die Einlagen der Kundin sind unbegrenzt abgesichert."
    ],
    richtig: 0,
    erklaerung: "Mit dem Freistellungsauftrag nutzt die Kundin ihren Sparer-Pauschbetrag direkt bei der Bank. Bis zu diesem Betrag zieht die Bank keine Steuer von den Kapitalerträgen ab."
  },
  {
    id: "ver-04",
    bereich: "vermoegen",
    frage: "Wie hoch ist der Steuersatz der Abgeltungsteuer (ohne Solidaritätszuschlag und Kirchensteuer)?",
    antworten: ["15 %", "19 %", "30 %", "25 %"],
    richtig: 3,
    erklaerung: "Die Abgeltungsteuer beträgt 25 % der Kapitalerträge. Dazu kommen der Solidaritätszuschlag und gegebenenfalls die Kirchensteuer."
  },
  {
    id: "ver-05",
    bereich: "vermoegen",
    frage: "Welche Aussage beschreibt den Unterschied zwischen einer Aktionärin und einer Anleihegläubigerin richtig?",
    antworten: [
      "Die Aktionärin ist Miteigentümerin des Unternehmens, die Anleihegläubigerin hat ihm Geld geliehen.",
      "Die Anleihegläubigerin ist Miteigentümerin des Unternehmens, die Aktionärin hat ihm Geld geliehen.",
      "Beide sind Miteigentümerinnen und haben ein Stimmrecht in der Hauptversammlung.",
      "Beide haben Anspruch auf einen festen Zins."
    ],
    richtig: 0,
    erklaerung: "Eine Aktie verbrieft einen Anteil am Unternehmen (Eigenkapital). Eine Anleihe verbrieft eine Forderung mit Anspruch auf Zinsen und Rückzahlung (Fremdkapital)."
  },
  {
    id: "ver-06",
    bereich: "vermoegen",
    frage: "Was passiert mit dem Geld der Anleger, wenn die Kapitalverwaltungsgesellschaft eines Investmentfonds insolvent wird?",
    antworten: [
      "Das Geld fällt in die Insolvenzmasse und ist verloren.",
      "Das Fondsvermögen ist Sondervermögen und gehört nicht zur Insolvenzmasse.",
      "Die Anleger erhalten höchstens 20.000 € aus der Einlagensicherung.",
      "Die Anleger müssen die Schulden der Gesellschaft mittragen."
    ],
    richtig: 1,
    erklaerung: "Ein Investmentfonds ist Sondervermögen. Es wird getrennt vom Vermögen der Gesellschaft bei einer Verwahrstelle verwahrt und ist bei einer Insolvenz geschützt."
  },
  {
    id: "ver-07",
    bereich: "vermoegen",
    frage: "Was versteht man bei einer Anleihe unter dem Bonitätsrisiko (Emittentenrisiko)?",
    antworten: [
      "Der Kurs der Anleihe schwankt durch Änderungen des Marktzinses.",
      "Die Anleihe kann an der Börse nicht verkauft werden.",
      "Der Wechselkurs einer Fremdwährung verändert sich.",
      "Der Herausgeber kann Zinsen oder Rückzahlung nicht oder nur teilweise leisten."
    ],
    richtig: 3,
    erklaerung: "Das Bonitätsrisiko ist das Risiko, dass der Emittent zahlungsunfähig wird. Kursschwankungen durch den Marktzins nennt man dagegen Zinsänderungsrisiko."
  },
  {
    id: "ver-08",
    bereich: "vermoegen",
    frage: "Was muss eine Bank einer Privatkundin nach einer Anlageberatung vor dem Abschluss des Wertpapiergeschäfts zur Verfügung stellen?",
    antworten: [
      "Eine Schufa-Auskunft",
      "Einen Grundbuchauszug",
      "Eine Geeignetheitserklärung",
      "Einen Nachweis über ihr Einkommen"
    ],
    richtig: 2,
    erklaerung: "Nach dem Wertpapierhandelsgesetz (WpHG) erhält die Kundin eine Geeignetheitserklärung. Darin begründet die Bank, warum die Empfehlung zu ihren Zielen, ihrem Wissen und ihrer Risikobereitschaft passt."
  },
  {
    id: "ver-09",
    bereich: "vermoegen",
    frage: "Was erhält ein Bausparer, wenn sein Bausparvertrag zugeteilt wird?",
    antworten: [
      "Nur die angesparten Zinsen",
      "Eine Rente bis zum Lebensende",
      "Eine staatliche Prämie in Höhe der Bausparsumme",
      "Sein Bausparguthaben und den Anspruch auf das Bauspardarlehen"
    ],
    richtig: 3,
    erklaerung: "Nach der Zuteilung wird das Guthaben ausgezahlt. Die Lücke bis zur Bausparsumme deckt das Bauspardarlehen mit dem vorher vereinbarten Zins."
  },
  {
    id: "ver-10",
    bereich: "vermoegen",
    frage: "Wann zahlt eine Risikolebensversicherung die Versicherungssumme aus?",
    antworten: [
      "Am Ende der Laufzeit, wenn die versicherte Person noch lebt",
      "Wenn die versicherte Person während der Laufzeit stirbt",
      "In jedem Fall am Ende der Laufzeit",
      "Bei Berufsunfähigkeit der versicherten Person"
    ],
    richtig: 1,
    erklaerung: "Die Risikolebensversicherung zahlt nur im Todesfall während der Laufzeit. Erlebt die Person das Ende, gibt es keine Auszahlung. Deshalb ist sie günstiger als eine Kapitallebensversicherung."
  },

  // ---------- Finanzierungsvorhaben begleiten ----------
  {
    id: "fin-01",
    bereich: "finanzierung",
    frage: "Was ist typisch für ein Annuitätendarlehen?",
    antworten: [
      "Die Rate bleibt gleich, der Zinsanteil sinkt und der Tilgungsanteil steigt.",
      "Die Tilgung bleibt gleich, die Rate sinkt mit der Zeit.",
      "Es werden nur Zinsen gezahlt, die Tilgung erfolgt am Ende in einer Summe.",
      "Die Rate steigt jedes Jahr um einen festen Betrag."
    ],
    richtig: 0,
    erklaerung: "Beim Annuitätendarlehen ist die Rate (Annuität) konstant. Weil die Restschuld sinkt, werden die Zinsen kleiner und der Tilgungsanteil wird größer."
  },
  {
    id: "fin-02",
    bereich: "finanzierung",
    frage: "Wozu dient die Angabe des effektiven Jahreszinses bei einem Verbraucherkredit?",
    antworten: [
      "Er zeigt nur den Sollzins ohne weitere Kosten.",
      "Er zeigt, wie viel die Bank am Kredit verdient.",
      "Er zeigt die Gesamtkosten des Kredits als jährlichen Prozentsatz und macht Angebote vergleichbar.",
      "Er gibt die Höhe der monatlichen Rate an."
    ],
    richtig: 2,
    erklaerung: "Der effektive Jahreszins enthält neben dem Sollzins auch weitere Kosten, die zum Kredit gehören. So können Kunden Angebote verschiedener Banken vergleichen."
  },
  {
    id: "fin-03",
    bereich: "finanzierung",
    frage: "Wie lange kann ein Verbraucher einen Verbraucherdarlehensvertrag in der Regel widerrufen?",
    antworten: ["7 Tage", "30 Tage", "Gar nicht", "14 Tage"],
    richtig: 3,
    erklaerung: "Die Widerrufsfrist beträgt 14 Tage. Sie beginnt erst, wenn der Vertrag geschlossen ist und der Verbraucher alle Pflichtangaben erhalten hat."
  },
  {
    id: "fin-04",
    bereich: "finanzierung",
    frage: "Wofür berechnet die Bank beim Dispositionskredit Sollzinsen?",
    antworten: [
      "Für den ganzen eingeräumten Kreditrahmen, auch wenn er nicht genutzt wird",
      "Nur für den tatsächlich genutzten Betrag und die Dauer der Nutzung",
      "Für einen festen Betrag pro Monat",
      "Nur für Überweisungen ins Ausland"
    ],
    richtig: 1,
    erklaerung: "Der Dispositionskredit ist ein Kontokorrentkredit. Zinsen fallen nur an, solange und soweit das Konto im Minus ist."
  },
  {
    id: "fin-05",
    bereich: "finanzierung",
    frage: "In welcher Abteilung des Grundbuchs wird eine Grundschuld eingetragen?",
    antworten: ["Bestandsverzeichnis", "Abteilung I", "Abteilung III", "Abteilung II"],
    richtig: 2,
    erklaerung: "Abteilung I enthält die Eigentümer, Abteilung II Lasten und Beschränkungen (z. B. Wegerechte), Abteilung III die Grundpfandrechte wie Grundschuld und Hypothek."
  },
  {
    id: "fin-06",
    bereich: "finanzierung",
    frage: "Was bedeutet es, wenn ein Bürge eine selbstschuldnerische Bürgschaft übernimmt?",
    antworten: [
      "Der Bürge haftet nur, wenn der Kreditnehmer gestorben ist.",
      "Der Bürge haftet erst, wenn die Zwangsvollstreckung beim Kreditnehmer erfolglos war.",
      "Der Bürge haftet nur für die Zinsen, nicht für den Kredit.",
      "Der Bürge verzichtet auf die Einrede der Vorausklage, die Bank kann sich sofort an ihn wenden."
    ],
    richtig: 3,
    erklaerung: "Bei der selbstschuldnerischen Bürgschaft verzichtet der Bürge auf die Einrede der Vorausklage. Zahlt der Kreditnehmer nicht, kann die Bank direkt den Bürgen in Anspruch nehmen."
  },
  {
    id: "fin-07",
    bereich: "finanzierung",
    frage: "Ein Handwerker sichert einen Kredit durch Sicherungsübereignung seines Firmenwagens. Wer ist danach Eigentümer und wer Besitzer des Wagens?",
    antworten: [
      "Die Bank wird Eigentümerin, der Handwerker bleibt Besitzer und darf den Wagen weiter nutzen.",
      "Der Handwerker bleibt Eigentümer, die Bank wird Besitzerin.",
      "Die Bank wird Eigentümerin und Besitzerin des Wagens.",
      "Der Handwerker bleibt Eigentümer und Besitzer, die Bank erhält nur eine Grundschuld."
    ],
    richtig: 0,
    erklaerung: "Bei der Sicherungsübereignung erhält die Bank das Sicherungseigentum. Der Kreditnehmer behält den Wagen in seinem Besitz und kann damit weiterarbeiten."
  },
  {
    id: "fin-08",
    bereich: "finanzierung",
    frage: "Was ist der Beleihungswert einer Immobilie?",
    antworten: [
      "Der aktuelle Verkaufspreis auf dem Markt",
      "Der Wert, den die Immobilie nach einer Renovierung hätte",
      "Ein vorsichtig ermittelter Wert, der dauerhaft beim Verkauf erzielbar ist",
      "Der Kaufpreis, den der Kunde bezahlt hat"
    ],
    richtig: 2,
    erklaerung: "Der Beleihungswert wird vorsichtig und langfristig ermittelt. Er liegt meist unter dem Marktwert und ist die Grundlage dafür, wie viel Kredit die Bank gegen die Immobilie gibt."
  },
  {
    id: "fin-09",
    bereich: "finanzierung",
    frage: "Welche Information speichert die SCHUFA NICHT?",
    antworten: [
      "Bestehende Kredite",
      "Die Höhe des Einkommens",
      "Eröffnete Girokonten",
      "Nicht bezahlte, unbestrittene Forderungen"
    ],
    richtig: 1,
    erklaerung: "Die SCHUFA speichert Daten zum Zahlungsverhalten, z. B. Kredite, Konten und Zahlungsausfälle. Einkommen, Vermögen und Kontostände kennt sie nicht."
  },
  {
    id: "fin-10",
    bereich: "finanzierung",
    frage: "Wann muss eine Bank bei einem Verbraucherdarlehen die Kreditwürdigkeit des Kunden prüfen?",
    antworten: [
      "Nur bei Krediten über 50.000 €",
      "Erst wenn der Kunde eine Rate nicht zahlt",
      "Nur wenn der Kunde selbstständig ist",
      "Vor dem Abschluss des Darlehensvertrags"
    ],
    richtig: 3,
    erklaerung: "Die Bank muss die Kreditwürdigkeit vor Vertragsschluss prüfen (§ 505a BGB). Ist der Kunde voraussichtlich nicht in der Lage zurückzuzahlen, darf sie den Vertrag nicht abschließen."
  },

  // ---------- Wirtschafts- und Sozialkunde ----------
  {
    id: "wis-01",
    bereich: "wiso",
    frage: "In welchem Alter ist ein Mensch beschränkt geschäftsfähig?",
    antworten: [
      "Von Geburt bis zum 7. Geburtstag",
      "Vom 7. bis zum 18. Geburtstag",
      "Vom 14. bis zum 21. Geburtstag",
      "Ab dem 18. Geburtstag"
    ],
    richtig: 1,
    erklaerung: "Kinder unter 7 Jahren sind geschäftsunfähig. Von 7 bis unter 18 Jahren ist man beschränkt geschäftsfähig, ab 18 voll geschäftsfähig."
  },
  {
    id: "wis-02",
    bereich: "wiso",
    frage: "Wie kommt ein Kaufvertrag zustande?",
    antworten: [
      "Durch die Lieferung der Ware",
      "Durch die Bezahlung der Ware",
      "Durch zwei übereinstimmende Willenserklärungen: Antrag und Annahme",
      "Nur durch einen schriftlichen Vertrag"
    ],
    richtig: 2,
    erklaerung: "Ein Vertrag entsteht durch Antrag und Annahme. Lieferung und Bezahlung sind die Erfüllung des Vertrags. Eine bestimmte Form ist für die meisten Kaufverträge nicht nötig."
  },
  {
    id: "wis-03",
    bereich: "wiso",
    frage: "Was darf ein Prokurist ohne besondere Befugnis NICHT?",
    antworten: [
      "Grundstücke des Unternehmens verkaufen oder belasten",
      "Mitarbeiter einstellen",
      "Kredite für das Unternehmen aufnehmen",
      "Verträge mit Lieferanten unterschreiben"
    ],
    richtig: 0,
    erklaerung: "Die Prokura erlaubt fast alle Geschäfte eines Handelsgewerbes. Für den Verkauf und die Belastung von Grundstücken braucht der Prokurist aber eine besondere Befugnis (§ 49 HGB)."
  },
  {
    id: "wis-04",
    bereich: "wiso",
    frage: "Wer haftet bei einer GmbH für die Schulden der Gesellschaft?",
    antworten: [
      "Die Gesellschafter mit ihrem gesamten Privatvermögen",
      "Der Geschäftsführer mit seinem Privatvermögen",
      "Die Hausbank der GmbH",
      "Die GmbH mit ihrem Gesellschaftsvermögen"
    ],
    richtig: 3,
    erklaerung: "Die GmbH haftet mit ihrem eigenen Vermögen. Die Gesellschafter riskieren nur ihre Einlage und haften nicht mit ihrem Privatvermögen."
  },
  {
    id: "wis-05",
    bereich: "wiso",
    frage: "Wie kann ein Ausbildungsverhältnis während der Probezeit gekündigt werden?",
    antworten: [
      "Nur mit einer Frist von vier Wochen",
      "Jederzeit ohne Kündigungsfrist, aber schriftlich",
      "Nur durch den Ausbildungsbetrieb",
      "Nur mündlich und mit Zustimmung der IHK"
    ],
    richtig: 1,
    erklaerung: "In der Probezeit können beide Seiten jederzeit ohne Kündigungsfrist kündigen (§ 22 BBiG). Die Kündigung muss schriftlich erfolgen."
  },
  {
    id: "wis-06",
    bereich: "wiso",
    frage: "Ab wie vielen ständigen, wahlberechtigten Arbeitnehmern kann in einem Betrieb ein Betriebsrat gewählt werden?",
    antworten: ["5", "10", "20", "50"],
    richtig: 0,
    erklaerung: "Nach dem Betriebsverfassungsgesetz kann ein Betriebsrat in Betrieben mit mindestens fünf ständigen wahlberechtigten Arbeitnehmern gewählt werden."
  },
  {
    id: "wis-07",
    bereich: "wiso",
    frage: "Wer schließt einen Flächentarifvertrag ab?",
    antworten: [
      "Betriebsrat und Arbeitgeber",
      "Bundesregierung und Gewerkschaft",
      "Gewerkschaft und Arbeitgeberverband",
      "Arbeitnehmer und Arbeitgeber einzeln"
    ],
    richtig: 2,
    erklaerung: "Tarifverträge schließen die Tarifparteien: Gewerkschaften und Arbeitgeberverbände. Was Betriebsrat und Arbeitgeber vereinbaren, ist eine Betriebsvereinbarung."
  },
  {
    id: "wis-08",
    bereich: "wiso",
    frage: "Welcher Zweig der Sozialversicherung wird allein vom Arbeitgeber bezahlt?",
    antworten: [
      "Rentenversicherung",
      "Krankenversicherung",
      "Arbeitslosenversicherung",
      "Gesetzliche Unfallversicherung"
    ],
    richtig: 3,
    erklaerung: "Die Beiträge zur gesetzlichen Unfallversicherung (Berufsgenossenschaft) zahlt nur der Arbeitgeber. Die anderen Zweige teilen sich Arbeitnehmer und Arbeitgeber."
  },
  {
    id: "wis-09",
    bereich: "wiso",
    frage: "Wie viele Stunden pro Woche dürfen Jugendliche nach dem Jugendarbeitsschutzgesetz höchstens arbeiten?",
    antworten: ["35 Stunden", "38 Stunden", "40 Stunden", "48 Stunden"],
    richtig: 2,
    erklaerung: "Jugendliche dürfen höchstens 8 Stunden am Tag und 40 Stunden in der Woche beschäftigt werden."
  },
  {
    id: "wis-10",
    bereich: "wiso",
    frage: "Was ist das vorrangige Ziel der Europäischen Zentralbank (EZB)?",
    antworten: [
      "Preisniveaustabilität",
      "Vollbeschäftigung",
      "Ein hohes Wirtschaftswachstum",
      "Ein ausgeglichener Staatshaushalt"
    ],
    richtig: 0,
    erklaerung: "Das vorrangige Ziel der EZB ist die Preisniveaustabilität. Sie strebt mittelfristig eine Inflationsrate von 2 % an."
  }
];
