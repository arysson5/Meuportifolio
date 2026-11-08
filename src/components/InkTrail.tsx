import { useEffect, useRef } from 'react'

// Rastro roxo líquido que segue o mouse. Gotas nascem no cursor, se fundem (metaballs),
// escorrem com a gravidade e somem. Fica atrás dos textos e por cima dos fundos das seções.

const MAX = 72
const SCALE = 0.5 // resolução do canvas em relação à tela: metade já fica liso e custa pouco

const VERT = `
attribute vec2 p;
void main() { gl_Position = vec4(p, 0.0, 1.0); }`

const FRAG = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec3 balls[${MAX}];
uniform int count;
uniform vec2 res;
void main() {
  vec2 pos = vec2(gl_FragCoord.x, res.y - gl_FragCoord.y);
  // núcleo de alcance limitado (cada gota só influencia até 2x o raio): sem bolhas e sem engordar
  float f = 0.0;
  vec2 g = vec2(0.0);
  for (int i = 0; i < ${MAX}; i++) {
    if (i >= count) break;
    vec2 d = pos - balls[i].xy;
    float R2 = 4.0 * balls[i].z * balls[i].z;
    float q = 1.0 - dot(d, d) / R2;
    if (q > 0.0) {
      f += q * q;
      g += -4.0 * q * d / R2;
    }
  }
  float a = smoothstep(0.42, 0.56, f);
  if (a <= 0.0) { gl_FragColor = vec4(0.0); return; }
  vec3 n = normalize(vec3(-g * 7.0, 1.0));
  float light = clamp(dot(n, normalize(vec3(-0.45, -0.55, 0.75))), 0.0, 1.0);
  float spec = pow(clamp(dot(n, normalize(vec3(-0.3, -0.4, 1.0))), 0.0, 1.0), 28.0);
  vec3 deep = vec3(0.32, 0.13, 0.66);
  vec3 base = vec3(0.651, 0.408, 1.0); // #A668FF
  vec3 col = mix(deep, base, 0.3 + 0.7 * light) + spec * 0.6;
  gl_FragColor = vec4(col * a, a);
}`

type Drop = { x: number; y: number; r: number; vx: number; vy: number; g: number; shrink: number }

export function InkTrail() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cv = ref.current
    if (!cv) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    // celular e tablet: não há cursor, e o canvas de tela cheia só gastaria bateria
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const gl = cv.getContext('webgl', { premultipliedAlpha: true, alpha: true, antialias: false })
    if (!gl) return

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
    const uBalls = gl.getUniformLocation(prog, 'balls')
    const uCount = gl.getUniformLocation(prog, 'count')
    const uRes = gl.getUniformLocation(prog, 'res')

    const data = new Float32Array(MAX * 3)
    let drops: Drop[] = []
    let raf = 0
    let last: { x: number; y: number } | null = null

    const resize = () => {
      cv.width = Math.round(window.innerWidth * SCALE)
      cv.height = Math.round(window.innerHeight * SCALE)
      gl.viewport(0, 0, cv.width, cv.height)
      gl.uniform2f(uRes, cv.width, cv.height)
    }
    resize()

    const frame = () => {
      raf = 0
      drops = drops.filter((d) => d.r > 1.5)
      for (const d of drops) {
        d.vy += d.g
        d.vx *= 0.94
        d.x += d.vx
        d.y += d.vy
        d.r -= d.shrink
      }
      const n = Math.min(drops.length, MAX)
      for (let i = 0; i < n; i++) {
        const d = drops[drops.length - n + i]
        data[i * 3] = d.x * SCALE
        data[i * 3 + 1] = d.y * SCALE
        data[i * 3 + 2] = Math.max(d.r, 0) * SCALE
      }
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      if (n > 0) {
        gl.uniform3fv(uBalls, data)
        gl.uniform1i(uCount, n)
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
        raf = requestAnimationFrame(frame)
      }
    }

    const spawn = (x: number, y: number, vx: number, vy: number, speed: number) => {
      const big = Math.random() < 0.12 // de vez em quando uma gota maior, que escorre mais
      drops.push({
        x: x + (Math.random() - 0.5) * 6,
        y: y + (Math.random() - 0.5) * 6,
        r: (big ? 15 : 8) + Math.min(speed, 40) * 0.18 + Math.random() * 4,
        vx: vx * 0.06,
        vy: vy * 0.06,
        g: big ? 0.07 + Math.random() * 0.05 : 0.02 + Math.random() * 0.03,
        shrink: big ? 0.09 : 0.14 + Math.random() * 0.08,
      })
      if (drops.length > MAX) drops.splice(0, drops.length - MAX)
    }

    const onMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return
      const x = event.clientX
      const y = event.clientY
      if (last) {
        const dx = x - last.x
        const dy = y - last.y
        const dist = Math.hypot(dx, dy)
        const steps = Math.min(Math.floor(dist / 14), 6)
        for (let i = 1; i <= steps; i++) {
          spawn(last.x + (dx * i) / steps, last.y + (dy * i) / steps, dx, dy, dist)
        }
        if (steps === 0 && dist > 2) spawn(x, y, dx, dy, dist)
      }
      last = { x, y }
      if (!raf) raf = requestAnimationFrame(frame)
    }
    const onLeave = () => {
      last = null
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[1] h-full w-full" />
}
