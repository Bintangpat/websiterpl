import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import MataKuliahModel from "@/models/datakuliah";
import { MataKuliah } from "@/types/jadwal"; // Import interface MataKuliah

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  await dbConnect();

  try {
    const { id } = params;

    const body: Partial<MataKuliah> = await request.json();

    const { statusDosen, tugas, ruangan } = body;

    const updateFields: Partial<MataKuliah> = {};

    if (statusDosen) updateFields.statusDosen = statusDosen;
    if (tugas !== undefined) updateFields.tugas = tugas;
    if (ruangan) updateFields.ruangan = ruangan;

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

    return NextResponse.json(updatedMataKuliah, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Gagal mengupdate data" },
      { status: 500 },
    );
  }
}
