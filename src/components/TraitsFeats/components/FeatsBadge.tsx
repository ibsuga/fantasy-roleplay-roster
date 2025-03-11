import { Dialog } from 'primereact/dialog';
import { useState } from 'react';
import useTraitsFeatsStore from '../../../store/TraitsFeatsStore';


const FeatsBadge = (props: {
    id: number;
    name: string;
    category: string;
}) => {
    const [dialogOpen, setDialogOpen] = useState(false);

    const [feats, updateFeat, deleteFeat] = useTraitsFeatsStore(state => [
        state.feats,
        state.updateFeat,
        state.deleteFeat
    ]);

    const selectedFeat = feats.find((feat) => feat.id === props.id);

    const [name, setName] = useState(selectedFeat?.name || '');
    const [category, setCategory] = useState(selectedFeat?.category || '');
    const [description, setDescription] = useState(selectedFeat?.description || '');


    const handleSave = () => {
        if (name !== '') {
            updateFeat(props.id, name, category, description)
            setDialogOpen(false);
        }
    }

    const handleDelete = () => {
        deleteFeat(props.id)
        setDialogOpen(false);
    }

    return (
        <>
            <div className="FeatsBadge" onClick={() => setDialogOpen(true)}>
                <div className="badge-name">{props.name}</div>
                <div className="badge-details">
                    <span>{props.category}</span>
                </div>
            </div>

            <Dialog
                className='FeatureDialog'
                visible={dialogOpen}
                onHide={() => setDialogOpen(false)}
                footer={
                    <div>
                        <button disabled={name === ''} onClick={handleSave} >save</button>
                        <button onClick={() => setDialogOpen(false)}>close</button>
                        <button onClick={handleDelete}>delete</button>
                    </div>
                }
            >
                <div className="dialog-header">
                    <input type="text" placeholder='SET NAME' value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                <div className='dialog-content'>
                    <span>category</span>
                    <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
                    <textarea className='dialog-description' value={description} onChange={(e) => setDescription(e.target.value)}> </textarea>

                </div>

            </Dialog >

        </>
    )
}

export default FeatsBadge;