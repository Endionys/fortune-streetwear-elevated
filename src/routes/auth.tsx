import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { BrandWordmark } from "@/components/ui/BrandWordmark";

type AuthMode = "signin" | "signup";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Fortune — Acesso administrativo" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<AuthMode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) navigate({ to: "/admin" });
    });
  }, [navigate]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        toast.success(
          "Conta criada. Verifique seu email se a confirmação estiver ativa.",
        );
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        navigate({ to: "/admin" });
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Erro ao autenticar",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-background text-text grid place-items-center px-5">
      <div className="w-full max-w-md">
        <Link to="/" className="block text-center mb-10">
          <BrandWordmark className="text-3xl tracking-[0.05em]" />
        </Link>

        <div className="border border-[color:var(--border)] bg-surface p-8">
          <span className="text-eyebrow">/ Área restrita</span>
          <h1 className="text-display text-3xl mt-3 mb-6">
            {mode === "signin" ? "Entrar" : "Criar conta"}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-eyebrow block mb-2">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full bg-background border border-[color:var(--border)] px-4 py-3 text-text focus:border-primary outline-none transition-colors"
              />
            </div>
            <div>
              <label className="text-eyebrow block mb-2">Senha</label>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full bg-background border border-[color:var(--border)] px-4 py-3 text-text focus:border-primary outline-none transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-background font-bold uppercase tracking-[0.18em] text-xs py-4 hover:bg-primary/90 transition disabled:opacity-50"
            >
              {isSubmitting
                ? "..."
                : mode === "signin"
                  ? "Entrar"
                  : "Criar conta"}
            </button>
          </form>

          <button
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="mt-6 text-text-muted hover:text-primary text-sm w-full text-center transition-colors"
          >
            {mode === "signin"
              ? "Ainda não tem conta? Criar conta"
              : "Já tem conta? Entrar"}
          </button>
        </div>

        <p className="text-text-muted text-xs text-center mt-6 leading-relaxed">
          Após criar a primeira conta, atribua o papel{" "}
          <span className="text-primary">admin</span> a ela no banco para
          liberar o painel.
        </p>
      </div>
    </main>
  );
}
