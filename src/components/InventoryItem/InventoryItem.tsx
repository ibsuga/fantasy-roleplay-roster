import './InventoryItem.css';
import { FaWeightHanging } from "react-icons/fa";
import useItemStore from '../../store/InventoryStore';


const InventoryItem = (props: {
    id: number,
    name: string,
    encumbrance: number,
    damage: { value: number, useSB: boolean },
    range: string,
    category: string,
    availability: string,
    qualities?: string[],
    flaws?: string[],
}) => {
    const deleteItem = useItemStore((state) => state.deleteItem);
    return (
        <div className="InventoryItem">
            <div className='header'>
                <div className='item-name'>{props.name}</div>
                <div className='item-stats'>
                    <button onClick={() => deleteItem(props.id)}>X</button>
                </div>
            </div>

            <div className='content'>
                <div className='traits'>
                    {props.qualities && props.qualities.length > 0 &&
                        <span className='trait-qualities'>
                            {
                                props.qualities?.map((quality: string) => {
                                    return <span className='quality'>{quality}</span>
                                })
                            }
                        </span>
                    }
                    {props.flaws && props.flaws.length > 0 &&
                        <span className='trait-flaws'>
                            {
                                props.flaws && props.flaws?.length > 0 && props.flaws?.map((flaw: string) => {
                                    return <span className='flaw'>{flaw}</span>
                                })
                            }
                        </span>
                    }
                </div>
                <div className='item-stats'>
                    <div className='stat'>
                        <div className="label">DAMAGE</div>
                        <span>{props.damage?.useSB ? '+SB+' : ''}</span>
                        <span>{props.damage?.value}</span>
                    </div>
                    <div className='stat'>
                        <div className="label">RANGE</div>
                        <span>{props.range}</span>
                    </div>
                    <div className='stat'>
                        <div className="label">CATEGORY</div>
                        <span>{props.category}</span>
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