"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export function HeaderBar({
  title,
  actions,
}: {
  title: string;
  actions?: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <div className="mb-4 flex items-center gap-3">
      <button
        type="button"
        aria-label="Retour"
        onClick={() => router.back()}
        className="flex size-10 shrink-0 items-center justify-center rounded-full glass"
      >
        <ChevronLeft className="size-5" />
      </button>
      <h1 className="flex-1 truncate text-lg font-semibold">{title}</h1>
      {actions}
    </div>
  );
}
