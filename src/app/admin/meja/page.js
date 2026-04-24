"use client";
import React, { useState } from 'react';
import { Search, Edit3, Trash2, Plus, Calendar, Clock, MapPin } from 'lucide-react';

export default function MejaManagementPage() {
  // --- DUMMY DATA RESERVASI ---
  const [reservasi, setReservasi] = useState([
    { id: "RSV-001", nama: "Amelia", meja: "01", tgl: "24/04/2026", jam: "19:00 - 23:00", status: "Konfirmasi" },
    { id: "RSV-002", nama: "Abil Zuhratin", meja: "04", tgl: "24/04/2026", jam: "19:00 - 23:00", status: "Proses" },
    { id: "RSV-003", nama: "Rizky Ramadan", meja: "09", tgl: "24/04/2026", jam: "19:00 - 23:00", status: "Konfirmasi" },
  ]);

  const handleEdit = (id) => console.log("Edit ID:", id);
  const handleDelete = (id) => {
    if(confirm("Yakin mau hapus reservasi ini?")) {
      setReservasi(reservasi.filter(item => item.id !== id));
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      {/* HEADER */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black uppercase text-[#382E2E]">Manajemen Reservasi Meja</h2>
          <p className="text-[10px] font-medium text-zinc-400 uppercase">Update, Edit, atau Batalkan Jadwal Tamu</p>
        </div>
      </header>

      {/* FILTER & SEARCH */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={14} />
        <input 
          type="text" 
          placeholder="CARI KODE / NAMA CUSTOMER..." 
          className="w-full bg-white border border-zinc-200 rounded-xl py-2.5 pl-9 pr-4 text-[10px] font-medium uppercase focus:border-[#382E2E] outline-none transition-all shadow-sm"
        />
      </div>

      {/* KONTAINER DATA */}
      <div className="bg-white rounded-2xl border border-zinc-100 shadow-md overflow-hidden">
        
        {/* VIEW DESKTOP */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-zinc-50 text-[11px] font-black uppercase text-zinc-400 border-b border-zinc-100">
              <tr>
                <th className="p-5 px-8">ID & Customer</th>
                <th className="p-5">Meja & Jadwal</th>
                <th className="p-5">Status</th>
                <th className="p-5 text-center">Opsi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {reservasi.map((item) => (
                <tr key={item.id} className="hover:bg-zinc-50/50 transition-colors">
                  <td className="p-5 px-8">
                    <p className="text-[10px] font-bold text-zinc-400 italic mb-1">{item.id}</p>
                    <p className="text-xs font-black uppercase text-[#382E2E]">{item.nama}</p>
                  </td>
                  <td className="p-5">
                    <div className="flex flex-col gap-1">
                      <p className="text-[12px] font-bold  flex items-center gap-1.5"><MapPin size={16} className="text-zinc-400"/> Meja {item.meja}</p>
                      <p className="text-[12px] font-semibold italic text-zinc-400 flex items-center gap-1.5"><Calendar size={14}/> {item.tgl} | {item.jam}</p>
                    </div>
                  </td>
                  <td className="p-5 text-[12px] font-bold italic uppercase">
                    <span className={item.status === 'Konfirmasi' ? 'text-green-600' : 'text-amber-500'}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-5 text-center">
                    <div className="flex justify-center gap-3 text-zinc-400">
                      <button onClick={() => handleEdit(item.id)} className="hover:text-blue-600 transition-colors">
                        <Edit3 size={18} strokeWidth={2.5} />
                      </button>
                      <button onClick={() => handleDelete(item.id)} className="hover:text-red-600 transition-colors">
                        <Trash2 size={18} strokeWidth={2.5} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* VIEW MOBILE */}
        <div className="md:hidden divide-y divide-zinc-100">
          {reservasi.map((item) => (
            <div key={item.id} className="p-5 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[9px] font-bold text-zinc-400 italic mb-1">{item.id}</p>
                  <h4 className="text-sm font-black uppercase text-[#382E2E] tracking-tight">{item.nama}</h4>
                </div>
                <div className="flex gap-4 text-zinc-400">
                  <Edit3 size={18} onClick={() => handleEdit(item.id)} />
                  <Trash2 size={18} className="text-red-400" onClick={() => handleDelete(item.id)} />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-[10px] font-semibold uppercase italic text-zinc-500 bg-zinc-50 p-3 rounded-xl border border-zinc-100">
                <p className="flex items-center gap-1.5"><MapPin size={12}/> Meja {item.meja}</p>
                <p className="flex items-center gap-1.5"><Clock size={12}/> {item.jam}</p>
                <p className="col-span-2 flex items-center gap-1.5 mt-1 border-t border-zinc-200 pt-1"><Calendar size={12}/> {item.tgl}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}