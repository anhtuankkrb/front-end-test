<script setup>
    import SearchBar from './components/SearchBar.vue';
    import CreateProductButton from './components/buttons/CreateProductButton.vue';
    import ProductContainer from './components/ProductContainer.vue';
    import CreateNewProductModal from './components/modals/CreateNewProductModal.vue';
    import DeleteProductModal from './components/modals/DeleteProductModal.vue';
    import EditProductModal from './components/modals/EditProductModal.vue';
    import PopupMessage from './components/PopupMessage.vue';
</script>

<template>
    <main class="max-w-[1109px] mx-auto px-[20px] pt-[88px] pb-[48px]">
      <h1 class="font-[Inter] text-[32px] md:text-[48px] font-semibold leading-[42px] md:leading-[58px] text-black text-center mb-[27px]">
          Shopify Product Management
      </h1>
      <div class="flex flex-col-reverse md:flex-row gap-[30px] items-center justify-between mb-[46px]">
          <SearchBar />
          <CreateProductButton />
      </div>
      <ProductContainer />

      <CreateNewProductModal />
      <DeleteProductModal />
      <EditProductModal />
      <PopupMessage />
    </main>
</template>
