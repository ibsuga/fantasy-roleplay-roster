import { useContext } from "react";
import useItemStore from "../../store/InventoryStore";
import { PopMenuContext } from "../PopMenu/PopMenuContext";

const ContainerSelector = (props: {
    itemId: number,
    containerId: number | null,
    containerLabel: string,
}) => {

    const menuCtx = useContext(PopMenuContext);
    const updateItemContainer = useItemStore((state) => state.updateItemContainer);

    return (
        <div onClick={() => {
            updateItemContainer(props.itemId, props.containerId);
            menuCtx.handlePopover();
        }}>
            {props.containerLabel}
        </div>
    )
}

export default ContainerSelector;