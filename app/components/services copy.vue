<template>
  <section id="services" class="section services">
    <div class="container">
      <!-- Section Header -->
      <div class="section-header">
        <h2 class="section-title">Our Services</h2>
        <p class="section-subtitle">
          Comprehensive signage and printing solutions tailored to elevate your brand and captivate your audience
        </p>
      </div>
      
      <!-- Services Grid -->
      <div class="services-grid">
        <div 
          v-for="(service, index) in services" 
          :key="service.id"
          class="service-card"
          :class="{ 'visible': visibleCards.includes(index) }"
          :style="{ animationDelay: `${index * 0.1}s` }"
          @mouseenter="handleCardHover(index, true)"
          @mouseleave="handleCardHover(index, false)"
        >
          <!-- Service Icon -->
          <div class="service-icon" :class="{ 'hovered': hoveredCard === index }">
            <i :class="service.icon"></i>
          </div>
          
          <!-- Service Content -->
          <div class="service-content">
            <h3>{{ service.title }}</h3>
            <p>{{ service.description }}</p>
            
            <!-- Service Features -->
            <ul class="service-features" v-if="service.features">
              <li v-for="feature in service.features" :key="feature">
                <i class="fas fa-check"></i>
                <span>{{ feature }}</span>
              </li>
            </ul>
            
            <!-- Learn More Button -->
            <button 
              class="learn-more-btn"
              @click="openServiceDetails(service)"
            >
              Learn More
              <i class="fas fa-arrow-right"></i>
            </button>
          </div>
          
          <!-- Gradient Overlay -->
          <div class="card-gradient"></div>
        </div>
      </div>
      
      <!-- Call to Action -->
      <div class="services-cta">
        <h3>Ready to Transform Your Brand?</h3>
        <p>Let's discuss your project and create something amazing together.</p>
        <a href="#contact" class="cta-button" @click="scrollToContact">
          Get Started Today
          <i class="fas fa-rocket"></i>
        </a>
      </div>
    </div>

    <!-- Service Details Modal (Optional) -->
    <div 
      v-if="selectedService" 
      class="service-modal"
      @click="closeServiceDetails"
    >
      <div class="modal-content" @click.stop>
        <button class="modal-close" @click="closeServiceDetails">
          <i class="fas fa-times"></i>
        </button>
        
        <div class="modal-header">
          <div class="modal-icon">
            <i :class="selectedService.icon"></i>
          </div>
          <h2>{{ selectedService.title }}</h2>
        </div>
        
        <div class="modal-body">
          <p>{{ selectedService.detailedDescription }}</p>
          
          <div class="modal-features">
            <h4>What's Included:</h4>
            <ul>
              <li v-for="feature in selectedService.includedFeatures" :key="feature">
                <i class="fas fa-check-circle"></i>
                <span>{{ feature }}</span>
              </li>
            </ul>
          </div>
          
          <div class="modal-actions">
            <button class="btn-primary" @click="requestQuote">
              Request Quote
            </button>
            <button class="btn-secondary" @click="closeServiceDetails">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ServicesSection',
  data() {
    return {
      hoveredCard: null,
      visibleCards: [],
      selectedService: null,
      services: [
        {
          id: 1,
          title: 'Signage Solutions',
          icon: 'fas fa-sign',
          description: 'Custom indoor and outdoor signage designed to maximize visibility and brand impact. From storefront signs to wayfinding systems, we create solutions that guide and inspire.',
          detailedDescription: 'Our comprehensive signage solutions combine innovative design with premium materials to create impactful visual communications. We specialize in both indoor and outdoor applications, ensuring your brand message reaches your audience effectively.',
          features: [
            'Custom Design',
            'Weather Resistant',
            'LED Integration',
            'Installation Service'
          ],
          includedFeatures: [
            'Initial design consultation',
            'Custom artwork and layout',
            'Premium material selection',
            'Professional installation',
            'Maintenance support',
            '2-year warranty'
          ]
        },
        {
          id: 2,
          title: 'Digital Printing',
          icon: 'fas fa-print',
          description: 'High-resolution digital printing services for all your marketing materials. Banners, posters, brochures, and more - all produced with vibrant colors and crisp detail.',
          detailedDescription: 'State-of-the-art digital printing technology delivers exceptional quality for all your marketing and promotional materials. From small-format prints to large-scale banners, we ensure every project meets the highest standards.',
          features: [
            'High Resolution',
            'Color Accuracy',
            'Fast Turnaround',
            'Various Materials'
          ],
          includedFeatures: [
            'Color proofing and approval',
            'Multiple material options',
            'Same-day rush service available',
            'File preparation assistance',
            'Quality guarantee',
            'Finishing options'
          ]
        },
        {
          id: 3,
          title: 'Acrylic Designs',
          icon: 'fas fa-cube',
          description: 'Premium acrylic fabrication for modern, sleek displays. Perfect for awards, architectural elements, retail displays, and contemporary signage solutions.',
          detailedDescription: 'Our acrylic fabrication services offer unlimited possibilities for creating stunning, modern displays. Using precision cutting and forming techniques, we transform ideas into beautiful, durable acrylic products.',
          features: [
            'Precision Cutting',
            'Custom Shapes',
            'LED Compatible',
            'Polished Finish'
          ],
          includedFeatures: [
            '3D design visualization',
            'Precision laser cutting',
            'Edge polishing',
            'Custom mounting options',
            'UV-resistant materials',
            'Assembly and installation'
          ]
        },
        {
          id: 4,
          title: 'Branding',
          icon: 'fas fa-palette',
          description: 'Complete brand identity development from logo design to brand guidelines. We help establish consistent visual communication across all your marketing materials.',
          detailedDescription: 'Build a powerful brand identity that resonates with your target audience. Our comprehensive branding services cover everything from initial concept development to implementation across all touchpoints.',
          features: [
            'Logo Design',
            'Brand Guidelines',
            'Color Palettes',
            'Typography Selection'
          ],
          includedFeatures: [
            'Brand discovery workshop',
            'Logo design and variations',
            'Brand style guide',
            'Color palette development',
            'Typography selection',
            'Business card design'
          ]
        },
        {
          id: 5,
          title: 'Custom Display Solutions',
          icon: 'fas fa-tv',
          description: 'Innovative display systems for trade shows, retail environments, and special events. Portable, durable, and designed to showcase your products effectively.',
          detailedDescription: 'Create memorable experiences with our custom display solutions. Whether for trade shows, retail spaces, or special events, our displays are designed to attract attention and drive engagement.',
          features: [
            'Portable Design',
            'Easy Assembly',
            'Modular System',
            'Graphics Included'
          ],
          includedFeatures: [
            'Custom display design',
            'Portable framework system',
            'High-quality graphics printing',
            'Assembly instructions',
            'Carrying case included',
            'Setup assistance available'
          ]
        }
      ]
    }
  },
  mounted() {
    this.setupIntersectionObserver()
  },
  methods: {
    setupIntersectionObserver() {
      const options = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            const cardIndex = parseInt(entry.target.dataset.index)
            if (!this.visibleCards.includes(cardIndex)) {
              this.visibleCards.push(cardIndex)
            }
          }
        })
      }, options)

      // Observe all service cards
      this.$nextTick(() => {
        const cards = document.querySelectorAll('.service-card')
        cards.forEach((card, index) => {
          card.dataset.index = index
          observer.observe(card)
        })
      })
    },

    handleCardHover(index, isHovered) {
      this.hoveredCard = isHovered ? index : null
    },

    openServiceDetails(service) {
      this.selectedService = service
      document.body.style.overflow = 'hidden' // Prevent background scroll
    },

    closeServiceDetails() {
      this.selectedService = null
      document.body.style.overflow = '' // Restore scroll
    },

    requestQuote() {
      this.closeServiceDetails()
      this.scrollToContact()
    },

    scrollToContact() {
      const element = document.querySelector('#contact')
      if (element) {
        const offsetTop = element.offsetTop - 80
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
/* Services Section Styles */
.section {
  padding: 5rem 0;
}

.services {
  background: #f9fafb;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Section Header */
.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #1f2937;
  background: linear-gradient(135deg, #2563eb, #f97316);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.section-subtitle {
  font-size: 1.1rem;
  color: #6b7280;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Services Grid */
.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.service-card {
  background: white;
  padding: 2.5rem;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  opacity: 0;
  transform: translateY(50px);
  border: 1px solid transparent;
}

.service-card.visible {
  opacity: 1;
  transform: translateY(0);
  animation: slideInUp 0.6s ease forwards;
}

.service-card:hover {
  transform: translateY(-15px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  border-color: rgba(37, 99, 235, 0.2);
}

.card-gradient {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(135deg, #2563eb, #f97316, #10b981);
  transform: scaleX(0);
  transition: transform 0.4s ease;
  transform-origin: left;
}

.service-card:hover .card-gradient {
  transform: scaleX(1);
}

/* Service Icon */
.service-icon {
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #2563eb, #f97316);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  transition: all 0.3s ease;
}

.service-icon.hovered {
  transform: scale(1.1) rotate(5deg);
}

/* Service Content */
.service-content h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1f2937;
}

.service-content p {
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

/* Service Features */
.service-features {
  list-style: none;
  margin: 1.5rem 0;
  padding: 0;
  text-align: left;
}

.service-features li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: #4b5563;
}

.service-features i {
  color: #10b981;
  font-size: 0.8rem;
}

/* Learn More Button */
.learn-more-btn {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.learn-more-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
}

.learn-more-btn i {
  transition: transform 0.3s ease;
}

.learn-more-btn:hover i {
  transform: translateX(3px);
}

/* Services CTA */
.services-cta {
  text-align: center;
  background: white;
  padding: 3rem 2rem;
  border-radius: 20px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
}

.services-cta h3 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #1f2937;
}

.services-cta p {
  font-size: 1.1rem;
  color: #6b7280;
  margin-bottom: 2rem;
}

.cta-button {
  background: linear-gradient(135deg, #f97316, #ec4899);
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
  box-shadow: 0 4px 20px rgba(249, 115, 22, 0.3);
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(249, 115, 22, 0.4);
}

/* Service Modal */
.service-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
}

.modal-content {
  background: white;
  border-radius: 20px;
  max-width: 600px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
  animation: modalSlideIn 0.3s ease;
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #f3f4f6;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 1001;
}

.modal-close:hover {
  background: #e5e7eb;
  color: #ef4444;
}

.modal-header {
  text-align: center;
  padding: 2rem 2rem 1rem;
}

.modal-icon {
  font-size: 4rem;
  background: linear-gradient(135deg, #2563eb, #f97316);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
}

.modal-header h2 {
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
}

.modal-body {
  padding: 0 2rem 2rem;
}

.modal-body p {
  font-size: 1.1rem;
  color: #4b5563;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.modal-features h4 {
  font-size: 1.2rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1rem;
}

.modal-features ul {
  list-style: none;
  padding: 0;
  margin-bottom: 2rem;
}

.modal-features li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  padding: 0.5rem;
  background: #f9fafb;
  border-radius: 8px;
}

.modal-features i {
  color: #10b981;
  font-size: 1rem;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-primary {
  background: linear-gradient(135deg, #2563eb, #3b82f6);
  color: white;
  border: none;
  padding: 0.875rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(37, 99, 235, 0.3);
}

.btn-secondary {
  background: transparent;
  color: #6b7280;
  border: 2px solid #e5e7eb;
  padding: 0.875rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  border-color: #d1d5db;
  color: #4b5563;
}

/* Animations */
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(-50px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .section {
    padding: 3rem 0;
  }
  
  .container {
    padding: 0 1rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .services-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .service-card {
    padding: 2rem;
  }
  
  .services-cta {
    padding: 2rem 1.5rem;
  }
  
  .services-cta h3 {
    font-size: 1.5rem;
  }
  
  .modal-content {
    margin: 1rem;
    max-height: 90vh;
  }
  
  .modal-header,
  .modal-body {
    padding: 1.5rem;
  }
  
  .modal-actions {
    flex-direction: column;
  }
  
  .btn-primary,
  .btn-secondary {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .service-card {
    padding: 1.5rem;
  }
  
  .service-icon {
    font-size: 2.5rem;
  }
  
  .services-cta {
    padding: 1.5rem 1rem;
  }
}
</style>