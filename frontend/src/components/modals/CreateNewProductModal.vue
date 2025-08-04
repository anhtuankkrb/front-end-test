<script setup>
    import { useProductsStore } from '@/stores/products';
    import { useCreateProductStore } from '@/stores/createProduct';
    import { usePopupMessageStore } from '@/stores/popupMessage';
    import { useSearchResultStore } from '@/stores/searchResult';

    import LoadingIcon from '../icons/LoadingIcon.vue';

    const productsStore = useProductsStore();
    const createProductStore = useCreateProductStore();
    const popupMessageStore = usePopupMessageStore();
    const searchResultStore = useSearchResultStore();

    async function handleSubmit() {
        if (createProductStore.isPending) {
            return;
        }
        //Reqest create product -> close modal -> show success message -> refetch product and search
        await createProductStore.createNewProduct();
        createProductStore.closeModal();
        popupMessageStore.showMessage('Product created!');
        productsStore.refetch();
        searchResultStore.searchText = '';
    }
</script>

<template>
    <div id="crud-modal" @mousedown="createProductStore.closeModal" tabindex="-1" aria-hidden="true"
        :class="{ hidden: !createProductStore.createProductModalStatus }"
        class="bg-[rgba(0,0,0,0.5)] overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[100vh]">
        <div class="relative p-4 w-full max-w-md max-h-full" @mousedown.stop="">
            <div class="relative bg-white rounded-lg shadow-sm">
                <!-- Modal header -->
                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
                    <h3 class="text-lg font-semibold text-gray-900">
                        Create New Product
                    </h3>
                    <button type="button" @click.prevent="createProductStore.closeModal"
                        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>

                <div v-if="createProductStore.isPending" class="pt-[50px] pb-[50px]">
                    <LoadingIcon class="w-[40px] h-[40px] text-[#b3b3b3] flex justify-center ml-auto mr-auto" />
                </div>
                <!-- Modal body -->
                <form v-show="!createProductStore.isPending" class="p-4 md:p-5" @submit.prevent="handleSubmit">
                    <div class="grid gap-4 mb-4 grid-cols-2">
                        <div class="col-span-2">
                            <label for="crud-title" class="block mb-2 text-sm font-medium text-gray-900">
                                Title
                            </label>
                            <input type="text" name="title" id="crud-title" v-model="createProductStore.productTitle"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                placeholder="Type product title" required="">
                        </div>
                        <div class="col-span-2 mb-2">
                            <label for="price" class="block mb-2 text-sm font-medium text-gray-900">
                                Price
                            </label>
                            <input type="number" name="price" id="price" v-model="createProductStore.productPrice"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                placeholder="999 VND" required="">
                        </div>
                    </div>
                    <button type="submit"
                        class="text-white inline-flex items-center bg-[#8000FF] hover:bg-[#6e00db] focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                        <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                clip-rule="evenodd"></path>
                        </svg>
                        Add new product
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>