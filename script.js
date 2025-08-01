// Portfolio Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initScrollEffects();
    initMusicPlayer();
    initScrollToTop();
    initContactForm();
    initSmoothScrolling();
    initHeaderOpacity();
    initScrollReveal();
});

// Header opacity on scroll
function initHeaderOpacity() {
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', function() {
        const scrollY = window.pageYOffset;
        const opacity = scrollY > 100 ? 0.95 : 0.05;
        header.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;
    });
}

// Scroll reveal animation
function initScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);
    
    // Observe all scroll-reveal elements
    document.querySelectorAll('.scroll-reveal').forEach(el => {
        observer.observe(el);
    });
    
    // Initialize hero animation with delay
    setTimeout(() => {
        const heroContent = document.getElementById('hero-content');
        if (heroContent) {
            heroContent.classList.add('revealed');
        }
    }, 500);
    
    // Initialize 3D Welcome text effect
    initWelcome3D();
}

// 3D Welcome text scroll effect
function initWelcome3D() {
    const welcomeText = document.getElementById('welcome-text');
    if (!welcomeText) return;
    
    window.addEventListener('scroll', function() {
        const scrollY = window.pageYOffset;
        const rotateX = Math.min(scrollY * 0.1, 45);
        const rotateY = Math.min(scrollY * 0.05, 25);
        const scale = Math.max(1 - scrollY * 0.0005, 0.8);
        
        welcomeText.style.transform = `
            perspective(1000px) 
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg) 
            scale(${scale})
        `;
        
        // Add depth shadow based on scroll
        const shadowIntensity = Math.min(scrollY * 0.02, 20);
        welcomeText.style.textShadow = `
            0 ${shadowIntensity}px ${shadowIntensity * 2}px rgba(0, 0, 0, 0.3),
            0 ${shadowIntensity / 2}px ${shadowIntensity}px rgba(59, 130, 246, 0.2)
        `;
    });
}

// Music player functionality
function initMusicPlayer() {
    const musicToggle = document.getElementById('music-toggle');
    const musicVisualizer = document.getElementById('music-visualizer');
    const playIcon = document.getElementById('play-icon');
    const musicStatus = document.getElementById('music-status');
    const audio = document.getElementById('background-music');
    
    if (!audio) {
        console.error('Audio element not found');
        return;
    }
    
    let isPlaying = false;
    let hasUserInteracted = false;
    
    // Set audio properties
    audio.volume = 0.3;
    audio.preload = 'metadata';
    
    // Enable user interaction tracking
    function markUserInteraction() {
        hasUserInteracted = true;
        console.log('User interaction detected');
    }
    
    document.addEventListener('click', markUserInteraction, { once: true });
    document.addEventListener('touchstart', markUserInteraction, { once: true });
    
    musicToggle.addEventListener('click', async function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        console.log('Music toggle clicked, isPlaying:', isPlaying);
        
        try {
            if (isPlaying) {
                audio.pause();
                isPlaying = false;
                musicVisualizer.classList.add('hidden');
                playIcon.classList.remove('hidden');
                musicStatus.textContent = 'Play Music';
                console.log('Music paused');
            } else {
                // Force reload the audio element
                audio.load();
                
                // Wait for audio to be ready
                if (audio.readyState < 3) {
                    console.log('Waiting for audio to load...');
                    await new Promise((resolve, reject) => {
                        const timeout = setTimeout(() => {
                            reject(new Error('Audio load timeout'));
                        }, 5000);
                        
                        audio.addEventListener('canplay', () => {
                            clearTimeout(timeout);
                            resolve();
                        }, { once: true });
                        
                        audio.addEventListener('error', () => {
                            clearTimeout(timeout);
                            reject(new Error('Audio load error'));
                        }, { once: true });
                    });
                }
                
                console.log('Attempting to play audio...');
                const playPromise = audio.play();
                
                if (playPromise !== undefined) {
                    await playPromise;
                }
                
                isPlaying = true;
                musicVisualizer.classList.remove('hidden');
                playIcon.classList.add('hidden');
                musicStatus.textContent = 'Playing';
                console.log('Music started playing');
            }
        } catch (error) {
            console.error('Audio play failed:', error);
            console.error('Error details:', error.message);
            
            isPlaying = false;
            musicVisualizer.classList.add('hidden');
            playIcon.classList.remove('hidden');
            
            if (error.name === 'NotAllowedError') {
                musicStatus.textContent = 'Click to Enable Audio';
                alert('Please click the music button again to enable audio playback.');
            } else if (error.name === 'NotSupportedError') {
                musicStatus.textContent = 'Audio Not Supported';
            } else {
                musicStatus.textContent = 'Audio Error';
            }
        }
    });
    
    // Handle audio events
    audio.addEventListener('ended', function() {
        console.log('Audio ended');
        isPlaying = false;
        musicVisualizer.classList.add('hidden');
        playIcon.classList.remove('hidden');
        musicStatus.textContent = 'Play Music';
    });
    
    audio.addEventListener('error', function(e) {
        console.error('Audio error event:', e);
        console.error('Audio error code:', audio.error?.code);
        console.error('Audio error message:', audio.error?.message);
        musicStatus.textContent = 'Audio Error';
    });
    
    audio.addEventListener('loadstart', function() {
        console.log('Audio loading started');
    });
    
    audio.addEventListener('loadeddata', function() {
        console.log('Audio data loaded');
    });
    
    audio.addEventListener('canplay', function() {
        console.log('Audio can start playing');
    });
}

// Scroll to top button
function initScrollToTop() {
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Contact form handling
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Create mailto link
        const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
        window.location.href = `mailto:eyitest@gmail.com?subject=${subject}&body=${body}`;
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
}

// General scroll effects
function initScrollEffects() {
    // Parallax effect for banner
    const banner = document.getElementById('banner');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (banner) {
            banner.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Utility function to add staggered animations
function staggerAnimation(elements, className, delay = 100) {
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add(className);
        }, index * delay);
    });
}

// Add hover effects for project cards
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.group');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Stagger reveal animations for project cards
    const projectCards = document.querySelectorAll('.scroll-reveal');
    setTimeout(() => {
        staggerAnimation(projectCards, 'animate-fadeInUp', 200);
    }, 1000);
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
const throttledScrollHandler = throttle(function() {
    // Any scroll-dependent functions can be called here
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler);

// Add intersection observer for better performance
const createObserver = (callback, options = {}) => {
    return new IntersectionObserver(callback, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
        ...options
    });
};

// Accessibility improvements
document.addEventListener('keydown', function(e) {
    // ESC key to pause music
    if (e.key === 'Escape') {
        const audio = document.getElementById('background-music');
        const musicToggle = document.getElementById('music-toggle');
        if (audio && !audio.paused) {
            musicToggle.click();
        }
    }
    
    // Space key to scroll down
    if (e.key === ' ' && e.target === document.body) {
        e.preventDefault();
        window.scrollBy(0, window.innerHeight * 0.8);
    }
});

// Add focus management for better accessibility
document.querySelectorAll('button, a').forEach(element => {
    element.addEventListener('focus', function() {
        this.style.outline = '2px solid #3b82f6';
        this.style.outlineOffset = '2px';
    });
    
    element.addEventListener('blur', function() {
        this.style.outline = 'none';
    });
});

// Error handling for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        console.log('Image failed to load:', this.src);
        // You can add a fallback image here if needed
        // this.src = 'path/to/fallback-image.png';
    });
});

// Console welcome message
console.log('%c👋 Welcome to Akin\'s Portfolio!', 'color: #3b82f6; font-size: 16px; font-weight: bold;');
console.log('%cBuilt with HTML, CSS, and JavaScript', 'color: #8b5cf6; font-size: 14px;');
console.log('%cCheck out the source code: https://github.com/akin-og/', 'color: #10b981; font-size: 12px;');