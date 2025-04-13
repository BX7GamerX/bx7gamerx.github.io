// Interactive Node Background Animation
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the background when the DOM is loaded
    initNetworkBackground();
});

function initNetworkBackground() {
    const container = document.querySelector('.network-background');
    if (!container) return;

    // Configuration
    const config = {
        nodeCount: window.innerWidth < 768 ? 20 : window.innerWidth < 1200 ? 40 : 60,
        connectionDistance: window.innerWidth < 768 ? 150 : 200,
        nodeSpeed: 0.5,
        responsive: true,
        mouseInteraction: true,
        mouseRadius: 150,
        colors: {
            primary: getComputedStyle(document.documentElement).getPropertyValue('--accent-neon-cyan').trim(),
            secondary: getComputedStyle(document.documentElement).getPropertyValue('--accent-neon-purple').trim()
        }
    };

    // State
    const nodes = [];
    const connections = [];
    let mousePosition = { x: null, y: null };
    let animationFrameId = null;
    let resizeTimer;

    // Create nodes container
    const nodesContainer = document.createElement('div');
    nodesContainer.classList.add('nodes-container');
    container.appendChild(nodesContainer);

    // Initialize nodes
    function createNodes() {
        // Clear existing nodes
        nodesContainer.innerHTML = '';
        nodes.length = 0;
        connections.length = 0;

        for (let i = 0; i < config.nodeCount; i++) {
            const node = document.createElement('div');
            node.classList.add('node');
            
            // Randomize some nodes to have accent color
            if (Math.random() > 0.7) {
                node.classList.add('accent');
            }
            
            // Randomize a few nodes to be highlighted (slightly larger)
            if (Math.random() > 0.8) {
                node.classList.add('highlight');
            }
            
            // Set random position
            const nodeData = {
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                speedX: (Math.random() - 0.5) * config.nodeSpeed,
                speedY: (Math.random() - 0.5) * config.nodeSpeed,
                element: node
            };
            
            node.style.left = `${nodeData.x}px`;
            node.style.top = `${nodeData.y}px`;
            
            nodes.push(nodeData);
            nodesContainer.appendChild(node);
        }
    }

    // Update node positions
    function updateNodes() {
        nodes.forEach((node, index) => {
            // Move node
            node.x += node.speedX;
            node.y += node.speedY;
            
            // Bounce off edges
            if (node.x < 0 || node.x > window.innerWidth) {
                node.speedX *= -1;
                node.x = Math.max(0, Math.min(node.x, window.innerWidth));
            }
            
            if (node.y < 0 || node.y > window.innerHeight) {
                node.speedY *= -1;
                node.y = Math.max(0, Math.min(node.y, window.innerHeight));
            }
            
            // Update position
            node.element.style.transform = `translate(${node.x}px, ${node.y}px)`;
            
            // Add mouse interaction
            if (config.mouseInteraction && mousePosition.x !== null && mousePosition.y !== null) {
                const dx = mousePosition.x - node.x;
                const dy = mousePosition.y - node.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < config.mouseRadius) {
                    // Push node away from mouse with increasing force as it gets closer
                    const force = (config.mouseRadius - distance) / config.mouseRadius;
                    node.speedX -= dx * force * 0.02;
                    node.speedY -= dy * force * 0.02;
                    
                    // Limit speed
                    const maxSpeed = 2;
                    const currentSpeed = Math.sqrt(node.speedX * node.speedX + node.speedY * node.speedY);
                    if (currentSpeed > maxSpeed) {
                        node.speedX = (node.speedX / currentSpeed) * maxSpeed;
                        node.speedY = (node.speedY / currentSpeed) * maxSpeed;
                    }
                }
            }
            
            // Apply slight friction to prevent excessive speeds
            node.speedX *= 0.99;
            node.speedY *= 0.99;
        });
    }

    // Draw connections between nodes
    function drawConnections() {
        // Remove old connections
        connections.forEach(conn => {
            if (conn.element && conn.element.parentNode) {
                conn.element.parentNode.removeChild(conn.element);
            }
        });
        connections.length = 0;
        
        // Create new connections
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const node1 = nodes[i];
                const node2 = nodes[j];
                
                const dx = node2.x - node1.x;
                const dy = node2.y - node1.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < config.connectionDistance) {
                    // Create connection element if it doesn't exist
                    const connection = document.createElement('div');
                    connection.classList.add('connection');
                    
                    // Calculate position and dimensions
                    const angle = Math.atan2(dy, dx) * 180 / Math.PI;
                    connection.style.width = `${distance}px`;
                    connection.style.left = `${node1.x}px`;
                    connection.style.top = `${node1.y}px`;
                    connection.style.transform = `rotate(${angle}deg)`;
                    
                    // Fade out connections that are further away
                    const opacity = 1 - (distance / config.connectionDistance);
                    connection.style.opacity = opacity * 0.2;
                    
                    // Store connection data
                    connections.push({
                        from: i,
                        to: j,
                        element: connection
                    });
                    
                    // Add to container
                    nodesContainer.appendChild(connection);
                }
            }
        }
    }

    // Mouse move handler
    function handleMouseMove(e) {
        if (!config.mouseInteraction) return;
        
        mousePosition.x = e.clientX;
        mousePosition.y = e.clientY;
        
        // Create ripple effect on click (optional)
        if (e.type === 'click') {
            createRipple(e.clientX, e.clientY);
        }
    }

    // Create ripple effect
    function createRipple(x, y) {
        const ripple = document.createElement('div');
        ripple.classList.add('mouse-ripple');
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        nodesContainer.appendChild(ripple);
        
        let size = 0;
        let opacity = 1;
        
        const expandRipple = () => {
            if (size >= config.mouseRadius * 2) {
                nodesContainer.removeChild(ripple);
                return;
            }
            
            size += 5;
            opacity -= 0.02;
            
            ripple.style.width = `${size}px`;
            ripple.style.height = `${size}px`;
            ripple.style.marginLeft = `${-size/2}px`;
            ripple.style.marginTop = `${-size/2}px`;
            ripple.style.opacity = opacity;
            
            requestAnimationFrame(expandRipple);
        };
        
        requestAnimationFrame(expandRipple);
    }

    // Handle window resize
    function handleResize() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (config.responsive) {
                // Update configuration based on screen size
                config.nodeCount = window.innerWidth < 768 ? 20 : window.innerWidth < 1200 ? 40 : 60;
                config.connectionDistance = window.innerWidth < 768 ? 150 : 200;
                
                // Recreate nodes based on new config
                createNodes();
            }
        }, 250);
    }

    // Animation loop
    function animate() {
        updateNodes();
        drawConnections();
        animationFrameId = requestAnimationFrame(animate);
    }

    // Clean up function
    function cleanup() {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
        
        window.removeEventListener('resize', handleResize);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('click', handleMouseMove);
        
        if (container) {
            container.innerHTML = '';
        }
    }

    // Initialize
    function init() {
        cleanup(); // Clean up existing instance if any
        createNodes();
        
        // Add event listeners
        window.addEventListener('resize', handleResize);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('click', handleMouseMove);
        
        // Start animation loop
        animate();
    }

    // Start the background
    init();

    // Return cleanup function for potential future use
    return cleanup;
}

// Theme change handler to update node colors
document.addEventListener('themeChanged', function(e) {
    // Wait a moment for CSS variables to update
    setTimeout(() => {
        const nodes = document.querySelectorAll('.node');
        nodes.forEach(node => {
            node.style.transition = 'background-color 0.5s ease';
        });
    }, 100);
});