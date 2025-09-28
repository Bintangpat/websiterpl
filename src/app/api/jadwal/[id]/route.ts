// app/api/jadwal/[id]/route.ts (Untuk update data berdasarkan ID)

import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import MataKuliahModel from "@/models/datakuliah";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  await dbConnect();

  try {
    const { id } = await params;

    // Ambil semua data yang mungkin di-update dari body
    const { statusDosen, tugas, ruangan } = await request.json();

    const updateFields: any = {};
    if (statusDosen) updateFields.statusDosen = statusDosen;
    if (tugas !== undefined) updateFields.tugas = tugas;
    if (ruangan) updateFields.ruangan = ruangan;

    // Cari berdasarkan ID dan update data
    const updatedMataKuliah = await MataKuliahModel.findByIdAndUpdate(
      id,
      updateFields,
      { new: true, runValidators: true },
    );

    if (!updatedMataKuliah) {
      return NextResponse.json(
        { message: "Mata kuliah tidak ditemukan" },
        { status: 404 },
      );
    }

    // Mengembalikan data yang sudah di-update
    return NextResponse.json(updatedMataKuliah, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Gagal mengupdate data" },
      { status: 500 },
    );
  }
}
