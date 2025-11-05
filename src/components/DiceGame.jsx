import React, { useState } from 'react';

function Dot() {
  return <span className="h-2.5 w-2.5 rounded-full bg-neutral-900" />;
}

function Face({ value }) {
  const patterns = {
    1: [5],
    2: [1, 9],
    3: [1, 5, 9],
    4: [1, 3, 7, 9],
    5: [1, 3, 5, 7, 9],
    6: [1, 3, 4, 6, 7, 9],
  };
  const cells = Array.from({ length: 9 });
  return (
    <div className="grid grid-cols-3 grid-rows-3 gap-4 p-6">
      {cells.map((_, i) => (
        <div key={i} className="flex items-center justify-center">
          {patterns[value].includes(i + 1) ? <Dot /> : null}
        </div>
      ))}
    </div>
  );
}

export default function DiceGame() {
  const [value, setValue] = useState(1);
  const [rolling, setRolling] = useState(false);

  function roll() {
    if (rolling) return;
    setRolling(true);
    const interval = setInterval(() => {
      setValue(Math.floor(Math.random() * 6) + 1);
    }, 80);
    setTimeout(() => {
      clearInterval(interval);
      setValue(Math.floor(Math.random() * 6) + 1);
      setRolling(false);
    }, 800);
  }

  return (
    <div className="w-full max-w-sm rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-neutral-900">Dice</h3>
        <button
          onClick={roll}
          className="rounded-full bg-neutral-900 px-4 py-1.5 text-white text-sm disabled:opacity-50"
          disabled={rolling}
        >
          {rolling ? 'Rolling…' : 'Roll'}
        </button>
      </div>

      <div className="mt-4 mx-auto h-40 w-40 rounded-2xl border border-neutral-300 bg-white shadow-inner">
        <Face value={value} />
      </div>

      <div className="mt-4 text-center text-sm text-neutral-700">You rolled a <span className="font-semibold text-neutral-900">{value}</span></div>
    </div>
  );
}
