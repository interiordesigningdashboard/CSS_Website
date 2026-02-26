<template>
  <nav
    class="fixed top-0 w-full bg-white/5 backdrop-blur-sm z-50 py-2.5 shadow-lg transition-all duration-300"
    :class="{ 'bg-none backdrop-blur-none': isScrolled }"
  >
    <div class="mx-auto px-8 md:px-4 flex justify-between items-center">
      <!-- Logo -->
      <div>
        <NuxtLink
          to="/"
          class="text-3xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent no-underline"
        >
          <img src="/logo.jpg" alt="ColorsLogo" class="inline h-12" />
          <span class="hidden lg:inline good-times pl-2"
            >Colors & Signage Solutions</span
          >
        </NuxtLink>
      </div>

      <!-- Desktop Navigation Menu -->
      <ul
        class="list-none m-0 p-0 transition-all duration-300 ease-in-out"
        :class="
          isMobileMenuOpen
            ? 'fixed top-0 right-0 h-screen w-72 bg-white flex flex-col justify-start items-start pt-20 px-8 gap-6 shadow-xl z-50'
            : 'hidden md:flex gap-8 items-center'
        "
      >
        <li
          v-for="item in navigationItems"
          :key="item.name"
          class="w-full md:w-auto"
        >
          <!-- <a
            :href="item.href"
            class="block w-full md:w-auto no-underline text-gray-800 font-bold transition-colors duration-300 py-2 md:py-2 border-b border-gray-100 md:border-none text-lg md:text-base hover:text-blue-600"
            @click="handleNavClick(item.href)"
          >
            {{ item.name }}
          </a> -->
          <NuxtLink
            :to="item.href"
            class="block w-full md:w-auto no-underline text-gray-800 font-bold transition-colors duration-300 py-2 md:py-2 border-b border-gray-100 md:border-none text-lg md:text-base hover:text-blue-600"
            @click="handleNavClick(item.href)"
          >
            {{ item.name }}
          </NuxtLink>
        </li>
        <li class="w-full md:w-auto mt-4 md:mt-0">
          <a
            href="#contact"
            class="block w-full md:w-auto bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-3 rounded-full no-underline font-semibold transition-all duration-300 text-center shadow-lg shadow-orange-500/30 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-orange-500/40"
            @click="handleNavClick('#contact')"
          >
            Get in Touch
          </a>
        </li>
      </ul>

      <!-- Mobile Menu Toggle -->
      <button
        class="md:hidden bg-none border-none text-2xl text-gray-800 cursor-pointer z-50 relative"
        @click="toggleMobileMenu"
        :aria-expanded="isMobileMenuOpen"
        aria-label="Toggle navigation menu"
      >
        <i :class="isMobileMenuOpen ? 'fas fa-times' : 'fas fa-bars'"></i>
      </button>
    </div>

    <!-- Mobile Menu Overlay -->
    <div
      v-if="isMobileMenuOpen"
      class="fixed inset-0 bg-black/10 z-40 md:hidden"
      @click="closeMobileMenu"
    ></div>
  </nav>
</template>

<script>
export default {
  name: "TheNavbar",
  data() {
    return {
      isScrolled: false,
      isMobileMenuOpen: false,
      navigationItems: [
        { name: "Home", href: "/#home" },
        { name: "Services", href: "/#services" },
        { name: "Portfolio", href: "/#portfolio" },
        { name: "About", href: "/#about" },
        // { name: 'Contact', href: '#contact' }
      ],
    };
  },
  mounted() {
    // Add scroll listener for navbar background
    window.addEventListener("scroll", this.handleScroll);

    // Add resize listener for mobile menu
    window.addEventListener("resize", this.handleResize);
  },
  beforeUnmount() {
    // Clean up event listeners
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 100;
    },

    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;

      // Prevent body scroll when mobile menu is open
      if (this.isMobileMenuOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    },

    closeMobileMenu() {
      this.isMobileMenuOpen = false;
      document.body.style.overflow = "";
    },

    handleResize() {
      // Close mobile menu on desktop resize
      if (window.innerWidth > 768 && this.isMobileMenuOpen) {
        this.closeMobileMenu();
      }
    },

    handleNavClick(href) {
      // Close mobile menu when navigation item is clicked
      if (this.isMobileMenuOpen) {
        this.closeMobileMenu();
      }

      // Smooth scroll to section
      if (href.startsWith("#")) {
        this.scrollToSection(href);
      }
    },

    scrollToSection(sectionId) {
      const element = document.querySelector(sectionId);
      if (element) {
        const offsetTop = element.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    },
  },
};
</script>
