<script setup>
    import { useEditProductStore } from '@/stores/editProduct';
    import PenIcon from '../icons/PenIcon.vue';

    const { product } = defineProps(['product']);

    const editProductStore = useEditProductStore();

    // Open product edit modal, pass title and ID
    function handleEditBuntton() {
        editProductStore.productTitle = product.title;
        editProductStore.productId = product.id;
        editProductStore.editProductModalStatus = true;
    }
</script>

<template>
    <button type="button"
        class="flex items-center gap-[14px] rounded-[8px] bg-[#E3E3E3] hover:bg-[#dcdcdc] font-[Inter] text-[16px] leading-[24px] font-semibold text-black pt-[16px] pb-[16px] pr-[16px] pl-[16px] w-[100%] mb-[12px]"
        @click.prevent="handleEditBuntton">
        <PenIcon />
        <span>Rename</span>
    </button>
</template>