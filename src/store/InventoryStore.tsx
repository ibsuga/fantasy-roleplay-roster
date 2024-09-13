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
    deleteItem: (id: number) => void,
}


const useItemStore = create<itemStore>()((set) => ({
    items: JSON.parse(localStorage.getItem('InventoryItems') || '[]'),
    addItem: (item) => set((state) => {
        let items = [...state.items];
        items.push(item);
        localStorage.setItem('InventoryItems', JSON.stringify(items));
        return { items: items };
    }),
    deleteItem: (id) => set((state) => {
        let items = [...state.items];
        items = items.filter((item: itemType) => item.id !== id);
        localStorage.setItem('InventoryItems', JSON.stringify(items));
        return { items: items };
    })

}))

export default useItemStore;