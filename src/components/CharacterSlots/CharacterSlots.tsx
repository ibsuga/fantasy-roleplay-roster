import './CharacterSlots.css';
import ArmorSlot from '../ArmorSlot/ArmorSlot';
import ItemSlot from '../ItemSlot/ItemSlot';
import useItemStore, { itemType } from '../../store/InventoryStore';
import Silhouette from '../../assets/hero-silhouette.png';
import ShortswordImage from '../../assets/item-icons/Lightarmor1.png';
import LifeElixir from '../../assets/item-icons/Lifeelixir1.png';


const CharacterSlots = () => {

    const [items, equippedItems] = useItemStore((state) => [state.items, state.equippedItems]);

    const itemSlots = equippedItems.reduce((acc: any, id: number) => {
        const item = items.find((i) => i.id === id)
        return item ? [...acc, item] : [...acc];
    }, [])

    return (

        <div className="CharacterSlots">

            <div className='title'>
                <span style={{ opacity: '25%', fontSize: '1.25em', alignSelf: 'center', justifySelf: 'end' }}>INVENTORY</span>
                <span> EQUIPMENT </span>
                <span style={{ opacity: '25%', fontSize: '1.25em', alignSelf: 'center', justifySelf: 'start' }}>CONDITIONS</span>
            </div>


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
                <ArmorSlot label="Head" image={ShortswordImage} />
                <ArmorSlot label="Body" image={ShortswordImage} />
                <ArmorSlot label="Left Arm" image={ShortswordImage} />
                <ArmorSlot label="Right Arm" image={ShortswordImage} />
                <ArmorSlot label="Left Leg" image={ShortswordImage} />
                <ArmorSlot label="Right Leg" image={ShortswordImage} />
                <ArmorSlot label="Shield" image={ShortswordImage} />
            </div>
        </div>
    )
}


export default CharacterSlots;