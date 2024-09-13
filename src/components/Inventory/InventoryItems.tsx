import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { useState, useMemo } from "react";
import { GiChestArmor, GiCrocSword, GiPocketBow, GiPotionBall } from "react-icons/gi";
import InventoryItem from '../InventoryItem/InventoryItem';
import { MultiSelect } from 'primereact/multiselect';
import useItemStore from '../../store/InventoryStore';


export const InventoryItems = () => {
    // const [items, setItems] = useState<any[]>([]);
    const [createItemDialogOpen, setCreateItemDialogOpen] = useState(false);
    const [itemName, setItemName] = useState('');
    const [itemEncumbrance, setItemEncumbrance] = useState();
    const [itemDamage, setItemDamage] = useState();
    const [itemDamageSb, setItemDamageSb] = useState(false);
    const [itemRange, setItemRange] = useState('');
    const [itemCategory, setItemCategory] = useState<any>(null);
    const [itemAvailability, setItemAvailability] = useState('');
    const [itemQualities, setItemQualities] = useState([]);
    const [itemFlaws, setItemFlaws] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState('');
    const [searchText, setSearchText] = useState('');

    const items = useItemStore((state) => state.items);
    const addItem = useItemStore((state) => state.addItem);

    //Item qualities & flaws.
    const { qualities_options, flaws_options } = useMemo(() => {
        setItemQualities([]);
        setItemFlaws([]);
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
            let new_item = {
                'id': Date.now(),
                'name': itemName,
                'encumbrance': itemEncumbrance,
                'damage': itemDamage ? { value: itemDamage, useSB: itemDamageSb } : undefined,
                'range': itemRange,
                'category': itemCategory,
                'availability': itemAvailability,
                'qualities': itemQualities,
                'flaws': itemFlaws,
            }
            addItem(new_item);
            handleClose();
            setCreateItemDialogOpen(false);
        }
    }

    //Category Dropdown options.
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

    //Empty parameters if Create Item Dialog is closed without saving.
    const handleClose = () => {
        setItemName('');
        setItemEncumbrance(undefined);
        setItemDamage(undefined);
        setItemRange('');
        setItemCategory(null);
        setItemAvailability('');
        setItemQualities([]);
        setItemFlaws([]);
        setCreateItemDialogOpen(false);
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
                            id={item.id}
                            name={item.name}
                            encumbrance={item.encumbrance}
                            damage={item.damage}
                            range={item.range}
                            category={item.category}
                            availability={item.availability}
                            qualities={item.qualities}
                            flaws={item.flaws}
                        />
                    )
                }
            </div>

            <Dialog
                className={'createItemDialog'}
                header="Create Item"
                visible={createItemDialogOpen}
                onHide={() => {
                    if (!createItemDialogOpen) return;
                    setCreateItemDialogOpen(false);
                    handleClose();
                }}
                footer={
                    <>
                        <button onClick={handleCreateItem} disabled={!itemName}>SAVE ITEM</button>
                        <button onClick={handleClose}>
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

                <div className='item-traits'>
                    <div>
                        <label>ITEM QUALITIES</label>
                        <MultiSelect
                            value={itemQualities}
                            onChange={(e: any) => setItemQualities(e.value)}
                            options={qualities_options}
                            showSelectAll={false}
                        />
                    </div>
                    <div>
                        <label>ITEM FLAWS</label>
                        <MultiSelect
                            value={itemFlaws}
                            onChange={(e: any) => setItemFlaws(e.value)}
                            options={flaws_options}
                            showSelectAll={false}
                        />
                    </div>
                </div>

            </Dialog>
        </>
    )
}

export default InventoryItems;


