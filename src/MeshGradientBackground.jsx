import { useEffect, useRef } from 'react'
import {
  Mesh,
  OrthographicCamera,
  PlaneGeometry,
  SRGBColorSpace,
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
    mat2 rotation = mat2(1.6, 1.2, -1.2, 1.6);

    for (int i = 0; i < 6; i++) {
      value += amplitude * noise(p);
      p = rotation * p * 1.08;
      amplitude *= 0.52;
    }

    return value;
  }

  float ridge(float value) {
    return 1.0 - abs(value * 2.0 - 1.0);
  }

  void main() {
    vec2 p = vUv - 0.5;
    p.x *= uResolution.x / uResolution.y;

    vec2 mouse = uMouse - 0.5;
    mouse.x *= uResolution.x / uResolution.y;

    float time = uTime * 0.075;

    vec2 warpA = vec2(
      fbm(p * 0.95 + vec2(time * 0.18, -time * 0.14)),
      fbm(p * 1.05 + vec2(-time * 0.16, time * 0.2))
    );

    vec2 warpB = vec2(
      fbm((p + (warpA - 0.5) * 0.8) * 2.0 + vec2(-time * 0.09, time * 0.07)),
      fbm((p - (warpA - 0.5) * 0.7) * 1.9 + vec2(time * 0.08, -time * 0.06))
    );

    vec2 q = p + (warpA - 0.5) * 0.52 + (warpB - 0.5) * 0.16 + mouse * 0.025;

    float massA = smoothstep(1.18, 0.0, length(q - vec2(-0.74 + sin(time * 0.52) * 0.08, -0.22 + cos(time * 0.34) * 0.05)));
    float massB = smoothstep(1.02, 0.0, length(q - vec2(0.76 + cos(time * 0.48) * 0.06, -0.28 + sin(time * 0.41) * 0.05)));
    float massC = smoothstep(1.0, 0.0, length(q - vec2(0.04 + sin(time * 0.27) * 0.05, 0.58 + cos(time * 0.29) * 0.04)));
    float massD = smoothstep(0.86, 0.0, length(q - vec2(0.36 + cos(time * 0.21) * 0.04, 0.12 + sin(time * 0.25) * 0.05)));

    float field = massA * 0.95 + massB * 0.8 + massC * 0.85 + massD * 0.6;
    float broad = fbm(q * 1.45 + vec2(time * 0.08, -time * 0.06));
    float detail = fbm(q * 3.2 + vec2(-time * 0.03, time * 0.04));
    float ridges = ridge(fbm(q * 2.1 + vec2(4.0, -7.0))) * 0.5 + ridge(fbm(q * 4.5 + vec2(-2.0, 3.0))) * 0.25;
    float textureNoise = fbm(q * 8.0 + vec2(12.4, -8.1));
    float micro = noise(gl_FragCoord.xy * 0.08 + vec2(17.0, 29.0));

    float silverLift = smoothstep(0.34, 0.9, broad + field * 0.22);
    float chromeRim = smoothstep(0.52, 0.96, detail * 0.7 + ridges * 0.6 + field * 0.12);

    vec3 color = vec3(0.012, 0.012, 0.015);
    color += vec3(0.18, 0.19, 0.20) * field * 0.24;
    color += vec3(0.42, 0.43, 0.45) * silverLift * 0.18;
    color += vec3(0.82, 0.84, 0.87) * chromeRim * (0.08 + 0.08 * massB + 0.05 * massC);
    color += vec3(textureNoise - 0.5) * 0.045 * (0.35 + field * 0.65);
    color += vec3(micro - 0.5) * 0.018;

    float vignette = smoothstep(1.72, 0.22, length(p));
    color *= vignette;

    float luma = dot(color, vec3(0.299, 0.587, 0.114));
    color = mix(vec3(luma), color, 0.2);
    color = color / (vec3(1.0) + color);
    color = pow(color, vec3(0.96));

    gl_FragColor = vec4(max(color, vec3(0.0)), 0.98);
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
    renderer.outputColorSpace = SRGBColorSpace
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
      precision: 'highp',
      transparent: true,
    })

    const mesh = new Mesh(geometry, material)
    scene.add(mesh)

    const setSize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
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

  return <div ref={containerRef} className="pointer-events-none fixed inset-0 z-0 opacity-95" />
}

export default MeshGradientBackground
