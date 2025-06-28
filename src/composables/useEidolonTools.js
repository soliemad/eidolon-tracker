export const useEidolonTools = () => {
    const isEidolonComplete = (eidolon) => {
        return [...eidolon.materials, ...eidolon.wishes].every((list) => {
            return list.items.every((item) => item.selected);
        })
    }

    return { isEidolonComplete };
};