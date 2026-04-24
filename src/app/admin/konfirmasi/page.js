"use client";
import React, { useState } from "react";
import { Search, Send, CheckCircle2, Calendar, MapPin, Clock, CreditCard } from "lucide-react";

export default function KonfirmasiPage() {
  // --- DATA DUMMY: Sudah ada nominal bayar ---
  const [dataKonfirmasi] = useState([
    {
      id: "LSKY-202604001",
      nama: "Amelia",
      total: 150000,
      sudah_bayar: 75000,
      wa: "6281234567890",
      meja: "01",
      tgl: "24/4/2026",
      jam_masuk: "19:00",
      jam_keluar: "23.00",
      metode: "DP 50%",
    },
    {
      id: "LSKY-202604002",
      nama: "Abil Zuhratin",
      total: 200000,
      sudah_bayar: 100000,
      wa: "6289876543210",
      meja: "04",
      tgl: "24/4/2026",
      jam_masuk: "19:00",
      jam_keluar: "23.00",
      metode: "DP 50%",
    },
    {
      id: "LSKY-202604003",
      nama: "Rizky Ramadan",
      total: 100000,
      sudah_bayar: 50000,
      wa: "6281122334455",
      meja: "09",
      tgl: "24/4/2026",
      jam_masuk: "19:00",
      jam_keluar: "23.00",
      metode: "DP 50%",
    },
  ]);

  const handleSendWA = (item) => {
    const message = `Halo ${item.nama}, reservasi kamu di *Lyon's Sky* (Meja ${item.meja}) untuk tanggal ${item.tgl} telah kami konfirmasi. %0A%0ASilakan cek invoice kamu di sini: %0Ahttps://lyonssky.com/invoice/${item.id} %0A%0ASampai jumpa di lokasi! 🔥`;
    window.open(`https://wa.me/${item.wa}?text=${message}`, "_blank");
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-10">
      {/* HEADER */}
      <header className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-black uppercase text-[#382E2E] tracking-tighter">
            Konfirmasi Pembayaran
          </h2>
          <p className="text-[10px] font-medium text-zinc-400 uppercase tracking-widest italic">
            Verifikasi & Kirim Invoice Digital
          </p>
        </div>

        <div className="relative w-full md:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={14} />
          <input
            type="text"
            placeholder="CARI KODE / NAMA..."
            className="w-full bg-white border border-zinc-200 rounded-xl py-2.5 pl-9 pr-4 text-[10px] font-medium uppercase focus:border-[#382E2E] transition-all outline-none"
          />
        </div>
      </header>

      {/* GRID CARDS (Universal: HP, iPad, Laptop OK) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-sans">
        {dataKonfirmasi.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-5 space-y-4 hover:shadow-md transition-shadow">
            
            {/* 1. Header Card: Nama & ID */}
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[9px] font-bold text-zinc-400 tracking-tighter uppercase italic">
                  {item.id}
                </p>
                <h4 className="text-sm font-black uppercase text-[#382E2E] tracking-tight leading-tight">
                  {item.nama}
                </h4>
              </div>
              <span className="bg-amber-50 text-amber-700 text-[8px] font-bold px-2 py-1 rounded uppercase italic border border-amber-100">
                {item.metode}
              </span>
            </div>

            {/* 2. Info Keuangan (Area Paling Penting) */}
            <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-100 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-50 text-red-600 rounded-lg">
                  <CreditCard size={18} />
                </div>
                <div>
                  <p className="text-[8px] font-bold text-zinc-400 uppercase">Tagihan DP</p>
                  <p className="text-sm font-black text-red-600 italic tracking-tight">
                    Rp {item.sudah_bayar.toLocaleString("id-ID")}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[8px] font-medium text-zinc-400 uppercase">Total Pesanan</p>
                <p className="text-[10px] font-bold text-[#382E2E] italic">
                  Rp {item.total.toLocaleString("id-ID")}
                </p>
              </div>
            </div>

            {/* 3. Info Operasional (Kasir & Kitchen) */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-zinc-500">
                <MapPin size={12} />
                <p className="text-[10px] font-semibold uppercase tracking-tighter italic">Meja {item.meja}</p>
              </div>
              <div className="flex items-center gap-2 text-zinc-500">
                <Calendar size={12} />
                <p className="text-[10px] font-semibold uppercase tracking-tighter italic">{item.tgl}</p>
              </div>
              <div className="flex items-center gap-2 text-zinc-500">
                <Clock size={12} />
                <p className="text-[10px] font-semibold uppercase tracking-tighter italic leading-none">
                  {item.jam_masuk} - {item.jam_keluar} WIB
                </p>
              </div>
            </div>

            {/* 4. Action Buttons */}
            <div className="flex gap-2 pt-2 border-t border-zinc-50">
              <button className="flex-1 bg-green-600 text-white py-3 rounded-xl text-[10px] font-bold uppercase flex items-center justify-center gap-2 active:scale-95 shadow-lg shadow-green-50">
                <CheckCircle2 size={16} /> Verifikasi
              </button>
              <button
                onClick={() => handleSendWA(item)}
                className="flex-1 border-2 border-[#382E2E] text-[#382E2E] py-3 rounded-xl text-[10px] font-bold uppercase flex items-center justify-center gap-2 active:scale-95 hover:bg-[#382E2E] hover:text-white transition-all"
              >
                <Send size={16} /> Kirim WA
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <p className="text-center text-[9px] font-bold text-zinc-300 uppercase tracking-[0.4em] pt-4 italic">
        Lyon's Sky Industrial System
      </p>
    </div>
  );
}