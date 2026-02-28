<template>
  <section
    id="home"
    class="relative min-h-screen w-full flex flex-col justify-center items-center text-center overflow-hidden bg-gradient-to-br from-blue-50 via-pink-50 to-orange-50"
  >
    <!-- Animated Background Elements -->
    <div class="absolute inset-0 z-0">
      <div class="relative w-full h-full">
        <div
          v-for="(shape, index) in backgroundShapes"
          :key="index"
          class="absolute rounded-full opacity-100"
          :class="shape.classes"
          :style="shape.style"
        ></div>
      </div>
    </div>

    <div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-8 pb-20 sm:pb-16">
      <!-- Main Headline with Typing Effect -->
      <!-- <h1 class="p-2  text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 bg-gradient-to-r from-blue-600 via-orange-500 to-emerald-500 bg-clip-text text-transparent leading-tight"> -->
      <h1
        class="p-2 text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 bg-gradient-to-r from-blue-600 via-orange-500 to-emerald-500 bg-clip-text text-transparent leading-tight mt-6 sm:mt-2"
      >
        <span class="inline-block" style="min-height: 1.2em; padding: px">
          {{ displayedText
          }}<span
            class="text-orange-500 font-normal transition-opacity duration-150"
            :class="{ 'opacity-100': showCursor, 'opacity-0': !showCursor }"
            >|</span
          >
        </span>
      </h1>

      <!-- Subtitle -->
      <p
        class="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed max-w-3xl mx-auto transition-all duration-700 ease-out transform"
        :class="{
          'opacity-100 translate-y-0': subtitleVisible,
          'opacity-0 translate-y-5': !subtitleVisible,
        }"
      >
        {{ subtitle }}
      </p>

      <!-- Call to Action Button -->
      <div
        class="flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-700 ease-out transform"
        :class="{
          'opacity-100 translate-y-0': actionsVisible,
          'opacity-0 translate-y-8': !actionsVisible,
        }"
      >
        <a
          href="#contact"
          class="block w-full md:w-auto bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-3 rounded-full no-underline font-semibold transition-all duration-300 text-center shadow-lg shadow-orange-500/30 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-orange-500/40"
          @click="scrollToContact"
        >
          <span>{{ buttonText }}</span>
          <i
            class="fas fa-arrow-right transition-transform duration-300 group-hover:translate-x-1"
          ></i>
        </a>

        <!-- Secondary Action -->

        <a
          href="#portfolio"
          class="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 border-2 border-gray-200 rounded-full font-semibold text-base sm:text-lg text-gray-700 bg-white/80 backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-blue-600 hover:text-blue-600 hover:shadow-lg hover:shadow-blue-500/10"
          @click="scrollToPortfolio"
        >
          <span>View Our Work</span>
        </a>
      </div>
    </div>

    <!-- Scroll Indicator - Fixed positioning for mobile -->
    <div
      class="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-10 opacity-70 hover:opacity-100 transition-opacity duration-300"
      @click="scrollToNext"
    >
      <div
        class="w-8 h-8 sm:w-10 sm:h-10 border-2 border-blue-600 rounded-full flex items-center justify-center animate-bounce"
      >
        <i class="fas fa-chevron-down text-blue-600 text-xs sm:text-sm"></i>
      </div>
      <span class="text-xs sm:text-sm text-gray-700 font-medium"
        >Scroll to explore</span
      >
    </div>
  </section>
</template>

<script>
export default {
  name: "HeroSection",
  data() {
    return {
      // Main content
      fullText: "Elevating Brands with Innovative Signage & Printing",
      displayedText: "",
      subtitle:
        "Bringing your brand to life with cutting-edge design solutions, premium quality materials, and expert craftsmanship that makes your business stand out.",
      buttonText: "Start Your Project",

      // Animation states
      currentIndex: 0,
      showCursor: true,
      subtitleVisible: false,
      actionsVisible: false,
      typingComplete: false,

      // Background shapes for animation
      backgroundShapes: [
        {
          classes:
            "w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-blue-500/10 to-orange-500/10",
          style: {
            top: "20%",
            left: "10%",
            animation: "float 6s ease-in-out infinite",
          },
        },
        {
          classes:
            "w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-yellow-400/10 to-red-500/10",
          style: {
            top: "60%",
            left: "17%",
            animation: "float 6s ease-in-out infinite",
          },
        },
        {
          classes:
            "w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-emerald-500/10 to-pink-500/10",
          style: {
            top: "60%",
            right: "15%",
            borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
            animation: "float 8s ease-in-out infinite reverse",
          },
        },
        {
          classes:
            "w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-blue-500/10 to-purple-500/10",
          style: {
            top: "40%",
            right: "50%",
            borderRadius: "35% 70% 60% 30% / 30% 30% 70% 70%",
            animation: "float 8s ease-in-out infinite reverse",
          },
        },
        {
          classes:
            "w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-yellow-400/10 to-red-500/10",
          style: {
            top: "40%",
            right: "7%",
            animation: "float 6s ease-in-out infinite",
          },
        },
        {
          classes:
            "w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-indigo-500/10 to-fuchsia-500/10",
          style: {
            top: "10%",
            right: "10%",
            borderRadius: "35% 70% 60% 30% / 30% 30% 70% 70%",
            animation: "float 8s ease-in-out infinite reverse",
          },
        },
        {
          classes:
            "w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-orange-500/10 to-blue-500/10",
          style: {
            bottom: "30%",
            left: "5%",
            animation: "float 7s ease-in-out infinite",
          },
        },
      ],
    };
  },
  mounted() {
    // Wait for component to fully mount before starting animations
    this.$nextTick(() => {
      this.startTypingAnimation();
      this.startCursorBlink();
    });
  },
  methods: {
    startTypingAnimation() {
      const typeSpeed = 80; // milliseconds per character

      const typeText = () => {
        if (this.currentIndex < this.fullText.length) {
          this.displayedText += this.fullText.charAt(this.currentIndex);
          this.currentIndex++;
          setTimeout(typeText, typeSpeed);
        } else {
          // Text complete
          this.typingComplete = true;
          // Show subtitle and actions with staggered animation
          setTimeout(() => {
            this.subtitleVisible = true;
            setTimeout(() => {
              this.actionsVisible = true;
            }, 400);
          }, 600);
        }
      };

      // Start typing after a short delay
      setTimeout(typeText, 500);
    },

    startCursorBlink() {
      setInterval(() => {
        // Only blink cursor if typing is not complete, or continue blinking but slower
        if (!this.typingComplete) {
          this.showCursor = !this.showCursor;
        } else {
          // Slower blink after typing is complete
          setTimeout(() => {
            this.showCursor = !this.showCursor;
          }, 200);
        }
      }, 600);
    },

    scrollToContact(event) {
      event.preventDefault();
      this.scrollToSection("#contact");
    },

    scrollToPortfolio(event) {
      event.preventDefault();
      this.scrollToSection("#portfolio");
    },

    scrollToNext() {
      this.scrollToSection("#services");
    },

    scrollToSection(sectionId) {
      const element = document.querySelector(sectionId);
      if (element) {
        const offsetTop = element.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    },
  },
};
</script>

<style scoped>
/* Custom animations that Tailwind doesn't provide */
@keyframes float {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  33% {
    transform: translateY(-20px) rotate(5deg);
  }
  66% {
    transform: translateY(-10px) rotate(-3deg);
  }
}

/* Ensure proper text height for typing animation */
h1 span {
  display: inline-block;
  vertical-align: top;
}

/* For reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  .animate-float,
  [style*="animation"] {
    animation: none !important;
  }

  .animate-bounce {
    animation: none;
  }
}

/* Mobile optimizations */
@media (max-width: 640px) {
  .min-h-screen {
    min-height: 100vh;
    min-height: 100dvh; /* Dynamic viewport height for mobile */
  }
}
</style>
