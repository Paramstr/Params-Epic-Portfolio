"use client"

import { useState, useEffect, useCallback, useMemo } from "react"

const DEFAULT_BASE_IMAGE = "/param-mj/param-mj-1.png"

const GLITCH_IMAGES = [
  "/param-mj/2.png",
  "/param-mj/3.png",
  "/param-mj/4.png",
  "/param-mj/5.png",
  "/param-mj/6.png",
  "/param-mj/7.png",
  "/param-mj/8.png",
  "/param-mj/9.png",
  "/param-mj/10.png",
  "/param-mj/11.png",
  "/param-mj/12.png",
  "/param-mj/13.png",
  "/param-mj/14.png",
  "/param-mj/15.png",
  // "/param-mj/17.png",
  // "/param-mj/18.png",
  // "/param-mj/19.png",
  // "/param-mj/20.png",
  // "/param-mj/21.png",
  "/param-mj/22.png",
  "/param-mj/23.png",
  "/param-mj/24.png",
  "/param-mj/25.png",
]

interface GlitchMosaicProps {
  baseImage?: string
  gridCols?: number
  gridRows?: number
  animationInterval?: number
  className?: string
  multiple?: number
}

export default function GlitchMosaic({
  baseImage = DEFAULT_BASE_IMAGE,
  multiple = 2,
  gridCols = 3*multiple,
  gridRows = 4*multiple,
  animationInterval = 100,
  className = "",
}: GlitchMosaicProps) {
  const totalTiles = gridCols * gridRows
  const aspectRatio = `${gridCols}/${gridRows}`

  const glitchPool = useMemo(() => {
    const candidates = GLITCH_IMAGES.filter(image => image !== baseImage)
    return candidates.length > 0 ? candidates : [baseImage]
  }, [baseImage])

  const [tileImages, setTileImages] = useState<string[]>(() =>
    Array.from({ length: totalTiles }, () => baseImage)
  )

  useEffect(() => {
    setTileImages(Array.from({ length: totalTiles }, () => baseImage))
  }, [totalTiles, baseImage])

  const getRandomGlitchImage = useCallback(() => {
    return glitchPool[Math.floor(Math.random() * glitchPool.length)]
  }, [glitchPool])

  const glitchRandomTile = useCallback(() => {
    if (totalTiles === 0) return

    const tileIndex = Math.floor(Math.random() * totalTiles)

    setTileImages(prev => {
      if (prev.length !== totalTiles) {
        return Array.from({ length: totalTiles }, () => baseImage)
      }

      const next = [...prev]
      let nextImage = getRandomGlitchImage()
      let guard = 0

      while (nextImage === prev[tileIndex] && glitchPool.length > 1 && guard < 6) {
        nextImage = getRandomGlitchImage()
        guard += 1
      }

      next[tileIndex] = nextImage
      return next
    })
  }, [baseImage, getRandomGlitchImage, glitchPool.length, totalTiles])

  useEffect(() => {
    if (totalTiles === 0) return

    const interval = setInterval(glitchRandomTile, Math.max(1, animationInterval))

    return () => clearInterval(interval)
  }, [animationInterval, glitchRandomTile, totalTiles])

  const backgroundSize = useMemo(() => `${gridCols * 100}% ${gridRows * 100}%`, [gridCols, gridRows])

  const resolvePosition = useCallback(
    (index: number) => {
      const col = index % gridCols
      const row = Math.floor(index / gridCols)

      const x = gridCols === 1 ? "50%" : `${(col / (gridCols - 1)) * 100}%`
      const y = gridRows === 1 ? "50%" : `${(row / (gridRows - 1)) * 100}%`

      return { x, y }
    },
    [gridCols, gridRows]
  )

  return (
    <div
      className={`relative w-full bg-gray-100 rounded-md overflow-hidden ${className}`}
      style={{ aspectRatio, minHeight: 240 }}
    >
      <div
        className="grid w-full h-full gap-0"
        style={{
          gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
          gridTemplateRows: `repeat(${gridRows}, 1fr)`,
        }}
      >
        {tileImages.map((imageSrc, index) => {
          const { x, y } = resolvePosition(index)
          return (
            <div key={index} className="relative w-full h-full min-h-0 min-w-0">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url(${imageSrc})`,
                  backgroundSize,
                  backgroundPosition: `${x} ${y}`,
                  backgroundRepeat: "no-repeat",
                }}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
