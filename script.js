document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Enhanced Scroll Reveal Animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section, .nav-logo, .hero-content, .game-card, .cozy-card').forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(40px)";
        el.style.transition = "all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
        observer.observe(el);
    });

    // 2. Enhanced Navbar Scroll Effect
    let lastScrollY = 0;
    const nav = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        // Subtle parallax effect on hero
        const heroContent = document.querySelector('.hero-content');
        if (heroContent && currentScrollY < window.innerHeight) {
            heroContent.style.transform = `translateY(${currentScrollY * 0.5}px)`;
        }
        
        lastScrollY = currentScrollY;
    });

    // 3. Enhanced Newsletter Submission with Better Feedback
    const form = document.querySelector('.subscribe-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = form.querySelector('input');
            const btn = form.querySelector('button');
            const originalText = btn.textContent;
            const email = input.value;
            
            // Disable form
            input.disabled = true;
            btn.disabled = true;
            
            // Show success state with animation
            btn.textContent = '✓ SUBSCRIBED!';
            btn.style.background = 'linear-gradient(135deg, #00ff41 0%, #00cc33 100%)';
            btn.style.color = '#000';
            btn.style.borderBottomColor = '#009900';
            
            // Add success animation to input
            input.style.background = 'rgba(0, 255, 65, 0.1)';
            input.style.borderColor = '#00ff41';
            
            // Reset after 3 seconds
            setTimeout(() => {
                input.value = '';
                input.disabled = false;
                btn.disabled = false;
                btn.textContent = originalText;
                btn.style.background = '';
                btn.style.color = '';
                btn.style.borderBottomColor = '';
                input.style.background = '';
                input.style.borderColor = '';
            }, 3000);
        });
    }

    // 4. Add visible class CSS dynamically for smooth animations
    const style = document.createElement('style');
    style.innerHTML = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        /* Smooth transition for all interactive elements */
        a, button, input {
            transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        /* Focus states for accessibility */
        a:focus, button:focus, input:focus {
            outline: 2px solid var(--primary-pop);
            outline-offset: 2px;
        }
        
        /* Smooth scrolling */
        html {
            scroll-behavior: smooth;
        }
    `;
    document.head.appendChild(style);

    // 5. Smooth anchor link navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 6. Add subtle mouse tracking to game cards for depth effect
    const gameCards = document.querySelectorAll('.game-card');
    gameCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) * 0.05;
            const rotateY = (centerX - x) * 0.05;
            
            card.style.transform = `translateY(-10px) scale(1.02) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(-10px) scale(1.02) rotateX(0deg) rotateY(0deg)';
        });
    });
});