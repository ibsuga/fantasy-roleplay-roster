import { BiSolidCoin } from "react-icons/bi";
import { FaWeightHanging } from "react-icons/fa";


const InventoryBottom = () => {
    return (
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
    )
}

export default InventoryBottom;