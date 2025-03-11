import { Dialog } from 'primereact/dialog';
import { useState } from 'react';
import useTraitsFeatsStore from '../../../store/TraitsFeatsStore';
import { FaRegTrashCan } from "react-icons/fa6";



const ClassFeaturesBadge = (props: {
    id: number;
    name: string;
    level: number | null;
}) => {
    const [dialogOpen, setDialogOpen] = useState(false);

    const [classFeatures, updateClassFeature, deleteClassFeature] = useTraitsFeatsStore(state => [
        state.classFeatures,
        state.updateClassFeature,
        state.deleteClassFeature
    ]);

    let selectedClassFeature = classFeatures.find((feature) => feature.id === props.id);

    const [name, setName] = useState(selectedClassFeature?.name || '');
    const [level, setLevel] = useState('' + selectedClassFeature?.level || '0');
    const [description, setDescription] = useState(selectedClassFeature?.description || '');


    const handleSave = () => {
        if (name !== '') {
            updateClassFeature(props.id, name, Number(level), description)
            setDialogOpen(false);
        }
    }

    const handleClose = () => {
        setName(selectedClassFeature?.name || '');
        setLevel('' + selectedClassFeature?.level || '0');
        setDescription(selectedClassFeature?.description || '');
        setDialogOpen(false);
    }

    const handleDelete = () => {
        deleteClassFeature(props.id)
        setDialogOpen(false);
    }

    return (
        <>

            <div className="FeatsBadge" onClick={() => setDialogOpen(true)}>
                <div className="badge-name">{props.name}</div>
                <div className="badge-details">
                    {props.level && <span>LVL {props.level}</span>}
                </div>
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
                    <div>
                        <span>level</span>
                        <input type="text" placeholder='SET LEVEL' value={level} onChange={(e) => setLevel(e.target.value)} />
                    </div>
                    <textarea className='dialog-description' value={description} onChange={(e) => setDescription(e.target.value)}> </textarea>
                </div>

            </Dialog >

        </>
    )
}

export default ClassFeaturesBadge;