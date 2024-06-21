import './Inventory.css';
import InventoryItem from '../InventoryItem/InventoryItem';
import { GiCrocSword, GiChestArmor, GiSwapBag, GiPotionBall } from "react-icons/gi";

const Inventory = () => {
    return (
        <div className="Inventory">
            <div className='filter-bar'>
                <span> <GiCrocSword /> </span>
                <span> <GiChestArmor /></span>
                <span> <GiPotionBall /></span>
                <span> <GiSwapBag /></span>
            </div>
            <div className="tools-bar">
                <span>ADD ITEM</span>
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