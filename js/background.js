// Modern minimalist interactive background
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.createElement('canvas');
    canvas.classList.add('network-canvas');
    
    const backgroundContainer = document.createElement('div');
    backgroundContainer.classList.add('network-background');
    backgroundContainer.appendChild(canvas);
    
    // Add background glow elements
    const glow1 = document.createElement('div');
    glow1.classList.add('bg-glow', 'glow-1');
    
    const glow2 = document.createElement('div');
    glow2.classList.add('bg-glow', 'glow-2');
    
    // Add noise texture overlay
    const overlay = document.createElement('div');
    overlay.classList.add('background-overlay');
    
    // Append all elements to body
    document.body.appendChild(backgroundContainer);
    document.body.appendChild(glow1);
    document.body.appendChild(glow2);
    document.body.appendChild(overlay);
    
    // Set up the canvas
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    // Configure for retina displays
    const pixelRatio = window.devicePixelRatio || 1;
    canvas.width = width * pixelRatio;
    canvas.height = height * pixelRatio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(pixelRatio, pixelRatio);
    
    // Particles configuration
    const particleCount = Math.min(Math.floor(width * height / 10000), 100); // Reduced count for minimalist look
    const connectionDistance = Math.min(width, height) * 0.15; // Shorter connections
    const particleRadius = 2; // Smaller particles
    
    // Color configuration
    let primaryColor, secondaryColor;
    updateColors();
    
    // Particles array
    const particles = [];
    
    // Initialize particles
    function initParticles() {
        particles.length = 0;
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * particleRadius + 1,
                speedX: (Math.random() - 0.5) * 0.5, // Slower movement
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.3 + 0.2, // More subtle opacity
            });
        }
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        // Update and draw particles
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            
            // Move particles
            p.x += p.speedX;
            p.y += p.speedY;
            
            // Boundary check with bounce
            if (p.x < 0 || p.x > width) p.speedX *= -1;
            if (p.y < 0 || p.y > height) p.speedY *= -1;
            
            // Draw particle
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = primaryColor.replace('1)', `${p.opacity})`);
            ctx.fill();
        }
        
        // Draw connections
        ctx.lineWidth = 0.5; // Thinner lines
        
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const p1 = particles[i];
                const p2 = particles[j];
                
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < connectionDistance) {
                    const opacity = (1 - distance / connectionDistance) * 0.2; // More subtle connections
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    
                    // Gradient line for more depth
                    const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
                    gradient.addColorStop(0, primaryColor.replace('1)', `${opacity})`));
                    gradient.addColorStop(1, secondaryColor.replace('1)', `${opacity})`));
                    
                    ctx.strokeStyle = gradient;
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    // Handle mouse movement for interactivity
    let mouseX = null;
    let mouseY = null;
    let interactiveParticle = null;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Create interactive particle if it doesn't exist
        if (!interactiveParticle) {
            interactiveParticle = {
                x: mouseX,
                y: mouseY,
                size: particleRadius * 2, // Slightly larger than regular particles
                opacity: 0.5
            };
            particles.push(interactiveParticle);
        } else {
            // Update interactive particle position with smooth interpolation
            interactiveParticle.x += (mouseX - interactiveParticle.x) * 0.1;
            interactiveParticle.y += (mouseY - interactiveParticle.y) * 0.1;
        }
    });
    
    // Handle resize
    window.addEventListener('resize', function() {
        width = window.innerWidth;
        height = window.innerHeight;
        
        canvas.width = width * pixelRatio;
        canvas.height = height * pixelRatio;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        ctx.scale(pixelRatio, pixelRatio);
        
        initParticles();
    });
    
    // Handle theme changes
    function updateColors() {
        const theme = document.documentElement.getAttribute('data-theme') || 'dark';
        if (theme === 'dark') {
            primaryColor = 'rgba(0, 229, 255, 1)';
            secondaryColor = 'rgba(184, 46, 255, 1)';
        } else {
            primaryColor = 'rgba(0, 153, 204, 1)';
            secondaryColor = 'rgba(136, 0, 204, 1)';
        }
    }
    
    // Monitor theme changes
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.attributeName === 'data-theme') {
                updateColors();
            }
        });
    });
    
    observer.observe(document.documentElement, {
        attributes: true
    });
    
    // Handle scroll to reduce background intensity during reading
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        const scrollPercentage = Math.min(scrollY / (maxScroll * 0.3), 1);
        
        // Add/remove classes based on scroll position
        if (scrollY > 100) {
            document.body.classList.add('scrolled');
        } else {
            document.body.classList.remove('scrolled');
        }
        
        if (scrollPercentage > 0.5) {
            document.body.classList.add('focused-content');
        } else {
            document.body.classList.remove('focused-content');
        }
    });
    
    // Start the animation
    initParticles();
    animate();
});