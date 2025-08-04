<script setup>
    import { ref, onMounted, onUnmounted } from 'vue';
    import { useProductsStore } from '@/stores/products';

    import LoadingIcon from './icons/LoadingIcon.vue';

    const productsStore = useProductsStore();
    const el = ref(null);

    // Load next page when scrolling down load more
    onMounted(() => {
        window.addEventListener("scroll", handleScroll);
    })
    onUnmounted(() => {
        window.removeEventListener("scroll", handleScroll);
    })

    async function handleScroll(e) {
        const element = el.value;
        if (!(element.getBoundingClientRect().bottom < window.innerHeight)) {
            return;
        }
        // Prevent loading next page when in fetch or no next page
        if (productsStore.isFetchingNextPage || !productsStore.hasNextPage || productsStore.isPending) {
            return;
        }
        await productsStore.fetchNextPage();
    }
</script>

<template>
    <div ref="el">
        <LoadingIcon v-if="productsStore.isFetchingNextPage"
            class="w-[60px] h-[60px] text-[#b3b3b3] flex justify-center mt-[24px] mb-[80px] ml-auto mr-auto" />
        <button v-else type="button"
            class="opacity-[0] bg-[#8000FF] rounded-[16px] font-[Inter] text-[16px] leading-[24px] font-semibold text-white text-center pt-[14px] pb-[14px] pr-[14px] pl-[14px] w-[180px] mx-auto">
            <span>Load more</span>
        </button>
    </div>
</template>