<template>
  <section class="py-20 bg-gray-50">
    <div class="max-w-7xl mx-auto px-6 text-center">
      <h2
        class="text-6xl bg-gradient-to-r from-blue-600 via-orange-500 to-emerald-500 bg-clip-text text-transparent font-extrabold py-3 mb-7"
      >
        Brands We Serve
      </h2>

      <!-- ROW 1 -->
      <Swiper
        :modules="[Autoplay]"
        :slides-per-view="5"
        :space-between="30"
        :speed="2000"
        :loop="true"
        :allow-touch-move="false"
        :autoplay="{ delay: 0, disableOnInteraction: false }"
        @swiper="setSwiper1"
        @mouseenter="stop(swiper1)"
        @mouseleave="start(swiper1)"
        class="mb-8"
      >
        <SwiperSlide
          v-for="(brand, index) in row1"
          :key="'r1' + index"
          class="flex items-center justify-center h-28"
        >
          <img
            :src="brand.logo"
            :alt="brand.name"
            class="max-h-16 object-contain transition duration-300"
          />
        </SwiperSlide>
      </Swiper>

      <!-- ROW 2 (Reverse Direction) -->
      <Swiper
        :modules="[Autoplay]"
        :slides-per-view="5"
        :space-between="30"
        :speed="2000"
        :loop="true"
        :allow-touch-move="false"
        :autoplay="{
          delay: 0,
          disableOnInteraction: false,
          reverseDirection: true,
        }"
        @swiper="setSwiper2"
        @mouseenter="stop(swiper2)"
        @mouseleave="start(swiper2)"
        class="mb-8"
      >
        <SwiperSlide
          v-for="(brand, index) in row2"
          :key="'r2' + index"
          class="flex items-center justify-center h-28"
        >
          <img
            :src="brand.logo"
            :alt="brand.name"
            class="max-h-16 object-contain transition duration-300"
          />
        </SwiperSlide>
      </Swiper>

      <!-- ROW 3 -->
      <Swiper
        :modules="[Autoplay]"
        :slides-per-view="5"
        :space-between="30"
        :speed="2000"
        :loop="true"
        :allow-touch-move="false"
        :autoplay="{ delay: 0, disableOnInteraction: false }"
        @swiper="setSwiper3"
        @mouseenter="stop(swiper3)"
        @mouseleave="start(swiper3)"
      >
        <SwiperSlide
          v-for="(brand, index) in row3"
          :key="'r3' + index"
          class="flex items-center justify-center h-28"
        >
          <img
            :src="brand.logo"
            :alt="brand.name"
            class="max-h-16 object-contain transition duration-300"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay } from "swiper/modules";

import "swiper/css";

const brands = [
  { name: "Brand 1", logo: "/brandslogo/1.png" },
  { name: "Brand 2", logo: "/brandslogo/2.png" },
  { name: "Brand 3", logo: "/brandslogo/3.png" },
  { name: "Brand 4", logo: "/brandslogo/4.png" },
  { name: "Brand 5", logo: "/brandslogo/5.png" },
  { name: "Brand 6", logo: "/brandslogo/6.png" },
  { name: "Brand 7", logo: "/brandslogo/7.png" },
  { name: "Brand 8", logo: "/brandslogo/8.png" },
  { name: "Brand 9", logo: "/brandslogo/9.png" },
  { name: "Brand 10", logo: "/brandslogo/10.png" },
  { name: "Brand 11", logo: "/brandslogo/11.png" },
  { name: "Brand 12", logo: "/brandslogo/12.png" },
  { name: "Brand 13", logo: "/brandslogo/13.png" },
  { name: "Brand 14", logo: "/brandslogo/14.png" },
  { name: "Brand 15", logo: "/brandslogo/15.png" },
];

const row1 = brands.slice(0, 7);
const row2 = brands.slice(5, 12);
const row3 = brands.slice(8, 15);

// Swiper refs
const swiper1 = ref(null);
const swiper2 = ref(null);
const swiper3 = ref(null);

const setSwiper1 = (swiper) => (swiper1.value = swiper);
const setSwiper2 = (swiper) => (swiper2.value = swiper);
const setSwiper3 = (swiper) => (swiper3.value = swiper);

const stop = (swiper) => {
  swiper?.autoplay?.stop();
};

const start = (swiper) => {
  swiper?.autoplay?.start();
};
</script>
