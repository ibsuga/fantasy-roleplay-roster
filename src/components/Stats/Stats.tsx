import Banner from '../Banner/Banner';
import './Stats.css';

const Stats = () => {
    return (
        <div className="Stats">
            <div className='player-health'>
                <div className='player-wounds'>
                    <span>WOUNDS</span>
                    <input type="text" maxLength={2} />
                    <div className='wounds-table'>
                        <span>SB</span>
                        <span>TB+2</span>
                        <span>WPB</span>
                        <span>Hardy</span>
                        <span>Max.</span>
                        <input type="text" maxLength={2} />
                        <input type="text" maxLength={2} />
                        <input type="text" maxLength={2} />
                        <input type="text" maxLength={2} />
                        <input type="text" maxLength={2} />
                    </div>
                </div>
                <div>CRITICAL WOUNDS</div>
            </div>

            <div className='player-points'>
                <div>FATE</div>
                <div>FORTUNE</div>
                <div>RESILIENCE</div>
                <div>RESOLVE</div>
            </div>


            <div className='player-status'>
                <div className='status-conditions'>
                    <span>CONDITIONS</span>
                    <div>
                        <Banner />
                        <Banner />
                    </div>
                </div>
                <div className='status-psychology'>
                    <span>PSYCHOLOGY</span>
                    <div>
                        <Banner />
                        <Banner />
                        <Banner />
                        <Banner />
                        <Banner />
                        <Banner />
                        <Banner />
                        <Banner />
                        <Banner />
                        <Banner />
                    </div>
                </div>
                <div className='status-corruption'>
                    <span>CORRUPTION & MUTATIONS</span>
                    <div>
                        <Banner />
                        <Banner />
                        <Banner />
                        <Banner />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Stats;