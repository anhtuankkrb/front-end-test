<script setup>
    import { useSearchResultStore } from '@/stores/searchResult';
    import SearchIcon from './icons/SearchIcon.vue';

    const searchResultStore = useSearchResultStore();
</script>

<template>
    <label for="search-product"
        class="bg-[#F6F6F6] hover:bg-[#ededed] border border-[#BFBFBF] rounded-[16px] w-full md:w-[696px] pt-[14px] pb-[14px] pr-[12px] pl-[12px] md:pt-[23px] md:pb-[23px] md:pr-[26px] md:pl-[24px] flex gap-[20px]">
        <SearchIcon />
        <input type="text" v-model="searchResultStore.searchText" placeholder="Search product name..."
            class="font-[Inter] text-[16px] leading-[1] text-black outline-none placeholder-[#D6D6D6] w-full">
    </label>
</template>
