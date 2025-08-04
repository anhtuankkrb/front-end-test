import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useMutation } from '@tanstack/vue-query';
import { createProduct } from '@/api_request/productsApi';

export const useCreateProductStore = defineStore('createProduct', () => {
    const createProductModalStatus = ref(false);
    const productTitle = ref('');
    const productPrice = ref('');

    const { isPending, isError, error, isSuccess, mutateAsync } = useMutation({
        mutationFn: ({ title, price }) => createProduct(title, price),
        retry: false,
    })

    async function createNewProduct() {
        await mutateAsync({ title: productTitle.value, price: productPrice.value });
    }

    function closeModal() {
        createProductModalStatus.value = false;
        productTitle.value = '';
        productPrice.value = '';
    }

    return { createProductModalStatus, productTitle, productPrice, createNewProduct, closeModal, isPending, isSuccess, isError, error }
})
