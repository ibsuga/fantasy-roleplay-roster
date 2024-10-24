import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";
import { useMemo, useState } from "react";
import { GiAxeSword, GiLeatherArmor, GiStandingPotion } from "react-icons/gi";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import useItemStore, { containerType } from "../../../store/InventoryStore";
import PopMenu from "../../PopMenu/PopMenu";
import './InventoryDialog.css';
import itemsData from './itemsData.json';


const CreateItemDialog = () => {
  //Store
  const containers = useItemStore((state) => state.containers);
  const addItem = useItemStore((state) => state.addItem);

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
  const [category, setCategory] = useState<any>(null);
  const [subcategory, setSubCategory] = useState<string | undefined>(undefined);
  const [carry, setCarry] = useState<number | undefined>(0);
  const [container, setContainer] = useState<containerType | null>(null);
  const [weaponRanged, setWeaponRanged] = useState<boolean | undefined>(false);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogSection, setDialogSection] = useState<string | null>(null);


  //Handles closing dialog without saving item.
  const handleClose = () => {
    // setInventoryDialogOpen(false);
    setDialogOpen(false);
    setName('');
    setEncumbrance('');
    setDamage('');
    setRange('');
    setCategory(null);
    setQualities(undefined);
    setFlaws(undefined);
    setAmount(0);
    setSubCategory(undefined);
    setCarry(0);
    setWeaponRanged(false);
    setContainer(null);
    setTimeout(() => {
      setDialogSection('');
    }, 300);
  };

  //Handles item creation.
  const handleCreateItem = () => {
    if (name !== '') {
      let new_item = {
        'id': Date.now(),
        'name': name,
        'encumbrance': encumbrance,
        'damage': damage ? { value: damage, useSB: damageSb } : undefined,
        'range': range,
        'category': category,
        'subCategory': subcategory,
        'qualities': qualities,
        'flaws': flaws,
        'amount': amount,
        'locations': locations,
        'carry': carry,
        'armourPoints': armourPoints,
        'isRanged': weaponRanged,
        'container_id': container ? container?.id : -1,
      };
      addItem(new_item);
      handleClose();
    }
  };

  //Item qualities & flaws.
  const { qualities_options, flaws_options, subcategory_options } = useMemo(() => {
    setQualities(undefined);
    setFlaws(undefined);
    switch (category) {
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
  }, [category, weaponRanged]);

  //Armor Item Locations
  const armorLocations = ['Head', 'Body', 'Arms', 'Legs'];


  //Create Item Dialog HEADER content depending on selected category.
  const getDialogHeader = () => {
    switch (dialogSection) {
      case 'weapon': return <span>New Weapon</span>;
      case 'armor': return <span>New Armor</span>;
      case 'items': return <span>New Item</span>;
      default: return <span>Choose Category</span>;
    }
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
              <span onClick={() => setWeaponRanged(!weaponRanged)}>{weaponRanged ? 'Ranged' : 'Melee'}</span>
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
      <button className='toolbar-button' onClick={() => setDialogOpen(true)}> ADD ITEM </button>
      <Dialog
        className={'inventoryDialog'}
        visible={dialogOpen}
        onHide={handleClose}
        footer={
          <div className="dialog-footer">
            <button className='footer-button' onClick={handleCreateItem} disabled={!name}> Save </button>
            <button className='footer-button' onClick={handleClose}> Close </button>
          </div>
        }
        closable={false}
        draggable={false}
        resizable={false}
      >
        {
          dialogSection
            ?
            <div className={`${category}-dialog`}>
              <div className="header-section">
                <span>{getDialogHeader()}</span>
                {
                  dialogSection &&
                  <button className='back-button'
                    onClick={() => setDialogSection('')}>
                    <IoArrowBackCircleSharp />
                  </button>
                }
                <div className="item-name">
                  <input type="text" placeholder='Item name' value={name} onChange={(e: any) => setName(e.target.value)} />
                </div>
              </div>
              <hr />
              <div className="stats-section">
                {getDialogStats(category)}
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

              <div className="container-section">
                <label>CONTAINER</label>
                <Dropdown
                  placeholder="Place in a bag"
                  value={container}
                  onChange={(e) => { setContainer(e.target.value); }}
                  options={containers}
                />
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
            :
            <div className="item-category-select">
              <div className="category-button" onClick={() => {
                setDialogSection('weapon');
                setCategory('weapon');
              }}>
                <div className="category-background"></div>
                <GiAxeSword />
                <span className="category-label">Weapon</span>
              </div>

              <div className="category-button" onClick={() => {
                setDialogSection('armor');
                setCategory('armor');
              }} >
                <div className="category-background"></div>
                <GiLeatherArmor />
                <span className="category-label">Armor</span>
              </div>
              <div className="category-button" onClick={() => {
                setDialogSection('items');
                setCategory('items');
              }}>
                <div className="category-background"></div>
                <GiStandingPotion />
                <span className="category-label">Items</span>
              </div>
            </div>
        }
      </Dialog>
    </>
  );
};

export default CreateItemDialog;