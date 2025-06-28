import {ref, watch} from 'vue';
export const useLocalStorage = (key, refObject) => {
    try {
        refObject.value = JSON.parse(localStorage.getItem(key)) || refObject.value;
    } catch (error) {
        console.log(error);
    }

    const watchHandle = watch(refObject, () => {
        localStorage.setItem(key, JSON.stringify(refObject.value));
    }, { deep: true });

    return { watchHandle };
};