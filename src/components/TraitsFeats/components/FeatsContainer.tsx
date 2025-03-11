import { useState } from "react";
import useTraitsFeatsStore from "../../../store/TraitsFeatsStore";
import FeatsBadge from "./FeatsBadge";
import FeatureContainer from "./FeatureContainer";
import { Dialog } from "primereact/dialog";

const FeatsContainer = () => {
    const [feats] = useTraitsFeatsStore(state => [state.feats]);
    const [dialogOpen, setDialogOpen] = useState(false);

    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');

    const createFeat = useTraitsFeatsStore(state => state.createFeat);

    const handleSave = () => {
        if (name !== '') {
            createFeat(name, category, description)
            setDialogOpen(false);
        }
    }

    return (
        <FeatureContainer
            title="feats"
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
                                <span>category</span>
                                <input type="text" placeholder='set level' onChange={(e) => setCategory(e.target.value)} />
                            </div>

                            <textarea className='dialog-description' onChange={(e) => { setDescription(e.target.value) }}> </textarea>
                        </div>
                    </Dialog>
                </>
            }
        >
            {
                feats.map((feature, index) => <FeatsBadge key={index} id={feature.id} name={feature.name} category={feature.category} />)
            }
        </FeatureContainer>
    )
}

export default FeatsContainer;