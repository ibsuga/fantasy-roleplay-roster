import { useState } from "react";
import useTraitsFeatsStore from "../../../store/TraitsFeatsStore";
import FeatureContainer from "./FeatureContainer";
import TraitsBadge from "./TraitsBadge";
import { Dialog } from "primereact/dialog";

const TraitsContainer = () => {
    const [traits] = useTraitsFeatsStore(state => [state.traits]);

    const [dialogOpen, setDialogOpen] = useState(false);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const createTrait = useTraitsFeatsStore(state => state.createTrait);

    const handleSave = () => {
        if (name !== '') {
            createTrait(name, description)
            setDialogOpen(false);
        }
    }

    return (
        <FeatureContainer
            title="traits"
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
                            <textarea className='dialog-description' onChange={(e) => { setDescription(e.target.value) }}> </textarea>
                        </div>
                    </Dialog>
                </>
            }
        >
            {
                traits.map((feature, index) => <TraitsBadge key={index} id={feature.id} name={feature.name} />)
            }
        </FeatureContainer>
    )
}

export default TraitsContainer;