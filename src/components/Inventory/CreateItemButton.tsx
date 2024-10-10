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
    const [itemQualities, setItemQualities] = useState<{ name: string, description: string }[] | undefined>([]);
    const [itemFlaws, setItemFlaws] = useState<{ name: string, description: string }[] | undefined>([]);
    const [itemAmount, setItemAmount] = useState<any>(null);
    const [itemLocations, setItemLocations] = useState([]);
    const [itemArmourPoints, setItemArmourPoints] = useState<any>(null);
    const [itemCarry, setItemCarry] = useState<any>(null);

    const [weaponRanged, setWeaponRanged] = useState(false);

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
                'isRanged': weaponRanged,
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
        setItemQualities(undefined);
        setItemFlaws(undefined);
        setItemAmount(null);
        setItemSubCategory([]);
        setItemCarry(null);
        setWeaponRanged(false);
        setTimeout(() => {
            setShowDialogContent('');
        }, 300)
    }

    //Item qualities & flaws.
    const { qualities_options, flaws_options } = useMemo(() => {
        setItemQualities(undefined);
        setItemFlaws(undefined);
        const qualities = {
            'weapon': [
                { name: 'Accurate', description: '+10 to any Test when firing this weapon.' },
                { name: 'Blackpowder', description: 'Targets must pass an Average (+20) Cool Test or take a Broken Condition, even if the shot misses.' },
                { name: 'Blast (Rating)', description: 'All within (Rating) yards, suffers the Damage and Conditions the weapon inflicts.' },
                { name: 'Damaging', description: 'Use the higher score from either the units die or the SL to determine the Damage.' },
                { name: 'Defensive', description: 'Gain a bonus of +1 SL to any Melee Test when you oppose an incoming attack.' },
                { name: 'Distract', description: 'Instead of causing Damage, a successful attack with a Distracting weapon can force an opponent back 1 yard per SL by which you win the Opposed Test.' },
                { name: 'Entangle', description: 'Successful hits inflict the Entangled Condition with a Strength value equal to your Strength Characteristic. When Entangling an opponent, you cannot otherwise use the weapon to hit. You can end the Entangling when you wish.' },
                { name: 'Fast', description: 'Choose when in the Initiative sequence to strike. Opponents suffer a penalty of –10 when defending using a Melee Test, given their weapon is slower. Two opponents with Fast weapons fight in Initiative order, relative to each other.' },
                { name: 'Hack', description: 'If you hit an opponent, you Damage a struck piece of armour or shield by 1 point as well as wounding the target.' },
                { name: 'Impact', description: 'On a successful hit, cause additional damage equal to the result of the units die.' },
                { name: 'Impale', description: 'On successful combat tests, Impaling weapons also cause a Critical Hit on any number divisible by 10 (i.e.: 10, 20, 30). For ranged weapons, the ammo is lodged in the target’s body. Arrows and bolts require a Challenging (+0) Heal Test to remove. Bullets require the Surgery Talent to remove. Each unremoved projectile prevents healing of 1 Wound each.' },
                { name: 'Penetrating', description: 'Effective at penetrating armour. Non-metal APs are ignored, and the first point of all other armour is ignored' },
                { name: 'Pistol', description: 'You can use this weapon to attack in Close Combat.' },
                { name: 'Precise', description: 'When attacking, Gain +1 SL to any successful Test.' },
                { name: 'Pummel', description: 'If you score a Head hit, attempt an Opposed Strength/ Endurance Test against the struck opponent. If you win the test, your opponent gains a Stunned Condition' },
                { name: 'Repeater (Rating)', description: 'Your weapon holds (Rating) shots, automatically reloading after each time you fire. When you use all your shots, you must fully reload the weapon using the normal rules.' },
                { name: 'Shield (Rating)', description: 'You count as having (Rating) Armour Points on all locations of your body. If Shield Rating of 2 or higher, you may also Oppose incoming missile shots in your Line of Sight.' },
                { name: 'Trap Blade', description: 'Can trap weapons when scoring a Critical Hit on defence. Instead of rolling the Critical Hit, roll an Opposed Strength Test, adding your SL from the previous Melee Test. On Success, your opponent drops the blade. On Astounding Success, disarm and break the blade. On Failure, disarm fails and combat continues as normal.' },
                { name: 'Unbreakable', description: 'This weapon will not break, corrode, or lose its edge.' },
                { name: 'Wrap', description: 'Melee Tests opposing an attack from a Wrap weapon suffer a penalty of –1 SL, as parried strikes wrap over the top of shields, or around blades.' },
            ],
            'armor': [
                { name: 'Flexible', description: 'Flexible armour can be worn under a layer of non-Flexible armour.You gain the benefit of both.' },
                { name: 'Impenetrable', description: 'All Critical Wounds caused by an odd number to hit you, such as 11 or 33, are ignored.' }
            ],
            'items': [
                { name: 'Durable', description: 'Item can take +Durable Damage points before it suffers any negatives and gains a saving throw of 9+ on a 1d10 roll against instant breakage. This Quality can be taken multiple times, improving the saving throw by 1 (e.g. From 9+ to 8+).' },
                { name: 'Fine', description: 'This Quality is a sign of social status and can be taken multiple times. The higher the quality, the more impressive it seems.' },
                { name: 'Lightweight', description: 'Reduce Encumbrance points by 1.' },
                { name: 'Practical', description: 'A failed test using this item receives +1 SL. If the item is a piece of armour, any penalties for wearing it are reduced by one level (for example from −30 to −20).' }
            ],
        }
        const flaws = {
            'weapon': [
                { name: 'Dangerous', description: 'Any failed test including an 9 (on either 10s or units die) results in a Fumble.' },
                { name: 'Imprecise', description: 'Suffer a penalty of –1 SL when attacking with weapon.' },
                { name: 'Reload (Rating)', description: 'An unloaded weapon with this flaw requires an Extended Ranged Test for the appropriate Weapon Group scoring (Rating) SL to reload. If you are interrupted while reloading, you must start again from scratch.' },
                { name: 'Slow', description: 'Characters using Slow weapons always strike last in a Round, regardless of Initiative order. Further, opponents gain a bonus of +1 SL to any Test to defend against your attacks' },
                { name: 'Tiring', description: 'You only gain the benefit of the Impact and Damaging Weapon Traits on a Turn you Charge.' },
                { name: 'Undamaging', description: 'All APs are doubled against Undamaging weapons. Further, you do not automatically inflict a minimum of 1 Wound on a successful hit in combat.' },
            ],
            'armor': [
                { name: 'Partial', description: 'The armour does not cover the entire hit location. Even rolls on hits or Critical Hits ignore the armour’s APs.' },
                { name: 'Weakpoints', description: 'The armour has small weakpoints. If your opponent has a weapon with the Impale Quality and scores a Critical, the APs of your armour are ignored.' },
            ],
            'items': [
                { name: 'Ugly', description: 'Ugly items attract negative attention, and related Fellowship Tests might even suffer a –10 penalty.' },
                { name: 'Shoddy', description: 'The item breaks when used in any failed Test rolling a double. Similarly, Shoddy armour breaks if any Critical Hit is sustained to a Hit Location it protects' },
                { name: 'Unrealiable', description: 'A failed test using this item receives –1 SL. Further, penalties for wearing Unreliable armour are doubled.' },
                { name: 'Bulky', description: 'Increase Encumbrance by +1. Bulky clothing and armour are Enc 1 even when worn, and Fatigue penalties for armour are doubled.' },
            ],
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
        'weapon': weaponRanged ?
            ['Blackpowder', 'Bow', 'Crossbow', 'Engineering', 'Entangling', 'Explosives', 'Sling', 'Throwing']
            :
            ['Basic', 'Cavalry', 'Fencing', 'Brawling', 'Flail', 'Parry', 'Polearm', 'Two-Handed'],
        'armor': ['Soft Leather', 'Boiled Leather', 'Mail', 'Plate'],
        'items': ['Clothing', 'Accesories', 'Packs & Containers', 'Ammunition', 'Food', 'Drink', 'Tools & Kits', 'Books', 'Documents', 'Animals', 'Vehicles', 'Drugs & Poisons', 'Herbs', 'Draughts', 'Miscellaneous']
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
                                    optionLabel={'name'}
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
                                    optionLabel={'name'}
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

                        <div className="item-sub-category">
                            <div>
                                <label>SUB-CATEGORY</label>
                                <span onClick={() => setWeaponRanged(!weaponRanged)}>{weaponRanged ? 'Ranged' : 'Melee'}</span>
                            </div>

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
                                    optionLabel={'name'}
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
                                    optionLabel={'name'}
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
                                    optionLabel={'name'}
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
                                    optionLabel={'name'}
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