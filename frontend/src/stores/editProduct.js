import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useMutation } from '@tanstack/vue-query';
import { updateProductsById } from '@/api_request/productsApi';

export const useEditProductStore = defineStore('editProduct', () => {
    const editProductModalStatus = ref(false);
    const productTitle = ref('');
    const productId = ref('');

    const { isPending, isError, error, isSuccess, mutateAsync } = useMutation({
        mutationFn: ({ id, title }) => updateProductsById(id, title),
        retry: false,
    })

    async function updateProduct() {
        const id = productId.value.split('/');
        await mutateAsync({ id: id[id.length - 1], title: productTitle.value });
    }

    function closeModal() {
        editProductModalStatus.value = false;
        productTitle.value = '';
        productId.value = '';
    }

  return { editProductModalStatus, productTitle, productId, updateProduct, closeModal, isPending, isSuccess, isError, error }
})
