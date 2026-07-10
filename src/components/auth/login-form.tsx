"use client";

import { useActionState, useState } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  signInWithPassword,
  signUpWithPassword,
  signInWithMagicLink,
} from "@/lib/actions/auth";

type Mode = "signin" | "signup" | "magic-link";

const initialState = { error: null as string | null };
const initialMagicState = { error: null as string | null, sent: false };

export function LoginForm() {
  const [mode, setMode] = useState<Mode>("signin");
  const [signInState, signInAction, signInPending] = useActionState(
    signInWithPassword,
    initialState,
  );
  const [signUpState, signUpAction, signUpPending] = useActionState(
    signUpWithPassword,
    initialState,
  );
  const [magicState, magicAction, magicPending] = useActionState(
    signInWithMagicLink,
    initialMagicState,
  );

  if (mode === "magic-link") {
    return (
      <form action={magicAction} className="flex flex-col gap-3">
        <Input name="email" type="email" placeholder="Email étudiant" required />
        {magicState.error && (
          <p className="text-sm text-destructive">{magicState.error}</p>
        )}
        {!magicState.error && magicState.sent && (
          <p className="text-sm text-primary">
            Lien envoyé — vérifiez votre boîte mail.
          </p>
        )}
        {!magicState.error && !magicState.sent && (
          <p className="text-sm text-muted-foreground">
            Recevez un lien de connexion par email, sans mot de passe.
          </p>
        )}
        <Button type="submit" disabled={magicPending} className="gap-2">
          <Mail className="size-4" /> Envoyer le lien magique
        </Button>
        <button
          type="button"
          onClick={() => setMode("signin")}
          className="text-sm text-muted-foreground underline-offset-4 hover:underline"
        >
          Retour à la connexion par mot de passe
        </button>
      </form>
    );
  }

  const isSignup = mode === "signup";
  const action = isSignup ? signUpAction : signInAction;
  const state = isSignup ? signUpState : signInState;
  const pending = isSignup ? signUpPending : signInPending;

  return (
    <div className="flex flex-col gap-4">
      <form action={action} className="flex flex-col gap-3">
        {isSignup && (
          <Input name="full_name" placeholder="Nom complet" required />
        )}
        <Input name="email" type="email" placeholder="Email étudiant" required />
        <Input
          name="password"
          type="password"
          placeholder="Mot de passe"
          minLength={8}
          required
        />
        {state.error && <p className="text-sm text-destructive">{state.error}</p>}
        <Button type="submit" disabled={pending}>
          {isSignup ? "Créer mon compte" : "Se connecter"}
        </Button>
      </form>

      <button
        type="button"
        onClick={() => setMode("magic-link")}
        className="text-sm text-muted-foreground underline-offset-4 hover:underline"
      >
        Se connecter sans mot de passe
      </button>

      <button
        type="button"
        onClick={() => setMode(isSignup ? "signin" : "signup")}
        className="text-sm text-primary underline-offset-4 hover:underline"
      >
        {isSignup ? "J'ai déjà un compte" : "Créer un compte étudiant"}
      </button>
    </div>
  );
}
