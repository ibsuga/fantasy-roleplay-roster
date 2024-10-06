import { Dialog } from "primereact/dialog";
import { useMemo, useState } from "react";
import useItemStore from "../../store/InventoryStore";
import { MultiSelect } from "primereact/multiselect";
import { GiAxeSword, GiLeatherArmor, GiStandingPotion } from "react-icons/gi";
import { IoArrowBackCircleSharp } from "react-icons/io5";
// import { Dropdown } from "primereact/dropdown";



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
    const [itemAvailability, setItemAvailability] = useState('');
    const [itemQualities, setItemQualities] = useState([]);
    const [itemFlaws, setItemFlaws] = useState([]);
    const [itemAmount, setItemAmount] = useState('');

    const [showDialogContent, setShowDialogContent] = useState('');

    //Store
    const addItem = useItemStore((state) => state.addItem);

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
        setItemAmount('');
        setTimeout(() => {
            setShowDialogContent('');
        }, 300)
    }

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
                'availability': itemAvailability,
                'qualities': itemQualities,
                'flaws': itemFlaws,
                'amount': itemAmount,
            }
            addItem(new_item);
            handleClose();
            setCreateItemDialogOpen(false);
        }
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
            case 'consumable':
                return { 'qualities_options': qualities.items, 'flaws_options': flaws.items };
            default:
                return { 'qualities_options': [], 'flaws_options': [] };
        }
    }, [itemCategory])



    //Create Item Dialog content depending on selected item category.
    const getDialogContent = () => {
        switch (showDialogContent) {
            case 'weapon':
                return <div className="weapon-dialog">
                    <div className="item-name">
                        <label>NAME</label>
                        <input type="text" value={itemName} onChange={(e: any) => setItemName(e.target.value)} />
                    </div>

                    <div className='item-traits'>
                        <div>
                            <label>QUALITIES</label>
                            <MultiSelect
                                value={itemQualities}
                                onChange={(e: any) => setItemQualities(e.value)}
                                options={qualities_options}
                                showSelectAll={false}
                            />
                        </div>
                        <div>
                            <label>FLAWS</label>
                            <MultiSelect
                                value={itemFlaws}
                                onChange={(e: any) => setItemFlaws(e.value)}
                                options={flaws_options}
                                showSelectAll={false}
                            />
                        </div>
                    </div>

                    <div className="item-bottom-section">
                        <div>
                            <div className="item-damage">
                                <label>DAMAGE</label>
                                <div>
                                    <input type="checkbox" checked={itemDamageSb} onChange={(e: any) => setItemDamageSb(e.target.checked)} />
                                    <label>Use SB</label>
                                </div>
                            </div>
                            <input type="number" value={itemDamage} onChange={(e: any) => setItemDamage(e.target.value)} />
                        </div>
                        <div>
                            <label>RANGE</label>
                            <input type="text" value={itemRange} onChange={(e: any) => setItemRange(e.target.value)} />
                        </div>
                        <div>
                            <label>ENCUMBRANCE</label>
                            <input type="text" value={itemEncumbrance} onChange={(e: any) => setItemEncumbrance(e.target.value)} />
                        </div>
                    </div>
                </div>
            case 'armor':
                return <div className="armor-dialog">
                    <div className="item-name">
                        <label>ITEM NAME</label>
                        <input type="text" value={itemName} onChange={(e: any) => setItemName(e.target.value)} />
                    </div>
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
                    <div className="item-bottom-section">
                        <div>
                            <label>ITEM ENCUMBRANCE</label>
                            <input type="text" value={itemEncumbrance} onChange={(e: any) => setItemEncumbrance(e.target.value)} />
                        </div>
                    </div>
                </div>
            case 'consumable':
                return <div className="consumable-dialog">
                    <div className="item-name">
                        <label>ITEM NAME</label>
                        <input type="text" value={itemName} onChange={(e: any) => setItemName(e.target.value)} />
                    </div>
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
                    <div className="item-bottom-section">
                        <div>
                            <label>ITEM ENCUMBRANCE</label>
                            <input type="text" value={itemEncumbrance} onChange={(e: any) => setItemEncumbrance(e.target.value)} />
                        </div>
                        <div>
                            <label>AMOUNT</label>
                            <input type="text" value={itemAmount} onChange={(e: any) => setItemAmount(e.target.value)} />
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
                        setShowDialogContent('consumable');
                        setItemCategory('consumable');
                    }}>
                        <div className="category-background"></div>
                        <GiStandingPotion />
                        <span className="category-label">Items</span>
                    </div>
                </div>
        }
    }

    //Create Item Dialog Header content depending on selected category.
    const getDialogHeader = () => {
        switch (showDialogContent) {
            case 'weapon': return <span>New Weapon</span>
            case 'armor': return <span>New Armor</span>
            case 'consumable': return <span>New Item</span>
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
            >
                {getDialogContent()}
            </Dialog>
        </>
    )
}

export default CreateItemButton;