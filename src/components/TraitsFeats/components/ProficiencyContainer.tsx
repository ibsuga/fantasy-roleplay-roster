import { Dialog } from "primereact/dialog";
import FeatureContainer from "./FeatureContainer"
import { useState } from "react";
import useTraitsFeatsStore from "../../../store/TraitsFeatsStore";
import ProficiencyBadge from "./ProficiencyBadge";


const ProficiencyContainer = () => {

    const [dialogOpen, setDialogOpen] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const [
        proficiencies,
        createProficiency,
        armorProficiencies,
        updateArmorProficiency
    ] = useTraitsFeatsStore(state => [
        state.proficiencies,
        state.createProficiency,
        state.armorProficiencies,
        state.updateArmorProficiency
    ]);


    const handleSave = () => {
        if (name !== '') {
            createProficiency(name, description);
            handleClose();
        }
    }

    const handleClose = () => {
        setName('');
        setDescription('');
        setDialogOpen(false);
    }

    return (
        <FeatureContainer
            title="proficiencies"
            tools={
                <>
                    <button className='container-button' onClick={() => setDialogOpen(true)}> + </button>
                    <Dialog
                        className={'FeatureDialog'}
                        visible={dialogOpen}
                        onHide={() => setDialogOpen(false)}
                        closable={false}
                        draggable={false}
                        resizable={false}
                        footer={
                            <div className="dialog-footer">
                                <button className="dialog-button" disabled={name === ''} onClick={() => handleSave()}>save</button>
                                <button className="dialog-button" onClick={handleClose}> close </button>
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
            proficiency={
                <div className="armor-proficiency">

                    <span className="proficiency-label">ARMOR PROFICIENCY</span>

                    <div className="proficiency-stat">
                        <input type="checkbox" checked={armorProficiencies.light} onChange={(e) => updateArmorProficiency('light', e.target.checked)} />
                        <label>Light</label>
                    </div>
                    <div className="proficiency-stat">
                        <input type="checkbox" checked={armorProficiencies.medium} onChange={(e) => updateArmorProficiency('medium', e.target.checked)} />
                        <label>Medium</label>
                    </div>
                    <div className="proficiency-stat">
                        <input type="checkbox" checked={armorProficiencies.heavy} onChange={(e) => updateArmorProficiency('heavy', e.target.checked)} />
                        <label>Heavy</label>
                    </div>
                    <div className="proficiency-stat">
                        <input type="checkbox" checked={armorProficiencies.shields} onChange={(e) => updateArmorProficiency('shields', e.target.checked)} />
                        <label>Shields</label>

                    </div>

                </div>
            }
        >
            {
                proficiencies.map((feature, index) => <ProficiencyBadge key={index} id={feature.id} name={feature.name} />)

            }
        </FeatureContainer>
    )
}

export default ProficiencyContainer;