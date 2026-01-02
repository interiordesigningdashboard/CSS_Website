<template>
  <section
    id="contact"
    class="py-20 bg-gradient-to-br from-blue-50 via-white to-orange-50 min-h-screen"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2
          class="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent"
        >
          Get In Touch
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Ready to start your project? Contact us today for a free consultation
          and quote
        </p>
      </div>

      <!-- Contact Content -->
      <div class="grid lg:grid-cols-2 gap-12 items-start">
        <!-- Contact Form -->
        <div
          class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/20"
        >
          <div class="bg-gradient-to-r from-blue-600 to-orange-500 p-6">
            <h3 class="text-2xl font-bold text-white mb-2">
              Send us a Message
            </h3>
            <p class="text-blue-100">
              Fill out the form below and we'll get back to you within 24 hours.
            </p>
          </div>

          <form @submit.prevent="handleSubmit" class="p-8">
            <!-- Form Fields -->
            <div class="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label
                  for="firstName"
                  class="block text-sm font-semibold text-gray-700 mb-2"
                >
                  First Name <span class="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  v-model="form.firstName"
                  :class="[
                    'w-full px-4 py-3 border-2 rounded-xl text-gray-900 placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20',
                    errors.firstName
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 focus:border-blue-500 bg-white',
                  ]"
                  required
                  placeholder="Enter your first name"
                />
                <span
                  v-if="errors.firstName"
                  class="text-red-500 text-sm mt-1 block font-medium"
                  >{{ errors.firstName }}</span
                >
              </div>

              <div>
                <label
                  for="lastName"
                  class="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Last Name <span class="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="lastName"
                  v-model="form.lastName"
                  :class="[
                    'w-full px-4 py-3 border-2 rounded-xl text-gray-900 placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20',
                    errors.lastName
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 focus:border-blue-500 bg-white',
                  ]"
                  required
                  placeholder="Enter your last name"
                />
                <span
                  v-if="errors.lastName"
                  class="text-red-500 text-sm mt-1 block font-medium"
                  >{{ errors.lastName }}</span
                >
              </div>
            </div>

            <div class="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label
                  for="email"
                  class="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Email Address <span class="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  v-model="form.email"
                  :class="[
                    'w-full px-4 py-3 border-2 rounded-xl text-gray-900 placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20',
                    errors.email
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 focus:border-blue-500 bg-white',
                  ]"
                  required
                  placeholder="your.email@example.com"
                />
                <span
                  v-if="errors.email"
                  class="text-red-500 text-sm mt-1 block font-medium"
                  >{{ errors.email }}</span
                >
              </div>

              <div>
                <label
                  for="phone"
                  class="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  v-model="form.phone"
                  class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 transition-all duration-300 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 bg-white"
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>

            <div class="mb-6">
              <label
                for="company"
                class="block text-sm font-semibold text-gray-700 mb-2"
              >
                Company Name
              </label>
              <input
                type="text"
                id="company"
                v-model="form.company"
                class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 transition-all duration-300 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 bg-white"
                placeholder="Your Company"
              />
            </div>

            <div class="mb-6">
              <label
                for="service"
                class="block text-sm font-semibold text-gray-700 mb-2"
              >
                Service Needed <span class="text-red-500">*</span>
              </label>
              <select
                id="service"
                v-model="form.service"
                :class="[
                  'w-full px-4 py-3 border-2 rounded-xl text-gray-900 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 cursor-pointer',
                  errors.service
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-200 focus:border-blue-500 bg-white',
                ]"
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
              <span
                v-if="errors.service"
                class="text-red-500 text-sm mt-1 block font-medium"
                >{{ errors.service }}</span
              >
            </div>

            <div class="mb-6">
              <label
                for="message"
                class="block text-sm font-semibold text-gray-700 mb-2"
              >
                Project Details <span class="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                v-model="form.message"
                :class="[
                  'w-full px-4 py-3 border-2 rounded-xl text-gray-900 placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 resize-vertical',
                  errors.message
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-200 focus:border-blue-500 bg-white',
                ]"
                placeholder="Tell us about your project, goals, and any specific requirements..."
                rows="5"
                required
              ></textarea>
              <span
                v-if="errors.message"
                class="text-red-500 text-sm mt-1 block font-medium"
                >{{ errors.message }}</span
              >
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              :disabled="isSubmitting"
              class="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl disabled:transform-none disabled:shadow-none disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              <span v-if="!isSubmitting" class="flex items-center gap-2">
                <i class="fa-regular fa-paper-plane"></i>
                Send Message
              </span>
              <span v-else class="flex items-center gap-2">
                <svg
                  class="w-5 h-5 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Sending...
              </span>
            </button>

            <!-- Success/Error Messages -->
            <div
              v-if="submitMessage"
              :class="[
                'mt-6 p-4 rounded-xl flex items-center gap-3 font-medium',
                submitStatus === 'success'
                  ? 'bg-green-50 text-green-800 border border-green-200'
                  : 'bg-red-50 text-red-800 border border-red-200',
              ]"
            >
              <svg
                v-if="submitStatus === 'success'"
                class="w-5 h-5 text-green-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <svg
                v-else
                class="w-5 h-5 text-red-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              {{ submitMessage }}
            </div>
          </form>
        </div>

        <!-- Contact Information -->
        <div class="space-y-8">
          <!-- Map Section -->
          <div
            class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden"
          >
            <div class="p-6 border-b border-gray-100">
              <h4 class="font-semibold text-gray-900 flex items-center gap-2">
                <svg
                  class="w-5 h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  ></path>
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
                Visit Our Office
              </h4>
            </div>
            <div
              class="h-48 bg-gradient-to-br from-blue-100 to-orange-100 flex items-center justify-center cursor-pointer hover:from-blue-200 hover:to-orange-200 transition-all duration-300"
              @click="openMap"
            >
              <div class="text-center text-blue-700">
                <svg
                  class="w-8 h-8 mx-auto mb-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <p class="font-medium mb-1">
                  No.14, SFNo.353, 4B, Kovur, Rajiv Gandhi Nagar,<br />
                  Kundrathur, Chennai, Tamil Nadu 600128
                </p>
                <span class="text-sm opacity-75">Click to open map</span>
              </div>
            </div>
          </div>
          <!-- Contact Items -->
          <div class="space-y-6">
            <div
              v-for="(item, index) in contactItems"
              :key="item.title"
              :class="[
                'flex items-start gap-4 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 transition-all duration-500 hover:shadow-xl hover:-translate-x-2',
                'opacity-0 translate-x-8',
              ]"
              :style="{ animationDelay: `${index * 0.1}s` }"
              ref="contactItems"
            >
              <div
                class="w-12 h-12 bg-gradient-to-br from-blue-600 to-orange-500 rounded-xl flex items-center justify-center text-white shadow-lg flex-shrink-0"
              >
                <i :class="item.icon" class="text-lg"></i>
              </div>
              <div class="flex-1">
                <h3 class="font-semibold text-gray-900 mb-2">
                  {{ item.title }}
                </h3>
                <p
                  class="text-gray-600 mb-3 leading-relaxed"
                  v-html="item.details"
                ></p>
                <a
                  v-if="item.link"
                  :href="item.link"
                  class="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  {{ item.linkText }}
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    ></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <!-- Social Media -->
          <div
            class="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20"
          >
            <h4
              class="font-semibold text-gray-900 mb-4 flex items-center gap-2"
            >
              <svg
                class="w-5 h-5 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                ></path>
              </svg>
              Follow Us
            </h4>
            <div class="grid grid-cols-2 gap-3">
              <a
                v-for="social in socialLinks"
                :key="social.platform"
                :href="social.url"
                class="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gradient-to-r hover:from-blue-50 hover:to-orange-50 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-md border border-gray-100 hover:border-blue-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i :class="social.icon" class="text-lg text-gray-600"></i>
                <span class="font-medium text-gray-700 text-sm">{{
                  social.platform
                }}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "ContactSection",
  data() {
    return {
      isSubmitting: false,
      submitMessage: "",
      submitStatus: "",
      form: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        service: "",
        message: "",
      },

      errors: {},

      services: [
        { value: "signage", label: "Signage Solutions" },
        { value: "printing", label: "Digital Printing" },
        { value: "acrylic", label: "Acrylic Designs" },
        { value: "branding", label: "Branding" },
        { value: "displays", label: "Custom Display Solutions" },
        { value: "design consultation", label: "Design Consultation" },
        { value: "other", label: "Other" },
      ],

      contactItems: [
        {
          title: "Call Us",
          icon: "fas fa-phone",
          details: "+91 99625 00715<br>Monday - Friday, 9AM - 6PM",
          link: "tel:+919962500715",
          linkText: "Call Now",
        },
        {
          title: "Email Us",
          icon: "fas fa-envelope",
          details: "info@colorsandsignage.co.in",
          link: "mailto:info@colorsandsignage.co.in",
          linkText: "Send Email",
        },
      ],

      socialLinks: [
        {
          platform: "Facebook",
          icon: "fab fa-facebook-f",
          url: "https://www.facebook.com/share/19kXHUm2UB/",
        },
        {
          platform: "Instagram",
          icon: "fab fa-instagram",
          url: "https://www.instagram.com/colorsandsignagesolutions",
        },
        {
          platform: "LinkedIn",
          icon: "fab fa-linkedin-in",
          url: "https://linkedin.com",
        },
        {
          platform: "Twitter",
          icon: "fab fa-twitter",
          url: "https://twitter.com",
        },
      ],
    };
  },
  mounted() {
    this.setupIntersectionObserver();
  },
  methods: {
    setupIntersectionObserver() {
      const options = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("opacity-0", "translate-x-8");
            entry.target.classList.add("opacity-100", "translate-x-0");
          }
        });
      }, options);

      this.$nextTick(() => {
        if (this.$refs.contactItems) {
          this.$refs.contactItems.forEach((item) => {
            observer.observe(item);
          });
        }
      });
    },

    validateForm() {
      this.errors = {};

      if (!this.form.firstName.trim()) {
        this.errors.firstName = "First name is required";
      }

      if (!this.form.lastName.trim()) {
        this.errors.lastName = "Last name is required";
      }

      if (!this.form.email.trim()) {
        this.errors.email = "Email is required";
      } else if (!this.isValidEmail(this.form.email)) {
        this.errors.email = "Please enter a valid email address";
      }

      if (!this.form.service) {
        this.errors.service = "Please select a service";
      }

      if (!this.form.message.trim()) {
        this.errors.message = "Please describe your project";
      } else if (this.form.message.trim().length < 20) {
        this.errors.message =
          "Please provide more details (minimum 20 characters)";
      }

      return Object.keys(this.errors).length === 0;
    },

    isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },

    async handleSubmit() {
      if (!this.validateForm()) {
        this.scrollToFirstError();
        return;
      }

      this.isSubmitting = true;
      this.submitMessage = "";
      this.submitStatus = "";

      try {
        const response = await axios.post(`/CSS_Website/api/contact`, {
          firstName: this.form.firstName,
          lastName: this.form.lastName,
          email: this.form.email,
          phone: this.form.phone,
          company: this.form.company,
          service: this.form.service,
          message: this.form.message,
        });

        if (response.data.success) {
          this.submitStatus = "success";
          this.submitMessage = response.data.message;

          setTimeout(() => {
            this.resetForm();
          }, 3000);
        }
      } catch (error) {
        this.submitStatus = "error";

        if (error.response && error.response.data) {
          this.submitMessage =
            error.response.data.message ||
            "Sorry, there was an error sending your message. Please try again or contact us directly.";
        } else {
          this.submitMessage =
            "Network error. Please check your connection and try again.";
        }

        console.error("Form submission error:", error);
      } finally {
        this.isSubmitting = false;
      }
    },

    resetForm() {
      this.form = {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        service: "",
        message: "",
      };
      this.errors = {};
      this.submitMessage = "";
      this.submitStatus = "";
    },

    scrollToFirstError() {
      const firstErrorField = Object.keys(this.errors)[0];
      if (firstErrorField) {
        const element = document.getElementById(firstErrorField);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
          element.focus();
        }
      }
    },

    openMap() {
      const mapUrl = `https://maps.app.goo.gl/7n8iYLg8jQ9T79Qf8`;
      window.open(mapUrl, "_blank", "noopener,noreferrer");
    },
  },
};
</script>
