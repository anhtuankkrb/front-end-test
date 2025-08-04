import { ref } from 'vue';
import { defineStore } from 'pinia';

import {searchProductsByTitle} from '@/api_request/productsApi';
import { useQuery} from '@tanstack/vue-query';

export const useSearchResultStore = defineStore('searchResult', () => {
    const searchText = ref('');
        //Pass in searchText to useQuery, automatically send request when searchText changes
        const {isPending, isError, data, error, refetch, isRefetching} = useQuery({ queryKey: ['searchProduct', searchText], 
        queryFn: async ({queryKey}) =>{
            const [_key, searchText] = queryKey;
            if(searchText.length === 0){
              return {};
            }
            const productsData = await searchProductsByTitle(searchText);
            return productsData
        },
        retry: false,
    })

  return { data, searchText, refetch, isPending, isRefetching, isError, error }
})
