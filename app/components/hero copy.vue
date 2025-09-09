<template>
  <section id="home" class="hero">
    <!-- Animated Background Elements -->
    <div class="hero-bg">
      <div class="floating-shapes">
        <div 
          v-for="(shape, index) in backgroundShapes" 
          :key="index"
          class="shape"
          :style="shape.style"
        ></div>
      </div>
    </div>

    <div class="hero-content">
      <!-- Main Headline with Typing Effect -->
      <h1 class="hero-title">
        <span ref="typingText">{{ displayedText }}</span>
        <span class="cursor" :class="{ 'blink': showCursor }">|</span>
      </h1>
      
      <!-- Subtitle -->
      <p 
        class="hero-subtitle"
        :class="{ 'fade-in': subtitleVisible }"
      >
        {{ subtitle }}
      </p>
      
      <!-- Call to Action Button -->
      <div class="hero-actions" :class="{ 'slide-up': actionsVisible }">
        <a 
          href="#contact" 
          class="hero-button"
          @click="scrollToContact"
        >
          <span>{{ buttonText }}</span>
          <i class="fas fa-arrow-right"></i>
        </a>
        
        <!-- Secondary Action -->
        <a 
          href="#portfolio" 
          class="hero-button-secondary"
          @click="scrollToPortfolio"
        >
          <span>View Our Work</span>
        </a>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="scroll-indicator" @click="scrollToNext">
      <div class="scroll-arrow">
        <i class="fas fa-chevron-down"></i>
      </div>
      <span>Scroll to explore</span>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HeroSection',
  data() {
    return {
      // Main content
      fullText: 'Transforming Spaces with Innovative Signage & Printing',
      displayedText: '',
      subtitle: 'Bringing your brand to life with cutting-edge design solutions, premium quality materials, and expert craftsmanship that makes your business stand out.',
      buttonText: 'Start Your Project',
      
      // Animation states
      currentIndex: 0,
      showCursor: true,
      subtitleVisible: false,
      actionsVisible: false,
      
      // Background shapes for animation
      backgroundShapes: [
        {
          style: {
            top: '20%',
            left: '10%',
            width: '100px',
            height: '100px',
            background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(249, 115, 22, 0.1))',
            borderRadius: '50%',
            animation: 'float 6s ease-in-out infinite'
          }
        },
        {
          style: {
            top: '60%',
            right: '15%',
            width: '150px',
            height: '150px',
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(236, 72, 153, 0.1))',
            borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
            animation: 'float 8s ease-in-out infinite reverse'
          }
        },
        {
          style: {
            bottom: '30%',
            left: '5%',
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.1), rgba(59, 130, 246, 0.1))',
            borderRadius: '50%',
            animation: 'float 7s ease-in-out infinite'
          }
        }
      ]
    }
  },
  mounted() {
    this.startTypingAnimation()
    this.startCursorBlink()
  },
  methods: {
    startTypingAnimation() {
      const typeSpeed = 150 // milliseconds per character
      
      const typeText = () => {
        if (this.currentIndex < this.fullText.length) {
          this.displayedText += this.fullText.charAt(this.currentIndex)
          this.currentIndex++
          setTimeout(typeText, typeSpeed)
        } else {
          // Text complete, show subtitle and actions
          setTimeout(() => {
            this.subtitleVisible = true
            setTimeout(() => {
              this.actionsVisible = true
            }, 300)
          }, 500)
        }
      }
      
      // Start typing after a short delay
      setTimeout(typeText, 100)
    },
    
    startCursorBlink() {
      setInterval(() => {
        this.showCursor = !this.showCursor
      }, 800)
    },
    
    scrollToContact(event) {
      event.preventDefault()
      this.scrollToSection('#contact')
    },
    
    scrollToPortfolio(event) {
      event.preventDefault()
      this.scrollToSection('#portfolio')
    },
    
    scrollToNext() {
      this.scrollToSection('#services')
    },
    
    scrollToSection(sectionId) {
      const element = document.querySelector(sectionId)
      if (element) {
        const offsetTop = element.offsetTop - 100
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
/* Hero Section Styles */
.hero {
  background: linear-gradient(135deg, #eff6ff 0%, #fdf2f8 50%, #fff7ed 100%);
  /* padding: 8rem 0 4rem; */
  text-align: center;
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* Animated Background */
.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
}

.floating-shapes {
  position: relative;
  width: 100%;
  height: 100%;
}

.shape {
  position: absolute;
  z-index: 1;
}

/* Hero Content */
.hero-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 2;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #2563eb, #f97316, #10b981);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.2;
  min-height: 4.2rem; /* Prevent layout shift during typing */
}

.cursor {
  color: #f97316;
  font-weight: normal;
  animation: none;
}

.cursor.blink {
  animation: blink 1.2s infinite;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: #1f2937;
  margin-bottom: 2rem;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s ease;
  line-height: 1.6;
}

.hero-subtitle.fade-in {
  opacity: 0.8;
  transform: translateY(0);
}

/* Hero Actions */
.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease;
}

.hero-actions.slide-up {
  opacity: 1;
  transform: translateY(0);
}

.hero-button {
  background: linear-gradient(135deg, #2563eb, #3b82f6);
  color: white;
  padding: 1rem 2rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(37, 99, 235, 0.3);
}

.hero-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(37, 99, 235, 0.4);
}

.hero-button i {
  transition: transform 0.3s ease;
}

.hero-button:hover i {
  transform: translateX(3px);
}

.hero-button-secondary {
  color: #1f2937;
  padding: 1rem 2rem;
  border: 2px solid #e5e7eb;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.hero-button-secondary:hover {
  border-color: #2563eb;
  color: #2563eb;
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(37, 99, 235, 0.2);
}

/* Scroll Indicator */
.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  z-index: 2;
  opacity: 0.7;
  transition: opacity 0.3s ease;
}

.scroll-indicator:hover {
  opacity: 1;
}

.scroll-arrow {
  width: 40px;
  height: 40px;
  border: 2px solid #2563eb;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: bounce 2s infinite;
}

.scroll-arrow i {
  color: #2563eb;
  font-size: 1rem;
}

.scroll-indicator span {
  font-size: 0.9rem;
  color: #1f2937;
  font-weight: 500;
}

/* Animations */
@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

@keyframes float {
  0%, 100% { 
    transform: translateY(0px) rotate(0deg);
  }
  33% { 
    transform: translateY(-20px) rotate(5deg);
  }
  66% { 
    transform: translateY(-10px) rotate(-3deg);
  }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero {
    padding: 6rem 0 3rem;
    min-height: 90vh;
  }
  
  .hero-title {
    font-size: 2.5rem;
    min-height: 3rem;
  }
  
  .hero-subtitle {
    font-size: 1.1rem;
  }
  
  .hero-actions {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .hero-button,
  .hero-button-secondary {
    width: 100%;
    max-width: 280px;
    justify-content: center;
  }
  
  .floating-shapes .shape {
    opacity: 0.5;
  }
  
  .scroll-indicator {
    bottom: 1rem;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
    min-height: 2.4rem;
  }
  
  .hero-content {
    padding: 0 1rem;
  }
  
  .hero-button,
  .hero-button-secondary {
    padding: 0.875rem 1.5rem;
    font-size: 1rem;
  }
}

/* Parallax effect on scroll */
@media (prefers-reduced-motion: no-preference) {
  .hero-content {
    transform: translateY(0);
    transition: transform 0.1s ease-out;
  }
}
</style>