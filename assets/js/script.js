// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Utility: fallback avatar for endorsement logos
    window.createLogoFallback = function(text) {
        const span = document.createElement('span');
        span.className = 'endorsement-logo-fallback';
        span.textContent = text;
        return span;
    };
    // Projects: horizontal scroll (no view-more needed)
    const grid = document.getElementById('projects-grid');
    if (grid) {
        // Enable mouse-wheel horizontal scroll on trackpads
        grid.addEventListener('wheel', (e) => {
            if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                grid.scrollLeft += e.deltaY;
                e.preventDefault();
            }
        }, { passive: false });

        // Auto-scroll in an infinite loop at a readable pace
        let scrollSpeed = 1.2; // pixels per frame (~72px/sec at 60fps)
        let rafId;
        let intervalId;
        function startAutoScroll() {
            cancelAnimationFrame(rafId);
            clearInterval(intervalId);
            function step() {
                grid.scrollLeft += scrollSpeed;
                // Loop seamlessly: when near end, jump back to start
                if (grid.scrollLeft + grid.clientWidth >= grid.scrollWidth - 1) {
                    grid.scrollLeft = 0;
                }
                rafId = requestAnimationFrame(step);
            }
            rafId = requestAnimationFrame(step);
            // Fallback timer in case RAF is throttled
            intervalId = setInterval(() => {
                grid.scrollLeft += scrollSpeed;
                if (grid.scrollLeft + grid.clientWidth >= grid.scrollWidth - 1) {
                    grid.scrollLeft = 0;
                }
            }, 1000 / 60);
        }

        // Pause on hover/focus for readability; resume on leave
        grid.addEventListener('mouseenter', () => { cancelAnimationFrame(rafId); clearInterval(intervalId); });
        grid.addEventListener('mouseleave', startAutoScroll);
        grid.addEventListener('focusin', () => { cancelAnimationFrame(rafId); clearInterval(intervalId); });
        grid.addEventListener('focusout', startAutoScroll);

        // Start after initial load
        startAutoScroll();
    }
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

// Show More Projects functionality
document.addEventListener('DOMContentLoaded', function() {
    const showMoreBtn = document.getElementById('showMoreBtn');
    const additionalProjects = document.querySelectorAll('.additional-project');
    let isExpanded = false;

    if (showMoreBtn) {
        showMoreBtn.addEventListener('click', function() {
            isExpanded = !isExpanded;
            
            additionalProjects.forEach((project, index) => {
                if (isExpanded) {
                    project.classList.add('show');
                } else {
                    project.classList.remove('show');
                }
            });

            // Update button text and icon
            const btnText = showMoreBtn.querySelector('.btn-text');
            const btnIcon = showMoreBtn.querySelector('.btn-icon');
            
            if (isExpanded) {
                btnText.textContent = 'Show Less Projects';
                showMoreBtn.classList.add('expanded');
            } else {
                btnText.textContent = 'Show More Projects';
                showMoreBtn.classList.remove('expanded');
            }
        });
    }
});

// Copy functionality for contact section
document.addEventListener('DOMContentLoaded', function() {
    // Individual copy buttons
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', async function() {
            const textToCopy = this.getAttribute('data-copy');
            
            try {
                await navigator.clipboard.writeText(textToCopy);
                
                // Visual feedback
                this.classList.add('copied');
                const originalIcon = this.querySelector('i').className;
                this.querySelector('i').className = 'fas fa-check';
                
                // Reset after 2 seconds
                setTimeout(() => {
                    this.classList.remove('copied');
                    this.querySelector('i').className = originalIcon;
                }, 2000);
                
                // Show toast notification
                showToast(`${textToCopy} copied to clipboard!`);
                
            } catch (err) {
                console.error('Failed to copy text: ', err);
                showToast('Failed to copy. Please try again.', 'error');
            }
        });
    });
    
    // Copy all contact info button
    const copyAllBtn = document.getElementById('copyAllBtn');
    if (copyAllBtn) {
        copyAllBtn.addEventListener('click', async function() {
            const contactInfo = {
                phone: '+44 7818984644',
                email: 'deepakananth2001@gmail.com',
                location: 'London, UK',
                linkedin: 'https://www.linkedin.com/in/deepak-ananth-181001d160802n/',
                github: 'https://github.com/Dee-Nith'
            };
            
            const formattedText = `Deepak Ananthapadman
Mechanical Engineer | Robotics Automation Specialist

Contact Information:
Phone: ${contactInfo.phone}
Email: ${contactInfo.email}
Location: ${contactInfo.location}

Social Links:
LinkedIn: ${contactInfo.linkedin}
GitHub: ${contactInfo.github}`;
            
            try {
                await navigator.clipboard.writeText(formattedText);
                
                // Visual feedback
                this.classList.add('copied');
                const originalIcon = this.querySelector('i').className;
                this.querySelector('i').className = 'fas fa-check';
                
                // Reset after 3 seconds
                setTimeout(() => {
                    this.classList.remove('copied');
                    this.querySelector('i').className = originalIcon;
                }, 3000);
                
                showToast('All contact information copied to clipboard!');
                
            } catch (err) {
                console.error('Failed to copy contact info: ', err);
                showToast('Failed to copy. Please try again.', 'error');
            }
        });
    }
});

// Toast notification function
function showToast(message, type = 'success') {
    // Remove existing toast if any
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add toast styles
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #00ff88 0%, #00cc6a 100%)' : 'linear-gradient(135deg, #ff4444 0%, #cc0000 100%)'};
        color: ${type === 'success' ? '#000000' : '#ffffff'};
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        font-size: 14px;
        font-weight: 500;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    // Add content styles
    const content = toast.querySelector('.toast-content');
    content.style.cssText = `
        display: flex;
        align-items: center;
        gap: 10px;
    `;
    
    // Add icon styles
    const icon = toast.querySelector('i');
    icon.style.cssText = `
        font-size: 16px;
    `;
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// Academic Projects Show More functionality
// REPLACED: make it robust and toggle all hidden items
document.addEventListener('DOMContentLoaded', function() {
    const showMoreBtn = document.getElementById('academicShowMore');
    const hiddenCards = document.querySelectorAll('.academic-hidden');

    if (!showMoreBtn) return;

    function setExpanded(expanded) {
        showMoreBtn.classList.toggle('expanded', expanded);
        showMoreBtn.setAttribute('aria-expanded', String(expanded));
        const btnTextEl = showMoreBtn.querySelector('.btn-text');
        if (btnTextEl) btnTextEl.textContent = expanded ? 'Show Less Projects' : 'Show More Projects';
    }

    showMoreBtn.addEventListener('click', function() {
        const expanded = showMoreBtn.classList.contains('expanded');
        const nextState = !expanded;

        hiddenCards.forEach(card => {
            card.classList.toggle('show', nextState);
        });

        setExpanded(nextState);

        if (nextState && hiddenCards.length > 0) {
            // Smooth scroll to the first revealed card
            const first = hiddenCards[0];
            first.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

console.log('Portfolio website JavaScript loaded successfully!');