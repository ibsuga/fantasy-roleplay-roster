import './InventoryItem.css';
import EditItemDialog from '../Inventory/components/EditItemDialog';
import { GiCrocSword, GiChestArmor, GiPotionBall, GiPocketBow, GiHandBag } from "react-icons/gi";
import useItemStore, { itemType } from '../../store/InventoryStore';
import PopMenu from '../PopMenu/PopMenu';
import ContainerSelector from './ContainerSelector';


const InventoryItem = (props: {
  data: itemType;
}) => {
  const [containers, updateItemAmount, equippedItems, equipItem, unequipItem] = useItemStore((state) => [
    state.containers,
    state.updateItemAmount,
    state.equippedItems,
    state.equipItem,
    state.unequipItem
  ]);

  const container = containers.find((container) => container.id === props.data.container_id);

  //Sets item icon for each category.
  const itemIcons: any = {
    'weapon': props.data.isRanged ? <GiPocketBow /> : <GiCrocSword />,
    'armor': <GiChestArmor />,
    'items': <GiPotionBall />,
  };

  //Sets item stats depending on item category.
  const getItemStatsContent = () => {
    switch (props.data.category) {
      case 'weapon':
        return (
          <div className='item-stats'>
            <div className="stat">
              <div className="label">ENC</div>
              <span>{props.data.encumbrance}</span>
            </div>
            <div className="stat">
              <div className="label">DMG</div>
              <span>{props.data.damage?.useSB ? '+SB+' : ''}</span>
              <span>{props.data.damage?.value}</span>
            </div>
          </div>
        );
      case 'armor':
        return (
          <div className='item-stats'>
            <div className='stat'>
              <div className="label">ENC</div>
              <span>{props.data.encumbrance}</span>
            </div>
            <div className='stat'>
              <div className='label'>AP</div>
              <span>{props.data.armourPoints}</span>
            </div>
          </div>
        );
      case 'items':
        return (
          <div className='item-stats'>
            <div className='stat'>
              <div className="label">ENC</div>
              <span>{props.data.encumbrance}</span>
            </div>
          </div>
        );
      default:
        return <span>No Content...</span>;
    }
  };


  const ContainerSelectorTooltipContent =
    <div className="container-tooltip">
      <div className="header">STORE IN...</div>
      <hr />

      <div className="container-option">
        <ContainerSelector
          itemId={props.data.id}
          containerId={null}
          containerLabel='Inventory'
          isActive={!props.data.container_id}
        />
      </div>
      {
        containers.map((container, index) =>
          <div className="container-option">
            <ContainerSelector
              key={index}
              itemId={props.data.id}
              containerId={container.id}
              containerLabel={container.label}
              isActive={container.id === props.data.container_id}
            />
          </div>
        )
      }
    </div >

  //Checks if item is equipped or not (!! = boolean casting).
  let isItemEquipped = !!equippedItems.find((item: number) => item === props.data.id);

  return (
    <div className="InventoryItem" >

      <div className={`item-equip ${isItemEquipped ? 'equipped' : ''}`} onClick={() => isItemEquipped ? unequipItem(props.data.id) : equipItem(props.data.id)}>
        <div>{itemIcons[props.data.category]}</div>
      </div>

      <EditItemDialog id={props.data.id}>
        <>
          <div className="item-name">{props.data.name}</div>
          {getItemStatsContent()}
        </>
      </EditItemDialog>

      <div className="item-container">
        <PopMenu
          trigger={<GiHandBag style={container ? { color: `#${container?.color}` } : {}} />}
          content={ContainerSelectorTooltipContent}
        />
      </div>

      <div className="item-amount">x
        <input
          type='text'
          maxLength={2}
          value={props.data.amount ?? 1}
          onChange={(e: any) => updateItemAmount(props.data.id, e.target.value)}
        />
      </div>
    </div>

  );
};

export default InventoryItem;