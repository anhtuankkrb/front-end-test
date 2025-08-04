<script setup>
    import { useCreateProductStore } from '@/stores/createProduct'
    import PlusIcon from '../icons/PlusIcon.vue';

    const createProductStore = useCreateProductStore();

    // Open create product modal 
    async function handleCreatBuntton() {
        createProductStore.createProductModalStatus = true;
    }
</script>

<template>
    <button type="button"
        class="bg-[#8000FF] hover:bg-[#6e00db]  rounded-[16px] font-[Inter] text-[16px] leading-[24px] font-semibold text-white pt-[14px] pb-[14px] pr-[10px] pl-[14px] md:pt-[22px] md:pb-[22px] md:pr-[15px] md:pl-[32px] min-w-[180px] md:min-w-[202px] flex gap-[17px] items-center"
        @click.prevent="handleCreatBuntton">
        <PlusIcon />
        <span>New a Product</span>
    </button>
</template>