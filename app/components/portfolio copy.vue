<template>
  <section id="portfolio" class="section portfolio">
    <div class="container">
      <!-- Section Header -->
      <div class="section-header">
        <h2 class="section-title">Our Portfolio</h2>
        <p class="section-subtitle">
          Explore our recent projects and see how we've helped businesses transform their spaces
        </p>
      </div>

      <!-- Filter Tabs -->
      <div class="portfolio-filters">
        <button 
          v-for="filter in filters"
          :key="filter.value"
          class="filter-btn"
          :class="{ active: activeFilter === filter.value }"
          @click="setActiveFilter(filter.value)"
        >
          {{ filter.label }}
        </button>
      </div>

      <!-- Portfolio Grid -->
      <div class="portfolio-grid">
        <div 
          v-for="(item, index) in filteredProjects"
          :key="item.id"
          class="portfolio-item"
          :class="{ 
            'visible': visibleItems.includes(item.id),
            'loading': item.loading 
          }"
          :style="{ animationDelay: `${index * 0.1}s` }"
          @click="openLightbox(item)"
        >
          <!-- Project Image -->
          <div class="portfolio-image">
            <div class="image-placeholder" :style="{ background: item.gradient }">
              <i :class="item.icon"></i>
            </div>
            <img 
              v-if="item.image" 
              :src="item.image" 
              :alt="item.title"
              @load="handleImageLoad(item.id)"
              @error="handleImageError(item.id)"
            >
          </div>

          <!-- Portfolio Overlay -->
          <div class="portfolio-overlay">
            <div class="portfolio-text">
              <h3>{{ item.title }}</h3>
              <p>{{ item.category }}</p>
              <div class="project-tags">
                <span 
                  v-for="tag in item.tags" 
                  :key="tag"
                  class="tag"
                >
                  {{ tag }}
                </span>
              </div>
              <button class="view-project-btn">
                <i class="fas fa-eye"></i>
                View Project
              </button>
            </div>
          </div>

          <!-- Project Stats -->
          <div class="project-stats">
            <div class="stat">
              <i class="fas fa-calendar"></i>
              <span>{{ item.year }}</span>
            </div>
            <div class="stat">
              <i class="fas fa-map-marker-alt"></i>
              <span>{{ item.location }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Load More Button -->
      <div class="load-more-section" v-if="hasMoreProjects">
        <button 
          class="load-more-btn"
          @click="loadMoreProjects"
          :disabled="isLoading"
        >
          <span v-if="!isLoading">Load More Projects</span>
          <span v-else>
            <i class="fas fa-spinner fa-spin"></i>
            Loading...
          </span>
        </button>
      </div>

      <!-- Portfolio CTA -->
      <div class="portfolio-cta">
        <h3>Have a Project in Mind?</h3>
        <p>Let's bring your vision to life with our expert design and fabrication services.</p>
        <a href="#contact" class="cta-button" @click="scrollToContact">
          Start Your Project
          <i class="fas fa-arrow-right"></i>
        </a>
      </div>
    </div>

    <!-- Lightbox Modal -->
    <div 
      v-if="lightboxItem" 
      class="lightbox-modal"
      @click="closeLightbox"
    >
      <div class="lightbox-content" @click.stop>
        <!-- Close Button -->
        <button class="lightbox-close" @click="closeLightbox">
          <i class="fas fa-times"></i>
        </button>

        <!-- Navigation Buttons -->
        <button 
          class="lightbox-nav prev"
          @click="navigateLightbox(-1)"
          v-if="lightboxIndex > 0"
        >
          <i class="fas fa-chevron-left"></i>
        </button>
        <button 
          class="lightbox-nav next"
          @click="navigateLightbox(1)"
          v-if="lightboxIndex < filteredProjects.length - 1"
        >
          <i class="fas fa-chevron-right"></i>
        </button>

        <!-- Project Details -->
        <div class="lightbox-image">
          <div class="image-placeholder" :style="{ background: lightboxItem.gradient }">
            <i :class="lightboxItem.icon"></i>
          </div>
        </div>

        <div class="lightbox-info">
          <div class="project-header">
            <h2>{{ lightboxItem.title }}</h2>
            <p class="project-category">{{ lightboxItem.category }}</p>
          </div>

          <div class="project-details">
            <div class="detail-row">
              <strong>Client:</strong>
              <span>{{ lightboxItem.client }}</span>
            </div>
            <div class="detail-row">
              <strong>Year:</strong>
              <span>{{ lightboxItem.year }}</span>
            </div>
            <div class="detail-row">
              <strong>Location:</strong>
              <span>{{ lightboxItem.location }}</span>
            </div>
            <div class="detail-row">
              <strong>Services:</strong>
              <div class="services-list">
                <span 
                  v-for="service in lightboxItem.services" 
                  :key="service"
                  class="service-tag"
                >
                  {{ service }}
                </span>
              </div>
            </div>
          </div>

          <div class="project-description">
            <h4>Project Overview</h4>
            <p>{{ lightboxItem.description }}</p>
          </div>

          <div class="project-results" v-if="lightboxItem.results">
            <h4>Results & Impact</h4>
            <ul>
              <li v-for="result in lightboxItem.results" :key="result">
                <i class="fas fa-check-circle"></i>
                {{ result }}
              </li>
            </ul>
          </div>

          <div class="lightbox-actions">
            <button class="btn-primary" @click="requestSimilarQuote">
              Request Similar Project
            </button>
            <button class="btn-secondary" @click="closeLightbox">
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
  name: 'PortfolioSection',
  data() {
    return {
      activeFilter: 'all',
      visibleItems: [],
      lightboxItem: null,
      lightboxIndex: 0,
      isLoading: false,
      displayedCount: 6,
      
      filters: [
        { label: 'All Projects', value: 'all' },
        { label: 'Signage', value: 'signage' },
        { label: 'Printing', value: 'printing' },
        { label: 'Acrylic', value: 'acrylic' },
        { label: 'Branding', value: 'branding' },
        { label: 'Displays', value: 'displays' }
      ],
      
      allProjects: [
        {
          id: 1,
          title: 'Modern Retail Storefront',
          category: 'LED Signage Solution',
          type: 'signage',
          gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          icon: 'fas fa-store',
          tags: ['LED', 'Outdoor', 'Illuminated'],
          year: '2024',
          location: 'New York, NY',
          client: 'Fashion Forward Boutique',
          services: ['Design Consultation', 'LED Installation', 'Permits & Approvals'],
          description: 'A stunning LED storefront sign that increased foot traffic by 40%. The modern design incorporates dynamic lighting effects that change throughout the day, creating maximum visual impact while maintaining brand consistency.',
          results: [
            '40% increase in foot traffic',
            'Enhanced brand visibility',
            'Energy-efficient LED technology',
            'Weather-resistant construction'
          ]
        },
        {
          id: 2,
          title: 'Corporate Brand Identity',
          category: 'Complete Branding Package',
          type: 'branding',
          gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          icon: 'fas fa-palette',
          tags: ['Logo', 'Guidelines', 'Stationery'],
          year: '2024',
          location: 'Los Angeles, CA',
          client: 'TechStart Solutions',
          services: ['Brand Strategy', 'Logo Design', 'Brand Guidelines', 'Stationery Design'],
          description: 'Comprehensive brand identity development for a growing tech startup. The project included logo design, brand guidelines, business cards, letterheads, and digital assets that reflect innovation and professionalism.',
          results: [
            'Cohesive brand identity across all platforms',
            'Professional market presence',
            'Increased client confidence',
            'Scalable brand system'
          ]
        },
        {
          id: 3,
          title: 'Premium Acrylic Awards',
          category: 'Custom Recognition Pieces',
          type: 'acrylic',
          gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
          icon: 'fas fa-trophy',
          tags: ['Custom', 'Engraving', 'Premium'],
          year: '2023',
          location: 'Chicago, IL',
          client: 'Excellence Corp',
          services: ['3D Design', 'Laser Cutting', 'Engraving', 'Assembly'],
          description: 'Elegant acrylic awards for annual company recognition ceremony. Each piece features precision laser cutting, custom engraving, and LED illumination base for a premium presentation.',
          results: [
            'Unique recognition pieces',
            'Enhanced ceremony prestige',
            'Durable construction',
            'LED illumination feature'
          ]
        },
        {
          id: 4,
          title: 'Trade Show Exhibition',
          category: 'Portable Display System',
          type: 'displays',
          gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
          icon: 'fas fa-tv',
          tags: ['Portable', 'Modular', 'Graphics'],
          year: '2024',
          location: 'Las Vegas, NV',
          client: 'Innovation Expo',
          services: ['Display Design', 'Graphics Production', 'Assembly Training'],
          description: 'Eye-catching trade show display that stands out in crowded exhibition halls. The modular design allows for easy setup and breakdown while maximizing visual impact and brand messaging.',
          results: [
            'Increased booth traffic by 60%',
            'Easy setup and breakdown',
            'Reusable for multiple events',
            'Professional appearance'
          ]
        },
        {
          id: 5,
          title: 'Vehicle Fleet Graphics',
          category: 'Mobile Brand Advertising',
          type: 'printing',
          gradient: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
          icon: 'fas fa-truck',
          tags: ['Vehicle Wrap', 'Fleet', 'Advertising'],
          year: '2024',
          location: 'Miami, FL',
          client: 'Delivery Express',
          services: ['Design', 'Printing', 'Installation', 'Maintenance'],
          description: 'Complete fleet branding solution for delivery company. High-quality vinyl graphics designed to withstand weather conditions while promoting brand awareness throughout the city.',
          results: [
            'City-wide brand exposure',
            'Professional fleet appearance',
            'Weather-resistant materials',
            'Increased brand recognition'
          ]
        },
        {
          id: 6,
          title: 'Interior Wayfinding System',
          category: 'Navigation Signage',
          type: 'signage',
          gradient: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
          icon: 'fas fa-directions',
          tags: ['Wayfinding', 'Interior', 'ADA Compliant'],
          year: '2023',
          location: 'Seattle, WA',
          client: 'Metro Medical Center',
          services: ['Wayfinding Strategy', 'Design', 'Fabrication', 'Installation'],
          description: 'Comprehensive wayfinding system for large medical facility. ADA-compliant signage with clear typography and intuitive iconography helps patients and visitors navigate complex building layouts.',
          results: [
            'Improved visitor experience',
            'Reduced staff inquiries',
            'ADA compliance achieved',
            'Clear navigation system'
          ]
        },
        // Additional projects for load more functionality
        {
          id: 7,
          title: 'Restaurant Menu Boards',
          category: 'Digital Menu Display',
          type: 'printing',
          gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
          icon: 'fas fa-utensils',
          tags: ['Menu', 'Restaurant', 'Digital'],
          year: '2024',
          location: 'Austin, TX',
          client: 'Gourmet Bistro',
          services: ['Design', 'Digital Printing', 'Mounting'],
          description: 'Modern menu board system with easy-to-update displays.',
          results: [
            'Updated menu presentation',
            'Easy content updates',
            'Professional appearance'
          ]
        },
        {
          id: 8,
          title: 'Office Reception Signage',
          category: 'Corporate Interior Signs',
          type: 'acrylic',
          gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          icon: 'fas fa-building',
          tags: ['Reception', 'Corporate', 'Elegant'],
          year: '2023',
          location: 'San Francisco, CA',
          client: 'Corporate Solutions Inc',
          services: ['3D Letters', 'Mounting', 'Installation'],
          description: 'Sophisticated reception area signage with dimensional letters.',
          results: [
            'Professional first impression',
            'Enhanced corporate image',
            'Durable construction'
          ]
        }
      ]
    }
  },
  computed: {
    filteredProjects() {
      let filtered = this.activeFilter === 'all' 
        ? this.allProjects 
        : this.allProjects.filter(project => project.type === this.activeFilter)
      
      return filtered.slice(0, this.displayedCount)
    },
    
    hasMoreProjects() {
      let totalFiltered = this.activeFilter === 'all' 
        ? this.allProjects.length 
        : this.allProjects.filter(project => project.type === this.activeFilter).length
      
      return this.displayedCount < totalFiltered
    }
  },
  mounted() {
    this.setupIntersectionObserver()
  },
  methods: {
    setActiveFilter(filter) {
      this.activeFilter = filter
      this.displayedCount = 6
      this.visibleItems = []
      
      this.$nextTick(() => {
        this.setupIntersectionObserver()
      })
    },
    
    setupIntersectionObserver() {
      const options = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const itemId = parseInt(entry.target.dataset.id)
            if (!this.visibleItems.includes(itemId)) {
              this.visibleItems.push(itemId)
            }
          }
        })
      }, options)

      // Observe all portfolio items
      this.$nextTick(() => {
        const items = document.querySelectorAll('.portfolio-item')
        items.forEach(item => {
          const id = item.querySelector('[data-item-id]')?.dataset.itemId
          if (id) {
            item.dataset.id = id
            observer.observe(item)
          }
        })
      })
    },

    loadMoreProjects() {
      this.isLoading = true
      
      // Simulate loading delay
      setTimeout(() => {
        this.displayedCount += 6
        this.isLoading = false
        
        this.$nextTick(() => {
          this.setupIntersectionObserver()
        })
      }, 800)
    },

    openLightbox(item) {
      this.lightboxItem = item
      this.lightboxIndex = this.filteredProjects.findIndex(p => p.id === item.id)
      document.body.style.overflow = 'hidden'
    },

    closeLightbox() {
      this.lightboxItem = null
      this.lightboxIndex = 0
      document.body.style.overflow = ''
    },

    navigateLightbox(direction) {
      const newIndex = this.lightboxIndex + direction
      if (newIndex >= 0 && newIndex < this.filteredProjects.length) {
        this.lightboxIndex = newIndex
        this.lightboxItem = this.filteredProjects[newIndex]
      }
    },

    handleImageLoad(itemId) {
      // Handle successful image load
      const item = this.allProjects.find(p => p.id === itemId)
      if (item) {
        item.loading = false
      }
    },

    handleImageError(itemId) {
      // Handle image load error
      const item = this.allProjects.find(p => p.id === itemId)
      if (item) {
        item.loading = false
        item.imageError = true
      }
    },

    requestSimilarQuote() {
      this.closeLightbox()
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
/* Portfolio Section Styles */
.section {
  padding: 5rem 0;
}

.portfolio {
  background: white;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Section Header */
.section-header {
  text-align: center;
  margin-bottom: 3rem;
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

/* Portfolio Filters */
.portfolio-filters {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 3rem;
}

.filter-btn {
  padding: 0.75rem 1.5rem;
  border: 2px solid #e5e7eb;
  background: white;
  color: #6b7280;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.filter-btn:hover {
  border-color: #2563eb;
  color: #2563eb;
}

.filter-btn.active {
  background: linear-gradient(135deg, #2563eb, #3b82f6);
  border-color: #2563eb;
  color: white;
  box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);
}

/* Portfolio Grid */
.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.portfolio-item {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  aspect-ratio: 4/3;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  transform: translateY(50px) scale(0.9);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.portfolio-item.visible {
  opacity: 1;
  transform: translateY(0) scale(1);
  animation: portfolioSlideIn 0.6s ease forwards;
}

.portfolio-item:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

/* Portfolio Image */
.portfolio-image {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  color: rgba(255, 255, 255, 0.8);
  position: relative;
}

.portfolio-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.4s ease;
}

.portfolio-item:hover .portfolio-image img {
  transform: scale(1.1);
}

/* Portfolio Overlay */
.portfolio-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg, 
    rgba(37, 99, 235, 0.9), 
    rgba(249, 115, 22, 0.9)
  );
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.4s ease;
  padding: 2rem;
}

.portfolio-item:hover .portfolio-overlay {
  opacity: 1;
}

.portfolio-text {
  text-align: center;
  color: white;
  transform: translateY(20px);
  transition: transform 0.4s ease;
}

.portfolio-item:hover .portfolio-text {
  transform: translateY(0);
}

.portfolio-text h3 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.portfolio-text p {
  font-size: 1rem;
  margin-bottom: 1rem;
  opacity: 0.9;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.tag {
  padding: 0.25rem 0.75rem;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
}

.view-project-btn {
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.5);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.view-project-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.8);
}

/* Project Stats */
.project-stats {
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.stat {
  background: rgba(255, 255, 255, 0.9);
  padding: 0.5rem 0.75rem;
  border-radius: 15px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: #1f2937;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.stat i {
  color: #2563eb;
  font-size: 0.7rem;
}

/* Load More Section */
.load-more-section {
  text-align: center;
  margin-bottom: 3rem;
}

.load-more-btn {
  background: linear-gradient(135deg, #6b7280, #4b5563);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.load-more-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #4b5563, #374151);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(75, 85, 99, 0.3);
}

.load-more-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Portfolio CTA */
.portfolio-cta {
  text-align: center;
  background: #f9fafb;
  padding: 3rem 2rem;
  border-radius: 20px;
  margin-top: 2rem;
}

.portfolio-cta h3 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #1f2937;
}

.portfolio-cta p {
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

/* Lightbox Modal */
.lightbox-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 2rem;
  overflow-y: auto;
}

.lightbox-content {
  background: white;
  border-radius: 20px;
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  animation: lightboxSlideIn 0.3s ease;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
}

.lightbox-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 2001;
  color: white;
}

.lightbox-close:hover {
  background: rgba(0, 0, 0, 0.7);
  color: #ef4444;
}

.lightbox-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;
  z-index: 2001;
}

.lightbox-nav:hover {
  background: rgba(0, 0, 0, 0.7);
}

.lightbox-nav.prev {
  left: 1rem;
}

.lightbox-nav.next {
  right: 1rem;
}

.lightbox-image {
  position: relative;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox-info {
  padding: 2rem;
}

.project-header h2 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #1f2937;
}

.project-category {
  font-size: 1.1rem;
  color: #6b7280;
  margin-bottom: 2rem;
}

.project-details {
  margin-bottom: 2rem;
}

.detail-row {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f3f4f6;
}

.detail-row strong {
  min-width: 80px;
  color: #1f2937;
}

.services-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.service-tag {
  padding: 0.25rem 0.75rem;
  background: #eff6ff;
  color: #2563eb;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
}

.project-description,
.project-results {
  margin-bottom: 2rem;
}

.project-description h4,
.project-results h4 {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1f2937;
}

.project-results ul {
  list-style: none;
  padding: 0;
}

.project-results li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  padding: 0.5rem;
  background: #f9fafb;
  border-radius: 8px;
}

.project-results i {
  color: #10b981;
  font-size: 1rem;
}

.lightbox-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-start;
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
@keyframes portfolioSlideIn {
  from {
    opacity: 0;
    transform: translateY(50px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes lightboxSlideIn {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(-50px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* Responsive Design */
@media (max-width: 968px) {
  .lightbox-content {
    grid-template-columns: 1fr;
    max-width: 600px;
  }
  
  .lightbox-image {
    min-height: 300px;
  }
}

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
  
  .portfolio-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .portfolio-filters {
    gap: 0.5rem;
  }
  
  .filter-btn {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
  }
  
  .portfolio-cta {
    padding: 2rem 1.5rem;
  }
  
  .portfolio-cta h3 {
    font-size: 1.5rem;
  }
  
  .lightbox-modal {
    padding: 1rem;
  }
  
  .lightbox-info {
    padding: 1.5rem;
  }
  
  .lightbox-actions {
    flex-direction: column;
  }
  
  .btn-primary,
  .btn-secondary {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .portfolio-item {
    aspect-ratio: 3/2;
  }
  
  .portfolio-overlay {
    padding: 1rem;
  }
  
  .portfolio-text h3 {
    font-size: 1.2rem;
  }
  
  .project-tags {
    gap: 0.25rem;
  }
  
  .tag {
    font-size: 0.7rem;
    padding: 0.2rem 0.5rem;
  }
  
  .view-project-btn {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
}

/* Add item ID data attribute helper */
.portfolio-item::before {
  content: attr(data-item-id);
  display: none;
}
</style>

