import { BottomNav } from "@/components/navigation/bottom-nav";
import { PageTransition } from "@/components/navigation/page-transition";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex min-h-full w-full max-w-md flex-col">
      <main className="flex-1 px-4 pb-28 pt-6">
        <PageTransition>{children}</PageTransition>
      </main>
      <BottomNav />
    </div>
  );
}
