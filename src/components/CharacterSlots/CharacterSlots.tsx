import Silhouette from '../../assets/hero-silhouette.png';
import './CharacterSlots.css';

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