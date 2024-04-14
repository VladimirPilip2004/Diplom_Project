<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import ImageSkeleton from './the-image-skeleton.vue';

const banners = [
  "http://cdn.grandposuda.ru/assets/banners/banner1.jpg",
  "http://cdn.grandposuda.ru/assets/banners/banner2.jpg",
  "http://cdn.grandposuda.ru/assets/banners/banner3.jpg"
]

const modules = [
  Pagination,
  Navigation,
  Autoplay
];
</script>

<template>
  <div class="relative flex w-full flex-col items-center justify-center bg-700">
    <swiper :autoplay="{ delay: 8000, disableOnInteraction: false }" :loop="true" :pagination="true" :modules="modules"
      class="border bg-700 p-2">
      <swiper-slide v-for="img in banners" :key="img">
        <ImageSkeleton :src="img" alt="bannerimage" />
      </swiper-slide>
    </swiper>
  </div>
</template>