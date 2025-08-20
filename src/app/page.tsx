"use client";

import { useEffect, useMemo, useState } from "react";
import { loadChallenges, saveChallenges } from "@/lib/storage";
import type { Challenge } from "@/types.ts";
import { ChallengeForm } from "@/components/ChallengeForm.tsx";
import { ChallengeItem } from "@/components/ChallengeItem.tsx";
import { ConfirmModal } from "@/components/ConfirmModal.tsx";

export default function HomePage() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [showClearModal, setShowClearModal] = useState(false);

  // initial load from localStorage (client only)
  useEffect(() => {
    setChallenges(loadChallenges());
  }, []);

  // persist to localStorage on every change
  useEffect(() => {
    saveChallenges(challenges);
  }, [challenges]);

  function addChallenge(ch: Challenge) {
    setChallenges((prev) => [ch, ...prev]);
  }

  function removeChallenge(id: string) {
    setChallenges((prev) => prev.filter((c) => c.id !== id));
  }

  function increment(id: string) {
    setChallenges((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, count: Math.min(c.count + 1, c.amountDestination) }
          : c
      )
    );
  }

  function decrement(id: string) {
    setChallenges((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, count: Math.max(c.count - 1, 0) } : c
      )
    );
  }

  function clearAll() {
    setChallenges([]);
    setShowClearModal(false);
  }

  const total = useMemo(() => challenges.length, [challenges]);

  return (
    <div className="mx-auto max-w-3xl p-6 grid gap-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Challenges</h1>
        <button
          onClick={() => setShowClearModal(true)}
          className="px-3 py-2 rounded border text-sm"
          disabled={challenges.length === 0}
        >
          Clear all
        </button>
      </header>

      <ChallengeForm onAdd={addChallenge} />

      <section className="grid gap-3">
        <div className="text-sm opacity-70">
          {total} challenge{total === 1 ? "" : "s"}
        </div>

        {challenges.length === 0 ? (
          <div className="text-sm opacity-70 border rounded p-4">
            No challenges yet. Add your first one above.
          </div>
        ) : (
          <ul className="grid gap-3">
            {challenges.map((c) => (
              <li key={c.id}>
                <ChallengeItem
                  challenge={c}
                  onRemove={() => removeChallenge(c.id)}
                  onInc={() => increment(c.id)}
                  onDec={() => decrement(c.id)}
                />
              </li>
            ))}
          </ul>
        )}
      </section>

      <ConfirmModal
        open={showClearModal}
        title="Delete all challenges?"
        description="This will remove every challenge from your list. This action cannot be undone."
        confirmLabel="Delete all"
        cancelLabel="Cancel"
        onConfirm={clearAll}
        onCancel={() => setShowClearModal(false)}
      />
    </div>
  );
}
