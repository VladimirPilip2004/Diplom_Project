<script setup lang="ts">
import AsideFilter from '@/components/the-aside-filters.vue';
import { usePaginationStore } from '@/stores/usePagination';
import { ChevronLeft, ChevronRight } from 'lucide-vue-next';
import { usePagination } from '@/composables/usePagination';

const {
  isActiveAsideFilter,
  relevantFilters,
  quantityItems,
  pages,
} = usePagination()

const store = usePaginationStore()

</script>

<template>
  <section class="my-2 flex flex-wrap items-center justify-center gap-2 md:justify-between">
    <AsideFilter v-show="isActiveAsideFilter" @close="isActiveAsideFilter = !isActiveAsideFilter" />
    <aside class="flex flex-wrap items-center justify-center gap-2">
      <button @click="isActiveAsideFilter = !isActiveAsideFilter" class="bg-700 p-2 px-4 text-base uppercase text-800">
        Фильтр
      </button>

      <select v-model="relevantFilters" class="border border-900 p-2 px-4 text-700/80 outline-none">
        <option value="mais relevantes" selected>По популярности</option>
        <option value="a>z">По алфавиту A>Z</option>
        <option value="z>a">По алфавиту Z>A</option>
      </select>

      <select v-model="quantityItems" class="border border-900 p-2 px-4 text-700/80 outline-none">
        <option value="6">6</option>
        <option value="12" selected>12</option>
        <option value="24">24</option>
        <option value="36">36</option>
      </select>
    </aside>

    <aside class="hidden items-center justify-center gap-4 md:flex">
      <span class="text-700/80">Страница:
        <select v-model="pages" @change="store.setPage(Number(pages))"
          class="border border-900 p-2 text-700/80 outline-none">
          <option v-for="page in store.pages" :key="page" :value="page">{{ page + 1 }}</option>
        </select> из {{ store.totalPages }}
      </span>
      <ChevronLeft @click="store.previousPage" class="h-5 w-5 cursor-pointer text-700/80" />
      <ChevronRight @click="store.nextPage" class="h-5 w-5 cursor-pointer text-700/80" />
    </aside>
  </section>
</template>