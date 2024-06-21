import './InventoryItem.css';
import { FaWeightHanging } from "react-icons/fa";
import { BiSolidCoin } from "react-icons/bi";


const InventoryItem = () => {
    return (
        <div className="InventoryItem">
            <div className='header'>
                <div className='item-name'>MILITARY FLAIL 2H</div>
                <div className='item-stats'>
                    <div className='encumbrance spaced'> 1 <FaWeightHanging /> </div>
                    <div className='gold'> 1<BiSolidCoin /> </div>
                    <div className='silver'> 2<BiSolidCoin /> </div>
                    <div className='bronze'> 3<BiSolidCoin /> </div>
                </div>
            </div>

            <div className='content'>
                <div className='traits'>
                    <span>Fast </span>
                    <span>Impale </span>
                    <span>Precise </span>
                    <span>Undamaging </span>
                </div>
                <div className='item-stats'>
                    <div className='stat'>
                        <div className="label">DAMAGE</div>
                        <span>+SB +1</span>
                    </div>
                    <div className='stat'>
                        <div className="label">RANGE</div>
                        <span>Very Short</span>
                    </div>
                    <div className='stat'>
                        <div className="label">CATEGORY</div>
                        <span>Fencing</span>
                    </div>
                    <div className='stat'>
                        <div className="label">AVAILABILITY</div>
                        <span>Scarce</span>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default InventoryItem;