import React, { useMemo, useState } from 'react';

const SEGMENTS = ["1", "2", "3", "4", "5", "6", "7", "8"];

export default function SpinnerGame() {
  const [angle, setAngle] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);

  const gradient = useMemo(() => {
    const colors = ["#111827", "#e5e7eb"]; // neutral-900 and gray-200 alternating
    const step = 360 / SEGMENTS.length;
    let str = "conic-gradient(";
    for (let i = 0; i < SEGMENTS.length; i++) {
      const start = i * step;
      const end = start + step;
      str += `${colors[i % 2]} ${start}deg ${end}deg` + (i === SEGMENTS.length - 1 ? ")" : ", ");
    }
    return str;
  }, []);

  function spin() {
    if (spinning) return;
    setSpinning(true);
    setResult(null);
    const extraTurns = 6 + Math.floor(Math.random() * 6); // 6-11 full turns
    const final = angle + extraTurns * 360 + Math.floor(Math.random() * 360);
    setAngle(final);

    // compute result after animation ~2s
    setTimeout(() => {
      const normalized = ((final % 360) + 360) % 360;
      const segmentAngle = 360 / SEGMENTS.length;
      const index = Math.floor(((360 - normalized) % 360) / segmentAngle);
      setResult(SEGMENTS[index]);
      setSpinning(false);
    }, 2100);
  }

  return (
    <div className="w-full max-w-sm rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-neutral-900">Spinner</h3>
        <button
          onClick={spin}
          className="rounded-full bg-neutral-900 px-4 py-1.5 text-white text-sm disabled:opacity-50"
          disabled={spinning}
        >
          {spinning ? 'Spinning…' : 'Spin'}
        </button>
      </div>

      <div className="mt-4 relative mx-auto h-56 w-56">
        <div
          className="absolute inset-0 rounded-full border border-neutral-300"
          style={{ background: gradient, transform: `rotate(${angle}deg)`, transition: 'transform 2s cubic-bezier(0.22, 1, 0.36, 1)' }}
        />
        {/* Labels */}
        <div className="absolute inset-0">
          {SEGMENTS.map((s, i) => {
            const segmentAngle = (360 / SEGMENTS.length) * i + (360 / SEGMENTS.length) / 2;
            const rad = (segmentAngle * Math.PI) / 180;
            const r = 80; // radius for label placement
            const x = 112 + r * Math.cos(rad); // center is 112 (h-56 => 224/2)
            const y = 112 + r * Math.sin(rad);
            return (
              <div
                key={s}
                className="absolute text-xs font-medium text-neutral-800"
                style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}
              >
                {s}
              </div>
            );
          })}
        </div>
        {/* Pointer */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1">
          <div className="h-6 w-2 rounded-b bg-red-500" />
        </div>
      </div>

      <div className="mt-4 text-center text-sm text-neutral-700 min-h-[24px]">
        {result ? (
          <span>Result: <span className="font-semibold text-neutral-900">{result}</span></span>
        ) : (
          <span className="text-neutral-500">Press Spin to get a number</span>
        )}
      </div>
    </div>
  );
}
