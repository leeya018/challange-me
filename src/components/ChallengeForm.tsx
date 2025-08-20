"use client";

import { useState } from "react";
import type { Challenge } from "@/types.ts";

type Props = { onAdd: (c: Challenge) => void };

export function ChallengeForm({ onAdd }: Props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [amountDestination, setAmountDestination] = useState<number>(1);
  const [deadline, setDeadline] = useState<string>("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !deadline) return;

    const newChallenge: Challenge = {
      id: crypto.randomUUID(),
      name: name.trim(),
      description: description.trim(),
      amountDestination: Math.max(1, Number(amountDestination) || 1),
      deadline, // ISO string from input type=datetime-local
      count: 0,
      createdAt: new Date().toISOString(),
    };
    onAdd(newChallenge);
    setName("");
    setDescription("");
    setAmountDestination(1);
    setDeadline("");
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-3 border rounded p-4">
      <div className="grid gap-1">
        <label className="text-sm">Name *</label>
        <input
          className="border rounded px-3 py-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., 50 push-ups"
          required
        />
      </div>

      <div className="grid gap-1">
        <label className="text-sm">Description</label>
        <textarea
          className="border rounded px-3 py-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Short details about the challenge"
          rows={3}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        <div className="grid gap-1">
          <label className="text-sm">Amount destination *</label>
          <input
            type="number"
            min={1}
            className="border rounded px-3 py-2"
            value={amountDestination}
            onChange={(e) => setAmountDestination(Number(e.target.value))}
            required
          />
        </div>

        <div className="grid gap-1">
          <label className="text-sm">Finish date & time *</label>
          <input
            type="datetime-local"
            className="border rounded px-3 py-2"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
          />
        </div>
      </div>

      <div>
        <button className="px-4 py-2 rounded bg-black text-white text-sm">
          Add challenge
        </button>
      </div>
    </form>
  );
}
