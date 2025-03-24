// script.js

// Initialize Intersection Observer
const initScrollAnimations = () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fadeInUp');
        }
      });
    }, { threshold: 0.1 });
  
    document.querySelectorAll('.scroll-animate').forEach(element => {
      observer.observe(element);
    });
  };
  
  // Handle navbar scroll effects
  const handleNavbarScroll = () => {
    const navbar = document.getElementById('navbar');
    const scrollProgress = document.getElementById('scroll-progress');
    const scrollTopButton = document.getElementById('scrollTop');
  
    window.addEventListener('scroll', () => {
      // Scroll progress bar
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (window.scrollY / windowHeight) * 100;
      scrollProgress.style.width = `${scrolled}%`;
  
      // Navbar background
      navbar.classList.toggle('bg-gray-800', window.scrollY > 100);
  
      // Scroll to top button
      scrollTopButton.classList.toggle('visible', window.scrollY > 300);
      scrollTopButton.classList.toggle('opacity-100', window.scrollY > 300);
    });
  };
  
  // Handle contact form submission
  const handleContactForm = () => {
    const form = document.getElementById('contactForm');
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formData = new FormData(form);
      const submitButton = form.querySelector('button[type="submit"]');
      
      try {
        submitButton.disabled = true;
        submitButton.innerHTML = 'Sending...';
  
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        showToast('Message sent successfully!', 'success');
        form.reset();
      } catch (error) {
        showToast('Failed to send message. Please try again.', 'error');
      } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = 'Send Message';
      }
    });
  };
  
  // Show toast notifications
  const showToast = (message, type = 'info') => {
    const toast = document.createElement('div');
    toast.className = `fixed bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-lg ${
      type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
    }`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.remove();
    }, 3000);
  };
  
  // Initialize smooth scroll
  const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  };
  
  // Initialize all functionality
  const initPortfolio = () => {
    initScrollAnimations();
    handleNavbarScroll();
    handleContactForm();
    initSmoothScroll();
    
    // Set copyright year
    document.getElementById('copyright-year').textContent = new Date().getFullYear();
  };
  
  // Start the application when DOM loads
  document.addEventListener('DOMContentLoaded', initPortfolio);