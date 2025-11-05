import React from 'react';
import Spline from '@splinetool/react-spline';

export default function HeroCover() {
  return (
    <section className="relative w-full h-[70vh] md:h-[78vh] overflow-hidden rounded-b-2xl">
      {/* 3D Spline scene as full-width cover */}
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/zhZFnwyOYLgqlLWk/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Soft gradient overlay to improve text contrast without blocking interaction */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/40 via-white/10 to-white/60" />

      {/* Content */}
      <div className="relative z-10 h-full max-w-6xl mx-auto px-6 flex items-center">
        <div className="backdrop-blur-[1px]">
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-neutral-900">
            Mini Games — Clean, Minimal, Delightful
          </h1>
          <p className="mt-3 md:mt-4 text-neutral-700 max-w-2xl">
            Simple micro-interactions you can play in seconds. Spin, roll, or randomize with a modern, minimal interface.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <a
              href="#games"
              className="inline-flex items-center gap-2 rounded-full bg-neutral-900 text-white px-5 py-2.5 text-sm md:text-base transition-colors hover:bg-neutral-800"
            >
              Start Playing
            </a>
            <span className="text-neutral-600 text-sm">No logins, just quick fun.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
