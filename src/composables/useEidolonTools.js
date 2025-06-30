export const useEidolonTools = () => {
    const isEidolonComplete = (eidolon) => {
        if (!eidolon || !eidolon.materials || !eidolon.wishes) {
            return false;
        }
        return [...(eidolon.materials), ...eidolon.wishes].every((list) => {
            return list.items.every((item) => item.selected);
        })
    }

    return { isEidolonComplete };
};