import { Card } from "@/components/ui/card";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <p className="text-3xl font-semibold gradient-text">AVE</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Toute la vie étudiante d&apos;Aix-en-Provence, au même endroit.
        </p>
      </div>
      <Card>
        <LoginForm />
      </Card>
    </div>
  );
}
