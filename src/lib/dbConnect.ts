// lib/dbConnect.ts

import mongoose, { Mongoose } from "mongoose";

// Mendefinisikan interface untuk koneksi cache global
interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Mengambil variabel lingkungan
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  // Melempar error jika URI tidak ditemukan
  throw new Error(
    "Tolong definisikan variabel lingkungan MONGODB_URI di .env.local",
  );
}

// Inisialisasi cache global untuk Mongoose
// Menggunakan globalThis lebih aman daripada 'global as any'
let cached = globalThis as unknown as { mongoose: MongooseCache | undefined };

if (!cached.mongoose) {
  cached.mongoose = { conn: null, promise: null };
}

export async function dbConnect(): Promise<Mongoose> {
  const mongooseCache = cached.mongoose;

  // 1. Jika koneksi sudah ada (di-cache), kembalikan koneksi yang sama
  if (mongooseCache && mongooseCache.conn) {
    return mongooseCache.conn;
  }

  // 2. Jika belum ada promise koneksi, buat promise baru
  if (mongooseCache && !mongooseCache.promise) {
    const opts = {
      // Opsi untuk mencegah Mongoose membuat buffer perintah saat terputus
      bufferCommands: false,
    };

    mongooseCache.promise = mongoose
      .connect(MONGODB_URI!, opts)
      .then((mongooseInstance) => {
        console.log("MongoDB berhasil terhubung!");
        return mongooseInstance;
      });
  }

  // 3. Menunggu promise koneksi selesai
  try {
    const conn = await mongooseCache?.promise;
    if (conn) {
      mongooseCache!.conn = conn;
      return conn;
    }
    // Jika promise gagal tapi tidak melempar error di .then
    throw new Error("Gagal mendapatkan koneksi MongoDB.");
  } catch (e) {
    // Jika koneksi gagal, reset promise agar bisa dicoba lagi
    if (mongooseCache) {
      mongooseCache.promise = null;
    }
    console.error("Kesalahan koneksi MongoDB:", e);
    throw e;
  }
}
