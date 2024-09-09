import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { useState, useMemo } from "react";
import { GiChestArmor, GiCrocSword, GiPocketBow, GiPotionBall } from "react-icons/gi";
import InventoryItem from '../InventoryItem/InventoryItem';
import { MultiSelect } from 'primereact/multiselect';


export const InventoryItems = () => {
    const [items, setItems] = useState<any[]>([]);
    const [createItemDialogOpen, setCreateItemDialogOpen] = useState(false);
    const [itemName, setItemName] = useState('');
    const [itemEncumbrance, setItemEncumbrance] = useState('');
    const [itemDamage, setItemDamage] = useState('');
    const [itemDamageSb, setItemDamageSb] = useState(false);
    const [itemRange, setItemRange] = useState('');
    const [itemCategory, setItemCategory] = useState<any>(null);
    const [itemAvailability, setItemAvailability] = useState('');
    const [itemQualities, setItemQualities] = useState('');
    const [itemFlaws, setItemFlaws] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [searchText, setSearchText] = useState('');


    //Item qualities & flaws.
    const { qualities_options, flaws_options } = useMemo(() => {
        const qualities = {
            'weapon': ['damaging', 'fast', 'impale', 'precise'],
            'armor': ['shoddy', 'bulk'],
            'items': ['improvised'],
        }
        const flaws = {
            'weapon': ['undamaging', 'unfast', 'unimpale', 'unprecise'],
            'armor': ['unshoddy', 'unbulk'],
            'items': ['unimprovised'],
        }
        switch (itemCategory) {
            case 'melee':
            case 'ranged':
                return { 'qualities_options': qualities.weapon, 'flaws_options': flaws.weapon };
            case 'armor':
                return { 'qualities_options': qualities.armor, 'flaws_options': flaws.armor };
            case 'consumable':
                return { 'qualities_options': qualities.items, 'flaws_options': flaws.items };
            default:
                return { 'qualities_options': [], 'flaws_options': [] };
        }
    }, [itemCategory])


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
    const itemCategories = ['melee', 'ranged', 'armor', 'consumable'];

    // Filter Items by category.
    let filtered_items;
    if (categoryFilter === '') {
        filtered_items = [...items]
    } else {
        filtered_items = items.filter((item: any) => item.category === categoryFilter);
    }

    // Further filter items by SearchBar string.
    const handleChangeSearchtext = (event: any) => {
        setSearchText(event.target.value);
    }

    if (searchText) {
        filtered_items = filtered_items.filter((item: any) => {
            const item_name = item.name.toLowerCase();
            const search_string = searchText.toLowerCase();
            return item_name.includes(search_string);
        })
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
                <input onChange={handleChangeSearchtext} value={searchText} type="text" placeholder='Find items...' />
                <button onClick={() => {
                    setCreateItemDialogOpen(true);
                    setSearchText('');
                }}>ADD ITEM</button>
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


                <label>ITEM QUALITIES</label>
                <MultiSelect
                    value={itemQualities}
                    onChange={(e: any) => setItemQualities(e.value)}
                    options={qualities_options}
                    showSelectAll={false}
                // optionLabel="name"
                // placeholder="Select Cities"
                />
                <label>ITEM FLAWS</label>

                <MultiSelect
                    value={itemFlaws}
                    onChange={(e: any) => setItemFlaws(e.value)}
                    options={flaws_options}
                    showSelectAll={false}
                />
                {/* <Dropdown
                    value={itemQualities}
                    onChange={(e: any) => setItemQualities(e.value)}
                    options={qualities_options}
                    optionLabel="name"
                    placeholder="Select item traits"
                /> */}
                {/* <label>ITEM flaws</label>
                <Dropdown
                    value={itemFlaws}
                    onChange={(e: any) => setItemFlaws(e.value)}
                    options={flaws_options}
                    optionLabel="name"
                    placeholder="Select item traits"
                /> */}
            </Dialog>
        </>
    )
}

export default InventoryItems;


