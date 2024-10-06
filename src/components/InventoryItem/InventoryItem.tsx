import './InventoryItem.css';
import useItemStore from '../../store/InventoryStore';
import EditItemButton from '../Inventory/EditItemButton';
import { useState } from 'react';
import { FaRegWindowClose } from "react-icons/fa";
import { GoNote } from "react-icons/go";


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
    description?: string,

}) => {
    const deleteItem = useItemStore((state) => state.deleteItem);
    const updateItemDescription = useItemStore((state) => state.updateItemDescription);

    const [showDescription, setShowDescription] = useState(false);


    return (
        <div className="InventoryItem">
            <div className='header'>
                <div className='item-name'>{props.name}</div>

                <div className='item-tools'>
                    <GoNote onClick={() => setShowDescription(!showDescription)} />
                    <EditItemButton id={props.id} />
                    <div className='delete-button'>
                        <FaRegWindowClose onClick={() => deleteItem(props.id)} />
                    </div>
                </div>
            </div>

            <div className='content'>
                {showDescription ?
                    <>
                        <div className='item-description'>
                            <textarea
                                value={props.description}
                                spellCheck={false}
                                onChange={(e) => updateItemDescription(props.id, e.target.value)}></textarea>
                        </div>
                    </>
                    :
                    <>
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
                                <div className='encumbrance spaced'> {props.encumbrance} </div>
                            </div>
                        </div>
                    </>
                }
            </div>
        </div >
    )
}

export default InventoryItem;