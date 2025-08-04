<script setup>
    import { usePopupMessageStore } from '@/stores/popupMessage';
    import { useProductsStore } from '@/stores/products';
    import { useSearchResultStore } from '@/stores/searchResult';
    import { useCreateProductStore } from '@/stores/createProduct';
    import { useEditProductStore } from '@/stores/editProduct';
    import { useDeleteProductStore } from '@/stores/deleteProduct'

    const productsStore = useProductsStore();
    const popupMessageStore = usePopupMessageStore();
    const searchResultStore = useSearchResultStore();
    const createProductStore = useCreateProductStore();
    const deleteProductStore = useDeleteProductStore();
    const editProductStore = useEditProductStore();

    // Watch and send message when errors occur
    productsStore.$subscribe((mutation, state) => {
        if (state.isError) {
            popupMessageStore.showMessage(state.error, false);
        }
    });
    searchResultStore.$subscribe((mutation, state) => {
        if (state.isError) {
            popupMessageStore.showMessage(state.error, false);
        }
    });
    createProductStore.$subscribe((mutation, state) => {
        if (state.isError) {
            popupMessageStore.showMessage(state.error, false);
        }
    });
    deleteProductStore.$subscribe((mutation, state) => {
        if (state.isError) {
            popupMessageStore.showMessage(state.error, false);
        }
    });
    editProductStore.$subscribe((mutation, state) => {
        if (state.isError) {
            popupMessageStore.showMessage(state.error, false);
        }
    });
</script>

<template>
    <div :class="[popupMessageStore.popupMessageStatus ? '' : 'hidden', popupMessageStore.success ? 'text-green-800 border-green-300 bg-green-50' : 'text-red-800 border-red-300 bg-red-50']"
        class="fixed top-[20px] md:top-[30px] right-[20px] z-100 md:right-[40px] w-[340px] m:w-[240px] p-2 md:p-4 border rounded-lg">
        <div class="flex items-center mb-2">
            <svg class="shrink-0 w-4 h-4 me-2" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                viewBox="0 0 20 20">
                <path
                    d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <h3 class="text-[16px] md:text-lg font-medium">
                {{ popupMessageStore.message }}
            </h3>
        </div>
        <div class="flex">
            <button type="button" @click="popupMessageStore.closeMessage"
                :class="[popupMessageStore.success ? 'text-green-800 border-green-800 hover:bg-green-900' : 'text-red-800 border-red-800 hover:bg-red-900']"
                class="bg-transparent border hover:text-white focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center">
                Dismiss
            </button>
        </div>
    </div>
</template>