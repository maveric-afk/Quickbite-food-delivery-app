import React from "react"
import { motion } from "framer-motion"
import { Star } from "lucide-react"

export default function RestaurantCard({
  imageSrc,
  imageAlt = "",
  name,
  location,
  rating = 0,
  className = "",
}) {
  const safeRating = Math.max(0, Math.min(5, Math.floor(rating)))

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ scale: 1.03 }}
      className={`group max-w-sm md:max-w-md w-full overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950 text-neutral-100 shadow-sm hover:shadow-md transition-shadow ${className}`}
      role="article"
      aria-label={name}
    >
      {/* Image section (~60% height; uses fixed heights for consistency) */}
      <div className="relative h-48 md:h-56 overflow-hidden">
        <motion.img
          src={imageSrc}
          alt={imageAlt || name}
          className="h-full w-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-black/10"
          aria-hidden="true"
        />
      </div>

      {/* Info section */}
      <div className="flex flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-pretty text-lg font-semibold tracking-tight">{name}</h3>
        </div>

        {/* location */}
        {location ? <p className="text-sm text-neutral-400">{location}</p> : null}

        {/* Rating */}
        <div className="flex items-center gap-1" aria-label={`Rating: ${safeRating} out of 5`}>
          {Array.from({ length: 5 }).map((_, i) => {
            const filled = i < safeRating
            return (
              <Star
                key={i}
                className={`h-4 w-4 ${filled ? "text-orange-600" : "text-neutral-600"}`}
                {...(filled ? { fill: "currentColor", strokeWidth: 0 } : { fill: "none", strokeWidth: 2 })}
                aria-hidden="true"
              />
            )
          })}
          <span className="sr-only">{safeRating} out of 5 stars</span>
        </div>

        {/* CTA */}
        <div className="mt-1">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg bg-orange-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-600/50 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
            aria-label={`Visit ${name}`}
          >
            Visit
          </button>
        </div>
      </div>
    </motion.div>
  )
}
