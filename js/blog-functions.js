/**
 * Blog specific functionality for Simon's portfolio website
 * Handles code highlighting, article interactions, and newsletter
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize code highlighting if library exists
  if (typeof hljs !== 'undefined') {
    hljs.highlightAll();
    
    // Add copy code button functionality to code blocks
    document.querySelectorAll('.code-snippet').forEach(snippet => {
      // Don't add button if it already exists
      if (snippet.querySelector('.copy-code-btn')) return;
      
      const header = snippet.querySelector('.code-header');
      if (!header) return;
      
      const copyBtn = document.createElement('button');
      copyBtn.className = 'copy-code-btn';
      copyBtn.innerHTML = '<i class="far fa-copy"></i>';
      copyBtn.title = 'Copy code';
      
      copyBtn.addEventListener('click', () => {
        const code = snippet.querySelector('code');
        if (!code) return;
        
        // Copy text to clipboard
        navigator.clipboard.writeText(code.textContent).then(() => {
          // Visual feedback
          copyBtn.innerHTML = '<i class="fas fa-check"></i>';
          copyBtn.classList.add('copied');
          
          // Reset after 2 seconds
          setTimeout(() => {
            copyBtn.innerHTML = '<i class="far fa-copy"></i>';
            copyBtn.classList.remove('copied');
          }, 2000);
        });
      });
      
      header.appendChild(copyBtn);
    });
  }
  
  // Handle newsletter subscriptions
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const emailInput = this.querySelector('input[type="email"]');
      if (!emailInput || !emailInput.value.trim()) return;
      
      const email = emailInput.value.trim();
      
      // Show processing state
      this.classList.add('processing');
      const submitBtn = this.querySelector('button');
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
      submitBtn.disabled = true;
      
      // Simulate API call (replace with actual API call)
      setTimeout(() => {
        // Reset form state
        this.classList.remove('processing');
        
        // Show success message
        const formContent = this.innerHTML;
        this.innerHTML = `
          <div class="success-message">
            <i class="fas fa-check-circle"></i>
            <div>
              <strong>Thanks for subscribing!</strong>
              <p>You'll receive updates on new articles and projects.</p>
            </div>
          </div>
        `;
        
        // Store in localStorage to remember user subscribed
        localStorage.setItem('newsletter_subscribed', 'true');
        
        console.log("Newsletter subscription for:", email);
      }, 1500);
    });
    
    // Check if user already subscribed
    if (localStorage.getItem('newsletter_subscribed') === 'true') {
      newsletterForm.innerHTML = `
        <div class="success-message">
          <i class="fas fa-check-circle"></i>
          <div>
            <strong>You're already subscribed!</strong>
            <p>You'll receive updates on new articles and projects.</p>
          </div>
        </div>
      `;
    }
  }
  
  // Calculate and display reading time for articles
  document.querySelectorAll('.article-content').forEach(article => {
    // Don't add if already has reading time
    if (article.querySelector('.reading-time')) return;
    
    const text = article.textContent;
    // Average reading speed is ~200-250 words per minute
    const wordCount = text.split(/\s+/).length;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));
    
    const meta = article.querySelector('.article-meta');
    if (meta) {
      const readingTimeEl = document.createElement('span');
      readingTimeEl.className = 'reading-time';
      readingTimeEl.innerHTML = `<i class="far fa-clock"></i> ${readingTime} min read`;
      meta.appendChild(readingTimeEl);
    }
  });
  
  // Enable related article hover effects
  document.querySelectorAll('.article-card').forEach(card => {
    card.addEventListener('click', function() {
      const link = this.querySelector('a.read-more');
      if (link) link.click();
    });
  });
});
