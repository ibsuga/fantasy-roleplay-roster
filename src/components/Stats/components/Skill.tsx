import { useMemo } from "react";
import useStatsStore, { ISkill } from "../../../store/StatsStore";

const Skill = (props: {
    data: ISkill,
    characteristic: string,
    modifier: number,
}) => {

    const [toggleCharacteristicSkill, proficiencyBonus] = useStatsStore((state) => [state.toggleCharacteristicSkill, state.stats.proficiencyBonus]);

    const skillModifier = useMemo(() => props.modifier + (props.data.isProficient ? proficiencyBonus : 0), [props.modifier, proficiencyBonus, props.data.isProficient])

    return (
        <div className="skill">
            <input
                type="checkbox"
                checked={props.data.isProficient}
                onChange={() => { toggleCharacteristicSkill(props.characteristic, props.data.name) }}
            />
            <span className="score"> {skillModifier}</span>
            <span> {props.data.name} </span>
        </div>
    )
}

export default Skill;