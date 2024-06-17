import CharacterSlots from '../../components/CharacterSlots/CharacterSlots';
import Inventory from '../../components/Inventory/Inventory';
import Stats from '../../components/Stats/Stats';
import './Character.css'


const Character = () => {
    return (
        <div className="Character">
            <div className='content'>
                <div className='equipment-section'>
                    <Inventory />
                </div>
                <div className='character-section'>
                    <CharacterSlots />
                </div>
                <div className='status-section'>
                    <Stats />
                </div>
            </div>
        </div>
    )
}

export default Character;