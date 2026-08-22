document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById('particles-canvas');
  const ctx = canvas.getContext('2d');
  
  // Set canvas size
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  // Enhanced color palette (more vibrant)
  const colors = [
    '#3498db',  // Bright blue
    '#e74c3c',  // Vibrant red
    '#2ecc71',  // Emerald green
    '#f1c40f',  // Vivid yellow
    '#9b59b6',  // Purple
    '#1abc9c',  // Turquoise
    '#e67e22',  // Carrot orange
    '#e84393'   // Pink
  ];
  
  // Particle settings with more contrast
  const particles = [];
  const particleCount = window.innerWidth < 768 ? 40 : 100; // Increased count
  const maxParticleSize = 4; // Larger particles
  const minParticleSize = 1.5;
  
  // Particle class with enhanced visibility
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * (maxParticleSize - minParticleSize) + minParticleSize;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.speedX = Math.random() * 2 - 1; // Slightly faster movement
      this.speedY = Math.random() * 2 - 1;
      this.opacity = Math.random() * 0.8 + 0.2; // More opaque
      this.baseOpacity = this.opacity;
    }
    
    update() {
      // Bounce off edges
      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      
      this.x += this.speedX;
      this.y += this.speedY;
      
      // Mouse interaction - more pronounced effect
      if (mouse.x && mouse.y) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 120) { // Larger interaction radius
          this.opacity = 1; // Full opacity near mouse
          this.size = maxParticleSize * 1.5; // Grow when near mouse
          
          // Push particles away more noticeably
          this.x -= dx * 0.03;
          this.y -= dy * 0.03;
        } else {
          this.opacity = this.baseOpacity;
          this.size = Math.max(minParticleSize, this.size * 0.95); // Shrink back
        }
      }
    }
    
    draw() {
      // Draw glow effect
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
      const glowGradient = ctx.createRadialGradient(
        this.x, this.y, 0,
        this.x, this.y, this.size * 2
      );
      glowGradient.addColorStop(0, this.color);
      glowGradient.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = glowGradient;
      ctx.globalAlpha = this.opacity * 0.3;
      ctx.fill();
      
      // Draw main particle
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.opacity;
      ctx.fill();
      
      ctx.globalAlpha = 1; // Reset alpha
    }
  }
  
  // Mouse position tracking
  const mouse = {
    x: null,
    y: null
  };
  
  window.addEventListener('mousemove', function(event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
  });
  
  // Initialize particles
  function init() {
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }
  
  // Animation loop with connection lines
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw connecting lines with more visibility
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 120) { // Increased connection distance
          ctx.beginPath();
          
          // Use gradient for connection lines
          const lineGradient = ctx.createLinearGradient(
            particles[i].x, particles[i].y,
            particles[j].x, particles[j].y
          );
          lineGradient.addColorStop(0, particles[i].color);
          lineGradient.addColorStop(1, particles[j].color);
          
          ctx.strokeStyle = lineGradient;
          ctx.globalAlpha = 0.7 * (1 - distance/120); // More visible lines
          ctx.lineWidth = 0.8; // Thicker lines
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
      particles[i].update();
      particles[i].draw();
    }
    
    requestAnimationFrame(animate);
  }
  
  // Handle window resize
  window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
  
  // Add mouse leave event to reset particles when mouse leaves window
  window.addEventListener('mouseleave', function() {
    mouse.x = null;
    mouse.y = null;
  });
  
  init();
  animate();
});