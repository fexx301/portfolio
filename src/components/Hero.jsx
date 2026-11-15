import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { personalData } from '../data/data'

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`

const FRAG = `
precision highp float;

uniform float u_time;
uniform vec2  u_res;
uniform vec2  u_mouse;
uniform vec2  u_vel;
uniform float u_force;

float h(vec2 p) {
  p = fract(p * vec2(0.1031, 0.1030));
  p += dot(p, p.yx + 33.33);
  return fract((p.x + p.y) * p.x);
}

vec2 hg(vec2 p) { return vec2(h(p), h(p + vec2(31.41, 57.30))) * 2.0 - 1.0; }
float gn(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f*f*f*(f*(f*6.0 - 15.0) + 10.0);
  return mix(mix(dot(hg(i),             f),
                 dot(hg(i+vec2(1,0)), f-vec2(1,0)), u.x),
             mix(dot(hg(i+vec2(0,1)), f-vec2(0,1)),
                 dot(hg(i+vec2(1,1)), f-vec2(1,1)), u.x), u.y) * 1.4;
}

const mat2 MT = mat2(1.6, 1.2, -1.2, 1.6);
float fbm3(vec2 p) { float s=0.,a=0.5; for(int i=0;i<3;i++){s+=a*gn(p);p=MT*p;a*=0.5;} return s; }
float fbm5(vec2 p) { float s=0.,a=0.5; for(int i=0;i<5;i++){s+=a*gn(p);p=MT*p;a*=0.5;} return s; }

vec3 aur(float x) {
  x = clamp(x, 0.0, 1.0);
  vec3 a = vec3(0.02, 0.05, 0.30);
  vec3 b = vec3(0.06, 0.28, 0.92);
  vec3 c = vec3(0.02, 0.72, 0.96);
  vec3 d = vec3(0.72, 0.96, 1.00);
  vec3 col  = mix(a, b, smoothstep(0.00, 0.38, x));
       col  = mix(col, c, smoothstep(0.38, 0.72, x));
       col  = mix(col, d, smoothstep(0.72, 1.00, x));
  return col;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  float ar = u_res.x / u_res.y;
  vec2 p   = (uv - 0.5) * vec2(ar, 1.0);
  vec2 m   = (u_mouse - 0.5) * vec2(ar, 1.0);
  float t  = u_time * 0.14;

  float dst  = length(p - m);
  float gaus = exp(-dst * dst * 3.2) * u_force;
  vec2 rDir  = normalize(p - m + vec2(0.0001));
  vec2 infl  = rDir * gaus * 0.22 + u_vel * gaus * 0.55;
  float reveal = exp(-dst * dst * 0.80) * u_force;

  vec2 wp = p + infl;
  vec2 q  = vec2(
    fbm3(wp * 1.12 + t * 0.08),
    fbm3(wp * 1.12 + vec2(5.18, 1.74) + t * 0.09)
  );
  vec2 r = vec2(
    fbm3(wp * 0.86 + 3.9 * q + vec2(1.7, 9.2) + t * 0.054),
    fbm3(wp * 0.86 + 3.9 * q + vec2(8.3, 2.8) + t * 0.059)
  );

  float drift = sin(t * 0.28) * 0.22 + sin(t * 0.17 + 2.1) * 0.11;
  float cy  = fbm3(p * vec2(0.55, 1.0) + 1.8 * q + t * 0.048) * 0.26 + drift;
  float tex = fbm5(p * vec2(2.2, 6.2) + 2.5 * r + t * 0.075) * 0.5 + 0.5;

  vec3 col = vec3(0.0);

  float dy1 = p.y - cy;
  float w1  = 0.30 + gaus * 0.10;
  col += aur(tex * 0.38) * exp(-dy1*dy1 / (w1*w1)) * (0.04 + reveal * 0.40);

  float cy2 = cy + (q.x - q.y) * 0.05;
  float dy2 = p.y - cy2;
  float w2  = 0.16 + gaus * 0.06;
  col += aur(0.26 + tex * 0.44) * exp(-dy2*dy2 / (w2*w2)) * 0.55;

  float cy3 = cy + r.x * 0.07;
  float dy3 = p.y - cy3;
  float w3  = 0.08 + gaus * 0.03;
  col += aur(0.58 + tex * 0.38) * exp(-dy3*dy3 / (w3*w3)) * 0.70;

  float dy4 = p.y - cy;
  float w4  = 0.022 + gaus * 0.010;
  vec3 spine = mix(vec3(0.78, 0.96, 1.00), vec3(0.92, 0.99, 1.00), tex);
  col += spine * exp(-dy4*dy4 / (w4*w4)) * 0.90;

  float cy5 = cy + 0.08 + r.y * 0.12;
  float dy5 = p.y - cy5;
  float w5  = 0.12 + gaus * 0.04;
  col += aur(0.14 + tex * 0.52) * exp(-dy5*dy5 / (w5*w5)) * (0.02 + reveal * 0.36);

  float cy6 = cy - 0.06 + q.x * 0.07;
  float dy6 = p.y - cy6;
  float w6  = 0.06 + gaus * 0.02;
  col += aur(0.70 + tex * 0.28) * exp(-dy6*dy6 / (w6*w6)) * (0.01 + reveal * 0.26);

  col += aur(0.80) * exp(-dy2*dy2 / (w2*w2)) * gaus * 0.55;
  col += vec3(0.04, 0.16, 0.62) * gaus * 0.18;

  float amb = fbm3(p * 0.52 + t * 0.022) * 0.5 + 0.5;
  col += mix(vec3(0.003, 0.007, 0.028), vec3(0.006, 0.016, 0.055), amb);

  col *= 1.0 - smoothstep(0.28, 1.10, length(uv - 0.5) * 1.78);

  float g_c  = gn(gl_FragCoord.xy / 5.5 + u_time * 0.22) * 0.5 + 0.5;
  float g_m  = h(uv * 620.0  + fract(u_time * 7.1)) - 0.5;
  float g_f  = h(uv * 1740.0 + fract(u_time * 11.2)) - 0.5;
  float emulsion = (g_c - 0.5) * 0.54 + g_m * 0.28 + g_f * 0.18;
  float lum  = dot(col, vec3(0.299, 0.587, 0.114));
  float emask = smoothstep(0.0, 0.15, lum) * (1.0 - lum * 0.50);
  col += emulsion * 0.052 * (0.55 + emask * 1.90);

  col = 1.0 - exp(-col * 1.05);
  col = pow(max(col, 0.0), vec3(0.90));

  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`

export default function Hero() {
  const canvasRef  = useRef(null)
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const cueRef     = useRef(null)

  // WebGL aurora shader
  useEffect(() => {
    const canvas  = canvasRef.current
    const section = sectionRef.current
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const gl = !reduceMotion && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))

    if (!gl) {
      canvas.style.background =
        'radial-gradient(ellipse at 48% 52%, rgba(16,185,129,.18) 0%, transparent 60%), #020408'
      return
    }

    function compile(type, src) {
      const s = gl.createShader(type)
      gl.shaderSource(s, src)
      gl.compileShader(s)
      return s
    }

    const prog = gl.createProgram()
    gl.attachShader(prog, compile(gl.VERTEX_SHADER,   VERT))
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(prog)
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW)
    const posLoc = gl.getAttribLocation(prog, 'a_pos')
    gl.enableVertexAttribArray(posLoc)
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

    const uTime  = gl.getUniformLocation(prog, 'u_time')
    const uRes   = gl.getUniformLocation(prog, 'u_res')
    const uMouse = gl.getUniformLocation(prog, 'u_mouse')
    const uVel   = gl.getUniformLocation(prog, 'u_vel')
    const uForce = gl.getUniformLocation(prog, 'u_force')

    let mx = 0.5, my = 0.5
    let smx = 0.5, smy = 0.5
    let svx = 0.0, svy = 0.0
    let force = 0.0, targetForce = 0.0

    const onMove  = (e) => {
      const r = canvas.getBoundingClientRect()
      mx = (e.clientX - r.left) / r.width
      my = 1.0 - (e.clientY - r.top) / r.height
      targetForce = 1.0
    }
    const onLeave = () => { targetForce = 0.0 }
    const onEnter = () => { targetForce = 1.0 }
    section.addEventListener('mousemove',  onMove)
    section.addEventListener('mouseleave', onLeave)
    section.addEventListener('mouseenter', onEnter)

    function resize() {
      const dpr  = Math.min(window.devicePixelRatio, 1.0)
      const rect = section.getBoundingClientRect()
      canvas.width  = Math.round(rect.width  * dpr)
      canvas.height = Math.round(rect.height * dpr)
      canvas.style.width  = rect.width  + 'px'
      canvas.style.height = rect.height + 'px'
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    resize()
    window.addEventListener('resize', resize)

    let rafId = 0
    function frame(ts) {
      const t = ts * 0.001
      const prevSmx = smx, prevSmy = smy
      smx += (mx - smx) * 0.12
      smy += (my - smy) * 0.12
      const rawVx = (smx - prevSmx) * 90
      const rawVy = (smy - prevSmy) * 90
      svx += (rawVx - svx) * 0.22
      svy += (rawVy - svy) * 0.22
      force += (targetForce - force) * (targetForce > force ? 0.06 : 0.025)

      gl.uniform1f(uTime,  t)
      gl.uniform2f(uRes,   canvas.width, canvas.height)
      gl.uniform2f(uMouse, smx, smy)
      gl.uniform2f(uVel,   svx, svy)
      gl.uniform1f(uForce, force)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      rafId = requestAnimationFrame(frame)
    }

    // Only draw while the hero is on screen.
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (!rafId) rafId = requestAnimationFrame(frame)
      } else {
        cancelAnimationFrame(rafId)
        rafId = 0
      }
    })
    io.observe(section)

    return () => {
      io.disconnect()
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
      section.removeEventListener('mousemove',  onMove)
      section.removeEventListener('mouseleave', onLeave)
      section.removeEventListener('mouseenter', onEnter)
    }
  }, [])

  // Fade + lift content as user scrolls past hero
  useEffect(() => {
    const content = contentRef.current
    const cue     = cueRef.current
    const section = sectionRef.current

    const onScroll = () => {
      const h = section?.offsetHeight || window.innerHeight
      const p = Math.min(window.scrollY / (h * 0.75), 1)
      if (content) {
        content.style.opacity  = String(1 - p)
        content.style.transform = `translateY(${p * -50}px)`
      }
      if (cue) cue.style.opacity = window.scrollY > 60 ? '0' : '1'
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // GSAP entrance stagger on direct children
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      gsap.set([...contentRef.current.children], { opacity: 1, y: 0 })
      return
    }
    gsap.fromTo(
      [...contentRef.current.children],
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out', delay: 0.15 }
    )
  }, [])

  const scrollTo = (id) => (e) => {
    e.preventDefault()
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-6 py-24"
      >
        <p className="font-orbitron text-accent-light text-xs tracking-[0.4em] uppercase mb-8">
          {personalData.title}
        </p>

        <h1 className="font-bold leading-none mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          <span
            className="block text-white"
            style={{ fontSize: 'clamp(3rem, 11vw, 8.5rem)' }}
          >
            Femi
          </span>
          <span
            className="block name-shimmer"
            style={{ fontSize: 'clamp(2.2rem, 8vw, 6.5rem)' }}
          >
            Ogunsanya
          </span>
        </h1>

        <p className="text-grey text-base md:text-lg max-w-md leading-relaxed mb-10">
          {personalData.tagline}
        </p>

        <div className="flex flex-wrap gap-4 justify-center mb-10">
          <a
            href="#projects"
            onClick={scrollTo('#projects')}
            className="px-7 py-3 bg-accent hover:bg-accent-dark text-white font-medium rounded-full transition-[background-color,box-shadow] duration-150 ease-out glow-accent text-sm font-orbitron tracking-wide"
          >
            View Work
          </a>
          <a
            href="#contact"
            onClick={scrollTo('#contact')}
            className="px-7 py-3 border border-accent/30 hover:border-accent text-white rounded-full transition-[border-color,background-color] duration-150 ease-out hover:bg-accent/10 text-sm"
          >
            Get in Touch
          </a>
        </div>

      </div>

      <a
        ref={cueRef}
        href="#about"
        onClick={scrollTo('#about')}
        className="group absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20 transition-opacity duration-500"
        aria-label="Scroll down"
      >
        <span className="relative block h-10 w-px overflow-hidden bg-white/10">
          <span className="absolute inset-x-0 top-0 block h-1/2 w-px bg-gradient-to-b from-transparent via-accent-light to-transparent animate-[scroll-beam_1.4s_linear_infinite]" />
        </span>
        <span className="font-orbitron text-[10px] tracking-[0.35em] text-grey/50 uppercase group-hover:text-accent-light transition-colors">
          Scroll
        </span>
      </a>
    </section>
  )
}
