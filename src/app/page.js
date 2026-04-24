import Image from "next/image";
import { createClient } from "@/utils/supabase/server";

export default async function Page() {
  const supabase = await createClient();
  const { data: menu, error } = await supabase.from("menu").select("*");
  if (error) {
    return <p>Gagal mengambil data menu: {error.message}</p>;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main style={{ padding: "2rem" }}>
        <h1>Menu Lyon's Sky</h1>
        <hr />

        {menu?.length === 0 ? (
          <p>Menu belum tersedia.</p>
        ) : (
          <div style={{ display: "grid", gap: "1rem", marginTop: "1rem" }}>
            {menu.map((item) => (
              <div
                key={item.id_menu}
                style={{
                  border: "1px solid #ccc",
                  padding: "1rem",
                  borderRadius: "8px",
                }}
              >
                <h3>{item.nama_menu}</h3>
                <p>Harga: Rp {item.harga.toLocaleString("id-ID")}</p>
                <small>Kategori: {item.kategori}</small>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
