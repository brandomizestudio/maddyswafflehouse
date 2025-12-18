// Maddy's Waffle House - Modern Minimalist JS

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

// DOM Elements
const header = document.querySelector('.header');
const mobileToggle = document.querySelector('.mobile-toggle');
const navList = document.querySelector('.nav__list');

// Header Scroll Effect - Optimized with requestAnimationFrame
let lastScroll = 0;
let ticking = false;

window.addEventListener('scroll', () => {
    lastScroll = window.pageYOffset;

    if (!ticking) {
        window.requestAnimationFrame(() => {
            if (lastScroll > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            ticking = false;
        });

        ticking = true;
    }
});

// Mobile Menu Toggle
if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        navList.classList.toggle('active');
        mobileToggle.classList.toggle('active');
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navList.classList.contains('active')) {
                navList.classList.remove('active');
                mobileToggle.classList.remove('active');
            }
        }
    });
});

// GSAP Animations

// Hero Section Animation
const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

heroTimeline
    .from('.hero__label', {
        y: 30,
        opacity: 0,
        duration: 0.8
    })
    .from('.hero__title', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2
    }, '-=0.4')
    .from('.hero__text', {
        y: 30,
        opacity: 0,
        duration: 0.8
    }, '-=0.6')
    .from('.hero__cta .btn', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15
    }, '-=0.4')
    .from('.hero__image', {
        x: 100,
        opacity: 0,
        duration: 1.2
    }, '-=1.2')
    .from('.hero__scroll', {
        opacity: 0,
        duration: 0.8
    }, '-=0.4');

// Section Animations
gsap.utils.toArray('.section').forEach(section => {
    const elements = section.querySelectorAll('.section__label, .section__title, .section__text');
    
    gsap.from(elements, {
        scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
    });
});

// Menu Items Animation
gsap.utils.toArray('.menu__item').forEach((item, index) => {
    gsap.from(item, {
        scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none none'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.1,
        ease: 'power3.out'
    });
});

// Features Animation
gsap.utils.toArray('.feature').forEach((feature, index) => {
    gsap.from(feature, {
        scrollTrigger: {
            trigger: feature,
            start: 'top 85%',
            toggleActions: 'play none none none'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.15,
        ease: 'power3.out'
    });
});

// About Section Animation
const aboutTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: '.about',
        start: 'top 70%',
        toggleActions: 'play none none none'
    }
});

aboutTimeline
    .from('.about__images .about__image', {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
    })
    .from('.about__content > *', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
    }, '-=0.6');

// Parallax effect for hero image - Optimized
gsap.to('.hero__img', {
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 0.5 // Smoother scrubbing
    },
    y: 100,
    ease: 'none',
    force3D: true // Force GPU acceleration
});

// CTA Banner Animation
const ctaTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: '.cta-banner',
        start: 'top 75%',
        toggleActions: 'play none none none'
    }
});

ctaTimeline
    .from('.cta-banner__title', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    })
    .from('.cta-banner__text', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.4')
    .from('.cta-banner__buttons .btn', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out'
    }, '-=0.4');

// Gallery Animation
gsap.utils.toArray('.gallery__item').forEach((item, index) => {
    gsap.from(item, {
        scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none none'
        },
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.08,
        ease: 'power3.out'
    });
});

// Footer Animation
gsap.from('.footer__content > *', {
    scrollTrigger: {
        trigger: '.footer',
        start: 'top 80%',
        toggleActions: 'play none none none'
    },
    y: 40,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power3.out'
});

// Cursor effect - Removed for performance
// The custom cursor was causing significant layout thrashing and repaint issues
// causing the site to feel laggy. Default cursor provides the smoothest experience.

// Lazy loading images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add loading state
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Full Menu Modal Logic
const modal = document.getElementById('menuModal');
const viewMenuBtns = document.querySelectorAll('.view-menu-btn');
const closeBtn = document.querySelector('.modal__close');

if (modal && viewMenuBtns.length > 0 && closeBtn) {
    viewMenuBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}
