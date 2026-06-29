import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState, useCallback } from "react";
import { LogOut, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { BrandWordmark } from "@/components/ui/BrandWordmark";
import { CatalogUploadForm } from "@/components/admin/CatalogUploadForm";
import { CatalogManagerGrid } from "@/components/admin/CatalogManagerGrid";
import type { AdminCatalogArtwork } from "@/types/catalog";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Fortune — Painel do catálogo" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminCatalogPage,
});

function AdminCatalogPage() {
  const navigate = useNavigate();
  const { user } = Route.useRouteContext();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [artworks, setArtworks] = useState<AdminCatalogArtwork[]>([]);

  const loadArtworks = useCallback(async () => {
    const { data, error } = await supabase
      .from("catalog_items")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
    if (error) {
      toast.error(error.message);
      return;
    }
    setArtworks(data ?? []);
  }, []);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .maybeSingle();
      if (error) toast.error(error.message);
      setIsAdmin(!!data);
    })();
    loadArtworks();
  }, [user.id, loadArtworks]);

  async function handleSignOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  }

  if (isAdmin === false) {
    return <AccessDeniedScreen userId={user.id} onSignOut={handleSignOut} />;
  }

  return (
    <main className="min-h-screen bg-background text-text">
      <header className="border-b border-[color:var(--border)]">
        <div className="container-x flex items-center justify-between h-16">
          <Link
            to="/"
            className="flex items-center gap-3 text-text-muted hover:text-text transition-colors"
          >
            <ArrowLeft size={16} />
            <BrandWordmark className="text-xl" />
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/catalogo" className="text-eyebrow hover:text-primary">
              Ver catálogo
            </Link>
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
        <h1 className="text-display text-4xl md:text-6xl mt-3">
          Catálogo de artes
        </h1>

        <CatalogUploadForm
          userId={user.id}
          currentCount={artworks.length}
          onUploaded={loadArtworks}
        />

        <div className="mt-12">
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="text-display text-2xl">Suas artes</h2>
            <span className="text-eyebrow">
              {artworks.length}{" "}
              {artworks.length === 1 ? "peça" : "peças"}
            </span>
          </div>
          <CatalogManagerGrid
            artworks={artworks}
            onChanged={loadArtworks}
          />
        </div>
      </section>
    </main>
  );
}

function AccessDeniedScreen({
  userId,
  onSignOut,
}: {
  userId: string;
  onSignOut: () => void;
}) {
  return (
    <main className="min-h-screen bg-background text-text grid place-items-center px-5">
      <div className="max-w-md text-center border border-[color:var(--border)] bg-surface p-8">
        <span className="text-eyebrow">/ Acesso negado</span>
        <h1 className="text-display text-2xl mt-3">
          Você não é administrador
        </h1>
        <p className="text-text-muted text-sm mt-3">
          Peça para um administrador atribuir o papel{" "}
          <span className="text-primary">admin</span> à sua conta.
        </p>
        <p className="text-text-muted text-xs mt-4 break-all">
          Seu ID: {userId}
        </p>
        <button
          onClick={onSignOut}
          className="mt-6 inline-flex items-center gap-2 text-text-muted hover:text-primary text-sm"
        >
          <LogOut size={14} /> Sair
        </button>
      </div>
    </main>
  );
}
