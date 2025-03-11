import { Dialog } from 'primereact/dialog';
import { useState } from 'react';
import useTraitsFeatsStore from '../../../store/TraitsFeatsStore';


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
                footer={
                    <div>
                        <button disabled={name === ''} onClick={handleSave}>save</button>
                        <button onClick={() => setDialogOpen(false)}>close</button>
                        <button onClick={handleDelete}>delete</button>
                    </div>
                }
            >
                <div className="dialog-header">
                    <input type="text" placeholder='SET NAME' value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                <div className='dialog-content'>
                    <span>level</span>
                    <input type="text" placeholder='SET LEVEL' value={level} onChange={(e) => setLevel(e.target.value)} />
                    <textarea className='dialog-description' value={description} onChange={(e) => setDescription(e.target.value)}> </textarea>
                </div>

            </Dialog >

        </>
    )
}

export default ClassFeaturesBadge;