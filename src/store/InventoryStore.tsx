import { create } from "zustand";


export type containerType = {
  id: number,
  label: string,
  color: string,
};


export type itemType = {
  id: number,
  name: string,
  encumbrance?: string,
  damage?: { value: string, useSB: boolean; },
  range: string,
  category: string,
  subCategory?: string,
  availability?: string,
  qualities?: { name: string, description: string; }[],
  flaws?: { name: string, description: string; }[],
  locations?: string[],
  armourPoints?: number,
  amount?: number,
  carry?: number,
  isRanged?: boolean,
  container_id?: number | null,
  description?: string,
};


type itemStore = {
  items: itemType[] | [],
  encumbrance: number,
  wealth: { copper: number, silver: number, gold: number; },
  containers: containerType[],
  equippedItems: number[] | [],
  equipItem: (id: number) => void,
  unequipItem: (id: number) => void,
  addItem: (item: itemType) => void,
  deleteItem: (id: number) => void,
  updateItem: (item: itemType) => void,
  updateItemDescription: (id: number, description: string) => void,
  updateItemContainer: (id: number, containerId: number | null) => void,
  updateItemAmount: (id: number, amount: number) => void,
  updateMaxEncumbrance: (encumbrance: number) => void,
  updateWealth: (wealth: number, currency: string) => void,
  addContainer: (label: string, color: string) => void,
  deleteContainer: (id: number) => void,
};


const useItemStore = create<itemStore>()((set) => ({
  items: JSON.parse(localStorage.getItem('InventoryItems') || '[]'),
  equippedItems: [],
  encumbrance: JSON.parse(localStorage.getItem('MaxEncumbrance') || '-1'),
  containers: JSON.parse(localStorage.getItem('InventoryContainers') || '[]'),
  wealth: {
    copper: localStorage.getItem('PlayerWealth') ? JSON.parse(localStorage.getItem('PlayerWealth') || '').copper || 0 : 0,
    silver: localStorage.getItem('PlayerWealth') ? JSON.parse(localStorage.getItem('PlayerWealth') || '').silver || 0 : 0,
    gold: localStorage.getItem('PlayerWealth') ? JSON.parse(localStorage.getItem('PlayerWealth') || '').gold || 0 : 0,
  },
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
    return { items: [...items] };
  }),
  equipItem: (id) => set((state) => {
    let equippedItems = [...state.equippedItems];
    const item_index = equippedItems.findIndex((itemId: number) => itemId === id);
    if (item_index === -1) {
      equippedItems.push(id);
    }
    localStorage.setItem('EquippedItems', JSON.stringify(equippedItems));
    return { equippedItems: equippedItems };
  }),
  unequipItem: (id) => set((state) => {
    let equippedItems = [...state.equippedItems];
    equippedItems = equippedItems.filter((itemId: number) => itemId !== id);
    localStorage.setItem('Equippeditems', JSON.stringify(equippedItems));
    return { equippedItems: equippedItems };
  }),
  updateItemDescription: (id, description) => set((state) => {
    let items = [...state.items];
    const item_index = items.findIndex((item: itemType) => item.id === id);
    if (item_index !== -1) {
      items[item_index].description = description;
    }
    localStorage.setItem('InventoryItems', JSON.stringify(items));
    return { items: [...items] };
  }),
  updateItemContainer: (id, containerId) => set((state) => {
    let items = [...state.items];
    const item_index = items.findIndex((item: itemType) => item.id === id);
    if (item_index !== -1) {
      items[item_index].container_id = containerId;
    }
    localStorage.setItem('InventoryItems', JSON.stringify(items));
    return { items: [...items] };
  }),
  updateItemAmount: (id, amount) => set((state) => {
    let items = [...state.items];
    const item_index = items.findIndex((item: itemType) => item.id === id);
    if (item_index !== -1) {
      items[item_index].amount = amount;
    }
    localStorage.setItem('InventoryItems', JSON.stringify(items));
    return { items: [...items] };
  }),
  updateMaxEncumbrance: (encumbrance) => set(() => {
    localStorage.setItem('MaxEncumbrance', JSON.stringify(encumbrance));
    return { encumbrance: encumbrance };
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
    return { wealth: { ...wealth } };
  }),
  addContainer: (label, color) => set((state) => {
    let containers = [...state.containers];
    const new_container = {
      id: Date.now(),
      label: label,
      color: color,
    };
    containers.push(new_container);
    localStorage.setItem('InventoryContainers', JSON.stringify(containers));
    return { containers: [...containers] };
  }),
  deleteContainer: (id) => set((state) => {
    let containers = [...state.containers];
    containers = containers.filter((containers) => containers.id !== id);
    //Limpiar id de los items.
    let items = [...state.items];
    items.forEach((item) => {
      if (item.container_id === id) {
        item.container_id = undefined;
      }
    });
    localStorage.setItem('InventoryItems', JSON.stringify(items));
    localStorage.setItem('InventoryContainers', JSON.stringify(containers));
    return { items: [...items], containers: [...containers] };
  })
}));

export default useItemStore;