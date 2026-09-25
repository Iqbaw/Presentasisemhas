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

/* Seminar Hasil — versi Bahasa Indonesia. Mirror 1:1 dari AppDe.tsx (14 slide,
   urutan sama) supaya tombol ID | DE tetap di slide yang sama.
   Catatan tiap slide = terjemahan naskah Jerman. Semua angka dari skripsi. */

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

export default function App() {
  return (
    <Deck>
      {/* 1 — Judul */}
      <Cover
        nav="Judul"
        notes="[0:00–0:30] Selamat pagi, para penguji. Nama saya M. Iqbal Al Batmi Nur Haikal, NIM 22020504056. Hari ini saya mempresentasikan hasil skripsi saya. Judulnya: Teknik Penerjemahan Nominalkomposita dalam Götzen-Dämmerung karya Friedrich Nietzsche dari bahasa Jerman ke bahasa Indonesia."
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

      {/* 2 — Latar belakang */}
      <Split
        nav="Latar belakang"
        notes="[0:30–1:30] Bahasa Jerman punya sangat banyak kata majemuk. Dua nomina bisa digabung menjadi satu kata, misalnya Weltanschauung: Welt dan Anschauung. Bahasa Indonesia jarang begitu; kita butuh frasa, yaitu pandangan dunia, dan urutannya terbalik. Jadi penerjemah harus mencari solusi. Di teks filsafat ini penting, karena terjemahan yang berbeda bisa membawa makna yang berbeda."
        kicker="Latar belakang"
        title={
          <>
            Satu kata dalam bahasa Jerman, <span className="accent-text">satu frasa</span> dalam
            bahasa Indonesia.
          </>
        }
        body="Bahasa Jerman sering menggabungkan dua nomina menjadi satu kata. Bahasa Indonesia biasanya membutuhkan frasa. Penerjemah harus memilih bentuk lain."
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
                targetNote="urutannya terbalik"
              />
            </div>
          </>
        }
      />

      {/* 3 — Rumusan masalah */}
      <Slide
        center
        nav="Rumusan masalah"
        notes="[1:30–2:15] Data saya berasal dari Götzen-Dämmerung dan terjemahan Indonesianya, Senjakala Berhala. Sampai sekarang belum ada yang meneliti Nominalkomposita dalam teks filsafat seperti ini. Karena itu ada dua pertanyaan. (klik) Pertama: teknik penerjemahan apa saja yang dipakai, dan teknik mana yang paling sering? (klik) Kedua: apa yang terjadi pada maknanya?"
      >
        <Heading kicker="Rumusan masalah">
          Dua <span className="accent-text">pertanyaan.</span>
        </Heading>
        <div className="cols" style={{ maxWidth: 980, marginInline: 'auto' }}>
          <Build at={1} className="bld">
            <div style={card}>
              <div className="kicker" style={{ color: 'var(--primary)', marginBottom: 10 }}>
                RM 1
              </div>
              <p className="lead" style={{ margin: 0, color: 'var(--fg)' }}>
                Teknik penerjemahan apa saja yang digunakan? Teknik mana yang paling sering?
              </p>
            </div>
          </Build>
          <Build at={2} className="bld">
            <div style={card}>
              <div className="kicker" style={{ color: 'var(--primary)', marginBottom: 10 }}>
                RM 2
              </div>
              <p className="lead" style={{ margin: 0, color: 'var(--fg)' }}>
                Bagaimana implikasinya terhadap makna Nominalkomposita?
              </p>
            </div>
          </Build>
        </div>
        <Reveal>
          <p className="foot" style={{ marginTop: 'clamp(18px,3vh,30px)' }}>
            Data: Götzen-Dämmerung (1889) → Senjakala Berhala (Hadikusumo, 2017)
          </p>
        </Reveal>
      </Slide>

      {/* 4 — Teori */}
      <Split
        flip
        nav="Teori"
        notes="[2:15–3:05] Sekarang teorinya. Nominalkompositum punya dua bagian: Bestimmungswort di depan dan Grundwort di belakang. Grundwort sangat penting karena menentukan genus. Contoh dari buku: die Zeit ditambah der Götze menjadi der Zeitgötze. Kata ini maskulin karena Götze maskulin. Dalam bahasa Indonesia: berhala zaman. Saya hanya meneliti komposita dua nomina tanpa tanda hubung."
        kicker="Landasan teori"
        title={
          <>
            Grundwort menentukan <span className="accent-text">genus.</span>
          </>
        }
        body="Nominalkomposita terdiri atas Bestimmungswort + Grundwort (Donalies, 2004; Fleischer & Barz, 2012). Yang diteliti hanya nomina + nomina, tanpa tanda hubung."
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
                targetNote="contoh dari Götzen-Dämmerung"
              />
            </div>
          </>
        }
      />

      {/* 5 — Patokan */}
      <Steps
        nav="Patokan"
        notes="[3:05–4:00] Untuk teknik penerjemahan saya memakai 18 teknik Molina dan Albir (2002). Tiga teknik sering terlihat mirip, jadi saya membuat patokan. Langkah satu: apakah terjemahannya ada di KBBI? Kalau ya, padanan lazim. Langkah dua: apakah frasa bebas yang biasa? Kalau ya, penerjemahan harfiah. Langkah tiga: apakah satuan baru untuk konsep Jerman? Kalau ya, kalke. Kalau ada yang berubah, itu teknik lain."
        kicker="Molina & Albir (2002) · patokan operasional"
        title="Teknik yang mana?"
        items={[
          { title: 'Ada di KBBI?', body: 'Ya → padanan lazim. Zahnbürste → sikat gigi.' },
          { title: 'Frasa bebas biasa?', body: 'Ya → penerjemahan harfiah. Zimmerwand → dinding kamar.' },
          { title: 'Satuan baru?', body: 'Ya → kalke. Götzen-Dämmerung → Senjakala Berhala.' },
          { title: 'Ada yang berubah?', body: 'Unsur hilang, informasi baru, sudut pandang atau kelas kata berubah → teknik lain.' },
        ]}
      />

      {/* 6 — Kategori makna */}
      <Slide
        nav="Kategori makna"
        notes="[4:00–4:40] Untuk pertanyaan kedua ada empat kategori: makna utuh, menyempit, meluas, atau bergeser. Contoh meluas: Apfelbaum hanya menjadi pohon. Informasi apel hilang."
      >
        <Heading kicker="Implikasi terhadap makna">
          Empat <span className="accent-text">kategori.</span>
        </Heading>
        <Reveal>
          <div style={{ maxWidth: 900, marginInline: 'auto' }}>
            <Table
              columns={['Kategori', 'Apa yang terjadi?', 'Ilustrasi']}
              rows={[
                ['Utuh', 'Makna tetap sama', 'Zahnbürste → sikat gigi'],
                ['Menyempit', 'Padanan lebih khusus', 'Haustier → kucing'],
                ['Meluas', 'Padanan lebih umum', 'Apfelbaum → pohon'],
                ['Bergeser', 'Sebagian makna hilang', 'Sündenbock → kambing dosa'],
              ]}
              highlightRow={2}
              caption="Berdasarkan Molina & Albir (2002) dan Baker (1992). Ilustrasi bukan data penelitian."
            />
          </div>
        </Reveal>
      </Slide>

      {/* 7 — Metode */}
      <Split
        nav="Metode"
        notes="[4:40–5:30] Metode saya kualitatif deskriptif, penelitian kepustakaan. Saya menganalisis tiga bagian pertama buku: Vorwort, Sprüche und Pfeile, dan Das Problem des Sokrates. Penting: terjemahan Indonesia tidak langsung dari bahasa Jerman, tetapi dari terjemahan bahasa Inggris. Saya bekerja dalam empat langkah: mengumpulkan kata, memeriksa kata, menentukan teknik, dan membandingkan makna, dengan kamus Duden, DWDS, dan KBBI."
        kicker="Metode penelitian"
        title={
          <>
            Kualitatif <span className="accent-text">deskriptif.</span>
          </>
        }
        body="Korpus: Vorwort, Sprüche und Pfeile, Das Problem des Sokrates (hlm. 23–44). Catatan: terjemahan Indonesia dibuat dari edisi bahasa Inggris."
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
                  { time: 'Langkah 1', title: 'Mengumpulkan kata', body: 'Simak dan catat (Sudaryanto, 2015).' },
                  { time: 'Langkah 2', title: 'Memeriksa kata', body: 'Nomina + nomina? Dicek dengan DWDS dan Duden.' },
                  { time: 'Langkah 3', title: 'Menentukan teknik', body: 'Molina & Albir (2002) + patokan operasional.' },
                  { time: 'Langkah 4', title: 'Membandingkan makna', body: 'Duden dan DWDS ↔ KBBI.' },
                ]}
              />
            </div>
          </>
        }
      />

      {/* 8 — Korpus */}
      <StatGrid
        nav="Korpus"
        notes="[5:30–6:10] Sekarang hasilnya. Awalnya saya menemukan 76 kata. Lalu setiap kata saya periksa. 43 kata bukan komposita dua nomina, misalnya Werkzeug, yang unsur pertamanya dari verba werken. 33 kata lolos. Dua kata tidak diterjemahkan. Jadi akhirnya ada 31 data."
        kicker="Hasil · korpus"
        title="Dari 76 kata menjadi 31 data."
        stats={[
          { value: <CountUp to={76} />, label: 'Kata terjaring', caption: 'Kata majemuk berunsur akhir nomina' },
          { value: <CountUp to={33} />, label: 'Nomina + nomina', caption: '43 kata gugur' },
          { value: <CountUp to={31} />, label: 'Data', caption: '2 kata tidak diterjemahkan' },
        ]}
      />

      {/* 9 — Teknik */}
      <Split
        flip
        nav="Teknik"
        notes="[6:10–7:05] Ini teknik-tekniknya. Saya menemukan sembilan teknik. Tidak ada teknik yang jelas paling kuat. Padanan lazim dan generalisasi masing-masing muncul enam kali, lalu kalke dan modulasi masing-masing lima kali. Peminjaman tidak ditemukan sama sekali, artinya tidak ada kata Jerman yang dibiarkan begitu saja di teks Indonesia."
        kicker="Hasil · RM 1"
        title={
          <>
            Sembilan teknik, <span className="accent-text">tidak ada yang dominan.</span>
          </>
        }
        body="Padanan lazim dan generalisasi: masing-masing 6 data. Kalke dan modulasi: masing-masing 5 data. Peminjaman: 0 data."
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
                n = 31 data
              </div>
            </div>
          </>
        }
      />

      {/* 10 — Tiga kelompok */}
      <Slide
        nav="Tiga kelompok"
        notes="[7:05–7:55] Teknik-teknik ini bisa dibagi tiga kelompok. Kelompok satu: kedua unsur dipertahankan, misalnya Giftbecher menjadi cangkir racun; 11 data. (klik tab 2) Kelompok dua: sudah ada istilah Indonesia, misalnya Zahnarzt menjadi dokter gigi; 6 data. (klik tab 3) Kelompok tiga: minimal satu unsur berubah, misalnya Tageslicht hanya menjadi terang, kata Tag hilang; 14 data, hampir separuh."
      >
        <Heading kicker="Pembahasan">
          Tiga <span className="accent-text">kelompok.</span>
        </Heading>
        <Reveal>
          <div style={{ maxWidth: 980, marginInline: 'auto' }}>
            <Tabs
              tabs={[
                {
                  label: 'Kedua unsur tetap · 11',
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
                  label: 'Istilah sudah ada · 6',
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
                  label: 'Unsur berubah · 14',
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

      {/* 11 — Hasil makna */}
      <BigNumber
        nav="Hasil makna"
        notes="[7:55–8:30] Sekarang pertanyaan kedua, tentang makna. 23 dari 31 data maknanya tetap utuh, yaitu 74,2 persen. Pada 6 data maknanya meluas. Pada 2 data maknanya bergeser. Makna yang menyempit tidak ditemukan. Makna hanya berubah kalau satu unsur komposita diubah."
        kicker="Hasil · RM 2"
        value={<CountUp to={74.2} decimals={1} suffix="%" locale="id-ID" />}
        caption="Makna sebagian besar tetap utuh: 23 dari 31 data."
        foot="Meluas: 6 data · Bergeser: 2 data · Menyempit: 0 data"
      />

      {/* 12 — Dua contoh */}
      <Slide
        center
        nav="Dua contoh"
        notes="[8:30–9:20] Ini dua contoh dengan teknik yang sama, yaitu modulasi. (klik) Gewissensbiss menjadi penyesalan nurani. Gambaran gigitan hilang, tetapi maknanya tetap. (klik) Rattenfänger menjadi penyuling, pemain suling. Tetapi kisah Rattenfänger dari Hameln hilang, jadi maknanya bergeser. Jadi, teknik yang sama bisa punya akibat yang berbeda."
      >
        <Heading kicker="Pembahasan · modulasi">
          Teknik sama, <span className="accent-text">akibat berbeda.</span>
        </Heading>
        <div className="cols" style={{ maxWidth: 980, marginInline: 'auto' }}>
          <Build at={1} className="bld">
            <div style={card}>
              <div className="kicker" style={{ marginBottom: 10 }}>
                Aforisme 10 · hlm. 27
              </div>
              <div className="pair-title" style={pairTitle}>
                <em>Gewissensbiss</em> → penyesalan nurani
              </div>
              <p style={{ color: 'var(--fg-muted)', margin: '10px 0 14px' }}>
                ‘Gigitan’ hilang, tetapi maknanya tetap.
              </p>
              <span className="kicker" style={{ color: 'var(--primary)' }}>
                Makna utuh
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
                Vorwort · hlm. 24
              </div>
              <div className="pair-title" style={pairTitle}>
                <em>Rattenfänger</em> → penyuling
              </div>
              <p style={{ color: 'var(--fg-muted)', margin: '10px 0 14px' }}>
                ‘Penyuling’ = pemain suling. Kisah dari Hameln hilang.
              </p>
              <span className="kicker" style={{ color: 'var(--primary)' }}>
                Makna bergeser
              </span>
            </div>
          </Build>
        </div>
      </Slide>

      {/* 13 — Simpulan */}
      <Slide
        center
        nav="Simpulan"
        notes="[9:20–9:50] Kesimpulannya. (klik) Pertama: ada sembilan teknik, tidak ada yang dominan; padanan lazim dan generalisasi paling sering. (klik) Kedua: makna sebagian besar tetap utuh; generalisasi selalu meluaskan makna, modulasi bisa menggeser makna. (klik) Penelitian ini juga punya keterbatasan: terjemahannya melalui bahasa Inggris, dan hanya tiga bagian yang dianalisis. Saran saya: analisis lebih banyak bagian dan bandingkan juga teks bahasa Inggrisnya."
      >
        <Heading kicker="Simpulan">
          Dua <span className="accent-text">jawaban.</span>
        </Heading>
        <div className="cols" style={{ maxWidth: 1000, marginInline: 'auto' }}>
          <Build at={1} className="bld">
            <div style={card}>
              <div className="kicker" style={{ color: 'var(--primary)', marginBottom: 10 }}>
                RM 1 · teknik
              </div>
              <p style={{ margin: 0, fontSize: 'clamp(16px,1.5vw,20px)', lineHeight: 1.5 }}>
                Sembilan teknik. <strong>Tidak ada yang dominan.</strong> Paling sering: padanan
                lazim dan generalisasi.
              </p>
            </div>
          </Build>
          <Build at={2} className="bld">
            <div style={card}>
              <div className="kicker" style={{ color: 'var(--primary)', marginBottom: 10 }}>
                RM 2 · makna
              </div>
              <p style={{ margin: 0, fontSize: 'clamp(16px,1.5vw,20px)', lineHeight: 1.5 }}>
                Makna <strong>sebagian besar utuh</strong>. Generalisasi → meluas. Modulasi →
                kadang bergeser.
              </p>
            </div>
          </Build>
        </div>
        <Build at={3} className="bld">
          <p className="foot" style={{ marginTop: 'clamp(18px,3vh,30px)' }}>
            Keterbatasan: terjemahan melalui bahasa Inggris · hanya tiga bagian. Saran: analisis
            lebih banyak bagian dan teks bahasa Inggrisnya.
          </p>
        </Build>
      </Slide>

      {/* 14 — Terima kasih */}
      <Slide
        center
        nav="Terima kasih"
        notes="[9:50–10:00] Sekian presentasi saya. Terima kasih atas perhatiannya. Saya menantikan pertanyaan dan masukan Bapak/Ibu."
      >
        <Reveal>
          <div className="kicker" style={{ marginBottom: 16 }}>
            Seminar Hasil · 2026
          </div>
          <h2 className="display" style={{ marginInline: 'auto' }}>
            Terima <span className="accent-text">kasih.</span>
          </h2>
          <p className="subhead" style={{ marginTop: 20 }}>
            Saya persilakan pertanyaan dan masukan.
          </p>
          <div className="rule" style={{ margin: '28px auto 16px' }} />
          <p className="foot">M. Iqbal Al Batmi Nur Haikal · 22020504056 · Sastra Jerman UNESA</p>
        </Reveal>
      </Slide>
    </Deck>
  );
}
