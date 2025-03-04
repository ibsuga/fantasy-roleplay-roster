import './DeathSaves.css';
import useStatsStore from "../../../store/StatsStore";
import { TbDiamonds, TbDiamondsFilled } from "react-icons/tb";

const DeathSaves = (props: {
    type: string,
}) => {
    const [deathSaves, updateDeathSaves] = useStatsStore((state) => [state.deathSaves, state.updateDeathSaves]);
    const deathSavesCount = props.type === 'successes' ? deathSaves.successes : deathSaves.failures;

    return (
        <div className="DeathSaves">
            <div className="DeathSaves__icons">
                {
                    [1, 2, 3].map((value) =>
                        <div
                            key={value}
                            className={props.type}
                            onClick={() => updateDeathSaves(props.type, value)}
                        >
                            {value <= deathSavesCount ? <TbDiamondsFilled /> : <TbDiamonds />}
                        </div>
                    )
                }
            </div>
            <span>{props.type}</span>
        </div>
    )
}

export default DeathSaves;