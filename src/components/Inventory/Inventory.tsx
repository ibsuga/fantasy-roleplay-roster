import './Inventory.css';
import InventoryItems from './InventoryItems';
import InventoryBottom from './InventoryBottom';

const Inventory = () => {
    return (
        <div className="Inventory">
            <div className='title'>
                <span style={{ opacity: '25%', fontSize: '1.25em', alignSelf: 'center', justifySelf: 'end' }}>CONDITIONS</span>
                <span> INVENTORY </span>
                <span style={{ opacity: '25%', fontSize: '1.25em', alignSelf: 'center', justifySelf: 'start' }}>PROFILE</span>
            </div>
            <InventoryItems />
            <InventoryBottom />
        </div>
    )
}

export default Inventory;