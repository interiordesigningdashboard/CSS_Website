<template>
  <section id="portfolio" class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
          Our Portfolio
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Explore our recent projects and see how we've helped businesses transform their spaces with innovative design solutions
        </p>
      </div>

      <!-- Filter Tabs -->
      <div class="flex flex-wrap justify-center gap-4 mb-16">
        <button 
          v-for="filter in filters"
          :key="filter.value"
          class="px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
          :class="activeFilter === filter.value 
            ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30' 
            : 'bg-white text-gray-600 border-2 border-gray-200 hover:border-blue-500 hover:text-blue-600'"
          @click="setActiveFilter(filter.value)"
        >
          {{ filter.label }}
        </button>
      </div>

      <!-- Portfolio Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <div 
          v-for="(item, index) in filteredProjects"
          :key="item.id"
          class="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 cursor-pointer"
          :style="{ animationDelay: `${index * 100}ms` }"
          @click="openLightbox(item)"
        >
          <!-- Project Image with Gradient Overlay -->
          <div class="relative h-64 overflow-hidden">
            <!-- Gradient Background -->
            <div 
              class="absolute inset-0 flex items-center justify-center text-6xl text-white/80 group-hover:scale-110 transition-transform duration-500"
              :style="{ background: item.gradient }"
            >
              {{ item.emoji }}
            </div>
            
            <!-- Placeholder Image -->
            <img 
              :src="`https://picsum.photos/400/300?random=${item.id}`"
              :alt="item.title"
              class="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-110 transition-all duration-700"
              loading="lazy"
            >
            
            <!-- Overlay on Hover -->
            <div class="absolute inset-0 bg-gradient-to-br from-blue-600/90 to-orange-500/90 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
              <div class="text-center text-white transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                  <i class="fa-solid fa-eye"></i>
                </div>
                <p class="font-semibold">View Project</p>
              </div>
            </div>

            <!-- Project Stats -->
            <div class="absolute top-4 right-4 flex flex-col gap-2">
              <div class="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-2 text-sm font-medium text-gray-700">
                  <i 
  class="fa-solid fa-calendar-days 
         bg-gradient-to-r from-blue-600 to-orange-500
         bg-clip-text text-transparent"
></i> {{ item.year }}
              </div>
              <div class="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-2 text-sm font-medium text-gray-700">
                <i class="fa-solid fa-location-dot bg-gradient-to-r from-blue-600 to-orange-500 
         bg-clip-text text-transparent"></i> {{ item.location }}
              </div>
            </div>
          </div>

          <!-- Project Content -->
          <div class="p-6">
            <div class="mb-4">
              <h3 class="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                {{ item.title }}
              </h3>
              <p class="text-gray-600 font-medium">{{ item.category }}</p>
            </div>

            <!-- Project Tags -->
            <div class="flex flex-wrap gap-2 mb-4">
              <span 
                v-for="tag in item.tags" 
                :key="tag"
                class="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
              >
                {{ tag }}
              </span>
            </div>

            <!-- Project Description Preview -->
            <p class="text-gray-600 text-sm mb-4 line-clamp-2">
              {{ item.description }}
            </p>

            <!-- View Button -->
            <button class="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform group-hover:scale-105 shadow-lg hover:shadow-xl">
              View Details →
            </button>
          </div>
        </div>
      </div>

      <!-- Load More Button -->
      <div v-if="hasMoreProjects" class="text-center mb-16">
        <button 
          class="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
          @click="loadMoreProjects"
          :disabled="isLoading"
        >
          <span v-if="!isLoading" class="flex items-center gap-2">
            <i class="fa-solid fa-circle-plus"></i> Load More Projects
          </span>
          <span v-else class="flex items-center gap-2">
            <i class="fa-solid fa-hourglass-half"></i> Loading...
          </span>
        </button>
      </div>

      <!-- Portfolio CTA -->
      <div class="bg-gradient-to-br from-blue-50 to-orange-50 rounded-3xl p-8 md:p-12 text-center">
        <h3 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Have a Project in Mind?
        </h3>
        <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Let's bring your vision to life with our expert design and fabrication services.
        </p>
        <button
          class="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
          @click="scrollToContact"
        >
          Start Your Project →
        </button>
      </div>
    </div>

    <!-- Lightbox Modal -->
    <div 
      v-if="lightboxItem" 
      class="fixed inset-0 bg-[#ffffff68] flex items-center justify-center z-50 p-4 overflow-y-auto"
      @click="closeLightbox"
    >
      <div 
        class="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto relative"
        @click.stop
      >
        <!-- Close Button -->
        <button 
          class="absolute top-6 right-6 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all duration-300 z-10"
          @click="closeLightbox"
        >
          <i class="fas fa-times"></i>
        </button>

        <!-- Navigation Buttons -->
        <button 
          v-if="lightboxIndex > 0"
          class="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all duration-300 z-10"
          @click="navigateLightbox(-1)"
        >
          <i class="fa-solid fa-arrow-left"></i>
        </button>
        <button 
          v-if="lightboxIndex < filteredProjects.length - 1"
          class="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all duration-300 z-10"
          @click="navigateLightbox(1)"
        >
          <i class="fa-solid fa-arrow-right"></i>
        </button>

        <div class="grid grid-cols-1 lg:grid-cols-2">
          <!-- Project Image -->
          <div class="relative h-96 lg:h-full min-h-[400px]">
            <div 
              class="absolute inset-0 flex items-center justify-center text-8xl text-white/80"
              :style="{ background: lightboxItem.gradient }"
            >
              {{ lightboxItem.emoji }}
            </div>
            <img 
              :src="`https://picsum.photos/600/400?random=${lightboxItem.id}`"
              :alt="lightboxItem.title"
              class="absolute inset-0 w-full h-full object-cover opacity-80"
            >
          </div>

          <!-- Project Details -->
          <div class="p-8 lg:p-12">
            <div class="mb-6">
              <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                {{ lightboxItem.title }}
              </h2>
              <p class="text-xl text-blue-600 font-semibold">{{ lightboxItem.category }}</p>
            </div>

            <div class="space-y-4 mb-8">
              <div class="flex items-center justify-between py-3 border-b border-gray-100">
                <span class="font-semibold text-gray-700">Client:</span>
                <span class="text-gray-900">{{ lightboxItem.client }}</span>
              </div>
              <div class="flex items-center justify-between py-3 border-b border-gray-100">
                <span class="font-semibold text-gray-700">Year:</span>
                <span class="text-gray-900">{{ lightboxItem.year }}</span>
              </div>
              <div class="flex items-center justify-between py-3 border-b border-gray-100">
                <span class="font-semibold text-gray-700">Location:</span>
                <span class="text-gray-900">{{ lightboxItem.location }}</span>
              </div>
              <div class="py-3">
                <span class="font-semibold text-gray-700 block mb-3">Services:</span>
                <div class="flex flex-wrap gap-2">
                  <span 
                    v-for="service in lightboxItem.services" 
                    :key="service"
                    class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                  >
                    {{ service }}
                  </span>
                </div>
              </div>
            </div>

            <div class="mb-8">
              <h4 class="text-xl font-bold text-gray-900 mb-4">Project Overview</h4>
              <p class="text-gray-600 leading-relaxed">{{ lightboxItem.description }}</p>
            </div>

            <div v-if="lightboxItem.results" class="mb-8">
              <h4 class="text-xl font-bold text-gray-900 mb-4">Results & Impact</h4>
              <ul class="space-y-3">
                <li 
                  v-for="result in lightboxItem.results" 
                  :key="result"
                  class="flex items-center gap-3 p-3 bg-green-50 rounded-xl"
                >
                  ✅ <span class="text-gray-700">{{ result }}</span>
                </li>
              </ul>
            </div>

            <div class="flex flex-col sm:flex-row gap-4">
              <button 
                class="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
                @click="requestSimilarQuote"
              >
                Request Similar Project
              </button>
              <button 
                class="flex-1 bg-white text-gray-700 border-2 border-gray-300 hover:border-gray-400 font-semibold py-4 px-6 rounded-xl transition-all duration-300"
                @click="closeLightbox"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Define component name for debugging
defineOptions({
  name: 'PortfolioSection'
})

// Reactive data
const activeFilter = ref('all')
const lightboxItem = ref(null)
const lightboxIndex = ref(0)
const isLoading = ref(false)
const displayedCount = ref(6)

// Filters configuration
const filters = [
  { label: 'All Projects', value: 'all' },
  { label: 'Signage', value: 'signage' },
  { label: 'Printing', value: 'printing' },
  { label: 'Acrylic', value: 'acrylic' },
  { label: 'Branding', value: 'branding' },
  { label: 'Displays', value: 'displays' }
]

// Project data with emojis instead of icons
const allProjects = [
  {
    id: 1,
    title: 'Modern Retail Storefront',
    category: 'LED Signage Solution',
    type: 'signage',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    emoji: '🏪',
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
    emoji: '🎨',
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
    emoji: '🏆',
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
    emoji: '📺',
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
    emoji: '🚚',
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
    emoji: '🧭',
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
  {
    id: 7,
    title: 'Restaurant Menu Boards',
    category: 'Digital Menu Display',
    type: 'printing',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    emoji: '🍽️',
    tags: ['Menu', 'Restaurant', 'Digital'],
    year: '2024',
    location: 'Austin, TX',
    client: 'Gourmet Bistro',
    services: ['Design', 'Digital Printing', 'Mounting'],
    description: 'Modern menu board system with easy-to-update displays that enhance the customer ordering experience.',
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
    emoji: '🏢',
    tags: ['Reception', 'Corporate', 'Elegant'],
    year: '2023',
    location: 'San Francisco, CA',
    client: 'Corporate Solutions Inc',
    services: ['3D Letters', 'Mounting', 'Installation'],
    description: 'Sophisticated reception area signage with dimensional letters that creates a professional first impression.',
    results: [
      'Professional first impression',
      'Enhanced corporate image',
      'Durable construction'
    ]
  }
]

// Computed properties
const filteredProjects = computed(() => {
  let filtered = activeFilter.value === 'all' 
    ? allProjects 
    : allProjects.filter(project => project.type === activeFilter.value)
  
  return filtered.slice(0, displayedCount.value)
})

const hasMoreProjects = computed(() => {
  let totalFiltered = activeFilter.value === 'all' 
    ? allProjects.length 
    : allProjects.filter(project => project.type === activeFilter.value).length
  
  return displayedCount.value < totalFiltered
})

// Methods
const setActiveFilter = (filter) => {
  activeFilter.value = filter
  displayedCount.value = 6
}

const loadMoreProjects = () => {
  isLoading.value = true
  
  setTimeout(() => {
    displayedCount.value += 6
    isLoading.value = false
  }, 800)
}

const openLightbox = (item) => {
  lightboxItem.value = item
  lightboxIndex.value = filteredProjects.value.findIndex(p => p.id === item.id)
  if (process.client) {
    document.body.style.overflow = 'hidden'
  }
}

const closeLightbox = () => {
  lightboxItem.value = null
  lightboxIndex.value = 0
  if (process.client) {
    document.body.style.overflow = ''
  }
}

const navigateLightbox = (direction) => {
  const newIndex = lightboxIndex.value + direction
  if (newIndex >= 0 && newIndex < filteredProjects.value.length) {
    lightboxIndex.value = newIndex
    lightboxItem.value = filteredProjects.value[newIndex]
  }
}

const requestSimilarQuote = () => {
  closeLightbox()
  scrollToContact()
}

const scrollToContact = () => {
  if (process.client) {
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
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>