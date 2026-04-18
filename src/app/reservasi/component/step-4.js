"use client";
import React from "react";
import { useState } from "react";

export default function StepFour({ cart, setCart, onBack, onNext }) {
  const [paymentType, setPaymentType] = useState("dp"); // 'dp' atau 'lunas'
  // --- LOGIKA PERHITUNGAN FIX (PPN 10% DARI TOTAL ASLI) ---
  const subtotalAsli = cart.reduce(
    (acc, curr) => acc + curr.harga * curr.qty,
    0,
  );

  // PPN 10% dari total belanja (selalu tetap mau DP/Lunas) + Pembulatan
  const ppnTetap = Math.round(subtotalAsli * 0.1);

  const totalKeseluruhan = subtotalAsli + ppnTetap;

  // Wajib Bayar Sekarang:
  // Kalau DP: (Setengah Subtotal) + PPN Full
  // Kalau Lunas: Subtotal + PPN Full
  const wajibBayarSekarang =
    paymentType === "dp"
      ? Math.round(subtotalAsli * 0.5) + ppnTetap
      : totalKeseluruhan;

  // Fungsi buat nambah qty
  const updateQty = (id, amount) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id_menu === id
          ? { ...item, qty: Math.max(1, item.qty + amount) }
          : item,
      ),
    );
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="border-l-4 border-[#cbc500] pl-4 mb-8">
        <h3 className="text-2xl font-bold text-[#382E2E]">
          Konfirmasi Pesanan
        </h3>
      </div>

      {/* List menu dan qty */}
      <div className="space-y-4 mb-10">
        {cart.map((item) => (
          <div
            key={item.id_menu}
            className="flex items-center gap-4 bg-white p-4 rounded-lg border border-gray-100 shadow-sm"
          >
            <img
              src={item.url_menu_image}
              className="w-16 h-16 object-cover rounded-xl bg-gray-50"
              alt=""
            />

            <div className="flex-1">
              <h4 className="font-semibold text-[#382E2E] text-md">
                {item.nama_menu}
              </h4>
              <p className="text-[#cbc500] font-bold text-sm">
                Rp {(item.harga * item.qty).toLocaleString("id-ID")}
              </p>
            </div>

            {/* Counter Mini */}
            <div className="flex items-center gap-3 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
              <button
                onClick={() => updateQty(item.id_menu, -1)}
                className="text-[#382E2E] font-black"
              >
                -
              </button>
              <span className="text-xs font-black w-4 text-center">
                {item.qty}
              </span>
              <button
                onClick={() => updateQty(item.id_menu, 1)}
                className="text-[#382E2E] font-black"
              >
                +
              </button>
            </div>

            <button
              onClick={() => removeItem(item.id_menu)}
              className="text-red-400 text-xs ml-2 font-bold"
            >
              Hapus
            </button>
          </div>
        ))}
      </div>

      {/* Opsi Pembayaran */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-8 space-y-4 shadow-sm text-sm">
        <div className="flex justify-center pl-4 mb-8">
          <h3 className="text-md font-bold text-[#382E2E]">
            Opsi Pembayaran
          </h3>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {/* Opsi DP */}
          <label
            onClick={() => setPaymentType("dp")}
            className={`flex items-center gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${
              paymentType === "dp"
                ? "border-[#cbc500] bg-white/10"
                : "border-white/10 opacity-50"
            }`}
          >
            <input
              type="radio"
              name="pay_type"
              checked={paymentType === "dp"}
              readOnly
              className="radio border-[#cbc500] checked:bg-[#cbc500]"
            />
            <div>
              <p className="font-bold text-md leading-none mb-1 ">
                DP 50%
              </p>
              <p className="text-sm text-gray-400">Bayar Setengah Dulu</p>
            </div>
          </label>

          {/* Opsi Lunas */}
          <label
            onClick={() => setPaymentType("lunas")}
            className={`flex items-center gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${
              paymentType === "lunas"
                ? "border-[#cbc500] bg-white/10"
                : "border-white/10 opacity-50"
            }`}
          >
            <input
              type="radio"
              name="pay_type"
              checked={paymentType === "lunas"}
              readOnly
              className="radio border-[#cbc500] checked:bg-[#cbc500]"
            />
            <div>
              <p className="font-bold text-md leading-none mb-1">
                Bayar Lunas (100%)
              </p>
              <p className="text-sm text-gray-400">Langsung Beres</p>
            </div>
          </label>
        </div>
      </div>

      {/* Total Pembayaran */}
      <div className="p-6 mb-8 space-y-2 text-sm">
        <h4 className="font-bold text-[#382E2E] text-sm mb-2">
          Rincian Invoice
        </h4>

        <div className="flex justify-between text-gray-500 font-medium">
          <span>Subtotal Pesanan</span>
          <span>Rp {subtotalAsli.toLocaleString("id-ID")}</span>
        </div>

        <div className="flex justify-between text-gray-500 font-medium">
          <span>PPN (10%)</span>
          <span>Rp {ppnTetap.toLocaleString("id-ID")}</span>
        </div>

        <div className="pt-4 border-t-2 border-dashed border-gray-100 mt-4">
          <div className="flex justify-between text-gray-400 font-medium text-xs uppercase mb-2">
            <span>Total Keseluruhan</span>
            <span>Rp {totalKeseluruhan.toLocaleString("id-ID")}</span>
          </div>

          <div className="flex justify-between font-black text-[#382E2E] text-xl pt-2">
            <span className="">Total Bayar</span>
            <span className="text-[#382E2E]">
              Rp {wajibBayarSekarang.toLocaleString("id-ID")}
            </span>
          </div>
        </div>

        {paymentType === "dp" && (
          <p className="text-xs text-red-500 font-bold text-center pt-2 bg-red-50 py-3 rounded-lg">
            *Sisa Rp {Math.round(subtotalAsli * 0.5).toLocaleString("id-ID")}{" "}
            bayar di Lyon's Sky
          </p>
        )}
      </div>

      {/* Navigasi */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="text-sm font-medium text-gray-400 tracking-widest hover:text-[#382E2E] transition-colors"
        >
          Kembali Menu
        </button>

        <button
        onClick={() => onNext({ type: paymentType, total: wajibBayarSekarang })}
        className="font-medium bg-[#382E2E] text-[#cbc500] px-8 py-2.5 rounded-full text-md shadow-md active:scale-95 transition-all tracking-tighter"
        >
        Buat Reservasi
        </button>
      </div>
    </div>
  );
}
