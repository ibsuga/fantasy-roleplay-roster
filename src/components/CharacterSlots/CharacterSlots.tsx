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
                <div className='armor-left'>
                    <div className='armor-slot'>
                        <div>Head</div>
                    </div>
                    <div className='armor-slot'>
                        <div>Right Arm</div>
                    </div>
                    <div className='armor-slot'>
                        <div>Right Leg</div>
                    </div>
                </div>
                <div className='armor-right'>
                    <div className='armor-slot'>
                        <div>Body</div>
                    </div>
                    <div className='armor-slot'>
                        <div>Left Arm</div>
                    </div>
                    <div className='armor-slot'>
                        <div>Left leg</div>
                    </div>
                    <div className='armor-slot'>
                        <div>Shield</div>
                    </div>
                </div>
            </div>

        </div>
    )
}


export default CharacterSlots;