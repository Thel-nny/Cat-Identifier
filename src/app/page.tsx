'use client'

import React, { useState } from 'react'
import Link from 'next/link'

const carouselSlides = [
  {
    text: "Knowing your cat's breed helps you anticipate their health needs. Certain breeds are predisposed to specific conditions — Maine Coons, for instance, are prone to hypertrophic cardiomyopathy. Early awareness means earlier prevention.",
  },
  {
    text: "Breed knowledge shapes how you interact with your cat. Bengals crave stimulation and active play, while Ragdolls are content to lounge by your side. Understanding this helps you create an environment where they truly thrive.",
  },
  {
    text: "Diet and weight management differ by breed. A Sphynx has a higher metabolism and needs more calories, while a British Shorthair can be prone to obesity. Knowing the breed means feeding them right.",
  },
  {
    text: "Some breeds communicate differently. Siamese cats are famously vocal, while Scottish Folds tend to be quiet and reserved. Recognising your cat's breed helps you understand what they're actually trying to tell you.",
  },
  {
    text: "If you have children or other pets, breed temperament matters. Some breeds are naturally sociable and gentle, others fiercely independent. Knowing the breed lets you set realistic expectations and build a harmonious home.",
  },
]

const topBreeds = [
  { rank: 1, name: 'Maine Coon',        color: '#E53E3E', ring: 'border-red-500',    img: '/maine coon.png',       offset: 'self-end mb-0'  },
  { rank: 2, name: 'Ragdoll',           color: '#D97706', ring: 'border-orange-400', img: '/ragdoll.png',           offset: 'self-end mb-20' },
  { rank: 3, name: 'British Shorthair', color: '#CA8A04', ring: 'border-yellow-500', img: '/british shorthair.png', offset: 'self-end mb-10' },
  { rank: 4, name: 'Bengal',            color: '#38A169', ring: 'border-green-500',  img: '/bengal.png',            offset: 'self-end mb-24' },
  { rank: 5, name: 'Sphynx',            color: '#3B82F6', ring: 'border-blue-400',   img: '/sphynx.png',            offset: 'self-end mb-2'  },
]

export default function LandingPage() {
  const [slide, setSlide] = useState(0)
  const prev = () => setSlide((s) => (s - 1 + carouselSlides.length) % carouselSlides.length)
  const next = () => setSlide((s) => (s + 1) % carouselSlides.length)

  return (
    <>
      <style>{`
        html, body { margin: 0; padding: 0; background: #fff; }

        .snap-wrap {
          height: 100vh;
          overflow-y: scroll;
          scroll-snap-type: y mandatory;
          scroll-behavior: smooth;
        }
        .snap-section {
          scroll-snap-align: start;
          height: 100vh;
        }

        /* Breed circle hover — springy scale */
        .breed-circle {
          transition: transform 0.32s cubic-bezier(0.34, 1.56, 0.64, 1),
                      box-shadow 0.25s ease;
        }
        .breed-circle:hover {
          transform: scale(1.13) translateY(-8px);
          box-shadow: 0 18px 36px rgba(0, 0, 0, 0.18);
        }

        /* Hero entrance animations */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .anim-1 { animation: fadeUp 0.75s 0.05s ease both; }
        .anim-2 { animation: fadeUp 0.75s 0.18s ease both; }
        .anim-3 { animation: fadeUp 0.75s 0.30s ease both; }
        .anim-4 { animation: fadeUp 0.75s 0.44s ease both; }

        /* Carousel text crossfade */
        .carousel-body { transition: opacity 0.25s ease; }
      `}</style>

      <div className="snap-wrap">

        {/* ══════════════════════════════════
            PAGE 1 — HERO
        ══════════════════════════════════ */}
        <section className="snap-section relative overflow-hidden bg-white flex flex-col justify-center">

          {/* Letterboxed image container — doesn't stretch full height */}
          <div className="relative w-full mx-auto" style={{ maxHeight: '72vh' }}>
            <img
              src="/landing-page.jpeg"
              alt="Cat background"
              className="w-full object-cover"
              style={{ maxHeight: '72vh', display: 'block' }}
            />


            {/* Hero copy — positioned over the image */}
            <div className="absolute inset-y-8 left-0 flex flex-col justify-center px-10 sm:px-20 max-w-2xl">
              <h1
                className="anim-1 text-4xl sm:text-5xl lg:text-6xl leading-tight mb-5"
                style={{
                  fontFamily: 'Georgia, "Times New Roman", serif',
                  letterSpacing: '-0.5px',
                  color: '#1C304D',
                }}
              >
                Do you know your <br />
                <span className="italic">cat&apos;s breed?</span>
              </h1>

              <p className="anim-2 text-base sm:text-lg max-w-sm mb-8 leading-relaxed" style={{ color: '#1C304D' }}>
                Every cat has a story written in their fur, eyes, and temperament.
                Upload a photo and we&apos;ll reveal the breed — along with care tips,
                health facts, and the personality traits that make them uniquely theirs.
              </p>

              <div className="anim-3">
                <Link
                  href="/identifier"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#1a2b3b] hover:bg-[#0f1c28] text-white font-semibold rounded-md transition-colors duration-200 text-base"
                >
                  Identify Now →
                </Link>
              </div>
            </div>
          </div>

        </section>

        {/* ══════════════════════════════════
            PAGE 2 — BREEDS + WHY
        ══════════════════════════════════ */}
        <section className="snap-section flex flex-col bg-white overflow-hidden">

          {/* ── Top half: breed circles ── */}
          <div className="flex-1 flex flex-col items-center justify-center px-6 pt-10 pb-2 min-h-0">
            <h2
              className="text-4xl sm:text-5xl font-serif text-[#1a2b3b] mb-10 text-center"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
            >
              Top Cat Breeds 2025
            </h2>

            {/* Staggered breed row */}
            <div className="flex items-end justify-center gap-6 sm:gap-10 w-full max-w-4xl pb-2">
              {topBreeds.map((breed) => (
                <div
                  key={breed.rank}
                  className={`flex flex-col items-center gap-3 ${breed.offset}`}
                >
                  {/* Circle — no badge */}
                  <div
                    className={`breed-circle relative w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 ${breed.ring} overflow-hidden bg-white cursor-pointer`}
                  >
                    <img
                      src={breed.img}
                      alt={breed.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Breed name */}
                  <span
                    className="font-bold text-center text-xs sm:text-sm leading-tight"
                    style={{ color: breed.color, maxWidth: '90px' }}
                  >
                    {breed.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Bottom half: why section ── */}
          <div
            className="relative flex items-center justify-center overflow-hidden"
            style={{ height: '44%', backgroundColor: '#a5c5d9' }}
          >
            {/* Peeking cat — bottom-right corner */}
            <img
              src="/corner-cat.png"
              alt="Peeking cat"
              className="absolute bottom-0 right-0 h-full object-contain object-bottom pointer-events-none select-none"
              style={{ maxWidth: '34%' }}
            />

            {/* Glass card */}
            <div
              className="relative z-10 w-full max-w-lg mx-auto px-8 py-7 rounded-2xl"
              style={{
                background: 'rgba(255,255,255,0.22)',
                backdropFilter: 'blur(8px)',
                boxShadow: '0 4px 32px rgba(26,43,59,0.12)',
              }}
            >
              <h3
                className="text-xl sm:text-2xl font-bold text-[#1a2b3b] mb-3 leading-snug"
                style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
              >
                Why is it important to<br />know their breeds?
              </h3>

              <p className="carousel-body text-sm sm:text-[15px] text-[#1a2b3b]/85 leading-relaxed min-h-[80px]">
                {carouselSlides[slide].text}
              </p>

              {/* Carousel controls */}
              <div className="flex items-center gap-4 mt-5">
                <button
                  onClick={prev}
                  className="text-[#1a2b3b] font-bold text-sm hover:opacity-50 transition-opacity"
                  aria-label="Previous slide"
                >
                  &lt;
                </button>

                <div className="flex gap-2">
                  {carouselSlides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setSlide(i)}
                      className="w-1.5 h-1.5 rounded-full transition-colors duration-200"
                      style={{
                        backgroundColor: i === slide ? '#1a2b3b' : 'rgba(26,43,59,0.3)',
                      }}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={next}
                  className="text-[#1a2b3b] font-bold text-sm hover:opacity-50 transition-opacity"
                  aria-label="Next slide"
                >
                  &gt;
                </button>
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  )
}