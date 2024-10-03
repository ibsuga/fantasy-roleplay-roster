import { create } from "zustand";

export type itemType = {
    id: number,
    name: string,
    encumbrance?: string,
    damage?: { value: string, useSB: boolean },
    range: string,
    category: string,
    availability: string,
    qualities?: string[],
    flaws?: string[],
    amount?: string,
    description?: string,
}


type itemStore = {
    items: itemType[] | [],
    encumbrance: number,
    wealth: { copper: number, silver: number, gold: number },
    addItem: (item: itemType) => void,
    deleteItem: (id: number) => void,
    updateItem: (item: itemType) => void,
    updateItemDescription: (id: number, description: string) => void,
    updateMaxEncumbrance: (encumbrance: number) => void,
    updateWealth: (wealth: number, currency: string) => void,
}


const useItemStore = create<itemStore>()((set) => ({
    items: JSON.parse(localStorage.getItem('InventoryItems') || '[]'),
    encumbrance: JSON.parse(localStorage.getItem('MaxEncumbrance') || '-1'),
    wealth: JSON.parse(localStorage.getItem('PlayerWealth') || ''),
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
    }),
    updateItem: (item) => set((state) => {
        let items = [...state.items];
        const item_index = items.findIndex((i: itemType) => i.id === item.id);
        if (item_index !== -1) {
            items[item_index] = { ...item };
        }
        localStorage.setItem('InventoryItems', JSON.stringify(items));
        return { items: [...items] }
    }),
    updateItemDescription: (id, description) => set((state) => {
        let items = [...state.items];
        const item_index = items.findIndex((item: itemType) => item.id === id);
        if (item_index !== -1) {
            items[item_index].description = description;
        }
        localStorage.setItem('InventoryItems', JSON.stringify(items));
        return { items: [...items] }
    }),
    updateMaxEncumbrance: (encumbrance) => set(() => {
        localStorage.setItem('MaxEncumbrance', JSON.stringify(encumbrance));
        return { encumbrance: encumbrance }
    }),
    updateWealth: (amount, currency) => set((state) => {
        let wealth = { ...state.wealth };
        if (currency === 'copper') {
            wealth.copper = amount;
        } else if (currency === 'silver') {
            wealth.silver = amount;
        } else if (currency === 'gold') {
            wealth.gold = amount;
        }
        localStorage.setItem('PlayerWealth', JSON.stringify(wealth));
        return { wealth: { ...wealth } }
    })
}))

export default useItemStore;