<script setup>
    import { useProductsStore } from '@/stores/products';
    import { useEditProductStore } from '@/stores/editProduct';
    import { usePopupMessageStore } from '@/stores/popupMessage';
    import { useSearchResultStore } from '@/stores/searchResult';

    import LoadingIcon from '../icons/LoadingIcon.vue';

    const productsStore = useProductsStore();
    const editProductStore = useEditProductStore();
    const popupMessageStore = usePopupMessageStore();
    const searchResultStore = useSearchResultStore();

    async function handleSubmit() {
        //Reqest edit product -> refetch products -> close modal -> show success message
        await editProductStore.updateProduct();
        productsStore.refetch();
        if (searchResultStore.searchText.length > 0) {
            searchResultStore.refetch();
        }
        editProductStore.closeModal();
        popupMessageStore.showMessage('Product Updated!');
    }
</script>

<template>
    <div id="edit-modal" @mousedown="editProductStore.closeModal()" tabindex="-1" aria-hidden="true"
        :class="{ hidden: !editProductStore.editProductModalStatus }"
        class="bg-[rgba(0,0,0,0.5)] overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div class="relative p-4 w-full max-w-md max-h-full" @mousedown.stop="">
            <div class="relative bg-white rounded-lg shadow-sm">
                <!-- Modal header -->
                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
                    <h3 class="text-lg font-semibold text-gray-900">
                        Update product
                    </h3>
                    <button type="button"
                        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                        @click.prevent="editProductStore.closeModal()">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                <!-- Modal body -->
                <div v-if="editProductStore.isPending" class="pt-[50px] pb-[50px]">
                    <LoadingIcon class="w-[40px] h-[40px] text-[#b3b3b3] flex justify-center ml-auto mr-auto" />
                </div>
                <form v-show="!editProductStore.isPending" class="p-4 md:p-5" @submit.prevent="handleSubmit">
                    <div class="grid gap-4 mb-4 grid-cols-2">
                        <div class="col-span-2 mb-4">
                            <label for="crud-title" class="block mb-2 text-sm font-medium text-gray-900">Title</label>
                            <input type="text" name="title" id="crud-title" v-model="editProductStore.productTitle"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                placeholder="Type product title" required="">
                        </div>
                    </div>
                    <button type="submit"
                        class="text-white inline-flex items-center bg-[#8000FF] hover:bg-[#6e00db] focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                        Update Product Name
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>