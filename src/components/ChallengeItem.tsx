"use client";

import type { Challenge } from "@/types.ts";

type Props = {
  challenge: Challenge;
  onInc: () => void;
  onDec: () => void;
  onRemove: () => void;
};

export function ChallengeItem({ challenge, onInc, onDec, onRemove }: Props) {
  const remaining = Math.max(0, challenge.amountDestination - challenge.count);
  const deadlineLabel = challenge.deadline
    ? new Date(challenge.deadline).toLocaleString()
    : "—";

  return (
    <div className="border rounded p-4 grid gap-2">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold">{challenge.name}</h3>
          {challenge.description && (
            <p className="text-sm opacity-80">{challenge.description}</p>
          )}
        </div>
        <button onClick={onRemove} className="text-sm px-2 py-1 rounded border">
          Remove
        </button>
      </div>

      <div className="flex items-center gap-3">
        <button onClick={onDec} className="px-3 py-1 rounded border text-sm">
          –
        </button>
        <div className="text-sm font-mono">
          {challenge.count} / {challenge.amountDestination}
        </div>
        <button onClick={onInc} className="px-3 py-1 rounded border text-sm">
          +
        </button>
        <div className="text-xs opacity-70 ml-auto">
          Finish by: <span className="font-mono">{deadlineLabel}</span>
        </div>
      </div>

      {remaining === 0 ? (
        <div className="text-xs px-2 py-1 rounded bg-green-50 border border-green-200 text-green-700">
          Goal reached 🎉
        </div>
      ) : (
        <div className="text-xs opacity-80">Remaining: {remaining}</div>
      )}
    </div>
  );
}
