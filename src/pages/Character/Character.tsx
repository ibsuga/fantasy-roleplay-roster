import CharacterSlots from '../../components/CharacterSlots/CharacterSlots';
import Inventory from '../../components/Inventory/Inventory';
import Stats from '../../components/Stats/Stats';
import './Character.css'


const Character = () => {
    return (
        <div className="Character">
            <div className='section'>
                <Inventory />
            </div>
            <div className='section'>
                <CharacterSlots />
            </div>
            <div className='section'>
                <Stats />
            </div>
        </div>
    )
}

export default Character;