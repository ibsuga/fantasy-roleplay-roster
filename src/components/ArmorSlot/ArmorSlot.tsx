import useItemStore from '../../store/InventoryStore';
import './ArmorSlot.css';


const ArmorSlot = (props: {
    id?: number,
    label: string,
    image: string,
    amount?: number,
}) => {

    const updateItemAmount = useItemStore((state) => state.updateItemAmount);

    return (
        <div className='ArmorSlot'>

            <input
                type="text"
                maxLength={2}
                value={props.amount}
                onChange={(e: any) => props.id && updateItemAmount(props.id, e.target.value)}
            />
            <div className="slot-image">
                <div className="slot-image-input-bg"></div>
                <img src={props.image} />
            </div>

            <div className="slot-label">{props.label}</div>
        </div>
    )
}

export default ArmorSlot;