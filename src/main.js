const canvas = document.getElementById('binary-canvas')
const hero = document.getElementById('hero')
const ctx = canvas.getContext('2d')
const DPR = Math.min(window.devicePixelRatio || 1, 2)
const BIN = ['0', '1']
const NOTES = ['♩', '♪', '♫', '♬']
const COUNT = 130
let W = 0
let H = 0

function resize() {
  W = hero.clientWidth
  H = hero.clientHeight
  canvas.width = W * DPR
  canvas.height = H * DPR
  canvas.style.width = W + 'px'
  canvas.style.height = H + 'px'
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
}
window.addEventListener('resize', resize)
resize()

const ease = (t) => t * t * (3 - 2 * t)

class Particle {
  constructor() {
    this.spawn(true)
  }

  spawn(init) {
    this.x = Math.random() * W
    this.fall = init ? Math.random() * H : -30
    this.speed = 0.35 + Math.random() * 1.5
    this.size = 11 + Math.random() * 15
    this.alpha = 0.15 + Math.random() * 0.45
    this.line = (Math.random() * 5) | 0
    this.offset = (Math.random() - 0.5) * Math.min(W * 0.55, 420)
    this.note = NOTES[(Math.random() * NOTES.length) | 0]
    this.bin = BIN[Math.random() < 0.5 ? 0 : 1]
  }

  draw(p) {
    const centerY = H * 0.52
    const gap = 20
    const tx = W / 2 + this.offset
    const ty = centerY + (this.line - 2) * gap
    if (p < 0.99) this.fall += this.speed
    if (this.fall > H + 40) this.spawn(false)
    const t = ease(p)
    const x = this.x + (tx - this.x) * t
    const y = this.fall + (ty - this.fall) * t
    const isNote = p > 0.55
    ctx.globalAlpha = isNote ? 0.55 + 0.45 * this.alpha : this.alpha
    ctx.fillStyle = isNote ? '#e3bd6a' : '#5adbb4'
    ctx.font = this.size + 'px "Courier New", monospace'
    ctx.fillText(isNote ? this.note : this.bin, x, y)
  }
}

const particles = Array.from({ length: COUNT }, () => new Particle())

function drawStaff(p) {
  if (p < 0.05) return
  const centerY = H * 0.52
  const gap = 20
  ctx.globalAlpha = Math.min((p - 0.05) * 2, 0.5)
  ctx.strokeStyle = '#cbb27a'
  ctx.lineWidth = 1
  for (let i = -2; i <= 2; i++) {
    const y = centerY + i * gap
    ctx.beginPath()
    ctx.moveTo(W * 0.12, y)
    ctx.lineTo(W * 0.88, y)
    ctx.stroke()
  }
}

let scrollP = 0
function readScroll() {
  scrollP = Math.min(Math.max(window.scrollY / (H * 0.9), 0), 1)
}
window.addEventListener('scroll', readScroll, { passive: true })
readScroll()

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

function frame() {
  ctx.clearRect(0, 0, W, H)
  drawStaff(scrollP)
  for (const pt of particles) pt.draw(scrollP)
  if (!reduced) requestAnimationFrame(frame)
}

if (reduced) {
  scrollP = 1
  frame()
} else {
  frame()
}

const io = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add('visible')
        io.unobserve(e.target)
      }
    }
  },
  { threshold: 0.15 }
)
document.querySelectorAll('.reveal').forEach((el) => io.observe(el))

const nav = document.getElementById('nav')
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40)
window.addEventListener('scroll', onScroll, { passive: true })
onScroll()

const chordBtn = document.getElementById('play-chord')
if (chordBtn) {
  chordBtn.addEventListener('click', () => {
    const AC = window.AudioContext || window.webkitAudioContext
    if (!AC) return
    const audio = new AC()
    const now = audio.currentTime
    const freqs = [130.81, 164.81, 196.0, 246.94, 293.66]
    freqs.forEach((f, i) => {
      const osc = audio.createOscillator()
      const gain = audio.createGain()
      osc.type = 'triangle'
      osc.frequency.value = f
      const t0 = now + i * 0.04
      gain.gain.setValueAtTime(0, t0)
      gain.gain.linearRampToValueAtTime(0.12, t0 + 0.06)
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 3.2)
      osc.connect(gain).connect(audio.destination)
      osc.start(t0)
      osc.stop(t0 + 3.4)
    })
  })
}

document.getElementById('year').textContent = new Date().getFullYear()
