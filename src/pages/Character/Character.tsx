import Inventory from '../../components/Inventory/Inventory';
import Stats from '../../components/Stats/Stats';
import TraitsFeats from '../../components/TraitsFeats/TraitsFeats';
import './Character.css'


const Character = () => {
    return (
        <div className="Character">
            <div className='section'>
                <Inventory />
            </div>

            <hr style={{ border: "1px dashed" }} />

            <div className='section'>
                <TraitsFeats />
            </div>

            <hr style={{ border: "1px dashed" }} />

            <div className='section'>
                <Stats />
            </div>
        </div>
    )
}

export default Character;