<script setup>
    import TrashIcon from '../icons/TrashIcon.vue';
    import { useDeleteProductStore } from '@/stores/deleteProduct'

    const { product } = defineProps(['product'])

    const deleteProductStore = useDeleteProductStore();

    //Open delete product modal, pass product id and title
    function handleClick() {
        deleteProductStore.productTitle = product.title;
        deleteProductStore.productId = product.id;
        deleteProductStore.deleteProductModalStatus = true;
    }
</script>

<template>
    <button @click="handleClick" type="button"
        class="flex items-center gap-[14px] rounded-[8px] bg-[#E3E3E3] hover:bg-[#dcdcdc] font-[Inter] text-[16px] leading-[24px] font-semibold text-[#FF0000] pt-[16px] pb-[16px] pr-[16px] pl-[16px] w-[100%]">
        <TrashIcon />
        <span>Delete</span>
    </button>
</template>