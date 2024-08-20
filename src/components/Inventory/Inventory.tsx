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
                <InventoryItem />
                <InventoryItem />
                <InventoryItem />
                <InventoryItem />
            </div>

            <div className='inventory-bottom'>
                <div className='encumbrance'>
                    <FaWeightHanging />
                    <div className='encumbrance-table'>
                        <span className='label'>Weapons</span>
                        <span className='label'>Armour</span>
                        <span className='label'>Trappings</span>
                        <span className='label'>Max.</span>
                        <span className='label spaced'>Total</span>
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>5</span>
                    </div>
                </div>
                <div className='wealth'>
                    <div>
                        <BiSolidCoin />
                        <input type="text" maxLength={4} />
                    </div>
                    <div>
                        <BiSolidCoin />
                        <input type="text" maxLength={4} />
                    </div>
                    <div>
                        <BiSolidCoin />
                        <input type="text" maxLength={4} />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Inventory;