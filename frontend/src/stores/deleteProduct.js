import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useMutation } from '@tanstack/vue-query';
import { removeProductsById } from '@/api_request/productsApi';

export const useDeleteProductStore = defineStore('deleteProduct', () => {
    const deleteProductModalStatus = ref(false);

    const productTitle = ref('');
    const productId = ref('');

    const { isPending, isError, error, isSuccess, mutateAsync } = useMutation({
        mutationFn: (id) => removeProductsById(id),
        retry: false,
    })

    async function deleteProduct() {
        let id = productId.value.split('/')
        await mutateAsync(id[id.length - 1])
    }

    function closeModal() {
        deleteProductModalStatus.value = false;
        productTitle.value = '';
        productId.value = '';
    }

  return { deleteProductModalStatus, productTitle, productId, deleteProduct, closeModal, isPending, isSuccess, isError, error }
})
