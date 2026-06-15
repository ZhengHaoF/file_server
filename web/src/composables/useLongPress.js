import { ref } from 'vue';

export function useLongPress(callback, delay = 500) {
    let longPressTimer = null;
    const isLongPressing = ref(false);

    const startLongPress = (index) => {
        isLongPressing.value = false;
        longPressTimer = setTimeout(() => {
            isLongPressing.value = true;
            if (callback) {
                callback(index);
            }
            longPressTimer = null;
        }, delay);
    };

    const endLongPress = () => {
        if (longPressTimer) {
            clearTimeout(longPressTimer);
            longPressTimer = null;
        }
    };

    const cancelLongPress = () => {
        if (longPressTimer) {
            clearTimeout(longPressTimer);
            longPressTimer = null;
        }
        isLongPressing.value = false;
    };

    return {
        startLongPress,
        endLongPress,
        cancelLongPress,
        isLongPressing
    };
}
