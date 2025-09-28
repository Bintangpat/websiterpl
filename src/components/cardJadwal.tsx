// src/components/CardJadwal.tsx

import React, { useState } from "react";
import { MataKuliah, DosenStatus } from "@/types/jadwal";
import {
  FaBook,
  FaClipboardList,
  FaUsers,
  FaClock,
  FaCalendarCheck,
} from "react-icons/fa";

interface CardJadwalProps {
  mataKuliah: MataKuliah;
  updateJadwalItem: (id: string, updateData: Partial<MataKuliah>) => void;
  getStatusColor: (status: DosenStatus) => string;
}

const statusOptions: DosenStatus[] = [
  "Masuk",
  "Tidak masuk",
  "Sudah dihubungi",
  "Belum direspon",
];

export default function CardJadwal({
  mataKuliah,
  updateJadwalItem,
  getStatusColor,
}: CardJadwalProps) {
  const [isEditingTugas, setIsEditingTugas] = useState(false);
  // State lokal untuk input tugas (menggunakan nilai dari prop mataKuliah)
  const [currentTugas, setCurrentTugas] = useState(mataKuliah.tugas);

  // Menggunakan fungsi helper untuk warna status
  const statusClasses = getStatusColor(mataKuliah.statusDosen);

  // HANDLER UNTUK TOMBOL STATUS (Mengirim ke API)
  const handleStatusClick = (newStatus: DosenStatus) => {
    // Memanggil fungsi update global dengan _id mata kuliah
    updateJadwalItem(mataKuliah._id, { statusDosen: newStatus });
  };

  // HANDLER UNTUK SIMPAN TUGAS (Mengirim ke API)
  const handleSaveTugas = () => {
    // Memanggil fungsi update global untuk tugas
    updateJadwalItem(mataKuliah._id, { tugas: currentTugas });
    setIsEditingTugas(false);
  };

  // Catatan: Jika ingin menambahkan fitur Ruangan, tambahkan state isEditingRuangan
  // dan handler serupa di sini, dan panggil:
  // updateJadwalItem(mataKuliah._id, { ruangan: newRuangan });

  return (
    <div className="bg-accent text-accent-foreground max-h-200 rounded-lg border p-4 shadow-sm transition-shadow hover:shadow-md">
      {/* HEADER DAN STATUS */}
      <div className="mb-3 flex items-start justify-between">
        <h3 className="dark:text-accent-foreground flex items-center gap-2 text-lg font-semibold text-indigo-600">
          <FaBook className="text-xl" /> {mataKuliah.nama}
        </h3>
        <div
          className={`rounded-full border px-3 py-1 text-xs font-medium ${statusClasses}`}
        >
          {mataKuliah.statusDosen}
        </div>
      </div>

      {/* DETAIL KELAS */}
      <div className="text-accent-foreground space-y-1 text-sm">
        <p className="flex items-center gap-2">
          <FaUsers className="dark: text-indigo-400" /> Dosen:{" "}
          <span className="text-accent-foreground font-medium">
            {mataKuliah.dosen}
          </span>
        </p>
        <p className="flex items-center gap-2">
          <FaClock className="text-indigo-400" /> Waktu: {mataKuliah.waktu}
        </p>
        <p className="flex items-center gap-2">
          <FaCalendarCheck className="text-indigo-400" /> Ruangan:{" "}
          <span className="text-accent-foreground font-medium">
            {mataKuliah.ruangan}
          </span>
        </p>
      </div>

      <hr className="my-3 border-gray-200" />

      {/* FITUR PENULISAN TUGAS */}
      <div className="mt-3">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-accent flex items-center gap-2 font-semibold">
            <FaClipboardList className="text-xl text-amber-500" /> Tugas:
          </p>
          {!isEditingTugas && (
            <button
              onClick={() => setIsEditingTugas(true)}
              className="text-xs font-medium text-indigo-500 hover:text-indigo-700"
            >
              Edit
            </button>
          )}
        </div>

        {isEditingTugas ? (
          <div className="flex flex-col gap-2">
            <textarea
              value={currentTugas}
              onChange={(e) => setCurrentTugas(e.target.value)}
              className="text-accent-foreground bg-accent w-full rounded border p-2 text-sm focus:border-indigo-500 focus:ring-indigo-500"
              rows={2}
            />
            <button
              onClick={handleSaveTugas}
              className="rounded bg-indigo-500 py-1 text-sm text-white hover:bg-indigo-600"
            >
              Simpan Tugas
            </button>
          </div>
        ) : (
          <p className="text-accent-foreground text-sm italic">
            {mataKuliah.tugas}
          </p>
        )}
      </div>

      <hr className="my-3 border-gray-200" />

      {/* FITUR OPSI DOSEN MASUK */}
      <div className="mt-4">
        <p className="text-accent-foreground mb-2 font-semibold">
          Ubah Status Dosen:
        </p>
        <div className="flex flex-wrap gap-2">
          {statusOptions.map((status) => (
            <button
              key={status}
              onClick={() => handleStatusClick(status)}
              className={`rounded-full border px-3 py-1 text-xs transition-all ${
                mataKuliah.statusDosen === status
                  ? "text-accent-foreground bg-indigo-600 shadow-md"
                  : "text-accent-foreground bg-accent hover:bg-indigo-50 hover:text-indigo-700"
              } `}
            >
              {status}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
