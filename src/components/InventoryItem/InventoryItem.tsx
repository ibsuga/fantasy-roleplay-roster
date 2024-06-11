import './InventoryItem.css';

const InventoryItem = () => {
    return (
        <div className="InventoryItem">
            <div className='item-content'>

                <div className='top-section'>
                    <div className='item-name'>MILITARY FLAIL 2H</div>
                    <div className='weight-cost-data'>
                        <div>enc.</div>
                        <div>cost</div>
                    </div>
                </div>

                <div className='bottom-section'>
                    <div className='top-stats'>
                        <div className='item-stat'>+SB +1</div>
                        <div className='item-stat'>Very Short</div>
                        <div className='item-stat'>Fencing</div>
                        <div className='item-stat'>Scarce</div>
                    </div>
                    <div className='bottom-stats'>
                        <div className='item-stat'>Fast, Impale, Precise, Undamaging</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InventoryItem;