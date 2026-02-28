<template>
  <div class="min-h-screen bg-black">
    <main>
      <!-- Hero Section -->
      <Hero />
      <!-- Services -->
      <Services />
      <!-- Portfolio -->
      <portfolio />

      <!-- Process -->
      <!-- <Process /> -->

      <!-- About -->
      <about />
      <Brands />
      <faq />
      <!-- Testimonials -->
      <!-- <Testimonials /> -->

      <!-- Contact Section -->
      <ContactForm />
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Hero from "~/components/hero.vue";
import Services from "~/components/services.vue";
import portfolio from "~/components/portfolio.vue";
import ContactForm from "~/components/contact.vue";
import about from "~/components/about.vue";
import faq from "~/components/faq.vue";
import Brands from "~/components/brands.vue";
// import FeaturedProjects from '~/components/FeaturedProjects.vue'
// import Process from '~/components/Process.vue'

// Meta tags
useHead({
  title: "Colors & Signage Solutions",
  meta: [
    {
      name: "description",
      content:
        "We specialize in signage, digital printing, and wallpaper solutions. Bringing creativity and quality together to transform your spaces with vibrant designs and lasting impact.",
    },
  ],
});
</script>
