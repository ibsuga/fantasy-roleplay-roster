import useItemStore from "../../store/InventoryStore";
import { useMemo } from "react";
import { BiSolidCoin } from "react-icons/bi";
import { FaWeightHanging } from "react-icons/fa";
import { TbInfoHexagon } from "react-icons/tb";
import PopMenu from '../PopMenu/PopMenu';




const InventoryBottom = () => {
    const items = useItemStore((state) => state.items);
    const encumbrance = useItemStore((state) => state.encumbrance);
    const updateMaxEncumbrance = useItemStore((state) => state.updateMaxEncumbrance);

    const wealth = useItemStore((state) => state.wealth);
    const updateWealth = useItemStore((state) => state.updateWealth)

    //Encumbrance filters by category
    const weaponEncumbranceFilter = useMemo(() => items.filter((item) => item.category === 'weapon'), [items]);
    const armorEncumbranceFilter = useMemo(() => items.filter((item) => item.category === 'armor'), [items]);
    const consumableEncumbranceFilter = useMemo(() => items.filter((item) => item.category === 'consumable'), [items]);

    const weaponEncumbrance = useMemo(() => weaponEncumbranceFilter.reduce((prev: number, item: any) => prev + (item.encumbrance * 1), 0), [items])
    const armorEncumbrance = useMemo(() => armorEncumbranceFilter.reduce((prev: number, item: any) => prev + (item.encumbrance * 1), 0), [items]);
    const consumableEncumbrance = useMemo(() => consumableEncumbranceFilter.reduce((prev: number, item: any) => prev + (item.encumbrance * 1), 0), [items]);
    const totalEncumbrance = useMemo(() => items.reduce((prev: number, item: any) => prev + (item.encumbrance * 1), 0), [items]);


    const EncumbranceTooltipContent =
        <div className="encumbrance-tooltip">
            <span className="header">Encumbrance by Category</span>
            <hr />
            <div>
                <span className="label">Weapons: </span>
                <span className="encumbrance-value">{weaponEncumbrance}</span>
            </div>
            <div>
                <span className="label">Armor: </span>
                <span className="encumbrance-value">{armorEncumbrance}</span>
            </div>
            <div>
                <span className="label">Consumables: </span>
                <span className="encumbrance-value">{consumableEncumbrance}</span>
            </div>
        </div>



    console.log(wealth);

    return (
        <div className='inventory-bottom'>

            <div className='encumbrance'>
                <FaWeightHanging />
                <div className='encumbrance-table'>
                    <span className='label'>Encumbrance</span>
                    <span className={(totalEncumbrance > encumbrance) ? "encumbered" : 'not-encumbered'} >{totalEncumbrance}</span>
                    <span className='label'>Max.</span>
                    <input
                        type="text"
                        maxLength={3}
                        value={encumbrance}
                        onChange={(e) => updateMaxEncumbrance(Number(e.target.value) || 0)} />
                    <PopMenu
                        label={<TbInfoHexagon className="info-button" />}
                        content={EncumbranceTooltipContent}
                        positions={['top']}
                        align="end"
                    />

                </div>
            </div>

            <div className='wealth'>
                <div>
                    <BiSolidCoin />
                    <input type="text" value={wealth.copper} maxLength={4} onChange={(e) => updateWealth(Number(e.target.value), 'copper')} />
                </div>
                <div>
                    <BiSolidCoin />
                    <input type="text" value={wealth.silver} maxLength={4} onChange={(e) => updateWealth(Number(e.target.value), 'silver')} />
                </div>
                <div>
                    <BiSolidCoin />
                    <input type="text" value={wealth.gold} maxLength={4} onChange={(e) => updateWealth(Number(e.target.value), 'gold')} />
                </div>
            </div>
        </div>
    )
}

export default InventoryBottom;