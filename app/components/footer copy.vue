<template>
  <footer class="footer">
    <div class="container">
      <!-- Main Footer Content -->
      <div class="footer-content">
        <!-- Company Info -->
        <div class="footer-section company-info">
          <div class="footer-logo">
            <img src="/logo.jpg" alt="ColorsLogo" class="" style="height: 50px;"/>
          </div>
          <p class="company-description">
            Transforming spaces with innovative signage and printing solutions. 
            Your vision, our expertise.
          </p>
          
          <!-- Newsletter Signup -->
          <div class="newsletter-signup">
            <h4>Stay Updated</h4>
            <form @submit.prevent="handleNewsletterSubmit" class="newsletter-form">
              <div class="input-group">
                <input 
                  type="email" 
                  v-model="newsletterEmail"
                  placeholder="Enter your email"
                  required
                  :disabled="isSubscribing"
                >
                <button 
                  type="submit" 
                  :disabled="isSubscribing"
                  class="subscribe-btn"
                >
                  <span v-if="!isSubscribing">
                    <i class="fas fa-paper-plane"></i>
                  </span>
                  <span v-else>
                    <i class="fas fa-spinner fa-spin"></i>
                  </span>
                </button>
              </div>
              <p v-if="newsletterMessage" 
                 class="newsletter-message" 
                 :class="newsletterStatus">
                {{ newsletterMessage }}
              </p>
            </form>
          </div>

          <!-- Social Media Icons -->
          <div class="social-icons">
            <a 
              v-for="social in socialLinks" 
              :key="social.platform"
              :href="social.url"
              class="social-icon"
              target="_blank"
              rel="noopener noreferrer"
              :title="`Follow us on ${social.platform}`"
            >
              <i :class="social.icon"></i>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="footer-section">
          <h4>Quick Links</h4>
          <ul class="footer-links">
            <li v-for="link in quickLinks" :key="link.name">
              <a :href="link.href" @click="handleNavClick(link.href)">
                {{ link.name }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Services -->
        <div class="footer-section">
          <h4>Services</h4>
          <ul class="footer-links">
            <li v-for="service in services" :key="service.name">
              <a :href="service.href" @click="handleNavClick(service.href)">
                {{ service.name }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div class="footer-section">
          <h4>Contact Info</h4>
          <div class="contact-info">
            <div class="contact-item">
              <i class="fas fa-map-marker-alt"></i>
              <div>
                <p>123 Creative Avenue</p>
                <p>Design District, NY 10001</p>
              </div>
            </div>
            
            <div class="contact-item">
              <i class="fas fa-phone"></i>
              <div>
                <a href="tel:5551234567">(555) 123-4567</a>
              </div>
            </div>
            
            <div class="contact-item">
              <i class="fas fa-envelope"></i>
              <div>
                <a href="mailto:info@colorcraft.com">info@colorcraft.com</a>
              </div>
            </div>
            
            <div class="contact-item">
              <i class="fas fa-clock"></i>
              <div>
                <p>Mon-Fri: 9AM-6PM</p>
                <p>Sat: 10AM-4PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Footer -->
      <div class="footer-bottom">
        <div class="footer-bottom-content">
          <!-- Copyright -->
          <div class="copyright">
            <p>&copy; {{ currentYear }} ColorCraft Signage Solutions. All rights reserved.</p>
          </div>
          
          <!-- Legal Links -->
          <div class="legal-links">
            <a 
              v-for="legal in legalLinks" 
              :key="legal.name"
              :href="legal.href"
              @click="handleLegalClick(legal)"
            >
              {{ legal.name }}
            </a>
          </div>
          
          <!-- Certifications/Badges -->
          <div class="certifications">
            <div 
              v-for="cert in certifications" 
              :key="cert.name"
              class="cert-badge"
              :title="cert.description"
            >
              <i :class="cert.icon"></i>
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
      class="back-to-top"
      title="Back to top"
    >
      <i class="fas fa-chevron-up"></i>
    </button>

    <!-- Legal Modal (for Privacy Policy, Terms, etc.) -->
    <div v-if="showLegalModal" class="legal-modal" @click="closeLegalModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>{{ selectedLegal.name }}</h3>
          <button @click="closeLegalModal" class="modal-close">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <div v-html="selectedLegal.content"></div>
        </div>
        <div class="modal-footer">
          <button @click="closeLegalModal" class="btn-close">Close</button>
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
          url: 'https://facebook.com/colorcraft'
        },
        {
          platform: 'Instagram',
          icon: 'fab fa-instagram',
          url: 'https://instagram.com/colorcraft'
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
        {
          name: 'BBB A+',
          icon: 'fas fa-award',
          description: 'Better Business Bureau A+ Rating'
        },
        {
          name: 'ISO 9001',
          icon: 'fas fa-certificate',
          description: 'ISO 9001 Quality Management Certified'
        },
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

<style scoped>
/* Footer Styles */
.footer {
  background: #1f2937;
  color: white;
  padding: 3rem 0 1rem;
  position: relative;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Main Footer Content */
.footer-content {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.5fr;
  gap: 3rem;
  margin-bottom: 2rem;
}

.footer-section h3,
.footer-section h4 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: white;
}

/* Company Info Section */
.company-info {
  padding-right: 1rem;
}

.footer-logo h3 {
  font-size: 2rem;
  font-weight: 700;
  background: linear-gradient(135deg, #60a5fa, #f97316);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
}

.company-description {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin-bottom: 2rem;
  font-size: 0.95rem;
}

/* Newsletter Signup */
.newsletter-signup {
  margin-bottom: 2rem;
}

.newsletter-signup h4 {
  font-size: 1.1rem;
  margin-bottom: 0.75rem;
}

.newsletter-form {
  margin-bottom: 1rem;
}

.input-group {
  display: flex;
  gap: 0;
  margin-bottom: 0.5rem;
}

.input-group input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid #374151;
  border-radius: 8px 0 0 8px;
  background: #374151;
  color: white;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.input-group input:focus {
  outline: none;
  border-color: #60a5fa;
  background: #4b5563;
}

.input-group input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.subscribe-btn {
  padding: 0.75rem 1rem;
  background: linear-gradient(135deg, #f97316, #ec4899);
  border: none;
  border-radius: 0 8px 8px 0;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 50px;
}

.subscribe-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #ea580c, #db2777);
  transform: translateY(-1px);
}

.subscribe-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.newsletter-message {
  font-size: 0.8rem;
  margin-top: 0.5rem;
  padding: 0.5rem;
  border-radius: 4px;
}

.newsletter-message.success {
  background: rgba(16, 185, 129, 0.2);
  color: #34d399;
  border: 1px solid rgba(52, 211, 153, 0.3);
}

.newsletter-message.error {
  background: rgba(239, 68, 68, 0.2);
  color: #f87171;
  border: 1px solid rgba(248, 113, 113, 0.3);
}

/* Social Icons */
.social-icons {
  display: flex;
  gap: 1rem;
}

.social-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 1.1rem;
}

.social-icon:hover {
  background: #60a5fa;
  color: white;
  transform: translateY(-3px);
  box-shadow: 0 4px 15px rgba(96, 165, 250, 0.4);
}

/* Footer Links */
.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 0.75rem;
}

.footer-links a {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: color 0.3s ease;
  font-size: 0.9rem;
  display: block;
  padding: 0.25rem 0;
}

.footer-links a:hover {
  color: #60a5fa;
  padding-left: 0.5rem;
}

/* Contact Info */
.contact-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.contact-item i {
  color: #f97316;
  font-size: 1rem;
  margin-top: 0.1rem;
  width: 16px;
  flex-shrink: 0;
}

.contact-item div {
  flex: 1;
}

.contact-item p {
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.4;
}

.contact-item a {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: color 0.3s ease;
  font-size: 0.9rem;
}

.contact-item a:hover {
  color: #60a5fa;
}

/* Footer Bottom */
.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 1.5rem;
}

.footer-bottom-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.copyright p {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  margin: 0;
}

.legal-links {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}

.legal-links a {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;
}

.legal-links a:hover {
  color: #60a5fa;
}

/* Certifications */
.certifications {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.cert-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.8rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.cert-badge:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-1px);
}

.cert-badge i {
  color: #34d399;
  font-size: 0.9rem;
}

/* Back to Top Button */
.back-to-top {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #f97316, #ec4899);
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 100;
  box-shadow: 0 4px 15px rgba(249, 115, 22, 0.4);
}

.back-to-top:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(249, 115, 22, 0.5);
}

/* Legal Modal */
.legal-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
}

.modal-content {
  background: white;
  border-radius: 15px;
  max-width: 700px;
  width: 100%;
  max-height: 80vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #e5e7eb;
  background: #f9fafb;
}

.modal-header h3 {
  color: #1f2937;
  margin: 0;
  font-size: 1.25rem;
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #6b7280;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.modal-close:hover {
  background: #e5e7eb;
  color: #ef4444;
}

.modal-body {
  padding: 2rem;
  overflow-y: auto;
  flex: 1;
  color: #1f2937;
  line-height: 1.6;
}

.modal-body h4 {
  color: #1f2937;
  margin-bottom: 1rem;
  font-size: 1.25rem;
}

.modal-body h5 {
  color: #374151;
  margin: 1.5rem 0 0.75rem;
  font-size: 1.1rem;
}

.modal-body ul {
  margin: 1rem 0;
  padding-left: 1.5rem;
}

.modal-body li {
  margin-bottom: 0.5rem;
}

.modal-footer {
  padding: 1rem 2rem;
  border-top: 1px solid #e5e7eb;
  background: #f9fafb;
  text-align: right;
}

.btn-close {
  background: #6b7280;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.3s ease;
}

.btn-close:hover {
  background: #4b5563;
}

/* Responsive Design */
@media (max-width: 968px) {
  .footer-content {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
  
  .company-info {
    grid-column: 1 / -1;
    padding-right: 0;
    margin-bottom: 1rem;
  }
  
  .footer-bottom-content {
    flex-direction: column;
    text-align: center;
    gap: 1.5rem;
  }
  
  .legal-links {
    gap: 1rem;
  }
  
  .certifications {
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .footer {
    padding: 2rem 0 1rem;
  }
  
  .container {
    padding: 0 1rem;
  }
  
  .footer-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .social-icons {
    justify-content: center;
  }
  
  .back-to-top {
    bottom: 1rem;
    right: 1rem;
    width: 45px;
    height: 45px;
  }
  
  .legal-modal {
    padding: 1rem;
  }
  
  .modal-content {
    max-height: 90vh;
  }
  
  .modal-header,
  .modal-body,
  .modal-footer {
    padding: 1rem 1.5rem;
  }
}

@media (max-width: 480px) {
  .footer-content {
    gap: 1.5rem;
  }
  
  .input-group {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .input-group input,
  .subscribe-btn {
    border-radius: 8px;
  }
  
  .social-icons {
    gap: 0.75rem;
  }
  
  .social-icon {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }
  
  .legal-links {
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }
  
  .certifications {
    flex-direction: column;
    align-items: center;
  }
}
</style>