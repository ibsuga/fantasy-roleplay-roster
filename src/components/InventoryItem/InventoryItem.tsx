import './InventoryItem.css';
import { FaWeightHanging } from "react-icons/fa";


const InventoryItem = (props: {
    name: string,
    encumbrance: number,
    traits?: string[],
    damage: string,
    range: string,
    category: string,
    availability: string,
}) => {
    return (
        <div className="InventoryItem">
            <div className='header'>
                <div className='item-name'>{props.name}</div>
                <div className='item-stats'>
                    <button>X</button>
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
                        <span>{props.damage}</span>
                    </div>
                    <div className='stat'>
                        <div className="label">RANGE</div>
                        <span>{props.range}</span>
                    </div>
                    <div className='stat'>
                        <div className="label">CATEGORY</div>
                        <span>{props.range}</span>
                    </div>
                    <div className='stat'>
                        <div className="label">ENCUMBRANCE</div>
                        <div className='encumbrance spaced'> {props.encumbrance} <FaWeightHanging /></div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default InventoryItem;