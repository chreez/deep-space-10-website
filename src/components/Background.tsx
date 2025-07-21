import { useEffect, useRef } from 'react'
import './Background.css'

interface Star {
  x: number
  y: number
  opacity: number
  size: number
}

interface Connection {
  star1: number
  star2: number
  opacity: number
}

function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const starsRef = useRef<Star[]>([])
  const connectionsRef = useRef<Connection[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const initStars = () => {
      const starCount = Math.floor((window.innerWidth * window.innerHeight) / 15000)
      starsRef.current = []
      
      for (let i = 0; i < starCount; i++) {
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          opacity: Math.random() * 0.8 + 0.2,
          size: Math.random() * 2 + 1
        })
      }

      // Create connections between nearby stars
      connectionsRef.current = []
      for (let i = 0; i < starsRef.current.length; i++) {
        for (let j = i + 1; j < starsRef.current.length; j++) {
          const distance = Math.sqrt(
            Math.pow(starsRef.current[i].x - starsRef.current[j].x, 2) +
            Math.pow(starsRef.current[i].y - starsRef.current[j].y, 2)
          )
          
          if (distance < 150 && connectionsRef.current.length < starCount * 0.8) {
            connectionsRef.current.push({
              star1: i,
              star2: j,
              opacity: Math.random() * 0.3 + 0.1
            })
          }
        }
      }
    }

    let rotation = 0
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Apply slow rotation
      ctx.save()
      ctx.translate(canvas.width / 2, canvas.height / 2)
      ctx.rotate(rotation)
      ctx.translate(-canvas.width / 2, -canvas.height / 2)
      
      // Draw connections
      connectionsRef.current.forEach(connection => {
        const star1 = starsRef.current[connection.star1]
        const star2 = starsRef.current[connection.star2]
        
        ctx.beginPath()
        ctx.moveTo(star1.x, star1.y)
        ctx.lineTo(star2.x, star2.y)
        ctx.strokeStyle = `rgba(75, 145, 226, ${connection.opacity * Math.sin(Date.now() * 0.001) * 0.5 + 0.5})`
        ctx.lineWidth = 1
        ctx.stroke()
      })
      
      // Draw stars
      starsRef.current.forEach(star => {
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(75, 145, 226, ${star.opacity})`
        ctx.shadowBlur = 10
        ctx.shadowColor = '#4B91E2'
        ctx.fill()
      })
      
      ctx.restore()
      
      rotation += 0.0001 // Very slow rotation
      animationRef.current = requestAnimationFrame(animate)
    }

    resizeCanvas()
    initStars()
    animate()

    const handleResize = () => {
      resizeCanvas()
      initStars()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <>
      <div className="modern-background" />
      <div className="grid-overlay" />
      <canvas ref={canvasRef} className="constellation-canvas" />
    </>
  )
}

export default Background