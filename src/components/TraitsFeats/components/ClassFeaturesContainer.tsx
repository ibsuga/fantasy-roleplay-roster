import { useState } from "react";
import useTraitsFeatsStore from "../../../store/TraitsFeatsStore";
import ClassFeaturesBadge from "./ClassFeaturesBadge";
import FeatureContainer from "./FeatureContainer";

import { Dialog } from 'primereact/dialog';

const ClassFeaturesContainer = () => {
    const [classFeatures] = useTraitsFeatsStore(state => [state.classFeatures]);
    const [dialogOpen, setDialogOpen] = useState(false);

    const [name, setName] = useState('');
    const [level, setLevel] = useState<number | null>(null);
    const [description, setDescription] = useState('');

    const createClassFeature = useTraitsFeatsStore(state => state.createClassFeature);

    const handleSave = () => {
        if (name !== '') {
            createClassFeature(name, level, description)
            setDialogOpen(false);
        }
    }

    return (
        <FeatureContainer
            title="class features"
            tools={
                <>
                    <button className='container-button' onClick={() => setDialogOpen(true)}> + </button>
                    <Dialog
                        className={'FeatureDialog'}
                        visible={dialogOpen}
                        onHide={() => setDialogOpen(false)}

                        footer={
                            <div>
                                <button disabled={name === ''} onClick={() => handleSave()}>save</button>
                                <button onClick={() => setDialogOpen(false)}> close </button>
                            </div>
                        }
                    >
                        <div className="dialog-header">
                            <input type="text" placeholder='SET NAME' onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className='dialog-content'>
                            <div className="dialog-content__level">
                                <span>level</span>
                                <input type="text" placeholder='set level' onChange={(e) => { setLevel(Number(e.target.value)) }} />
                            </div>

                            <textarea className='dialog-description' onChange={(e) => { setDescription(e.target.value) }}> </textarea>
                        </div>

                    </Dialog>
                </>
            }
        >
            {
                classFeatures.map((feature, index) => <ClassFeaturesBadge key={index} id={feature.id} name={feature.name} level={feature.level} />)
            }
        </FeatureContainer>
    )
}

export default ClassFeaturesContainer;

