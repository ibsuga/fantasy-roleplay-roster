import { Dialog } from 'primereact/dialog';
import { useState } from 'react';
import useTraitsFeatsStore from '../../../store/TraitsFeatsStore';
import { FaRegTrashCan } from "react-icons/fa6";



const TraitsBadge = (props: {
    id: number;
    name: string;
}) => {
    const [dialogOpen, setDialogOpen] = useState(false);

    const [traits, updateTrait, deleteTrait] = useTraitsFeatsStore(state => [
        state.traits,
        state.updateTrait,
        state.deleteTrait
    ]);

    const selectedTrait = traits.find((trait) => trait.id === props.id);

    const [name, setName] = useState(selectedTrait?.name || '');
    const [description, setDescription] = useState(selectedTrait?.description || '');


    const handleSave = () => {
        if (name !== '') {
            updateTrait(props.id, name, description)
            setDialogOpen(false);
        }
    }

    const handleClose = () => {
        setName(selectedTrait?.name || '');
        setDescription(selectedTrait?.description || '');
        setDialogOpen(false);
    }

    const handleDelete = () => {
        deleteTrait(props.id)
        setDialogOpen(false);
    }

    return (
        <>
            <div className="FeatsBadge" onClick={() => setDialogOpen(true)}>
                <div className="badge-name">{props.name}</div>
            </div>

            <Dialog
                className='FeatureDialog'
                visible={dialogOpen}
                onHide={() => setDialogOpen(false)}
                closable={false}
                draggable={false}
                resizable={false}
                footer={
                    <div className='dialog-footer'>
                        <button className='dialog-button' disabled={name === ''} onClick={handleSave}>save</button>
                        <button className='dialog-button' onClick={handleClose}>close</button>
                        <button className='dialog-button delete' onClick={handleDelete}><FaRegTrashCan /></button>
                    </div>
                }
            >
                <div className="dialog-header">
                    <input type="text" placeholder='SET NAME' value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                <div className='dialog-content'>
                    <textarea className='dialog-description' value={description} onChange={(e) => setDescription(e.target.value)}> </textarea>
                </div>

            </Dialog >

        </>
    )
}

export default TraitsBadge;