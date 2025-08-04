<script setup>
  import { useProductsStore } from '@/stores/products';
  import { useSearchResultStore } from '@/stores/searchResult';

  import LoadingIcon from './icons/LoadingIcon.vue';
  import LoadMore from './LoadMore.vue';
  import Product from './Product.vue';

  const productsStore = useProductsStore();
  const searchResultStore = useSearchResultStore();
</script>

<template>
    <LoadingIcon
      v-if="productsStore.isPending || productsStore.isRefetching || searchResultStore.isPending || searchResultStore.isRefetching"
      class="w-[60px] h-[60px] text-[#b3b3b3] flex justify-center mt-[24px] ml-auto mr-auto" />
    <!-- Show all products -->
    <template v-else>
        <template v-if="searchResultStore.searchText.length === 0">
            <div v-if="productsStore.products && productsStore.products.length == 0" class="font-[Inter] font-bold text-[36px] leading-[1] text-[#585858] text-center mt-[20px]">
                No products
            </div>
            <div v-else class="flex flex-col gap-[25px]">
                <Product v-for="product in productsStore.products" :product="product" :key="product.id" />
                <LoadMore v-if="productsStore.hasNextPage && searchResultStore.searchText.length === 0" />
            </div>
        </template>
        <!-- Show search results -->
        <template v-else>
            <div v-if="searchResultStore.data && searchResultStore.data.length == 0" class="font-[Inter] font-bold text-[36px] leading-[1] text-[#585858] text-center mt-[20px]">
                No result
            </div>
            <div v-else class="flex flex-col gap-[25px]">
                <Product v-for="product in searchResultStore.data" :product="product" :key="product.id" />
            </div>
        </template>
    </template>
</template>
