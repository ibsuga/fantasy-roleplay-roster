import { useMemo } from 'react';
import useStatsStore, { ICharacteristic, ISkill } from '../../../store/StatsStore';
import './Characteristic.css'
import Skill from './Skill';


type Props = {
    data: ICharacteristic;
}


const Characteristic = ({
    data,
}: Props) => {
    const [
        updateCharacteristicScore,
        toggleCharacteristicSavingThrow,
        proficiencyBonus
    ] = useStatsStore((state) => [
        state.updateCharacteristicScore,
        state.toggleCharacteristicSavingThrow,
        state.stats.proficiencyBonus
    ])

    const modifier = useMemo(() => Math.floor((data.score - 10) / 2), [data.score]);

    const savingThrow = useMemo(() => modifier + (data.savingThrow ? proficiencyBonus : 0), [modifier, proficiencyBonus, data.savingThrow]);


    return (
        <div className="Characteristic">

            <span className='header'> {data.name} </span>

            <div className="content">

                {/* MODIFIER & SCORE */}
                <div>
                    <span className='modifier'>{modifier}</span>
                    <input
                        type="text"
                        maxLength={2}
                        value={data.score}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateCharacteristicScore(data.name, Number(e.target.value))}
                    />
                    <span className='label dim'>Modifier</span>
                    <span className='label dim'>Score</span>
                </div>

                {/* SAVING THROW */}
                <div>
                    <input type="checkbox" checked={data.savingThrow} onChange={() => toggleCharacteristicSavingThrow(data.name)} />
                    <span className='score'>{savingThrow}</span>
                    <span className='label'>Saving Throw</span>
                </div>

                {/* SKILLS */}
                <div>{
                    data.skills.map((skill: ISkill, index: number) =>
                        <Skill key={index} data={skill} characteristic={data.name} modifier={modifier} />)
                }</div>

            </div>

        </div>
    )
}

export default Characteristic;