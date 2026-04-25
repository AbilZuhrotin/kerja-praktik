"use client";
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Download, ChevronDown, FileSpreadsheet, FileText, Calendar, Users, CircleDollarSign, Filter, MoreHorizontal } from 'lucide-react';

// --- DATA DUMMY ---
const dataOmset = [
  { bln: 'Januari', total: 2400000, tamu: 45 },
  { bln: 'Februari', total: 3200000, tamu: 58 },
  { bln: 'Maret', total: 9800000, tamu: 180 },
  { bln: 'April', total: 4500000, tamu: 92 },
  { bln: 'Mei', total: 5700000, tamu: 110 },
];

const historiMei = [
  { id: 'RSV-011', nama: 'Amelia', tgl: '24 Mei 2026', total: 150000, status: 'Lunas' },
  { id: 'RSV-012', nama: 'Abil Zuhratin', tgl: '22 Mei 2026', total: 200000, status: 'Lunas' },
  { id: 'RSV-013', nama: 'Rizky Ramadan', tgl: '20 Mei 2026', total: 100000, status: 'Lunas' },
  { id: 'RSV-014', nama: 'Panca Wiratama', tgl: '18 Mei 2026', total: 350000, status: 'Lunas' },
];

export default function LaporanPage() {
  const [showDL, setShowDL] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [bulanAktif, setBulanAktif] = useState('Mei');

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16 animate-in fade-in duration-500">
      
      {/* HEADER & ACTIONS */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2">
        <div>
          <h2 className="text-2xl font-black uppercase text-[#382E2E]">Laporan Operasional</h2>
          <p className="text-[10px] font-bold text-zinc-400 uppercase">Analytics Dashboard Lyon's Sky</p>
        </div>
        
        <div className="relative">
          <button 
            onClick={() => setShowDL(!showDL)}
            className="bg-[#382E2E] text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase flex items-center gap-3 active:scale-95 transition-all shadow-xl shadow-zinc-200"
          >
            <Download size={16} className="text-[#cbc500]" />
            Download
            <ChevronDown size={14} className={`transition-transform duration-300 ${showDL ? 'rotate-180' : ''}`} />
          </button>

          {showDL && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-zinc-100 rounded-2xl shadow-2xl z-50 overflow-hidden">
              <button className="w-full flex items-center gap-3 px-5 py-4 text-[10px] font-black uppercase text-[#382E2E] hover:bg-zinc-50 border-b border-zinc-50">
                <FileSpreadsheet size={16} className="text-green-600" /> Export CSV
              </button>
              <button className="w-full flex items-center gap-3 px-5 py-4 text-[10px] font-black uppercase text-[#382E2E] hover:bg-zinc-50">
                <FileText size={16} className="text-red-600" /> Export PDF
              </button>
            </div>
          )}
        </div>
      </header>

      {/* STATS QUICK VIEW (Hanya Bulan Ini) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-2">
        <div className="bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm">
          <p className="text-[11px] font-bold text-zinc-400mb-2">Total Pendapatan Mei</p>
          <div className="flex items-center gap-3 text-[#382E2E]">
            <div className="p-2 bg-zinc-50 rounded-xl text-[#cbc500]"><CircleDollarSign size={24} /></div>
            <h3 className="text-2xl font-bold">Rp 5.700.000</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm text-[#382E2E]">
          <p className="text-[9px] font-bold text-zinc-400 mb-2">Jumlah Tamu Mei</p>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-zinc-50 rounded-xl text-[#cbc500]"><Users size={24} /></div>
            <h3 className="text-2xl font-bold">110 <span className="text-[10px] not-italic text-zinc-300 uppercase">Orang</span></h3>
          </div>
        </div>
      </div>

      {/* CHART - GEMUK & PADAT */}
      <div className="bg-white p-6 md:p-10 rounded-[3rem] border border-zinc-100 shadow-md">
        <div className="flex items-center gap-2 mb-10">
            <div className="w-2 h-8 bg-[#cbc500] rounded-full"></div>
            <h4 className="text-[12px] font-black uppercase tracking-[0.2em] text-[#382E2E]">Grafik Pendapatan Bulanan</h4>
        </div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dataOmset} barCategoryGap="25%"> 
              <CartesianGrid strokeDasharray="8 8" vertical={false} stroke="#f5f5f5" />
              <XAxis 
                dataKey="bln" 
                axisLine={false} 
                tickLine={false} 
                tick={{fontSize: 10, fontWeight: '900', fill: '#382E2E'}} 
                dy={15}
                tickFormatter={(val) => val.substring(0, 3).toUpperCase()} 
              />
              <YAxis hide />
              <Bar dataKey="total" radius={[10, 10, 2, 2]}>
                {dataOmset.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.bln === 'Mei' ? '#cbc500' : '#382E2E'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* TABEL HISTORI BULANAN */}
      <div className="bg-white rounded-[2.8rem] border border-zinc-100 shadow-md overflow-hidden">
          <div className="p-8 border-b border-zinc-50 bg-zinc-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
             <div className="flex items-center gap-2">
                <Calendar size={18} className="text-[#cbc500]" />
                <h4 className="text-[12px] font-black uppercase tracking-widest text-[#382E2E] italic">Reservasi Bulan Ini</h4>
             </div>
             
             {/* DROPDOWN PILIH BULAN */}
             <div className="relative">
                <button 
                  onClick={() => setShowFilter(!showFilter)}
                  className="bg-white border-2 border-zinc-100 px-4 py-2 rounded-xl text-[9px] font-black uppercase flex items-center gap-2 hover:border-[#382E2E] transition-all"
                >
                  <Filter size={12} /> {bulanAktif} 2026 <ChevronDown size={12} />
                </button>
                {showFilter && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border border-zinc-100 rounded-xl shadow-2xl z-50 overflow-hidden">
                    {['Januari', 'Februari', 'Maret', 'April', 'Mei'].map((m) => (
                      <button 
                        key={m}
                        onClick={() => {setBulanAktif(m); setShowFilter(false);}}
                        className="w-full text-left px-4 py-3 text-[9px] font-bold uppercase hover:bg-zinc-50 border-b border-zinc-50 last:border-0"
                      >
                        {m} 2026
                      </button>
                    ))}
                  </div>
                )}
             </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="text-[10px] font-black uppercase text-zinc-400 border-b border-zinc-50 italic">
                <tr>
                  <th className="p-6 px-10">Histori Reservasi</th>
                  <th className="p-6">Tanggal</th>
                  <th className="p-6 text-right px-10">Total Bayar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50">
                {historiMei.map((item, idx) => (
                  <tr key={idx} className="hover:bg-zinc-50/30 transition-all">
                    <td className="p-6 px-10">
                      <p className="text-[8px] font-bold text-zinc-300 italic mb-1 uppercase">{item.id}</p>
                      <span className="text-xs font-black uppercase tracking-tight text-[#382E2E]">{item.nama}</span>
                    </td>
                    <td className="p-6 text-[10px] font-black text-zinc-400 uppercase italic">
                      {item.tgl}
                    </td>
                    <td className="p-6 text-right px-10 font-black italic text-xs tracking-tighter text-[#382E2E]">
                      Rp {item.total.toLocaleString('id-ID')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      </div>
    </div>
  );
}