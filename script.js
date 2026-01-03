// Cloud Resume Challenge - Visitor Counter and Interactive Features

// Visitor counter functionality
class VisitorCounter {
    constructor() {
        this.counterElement = document.getElementById('visitor-count');
        this.storageKey = 'cloud-resume-visitors';
        this.apiEndpoint = null; // Will be set to your API Gateway endpoint
        this.init();
    }

    async init() {
        try {
            // Try to get visitor count from API first (for production)
            if (this.apiEndpoint) {
                await this.fetchFromAPI();
            } else {
                // Fallback to localStorage for development/demo
                this.useLocalStorage();
            }
            
            // Animate the counter
            this.animateCounter();
        } catch (error) {
            console.error('Error initializing visitor counter:', error);
            this.useLocalStorage();
            this.animateCounter();
        }
    }

    async fetchFromAPI() {
        try {
            const response = await fetch(this.apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'increment'
                })
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            this.updateCounter(data.count || data.visitor_count || 0);
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }

    useLocalStorage() {
        let count = parseInt(localStorage.getItem(this.storageKey) || '0');
        
        // Check if this is a new session
        const lastVisit = localStorage.getItem(this.storageKey + '-timestamp');
        const now = Date.now();
        const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds
        
        if (!lastVisit || (now - parseInt(lastVisit)) > oneHour) {
            count += 1;
            localStorage.setItem(this.storageKey, count.toString());
            localStorage.setItem(this.storageKey + '-timestamp', now.toString());
        }
        
        this.updateCounter(count);
    }

    updateCounter(count) {
        if (this.counterElement) {
            this.counterElement.textContent = count.toLocaleString();
        }
    }

    animateCounter() {
        const target = parseInt(this.counterElement.textContent.replace(/,/g, ''));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            this.counterElement.textContent = Math.floor(current).toLocaleString();
        }, 16);
    }

    // Method to set API endpoint (call this in production)
    setAPIEndpoint(url) {
        this.apiEndpoint = url;
    }
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
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
}

// Intersection Observer for animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                // Stagger animations for list items
                const listItems = entry.target.querySelectorAll('li, .skill-tag, .contact-link');
                listItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.animationDelay = `${index * 0.1}s`;
                        item.classList.add('animate-in');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });
}

// Enhanced skill tag interactions
function initSkillTagInteractions() {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(tag => {
        // Add click event for potential filtering or details
        tag.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
        
        // Add hover effect with random colors
        tag.addEventListener('mouseenter', function() {
            const colors = ['#3498db', '#e74c3c', '#27ae60', '#f39c12', '#9b59b6', '#1abc9c'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            this.style.backgroundColor = randomColor;
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
        });
    });
}

// Project card interactions
function initProjectInteractions() {
    const projectItems = document.querySelectorAll('.project-item');
    
    projectItems.forEach(project => {
        project.addEventListener('mouseenter', function() {
            this.style.borderLeftWidth = '8px';
        });
        
        project.addEventListener('mouseleave', function() {
            this.style.borderLeftWidth = '4px';
        });
    });
}

// Typing effect for the title
function initTypingEffect() {
    const titleElement = document.querySelector('.title');
    if (!titleElement) return;
    
    const text = titleElement.textContent;
    const typingSpeed = 100;
    const erasingSpeed = 50;
    const delayBetweenTexts = 2000;
    
    const titles = [
        'Software Engineer',
        'Full-Stack Developer',
        'AWS Solutions Architect',
        'Laravel Expert',
        'React Developer'
    ];
    
    let titleIndex = 0;
    let charIndex = 0;
    let isErasing = false;
    
    function type() {
        const currentTitle = titles[titleIndex];
        
        if (!isErasing && charIndex < currentTitle.length) {
            titleElement.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
            setTimeout(type, typingSpeed);
        } else if (isErasing && charIndex > 0) {
            titleElement.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
            setTimeout(type, erasingSpeed);
        } else {
            isErasing = !isErasing;
            if (!isErasing) {
                titleIndex = (titleIndex + 1) % titles.length;
            }
            setTimeout(type, delayBetweenTexts);
        }
    }
    
    // Start typing effect after a delay
    setTimeout(() => {
        titleElement.textContent = '';
        type();
    }, 1000);
}

// Enhanced contact link interactions
function initContactLinkEffects() {
    const contactLinks = document.querySelectorAll('.contact-link');
    
    contactLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                background: rgba(255,255,255,0.6);
                border-radius: 50%;
                pointer-events: none;
                width: 20px;
                height: 20px;
                left: ${e.offsetX - 10}px;
                top: ${e.offsetY - 10}px;
                animation: ripple 0.6s ease-out;
            `;
            
            this.style.position = 'relative';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Add ripple animation CSS
function addRippleAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .animate-in {
            animation: fadeInUp 0.6s ease-out forwards;
        }
    `;
    document.head.appendChild(style);
}

// Performance monitoring
function initPerformanceMonitoring() {
    // Log page load performance
    window.addEventListener('load', () => {
        if ('performance' in window) {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`Page loaded in ${loadTime}ms`);
            
            // You could send this to your analytics API
            // sendAnalytics('page_load_time', loadTime);
        }
    });
}

// Error boundary for graceful error handling
function initErrorHandling() {
    window.addEventListener('error', (event) => {
        console.error('JavaScript error:', event.error);
        // You could send error reports to your monitoring service
    });
    
    window.addEventListener('unhandledrejection', (event) => {
        console.error('Unhandled promise rejection:', event.reason);
        // Handle promise rejections gracefully
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing Cloud Resume Challenge website...');
    
    try {
        // Core functionality
        const visitorCounter = new VisitorCounter();
        
        // Interactive features
        initSmoothScrolling();
        initScrollAnimations();
        initSkillTagInteractions();
        initProjectInteractions();
        initTypingEffect();
        initContactLinkEffects();
        
        // Enhancements
        addRippleAnimation();
        initPerformanceMonitoring();
        initErrorHandling();
        
        console.log('Website initialized successfully!');
        
        // Example: Set API endpoint in production
        // visitorCounter.setAPIEndpoint('https://your-api-gateway-url.amazonaws.com/prod/visitor-count');
        
    } catch (error) {
        console.error('Error during initialization:', error);
    }
});

// Export for potential use in other modules
window.CloudResumeChallenge = {
    VisitorCounter,
    initSmoothScrolling,
    initScrollAnimations,
    initSkillTagInteractions,
    initProjectInteractions,
    initTypingEffect
};

// Console welcome message
console.log(`
╔══════════════════════════════════════╗
║     Cloud Resume Challenge 2025      ║
║     Built by Aung Moe Myint Thu      ║
║                                      ║
║     🚀 Full-Stack Developer          ║
║     ☁️  AWS Solutions Architect      ║
║     💻 Laravel & React Expert        ║
╚══════════════════════════════════════╝
`);