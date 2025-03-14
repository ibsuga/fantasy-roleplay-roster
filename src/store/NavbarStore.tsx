import { create } from 'zustand';


type NavbarStore = {
    characterName: string,
    characterExperience: { level: number, currentExp: number, startingExp: number, nextLevelExp: number, proficiencyBonus: number },
    updateCharacterName: (name: string) => void,
    updateCharacterExperience: (experience: number) => void,
}

type levelInfo = {
    experience: number,
    proficiencyBonus: number,
}

const expTable: Record<number, levelInfo> = {
    1: { experience: 0, proficiencyBonus: 2 },
    2: { experience: 300, proficiencyBonus: 2 },
    3: { experience: 900, proficiencyBonus: 2 },
    4: { experience: 2700, proficiencyBonus: 2 },
    5: { experience: 6500, proficiencyBonus: 3 },
    6: { experience: 14000, proficiencyBonus: 3 },
    7: { experience: 23000, proficiencyBonus: 3 },
    8: { experience: 34000, proficiencyBonus: 3 },
    9: { experience: 48000, proficiencyBonus: 4 },
    10: { experience: 64000, proficiencyBonus: 4 },
    11: { experience: 85000, proficiencyBonus: 4 },
    12: { experience: 100000, proficiencyBonus: 4 },
    13: { experience: 120000, proficiencyBonus: 5 },
    14: { experience: 140000, proficiencyBonus: 5 },
    15: { experience: 165000, proficiencyBonus: 5 },
    16: { experience: 195000, proficiencyBonus: 5 },
    17: { experience: 225000, proficiencyBonus: 6 },
    18: { experience: 265000, proficiencyBonus: 6 },
    19: { experience: 305000, proficiencyBonus: 6 },
    20: { experience: 355000, proficiencyBonus: 6 }
}

const initialExperienceValue = {
    level: 1,
    currentExp: 0,
    startingExp: 0,
    nextLevelExp: 300,
    proficiencyBonus: 2
}

const useNavbarStore = create<NavbarStore>((set) => ({
    characterName: localStorage.getItem('CharacterName') ? JSON.parse(localStorage.getItem('CharacterName') || '') : '',
    characterExperience: {
        level: localStorage.getItem('PlayerExperience') ? JSON.parse(localStorage.getItem('PlayerExperience') || '').level : initialExperienceValue.level,
        currentExp: localStorage.getItem('PlayerExperience') ? JSON.parse(localStorage.getItem('PlayerExperience') || '').currentExp : initialExperienceValue.currentExp,
        startingExp: localStorage.getItem('PlayerExperience') ? JSON.parse(localStorage.getItem('PlayerExperience') || '').startingExp : initialExperienceValue.startingExp,
        nextLevelExp: localStorage.getItem('PlayerExperience') ? JSON.parse(localStorage.getItem('PlayerExperience') || '').nextLevelExp : initialExperienceValue.nextLevelExp,
        proficiencyBonus: localStorage.getItem('PlayerExperience') ? JSON.parse(localStorage.getItem('PlayerExperience') || '').proficiencyBonus : initialExperienceValue.proficiencyBonus,
    },

    updateCharacterName: (name) => set(() => {
        localStorage.setItem('CharacterName', JSON.stringify(name));
        return { characterName: name };
    }),

    updateCharacterExperience: (experience) => set((state) => {
        let characterExperience = { ...state.characterExperience };

        const maxLevel = Object.entries(expTable).length;

        let lvl = 1;

        do {
            characterExperience = {
                level: lvl,
                currentExp: experience,
                startingExp: expTable[lvl].experience,
                nextLevelExp: expTable[lvl + 1]?.experience || 355000,
                proficiencyBonus: expTable[lvl].proficiencyBonus,
            };
            lvl++;
        } while (experience >= expTable[lvl]?.experience && lvl <= maxLevel);


        // for (let lvl = 1; lvl <= maxLevel; lvl++) {

        //     const currentLevel = expTable[lvl];
        //     const nextLevel = expTable[lvl + 1] || null;

        //     if (lvl === maxLevel || !nextLevel) {
        //         characterExperience = {
        //             level: 20,
        //             currentExp: 355000,
        //             startingExp: 355000,
        //             nextLevelExp: 355000,
        //             proficiencyBonus: 6
        //         }
        //         break;
        //     }

        //     if (experience >= currentLevel.experience && experience < nextLevel.experience) {
        //         characterExperience = {
        //             level: lvl,
        //             currentExp: experience,
        //             startingExp: currentLevel.experience,
        //             nextLevelExp: nextLevel.experience,
        //             proficiencyBonus: currentLevel.proficiencyBonus,
        //         }
        //         break;
        //     }
        // }

        localStorage.setItem('PlayerExperience', JSON.stringify(characterExperience));
        return { characterExperience: characterExperience }
    }),
}))

export default useNavbarStore;