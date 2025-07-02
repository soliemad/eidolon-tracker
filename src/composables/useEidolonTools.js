export const useEidolonTools = () => {
    const isEidolonComplete = (eidolon) => {
        if (!eidolon) {
            return false;
        }
        return isEidolonMaterialComplete(eidolon) && isEidolonWishComplete(eidolon);
    }
    const isEidolonMaterialComplete = (eidolon) => {
        if (!eidolon || !eidolon.materials) {
            return false;
        }
        return eidolon.materials.every((list) => {
            return list.items.every((item) => item.selected);
        })
    }
    const isEidolonWishComplete = (eidolon) => {
        if (!eidolon || !eidolon.wishes) {
            return false;
        }
        return eidolon.wishes.every((list) => {
            return list.items.every((item) => item.selected);
        })
    }
    const getEidolonStarLevel = (eidolon) => {
        if (!eidolon || !eidolon.materials) {
            return 0;
        }
        let starLevel = 0;
        eidolon.materials.forEach((material, index) => {
            if (material.items.every(item => item.selected)) {
                starLevel++;
            }
        });
        return starLevel + 1;
    }

    return { isEidolonComplete, isEidolonMaterialComplete, isEidolonWishComplete, getEidolonStarLevel};
};