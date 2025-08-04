import { ref, watch } from 'vue';
import { defineStore } from 'pinia';
import { getProducts } from '@/api_request/productsApi';

import { useInfiniteQuery, } from '@tanstack/vue-query';

export const useProductsStore = defineStore('products', () => {
    const products = ref([]);

    const { isPending, isError, data, error, fetchNextPage, hasNextPage, isFetchingNextPage, refetch, isRefetching } = useInfiniteQuery({
        queryKey: ['getProduct'],
        queryFn: async ({ pageParam = 0 }) => {
            const productsData = await getProducts(pageParam);
            return productsData;
        },
        getNextPageParam: (lastPage, pages) => lastPage.pageInfo.hasNextPage ? lastPage.pageInfo.endCursor : null,
        retry: false,
    })
   // Watch data update and then prepare products data for display
    watch(data, (newData) => {
        const newProducts = []
        newData.pages.forEach(page => {
            newProducts.push(...page.products);
        });
        products.value = newProducts;
    });

    return { products, isPending, isRefetching, refetch, fetchNextPage, hasNextPage, isFetchingNextPage, isError, error }
})

