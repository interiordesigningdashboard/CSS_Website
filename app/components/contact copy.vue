<template>
  <section id="contact" class="section contact">
    <div class="container">
      <!-- Section Header -->
      <div class="section-header">
        <h2 class="section-title">Get In Touch</h2>
        <p class="section-subtitle">
          Ready to start your project? Contact us today for a free consultation and quote
        </p>
      </div>
      
      <!-- Contact Content -->
      <div class="contact-content">
        <!-- Contact Form -->
        <div class="contact-form-wrapper">
          <form @submit.prevent="handleSubmit" class="contact-form">
            <!-- Form Header -->
            <div class="form-header">
              <h3>Send us a Message</h3>
              <p>Fill out the form below and we'll get back to you within 24 hours.</p>
            </div>

            <!-- Form Fields -->
            <div class="form-row">
              <div class="form-group">
                <label for="firstName">First Name <span class="required">*</span></label>
                <input 
                  type="text" 
                  id="firstName"
                  v-model="form.firstName"
                  :class="{ error: errors.firstName }"
                  required
                >
                <span v-if="errors.firstName" class="error-message">{{ errors.firstName }}</span>
              </div>
              
              <div class="form-group">
                <label for="lastName">Last Name <span class="required">*</span></label>
                <input 
                  type="text" 
                  id="lastName"
                  v-model="form.lastName"
                  :class="{ error: errors.lastName }"
                  required
                >
                <span v-if="errors.lastName" class="error-message">{{ errors.lastName }}</span>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="email">Email Address <span class="required">*</span></label>
                <input 
                  type="email" 
                  id="email"
                  v-model="form.email"
                  :class="{ error: errors.email }"
                  required
                >
                <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
              </div>
              
              <div class="form-group">
                <label for="phone">Phone Number</label>
                <input 
                  type="tel" 
                  id="phone"
                  v-model="form.phone"
                  placeholder="(555) 123-4567"
                >
              </div>
            </div>

            <div class="form-group">
              <label for="company">Company Name</label>
              <input 
                type="text" 
                id="company"
                v-model="form.company"
                placeholder="Your Company"
              >
            </div>
            
            <div class="form-group">
              <label for="service">Service Needed <span class="required">*</span></label>
              <select 
                id="service" 
                v-model="form.service"
                :class="{ error: errors.service }"
                required
              >
                <option value="">Select a service</option>
                <option 
                  v-for="service in services" 
                  :key="service.value"
                  :value="service.value"
                >
                  {{ service.label }}
                </option>
              </select>
              <span v-if="errors.service" class="error-message">{{ errors.service }}</span>
            </div>

            <div class="form-group">
              <label for="budget">Project Budget</label>
              <select id="budget" v-model="form.budget">
                <option value="">Select budget range</option>
                <option value="under-5k">Under $5,000</option>
                <option value="5k-15k">$5,000 - $15,000</option>
                <option value="15k-50k">$15,000 - $50,000</option>
                <option value="over-50k">Over $50,000</option>
              </select>
            </div>

            <div class="form-group">
              <label for="timeline">Project Timeline</label>
              <select id="timeline" v-model="form.timeline">
                <option value="">Select timeline</option>
                <option value="asap">ASAP</option>
                <option value="1-month">Within 1 month</option>
                <option value="3-months">Within 3 months</option>
                <option value="6-months">Within 6 months</option>
                <option value="planning">Just planning</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="message">Project Details <span class="required">*</span></label>
              <textarea 
                id="message" 
                v-model="form.message"
                :class="{ error: errors.message }"
                placeholder="Tell us about your project, goals, and any specific requirements..."
                rows="5"
                required
              ></textarea>
              <span v-if="errors.message" class="error-message">{{ errors.message }}</span>
            </div>

            <!-- File Upload -->
            <div class="form-group">
              <label for="files">Attach Files (Optional)</label>
              <div class="file-upload" @drop="handleFileDrop" @dragover.prevent @dragenter.prevent>
                <input 
                  type="file" 
                  id="files"
                  ref="fileInput"
                  @change="handleFileSelect"
                  multiple
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif"
                  style="display: none;"
                >
                <div class="upload-area" @click="$refs.fileInput.click()">
                  <i class="fas fa-cloud-upload-alt"></i>
                  <p>Drop files here or click to select</p>
                  <small>PDF, DOC, Images up to 10MB each</small>
                </div>
                <div v-if="form.files.length > 0" class="file-list">
                  <div v-for="(file, index) in form.files" :key="index" class="file-item">
                    <i class="fas fa-file"></i>
                    <span>{{ file.name }}</span>
                    <button type="button" @click="removeFile(index)" class="remove-file">
                      <i class="fas fa-times"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Marketing Consent -->
            <div class="form-group checkbox-group">
              <label class="checkbox-label">
                <input type="checkbox" v-model="form.newsletter">
                <span class="checkmark"></span>
                I'd like to receive updates about new services and design inspiration
              </label>
            </div>
            
            <!-- Submit Button -->
            <button 
              type="submit" 
              class="submit-button"
              :disabled="isSubmitting"
            >
              <span v-if="!isSubmitting">
                <i class="fas fa-paper-plane"></i>
                Send Message
              </span>
              <span v-else>
                <i class="fas fa-spinner fa-spin"></i>
                Sending...
              </span>
            </button>

            <!-- Success/Error Messages -->
            <div v-if="submitMessage" class="submit-message" :class="submitStatus">
              <i :class="submitStatus === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'"></i>
              {{ submitMessage }}
            </div>
          </form>
        </div>

        <!-- Contact Information -->
        <div class="contact-info">
          <!-- Contact Items -->
          <div class="contact-items">
            <div 
              v-for="(item, index) in contactItems" 
              :key="item.title"
              class="contact-item"
              :class="{ 'visible': visibleItems.includes(index) }"
              :style="{ animationDelay: `${index * 0.1}s` }"
            >
              <div class="contact-icon">
                <i :class="item.icon"></i>
              </div>
              <div class="contact-details">
                <h3>{{ item.title }}</h3>
                <p v-html="item.details"></p>
                <a v-if="item.link" :href="item.link" class="contact-link">
                  {{ item.linkText }}
                </a>
              </div>
            </div>
          </div>

          <!-- Business Hours -->
          <div class="business-hours">
            <h4>Business Hours</h4>
            <div class="hours-list">
              <div v-for="day in businessHours" :key="day.day" class="hour-item">
                <span class="day">{{ day.day }}</span>
                <span class="time">{{ day.time }}</span>
              </div>
            </div>
          </div>

          <!-- Map Placeholder -->
          <div class="map-section">
            <h4>Visit Our Studio</h4>
            <div class="map-placeholder" @click="openMap">
              <div class="map-overlay">
                <i class="fas fa-map-marker-alt"></i>
                <p>123 Creative Avenue<br>Design District, NY 10001</p>
                <span>Click to open map</span>
              </div>
            </div>
          </div>

          <!-- Social Media -->
          <div class="social-section">
            <h4>Follow Us</h4>
            <div class="social-links">
              <a 
                v-for="social in socialLinks" 
                :key="social.platform"
                :href="social.url"
                class="social-link"
                target="_blank"
                rel="noopener noreferrer"
                :title="social.platform"
              >
                <i :class="social.icon"></i>
                <span>{{ social.platform }}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ContactSection',
  data() {
    return {
      visibleItems: [],
      isSubmitting: false,
      submitMessage: '',
      submitStatus: '',
      
      form: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        budget: '',
        timeline: '',
        message: '',
        files: [],
        newsletter: false
      },
      
      errors: {},
      
      services: [
        { value: 'signage', label: 'Signage Solutions' },
        { value: 'printing', label: 'Digital Printing' },
        { value: 'acrylic', label: 'Acrylic Designs' },
        { value: 'branding', label: 'Branding' },
        { value: 'displays', label: 'Custom Display Solutions' },
        { value: 'consultation', label: 'Design Consultation' },
        { value: 'other', label: 'Other' }
      ],
      
      contactItems: [
        {
          title: 'Visit Our Studio',
          icon: 'fas fa-map-marker-alt',
          details: '123 Creative Avenue<br>Design District, NY 10001',
          link: 'https://maps.google.com',
          linkText: 'Get Directions'
        },
        {
          title: 'Call Us',
          icon: 'fas fa-phone',
          details: '(555) 123-4567<br>Monday - Friday, 9AM - 6PM',
          link: 'tel:5551234567',
          linkText: 'Call Now'
        },
        {
          title: 'Email Us',
          icon: 'fas fa-envelope',
          details: 'info@colorcraft.com<br>quotes@colorcraft.com',
          link: 'mailto:info@colorcraft.com',
          linkText: 'Send Email'
        },
        {
          title: 'Emergency Support',
          icon: 'fas fa-clock',
          details: '24/7 Emergency Service<br>For urgent signage repairs',
          link: 'tel:5551234568',
          linkText: 'Emergency Line'
        }
      ],
      
      businessHours: [
        { day: 'Monday - Friday', time: '9:00 AM - 6:00 PM' },
        { day: 'Saturday', time: '10:00 AM - 4:00 PM' },
        { day: 'Sunday', time: 'Closed' },
        { day: 'Holidays', time: 'By Appointment' }
      ],
      
      socialLinks: [
        {
          platform: 'Facebook',
          icon: 'fab fa-facebook-f',
          url: 'https://facebook.com'
        },
        {
          platform: 'Instagram',
          icon: 'fab fa-instagram',
          url: 'https://instagram.com'
        },
        {
          platform: 'LinkedIn',
          icon: 'fab fa-linkedin-in',
          url: 'https://linkedin.com'
        },
        {
          platform: 'Twitter',
          icon: 'fab fa-twitter',
          url: 'https://twitter.com'
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
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index)
            if (!this.visibleItems.includes(index)) {
              this.visibleItems.push(index)
            }
          }
        })
      }, options)

      this.$nextTick(() => {
        const items = document.querySelectorAll('.contact-item')
        items.forEach((item, index) => {
          item.dataset.index = index
          observer.observe(item)
        })
      })
    },

    validateForm() {
      this.errors = {}
      
      if (!this.form.firstName.trim()) {
        this.errors.firstName = 'First name is required'
      }
      
      if (!this.form.lastName.trim()) {
        this.errors.lastName = 'Last name is required'
      }
      
      if (!this.form.email.trim()) {
        this.errors.email = 'Email is required'
      } else if (!this.isValidEmail(this.form.email)) {
        this.errors.email = 'Please enter a valid email address'
      }
      
      if (!this.form.service) {
        this.errors.service = 'Please select a service'
      }
      
      if (!this.form.message.trim()) {
        this.errors.message = 'Please describe your project'
      } else if (this.form.message.trim().length < 20) {
        this.errors.message = 'Please provide more details (minimum 20 characters)'
      }
      
      return Object.keys(this.errors).length === 0
    },

    isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email)
    },

    async handleSubmit() {
      if (!this.validateForm()) {
        this.scrollToFirstError()
        return
      }

      this.isSubmitting = true
      this.submitMessage = ''
      this.submitStatus = ''

      try {
        // Simulate API call
        await this.submitForm()
        
        this.submitStatus = 'success'
        this.submitMessage = 'Thank you! Your message has been sent successfully. We\'ll get back to you within 24 hours.'
        
        // Reset form after successful submission
        setTimeout(() => {
          this.resetForm()
        }, 3000)
        
      } catch (error) {
        this.submitStatus = 'error'
        this.submitMessage = 'Sorry, there was an error sending your message. Please try again or contact us directly.'
        console.error('Form submission error:', error)
      } finally {
        this.isSubmitting = false
      }
    },

    async submitForm() {
      // Simulate API call delay
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate 95% success rate
          if (Math.random() > 0.05) {
            resolve({ success: true })
          } else {
            reject(new Error('Simulated API error'))
          }
        }, 2000)
      })
    },

    resetForm() {
      this.form = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        budget: '',
        timeline: '',
        message: '',
        files: [],
        newsletter: false
      }
      this.errors = {}
      this.submitMessage = ''
      this.submitStatus = ''
    },

    scrollToFirstError() {
      const firstErrorField = Object.keys(this.errors)[0]
      if (firstErrorField) {
        const element = document.getElementById(firstErrorField)
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          })
          element.focus()
        }
      }
    },

    handleFileSelect(event) {
      const files = Array.from(event.target.files)
      this.addFiles(files)
    },

    handleFileDrop(event) {
      event.preventDefault()
      const files = Array.from(event.dataTransfer.files)
      this.addFiles(files)
    },

    addFiles(files) {
      const maxSize = 10 * 1024 * 1024 // 10MB
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/gif'
      ]

      files.forEach(file => {
        if (file.size > maxSize) {
          alert(`File "${file.name}" is too large. Maximum size is 10MB.`)
          return
        }

        if (!allowedTypes.includes(file.type)) {
          alert(`File "${file.name}" is not a supported format.`)
          return
        }

        // Check if file already exists
        const existingFile = this.form.files.find(f => f.name === file.name && f.size === file.size)
        if (!existingFile) {
          this.form.files.push(file)
        }
      })
    },

    removeFile(index) {
      this.form.files.splice(index, 1)
    },

    openMap() {
      const address = encodeURIComponent('123 Creative Avenue, Design District, NY 10001')
      const mapUrl = `https://www.google.com/maps/search/?api=1&query=${address}`
      window.open(mapUrl, '_blank', 'noopener,noreferrer')
    }
  }
}
</script>

<style scoped>
/* Contact Section Styles */
.section {
  padding: 5rem 0;
}

.contact {
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

/* Contact Content */
.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: flex-start;
}

/* Contact Form */
.contact-form-wrapper {
  background: #f9fafb;
  border-radius: 20px;
  padding: 0;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.contact-form {
  padding: 2.5rem;
}

.form-header {
  margin-bottom: 2rem;
}

.form-header h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.form-header p {
  color: #6b7280;
  font-size: 0.9rem;
}

/* Form Layout */
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #1f2937;
  font-size: 0.9rem;
}

.required {
  color: #ef4444;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.875rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.form-group input.error,
.form-group select.error,
.form-group textarea.error {
  border-color: #ef4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.error-message {
  display: block;
  color: #ef4444;
  font-size: 0.8rem;
  margin-top: 0.5rem;
  font-weight: 500;
}

.form-group textarea {
  resize: vertical;
  min-height: 120px;
  line-height: 1.5;
}

.form-group select {
  cursor: pointer;
}

/* File Upload */
.file-upload {
  margin-top: 0.5rem;
}

.upload-area {
  border: 2px dashed #d1d5db;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.upload-area:hover {
  border-color: #2563eb;
  background: #f8fafc;
}

.upload-area i {
  font-size: 2rem;
  color: #6b7280;
  margin-bottom: 1rem;
}

.upload-area p {
  color: #1f2937;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.upload-area small {
  color: #6b7280;
  font-size: 0.8rem;
}

.file-list {
  margin-top: 1rem;
}

.file-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  margin-bottom: 0.5rem;
}

.file-item i {
  color: #6b7280;
}

.file-item span {
  flex: 1;
  font-size: 0.9rem;
  color: #1f2937;
}

.remove-file {
  background: none;
  border: none;
  color: #ef4444;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: background 0.3s ease;
}

.remove-file:hover {
  background: #fee2e2;
}

/* Checkbox */
.checkbox-group {
  margin: 2rem 0;
}

.checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  cursor: pointer;
  font-size: 0.9rem;
  color: #4b5563;
  line-height: 1.5;
}

.checkbox-label input[type="checkbox"] {
  display: none;
}

.checkmark {
  width: 20px;
  height: 20px;
  border: 2px solid #d1d5db;
  border-radius: 4px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  flex-shrink: 0;
  margin-top: 2px;
}

.checkbox-label input[type="checkbox"]:checked + .checkmark {
  background: #2563eb;
  border-color: #2563eb;
}

.checkbox-label input[type="checkbox"]:checked + .checkmark::after {
  content: '✓';
  color: white;
  font-size: 0.8rem;
  font-weight: bold;
}

/* Submit Button */
.submit-button {
  background: linear-gradient(135deg, #10b981, #34d399);
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
}

.submit-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(16, 185, 129, 0.4);
}

.submit-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

/* Submit Message */
.submit-message {
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
}

.submit-message.success {
  background: #d1fae5;
  color: #065f46;
  border: 1px solid #a7f3d0;
}

.submit-message.error {
  background: #fee2e2;
  color: #991b1b;
  border: 1px solid #fca5a5;
}

/* Contact Information */
.contact-info {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* Contact Items */
.contact-items {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: #f9fafb;
  border-radius: 15px;
  transition: all 0.4s ease;
  opacity: 0;
  transform: translateX(30px);
  border: 1px solid transparent;
}

.contact-item.visible {
  opacity: 1;
  transform: translateX(0);
}

.contact-item:hover {
  background: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border-color: rgba(37, 99, 235, 0.1);
  transform: translateX(-5px);
}

.contact-icon {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #2563eb, #3b82f6);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.25rem;
  flex-shrink: 0;
}

.contact-details h3 {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #1f2937;
  font-size: 1.1rem;
}

.contact-details p {
  color: #6b7280;
  line-height: 1.5;
  margin-bottom: 0.75rem;
}

.contact-link {
  color: #2563eb;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  transition: color 0.3s ease;
}

.contact-link:hover {
  color: #1d4ed8;
}

/* Business Hours */
.business-hours {
  background: white;
  padding: 1.5rem;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.business-hours h4 {
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1f2937;
}

.hours-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.hour-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f3f4f6;
}

.hour-item:last-child {
  border-bottom: none;
}

.day {
  font-weight: 500;
  color: #4b5563;
}

.time {
  font-weight: 600;
  color: #1f2937;
}

/* Map Section */
.map-section {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.map-section h4 {
  padding: 1.5rem 1.5rem 1rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.map-placeholder {
  height: 200px;
  background: linear-gradient(135deg, #eff6ff, #dbeafe);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.map-placeholder:hover {
  background: linear-gradient(135deg, #dbeafe, #bfdbfe);
}

.map-overlay {
  text-align: center;
  color: #2563eb;
}

.map-overlay i {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.map-overlay p {
  font-weight: 600;
  margin-bottom: 0.5rem;
  line-height: 1.4;
}

.map-overlay span {
  font-size: 0.9rem;
  opacity: 0.8;
}

/* Social Section */
.social-section {
  background: white;
  padding: 1.5rem;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.social-section h4 {
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1f2937;
}

.social-links {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: #f9fafb;
  border-radius: 8px;
  text-decoration: none;
  color: #4b5563;
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.social-link:hover {
  background: #eff6ff;
  color: #2563eb;
  border-color: #dbeafe;
  transform: translateY(-2px);
}

.social-link i {
  font-size: 1.1rem;
}

.social-link span {
  font-weight: 500;
  font-size: 0.9rem;
}

/* Responsive Design */
@media (max-width: 968px) {
  .contact-content {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  
  .form-row {
    grid-template-columns: 1fr;
    gap: 0;
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
  
  .contact-form {
    padding: 2rem;
  }
  
  .contact-item {
    flex-direction: column;
    text-align: center;
  }
  
  .contact-icon {
    margin: 0 auto;
  }
  
  .social-links {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .contact-form {
    padding: 1.5rem;
  }
  
  .form-header h3 {
    font-size: 1.3rem;
  }
  
  .contact-item {
    padding: 1rem;
  }
  
  .business-hours,
  .social-section {
    padding: 1rem;
  }
  
  .upload-area {
    padding: 1.5rem;
  }
  
  .upload-area i {
    font-size: 1.5rem;
  }
}
</style>