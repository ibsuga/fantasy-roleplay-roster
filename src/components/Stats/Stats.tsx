import Characteristic from './components/Characteristic';
import './Stats.css';
import useStatsStore from '../../store/StatsStore';
import Stat from './components/Stat';
import DeathSaves from './components/DeathSaves';
import useNavbarStore from '../../store/NavbarStore';


const Stats = () => {

    const [
        stats,
        size,
        updateSize,
        armorClass,
        updateArmorClass,
        hitPoints,
        updateHitPoints,
        hitDice,
        characteristics,
        updateHitDice,
        updateStats,
        hasHeroicInspiration,
        updateHeroicInspiration,
        toggleShield,
        hasShield,
    ] = useStatsStore((state) => [
        state.stats,
        state.size,
        state.updateSize,
        state.armorClass,
        state.updateArmorClass,
        state.hitPoints,
        state.updateHitPoints,
        state.hitDice,
        state.characteristics,
        state.updateHitDice,
        state.updateStats,
        state.hasHeroicInspiration,
        state.updateHeroicInspiration,
        state.toggleShield,
        state.hasShield,
    ]);

    const proficiencyBonus = useNavbarStore((state) => state.characterExperience.proficiencyBonus);

    let armorClassShield = hasShield ? armorClass + 2 : armorClass;

    return (
        <div className="Stats">

            <div className='title'>

                <span style={{ opacity: '25%', fontSize: '1.25em', alignSelf: 'center', justifySelf: 'end' }}>EQUIPMENT</span>
                <span> STATS </span>
                <span style={{ opacity: '25%', fontSize: '1.25em', alignSelf: 'center', justifySelf: 'start' }}>INVENTORY</span>

            </div>

            {/*HEALTH SECTION*/}
            <div className='player-health'>

                <Stat header='AC' className="ac-box">
                    <div className="armor-class">
                        <div className="stat-slot">
                            <input
                                type="text"
                                maxLength={2}
                                value={armorClassShield}
                                onChange={(e) => updateArmorClass(Number(e.target.value) || 0)}
                            />
                        </div>
                        <div className='stat-slot ac'>
                            <span>SHIELD</span>
                            <input type="checkbox" checked={hasShield} onChange={(e: React.ChangeEvent<HTMLInputElement>) => toggleShield(e.target.checked)} />
                        </div>
                    </div>
                </Stat>

                <Stat header='HIT POINTS'>
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
                </Stat>

                <Stat header='HIT DICE'>
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
                </Stat>

                <Stat header='DEATH SAVES'>
                    <div className='death-saves'>
                        <div>
                            <div className='stat-slot'>
                                <DeathSaves type='successes' />
                            </div>
                            <div className='stat-slot'>
                                <DeathSaves type='failures' />
                            </div>
                        </div>
                    </div>
                </Stat>
            </div >

            {/*CHARACTERISTICS SECTION*/}
            < div className="player-characteristics" >

                <div className="pc-section-top">

                    <Stat header='INITIATIVE'>
                        <input type="text" maxLength={2} placeholder='-' value={stats.initiative} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateStats("initiative", Number(e.target.value))} />
                    </Stat>

                    <Stat header='SPEED' >
                        <input type="text" maxLength={2} placeholder='-' value={stats.speed} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateStats("speed", Number(e.target.value))} />
                    </Stat>

                    <Stat header='PERCEPTION' >
                        <input type="text" maxLength={2} placeholder='-' value={stats.perception} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateStats("perception", Number(e.target.value))} />
                    </Stat>

                    <Stat header='SIZE' >
                        <input className='size-input' type="text" maxLength={10} placeholder='-' value={size} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateSize(e.target.value)} />
                    </Stat>


                </div>


                <div className="pc-section-bottom">

                    {
                        characteristics.map((characteristic) => <Characteristic data={characteristic} />)
                    }

                    <div>

                        <Stat header='PROFICIENCY BONUS'>
                            <span className='proficiencyBonus'>{proficiencyBonus}</span>
                            {/* <input type="text" maxLength={2} placeholder='-' value={stats.proficiencyBonus} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateStats("proficiencyBonus", Number(e.target.value))} /> */}
                        </Stat>

                        <Stat header='HEROIC INSPIRATION'>
                            <input type="checkbox" checked={hasHeroicInspiration} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateHeroicInspiration(e.target.checked)} />
                        </Stat>

                    </div>

                </div>


            </div >


































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

        </div >
    )
}

export default Stats;