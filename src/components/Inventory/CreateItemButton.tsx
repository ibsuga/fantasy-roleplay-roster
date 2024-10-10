import { Dialog } from "primereact/dialog";
import { useMemo, useState } from "react";
import useItemStore from "../../store/InventoryStore";
import { MultiSelect } from "primereact/multiselect";
import { GiAxeSword, GiLeatherArmor, GiStandingPotion } from "react-icons/gi";
import { IoArrowBackCircleSharp } from "react-icons/io5";



const CreateItemButton = () => {
    //Dialog state.
    const [createItemDialogOpen, setCreateItemDialogOpen] = useState(false);

    //Item states.
    const [itemName, setItemName] = useState('');
    const [itemEncumbrance, setItemEncumbrance] = useState('');
    const [itemDamage, setItemDamage] = useState('');
    const [itemDamageSb, setItemDamageSb] = useState(false);
    const [itemRange, setItemRange] = useState('');
    const [itemCategory, setItemCategory] = useState<any>(null);
    const [itemSubCategory, setItemSubCategory] = useState<any>([]);
    const [itemAvailability, setItemAvailability] = useState('');
    const [itemQualities, setItemQualities] = useState([]);
    const [itemFlaws, setItemFlaws] = useState([]);
    const [itemAmount, setItemAmount] = useState<any>(null);
    const [itemLocations, setItemLocations] = useState([]);
    const [itemArmourPoints, setItemArmourPoints] = useState<any>(null);
    const [itemCarry, setItemCarry] = useState<any>(null);

    const [showDialogContent, setShowDialogContent] = useState('');

    //Store
    const addItem = useItemStore((state) => state.addItem);

    //Handles item creation.
    const handleCreateItem = () => {
        if (itemName !== '') {
            let new_item = {
                'id': Date.now(),
                'name': itemName,
                'encumbrance': itemEncumbrance,
                'damage': itemDamage ? { value: itemDamage, useSB: itemDamageSb } : undefined,
                'range': itemRange,
                'category': itemCategory,
                'subCategory': itemSubCategory,
                'availability': itemAvailability,
                'qualities': itemQualities,
                'flaws': itemFlaws,
                'amount': itemAmount,
                'locations': itemLocations,
                'carry': itemCarry,
                'armourPoints': itemArmourPoints,
            }
            addItem(new_item);
            handleClose();
            setCreateItemDialogOpen(false);
        }
    }

    //Handles closing dialog without saving item.
    const handleClose = () => {
        setCreateItemDialogOpen(false);
        setItemName('');
        setItemEncumbrance('');
        setItemDamage('');
        setItemRange('');
        setItemCategory(null);
        setItemAvailability('');
        setItemQualities([]);
        setItemFlaws([]);
        setItemAmount(null);
        setItemSubCategory([]);
        setItemCarry(null);
        setTimeout(() => {
            setShowDialogContent('');
        }, 300)
    }

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
            case 'weapon':
                return { 'qualities_options': qualities.weapon, 'flaws_options': flaws.weapon };
            case 'armor':
                return { 'qualities_options': qualities.armor, 'flaws_options': flaws.armor };
            case 'items':
                return { 'qualities_options': qualities.items, 'flaws_options': flaws.items };
            default:
                return { 'qualities_options': [], 'flaws_options': [] };
        }
    }, [itemCategory])

    //Item Sub Category options
    const subCategory: any = {
        'weapon': ['Basic', 'Cavalry', 'Fencing', 'Brawling', 'Flail', 'Parry', 'Polearm', 'Two-Handed'],
        'armor': ['Soft Leather', 'Boiled Leather', 'Mail', 'Plate'],
        'items': ['Consumable', 'Container']
    }
    let subCategoryOptions = subCategory[itemCategory] || [];

    //Armor Item Locations
    const armorLocations = ['Head', 'Body', 'Arms', 'Legs'];

    //Create Item Dialog content depending on selected item category.
    const getDialogContent = () => {
        switch (showDialogContent) {
            case 'weapon':
                return <div className="weapon-dialog">

                    <div className="top-section">
                        <div className="item-name">
                            <label>NAME</label>
                            <input type="text" placeholder='Item name' value={itemName} onChange={(e: any) => setItemName(e.target.value)} />
                        </div>
                    </div>

                    <div className="mid-section">
                        <div className='item-traits'>
                            <div>
                                <label className="qualities">QUALITIES</label>
                                <MultiSelect
                                    placeholder="Select qualities"
                                    value={itemQualities}
                                    onChange={(e: any) => setItemQualities(e.value)}
                                    options={qualities_options}
                                    showSelectAll={false}
                                />
                            </div>
                            <div>
                                <label className="flaws">FLAWS</label>
                                <MultiSelect
                                    placeholder="Select flaws"
                                    value={itemFlaws}
                                    onChange={(e: any) => setItemFlaws(e.value)}
                                    options={flaws_options}
                                    showSelectAll={false}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bottom-section">
                        <div>
                            <div className="item-damage">
                                <label>DAMAGE</label>
                                <div>
                                    <input type="checkbox" checked={itemDamageSb} onChange={(e: any) => setItemDamageSb(e.target.checked)} />
                                    <label>Use SB</label>
                                </div>
                            </div>
                            <input type="number" placeholder='Item Damage' value={itemDamage} onChange={(e: any) => setItemDamage(e.target.value)} />
                        </div>
                        <div>
                            <label>RANGE</label>
                            <input type="text" placeholder='Item Range' value={itemRange} onChange={(e: any) => setItemRange(e.target.value)} />
                        </div>
                        <div>
                            <label>SUB-CATEGORY</label>
                            <MultiSelect
                                placeholder="Select Sub-Category"
                                value={itemSubCategory}
                                onChange={(e) => setItemSubCategory(e.value)}
                                options={subCategoryOptions}
                                showSelectAll={false}
                            />
                        </div>
                        <div>
                            <label>ENCUMBRANCE</label>
                            <input type="text" placeholder='Item Encumbrance' value={itemEncumbrance} onChange={(e: any) => setItemEncumbrance(e.target.value)} />
                        </div>
                    </div>
                </div>
            case 'armor':
                return <div className="armor-dialog">

                    <div className="top-section">
                        <div className="item-name">
                            <label>NAME</label>
                            <input type="text" placeholder='Item name' value={itemName} onChange={(e: any) => setItemName(e.target.value)} />
                        </div>
                    </div>

                    <div className="mid-section">
                        <div className='item-traits'>
                            <div>
                                <label className="qualities">QUALITIES</label>
                                <MultiSelect
                                    placeholder="Select qualities"
                                    value={itemQualities}
                                    onChange={(e: any) => setItemQualities(e.value)}
                                    options={qualities_options}
                                    showSelectAll={false}
                                />
                            </div>
                            <div>
                                <label className="flaws">FLAWS</label>
                                <MultiSelect
                                    placeholder="Select flaws"
                                    value={itemFlaws}
                                    onChange={(e: any) => setItemFlaws(e.value)}
                                    options={flaws_options}
                                    showSelectAll={false}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bottom-section">
                        <div>
                            <label>LOCATIONS</label>
                            <MultiSelect
                                placeholder="Select locations"
                                value={itemLocations}
                                onChange={(e) => setItemLocations(e.value)}
                                options={armorLocations}
                                showSelectAll={false}
                            />
                        </div>
                        <div>
                            <label>ARMOUR POINTS</label>
                            <input type="number" placeholder="Set Armour Points" value={itemArmourPoints} onChange={(e) => setItemArmourPoints(e.target.value)} />
                        </div>
                        <div>
                            <label>SUB-CATEGORY</label>
                            <MultiSelect
                                placeholder="Select Sub-Category"
                                value={itemSubCategory}
                                onChange={(e) => setItemSubCategory(e.value)}
                                options={subCategoryOptions}
                                showSelectAll={false}
                            />
                        </div>
                        <div>
                            <label>ENCUMBRANCE</label>
                            <input type="text" placeholder='Item Encumbrance' value={itemEncumbrance} onChange={(e: any) => setItemEncumbrance(e.target.value)} />
                        </div>
                    </div>
                </div>
            case 'items':
                return <div className="items-dialog">

                    <div className="top-section">
                        <div className="item-name">
                            <label>NAME</label>
                            <input type="text" placeholder='Item name' value={itemName} onChange={(e: any) => setItemName(e.target.value)} />
                        </div>
                    </div>

                    <div className="mid-section">
                        <div className='item-traits'>
                            <div>
                                <label className="qualities">QUALITIES</label>
                                <MultiSelect
                                    placeholder="Select qualities"
                                    value={itemQualities}
                                    onChange={(e: any) => setItemQualities(e.value)}
                                    options={qualities_options}
                                    showSelectAll={false}
                                />
                            </div>
                            <div>
                                <label className="flaws">FLAWS</label>
                                <MultiSelect
                                    placeholder="Select flaws"
                                    value={itemFlaws}
                                    onChange={(e: any) => setItemFlaws(e.value)}
                                    options={flaws_options}
                                    showSelectAll={false}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bottom-section">
                        <div>
                            <label>AMOUNT</label>
                            <input type="text" placeholder='Item Amount' value={itemAmount} onChange={(e: any) => setItemAmount(e.target.value)} />
                        </div>
                        <div>
                            <label>CARRY</label>
                            <input type="text" placeholder="Carry Amount" value={itemCarry} onChange={(e: any) => setItemCarry(e.target.value)} />
                        </div>
                        <div>
                            <label>SUB-CATEGORY</label>
                            <MultiSelect
                                placeholder="Select Sub-Category"
                                value={itemSubCategory}
                                onChange={(e) => setItemSubCategory(e.value)}
                                options={subCategoryOptions}
                                showSelectAll={false}
                            />
                        </div>
                        <div>
                            <label>ENCUMBRANCE</label>
                            <input type="text" placeholder='Item Encumbrance' value={itemEncumbrance} onChange={(e: any) => setItemEncumbrance(e.target.value)} />
                        </div>
                    </div>
                </div>
            default:
                return <div className="item-category-select">
                    <div className="category-button" onClick={() => {
                        setShowDialogContent('weapon')
                        setItemCategory('weapon');
                    }}>
                        <div className="category-background"></div>
                        <GiAxeSword />
                        <span className="category-label">Weapon</span>
                    </div>

                    <div className="category-button" onClick={() => {
                        setShowDialogContent('armor');
                        setItemCategory('armor');
                    }} >
                        <div className="category-background"></div>
                        <GiLeatherArmor />
                        <span className="category-label">Armor</span>
                    </div>
                    <div className="category-button" onClick={() => {
                        setShowDialogContent('items');
                        setItemCategory('items');
                    }}>
                        <div className="category-background"></div>
                        <GiStandingPotion />
                        <span className="category-label">Items</span>
                    </div>
                </div>
        }
    }

    //Create Item Dialog HEADER content depending on selected category.
    const getDialogHeader = () => {
        switch (showDialogContent) {
            case 'weapon': return <span>New Weapon</span>
            case 'armor': return <span>New Armor</span>
            case 'items': return <span>New Item</span>
            default: return <span>Choose Category</span>
        }
    }

    return (
        <>
            <button className='create-item-button' onClick={() => setCreateItemDialogOpen(true)}> ADD ITEM </button>
            <Dialog
                className={'createItemDialog'}
                header={
                    <div className="dialog-header">
                        <div>
                            {
                                showDialogContent &&
                                <button className='back-button'
                                    onClick={() => setShowDialogContent('')}>
                                    <IoArrowBackCircleSharp />
                                </button>
                            }
                        </div>
                        <span>{getDialogHeader()}</span>
                    </div>
                }
                visible={createItemDialogOpen}
                onHide={handleClose}
                footer={
                    <div className="dialog-footer">
                        <button className='footer-button' onClick={handleCreateItem} disabled={!itemName}> Save </button>
                        <button className='footer-button' onClick={handleClose}> Close </button>
                    </div>
                }
                closable={false}
                draggable={false}
                resizable={false}
            >
                {getDialogContent()}
            </Dialog>
        </>
    )
}

export default CreateItemButton;