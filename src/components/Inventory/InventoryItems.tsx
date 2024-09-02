import { GiCrocSword, GiChestArmor, GiPotionBall, GiSwapBag } from "react-icons/gi";
import { useState } from "react";
import { Dialog } from 'primereact/dialog';
import InventoryItem from '../InventoryItem/InventoryItem';


export const InventoryItems = () => {
    const [items, setItems] = useState<any[]>([]);
    const [createItemDialogOpen, setCreateItemDialogOpen] = useState(false);
    const [itemName, setItemName] = useState('');
    const [itemEncumbrance, setItemEncumbrance] = useState('');
    const [itemDamage, setItemDamage] = useState('');
    const [itemRange, setItemRange] = useState('');
    const [itemCategory, setItemCategory] = useState('');
    const [itemAvailability, setItemAvailability] = useState('');

    const handleCreateItem = () => {
        if (itemName !== '') {
            setItems([{
                name: itemName,
                encumbrance: itemEncumbrance,
                damage: itemDamage,
                range: itemRange,
                category: itemCategory,
                availability: itemAvailability,
            }, ...items]);
            setItemName('');
            setItemEncumbrance('');
            setItemDamage('');
            setItemRange('');
            setItemCategory('');
            setItemAvailability('');
            setCreateItemDialogOpen(false);
        }
    }

    return (
        <>
            <div className='filter-bar'>
                <span> <GiCrocSword /> </span>
                <span> <GiChestArmor /></span>
                <span> <GiPotionBall /></span>
                <span> <GiSwapBag /></span>
            </div>
            <div className="tools-bar">
                <input type="text" placeholder='SEARCH BAR' />
                <button onClick={() => setCreateItemDialogOpen(true)}>ADD ITEM</button>
            </div>
            <div className='items'>
                {
                    items.map((item: any) =>
                        <InventoryItem
                            name={item.name}
                            encumbrance={item.encumbrance}
                            damage={item.damage}
                            range={item.range}
                            category={item.category}
                            availability={item.availability}
                        />
                    )
                }
            </div>

            <Dialog
                className={'createItemDialog'}
                header="Create Item"
                visible={createItemDialogOpen} onHide={() => { if (!createItemDialogOpen) return; setCreateItemDialogOpen(false); }}
                footer={
                    <>
                        <button onClick={handleCreateItem} disabled={!itemName}>SAVE ITEM</button>
                        <button onClick={() => {
                            setItemName('');
                            setItemEncumbrance('');
                            setItemDamage('');
                            setItemRange('');
                            setItemCategory('');
                            setItemAvailability('');
                            setCreateItemDialogOpen(false);
                        }}>
                            CLOSE
                        </button>
                    </>
                }
            >
                <label>ITEM NAME</label>
                <input type="text" value={itemName} onChange={(e: any) => setItemName(e.target.value)} />
                <label>ITEM ENCUMBRANCE</label>
                <input type="text" value={itemEncumbrance} onChange={(e: any) => setItemEncumbrance(e.target.value)} />
                <label>ITEM DAMAGE</label>
                <input type="text" value={itemDamage} onChange={(e: any) => setItemDamage(e.target.value)} />
                <label>ITEM RANGE</label>
                <input type="text" value={itemRange} onChange={(e: any) => setItemRange(e.target.value)} />
                <label>ITEM CATEGORY</label>
                <input type="text" value={itemCategory} onChange={(e: any) => setItemCategory(e.target.value)} />
            </Dialog>

        </>
    )
}

export default InventoryItems;


