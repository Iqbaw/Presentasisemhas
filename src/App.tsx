import type { CSSProperties, ReactNode } from 'react';
import Deck from './deck/Deck';
import Slide from './deck/Slide';
import Build from './deck/Build';
import Reveal from './deck/Reveal';
import Cover from './components/Cover';
import Agenda from './components/Agenda';
import Split from './components/Split';
import Bento from './components/Bento';
import Steps from './components/Steps';
import Table from './components/Table';
import Timeline from './components/Timeline';
import Section from './components/Section';
import StatGrid from './components/StatGrid';
import CountUp from './components/CountUp';
import Tabs from './components/Tabs';
import BigNumber from './components/BigNumber';
import Accordion from './components/Accordion';
import KompositaVisual from './components/KompositaVisual';
import HBarChart from './components/HBarChart';
import PairList from './components/PairList';

/* Seminar Hasil — M. Iqbal Al Batmi Nur Haikal (22020504056), Sastra Jerman UNESA.
   Every figure and example below is taken from the skripsi (Bab I–V). */

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

export default function App() {
  return (
    <Deck>
      {/* 1 — Cover */}
      <Cover
        nav="Judul"
        notes="Salam pembuka, perkenalkan diri (nama, NIM), sebutkan judul lengkap. Terima kasih kepada dosen pembimbing dan penguji."
        kicker="Seminar Hasil · Sastra Jerman · Universitas Negeri Surabaya"
        title={
          <>
            Teknik Penerjemahan <span className="accent-text">Nominalkomposita</span> dalam
            Götzen-Dämmerung
          </>
        }
        subtitle="Karya Friedrich Nietzsche dari bahasa Jerman ke bahasa Indonesia"
        foot="M. Iqbal Al Batmi Nur Haikal · NIM 22020504056 · 2026"
      />

      {/* 2 — Agenda */}
      <Agenda
        nav="Alur"
        notes="Gambaran alur presentasi. Fokus utama ada di hasil dan pembahasan."
        kicker="Alur presentasi"
        title="Yang akan saya sampaikan."
        items={[
          { title: 'Latar belakang & rumusan masalah', hint: 'Bab I' },
          { title: 'Landasan teori', hint: 'Bab II' },
          { title: 'Metode penelitian', hint: 'Bab III' },
          { title: 'Hasil & pembahasan', hint: 'Bab IV' },
          { title: 'Simpulan & saran', hint: 'Bab V' },
        ]}
      />

      {/* 3 — Latar belakang: satu kata Jerman, satu frasa Indonesia */}
      <Split
        nav="Latar belakang"
        notes="Bahasa Jerman membentuk kosakata terutama lewat komposisi (Fleischer & Barz, 2012). Bahasa Indonesia lebih banyak lewat afiksasi dan reduplikasi (Chaer, 2008). Contoh Weltanschauung: kedua konstituen diterjemahkan lalu urutannya dibalik. Penerjemah juga bisa meminjam atau menguraikan — setiap pilihan menghasilkan teks berbeda, dan di teks filsafat bisa menyentuh konsep pengarang."
        kicker="Latar belakang"
        title={
          <>
            Satu kata dalam bahasa Jerman, <span className="accent-text">satu frasa</span> dalam
            bahasa Indonesia.
          </>
        }
        body="Bahasa Jerman gemar memadatkan dua nomina menjadi satu kata (Kompositionsfreudigkeit). Bahasa Indonesia tidak punya mekanisme seproduktif itu, jadi penerjemah harus memilih bentuk lain."
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
                targetNote="inti di depan, penentu di belakang"
              />
            </div>
          </>
        }
      />

      {/* 4 — Objek & celah penelitian */}
      <Bento
        nav="Objek & celah"
        notes="Götzen-Dämmerung ditulis musim gugur 1888, beredar awal 1889 (Sommer, 2020). Gaya aforistik memadatkan argumen; komposita adalah salah satu sarananya. Terjemahan Indonesia dibuat dari edisi Inggris Hollingdale (Penguin, 1968), jadi terjemahan tidak langsung. Penelitian terdahulu: teknik pada kata budaya/kalimat berita, atau struktur komposita tanpa penerjemahan."
        kicker="Objek & celah penelitian"
        title="Mengapa Nietzsche, dan mengapa komposita."
        tiles={[
          {
            k: 'Teks sumber (BSu)',
            title: 'Götzen-Dämmerung (1889)',
            body: 'Aforistik dan padat. Nominalkomposita seperti Zeitgötze, Gewissensbiss, dan Werthurtheil menjadi sarana pemadatan argumen.',
            c: 2,
            variant: 'accent',
          },
          {
            k: 'Teks sasaran (BSa)',
            title: 'Senjakala Berhala (2017)',
            body: 'Terjemahan Hartono Hadikusumo, dibuat dari edisi Inggris R. J. Hollingdale (1968): terjemahan tidak langsung.',
          },
          {
            k: 'Kerangka',
            title: 'Molina & Albir (2002)',
            body: '18 teknik yang bekerja pada satuan mikro teks dan sudah dipakai dalam penelitian Jerman–Indonesia sebelumnya.',
          },
          {
            k: 'Celah',
            title: 'Nominalkomposita belum pernah menjadi satu-satunya unit analisis dalam terjemahan teks filsafat',
            body: 'Dampak teknik penerjemahannya terhadap makna juga belum dinilai.',
            c: 2,
            variant: 'glow',
          },
        ]}
      />

      {/* 5 — Rumusan masalah */}
      <Slide
        center
        nav="Rumusan masalah"
        notes="Dua rumusan masalah; tujuan penelitian mengikuti keduanya secara langsung: mendeskripsikan teknik + teknik dominan, lalu mendeskripsikan implikasinya terhadap makna."
      >
        <Heading kicker="Rumusan masalah">
          Dua pertanyaan <span className="accent-text">penelitian.</span>
        </Heading>
        <div className="cols" style={{ maxWidth: 980, marginInline: 'auto' }}>
          <Build at={1}>
            <div style={card}>
              <div className="kicker" style={{ color: 'var(--primary)', marginBottom: 10 }}>
                RM 1
              </div>
              <p className="lead" style={{ margin: 0, color: 'var(--fg)' }}>
                Teknik penerjemahan apa saja yang digunakan untuk Nominalkomposita, dan teknik mana
                yang paling dominan?
              </p>
            </div>
          </Build>
          <Build at={2}>
            <div style={card}>
              <div className="kicker" style={{ color: 'var(--primary)', marginBottom: 10 }}>
                RM 2
              </div>
              <p className="lead" style={{ margin: 0, color: 'var(--fg)' }}>
                Bagaimana implikasi teknik-teknik tersebut terhadap makna Nominalkomposita dalam
                terjemahan bahasa Indonesia?
              </p>
            </div>
          </Build>
        </div>
      </Slide>

      {/* 6 — Landasan: struktur komposita */}
      <Split
        flip
        nav="Struktur komposita"
        notes="Bestimmungswort di depan mempersempit makna; Grundwort di belakang menentukan kelas kata dan genus. Zeitgötze maskulin karena Götze maskulin, walau Zeit feminin. Hubungan makna antarkonstituen tidak ditandai secara formal: Seiltänzer (tempat), Messerstich (alat), Giftbecher (isi), Werthurtheil (objek). Batasan: hanya Determinativkompositum N+N, ditulis serangkai, Bestimmungswort nomina apelatif."
        kicker="Landasan teori"
        title={
          <>
            Grundwort <span className="accent-text">menentukan</span> segalanya.
          </>
        }
        body="Nominalkomposita = Bestimmungswort + Grundwort (Donalies, 2004; Fleischer & Barz, 2012). Genus dan kelas kata mengikuti Grundwort; hubungan makna antarkonstituen harus disimpulkan dari konteks."
        media={
          <>
            <div style={panel} />
            <div style={{ position: 'relative', padding: 'clamp(20px,4vw,48px)', width: '100%' }}>
              <KompositaVisual
                parts={[
                  { word: 'Zeit', gloss: 'waktu, zaman', role: 'Bestimmungswort', genus: 'die' },
                  { word: 'Götze', gloss: 'berhala', role: 'Grundwort', genus: 'der', head: true },
                ]}
                result="Zeitgötze"
                genus="der"
                target="berhala zaman"
                targetNote="contoh dari Götzen-Dämmerung"
              />
            </div>
          </>
        }
      />

      {/* 7 — Patokan operasional */}
      <Steps
        nav="Patokan operasional"
        notes="Molina & Albir tidak menyediakan uji formal untuk membedakan kalke, harfiah, dan padanan lazim ketika konstituen diterjemahkan satu per satu. Maka disusun patokan yang diterapkan berurutan. Setiap datum diberi satu teknik utama; pergeseran sekunder dicatat di analisis."
        kicker="Patokan operasional"
        title="Kalke, harfiah, atau padanan lazim?"
        items={[
          {
            title: 'Tercatat di KBBI?',
            body: 'Ya → padanan lazim. Contoh: Zahnbürste → sikat gigi.',
          },
          {
            title: 'Frasa bebas yang wajar?',
            body: 'Ya → penerjemahan harfiah. Contoh: Zimmerwand → dinding kamar.',
          },
          {
            title: 'Satuan baru bagi konsep BSu?',
            body: 'Ya → kalke. Contoh: Götzen-Dämmerung → Senjakala Berhala.',
          },
          {
            title: 'Ada yang berubah?',
            body: 'Konstituen hilang, makna ditambah, sudut pandang atau kelas kata berubah → teknik lain.',
          },
        ]}
      />

      {/* 8 — Kategori makna */}
      <Slide
        nav="Kategori makna"
        notes="Empat kategori operasional yang dirumuskan dari Molina & Albir (2002) dan Baker (1992). Kategori ditentukan dari hubungan makna BSu dalam konteks dengan padanannya — teknik yang sama bisa menghasilkan kategori berbeda. Ilustrasi disusun peneliti, bukan data."
      >
        <Heading kicker="Implikasi terhadap makna">
          Empat kategori <span className="accent-text">makna.</span>
        </Heading>
        <Reveal>
          <div style={{ maxWidth: 920, marginInline: 'auto' }}>
            <Table
              columns={['Kategori', 'Hubungan makna BSu–BSa', 'Ilustrasi']}
              rows={[
                ['Utuh', 'Makna sama dalam konteksnya', 'Zahnbürste → sikat gigi'],
                ['Menyempit', 'Padanan lebih khusus (hiponim)', 'Haustier → kucing'],
                ['Meluas', 'Padanan lebih umum; ciri pembeda hilang', 'Apfelbaum → pohon'],
                ['Bergeser', 'Arah makna berubah / muatan kiasan hilang', 'Sündenbock → kambing dosa'],
              ]}
              caption="Dirumuskan peneliti berdasarkan Molina & Albir (2002) dan Baker (1992). Ilustrasi bukan data penelitian."
            />
          </div>
        </Reveal>
      </Slide>

      {/* 9 — Metode */}
      <Split
        nav="Metode"
        notes="Kualitatif deskriptif, library research. Frekuensi hanya alat bantu menggambarkan kecenderungan. BSu: Project Gutenberg #7203 (ejaan abad ke-19 dipertahankan). BSa: Senjakala Berhala hlm. 23–44. Sampel jenuh: semua komposita yang memenuhi kriteria diambil, termasuk kemunculan ulang. Keabsahan: ketekunan, triangulasi sumber & teori (Duden, DWDS, KBBI), analisis kasus batas, bahan referensi."
        kicker="Metode penelitian"
        title={
          <>
            Kualitatif deskriptif, <span className="accent-text">kepustakaan.</span>
          </>
        }
        body="Korpus: Vorwort, Sprüche und Pfeile, dan Das Problem des Sokrates beserta padanannya (hlm. 23–44). Data diambil dengan sampel jenuh melalui metode simak dan teknik catat (Sudaryanto, 2015)."
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
                  { time: 'Langkah 1', title: 'Penjaringan', body: 'Simak & catat, dicocokkan dengan semua kata berhuruf kapital.' },
                  { time: 'Langkah 2', title: 'Audit morfologis', body: 'Lolos, borderline, atau gugur; kasus batas lewat DWDS & Duden.' },
                  { time: 'Langkah 3', title: 'Klasifikasi teknik', body: 'Molina & Albir (2002) + patokan operasional.' },
                  { time: 'Langkah 4', title: 'Analisis makna', body: 'Duden & DWDS ↔ KBBI dalam konteks kalimat.' },
                  { time: 'Analisis', title: 'Model interaktif', body: 'Miles & Huberman (1994).' },
                ]}
              />
            </div>
          </>
        }
      />

      {/* 10 — Section: Hasil */}
      <Section
        nav="Hasil"
        notes="Masuk ke inti: hasil penelitian dan pembahasan (Bab IV)."
        n={4}
        kicker="Bab IV"
        title={
          <>
            Hasil & <span className="accent-text">pembahasan.</span>
          </>
        }
      />

      {/* 11 — Audit korpus */}
      <StatGrid
        nav="Audit korpus"
        notes="76 satuan terjaring. 43 gugur: stem verba (8, misalnya Werkzeug, Sitzfleisch), adjektiva (4), preposisi/partikel/adverbia (13), pronomina (3), nama diri (Hanswurst ×2), adjektiva dinominalkan (1), kata turunan (Schauspieler ×2), bertanda hubung (10, semuanya di Das Problem des Sokrates). 33 lolos (26 jenis kata). 2 tidak diterjemahkan: Sonnenfleck dan Hausthür. Jadi 31 data, 24 jenis kata."
        kicker="Penjaringan & audit korpus"
        title="Dari 76 satuan menjadi 31 data."
        stats={[
          { value: <CountUp to={76} />, label: 'Satuan terjaring', caption: 'Kata majemuk berunsur akhir nomina' },
          { value: <CountUp to={33} />, label: 'Lolos audit', caption: 'N+N serangkai; 43 gugur' },
          { value: <CountUp to={31} />, label: 'Data penelitian', caption: '24 jenis kata; 2 tidak diterjemahkan' },
        ]}
      />

      {/* 12 — Sebaran teknik */}
      <Split
        flip
        nav="Sebaran teknik"
        notes="31 data, 9 dari 18 teknik. Padanan lazim dan generalisasi masing-masing 6 (19,4%), kalke dan modulasi masing-masing 5 (16,1%). Per jenis kata: padanan lazim & modulasi 5 jenis, kalke hanya 2 karena 4 datanya Gewissensfrage. Sembilan teknik tidak muncul sebagai teknik utama, termasuk peminjaman dan amplifikasi."
        kicker="Temuan RM 1"
        title={
          <>
            Sembilan teknik, <span className="accent-text">tanpa satu yang dominan.</span>
          </>
        }
        body="Padanan lazim dan generalisasi sama-sama paling sering (6 data), disusul kalke dan modulasi (5 data). Peminjaman tidak ditemukan sama sekali."
        media={
          <>
            <div style={panel} />
            <div
              style={{
                position: 'relative',
                padding: 'clamp(20px,4vw,48px)',
                width: '100%',
                maxWidth: 620,
              }}
            >
              <HBarChart
                data={[
                  { label: 'Padanan lazim', value: 6, hint: '19,4%', highlight: true },
                  { label: 'Generalisasi', value: 6, hint: '19,4%', highlight: true },
                  { label: 'Kalke', value: 5, hint: '16,1%' },
                  { label: 'Modulasi', value: 5, hint: '16,1%' },
                  { label: 'Harfiah', value: 4, hint: '12,9%' },
                  { label: 'Amplifikasi linguistik', value: 2, hint: '6,5%' },
                  { label: 'Transposisi', value: 1, hint: '3,2%' },
                  { label: 'Deskripsi', value: 1, hint: '3,2%' },
                  { label: 'Reduksi', value: 1, hint: '3,2%' },
                ]}
              />
              <div className="foot" style={{ marginTop: 16, textAlign: 'center' }}>
                n = 31 data · Tabel 4.6
              </div>
            </div>
          </>
        }
      />

      {/* 13 — Tiga kelompok perlakuan konstituen */}
      <Slide
        nav="Pola teknik"
        notes="Pembahasan: pola lebih jelas jika teknik dikelompokkan menurut perlakuan terhadap konstituen. Kelompok 3 hampir separuh data (14) dan separuh jenis kata (12 dari 24): komposita kiasan/melekat (Seitensprung, Gewissensbiss, Rattenfänger) atau yang salah satu unsurnya bisa dilesapkan (Tageslicht, Ausnahmefall). Kata berulang diterjemahkan konsisten. Klik tab untuk berpindah kelompok."
      >
        <Heading kicker="Pembahasan · pola teknik">
          Tiga cara memperlakukan <span className="accent-text">konstituen.</span>
        </Heading>
        <Reveal>
          <div style={{ maxWidth: 980, marginInline: 'auto' }}>
            <Tabs
              tabs={[
                {
                  label: 'Dipertahankan · 11',
                  content: (
                    <PairList
                      pairs={[
                        { src: 'Gewissensfrage', tgt: 'pertanyaan nurani', tag: 'Kalke', n: 4 },
                        { src: 'Werthurtheile', tgt: 'pertimbangan-pertimbangan nilai', tag: 'Kalke' },
                        { src: 'Giftbecher', tgt: 'cangkir racun', tag: 'Harfiah', n: 2 },
                        { src: 'Messerstichen', tgt: 'tusukan pisau', tag: 'Harfiah' },
                        { src: 'Scheintugenden', tgt: 'kebajikan-kebajikan semu', tag: 'Harfiah' },
                        { src: 'Zeitgötzen', tgt: 'berhala-berhala dari zaman ini', tag: 'Ampl. ling.' },
                        { src: 'Ehrbegriff', tgt: 'gagasan peka mengenai kehormatan', tag: 'Ampl. ling.' },
                      ]}
                    />
                  ),
                },
                {
                  label: 'Istilah mapan · 6',
                  content: (
                    <PairList
                      pairs={[
                        { src: 'Zahnarzt', tgt: 'dokter gigi', tag: 'Padanan lazim' },
                        { src: 'Fragezeichen', tgt: 'tanda tanya', tag: 'Padanan lazim', n: 2 },
                        { src: 'Kriegserklärung', tgt: 'pernyataan perang', tag: 'Padanan lazim' },
                        { src: 'Wahlspruch', tgt: 'motto', tag: 'Padanan lazim' },
                        { src: 'Nothlage', tgt: 'keadaan yang darurat', tag: 'Padanan lazim' },
                      ]}
                    />
                  ),
                },
                {
                  label: 'Diubah · 14',
                  content: (
                    <PairList
                      pairs={[
                        { src: 'Tageslicht', tgt: 'terang', tag: 'Generalisasi', n: 3 },
                        { src: 'Kunststück', tgt: 'hal', tag: 'Generalisasi' },
                        { src: 'Seitensprung', tgt: 'petualangan', tag: 'Generalisasi' },
                        { src: 'Streitobjekt', tgt: 'objeknya', tag: 'Generalisasi' },
                        { src: 'Gewissensbiss', tgt: 'penyesalan nurani', tag: 'Modulasi' },
                        { src: 'Rattenfänger', tgt: 'penyuling', tag: 'Modulasi' },
                        { src: 'Nothwehr', tgt: 'senjata terakhir', tag: 'Modulasi' },
                        { src: 'Kriegsschule', tgt: 'sekolah militer', tag: 'Modulasi' },
                        { src: 'Augenblick', tgt: '(setiap) kali', tag: 'Modulasi' },
                        { src: 'Glücksfall', tgt: 'kesempatan yang menggembirakan', tag: 'Transposisi' },
                        { src: 'Seiltänzer', tgt: 'pemain akrobat tambang', tag: 'Deskripsi' },
                        { src: 'Ausnahmefall', tgt: 'perkecualian', tag: 'Reduksi' },
                      ]}
                    />
                  ),
                },
              ]}
            />
          </div>
        </Reveal>
      </Slide>

      {/* 14 — BigNumber: makna utuh */}
      <BigNumber
        nav="Makna utuh"
        notes="Temuan RM 2: 23 dari 31 data (74,2%) mempertahankan makna secara utuh. Meluas 6 (19,4%), bergeser 2 (6,5%), menyempit 0."
        kicker="Temuan RM 2"
        value={<CountUp to={74.2} decimals={1} suffix="%" locale="id-ID" />}
        caption="Nominalkomposita tetap membawa makna yang utuh dalam terjemahan: 23 dari 31 data."
        foot="Meluas 6 data · bergeser 2 data · menyempit 0 data (Tabel 4.7)"
      />

      {/* 15 — Teknik × makna */}
      <Slide
        nav="Teknik × makna"
        notes="Semua data kelompok 1 dan 2 utuh. Kedelapan data yang maknanya berubah semuanya di kelompok 3. Generalisasi selalu meluaskan (Kunststück, Seitensprung, Streitobjekt, Tageslicht ×3). Modulasi menggeser hanya pada dua data berkonsep khusus. Tapi mengubah konstituen tidak selalu mengubah makna: transposisi, deskripsi, reduksi, dan 3 modulasi tetap utuh."
      >
        <Heading kicker="Pembahasan · teknik dan makna">
          Makna berubah <span className="accent-text">hanya</span> jika konstituen diubah.
        </Heading>
        <Reveal>
          <div style={{ maxWidth: 860, marginInline: 'auto' }}>
            <Table
              columns={[
                'Teknik',
                { label: 'Utuh', align: 'right' },
                { label: 'Meluas', align: 'right' },
                { label: 'Bergeser', align: 'right' },
              ]}
              rows={[
                ['Kalke · harfiah · ampl. linguistik', 11, '–', '–'],
                ['Padanan lazim', 6, '–', '–'],
                ['Transposisi · deskripsi · reduksi', 3, '–', '–'],
                ['Modulasi', 3, '–', 2],
                ['Generalisasi', '–', 6, '–'],
                ['Jumlah', 23, 6, 2],
              ]}
              highlightRow={4}
              caption="Diringkas dari Tabel 4.8 (n = 31)."
            />
          </div>
        </Reveal>
      </Slide>

      {/* 16 — Satu teknik, dua akibat */}
      <Slide
        center
        nav="Satu teknik, dua akibat"
        notes="Keduanya modulasi. Gewissensbiss: citra fisik 'gigitan' diganti keadaan batin, sudut pandang dari sebab ke akibat, tapi makna leksikal tetap (DWDS: rasa bersalah). Rattenfänger: tokoh legenda Hameln + makna kiasan 'penggoda rakyat'; penyuling hanya mengambil serulingnya, dan bisa dibaca 'orang yang menyuling'. Pesan: nama teknik saja tidak cukup untuk menilai akibatnya terhadap makna."
      >
        <Heading kicker="Pembahasan · modulasi">
          Satu teknik, <span className="accent-text">dua akibat.</span>
        </Heading>
        <div className="cols" style={{ maxWidth: 980, marginInline: 'auto' }}>
          <Build at={1}>
            <div style={card}>
              <div className="kicker" style={{ marginBottom: 10 }}>
                Aforisme 10 · hlm. 27
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-head)',
                  fontSize: 'clamp(24px,2.6vw,34px)',
                  fontWeight: 600,
                }}
              >
                <em>Gewissensbiss</em> → penyesalan nurani
              </div>
              <p style={{ color: 'var(--fg-muted)', margin: '10px 0 14px' }}>
                ‘Gigitan’ diganti keadaan batin yang ditimbulkannya: sudut pandang berpindah dari
                sebab ke akibat.
              </p>
              <span className="kicker" style={{ color: 'var(--primary)' }}>
                Makna utuh
              </span>
            </div>
          </Build>
          <Build at={2}>
            <div
              style={{
                ...card,
                borderColor: 'color-mix(in srgb, var(--primary) 45%, transparent)',
              }}
            >
              <div className="kicker" style={{ marginBottom: 10 }}>
                Vorwort · hlm. 24
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-head)',
                  fontSize: 'clamp(24px,2.6vw,34px)',
                  fontWeight: 600,
                }}
              >
                <em>Rattenfänger</em> → penyuling
              </div>
              <p style={{ color: 'var(--fg-muted)', margin: '10px 0 14px' }}>
                Legenda Hameln dan makna kiasan ‘penggoda rakyat’ hilang; yang tersisa hanya
                serulingnya.
              </p>
              <span className="kicker" style={{ color: 'var(--primary)' }}>
                Makna bergeser
              </span>
            </div>
          </Build>
        </div>
      </Slide>

      {/* 17 — Perbandingan dengan penelitian terdahulu */}
      <Slide
        nav="Penelitian terdahulu"
        notes="Teknik dominan perlu dibaca bersama cara unit analisis dipilih. Kalimat berita → amplifikasi/transposisi; kata budaya → peminjaman; Nominalkomposita (unit leksikal yang konstituennya bisa diterjemahkan satu per satu) → kalke dan harfiah tersedia, peminjaman tidak muncul. Bahkan Rattenfänger, yang paling terikat tradisi Jerman, dimodulasi, bukan dipinjam."
      >
        <Heading kicker="Pembahasan · penelitian terdahulu">
          Unit analisis membentuk <span className="accent-text">teknik dominan.</span>
        </Heading>
        <Reveal>
          <div style={{ maxWidth: 940, marginInline: 'auto' }}>
            <Table
              columns={['Penelitian', 'Unit analisis', 'Teknik yang menonjol']}
              rows={[
                ['Anjani & Rahman (2022)', 'Judul & kalimat berita DW', 'Amplifikasi 24,8%; kalke 1 dari 181'],
                ['Azizah (2019)', 'Kata budaya, Das Parfum', 'Peminjaman (103 dari 150)'],
                ['Rohmah & Parnaningroem (2024)', 'Kata budaya, majalah Nadi', 'Peminjaman murni'],
                ['Penelitian ini', 'Nominalkomposita N+N', 'Padanan lazim & generalisasi; kalke 5 dari 31; peminjaman 0'],
              ]}
              highlightRow={3}
              caption="Semua memakai kerangka Molina & Albir (2002)."
            />
          </div>
        </Reveal>
      </Slide>

      {/* 18 — Simpulan */}
      <Slide
        center
        nav="Simpulan"
        notes="Jawab kedua RM secara ringkas. RM1: 9 teknik, tidak ada yang mendominasi; sedikit lebih dari separuh data mempertahankan konstituen atau memakai istilah mapan. RM2: sebagian besar utuh; perubahan hanya pada teknik yang mengubah konstituen."
      >
        <Heading kicker="Bab V · simpulan">
          Jawaban atas <span className="accent-text">dua pertanyaan.</span>
        </Heading>
        <div className="cols" style={{ maxWidth: 1000, marginInline: 'auto' }}>
          <Build at={1}>
            <div style={card}>
              <div className="kicker" style={{ color: 'var(--primary)', marginBottom: 10 }}>
                RM 1 · teknik
              </div>
              <p style={{ margin: 0, fontSize: 'clamp(16px,1.5vw,20px)', lineHeight: 1.5 }}>
                Sembilan teknik dipakai dan <strong>tidak ada yang mendominasi</strong>. Padanan
                lazim dan generalisasi paling sering, disusul kalke dan modulasi. Kata berulang
                diterjemahkan secara konsisten.
              </p>
            </div>
          </Build>
          <Build at={2}>
            <div style={card}>
              <div className="kicker" style={{ color: 'var(--primary)', marginBottom: 10 }}>
                RM 2 · makna
              </div>
              <p style={{ margin: 0, fontSize: 'clamp(16px,1.5vw,20px)', lineHeight: 1.5 }}>
                Sebagian besar makna <strong>utuh</strong>. Generalisasi selalu meluaskan makna;
                modulasi menggeser makna pada konsep khusus (<em>Rattenfänger</em>,{' '}
                <em>Nothwehr</em>). Tidak ada makna yang menyempit.
              </p>
            </div>
          </Build>
        </div>
      </Slide>

      {/* 19 — Keterbatasan & saran */}
      <Slide
        nav="Keterbatasan & saran"
        notes="Keterbatasan paling mendasar: terjemahan tidak langsung, jadi teknik tidak bisa dibaca sebagai keputusan penerjemah Indonesia. Saran untuk penerbit: bandingkan langsung dengan teks Jerman — komposita yang tidak diterjemahkan, aforisme 19, dugaan salah cetak 'Dan sekolah militer kehidupan', ejaan tanda tanya / tanda-tanya dan motto."
      >
        <Heading kicker="Keterbatasan & saran">
          Yang bisa <span className="accent-text">dilanjutkan.</span>
        </Heading>
        <Reveal>
          <div style={{ maxWidth: 820, marginInline: 'auto' }}>
            <Accordion
              single
              defaultOpen={0}
              items={[
                {
                  title: 'Terjemahan tidak langsung',
                  body: 'Senjakala Berhala dibuat dari edisi Inggris Hollingdale. Saran: bandingkan teks Jerman, Inggris, dan Indonesia secara sistematis agar pergeseran tiap tahap dapat dipisahkan.',
                },
                {
                  title: 'Cakupan korpus',
                  body: 'Hanya tiga bagian pertama (31 data). Saran: perluas ke bagian lain Götzen-Dämmerung.',
                },
                {
                  title: 'Kriteria data yang ketat',
                  body: 'Komposita bertanda hubung (mis. Verfalls-Symptome) dan pola stem verba + nomina belum dikaji. Saran: kaji tersendiri.',
                },
                {
                  title: 'Satu penilai',
                  body: 'Klasifikasi dan kategori makna ditetapkan peneliti sendiri. Saran: libatkan penilai kedua.',
                },
                {
                  title: 'Untuk penerbit & penerjemah',
                  body: 'Periksa komposita yang tidak diterjemahkan, keterangan yang berubah maksud pada aforisme 19, dugaan salah cetak, dan ejaan yang belum konsisten.',
                },
              ]}
            />
          </div>
        </Reveal>
      </Slide>

      {/* 20 — Penutup */}
      <Slide
        center
        nav="Penutup"
        notes="Tutup dengan terima kasih, lalu persilakan penguji memberi pertanyaan dan masukan."
      >
        <Reveal>
          <div className="kicker" style={{ marginBottom: 16 }}>
            Seminar Hasil · 2026
          </div>
          <h2 className="display" style={{ marginInline: 'auto' }}>
            Terima <span className="accent-text">kasih.</span>
          </h2>
          <p className="subhead" style={{ marginTop: 20 }}>
            Vielen Dank. Saya persilakan pertanyaan dan masukan.
          </p>
          <div className="rule" style={{ margin: '28px auto 16px' }} />
          <p className="foot">M. Iqbal Al Batmi Nur Haikal · 22020504056 · Sastra Jerman UNESA</p>
        </Reveal>
      </Slide>
    </Deck>
  );
}
