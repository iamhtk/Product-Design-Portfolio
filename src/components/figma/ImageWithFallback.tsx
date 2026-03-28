import React, { useState } from 'react'
import { useLightbox } from '../Lightbox'

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=='

function isVideoSrc(src: string) {
  return /\.(mp4|webm|mov)(\?|$)/i.test(src)
}

export interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Set true for above-the-fold images (hero, first visible) to load immediately. Default: lazy load. */
  priority?: boolean
  /** When true (default), clicking opens the global lightbox. Skipped for video URLs and error state. */
  enableLightbox?: boolean
}

export function ImageWithFallback(props: ImageWithFallbackProps) {
  const [didError, setDidError] = useState(false)
  const [loading, setLoading] = useState(true)
  const { openLightbox, lightboxEnabled } = useLightbox()

  const handleError = () => {
    setDidError(true)
    setLoading(false)
  }

  const {
    src,
    alt,
    style,
    className,
    priority,
    enableLightbox = true,
    onClick,
    ...rest
  } = props

  const loadingProps = priority
    ? { loading: 'eager' as const, decoding: 'async' as const, fetchPriority: 'high' as const }
    : { loading: 'lazy' as const, decoding: 'async' as const }

  const canLightbox =
    enableLightbox &&
    lightboxEnabled &&
    !didError &&
    typeof src === 'string' &&
    src.length > 0 &&
    !isVideoSrc(src)

  const lightboxCursor = canLightbox ? { cursor: 'zoom-in' as const } : {}

  const handleClick = (e: React.MouseEvent<HTMLImageElement>) => {
    onClick?.(e)
    if (!canLightbox || e.defaultPrevented) return
    e.stopPropagation()
    openLightbox([{ src, alt: alt ?? '', caption: alt ?? undefined }], 0)
  }

  if (didError) {
    return (
      <div
        className={`inline-block bg-gray-100 text-center align-middle ${className ?? ''}`}
        style={style}
      >
        <div className="flex items-center justify-center w-full h-full">
          <img src={ERROR_IMG_SRC} alt="Error loading image" {...rest} data-original-url={src} />
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className={`relative inline-block ${className ?? ''}`} style={style}>
        <div className="absolute inset-0 animate-pulse bg-gray-100" aria-hidden />
        <img
          src={src}
          alt={alt ?? ''}
          className={className}
          style={{ ...style, ...lightboxCursor }}
          {...loadingProps}
          {...rest}
          onError={handleError}
          onLoad={() => setLoading(false)}
          onClick={handleClick}
        />
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt ?? ''}
      className={className}
      style={{ ...style, ...lightboxCursor }}
      {...loadingProps}
      {...rest}
      onError={handleError}
      onClick={handleClick}
    />
  )
}
