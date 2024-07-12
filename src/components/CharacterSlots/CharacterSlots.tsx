import Silhouette from '../../assets/hero-silhouette.png';
import './CharacterSlots.css';
import ShortswordImage from '../../assets/item-icons/Lightarmor1.png';
import BackpackImage from '../../assets/item-icons/Backpack1.png';
import LifeElixir from '../../assets/item-icons/Lifeelixir1.png';


const CharacterSlots = () => {
    return (
        <div className="CharacterSlots">

            <div className='consumable-slots'>
                <div className='consumable-slot'>
                    <div>Consumable</div>
                </div>
                <div className='consumable-slot'>
                    <div>Consumable</div>
                </div>
                <div className='consumable-slot'>
                    <div>Consumable</div>
                </div>
                <div className='consumable-slot'>
                    <div>Consumable</div>
                </div>
            </div>
            <div className='armor-slots'>
                <img className="silhouette" src={Silhouette} />
                <div className='armor-slot head'>
                    <input type="text" maxLength={2} />
                    <div className="slot-image">
                        <img src={ShortswordImage} />
                        <div className="slot-image-input-bg"></div>
                    </div>
                    <div className="label">Head</div>
                </div>
                <div className='armor-slot right-arm'>
                    <input type="text" maxLength={2} />
                    <div className="slot-image">
                        <img src={BackpackImage} />
                        <div className="slot-image-input-bg"></div>
                    </div>
                    <div className="label">Right Arm</div>
                </div>
                <div className='armor-slot right-leg'>
                    <input type="text" maxLength={2} />
                    <div className="label">Right Leg</div>
                </div>
                <div className='armor-slot body'>
                    <input type="text" maxLength={2} />
                    <div className="slot-image">
                        <img src={LifeElixir} />
                        <div className="slot-image-input-bg"></div>
                    </div>
                    <div className="label">Body</div>
                </div>
                <div className='armor-slot left-arm'>
                    <input type="text" maxLength={2} />
                    <div className="label">Left Arm</div>
                </div>
                <div className='armor-slot left-leg'>
                    <input type="text" maxLength={2} />
                    <div className="label">Left leg</div>
                </div>
                <div className='armor-slot shield'>
                    <input type="text" maxLength={2} />
                    <div className="label">Shield</div>
                </div>
            </div>
        </div>
    )
    return (
        <div className="CharacterSlots">

            <div className='consumable-slots'>
                <div className='consumable-slot'>
                    <div>Consumable</div>
                </div>
                <div className='consumable-slot'>
                    <div>Consumable</div>
                </div>
                <div className='consumable-slot'>
                    <div>Consumable</div>
                </div>
                <div className='consumable-slot'>
                    <div>Consumable</div>
                </div>
            </div>
            <div className='armor-slots'>
                <img className="silhouette" src={Silhouette} />
                <div className='armor-slot head'>
                    <input type="text" maxLength={2} />
                    <img className='slot-image' src={ShortswordImage} />
                    <div className="label">Head</div>
                </div>
                <div className='armor-slot right-arm'>
                    <input type="text" maxLength={2} />
                    <div className="label">Right Arm</div>
                </div>
                <div className='armor-slot right-leg'>
                    <input type="text" maxLength={2} />
                    <div className="label">Right Leg</div>
                </div>
                <div className='armor-slot body'>
                    <input type="text" maxLength={2} />
                    <div className="label">Body</div>
                </div>
                <div className='armor-slot left-arm'>
                    <input type="text" maxLength={2} />
                    <div className="label">Left Arm</div>
                </div>
                <div className='armor-slot left-leg'>
                    <input type="text" maxLength={2} />
                    <div className="label">Left leg</div>
                </div>
                <div className='armor-slot shield'>
                    <input type="text" maxLength={2} />
                    <div className="label">Shield</div>
                </div>
            </div>
        </div>
    )
}


export default CharacterSlots;