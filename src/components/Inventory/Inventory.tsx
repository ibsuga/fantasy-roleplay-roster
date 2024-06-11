import InventoryItem from '../InventoryItem/InventoryItem';
import './Inventory.css';

const Inventory = () => {
    return (
        <div className="Inventory">
            <div className='filter-bar'>
                <span>1</span>
                <span>2</span>
                <span>3</span>
            </div>
            <div className='add-item-button'>
                <span>+</span>
            </div>
            <div className='items'>
                <InventoryItem />
                <InventoryItem />
                <InventoryItem />
            </div>
        </div>
    )
}

export default Inventory;