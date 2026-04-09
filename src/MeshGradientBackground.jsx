import { useEffect, useRef } from 'react'
import {
  Mesh,
  OrthographicCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  Vector2,
  WebGLRenderer,
} from 'three'

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`

const fragmentShader = `
  precision highp float;

  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;

  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);

    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
      (c - a) * u.y * (1.0 - u.x) +
      (d - b) * u.x * u.y;
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;

    for (int i = 0; i < 5; i++) {
      value += amplitude * noise(p);
      p *= 2.0;
      amplitude *= 0.5;
    }

    return value;
  }

  float blob(vec2 p, vec2 center, float radius) {
    float d = length(p - center);
    return smoothstep(radius, 0.0, d);
  }

  void main() {
    vec2 p = vUv - 0.5;
    p.x *= uResolution.x / uResolution.y;

    vec2 mouse = uMouse - 0.5;
    mouse.x *= uResolution.x / uResolution.y;

    float time = uTime * 0.12;

    vec2 warp = vec2(
      fbm(p * 2.1 + vec2(time * 0.8, -time * 0.4)),
      fbm(p * 2.0 + vec2(-time * 0.55, time * 0.7))
    );

    vec2 q = p + (warp - 0.5) * 0.62 + mouse * 0.1;

    float g1 = blob(q, vec2(-0.82 + sin(time * 0.75) * 0.08, -0.18 + cos(time * 0.4) * 0.04), 1.08);
    float g2 = blob(q, vec2(0.86 + cos(time * 0.62) * 0.06, -0.26 + sin(time * 0.68) * 0.05), 0.98);
    float g3 = blob(q, vec2(-0.06 + sin(time * 0.45) * 0.07, 0.54 + cos(time * 0.46) * 0.04), 1.04);
    float g4 = blob(q, vec2(0.34 + cos(time * 0.32) * 0.06, 0.18 + sin(time * 0.36) * 0.04), 0.9);

    float detail = fbm(q * 3.2 + vec2(time * 0.25, -time * 0.32));
    float sheen = smoothstep(0.46, 0.92, detail);
    float ribbon = smoothstep(0.18, 0.82, fbm(q * 1.8 + vec2(time * 0.18, time * 0.11)));

    vec3 color = vec3(0.03, 0.03, 0.035);
    color += vec3(0.82, 0.84, 0.86) * g1 * 0.22;
    color += vec3(1.0, 1.0, 1.0) * g2 * 0.14;
    color += vec3(0.52, 0.54, 0.57) * g3 * 0.28;
    color += vec3(0.88, 0.89, 0.91) * g4 * 0.18;
    color += vec3(0.34, 0.35, 0.38) * sheen * 0.2 * (g1 + g2 + g3 + g4);
    color += vec3(0.24, 0.25, 0.28) * ribbon * 0.22;

    float vignette = smoothstep(1.9, 0.12, length(p));
    color *= vignette;

    float grain = hash(gl_FragCoord.xy + uTime) * 0.02;
    color += grain * 0.028;

    float luma = dot(color, vec3(0.299, 0.587, 0.114));
    color = mix(vec3(luma), color, 0.42);

    gl_FragColor = vec4(color, 1.0);
  }
`

function MeshGradientBackground({ mousePosition }) {
  const containerRef = useRef(null)
  const mouseRef = useRef(mousePosition)

  useEffect(() => {
    mouseRef.current = mousePosition
  }, [mousePosition])

  useEffect(() => {
    const container = containerRef.current

    if (!container) {
      return undefined
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    const renderer = new WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: 'high-performance',
    })
    renderer.setClearColor(0x000000, 0)
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'
    renderer.domElement.style.display = 'block'
    container.appendChild(renderer.domElement)

    const scene = new Scene()
    const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1)
    const geometry = new PlaneGeometry(2, 2)
    const material = new ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new Vector2(1, 1) },
        uMouse: { value: new Vector2(0.5, 0.5) },
      },
      vertexShader,
      fragmentShader,
      depthTest: false,
      depthWrite: false,
      transparent: true,
    })

    const mesh = new Mesh(geometry, material)
    scene.add(mesh)

    const setSize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5))
      renderer.setSize(width, height, false)
      material.uniforms.uResolution.value.set(width, height)
    }

    setSize()
    window.addEventListener('resize', setSize)

    let frameId
    const start = performance.now()

    const render = (now) => {
      const elapsed = (now - start) / 1000
      const motionScale = prefersReducedMotion.matches ? 0.18 : 1.0

      material.uniforms.uTime.value = elapsed * motionScale
      material.uniforms.uMouse.value.set(
        mouseRef.current.x === 0 ? 0.5 : mouseRef.current.x / window.innerWidth,
        mouseRef.current.y === 0 ? 0.5 : mouseRef.current.y / window.innerHeight,
      )

      renderer.render(scene, camera)
      frameId = window.requestAnimationFrame(render)
    }

    frameId = window.requestAnimationFrame(render)

    return () => {
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('resize', setSize)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      container.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={containerRef} className="pointer-events-none fixed inset-0 z-0 opacity-100" />
}

export default MeshGradientBackground
