import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Braces, Database, LayoutGrid, Lock } from 'lucide-react'

const useScrollReveal = ({ threshold = 0.1 } = {}) => {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        observer.unobserve(entry.target)
      }
    }, { threshold })

    const node = ref.current

    if (node) {
      observer.observe(node)
    }

    return () => observer.disconnect()
  }, [threshold])

  return [ref, isVisible]
}

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const updateMousePosition = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY })
    }

    window.addEventListener('mousemove', updateMousePosition, { passive: true })

    return () => window.removeEventListener('mousemove', updateMousePosition)
  }, [])

  return mousePosition
}

const hardStack = [
  'TypeScript',
  'Python',
  'Java',
  'SQL',
  'React',
  'Next.js',
  'Node.js',
  'PostgreSQL',
  'AWS',
  'Docker',
  'Spring Boot',
  'Django',
]

const conceptualStack = [
  'Data Visualization',
  'Machine Learning',
  'Statistical Analysis',
  'Spaced Repetition Algorithms',
  'System Architecture',
  'Relational Database Design',
]

const projects = [
  {
    title: 'SuPR Code Review',
    tech: 'Next.js, TS, PSQL, Zod, Azure',
    desc: 'Built a full-stack engineering training platform with 76+ typed API routes and 49 rubric-based challenges backed by automated scorecards.',
    shortDesc: 'A full-stack training platform for engineering code reviews and debugging workflows.',
    year: '2026',
    repoUrl: 'https://github.com/Manan1121/SuPRCodeReview',
    repoLabel: 'Private repo',
    isPrivate: true,
    liveUrl: 'https://su-pr-code-review-web.vercel.app',
    image:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Spaced Repetition Tracker',
    tech: 'Next.js, PostgreSQL, Prisma',
    desc: 'Built an algorithm-driven coding platform with OAuth, real-time analytics, and SM-2 scheduling to optimize retention and submission review cadence.',
    shortDesc: 'An adaptive coding platform that uses spaced repetition to improve long-term retention.',
    year: '2025',
    repoUrl: 'https://github.com/Manan1121/leetcode-tracker',
    repoLabel: 'GitHub repo',
    isPrivate: false,
    liveUrl: 'https://leetcodetracker.me',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'ClearBill API',
    tech: 'Node.js, AWS Textract, SageMaker',
    desc: 'Placed Top 3 at HackHealth. Built a medical billing pipeline that reached 85% classification accuracy and handled 50+ concurrent requests under 100ms.',
    shortDesc: 'A scalable medical billing classification pipeline built on AWS document and ML services.',
    year: '2025',
    repoUrl: 'https://github.com/Manan1121/ruhealth2024-team7',
    repoLabel: 'GitHub repo',
    isPrivate: false,
    liveUrl: null,
    image:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
  },
]

const GitHubMark = ({ className = 'h-4 w-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className={className}
  >
    <path d="M12 .5C5.649.5.5 5.649.5 12A11.5 11.5 0 0 0 8.36 22.07c.575.106.785-.25.785-.556 0-.274-.01-1-.015-1.962-3.182.692-3.854-1.533-3.854-1.533-.52-1.321-1.27-1.673-1.27-1.673-1.039-.71.08-.696.08-.696 1.148.08 1.752 1.178 1.752 1.178 1.02 1.748 2.676 1.243 3.328.95.103-.739.399-1.244.725-1.53-2.54-.29-5.212-1.27-5.212-5.654 0-1.249.446-2.27 1.177-3.07-.118-.289-.51-1.456.112-3.036 0 0 .96-.307 3.145 1.172A10.955 10.955 0 0 1 12 6.036c.973.005 1.954.132 2.87.389 2.184-1.479 3.143-1.172 3.143-1.172.624 1.58.232 2.747.114 3.036.733.8 1.176 1.821 1.176 3.07 0 4.395-2.676 5.36-5.224 5.645.41.353.776 1.05.776 2.117 0 1.528-.014 2.76-.014 3.136 0 .31.207.668.79.555A11.502 11.502 0 0 0 23.5 12C23.5 5.649 18.351.5 12 .5Z" />
  </svg>
)

const experience = [
  {
    role: 'Software Developer Co-Op',
    company: 'Church & Dwight',
    date: 'May 2025 - Present',
    bullets: [
      'Engineered Python scripts to parse 2,000+ vendor agreements into a centralized data lake.',
      'Architected Python and Power Apps workflows to flag renewal risk and cut manual overhead by 70%.',
      'Built analysis pipelines that surfaced vendor overlap and reduced redundant records by 15%.',
    ],
  },
  {
    role: 'Vice-President & Founder',
    company: 'Kappa Theta Pi',
    date: 'May 2024 - Jan 2026',
    bullets: [
      'Founded and scaled a tech fraternity to 50+ members with a defined technical curriculum.',
      'Led the full-stack build of a member portal in Next.js and MongoDB to attract and support members.',
      'Secured 5+ partnerships that created recruiting pathways into competitive internships.',
    ],
  },
  {
    role: 'Software Engineer Intern',
    company: 'The Scion Group',
    date: 'Jun 2024 - Sep 2024',
    bullets: [
      'Integrated Elise AI with Salesforce via REST APIs and cut lead response time by 35%.',
      'Built middleware to sync resident inquiry data in real time and improved data accuracy by 40%.',
      'Mapped 15+ CRM triggers into leasing workflows to streamline automation across teams.',
    ],
  },
]

const BackgroundGrid = () => (
  <div
    className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-20"
    style={{
      backgroundImage: `
        linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
      `,
      backgroundSize: '40px 40px',
    }}
  />
)

const WireframeSphere = ({ mousePosition }) => {
  const canvasRef = useRef(null)
  const mouseRef = useRef(mousePosition)

  useEffect(() => {
    mouseRef.current = mousePosition
  }, [mousePosition])

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')

    if (!canvas || !context) {
      return undefined
    }

    let animationFrameId
    let width = 0
    let height = 0

    const setSize = () => {
      width = window.innerWidth
      height = window.innerHeight
      const dpr = window.devicePixelRatio || 1

      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    setSize()
    window.addEventListener('resize', setSize)

    let rotationX = 0
    let rotationY = 0

    const draw = () => {
      context.clearRect(0, 0, width, height)

      const currentMouse = mouseRef.current
      const scrollY = window.scrollY || 0
      const scrollFade = Math.max(0, 1 - scrollY / (height * 0.8))

      if (scrollFade <= 0) {
        animationFrameId = window.requestAnimationFrame(draw)
        return
      }

      const mouseNormX = currentMouse.x === 0 ? 0 : (currentMouse.x / width) * 2 - 1
      const mouseNormY = currentMouse.y === 0 ? 0 : (currentMouse.y / height) * 2 - 1

      rotationX += 0.0015 + mouseNormY * 0.008
      rotationY += 0.002 + mouseNormX * 0.008

      const radius = width > 768 ? width * 0.19 : width * 0.4
      const centerX = width > 768 ? width * 0.87 : width * 0.5
      const centerY = width > 768 ? height * 0.38 - scrollY * 0.32 : height * 0.5 - scrollY * 0.4

      context.save()
      context.translate(centerX, centerY)
      context.strokeStyle = `rgba(255, 255, 255, ${0.15 * scrollFade})`
      context.lineWidth = 1
      context.fillStyle = `rgba(255, 255, 255, ${0.5 * scrollFade})`

      const numLats = 16
      const numLons = 32

      const rotatePoint = (x, y, z) => {
        const y1 = y * Math.cos(rotationX) - z * Math.sin(rotationX)
        const z1 = y * Math.sin(rotationX) + z * Math.cos(rotationX)
        const x2 = x * Math.cos(rotationY) + z1 * Math.sin(rotationY)
        const z2 = -x * Math.sin(rotationY) + z1 * Math.cos(rotationY)

        return { x: x2, y: y1, z: z2 }
      }

      const points = []

      for (let i = 0; i <= numLats; i += 1) {
        const latAngle = Math.PI * (i / numLats) - Math.PI / 2
        const y = Math.sin(latAngle) * radius
        const ringRadius = Math.cos(latAngle) * radius
        const ring = []

        for (let j = 0; j <= numLons; j += 1) {
          const lonAngle = 2 * Math.PI * (j / numLons)
          const x = Math.cos(lonAngle) * ringRadius
          const z = Math.sin(lonAngle) * ringRadius
          ring.push(rotatePoint(x, y, z))
        }

        points.push(ring)
      }

      for (let i = 0; i <= numLats; i += 1) {
        context.beginPath()

        for (let j = 0; j <= numLons; j += 1) {
          const point = points[i][j]
          const scale = 1000 / (1000 - point.z)
          const px = point.x * scale
          const py = point.y * scale

          if (j === 0) {
            context.moveTo(px, py)
          } else {
            context.lineTo(px, py)
          }
        }

        context.stroke()
      }

      for (let j = 0; j <= numLons; j += 1) {
        context.beginPath()

        for (let i = 0; i <= numLats; i += 1) {
          const point = points[i][j]
          const scale = 1000 / (1000 - point.z)
          const px = point.x * scale
          const py = point.y * scale

          if (i === 0) {
            context.moveTo(px, py)
          } else {
            context.lineTo(px, py)
          }

          if (i % 2 === 0 && j % 2 === 0) {
            context.fillRect(px - 1, py - 1, 2, 2)
          }
        }

        context.stroke()
      }

      context.restore()
      animationFrameId = window.requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('resize', setSize)
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-70"
    />
  )
}

const CustomCursor = ({ mousePosition, isHovering }) => {
  const [trailPosition, setTrailPosition] = useState({ x: 0, y: 0 })
  const targetRef = useRef(mousePosition)

  useEffect(() => {
    targetRef.current = mousePosition
  }, [mousePosition])

  useEffect(() => {
    let requestRef

    const updateTrail = () => {
      setTrailPosition((previous) => ({
        x: previous.x + (targetRef.current.x - previous.x) * 0.15,
        y: previous.y + (targetRef.current.y - previous.y) * 0.15,
      }))

      requestRef = window.requestAnimationFrame(updateTrail)
    }

    requestRef = window.requestAnimationFrame(updateTrail)

    return () => window.cancelAnimationFrame(requestRef)
  }, [])

  return (
    <>
      <div
        className="pointer-events-none fixed top-0 left-0 z-[100] h-1.5 w-1.5 rounded-full bg-white mix-blend-difference transition-opacity duration-200"
        style={{
          transform: `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0) translate(-50%, -50%)`,
          opacity: isHovering ? 0 : 1,
        }}
      />
      <div
        className="pointer-events-none fixed top-0 left-0 z-[99] rounded-full border border-white/40 mix-blend-difference transition-all duration-300 ease-out"
        style={{
          width: isHovering ? '64px' : '32px',
          height: isHovering ? '64px' : '32px',
          transform: `translate3d(${trailPosition.x}px, ${trailPosition.y}px, 0) translate(-50%, -50%)`,
          backgroundColor: isHovering ? 'rgba(255,255,255,0.1)' : 'transparent',
        }}
      />
    </>
  )
}

function App() {
  const mousePosition = useMousePosition()
  const [isHovering, setIsHovering] = useState(false)
  const [activeProject, setActiveProject] = useState(null)

  const [heroRef, heroVisible] = useScrollReveal({ threshold: 0.2 })
  const [experienceRef, experienceVisible] = useScrollReveal({ threshold: 0.1 })
  const [projectsRef, projectsVisible] = useScrollReveal({ threshold: 0.1 })

  const handleHover = () => setIsHovering(true)
  const handleLeave = () => setIsHovering(false)

  return (
    <div className="relative min-h-screen bg-[var(--bg-color)] text-[var(--text-color)] selection:bg-white selection:text-black">
      <WireframeSphere mousePosition={mousePosition} />
      <BackgroundGrid />

      <div className="hidden lg:block">
        <CustomCursor mousePosition={mousePosition} isHovering={isHovering} />
      </div>

      <div
        className={`pointer-events-none fixed top-0 left-0 z-40 hidden w-[380px] overflow-hidden rounded-md border border-white/10 bg-[#050505] shadow-2xl transition-all duration-300 ease-out lg:block ${
          activeProject !== null ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
        style={{
          transform: `translate3d(${mousePosition.x + 30}px, ${mousePosition.y - 150}px, 0)`,
        }}
      >
        {activeProject !== null && (
          <>
            <div className="relative h-[220px] w-full overflow-hidden border-b border-white/10">
              <div className="absolute inset-0 z-10 bg-black/30 transition-opacity duration-300" />
              <img
                src={projects[activeProject].image}
                alt={projects[activeProject].title}
                className="h-full w-full object-cover grayscale opacity-80"
                loading="lazy"
              />
            </div>
            <div className="flex flex-col gap-2 bg-[#0A0A0C] p-6">
              <h4 className="font-serif-display text-3xl tracking-tight text-white/90">
                {projects[activeProject].title}
              </h4>
              <p className="text-sm leading-relaxed font-light text-white/50">
                {projects[activeProject].shortDesc}
              </p>
              <a
                href={projects[activeProject].repoUrl}
                target="_blank"
                rel="noreferrer"
                className="pointer-events-auto mt-3 inline-flex w-fit items-center gap-2 text-xs font-mono-code uppercase tracking-[0.18em] text-white/70 transition-colors hover:text-white"
              >
                {projects[activeProject].isPrivate ? (
                  <Lock className="h-3.5 w-3.5" />
                ) : (
                  <GitHubMark className="h-3.5 w-3.5" />
                )}
                {projects[activeProject].repoLabel}
              </a>
              {projects[activeProject].liveUrl && (
                <a
                  href={projects[activeProject].liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="pointer-events-auto mt-2 inline-flex w-fit items-center gap-2 text-xs font-mono-code uppercase tracking-[0.18em] text-white/45 transition-colors hover:text-white"
                >
                  <ArrowUpRight className="h-3.5 w-3.5" />
                  Live site
                </a>
              )}
            </div>
          </>
        )}
      </div>

      <nav className="fixed top-0 z-50 flex w-full items-center justify-between border-b border-white/10 bg-[#030303]/80 p-6 backdrop-blur-md lg:px-12">
        <a
          href="#top"
          className="flex items-center gap-4"
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}
        >
          <LayoutGrid className="h-4 w-4 text-white/50" />
          <div className="font-serif-display text-2xl tracking-tight">M.S.</div>
        </a>

        <div className="hidden gap-8 md:flex">
          <a
            href="#projects"
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
            className="nav-link text-white/70 hover:text-white"
          >
            Projects
          </a>
          <a
            href="#experience"
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
            className="nav-link text-white/70 hover:text-white"
          >
            Experience
          </a>
          <a
            href="#contact"
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
            className="nav-link text-white/70 hover:text-white"
          >
            Contact
          </a>
        </div>

        <div className="flex gap-5 md:gap-8">
          <a
            href="mailto:mananhshah04@gmail.com"
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
            className="nav-link text-white/70 hover:text-white"
          >
            Email
          </a>
          <a
            href="https://github.com/Manan1121"
            target="_blank"
            rel="noreferrer"
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
            className="nav-link text-white/70 hover:text-white"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/manan-shah12"
            target="_blank"
            rel="noreferrer"
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
            className="nav-link text-white/70 hover:text-white"
          >
            LinkedIn
          </a>
        </div>
      </nav>

      <main className="relative z-10 mx-auto w-full pt-24">
        <section
          id="top"
          ref={heroRef}
          className="flex min-h-[85vh] flex-col justify-center px-6 lg:px-12"
        >
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.06fr)_minmax(360px,0.88fr)] lg:gap-8 xl:gap-14">
            <div className="max-w-5xl">
              <p
                className={`mb-8 text-xs font-mono-code uppercase tracking-[0.2em] text-white/50 transition-all duration-1000 ${
                  heroVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
              >
                Portfolio // Rutgers University &apos;25
              </p>

              <h1
                className={`font-serif-display text-6xl leading-[0.9] tracking-tight transition-all delay-100 duration-1000 md:text-8xl lg:text-[8rem] xl:text-9xl ${
                  heroVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
              >
                Manan Shah.
                <br />
                <span className="text-5xl italic text-white/40 md:text-7xl lg:text-[6.2rem] xl:text-8xl">
                  IT / Software Engineer.
                </span>
              </h1>

              <div
                className={`mt-16 flex flex-col gap-12 border-t border-white/10 pt-8 transition-all delay-300 duration-1000 md:flex-row ${
                  heroVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
              >
                <div className="md:w-1/2">
                  <p className="mb-3 text-xs font-mono-code uppercase tracking-widest text-white/40">
                    Identity
                  </p>
                  <p className="text-lg leading-relaxed font-light text-white/80">
                    Software developer and data scientist building backend systems, full-stack
                    applications, and automated data pipelines with a product mindset.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-4">
                    <a
                      href="#projects"
                      onMouseEnter={handleHover}
                      onMouseLeave={handleLeave}
                      className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-xs font-mono-code uppercase tracking-[0.2em] text-white transition-colors hover:bg-white hover:text-black"
                    >
                      View Work
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                    <a
                      href="mailto:mananhshah04@gmail.com"
                      onMouseEnter={handleHover}
                      onMouseLeave={handleLeave}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-xs font-mono-code uppercase tracking-[0.2em] text-white/70 transition-colors hover:border-white/30 hover:text-white"
                    >
                      Email Me
                    </a>
                  </div>
                </div>

                <div className="flex gap-12 md:w-1/2">
                  <div>
                    <p className="mb-3 text-xs font-mono-code uppercase tracking-widest text-white/40">
                      Location
                    </p>
                    <p className="text-lg font-light">New Brunswick, NJ</p>
                  </div>
                  <div>
                    <p className="mb-3 text-xs font-mono-code uppercase tracking-widest text-white/40">
                      Status
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                      <p className="text-lg font-light">Available 2026</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`relative mx-auto w-full max-w-[420px] transition-all delay-200 duration-1000 lg:-translate-y-24 lg:mx-0 lg:translate-x-4 xl:-translate-y-28 ${
                heroVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
            >
              <div className="pointer-events-none absolute inset-x-[2%] top-[0%] h-[58%] rounded-full bg-[radial-gradient(circle,rgba(72,106,168,0.28),rgba(22,30,46,0.14)_42%,transparent_78%)] blur-3xl" />
              <div className="pointer-events-none absolute inset-x-[22%] bottom-[8%] h-24 bg-[radial-gradient(circle,rgba(255,255,255,0.1),transparent_70%)] blur-2xl" />
              <div className="pointer-events-none absolute -left-10 top-[2%] h-[78%] w-28 bg-gradient-to-r from-[var(--bg-color)] via-[rgba(3,3,3,0.92)] to-transparent blur-xl" />
              <div className="pointer-events-none absolute -right-8 top-[4%] h-[68%] w-16 bg-gradient-to-l from-[var(--bg-color)] via-[rgba(3,3,3,0.48)] to-transparent blur-md" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-22 bg-gradient-to-t from-[var(--bg-color)] via-[rgba(3,3,3,0.72)] to-transparent" />

              <div className="relative overflow-hidden">
                <img
                  src="/manan-portrait.png"
                  alt="Portrait of Manan Shah"
                  className="relative z-10 h-full min-h-[450px] w-full scale-[1.06] object-cover object-[center_6%] brightness-[1.12] contrast-[1.12] saturate-[0.88] mix-blend-screen lg:min-h-[560px] lg:scale-[1.08] lg:object-[center_0%]"
                  style={{
                    maskImage:
                      'radial-gradient(circle at 52% 34%, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 28%, rgba(0,0,0,0.96) 48%, rgba(0,0,0,0.68) 62%, rgba(0,0,0,0.2) 78%, rgba(0,0,0,0) 92%), linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,1) 10%, rgba(0,0,0,1) 68%, rgba(0,0,0,0.32) 88%, rgba(0,0,0,0) 100%)',
                    WebkitMaskImage:
                      'radial-gradient(circle at 52% 34%, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 28%, rgba(0,0,0,0.96) 48%, rgba(0,0,0,0.68) 62%, rgba(0,0,0,0.2) 78%, rgba(0,0,0,0) 92%), linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,1) 10%, rgba(0,0,0,1) 68%, rgba(0,0,0,0.32) 88%, rgba(0,0,0,0) 100%)',
                  }}
                />
                <div className="pointer-events-none absolute inset-0 z-20 bg-[linear-gradient(90deg,rgba(3,3,3,0.96)_0%,rgba(3,3,3,0.24)_16%,rgba(3,3,3,0)_38%,rgba(3,3,3,0)_70%,rgba(3,3,3,0.22)_100%)]" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-24 bg-[linear-gradient(180deg,transparent,rgba(3,3,3,0.1)_38%,rgba(3,3,3,0.9)_100%)]" />
              </div>
            </div>
          </div>
        </section>

        <section className="flex w-full flex-col border-y border-white/10 bg-[#050505]">
          <div className="relative flex h-16 overflow-hidden border-b border-white/10">
            <div className="absolute top-0 bottom-0 left-0 z-20 flex w-32 items-center border-r border-white/10 bg-[#0A0A0C] px-6 shadow-[10px_0_20px_rgba(0,0,0,0.5)] md:w-48">
              <span className="flex items-center gap-2 text-xs font-mono-code uppercase tracking-widest text-white/40">
                <Braces className="h-3 w-3" /> Stack
              </span>
            </div>
            <div className="flex flex-1 items-center pl-32 md:pl-48">
              <div className="animate-marquee-left flex">
                {[0, 1].map((rowIndex) => (
                  <div key={`left-${rowIndex}`} className="flex items-center gap-12 px-6">
                    {hardStack.map((skill) => (
                      <span
                        key={`${rowIndex}-${skill}`}
                        className="text-sm font-mono-code uppercase tracking-wider text-white/80"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative flex h-16 overflow-hidden">
            <div className="absolute top-0 bottom-0 left-0 z-20 flex w-32 items-center border-r border-white/10 bg-[#0A0A0C] px-6 shadow-[10px_0_20px_rgba(0,0,0,0.5)] md:w-48">
              <span className="flex items-center gap-2 text-xs font-mono-code uppercase tracking-widest text-white/40">
                <Database className="h-3 w-3" /> Architecture
              </span>
            </div>
            <div className="flex flex-1 items-center pl-32 md:pl-48">
              <div className="animate-marquee-right flex">
                {[0, 1].map((rowIndex) => (
                  <div key={`right-${rowIndex}`} className="flex items-center gap-12 px-6">
                    {conceptualStack.map((concept) => (
                      <span
                        key={`${rowIndex}-${concept}`}
                        className="font-serif-display text-2xl italic tracking-wide text-white/60"
                      >
                        {concept}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="experience" ref={experienceRef} className="px-6 py-32 lg:px-12">
          <div className="flex flex-col gap-16 md:flex-row">
            <div className="md:w-1/3">
              <h2 className="font-serif-display text-5xl leading-none md:text-7xl">
                Industry
                <br />
                <span className="italic text-white/30">Timeline</span>
              </h2>
            </div>

            <div className="flex w-full flex-col md:w-2/3">
              {experience.map((item, index) => (
                <div
                  key={item.company}
                  onMouseEnter={handleHover}
                  onMouseLeave={handleLeave}
                  className={`group relative flex flex-col border-t border-white/10 py-10 transition-all duration-700 ${
                    experienceVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="mb-6 flex flex-col items-start justify-between gap-4 lg:flex-row">
                    <div>
                      <h3 className="mb-1 text-lg text-white font-mono-code">{item.company}</h3>
                      <p className="text-sm font-medium uppercase tracking-widest text-white/50">
                        {item.role}
                      </p>
                    </div>
                    <span className="rounded-sm border border-white/10 px-3 py-1 text-xs text-white/40 font-mono-code">
                      {item.date}
                    </span>
                  </div>
                  <ul className="space-y-4 font-light text-white/70">
                    {item.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-4">
                        <span className="mt-1 text-white/20 font-mono-code">/</span>
                        <span className="leading-relaxed">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="projects"
          ref={projectsRef}
          className="border-t border-white/10 bg-[#050505] px-6 py-32 lg:px-12"
        >
          <div className="mb-24 flex flex-col items-end justify-between gap-8 md:flex-row">
            <h2 className="font-serif-display text-6xl leading-none md:text-8xl">
              Systems &
              <br />
              <span className="italic text-white/30">Architecture</span>
            </h2>
            <p className="max-w-[200px] text-right text-xs font-mono-code uppercase tracking-widest text-white/40">
              Selected engineering artifacts 2024-2026.
            </p>
          </div>

          <div className="grid w-full grid-cols-1 border-t border-white/10">
            {projects.map((project, index) => (
              <article
                key={project.title}
                onMouseEnter={() => {
                  handleHover()
                  setActiveProject(index)
                }}
                onMouseLeave={() => {
                  handleLeave()
                  setActiveProject(null)
                }}
                className={`group relative -mx-4 flex w-full flex-col items-start justify-between border-b border-white/10 px-4 py-12 transition-all duration-700 hover:bg-white/[0.02] md:flex-row md:items-center ${
                  projectsVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="flex w-full flex-col gap-8 md:w-3/4 md:flex-row md:items-center">
                  <span className="text-sm text-white/20 font-mono-code">0{index + 1}</span>
                  <div>
                    <h3 className="mb-3 text-4xl tracking-tight transition-all group-hover:italic md:text-5xl font-serif-display">
                      {project.title}
                    </h3>
                    <p className="mb-4 text-xs font-mono-code uppercase tracking-wider text-white/40">
                      {project.tech}
                    </p>
                    <p className="hidden max-w-xl leading-relaxed font-light text-white/60 md:block">
                      {project.desc}
                    </p>
                    <p className="max-w-xl leading-relaxed font-light text-white/60 md:hidden">
                      {project.shortDesc}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-6 md:mt-0">
                  <span className="text-xs text-white/30 font-mono-code">{project.year}</span>
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={handleHover}
                    onMouseLeave={handleLeave}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-[11px] font-mono-code uppercase tracking-[0.18em] text-white/70 transition-colors hover:border-white/40 hover:text-white"
                    aria-label={`${project.title} repository`}
                  >
                    {project.isPrivate ? (
                      <Lock className="h-3.5 w-3.5" />
                    ) : (
                      <GitHubMark className="h-3.5 w-3.5" />
                    )}
                    Source
                  </a>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      onMouseEnter={handleHover}
                      onMouseLeave={handleLeave}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-all duration-300 hover:bg-white hover:text-black"
                      aria-label={`${project.title} live site`}
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <footer
          id="contact"
          className="flex flex-col items-center justify-center border-t border-white/10 py-32 text-center"
        >
          <p className="mb-8 text-xs font-mono-code uppercase tracking-[0.3em] text-white/40">
            Start a Conversation
          </p>

          <a
            href="mailto:mananhshah04@gmail.com"
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
            className="group relative overflow-hidden"
          >
            <h2 className="font-serif-display text-7xl tracking-tight transition-transform duration-500 group-hover:italic group-hover:text-white/80 md:text-9xl">
              Reach Out.
            </h2>
            <div className="absolute bottom-2 left-0 h-[2px] w-full origin-left scale-x-0 bg-white transition-transform duration-500 ease-[cubic-bezier(0.86,0,0.07,1)] group-hover:scale-x-100" />
          </a>

          <div className="mt-32 flex w-full flex-col items-center justify-between px-6 text-xs font-mono-code uppercase tracking-widest text-white/40 md:flex-row lg:px-12">
            <div className="mb-4 md:mb-0">Software Engineer // Manan Shah</div>
            <div className="flex gap-8">
              <a
                href="https://github.com/Manan1121"
                className="transition-colors hover:text-white"
                onMouseEnter={handleHover}
                onMouseLeave={handleLeave}
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/manan-shah12"
                className="transition-colors hover:text-white"
                onMouseEnter={handleHover}
                onMouseLeave={handleLeave}
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}

export default App
