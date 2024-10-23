import { Dialog } from "primereact/dialog";
import { useMemo, useState } from "react";
import useItemStore from "../../../store/InventoryStore";
import { MultiSelect } from "primereact/multiselect";
import './InventoryDialog.css';
import { GiPocketBow, GiCrocSword, GiChestArmor, GiPotionBall } from "react-icons/gi";
import { FaRegTrashCan } from "react-icons/fa6";
import PopMenu from "../../PopMenu/PopMenu";
import { Dropdown } from "primereact/dropdown";
import itemsData from './itemsData.json';


const EditItemDialog = (props: {
  id: number,
  children: JSX.Element,
}) => {
  const [items, updateItem, deleteItem] = useItemStore((state) => [
    state.items,
    state.updateItem,
    state.deleteItem,
  ]);
  //Finds item by id.
  const selectedItem = items.find(item => item.id === props.id);

  const [name, setName] = useState<string>('');
  const [encumbrance, setEncumbrance] = useState<string | undefined>('');
  const [damage, setDamage] = useState<string | undefined>('');
  const [description, setDescription] = useState<string | undefined>('');
  const [damageSb, setDamageSb] = useState<boolean>(false);
  const [range, setRange] = useState<string>('');
  const [qualities, setQualities] = useState<{ name: string, description: string; }[] | undefined>([]);
  const [flaws, setFlaws] = useState<{ name: string, description: string; }[] | undefined>([]);
  const [amount, setAmount] = useState<number | undefined>(0);
  const [locations, setLocations] = useState<string[] | undefined>([]);
  const [armourPoints, setArmourPoints] = useState<number | undefined>(0);
  const [subcategory, setSubCategory] = useState<string | undefined>(undefined);
  const [carry, setCarry] = useState<number | undefined>(0);
  const [weaponRanged, setWeaponRanged] = useState<boolean | undefined>(false);

  const [dialogOpen, setDialogOpen] = useState(false);


  //Sets item icon for each category.
  const itemIcons: any = useMemo(() => {
    return {
      'weapon': weaponRanged ? <GiPocketBow /> : <GiCrocSword />,
      'armor': <GiChestArmor />,
      'items': <GiPotionBall />,
    };
  }, [weaponRanged]);

  //Item qualities & flaws.
  const { qualities_options, flaws_options, subcategory_options } = useMemo(() => {
    setQualities(undefined);
    setFlaws(undefined);
    switch (selectedItem?.category) {
      case 'weapon':
        return {
          'qualities_options': itemsData.qualities.weapon,
          'flaws_options': itemsData.flaws.weapon,
          'subcategory_options': weaponRanged ? itemsData.subcategories.weapon.ranged : itemsData.subcategories.weapon.melee
        };
      case 'armor':
        return {
          'qualities_options': itemsData.qualities.armor,
          'flaws_options': itemsData.flaws.armor,
          'subcategory_options': itemsData.subcategories.armor
        };
      case 'items':
        return {
          'qualities_options': itemsData.qualities.items,
          'flaws_options': itemsData.flaws.items,
          'subcategory_options': itemsData.subcategories.items
        };
      default:
        return { 'qualities_options': [], 'flaws_options': [], 'subcategory_options': [] };
    }
  }, [selectedItem?.category, weaponRanged]);

  //Armor Item Locations
  const armorLocations = ['Head', 'Body', 'Arms', 'Legs'];


  const handleUpdateItem = () => {
    if (selectedItem) {
      let edited_item = {
        'id': selectedItem.id,
        'name': name,
        'encumbrance': encumbrance,
        'damage': damage ? { value: damage, useSB: damageSb } : undefined,
        'range': range,
        'qualities': qualities,
        'flaws': flaws,
        'category': selectedItem.category,
        'subCategory': subcategory,
        'amount': amount,
        'locations': locations,
        'armourPoints': armourPoints,
        'carry': carry,
        'isRanged': weaponRanged,
        'container_id': selectedItem.container_id,
        'description': description
      };
      updateItem(edited_item);
      setDialogOpen(false);
    }
  };

  const handleDeleteItem = () => {
    deleteItem(props.id);
    setDialogOpen(false);
  };


  const getDialogStats = (category: string | undefined) => {
    switch (category) {
      case 'weapon':
        return (
          <>
            <div className="item-stat">
              <label>DAMAGE</label>
              <input type="text" placeholder='DMG' value={damage} onChange={(e: any) => setDamage(e.target.value)} />
              <label>Use SB</label>
              <div className="damage-sb">
                <input type="checkbox" checked={damageSb} onChange={(e: any) => setDamageSb(e.target.checked)} />
              </div>
            </div>
            <div className="item-stat">
              <label>RANGE</label>
              <input type="text" placeholder='RNG' value={range} onChange={(e: any) => setRange(e.target.value)} />
            </div>
            <div className="item-stat">
              <label>SUB-CATEGORY</label>
              <Dropdown
                className="sub-category-select"
                placeholder="Sub-category"
                value={subcategory}
                options={subcategory_options}
                onChange={(e) => setSubCategory(e.target.value)}
              />
            </div>
            <div className="item-stat">
              <label>ENCUMBRANCE</label>
              <input type="text" placeholder='ENC' value={encumbrance} onChange={(e: any) => setEncumbrance(e.target.value)} />
            </div>
          </>
        );
      case 'armor':
        return (
          <>
            <div className="item-stat">
              <label>LOCATIONS</label>
              <MultiSelect
                placeholder="Select locations"
                value={locations}
                onChange={(e) => setLocations(e.value)}
                options={armorLocations}
                showSelectAll={false}
              />
            </div>
            <div className="item-stat">
              <label>ARMOUR POINTS</label>
              <input type="text" placeholder="Set Armour Points" value={armourPoints} onChange={(e: any) => setArmourPoints(e.target.value)} />
            </div>
            <div className="item-stat">
              <label>SUB-CATEGORY</label>
              <Dropdown
                className="sub-category-select"
                placeholder="Sub-category"
                value={subcategory}
                options={subcategory_options}
                onChange={(e) => setSubCategory(e.target.value)}
              />
            </div>
            <div className="item-stat">
              <label>ENCUMBRANCE</label>
              <input type="text" placeholder='Item Encumbrance' value={encumbrance} onChange={(e: any) => setEncumbrance(e.target.value)} />
            </div>
          </>
        );
      case 'items':
        return (
          <>
            <div className="item-stat">
              <label>AMOUNT</label>
              <input type="text" placeholder='Item Amount' value={amount} onChange={(e: any) => setAmount(e.target.value)} />
            </div>
            <div className="item-stat">
              <label>CARRY</label>
              <input type="text" placeholder="Carry Amount" value={carry} onChange={(e: any) => setCarry(e.target.value)} />
            </div>
            <div className="item-stat">
              <label>SUB-CATEGORY</label>
              <MultiSelect
                placeholder="Select Sub-Category"
                value={subcategory}
                onChange={(e) => setSubCategory(e.value)}
                options={subcategory_options}
                showSelectAll={false}
              />
            </div>
            <div className="item-stat">
              <label>ENCUMBRANCE</label>
              <input type="text" placeholder='Item Encumbrance' value={encumbrance} onChange={(e: any) => setEncumbrance(e.target.value)} />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="edit-button" onClick={() => setDialogOpen(true)}>
        {props.children}
      </div>

      <Dialog
        className={'inventoryDialog'}
        visible={dialogOpen}
        onHide={() => setDialogOpen(false)}
        onShow={() => {
          setName(selectedItem?.name || '');
          setEncumbrance(selectedItem?.encumbrance || '');
          setDamage(selectedItem?.damage?.value);
          setDamageSb(selectedItem?.damage?.useSB || false);
          setRange(selectedItem?.range || '');
          setQualities(selectedItem?.qualities);
          setFlaws(selectedItem?.flaws);
          setAmount(selectedItem?.amount);
          setLocations(selectedItem?.locations);
          setArmourPoints(selectedItem?.armourPoints);
          setSubCategory(selectedItem?.subCategory);
          setCarry(selectedItem?.carry);
          setWeaponRanged(selectedItem?.isRanged);
          setDescription(selectedItem?.description || '');
        }}
        footer={
          <div className="dialog-footer">
            <button className='footer-button' onClick={handleUpdateItem}> SAVE </button>
            <button className='footer-button' onClick={() => setDialogOpen(false)}> CLOSE </button>
            <button className='footer-button delete-button' onClick={() => handleDeleteItem()}><FaRegTrashCan /></button>
          </div>
        }
      >
        <div className={`${selectedItem?.category}-dialog`}>
          <div className="header-section">
            <div className='item-icon'>
              <div>{itemIcons[selectedItem?.category || 'items']}</div>
            </div>
            <div className="item-name">
              <input type="text" placeholder='Item name' value={name} onChange={(e: any) => setName(e.target.value)} />
            </div>
          </div>
          <hr />
          <div className="stats-section">
            {getDialogStats(selectedItem?.category)}
          </div>
          <hr />
          <div className="traits-section">
            <div className="qualities-select">
              <label>QUALITIES</label>
              <MultiSelect
                placeholder="Select qualities"
                value={qualities}
                onChange={(e: any) => setQualities(e.value)}
                options={qualities_options}
                optionLabel={"name"}
                showSelectAll={false}
              />
            </div>
            <div className="flaws-select">
              <label>FLAWS</label>
              <MultiSelect
                placeholder="Select flaws"
                value={flaws}
                onChange={(e: any) => setFlaws(e.value)}
                options={flaws_options}
                optionLabel={'name'}
                showSelectAll={false}
              />
            </div>
            {
              (qualities && qualities.length > 0)
                ?
                <span className='trait-qualities'>
                  {
                    qualities?.map((quality) => {
                      return (
                        <span className='quality'>
                          <PopMenu
                            trigger={quality.name}
                            content={
                              <div className="quality-tooltip">
                                <div className="header">
                                  <span>Quality</span>
                                  <div>{quality.name}</div>
                                  <hr />
                                </div>
                                <div className="description">
                                  <div>{quality.description}</div>
                                </div>
                              </div>
                            }
                            positions={['top']}
                            align="center"
                          />
                        </span>
                      );
                    })
                  }
                </span>
                :
                <span className="placeholder">No qualities</span>
            }
            {
              (flaws && flaws.length > 0)
                ?
                <span className='trait-flaws'>
                  {
                    flaws.map((flaw) => {
                      return (
                        <span className='flaw'>
                          <PopMenu
                            trigger={flaw.name}
                            content={
                              <div className="flaw-tooltip">
                                <div className="header">
                                  <span>Flaw</span>
                                  <div>{flaw.name}</div>
                                  <hr />
                                </div>
                                <div className="description">
                                  <div>{flaw.description}</div>
                                </div>
                              </div>
                            }
                            positions={['top']}
                            align="center"
                          />
                        </span>
                      );
                    })
                  }
                </span>
                :
                <span className="placeholder">No flaws</span>
            }
          </div>

          <hr />
          <div className="description-section">
            <div className='item-description'>
              <textarea
                placeholder='Add item description.'
                value={description}
                spellCheck={false}
                rows={2}
                onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>
          </div>
          <hr />
        </div>
      </Dialog>
    </>
  );
};

export default EditItemDialog;