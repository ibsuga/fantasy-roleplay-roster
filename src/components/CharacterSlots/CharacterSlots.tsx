import Silhouette from '../../assets/hero-silhouette.png';
import './CharacterSlots.css';
import ShortswordImage from '../../assets/item-icons/Lightarmor1.png';
// import BackpackImage from '../../assets/item-icons/Backpack1.png';
import LifeElixir from '../../assets/item-icons/Lifeelixir1.png';
import ItemSlot from '../ItemSlot/ItemSlot';


const CharacterSlots = () => {
    return (
        <div className="CharacterSlots">
            <div className='consumable-slots'>
                <ItemSlot label="Item" image={LifeElixir} />
                <ItemSlot label="Item" image={LifeElixir} />
                <ItemSlot label="Item" image={LifeElixir} />
                <ItemSlot label="Item" image={LifeElixir} />
                <ItemSlot label="Item" image={LifeElixir} />
                <ItemSlot label="Item" image={LifeElixir} />
                <ItemSlot label="Item" image={LifeElixir} />
                <ItemSlot label="Item" image={LifeElixir} />
                <ItemSlot label="Item" image={LifeElixir} />
                <ItemSlot label="Item" image={LifeElixir} />
            </div>
            <div className='armor-slots'>
                <img className="silhouette" src={Silhouette} />
                <ItemSlot label="Head" image={ShortswordImage} />
                <ItemSlot label="Body" image={ShortswordImage} />
                <ItemSlot label="Left Arm" image={ShortswordImage} />
                <ItemSlot label="Right Arm" image={ShortswordImage} />
                <ItemSlot label="Left Leg" image={ShortswordImage} />
                <ItemSlot label="Right Leg" image={ShortswordImage} />
                <ItemSlot label="Shield" image={ShortswordImage} />
            </div>
        </div>
    )
}


export default CharacterSlots;