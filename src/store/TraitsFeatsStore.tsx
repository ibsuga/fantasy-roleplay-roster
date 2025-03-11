import { create } from "zustand";

type TraitsFeatsStore = {
    classFeatures: { id: number, name: string, level: number | null, description: string }[],
    feats: { id: number, name: string, category: string, description: string }[],
    traits: { id: number, name: string, description: string }[],
    createClassFeature: (name: string, level: number | null, description: string) => void,
    createFeat: (name: string, category: string, description: string) => void,
    createTrait: (name: string, description: string) => void,
    updateClassFeature: (id: number, name: string, level: number | null, description: string) => void,
    updateFeat: (id: number, name: string, category: string, description: string) => void,
    updateTrait: (id: number, name: string, description: string) => void,
    deleteClassFeature: (id: number) => void,
    deleteFeat: (id: number) => void,
    deleteTrait: (id: number) => void,
};

const useTraitsFeatsStore = create<TraitsFeatsStore>((set) => ({

    classFeatures: localStorage.getItem('PlayerClassFeatures') ? JSON.parse(localStorage.getItem('PlayerClassFeatures') || '') : [],
    feats: localStorage.getItem('PlayerFeats') ? JSON.parse(localStorage.getItem('PlayerFeats') || '') : [],
    traits: localStorage.getItem('PlayerTraits') ? JSON.parse(localStorage.getItem('PlayerTraits') || '') : [],

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
    })
}));

export default useTraitsFeatsStore;