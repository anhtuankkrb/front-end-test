<script setup>
    import EditProduct from './buttons/EditProductButton.vue';
    const { product } = defineProps(['product']);
</script>

<template>
    <div class="flex gap-[25px] items-center justify-between bg-[#F6F6F6] hover:bg-[#ededed] rounded-[16px] border border-[#C1C1C1] pt-[8px] pb-[8px] pr-[8px] pl-[8px] md:pt-[12px] md:pb-[13px] md:pr-[32px] md:pl-[30px]">
        <div class="flex items-center gap-[19px]">
            <div
                class="w-[65px] h-[65px] md:w-[75px] md:h-[75px] flex items-center justify-center rounded-[8px] overflow-hidden">
                <img v-if="product.featuredImage" :src="product.featuredImage.url" :alt="product.featuredImage.altText"
                    class="w-full h-full object-cover" />
                <img v-else src="https://cdn.shopify.com/s/files/1/0688/2384/2967/files/no-pictures.png?v=1753973124"
                    alt="no image" class="w-[50%] h-[50%] object-cover" />
            </div>
            <div>
                <a :href="product.onlineStorePreviewUrl" target="_blank" class="text-black hover:text-[#7c7c7c]">
                    <h3
                        class="font-[Inter] text-[18px] md:text-[24px] leading-[24px] md:leading-[29px] mb-[4px] md:mb-[8px]">
                        {{ product.title }}
                    </h3>
                </a>
                <div class="font-[Inter] font-medium italic text-[13px] md:text-[14px] leading-[17px] text-black">
                    {{ product.priceRange.minVariantPrice.amount }} {{ product.priceRange.minVariantPrice.currencyCode
                    }}
                </div>
            </div>
        </div>
        <div>
            <EditProduct :product="product" />
        </div>
    </div>
</template>