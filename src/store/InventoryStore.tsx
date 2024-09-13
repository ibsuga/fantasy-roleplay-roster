import { create } from "zustand";

export type itemType = {
    id: number,
    name: string,
    encumbrance?: number,
    damage?: { value: number, useSB: boolean },
    range: string,
    category: string,
    availability: string,
    qualities?: string[],
    flaws?: string[],
}

type itemStore = {
    items: itemType[] | [],
    addItem: (item: itemType) => void,
}


const useItemStore = create<itemStore>()((set) => ({
    items: [],
    addItem: (item) => set((state) => {
        let items = [...state.items];
        items.push(item);
        return { items: items };
    })

}))

export default useItemStore;