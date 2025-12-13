'use client'

import { type MouseEvent, type ReactNode, useRef } from 'react'

import { cn } from '@/lib/utils'

type ButtonSize = 'default' | 'md' | 'sm' | 'xs'

interface CtaButtonProps {
  children: ReactNode
  onClick?: () => void
  className?: string
  size?: ButtonSize
  href?: string
}

const sizeStyles = {
  default: 'px-8 py-4 text-lg',
  md: 'px-7 py-3 text-lg',
  sm: 'px-5 py-2.5 text-base',
  xs: 'px-4 py-1.5 text-sm',
}

export function CtaButton({
  children,
  onClick,
  className,
  size = 'default',
  href,
}: CtaButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const anchorRef = useRef<HTMLAnchorElement>(null)

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    const ref = href ? anchorRef.current : buttonRef.current
    if (!ref) return
    const rect = ref.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    ref.style.setProperty('--mouse-x', `${x}%`)
    ref.style.setProperty('--mouse-y', `${y}%`)

    const rotateY = ((x - 50) / 50) * 12
    const rotateX = ((50 - y) / 50) * 8
    ref.style.setProperty('--rotate-x', `${rotateX}deg`)
    ref.style.setProperty('--rotate-y', `${rotateY}deg`)
  }

  const handleMouseLeave = () => {
    const ref = href ? anchorRef.current : buttonRef.current
    if (!ref) return
    ref.style.setProperty('--rotate-x', '0deg')
    ref.style.setProperty('--rotate-y', '0deg')
  }

  const sharedClassName = cn(
    'group dreamy-button relative overflow-hidden rounded-full font-medium text-white cursor-pointer inline-block',
    sizeStyles[size],
    'transition-all duration-300 ease-out',
    'hover:scale-[1.04] active:scale-[0.97] active:translate-y-[3px] hover:shadow-2xl/20',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400/50 focus-visible:ring-offset-2',
    className
  )

  const sharedStyle = {
    ['--mouse-x' as string]: '50%',
    ['--mouse-y' as string]: '50%',
    ['--rotate-x' as string]: '0deg',
    ['--rotate-y' as string]: '0deg',
    transform: 'perspective(800px) rotateX(var(--rotate-x)) rotateY(var(--rotate-y))',
    transformStyle: 'preserve-3d' as const,
  }

  const innerContent = (
    <>
      {/* Shadow layer */}
      <span
        className={cn(
          'absolute -inset-1 -z-10 rounded-full transition-all duration-300',
          'shadow-[0_8px_20px_-4px_rgba(0,0,0,0.3),0_4px_8px_-2px_rgba(0,0,0,0.2)]',
          'group-hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.35),0_15px_30px_-10px_rgba(0,0,0,0.25),0_0_60px_20px_rgba(196,181,253,0.4),0_0_100px_40px_rgba(165,180,252,0.25)]',
          'group-active:shadow-[0_2px_8px_rgba(0,0,0,0.2),0_1px_2px_rgba(0,0,0,0.2)]'
        )}
      />

      {/* Base background */}
      <span className="absolute inset-0 bg-[#0a0a0a] transition-opacity duration-500" />

      {/* Gradient overlay */}
      <span
        className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background:
            'linear-gradient(135deg, #c4b5fd, #a5b4fc, #c7d2fe, #e9d5ff, #fae8ff, #c4b5fd)',
          backgroundSize: '400% 400%',
          animation: 'gradientFlow 12s ease infinite',
        }}
      />

      {/* Mouse highlight */}
      <span
        className="absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none group-hover:opacity-50"
        style={{
          background: `radial-gradient(circle 200px} at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.5), transparent 60%)`,
        }}
      />

      {/* Cloud effect */}
      <span
        className="absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none mix-blend-soft-light group-hover:opacity-80"
        style={{
          background: `radial-gradient(ellipse 200px 100px at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.7), transparent 50%)`,
        }}
      />

      {/* Text */}
      <span className="relative z-10 transition-colors duration-500 text-white group-hover:text-[#19196a]/90">
        {children}
      </span>
    </>
  )

  if (href) {
    return (
      <a
        ref={anchorRef}
        href={href}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={sharedClassName}
        style={sharedStyle}
      >
        {innerContent}
      </a>
    )
  }

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={sharedClassName}
      style={sharedStyle}
    >
      {innerContent}
    </button>
  )
}
