// app/api/jadwal/route.ts (Untuk membaca semua jadwal dan menambahkan data baru)

import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import MataKuliahModel from "@/models/datakuliah";

// --- GET (READ ALL) ---

export async function GET() {
  await dbConnect();

  try {
    // Mencari semua dokumen dalam koleksi
    const jadwal = await MataKuliahModel.find({});

    // Mengembalikan data dalam format JSON dengan status 200
    return NextResponse.json(jadwal, { status: 200 });
  } catch (error) {
    console.error("Kesalahan saat mengambil data jadwal:", error);
    // Mengembalikan error 500 yang valid agar frontend tidak mengalami error parse JSON
    return NextResponse.json(
      { message: "Gagal mengambil data jadwal dari database" },
      { status: 500 },
    );
  }
}

// --- POST (CREATE) ---

export async function POST(request: Request) {
  await dbConnect();

  try {
    const body = await request.json();

    const newMataKuliah = await MataKuliahModel.create(body);

    return NextResponse.json(newMataKuliah, { status: 201 }); // 201 Created
  } catch (error) {
    console.error("Kesalahan saat menambahkan mata kuliah:", error);
    return NextResponse.json(
      { message: "Gagal menambahkan mata kuliah" },
      { status: 500 },
    );
  }
}
