import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import FoodCaraousel from '../Food Carousel.json'
import Lottie from 'lottie-react'

export default function LoadingScreen() {
  const [show, setShow] = React.useState(true);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="quickbite-splash"
          aria-label="Loading QuickBite"
          className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-[#0a0a0a] overflow-hidden"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* subtle orange glow backdrop */}
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,123,0,0.14)_0%,_rgba(10,10,10,0)_60%)]" />
          </div>

          <div className="relative flex flex-col items-center justify-center text-center">
            {/* Logo / Image with soft float and glow */}
            
            <div className="lg:w-[140px] lg:h-[140px]">
                <Lottie loop={true} animationData={FoodCaraousel}/>
            </div>

            {/* Brand text with gradient + letter-spacing + fade-in */}
            <motion.h1
              className="text-pretty bg-gradient-to-r from-[#ff7b00] to-[#ff4500] bg-clip-text text-transparent font-bold tracking-tight leading-tight
                         text-4xl md:text-5xl lg:text-6xl"
              initial={{ opacity: 0, letterSpacing: "-0.08em" }}
              animate={{ opacity: 1, letterSpacing: "0em" }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            >
              QuickBite
            </motion.h1>

            {/* Bouncing dots loader */}
            <div className="mt-4 flex items-center justify-center gap-2" aria-hidden="true">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className={`block h-2.5 w-2.5 rounded-full ${i === 2 ? "bg-[#ff4500]" : "bg-[#ff7b00]"}`}
                  animate={{ y: [0, -8, 0], opacity: [0.6, 1, 0.6] }}
                  transition={{
                    duration: 0.6,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: i * 0.12,
                  }}
                />
              ))}
            </div>
            <span className="sr-only">Loading...</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
