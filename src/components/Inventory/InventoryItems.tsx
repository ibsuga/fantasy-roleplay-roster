import { GiCrocSword, GiChestArmor, GiPotionBall, GiPocketBow } from "react-icons/gi";
import { useState } from "react";
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import InventoryItem from '../InventoryItem/InventoryItem';


export const InventoryItems = () => {
    const [items, setItems] = useState<any[]>([]);
    const [createItemDialogOpen, setCreateItemDialogOpen] = useState(false);
    const [itemName, setItemName] = useState('');
    const [itemEncumbrance, setItemEncumbrance] = useState('');
    const [itemDamage, setItemDamage] = useState('');
    const [itemDamageSb, setItemDamageSb] = useState(false);
    const [itemRange, setItemRange] = useState('');
    const [itemCategory, setItemCategory] = useState(null);
    const [itemAvailability, setItemAvailability] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');

    const handleCreateItem = () => {
        if (itemName !== '') {
            setItems([{
                name: itemName,
                encumbrance: itemEncumbrance,
                damage: {
                    value: itemDamage,
                    useSB: itemDamageSb
                },
                range: itemRange,
                category: itemCategory,
                availability: itemAvailability,


            }, ...items]);
            setItemName('');
            setItemEncumbrance('');
            setItemDamage('');
            setItemDamageSb(false);
            setItemRange('');
            setItemCategory(null);
            setItemAvailability('');
            setCreateItemDialogOpen(false);
        }
    }

    //Dropdown options.
    const itemCategories = ['Melee', 'Ranged', 'Armor', 'Consumable'];

    // Filter Items by category.
    let filtered_items;
    if (categoryFilter === '') {
        filtered_items = [...items]
    } else {
        filtered_items = items.filter((item: any) => item.category === categoryFilter);
    }

    return (
        <>
            <div className='filter-bar'>
                <span onClick={() => setCategoryFilter('')}> X </span>
                <span> · </span>
                <span> <GiCrocSword onClick={() => setCategoryFilter('Melee')} /> </span>
                <span> <GiPocketBow onClick={() => setCategoryFilter('Ranged')} /></span>
                <span> <GiChestArmor onClick={() => setCategoryFilter('Armor')} /></span>
                <span> <GiPotionBall onClick={() => setCategoryFilter('Consumable')} /></span>
            </div>
            <div className="tools-bar">
                <input type="text" placeholder='SEARCH BAR' />
                <button onClick={() => setCreateItemDialogOpen(true)}>ADD ITEM</button>
            </div>
            <div className='items'>
                {
                    filtered_items.map((item: any, index: number) =>
                        <InventoryItem
                            key={index}
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
                            setItemCategory(null);
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
                <div>
                    <label>ITEM DAMAGE</label>
                    <input type="number" value={itemDamage} onChange={(e: any) => setItemDamage(e.target.value)} />
                    <input type="checkbox" checked={itemDamageSb} onChange={(e: any) => setItemDamageSb(e.target.checked)} />
                    <label>Use SB</label>
                </div>

                <label>ITEM RANGE</label>
                <input type="text" value={itemRange} onChange={(e: any) => setItemRange(e.target.value)} />
                <label>ITEM CATEGORY</label>
                <Dropdown
                    value={itemCategory}
                    onChange={(e: any) => setItemCategory(e.value)}
                    options={itemCategories}
                    optionLabel="name"
                    placeholder="Select a Category"
                />
            </Dialog>
        </>
    )
}

export default InventoryItems;


