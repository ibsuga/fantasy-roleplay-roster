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
                    <div>+SB +1</div>
                    <div>Very Short</div>
                    <div>Fencing</div>
                    <div>Scarce</div>
                    <div>Fast, Impale, Precise, Undamaging</div>
                </div>
            </div>
        </div>
    )
}

export default InventoryItem;