"use client";
import React from "react";
import { useParams } from "next/navigation";
import { Printer } from "lucide-react";
import Image from "next/image";

export default function InvoicePage() {
  const { id } = useParams();

  const data = {
    invoice_id: id || "INV/2026/0401",
    nama: "Abil Zuhratin",
    tgl_pesan: "24 April 2026",
    jam: "19:00 - 23:00 WIB",
    meja: "04",
    status: "Konfirmasi",
    rincian: [
      { item: "Booking Table VIP", qty: 1, harga: 100000 },
      { item: "Platter Mix Large", qty: 1, harga: 75000 },
      { item: "Signature Coffee", qty: 2, harga: 50000 },
    ],
    total_pesanan: 225000,
    dp_dibayar: 112500, // Yang sudah masuk ke rekening kafe
  };

  const sisa_bayar = data.total_pesanan - data.dp_dibayar;

  return (
    <div className="min-h-screen bg-white py-6 md:py-12 px-4 font-sans text-[#1a1a1a]">
      <div className="max-w-2xl mx-auto">
        {/* BUTTON DOWNLOAD (Memicu Print Browser) */}
        <div className="flex justify-end mb-6 print:hidden">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-6 py-3 bg-[#1a1a1a] text-white text-[10px] font-semibold hover:bg-black transition-all active:scale-95"
          >
            <Printer size={14} /> Download Invoice
          </button>
        </div>

        {/* INVOICE CARD */}
        <div className="border border-zinc-200 p-6 md:p-12 shadow-sm relative overflow-hidden">
          {/* LOGO & HEADER */}
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-6 mb-12 text-center md:text-left">
            <div className="flex flex-col items-center md:items-start">
              {/* LOGO PLACEHOLDER - Ganti src dengan path logo asli kamu */}
              <div className="w-36 h-36 flex items-center justify-center p-1 rounded-lg">
                {/* Coba pakai tag img biasa dulu Bil buat mastiin path */}
                <img
                  src="/foto/logo-nobg.png"
                  alt="Lyon's Sky Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-[12px] font-semibold text-zinc-400 mt-1 pl-5">
                Digital Invoice
              </p>
            </div>

            <div className="flex flex-col items-center md:items-end">
              <span className="px-4 py-1.5 border-2 border-green-600 text-green-600 text-[10px] font-black uppercase tracking-widest mb-2">
                {data.status}
              </span>
              <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest italic">
                {data.invoice_id}
              </p>
            </div>
          </div>

          {/* GRID INFO UTAMA (RESPONSIVE) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12 border-y border-zinc-100 py-8">
            <div className="space-y-1">
              <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
                Pemesanan Atas Nama
              </p>
              <p className="text-sm font-black uppercase">{data.nama}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
                Tanggal & Waktu
              </p>
              <p className="text-xs font-black uppercase tracking-tight">
                {data.tgl_pesan} <br /> {data.jam}
              </p>
            </div>
            <div className="space-y-1 sm:col-span-2 md:col-span-1">
              <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
                Meja No
              </p>
              <p className="text-sm font-black uppercase flex items-center justify-center md:justify-start gap-2 text-[#382E2E]">
                {data.meja}
              </p>
            </div>
          </div>

          {/* RINCIAN PESANAN */}
          <div className="mb-10 overflow-hidden">
            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-6 border-b border-zinc-50 pb-2">
              Daftar Pesanan
            </p>

            <div className="space-y-5">
              {data.rincian.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-start text-xs"
                >
                  <div className="pr-4">
                    <p className="font-black uppercase tracking-tight text-[#382E2E]">
                      {item.item}
                    </p>
                    <p className="text-[9px] text-zinc-400 font-bold mt-1 leading-none">
                      Qty: {item.qty}x
                    </p>
                  </div>
                  <p className="font-black italic text-[#382E2E] whitespace-nowrap">
                    Rp {(item.harga * item.qty).toLocaleString("id-ID")}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* TOTAL & PAYMENT SECTION (CLEAN & CLEAR) */}
          <div className="pt-8 border-t-2 border-zinc-50">
            <div className="flex flex-col md:flex-row justify-between gap-8">
              {/* Note Kolom Kiri */}
              <div className="flex-1 order-2 md:order-1">
                <div className="p-4 bg-zinc-50 border-l-4 border-[#382E2E]">
                  <p className="text-[9px] font-black uppercase tracking-widest mb-2 italic">
                    Informasi Penting:
                  </p>
                  <ul className="text-[9px] font-medium text-zinc-500 space-y-1.5 uppercase leading-relaxed">
                    <li>• HARAP TUNJUKKAN INVOICE INI SAAT TIBA DI LOKASI.</li>
                    <li>
                      • MEJA AKAN DI-HOLD MAKSIMAL 15 MENIT DARI JAM RESERVASI.
                    </li>
                    <li>• SISA PELUNASAN DILAKUKAN MELALUI KASIR DI LOKASI.</li>
                  </ul>
                </div>
              </div>

              {/* Rincian Duit Kolom Kanan */}
              <div className="w-full md:w-72 space-y-3 order-1 md:order-2 font-sans">
                {/* Subtotal Pesanan */}
                <div className="flex justify-between text-[11px] font-bold text-zinc-500 uppercase">
                  <span>Total Harga Pesanan</span>
                  <span>Rp {data.total_pesanan.toLocaleString("id-ID")}</span>
                </div>

                {/* Yang sudah dibayar (DP) */}
                <div className="flex justify-between items-center py-4 border-y border-zinc-100 text-green-600 bg-green-50/30 px-3">
                  <span className="text-[10px] font-black uppercase tracking-widest italic">
                    DP (Sudah Bayar)
                  </span>
                  <span className="text-lg font-black tracking-tighter">
                    - Rp {data.dp_dibayar.toLocaleString("id-ID")}
                  </span>
                </div>

                {/* Yang harus dibayar di kasir */}
                <div className="flex justify-between items-center pt-2 px-3">
                  <div className="text-left">
                    <p className="text-[9px] font-black text-[#382E2E] uppercase leading-none">
                      Wajib Bayar di Kasir
                    </p>
                    <p className="text-[8px] font-bold text-zinc-400 uppercase italic mt-1">
                      (Pay at Cashier)
                    </p>
                  </div>
                  <span className="text-xl font-bold text-[#382E2E] underline decoration-[#cbc500] decoration-2 underline-offset-4">
                    Rp {sisa_bayar.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="mt-16 text-center border-t border-zinc-50 pt-8">
            <p className="text-[10px] font-black uppercase tracking-[0.6em] text-zinc-300">
              Lyon's Sky Cafe
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
