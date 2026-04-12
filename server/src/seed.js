import admin from "firebase-admin";
import dotenv from "dotenv";
import { createRequire } from "module";

dotenv.config();

// ── Init Firebase Admin ──────────────────────────────────────
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId:   process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey:  process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

const db = admin.firestore();

// ── Seed Data ────────────────────────────────────────────────

const teachers = [
	{
		name: "Drs. Bambang Setiawan",
		subject: "Matematika",
		email: "bambang.setiawan@sman1.id",
		phone: "+62 812-3456-7890",
		status: "Active",
		rating: 4.8,
		students: 156,
		courses: 6,
		joinDate: "Jan 2015",
		level: "Senior High School",
	},
	{
		name: "Ir. Suryanto, M.T.",
		subject: "Fisika",
		email: "suryanto@sman1.id",
		phone: "+62 813-2345-6789",
		status: "Active",
		rating: 4.7,
		students: 124,
		courses: 5,
		joinDate: "Mar 2016",
		level: "Senior High School",
	},
	{
		name: "Siti Nurhaliza, S.Pd.",
		subject: "Bahasa Indonesia",
		email: "siti.nurhaliza@sman1.id",
		phone: "+62 814-3456-7891",
		status: "Active",
		rating: 4.9,
		students: 187,
		courses: 7,
		joinDate: "Jun 2014",
		level: "Senior High School",
	},
	{
		name: "Drs. Ahmad Wijaya",
		subject: "Kimia",
		email: "ahmad.wijaya@sman1.id",
		phone: "+62 815-4567-8902",
		status: "Active",
		rating: 4.6,
		students: 98,
		courses: 4,
		joinDate: "Sep 2017",
		level: "Senior High School",
	},
	{
		name: "Dr. Rina Dewi Kusuma, S.Si.",
		subject: "Biologi",
		email: "rina.dewi@sman1.id",
		phone: "+62 816-5678-9013",
		status: "Active",
		rating: 4.8,
		students: 142,
		courses: 6,
		joinDate: "Dec 2015",
		level: "Senior High School",
	},
	{
		name: "Ing. Hendra Gunawan, M.Cs.",
		subject: "Teknologi Informasi",
		email: "hendra.gunawan@sman1.id",
		phone: "+62 817-6789-0124",
		status: "Active",
		rating: 4.9,
		students: 165,
		courses: 8,
		joinDate: "Feb 2016",
		level: "Senior High School",
	},
	{
		name: "Drs. Eka Prasetya",
		subject: "Sejarah",
		email: "eka.prasetya@sman1.id",
		phone: "+62 818-7890-1235",
		status: "Active",
		rating: 4.5,
		students: 112,
		courses: 4,
		joinDate: "Jul 2017",
		level: "Senior High School",
	},
	{
		name: "Prof. Drs. Sutrisno, M.A.",
		subject: "Ekonomi",
		email: "sutrisno@sman1.id",
		phone: "+62 819-8901-2346",
		status: "Active",
		rating: 4.7,
		students: 135,
		courses: 5,
		joinDate: "Apr 2014",
		level: "Senior High School",
	},
	{
		name: "Drs. Haryanto, S.Sn.",
		subject: "Seni Budaya",
		email: "haryanto@sman1.id",
		phone: "+62 820-9012-3457",
		status: "Active",
		rating: 4.6,
		students: 98,
		courses: 3,
		joinDate: "Jan 2018",
		level: "Senior High School",
	},
	{
		name: "Drs. Bambang Irawan, M.Pd.",
		subject: "Pendidikan Jasmani",
		email: "bambang.irawan@sman1.id",
		phone: "+62 821-0123-4568",
		status: "On Leave",
		rating: 4.4,
		students: 156,
		courses: 6,
		joinDate: "Aug 2016",
		level: "Senior High School",
	},
	{
		name: "Sri Wahyuningsih, S.Pd.",
		subject: "Bahasa Inggris",
		email: "sri.wahyuningsih@sman1.id",
		phone: "+62 822-1234-5679",
		status: "Active",
		rating: 4.8,
		students: 178,
		courses: 7,
		joinDate: "Oct 2015",
		level: "Senior High School",
	},
	{
		name: "Drs. Warsito",
		subject: "Geografi",
		email: "warsito@sman1.id",
		phone: "+62 823-2345-6780",
		status: "Active",
		rating: 4.5,
		students: 87,
		courses: 3,
		joinDate: "May 2019",
		level: "Senior High School",
	},
];

const classrooms = [
  // Kelas 10 (9 classes)
  { name: "Kelas 10-1", code: "X-1", description: "Kelas 10 Reguler - Ruang 101", level: "10", students: 36, room: "101", capacity: 40, status: "Active" },
  { name: "Kelas 10-2", code: "X-2", description: "Kelas 10 Reguler - Ruang 102", level: "10", students: 35, room: "102", capacity: 40, status: "Active" },
  { name: "Kelas 10-3", code: "X-3", description: "Kelas 10 Reguler - Ruang 103", level: "10", students: 37, room: "103", capacity: 40, status: "Active" },
  { name: "Kelas 10-4", code: "X-4", description: "Kelas 10 Reguler - Ruang 104", level: "10", students: 36, room: "104", capacity: 40, status: "Active" },
  { name: "Kelas 10-5", code: "X-5", description: "Kelas 10 Reguler - Ruang 105", level: "10", students: 34, room: "105", capacity: 40, status: "Active" },
  { name: "Kelas 10-6", code: "X-6", description: "Kelas 10 Reguler - Ruang 106", level: "10", students: 36, room: "106", capacity: 40, status: "Active" },
  { name: "Kelas 10-7", code: "X-7", description: "Kelas 10 Reguler - Ruang 107", level: "10", students: 35, room: "107", capacity: 40, status: "Active" },
  { name: "Kelas 10-8", code: "X-8", description: "Kelas 10 Reguler - Ruang 108", level: "10", students: 37, room: "108", capacity: 40, status: "Active" },
  { name: "Kelas 10-9", code: "X-9", description: "Kelas 10 Reguler - Ruang 109", level: "10", students: 36, room: "109", capacity: 40, status: "Active" },
  
  // Kelas 11 (9 classes)
  { name: "Kelas 11-1", code: "XI-1", description: "Kelas 11 IPA - Ruang 201", level: "11", students: 35, room: "201", capacity: 40, status: "Active" },
  { name: "Kelas 11-2", code: "XI-2", description: "Kelas 11 IPA - Ruang 202", level: "11", students: 36, room: "202", capacity: 40, status: "Active" },
  { name: "Kelas 11-3", code: "XI-3", description: "Kelas 11 IPA - Ruang 203", level: "11", students: 34, room: "203", capacity: 40, status: "Active" },
  { name: "Kelas 11-4", code: "XI-4", description: "Kelas 11 IPS - Ruang 204", level: "11", students: 37, room: "204", capacity: 40, status: "Active" },
  { name: "Kelas 11-5", code: "XI-5", description: "Kelas 11 IPS - Ruang 205", level: "11", students: 36, room: "205", capacity: 40, status: "Active" },
  { name: "Kelas 11-6", code: "XI-6", description: "Kelas 11 IPS - Ruang 206", level: "11", students: 35, room: "206", capacity: 40, status: "Active" },
  { name: "Kelas 11-7", code: "XI-7", description: "Kelas 11 Bahasa - Ruang 207", level: "11", students: 32, room: "207", capacity: 40, status: "Active" },
  { name: "Kelas 11-8", code: "XI-8", description: "Kelas 11 Bahasa - Ruang 208", level: "11", students: 31, room: "208", capacity: 40, status: "Active" },
  { name: "Kelas 11-9", code: "XI-9", description: "Kelas 11 Reguler - Ruang 209", level: "11", students: 36, room: "209", capacity: 40, status: "Active" },
  
  // Kelas 12 (9 classes)
  { name: "Kelas 12-1", code: "XII-1", description: "Kelas 12 IPA - Ruang 301", level: "12", students: 34, room: "301", capacity: 40, status: "Active" },
  { name: "Kelas 12-2", code: "XII-2", description: "Kelas 12 IPA - Ruang 302", level: "12", students: 35, room: "302", capacity: 40, status: "Active" },
  { name: "Kelas 12-3", code: "XII-3", description: "Kelas 12 IPA - Ruang 303", level: "12", students: 36, room: "303", capacity: 40, status: "Active" },
  { name: "Kelas 12-4", code: "XII-4", description: "Kelas 12 IPS - Ruang 304", level: "12", students: 35, room: "304", capacity: 40, status: "Active" },
  { name: "Kelas 12-5", code: "XII-5", description: "Kelas 12 IPS - Ruang 305", level: "12", students: 37, room: "305", capacity: 40, status: "Active" },
  { name: "Kelas 12-6", code: "XII-6", description: "Kelas 12 IPS - Ruang 306", level: "12", students: 33, room: "306", capacity: 40, status: "Active" },
  { name: "Kelas 12-7", code: "XII-7", description: "Kelas 12 Bahasa - Ruang 307", level: "12", students: 30, room: "307", capacity: 40, status: "Active" },
  { name: "Kelas 12-8", code: "XII-8", description: "Kelas 12 Bahasa - Ruang 308", level: "12", students: 29, room: "308", capacity: 40, status: "Active" },
  { name: "Kelas 12-9", code: "XII-9", description: "Kelas 12 Reguler - Ruang 309", level: "12", students: 36, room: "309", capacity: 40, status: "Active" },
];

const subjects = [
  // Kelompok A1 - Inti Umum Wajib
  { name: "Pendidikan Agama Islam",    code: "PAI",   level: "10-12", description: "Pendidikan nilai-nilai agama Islam", credits: 2, hours: 36, status: "Active", category: "Wajib" },
  { name: "Pendidikan Agama Kristen",  code: "PAK",   level: "10-12", description: "Pendidikan nilai-nilai agama Kristen", credits: 2, hours: 36, status: "Active", category: "Wajib" },
  { name: "Pendidikan Agama Katolik",  code: "PKA",   level: "10-12", description: "Pendidikan nilai-nilai agama Katolik", credits: 2, hours: 36, status: "Active", category: "Wajib" },
  { name: "Bahasa Indonesia",          code: "BI",    level: "10-12", description: "Bahasa, sastra, dan kemampuan berbahasa Indonesia", credits: 4, hours: 72, status: "Active", category: "Wajib" },
  { name: "Bahasa Inggris",            code: "ING",   level: "10-12", description: "Bahasa internasional untuk komunikasi global", credits: 4, hours: 72, status: "Active", category: "Wajib" },
  { name: "Sejarah",                   code: "SEJ",   level: "10-12", description: "Sejarah Indonesia dan dunia", credits: 3, hours: 54, status: "Active", category: "Wajib" },

  // Kelompok B - Inti Umum Wajib
  { name: "Pendidikan Pancasila",      code: "PPKN",  level: "10-12", description: "Pembelajaran Pancasila dan kewarganegaraan", credits: 2, hours: 36, status: "Active", category: "Wajib" },
  { name: "Matematika",                code: "MTK",   level: "10-12", description: "Matematika dasar dan lanjutan", credits: 4, hours: 72, status: "Active", category: "Wajib" },

  // Kelompok C1 - Inti untuk IPA
  { name: "Kimia",                     code: "KIM",   level: "11-12", description: "Kimia dasar dan aplikasi industri", credits: 4, hours: 72, status: "Active", category: "IPA" },
  { name: "Fisika",                    code: "FIS",   level: "11-12", description: "Fisika klasik dan modern", credits: 4, hours: 72, status: "Active", category: "IPA" },
  { name: "Biologi",                   code: "BIO",   level: "11-12", description: "Biologi umum dan molekuler", credits: 4, hours: 72, status: "Active", category: "IPA" },

  // Kelompok C2 - Inti untuk IPS
  { name: "Ekonomi",                   code: "EKO",   level: "11-12", description: "Ekonomi mikro dan makro", credits: 3, hours: 54, status: "Active", category: "IPS" },
  { name: "Geografi",                  code: "GEO",   level: "11-12", description: "Geografi fisik dan sosial", credits: 3, hours: 54, status: "Active", category: "IPS" },
  { name: "Sosiologi",                 code: "SOC",   level: "11-12", description: "Sosiologi dan struktur masyarakat", credits: 3, hours: 54, status: "Active", category: "IPS" },

  // Kelompok C3 - Inti untuk Bahasa
  { name: "Bahasa Mandarin",           code: "BMS",   level: "11-12", description: "Bahasa Mandarin dan budaya Tiongkok", credits: 2, hours: 36, status: "Active", category: "Bahasa" },
  { name: "Bahasa Jepang",             code: "BJP",   level: "11-12", description: "Bahasa Jepang dan budaya Jepang", credits: 2, hours: 36, status: "Active", category: "Bahasa" },

  // Kelompok D - Peminatan
  { name: "Teknologi Informasi",       code: "TIK",   level: "10-12", description: "Ilmu komputer, pemrograman, dan jaringan", credits: 3, hours: 54, status: "Active", category: "Peminatan" },
  { name: "Seni Budaya",               code: "SBD",   level: "10-12", description: "Seni rupa, musik, tari, dan teater", credits: 2, hours: 36, status: "Active", category: "Peminatan" },

  // Kelompok E - Pengembangan Diri
  { name: "Pendidikan Jasmani",        code: "PJOK",  level: "10-12", description: "Olahraga dan kebugaran fisik", credits: 2, hours: 72, status: "Active", category: "Pengembangan" },
  { name: "Bimbingan Konseling",       code: "BK",    level: "10-12", description: "Bimbingan akademik dan kepribadian", credits: 1, hours: 18, status: "Active", category: "Pengembangan" },
];

// ── Helper ───────────────────────────────────────────────────

async function clearCollection(colName) {
  const snapshot = await db.collection(colName).get();
  if (snapshot.empty) return;

  const batch = db.batch();
  snapshot.docs.forEach((doc) => batch.delete(doc.ref));
  await batch.commit();
  console.log(`  🗑  Koleksi "${colName}" dikosongkan (${snapshot.size} dokumen)`);
}

async function seedCollection(colName, data) {
  const batch = db.batch();
  data.forEach((item) => {
    const ref = db.collection(colName).doc();
    batch.set(ref, {
      ...item,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  });
  await batch.commit();
  console.log(`  ✅ "${colName}" — ${data.length} dokumen berhasil ditambahkan`);
}

// ── Main ─────────────────────────────────────────────────────

async function seed() {
  console.log("\n🌱 Memulai seed data sekolah Indonesia ke Firestore...\n");

  try {
    // Kosongkan dulu supaya tidak duplikat
    console.log("📦 Mengosongkan koleksi lama...");
    await clearCollection("teachers");
    await clearCollection("classrooms");
    await clearCollection("mapel");

    // Isi data baru
    console.log("\n📝 Memasukkan data baru...");
    await seedCollection("teachers",   teachers);
    await seedCollection("classrooms", classrooms);
    await seedCollection("mapel",      subjects);

    console.log("\n🎉 Seed selesai! Data SMAN 1 Jepara berhasil dimasukkan ke Firestore.\n");
    console.log("📊 Ringkasan data:");
    console.log(`   • Guru: ${teachers.length} orang`);
    console.log(`   • Kelas: ${classrooms.length} ruang`);
    console.log(`   • Mapel: ${subjects.length} mata pelajaran`);
    console.log(`   • Total siswa: ${classrooms.reduce((sum, c) => sum + c.students, 0)} siswa\n`);
    process.exit(0);
  } catch (err) {
    console.error("\n❌ Seed gagal:", err.message);
    process.exit(1);
  }
}

seed();