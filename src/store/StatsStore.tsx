import { create } from "zustand";


export interface ISkill {
    name: string,
    isProficient: boolean,
}

export interface ICharacteristic {
    name: string,
    score: number,
    savingThrow: boolean,
    skills: ISkill[]
}

export type StatName = "initiative" | "speed" | "size" | "perception" | "proficiencyBonus";

type StatsStore = {
    armorClass: number,
    hitPoints: { current: number, temp: number, max: number },
    hitDice: { spent: number, max: number },
    stats: { initiative: number, speed: number, size: number, perception: number, proficiencyBonus: number },
    characteristics: ICharacteristic[],
    hasHeroicInspiration: boolean,
    hasShield: boolean,
    deathSaves: { successes: number, failures: number },
    updateArmorClass: (armorClass: number) => void,
    updateHitPoints: (amount: number, type: 'current' | 'temp' | 'max') => void,
    toggleShield: (value: boolean) => void,
    updateHitDice: (amount: number, type: 'spent' | 'max') => void;
    updateStats: (name: StatName, value: number) => void;
    updateHeroicInspiration: (value: boolean) => void;
    updateDeathSaves: (type: string, value: number) => void;

    /* CHARACTERISTICS */
    updateCharacteristicScore: (name: string, score: number) => void,
    toggleCharacteristicSavingThrow: (name: string) => void,
    toggleCharacteristicSkill: (name: string, skill: string) => void,
}


const initialStoreCharacteristicsValue = [
    {
        name: 'strength',
        score: 0,
        savingThrow: false,
        skills: [
            { name: 'athletics', isProficient: false }
        ]
    },
    {
        name: 'dexterity',
        score: 0,
        savingThrow: false,
        skills: [
            { name: 'acrobatics', isProficient: false },
            { name: 'sleight of hand', isProficient: false },
            { name: 'stealth', isProficient: false }
        ]
    },
    {
        name: 'constitution',
        score: 0,
        savingThrow: false,
        skills: []
    },
    {
        name: 'wisdom',
        score: 0,
        savingThrow: false,
        skills: [
            { name: 'animal handling', isProficient: false },
            { name: 'insight', isProficient: false },
            { name: 'medicine', isProficient: false },
            { name: 'perception', isProficient: false },
            { name: 'survival', isProficient: false }
        ]
    },
    {
        name: 'intelligence',
        score: 0,
        savingThrow: false,
        skills: [
            { name: 'arcana', isProficient: false },
            { name: 'history', isProficient: false },
            { name: 'investigation', isProficient: false },
            { name: 'nature', isProficient: false },
            { name: 'religion', isProficient: false }
        ]
    },
    {
        name: 'charisma',
        score: 0,
        savingThrow: false,
        skills: [
            { name: 'deception', isProficient: false },
            { name: 'intimidation', isProficient: false },
            { name: 'performance', isProficient: false },
            { name: 'persuasion', isProficient: false }
        ]
    },
];

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
    stats: {
        initiative: localStorage.getItem('PlayerStats') ? JSON.parse(localStorage.getItem('PlayerStats') || '').initiative || 0 : 0,
        speed: localStorage.getItem('PlayerStats') ? JSON.parse(localStorage.getItem('PlayerStats') || '').speed || 0 : 0,
        size: localStorage.getItem('PlayerStats') ? JSON.parse(localStorage.getItem('PlayerStats') || '').size || 0 : 0,
        perception: localStorage.getItem('PlayerStats') ? JSON.parse(localStorage.getItem('PlayerStats') || '').perception || 0 : 0,
        proficiencyBonus: localStorage.getItem('PlayerStats') ? JSON.parse(localStorage.getItem('PlayerStats') || '').proficiencyBonus || 0 : 0,
    },
    characteristics: localStorage.getItem('PlayerCharacteristics') ? JSON.parse(localStorage.getItem('PlayerCharacteristics') || '') : initialStoreCharacteristicsValue,
    hasHeroicInspiration: JSON.parse(localStorage.getItem('PlayerHeroicInspiration') || 'false'),
    hasShield: JSON.parse(localStorage.getItem('PlayerShield') || 'false'),
    deathSaves: {
        successes: localStorage.getItem('PlayerDeathSaves') ? JSON.parse(localStorage.getItem('PlayerDeathSaves') || '').successes || 0 : 0,
        failures: localStorage.getItem('PlayerDeathSaves') ? JSON.parse(localStorage.getItem('PlayerDeathSaves') || '').failures || 0 : 0,
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
    }),
    updateStats: (name, value) => set((state) => {
        let stats = { ...state.stats };
        stats[name] = value;
        localStorage.setItem('PlayerStats', JSON.stringify(stats));
        return { stats }
    }),
    updateHeroicInspiration: (value) => set(() => {
        localStorage.setItem('PlayerHeroicInspiration', JSON.stringify(value));
        return { hasHeroicInspiration: value };
    }),
    updateCharacteristicScore: (name, score) => set((state) => {
        let characteristics = [...state.characteristics];
        const index = characteristics.findIndex((c) => c.name === name);
        if (index !== -1) {
            characteristics[index].score = score;
        }
        localStorage.setItem('PlayerCharacteristics', JSON.stringify(characteristics));
        return { characteristics };
    }),
    toggleCharacteristicSavingThrow: (name) => set((state) => {
        let characteristics = [...state.characteristics];
        const index = characteristics.findIndex((c) => c.name === name);
        if (index !== -1) {
            characteristics[index].savingThrow = !characteristics[index].savingThrow;
        }
        localStorage.setItem('PlayerCharacteristics', JSON.stringify(characteristics));
        return { characteristics };
    }),
    toggleCharacteristicSkill: (name, skill) => set((state) => {
        let characteristics = [...state.characteristics];
        const index = characteristics.findIndex((c) => c.name === name);
        if (index !== -1) {
            const skill_index = characteristics[index].skills.findIndex((s) => s.name === skill);
            if (skill_index !== -1) {
                characteristics[index].skills[skill_index].isProficient = !characteristics[index].skills[skill_index].isProficient;
            }
        }
        localStorage.setItem('PlayerCharacteristics', JSON.stringify(characteristics));
        return { characteristics };
    }),
    toggleShield: (value) => set(() => {
        localStorage.setItem('PlayerShield', JSON.stringify(value));
        return { hasShield: value };
    }),
    updateDeathSaves: (type, value) => set((state) => {
        let deathSaves = { ...state.deathSaves };
        if (type === 'successes') {
            deathSaves.successes = deathSaves.successes === value ? 0 : value;
        } else if (type === 'failures') {
            deathSaves.failures = deathSaves.failures === value ? 0 : value;
        }
        localStorage.setItem('PlayerDeathSaves', JSON.stringify(deathSaves));
        return { deathSaves: deathSaves };
    })
}))

export default useStatsStore;