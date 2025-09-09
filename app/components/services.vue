<template>
  <section id="services" class="py-20 bg-gray-50">
    <div class="max-w-6xl mx-auto px-8">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold mb-4 text-gray-900 bg-gradient-to-r from-blue-600 via-orange-500 to-emerald-500 bg-clip-text text-transparent">
          Our Services
        </h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Comprehensive signage and printing solutions tailored to elevate your brand and captivate your audience
        </p>
      </div>
      
      <!-- Services Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <div 
          v-for="(service, index) in services" 
          :key="service.id"
          class="service-card bg-white p-10 rounded-3xl text-center shadow-lg transition-all duration-500 ease-out relative overflow-hidden border border-transparent hover:shadow-2xl hover:border-blue-200 group"
          :class="{ 
            'opacity-100 translate-y-0': visibleCards.includes(index),
            'opacity-0 translate-y-12': !visibleCards.includes(index)
          }"
          :style="{ animationDelay: `${index * 0.1}s` }"
          @mouseenter="handleCardHover(index, true)"
          @mouseleave="handleCardHover(index, false)"
        >
          <!-- Gradient Top Border -->
          <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-orange-500 to-emerald-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          
          <!-- Service Icon -->
          <div class="text-6xl mb-6 bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent transition-all duration-300"
               :class="{ 'transform scale-110 rotate-12': hoveredCard === index }">
            <i :class="service.icon"></i>
          </div>
          
          <!-- Service Content -->
          <div class="service-content">
            <h3 class="text-2xl font-semibold mb-4 text-gray-900">{{ service.title }}</h3>
            <p class="text-gray-600 leading-relaxed mb-6">{{ service.description }}</p>
            
            <!-- Service Features -->
            <ul class="text-left mb-6 space-y-2" v-if="service.features">
              <li v-for="feature in service.features" :key="feature" class="flex items-center gap-2 text-sm text-gray-700">
                <i class="fas fa-check text-emerald-500 text-xs"></i>
                <span>{{ feature }}</span>
              </li>
            </ul>
            
            <!-- Learn More Button -->
            <button 
              class="bg-gradient-to-r from-blue-500 to-blue-700 text-white border-none py-3 px-6 rounded-full font-semibold cursor-pointer transition-all duration-300 inline-flex items-center gap-2 text-sm hover:shadow-lg hover:shadow-blue-500/30 group"
              @click="openServiceDetails(service)"
            >
              Learn More
              <i class="fas fa-arrow-right transition-transform duration-300 group-hover:translate-x-1"></i>
            </button>
          </div>
        </div>
      </div>
      
      <!-- Call to Action -->
      <!-- <div class="text-center bg-white py-12 px-8 rounded-3xl shadow-xl border border-gray-200">
        <h3 class="text-3xl font-bold mb-4 text-gray-900">Ready to Transform Your Brand?</h3>
        <p class="text-lg text-gray-600 mb-8">Let's discuss your project and create something amazing together.</p>
        <a href="#contact" 
           class="bg-gradient-to-r from-orange-500 to-pink-500 text-white py-4 px-8 rounded-full no-underline font-semibold text-lg inline-flex items-center gap-2 transition-all duration-300 shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 hover:-translate-y-1"
           @click="scrollToContact">
          Get Started Today
          <i class="fas fa-rocket"></i>
        </a>
      </div> -->
      <div 
  class="relative text-center bg-gradient-to-r from-blue-500 via-orange-500 to-pink-500 py-12 px-8 rounded-3xl shadow-xl border border-gray-200 overflow-hidden"
>
  <!-- Sparkle overlay -->
  <div class="absolute inset-0 pointer-events-none sparkle"></div>

  <h3 class="text-3xl font-bold mb-4 text-white">Ready to Transform Your Brand?</h3>
  <p class="text-lg text-white/80 mb-8">Let's discuss your project and create something amazing together.</p>
  <a href="#contact" 
     class="bg-white text-orange-600 py-4 px-8 rounded-full no-underline font-semibold text-lg inline-flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
     @click="scrollToContact">
    Get Started Today
    <i class="fas fa-rocket"></i>
  </a>
</div>

    </div>

    <!-- Service Details Modal -->
    <div 
      v-if="selectedService" 
      class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-8"
      @click="closeServiceDetails"
    >
      <div class="bg-white rounded-3xl max-w-2xl w-full max-h-[80vh] overflow-y-auto relative animate-in slide-in-from-bottom-12 fade-in duration-300" @click.stop>
        <button class="absolute top-4 right-4 bg-gray-100 border-none w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 z-50 hover:bg-gray-200 hover:text-red-500"
                @click="closeServiceDetails">
          <i class="fas fa-times"></i>
        </button>
        
        <div class="text-center py-8 px-8 pb-4">
          <div class="text-6xl bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent mb-4">
            <i :class="selectedService.icon"></i>
          </div>
          <h2 class="text-3xl font-bold text-gray-900 m-0">{{ selectedService.title }}</h2>
        </div>
        
        <div class="px-8 pb-8">
          <p class="text-lg text-gray-700 leading-relaxed mb-8">{{ selectedService.detailedDescription }}</p>
          
          <div class="mb-8">
            <h4 class="text-xl font-semibold text-gray-900 mb-4">What's Included:</h4>
            <ul class="list-none p-0 space-y-3">
              <li v-for="feature in selectedService.includedFeatures" :key="feature" class="flex items-center gap-3 py-2 px-2 bg-gray-50 rounded-lg">
                <i class="fas fa-check-circle text-emerald-500"></i>
                <span class="text-gray-700">{{ feature }}</span>
              </li>
            </ul>
          </div>
          
          <div class="flex gap-4 justify-center flex-wrap">
            <button class="bg-gradient-to-r from-blue-600 to-blue-500 text-white border-none py-3.5 px-6 rounded-full font-semibold cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-600/30"
                    @click="requestQuote">
              Request Quote
            </button>
            <button class="bg-transparent text-gray-600 border-2 border-gray-300 py-3.5 px-6 rounded-full font-semibold cursor-pointer transition-all duration-300 hover:border-gray-400 hover:text-gray-700"
                    @click="closeServiceDetails">
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
.sparkle {
  background-image: radial-gradient(white 1px, transparent 1px);
  background-size: 3px 3px;
  opacity: 0.2;
  animation: sparkleAnim 4s infinite ease-in-out alternate;
}

@keyframes sparkleAnim {
  0%   { opacity: 0.1; transform: translateY(0) translateX(0); }
  50%  { opacity: 0.3; transform: translateY(-5px) translateX(5px); }
  100% { opacity: 0.15; transform: translateY(0) translateX(0); }
}
</style>