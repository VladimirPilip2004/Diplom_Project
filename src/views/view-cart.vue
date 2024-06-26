<script setup lang="ts">
import type { CartItem } from '@/@types';
import CartCheckoutItem from '@/components/the-cart-checkout-item.vue';
import CartCheckout from '@/components/the-cart-checkout.vue';
import DefaultHeader from '@/components/the-default-header.vue';
import FadeTransition from '@/components/the-fade-transition.vue';
import ImageSkeleton from '@/components/the-image-skeleton.vue';
import { usePageTitle } from '@/composables/useTitle';
import { useCartStore } from '@/stores/useCartStore';
import { ShoppingCart } from 'lucide-vue-next';
import { computed } from 'vue';

const storeCart = useCartStore()
usePageTitle('Корзина')

const formatCartItemTotalAsCurrency = (item: CartItem) => {
  return computed(() => {
    return (item.price * item.quantity).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'RUB'
    })
  })
}

</script>

<template>
  <section class="container flex flex-col items-center justify-start space-y-4 p-2 py-4 tracking-normal">
    <DefaultHeader />
    <section class="flex w-full flex-col items-center justify-start space-y-4">
      <header class="flex h-20 w-full items-center justify-between rounded-lg border border-700/20 p-2">
        <div class="flex items-center justify-between gap-4">
          <ShoppingCart class="h-8 w-8 text-700" />
          <h2 class="text-2xl font-bold text-700">Корзина</h2>
        </div>
        <h5 class="text-base text-700">{{ storeCart.quantity }} товаров</h5>
      </header>

      <article class="flex w-full flex-col items-start justify-between gap-4 md:flex-row">
        <section class="w-full space-y-4 overflow-y-auto scrollbar-hide md:w-2/3">
          <FadeTransition>
            <CartCheckoutItem v-for="item in storeCart.cart" :key="item.id">
              <template #image>
                <ImageSkeleton :src="item.image" :alt="item.name" class="block h-full w-full object-contain" />
              </template>

              <template #price-color>
                {{ item.color }} / {{ item.size }}
              </template>

              <template #name>
                {{ item.name }}
              </template>

              <template #remove>
                <span @click="storeCart.removeItem(item.id)">Удалить</span>
              </template>

              <template #quantity>
                x{{ item.quantity }}
              </template>

              <template #total-price>
                {{ formatCartItemTotalAsCurrency(item).value }}
              </template>
            </CartCheckoutItem>
          </FadeTransition>
        </section>

        <section class="w-full rounded-lg bg-700/5 p-6 md:w-96">
          <CartCheckout />
        </section>
      </article>
    </section>
  </section>
</template>