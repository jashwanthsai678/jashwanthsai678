// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('.section, .project-card-3d, .skill-category-card, .achievement-card-modern').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    observer.observe(el);
});

// 3D card tilt effect
document.querySelectorAll('.project-card-3d').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        const inner = card.querySelector('.project-card-inner');
        inner.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
        const inner = card.querySelector('.project-card-inner');
        inner.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
});

// Parallax effect for floating shapes
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.05;
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Smooth number counter animation
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + (element.dataset.suffix || '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + (element.dataset.suffix || '');
        }
    }, 16);
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const numbers = entry.target.querySelectorAll('.stat-number');
            numbers.forEach(number => {
                const target = parseInt(number.textContent);
                if (!isNaN(target)) {
                    number.dataset.suffix = number.textContent.replace(/[0-9]/g, '');
                    animateCounter(number, target);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// Cursor trail effect (optional - can be removed for performance)
const createTrail = () => {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.cssText = `
        position: fixed;
        width: 6px;
        height: 6px;
        background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        opacity: 0.6;
        transition: all 0.3s ease;
    `;
    document.body.appendChild(trail);
    
    setTimeout(() => {
        trail.style.opacity = '0';
        trail.style.transform = 'scale(0)';
        setTimeout(() => trail.remove(), 300);
    }, 500);
};

let trailTimeout;
document.addEventListener('mousemove', (e) => {
    clearTimeout(trailTimeout);
    trailTimeout = setTimeout(() => {
        if (Math.random() > 0.9) {
            const trail = document.createElement('div');
            trail.style.cssText = `
                position: fixed;
                left: ${e.clientX}px;
                top: ${e.clientY}px;
                width: 4px;
                height: 4px;
                background: var(--color-primary);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                opacity: 0.8;
                transform: translate(-50%, -50%);
            `;
            document.body.appendChild(trail);
            
            setTimeout(() => {
                trail.style.transition = 'all 0.5s ease-out';
                trail.style.opacity = '0';
                trail.style.transform = 'translate(-50%, -50%) scale(0)';
                setTimeout(() => trail.remove(), 500);
            }, 50);
        }
    }, 10);
});

// Add hover effect to skill items
document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(10px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0) scale(1)';
    });
});

// Contact bar hide on scroll down, show on scroll up
let lastScrollTop = 0;
const contactBar = document.querySelector('.contact-bar');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 500) {
        // Scrolling down
        if (contactBar) {
            contactBar.style.transform = 'translateX(-50%) translateY(150px)';
            contactBar.style.opacity = '0';
        }
    } else {
        // Scrolling up
        if (contactBar) {
            contactBar.style.transform = 'translateX(-50%) translateY(0)';
            contactBar.style.opacity = '1';
        }
    }
    
    lastScrollTop = scrollTop;
}, false);

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Easter egg: Konami code
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join('') === konamiPattern.join('')) {
        // Activate party mode
        document.body.style.animation = 'rainbow 2s infinite';
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        setTimeout(() => {
            document.body.style.animation = '';
            style.remove();
        }, 5000);
    }
});

// Copy email to clipboard functionality
document.querySelectorAll('.contact-item[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', (e) => {
        if (e.shiftKey) {
            e.preventDefault();
            const email = link.href.replace('mailto:', '');
            navigator.clipboard.writeText(email).then(() => {
                // Show tooltip
                const tooltip = document.createElement('div');
                tooltip.textContent = 'Email copied!';
                tooltip.style.cssText = `
                    position: fixed;
                    left: 50%;
                    top: 20px;
                    transform: translateX(-50%);
                    background: var(--color-success);
                    color: white;
                    padding: 12px 24px;
                    border-radius: 8px;
                    font-weight: 600;
                    z-index: 10000;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                `;
                document.body.appendChild(tooltip);
                
                setTimeout(() => {
                    tooltip.style.transition = 'all 0.3s ease';
                    tooltip.style.opacity = '0';
                    tooltip.style.transform = 'translateX(-50%) translateY(-20px)';
                    setTimeout(() => tooltip.remove(), 300);
                }, 2000);
            });
        }
    });
});

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Typing effect for dynamic text (optional enhancement)
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Progress bar animation for skills
const skillItems = document.querySelectorAll('.skill-item');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

skillItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    item.style.transition = `all 0.5s ease ${index * 0.1}s`;
    skillObserver.observe(item);
});

console.log('%c✨ Welcome to my portfolio! ✨', 'font-size: 20px; color: #6366f1; font-weight: bold;');
console.log('%cInterested in the code? Let\'s connect!', 'font-size: 14px; color: #8b5cf6;');
console.log('%c📧 jashwanthsai678@gmail.com', 'font-size: 12px; color: #06b6d4;');
