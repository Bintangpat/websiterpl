// models/datakuliah.ts

import mongoose, { Schema } from "mongoose";
import { MataKuliah } from "@/types/jadwal"; // Pastikan path ini benar

// Definisikan Mongoose Schema
const MataKuliahSchema = new Schema<MataKuliah>(
  {
    nama: { type: String, required: true },
    dosen: { type: String, required: true },
    ruangan: { type: String, required: true },
    waktu: { type: String, required: true },
    hari: { type: String, required: true },

    statusDosen: { type: String, required: true },
    tugas: { type: String, default: "Belum ada tugas." },
    isEditable: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    // Ganti dengan nama database Anda
    collection: "matakuliahs",
  },
);

// Penting: Gunakan nama file datakuliah yang sesuai
const MataKuliahModel = (mongoose.models.datakuliah ||
  mongoose.model<MataKuliah>(
    "datakuliah",
    MataKuliahSchema,
  )) as mongoose.Model<MataKuliah>;

export default MataKuliahModel;
