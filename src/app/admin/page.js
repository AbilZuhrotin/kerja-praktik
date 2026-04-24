"use client";
import React from "react";
import Link from "next/link";
import { BellRing, TriangleAlert, Send } from "lucide-react";

export default function DashboardAdmin() {
  // --- DUMMY DATA: Nanti tinggal ganti data dari Supabase ---

  // 1. Data untuk Tabel Pelunasan (DP)
  const tagihanDP = [
    {
      id: "RSV-001",
      nama: "Amelia Ramadhani",
      meja: "01",
      jam_datang: "19:00",
      jam_keluar: "22:15",
      tgl: "25/04/2026",
      sisa: 75000,
      wa: "628123456789",
    },
    {
      id: "RSV-002",
      nama: "Riska Damayanti",
      meja: "05",
      jam_datang: "20:30",
      jam_keluar: "22:00",
      tgl: "25/04/2026",
      sisa: 50000,
      wa: "628987654321",
    },
  ];

  // 2. Data untuk Jadwal Mendatang (Kitchen & Kasir)
  const jadwalMendatang = [
    {
      id: "RSV-003",
      tgl: 24,
      bulan: "Mei",
      nama: "Awaliyah",
      meja: "03",
      jam_datang: "18:00",
      jam_keluar: "22.00",
      status: "Lunas",
      pesanan: ["2x Kopi Tubruk", "1x Rice Bowl", "1x Mendoan"],
    },
    {
      id: "RSV-004",
      tgl: 25,
      bulan: "Mei",
      nama: "Anlika Shendy",
      meja: "02",
      jam_datang: "19:30",
      jam_keluar:"22.00",
      status: "Lunas",
      pesanan: ["1x Es Kopi Susu", "1x Kentang Goreng"],
    },
  ];

  return (
    <div className="space-y-4 text-[#382E2E]">
      {/* Notifikasi */}
      <Link
        href="/admin/konfirmasi"
        className="block overflow-hidden rounded-xl border-l-8 border-[#382E2E] bg-[#cbc500] shadow-sm"
      >
        <div className="flex items-center justify-between p-4 px-6">
          <div className="flex items-center gap-3">
            <BellRing />
            <h4 className="text-xs font-semibold">
              Ada 3 Antrean Konfirmasi Baru!
            </h4>
          </div>
          <span className="bg-[#382E2E] text-white text-xs font-light px-4 py-2 rounded-lg">
            Cek Sekarang
          </span>
        </div>
      </Link>

      {/* Pelunasan DP */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-md overflow-hidden">
        <div className="p-5 border-b border-gray-100 bg-zinc-50 flex justify-between items-center">
          <div>
            <h3 className="font-bold text-md">Tagihan Pelunasan (DP)</h3>
            <p className="text-xs font-medium text-amber-600 italic flex items-center gap-1.5">
              <TriangleAlert size={12} strokeWidth={3} />
              <span>Segera selesaikan pembayaran saat tamu datang</span>
            </p>{" "}
          </div>
          <div className="bg-[#382E2E] text-white px-3 py-1 rounded text-xs font-semibold italic">
            {tagihanDP.length} TOTAL
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-zinc-50/50 text-xs font-bold text-gray-400 border-b border-gray-100">
              <tr>
                <th className="p-4 px-6 font-bold tracking-widest text-xs">
                  Customer / Meja / Jam
                </th>
                <th className="p-4 font-bold tracking-widest text-xs">
                  Sisa Bayar
                </th>
                <th className="p-4 text-center font-bold tracking-widest text-xs">
                  Aksi Cepat
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {tagihanDP.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="p-4 px-6">
                    {/* Baris Atas: Nama & Badge Tanggal */}
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-xs font-bold uppercase">{item.nama}</p>
                      <span className="bg-zinc-100 text-[#382E2E] text-[10px] font-medium px-1.5 py-0.5 rounded border border-zinc-200">
                        Meja {item.meja}
                      </span>
                    </div>

                    {/* Baris Bawah: Detail Meja & Jam */}
                    <div className="flex items-center gap-2">
                      <p className="text-[10px] font-medium text-[#382E2E]/60 leading-none">
                        {item.tgl} • {item.jam_datang}-
                        {item.jam_keluar} WIB
                      </p>
                    </div>
                  </td>
                  <td className="p-4 text-xs font-bold text-red-600">
                    Rp {item.sisa.toLocaleString("id-ID")}
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center gap-2">
                      <button className="bg-green-600 text-white text-[10px] font-bold px-3 py-2 rounded uppercase hover:bg-green-700 transition-all active:scale-95">
                       Pembayaran Lunas
                      </button>
                      <button className="border-2 border-[#382E2E] text-[#382E2E] text-[9px] font-bold px-3 py-1.5 rounded uppercase hover:bg-[#382E2E] hover:text-white transition-all flex items-center gap-1 active:scale-95">
                      <Send size={12}/>  
                        <span> Kirim Invoice</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reservasi 1 bulan kedepan */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-3 border-b border-gray-100 flex justify-between items-center bg-zinc-50">
          <h3 className="font-bold text-xs uppercase">
            Reservasi untuk 1 Bulan ke depan
          </h3>
          <button className="text-[9px] font-semibold underline decoration-[#cbc500] decoration-2 underline-offset-4">
            Lihat Semua
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-100">
          {jadwalMendatang.map((item) => (
            <div key={item.id} className="p-5 bg-white flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className="bg-[#382E2E] text-white p-2 rounded-lg text-center min-w-[50px] border-b-4 border-[#cbc500]">
                    <p className="text-[9px] font-medium uppercase text-white">
                      {item.bulan}
                    </p>
                    <p className="text-base font-bold leading-none">
                      {item.tgl}
                    </p>
                  </div>
                  <div>
                    <h5 className="text-[11px] font-black uppercase">
                      {item.nama} <span className="text-zinc-300 mx-1">|</span>{" "}
                      {item.jam_datang} - {item.jam_keluar} WIB
                    </h5>
                    <p className="text-[9px] font-bold text-zinc-400 uppercase italic">
                      Meja {item.meja}
                    </p>
                  </div>
                </div>
                <span className="text-[8px] font-black px-2 py-1 bg-green-50 text-green-700 rounded uppercase">
                  {item.status}
                </span>
              </div>

              {/* Kitchen Task Preview */}
              <div className="bg-zinc-50 p-3 rounded-xl border border-zinc-100 relative">
                <p className="absolute -top-2 left-3 bg-white px-2 text-[8px] font-bold uppercase text-zinc-400">
                  Menu
                </p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {item.pesanan.map((menu, index) => (
                    <span
                      key={index}
                      className="text-[9px] font-bold uppercase flex items-center gap-1"
                    >
                      <span className="w-1 h-1 bg-[#cbc500] rounded-full"></span>{" "}
                      {menu}
                    </span>
                  ))}
                </div>
              </div>

              <button className="w-full text-[10px] font-bold border border-gray-200 py-2 rounded hover:bg-zinc-50 transition-all active:scale-[0.98] uppercase tracking-widest">
                Detail Pesanan
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
