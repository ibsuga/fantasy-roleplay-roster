import './InventoryItem.css';
import EditItemButton from '../Inventory/EditItemButton';
import { GiCrocSword, GiChestArmor, GiPotionBall, GiPocketBow, GiHandBag } from "react-icons/gi";
import useItemStore from '../../store/InventoryStore';
import PopMenu from '../PopMenu/PopMenu';
import ContainerSelector from './ContainerSelector';


const InventoryItem = (props: {
    id: number,
    name: string,
    encumbrance: number,
    damage: { value: number, useSB: boolean },
    range: string,
    category: string,
    subCategory: string[],
    availability: string,
    qualities?: { name: string, description: string }[],
    flaws?: { name: string, description: string }[],
    locations?: string[],
    armourPoints?: number,
    amount?: number,
    carry?: number,
    isRanged?: boolean,
    container_id?: number,
    description?: string,

}) => {

    const [containers, updateItemAmount] = useItemStore((state) => [state.containers, state.updateItemAmount])
    const container = containers.find((container) => container.id === props.container_id);



    //Sets item icon for each category.
    const itemIcons: any = {
        'weapon': props.isRanged ? <GiPocketBow /> : <GiCrocSword />,
        'armor': <GiChestArmor />,
        'items': <GiPotionBall />,
    }

    //Sets item stats depending on item category.
    const getItemStatsContent = () => {
        switch (props.category) {
            case 'weapon':
                return <div className='item-stats'>

                    <div className="stat">
                        <div className="label">DMG</div>
                        <span>{props.damage?.useSB ? '+SB+' : ''}</span>
                        <span>{props.damage?.value}</span>
                    </div>

                    <div className="stat">
                        <div className="label">ENC</div>
                        <span>{props.encumbrance}</span>
                    </div>

                </div>
            case 'armor':
                return <div className='item-stats'>

                    <div className='stat'>
                        <div className='label'>AP</div>
                        <span>{props.armourPoints}</span>
                    </div>

                    <div className='stat'>
                        <div className="label">ENC</div>
                        <span>{props.encumbrance}</span>
                    </div>

                </div>
            case 'items':
                return <div className='item-stats'>

                    <div className='stat'>
                        <div className="label">ENC</div>
                        <span>{props.encumbrance}</span>
                    </div>

                </div>
            default: return <span>No Content...</span>
        }
    }


    return (
        <div className="InventoryItem" >

            <div className='item-equip'>
                <div>
                    {itemIcons[props.category]}
                </div>
            </div>

            <EditItemButton id={props.id}>
                <div className='item-content'>

                    <div className="item-name">{props.name}</div>

                    {getItemStatsContent()}

                </div>
            </EditItemButton>

            <div className="item-container">
                <PopMenu
                    trigger={
                        <GiHandBag style={container ? { color: `#${container?.color}` } : {}} />
                    }
                    content={
                        <div>
                            <ContainerSelector
                                itemId={props.id}
                                containerId={null}
                                containerLabel='No container'
                            />
                            {
                                containers.map((container, index) =>
                                    <ContainerSelector
                                        key={index}
                                        itemId={props.id}
                                        containerId={container.id}
                                        containerLabel={container.label}
                                    />)
                            }
                        </div>
                    }

                />
            </div>
            <div className="item-amount">x
                {
                    <input
                        type='text'
                        value={props.amount ?? 1}
                        onChange={(e: any) => updateItemAmount(props.id, e.target.value)}
                    />
                }
            </div>
        </div>

    )

}



















//     return (
//         <div className="InventoryItem">
//             <div className="background-icon"> {itemBackgroundIcons[props.category]} </div>
//             <div className='header'>
//                 <div className='item-name'>{props.name}</div>

//                 <div className='item-tools'>
//                     <GoNote onClick={() => setShowDescription(!showDescription)} />
//                     <EditItemButton id={props.id} />
//                     <div className='delete-button'>
//                         <FaRegWindowClose onClick={() => deleteItem(props.id)} />
//                     </div>
//                 </div>
//             </div>

//             <div className='content'>
//                 {showDescription ?
//                     <>
//                         <div className='item-description'>
//                             <textarea
//                                 placeholder='Add item description.'
//                                 value={props.description}
//                                 spellCheck={false}
//                                 rows={2}
//                                 onChange={(e) => updateItemDescription(props.id, e.target.value)}></textarea>
//                         </div>
//                     </>
//                     :
//                     <>
//                         <div className='traits'>
//                             {props.qualities && props.qualities.length > 0 &&
//                                 <span className='trait-qualities'>
//                                     {
//                                         props.qualities?.map((quality) => {
//                                             return <span className='quality'>
//                                                 <PopMenu
//                                                     label={quality.name}
//                                                     content={
//                                                         <div className="quality-tooltip">
//                                                             <div className="header">
//                                                                 <span>Quality</span>
//                                                                 <div>{quality.name}</div>
//                                                                 <hr />
//                                                             </div>
//                                                             <div className="description">
//                                                                 <div>{quality.description}</div>
//                                                             </div>
//                                                         </div>}

//                                                     positions={['top']}
//                                                     align="center"
//                                                 />
//                                             </span>
//                                         })
//                                     }
//                                 </span>
//                             }
//                             {props.flaws && props.flaws.length > 0 &&
//                                 <span className='trait-flaws'>
//                                     {
//                                         props.flaws && props.flaws?.length > 0 && props.flaws?.map((flaw) => {
//                                             return <span className='flaw'>
//                                                 <PopMenu
//                                                     label={flaw.name}
//                                                     content={
//                                                         <div className="flaw-tooltip">
//                                                             <div className="header">
//                                                                 <span>Flaw</span>
//                                                                 <div>{flaw.name}</div>
//                                                                 <hr />
//                                                             </div>
//                                                             <div className="description">
//                                                                 <div>{flaw.description}</div>
//                                                             </div>
//                                                         </div>
//                                                     }
//                                                     positions={['top']}
//                                                     align="center"
//                                                 />
//                                             </span>
//                                         })
//                                     }
//                                 </span>
//                             }
//                         </div>
//                         {getItemStatsContent()}
//                     </>
//                 }
//             </div>
//         </div >
//     )
// }

export default InventoryItem;