import { useEffect, useRef, useState } from 'react'

type Portrait3DProps = {
  src: string
  depth: string
  alt: string
  className?: string
}

const VERT = `
attribute vec2 p;
varying vec2 uv;
void main() {
  uv = vec2(p.x * 0.5 + 0.5, 0.5 - p.y * 0.5);
  gl_Position = vec4(p, 0.0, 1.0);
}`

// Desloca cada pixel pela profundidade: o que está mais perto (nariz, centro do rosto)
// anda mais que as bordas, e a cabeça parece girar em vez de só deslizar.
const FRAG = `
precision mediump float;
varying vec2 uv;
uniform sampler2D img;
uniform sampler2D dep;
uniform vec2 m;
uniform vec2 px;
void main() {
  vec2 off = m * vec2(0.028, 0.018);
  vec2 q = uv;
  for (int i = 0; i < 4; i++) {
    float d = texture2D(dep, q).r;
    q = uv + off * (d - 0.45);
  }
  vec4 c = texture2D(img, q);
  float d = texture2D(dep, q).r;
  float dx = texture2D(dep, q + vec2(px.x * 6.0, 0.0)).r - texture2D(dep, q - vec2(px.x * 6.0, 0.0)).r;
  float dy = texture2D(dep, q + vec2(0.0, px.y * 6.0)).r - texture2D(dep, q - vec2(0.0, px.y * 6.0)).r;
  // luz que segue o cursor, com um toque frio nas bordas
  float light = clamp(-(dx * m.x + dy * m.y) * 3.0, -0.25, 0.35);
  vec3 rim = vec3(0.55, 0.6, 1.0) * smoothstep(0.35, 0.0, d) * 0.25 * length(m);
  c.rgb += (c.rgb * light + rim) * c.a;
  gl_FragColor = c;
}`

function load(url: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = reject
    image.src = url
  })
}

export function Portrait3D({ src, depth, alt, className }: Portrait3DProps) {
  const wrap = useRef<HTMLDivElement>(null)
  const tilt = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const el = wrap.current
    const cv = canvas.current
    if (!el || !cv) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const gl = cv.getContext('webgl', { premultipliedAlpha: true, alpha: true, antialias: false })
    if (!gl) return

    let cancelled = false
    let raf = 0
    let visible = true
    let lastMove = -Infinity
    const target = { x: 0, y: 0 }
    const cur = { x: 0, y: 0 }

    const compile = (type: number, code: string) => {
      const sh = gl.createShader(type)!
      gl.shaderSource(sh, code)
      gl.compileShader(sh)
      return sh
    }
    const prog = gl.createProgram()!
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT))
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, 'p')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

    const uM = gl.getUniformLocation(prog, 'm')
    const uPx = gl.getUniformLocation(prog, 'px')

    const texture = (unit: number, image: HTMLImageElement, name: string) => {
      const tex = gl.createTexture()
      gl.activeTexture(gl.TEXTURE0 + unit)
      gl.bindTexture(gl.TEXTURE_2D, tex)
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
      gl.uniform1i(gl.getUniformLocation(prog, name), unit)
    }

    const resize = () => {
      const coarse = window.matchMedia('(pointer: coarse)').matches
      const dpr = Math.min(window.devicePixelRatio || 1, coarse ? 1.5 : 2)
      const w = Math.round(cv.clientWidth * dpr)
      const h = Math.round(cv.clientHeight * dpr)
      if (cv.width !== w || cv.height !== h) {
        cv.width = w
        cv.height = h
        gl.viewport(0, 0, w, h)
      }
    }

    const draw = () => {
      resize()
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.uniform2f(uM, cur.x, cur.y)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      if (tilt.current) {
        tilt.current.style.transform = `rotateY(${cur.x * 9}deg) rotateX(${-cur.y * 7}deg)`
      }
    }

    const loop = (t: number) => {
      raf = 0
      if (!visible) return
      // sem cursor por 2s (ou no celular), a cabeça balança devagar sozinha
      if (t - lastMove > 2000) {
        target.x = Math.sin(t / 2600) * 0.45
        target.y = Math.sin(t / 3700) * 0.2
      }
      cur.x += (target.x - cur.x) * 0.07
      cur.y += (target.y - cur.y) * 0.07
      draw()
      raf = requestAnimationFrame(loop)
    }
    const start = () => {
      if (!raf && !reduce && !cancelled) raf = requestAnimationFrame(loop)
    }

    const onMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return
      const rect = el.getBoundingClientRect()
      const nx = (event.clientX - (rect.left + rect.width / 2)) / (window.innerWidth / 2)
      const ny = (event.clientY - (rect.top + rect.height / 2)) / (window.innerHeight / 2)
      target.x = Math.max(-1, Math.min(1, nx))
      target.y = Math.max(-1, Math.min(1, ny))
      lastMove = performance.now()
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start()
    })

    Promise.all([load(src), load(depth)])
      .then(([image, depthImage]) => {
        if (cancelled) return
        texture(0, image, 'img')
        texture(1, depthImage, 'dep')
        gl.uniform2f(uPx, 1 / image.naturalWidth, 1 / image.naturalHeight)
        draw()
        setReady(true)
        if (!reduce) {
          window.addEventListener('pointermove', onMove)
          io.observe(el)
          start()
        }
      })
      .catch(() => {})

    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('pointermove', onMove)
    }
  }, [src, depth])

  return (
    <div ref={wrap} className={className} style={{ perspective: '1100px' }}>
      <div
        ref={tilt}
        className="relative h-full"
        style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
      >
        <img
          src={src}
          alt={alt}
          className="relative h-full w-auto max-w-none object-contain"
          style={{ opacity: ready ? 0 : 1, filter: 'drop-shadow(0 24px 30px rgba(10,10,10,0.35))' }}
        />
        <canvas
          ref={canvas}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full"
          style={{ filter: 'drop-shadow(0 24px 30px rgba(10,10,10,0.35))', transform: 'translateZ(30px)' }}
        />
      </div>
    </div>
  )
}
