import { Dialog } from "primereact/dialog"
import { useState } from "react";
import useNavbarStore from "../../../store/NavbarStore";
import { FaImage } from "react-icons/fa";

const CharacterAvatar = () => {


    const [openDialog, setOpenDialog] = useState(false);


    const [characterBackground, updateCharacterBackground] = useNavbarStore((state) => [state.characterBackground, state.updateCharacterBackground]);

    return (
        <div className="CharacterAvatar">
            <FaImage onClick={() => setOpenDialog(true)} />
            <Dialog
                className={'FeatureDialog'}
                visible={openDialog}
                onHide={() => setOpenDialog(false)}
                closable={false}
                draggable={false}
                resizable={false}
                footer={
                    <div className="dialog-footer">
                        <button className="dialog-button" onClick={() => setOpenDialog(false)}> close </button>
                    </div>
                }
            >
                <div className="dialog-header">
                    <input type="text" placeholder='SET BACKGROUND' value={characterBackground} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateCharacterBackground(e.target.value)} />
                </div>
            </Dialog>

        </div>
    )
}

export default CharacterAvatar;