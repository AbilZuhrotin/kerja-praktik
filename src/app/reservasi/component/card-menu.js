"use client";
import { useState } from "react";

export default function CardMenu({ menu = [] }) {
  // 2. State untuk filter
  const [filter, setFilter] = useState("Semua");
  const [cart, setCart] = useState([]);

  const daftarKategori = [
    "Semua",
    ...new Set(menu.map((item) => item.pilih_menu)),
  ];
  const menuFiltered =
    filter === "Semua"
      ? menu
      : menu.filter((item) => item.pilih_menu === filter);

  // --- FUNGSI TAMBAH KE KERANJANG ---
  const addToCart = (item) => {
    setCart((prevCart) => {
      const isExist = prevCart.find((i) => i.id_menu === item.id_menu);
      if (isExist) {
        return prevCart.map((i) =>
          i.id_menu === item.id_menu ? { ...i, qty: i.qty + 1 } : i,
        );
      }
      return [...prevCart, { ...item, qty: 1 }];
    });
  };

  // Hitung total harga & item
  const totalHarga = cart.reduce((acc, curr) => acc + curr.harga * curr.qty, 0);
  const totalItem = cart.reduce((acc, curr) => acc + curr.qty, 0);

  return (
    <div className="w-full">
      {/* Filter */}
      <div className="w-full mb-10 overflow-hidden">
        <div className="flex overflow-x-auto scrollbar-hide py-4 px-4">
          <div className="flex gap-3 md:mx-auto">
            {daftarKategori.map((kat) => (
              <button
                key={kat}
                onClick={() => setFilter(kat)}
                className={`px-6 py-2.5 rounded-full text-[10px] font-semibold  tracking-widest transition-all border whitespace-nowrap shadow-sm active:scale-95 ${
                  filter === kat
                    ? "bg-[#382E2E] text-[#cbc500] border-[#382E2E]"
                    : "bg-white text-gray-400 border-gray-100 hover:border-[#cbc500] hover:text-[#382E2E]"
                }`}
              >
                {kat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Card Menu */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-6 px-1">
        {menuFiltered.map((item) => (
          <div
            key={item.id_menu}
            className="bg-white rounded-sm border border-gray-100 shadow-sm overflow-hidden flex flex-col group transition-all"
          >
            {/* Image Area */}
            <div className="relative aspect-square bg-gray-50 overflow-hidden">
              <span className="absolute top-2 left-2 z-10 bg-[#cbc500]/90 backdrop-blur-sm text-[#ffffff] text-[10px] md:text-[9px] font-semibold px-2 py-1 rounded-lg shadow-sm">
                {item.kategori}/{item.pilih_menu}
              </span>
              <img
                src={item.url_menu_image}
                alt={item.nama_menu}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            {/* Card isi */}
            <div className="p-2.5 md:p-5 flex flex-col flex-1">
              <h4 className="font-bold text-[#382E2E] text-[16px] md:text-base mb-0.5 md:mb-1 line-clamp-1">
                {item.nama_menu}
              </h4>
              <p className="font-medium text-[#382E2E] text-[12px] md:text-lg mb-2 md:mb-4">
                Rp {item.harga.toLocaleString("id-ID")}
              </p>
              <div className="mt-auto flex justify-end">
                <button
                  onClick={() => addToCart(item)}
                  className="w-11 bg-[#f3f0e1] hover:bg-[#382E2E] hover:text-[#cbc500] text-[#382E2E] py-2 md:py-3 rounded-full text-[9px] md:text-xs font-black flex items-center justify-center gap-1 transition-all"
                >
                  <span className="text-xs md:text-sm">+</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {totalItem > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-[100] animate-in slide-in-from-bottom duration-500">
          <div className="bg-[#382E2E] p-4 rounded-3xl shadow-2xl flex items-center justify-between border border-[#cbc500]/20 backdrop-blur-md">
            <div className="flex items-center gap-3 pl-2 text-white">
              <div>
                <p className="text-[#cbc500] font-black text-sm">
                  Rp {totalHarga.toLocaleString("id-ID")}
                </p>
                <p className="text-[9px] text-gray-400 uppercase font-bold tracking-widest">
                  Total Pesanan
                </p>
              </div>
            </div>
            <div>
              <div className="relative">
                <span className="absolute -top-2 -right-2 bg-[#ffffff] text-[#382E2E] text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItem}
                </span>
              </div>
              <button className="bg-[#cbc500] text-[#382E2E] px-6 py-3 rounded-2xl font-black text-[11px] uppercase tracking-tighter shadow-lg active:scale-95 transition-all">
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
