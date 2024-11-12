import { GiChestArmor } from 'react-icons/gi';
import './ArmorSlot.css';


const ArmorSlot = (props: {
    label: string,
    image?: string,
    armourPoints: number,
}) => {


    return (
        <div className='ArmorSlot'>

            <span className='slot-ap'>
                {props.armourPoints}
            </span>

            <div className="slot-image">
                <GiChestArmor />
            </div>

            <div className="slot-label">
                {props.label}
            </div>
        </div>
    )
}

export default ArmorSlot;