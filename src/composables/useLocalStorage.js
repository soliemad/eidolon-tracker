import { ref, watch } from 'vue';
// Module-level map to cache eidolon storage by key
const eidolonStorageMap = new Map();

export const useLocalStorage = (eidolonObject) => {
    const storageKey = `eidolon-data-${eidolonObject.name}`;
    if (eidolonStorageMap.has(storageKey)) {
        return { eidolonStorage: eidolonStorageMap.get(storageKey) };
    }
    const storage = ref({
        "owned": false,
        "nickname": "",
        "symbol": 140,
        "materials": [],
        "wishes": []
    });
    if (localStorage.getItem(storageKey)) {
        storage.value = JSON.parse(localStorage.getItem(storageKey));
    } else {
        eidolonObject.materials.forEach((material, index) => {
            storage.value.materials[index] = createEmptyMaterial(material.items.length);
        });
        eidolonObject.wishes.forEach((wish, index) => {
            storage.value.wishes[index] = createEmptyWish(wish.items.length);
        });
    }
    watch(storage, () => {
        localStorage.setItem(storageKey, JSON.stringify(storage.value));
    }, { deep: true });

    eidolonStorageMap.set(storageKey, storage);
    return { eidolonStorage: storage };
};
const createEmpyuItem = () => {
    return {
        "selected": false
    };
};
const createEmptyMaterial = (itemCount) => {
    return {
        "items": new Array(itemCount).fill(createEmpyuItem()),
    };
};
const createEmptyWish = (itemCount) => {
    return {
        "items": new Array(itemCount).fill(createEmpyuItem()),
    };
};
