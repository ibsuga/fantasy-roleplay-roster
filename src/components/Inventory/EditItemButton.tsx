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
                return <>
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
                </>
            case 'armor':
                return <>
                    <label>ITEM NAME</label>
                    <input type="text" value={itemName} onChange={(e: any) => setItemName(e.target.value)} />

                    <label>ITEM ENCUMBRANCE</label>
                    <input type="text" value={itemEncumbrance} onChange={(e: any) => setItemEncumbrance(e.target.value)} />

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
                </>
            case 'consumable':
                return <>
                    <label>ITEM NAME</label>
                    <input type="text" value={itemName} onChange={(e: any) => setItemName(e.target.value)} />

                    <label>ITEM ENCUMBRANCE</label>
                    <input type="text" value={itemEncumbrance} onChange={(e: any) => setItemEncumbrance(e.target.value)} />

                    <label>AMOUNT</label>
                    <input type="text" value={itemAmount} onChange={(e: any) => setItemAmount(e.target.value)} />

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
                </>
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
                'amount': selectedItem.amount
            }
            updateItem(edited_item);
            setEditItemDialogOpen(false);
        }
    }

    return (
        <>
            <div className="edit-button">
                <FaEdit onClick={() => setEditItemDialogOpen(true)} />
            </div>

            <Dialog
                className={'createItemDialog'}
                header="Edit Item"
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
                    <>
                        <button onClick={handleUpdateItem}> SAVE </button>
                        <button onClick={() => setEditItemDialogOpen(false)}> CLOSE </button>
                    </>
                }
            >
                {getDialogContent()}
            </Dialog>
        </>
    )
}

export default EditItemButton;