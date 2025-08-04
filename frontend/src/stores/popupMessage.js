import { ref } from 'vue';
import { defineStore } from 'pinia';

export const usePopupMessageStore = defineStore('popupMessage', () => {
    const popupMessageStatus = ref(false);
    const message = ref('');
    const success = ref(true);

    function closeMessage() {
        success.value = true;
        message.value = '';
        popupMessageStatus.value = false;
    }

    let timeoutPopup = null;
    function showMessage(mesageText, isSuccess = true) {
        success.value = isSuccess;
        message.value = mesageText;
        popupMessageStatus.value = true;

        // Clear previous timeout after updating new message and set timeout to close popup
        clearTimeout(timeoutPopup);
        timeoutPopup = setTimeout(() => {
            closeMessage();
        }, 5000)
    }

    return { popupMessageStatus, message, success, showMessage, closeMessage };
})