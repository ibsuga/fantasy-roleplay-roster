import { create } from "zustand";

type armorProficiencyName = 'light' | 'medium' | 'heavy' | 'shields';

type TraitsFeatsStore = {
    classFeatures: { id: number, name: string, level: number | null, description: string }[],
    feats: { id: number, name: string, category: string, description: string }[],
    traits: { id: number, name: string, description: string }[],
    proficiencies: { id: number, name: string, description: string }[],
    armorProficiencies: { light: boolean, medium: boolean, heavy: boolean, shields: boolean },
    createClassFeature: (name: string, level: number | null, description: string) => void,
    createFeat: (name: string, category: string, description: string) => void,
    createTrait: (name: string, description: string) => void,
    createProficiency: (name: string, description: string) => void,
    updateClassFeature: (id: number, name: string, level: number | null, description: string) => void,
    updateFeat: (id: number, name: string, category: string, description: string) => void,
    updateTrait: (id: number, name: string, description: string) => void,
    updateProficiency: (id: number, name: string, description: string) => void,
    deleteClassFeature: (id: number) => void,
    deleteFeat: (id: number) => void,
    deleteTrait: (id: number) => void,
    deleteProficiency: (id: number) => void,
    updateArmorProficiency: (name: armorProficiencyName, value: boolean) => void,
}

const initialArmorProficienciesValue = {
    light: false,
    medium: false,
    heavy: false,
    shields: false,
}

const useTraitsFeatsStore = create<TraitsFeatsStore>((set) => ({

    classFeatures: localStorage.getItem('PlayerClassFeatures') ? JSON.parse(localStorage.getItem('PlayerClassFeatures') || '') : [],
    feats: localStorage.getItem('PlayerFeats') ? JSON.parse(localStorage.getItem('PlayerFeats') || '') : [],
    traits: localStorage.getItem('PlayerTraits') ? JSON.parse(localStorage.getItem('PlayerTraits') || '') : [],
    proficiencies: localStorage.getItem('PlayerProficiencies') ? JSON.parse(localStorage.getItem('PlayerProficiencies') || '') : [],
    armorProficiencies: {
        light: localStorage.getItem('PlayerArmorProficiencies') ? JSON.parse(localStorage.getItem('PlayerArmorProficiencies') || '').light || false : initialArmorProficienciesValue,
        medium: localStorage.getItem('PlayerArmorProficiencies') ? JSON.parse(localStorage.getItem('PlayerArmorProficiencies') || '').medium || false : initialArmorProficienciesValue,
        heavy: localStorage.getItem('PlayerArmorProficiencies') ? JSON.parse(localStorage.getItem('PlayerArmorProficiencies') || '').heavy || false : initialArmorProficienciesValue,
        shields: localStorage.getItem('PlayerArmorProficiencies') ? JSON.parse(localStorage.getItem('PlayerArmorProficiencies') || '').shields || false : initialArmorProficienciesValue,
    },

    createClassFeature: (name, level, description) => set((state) => {
        let classFeatures = [...state.classFeatures];
        const newClassFeature = {
            id: Date.now(),
            name: name,
            level: level,
            description: description,
        }
        classFeatures.push(newClassFeature);
        localStorage.setItem('PlayerClassFeatures', JSON.stringify(classFeatures));
        return { classFeatures: classFeatures };
    }),

    createFeat: (name, category, description) => set((state) => {
        let feats = [...state.feats];
        const newFeat = {
            id: Date.now(),
            name: name,
            category: category,
            description: description,
        }
        feats.push(newFeat);
        localStorage.setItem('PlayerFeats', JSON.stringify(feats));
        return { feats: feats };
    }),
    createTrait: (name, description) => set((state) => {
        let traits = [...state.traits];
        const newTrait = {
            id: Date.now(),
            name: name,
            description: description,
        }
        traits.push(newTrait);
        localStorage.setItem('PlayerTraits', JSON.stringify(traits));
        return { traits: traits };
    }),
    createProficiency: (name, description) => set((state) => {
        let proficiencies = [...state.proficiencies];
        const newProficiency = {
            id: Date.now(),
            name: name,
            description: description,
        }
        proficiencies.push(newProficiency);
        localStorage.setItem('PlayerProficiencies', JSON.stringify(proficiencies));
        return { proficiencies: proficiencies };
    }),

    updateClassFeature: (id, name, level, description) => set((state) => {
        let classFeatures = [...state.classFeatures];
        let classFeatureIndex = classFeatures.findIndex((i) => i.id === id);
        if (classFeatureIndex !== -1) {
            const updatedClassFeature = {
                id: id,
                name: name,
                level: level,
                description: description,
            }
            classFeatures[classFeatureIndex] = updatedClassFeature;
            localStorage.setItem('PlayerClassFeatures', JSON.stringify(classFeatures));
        }
        return { classFeatures: classFeatures };
    }),

    updateFeat: (id, name, category, description) => set((state) => {
        let feats = [...state.feats];
        let featIndex = feats.findIndex((i) => i.id === id);
        if (featIndex !== -1) {
            const updatedFeat = {
                id: id,
                name: name,
                category: category,
                description: description,
            }
            feats[featIndex] = updatedFeat;
            localStorage.setItem('PlayerFeats', JSON.stringify(feats));
        }
        return { feats: feats };
    }),
    updateTrait: (id, name, description) => set((state) => {
        let traits = [...state.traits];
        let traitIndex = traits.findIndex((i) => i.id === id);
        if (traitIndex !== -1) {
            let updatedTrait = {
                id: id,
                name: name,
                description: description,
            }
            traits[traitIndex] = updatedTrait;
            localStorage.setItem('PlayerTraits', JSON.stringify(traits));
        }
        return { traits: traits }
    }),
    updateProficiency: (id, name, description) => set((state) => {
        let proficiencies = [...state.proficiencies];
        let proficiencyIndex = proficiencies.findIndex((i) => i.id === id);
        if (proficiencyIndex !== -1) {
            let updatedProficiency = {
                id: id,
                name: name,
                description: description,
            }
            proficiencies[proficiencyIndex] = updatedProficiency;
            localStorage.setItem('PlayerProficiencies', JSON.stringify(proficiencies));
        }
        return { proficiencies: proficiencies }
    }),
    deleteClassFeature: (id) => set((state) => {
        let classFeatures = [...state.classFeatures];
        classFeatures = classFeatures.filter((feature) => feature.id !== id);
        localStorage.setItem('PlayerClassFeatures', JSON.stringify(classFeatures));
        return { classFeatures: classFeatures };
    }),
    deleteFeat: (id) => set((state) => {
        let feats = [...state.feats];
        feats = feats.filter((feat) => feat.id !== id);
        localStorage.setItem('PlayerFeats', JSON.stringify(feats));
        return { feats: feats };
    }),
    deleteTrait: (id) => set((state) => {
        let traits = [...state.traits];
        traits = traits.filter((trait) => trait.id !== id);
        localStorage.setItem('PlayerTraits', JSON.stringify(traits));
        return { traits: traits };
    }),
    deleteProficiency: (id) => set((state) => {
        let proficiencies = [...state.proficiencies];
        proficiencies = proficiencies.filter((proficiency) => proficiency.id !== id);
        localStorage.setItem('PlayerProficiencies', JSON.stringify(proficiencies));
        return { proficiencies: proficiencies };
    }),

    updateArmorProficiency: (name, value) => set((state) => {
        let armorProficiencies = { ...state.armorProficiencies };
        armorProficiencies[name] = value;
        localStorage.setItem('PlayerArmorProficiencies', JSON.stringify(armorProficiencies));
        return { armorProficiencies: armorProficiencies };
    }),
}));

export default useTraitsFeatsStore;