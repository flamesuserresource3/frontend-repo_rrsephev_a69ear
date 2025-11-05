import React, { useMemo, useState } from 'react';

export default function RandomizerGame() {
  const [input, setInput] = useState("Heads\nTails");
  const [choice, setChoice] = useState(null);
  const [busy, setBusy] = useState(false);

  const options = useMemo(() => {
    return input
      .split(/\n|,/) // support newline or comma
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
  }, [input]);

  function pick() {
    if (options.length === 0 || busy) return;
    setBusy(true);
    setChoice(null);
    const t = setTimeout(() => {
      const idx = Math.floor(Math.random() * options.length);
      setChoice(options[idx]);
      setBusy(false);
    }, 500);
    return () => clearTimeout(t);
  }

  function clearAll() {
    setInput("");
    setChoice(null);
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-neutral-900">Randomizer</h3>
        <div className="flex gap-2">
          <button
            onClick={clearAll}
            className="rounded-full border border-neutral-300 px-4 py-1.5 text-sm text-neutral-700 hover:bg-neutral-50"
          >
            Clear
          </button>
          <button
            onClick={pick}
            className="rounded-full bg-neutral-900 px-4 py-1.5 text-white text-sm disabled:opacity-50"
            disabled={busy || options.length === 0}
          >
            {busy ? 'Picking…' : 'Pick One'}
          </button>
        </div>
      </div>

      <label className="mt-4 block text-sm text-neutral-600">Enter options (comma or new line)</label>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={4}
        className="mt-2 w-full resize-none rounded-xl border border-neutral-300 bg-white p-3 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-800/10"
        placeholder={"Apple\nBanana\nCherry"}
      />

      <div className="mt-4 min-h-[32px] text-center text-sm text-neutral-700">
        {choice ? (
          <span>
            Result: <span className="font-semibold text-neutral-900">{choice}</span>
          </span>
        ) : (
          <span className="text-neutral-500">Add a few options, then pick one</span>
        )}
      </div>

      {options.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {options.map((opt, i) => (
            <span key={i} className="rounded-full border border-neutral-300 px-3 py-1 text-xs text-neutral-700">
              {opt}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
