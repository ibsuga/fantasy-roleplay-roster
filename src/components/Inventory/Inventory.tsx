import './Inventory.css';
import InventoryItem from '../InventoryItem/InventoryItem';
import { GiCrocSword, GiChestArmor, GiSwapBag, GiPotionBall } from "react-icons/gi";
import { BiSolidCoin } from "react-icons/bi";
import { FaWeightHanging } from "react-icons/fa";

const Inventory = () => {
    return (
        <div className="Inventory">
            <div className='title'>
                <span>INVENTORY</span>
            </div>
            <div className='filter-bar'>
                <span> <GiCrocSword /> </span>
                <span> <GiChestArmor /></span>
                <span> <GiPotionBall /></span>
                <span> <GiSwapBag /></span>
            </div>
            <div className="tools-bar">
                <input type="text" placeholder='SEARCH BAR' />
                <span>ADD ITEM</span>
            </div>
            <div className='items'>
                <InventoryItem />
                <InventoryItem />
                <InventoryItem />
                <InventoryItem />
                <InventoryItem />
                <InventoryItem />
            </div>

            <div className='inventory-bottom'>
                <div className='encumbrance'>
                    <div>
                        <FaWeightHanging />
                        <input type="text" />
                    </div>
                </div>
                <div className='wealth'>
                    <div>
                        <BiSolidCoin />
                        <input type="text" />
                    </div>
                    <div>
                        <BiSolidCoin />
                        <input type="text" />
                    </div>
                    <div>
                        <BiSolidCoin />
                        <input type="text" />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Inventory;