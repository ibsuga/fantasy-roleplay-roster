import { useState } from 'react';
import './TraitsFeatsDialog.css';
import { Dialog } from 'primereact/dialog';

const TraitsFeatsDialog = () => {


    const [dialogOpen, setDialogOpen] = useState(false);

    return (
        <>
            <button className='container-button' onClick={() => setDialogOpen(true)}> + </button>

            <Dialog
                className='TraitsFeatsDialog'
                visible={dialogOpen}
                onHide={() => setDialogOpen(false)}
                footer={
                    <div>
                        <button>save</button>
                        <button onClick={() => setDialogOpen(false)}> close </button>
                    </div>
                }
            >

                <div className="dialog-header">
                    <input type="text" placeholder='SET NAME' />
                </div>


                <div className='dialog-content'>

                    <div className="dialog-content__level">
                        <span>level</span>
                        <input type="text" placeholder='set level' />
                    </div>

                    <textarea className='dialog-description'></textarea>

                </div>

            </Dialog>
        </>
    )
}

export default TraitsFeatsDialog;