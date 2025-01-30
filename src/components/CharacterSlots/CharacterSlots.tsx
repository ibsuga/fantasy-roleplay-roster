import './CharacterSlots.css';
import ArmorSlot from '../ArmorSlot/ArmorSlot';
import ItemSlot from '../ItemSlot/ItemSlot';
import useItemStore, { itemType } from '../../store/InventoryStore';
import Silhouette from '../../assets/hero-silhouette.png';
import ShortswordImage from '../../assets/item-icons/Lightarmor1.png';
import LifeElixir from '../../assets/item-icons/Lifeelixir1.png';
import { useMemo } from 'react';
import WeaponSlot from '../WeaponSlot/WeaponSlot';


const CharacterSlots = () => {

    const [items, equippedItems] = useItemStore((state) => [state.items, state.equippedItems]);

    const equipmentSlots = equippedItems.reduce((acc: any, id: number) => {
        const item = items.find((i) => i.id === id)
        return item ? [...acc, item] : [...acc];
    }, [])


    let itemSlots = equipmentSlots.filter((item) => item.category === 'items');
    let armorSlots = equipmentSlots.filter((item) => item.category === 'armor');

    let weaponSlots = equipmentSlots.filter((item) => item.category === 'weapon');


    let checkArmorPoints = (location: string) => {
        return armorSlots.reduce((acc: number, armorItem: itemType) => {
            if (armorItem.locations?.includes(location)) {
                return Number(acc) + Number(armorItem.armourPoints || 0)
            } else {
                return acc
            }
        }, 0);
    }



    let headArmorPoints = useMemo(() => checkArmorPoints('Head'), [armorSlots]);
    let bodyArmorPoints = useMemo(() => checkArmorPoints('Body'), [armorSlots]);
    let armsArmorPoints = useMemo(() => checkArmorPoints('Arms'), [armorSlots]);
    let legsArmorPoints = useMemo(() => checkArmorPoints('Legs'), [armorSlots]);



    return (

        <div className="CharacterSlots">

            <div className='title'>
                <span style={{ opacity: '25%', fontSize: '1.25em', alignSelf: 'center', justifySelf: 'end' }}>INVENTORY</span>
                <span> EQUIPMENT </span>
                <span style={{ opacity: '25%', fontSize: '1.25em', alignSelf: 'center', justifySelf: 'start' }}>CONDITIONS</span>
            </div>

            <div className='slot-section'>

                <div className='item-slots'>
                    {
                        itemSlots.map((item: itemType, index) =>
                            <ItemSlot
                                key={index}
                                id={item.id}
                                label={item.name}
                                amount={item.amount}
                                image={LifeElixir} />
                        )
                    }
                </div>

                <div className='armor-slots'>
                    <img className="silhouette" src={Silhouette} />
                    <ArmorSlot armourPoints={headArmorPoints} label="Head" />
                    <ArmorSlot armourPoints={bodyArmorPoints} label="Body" />
                    <ArmorSlot armourPoints={armsArmorPoints} label="Arm (L)" />
                    <ArmorSlot armourPoints={armsArmorPoints} label="Arm (R)" />
                    <ArmorSlot armourPoints={legsArmorPoints} label="Leg (L)" />
                    <ArmorSlot armourPoints={legsArmorPoints} label="Leg (R)" />
                    <ArmorSlot armourPoints={1} label="Shield" image={ShortswordImage} />
                </div>
            </div>

            <div className="weapon-slots">
                {
                    weaponSlots.map((item: itemType, index) =>
                        <WeaponSlot
                            key={index}
                            label={item.name}
                            damage={item.damage?.value}
                        />
                    )
                }
            </div>

        </div>
    )
}


export default CharacterSlots;