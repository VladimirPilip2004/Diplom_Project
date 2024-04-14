<script setup lang="ts">
import { useCartStore } from '@/stores/useCartStore';
import { computed } from 'vue';

const storeCart = useCartStore()

const formatFifthAsCurrency = (value: number) => {
  return computed(() => {
    return (value / 5).toLocaleString('pt-RU', {
      style: 'currency',
      currency: 'RUB'
    })
  })
}

</script>

<template>
  <section class="flex w-full flex-col items-start justify-center gap-4 space-y-0">
    <h2 class="text-base font-bold text-700">Итого</h2>

    <div class="flex w-full items-center justify-between">
      <h2 class="text-base text-700">Сумма</h2>
      <span class="text-base text-700">
        {{ storeCart.total.toLocaleString('pt-RU', {
          style: 'currency',
          currency: 'RUB'
        }) }}
      </span>
    </div>

    <div class="flex w-full items-center justify-between">
      <h2 class="text-base text-700">Купон на скидку</h2>
      <span class="cursor-pointer text-xs font-bold text-700/70 hover:underline">Вставить купон</span>
    </div>

    <div class="flex w-full items-center justify-between">
      <h2 class="text-base text-700">Заказать</h2>
      <span class="text-xs font-bold text-700/70">Бесплатно</span>
    </div>

    <div class="flex w-full items-start justify-between">
      <h2 class="text-base font-bold text-700">Сумма</h2>

      <div class="flex w-full flex-col items-end justify-center">
        <span class="text-xl font-bold text-700">
          {{ storeCart.total.toLocaleString('pt-RU', {
            style: 'currency',
            currency: 'RUB'
          }) }}
        </span>
        <span class="text-xs">Скидка 3%</span>
        <span class="text-xs font-bold text-600">или 5x {{ formatFifthAsCurrency(storeCart.total).value }} 0%</span>
      </div>
    </div>

    <div class="flex w-full flex-col items-center justify-center gap-2 space-y-2">
      <RouterLink to="/login"
        class="w-full rounded-lg bg-600 p-4 text-center text-xs font-bold uppercase text-800 transition-all hover:opacity-95">
        Купить</RouterLink>
      <RouterLink class="text-xs font-bold text-700 opacity-80 transition-all hover:underline" to="/">Продолжить
        покупки
      </RouterLink>
    </div>
  </section>
</template>