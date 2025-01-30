import './WeaponSlot.css';

const WeaponSlot = (props: {
    label: string;
    damage?: string;
}
) => {
    return (
        <div className='WeaponSlot'>
            <div className='weapon-label'>{props.label}</div>
            <div className='weapon-damage'>{props.damage}</div>
        </div>
    )
}

export default WeaponSlot;