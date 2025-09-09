<template>
  <nav class="navbar" :class="{ 'scrolled': isScrolled }">
    <div class="nav-container">
      <!-- Logo -->
      <div class="logo">
        <NuxtLink to="/" class="good-times">
            <img src="/logo.jpg" alt="ColorsLogo" class="" style="height: 50px;"/>
            Colors & Signage Solutions
        </NuxtLink>
        <!-- <p class="good-times">Colors & Signage Solutions</p> -->
      </div>
      
      <!-- Desktop Navigation Menu -->
      <ul class="nav-menu" :class="{ 'mobile-open': isMobileMenuOpen }">
        <li v-for="item in navigationItems" :key="item.name">
          <a 
            :href="item.href" 
            class="nav-link"
            @click="handleNavClick(item.href)"
          >
            {{ item.name }}
          </a>
        </li>
        <li>
          <a 
            href="#contact" 
            class="cta-button"
            @click="handleNavClick('#contact')"
          >
            Get a Quote
          </a>
        </li>
      </ul>

      <!-- Mobile Menu Toggle -->
      <button 
        class="mobile-menu-toggle text-black"
        @click="toggleMobileMenu"
        :aria-expanded="isMobileMenuOpen"
        aria-label="Toggle navigation menu"
      >
        <i :class="isMobileMenuOpen ? 'fas fa-times' : 'fas fa-bars'"></i>
      </button>
    </div>

    <!-- Mobile Menu Overlay -->
    <div 
      v-if="isMobileMenuOpen" 
      class="mobile-overlay"
      @click="closeMobileMenu"
    ></div>
  </nav>
</template>

<script>
export default {
  name: 'TheNavbar',
  data() {
    return {
      isScrolled: false,
      isMobileMenuOpen: false,
      navigationItems: [
        { name: 'Home', href: '#home' },
        { name: 'Services', href: '#services' },
        { name: 'Portfolio', href: '#portfolio' },
        { name: 'About', href: '#about' },
        { name: 'Contact', href: '#contact' }
      ]
    }
  },
  mounted() {
    // Add scroll listener for navbar background
    window.addEventListener('scroll', this.handleScroll)
    
    // Add resize listener for mobile menu
    window.addEventListener('resize', this.handleResize)
  },
  beforeUnmount() {
    // Clean up event listeners
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 100
    },
    
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen
      
      // Prevent body scroll when mobile menu is open
      if (this.isMobileMenuOpen) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
    },
    
    closeMobileMenu() {
      this.isMobileMenuOpen = false
      document.body.style.overflow = ''
    },
    
    handleResize() {
      // Close mobile menu on desktop resize
      if (window.innerWidth > 768 && this.isMobileMenuOpen) {
        this.closeMobileMenu()
      }
    },
    
    handleNavClick(href) {
      // Close mobile menu when navigation item is clicked
      if (this.isMobileMenuOpen) {
        this.closeMobileMenu()
      }
      
      // Smooth scroll to section
      if (href.startsWith('#')) {
        this.scrollToSection(href)
      }
    },
    
    scrollToSection(sectionId) {
      const element = document.querySelector(sectionId)
      if (element) {
        const offsetTop = element.offsetTop - 80 // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        })
      }
    }
  }
}
</script>

<style scoped>
/* Navigation Styles */
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  z-index: 1000;
  padding: 10px 0px;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.navbar.scrolled {
  background: rgba(255, 255, 255, 0.98);
  box-shadow: 0 2px 30px rgba(0, 0, 0, 0.15);
}

.nav-container {
  /* max-width: 1200px; */
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo a {
  font-size: 1.8rem;
  font-weight: 700;
  background: linear-gradient(135deg, #2563eb, #f97316);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-decoration: none;
}

.nav-menu {
  display: flex;
  list-style: none;
  gap: 2rem;
  align-items: center;
  margin: 0;
  padding: 0;
}

.nav-link {
  text-decoration: none;
  color: #1f2937;
  font-weight: 500;
  transition: color 0.3s ease;
  padding: 0.5rem 0;
}

.nav-link:hover {
  color: #2563eb;
}

.cta-button {
  background: linear-gradient(135deg, #f97316, #ec4899);
  color: white !important;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(249, 115, 22, 0.3);
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(249, 115, 22, 0.4);
}

/* Mobile Menu */
.mobile-menu-toggle {
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #1f2937;
  cursor: pointer;
  z-index: 1001;
}

.mobile-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

/* Responsive Design */
@media (max-width: 768px) {
  .nav-container {
    padding: 0 1rem;
  }
  
  .mobile-menu-toggle {
    display: block;
  }
  
  .nav-menu {
    position: fixed;
    top: 0;
    right: -100%;
    height: 100vh;
    width: 280px;
    background: white;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 5rem 2rem 2rem;
    gap: 1.5rem;
    transition: right 0.3s ease;
    box-shadow: -4px 0 20px rgba(0, 0, 0, 0.1);
    z-index: 1000;
  }
  
  .nav-menu.mobile-open {
    right: 0;
  }
  
  .nav-menu li {
    width: 100%;
  }
  
  .nav-link {
    display: block;
    width: 100%;
    padding: 1rem 0;
    border-bottom: 1px solid #f3f4f6;
    font-size: 1.1rem;
  }
  
  .cta-button {
    display: block;
    text-align: center;
    margin-top: 1rem;
    width: 100%;
  }
}

@media (max-width: 480px) {
  .logo a {
    font-size: 1.5rem;
  }
  
  .nav-menu {
    width: 100%;
    right: -100%;
  }
  
  .nav-menu.mobile-open {
    right: 0;
  }
}
</style>