export type DosenStatus =
  | "Masuk"
  | "Tidak masuk"
  | "Sudah dihubungi"
  | "Belum direspon";

export interface MataKuliah {
  _id: string;
  nama: string;
  dosen: string;
  ruangan: string;
  waktu: string; // Contoh: 08:00-10:00 atau 13:00-15:00
  hari: string;
  statusDosen: DosenStatus;
  tugas: string; // Untuk fitur penulisan tugas
  isEditable: true;
}
