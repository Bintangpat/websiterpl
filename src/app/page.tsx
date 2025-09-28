// app/page.tsx

"use client";

import React, { useState, useEffect } from "react";

import { MataKuliah, DosenStatus } from "@/types/jadwal";
import CardJadwal from "@/components/cardJadwal";

// --- Helper Functions ---
// Fungsi untuk menentukan warna berdasarkan status
const getStatusColor = (status: DosenStatus) => {
  switch (status) {
    case "Masuk":
      return "bg-green-100 text-green-800 border-green-400";
    case "Tidak masuk":
      return "bg-red-100 text-red-800 border-red-400";
    case "Sudah dihubungi":
      return "bg-yellow-100 text-yellow-800 border-yellow-400";
    case "Belum direspon":
    default:
      return "bg-gray-100 text-gray-800 border-gray-400";
  }
};

export default function Home() {
  // PERBAIKAN: Inisialisasi state dengan array kosong, karena data akan diambil dari API.
  const [jadwal, setJadwal] = useState<MataKuliah[]>([]);

  const fetchJadwal = async () => {
    try {
      // Endpoint API GET untuk semua jadwal
      const response = await fetch("/api/jadwal");
      const data = await response.json();
      setJadwal(data);
    } catch (error) {
      console.error("Gagal mengambil data jadwal:", error);
    }
  };

  useEffect(() => {
    fetchJadwal(); // Ambil data saat komponen pertama kali dimuat
  }, []);

  const updateJadwalItem = async (
    id: string,
    updateData: Partial<MataKuliah>,
  ) => {
    try {
      const response = await fetch(`/api/jadwal/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      });

      if (response.ok) {
        // Setelah berhasil di-update di DB, ambil ulang semua data (Re-fetch)
        fetchJadwal();
      } else {
        console.error("Gagal mengupdate item jadwal.");
      }
    } catch (error) {
      console.error("Error saat melakukan update:", error);
    }
  };

  // Catatan: Fungsi updateStatus dan updateTugas sebelumnya sudah dihapus
  // karena sudah diganti dengan updateJadwalItem.

  // Kita kelompokkan jadwal per hari untuk tampilan yang lebih rapi
  const jadwalPerHari = jadwal.reduce(
    (acc, mk) => {
      if (!acc[mk.hari]) acc[mk.hari] = [];
      acc[mk.hari].push(mk);
      return acc;
    },
    {} as Record<string, MataKuliah[]>,
  );

  const hariOrder = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

  return (
    <div className="bg-accent min-h-screen p-8">
      <header className="mb-10 text-center">
        <h1 className="dark:text-accent-foreground text-4xl font-extrabold text-indigo-700">
          Jadwal Kuliah RPL Semester 5
        </h1>
        <p className="text-accent-foreground mt-2 text-lg">
          Manajemen Status Dosen, Ruangan, dan Tugas
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {hariOrder.map((hari) => {
          const mkHariIni = jadwalPerHari[hari];
          if (!mkHariIni || mkHariIni.length === 0) return null;

          return (
            <div key={hari} className="bg-card rounded-xl p-6 shadow-xl">
              <h2 className="text-card-foreground mb-4 border-b pb-2 text-2xl font-bold">
                {hari}
              </h2>
              <div className="space-y-4">
                {mkHariIni.map((mk) => {
                  // PERBAIKAN: Tidak perlu menghitung originalIndex lagi
                  return (
                    <CardJadwal
                      key={mk._id} // Menggunakan _id sebagai key
                      mataKuliah={mk}
                      updateJadwalItem={updateJadwalItem}
                      getStatusColor={getStatusColor}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
