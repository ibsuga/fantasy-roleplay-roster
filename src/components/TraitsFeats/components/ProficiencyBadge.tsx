import { Dialog } from "primereact/dialog";
import { useState } from "react";
import useTraitsFeatsStore from "../../../store/TraitsFeatsStore";
import { FaRegTrashCan } from "react-icons/fa6";

const ProficiencyBadge = (props: {
    id: number,
    name: string,
}) => {


    const [dialogOpen, setDialogOpen] = useState(false);

    const [proficiencies, updateProficiency, deleteProficiency] = useTraitsFeatsStore(state => [
        state.proficiencies,
        state.updateProficiency,
        state.deleteProficiency
    ]);

    const selectedProficiency = proficiencies.find((proficiency) => proficiency.id === props.id);

    const [name, setName] = useState(selectedProficiency?.name || '');
    const [description, setDescription] = useState(selectedProficiency?.description || '');

    const handleSave = () => {
        if (name !== '') {
            updateProficiency(props.id, name, description);
            setDialogOpen(false);
        }
    }

    const handleClose = () => {
        setName(selectedProficiency?.name || '');
        setDescription(selectedProficiency?.description || '');
        setDialogOpen(false);
    }

    const handleDelete = () => {
        deleteProficiency(props.id);
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

export default ProficiencyBadge;