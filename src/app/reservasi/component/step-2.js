import Image from "next/image";

export default function StepTwo() {
  return (
    <main>
        <div className="max-w-3xl mx-auto px-4 py-8 animate-in fade-in duration-500 space-y-10">
        
        {/* 1. SECTION DATA DIRI */}
        <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-gray-100 shadow-xl">
            <div className="border-l-4 border-[#cbc500] pl-4 mb-8">
            <h3 className="text-2xl font-bold text-[#382E2E]">Data Reservasi</h3>
            </div>

            <div className="space-y-6">
            <div className="w-full">
                <label className="block text-sm font-black mb-2 text-[#382E2E] uppercase tracking-wider">Nama Pemesan</label>
                <input type="text" className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#cbc500] transition-all" placeholder="Nama lengkap..." />
            </div>

            <div className="w-full">
                <label className="block text-sm font-black mb-2 text-[#382E2E] uppercase tracking-wider">Nomor WhatsApp</label>
                <input type="tel" className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#cbc500] transition-all" placeholder="08..." />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                <label className="block text-sm font-black mb-2 text-[#382E2E] uppercase tracking-wider">Tanggal</label>
                <input type="date" className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#cbc500]" />
                </div>
                <div>
                <label className="block text-sm font-black mb-2 text-[#382E2E] uppercase tracking-wider">Jam Datang</label>
                <input type="time" className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#cbc500]" />
                </div>
                <div>
                <label className="block text-sm font-black mb-2 text-[#382E2E] uppercase tracking-wider">Jam Keluar</label>
                <input type="time" className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#cbc500]" />
                </div>
            </div>

            <div className="w-full">
                <label className="block text-sm font-black mb-2 text-[#382E2E] uppercase tracking-wider">Jumlah Orang</label>
                <input type="number" className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#cbc500]" placeholder="Berapa orang yang datang?" />
            </div>
            </div>
        </div>

        {/* 2. SECTION DENAH MEJA */}
        <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-gray-100 shadow-xl">
            <div className="border-l-4 border-[#cbc500] pl-4 mb-6">
            <h3 className="text-2xl font-bold text-[#382E2E]">Pilih Meja</h3>
            <p className="text-sm text-gray-500 italic">Kamu bisa pilih lebih dari 1 meja</p>
            </div>

            {/* Foto Denah (Bisa Diklik Zoom) */}
            <div 
            className="relative group cursor-pointer overflow-hidden bg-gray-50 border-2 border-dashed border-gray-200 mb-8"
            >
            <img 
                src="/denah-lyon's.png" 
                alt="Denah Lyon's Sky" 
                className="w-full h-auto max-h-[500px] object-contain mx-auto"
            />
            </div>

            {/* Checkbox Meja (Grid) */}
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3">
            {[...Array(20)].map((_, i) => (
                <label key={i} className="cursor-pointer group">
                <input type="checkbox" className="peer hidden" />
                <div className="w-full py-4 rounded-2xl border-2 border-gray-100 flex flex-col items-center justify-center transition-all peer-checked:border-[#cbc500] peer-checked:bg-[#cbc500]/10">
                    <span className="text-[10px] font-black text-gray-400 uppercase">No</span>
                    <span className="text-xl font-black text-[#382E2E]">{i + 1}</span>
                </div>
                </label>
            ))}
            </div>
        </div>

        {/* NAVIGASI - MOBILE FRIENDLY */}
            <div className="flex items-center justify-between gap-4 pt-6">
            {/* Tombol Kembali (Cuma Teks biar nggak menuhin layar) */}
            <button className="text-sm font-bold text-gray-400 hover:text-[#382E2E] tracking-widest transition-colors px-2">
                Kembali
            </button>

            {/* Tombol Lanjut (Ukurannya dipasin buat jempol) */}
            <button className="font-bold bg-[#382E2E] text-[#cbc500] px-9 py-2.5 rounded-full text-sm shadow-md active:scale-95 transition-all tracking-tighter">
                Lanjut 
            </button>
            </div>
        </div>
    </main>
    );
};