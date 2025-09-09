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
      <!-- Testimonials -->
      <!-- <Testimonials /> -->

      <!-- Contact Section -->
      <ContactForm />
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Hero from '~/components/hero.vue'
import Services from '~/components/services.vue'
import portfolio from '~/components/portfolio.vue'
import ContactForm from '~/components/contact.vue'
import about from '~/components/about.vue'
// import FeaturedProjects from '~/components/FeaturedProjects.vue'
// import Process from '~/components/Process.vue'


// Meta tags
useHead({
  title: 'Shomli Interiors - Designing Dreams, Building Reality',
  meta: [
    {
      name: 'description',
      content: 'Transform your vision into beautifully crafted spaces. From cozy homes to modern offices, Shomli Interiors creates environments that inspire.'
    }
  ]
})
</script>