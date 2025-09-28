// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    mobileMenu.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
    } else {
        navbar.style.background = 'transparent';
        navbar.style.backdropFilter = 'none';
        navbar.style.borderBottom = 'none';
    }
});

// Active Navigation Link Highlighting
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Spline 3D Robot Integration with Enhanced Animation
document.addEventListener('DOMContentLoaded', function() {
    const splineViewer = document.querySelector('spline-viewer');
    
    if (splineViewer) {
        console.log('Spline viewer found, initializing...');
        
        // Ensure Spline viewer is immediately visible
        splineViewer.style.opacity = '1';
        splineViewer.style.visibility = 'visible';
        
        // Multiple methods to trigger animations
        const triggerAnimations = () => {
            console.log('Attempting to trigger Spline animations...');
            
            // Method 1: Direct spline object access
            try {
                if (splineViewer.spline) {
                    console.log('Spline object found, triggering animations...');
                    
                    // Try common animation names
                    const animations = ['zoomOut', 'rotate', 'idle', 'default', 'animation'];
                    animations.forEach(anim => {
                        try {
                            splineViewer.spline.triggerEvent(anim);
                            console.log(`Animation '${anim}' triggered successfully`);
                        } catch (e) {
                            console.log(`Animation '${anim}' failed:`, e.message);
                        }
                    });
                }
            } catch (e) {
                console.log('Method 1 failed:', e);
            }
            
            // Method 2: Custom event dispatch
            try {
                splineViewer.dispatchEvent(new CustomEvent('spline-trigger', { 
                    detail: { action: 'play', animation: 'zoomOut' }
                }));
                console.log('Custom event dispatched');
            } catch (e) {
                console.log('Method 2 failed:', e);
            }
            
            // Method 3: Try to access internal spline methods
            try {
                if (splineViewer._spline) {
                    console.log('Internal spline object found');
                    // Try to trigger any available animations
                    if (splineViewer._spline.triggerEvent) {
                        splineViewer._spline.triggerEvent('zoomOut');
                    }
                }
            } catch (e) {
                console.log('Method 3 failed:', e);
            }
        };
        
        // Handle Spline loading
        splineViewer.addEventListener('load', function() {
            console.log('Spline 3D robot loaded successfully');
            triggerAnimations();
        });
        
        // Also try after a delay in case load event doesn't fire
        setTimeout(() => {
            console.log('Delayed animation trigger attempt');
            triggerAnimations();
        }, 2000);
        
        // Try again after longer delay
        setTimeout(() => {
            console.log('Final animation trigger attempt');
            triggerAnimations();
        }, 5000);
        
        // Force visibility
        setTimeout(() => {
            splineViewer.style.opacity = '1';
            splineViewer.style.visibility = 'visible';
        }, 100);
        
        // Add interaction events
        splineViewer.addEventListener('mouseenter', function() {
            console.log('Mouse entered 3D robot area');
            // Try to trigger hover animations
            try {
                if (splineViewer.spline) {
                    splineViewer.spline.triggerEvent('hover');
                }
            } catch (e) {
                console.log('Hover animation failed:', e);
            }
        });
        
        splineViewer.addEventListener('click', function() {
            console.log('3D robot clicked');
            // Try to trigger click animations
            try {
                if (splineViewer.spline) {
                    splineViewer.spline.triggerEvent('click');
                }
            } catch (e) {
                console.log('Click animation failed:', e);
            }
        });
        
        // Monitor for any spline events
        splineViewer.addEventListener('spline-event', function(e) {
            console.log('Spline event received:', e.detail);
        });
    } else {
        console.log('Spline viewer not found');
    }
});

// Intersection Observer for Fade-in Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.project-card, .education-item, .experience-item, .achievement-item, .skill-tag');
    animateElements.forEach(el => {
        observer.observe(el);
    });
});

// Counter Animation for Achievement Numbers
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + (target.toString().includes('%') ? '%' : '');
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Trigger counter animations when achievements come into view
const achievementObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const numberElement = entry.target.querySelector('.achievement-number');
            const text = numberElement.textContent;
            
            // Extract numeric value
            const numericValue = parseFloat(text.replace(/[^\d.-]/g, ''));
            
            if (numericValue) {
                animateCounter(numberElement, text);
            }
            
            achievementObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', function() {
    const achievements = document.querySelectorAll('.achievement-item');
    achievements.forEach(achievement => {
        achievementObserver.observe(achievement);
    });
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-text-overlay');
    
    if (heroContent) {
        const rate = scrolled * -0.5;
        heroContent.style.transform = `translate(-50%, calc(-50% + ${rate}px))`;
    }
});

// Typing Effect for Hero Title (Optional - can be enabled)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Form Validation and Enhancement
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Create mailto link
            const mailtoLink = `mailto:deepakananth2001@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Show success message
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.background = '#00ff88';
            submitBtn.style.color = '#0a0a0a';
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = 'transparent';
                submitBtn.style.color = '#ffffff';
                this.reset();
            }, 3000);
        });
    }
});

// Skill Tags Hover Effect
document.addEventListener('DOMContentLoaded', function() {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Project Cards 3D Tilt Effect
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
});

// Loading Animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Trigger hero animations
    const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-stats, .hero-tagline');
    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Preload critical resources
document.addEventListener('DOMContentLoaded', function() {
    // Preload fonts
    const fontLinks = [
        'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Inter:wght@300;400;500;600;700&display=swap'
    ];
    
    fontLinks.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = href;
        document.head.appendChild(link);
    });
});

// Performance optimization: Lazy load non-critical elements
const lazyElements = document.querySelectorAll('[data-lazy]');
const lazyObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            element.src = element.dataset.lazy;
            element.classList.remove('lazy');
            lazyObserver.unobserve(element);
        }
    });
});

lazyElements.forEach(element => {
    lazyObserver.observe(element);
});

// Error handling for Spline viewer
window.addEventListener('error', function(e) {
    if (e.message.includes('spline') || e.message.includes('Spline')) {
        console.warn('Spline 3D viewer encountered an error:', e.message);
        // Fallback: ensure robot background is still visible
        const robotBackground = document.querySelector('.hero-robot-background');
        if (robotBackground) {
            robotBackground.style.background = 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)';
        }
    }
});

console.log('Portfolio website JavaScript loaded successfully!');