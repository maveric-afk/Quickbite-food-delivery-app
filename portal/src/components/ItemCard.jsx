import React from "react"
import { motion } from "framer-motion"

export default function ItemCard({
  imageSrc,
  imageAlt = "",
  name,
  type,
  category,
  className = "",
}) {

  const isVeg = type?.toLowerCase() === "veg"

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
          className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent to-black/10"
          aria-hidden="true"
        />
      </div>

      {/* Info section */}
      <div className="flex flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-pretty text-lg font-semibold tracking-tight">{name}</h3>

          {/* Veg / Non-Veg badge */}
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs ${
              isVeg ? "bg-neutral-800 text-neutral-200" : "bg-neutral-800 text-neutral-200"
            }`}
            aria-label={isVeg ? "Vegetarian" : "Non-Vegetarian"}
          >
            <span
              className={`inline-block h-2 w-2 rounded-full ${isVeg ? "bg-green-500" : "bg-red-500"}`}
              aria-hidden="true"
            />
            {isVeg ? "Veg" : "Non-Veg"}
          </span>
        </div>

        {/* Category */}
        {category ? <p className="text-sm text-neutral-400">{category}</p> : null}

      </div>
    </motion.div>
  )
}
