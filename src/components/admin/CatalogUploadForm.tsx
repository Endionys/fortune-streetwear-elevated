import { useState } from "react";
import { Upload } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { SIGNED_URL_TTL_SECONDS } from "@/services/catalog";

type CatalogUploadFormProps = {
  userId: string;
  currentCount: number;
  onUploaded: () => void;
};

export function CatalogUploadForm({
  userId,
  currentCount,
  onUploaded,
}: CatalogUploadFormProps) {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!file || !title.trim()) {
      toast.error("Adicione título e imagem.");
      return;
    }

    setIsUploading(true);
    try {
      const extension = file.name.split(".").pop() ?? "jpg";
      const storagePath = `${userId}/${crypto.randomUUID()}.${extension}`;

      const { error: uploadError } = await supabase.storage
        .from("catalog")
        .upload(storagePath, file, {
          cacheControl: "31536000",
          upsert: false,
        });
      if (uploadError) throw uploadError;

      const { data: signedUrl, error: signError } = await supabase.storage
        .from("catalog")
        .createSignedUrl(storagePath, SIGNED_URL_TTL_SECONDS);
      if (signError || !signedUrl) {
        throw signError ?? new Error("Falha ao gerar URL");
      }

      const { error: insertError } = await supabase
        .from("catalog_items")
        .insert({
          title: title.trim(),
          image_url: signedUrl.signedUrl,
          sort_order: currentCount,
        });
      if (insertError) throw insertError;

      toast.success("Arte adicionada.");
      setTitle("");
      setFile(null);
      const fileInput = document.getElementById(
        "catalog-file-input",
      ) as HTMLInputElement | null;
      if (fileInput) fileInput.value = "";
      onUploaded();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Erro ao enviar",
      );
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 border border-[color:var(--border)] bg-surface p-6 grid gap-4 md:grid-cols-[1fr_1fr_auto] md:items-end"
    >
      <div>
        <label className="text-eyebrow block mb-2">Título</label>
        <input
          required
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Ex.: Drop 01 — Shadow"
          className="w-full bg-background border border-[color:var(--border)] px-4 py-3 text-text focus:border-primary outline-none"
        />
      </div>
      <div>
        <label className="text-eyebrow block mb-2">Imagem</label>
        <input
          id="catalog-file-input"
          type="file"
          accept="image/*"
          required
          onChange={(event) => setFile(event.target.files?.[0] ?? null)}
          className="w-full text-sm text-text-muted file:mr-4 file:py-3 file:px-4 file:border-0 file:bg-primary file:text-background file:font-bold file:uppercase file:text-xs file:tracking-[0.18em] file:cursor-pointer"
        />
      </div>
      <button
        type="submit"
        disabled={isUploading}
        className="inline-flex items-center justify-center gap-2 bg-primary text-background font-bold uppercase tracking-[0.18em] text-xs py-4 px-6 hover:bg-primary/90 transition disabled:opacity-50"
      >
        <Upload size={14} /> {isUploading ? "Enviando..." : "Adicionar"}
      </button>
    </form>
  );
}
