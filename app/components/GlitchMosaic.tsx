"use client"

import { useState, useEffect, useCallback, useMemo, useRef } from "react"

const DEFAULT_BASE_IMAGE = "/param-mj/1.png"

const GLITCH_IMAGES = [
  "/param-mj/1.png",
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
  "/param-mj/26.png",
  //"/param-mj/param.png",
]

const TRANSITION_MS = 400
const TILE_COOLDOWN_MS = 600

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
  animationInterval = 400,
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
  const [tileVersions, setTileVersions] = useState<number[]>(() =>
    Array.from({ length: totalTiles }, () => 0)
  )
  const [activeTiles, setActiveTiles] = useState<Set<number>>(new Set())
  const transitionTimeouts = useRef<Map<number, number>>(new Map())
  const lastUpdatedRef = useRef<number[]>([])

  useEffect(() => {
    transitionTimeouts.current.forEach(timeoutId => clearTimeout(timeoutId))
    transitionTimeouts.current.clear()

    setTileImages(Array.from({ length: totalTiles }, () => baseImage))
    setTileVersions(Array.from({ length: totalTiles }, () => 0))
    setActiveTiles(() => new Set())
    lastUpdatedRef.current = Array.from({ length: totalTiles }, () => 0)
  }, [totalTiles, baseImage])

  useEffect(() => {
    return () => {
      transitionTimeouts.current.forEach(timeoutId => clearTimeout(timeoutId))
      transitionTimeouts.current.clear()
    }
  }, [])

  const getRandomGlitchImage = useCallback(() => {
    return glitchPool[Math.floor(Math.random() * glitchPool.length)]
  }, [glitchPool])

  const replaceTile = useCallback(
    (tileIndex: number, { force = false }: { force?: boolean } = {}) => {
      if (tileIndex < 0 || tileIndex >= totalTiles) return

      const now = Date.now()
      const lastUpdated = lastUpdatedRef.current[tileIndex] ?? 0

      if (!force && now - lastUpdated < TILE_COOLDOWN_MS) {
        return
      }

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

      setTileVersions(prev => {
        const baseline =
          prev.length === totalTiles ? [...prev] : Array.from({ length: totalTiles }, () => 0)
        baseline[tileIndex] = (baseline[tileIndex] ?? 0) + 1
        return baseline
      })

      setActiveTiles(prev => {
        const next = new Set(prev)
        next.add(tileIndex)
        return next
      })

      const existingTimeout = transitionTimeouts.current.get(tileIndex)
      if (existingTimeout) {
        clearTimeout(existingTimeout)
      }

      const timeoutId = window.setTimeout(() => {
        setActiveTiles(prev => {
          const next = new Set(prev)
          next.delete(tileIndex)
          return next
        })
        transitionTimeouts.current.delete(tileIndex)
      }, TRANSITION_MS)

      transitionTimeouts.current.set(tileIndex, timeoutId)
      lastUpdatedRef.current[tileIndex] = now
    },
    [baseImage, getRandomGlitchImage, glitchPool.length, totalTiles]
  )

  const glitchRandomTile = useCallback(() => {
    if (totalTiles === 0) return

    const now = Date.now()
    const eligible: number[] = []

    for (let i = 0; i < totalTiles; i += 1) {
      const lastUpdated = lastUpdatedRef.current[i] ?? 0
      if (now - lastUpdated >= TILE_COOLDOWN_MS) {
        eligible.push(i)
      }
    }

    if (eligible.length === 0) return

    const tileIndex = eligible[Math.floor(Math.random() * eligible.length)]
    replaceTile(tileIndex)
  }, [replaceTile, totalTiles])

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

      const corners = {
        topLeft: { x: col, y: row },
        topRight: { x: col + 1, y: row },
        bottomLeft: { x: col, y: row + 1 },
        bottomRight: { x: col + 1, y: row + 1 },
      }

      return { backgroundX: x, backgroundY: y, corners }
    },
    [gridCols, gridRows]
  )

  const activeTileArray = useMemo(() => Array.from(activeTiles), [activeTiles])

  const handleTileHover = useCallback(
    (index: number) => {
      replaceTile(index, { force: true })
    },
    [replaceTile]
  )

  return (
    <div
      className={`relative w-full rounded-md bg-gray-100 transition-colors duration-300 dark:bg-neutral-900 ${className}`}
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
          const position = resolvePosition(index)
          const isActive = activeTiles.has(index)
          const versionKey = `${index}-${tileVersions[index] ?? 0}`

          return (
            <div
              key={index}
              className="relative w-full h-full min-h-0 min-w-0"
              onMouseEnter={() => handleTileHover(index)}
            >
              <div
                key={versionKey}
                className={`absolute inset-0${isActive ? " tile-fade-in" : ""}`}
                style={{
                  backgroundImage: `url(${imageSrc})`,
                  backgroundSize,
                  backgroundPosition: `${position.backgroundX} ${position.backgroundY}`,
                  backgroundRepeat: "no-repeat",
                  opacity: isActive ? undefined : 1,
                }}
              />
            </div>
          )
        })}
      </div>
      {activeTileArray.length > 0 && (
        <svg
          className="pointer-events-none absolute inset-0"
          viewBox={`0 0 ${gridCols} ${gridRows}`}
          preserveAspectRatio="none"
        >
          {activeTileArray.map(index => {
            const { corners } = resolvePosition(index)
            const versionKey = `${index}-${tileVersions[index] ?? 0}`
            return (
              <g key={`lines-${versionKey}`} className="tile-line-fade">
                <path d={`M 0 0 L ${corners.topLeft.x} ${corners.topLeft.y}`} stroke="#ffffff" strokeWidth={0.01} strokeLinecap="round" fill="none" />
                <path d={`M ${gridCols} 0 L ${corners.topRight.x} ${corners.topRight.y}`} stroke="#ffffff" strokeWidth={0.01} strokeLinecap="round" fill="none" />
                <path d={`M 0 ${gridRows} L ${corners.bottomLeft.x} ${corners.bottomLeft.y}`} stroke="#ffffff" strokeWidth={0.01} strokeLinecap="round" fill="none" />
                <path d={`M ${gridCols} ${gridRows} L ${corners.bottomRight.x} ${corners.bottomRight.y}`} stroke="#ffffff" strokeWidth={0.01} strokeLinecap="round" fill="none" />
              </g>
            )
          })}
        </svg>
      )}
    </div>
  )
}
