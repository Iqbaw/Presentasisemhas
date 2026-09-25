import type { CSSProperties, ReactNode } from 'react';
import Deck from './deck/Deck';
import Slide from './deck/Slide';
import Build from './deck/Build';
import Reveal from './deck/Reveal';
import Cover from './components/Cover';
import Split from './components/Split';
import Steps from './components/Steps';
import Table from './components/Table';
import Timeline from './components/Timeline';
import StatGrid from './components/StatGrid';
import CountUp from './components/CountUp';
import Tabs from './components/Tabs';
import BigNumber from './components/BigNumber';
import KompositaVisual from './components/KompositaVisual';
import HBarChart from './components/HBarChart';
import PairList from './components/PairList';

/* Seminar Hasil — deutsche Version (Sprachniveau A1–A2), 10 Minuten.
   Die Notizen jeder Folie sind das Sprechskript (Presenter-Modus: Taste P).
   Alle Zahlen und Beispiele stammen aus der Skripsi (Bab I–V). */

const panel: CSSProperties = {
  position: 'absolute',
  inset: 0,
  background:
    'radial-gradient(120% 100% at 30% 20%, color-mix(in srgb, var(--primary) 10%, transparent), transparent 60%), var(--surface)',
};
const card: CSSProperties = {
  padding: 'clamp(18px,2vw,26px)',
  borderRadius: 'var(--radius)',
  background: 'var(--surface)',
  border: '1px solid var(--hair)',
  textAlign: 'left',
};
const pairTitle: CSSProperties = {
  fontFamily: 'var(--font-head)',
  fontSize: 'clamp(24px,2.6vw,34px)',
  fontWeight: 600,
};

function Heading({ kicker, children }: { kicker: string; children: ReactNode }) {
  return (
    <Reveal>
      <div className="kicker" style={{ marginBottom: 12, textAlign: 'center' }}>
        {kicker}
      </div>
      <h2
        className="headline"
        style={{
          textAlign: 'center',
          marginInline: 'auto',
          marginBottom: 'clamp(20px,3.5vh,36px)',
        }}
      >
        {children}
      </h2>
    </Reveal>
  );
}

export default function AppDe() {
  return (
    <Deck>
      {/* 1 — Titel · 0:00–0:30 */}
      <Cover
        nav="Titel"
        notes="[0:00–0:30] Guten Morgen, liebe Prüferinnen und Prüfer. Mein Name ist M. Iqbal Al Batmi Nur Haikal. Meine Matrikelnummer ist 22020504056. Heute präsentiere ich die Ergebnisse von meiner Abschlussarbeit. Das Thema ist: Übersetzungstechniken von Nominalkomposita in „Götzen-Dämmerung“ von Friedrich Nietzsche, vom Deutschen ins Indonesische."
        kicker="Seminar Hasil · Germanistik · Universitas Negeri Surabaya"
        title={
          <>
            Übersetzungstechniken von <span className="accent-text">Nominalkomposita</span> in
            Götzen-Dämmerung
          </>
        }
        subtitle="von Friedrich Nietzsche – vom Deutschen ins Indonesische"
        foot="M. Iqbal Al Batmi Nur Haikal · 22020504056 · 2026"
      />

      {/* 2 — Hintergrund · 0:30–1:30 */}
      <Split
        nav="Hintergrund"
        notes="[0:30–1:30] Im Deutschen gibt es sehr viele Komposita. Man kann zwei Nomen zu einem Wort verbinden. Ein Beispiel ist „Weltanschauung“. Das Wort hat zwei Teile: „Welt“ und „Anschauung“. Im Indonesischen gibt es das nicht so oft. Wir brauchen eine Phrase: „pandangan dunia“. Die Reihenfolge ist anders. Der Übersetzer muss also eine Lösung finden. In einem philosophischen Text ist das wichtig. Denn eine andere Übersetzung kann auch eine andere Bedeutung haben."
        kicker="Hintergrund"
        title={
          <>
            Ein Wort auf Deutsch, <span className="accent-text">eine Phrase</span> auf
            Indonesisch.
          </>
        }
        body="Im Deutschen verbindet man oft zwei Nomen zu einem Wort. Im Indonesischen braucht man meistens eine Phrase. Der Übersetzer muss eine Lösung finden."
        media={
          <>
            <div style={panel} />
            <div style={{ position: 'relative', padding: 'clamp(20px,4vw,48px)', width: '100%' }}>
              <KompositaVisual
                parts={[
                  { word: 'Welt', gloss: 'dunia', role: 'Bestimmungswort' },
                  { word: 'Anschauung', gloss: 'pandangan', role: 'Grundwort', head: true },
                ]}
                result="Weltanschauung"
                target="pandangan dunia"
                targetNote="andere Reihenfolge"
                targetLabel="Indonesisch"
              />
            </div>
          </>
        }
      />

      {/* 3 — Forschungsfragen · 1:30–2:15 */}
      <Slide
        center
        nav="Forschungsfragen"
        notes="[1:30–2:15] Meine Daten kommen aus „Götzen-Dämmerung“ und aus der indonesischen Übersetzung „Senjakala Berhala“. Bis jetzt hat noch niemand Nominalkomposita in einem philosophischen Text so untersucht. Deshalb habe ich zwei Fragen. (klicken) Erstens: Welche Übersetzungstechniken benutzt man für die Nominalkomposita, und welche Technik kommt am häufigsten vor? (klicken) Zweitens: Was passiert mit der Bedeutung?"
      >
        <Heading kicker="Forschungsfragen">
          Zwei <span className="accent-text">Fragen.</span>
        </Heading>
        <div className="cols" style={{ maxWidth: 980, marginInline: 'auto' }}>
          <Build at={1} className="bld">
            <div style={card}>
              <div className="kicker" style={{ color: 'var(--primary)', marginBottom: 10 }}>
                Frage 1
              </div>
              <p className="lead" style={{ margin: 0, color: 'var(--fg)' }}>
                Welche Übersetzungstechniken gibt es? Welche Technik kommt am häufigsten vor?
              </p>
            </div>
          </Build>
          <Build at={2} className="bld">
            <div style={card}>
              <div className="kicker" style={{ color: 'var(--primary)', marginBottom: 10 }}>
                Frage 2
              </div>
              <p className="lead" style={{ margin: 0, color: 'var(--fg)' }}>
                Was passiert mit der Bedeutung von den Nominalkomposita?
              </p>
            </div>
          </Build>
        </div>
        <Reveal>
          <p className="foot" style={{ marginTop: 'clamp(18px,3vh,30px)' }}>
            Daten: Götzen-Dämmerung (1889) → Senjakala Berhala (Hadikusumo, 2017)
          </p>
        </Reveal>
      </Slide>

      {/* 4 — Theorie · 2:15–3:05 */}
      <Split
        flip
        nav="Theorie"
        notes="[2:15–3:05] Jetzt kurz zur Theorie. Ein Nominalkompositum hat zwei Teile. Der erste Teil ist das Bestimmungswort. Der zweite Teil ist das Grundwort. Das Grundwort ist sehr wichtig. Es bestimmt das Genus. Ein Beispiel aus dem Buch: „die Zeit“ plus „der Götze“ gibt „der Zeitgötze“. Das Wort ist maskulin, weil „Götze“ maskulin ist. Auf Indonesisch heißt es „berhala zaman“. Ich untersuche nur Komposita aus zwei Nomen, und nur Wörter ohne Bindestrich."
        kicker="Theorie"
        title={
          <>
            Das Grundwort bestimmt <span className="accent-text">das Genus.</span>
          </>
        }
        body="Ein Nominalkompositum hat zwei Teile: Bestimmungswort + Grundwort (Donalies, 2004; Fleischer & Barz, 2012). Ich untersuche nur Nomen + Nomen, ohne Bindestrich."
        media={
          <>
            <div style={panel} />
            <div style={{ position: 'relative', padding: 'clamp(20px,4vw,48px)', width: '100%' }}>
              <KompositaVisual
                parts={[
                  { word: 'Zeit', gloss: 'zaman', role: 'Bestimmungswort', genus: 'die' },
                  { word: 'Götze', gloss: 'berhala', role: 'Grundwort', genus: 'der', head: true },
                ]}
                result="Zeitgötze"
                genus="der"
                target="berhala zaman"
                targetNote="Beispiel aus dem Buch"
                targetLabel="Indonesisch"
              />
            </div>
          </>
        }
      />

      {/* 5 — Regeln · 3:05–4:00 */}
      <Steps
        nav="Regeln"
        notes="[3:05–4:00] Für die Übersetzungstechniken benutze ich die 18 Techniken von Molina und Albir aus dem Jahr 2002. Drei Techniken sehen oft gleich aus. Deshalb habe ich eine einfache Regel gemacht. Schritt eins: Steht die Übersetzung im KBBI, also im indonesischen Wörterbuch? Dann ist es eine etablierte Entsprechung. Schritt zwei: Ist es eine normale, freie Phrase? Dann ist es eine wörtliche Übersetzung. Schritt drei: Ist es eine neue Einheit für das deutsche Konzept? Dann ist es eine Lehnübersetzung. Und wenn etwas anders ist, dann ist es eine andere Technik."
        kicker="Molina & Albir (2002) · meine Regeln"
        title="Welche Technik ist es?"
        items={[
          { title: 'Im KBBI?', body: 'Ja → etablierte Entsprechung. Zahnbürste → sikat gigi.' },
          { title: 'Normale Phrase?', body: 'Ja → wörtliche Übersetzung. Zimmerwand → dinding kamar.' },
          { title: 'Neue Einheit?', body: 'Ja → Lehnübersetzung. Götzen-Dämmerung → Senjakala Berhala.' },
          { title: 'Etwas ist anders?', body: 'Ein Teil fehlt, neue Information, neuer Blick oder neue Wortart → andere Technik.' },
        ]}
      />

      {/* 6 — Bedeutung · 4:00–4:40 */}
      <Slide
        nav="Bedeutung"
        notes="[4:00–4:40] Für die zweite Frage habe ich vier Kategorien. Die Bedeutung bleibt gleich. Die Bedeutung wird enger. Die Bedeutung wird weiter. Oder die Bedeutung verschiebt sich. Ein Beispiel für „weiter“: „Apfelbaum“ wird nur „pohon“, also nur „Baum“. Die Information „Apfel“ ist dann weg."
      >
        <Heading kicker="Bedeutung">
          Vier <span className="accent-text">Kategorien.</span>
        </Heading>
        <Reveal>
          <div style={{ maxWidth: 900, marginInline: 'auto' }}>
            <Table
              columns={['Kategorie', 'Was passiert?', 'Beispiel']}
              rows={[
                ['Gleich', 'Die Bedeutung bleibt gleich', 'Zahnbürste → sikat gigi'],
                ['Enger', 'Das Wort ist spezieller', 'Haustier → kucing'],
                ['Weiter', 'Das Wort ist allgemeiner', 'Apfelbaum → pohon'],
                ['Verschoben', 'Ein Teil der Bedeutung geht verloren', 'Sündenbock → kambing dosa'],
              ]}
              highlightRow={2}
              caption="Nach Molina & Albir (2002) und Baker (1992). Die Beispiele sind keine Daten."
            />
          </div>
        </Reveal>
      </Slide>

      {/* 7 — Methode · 4:40–5:30 */}
      <Split
        nav="Methode"
        notes="[4:40–5:30] Meine Methode ist qualitativ und deskriptiv. Es ist eine Bibliotheksforschung. Ich habe die ersten drei Teile vom Buch analysiert: das Vorwort, „Sprüche und Pfeile“ und „Das Problem des Sokrates“. Wichtig: Die indonesische Übersetzung kommt nicht direkt aus dem Deutschen. Sie kommt aus einer englischen Übersetzung. Ich habe in vier Schritten gearbeitet: Wörter sammeln, Wörter prüfen, die Technik bestimmen und die Bedeutung vergleichen. Dafür habe ich die Wörterbücher Duden, DWDS und KBBI benutzt."
        kicker="Methode"
        title={
          <>
            Qualitativ und <span className="accent-text">deskriptiv.</span>
          </>
        }
        body="Korpus: Vorwort, Sprüche und Pfeile, Das Problem des Sokrates (S. 23–44). Achtung: Die indonesische Übersetzung kommt aus dem Englischen."
        media={
          <>
            <div style={panel} />
            <div
              style={{
                position: 'relative',
                padding: 'clamp(20px,4vw,48px)',
                width: '100%',
                maxWidth: 520,
              }}
            >
              <Timeline
                items={[
                  { time: 'Schritt 1', title: 'Wörter sammeln', body: 'Lesen und notieren (Sudaryanto, 2015).' },
                  { time: 'Schritt 2', title: 'Wörter prüfen', body: 'Nomen + Nomen? Kontrolle mit DWDS und Duden.' },
                  { time: 'Schritt 3', title: 'Technik bestimmen', body: 'Molina & Albir (2002) + meine Regeln.' },
                  { time: 'Schritt 4', title: 'Bedeutung vergleichen', body: 'Duden und DWDS ↔ KBBI.' },
                ]}
              />
            </div>
          </>
        }
      />

      {/* 8 — Korpus · 5:30–6:10 */}
      <StatGrid
        nav="Korpus"
        notes="[5:30–6:10] Jetzt komme ich zu den Ergebnissen. Zuerst habe ich 76 Wörter gefunden. Dann habe ich jedes Wort geprüft. 43 Wörter sind keine Komposita aus zwei Nomen. Zum Beispiel „Werkzeug“: Der erste Teil kommt vom Verb „werken“. 33 Wörter sind richtig. Zwei Wörter hat man nicht übersetzt. Also habe ich am Ende 31 Daten."
        kicker="Ergebnisse · Korpus"
        title="Von 76 Wörtern zu 31 Daten."
        stats={[
          { value: <CountUp to={76} />, label: 'Wörter gefunden', caption: 'Komposita mit Nomen am Ende' },
          { value: <CountUp to={33} />, label: 'Nomen + Nomen', caption: '43 Wörter passen nicht' },
          { value: <CountUp to={31} />, label: 'Daten', caption: '2 Wörter sind nicht übersetzt' },
        ]}
      />

      {/* 9 — Techniken · 6:10–7:05 */}
      <Split
        flip
        nav="Techniken"
        notes="[6:10–7:05] Hier sehen Sie die Techniken. Ich habe neun Techniken gefunden. Keine Technik ist klar die stärkste. Die etablierte Entsprechung und die Generalisierung kommen je sechsmal vor. Danach kommen die Lehnübersetzung und die Modulation, je fünfmal. Die Entlehnung habe ich gar nicht gefunden. Das heißt: Kein deutsches Wort steht einfach so im indonesischen Text."
        kicker="Ergebnis · Frage 1"
        title={
          <>
            Neun Techniken, <span className="accent-text">keine ist klar die stärkste.</span>
          </>
        }
        body="Etablierte Entsprechung und Generalisierung: je 6 Daten. Lehnübersetzung und Modulation: je 5 Daten. Entlehnung: 0 Daten."
        media={
          <>
            <div style={panel} />
            <div
              style={{
                position: 'relative',
                padding: 'clamp(20px,4vw,48px)',
                width: '100%',
                maxWidth: 640,
              }}
            >
              <HBarChart
                data={[
                  { label: 'Etablierte Entsprechung', value: 6, hint: '19,4 %', highlight: true },
                  { label: 'Generalisierung', value: 6, hint: '19,4 %', highlight: true },
                  { label: 'Lehnübersetzung', value: 5, hint: '16,1 %' },
                  { label: 'Modulation', value: 5, hint: '16,1 %' },
                  { label: 'Wörtliche Übersetzung', value: 4, hint: '12,9 %' },
                  { label: 'Linguistische Amplifikation', value: 2, hint: '6,5 %' },
                  { label: 'Transposition', value: 1, hint: '3,2 %' },
                  { label: 'Beschreibung', value: 1, hint: '3,2 %' },
                  { label: 'Reduktion', value: 1, hint: '3,2 %' },
                ]}
              />
              <div className="foot" style={{ marginTop: 16, textAlign: 'center' }}>
                n = 31 Daten
              </div>
            </div>
          </>
        }
      />

      {/* 10 — Drei Gruppen · 7:05–7:55 */}
      <Slide
        nav="Drei Gruppen"
        notes="[7:05–7:55] Man kann die Techniken in drei Gruppen teilen. In Gruppe eins bleiben beide Teile. Zum Beispiel wird „Giftbecher“ zu „cangkir racun“. Das sind 11 Daten. (Tab 2 klicken) In Gruppe zwei gibt es schon ein indonesisches Wort, zum Beispiel „Zahnarzt“ – „dokter gigi“. Das sind 6 Daten. (Tab 3 klicken) In Gruppe drei ändert sich mindestens ein Teil. Zum Beispiel wird „Tageslicht“ nur „terang“. Das Wort „Tag“ ist weg. Das sind 14 Daten, also fast die Hälfte."
      >
        <Heading kicker="Diskussion">
          Drei <span className="accent-text">Gruppen.</span>
        </Heading>
        <Reveal>
          <div style={{ maxWidth: 980, marginInline: 'auto' }}>
            <Tabs
              tabs={[
                {
                  label: 'Beide Teile bleiben · 11',
                  content: (
                    <PairList
                      pairs={[
                        { src: 'Gewissensfrage', tgt: 'pertanyaan nurani', tag: 'Lehnübers.', n: 4 },
                        { src: 'Werthurtheile', tgt: 'pertimbangan-pertimbangan nilai', tag: 'Lehnübers.' },
                        { src: 'Giftbecher', tgt: 'cangkir racun', tag: 'Wörtlich', n: 2 },
                        { src: 'Messerstichen', tgt: 'tusukan pisau', tag: 'Wörtlich' },
                        { src: 'Scheintugenden', tgt: 'kebajikan-kebajikan semu', tag: 'Wörtlich' },
                        { src: 'Zeitgötzen', tgt: 'berhala-berhala dari zaman ini', tag: 'Ling. Ampl.' },
                        { src: 'Ehrbegriff', tgt: 'gagasan peka mengenai kehormatan', tag: 'Ling. Ampl.' },
                      ]}
                    />
                  ),
                },
                {
                  label: 'Schon ein Wort · 6',
                  content: (
                    <PairList
                      pairs={[
                        { src: 'Zahnarzt', tgt: 'dokter gigi', tag: 'Etabliert' },
                        { src: 'Fragezeichen', tgt: 'tanda tanya', tag: 'Etabliert', n: 2 },
                        { src: 'Kriegserklärung', tgt: 'pernyataan perang', tag: 'Etabliert' },
                        { src: 'Wahlspruch', tgt: 'motto', tag: 'Etabliert' },
                        { src: 'Nothlage', tgt: 'keadaan yang darurat', tag: 'Etabliert' },
                      ]}
                    />
                  ),
                },
                {
                  label: 'Ein Teil ändert sich · 14',
                  content: (
                    <PairList
                      pairs={[
                        { src: 'Tageslicht', tgt: 'terang', tag: 'Generalis.', n: 3 },
                        { src: 'Kunststück', tgt: 'hal', tag: 'Generalis.' },
                        { src: 'Seitensprung', tgt: 'petualangan', tag: 'Generalis.' },
                        { src: 'Streitobjekt', tgt: 'objeknya', tag: 'Generalis.' },
                        { src: 'Gewissensbiss', tgt: 'penyesalan nurani', tag: 'Modulation' },
                        { src: 'Rattenfänger', tgt: 'penyuling', tag: 'Modulation' },
                        { src: 'Nothwehr', tgt: 'senjata terakhir', tag: 'Modulation' },
                        { src: 'Kriegsschule', tgt: 'sekolah militer', tag: 'Modulation' },
                        { src: 'Augenblick', tgt: '(setiap) kali', tag: 'Modulation' },
                        { src: 'Glücksfall', tgt: 'kesempatan yang menggembirakan', tag: 'Transposition' },
                        { src: 'Seiltänzer', tgt: 'pemain akrobat tambang', tag: 'Beschreibung' },
                        { src: 'Ausnahmefall', tgt: 'perkecualian', tag: 'Reduktion' },
                      ]}
                    />
                  ),
                },
              ]}
            />
          </div>
        </Reveal>
      </Slide>

      {/* 11 — Bedeutung: Ergebnis · 7:55–8:30 */}
      <BigNumber
        nav="Ergebnis Bedeutung"
        notes="[7:55–8:30] Und jetzt zur zweiten Frage, zur Bedeutung. 23 von 31 Daten behalten die gleiche Bedeutung. Das sind 74,2 Prozent. Bei 6 Daten wird die Bedeutung weiter. Bei 2 Daten verschiebt sich die Bedeutung. Eine engere Bedeutung habe ich nicht gefunden. Die Bedeutung ändert sich nur, wenn man einen Teil vom Kompositum ändert."
        kicker="Ergebnis · Frage 2"
        value={<CountUp to={74.2} decimals={1} suffix=" %" locale="de-DE" />}
        caption="Die Bedeutung bleibt meistens gleich: 23 von 31 Daten."
        foot="Weiter: 6 Daten · Verschoben: 2 Daten · Enger: 0 Daten"
      />

      {/* 12 — Zwei Beispiele · 8:30–9:20 */}
      <Slide
        center
        nav="Zwei Beispiele"
        notes="[8:30–9:20] Hier sehen Sie zwei Beispiele. Beide benutzen die gleiche Technik: Modulation. (klicken) „Gewissensbiss“ wird „penyesalan nurani“. Das heißt „Reue des Gewissens“. Das Bild vom „Biss“ ist weg, aber die Bedeutung bleibt gleich. (klicken) „Rattenfänger“ wird „penyuling“, also „Flötenspieler“. Aber die Geschichte vom Rattenfänger von Hameln ist weg. Die Bedeutung verschiebt sich. Also: Die gleiche Technik kann verschiedene Folgen haben."
      >
        <Heading kicker="Diskussion · Modulation">
          Gleiche Technik, <span className="accent-text">andere Folge.</span>
        </Heading>
        <div className="cols" style={{ maxWidth: 980, marginInline: 'auto' }}>
          <Build at={1} className="bld">
            <div style={card}>
              <div className="kicker" style={{ marginBottom: 10 }}>
                Aphorismus 10 · S. 27
              </div>
              <div className="pair-title" style={pairTitle}>
                <em>Gewissensbiss</em> → penyesalan nurani
              </div>
              <p style={{ color: 'var(--fg-muted)', margin: '10px 0 14px' }}>
                Der „Biss“ ist weg. Aber die Bedeutung bleibt gleich.
              </p>
              <span className="kicker" style={{ color: 'var(--primary)' }}>
                Bedeutung gleich
              </span>
            </div>
          </Build>
          <Build at={2} className="bld">
            <div
              style={{
                ...card,
                borderColor: 'color-mix(in srgb, var(--primary) 45%, transparent)',
              }}
            >
              <div className="kicker" style={{ marginBottom: 10 }}>
                Vorwort · S. 24
              </div>
              <div className="pair-title" style={pairTitle}>
                <em>Rattenfänger</em> → penyuling
              </div>
              <p style={{ color: 'var(--fg-muted)', margin: '10px 0 14px' }}>
                „penyuling“ = Flötenspieler. Die Geschichte von Hameln ist weg.
              </p>
              <span className="kicker" style={{ color: 'var(--primary)' }}>
                Bedeutung verschoben
              </span>
            </div>
          </Build>
        </div>
      </Slide>

      {/* 13 — Fazit · 9:20–9:50 */}
      <Slide
        center
        nav="Fazit"
        notes="[9:20–9:50] Zum Schluss. (klicken) Erstens: Es gibt neun Techniken. Keine Technik dominiert. Die etablierte Entsprechung und die Generalisierung sind am häufigsten. (klicken) Zweitens: Die Bedeutung bleibt meistens gleich. Die Generalisierung macht die Bedeutung immer weiter. Die Modulation kann die Bedeutung verschieben. (klicken) Meine Arbeit hat auch Grenzen. Die Übersetzung kommt über das Englische, und ich habe nur drei Teile analysiert. Für die Zukunft empfehle ich: mehr Teile analysieren und auch den englischen Text vergleichen."
      >
        <Heading kicker="Fazit">
          Zwei <span className="accent-text">Antworten.</span>
        </Heading>
        <div className="cols" style={{ maxWidth: 1000, marginInline: 'auto' }}>
          <Build at={1} className="bld">
            <div style={card}>
              <div className="kicker" style={{ color: 'var(--primary)', marginBottom: 10 }}>
                Frage 1 · Techniken
              </div>
              <p style={{ margin: 0, fontSize: 'clamp(16px,1.5vw,20px)', lineHeight: 1.5 }}>
                Neun Techniken. <strong>Keine Technik dominiert.</strong> Am häufigsten:
                etablierte Entsprechung und Generalisierung.
              </p>
            </div>
          </Build>
          <Build at={2} className="bld">
            <div style={card}>
              <div className="kicker" style={{ color: 'var(--primary)', marginBottom: 10 }}>
                Frage 2 · Bedeutung
              </div>
              <p style={{ margin: 0, fontSize: 'clamp(16px,1.5vw,20px)', lineHeight: 1.5 }}>
                Die Bedeutung bleibt <strong>meistens gleich</strong>. Generalisierung → weiter.
                Modulation → manchmal verschoben.
              </p>
            </div>
          </Build>
        </div>
        <Build at={3} className="bld">
          <p className="foot" style={{ marginTop: 'clamp(18px,3vh,30px)' }}>
            Grenzen: Übersetzung über das Englische · nur drei Teile. Vorschlag: mehr Teile und den
            englischen Text analysieren.
          </p>
        </Build>
      </Slide>

      {/* 14 — Danke · 9:50–10:00 */}
      <Slide
        center
        nav="Danke"
        notes="[9:50–10:00] Das war meine Präsentation. Vielen Dank für Ihre Aufmerksamkeit. Ich freue mich auf Ihre Fragen und Kommentare."
      >
        <Reveal>
          <div className="kicker" style={{ marginBottom: 16 }}>
            Seminar Hasil · 2026
          </div>
          <h2 className="display" style={{ marginInline: 'auto' }}>
            Vielen <span className="accent-text">Dank!</span>
          </h2>
          <p className="subhead" style={{ marginTop: 20 }}>
            Ich freue mich auf Ihre Fragen.
          </p>
          <div className="rule" style={{ margin: '28px auto 16px' }} />
          <p className="foot">M. Iqbal Al Batmi Nur Haikal · 22020504056 · Germanistik UNESA</p>
        </Reveal>
      </Slide>
    </Deck>
  );
}
