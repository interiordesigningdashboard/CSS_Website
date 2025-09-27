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

      <!-- Leadership Section -->
      <div class="mt-20 pt-20 border-t border-gray-200">
        <div class="text-center mb-16">
          <h3 class="text-4xl font-bold text-gray-900 mb-4">
            Our Leadership
          </h3>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Meet the visionary leaders who drive ColorCraft's innovation and excellence
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <!-- CEO Section -->
          <div 
            class="leadership-card text-center group"
            :class="{ 
              'opacity-100 translate-y-0': showLeadership, 
              'opacity-0 translate-y-8': !showLeadership 
            }"
            style="transition-delay: 0.2s"
          >
            <div class="relative mb-6">
              <div class="w-48 h-48 mx-auto rounded-full overflow-hidden shadow-lg ring-4 ring-white group-hover:ring-blue-100 transition-all duration-300">
                <img 
                  :src="leadership.ceo.photo" 
                  :alt="leadership.ceo.name"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  @error="handleImageError($event, 'ceo')"
                />
              </div>
              <!-- Decorative Ring -->
              <div class="absolute inset-0 w-48 h-48 mx-auto rounded-full border-4 border-blue-200 opacity-0 group-hover:opacity-100 scale-110 group-hover:scale-125 transition-all duration-300"></div>
            </div>
            
            <div class="bg-white rounded-2xl p-8 shadow-sm border group-hover:shadow-lg group-hover:border-blue-100 transition-all duration-300">
              <h4 class="text-2xl font-bold text-gray-900 mb-2">{{ leadership.ceo.name }}</h4>
              <p class="text-blue-600 font-semibold mb-4 text-lg">Chief Executive Officer</p>
              <p class="text-gray-600 leading-relaxed">{{ leadership.ceo.description }}</p>
              
              <!-- Social Links (optional) -->
              <div class="flex justify-center gap-4 mt-6" v-if="leadership.ceo.social">
                <a 
                  v-for="(link, platform) in leadership.ceo.social" 
                  :key="platform"
                  :href="link"
                  target="_blank"
                  class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-500 hover:text-white transition-all duration-300"
                >
                  <i :class="getSocialIcon(platform)"></i>
                </a>
              </div>
            </div>
          </div>

          <!-- MD Section -->
          <div 
            class="leadership-card text-center group"
            :class="{ 
              'opacity-100 translate-y-0': showLeadership, 
              'opacity-0 translate-y-8': !showLeadership 
            }"
            style="transition-delay: 0.4s"
          >
            <div class="relative mb-6">
              <div class="w-48 h-48 mx-auto rounded-full overflow-hidden shadow-lg ring-4 ring-white group-hover:ring-orange-100 transition-all duration-300">
                <img 
                  :src="leadership.md.photo" 
                  :alt="leadership.md.name"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  @error="handleImageError($event, 'md')"
                />
              </div>
              <!-- Decorative Ring -->
              <div class="absolute inset-0 w-48 h-48 mx-auto rounded-full border-4 border-orange-200 opacity-0 group-hover:opacity-100 scale-110 group-hover:scale-125 transition-all duration-300"></div>
            </div>
            
            <div class="bg-white rounded-2xl p-8 shadow-sm border group-hover:shadow-lg group-hover:border-orange-100 transition-all duration-300">
              <h4 class="text-2xl font-bold text-gray-900 mb-2">{{ leadership.md.name }}</h4>
              <p class="text-orange-600 font-semibold mb-4 text-lg">Managing Director</p>
              <p class="text-gray-600 leading-relaxed">{{ leadership.md.description }}</p>
              
              <!-- Social Links (optional) -->
              <div class="flex justify-center gap-4 mt-6" v-if="leadership.md.social">
                <a 
                  v-for="(link, platform) in leadership.md.social" 
                  :key="platform"
                  :href="link"
                  target="_blank"
                  class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-orange-500 hover:text-white transition-all duration-300"
                >
                  <i :class="getSocialIcon(platform)"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Dynamic Announcement Bar -->
    <div class="relative overflow-hidden">
      <div 
        class="announcement-bar py-4 transition-all duration-1000 ease-in-out"
        :class="currentAnnouncement.bgClass"
      >
        <div class="max-w-6xl mx-auto px-8">
          <div class="flex items-center justify-center text-center">
            <div class="flex items-center gap-4">
              <!-- Animated Icon -->
              <div class="flex-shrink-0">
                <i 
                  :class="currentAnnouncement.icon" 
                  class="text-white text-xl animate-pulse"
                ></i>
              </div>
              
              <!-- Announcement Text -->
              <div class="announcement-text">
                <p class="text-white font-semibold text-lg md:text-xl">
                  {{ currentAnnouncement.text }}
                </p>
                <p class="text-white/80 text-sm mt-1" v-if="currentAnnouncement.subtext">
                  {{ currentAnnouncement.subtext }}
                </p>
              </div>

              <!-- Call to Action Button -->
              <div class="flex-shrink-0 ml-4" v-if="currentAnnouncement.cta">
                <a 
                  :href="currentAnnouncement.cta.link"
                  class="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-white/20"
                >
                  {{ currentAnnouncement.cta.text }}
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Progress Bar -->
        <div class="absolute bottom-0 left-0 h-1 bg-white/20 w-full">
          <div 
            class="h-full bg-white transition-all duration-100 ease-linear"
            :style="{ width: progressWidth + '%' }"
          ></div>
        </div>

        <!-- Floating Particles (Optional) -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            v-for="particle in particles" 
            :key="particle.id"
            class="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
            :style="particle.style"
          ></div>
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
      showLeadership: false,
      currentStats: [0, 0, 0, 0],
      statsAnimated: false,
      
      // Announcement Bar Data
      currentAnnouncementIndex: 0,
      progressWidth: 0,
      announcementTimer: null,
      progressTimer: null,
      
      announcements: [
        {
          text: '🎉 Grand Opening Special - 30% Off All Signage Projects!',
          subtext: 'Limited time offer expires soon',
          icon: 'fas fa-gift',
          bgClass: 'bg-gradient-to-r from-purple-600 via-pink-600 to-red-500',
          cta: {
            text: 'Claim Offer',
            link: '#contact'
          }
        },
        {
          text: '🚀 New Digital Printing Technology Now Available',
          subtext: 'Experience superior quality and faster turnaround times',
          icon: 'fas fa-print',
          bgClass: 'bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700',
          cta: {
            text: 'Learn More',
            link: '#services'
          }
        },
        {
          text: '⭐ Award Winner - Best Signage Company 2024',
          subtext: 'Thank you for trusting ColorCraft with your projects',
          icon: 'fas fa-trophy',
          bgClass: 'bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500',
          cta: {
            text: 'See Awards',
            link: '#about'
          }
        },
        {
          text: '🌱 Eco-Friendly Materials Now Available',
          subtext: 'Sustainable signage solutions for environmentally conscious businesses',
          icon: 'fas fa-leaf',
          bgClass: 'bg-gradient-to-r from-green-500 via-emerald-500 to-teal-600',
          cta: {
            text: 'Go Green',
            link: '#contact'
          }
        },
        {
          text: '📞 24/7 Customer Support Now Live',
          subtext: 'Get help whenever you need it - day or night',
          icon: 'fas fa-headset',
          bgClass: 'bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600',
          cta: {
            text: 'Contact Us',
            link: '#contact'
          }
        }
      ],

      particles: [],
      
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
      
      leadership: {
        ceo: {
          name: 'John Smith',
          photo: '/images/ceo-photo.jpg', // Replace with actual image path
          description: 'With over 15 years of experience in the signage industry, John leads ColorCraft with a vision for innovation and excellence. His strategic leadership has positioned the company as a market leader.',
          social: {
            linkedin: 'https://linkedin.com/in/johnsmith',
            twitter: 'https://twitter.com/johnsmith'
          }
        },
        md: {
          name: 'Sarah Johnson',
          photo: '/images/md-photo.jpg', // Replace with actual image path
          description: 'Sarah brings extensive operational expertise and a passion for quality to ColorCraft. Her hands-on approach ensures every project meets our highest standards of craftsmanship.',
          social: {
            linkedin: 'https://linkedin.com/in/sarahjohnson',
            instagram: 'https://instagram.com/sarahjohnson'
          }
        }
      },
      
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
  computed: {
    currentAnnouncement() {
      return this.announcements[this.currentAnnouncementIndex]
    }
  },
  mounted() {
    // Show features immediately
    this.showFeatures = true
    
    // Set up intersection observer for stats and leadership
    this.setupIntersectionObserver()
    
    // Fallback: show sections after delay if intersection observer doesn't trigger
    setTimeout(() => {
      if (!this.statsAnimated) {
        this.triggerStatsAnimation()
      }
      this.showLeadership = true
    }, 1000)

    // Initialize announcement bar
    this.startAnnouncementRotation()
    this.generateParticles()
  },
  beforeUnmount() {
    // Clean up timers
    if (this.announcementTimer) {
      clearInterval(this.announcementTimer)
    }
    if (this.progressTimer) {
      clearInterval(this.progressTimer)
    }
  },
  methods: {
    setupIntersectionObserver() {
      const options = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (entry.target === this.$refs.statsContainer && !this.statsAnimated) {
              this.triggerStatsAnimation()
            }
          }
        })
      }, options)

      // Observe the stats container
      if (this.$refs.statsContainer) {
        observer.observe(this.$refs.statsContainer)
      }

      // Show leadership section when it comes into view
      setTimeout(() => {
        this.showLeadership = true
      }, 2000)
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

    handleImageError(event, role) {
      // Fallback to a placeholder or default avatar if image fails to load
      event.target.src = `https://ui-avatars.com/api/?name=${this.leadership[role].name}&size=400&background=random&color=ffffff&bold=true`
    },

    getSocialIcon(platform) {
      const icons = {
        linkedin: 'fab fa-linkedin-in',
        twitter: 'fab fa-twitter',
        instagram: 'fab fa-instagram',
        facebook: 'fab fa-facebook-f'
      }
      return icons[platform] || 'fas fa-link'
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
    },

    // Announcement Bar Methods
    startAnnouncementRotation() {
      const duration = 5000 // 5 seconds per announcement
      const progressInterval = 50 // Update progress every 50ms
      
      // Start progress bar
      this.startProgressBar(duration, progressInterval)
      
      // Set up announcement rotation
      this.announcementTimer = setInterval(() => {
        this.nextAnnouncement()
        this.startProgressBar(duration, progressInterval)
      }, duration)
    },

    startProgressBar(duration, interval) {
      // Clear existing progress timer
      if (this.progressTimer) {
        clearInterval(this.progressTimer)
      }
      
      // Reset progress
      this.progressWidth = 0
      const increment = (100 / duration) * interval
      
      this.progressTimer = setInterval(() => {
        this.progressWidth += increment
        if (this.progressWidth >= 100) {
          this.progressWidth = 100
          clearInterval(this.progressTimer)
        }
      }, interval)
    },

    nextAnnouncement() {
      this.currentAnnouncementIndex = (this.currentAnnouncementIndex + 1) % this.announcements.length
    },

    generateParticles() {
      this.particles = []
      for (let i = 0; i < 8; i++) {
        this.particles.push({
          id: i,
          style: {
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            animationDelay: Math.random() * 4 + 's',
            animationDuration: (Math.random() * 3 + 2) + 's'
          }
        })
      }
    }
  }
}
</script>

<style scoped>
/* Ensure smooth transitions */
.feature-card,
.stat-card,
.leadership-card {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Optional: Add hover effects */
.feature-card:hover {
  transform: translateX(4px);
}

.stat-card:hover {
  transform: translateY(-8px);
}

.leadership-card {
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

/* Image hover effects */
.leadership-card img {
  transition: transform 0.3s ease-in-out;
}

.leadership-card:hover img {
  transform: scale(1.05);
}
</style>