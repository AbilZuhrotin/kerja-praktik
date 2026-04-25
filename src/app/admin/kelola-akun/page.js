"use client";
import React from 'react';
import { UserPlus, Shield, Key, Trash2, Edit } from 'lucide-react';

export default function KelolaAkunPage() {
  const accounts = [
    { id: 1, nama: "Admin Utama", role: "Super Admin", email: "admin@lyonssky.com" },
    { id: 2, nama: "Kasir Sore", role: "Admin", email: "kasir1@lyonssky.com" },
  ];

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black uppercase text-[#382E2E] tracking-tighter">Kelola Akun</h2>
          <p className="text-[10px] font-medium text-zinc-400 uppercase">Manajemen hak akses staff</p>
        </div>
        <button className="bg-[#cbc500] text-[#382E2E] px-4 py-2.5 rounded-xl text-[10px] font-black uppercase flex items-center gap-2">
          <UserPlus size={16} /> Tambah Staff
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {accounts.map((acc) => (
          <div key={acc.id} className="bg-white p-5 rounded-2xl border border-zinc-100 shadow-sm flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-zinc-100 rounded-full flex items-center justify-center text-[#382E2E]">
                <Shield size={20} />
              </div>
              <div>
                <h4 className="text-xs font-black uppercase tracking-tight">{acc.nama}</h4>
                <p className="text-[10px] font-medium text-zinc-400 italic">{acc.role} • {acc.email}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="p-2 text-zinc-400 hover:text-[#382E2E]"><Key size={16}/></button>
              <button className="p-2 text-zinc-400 hover:text-red-500"><Trash2 size={16}/></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}