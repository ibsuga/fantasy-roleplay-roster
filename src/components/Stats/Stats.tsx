import Banner from '../Banner/Banner';
import { FaRegCircle, FaCircle } from "react-icons/fa";
import { LuCircleDashed } from "react-icons/lu";
import './Stats.css';

const Stats = () => {
    return (
        <div className="Stats">
            <div className='player-health'>
                <div className='player-wounds'>
                    <span>WOUNDS</span>
                    <input type="text" maxLength={2} placeholder='-' />
                    <div className='stats-table wounds'>
                        <span>SB</span>
                        <span>TB+2</span>
                        <span>WPB</span>
                        <span>Hardy</span>
                        <span>Max.</span>
                        <input type="text" maxLength={2} placeholder='-' />
                        <input type="text" maxLength={2} placeholder='-' />
                        <input type="text" maxLength={2} placeholder='-' />
                        <input type="text" maxLength={2} placeholder='-' />
                        <input type="text" maxLength={2} placeholder='-' />
                    </div>
                </div>
                <div>CRITICAL WOUNDS</div>
            </div>

            <div className='player-points'>
                <div>
                    <span>FATE</span>
                    <div className='stats-value'>
                        <FaCircle />
                        <FaCircle />
                        <FaRegCircle />
                        <FaRegCircle />
                        <LuCircleDashed />
                    </div>
                    <div className='stats-table fate-resilience'>
                        <span>FATE</span>
                        <span>FORTUNE</span>
                        <input type="text" />
                        <input type="text" />
                    </div>

                </div>
                <div>
                    <span>RESILIENCE</span>
                    <div className='stats-value'>
                        <FaCircle />
                        <FaCircle />
                        <FaRegCircle />
                        <FaRegCircle />
                        <LuCircleDashed />
                    </div>
                    <div className='stats-table fate-resilience'>
                        <span>RESICIENCE</span>
                        <span>RESOLVE</span>
                        <input type="text" />
                        <input type="text" />
                    </div>
                </div>
                {/* <div>
                    <span>FORTUNE</span>
                    <div className='points-table'>
                        <span>Max.</span>
                        <span>Current</span>
                        <input type="text" maxLength={2} placeholder='-' />
                        <input type="text" maxLength={2} placeholder='-' />
                    </div>
                </div>
                <div>
                    <span>RESOLVE</span>
                    <div className='points-table'>
                        <span>Max.</span>
                        <span>Current</span>
                        <input type="text" maxLength={2} placeholder='-' />
                        <input type="text" maxLength={2} placeholder='-' />
                    </div>
                </div> */}

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