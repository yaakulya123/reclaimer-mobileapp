// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Custom Cursor Glow
const glow = document.querySelector('.cursor-glow');
document.addEventListener('mousemove', (e) => {
    // Add a slight delay/smoothness if desired, but CSS transition handles it well
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
});

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Hero Animations
const tl = gsap.timeline();

tl.from('.navbar', {
    y: -100,
    opacity: 0,
    duration: 1,
    ease: 'power4.out'
})
    .from('.badge', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out'
    }, '-=0.5')
    .from('.hero-title', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.4')
    .from('.hero-subtitle', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.6')
    .from('.hero-buttons', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.6')
    .from('.stats-row', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.6')
    .from('.hero-visual', {
        x: 50,
        opacity: 0,
        duration: 1,
        ease: 'power2.out'
    }, '-=1');

// Feature Cards Animation
gsap.from('.feature-card', {
    scrollTrigger: {
        trigger: '.features-grid',
        start: 'top 80%',
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power2.out'
});

// How It Works Steps
const steps = document.querySelectorAll('.step-row');
steps.forEach((step, index) => {
    const isOdd = index % 2 !== 0; // Reverse logic because first item is index 0
    // Actually, based on layout:
    // Left text, Right image
    // Right text, Left image (reverse)

    // We want visuals to slide in
    const visual = step.querySelector('.step-visual');
    const text = step.querySelector('.step-text');

    gsap.from(visual, {
        scrollTrigger: {
            trigger: step,
            start: 'top 75%',
        },
        x: isOdd ? -50 : 50, // if reverse row (1), visual is on left, so slide from left
        opacity: 0,
        duration: 1,
        ease: 'power2.out'
    });

    gsap.from(text, {
        scrollTrigger: {
            trigger: step,
            start: 'top 75%',
        },
        x: isOdd ? 30 : -30,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        delay: 0.2
    });
});

// CTA Animation
gsap.from('.cta-content', {
    scrollTrigger: {
        trigger: '.cta-section',
        start: 'top 80%',
    },
    scale: 0.95,
    opacity: 0,
    duration: 0.8,
    ease: 'back.out(1.7)'
});

// Initialize Vanilla Tilt
VanillaTilt.init(document.querySelectorAll(".glass"), {
    max: 10,
    speed: 400,
    glare: true,
    "max-glare": 0.1,
    scale: 1.02
});
