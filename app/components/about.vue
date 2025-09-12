<template>
  <section id="about" class="py-20 bg-gray-50">
    <div class="max-w-6xl mx-auto px-8">
      <!-- Main About Content -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
        <!-- About Text -->
        <div class="lg:pr-8">
          <h2 class="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
            About ColorCraft
          </h2>
          <p class="text-lg text-gray-600 mb-6 leading-relaxed">
            With over a decade of experience in the signage and printing industry, ColorCraft has 
            established itself as a leader in innovative visual solutions. We combine cutting-edge 
            technology with artistic creativity to deliver exceptional results that exceed our 
            clients' expectations.
          </p>
          
          <p class="text-lg text-gray-600 mb-8 leading-relaxed">
            Our team of skilled designers, fabricators, and project managers work collaboratively 
            to ensure every project is completed with precision, on time, and within budget. We 
            pride ourselves on our attention to detail and commitment to quality.
          </p>

          <!-- Company Features -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div 
              v-for="(feature, index) in features" 
              :key="feature.text"
              class="feature-card flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-transparent transition-all duration-500 hover:shadow-md hover:border-blue-100"
              :class="{ 
                'opacity-100 translate-x-0': showFeatures, 
                'opacity-0 -translate-x-8': !showFeatures 
              }"
              :style="{ transitionDelay: `${index * 0.1}s` }"
            >
              <div class="w-10 h-10 bg-gradient-to-br from-green-500 to-green-400 rounded-full flex items-center justify-center text-white">
                <i :class="feature.icon" class="text-sm"></i>
              </div>
              <span class="font-semibold text-gray-900">{{ feature.text }}</span>
            </div>
          </div>

          <!-- Call to Action -->
          <div class="mt-8">
            <a 
              href="#contact" 
              @click="scrollToContact"
              class="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl shadow-lg shadow-blue-600/30 group"
            >
              <span>Work With Us</span>
              <i class="fas fa-arrow-right transition-transform duration-300 group-hover:translate-x-1"></i>
            </a>
          </div>
        </div>

        <!-- About Visual -->
        <div class="flex flex-col gap-8">
          <!-- Company Stats -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8" ref="statsContainer">
            <div 
              v-for="(stat, index) in stats" 
              :key="stat.label"
              class="stat-card bg-white p-8 rounded-2xl text-center shadow-sm border transition-all duration-500 hover:-translate-y-2 hover:shadow-lg hover:border-blue-100"
              :class="{ 
                'opacity-100 translate-y-0': showStats, 
                'opacity-0 translate-y-8': !showStats 
              }"
              :style="{ transitionDelay: `${index * 0.2}s` }"
            >
              <div class="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent mb-2">
                <span class="stat-number">{{ currentStats[index] }}</span>
                <span class="text-2xl">{{ stat.suffix }}</span>
              </div>
              <div class="text-sm text-gray-500 font-semibold uppercase tracking-wide">{{ stat.label }}</div>
            </div>
          </div>

          <!-- Company Image/Illustration -->
          <div class="relative h-80">
            <div class="bg-gradient-to-br from-blue-50 to-pink-50 rounded-3xl h-full flex items-center justify-center relative overflow-hidden">
              <!-- Floating Elements -->
              <div class="absolute inset-0">
                <div 
                  v-for="(element, index) in floatingElements" 
                  :key="index"
                  class="absolute text-3xl opacity-60"
                  :class="element.classes"
                  :style="element.position"
                >
                  <i :class="element.icon"></i>
                </div>
              </div>
              <!-- Main Icon -->
              <div class="text-8xl text-blue-600 opacity-30 relative z-10">
                <i class="fas fa-building"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AboutSection',
  data() {
    return {
      showFeatures: false,
      showStats: false,
      currentStats: [0, 0, 0, 0],
      statsAnimated: false,
      
      features: [
        {
          icon: 'fas fa-check-circle',
          text: 'Premium Quality Materials'
        },
        {
          icon: 'fas fa-check-circle',
          text: 'Expert Craftsmanship'
        },
        {
          icon: 'fas fa-check-circle',
          text: 'Innovative Design Solutions'
        },
        {
          icon: 'fas fa-check-circle',
          text: 'Timely Project Delivery'
        }
      ],
      
      stats: [
        {
          number: 10000,
          suffix: '+',
          label: 'Projects Completed'
        },
        {
          number: 26,
          suffix: '+',
          label: 'Years Experience'
        },
        {
          number: 98,
          suffix: '%',
          label: 'Client Satisfaction'
        },
        {
          number: 24,
          suffix: 'hr',
          label: 'Support Available'
        }
      ],
      
      floatingElements: [
        {
          icon: 'fas fa-lightbulb',
          classes: 'text-yellow-500 animate-bounce',
          position: { top: '15%', left: '20%' }
        },
        {
          icon: 'fas fa-palette',
          classes: 'text-pink-500 animate-pulse',
          position: { top: '60%', right: '25%' }
        },
        {
          icon: 'fas fa-cogs',
          classes: 'text-green-500 animate-bounce',
          position: { bottom: '20%', left: '15%' }
        }
      ]
    }
  },
  mounted() {
    // Show features immediately
    this.showFeatures = true
    
    // Set up intersection observer for stats
    this.setupIntersectionObserver()
    
    // Fallback: show stats after delay if intersection observer doesn't trigger
    setTimeout(() => {
      if (!this.statsAnimated) {
        this.triggerStatsAnimation()
      }
    }, 1000)
  },
  methods: {
    setupIntersectionObserver() {
      const options = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !this.statsAnimated) {
            this.triggerStatsAnimation()
          }
        })
      }, options)

      // Observe the stats container
      if (this.$refs.statsContainer) {
        observer.observe(this.$refs.statsContainer)
      }
    },

    triggerStatsAnimation() {
      this.showStats = true
      this.statsAnimated = true
      
      // Start animating numbers after a short delay
      setTimeout(() => {
        this.animateAllStats()
      }, 300)
    },

    animateAllStats() {
      this.stats.forEach((stat, index) => {
        this.animateStatNumber(index, stat.number)
      })
    },

    animateStatNumber(index, targetNumber) {
      const duration = 2000
      const steps = 60
      const stepDuration = duration / steps
      const increment = targetNumber / steps
      let currentValue = 0
      let step = 0

      const animate = () => {
        step++
        currentValue = Math.min(increment * step, targetNumber)
        
        // Update the specific stat value
        this.currentStats.splice(index, 1, Math.floor(currentValue))
        
        if (step < steps) {
          setTimeout(animate, stepDuration)
        } else {
          // Ensure we end with the exact target number
          this.currentStats.splice(index, 1, targetNumber)
        }
      }

      animate()
    },

    scrollToContact(e) {
      e.preventDefault()
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
/* Ensure smooth transitions */
.feature-card,
.stat-card {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Optional: Add hover effects */
.feature-card:hover {
  transform: translateX(4px);
}

.stat-card:hover {
  transform: translateY(-8px);
}
</style>