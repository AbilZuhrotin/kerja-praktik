"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { LayoutDashboard, CheckCircle, Table, FileText, Users } from 'lucide-react';

export default function AdminLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Dummy Role, nanti ambil dari Supabase
  const role = "super_admin";

  const menus = [
    { name: "Dashboard", href: "/admin/dashboard", icon: <LayoutDashboard size={18} /> },
    { name: "Konfirmasi Bayar", href: "/admin/konfirmasi", icon: <CheckCircle size={18} /> },
    { name: "Status Meja", href: "/admin/meja", icon: <Table size={18} /> },
  ];

  const superAdminMenus = [
    { name: "Data Laporan", href: "/admin/data-laporan", icon: <FileText size={18} /> },
    { name: "Kelola Akun", href: "/admin/kelola-akun", icon: <Users size={18} /> },
  ];

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-900 text-[#382E2E] dark:text-zinc-100">
      {/* SIDEBAR MOBILE OVERLAY */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#382E2E] text-white p-6 transform transition-transform duration-300 md:relative md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="mb-10">
          <div className="flex justify-center">
            <Image
              className="dark:invert object-center"
              src="/foto/logo-nobg.png"
              alt="Next.js logo"
              width={100}
              height={20}
              priority
            />
          </div>
          <p className="text-lg font-semibold text-zinc-400 flex justify-center">
            Management Reservasi
          </p>
        </div>

        <nav className="space-y-2">
          {menus.map((menu) => (
            <Link
              key={menu.href}
              href={menu.href}
              className={`flex items-center gap-1 p-2 rounded-xl font-medium text-sm transition-all ${
                pathname === menu.href
                  ? "bg-[#cbc500] text-[#382E2E]"
                  : "hover:bg-white/5 text-zinc-400 hover:text-white"
              }`}
            >
              <span className="pr-1">{menu.icon}</span> {menu.name}
            </Link>
          ))}

          {role === "super_admin" && (
            <div className="pt-6 mt-6 border-t border-white/10">
              <p className="text-xs text-zinc-500 font-bold uppercase mb-4 ml-2">
                Super Admin
              </p>
              {superAdminMenus.map((menu) => (
                <Link
                  key={menu.href}
                  href={menu.href}
                  className={`flex items-center gap-1 p-2 rounded-xl font-medium text-sm transition-all ${pathname === menu.href ? "bg-[#cbc500] text-[#382E2E]" : "hover:bg-white/5 text-zinc-400"}`}
                >
                  <span>{menu.icon}</span> {menu.name}
                </Link>
              ))}
            </div>
          )}
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col">
        <header className="p-4 border-b border-gray-100 dark:border-zinc-800 flex justify-between items-center bg-white dark:bg-zinc-900 sticky top-0 z-30">
          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden p-2 text-2xl text-[#382E2E] dark:text-white"
          >
            ☰
          </button>
          <div className="ml-auto flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm">Admin</p>
              <p className="text-xs text-[#cbc500] font-semibold uppercase">
                {role.replace("_", " ")}
              </p>
            </div>
            <div className="w-8 h-8 rounded-full bg-zinc-200 border-2 border-[#cbc500]"></div>
          </div>
        </header>

        <main className="p-6 md:p-10">{children}</main>
      </div>
    </div>
  );
}
