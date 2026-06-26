import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Trash2, Upload, LogOut, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Fortune — Painel do catálogo" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

type Item = {
  id: string;
  title: string;
  image_url: string;
  sort_order: number;
  created_at: string;
};

const SIGNED_URL_TTL = 60 * 60 * 24 * 365; // 1 year

function AdminPage() {
  const navigate = useNavigate();
  const { user } = Route.useRouteContext();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    const { data, error } = await supabase
      .from("catalog_items")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
    if (error) {
      toast.error(error.message);
      return;
    }
    setItems(data ?? []);
  }, []);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .maybeSingle();
      if (error) {
        toast.error(error.message);
      }
      setIsAdmin(!!data);
    })();
    load();
  }, [user.id, load]);

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!file || !title.trim()) {
      toast.error("Adicione título e imagem.");
      return;
    }
    setBusy(true);
    try {
      const ext = file.name.split(".").pop() ?? "jpg";
      const path = `${user.id}/${crypto.randomUUID()}.${ext}`;

      const { error: upErr } = await supabase.storage
        .from("catalog")
        .upload(path, file, { cacheControl: "31536000", upsert: false });
      if (upErr) throw upErr;

      const { data: signed, error: signErr } = await supabase.storage
        .from("catalog")
        .createSignedUrl(path, SIGNED_URL_TTL);
      if (signErr || !signed) throw signErr ?? new Error("Falha ao gerar URL");

      const { error: insErr } = await supabase
        .from("catalog_items")
        .insert({ title: title.trim(), image_url: signed.signedUrl, sort_order: items.length });
      if (insErr) throw insErr;

      toast.success("Arte adicionada.");
      setTitle("");
      setFile(null);
      (document.getElementById("file-input") as HTMLInputElement | null)?.value &&
        ((document.getElementById("file-input") as HTMLInputElement).value = "");
      load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao enviar");
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete(item: Item) {
    if (!confirm(`Remover "${item.title}"?`)) return;
    const { error } = await supabase.from("catalog_items").delete().eq("id", item.id);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Removido.");
    load();
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  }

  if (isAdmin === false) {
    return (
      <main className="min-h-screen bg-background text-text grid place-items-center px-5">
        <div className="max-w-md text-center border border-[color:var(--border)] bg-surface p-8">
          <span className="text-eyebrow">/ Acesso negado</span>
          <h1 className="text-display text-2xl mt-3">Você não é administrador</h1>
          <p className="text-text-muted text-sm mt-3">
            Peça para um administrador atribuir o papel <span className="text-primary">admin</span> à sua conta.
          </p>
          <p className="text-text-muted text-xs mt-4 break-all">Seu ID: {user.id}</p>
          <button
            onClick={handleSignOut}
            className="mt-6 inline-flex items-center gap-2 text-text-muted hover:text-primary text-sm"
          >
            <LogOut size={14} /> Sair
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-text">
      <header className="border-b border-[color:var(--border)]">
        <div className="container-x flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3 text-text-muted hover:text-text transition-colors">
            <ArrowLeft size={16} />
            <span className="text-display text-xl">
              FORT<span className="text-primary">U</span>NE
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/catalogo" className="text-eyebrow hover:text-primary">Ver catálogo</Link>
            <button
              onClick={handleSignOut}
              className="inline-flex items-center gap-2 text-text-muted hover:text-primary text-sm"
            >
              <LogOut size={14} /> Sair
            </button>
          </div>
        </div>
      </header>

      <section className="container-x py-12">
        <span className="text-eyebrow">/ Painel</span>
        <h1 className="text-display text-4xl md:text-6xl mt-3">Catálogo de artes</h1>

        <form onSubmit={handleUpload} className="mt-10 border border-[color:var(--border)] bg-surface p-6 grid gap-4 md:grid-cols-[1fr_1fr_auto] md:items-end">
          <div>
            <label className="text-eyebrow block mb-2">Título</label>
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex.: Drop 01 — Shadow"
              className="w-full bg-background border border-[color:var(--border)] px-4 py-3 text-text focus:border-primary outline-none"
            />
          </div>
          <div>
            <label className="text-eyebrow block mb-2">Imagem</label>
            <input
              id="file-input"
              type="file"
              accept="image/*"
              required
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              className="w-full text-sm text-text-muted file:mr-4 file:py-3 file:px-4 file:border-0 file:bg-primary file:text-background file:font-bold file:uppercase file:text-xs file:tracking-[0.18em] file:cursor-pointer"
            />
          </div>
          <button
            type="submit"
            disabled={busy}
            className="inline-flex items-center justify-center gap-2 bg-primary text-background font-bold uppercase tracking-[0.18em] text-xs py-4 px-6 hover:bg-primary/90 transition disabled:opacity-50"
          >
            <Upload size={14} /> {busy ? "Enviando..." : "Adicionar"}
          </button>
        </form>

        <div className="mt-12">
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="text-display text-2xl">Suas artes</h2>
            <span className="text-eyebrow">{items.length} {items.length === 1 ? "peça" : "peças"}</span>
          </div>

          {items.length === 0 ? (
            <div className="border border-dashed border-[color:var(--border)] p-12 text-center text-text-muted">
              Nenhuma arte ainda. Adicione a primeira acima.
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {items.map((item) => (
                <article key={item.id} className="group relative border border-[color:var(--border)] bg-surface overflow-hidden">
                  <div className="aspect-[4/5] overflow-hidden bg-background">
                    <img src={item.image_url} alt={item.title} loading="lazy" className="h-full w-full object-cover" />
                  </div>
                  <div className="p-4 flex items-start justify-between gap-2">
                    <h3 className="text-sm font-medium truncate">{item.title}</h3>
                    <button
                      onClick={() => handleDelete(item)}
                      aria-label="Remover"
                      className="shrink-0 text-text-muted hover:text-primary transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
