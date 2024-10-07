import { Dialog } from "primereact/dialog";
import { useMemo, useState } from "react";
import useItemStore from "../../store/InventoryStore";
import { MultiSelect } from "primereact/multiselect";

import { FaEdit } from "react-icons/fa";

const EditItemButton = (props: {
    id: number,
}) => {

    const items = useItemStore((state) => state.items);
    const updateItem = useItemStore((state) => state.updateItem);
    const selectedItem = items.find(item => item.id === props.id);

    const [itemName, setItemName] = useState<string>('');
    const [itemEncumbrance, setItemEncumbrance] = useState<string | undefined>('');
    const [itemDamage, setItemDamage] = useState<string | undefined>('');
    const [itemDamageSb, setItemDamageSb] = useState<boolean>(false);
    const [itemRange, setItemRange] = useState<string>('');
    const [itemQualities, setItemQualities] = useState<string[] | undefined>([]);
    const [itemFlaws, setItemFlaws] = useState<string[] | undefined>([]);
    const [itemAmount, setItemAmount] = useState<string | undefined>('');

    const [editItemDialogOpen, setEditItemDialogOpen] = useState(false);

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

        switch (selectedItem?.category) {
            case 'weapon':
                return { 'qualities_options': qualities.weapon, 'flaws_options': flaws.weapon };
            case 'armor':
                return { 'qualities_options': qualities.armor, 'flaws_options': flaws.armor };
            case 'consumable':
                return { 'qualities_options': qualities.items, 'flaws_options': flaws.items };
            default:
                return { 'qualities_options': [], 'flaws_options': [] };
        }
    }, [selectedItem?.category])


    //Finds item by id.
    const getDialogContent = () => {
        switch (selectedItem?.category) {
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
                            <label>ENCUMBRANCE</label>
                            <input type="text" placeholder='Item Encumbrance' value={itemEncumbrance} onChange={(e: any) => setItemEncumbrance(e.target.value)} />
                        </div>
                    </div>
                </div>
            case 'consumable':
                return <div className="consumable-dialog">

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
                            <label>ENCUMBRANCE</label>
                            <input type="text" placeholder='Item Encumbrance' value={itemEncumbrance} onChange={(e: any) => setItemEncumbrance(e.target.value)} />
                        </div>
                        <div>
                            <label>AMOUNT</label>
                            <input type="text" placeholder='Item Amount' value={itemAmount} onChange={(e: any) => setItemAmount(e.target.value)} />
                        </div>
                    </div>
                </div>
        }
    }

    const handleUpdateItem = () => {
        if (selectedItem) {
            let edited_item = {
                'id': selectedItem.id,
                'name': itemName,
                'encumbrance': itemEncumbrance,
                'damage': itemDamage ? { value: itemDamage, useSB: itemDamageSb } : undefined,
                'range': itemRange,
                'qualities': itemQualities,
                'flaws': itemFlaws,
                'category': selectedItem.category,
                'availability': selectedItem.availability,
                'amount': selectedItem.amount,
                'description': selectedItem.description
            }
            updateItem(edited_item);
            setEditItemDialogOpen(false);
        }
    }

    //Edit Item Dialog HEADER content depending on selected category.
    const getDialogHeader = () => {
        switch (selectedItem?.category) {
            case 'weapon': return <span>Editing Weapon</span>
            case 'armor': return <span>Editing Armor</span>
            case 'consumable': return <span>Editing Item</span>
            default: return <span></span>
        }
    }

    return (
        <>
            <div className="edit-button">
                <FaEdit onClick={() => setEditItemDialogOpen(true)} />
            </div>

            <Dialog
                className={'createItemDialog'}
                header={getDialogHeader}
                visible={editItemDialogOpen}
                onHide={() => setEditItemDialogOpen(false)}
                onShow={() => {
                    setItemName(selectedItem?.name || '');
                    setItemEncumbrance(selectedItem?.encumbrance || '');
                    setItemDamage(selectedItem?.damage?.value);
                    setItemDamageSb(selectedItem?.damage?.useSB || false);
                    setItemRange(selectedItem?.range || '');
                    setItemQualities(selectedItem?.qualities);
                    setItemFlaws(selectedItem?.flaws);
                    setItemAmount(selectedItem?.amount);
                }}
                footer={
                    <div className="dialog-footer">
                        <button className='footer-button' onClick={handleUpdateItem}> SAVE </button>
                        <button className='footer-button' onClick={() => setEditItemDialogOpen(false)}> CLOSE </button>
                    </div>
                }
            >
                {getDialogContent()}
            </Dialog>
        </>
    )
}

export default EditItemButton;