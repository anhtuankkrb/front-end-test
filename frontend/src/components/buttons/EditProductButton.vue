<script setup>
    import { ref } from 'vue';
    import EditIcon from '../icons/EditIcon.vue';
    import RemoveButton from './RemoveButton.vue'
    import EditButton from './EditButton.vue';

    const { product } = defineProps(['product'])

    const editPopup = ref(false);

    //Close popup and remove event
    function closePopup() {
        editPopup.value = false;
        document.removeEventListener('click', closePopup);
    }
    //Open edit popup
    function handleBunttonClick() {
        //Prevent when popup is opening
        if (editPopup.value == true) {
            return;
        }
        editPopup.value = true;
        //Close popup when clicking on page
        if (editPopup.value) {
            setTimeout(() => {
                document.addEventListener('click', closePopup);
            }, 100)
        }
    }
</script>

<template>
    <div class="relative">
        <button type="button" @click.prevent="handleBunttonClick">
            <EditIcon class="hover:fill-[#dcdcdc]" />
        </button>
        <div @click.prevent.stop="" :class="{ hidden: !editPopup }"
            class="absolute top-[110%] right-[0px] z-50 bg-[#F0F0F0] rounded-[16px] border border-[#CFCFCF] pt-[23px] pb-[19px] pr-[21px] pl-[17px] shadow-[0_8px_16px_rgba(0,0,0,0.25)] w-[298px]">
            <EditButton :product="product" />
            <RemoveButton :product="product" />
        </div>
    </div>
</template>