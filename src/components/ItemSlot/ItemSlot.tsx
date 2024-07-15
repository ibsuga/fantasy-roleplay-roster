import './ItemSlot.css';

const ItemSlot = (props: {
    label: string,
    image: string,
}) => {
    return (
        <div className='ItemSlot'>
            <input type="text" maxLength={2} />
            <div className="slot-image">
                <img src={props.image} />
                <div className="slot-image-input-bg"></div>
            </div>
            <div className="slot-label">{props.label}</div>
        </div>
    )
}

export default ItemSlot;