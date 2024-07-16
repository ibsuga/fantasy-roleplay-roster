import Banner from '../Banner/Banner';
import './Stats.css';

const Stats = () => {
    return (
        <div className="Stats">
            <div className='player-health'>
                <div>WOUNDS</div>
                <div>CRITICAL WOUNDS</div>
            </div>

            <div className='player-points'>
                <div>Fate</div>
                <div>Fortune</div>
                <div>RESILIENCE</div>
                <div>RESOLVE</div>
            </div>

            <div className='player-status'>
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
                        <Banner />
                        <Banner />
                    </div>
                </div>
                <div>Corruption & Mutations</div>
                <div>Conditions</div>
            </div>
        </div>
    )
}

export default Stats;