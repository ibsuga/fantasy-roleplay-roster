import { create } from "zustand";

type StatsStore = {
    armorClass: number,
    hitPoints: { current: number, temp: number, max: number },
    hitDice: { spent: number, max: number },
    updateArmorClass: (armorClass: number) => void,
    updateHitPoints: (amount: number, type: 'current' | 'temp' | 'max') => void,
    updateHitDice: (amount: number, type: 'spent' | 'max') => void;
}


const useStatsStore = create<StatsStore>((set) => ({
    armorClass: JSON.parse(localStorage.getItem('ArmorClass') || '-'),
    hitPoints: {
        current: localStorage.getItem('PlayerHitPoints') ? JSON.parse(localStorage.getItem('PlayerHitPoints') || '').current || 0 : 0,
        temp: localStorage.getItem('PlayerHitPoints') ? JSON.parse(localStorage.getItem('PlayerHitPoints') || '').temp || 0 : 0,
        max: localStorage.getItem('PlayerHitPoints') ? JSON.parse(localStorage.getItem('PlayerHitPoints') || '').max || 0 : 0,
    },
    hitDice: {
        spent: localStorage.getItem('PlayerHitDice') ? JSON.parse(localStorage.getItem('PlayerHitDice') || '').spent || 0 : 0,
        max: localStorage.getItem('PlayerHitDice') ? JSON.parse(localStorage.getItem('PlayerHitDice') || '').max || 0 : 0,
    },


    updateArmorClass: (armorClass) => set(() => {
        localStorage.setItem('ArmorClass', JSON.stringify(armorClass));
        return { armorClass: armorClass };
    }),
    updateHitPoints: (amount, type) => set((state) => {
        let hitPoints = { ...state.hitPoints };
        if (type === 'current') {
            hitPoints.current = amount;
        } else if (type === 'temp') {
            hitPoints.temp = amount;
        } else if (type === 'max') {
            hitPoints.max = amount;
        }
        localStorage.setItem('PlayerHitPoints', JSON.stringify(hitPoints));
        return { hitPoints };
    }),
    updateHitDice: (amount, type) => set((state) => {
        let hitDice = { ...state.hitDice };
        if (type === 'spent') {
            hitDice.spent = amount;
        } else if (type === 'max') {
            hitDice.max = amount
        }
        localStorage.setItem('PlayerHitDice', JSON.stringify(hitDice));
        return { hitDice };
    })

}))



export default useStatsStore;