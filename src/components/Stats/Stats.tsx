import './Stats.css';

const Stats = () => {
    return (
        <div className="Stats">
            <div className='player-health'>
                <div>WOUNDS</div>
                <div>CRITICAL WOUNDS</div>
            </div>

            <div className='player-points'>
                <div>
                    <input type="text" maxLength={2} />
                    <span>FATE</span>
                </div>
                <div>
                    <input type="text" maxLength={2} />
                    <span>FORTUNE</span>
                </div>
            </div>
            <div className='player-points'>
                <div>RESILIENCE</div>
                <div>RESOLVE</div>
            </div>

            <div className='player-status'>
                <input type="text" />
            </div>
        </div>
    )
}

export default Stats;