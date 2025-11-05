import React from 'react';
import HeroCover from './components/HeroCover';
import SpinnerGame from './components/SpinnerGame';
import DiceGame from './components/DiceGame';
import RandomizerGame from './components/RandomizerGame';

export default function App() {
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {/* Hero section with interactive Spline cover */}
      <HeroCover />

      {/* Games Section */}
      <section id="games" className="max-w-6xl mx-auto px-6 py-10 md:py-16">
        <div className="mb-6 md:mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Play Mini Games</h2>
          <p className="mt-2 text-neutral-600">Clean, minimal widgets designed for quick bursts of fun.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <SpinnerGame />
          <DiceGame />
          <RandomizerGame />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200">
        <div className="max-w-6xl mx-auto px-6 py-8 text-sm text-neutral-600 flex items-center justify-between">
          <span>Minimal Mini Games</span>
          <span>Have fun ✨</span>
        </div>
      </footer>
    </div>
  );
}
