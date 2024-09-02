import './Inventory.css';
import InventoryItems from './InventoryItems';
import InventoryBottom from './InventoryBottom';

const Inventory = () => {
    return (
        <div className="Inventory">
            <div className='title'>
                <span>INVENTORY</span>
            </div>
            <InventoryItems />
            <InventoryBottom />
        </div>
    )
}

export default Inventory;