import { ref, watch } from 'vue';
// Module-level map to cache eidolon storage by key
const eidolonStorageMap = new Map();

export const useLocalStorage = (eidolonObject) => {
    const newKey = `eidolon-data-${eidolonObject.id}`;
    const oldKey = `eidolon-data-${eidolonObject.name}`;

    // Migration: Check for old data and move it to the new key
    if (localStorage.getItem(oldKey)) {
        const oldData = localStorage.getItem(oldKey);
        localStorage.setItem(newKey, oldData);
        localStorage.removeItem(oldKey);
        console.log(`Migrated data for ${eidolonObject.name} from ${oldKey} to ${newKey}`);
    }

    if (eidolonStorageMap.has(newKey)) {
        return { eidolonStorage: eidolonStorageMap.get(newKey) };
    }

    const storage = ref({
        "owned": false,
        "nickname": "",
        "symbol": 140,
        "materials": [],
        "wishes": []
    });

    if (localStorage.getItem(newKey)) {
        storage.value = JSON.parse(localStorage.getItem(newKey));
    } else {
        eidolonObject.materials.forEach((material, index) => {
            storage.value.materials[index] = createEmptyMaterial(material.items.length);
        });
        eidolonObject.wishes.forEach((wish, index) => {
            storage.value.wishes[index] = createEmptyWish(wish.items.length);
        });
    }

    watch(storage, () => {
        localStorage.setItem(newKey, JSON.stringify(storage.value));
    }, { deep: true });

    eidolonStorageMap.set(newKey, storage);
    return { eidolonStorage: storage };
};

export const exportSavedData = () => {
    const data = {};
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('eidolon-data-')) {
            data[key] = JSON.parse(localStorage.getItem(key));
        }
    }
    return JSON.stringify(data, null, 2);
};

export const importSaveData = (jsonString) => {
    try {
        const data = JSON.parse(jsonString);
        for (const key in data) {
            if (key.startsWith('eidolon-data-')) {
                localStorage.setItem(key, JSON.stringify(data[key]));
            }
        }
        return true;
    } catch (error) {
        console.error("Error importing data:", error);
        return false;
    }
};

const createEmptyItem = () => {
    return {
        "selected": false
    };
};

const createEmptyMaterial = (itemCount) => {
    return {
        "items": new Array(itemCount).fill(null).map(() => createEmptyItem()),
    };
};

const createEmptyWish = (itemCount) => {
    return {
        "items": new Array(itemCount).fill(null).map(() => createEmptyItem()),
    };
};
