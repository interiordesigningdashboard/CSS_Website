<script setup>
import { ref } from "vue";

const activeIndex = ref(null);

const faqs = [
  {
    question: "What types of signage solutions do you provide?",
    answer:
      "We design and manufacture acrylic signage, LED boards, digital prints, branding installations, and customized display solutions tailored to your business identity.",
  },
  {
    question: "Do you handle complete branding projects?",
    answer:
      "Yes. From concept to execution, we manage visual identity, space aesthetics, signage placement, and installation.",
  },
  {
    question: "Can you customize designs based on our space?",
    answer:
      "Every project is spatially studied. We adapt scale, lighting, and material finishes to match your environment.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Depending on complexity, projects range from 1–4 weeks including production and installation.",
  },
  {
    question: "Do you offer on-site installation?",
    answer:
      "Yes. Our professional team handles delivery, installation, and finishing to ensure flawless execution.",
  },
];

const toggle = (index) => {
  activeIndex.value = activeIndex.value === index ? null : index;
};
</script>

<template>
  <section class="bg-white text-black">
    <div class="max-w-7xl mx-auto px-6 lg:px-10 py-14">
      <!-- Title -->
      <h2
        class="text-6xl bg-gradient-to-r from-blue-600 via-orange-500 to-emerald-500 bg-clip-text text-transparent font-extrabold py-3 mb-7"
      >
        Frequently Asked Questions
      </h2>

      <!-- List -->
      <div class="divide-y divide-white/20">
        <div v-for="(faq, index) in faqs" :key="index" class="py-4 text-left">
          <!-- Row -->
          <button
            class="button2 w-full flex items-center justify-between gap-4 text-left"
            @click="toggle(index)"
          >
            <span
              class="text-xl md:text-2xl font-semibold leading-snug transition-colors duration-200"
              :class="activeIndex === index ? 'text-orange-500' : 'text-black'"
            >
              {{ faq.question }}
            </span>

            <!-- + / - icon (orange when open) -->
            <span
              class="text-3xl md:text-4xl font-semibold leading-none transition-colors duration-200"
              :class="activeIndex === index ? 'text-orange-500' : 'text-black'"
              aria-hidden="true"
            >
              {{ activeIndex === index ? "–" : "+" }}
            </span>
          </button>

          <!-- Answer (only when open) -->
          <transition
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="opacity-0 max-h-0"
            enter-to-class="opacity-100 max-h-96"
            leave-active-class="transition-all duration-200 ease-in"
            leave-from-class="opacity-100 max-h-96"
            leave-to-class="opacity-0 max-h-0"
          >
            <div
              v-if="activeIndex === index"
              class="mt-2 ml-20 text-black text-lg md:text-xl leading-relaxed max-w-5xl"
            >
              {{ faq.answer }}
            </div>
          </transition>
        </div>
      </div>
    </div>
  </section>
</template>
