/**
 * Interactive elements functionality for Simon's portfolio website
 * Handles advanced interactions, demos, and visual effects
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize tabbed demo interfaces
  initTabbedDemos();
  
  // Initialize flow diagrams
  initFlowDiagrams();
  
  // Initialize neural network visualization
  initNeuralVisualization();
  
  // Initialize architecture diagram
  initArchitectureDiagram();
  
  // Initialize 3D cards
  init3DCards();
  
  // Initialize masonry grid
  initMasonryGrid();
  
  // Initialize skill progress bars
  initSkillProgressBars();
  
  // Initialize touch sliders
  initTouchSliders();
  
  // Initialize keyboard navigation indicator
  initKeyboardNavigationIndicator();
});

/**
 * Initialize tabbed demo interfaces
 * This creates interactive tabbed content areas for project demos
 */
function initTabbedDemos() {
  document.querySelectorAll('.tabbed-demo').forEach(demoContainer => {
    const tabs = demoContainer.querySelectorAll('.demo-tab');
    const contents = demoContainer.querySelectorAll('.demo-content');
    
    // Set first tab as active by default
    if (tabs.length > 0 && contents.length > 0) {
      tabs[0].classList.add('active');
      contents[0].classList.add('active');
    }
    
    // Add click handlers to tabs
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetId = tab.getAttribute('data-target');
        
        // Remove active class from all tabs and contents
        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding content
        tab.classList.add('active');
        demoContainer.querySelector(`#${targetId}`).classList.add('active');
      });
    });
    
    // Add copy code functionality
    demoContainer.querySelectorAll('.demo-code-header-button[data-action="copy"]').forEach(btn => {
      btn.addEventListener('click', function() {
        const codeBlock = this.closest('.demo-code').querySelector('pre code');
        if (!codeBlock) return;
        
        navigator.clipboard.writeText(codeBlock.textContent).then(() => {
          // Show success feedback
          const originalText = this.innerHTML;
          this.innerHTML = '<i class="fas fa-check"></i>';
          setTimeout(() => {
            this.innerHTML = originalText;
          }, 2000);
        });
      });
    });
    
    // Add run code functionality (for demo purposes)
    demoContainer.querySelectorAll('.demo-code-header-button[data-action="run"]').forEach(btn => {
      btn.addEventListener('click', function() {
        const resultsContainer = this.closest('.demo-content').querySelector('.demo-results');
        if (!resultsContainer) return;
        
        // Show loading state
        resultsContainer.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Running code...</div>';
        
        // Simulate code execution
        setTimeout(() => {
          resultsContainer.innerHTML = `
            <div class="demo-results-content">
              <div class="demo-results-header">
                <h4>Output:</h4>
                <span class="demo-results-status success">Success</span>
              </div>
              <pre><code>Neural network initialized successfully.
Training with 1000 samples...
Epoch 1/5: loss=0.342, accuracy=0.821
Epoch 2/5: loss=0.215, accuracy=0.897
Epoch 3/5: loss=0.183, accuracy=0.921
Epoch 4/5: loss=0.162, accuracy=0.938
Epoch 5/5: loss=0.148, accuracy=0.945
Model saved to /models/recommendation_v2.bin</code></pre>
            </div>
          `;
        }, 2000);
      });
    });
  });
}

/**
 * Initialize interactive flow diagrams
 */
function initFlowDiagrams() {
  document.querySelectorAll('.flow-diagram').forEach(diagram => {
    const nodes = diagram.querySelectorAll('.flow-node');
    const contents = diagram.querySelectorAll('.flow-content');
    
    // Setup node click handlers
    nodes.forEach(node => {
      node.addEventListener('click', () => {
        const contentId = node.getAttribute('data-target');
        const targetContent = diagram.querySelector(`#${contentId}`);
        
        // If this node is already active, deactivate everything
        if (node.classList.contains('active')) {
          nodes.forEach(n => n.classList.remove('active'));
          contents.forEach(c => c.classList.remove('active'));
          return;
        }
        
        // Otherwise activate only this node and its content
        nodes.forEach(n => n.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));
        
        node.classList.add('active');
        if (targetContent) {
          targetContent.classList.add('active');
        }
      });
    });
    
    // Create connecting arrows between nodes
    if (nodes.length > 1) {
      for (let i = 0; i < nodes.length - 1; i++) {
        const currentNode = nodes[i];
        const nextNode = nodes[i + 1];
        
        // Get positions for connecting arrow
        const currentRect = currentNode.getBoundingClientRect();
        const nextRect = nextNode.getBoundingClientRect();
        const diagramRect = diagram.getBoundingClientRect();
        
        // Calculate relative positions
        const startX = currentRect.right - diagramRect.left;
        const startY = currentRect.top + (currentRect.height / 2) - diagramRect.top;
        const endX = nextRect.left - diagramRect.left;
        const endY = nextRect.top + (nextRect.height / 2) - diagramRect.top;
        
        // Calculate arrow properties
        const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
        const angle = Math.atan2(endY - startY, endX - startX) * 180 / Math.PI;
        
        // Create and append arrow
        const arrow = document.createElement('div');
        arrow.className = 'flow-arrow';
        arrow.style.width = `${length}px`;
        arrow.style.left = `${startX}px`;
        arrow.style.top = `${startY}px`;
        arrow.style.transform = `rotate(${angle}deg)`;
        
        diagram.appendChild(arrow);
      }
    }
  });
}

/**
 * Initialize neural network visualization
 * Creates an interactive visualization of a neural network
 */
function initNeuralVisualization() {
  document.querySelectorAll('.ai-visualization').forEach(container => {
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    // Create layers
    const inputLayer = createNeuralLayer(container, 8, 'input-layer');
    const hiddenLayer1 = createNeuralLayer(container, 6, 'hidden-layer-1');
    const hiddenLayer2 = createNeuralLayer(container, 6, 'hidden-layer-2');
    const outputLayer = createNeuralLayer(container, 4, 'output-layer');
    
    const layers = [inputLayer, hiddenLayer1, hiddenLayer2, outputLayer];
    
    // Create connections between layers
    for (let i = 0; i < layers.length - 1; i++) {
      const currentLayer = layers[i];
      const nextLayer = layers[i + 1];
      
      // Connect each node in current layer to each node in next layer
      currentLayer.querySelectorAll('.neural-node').forEach(startNode => {
        nextLayer.querySelectorAll('.neural-node').forEach(endNode => {
          createNeuralConnection(container, startNode, endNode);
        });
      });
    }
    
    // Add animation functionality
    let animationInterval;
    
    container.addEventListener('mouseenter', () => {
      // Start animation on hover
      animationInterval = setInterval(() => {
        // Reset all active states
        container.querySelectorAll('.neural-active, .connection-active').forEach(el => {
          el.classList.remove('neural-active', 'connection-active');
        });
        
        // Randomly select an input node to activate
        const inputNodes = inputLayer.querySelectorAll('.neural-node');
        const randomInputIndex = Math.floor(Math.random() * inputNodes.length);
        const startNode = inputNodes[randomInputIndex];
        startNode.classList.add('neural-active');
        
        // Trace a path through the network
        let currentNode = startNode;
        for (let i = 0; i < layers.length - 1; i++) {
          // Find all connections from current node
          const connections = Array.from(container.querySelectorAll('.neural-connection')).filter(conn => {
            return conn.dataset.start === currentNode.dataset.id;
          });
          
          // Choose a random connection to follow
          if (connections.length > 0) {
            const randomConn = connections[Math.floor(Math.random() * connections.length)];
            randomConn.classList.add('connection-active');
            
            // Find and activate the next node
            const nextNodeId = randomConn.dataset.end;
            const nextNode = container.querySelector(`.neural-node[data-id="${nextNodeId}"]`);
            if (nextNode) {
              nextNode.classList.add('neural-active');
              currentNode = nextNode;
            }
          }
        }
      }, 2000);
    });
    
    container.addEventListener('mouseleave', () => {
      // Stop animation when mouse leaves
      clearInterval(animationInterval);
    });
  });
}

/**
 * Helper function to create a layer of neural network nodes
 */
function createNeuralLayer(container, nodeCount, className) {
  const layer = document.createElement('div');
  layer.className = `neural-layer ${className}`;
  
  // Distribute nodes evenly in the layer
  const height = container.clientHeight;
  const nodeSpacing = (height * 0.7) / (nodeCount - 1 || 1);
  
  for (let i = 0; i < nodeCount; i++) {
    const node = document.createElement('div');
    node.className = 'neural-node';
    node.dataset.id = `${className}-${i}`;
    node.style.top = `${(i * nodeSpacing) + (height * 0.15)}px`;
    layer.appendChild(node);
  }
  
  container.appendChild(layer);
  return layer;
}

/**
 * Helper function to create a connection between neural nodes
 */
function createNeuralConnection(container, startNode, endNode) {
  const connection = document.createElement('div');
  connection.className = 'neural-connection';
  connection.dataset.start = startNode.dataset.id;
  connection.dataset.end = endNode.dataset.id;
  
  // Get positions
  const startRect = startNode.getBoundingClientRect();
  const endRect = endNode.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();
  
  // Calculate relative positions
  const startX = startRect.left + (startRect.width / 2) - containerRect.left;
  const startY = startRect.top + (startRect.height / 2) - containerRect.top;
  const endX = endRect.left + (endRect.width / 2) - containerRect.left;
  const endY = endRect.top + (endRect.height / 2) - containerRect.top;
  
  // Calculate connection properties
  const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
  const angle = Math.atan2(endY - startY, endX - startX) * 180 / Math.PI;
  
  // Apply styles
  connection.style.left = `${startX}px`;
  connection.style.top = `${startY}px`;
  connection.style.width = `${length}px`;
  connection.style.transform = `rotate(${angle}deg)`;
  
  container.appendChild(connection);
  return connection;
}

/**
 * Initialize architecture diagram interactions
 */
function initArchitectureDiagram() {
  document.querySelectorAll('.architecture-diagram').forEach(diagram => {
    const nodes = diagram.querySelectorAll('.arch-node');
    const connections = diagram.querySelectorAll('.arch-connection');
    const details = diagram.querySelector('.arch-details');
    
    // Setup node click handlers
    nodes.forEach(node => {
      node.addEventListener('click', () => {
        const nodeType = node.getAttribute('data-type');
        
        // Reset active states
        nodes.forEach(n => n.classList.remove('active'));
        connections.forEach(c => c.classList.remove('active'));
        
        // Activate clicked node
        node.classList.add('active');
        
        // Activate connections to/from this node
        connections.forEach(conn => {
          const from = conn.getAttribute('data-from');
          const to = conn.getAttribute('data-to');
          
          if (from === nodeType || to === nodeType) {
            conn.classList.add('active');
          }
        });
        
        // Show node details
        if (details) {
          details.innerHTML = getArchNodeDetails(nodeType);
          details.classList.add('active');
        }
      });
    });
    
    // Close details panel
    if (details && details.querySelector('.close-details')) {
      details.querySelector('.close-details').addEventListener('click', () => {
        details.classList.remove('active');
      });
    }
    
    // Helper function to get node details HTML
    function getArchNodeDetails(nodeType) {
      const detailsContent = {
        'neural': `
          <button class="close-details"><i class="fas fa-times"></i></button>
          <h3>Neural Network Core</h3>
          <p>The C++ implementation of the recommendation engine using a hybrid architecture with:</p>
          <ul>
            <li>Custom embedding layers for users and content</li>
            <li>Multi-head attention mechanism for capturing complex relationships</li>
            <li>SIMD-optimized matrix operations for performance</li>
          </ul>
        `,
        'backend': `
          <button class="close-details"><i class="fas fa-times"></i></button>
          <h3>Backend Services</h3>
          <p>Rust-based backend that interfaces with the neural network core:</p>
          <ul>
            <li>Handles API requests and authentication</li>
            <li>Manages data preprocessing and feature extraction</li>
            <li>Implements caching strategies to minimize on-chain operations</li>
          </ul>
        `,
        'storage': `
          <button class="close-details"><i class="fas fa-times"></i></button>
          <h3>Decentralized Storage</h3>
          <p>Internet Computer Protocol (ICP) based storage system:</p>
          <ul>
            <li>Secure, encrypted storage of user preference data</li>
            <li>Distributed model weights across the network</li>
            <li>Privacy-preserving data access patterns</li>
          </ul>
        `,
        'api': `
          <button class="close-details"><i class="fas fa-times"></i></button>
          <h3>API Gateway</h3>
          <p>Interface between frontend applications and the backend:</p>
          <ul>
            <li>GraphQL API for flexible data querying</li>
            <li>Rate limiting and request validation</li>
            <li>Response caching for improved performance</li>
          </ul>
        `,
        'frontend': `
          <button class="close-details"><i class="fas fa-times"></i></button>
          <h3>Frontend Applications</h3>
          <p>Client-side applications that consume the recommendation API:</p>
          <ul>
            <li>Web interface built with React</li>
            <li>Mobile apps for iOS and Android</li>
            <li>Integration with third-party platforms</li>
          </ul>
        `
      };
      
      return detailsContent[nodeType] || '';
    }
  });
}

/**
 * Initialize 3D card effect
 */
function init3DCards() {
  document.querySelectorAll('.card-3d').forEach(card => {
    const maxRotation = 10; // Maximum rotation in degrees
    
    card.addEventListener('mousemove', e => {
      const cardRect = card.getBoundingClientRect();
      const cardWidth = cardRect.width;
      const cardHeight = cardRect.height;
      
      // Calculate mouse position relative to card center
      const centerX = cardRect.left + cardWidth / 2;
      const centerY = cardRect.top + cardHeight / 2;
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;
      
      // Calculate rotation angles
      const rotateY = (mouseX / (cardWidth / 2)) * maxRotation;
      const rotateX = -(mouseY / (cardHeight / 2)) * maxRotation;
      
      // Apply transformation
      card.querySelector('.card-3d-inner').style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
      
      // Add highlight effect
      const glarePosition = `${50 + (mouseX / cardWidth * 50)}% ${50 + (mouseY / cardHeight * 50)}%`;
      card.style.setProperty('--glare-position', glarePosition);
    });
    
    card.addEventListener('mouseleave', () => {
      // Reset card transformation on mouse leave
      card.querySelector('.card-3d-inner').style.transform = 'rotateY(0deg) rotateX(0deg)';
    });
  });
}

/**
 * Initialize masonry grid layout with dynamic spans
 */
function initMasonryGrid() {
  document.querySelectorAll('.masonry-grid').forEach(grid => {
    const items = grid.querySelectorAll('.masonry-item');
    const rowHeight = parseInt(getComputedStyle(grid).gridAutoRows);
    const rowGap = parseInt(getComputedStyle(grid).rowGap);
    
    function resizeGridItems() {
      items.forEach(item => {
        const contentHeight = item.querySelector('.masonry-content').getBoundingClientRect().height;
        const rowSpan = Math.ceil((contentHeight + rowGap) / (rowHeight + rowGap));
        item.style.setProperty('--span', rowSpan);
      });
    }
    
    // Initial sizing
    resizeGridItems();
    
    // Resize on window resize
    window.addEventListener('resize', resizeGridItems);
    
    // Resize when images load
    grid.querySelectorAll('img').forEach(img => {
      img.addEventListener('load', resizeGridItems);
    });
  });
}

/**
 * Initialize animated skill progress bars
 */
function initSkillProgressBars() {
  const progressBars = document.querySelectorAll('.skill-progress-fill');
  
  function animateProgressBars() {
    progressBars.forEach(bar => {
      const parent = bar.closest('.skill-progress-container');
      const rect = parent.getBoundingClientRect();
      
      if (rect.top < window.innerHeight * 0.85 && !bar.classList.contains('animate')) {
        const percentage = bar.getAttribute('data-percentage');
        bar.style.setProperty('--percentage', `${percentage}%`);
        bar.classList.add('animate');
      }
    });
  }
  
  // Animate on scroll
  window.addEventListener('scroll', animateProgressBars);
  
  // Initial check
  animateProgressBars();
}

/**
 * Initialize touch-friendly content sliders
 */
function initTouchSliders() {
  document.querySelectorAll('.touch-slider').forEach(slider => {
    const sliderInner = slider.querySelector('.touch-slider-inner');
    const slides = slider.querySelectorAll('.touch-slide');
    const dotsContainer = slider.querySelector('.touch-slider-nav');
    const arrowPrev = slider.querySelector('.touch-slider-arrow.prev');
    const arrowNext = slider.querySelector('.touch-slider-arrow.next');
    
    let currentSlide = 0;
    let touchStartX = 0;
    let touchEndX = 0;
    
    // Create dots if they don't exist
    if (dotsContainer && !dotsContainer.hasChildNodes()) {
      slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `touch-slider-dot${index === 0 ? ' active' : ''}`;
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
      });
    }
    
    // Add event listeners to arrows
    if (arrowPrev) {
      arrowPrev.addEventListener('click', previousSlide);
    }
    
    if (arrowNext) {
      arrowNext.addEventListener('click', nextSlide);
    }
    
    // Add touch events
    slider.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    slider.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
    
    // Add keyboard navigation
    slider.tabIndex = 0;
    slider.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft') previousSlide();
      if (e.key === 'ArrowRight') nextSlide();
    });
    
    // Handle swipe gestures
    function handleSwipe() {
      const diff = touchStartX - touchEndX;
      const threshold = 50; // Minimum swipe distance
      
      if (diff > threshold) {
        nextSlide();
      } else if (diff < -threshold) {
        previousSlide();
      }
    }
    
    // Navigate to previous slide
    function previousSlide() {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      updateSlider();
    }
    
    // Navigate to next slide
    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      updateSlider();
    }
    
    // Go to specific slide
    function goToSlide(index) {
      currentSlide = index;
      updateSlider();
    }
    
    // Update slider position and active dot
    function updateSlider() {
      sliderInner.style.transform = `translateX(-${currentSlide * 100}%)`;
      
      // Update dots
      const dots = slider.querySelectorAll('.touch-slider-dot');
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
      });
      
      // Update ARIA attributes
      slides.forEach((slide, index) => {
        slide.setAttribute('aria-hidden', index !== currentSlide);
      });
    }
  });
}

/**
 * Initialize keyboard navigation indicator
 * Shows keyboard shortcuts when users start navigating with keyboard
 */
function initKeyboardNavigationIndicator() {
  const indicator = document.createElement('div');
  indicator.className = 'keyboard-nav-indicator';
  indicator.innerHTML = `
    <span>Keyboard Navigation:</span>
    <kbd>Tab</kbd> to move, <kbd>Enter</kbd> to select, <kbd>Esc</kbd> to close
  `;
  document.body.appendChild(indicator);
  
  // Show indicator when user navigates with keyboard
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
      indicator.classList.add('active');
      
      // Hide after 5 seconds
      clearTimeout(window.keyboardNavTimeout);
      window.keyboardNavTimeout = setTimeout(() => {
        indicator.classList.remove('active');
      }, 5000);
    }
    
    // Hide on Escape
    if (e.key === 'Escape') {
      indicator.classList.remove('active');
    }
  });
  
  // Hide when mouse is used
  document.addEventListener('mousedown', function() {
    indicator.classList.remove('active');
  });
}
