<template>
  <footer class="bg-gray-800 text-white pt-12 pb-4 relative">
    <div class="mx-auto px-8">
      <!-- Main Footer Content -->
      <div class="grid grid-cols- md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-8">
        <!-- Company Info -->
        <div class="lg:col-span-2 lg:pr-4">
          <div class="mb-4">
            <img src="/logo.jpg" alt="ColorsLogo" class="h-12" />
          </div>
          <p class="text-gray-300 leading-relaxed mb-8 text-sm">
            Transforming spaces with innovative signage and printing solutions. 
            Your vision, our expertise.
          </p>

          <!-- Social Media Icons -->
          <div class="flex gap-4 justify-center lg:justify-start">
            <a 
              v-for="social in socialLinks" 
              :key="social.platform"
              :href="social.url"
              class="inline-flex items-center justify-center w-11 h-11 bg-white/10 rounded-full text-gray-300 no-underline transition-all duration-300 text-lg hover:bg-blue-400 hover:text-white hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-400/40"
              target="_blank"
              rel="noopener noreferrer"
              :title="`Follow us on ${social.platform}`"
            >
              <i :class="social.icon"></i>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="text-lg font-semibold mb-4 text-white">Quick Links</h4>
          <ul class="list-none p-0 m-0">
            <li v-for="link in quickLinks" :key="link.name" class="mb-3">
              <a :href="link.href" 
                 @click="handleNavClick(link.href)"
                 class="text-gray-300 no-underline transition-all duration-300 text-sm block py-1 hover:text-blue-400 hover:pl-2">
                {{ link.name }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Services -->
        <div>
          <h4 class="text-lg font-semibold mb-4 text-white">Services</h4>
          <ul class="list-none p-0 m-0">
            <li v-for="service in services" :key="service.name" class="mb-3">
              <a :href="service.href" 
                 @click="handleNavClick(service.href)"
                 class="text-gray-300 no-underline transition-all duration-300 text-sm block py-1 hover:text-blue-400 hover:pl-2">
                {{ service.name }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Contact Info -->
        <!-- <div class="lg:col-start-4"> -->
          <div>
          <h4 class="text-lg font-semibold mb-4 text-white">Contact Info</h4>
          <div class="flex flex-col gap-4">
            <div class="flex items-start gap-3">
  <i class="fas fa-map-marker-alt text-orange-500 text-base mt-0.5 w-4 flex-shrink-0"></i>
  <div class="flex-1">
    <a 
      href="https://maps.app.goo.gl/7n8iYLg8jQ9T79Qf8" 
      target="_blank" 
      rel="noopener noreferrer"
      class="text-gray-300 m-0 text-sm leading-snug hover:text-blue-400"
    >
      No.14, SFNo.353, 4B, Kovur, Rajiv Gandhi Nagar,
      Kundrathur, Chennai, Tamil Nadu 600128
    </a>
  </div>
</div>

            
            <div class="flex items-start gap-3">
              <i class="fas fa-phone text-orange-500 text-base mt-0.5 w-4 flex-shrink-0"></i>
              <div class="flex-1">
                <a href="tel:+9199625 00715" class="text-gray-300 no-underline transition-colors duration-300 text-sm hover:text-blue-400">+91 99625 00715</a>
              </div>
            </div>
            
            <div class="flex items-start gap-3">
              <i class="fas fa-envelope text-orange-500 text-base mt-0.5 w-4 flex-shrink-0"></i>
              <div class="flex-1">
                <a href="mailto:info@colorsandsignage.co.in" class="text-gray-300 no-underline transition-colors duration-300 text-sm hover:text-blue-400">info@colorsandsignage.co.in</a>
              </div>
            </div>
            
            <div class="flex items-start gap-3">
              <i class="fas fa-clock text-orange-500 text-base mt-0.5 w-4 flex-shrink-0"></i>
              <div class="flex-1">
                <p class="text-gray-300 m-0 text-sm leading-snug">Mon-Fri: 9AM-6PM</p>
                <p class="text-gray-300 m-0 text-sm leading-snug">Sat: 10AM-4PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Footer -->
      <div class="border-t border-white/10 pt-6">
        <div class="flex flex-col lg:flex-row justify-between items-center gap-4 lg:gap-6">
          <!-- Copyright -->
          <div>
            <p class="text-gray-400 text-sm m-0">&copy; {{ currentYear }} <span class="good-times">Colors & Signage Solutions.</span> All rights reserved.</p>
          </div>
          
          <!-- Legal Links -->
          <div class="flex flex-col sm:flex-row gap-4 sm:gap-8">
            <a 
              v-for="legal in legalLinks" 
              :key="legal.name"
              :href="legal.href"
              @click="handleLegalClick(legal)"
              class="text-gray-400 no-underline text-sm transition-colors duration-300 text-center hover:text-blue-400"
            >
              {{ legal.name }}
            </a>
          </div>
          
          <!-- Certifications/Badges -->
          <div class="flex flex-col sm:flex-row gap-4 items-center">
            <div 
              v-for="cert in certifications" 
              :key="cert.name"
              class="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-2xl text-gray-100 text-xs font-medium transition-all duration-300 hover:bg-white/15 hover:-translate-y-0.5"
              :title="cert.description"
            >
              <i :class="cert.icon" class="text-green-400 text-sm"></i>
              <span>{{ cert.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Back to Top Button -->
    <button 
      v-show="showBackToTop"
      @click="scrollToTop"
      class="flex items-center justify-center fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-orange-500 to-pink-500 border-none rounded-full text-white cursor-pointer transition-all duration-300 z-50 shadow-lg shadow-orange-500/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/50"
      title="Back to top"
    >
      <i class="fas fa-chevron-up"></i>
    </button>

    <!-- Legal Modal (for Privacy Policy, Terms, etc.) -->
    <div v-if="showLegalModal" class="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-8" @click="closeLegalModal">
      <div class="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col" @click.stop>
        <div class="flex justify-between items-center px-8 py-6 border-b border-gray-200 bg-gray-50">
          <h3 class="text-gray-800 m-0 text-xl font-semibold">{{ selectedLegal.name }}</h3>
          <button @click="closeLegalModal" class="bg-none border-none text-2xl text-gray-500 cursor-pointer p-2 rounded-full transition-all duration-300 hover:bg-gray-200 hover:text-red-500">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="px-8 py-8 overflow-y-auto flex-1 text-gray-800 leading-relaxed prose prose-sm max-w-none">
          <div v-html="selectedLegal.content"></div>
        </div>
        <div class="px-8 py-4 border-t border-gray-200 bg-gray-50 text-right">
          <button @click="closeLegalModal" class="bg-gray-500 text-white border-none px-6 py-3 rounded-lg cursor-pointer font-medium transition-colors duration-300 hover:bg-gray-600">
            Close
          </button>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'TheFooter',
  data() {
    return {
      newsletterEmail: '',
      isSubscribing: false,
      newsletterMessage: '',
      newsletterStatus: '',
      showBackToTop: false,
      showLegalModal: false,
      selectedLegal: null,
      
      socialLinks: [
        {
          platform: 'Facebook',
          icon: 'fab fa-facebook-f',
          url: 'https://www.facebook.com/share/19kXHUm2UB/'
        },
        {
          platform: 'Instagram',
          icon: 'fab fa-instagram',
          url: 'https://www.instagram.com/colorsandsignagesolutions'
        },
        {
          platform: 'LinkedIn',
          icon: 'fab fa-linkedin-in',
          url: 'https://linkedin.com/company/colorcraft'
        },
        {
          platform: 'Twitter',
          icon: 'fab fa-twitter',
          url: 'https://twitter.com/colorcraft'
        },
        {
          platform: 'YouTube',
          icon: 'fab fa-youtube',
          url: 'https://youtube.com/colorcraft'
        }
      ],
      
      quickLinks: [
        { name: 'Home', href: '#home' },
        { name: 'About Us', href: '#about' },
        { name: 'Portfolio', href: '#portfolio' },
        { name: 'Contact', href: '#contact' },
        { name: 'Get Quote', href: '#contact' }
      ],
      
      services: [
        { name: 'Signage Solutions', href: '#services' },
        { name: 'Digital Printing', href: '#services' },
        { name: 'Acrylic Designs', href: '#services' },
        { name: 'Branding', href: '#services' },
        { name: 'Custom Displays', href: '#services' }
      ],
      
      legalLinks: [
        { 
          name: 'Privacy Policy', 
          href: '#privacy',
          content: `
            <h4>Privacy Policy</h4>
            <p><strong>Last updated: ${new Date().getFullYear()}</strong></p>
            
            <h5>Information We Collect</h5>
            <p>We collect information you provide directly to us, such as when you contact us for services, request quotes, or subscribe to our newsletter.</p>
            
            <h5>How We Use Your Information</h5>
            <ul>
              <li>To provide and improve our services</li>
              <li>To respond to your inquiries and requests</li>
              <li>To send you marketing communications (with your consent)</li>
              <li>To comply with legal obligations</li>
            </ul>
            
            <h5>Information Sharing</h5>
            <p>We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:</p>
            <ul>
              <li>With your explicit consent</li>
              <li>To comply with legal requirements</li>
              <li>To protect our rights and safety</li>
            </ul>
            
            <h5>Contact Us</h5>
            <p>If you have questions about this Privacy Policy, please contact us at info@colorcraft.com</p>
          `
        },
        { 
          name: 'Terms of Service', 
          href: '#terms',
          content: `
            <h4>Terms of Service</h4>
            <p><strong>Last updated: ${new Date().getFullYear()}</strong></p>
            
            <h5>Service Agreement</h5>
            <p>By engaging our services, you agree to these terms and conditions. Our services include signage design, printing, fabrication, and installation.</p>
            
            <h5>Payment Terms</h5>
            <ul>
              <li>50% deposit required before work begins</li>
              <li>Final payment due upon completion</li>
              <li>Late payments may incur additional fees</li>
            </ul>
            
            <h5>Project Timeline</h5>
            <p>Project timelines are estimates and may vary based on complexity, materials availability, and approval processes.</p>
            
            <h5>Warranty</h5>
            <p>We provide a 2-year warranty on materials and workmanship for most projects, excluding normal wear and weather damage.</p>
            
            <h5>Limitation of Liability</h5>
            <p>Our liability is limited to the cost of the services provided. We are not responsible for indirect or consequential damages.</p>
          `
        },
        { 
          name: 'Cookie Policy', 
          href: '#cookies',
          content: `
            <h4>Cookie Policy</h4>
            <p><strong>Last updated: ${new Date().getFullYear()}</strong></p>
            
            <h5>What Are Cookies</h5>
            <p>Cookies are small text files stored on your device when you visit our website. They help us improve your browsing experience.</p>
            
            <h5>Types of Cookies We Use</h5>
            <ul>
              <li><strong>Essential Cookies:</strong> Required for basic website functionality</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our site</li>
              <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements</li>
            </ul>
            
            <h5>Managing Cookies</h5>
            <p>You can control cookies through your browser settings. However, disabling certain cookies may affect website functionality.</p>
            
            <h5>Third-Party Cookies</h5>
            <p>We may use third-party services like Google Analytics that set their own cookies. Please refer to their privacy policies for more information.</p>
          `
        }
      ],
      
      certifications: [
        // {
        //   name: 'BBB A+',
        //   icon: 'fas fa-award',
        //   description: 'Better Business Bureau A+ Rating'
        // },
        // {
        //   name: 'ISO 9001',
        //   icon: 'fas fa-certificate',
        //   description: 'ISO 9001 Quality Management Certified'
        // },
        {
          name: 'Green Certified',
          icon: 'fas fa-leaf',
          description: 'Environmentally Responsible Practices'
        }
      ]
    }
  },
  computed: {
    currentYear() {
      return new Date().getFullYear()
    }
  },
  mounted() {
    // Add scroll listener for back to top button
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeUnmount() {
    // Clean up event listeners
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      this.showBackToTop = window.scrollY > 500
    },
    
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    },
    
    handleNavClick(href) {
      if (href.startsWith('#')) {
        event.preventDefault()
        this.scrollToSection(href)
      }
    },
    
    scrollToSection(sectionId) {
      const element = document.querySelector(sectionId)
      if (element) {
        const offsetTop = element.offsetTop - 80
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        })
      }
    },
    
    async handleNewsletterSubmit() {
      if (!this.newsletterEmail || !this.isValidEmail(this.newsletterEmail)) {
        this.newsletterMessage = 'Please enter a valid email address'
        this.newsletterStatus = 'error'
        return
      }
      
      this.isSubscribing = true
      this.newsletterMessage = ''
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        this.newsletterMessage = 'Thank you for subscribing!'
        this.newsletterStatus = 'success'
        this.newsletterEmail = ''
        
        // Clear message after 3 seconds
        setTimeout(() => {
          this.newsletterMessage = ''
          this.newsletterStatus = ''
        }, 3000)
        
      } catch (error) {
        this.newsletterMessage = 'Subscription failed. Please try again.'
        this.newsletterStatus = 'error'
      } finally {
        this.isSubscribing = false
      }
    },
    
    isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email)
    },
    
    handleLegalClick(legal) {
      event.preventDefault()
      this.selectedLegal = legal
      this.showLegalModal = true
      document.body.style.overflow = 'hidden'
    },
    
    closeLegalModal() {
      this.showLegalModal = false
      this.selectedLegal = null
      document.body.style.overflow = ''
    }
  }
}
</script>