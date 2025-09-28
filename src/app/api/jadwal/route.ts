// app/api/jadwal/route.ts
import { NextResponse, NextRequest } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import MataKuliahModel from "@/models/datakuliah";

// --- GET (READ ALL) ---
export async function GET() {
  await dbConnect();

  try {
    const jadwal = await MataKuliahModel.find({});
    return NextResponse.json(jadwal, { status: 200 });
  } catch (error: unknown) {
    console.error("Kesalahan saat mengambil data jadwal:", error);
    return NextResponse.json(
      { message: "Gagal mengambil data jadwal dari database" },
      { status: 500 },
    );
  }
}

// --- POST (CREATE) ---
export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const body = await request.json();
    const newMataKuliah = await MataKuliahModel.create(body);
    return NextResponse.json(newMataKuliah, { status: 201 }); // 201 Created
  } catch (error: unknown) {
    console.error("Kesalahan saat menambahkan mata kuliah:", error);
    return NextResponse.json(
      { message: "Gagal menambahkan mata kuliah" },
      { status: 500 },
    );
  }
}
