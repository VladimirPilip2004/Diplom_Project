import type { CartItem } from "@/@types";
import { defineStore } from "pinia";

const MAX_QUANTITY_PER_PRODUCT = 20;

export const useCartStore = defineStore("useCartStore", {
  state: () => ({
    selectedProduct: {} as CartItem,
    cart: [] as CartItem[],
    quantity: 0,
    total: 0,
    messages: {
      success: '',
      error: ''
    }
  }),
  actions: {
    setSelectedProduct(product: CartItem, quantity: number = 1) {
      const existingProductIndex = this.cart.findIndex((item) => item.id === product.id);

      if (existingProductIndex !== -1) {
        const existingProduct = this.cart[existingProductIndex];
        if (existingProduct.quantity + quantity <= MAX_QUANTITY_PER_PRODUCT) {
          const updatedProduct = { ...existingProduct, quantity: existingProduct.quantity + quantity };
          this.cart.splice(existingProductIndex, 1, updatedProduct);
          this.saveCartInLocalStorage();
          this.success('Добавлено в корзину');
        } else {
          this.error(`Максимальное ${MAX_QUANTITY_PER_PRODUCT} количество товара`);
        }
      } else {
        if (quantity <= MAX_QUANTITY_PER_PRODUCT) {
          this.addItem(product, quantity);
        } else {
          this.error(`Максимальное ${MAX_QUANTITY_PER_PRODUCT} количество товара`);
        }
      }

      this.selectedProduct = product;
      this.calcQuantityAndTotal();
    },
    addItem(product: CartItem, quantity: number = 1) {
      this.cart = [...this.cart, { ...product, quantity }];
      this.saveCartInLocalStorage();
      this.calcQuantityAndTotal();
      this.success('Добавлено в корзину');
    },
    removeItem(id: number) {
      this.cart = this.cart.filter((item) => item.id !== id);
      this.removeItemInLocalStorage(id)
      this.calcQuantityAndTotal();
      this.success('Удалено из корзины');
    },
    clearCart() {
      this.cart = [];
      this.quantity = 0;
      this.total = 0;
      this.clearCartInLocalStorage();
      this.success('Товары удалены');
    },
    calcQuantityAndTotal() {
      this.quantity = this.cart.reduce((acc, cur) => acc + cur.quantity, 0);
      this.total = this.cart.reduce((acc, cur) => acc + cur.quantity * cur.price, 0);
    },
    success(message: string) {
      this.messages.success = message;
    },
    error(message: string) {
      this.messages.error = message;
    },
    saveCartInLocalStorage() {
      localStorage.setItem('@cart-store', JSON.stringify(this.cart));
    },
    getCartInLocalStorage() {
      const cart = localStorage.getItem('@cart-store');
      if (cart) {
        try {
          this.cart = JSON.parse(cart);
          this.calcQuantityAndTotal();
        } catch (error) {
          this.error('Ошибка загрузки корзины');
        }
      }
    },
    removeItemInLocalStorage(id: number) {
      const cart = localStorage.getItem('@cart-store');
      if (cart) {
        const newCart = JSON.parse(cart).filter((item: CartItem) => item.id !== id);
        localStorage.setItem('@cart-store', JSON.stringify(newCart));
      }
    },
    clearCartInLocalStorage() {
      localStorage.removeItem('@cart-store');
    },
  }
});