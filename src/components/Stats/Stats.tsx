import Characteristic from './components/Characteristic';
import './Stats.css';
import { TbDiamonds } from "react-icons/tb";
import useStatsStore from '../../store/StatsStore';


const Stats = () => {

    const [armorClass, updateArmorClass, hitPoints, updateHitPoints, hitDice, updateHitDice] = useStatsStore((state) => [
        state.armorClass,
        state.updateArmorClass,
        state.hitPoints,
        state.updateHitPoints,
        state.hitDice,
        state.updateHitDice,
    ]);



    return (
        <div className="Stats">

            <div className='title'>

                <span style={{ opacity: '25%', fontSize: '1.25em', alignSelf: 'center', justifySelf: 'end' }}>EQUIPMENT</span>
                <span> STATS </span>
                <span style={{ opacity: '25%', fontSize: '1.25em', alignSelf: 'center', justifySelf: 'start' }}>INVENTORY</span>

            </div>

            {/*HEALTH SECTION*/}
            <div className='player-health'>

                {/*ARMOR CLASS*/}
                <div className="stats-container ac-box">
                    <span className='stat-header'>AC</span>

                    <div className="armor-class">
                        <div className="stat-slot">
                            <input
                                type="text"
                                maxLength={2}
                                value={armorClass}
                                onChange={(e) => updateArmorClass(Number(e.target.value) || 0)}
                            />
                        </div>
                        <div className='stat-slot ac'>
                            <span>SHIELD</span>
                            <input type="checkbox" />
                        </div>
                    </div>
                </div>

                {/*HIT POINTS */}
                <div className='stats-container'>

                    <span className='stat-header'>HIT POINTS</span>

                    <div className='hit-points'>
                        <div>
                            <input
                                type="text"
                                maxLength={2}
                                value={hitPoints.current}
                                onChange={(e) => updateHitPoints(Number(e.target.value), 'current')}
                            />
                            <span>CURRENT</span>

                            <div>
                                <div className='stat-slot'>
                                    <input
                                        type="text"
                                        maxLength={2}
                                        value={hitPoints.temp}
                                        onChange={(e) => updateHitPoints(Number(e.target.value), 'temp')}
                                    />
                                    <span>TEMP</span>
                                </div>
                                <div className='stat-slot'>
                                    <input
                                        type="text"
                                        maxLength={2}
                                        value={hitPoints.max}
                                        onChange={(e) => updateHitPoints(Number(e.target.value), 'max')}
                                    />
                                    <span>MAX</span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/*HIT DICE*/}
                <div className="stats-container">

                    <span className='stat-header'>HIT DICE</span>

                    <div className='hit-dice'>
                        <div>
                            <div className='stat-slot'>
                                <input
                                    type="text"
                                    maxLength={2}
                                    placeholder='-'
                                    value={hitDice.spent}
                                    onChange={(e) => updateHitDice(Number(e.target.value), 'spent')}
                                />
                                <span>SPENT</span>
                            </div>
                            <div className='stat-slot'>
                                <input
                                    type="text"
                                    maxLength={2}
                                    value={hitDice.max}
                                    onChange={(e) => updateHitDice(Number(e.target.value), 'max')}
                                />
                                <span>MAX</span>
                            </div>
                        </div>
                    </div>

                </div>

                {/*DEATH SAVES*/}
                <div className="stats-container">

                    <span className='stat-header'>DEATH SAVES</span>
                    <div className='death-saves'>
                        <div>
                            <div className='stat-slot'>
                                <div>
                                    <TbDiamonds />
                                    <TbDiamonds />
                                    <TbDiamonds />
                                </div>
                                <span>SUCCESSES</span>
                            </div>
                            <div className='stat-slot'>
                                <div>
                                    <TbDiamonds />
                                    <TbDiamonds />
                                    <TbDiamonds />
                                </div>
                                <span>FAILURES</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/*CHARACTERISTICS SECTION*/}
            <div className="player-characteristics">

                <div className="pc-section-top">

                    <div className='stats-container'>
                        <span className="stat-header">INITIATIVE</span>
                        <div className="stat-slot">
                            <input type="text" maxLength={2} placeholder='-' />
                        </div>
                    </div>

                    <div className='stats-container'>
                        <span className="stat-header">SPEED</span>
                        <div className="stat-slot">
                            <input type="text" maxLength={2} placeholder='-' />
                        </div>
                    </div>

                    <div className='stats-container'>
                        <span className="stat-header">SIZE</span>
                        <div className="stat-slot">
                            <input type="text" maxLength={2} placeholder='-' />
                        </div>
                    </div>

                    <div className='stats-container'>
                        <span className="stat-header">PERCEPTION</span>
                        <div className="stat-slot">
                            <input type="text" maxLength={2} placeholder='-' />
                        </div>
                    </div>

                </div>


                <div className="pc-section-bottom">

                    {/*STRENGHT */}
                    <Characteristic label='STRENGHT' skills={['Athletics']} />

                    {/*INTELLIGENCE */}
                    <Characteristic label='INTELLIGENCE' skills={['Arcana', 'History', 'Investigation', 'Nature', 'Religion']} />

                    {/*DEXTERITY*/}
                    <Characteristic label='DEXTERITY' skills={['Acrobatics', 'Sleight of Hand', 'Stealh']} />

                    {/*WISDOM*/}
                    <Characteristic label='WISDOM' skills={['Animal Handl.', 'Insight', 'Medicine', 'Perception', 'Survival']} />

                    {/*CONSTITUTION*/}
                    <Characteristic label='CONSTITUTION' skills={[]} />

                    {/*CHARISMA*/}
                    <Characteristic label='CHARISMA' skills={['Deception', 'Intimidation', 'Performance', 'Persuasion']} />

                    {/*PROFICIENCY BONUS & HEROIC INSPIRATION */}
                    <div>

                        <div className='stats-container'>
                            <span className="stat-header">PROFICIENCY BONUS</span>
                            <div className="stat-slot">
                                <input type="text" maxLength={2} placeholder='-' />
                            </div>
                        </div>

                        <div className='stats-container'>
                            <span className="stat-header">HEROIC INSPIRATION </span>
                            <div className="stat-slot">
                                <input type="checkbox" maxLength={2} placeholder='-' />
                            </div>
                        </div>

                    </div>

                </div>


            </div>


































            {/* <div className='player-points'>
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


            </div> */}


            {/* <div className='player-status'>
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
            </div> */}

        </div>
    )
}

export default Stats;